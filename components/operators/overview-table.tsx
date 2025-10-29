import { getCharBranch, getCharClass, getFaction } from "@/lib/char-utils";
import { getBranchIcon, getClassIcon } from "@/lib/image-utils";
import { parseRichText } from "@/lib/parse";

export default function OverviewTable({ character }: { character: any }) {
  if (!character) return null;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-muted text-sm mb-4">
        <colgroup>
          <col style={{ width: '25%' }} />
          <col style={{ width: '25%' }} />
          <col style={{ width: '25%' }} />
          <col style={{ width: '25%' }} />
        </colgroup>
        <tbody>
          <tr>
            <th className="bg-gray-200 dark:bg-card p-1 text-center">Name</th>
            <td className="px-2 py-1 text-center">{character.name}</td>
            <th className="bg-gray-200 dark:bg-card p-1 text-center">Display No.</th>
            <td className="px-2 py-1 text-center">{character.displayNumber}</td>
          </tr>
          <tr>
            <th className="bg-gray-200 dark:bg-card p-1 text-center">Description</th>
            <td className="border-t px-2 py-1 text-center" colSpan={3}>{character.itemUsage}<br />{character.itemDesc}</td>
          </tr>
          <tr>
            <th className="bg-gray-200 dark:bg-card p-1 text-center">Trait</th>
            <td className="border-t px-2 py-1 text-center" colSpan={3}><span dangerouslySetInnerHTML={{ __html: parseRichText(character.description)}} /></td>
          </tr>
          <tr>
            <th className="bg-gray-200 dark:bg-card p-1 text-center">Position</th>
            <td className="border-t px-2 py-1 text-center">{character.position ? character.position.charAt(0).toUpperCase() + character.position.slice(1).toLowerCase() : "N/A"}</td>
            <th className="bg-gray-200 dark:bg-card p-1 text-center">Tags</th>
            <td className="border-t px-2 py-1 text-center">{character.tagList.join(", ")}</td>
          </tr>
          <tr>
            <th className="bg-gray-200 dark:bg-card p-1 text-center">Class</th>
            <td className="border-t px-2 py-1 text-center">
              <span className="flex items-center justify-center gap-2">
                {/* <img src={getClassIcon(character.profession)} className="w-auto h-6" /> */}
                {getCharClass(character.profession)}
              </span>
            </td>
            <th className="bg-gray-200 dark:bg-card p-1 text-center">Subbranch</th>
            <td className="border-t px-2 py-1 text-center">
              <span className="flex items-center justify-center gap-2">
                {/* <img src={getBranchIcon(character.subProfessionId)} className="w-auto h-6" /> */}
                {getCharBranch(character.subProfessionId)}
              </span>
            </td>
          </tr>
          <tr>
            <th className="bg-gray-200 dark:bg-card p-1 text-center">Nation</th>
            <td className="border-t px-2 py-1 text-center">
              {getFaction(character.nationId)}
            </td>
            <th className="bg-gray-200 dark:bg-card p-1 text-center">Faction</th>
            <td className="border-t px-2 py-1 text-center">
              {getFaction(character.groupId)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}