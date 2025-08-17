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

export const revalidate = 86400
export const dynamicParams = true

const getEnemy = async (slug: string) => {
  const response: any = await fetch(`https://api.closure.wiki/en/enemies/${slug}`);
  if (!response.ok) notFound();

  const data: any = await response.json();
  if (!data) notFound();

  return data;
}

export async function generateStaticParams() {
  const chars: any[] = await fetch('https://api.closure.wiki/en/enemies').then((res) => res.json())
  return chars.slice(0, 10).map((char) => ({
    slug: char.slug,
  }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const data: any = await getEnemy(slug);
  return {
    title: data.enemy.name,
    description: data.enemy.description,
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data: any = await getEnemy(slug);

  return (
    <div className="flex flex-1 flex-col gap-8 p-4 mx-auto w-full max-w-6xl">
      <section>
        <Breadcrumb className="mb-2">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/en/home">Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem><BreadcrumbLink href="/en/enemies">Enemies</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem><BreadcrumbPage>{data.meta.name}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex justify-between mb-2">
          <h1 className="text-2xl font-semibold">{data.meta.name}</h1>
        </div>
        <div className="mb-4 text-sm flex flex-row gap-4">
          <span>
            <span className="text-muted-foreground">Release Date (CN): </span>
            {new Date(0).toLocaleDateString()}
          </span>
          <span>
            <span className="text-muted-foreground">Release Date (EN): </span>
            {data.meta.isUnreleased ? "Unreleased" : new Date(0).toLocaleDateString()}
          </span>
        </div>
        <Separator className="mb-4" />
        <div className="flex flex-row gap-4">
          <img src={`https://static.closure.wiki/v1/enemies/${data.enemy.enemyId}.webp`} alt={`${data.enemy.enemyId}`} width={128} height={128} className="object-contain" />
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex flex-row gap-4 items-center text-sm">
              <span>
                <span className="text-muted-foreground">Code: </span>
                {data.enemy.enemyIndex}
              </span>
              <span>
                <span className="text-muted-foreground">Type: </span>
                {(() => {
                  switch (data.enemy.enemyLevel) {
                    case "NORMAL": return "Normal";
                    case "ELITE": return "Elite";
                    case "BOSS": return "Boss";
                    default: return "";
                  }
                })()}
              </span>
              <span>
                <span className="text-muted-foreground">Attack Pattern: </span>
                {(() => {
                  switch (data.enemyStats[0].enemyData.applyWay.m_value) {
                    case "MELEE": return "Melee";
                    case "RANGED": return "Ranged";
                    case "ALL": return "Melee/Ranged";
                    case "NONE": return "None";
                    default: return data.enemyStats[0].enemyData.applyWay.m_value;
                  }
                })()}
              </span>
              <span>
                <span className="text-muted-foreground">Damage: </span>
                {data.enemy.damageType
                  .map((type: string) => {
                    switch (type) {
                      case "PHYSIC": return "Physical";
                      case "MAGIC": return "Arts";
                      case "NO_DAMAGE": return "None";
                      default: return type;
                    }
                  })
                  .join("/")
                }
              </span>
              <span>
                <span className="text-muted-foreground">Location: </span>
                {(() => {
                  switch (data.enemyStats[0].enemyData.motion.m_value) {
                    case "WALK": return "Ground";
                    case "FLY": return "Flying";
                    default: return data.enemyStats[0].enemyData.motion.m_value;
                  }
                })()}
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
                    : (<li key={index} className="list-disc list-item items-center mb-1">{ability.text}</li>) 
              )}
          </ul>
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