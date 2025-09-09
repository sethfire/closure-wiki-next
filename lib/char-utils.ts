
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

export function getFaction(value: string): string {
  switch (value) {
    case "none": return "No team";
    case "rhodes": return "Rhodes Island";
    case "yan": return "Yan";
    case "lungmen": return "Yan-Lungmen";
    case "egir": return "Ægir";
    case "bolivar": return "Bolívar";
    case "columbia": return "Columbia";
    case "higashi": return "Higashi";
    case "iberia": return "Iberia";
    case "kazimierz": return "Kazimierz";
    case "kjerag": return "Kjerag";
    case "laterano": return "Laterano";
    case "leithanien": return "Leithanien";
    case "minos": return "Minos";
    case "rim": return "Rim Billiton";
    case "sami": return "Sami";
    case "sargon": return "Sargon";
    case "siracusa": return "Siracusa";
    case "ursus": return "Ursus";
    case "victoria": return "Victoria";
    case "elite": return "Rhodes Island-Elite Operator";
    case "sweep": return "S.W.E.E.P.";
    case "babel": return "Babel";
    case "abyssal": return "Abyssal Hunters";
    case "blacksteel": return "Blacksteel Worldwide";
    case "glasgow": return "Glasgow";
    case "karlan": return "Karlan Trade CO., LTD";
    case "lgd": return "Lungmen Guard Department";
    case "penguin": return "Penguin Logistics";
    case "pinus": return "Pinus Sylvestris";
    case "rhine": return "Rhine Lab";
    case "siesta": return "Siesta";
    case "sui": return "Yan-Sui";
    case "dublinn": return "Dublinn";
    case "tara": return "Tara";
    case "action4": return "Op Team A4";
    case "reserve1": return "Reserve Op Team A1";
    case "reserve4": return "Reserve Op Team A4";
    case "reserve6": return "Reserve Op Team A6";
    case "chiave": return "Chiave Gang";
    case "followers": return "Followers";
    case "lee": return "Lee's Detective Agency";
    case "rainbow": return "Team Rainbow";
    case "student": return "Ursus Student Self-Governing Group";
    case "laios": return "Laios's Party";
    default: return "N/A";
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

export function getCharBranch(value: string): string {
  switch (value) {
    case "pioneer": return "Pioneer";
    case "charger": return "Charger";
    case "tactician": return "Tactician";
    case "bearer": return "Standard Bearer";
    case "centurion": return "Centurion";
    case "fighter": return "Fighter";
    case "artsfghter": return "Arts Fighter";
    case "instructor": return "Instructor";
    case "lord": return "Lord";
    case "sword": return "Swordmaster";
    case "musha": return "Soloblade";
    case "fearless": return "Dreadnought";
    case "reaper": return "Reaper";
    case "librator": return "Liberator";
    case "protector": return "Protector";
    case "guardian": return "Guardian";
    case "unyield": return "Juggernaut";
    case "artsprotector": return "Arts Protector";
    case "duelist": return "Duelist";
    case "fortress": return "Fortress";
    case "fastshot": return "Marksman";
    case "closerange": return "Heavyshooter";
    case "aoesniper": return "Artilleryman";
    case "longrange": return "Deadeye";
    case "reaperrange": return "Spreadshooter";
    case "siegesniper": return "Besieger";
    case "bombarder": return "Flinger";
    case "corecaster": return "Core Caster";
    case "splashcaster": return "Splash Caster";
    case "funnel": return "Mech-accord Caster";
    case "phalanx": return "Phalanx Caster";
    case "mystic": return "Mystic Caster";
    case "chain": return "Chain Caster";
    case "blastcaster": return "Blast Caster";
    case "physician": return "Medic";
    case "ringhealer": return "Multi-target Medic";
    case "healer": return "Therapist";
    case "wandermedic": return "Wandering Medic";
    case "slower": return "Decel Binder";
    case "underminer": return "Hexer";
    case "bard": return "Bard";
    case "blessing": return "Abjurer";
    case "summoner": return "Summoner";
    case "craftsman": return "Artificer";
    case "executor": return "Executor";
    case "pusher": return "Push Stroker";
    case "stalker": return "Ambusher";
    case "hookmaster": return "Hookmaster";
    case "geek": return "Geek";
    case "merchant": return "Merchant";
    case "traper": return "Trapmaster";
    case "dollkeeper": return "Dollkeeper";
    case "incantationmedic": return "Incantation Medic";
    case "agent": return "Agent";
    case "shotprotector": return "Sentry Protector";
    case "chainhealer": return "Chain Medic";
    case "crusher": return "Crusher";
    case "ritualist": return "Ritualist";
    case "hunter": return "Hunter";
    case "primcaster": return "Primal Caster";
    case "loopshooter": return "Loopshooter";
    case "hammer": return "Earthshaker";
    case "alchemist": return "Alchemist";
    case "primprotector": return "Primal Protector";
    case "skywalker": return "Skyranger";
    case "soulcaster": return "Shaper Caster";
    default: return "???";
  }
}