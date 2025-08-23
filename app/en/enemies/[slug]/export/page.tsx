import CodeBlock from "@/components/code-block"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { getEnemyAttackType, getEnemyDamageType, getEnemyLevelType, getEnemyMotionType, getEnemyTag } from "@/lib/enemy-utils"
import { getEnemy } from "@/lib/fetch-utils"
import { notFound } from 'next/navigation'

export const revalidate = 0

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data: any = await getEnemy(slug);
  if (!data) notFound();

  let enemyStats = "";
  enemyStats += "{{Enemy infobox";
  enemyStats += `|lv0 hp = ${data.enemyStats[0].enemyData.hp}\n`;
  const enemyTag = Array.isArray(data.enemyStats[0].enemyData.enemyTags.m_value) && data.enemyStats[0].enemyData.enemyTags.m_value.length > 0
    ? getEnemyTag(data.enemyStats[0].enemyData.enemyTags.m_value[0])
    : "";
  const enemyTraits = (data.enemy.abilityList ?? []).map((ability: any) => `*${ability.text.trim()}`).join("\n");

  const output =
  `{{Enemy infobox
|name = ${data.enemy.name}
|code = ${data.enemy.enemyIndex}
|cnname = 
|jpname = 
|krname = 
|type = ${enemyTag}
|grade = ${getEnemyLevelType(data.enemy.enemyLevel)}
|attack = ${getEnemyAttackType(data.enemyStats[0].enemyData.applyWay.m_value)}
|damage = ${data.enemy.damageType.map((type: string) => getEnemyDamageType(type)).join("/")}
|target = ${getEnemyMotionType(data.enemyStats[0].enemyData.motion.m_value)}
|trait = ${enemyTraits ? "\n" + enemyTraits : ""}
}}
'''${data.enemy.name}''' is a [[${data.enemy.enemyLevel.toLowerCase()} enemy]] in ''[[Arknights]]''.

{{Enemy description|${data.enemy.description}}}
`

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 mx-auto w-full max-w-6xl">
      <section>
        <div className="flex justify-between mb-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="/en/home">Home</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem><BreadcrumbLink href="/en/enemies">Enemies</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem><BreadcrumbLink href={`/en/enemies/${data.meta.slug}`}>{data.meta.name}</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem><BreadcrumbPage>Export</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex justify-between mb-2">
          <h1 className="text-2xl font-semibold">Export: {data.meta.name}</h1>
        </div>
        <Separator />
      </section>
      <section>
        <CodeBlock code={output} language="plaintext" />
      </section>
    </div>
  )
}