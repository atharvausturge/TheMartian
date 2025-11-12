import { BookOpen, Globe, Users } from 'lucide-react';

export default function WorksCited() {
  const citations = [
    {
      category: 'Primary Source',
      icon: BookOpen,
      items: [
        {
          citation: 'Weir, Andy. The Martian ',
          description: 'The novel that inspired this educational site, combining hard science fiction with survival storytelling.',
        },
      ],
    },
    {
      category: 'NASA Resources',
      icon: Globe,
      items: [
        {
          citation: 'NASA. "Human Needs: Sustaining Life During Exploration." NASA Human Research Program, 2023, www.nasa.gov/hrp/bodyinspace.',
          description: 'Data on human oxygen consumption, water requirements, and life support systems.',
        },
        {
          citation: 'NASA. "Mars Facts." NASA Mars Exploration Program, 2023, mars.nasa.gov/all-about-mars/facts.',
          description: 'Information about Mars atmosphere, solar intensity, and environmental conditions.',
        },
        {
          citation: 'NASA. "Environmental Control and Life Support Systems." International Space Station Research, 2023, www.nasa.gov/mission_pages/station/research/eclss.',
          description: 'Technical specifications for oxygen generation, CO₂ removal, and water recycling systems.',
        },
        {
          citation: 'NASA. "Space Radiation." Human Research Program, 2023, www.nasa.gov/hrp/elements/radiation.',
          description: 'Information about radiation exposure on Mars and protection requirements.',
        },
      ],
    },
    {
      category: 'Scientific Research',
      icon: Users,
      items: [
        {
          citation: 'Wheeler, Raymond M., et al. "Agriculture for Space: People and Places Paving the Way." Open Agriculture, vol. 2, no. 1, 2017, pp. 14-32.',
          description: 'Research on growing crops in space environments and Mars soil composition.',
        },
        {
          citation: 'Zubrin, Robert. The Case for Mars: The Plan to Settle the Red Planet and Why We Must. Free Press, 2011.',
          description: 'Technical analysis of Mars colonization challenges including resource utilization.',
        },
      ],
    },
    
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Works Cited</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Sources used to make this website
          </p>
        </div>

        <div className="space-y-8">
          {citations.map((section, idx) => {
            const Icon = section.icon;
            return (
              <div
                key={idx}
                className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-xl"
              >
                <div className="bg-gradient-to-r from-red-900 to-red-800 p-6">
                  <div className="flex items-center space-x-3">
                    <Icon className="w-7 h-7 text-white" />
                    <h2 className="text-2xl font-bold text-white">{section.category}</h2>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {section.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                      <p className="text-gray-200 font-serif leading-relaxed mb-3 text-lg">
                        {item.citation}
                      </p>
                      <p className="text-sm text-gray-400 italic leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-800 rounded-xl p-8">
         
        </div>
      </div>
    </div>
  );
}
