import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export default function OxygenCalculator() {
  const [crewSize, setCrewSize] = useState(1);
  const [missionDays, setMissionDays] = useState(500);

  const calculateLifeSupport = () => {
    const oxygenPerPersonPerDay = 0.84;
    const co2PerPersonPerDay = 1.0;
    const waterPerPersonPerDay = 3.5;

    const totalO2 = oxygenPerPersonPerDay * crewSize * missionDays;
    const totalCO2 = co2PerPersonPerDay * crewSize * missionDays;
    const totalWater = waterPerPersonPerDay * crewSize * missionDays;

    const powerRequiredKW = crewSize * 0.15;

    return {
      totalO2: totalO2.toFixed(1),
      totalCO2: totalCO2.toFixed(1),
      totalWater: totalWater.toFixed(1),
      powerRequiredKW: powerRequiredKW.toFixed(2),
      dailyO2: (oxygenPerPersonPerDay * crewSize).toFixed(2),
      dailyCO2: (co2PerPersonPerDay * crewSize).toFixed(2),
    };
  };

  const results = calculateLifeSupport();

  const pieData = [
    { name: 'Oxygen (kg)', value: parseFloat(results.totalO2), color: '#60a5fa' },
    { name: 'CO₂ Scrubbed (kg)', value: parseFloat(results.totalCO2), color: '#f87171' },
    { name: 'Water (L)', value: parseFloat(results.totalWater), color: '#34d399' },
  ];

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 shadow-xl">
      <h2 className="text-3xl font-bold text-white mb-2">Hab O₂ / CO₂ Calculator</h2>
      <p className="text-gray-400 mb-8">
        Calculate life support requirements based on NASA formulas for crew size and mission duration.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-white font-semibold mb-2">
              Crew Size: <span className="text-red-400">{crewSize} {crewSize === 1 ? 'person' : 'people'}</span>
            </label>
            <input
              type="range"
              min="1"
              max="6"
              value={crewSize}
              onChange={(e) => setCrewSize(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1</span>
              <span>6</span>
            </div>
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">
              Mission Length: <span className="text-red-400">{missionDays} days</span>
            </label>
            <input
              type="range"
              min="30"
              max="900"
              step="10"
              value={missionDays}
              onChange={(e) => setMissionDays(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>30 days</span>
              <span>900 days</span>
            </div>
          </div>

          <div className="bg-slate-900 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-4">Total Requirements</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total O₂ Generated:</span>
                <span className="text-2xl font-bold text-blue-400">{results.totalO2} kg</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total CO₂ Scrubbed:</span>
                <span className="text-2xl font-bold text-red-400">{results.totalCO2} kg</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Water Needed:</span>
                <span className="text-2xl font-bold text-green-400">{results.totalWater} L</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Power Required:</span>
                <span className="text-2xl font-bold text-yellow-400">{results.powerRequiredKW} kW</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-4">Daily Per Crew</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">O₂ per Day:</span>
                <span className="text-xl font-bold text-blue-400">{results.dailyO2} kg</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">CO₂ per Day:</span>
                <span className="text-xl font-bold text-red-400">{results.dailyCO2} kg</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-slate-900 rounded-lg p-6 border border-slate-700 h-full">
            <h3 className="text-white font-bold mb-4">Resource Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  // props type from Recharts can be loose here; cast to any to avoid TS18046
                  label={(props: any) => `${props.name}: ${(props.percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>

            <div className="mt-6 text-sm text-gray-400 leading-relaxed space-y-3">
              <div>
                <p className="font-semibold text-white mb-1">Science Note:</p>
                <p>
                  The Oxygenator uses electrolysis to split CO₂ into oxygen and carbon monoxide.
                  Average human consumption is 0.84 kg O₂/day and produces 1.0 kg CO₂/day.
                </p>
              </div>
              <div>
                <p className="font-semibold text-white mb-1">Water Recovery:</p>
                <p>
                  ISS recycles ~90% of water from humidity, urine, and CO₂ processing.
                  Mars missions would need similar efficiency to minimize resupply.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
