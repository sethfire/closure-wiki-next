import CodeBlock from "@/components/code-block"
import Breadcrumbs from "@/components/ui/dynamic-breadcrumb"
import { Separator } from "@/components/ui/separator"
import { getEnemyAttackType, getEnemyAttribute, getEnemyDamageType, getEnemyLevelType, getEnemyMotionType, getEnemyStat, getEnemyTag } from "@/lib/enemy-utils"
import { getEnemy } from "@/lib/fetch-utils"
import { notFound } from 'next/navigation'

export const revalidate = 0;

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data: any = await getEnemy("en", slug);
  if (!data) notFound();
  
  // const cnData: any = await getEnemy("cn", slug);
  // const jpData: any = await getEnemy("jp", slug);
  // const krData: any = await getEnemy("kr", slug);

  const enemyMaxHP         = getEnemyAttribute(data.enemyStats, "maxHp", "-");
  const enemyATK           = getEnemyAttribute(data.enemyStats, "atk", "-");
  const enemyDEF           = getEnemyAttribute(data.enemyStats, "def", "-");
  const enemyRES           = getEnemyAttribute(data.enemyStats, "magicResistance", "-");
  const enemyRange         = getEnemyStat(data.enemyStats, "rangeRadius", "-");
  const enemyWeight        = getEnemyAttribute(data.enemyStats, "massLevel", "-");
  const enemySpeed         = getEnemyAttribute(data.enemyStats, "moveSpeed", "-");
  const enemyATKSpeed      = getEnemyAttribute(data.enemyStats, "baseAttackTime", "-");
  const enemyLPPenalty     = getEnemyStat(data.enemyStats, "lifePointReduce", "1");
  const enemyHPRecovery    = getEnemyAttribute(data.enemyStats, "hpRecoveryPerSec", "-");
  const enemyEffectRES     = getEnemyAttribute(data.enemyStats, "epResistance", "0");
  const enemyElementalRES  = getEnemyAttribute(data.enemyStats, "epDamageResistance", "0");

  let enemyStats = "";
  enemyStats += "{{Enemy stats\n";
  for (let i = 0; i < data.enemyStats.length; i++) {
    enemyStats += `|lv${i} hp = ${enemyMaxHP[i]}\n`;
    enemyStats += `|lv${i} atk = ${enemyATK[i]}\n`;
    enemyStats += `|lv${i} def = ${enemyDEF[i]}\n`;
    enemyStats += `|lv${i} res = ${enemyRES[i]}\n`;
    enemyStats += `|lv${i} eres = ${enemyElementalRES[i]}\n`;
    enemyStats += `|lv${i} erst = ${enemyEffectRES[i]}\n`;
  }
  enemyStats += `|speed = ${enemySpeed[0]}\n`;
  enemyStats += `|interval = ${enemyATKSpeed[0]}\n`;

  if (enemyRange[0] !== -1 && enemyHPRecovery[0] !== "-") enemyStats += `|range = ${enemyRange[0]}\n`;
  if (enemyHPRecovery[0] !== 0 && enemyHPRecovery[0] !== "-") enemyStats += `|regen = ${enemyHPRecovery[0]}\n`;
  enemyStats += `|weight = ${enemyWeight[0]}\n`;
  enemyStats += `|lp = ${enemyLPPenalty[0]}\n`;
  enemyStats += "}}";

  const enemyTag = Array.isArray(data.enemyStats[0].enemyData.enemyTags.m_value) && data.enemyStats[0].enemyData.enemyTags.m_value.length > 0
    ? getEnemyTag(data.enemyStats[0].enemyData.enemyTags.m_value[0])
    : "";
  const enemyType = enemyTag ? `|type    = ${enemyTag}\n` : "";
  const enemyTraits = (data.enemy.abilityList ?? []).map((ability: any) => `*${ability.text.trim()}`).join("\n");

  let enemyAppearances = "";
  if (data.enemyAppearances) {
    data.enemyAppearances.forEach((appearance: any) => {
      enemyAppearances += `[[${appearance.code}]] `;
    });
  }

  const output =
`{{Enemy infobox
|name    = ${data.enemy.name}
|code    = ${data.enemy.enemyIndex}
|name    = ${data.enemy.name}
${enemyType}|grade   = ${getEnemyLevelType(data.enemy.enemyLevel)}
|attack  = ${getEnemyAttackType(data.enemyStats[0].enemyData.applyWay.m_value)}
|damage  = ${data.enemy.damageType.map((type: string) => getEnemyDamageType(type)).join("/")}
|target  = ${getEnemyMotionType(data.enemyStats[0].enemyData.motion.m_value)}
|trait   = ${enemyTraits ? "\n" + enemyTraits : ""}
|form1   = <!-- If enemy has multiple forms, otherwise delete these -->
|form2   = 
|form3   = 
|form4   = 
|intro   = <!-- Event where this enemy was introduced -->
|base    = <!-- Name of base form, if any -->
|upgrade = <!-- Name of upgraded form, if any -->
}}
'''${data.enemy.name}''' is ${data.enemy.enemyLevel === "ELITE" ? "an" : "a"} [[${data.enemy.enemyLevel.toLowerCase()} enemy]] in ''[[Arknights]]''.

{{Enemy description|${data.enemy.description}}}

==Overview==
<!-- Overview of the enemy's abilities -->
{{Enemy ability head}}
{{Enemy ability cell|info=|type=|initcd=|cd=}}
{{Table end}}

==Appearances==
{{Appearances
|side story =
}}

==Stats==
${enemyStats}
<!-- TODO: Enemy resistances -->

<!-- Replace with correct year, if needed -->
{{Y7 enemies}}`

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 mx-auto w-full max-w-6xl">
      <section>
        <div className="flex justify-between mb-2">
          <Breadcrumbs items={[
            { label: "Home", href: "/en/home" },
            { label: "Enemies", href: "/en/enemies" },
            { label: data.enemy.name, href: `/en/enemies/${data.meta.slug}` },
            { label: "Export" }
          ]} />
        </div>
        <div className="flex justify-between mb-2">
          <h1 className="text-2xl font-semibold">Export: {data.enemy.name}</h1>
        </div>
        <Separator />
      </section>
      <section>
        <CodeBlock code={output} language="wiki" />
      </section>
    </div>
  )
}