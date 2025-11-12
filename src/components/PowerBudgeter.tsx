import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function PowerBudgeter() {
  const [solarPanels, setSolarPanels] = useState(6);
  const [rtgOutput, setRtgOutput] = useState(100);
  const [lifeSupport, setLifeSupport] = useState(50);
  const [communications, setCommunications] = useState(20);
  const [roverCharging, setRoverCharging] = useState(30);

  const calculatePowerBalance = () => {
    const solarPerPanel = 40;
    const dustReduction = 0.85;

    const totalSolarGeneration = solarPanels * solarPerPanel * dustReduction;
    const totalGeneration = totalSolarGeneration + rtgOutput;
    const totalConsumption = lifeSupport + communications + roverCharging;
    const balance = totalGeneration - totalConsumption;

    const hoursUntilBatteryDead = balance < 0 ? Math.abs(24 / (balance / 100)) : Infinity;

    return {
      totalGeneration: totalGeneration.toFixed(1),
      totalConsumption: totalConsumption.toFixed(1),
      balance: balance.toFixed(1),
      status: balance >= 0 ? 'POSITIVE' : 'NEGATIVE',
      hoursUntilDead: hoursUntilBatteryDead === Infinity ? 'N/A' : hoursUntilBatteryDead.toFixed(1),
      solarGeneration: totalSolarGeneration.toFixed(1),
    };
  };

  const results = calculatePowerBalance();

  const chartData = [
    { time: '00:00', generation: parseFloat(results.totalGeneration), consumption: parseFloat(results.totalConsumption) },
    { time: '04:00', generation: parseFloat(results.totalGeneration) * 0.3, consumption: parseFloat(results.totalConsumption) },
    { time: '08:00', generation: parseFloat(results.totalGeneration) * 0.7, consumption: parseFloat(results.totalConsumption) },
    { time: '12:00', generation: parseFloat(results.totalGeneration), consumption: parseFloat(results.totalConsumption) },
    { time: '16:00', generation: parseFloat(results.totalGeneration) * 0.8, consumption: parseFloat(results.totalConsumption) },
    { time: '20:00', generation: parseFloat(results.totalGeneration) * 0.4, consumption: parseFloat(results.totalConsumption) },
    { time: '24:00', generation: parseFloat(results.totalGeneration) * 0.1, consumption: parseFloat(results.totalConsumption) },
  ];

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 shadow-xl">
      <h2 className="text-3xl font-bold text-white mb-2">Power Budgeter</h2>
      <p className="text-gray-400 mb-8">
        Balance your power generation sources with equipment consumption. Can you maintain a positive energy budget?
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold text-green-400 mb-4">⚡ Power Generation</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-white font-semibold mb-2">
                Solar Panels: <span className="text-red-400">{solarPanels} units</span>
              </label>
              <input
                type="range"
                min="0"
                max="12"
                value={solarPanels}
                onChange={(e) => setSolarPanels(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0</span>
                <span>12</span>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Output: {results.solarGeneration}W (with dust reduction)
              </p>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                RTG Output: <span className="text-red-400">{rtgOutput}W</span>
              </label>
              <input
                type="range"
                min="0"
                max="200"
                step="10"
                value={rtgOutput}
                onChange={(e) => setRtgOutput(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0W</span>
                <span>200W</span>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Radioisotope Thermoelectric Generator (constant)
              </p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-red-400 mb-4 mt-8">⚠️ Power Consumption</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-white font-semibold mb-2">
                Life Support: <span className="text-red-400">{lifeSupport}W</span>
              </label>
              <input
                type="range"
                min="30"
                max="100"
                value={lifeSupport}
                onChange={(e) => setLifeSupport(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>30W</span>
                <span>100W</span>
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                Communications: <span className="text-red-400">{communications}W</span>
              </label>
              <input
                type="range"
                min="0"
                max="50"
                value={communications}
                onChange={(e) => setCommunications(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0W</span>
                <span>50W</span>
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                Rover Charging: <span className="text-red-400">{roverCharging}W</span>
              </label>
              <input
                type="range"
                min="0"
                max="80"
                value={roverCharging}
                onChange={(e) => setRoverCharging(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0W</span>
                <span>80W</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className={`rounded-lg p-6 border-2 ${
            results.status === 'POSITIVE'
              ? 'bg-green-900/30 border-green-500'
              : 'bg-red-900/30 border-red-500'
          }`}>
            <h3 className="text-2xl font-bold text-white mb-4">Power Balance</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Total Generation:</span>
                <span className="text-2xl font-bold text-green-400">{results.totalGeneration}W</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Total Consumption:</span>
                <span className="text-2xl font-bold text-red-400">{results.totalConsumption}W</span>
              </div>
              <div className="h-px bg-slate-600"></div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-bold">Balance:</span>
                <span className={`text-3xl font-bold ${
                  results.status === 'POSITIVE' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {results.balance}W
                </span>
              </div>
              <div className={`p-4 rounded-lg text-center font-bold text-lg ${
                results.status === 'POSITIVE'
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
              }`}>
                {results.status === 'POSITIVE' ? '✓ SUSTAINABLE' : '✗ CRITICAL'}
              </div>
              {results.status === 'NEGATIVE' && (
                <p className="text-sm text-red-300 text-center">
                  Battery backup: ~{results.hoursUntilDead}h remaining
                </p>
              )}
            </div>
          </div>

          <div className="bg-slate-900 rounded-lg p-6 border border-slate-700">
            <h3 className="text-white font-bold mb-4">24-Hour Power Cycle</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="generation" stroke="#22c55e" strokeWidth={2} name="Generation" />
                <Line type="monotone" dataKey="consumption" stroke="#ef4444" strokeWidth={2} name="Consumption" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-slate-900 rounded-lg p-6 border border-slate-700">
            <p className="text-sm text-gray-400 leading-relaxed">
              <span className="font-semibold text-white block mb-2">Science Note:</span>
              Solar panels on Mars produce ~44% of Earth output due to distance from the Sun.
              Dust accumulation reduces efficiency by ~15% over time. RTGs provide constant power
              but have limited output. Battery backup is critical for nighttime survival.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
