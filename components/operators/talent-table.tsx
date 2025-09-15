import { parseRichText } from "@/lib/parse";

export default function TalentsTable({ talents }: { talents: any[] }) {
  return (
    <div className="flex flex-col gap-4">
      {talents.filter((talent: any) => !talent.candidates[0].isHideTalent).map((talent: any, idx: number) => (
        <table className="w-full border-collapse bg-muted" key={idx}>
        <colgroup>
          <col style={{ width: '150px' }} />
          <col style={{ width: '100px' }} />
          <col />
        </colgroup>
        <thead className="bg-gray-200 dark:bg-card text-sm md:text-sm">
          <tr>
            {/* <th colSpan={3} className="text-lg py-1 px-2 text-left font-semibold">{talent.candidates[0].name}</th> */}
            <th className="py-1 px-2">Name</th>
            <th className="py-1 px-2">Unlock</th>
            <th className="py-1 px-2">Description</th>
          </tr>
        </thead>
        <tbody className="text-sm md:text-sm">
          {talent.candidates.map((candidate: any, idx: number) => (
            <tr key={idx}>
              <td className="border-t p-1 text-center">
                {candidate.name}
              </td>
              <td className="border-t p-1 text-center">
              {(() => {
                switch (candidate.unlockCondition.phase) {
                case "PHASE_0": return "E0";
                case "PHASE_1": return "E1";
                case "PHASE_2": return "E2";
                default: return "";
                }
              })()}
              {(() => {
                switch (candidate.requiredPotentialRank) {
                case 0: return "";
                case 1: return " P1";
                case 2: return " P2";
                case 3: return " P3";
                case 4: return " P4";
                case 5: return " P5";
                default: return "";
                }
              })()}
              </td>
              <td className="border-t p-1 text-left whitespace-pre-line">
                <span dangerouslySetInnerHTML={{ __html: parseRichText(candidate.description.replace(/\\n/g, "\n")) }} />
              </td>
            </tr>
          ))}
        </tbody>
        </table>
    ))}
    </div>
  )
}