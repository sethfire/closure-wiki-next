import { getModuleImg, getModuleImgThumbnail } from "@/lib/image-utils";
import { parseRichText } from "@/lib/parse";

function getStatName(value: string): string {
  switch(value) {
    case "max_hp": return "HP";
    case "atk": return "ATK";
    case "def": return "DEF";
    case "magic_res": return "RES";
    case "revive_up": return "Redeploy";
    case "cost": return "Cost";
    case "block_num": return "Block";
    case "attack_speed": return "ASPD";
    default: return value;
  }
}

export default function OperatorModules({ charModules, moduleMissions, moduleData, items }: { charModules: any, moduleMissions: any, moduleData: any, items: any[] }) {
  if (!charModules || Object.keys(charModules).length === 0) {
    return <div className="text-muted-foreground italic">Module data unavailable.</div>;
  }

  const modules: any = [];
  Object.entries(charModules).forEach(([key, module]: [string, any]) => {
    if (module.type === 'INITIAL') return;

    const name = module.uniEquipName;
    const type = module.type;
    const typeName = (module.type === "ADVANCED") ? `${module.typeName1}-${module.typeName2}` : "Original";
    const description = module.uniEquipDesc;
    const image = module.uniEquipIcon ? getModuleImgThumbnail(module.uniEquipIcon) : null;

    const missionList = Array.isArray(module.missionList) ? module.missionList : [];
    const missions = missionList.map((missionId: string) => moduleMissions[missionId]).filter(Boolean);
    
    const modulePhases = moduleData?.[key]?.phases || [];

    const phases = modulePhases.map((phase: any, phaseIndex: number) => {
      const level = phaseIndex + 1;
      const stats = phase.attributeBlackboard || {};
      
      const traitMods: string[] = [];
      if (phase.parts) {
        phase.parts.forEach((part: any) => {
          if (part.isToken) return;
          
          if (
            (part.target === "TRAIT" || part.target === "TRAIT_DATA_ONLY" || part.target === "DISPLAY") &&
            part.overrideTraitDataBundle?.candidates
          ) {
            part.overrideTraitDataBundle.candidates.forEach((candidate: any) => {
              if (candidate.additionalDescription) {
                traitMods.push(candidate.additionalDescription);
              } else if (candidate.overrideDescription) {
                traitMods.push(candidate.overrideDescription);
              } else if (candidate.overrideDescripton) {
                traitMods.push(candidate.overrideDescripton);
              }
            });
          }
          
          if (
            part.target === "TALENT_DATA_ONLY" &&
            part.addOrOverrideTalentDataBundle?.candidates
          ) {
            part.addOrOverrideTalentDataBundle.candidates.forEach((candidate: any) => {
              if (candidate.requiredPotentialRank === 0 && candidate.upgradeDescription) {
                traitMods.push(candidate.upgradeDescription);
              }
            });
          }
        });
      }
      
      return { level, stats, traitMods };
    });

    modules.push({ key, name, type, typeName, description, image, missions, phases });
  });

  return (
    <div className="flex flex-col gap-4">
      {modules.map((module: any) => (
        <div key={module.key}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-muted text-sm">
              <thead className="bg-gray-200 dark:bg-card">
                <tr>
                  <th colSpan={4} className="p-2">{module.typeName}: {module.name}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td rowSpan={3} className="p-2 border w-64 min-w-64">
                    {module.image && module.type !== "INITIAL" && (
                      <img 
                        src={module.image} 
                        className="w-64 h-64 object-cover"
                      />
                    )}
                  </td>
                  <td className="text-4xl p-2 border text-center">1</td>
                  <td className="p-2 border whitespace-nowrap">
                    {module.phases[0] && (
                      <>
                        {Object.entries(module.phases[0].stats).map(([stat, value]: [string, any]) => (
                          <div key={stat}>{getStatName(stat)}: +{value}</div>
                        ))}
                      </>
                    )}
                  </td>
                  <td className="p-2 border">
                    {module.phases[0] && (
                      <div>
                        {module.phases[0].traitMods.map((mod: string, idx: number) => (
                          <div key={idx} dangerouslySetInnerHTML={{ __html: parseRichText(mod) }} />
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="text-4xl p-2 border text-center">2</td>
                  <td className="p-2 border whitespace-nowrap">
                    {module.phases[1] && (
                      <>
                        {Object.entries(module.phases[1].stats).map(([stat, value]: [string, any]) => (
                          <div key={stat}>{getStatName(stat)}: +{value}</div>
                        ))}
                      </>
                    )}
                  </td>
                  <td className="p-2 border">
                    {module.phases[1] && (
                      <div>
                        {module.phases[1].traitMods.map((mod: string, idx: number) => (
                          <div key={idx} dangerouslySetInnerHTML={{ __html: parseRichText(mod) }} />
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="text-4xl p-2 border text-center">3</td>
                  <td className="p-2 border whitespace-nowrap">
                    {module.phases[2] && (
                      <>
                        {Object.entries(module.phases[2].stats).map(([stat, value]: [string, any]) => (
                          <div key={stat}>{getStatName(stat)}: +{value}</div>
                        ))}
                      </>
                    )}
                  </td>
                  <td className="p-2 border">
                    {module.phases[2] && (
                      <div>
                        {module.phases[2].traitMods.map((mod: string, idx: number) => (
                          <div key={idx} dangerouslySetInnerHTML={{ __html: parseRichText(mod) }} />
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Module Missions */}
          {module.missions && module.missions.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-muted text-sm">
                <thead className="bg-gray-200 dark:bg-card">
                  <tr><th className="p-2">Missions</th></tr>
                </thead>
                <tbody>
                  <tr><td className="p-2">
                    {module.missions.map((mission: any, idx: number) => (
                      <p key={idx}>{idx + 1}. {mission.desc}</p>
                    ))}
                  </td></tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Module Description */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-muted text-sm">
              <thead className="bg-gray-200 dark:bg-card">
                <tr>
                  <th className="p-2">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2">
                    <p style={{ whiteSpace: 'pre-line' }} dangerouslySetInnerHTML={{ __html: module.description }} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )
}