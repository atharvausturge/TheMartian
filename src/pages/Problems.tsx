import { useState } from 'react';
import { ScienceProblem } from '../lib/supabase';
import scienceProblemsData from '../data/scienceProblems.json';
import { Wind, Droplet, Leaf, Zap, Radio } from 'lucide-react';

const categoryIcons = {
  'Air / Oxygen': Wind,
  'Water / Hydration': Droplet,
  'Food / Botany': Leaf,
  'Power / Energy': Zap,
  'Communications / Rescue': Radio,
};

const categoryColors = {
  'Air / Oxygen': 'from-cyan-600 to-blue-700',
  'Water / Hydration': 'from-blue-600 to-cyan-700',
  'Food / Botany': 'from-green-600 to-emerald-700',
  'Power / Energy': 'from-yellow-600 to-orange-700',
  'Communications / Rescue': 'from-red-600 to-pink-700',
};

export default function Problems() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const problems = scienceProblemsData as ScienceProblem[];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Problems & Solutions</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore the five critical survival categories Mark Watney faced on Mars,
            from the science fiction of the book to the real scientific principles behind each challenge.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {problems.map((problem) => {
            const Icon = categoryIcons[problem.category as keyof typeof categoryIcons];
            const gradient = categoryColors[problem.category as keyof typeof categoryColors];
            const isExpanded = expandedId === problem.id;

            return (
              <div
                key={problem.id}
                className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className={`bg-gradient-to-r ${gradient} p-6`}>
                  <div className="flex items-center space-x-3">
                    {Icon && <Icon className="w-8 h-8 text-white" />}
                    <h2 className="text-2xl font-bold text-white">{problem.category}</h2>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-300 mb-4 leading-relaxed">{problem.description}</p>

                  <div className="bg-slate-900/50 border-l-4 border-red-500 rounded p-4 mb-4">
                    <p className="text-sm text-gray-400 font-semibold mb-1">FROM THE BOOK:</p>
                    <p className="text-gray-200 italic">"{problem.quote}"</p>
                  </div>

                  <button
                    onClick={() => setExpandedId(isExpanded ? null : problem.id)}
                    className="text-red-400 hover:text-red-300 font-semibold text-sm flex items-center transition-colors"
                  >
                    {isExpanded ? '▼' : '▶'} {isExpanded ? 'Hide' : 'Show'} Real Science
                  </button>

                  {isExpanded && (
                    <div className="mt-4 bg-slate-900/70 rounded-lg p-5 border border-slate-700 animate-in slide-in-from-top duration-300">
                      <h3 className="text-green-400 font-bold mb-2 text-sm uppercase tracking-wide">
                        The Science Explained
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {problem.science_explanation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

    
      </div>
    </div>
  );
}
