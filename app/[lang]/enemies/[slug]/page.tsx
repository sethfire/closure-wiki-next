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
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import EntryTitle from "@/components/entry-title";

export const revalidate = 2419200;
export const dynamicParams = true;

export async function generateStaticParams() {
  const enemies: any[] = await getEnemies("en");
  return enemies.slice(0, 3).map((enemy) => ({
    slug: enemy.slug,
  }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string, slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { lang, slug } = await params;
  const data: any = await getEnemy(lang, slug);
  if (!data) notFound();

  const title = data.summary.name;
  const description = data.summary.description;
  const image = data.summary.image;

  const siteName = "Closure Wiki";
  const url = `https://closure.wiki/${lang}/enemies/${slug}`;

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

export default async function Page({ params }: { params: Promise<{ lang: string, slug: string }> }) {
  const { lang, slug } = await params;
  const data: any = await getEnemy(lang, slug);
  if (!data) notFound();

  return (
    <div className="flex flex-1 flex-col gap-8 w-full px-4 mb-32 md:px-0 max-w-5xl mx-auto">
      <section>
        <div className="flex justify-between mb-2">
          <Breadcrumbs items={[
            { label: "Home", href: `/${lang}/home` },
            { label: "Enemies", href: `/${lang}/enemies` },
            { label: data.summary.name },
          ]} />
        </div>
        <EntryTitle
          title={data.summary.name}
          caption={`${getEnemyLevelType(data.enemyHandbook.enemyLevel)} Enemy`}
          icon={getEnemyIcon(data.enemyHandbook.enemyId)}
        />
        <Separator className="mb-4" />
        {data.summary.isUnreleased && <UnreleasedNotice contentType="enemy" />}

        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex flex-row gap-4 text-sm overflow-x-auto">
              <span>
                <span className="text-muted-foreground">Code: </span>
                {data.enemyHandbook.enemyIndex}
              </span>
              <span>
                <span className="text-muted-foreground">Type: </span>
                {getEnemyLevelType(data.enemyHandbook.enemyLevel)}
              </span>
                {data.enemyDatabase && (
                  <span>
                    <span className="text-muted-foreground">Attack Pattern: </span>
                    {getEnemyAttackType(data.enemyDatabase[0].enemyData.applyWay.m_value)}
                  </span>
                )}
              <span>
                <span className="text-muted-foreground">Damage: </span>
                {data.enemyHandbook.damageType.map((type: string) => getEnemyDamageType(type)).join("/")}
              </span>
                {data.enemyDatabase && (
                  <span>
                    <span className="text-muted-foreground">Location: </span>
                    {getEnemyMotionType(data.enemyDatabase[0].enemyData.motion.m_value)}
                  </span>
                )}
            </div>
            <p className="flex-1">{data.enemyHandbook.description}</p>
          </div>
        </div>
      </section>

      {data.enemyHandbook.abilityList && data.enemyHandbook.abilityList.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Traits</h2>
          <Separator className="mb-2" />
          <ul className="ml-6">
            {data.enemyHandbook.abilityList.map((ability: any, index: number) =>
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

      {data.enemyDatabase && data.enemyDatabase.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Attributes</h2>
          <Separator className="mb-4" />
          {data.summary.isUnreleased === false && (
            <Alert className="mb-4">
              <AlertCircleIcon />
              <AlertTitle>Note: The text below may be in CN since CN data is being used for this table</AlertTitle>
            </Alert>
          )}
          <StatsTable enemyStats={data.enemyDatabase} />
        </section>
      )}

      {data.enemyAppearances && data.enemyAppearances.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Appearances</h2>
          <Separator className="mb-4" />
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 list-disc pl-5">
            {data.enemyAppearances.map((stage: any, index: number) =>
              <li key={index} className="list-disc list-item items-center gap-2 mb-1"> 
                <a href={`/${lang}/operations/${stage.stageId}`} className="hover:underline text-blue-600">{stage.code}: {stage.name}</a> 
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
          <CodeBlock code={JSON.stringify(data.enemyHandbook, null, 2)} language="json" />
          <h3 className="text-lg font-semibold mb-2 mt-8">enemy_database.json</h3>
          <CodeBlock code={JSON.stringify(data.enemyDatabase, null, 2)} language="json" />
        </div>
      </section>
    </div>
  )
}