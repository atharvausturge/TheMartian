import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function PotatoSimulator() {
  const [lightHours, setLightHours] = useState(12);
  const [waterLiters, setWaterLiters] = useState(50);
  const [fertilizerIndex, setFertilizerIndex] = useState(3);

  const calculateYield = () => {
    const baseDays = 90;
    const baseYield = 50;

    const lightFactor = lightHours / 14;
    const waterFactor = waterLiters / 60;
    const fertilizerFactor = fertilizerIndex / 5;

    const avgFactor = (lightFactor + waterFactor + fertilizerFactor) / 3;

    const daysToHarvest = Math.round(baseDays / (0.5 + avgFactor * 0.8));
    const yieldKg = Math.round(baseYield * avgFactor);

    const caloriesPerDay = (yieldKg * 770) / daysToHarvest;
    const survivalDays = Math.round((yieldKg * 770) / 1500);

    return {
      daysToHarvest,
      yieldKg,
      caloriesPerDay: Math.round(caloriesPerDay),
      survivalDays,
    };
  };

  const results = calculateYield();

  const chartData = [
    { name: 'Days to Harvest', value: results.daysToHarvest },
    { name: 'Yield (kg)', value: results.yieldKg },
    { name: 'Survival Days', value: results.survivalDays },
  ];

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 shadow-xl">
      <h2 className="text-3xl font-bold text-white mb-2">Potato Farm Simulator</h2>
      <p className="text-gray-400 mb-8">
        Adjust growing conditions to see how they affect your potato yield on Mars.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-white font-semibold mb-2">
              Light Hours per Day: <span className="text-red-400">{lightHours}h</span>
            </label>
            <input
              type="range"
              min="6"
              max="24"
              value={lightHours}
              onChange={(e) => setLightHours(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>6h</span>
              <span>24h</span>
            </div>
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">
              Water per Cycle (Liters): <span className="text-red-400">{waterLiters}L</span>
            </label>
            <input
              type="range"
              min="20"
              max="100"
              value={waterLiters}
              onChange={(e) => setWaterLiters(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>20L</span>
              <span>100L</span>
            </div>
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">
              Fertilizer Quality: <span className="text-red-400">{fertilizerIndex}/5</span>
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={fertilizerIndex}
              onChange={(e) => setFertilizerIndex(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Poor</span>
              <span>Excellent</span>
            </div>
          </div>

          <div className="bg-slate-900 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-4">Results</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Days to Harvest:</span>
                <span className="text-2xl font-bold text-green-400">{results.daysToHarvest}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Expected Yield:</span>
                <span className="text-2xl font-bold text-green-400">{results.yieldKg} kg</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Calories/Day:</span>
                <span className="text-2xl font-bold text-yellow-400">{results.caloriesPerDay}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Survival Days:</span>
                <span className="text-2xl font-bold text-red-400">{results.survivalDays}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-slate-900 rounded-lg p-6 border border-slate-700 h-full">
            <h3 className="text-white font-bold mb-4">Visual Analysis</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="value" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-6 text-sm text-gray-400 leading-relaxed">
              <p className="font-semibold text-white mb-2">Science Note:</p>
              <p>
                Potatoes require optimal conditions: 12-14 hours of light, adequate water,
                and nutrient-rich soil. On Mars, these must be artificially maintained in
                a pressurized habitat with temperature control.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
