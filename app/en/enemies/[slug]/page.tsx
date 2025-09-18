import type { Metadata, ResolvingMetadata } from "next";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import StatsTable from "@/components/enemies/stats-table";
import { parseRichText } from "@/lib/parse";
import { getEnemyAttackType, getEnemyDamageType, getEnemyLevelType, getEnemyMotionType } from "@/lib/enemy-utils";
import { getEnemies, getEnemy } from "@/lib/fetch-utils";
import Breadcrumbs from "@/components/ui/dynamic-breadcrumb";
import { getEnemyIcon } from "@/lib/image-utils";
import CodeBlock from "@/components/code-block";
import UnreleasedNotice from "@/components/operators/unreleased-notice";

export const revalidate = 2419200;
export const dynamicParams = true;

export async function generateStaticParams() {
  const enemies: any[] = await getEnemies("en");
  return enemies.slice(0, 3).map((enemy) => ({
    slug: enemy.slug,
  }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const data: any = await getEnemy("en", slug);
  if (!data) notFound();

  const title = data.enemy.name;
  const description = data.enemy.description;
  const image = getEnemyIcon(data.enemy.enemyId);
  
  const siteName = "Closure Wiki";
  const url = `https://closure.wiki/en/enemies/${slug}`;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      siteName: siteName,
      url: url,
      images: [{ url: image }]
    },
    twitter: {
      title: title,
      description: description,
      card: "summary",
      images: image,
    },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data: any = await getEnemy("en", slug);
  if (!data) notFound();

  return (
    <div className="flex flex-1 flex-col gap-8 w-full px-4 mb-32 md:px-0 max-w-5xl mx-auto">
      <section>
        <div className="flex justify-between mb-2">
          <Breadcrumbs items={[
            { label: "Home", href: "/en/home" },
            { label: "Enemies", href: "/en/enemies" },
            { label: data.enemy.name },
          ]} />
          <a href={`/en/enemies/${slug}/export`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Export</a>
        </div>
        <div className="flex justify-between mb-2">
          <h1 className="text-2xl font-semibold">{data.enemy.name}</h1>
        </div>
        <div className="mb-4 text-sm flex flex-row gap-4">
          <span className="text-muted-foreground">{getEnemyLevelType(data.enemy.enemyLevel)} Enemy</span>
        </div>
        <Separator className="mb-4" />

        {data.meta.isUnreleased && <UnreleasedNotice entityType="enemy" />}

        <div className="flex flex-col md:flex-row gap-4 items-start">
          <img src={getEnemyIcon(data.enemy.enemyId)}
            className="w-[180px] h-[180px] md:w-32 md:h-32 object-contain" />

          <div className="flex flex-1 flex-col gap-2">
            <div className="flex flex-row gap-4 text-sm overflow-x-auto">
              <span>
                <span className="text-muted-foreground">Code: </span>
                {data.enemy.enemyIndex}
              </span>
              <span>
                <span className="text-muted-foreground">Type: </span>
                {getEnemyLevelType(data.enemy.enemyLevel)}
              </span>
                {data.enemyStats && (
                  <span>
                    <span className="text-muted-foreground">Attack Pattern: </span>
                    {getEnemyAttackType(data.enemyStats[0].enemyData.applyWay.m_value)}
                  </span>
                )}
              <span>
                <span className="text-muted-foreground">Damage: </span>
                {data.enemy.damageType.map((type: string) => getEnemyDamageType(type)).join("/")}
              </span>
                {data.enemyStats && (
                  <span>
                    <span className="text-muted-foreground">Location: </span>
                    {getEnemyMotionType(data.enemyStats[0].enemyData.motion.m_value)}
                  </span>
                )}
            </div>
            <p className="flex-1">{data.enemy.description}</p>
          </div>
        </div>
      </section>

      {data.enemy.abilityList && data.enemy.abilityList.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Traits</h2>
          <Separator className="mb-2" />
          <ul className="ml-6">
              {data.enemy.abilityList.map((ability: any, index: number) =>
                  ability.textFormat === "TITLE" 
                    ? (<li key={index} className="font-bold text-lg mt-4 mb-1 list-none">{ability.text}</li>) 
                    : (
                        <li key={index} className="list-disc list-item items-center mb-1">
                          <span dangerouslySetInnerHTML={{ __html: parseRichText(ability.text) }} />
                        </li>
                      )
              )}
          </ul>
        </section>
      )}

      {data.enemyStats && data.enemyStats.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Attributes</h2>
          <Separator className="mb-4" />
          <div className="overflow-x-auto">
            <StatsTable enemyStats={data.enemyStats} />
          </div>
        </section>
      )}

      {data.enemyAppearances && data.enemyAppearances.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Appearances</h2>
          <Separator className="mb-4" />
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 list-disc pl-5">
              {data.enemyAppearances.map((stage: any, index: number) =>
                  <li key={index} className="list-disc list-item items-center gap-2 mb-1"> 
                    <a href={`/en/operations/${stage.stageId}`} className="hover:underline text-blue-600">{stage.code}: {stage.name}</a> 
                  </li> 
              )}
          </ul>
        </section>
      )}

      <section>
        <h2 className="text-xl font-semibold mb-2">Reference Data</h2>
        <Separator className="mb-4" />
        <div>
          <h3 className="text-lg font-semibold mb-2">enemy_handbook_table.json</h3>
          <CodeBlock code={JSON.stringify(data.enemy, null, 2)} language="json" />
          <h3 className="text-lg font-semibold mb-2 mt-8">enemy_database.json</h3>
          <CodeBlock code={JSON.stringify(data.enemyStats, null, 2)} language="json" />
        </div>
      </section>
    </div>
  )
}