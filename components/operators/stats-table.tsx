export default function StatsTable({ phases, favorKeyFrames }: { phases: any[], favorKeyFrames: any[] }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-muted">
          <thead className="bg-gray-200 dark:bg-card text-sm md:text-sm">
            <tr>
              <th />
              <th className="p-1 text-center">E0 Lv1</th>
              {phases[0] && (<th className="p-1 text-center">E0 Lv{phases[0].attributesKeyFrames[1].level}</th>)}
              {phases[1] && (<th className="p-1 text-center">E1 Lv{phases[1].attributesKeyFrames[1].level}</th>)}
              {phases[2] && (<th className="p-1 text-center">E2 Lv{phases[2].attributesKeyFrames[1].level}</th>)}
              <th className="p-1 text-center">Trust Bonus</th>
            </tr>
          </thead>
          <tbody className="text-sm md:text-sm">
            <tr>
              <td className="bg-gray-200 dark:bg-card p-1 text-center font-semibold">HP</td>
              <td className="border-t p-1 text-center">{phases[0].attributesKeyFrames[0].data.maxHp}</td>
              {phases[0] && (<td className="border-t p-1 text-center">{phases[0].attributesKeyFrames[1].data.maxHp}</td>)}
              {phases[1] && (<td className="border-t p-1 text-center">{phases[1].attributesKeyFrames[1].data.maxHp}</td>)}
              {phases[2] && (<td className="border-t p-1 text-center">{phases[2].attributesKeyFrames[1].data.maxHp}</td>)}
              <td className="border-t p-1 text-center">{favorKeyFrames[1].data.maxHp}</td>
            </tr>
            <tr>
              <td className="bg-gray-200 dark:bg-card p-1 text-center font-semibold">ATK</td>
              <td className="border-t p-1 text-center">{phases[0].attributesKeyFrames[0].data.atk}</td>
              {phases[0] && (<td className="border-t p-1 text-center">{phases[0].attributesKeyFrames[1].data.atk}</td>)}
              {phases[1] && (<td className="border-t p-1 text-center">{phases[1].attributesKeyFrames[1].data.atk}</td>)}
              {phases[2] && (<td className="border-t p-1 text-center">{phases[2].attributesKeyFrames[1].data.atk}</td>)}
              <td className="border-t p-1 text-center">{favorKeyFrames[1].data.atk}</td>
            </tr>
            <tr>
              <td className="bg-gray-200 dark:bg-card p-1 text-center font-semibold">DEF</td>
              <td className="border-t p-1 text-center">{phases[0].attributesKeyFrames[0].data.def}</td>
              {phases[0] && (<td className="border-t p-1 text-center">{phases[0].attributesKeyFrames[1].data.def}</td>)}
              {phases[1] && (<td className="border-t p-1 text-center">{phases[1].attributesKeyFrames[1].data.def}</td>)}
              {phases[2] && (<td className="border-t p-1 text-center">{phases[2].attributesKeyFrames[1].data.def}</td>)}
              <td className="border-t p-1 text-center">{favorKeyFrames[1].data.def}</td>
            </tr>
            <tr>
              <td className="bg-gray-200 dark:bg-card p-1 text-center font-semibold">RES</td>
              <td className="border-t p-1 text-center">{phases[0].attributesKeyFrames[0].data.magicResistance}</td>
              {phases[0] && (<td className="border-t p-1 text-center">{phases[0].attributesKeyFrames[1].data.magicResistance}</td>)}
              {phases[1] && (<td className="border-t p-1 text-center">{phases[1].attributesKeyFrames[1].data.magicResistance}</td>)}
              {phases[2] && (<td className="border-t p-1 text-center">{phases[2].attributesKeyFrames[1].data.magicResistance}</td>)}
              <td className="border-t p-1 text-center">{favorKeyFrames[1].data.magicResistance}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-muted text-sm md:text-sm">
          <colgroup>
            <col style={{ width: '25%' }} />
            <col style={{ width: '25%' }} />
            <col style={{ width: '25%' }} />
            <col style={{ width: '25%' }} />
          </colgroup>
          <tbody>
            <tr>
              <th className="bg-gray-200 dark:bg-card p-1 text-center">Redeployment Time</th>
              <td className="px-2 py-1 text-center">
                {phases[0].attributesKeyFrames[0].data.respawnTime}s
                {phases[1] && phases[1].attributesKeyFrames[0].data.respawnTime !== phases[0].attributesKeyFrames[0].data.respawnTime &&
                  ` / ${phases[1].attributesKeyFrames[0].data.respawnTime}s`}
                {phases[2] && phases[2].attributesKeyFrames[0].data.respawnTime !== phases[1].attributesKeyFrames[0].data.respawnTime &&
                  ` / ${phases[2].attributesKeyFrames[0].data.respawnTime}s`}
              </td>
              <th className="bg-gray-200 dark:bg-card p-1 text-center">DP Cost</th>
              <td className="px-2 py-1 text-center">
                {phases[0].attributesKeyFrames[0].data.cost}
                {phases[1] && phases[1].attributesKeyFrames[0].data.cost !== phases[0].attributesKeyFrames[0].data.cost &&
                  ` / ${phases[1].attributesKeyFrames[0].data.cost}`}
                {phases[2] && phases[2].attributesKeyFrames[0].data.cost !== phases[1].attributesKeyFrames[0].data.cost &&
                  ` / ${phases[2].attributesKeyFrames[0].data.cost}`}
              </td>
            </tr>
            <tr>
              <th className="bg-gray-200 dark:bg-card p-1 text-center">Block Count</th>
              <td className="border-t px-2 py-1 text-center">
                {phases[0].attributesKeyFrames[0].data.blockCnt}
                {phases[1] && phases[1].attributesKeyFrames[0].data.blockCnt !== phases[0].attributesKeyFrames[0].data.blockCnt &&
                  ` / ${phases[1].attributesKeyFrames[0].data.blockCnt}`}
                {phases[2] && phases[2].attributesKeyFrames[0].data.blockCnt !== phases[1].attributesKeyFrames[0].data.blockCnt &&
                  ` / ${phases[2].attributesKeyFrames[0].data.blockCnt}`}
              </td>
              <th className="bg-gray-200 dark:bg-card p-1 text-center">Attack Interval</th>
              <td className="border-t px-2 py-1 text-center">
                {phases[0].attributesKeyFrames[0].data.baseAttackTime}s
                {phases[1] && phases[1].attributesKeyFrames[0].data.baseAttackTime !== phases[0].attributesKeyFrames[0].data.baseAttackTime &&
                  ` / ${phases[1].attributesKeyFrames[0].data.baseAttackTime}s`}
                {phases[2] && phases[2].attributesKeyFrames[0].data.baseAttackTime !== phases[1].attributesKeyFrames[0].data.baseAttackTime &&
                  ` / ${phases[2].attributesKeyFrames[0].data.baseAttackTime}s`}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}