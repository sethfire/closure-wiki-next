import { getItemIcon } from "@/lib/image-utils";

export default function PromotionTable({ phases, items }: { phases: any[], items: any[] }) {
  try {
    // Filter phases that have evolveCost (E1 and E2)
    const promotionPhases = phases.filter((phase: any) => phase.evolveCost && phase.evolveCost.length > 0);
    
    if (promotionPhases.length === 0) {
      return null;
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-muted text-sm">
          <thead className="bg-gray-200 dark:bg-card">
            <tr>
              <th className="p-2 text-left">Promotion</th>
              <th className="p-2 text-left">Materials</th>
            </tr>
          </thead>
          <tbody>
            {promotionPhases.map((phase: any, idx: number) => (
              <tr key={idx}>
                <td className="border-t p-2 font-medium text-center w-16">
                  E{idx + 1}
                </td>
                <td className="border-t p-2">
                  <div className="flex flex-row gap-1 flex-wrap">
                    {phase.evolveCost.map((cost: any) => {
                      const item = items.find((i: any) => i.itemId === cost.id);
                      const formattedCount = cost.type === "GOLD" 
                        ? `${(cost.count / 1000).toFixed(0)}k`
                        : `${cost.count}`;
                      
                      return (
                        <div key={cost.id} className="group flex items-center justify-center" title={item?.name ?? "Unknown Item"}>
                          <div className="relative w-12 h-12 rounded overflow-hidden">
                            <img 
                              src={cost.type === "GOLD" ? "example.png" : getItemIcon(item?.iconId ?? cost.id)}
                              width="48"
                              height="48"
                              className="w-full h-full object-contain"
                              loading="lazy"
                              decoding="async"
                            />
                            <div className="absolute bottom-0 right-0 bg-black/75 text-white text-xs px-1 rounded">
                              {formattedCount}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } catch (error) {
    return null;
  }
}