
export function getCharRarity(value: string): number {
  switch (value) {
    case "TIER_1": return 1;
    case "TIER_2": return 2;
    case "TIER_3": return 3;
    case "TIER_4": return 4;
    case "TIER_5": return 5;
    case "TIER_6": return 6;
    default: return 0;
  }
}

export function getCharRarityColor(value: string): string {
  switch (value) {
    case "TIER_1": return "#A0A0A0";
    case "TIER_2": return "#DCDC00";
    case "TIER_3": return "#00AAEE";
    case "TIER_4": return "#D6C5D6";
    case "TIER_5": return "#FFFFA9";
    case "TIER_6": return "#FFC800";
    default: return "";
  }
}

export function getCharClass(value: string): string {
  switch (value) {
    case "PIONEER": return "Vanguard";
    case "WARRIOR": return "Guard";
    case "SNIPER": return "Sniper";
    case "CASTER": return "Caster";
    case "MEDIC": return "Medic";
    case "SUPPORT": return "Supporter";
    case "TANK": return "Defender";
    case "SPECIAL": return "Specialist";
    case "TRAP": return "Trap";
    case "TOKEN": return "Token";
    default: return "???";
  }
}