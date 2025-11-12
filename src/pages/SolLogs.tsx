import { useEffect, useState } from 'react';
import { SolLog } from '../lib/supabase';
import solLogsData from '../data/solLogs.json';
import { Search, Tag } from 'lucide-react';

export default function SolLogs() {
  const [solLogs, setSolLogs] = useState<SolLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<SolLog[]>([]);
  const [phasesData, setPhasesData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const allTags = ['all', 'engineering', 'botany', 'humor', 'crisis'];

  useEffect(() => {
    // solLogs.json uses a top level "phases" array where each phase contains a "sols" array.
    // Flatten those sols and attach the phase title to each sol so filtering/search works,
    // and keep the original phases for grouping and overview rendering.
    const phases = (solLogsData as any).phases || [];
    const flattened: (SolLog & { phase?: string })[] = phases.flatMap((p: any) =>
      (p.sols || []).map((s: any) => ({ ...s, phase: p.phase }))
    );

    setPhasesData(phases);
    setSolLogs(flattened as SolLog[]);
    setFilteredLogs(flattened as SolLog[]);
  }, []);

  useEffect(() => {
    let filtered = solLogs;

    if (selectedTag !== 'all') {
      filtered = filtered.filter((log) => log.tags.includes(selectedTag));
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (log) =>
          log.quote.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.sol_number.toString().includes(searchTerm)
      );
    }

    setFilteredLogs(filtered);
  }, [searchTerm, selectedTag, solLogs]);

  const tagColors: Record<string, string> = {
    engineering: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    botany: 'bg-green-500/20 text-green-300 border-green-500/30',
    humor: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    crisis: 'bg-red-500/20 text-red-300 border-red-500/30',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Sol Log Explorer</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Navigate through Mark Watney's journey on Mars, one Sol (Martian day) at a time.
            Search entries, filter by theme, and discover the science and humor behind survival.
          </p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Sol number, quote, or summary..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center text-gray-400 mr-2">
              <Tag className="w-4 h-4 mr-1" />
              <span className="text-sm font-semibold">Filter:</span>
            </div>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedTag === tag
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </button>
            ))}
          </div>

          <div className="mt-4 text-gray-400 text-sm">
            Showing {filteredLogs.length} of {solLogs.length} Sol logs
          </div>
        </div>

        <div className="space-y-8">
          {phasesData.map((phase) => {
            const phaseSols = filteredLogs.filter((log: any) => log.phase === phase.phase);
            if (!phaseSols || phaseSols.length === 0) return null;

            return (
              <section key={phase.phase} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{phase.phase}</h2>
                    <p className="text-sm text-gray-400 mt-1">{phase.overview}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {phaseSols.map((log: any) => {
                    const isExpanded = expandedId === log.id;

                    return (
                      <div
                        key={log.id}
                        className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                      >
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="bg-red-600 text-white font-bold px-4 py-2 rounded-lg text-lg">
                                SOL {log.sol_number}
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {log.tags.map((tag: string) => (
                                  <span
                                    key={tag}
                                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                                      tagColors[tag] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'
                                    }`}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="bg-slate-900/50 border-l-4 border-red-500 rounded p-4 mb-3">
                            <p className="text-gray-200 italic text-lg leading-relaxed">"{log.quote}"</p>
                          </div>

                          <button
                            onClick={() => setExpandedId(isExpanded ? null : log.id)}
                            className="text-red-400 hover:text-red-300 font-semibold text-sm flex items-center transition-colors"
                          >
                            {isExpanded ? '▼' : '▶'} {isExpanded ? 'Hide' : 'Show'} Analysis
                          </button>

                          {isExpanded && (
                            <div className="mt-4 bg-slate-900/70 rounded-lg p-5 border border-slate-700 animate-in slide-in-from-top duration-300">
                              <h3 className="text-green-400 font-bold mb-2 text-sm uppercase tracking-wide">
                                Context & Analysis
                              </h3>
                              <p className="text-gray-300 leading-relaxed">{log.summary}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No Sol logs match your search criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedTag('all');
              }}
              className="mt-4 text-red-400 hover:text-red-300 font-semibold"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
