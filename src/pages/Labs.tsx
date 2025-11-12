import { useState } from 'react';
import { Leaf, Droplet, Zap } from 'lucide-react';
import PotatoSimulator from '../components/PotatoSimulator';
import OxygenCalculator from '../components/OxygenCalculator';
import PowerBudgeter from '../components/PowerBudgeter';

type LabType = 'potato' | 'oxygen' | 'power' | null;

export default function Labs() {
  const [activeLab, setActiveLab] = useState<LabType>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">DIY Labs</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Interactive experiments inspired by <em>The Martian</em>. Adjust parameters,
            run simulations, and discover the calculations behind Mars survival.
          </p>
        </div>

        {!activeLab && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={() => setActiveLab('potato')}
              className="group bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl text-left"
            >
              <Leaf className="w-12 h-12 text-green-400 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-3">Potato Farm Simulator</h2>
              <p className="text-gray-400 leading-relaxed">
                Calculate potato yield based on light, water, and fertilizer inputs.
                How long can you survive on Mars-grown potatoes?
              </p>
              <div className="mt-4 text-red-400 font-semibold group-hover:text-red-300">
                Launch Lab →
              </div>
            </button>

            <button
              onClick={() => setActiveLab('oxygen')}
              className="group bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl text-left"
            >
              <Droplet className="w-12 h-12 text-blue-400 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-3">Hab O₂ Calculator</h2>
              <p className="text-gray-400 leading-relaxed">
                Calculate oxygen generation and CO₂ scrubbing requirements for your crew.
                Based on NASA life-support formulas.
              </p>
              <div className="mt-4 text-red-400 font-semibold group-hover:text-red-300">
                Launch Lab →
              </div>
            </button>

            <button
              onClick={() => setActiveLab('power')}
              className="group bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl text-left"
            >
              <Zap className="w-12 h-12 text-yellow-400 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-3">Power Budgeter</h2>
              <p className="text-gray-400 leading-relaxed">
                Balance solar panels, RTG output, and equipment consumption.
                Can you maintain a positive energy budget on Mars?
              </p>
              <div className="mt-4 text-red-400 font-semibold group-hover:text-red-300">
                Launch Lab →
              </div>
            </button>
          </div>
        )}

        {activeLab && (
          <div>
            <button
              onClick={() => setActiveLab(null)}
              className="mb-6 text-gray-400 hover:text-white flex items-center transition-colors"
            >
              ← Back to all labs
            </button>

            {activeLab === 'potato' && <PotatoSimulator />}
            {activeLab === 'oxygen' && <OxygenCalculator />}
            {activeLab === 'power' && <PowerBudgeter />}
          </div>
        )}
      </div>
    </div>
  );
}
