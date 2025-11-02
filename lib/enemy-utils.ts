export function getEnemyRarityColor(value: string): string {
  switch (value) {
    case "NORMAL": return "#A0A0A0";
    case "ELITE": return "#FFFFA9";
    case "BOSS": return "#FF0000";
    default: return "#A0A0A0";
  }
}

export function getEnemyLevelType(value: string): string {
  switch (value) {
    case "NORMAL": return "Normal";
    case "ELITE": return "Elite";
    case "BOSS": return "Boss";
    default: return value;
  }
}

export function getEnemyAttackType(value: string): string {
  switch (value) {
    case "MELEE": return "Melee";
    case "RANGED": return "Ranged";
    case "ALL": return "Melee/Ranged";
    case "NONE": return "None";
    default: return value;
  }
}

export function getEnemyMotionType(value: string): string {
  switch (value) {
    case "WALK": return "Ground";
    case "FLY": return "Aerial";
    default: return value;
  }
}

export function getEnemyDamageType(value: string): string {
  switch (value) {
    case "PHYSIC": return "Physical";
    case "MAGIC": return "Arts";
    case "NO_DAMAGE": return "None";
    default: return value;
  }
}

export function getEnemyTag(value: string): string {
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
    case "origen": return "Originium Creation";
    default: return value;
  }
}

export const ENEMY_RESISTANCES = [
  { key: "silenceImmune", label: "Silence" },
  { key: "stunImmune", label: "Stun" },
  { key: "frozenImmune", label: "Frozen" },
  { key: "levitateImmune", label: "Levitate" },
  { key: "sleepImmune", label: "Sleep" },
  { key: "disarmedCombatImmune", label: "Frighten" },
  { key: "fearedImmune", label: "Fear" },
  { key: "palsyImmune", label: "Paralysis" },
  { key: "attractImmune", label: "Lure" },
];

export function getEnemyStat(enemyStats: any[], field: string, defaultValue: any){
  const result: any[] = [];

  enemyStats.forEach((stat, idx) => {
    const defined = stat.enemyData[field]?.m_defined;
    const value   = stat.enemyData[field]?.m_value;

    if (idx === 0) result[idx] = defined ? value : defaultValue;
    else result[idx] = defined ? value : result[idx - 1];
  });

  return result;
}

export function getEnemyAttribute(enemyStats: any[], field: string, defaultValue: any){
  const result: any[] = [];

  enemyStats.forEach((stat, idx) => {
    const defined = stat.enemyData.attributes[field].m_defined;
    const value   = stat.enemyData.attributes[field].m_value;

    if (idx === 0) result[idx] = defined ? value : defaultValue;
    else result[idx] = defined ? value : result[idx - 1];
  });

  return result;
}