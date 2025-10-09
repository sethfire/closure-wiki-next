import { Badge } from "@/components/ui/badge";
import { getSkillIcon } from "@/lib/image-utils";
import { parseBlackBoard, parseRichText } from "@/lib/parse";

export default function SkillsTable({ skills }: { skills: any[] }) {
  return (
    <div className="flex flex-col gap-4">
      {skills.map((skill: any) => (
        <div className="overflow-x-auto" key={skill.skillId}>
          <table className="w-full border-collapse bg-muted text-sm">
            <colgroup>
              <col style={{ width: "50px" }} />
              <col />
              <col style={{ width: "50px" }} />
              <col style={{ width: "50px" }} />
              <col style={{ width: "50px" }} />
            </colgroup>
            <thead className="bg-gray-200 dark:bg-card">
              <tr>
                <th className="p-2 text-left" colSpan={5}>
                  <div className="flex items-start gap-4">
                    <img src={getSkillIcon(skill.skillId)}
                    width="64" height="64" loading="lazy" decoding="async" />
                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg">{skill.levels[0].name}</h3>
                      <div className="flex flex-row gap-2">
                        {skill.levels[0].spData.spType === "INCREASE_WITH_TIME" && (
                          <Badge style={{ backgroundColor: '#8EC31F', color: 'white' }}>Auto Recovery</Badge>
                        )}
                        {skill.levels[0].spData.spType === "INCREASE_WHEN_ATTACK" && (
                          <Badge style={{ backgroundColor: '#EF4444', color: 'white' }}>Offensive Recovery</Badge>
                        )}
                        {skill.levels[0].spData.spType === "INCREASE_WHEN_TAKEN_DAMAGE" && (
                          <Badge style={{ backgroundColor: '#F4AF09', color: 'white' }}>Defensive Recovery</Badge>
                        )}
                        {skill.levels[0].skillType === "MANUAL" && (
                          <Badge style={{ backgroundColor: '#808080', color: 'white' }}>Manual Trigger</Badge>
                        )}
                        {skill.levels[0].skillType === "AUTO" && (
                          <Badge style={{ backgroundColor: '#808080', color: 'white' }}>Auto Trigger</Badge>
                        )}
                        {skill.levels[0].spData.spType === 8 && (
                          <Badge style={{ backgroundColor: '#808080', color: 'white' }}>Passive</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </th>
              </tr>
              <tr>
                <th className="p-1">Level</th>
                <th className="p-1">Description</th>
                <th className="p-1">Initial SP</th>
                <th className="p-1">SP Cost</th>
                <th className="p-1">Duration</th>
              </tr>
            </thead>
            <tbody>
              {skill.levels.map((level: any, idx: number) => (
                <tr key={idx}>
                  <td className="border-t p-1 text-center">
                    {(() => {
                      switch (idx) {
                        case 0: return "1";
                        case 1: return "2";
                        case 2: return "3";
                        case 3: return "4";
                        case 4: return "5";
                        case 5: return "6";
                        case 6: return "7";
                        case 7: return "M1";
                        case 8: return "M2";
                        case 9: return "M3";
                        default: return "";
                      }
                    })()}
                  </td>
                  <td className="border-t p-1 text-left whitespace-pre-line">
                    <span dangerouslySetInnerHTML={{ __html: parseRichText(parseBlackBoard(level.description, level.blackboard).replace(/\\n/g, "\n")) }} />
                  </td>
                  <td className="border-t p-1 text-center">{level.spData.initSp}</td>
                  <td className="border-t p-1 text-center">{level.spData.spCost}</td>
                  <td className="border-t p-1 text-center">{level.duration === -1 ? '-' : level.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}