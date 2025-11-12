import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SolLog } from '../lib/supabase';
import solLogsData from '../data/solLogs.json';
import { BookOpen, Beaker, FileText, Lightbulb } from 'lucide-react';

export default function Home() {
  const [randomSol, setRandomSol] = useState<SolLog | null>(null);

  useEffect(() => {
    // solLogs.json contains a top-level `phases` array. Flatten to pick a random sol.
    const phases = (solLogsData as any).phases || [];
    const flattened = phases.flatMap((p: any) => (p.sols || []).map((s: any) => ({ ...s, phase: p.phase })));

    if (flattened && flattened.length > 0) {
      const randomIndex = Math.floor(Math.random() * flattened.length);
      setRandomSol(flattened[randomIndex] as SolLog);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-red-950 to-slate-900">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAxYy0yLjc2MSAwLTUgMi4yMzktNSA1czIuMjM5IDUgNSA1IDUtMi4yMzkgNS01LTIuMjM5LTUtNS01eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDIiLz48L2c+PC9zdmc+')] opacity-20"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
            The Martian Project
          </h1>
          <p className="text-2xl text-red-400 mb-8 font-light">
            Survive. Adapt. Science the Impossible.
          </p>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
           A website all about the journey of Mark Watney in "The Martian" and the real science behind survival on Mars.
          </p>

         

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Link to="/problems" className="group bg-slate-800/70 backdrop-blur-sm hover:bg-slate-700 border border-slate-700 rounded-lg p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <Lightbulb className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold text-lg mb-2">Problems & Solutions</h3>
              <p className="text-gray-400 text-sm">Explore survival challenges and real science</p>
            </Link>

            <Link to="/sols" className="group bg-slate-800/70 backdrop-blur-sm hover:bg-slate-700 border border-slate-700 rounded-lg p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <BookOpen className="w-12 h-12 text-blue-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold text-lg mb-2">Sol Log Explorer</h3>
              <p className="text-gray-400 text-sm">Navigate Mark Watney's journey</p>
            </Link>

            <Link to="/labs" className="group bg-slate-800/70 backdrop-blur-sm hover:bg-slate-700 border border-slate-700 rounded-lg p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <Beaker className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold text-lg mb-2">DIY Labs</h3>
              <p className="text-gray-400 text-sm">Interactive experiments and calculators</p>
            </Link>

            <Link to="/works" className="group bg-slate-800/70 backdrop-blur-sm hover:bg-slate-700 border border-slate-700 rounded-lg p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <FileText className="w-12 h-12 text-red-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold text-lg mb-2">Works Cited</h3>
              <p className="text-gray-400 text-sm">MLA citations and sources</p>
            </Link>
          </div>

          {randomSol && (
            <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 backdrop-blur-sm border border-red-800 rounded-lg p-8 max-w-3xl mx-auto shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center justify-center">
                <span className="text-red-400 mr-2">☀️</span>
                Sol of the Week
              </h2>
              <div className="bg-slate-900/50 rounded-lg p-6 mb-4">
                <div className="text-sm text-red-400 font-semibold mb-2">SOL {randomSol.sol_number}</div>
                <p className="text-gray-200 italic text-lg leading-relaxed mb-4">"{randomSol.quote}"</p>
                <p className="text-gray-400 text-sm">{randomSol.summary}</p>
              </div>
              <Link
                to="/sols"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
              >
                Explore All Sol Logs →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
