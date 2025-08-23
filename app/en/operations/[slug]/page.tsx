import type { Metadata, ResolvingMetadata } from 'next'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { notFound } from 'next/navigation'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { AlertCircleIcon } from 'lucide-react'
import { parseRichText, stripTags } from '@/lib/parse'
import { getEnemyStat, getEnemyAttribute, getEnemyLevelType } from '@/lib/enemy-utils'
import { getOperation, getOperations } from '@/lib/fetch-utils'

export const revalidate = 86400
export const dynamicParams = true

export async function generateStaticParams() {
  const data: any = await getOperations();
  return data.stages.slice(0, 10).map((stage: any) => ({
    slug: stage.slug,
  }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const data: any = await getOperation(slug);

  const title = `${data.stage.code}: ${data.stage.name}`;
  const description = stripTags(data.stage.description.replace(/\\n/g, "\n"));
  const image = `https://static.closure.wiki/v1/mappreviews/${data.stage.stageId}.webp`;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      siteName: "Closure Wiki",
      url: `https://arknights.closure.wiki/en/operations/${slug}`,
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
  const data: any = await getOperation(slug);
  if (!data) notFound();

  const enemySortOrder: Record<string, number> = { BOSS: 0, ELITE: 1, NORMAL: 2 };
  const sortedEnemies = Object.values(data.enemies).slice()
    .sort((a: any, b: any) => (enemySortOrder[a.levelType] ?? 99) - (enemySortOrder[b.levelType] ?? 99));
  const enemies = await Promise.all(sortedEnemies.map(async (enemy: any) => {
    try {
      const res = await fetch(`https://api.closure.wiki/en/enemies/${enemy.slug}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return (await res.json());
    } catch (err) {
      return null;
    }
  }));

  let operationType = "";
  if (data.stage.stageType === "MAIN") operationType = "Main Theme";
  if (data.stage.stageType === "ACTIVITY") operationType = "Event";
  if (data.stage.stageType === "DAILY") operationType = "Supply";
  if (data.stage.stageType === "CAMPAIGN") operationType = "Annihilation";
  if (data.stage.stageType === "CLIMB_TOWER") operationType = "Stationary Security Service (SSS)";

  return (
    <div className="flex flex-1 flex-col gap-8 p-4 mx-auto w-full max-w-6xl mb-16">
      <section>
        <Breadcrumb className="mb-2">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/en/home">Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem><BreadcrumbLink href="/en/operations">Operations</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem><BreadcrumbPage>{data.stage.name}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex justify-between mb-2">
          <h1 className="text-2xl font-semibold">{`${data.stage.code}: ${data.stage.name}`}</h1>
        </div>
        <div className="mb-4 text-sm flex flex-row gap-4">
          <span className="text-muted-foreground">{`${operationType} Operation`}</span>
        </div>
        <Separator className="mb-4" />
        {data.meta.isUnreleased && (
          <Alert className="mb-4">
            <AlertCircleIcon />
            <AlertTitle>This operation is not yet available on the Global server of Arknights.</AlertTitle>
          </Alert>
        )}
        <div className="w-full aspect-video overflow-hidden">
          <img src={`https://static.closure.wiki/v1/mappreviews/${data.stage.stageId}.webp`} className="w-full h-full object-fill" />
        </div>
      </section>
      
      {data.stage.description && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <Separator className="mb-2" />
          <div className="whitespace-pre-line">
            {parseRichText(data.stage.description.replace(/\\n/g, "\n"))}
          </div>
        </section>
      )}

      {enemies && enemies.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Enemies</h2>
          <Separator className="mb-2" />
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-muted text-sm">
              <thead className="bg-gray-200 dark:bg-card">
                <tr>
                  <th className="p-3">Icon</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Count</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Level</th>
                  <th className="p-3">HP</th>
                  <th className="p-3">ATK</th>
                  <th className="p-3">DEF</th>
                  <th className="p-3">RES</th>
                  <th className="p-3">Atk&nbsp;Sp.</th>
                  <th className="p-3">Weight</th>
                  <th className="p-3">Move&nbsp;Sp.</th>
                  <th className="p-3">Range</th>
                  <th className="p-3">LP&nbsp;Penalty</th>
                </tr>
              </thead>
              <tbody>
                {enemies.map((enemyData: any) => {
                  if (!enemyData) return null;
                  const enemyStats = enemyData.enemyStats;
                  const enemyLevel = data.enemies[enemyData.enemy.enemyId] ? data.enemies[enemyData.enemy.enemyId].level : null;
                  if (enemyLevel === null) return null;

                  const enemyCount = data.enemies[enemyData.enemy.enemyId] ? data.enemies[enemyData.enemy.enemyId].count : "?"

                  const enemyName          = getEnemyStat(enemyStats, "name", "-");
                  const enemyLevelType     = getEnemyStat(enemyStats, "levelType", "NORMAL");
                  const enemyMaxHP         = getEnemyAttribute(enemyStats, "maxHp", "-");
                  const enemyATK           = getEnemyAttribute(enemyStats, "atk", "-");
                  const enemyDEF           = getEnemyAttribute(enemyStats, "def", "-");
                  const enemyRES           = getEnemyAttribute(enemyStats, "magicResistance", "-");
                  const enemyRange         = getEnemyStat(enemyStats, "rangeRadius", "-");
                  const enemyWeight        = getEnemyAttribute(enemyStats, "massLevel", "-");
                  const enemySpeed         = getEnemyAttribute(enemyStats, "moveSpeed", "-");
                  const enemyATKSpeed      = getEnemyAttribute(enemyStats, "baseAttackTime", "-");
                  const enemyLPPenalty     = getEnemyStat(enemyStats, "lifePointReduce", "1");

                  return (
                    <tr key={enemyData.meta.slug}>
                      <td className="border-t text-center"><img src={`https://static.closure.wiki/v1/enemies/${enemyData.enemy.enemyId}.webp`} className="inline-block w-12 h-12 align-middle" loading="lazy" decoding="async" /></td>
                      <td className="border-t p-3 text-center"><a className="hover:underline text-blue-500" href={`/en/enemies/${enemyData.meta.slug}`}>{enemyName[enemyLevel]}</a></td>
                      <td className="border-t p-3 text-center">{enemyCount}</td>
                      <td className="border-t p-3 text-center">{getEnemyLevelType(enemyLevelType[enemyLevel])}</td>
                      <td className="border-t p-3 text-center">{enemyLevel}</td>
                      <td className="border-t p-3 text-center">{enemyMaxHP[enemyLevel]}</td>
                      <td className="border-t p-3 text-center">{enemyATK[enemyLevel]}</td>
                      <td className="border-t p-3 text-center">{enemyDEF[enemyLevel]}</td>
                      <td className="border-t p-3 text-center">{enemyRES[enemyLevel]}</td>
                      <td className="border-t p-3 text-center">{enemyATKSpeed[enemyLevel]}</td>
                      <td className="border-t p-3 text-center">{enemyWeight[enemyLevel]}</td>
                      <td className="border-t p-3 text-center">{enemySpeed[enemyLevel]}</td>
                      <td className="border-t p-3 text-center">{enemyRange[enemyLevel] === -1 ? "-" : enemyRange[enemyLevel]}</td>
                      <td className="border-t p-3 text-center">{enemyLPPenalty[enemyLevel]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  )
}