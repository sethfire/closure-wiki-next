"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getItemIcon, getSkillIcon } from "@/lib/image-utils";
import { parseBlackBoard, parseRichText } from "@/lib/parse";
import { useState } from "react";

export default function SkillsTable({ skills, charSkills, allSkillLvlup, items }: { skills: any[], charSkills: any[], allSkillLvlup: any[], items: any[] }) {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  try {
    return (
      <div className="flex flex-col gap-4">
        {skills.map((skill: any) => {
          const charSkill = charSkills[skill.skillId];
          if (!charSkill) return null;

          // Reverse order if desc
          const displayLevels = sortOrder === 'desc' 
            ? [...charSkill.levels].reverse()
            : charSkill.levels;

          return (
            <div key={skill.skillId}>
              <div className="overflow-x-auto">
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
                          <div className="flex flex-col gap-2 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="text-lg">{charSkill.levels[0].name}</h3>
                              <Button
                                variant={sortOrder === 'desc' ? "outline" : "outline"}
                                size="sm"
                                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                                className="shrink-0 cursor-pointer"
                              >
                                {sortOrder === 'asc' ? "Sort Descending" : "Sort Ascending"}
                              </Button>
                            </div>
                            <div className="flex flex-row gap-2">
                              {charSkill.levels[0].spData.spType === "INCREASE_WITH_TIME" && (
                                <Badge style={{ backgroundColor: '#8EC31F', color: 'white' }}>Auto Recovery</Badge>
                              )}
                              {charSkill.levels[0].spData.spType === "INCREASE_WHEN_ATTACK" && (
                                <Badge style={{ backgroundColor: '#FD7A3F', color: 'white' }}>Offensive Recovery</Badge>
                              )}
                              {charSkill.levels[0].spData.spType === "INCREASE_WHEN_TAKEN_DAMAGE" && (
                                <Badge style={{ backgroundColor: '#FFB400', color: 'white' }}>Defensive Recovery</Badge>
                              )}
                              {charSkill.levels[0].skillType === "MANUAL" && (
                                <Badge style={{ backgroundColor: '#808080', color: 'white' }}>Manual Trigger</Badge>
                              )}
                              {charSkill.levels[0].skillType === "AUTO" && (
                                <Badge style={{ backgroundColor: '#808080', color: 'white' }}>Auto Trigger</Badge>
                              )}
                              {charSkill.levels[0].spData.spType === 8 && (
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
                    {displayLevels.map((level: any, idx: number) => {
                      const actualIdx = sortOrder === 'asc' ? idx : charSkill.levels.length - 1 - idx;
                      return (
                        <tr key={idx} className={actualIdx === 9 ? "bg-yellow-50 dark:bg-yellow-200/20" : ""}>
                          <td className="border-t p-1 text-center">
                            {(() => {
                              switch (actualIdx) {
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
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-muted text-sm">
                  <thead className="bg-gray-200 dark:bg-card">
                    <tr>
                      <th colSpan={allSkillLvlup.length + skill.levelUpCostCond.length} className="p-2">
                        Skill Upgrade Cost
                      </th>
                    </tr>
                    <tr>
                      {allSkillLvlup.map((lvl: any, idx: number) => (
                      <th className="p-2 text-center" key={idx}>
                        {idx+2}
                      </th>
                    ))}
                    {skill.levelUpCostCond.map((cond: any, idx: number) => (
                        <th className="p-2 text-center" key={idx}>
                          M{idx+1}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {allSkillLvlup.map((lvl: any, idx: number) => (
                        <td className="border-t p-2 align-top border-r" key={idx}>
                          <div className="flex flex-col gap-1">
                            {lvl.lvlUpCost.map((cost: any) => {
                              const item = items.find((i: any) => i.itemId === cost.id);
                              return (
                                <div key={cost.id} className="group flex items-center justify-center" title={item?.name ?? "Unknown Item"}>
                                  <div className="relative w-12 h-12 rounded overflow-hidden">
                                    <img 
                                      src={getItemIcon(item.iconId)}
                                      width="48" 
                                      height="48"
                                      className="w-full h-full object-contain"
                                      loading="lazy"
                                      decoding="async"
                                    />
                                    <div className="absolute bottom-0 right-0 bg-black/75 text-white text-xs px-1 rounded">
                                      {cost.count}
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </td>
                      ))}
                      {skill.levelUpCostCond.map((cond: any, idx: number) => (
                        <td className="border-t p-2 align-top border-r last:border-r-0" key={idx}>
                          <div className="flex flex-col gap-1">
                            {cond.levelUpCost.map((cost: any) => {
                              const item = items.find((i: any) => i.itemId === cost.id);
                              return (
                                <div key={cost.id} className="group flex items-center justify-center" title={item?.name ?? "Unknown Item"}>
                                  <div className="relative w-12 h-12 rounded overflow-hidden">
                                    <img 
                                      src={getItemIcon(item.iconId)} 
                                      width="48" 
                                      height="48"
                                      className="w-full h-full object-contain"
                                      loading="lazy"
                                      decoding="async"
                                    />
                                    <div className="absolute bottom-0 right-0 bg-black/75 text-white text-xs px-1 rounded">
                                      {cost.count}
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      {allSkillLvlup.map((lvl: any, idx: number) => (
                        <td className="border-t p-2 text-center border-r" key={idx}>
                          -
                        </td>
                      ))}
                      {skill.levelUpCostCond.map((cond: any, idx: number) => (
                        <td className="border-t p-2 text-center border-r last:border-r-0" key={idx}>
                          {Math.floor(cond.lvlUpTime / 3600)}h
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    )
  } catch (error) {
    return null;
  }
}