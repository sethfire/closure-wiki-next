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

import { AlertCircleIcon, Flag, TriangleAlert } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

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
    openGraph: {
      title: data.enemy.name,
      description: data.enemy.description,
      url: `https://arknights.closure.wiki/en/enemies/${slug}`,
      siteName: "Closure Wiki",
      images: [{ url: `https://static.closure.wiki/v1/enemies/${data.enemy.enemyId}.webp` }]
    },
    twitter: {
      card: "summary",
      title: data.enemy.name,
      description: data.enemy.description,
      images: `https://static.closure.wiki/v1/enemies/${data.enemy.enemyId}.webp`,
    },
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
        {data.meta.isUnreleased && (
          <Alert className="mb-4">
            <AlertCircleIcon />
            <AlertTitle>This enemy is not yet available on the EN server of Arknights.</AlertTitle>
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

      {data.enemyStats && data.enemyStats.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Attributes</h2>
          <Separator className="mb-4" />
          <h2 className="text-xl font-semibold mb-2">Level 0</h2>
          <table className="w-full table-fixed border-collapse bg-muted text-center mb-4">
            <colgroup>
              <col className="w-1/6" />
              <col className="w-1/6" />
              <col className="w-1/6" />
              <col className="w-1/6" />
              <col className="w-1/6" />
              <col className="w-1/6" />
            </colgroup>
            <tbody>
              <tr className="bg-card">
                <th className="border p-1" colSpan={2}>Name</th>
                <th className="border p-1" colSpan={2}>Level</th>
                <th className="border p-1" colSpan={2}>Type</th>
              </tr>
              <tr>
                <td className="border p-1" colSpan={2}>{data.enemyStats[0].enemyData.name.m_value}</td>
                <td className="border p-1" colSpan={2}>{data.enemyStats[0].enemyData.levelType.m_value}</td>
                <td className="border p-1" colSpan={2}>-</td>
              </tr>
              <tr className="bg-card">
                <th className="border p-1" colSpan={6}>Description</th>
              </tr>
              <tr>
                <td className="border p-1" colSpan={6}>{data.enemyStats[0].enemyData.description.m_value}</td>
              </tr>
              <tr>
                <th className="border py-3 p-1 bg-card">Attack Pattern</th>
                <td className="border py-3 p-1">{(() => {
                  switch (data.enemyStats[0].enemyData.applyWay.m_value) {
                    case "MELEE": return "Melee";
                    case "RANGED": return "Ranged";
                    case "ALL": return "Melee/Ranged";
                    case "NONE": return "None";
                    default: return data.enemyStats[0].enemyData.applyWay.m_value;
                  }
                })()}</td>
                <th className="border py-3 p-1 bg-card">Location</th>
                <td className="border py-3 p-1">{(() => {
                  switch (data.enemyStats[0].enemyData.motion.m_value) {
                    case "WALK": return "Ground";
                    case "FLY": return "Flying";
                    default: return data.enemyStats[0].enemyData.motion.m_value;
                  }
                })()}</td>
                <th className="border py-3 p-1 bg-card">HP Recovery</th>
                <td className="border py-3 p-1">{data.enemyStats[0].enemyData.hpRecoveryPerSec?.m_value ?? "-"}</td>
              </tr>
              <tr className="bg-card">
                <th className="border py-3 p-1">HP</th>
                <th className="border py-3 p-1">ATK</th>
                <th className="border py-3 p-1">DEF</th>
                <th className="border py-3 p-1">RES</th>
                <th className="border py-3 p-1">Attack Range</th>
                <th className="border py-3 p-1">Weight</th>
              </tr>
              <tr>
                <td className="border p-1">{data.enemyStats[0].enemyData.attributes.maxHp?.m_value}</td>
                <td className="border p-1">{data.enemyStats[0].enemyData.attributes.atk?.m_value}</td>
                <td className="border p-1">{data.enemyStats[0].enemyData.attributes.def?.m_value}</td>
                <td className="border p-1">{data.enemyStats[0].enemyData.attributes.magicResistance?.m_value}</td>
                <td className="border p-1">{data.enemyStats[0].enemyData.rangeRadius?.m_value === -1 
                ? "-" : data.enemyStats[0].enemyData.rangeRadius?.m_value}</td>
                <td className="border p-1">{data.enemyStats[0].enemyData.attributes.massLevel?.m_value}</td>
              </tr>
              <tr className="bg-card">
                <th className="border py-3 p-1">Movement Speed</th>
                <th className="border py-3 p-1">Attack Interval</th>
                <th className="border py-3 p-1">Damage Resistance</th>
                <th className="border py-3 p-1">Elemental Resistance</th>
                <th className="border py-3 p-1">Taunt Level</th>
                <th className="border py-3 p-1">Life Point Penalty</th>
              </tr>
              <tr>
                <td className="border p-1">{data.enemyStats[0].enemyData.attributes.moveSpeed?.m_value}</td>
                <td className="border p-1">{data.enemyStats[0].enemyData.attributes.baseAttackTime?.m_value}</td>
                <td className="border p-1">{data.enemyStats[0].enemyData.attributes.epDamageResistance?.m_value}</td>
                <td className="border p-1">{data.enemyStats[0].enemyData.attributes.epResistance?.m_value}</td>
                <td className="border p-1">{data.enemyStats[0].enemyData.attributes.tauntLevel?.m_value}</td>
                <td className="border p-1">{data.enemyStats[0].enemyData.lifePointReduce?.m_value}</td>
              </tr>
              <tr>
                <th className="border py-3 p-1 bg-card">Resistances</th>
                <td className="border py-3 p-1" colSpan={5}>{(() => {
                  const immunities = [
                    { key: "stunImmune", label: "Stun" },
                    { key: "silenceImmune", label: "Silence" },
                    { key: "sleepImmune", label: "Sleep" },
                    { key: "frozenImmune", label: "Freezing" },
                    { key: "levitateImmune", label: "Levitate" },
                    { key: "disarmedCombatImmune", label: "Disarm" },
                    { key: "fearedImmune", label: "Fear" },
                    { key: "palsyImmune", label: "Palsy" },
                    { key: "attractImmune", label: "Attract" },
                  ];
                  const attributes = data.enemyStats[0].enemyData.attributes;
                  const active = immunities
                    .filter(({ key }) => attributes[key]?.m_value)
                    .map(({ label }) => label);
                  return active.length > 0 ? active.join(", ") : "-";
                })()}</td>
              </tr>
            </tbody>
          </table>
          {data.enemyStats[1] && (
            <>
            <h2 className="text-xl font-semibold mb-2">Level 1</h2>
            <table className="w-full table-fixed border-collapse bg-muted text-center">
              <colgroup>
                <col className="w-1/6" />
                <col className="w-1/6" />
                <col className="w-1/6" />
                <col className="w-1/6" />
                <col className="w-1/6" />
                <col className="w-1/6" />
              </colgroup>
              <tbody>
                <tr className="bg-card">
                  <th className="border p-1" colSpan={2}>Name</th>
                  <th className="border p-1" colSpan={2}>Level</th>
                  <th className="border p-1" colSpan={2}>Type</th>
                </tr>
                <tr>
                  <td className="border p-1" colSpan={2}>{data.enemyStats[0].enemyData.name.m_value}</td>
                  <td className="border p-1" colSpan={2}>{data.enemyStats[0].enemyData.levelType.m_value}</td>
                  <td className="border p-1" colSpan={2}>-</td>
                </tr>
                <tr className="bg-card">
                  <th className="border p-1" colSpan={6}>Description</th>
                </tr>
                <tr>
                  <td className="border p-1" colSpan={6}>{data.enemyStats[0].enemyData.description.m_value}</td>
                </tr>
                <tr>
                  <th className="border py-3 p-1 bg-card">Attack Pattern</th>
                  <td className="border py-3 p-1">{(() => {
                    switch (data.enemyStats[0].enemyData.applyWay.m_value) {
                      case "MELEE": return "Melee";
                      case "RANGED": return "Ranged";
                      case "ALL": return "Melee/Ranged";
                      case "NONE": return "None";
                      default: return data.enemyStats[0].enemyData.applyWay.m_value;
                    }
                  })()}</td>
                  <th className="border py-3 p-1 bg-card">Location</th>
                  <td className="border py-3 p-1">{(() => {
                    switch (data.enemyStats[0].enemyData.motion.m_value) {
                      case "WALK": return "Ground";
                      case "FLY": return "Flying";
                      default: return data.enemyStats[0].enemyData.motion.m_value;
                    }
                  })()}</td>
                  <th className="border py-3 p-1 bg-card">HP Recovery</th>
                  <td className="border py-3 p-1">{data.enemyStats[1].enemyData.hpRecoveryPerSec?.m_value ?? "-"}</td>
                </tr>
                <tr className="bg-card">
                  <th className="border py-3 p-1">HP</th>
                  <th className="border py-3 p-1">ATK</th>
                  <th className="border py-3 p-1">DEF</th>
                  <th className="border py-3 p-1">RES</th>
                  <th className="border py-3 p-1">Attack Range</th>
                  <th className="border py-3 p-1">Weight</th>
                </tr>
                <tr>
                  <td className="border p-1">{data.enemyStats[1].enemyData.attributes.maxHp?.m_defined ? data.enemyStats[1].enemyData.attributes.maxHp?.m_value : data.enemyStats[0].enemyData.attributes.maxHp?.m_value}</td>

                  <td className="border p-1">{data.enemyStats[1].enemyData.attributes.atk?.m_defined ? data.enemyStats[1].enemyData.attributes.atk?.m_value : data.enemyStats[0].enemyData.attributes.atk?.m_value}</td>

                  <td className="border p-1">{data.enemyStats[1].enemyData.attributes.def?.m_defined ? data.enemyStats[1].enemyData.attributes.def?.m_value : data.enemyStats[0].enemyData.attributes.def?.m_value}</td>

                  <td className="border p-1">{data.enemyStats[1].enemyData.attributes.magicResistance?.m_defined ? data.enemyStats[1].enemyData.attributes.magicResistance?.m_value : data.enemyStats[0].enemyData.attributes.magicResistance?.m_value}</td>

                  <td className="border p-1">{data.enemyStats[1].enemyData.rangeRadius?.m_defined ? data.enemyStats[1].enemyData.rangeRadius?.m_value : data.enemyStats[0].enemyData.rangeRadius?.m_value}</td>

                  <td className="border p-1">{data.enemyStats[1].enemyData.attributes.massLevel?.m_defined ? data.enemyStats[1].enemyData.attributes.massLevel?.m_value : data.enemyStats[0].enemyData.attributes.massLevel?.m_value}</td>
                </tr>
                <tr className="bg-card">
                  <th className="border py-3 p-1">Movement Speed</th>
                  <th className="border py-3 p-1">Attack Interval</th>
                  <th className="border py-3 p-1">Damage Resistance</th>
                  <th className="border py-3 p-1">Elemental Resistance</th>
                  <th className="border py-3 p-1">Taunt Level</th>
                  <th className="border py-3 p-1">Life Point Penalty</th>
                </tr>
                <tr>
                  <td className="border p-1">{data.enemyStats[1].enemyData.attributes.epDamageResistance?.m_defined ? data.enemyStats[1].enemyData.attributes.moveSpeed?.m_value : data.enemyStats[0].enemyData.attributes.moveSpeed?.m_value}</td>

                  <td className="border p-1">{data.enemyStats[1].enemyData.attributes.baseAttackTime?.m_defined ? data.enemyStats[1].enemyData.attributes.baseAttackTime?.m_value : data.enemyStats[0].enemyData.attributes.baseAttackTime?.m_value}</td>

                  <td className="border p-1">{data.enemyStats[1].enemyData.attributes.epDamageResistance?.m_defined ? data.enemyStats[1].enemyData.attributes.epDamageResistance?.m_value : data.enemyStats[0].enemyData.attributes.epDamageResistance?.m_value}</td>

                  <td className="border p-1">{data.enemyStats[1].enemyData.attributes.epResistance?.m_defined ? data.enemyStats[1].enemyData.attributes.epResistance?.m_value : data.enemyStats[0].enemyData.attributes.epResistance?.m_value}</td>

                  <td className="border p-1">{data.enemyStats[1].enemyData.attributes.tauntLevel?.m_defined ? data.enemyStats[1].enemyData.attributes.tauntLevel?.m_value : data.enemyStats[0].enemyData.attributes.tauntLevel?.m_value}</td>

                  <td className="border p-1">{data.enemyStats[1].enemyData.lifePointReduce?.m_defined ? data.enemyStats[1].enemyData.lifePointReduce?.m_value : data.enemyStats[0].enemyData.lifePointReduce?.m_value}</td>
                </tr>
                <tr>
                  <th className="border py-3 p-1 bg-card">Resistances</th>
                  <td className="border py-3 p-1" colSpan={5}>{(() => {
                    const immunities = [
                      { key: "stunImmune", label: "Stun" },
                      { key: "silenceImmune", label: "Silence" },
                      { key: "sleepImmune", label: "Sleep" },
                      { key: "frozenImmune", label: "Freezing" },
                      { key: "levitateImmune", label: "Levitate" },
                      { key: "disarmedCombatImmune", label: "Disarm" },
                      { key: "fearedImmune", label: "Fear" },
                      { key: "palsyImmune", label: "Palsy" },
                      { key: "attractImmune", label: "Attract" },
                    ];
                    const attributes = data.enemyStats[0].enemyData.attributes;
                    const active = immunities
                      .filter(({ key }) => attributes[key]?.m_value)
                      .map(({ label }) => label);
                    return active.length > 0 ? active.join(", ") : "-";
                  })()}</td>
                </tr>
              </tbody>
            </table>
            </>
          )}
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