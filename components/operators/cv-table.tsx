export default function CVTable({ charSkins, voiceLangDict }: { charSkins: any, voiceLangDict: any }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-muted text-sm">
        <colgroup>
          <col style={{ width: '25%' }} />
          <col style={{ width: '25%' }} />
          <col style={{ width: '25%' }} />
          <col style={{ width: '25%' }} />
        </colgroup>
        <tbody>
          <tr>
            <th className="bg-gray-200 dark:bg-card p-1 text-center">Illustrator(s)</th>
            <td className="px-2 py-1 text-center" colSpan={3}>
              {charSkins && typeof charSkins === 'object'
                ? Array.from(new Set(
                    Object.values(charSkins).flatMap((skin: any) => 
                      skin?.displaySkin?.drawerList ?? []
                    )
                  )).join(", ") || "N/A"
                : "N/A"}
            </td>
          </tr>
          <tr>
            <th className="bg-gray-200 dark:bg-card p-1 text-center">JP Voice</th>
            <td className="border-t px-2 py-1 text-center">{voiceLangDict?.dict["JP"]?.cvName.join(", ") ?? "N/A"}</td>
            <th className="bg-gray-200 dark:bg-card p-1 text-center">CN Voice</th>
            <td className="border-t px-2 py-1 text-center">{voiceLangDict?.dict["CN_MANDARIN"]?.cvName.join(", ") ?? "N/A"}</td>
          </tr>
          <tr>
            <th className="bg-gray-200 dark:bg-card p-1 text-center">EN Voice</th>
            <td className="border-t px-2 py-1 text-center">{voiceLangDict?.dict["EN"]?.cvName.join(", ") ?? "N/A"}</td>
            <th className="bg-gray-200 dark:bg-card p-1 text-center">KR Voice</th>
            <td className="border-t px-2 py-1 text-center">{voiceLangDict?.dict["KR"]?.cvName.join(", ") ?? "N/A"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}