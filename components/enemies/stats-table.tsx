import { parseRichText } from "@/lib/parse";

function getMaxHPRating(value: number): string {
  if (value >= 500_000) return "SS";
  if (value >= 250_000) return "S+";
  if (value >= 100_000) return "S";
  if (value >=  25_000) return "A+";
  if (value >=  12_000) return "A";
  if (value >=   8_000) return "B+";
  if (value >=   5_000) return "B";
  if (value >=   3_500) return "C";
  if (value >=   1_000) return "D";
  if (value >=       0) return "E";
  return "Error";
}

function getMaxATKRating(value: number): string {
  if (value >= 5_000) return "SS";
  if (value >= 3_000) return "S+";
  if (value >= 2_000) return "S";
  if (value >= 1_500) return "A+";
  if (value >= 1_000) return "A";
  if (value >=   700) return "B+";
  if (value >=   500) return "B";
  if (value >=   300) return "C";
  if (value >=   200) return "D";
  if (value >=     0) return "E";
  return "Error";
}

function getMaxDEFRating(value: number): string {
  if (value >= 5_000) return "SS";
  if (value >= 3_000) return "S+";
  if (value >= 2_000) return "S";
  if (value >= 1_200) return "A+";
  if (value >= 1_000) return "A";
  if (value >=   800) return "B+";
  if (value >=   500) return "B";
  if (value >=   200) return "C";
  if (value >=   100) return "D";
  if (value >=     0) return "E";
  return "Error";
}

function getMaxRESRating(value: number): string {
  if (value >= 90) return "SS";
  if (value >= 80) return "S+";
  if (value >= 70) return "S";
  if (value >= 60) return "A+";
  if (value >= 50) return "A";
  if (value >= 30) return "B+";
  if (value >= 20) return "B";
  if (value >= 10) return "C";
  if (value >=  1) return "D";
  if (value >=  0) return "E";
  return "Error";
}

function getAttackSpeedRating(value: number): string {
  if (value >= 6.9) return "E";
  if (value >= 5.0) return "D";
  if (value >= 3.5) return "C";
  if (value >= 2.6) return "B";
  if (value >= 1.7) return "B+";
  if (value >= 1.2) return "A";
  if (value >= 1.0) return "A+";
  if (value >= 0.8) return "S";
  if (value >= 0.5) return "S+";
  if (value >= 0.0) return "SS";
  return "Error";
}

function getMoveSpeedRating(value: number): string {
  if (value >= 2.0) return "SS";
  if (value >= 1.8) return "S+";
  if (value >= 1.5) return "S";
  if (value >= 1.2) return "A+";
  if (value >= 1.0) return "A";
  if (value >= 0.9) return "B+";
  if (value >= 0.7) return "B";
  if (value >= 0.5) return "C";
  if (value >= 0.3) return "D";
  if (value >= 0.0) return "E";
  return "Error";
}

function getEnemyLevelType(value: string): string {
  switch (value) {
    case "NORMAL": return "Normal";
    case "ELITE": return "Elite";
    case "BOSS": return "Boss";
    default: return "-";
  }
}

function getEnemyAttackType(value: string): string {
  switch (value) {
    case "MELEE": return "Melee";
    case "RANGED": return "Ranged";
    case "ALL": return "Melee/Ranged";
    case "NONE": return "None";
    default: return "-";
  }
}

function getEnemyMotionType(value: string): string {
  switch (value) {
    case "WALK": return "Ground";
    case "FLY": return "Aerial";
    default: return "-";
  }
}

function getEnemyTag(value: string): string {
  switch (value) {
    case "infection": return "Infected Creature";
    case "drone": return "Drone";
    case "sarkaz": return "Sarkaz";
    case "mutant": return "Possessed";
    case "seamonster": return "Sea Monster";
    case "originiumartscraft": return "Arts Creation";
    case "animated": return "Apparition";
    case "machine": return "Machina";
    case "wildanimal": return "Wild Beast";
    case "collapsal": return "Collapsal";
    case "origen": return "源石造物";
    default: return "-";
  }
}

const IMMUNITIES = [
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

function getEnemyStat(enemyStats: any[], field: string, defaultValue: any){
  const result: any[] = [];

  enemyStats.forEach((stat, idx) => {
    const defined = stat.enemyData[field]?.m_defined;
    const value   = stat.enemyData[field]?.m_value;

    if (idx === 0) result[idx] = defined ? value : defaultValue;
    else result[idx] = defined ? value : result[idx - 1];
  });

  return result;
}

function getEnemyAttribute(enemyStats: any[], field: string, defaultValue: any){
  const result: any[] = [];

  enemyStats.forEach((stat, idx) => {
    const defined = stat.enemyData.attributes[field].m_defined;
    const value   = stat.enemyData.attributes[field].m_value;

    if (idx === 0) result[idx] = defined ? value : defaultValue;
    else result[idx] = defined ? value : result[idx - 1];
  });

  return result;
}

export default function StatsTable({ enemyStats }: { enemyStats: any[] }) {

  const enemyName          = getEnemyStat(enemyStats, "name", "-");
  const enemyLevelType     = getEnemyStat(enemyStats, "levelType", "NORMAL");
  const enemyTags          = getEnemyStat(enemyStats, "enemyTags", []);
  const enemyDescription   = getEnemyStat(enemyStats, "description", "-");
  const enemyAttackType    = getEnemyStat(enemyStats, "applyWay", "-");
  const enemyMotionType    = getEnemyStat(enemyStats, "motion", "-");

  const enemyHPRecovery    = getEnemyAttribute(enemyStats, "hpRecoveryPerSec", "-");
  const enemyMaxHP         = getEnemyAttribute(enemyStats, "maxHp", "-");
  const enemyATK           = getEnemyAttribute(enemyStats, "atk", "-");
  const enemyDEF           = getEnemyAttribute(enemyStats, "def", "-");
  const enemyRES           = getEnemyAttribute(enemyStats, "magicResistance", "-");
  const enemyRange         = getEnemyStat(enemyStats, "rangeRadius", "-");
  const enemyWeight        = getEnemyAttribute(enemyStats, "massLevel", "-");
  const enemySpeed         = getEnemyAttribute(enemyStats, "moveSpeed", "-");
  const enemyATKSpeed      = getEnemyAttribute(enemyStats, "baseAttackTime", "-");
  const enemyElementalRES  = getEnemyAttribute(enemyStats, "epResistance", "0");
  const enemyEffectRES     = getEnemyAttribute(enemyStats, "epDamageResistance", "0");

  const enemyTauntLevel    = getEnemyAttribute(enemyStats, "tauntLevel", "0");
  const enemyLifePointPenalty = getEnemyStat(enemyStats, "lifePointReduce", "-");

  const enemyLevels = enemyStats.map((_, i) => i);

  return (
    <>
      {enemyLevels.map((level: number) => (
        <div className="mb-4" key={level}>
          <h2 className="text-xl font-semibold mb-2">Level {level}</h2>
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
                <td className="border p-1" colSpan={2}>{enemyName[level]}</td>
                <td className="border p-1" colSpan={2}>{getEnemyLevelType(enemyLevelType[level])}</td>
                <td className="border p-1" colSpan={2}>{(() => {
                  if (Array.isArray(enemyTags[level]) && enemyTags[level].length > 0) {
                    const enemyTag = enemyTags[level].map((tag: string) => getEnemyTag(tag));
                    return enemyTag.length > 0 ? enemyTag.join(", ") : "-";
                  }
                  return "-";
                })()}</td>
              </tr>
              <tr className="bg-card"><th className="border p-1" colSpan={6}>Description</th></tr>
              <tr><td className="border p-1" colSpan={6}>{parseRichText(enemyDescription[level])}</td></tr>
              <tr>
                <th className="border p-1 bg-card">Attack Pattern</th>
                <td className="border p-1">{getEnemyAttackType(enemyAttackType[level])}</td>
                <th className="border p-1 bg-card">Location</th>
                <td className="border p-1">{getEnemyMotionType(enemyMotionType[level])}</td>
                <th className="border p-1 bg-card">HP Recovery</th>
                <td className="border p-1">{enemyHPRecovery[level]}</td>
              </tr>
              <tr className="bg-card">
                <th className="border p-1">HP</th>
                <th className="border p-1">ATK</th>
                <th className="border p-1">DEF</th>
                <th className="border p-1">RES</th>
                <th className="border p-1">Attack Range</th>
                <th className="border p-1">Weight</th>
              </tr>
              <tr>
                <td className="border p-1">{enemyMaxHP[level]}<br /><strong>{getMaxHPRating(enemyMaxHP[level])}</strong></td>
                <td className="border p-1">{enemyATK[level]}<br /><strong>{getMaxATKRating(enemyATK[level])}</strong></td>
                <td className="border p-1">{enemyDEF[level]}<br /><strong>{getMaxDEFRating(enemyDEF[level])}</strong></td>
                <td className="border p-1">{enemyRES[level]}<br /><strong>{getMaxRESRating(enemyRES[level])}</strong></td>
                <td className="border p-1">{enemyRange[level] === -1 ? "-" : enemyRange[level]}</td>
                <td className="border p-1">{enemyWeight[level]}</td>
              </tr>
              <tr className="bg-card">
                <th className="border p-1">Movement Speed</th>
                <th className="border p-1">Attack Interval</th>
                <th className="border p-1">Effect Resistance</th>
                <th className="border p-1">Elemental Resistance</th>
                <th className="border p-1">Taunt Level</th>
                <th className="border p-1">Life Point Penalty</th>
              </tr>
              <tr>
                <td className="border p-1">{enemySpeed[level]}<br /><strong>{getMoveSpeedRating(enemySpeed[level])}</strong></td>
                <td className="border p-1">{enemyATKSpeed[level]}<br /><strong>{getAttackSpeedRating(enemyATKSpeed[level])}</strong></td>
                <td className="border p-1">{enemyElementalRES[level]}<br /><strong>E</strong></td>
                <td className="border p-1">{enemyEffectRES[level]}<br /><strong>E</strong></td>
                <td className="border p-1">{enemyTauntLevel[level]}</td>
                <td className={`border p-1 ${enemyLifePointPenalty[level] > 0 ? 'text-destructive' : 'text-green-500'}`}>{enemyLifePointPenalty[level]}</td>
              </tr>
              <tr>
                <th className="border p-1 bg-card">Resistances</th>
                <td className="border p-1" colSpan={5}>{(() => {
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
                  const attributes = enemyStats[0].enemyData.attributes;
                  const active = immunities
                    .filter(({ key }) => attributes[key]?.m_value)
                    .map(({ label }) => label);
                  return active.length > 0 ? active.join(", ") : "-";
                })()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </>
  )
}