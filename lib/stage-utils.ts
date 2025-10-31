export function getStageType(value: string): string {
  switch (value) {
    case "MAIN": return "Main Theme";
    case "SUB": return "Sub Operation";
    case "ACTIVITY": return "Event";
    case "DAILY": return "Supply";
    case "CAMPAIGN": return "Annihilation";
    case "CLIMB_TOWER": return "SSS";
    default: return value;
  }
}