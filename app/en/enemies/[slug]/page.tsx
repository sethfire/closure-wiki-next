import type { Metadata, ResolvingMetadata } from "next";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import StatsTable from "@/components/enemies/stats-table";
import { AlertCircleIcon } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { parseRichText } from "@/lib/parse";
import { getEnemyAttackType, getEnemyDamageType, getEnemyLevelType, getEnemyMotionType } from "@/lib/enemy-utils";
import { getEnemies, getEnemy } from "@/lib/fetch-utils";
import Breadcrumbs from "@/components/ui/dynamic-breadcrumb";

export const revalidate = 2419200;
export const dynamicParams = true;

export async function generateStaticParams() {
  const enemies: any[] = await getEnemies("en");
  return enemies.slice(0, 10).map((enemy) => ({
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
  const image = `https://static.closure.wiki/v1/enemies/${data.enemy.enemyId}.webp`;

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
    <div className="flex flex-1 flex-col gap-8 p-4 mx-auto w-full max-w-6xl mb-16">
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
        {data.meta.isUnreleased && (
          <Alert className="mb-4">
            <AlertCircleIcon />
            <AlertTitle>This enemy is not yet available on the Global server of Arknights.</AlertTitle>
          </Alert>
        )}
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <img src={`https://static.closure.wiki/v1/enemies/${data.enemy.enemyId}.webp`}
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
              <span>
                <span className="text-muted-foreground">Attack Pattern: </span>
                {getEnemyAttackType(data.enemyStats[0].enemyData.applyWay.m_value)}
              </span>
              <span>
                <span className="text-muted-foreground">Damage: </span>
                {data.enemy.damageType.map((type: string) => getEnemyDamageType(type)).join("/")}
              </span>
              <span>
                <span className="text-muted-foreground">Location: </span>
                {getEnemyMotionType(data.enemyStats[0].enemyData.motion.m_value)}
              </span>
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
                    : (<li key={index} className="list-disc list-item items-center mb-1">{parseRichText(ability.text)}</li>) 
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
          <Separator className="mb-2" />
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 list-disc pl-5">
              {data.enemyAppearances.map((stage: any, index: number) =>
                  <li key={index} className="list-disc list-item items-center gap-2 mb-1"> 
                    <a href={`/en/operations/${stage.stageId}`} className="hover:underline text-blue-600">{stage.code}: {stage.name}</a> 
                  </li> 
              )}
          </ul>
        </section>
      )}
    </div>
  )
}