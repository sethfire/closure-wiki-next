import { getBaseSkillIcon } from "@/lib/image-utils";
import { parseRichText } from "@/lib/parse";

export default function BaseSkills({ baseSkills, baseSkillData }: { baseSkills: any, baseSkillData: any }) {
  if (!baseSkills || !baseSkillData) return <div className="text-muted-foreground">N/A</div>;
  
  return (
    <div className="flex flex-col gap-4">
      {Object.values(baseSkillData).map((baseSkill: any) => (
        <div className="bg-muted dark:bg-card p-2 scroll-mt-16" key={baseSkill.buffId}>
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-muted rounded-sm">
              <img
                src={getBaseSkillIcon(baseSkill.skillIcon)}
                className="w-9 h-9" 
                loading="lazy" 
                decoding="async"
              />
            </div>
            <div>
              <h3 className="font-semibold">{baseSkill.buffName}</h3>
              <div className="text-sm text-muted-foreground">
                {(() => {
                  if (!baseSkill.roomType) return "";
                  switch (baseSkill.roomType) {
                    case "CONTROL": return "Control Center";
                    case "POWER": return "Power Plant";
                    case "MANUFACTURE": return "Factory";
                    case "TRADING": return "Trading Post";
                    case "DORMITORY": return "Dormitory";
                    case "PRIVATE": return "Activity Room";
                    case "WORKSHOP": return "Workshop";
                    case "HIRE": return "Office";
                    case "TRAINING": return "Training Room";
                    case "MEETING": return "Reception Room";
                    default: return baseSkill.roomType;
                  }
                })()}
              </div>
            </div>
          </div>
          <div 
            className="text-sm whitespace-pre-line" 
            dangerouslySetInnerHTML={{ __html: parseRichText(baseSkill.description) }} 
          />
        </div>
      ))}
    </div>
  );
}