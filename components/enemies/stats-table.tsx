function getMaxHPRating(value: number): string {
  if (value >= 500_000) return "SS";
  if (value >= 250_000) return "S+";
  if (value >= 100_000) return "S";
  if (value >=  25_000) return "A+";
  if (value >=  12_000) return "A";
  if (value >=   8_000) return "B+";
  if (value >=   5_000) return "B";
  if (value >=   3_500) return "C";
  if (value >=   1_000) return "D";
  if (value >=       0) return "E";
  return "Error";
}

function getMaxATKRating(value: number): string {
  if (value >= 5_000) return "SS";
  if (value >= 3_000) return "S+";
  if (value >= 2_000) return "S";
  if (value >= 1_500) return "A+";
  if (value >= 1_000) return "A";
  if (value >=   700) return "B+";
  if (value >=   500) return "B";
  if (value >=   300) return "C";
  if (value >=   200) return "D";
  if (value >=     0) return "E";
  return "Error";
}

function getMaxDEFRating(value: number): string {
  if (value >= 5_000) return "SS";
  if (value >= 3_000) return "S+";
  if (value >= 2_000) return "S";
  if (value >= 1_200) return "A+";
  if (value >= 1_000) return "A";
  if (value >=   800) return "B+";
  if (value >=   500) return "B";
  if (value >=   200) return "C";
  if (value >=   100) return "D";
  if (value >=     0) return "E";
  return "Error";
}

function getMaxRESRating(value: number): string {
  if (value >= 90) return "SS";
  if (value >= 80) return "S+";
  if (value >= 70) return "S";
  if (value >= 60) return "A+";
  if (value >= 50) return "A";
  if (value >= 30) return "B+";
  if (value >= 20) return "B";
  if (value >= 10) return "C";
  if (value >=  1) return "D";
  if (value >=  0) return "E";
  return "Error";
}

function getAttackSpeedRating(value: number): string {
  if (value >= 6.9) return "E";
  if (value >= 5.0) return "D";
  if (value >= 3.5) return "C";
  if (value >= 2.6) return "B";
  if (value >= 1.7) return "B+";
  if (value >= 1.2) return "A";
  if (value >= 1.0) return "A+";
  if (value >= 0.8) return "S";
  if (value >= 0.5) return "S+";
  if (value >= 0.0) return "SS";
  return "Error";
}

function getMoveSpeedRating(value: number): string {
  if (value >= 2.0) return "SS";
  if (value >= 1.8) return "S+";
  if (value >= 1.5) return "S";
  if (value >= 1.2) return "A+";
  if (value >= 1.0) return "A";
  if (value >= 0.9) return "B+";
  if (value >= 0.7) return "B";
  if (value >= 0.5) return "C";
  if (value >= 0.3) return "D";
  if (value >= 0.0) return "E";
  return "Error";
}


export default function StatsTable({ enemyStats }: { enemyStats: any[] }) {
  return (
    <>
      <h2 className="text-xl font-semibold mb-2">Level 0</h2>
      <table className="w-full table-fixed border-collapse bg-muted text-center mb-4">
        <colgroup>
          <col className="w-1/6" />
          <col className="w-1/6" />
          <col className="w-1/6" />
          <col className="w-1/6" />
          <col className="w-1/6" />
          <col className="w-1/6" />
        </colgroup>
        <tbody>
          <tr className="bg-card">
            <th className="border p-1" colSpan={2}>Name</th>
            <th className="border p-1" colSpan={2}>Level</th>
            <th className="border p-1" colSpan={2}>Type</th>
          </tr>
          <tr>
            <td className="border p-1" colSpan={2}>{enemyStats[0].enemyData.name.m_value}</td>
            <td className="border p-1" colSpan={2}>{enemyStats[0].enemyData.levelType.m_value}</td>
            <td className="border p-1" colSpan={2}>-</td>
          </tr>
          <tr className="bg-card">
            <th className="border p-1" colSpan={6}>Description</th>
          </tr>
          <tr>
            <td className="border p-1" colSpan={6}>{enemyStats[0].enemyData.description.m_value}</td>
          </tr>
          <tr>
            <th className="border p-1 bg-card">Attack Pattern</th>
            <td className="border p-1">{(() => {
              switch (enemyStats[0].enemyData.applyWay.m_value) {
                case "MELEE": return "Melee";
                case "RANGED": return "Ranged";
                case "ALL": return "Melee/Ranged";
                case "NONE": return "None";
                default: return enemyStats[0].enemyData.applyWay.m_value;
              }
            })()}</td>
            <th className="border p-1 bg-card">Location</th>
            <td className="border p-1">{(() => {
              switch (enemyStats[0].enemyData.motion.m_value) {
                case "WALK": return "Ground";
                case "FLY": return "Flying";
                default: return enemyStats[0].enemyData.motion.m_value;
              }
            })()}</td>
            <th className="border p-1 bg-card">HP Recovery</th>
            <td className="border p-1">{enemyStats[0].enemyData.hpRecoveryPerSec?.m_value ?? "-"}</td>
          </tr>
          <tr className="bg-card">
            <th className="border p-1">HP</th>
            <th className="border p-1">ATK</th>
            <th className="border p-1">DEF</th>
            <th className="border p-1">RES</th>
            <th className="border p-1">Attack Range</th>
            <th className="border p-1">Weight</th>
          </tr>
          <tr>
            <td className="border p-1">{enemyStats[0].enemyData.attributes.maxHp?.m_value}<br /><strong>{getMaxHPRating(enemyStats[0].enemyData.attributes.maxHp?.m_value)}</strong></td>
            <td className="border p-1">{enemyStats[0].enemyData.attributes.atk?.m_value}<br /><strong>{getMaxATKRating(enemyStats[0].enemyData.attributes.atk?.m_value)}</strong></td>
            <td className="border p-1">{enemyStats[0].enemyData.attributes.def?.m_value}<br /><strong>{getMaxDEFRating(enemyStats[0].enemyData.attributes.def?.m_value)}</strong></td>
            <td className="border p-1">{enemyStats[0].enemyData.attributes.magicResistance?.m_value}<br /><strong>{getMaxRESRating(enemyStats[0].enemyData.attributes.magicResistance?.m_value)}</strong></td>
            <td className="border p-1">{enemyStats[0].enemyData.rangeRadius?.m_value === -1 
            ? "-" : enemyStats[0].enemyData.rangeRadius?.m_value}</td>
            <td className="border p-1">{enemyStats[0].enemyData.attributes.massLevel?.m_value}</td>
          </tr>
          <tr className="bg-card">
            <th className="border p-1">Movement Speed</th>
            <th className="border p-1">Attack Interval</th>
            <th className="border p-1">Effect Resistance</th>
            <th className="border p-1">Elemental Resistance</th>
            <th className="border p-1">Taunt Level</th>
            <th className="border p-1">Life Point Penalty</th>
          </tr>
          <tr>
            <td className="border p-1">{enemyStats[0].enemyData.attributes.moveSpeed?.m_value}<br /><strong>{getMoveSpeedRating(enemyStats[0].enemyData.attributes.moveSpeed?.m_value)}</strong></td>
            <td className="border p-1">{enemyStats[0].enemyData.attributes.baseAttackTime?.m_value}<br /><strong>{getAttackSpeedRating(enemyStats[0].enemyData.attributes.baseAttackTime?.m_value)}</strong></td>
            <td className="border p-1">{enemyStats[0].enemyData.attributes.epResistance?.m_value}<br /><strong>E</strong></td>
            <td className="border p-1">{enemyStats[0].enemyData.attributes.epDamageResistance?.m_value}<br /><strong>E</strong></td>
            <td className="border p-1">{enemyStats[0].enemyData.attributes.tauntLevel?.m_value}</td>
            <td className="border p-1 text-destructive">{enemyStats[0].enemyData.lifePointReduce?.m_value}</td>
          </tr>
          <tr>
            <th className="border p-1 bg-card">Resistances</th>
            <td className="border p-1" colSpan={5}>{(() => {
              const immunities = [
                { key: "stunImmune", label: "Stun" },
                { key: "silenceImmune", label: "Silence" },
                { key: "sleepImmune", label: "Sleep" },
                { key: "frozenImmune", label: "Freezing" },
                { key: "levitateImmune", label: "Levitate" },
                { key: "disarmedCombatImmune", label: "Disarm" },
                { key: "fearedImmune", label: "Fear" },
                { key: "palsyImmune", label: "Palsy" },
                { key: "attractImmune", label: "Attract" },
              ];
              const attributes = enemyStats[0].enemyData.attributes;
              const active = immunities
                .filter(({ key }) => attributes[key]?.m_value)
                .map(({ label }) => label);
              return active.length > 0 ? active.join(", ") : "-";
            })()}</td>
          </tr>
        </tbody>
      </table>

      {enemyStats[1] && (
        <>
          <h2 className="text-xl font-semibold mb-2">Level 1</h2>
          <table className="w-full table-fixed border-collapse bg-muted text-center">
            <colgroup>
              <col className="w-1/6" />
              <col className="w-1/6" />
              <col className="w-1/6" />
              <col className="w-1/6" />
              <col className="w-1/6" />
              <col className="w-1/6" />
            </colgroup>
            <tbody>
              <tr className="bg-card">
                <th className="border p-1" colSpan={2}>Name</th>
                <th className="border p-1" colSpan={2}>Level</th>
                <th className="border p-1" colSpan={2}>Type</th>
              </tr>
              <tr>
                <td className="border p-1" colSpan={2}>{enemyStats[0].enemyData.name.m_value}</td>
                <td className="border p-1" colSpan={2}>{enemyStats[0].enemyData.levelType.m_value}</td>
                <td className="border p-1" colSpan={2}>-</td>
              </tr>
              <tr className="bg-card">
                <th className="border p-1" colSpan={6}>Description</th>
              </tr>
              <tr>
                <td className="border p-1" colSpan={6}>{enemyStats[0].enemyData.description.m_value}</td>
              </tr>
              <tr>
                <th className="border p-1 bg-card">Attack Pattern</th>
                <td className="border p-1">{(() => {
                  switch (enemyStats[0].enemyData.applyWay.m_value) {
                    case "MELEE": return "Melee";
                    case "RANGED": return "Ranged";
                    case "ALL": return "Melee/Ranged";
                    case "NONE": return "None";
                    default: return enemyStats[0].enemyData.applyWay.m_value;
                  }
                })()}</td>
                <th className="border p-1 bg-card">Location</th>
                <td className="border p-1">{(() => {
                  switch (enemyStats[0].enemyData.motion.m_value) {
                    case "WALK": return "Ground";
                    case "FLY": return "Flying";
                    default: return enemyStats[0].enemyData.motion.m_value;
                  }
                })()}</td>
                <th className="border p-1 bg-card">HP Recovery</th>
                <td className="border p-1">{enemyStats[1].enemyData.hpRecoveryPerSec?.m_value ?? "-"}</td>
              </tr>
              <tr className="bg-card">
                <th className="border p-1">HP</th>
                <th className="border p-1">ATK</th>
                <th className="border p-1">DEF</th>
                <th className="border p-1">RES</th>
                <th className="border p-1">Attack Range</th>
                <th className="border p-1">Weight</th>
              </tr>
              <tr>
                <td className="border p-1">{enemyStats[1].enemyData.attributes.maxHp?.m_defined ? enemyStats[1].enemyData.attributes.maxHp?.m_value : enemyStats[0].enemyData.attributes.maxHp?.m_value}</td>

                <td className="border p-1">{enemyStats[1].enemyData.attributes.atk?.m_defined ? enemyStats[1].enemyData.attributes.atk?.m_value : enemyStats[0].enemyData.attributes.atk?.m_value}</td>

                <td className="border p-1">{enemyStats[1].enemyData.attributes.def?.m_defined ? enemyStats[1].enemyData.attributes.def?.m_value : enemyStats[0].enemyData.attributes.def?.m_value}</td>

                <td className="border p-1">{enemyStats[1].enemyData.attributes.magicResistance?.m_defined ? enemyStats[1].enemyData.attributes.magicResistance?.m_value : enemyStats[0].enemyData.attributes.magicResistance?.m_value}</td>

                <td className="border p-1">{enemyStats[1].enemyData.rangeRadius?.m_defined ? enemyStats[1].enemyData.rangeRadius?.m_value : enemyStats[0].enemyData.rangeRadius?.m_value}</td>

                <td className="border p-1">{enemyStats[1].enemyData.attributes.massLevel?.m_defined ? enemyStats[1].enemyData.attributes.massLevel?.m_value : enemyStats[0].enemyData.attributes.massLevel?.m_value}</td>
              </tr>
              <tr className="bg-card">
                <th className="border p-1">Movement Speed</th>
                <th className="border p-1">Attack Interval</th>
                <th className="border p-1">Effect Resistance</th>
                <th className="border p-1">Elemental Resistance</th>
                <th className="border p-1">Taunt Level</th>
                <th className="border p-1">Life Point Penalty</th>
              </tr>
              <tr>
                <td className="border p-1">{enemyStats[1].enemyData.attributes.epDamageResistance?.m_defined ? enemyStats[1].enemyData.attributes.moveSpeed?.m_value : enemyStats[0].enemyData.attributes.moveSpeed?.m_value}</td>

                <td className="border p-1">{enemyStats[1].enemyData.attributes.baseAttackTime?.m_defined ? enemyStats[1].enemyData.attributes.baseAttackTime?.m_value : enemyStats[0].enemyData.attributes.baseAttackTime?.m_value}</td>

                <td className="border p-1">{enemyStats[1].enemyData.attributes.epResistance?.m_defined ? enemyStats[1].enemyData.attributes.epResistance?.m_value : enemyStats[0].enemyData.attributes.epResistance?.m_value}</td>

                <td className="border p-1">{enemyStats[1].enemyData.attributes.epDamageResistance?.m_defined ? enemyStats[1].enemyData.attributes.epDamageResistance?.m_value : enemyStats[0].enemyData.attributes.epDamageResistance?.m_value}</td>


                <td className="border p-1">{enemyStats[1].enemyData.attributes.tauntLevel?.m_defined ? enemyStats[1].enemyData.attributes.tauntLevel?.m_value : enemyStats[0].enemyData.attributes.tauntLevel?.m_value}</td>

                <td className="border p-1 text-destructive">{enemyStats[1].enemyData.lifePointReduce?.m_defined ? enemyStats[1].enemyData.lifePointReduce?.m_value : enemyStats[0].enemyData.lifePointReduce?.m_value}</td>
              </tr>
              <tr>
                <th className="border p-1 bg-card">Resistances</th>
                <td className="border p-1" colSpan={5}>{(() => {
                  const immunities = [
                    { key: "stunImmune", label: "Stun" },
                    { key: "silenceImmune", label: "Silence" },
                    { key: "sleepImmune", label: "Sleep" },
                    { key: "frozenImmune", label: "Freezing" },
                    { key: "levitateImmune", label: "Levitate" },
                    { key: "disarmedCombatImmune", label: "Disarm" },
                    { key: "fearedImmune", label: "Fear" },
                    { key: "palsyImmune", label: "Palsy" },
                    { key: "attractImmune", label: "Attract" },
                  ];
                  const attributes = enemyStats[0].enemyData.attributes;
                  const active = immunities
                    .filter(({ key }) => attributes[key]?.m_value)
                    .map(({ label }) => label);
                  return active.length > 0 ? active.join(", ") : "-";
                })()}</td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </>
  )
}