import React, { useState } from 'react';
import { ExternalLink, BookOpen, Quote } from 'lucide-react';
import { KASHI_WIKIPEDIA_FACTS } from '../data/portfolioData';

export const KashiVishwanathSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'architecture'>('overview');
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const hotspots = [
    {
      id: 1,
      top: '26%',
      left: '48%',
      title: 'Golden Shikharas (1839)',
      desc: 'Maharaja Ranjit Singh gifted 1,000 kg of pure gold leafing covering the main dome and spire.',
    },
    {
      id: 2,
      top: '68%',
      left: '32%',
      title: 'Ahilyabai Holkar Sanctuary (1780)',
      desc: 'Rebuilt by the Queen of Malwa, establishing the enduring stone sanctum that stands today.',
    },
    {
      id: 3,
      top: '55%',
      left: '74%',
      title: 'Kashi Vishwanath Corridor (2021)',
      desc: '50,000 sq meter promenade directly connecting the temple sanctum to the sacred Ganges riverbank.',
    },
  ];

  return (
    <section id="kashi-vishwanath" className="py-20 bg-[#0b0c10] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-[#e5a93b] font-medium mb-2">
              <span>Sacred Heart of Kashi</span>
              <span aria-hidden="true">·</span>
              <span>Photographed by Fardin Shaik</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-editorial text-white font-normal tracking-tight">
              Shri Kashi Vishwanath Temple
            </h2>
            <p className="text-sm text-white/50 font-serif italic mt-1">
              श्री काशी विश्वनाथ मंदिर · The Golden Jyotirlinga of Varanasi
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://en.wikipedia.org/wiki/Kashi_Vishwanath_Temple"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 text-xs font-medium text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Wikipedia Source</span>
            </a>
          </div>
        </div>

        {/* FULL CONTAINER: Temple Left Side & Wikipedia Matter Right Side */}
        <div className="bg-[#12141c] rounded-2xl border border-white/15 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
            
            {/* LEFT SIDE: Visual Showcase of Temple with Hotspots */}
            <div className="lg:col-span-6 relative bg-black min-h-[420px] lg:min-h-full flex flex-col justify-between overflow-hidden group">
              
              {/* Photo Asset */}
              <img
                src="/src/assets/images/kashi_vishwanath_temple_1790759413045.jpg"
                alt="Shri Kashi Vishwanath Temple golden spires photographed by Fardin Shaik"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 opacity-90"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#12141c] via-black/30 to-black/40 pointer-events-none" />

              {/* Top status indicator on photo */}
              <div className="relative z-10 p-5 flex items-center justify-between">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] text-white/90">
                  <span className="w-2 h-2 rounded-full bg-[#e5a93b]" />
                  <span>Jyotirlinga Darshan Corridor</span>
                </div>
                <span className="text-[11px] font-mono text-white/60 bg-black/50 px-2.5 py-1 rounded backdrop-blur-sm border border-white/10">
                  Varanasi Dham
                </span>
              </div>

              {/* Interactive Hotspots on the Temple image */}
              <div className="relative z-10 flex-1">
                {hotspots.map((hs) => (
                  <div
                    key={hs.id}
                    style={{ top: hs.top, left: hs.left }}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                  >
                    <button
                      onClick={() => setActiveHotspot(activeHotspot === hs.id ? null : hs.id)}
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-lg ${
                        activeHotspot === hs.id
                          ? 'bg-[#e5a93b] text-black scale-125 ring-4 ring-[#e5a93b]/40'
                          : 'bg-black/80 text-white border border-white/40 hover:bg-[#e5a93b] hover:text-black hover:scale-110'
                      }`}
                      title={hs.title}
                    >
                      {hs.id}
                    </button>

                    {activeHotspot === hs.id && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-[#0d1017] border border-[#e5a93b]/40 rounded-xl shadow-2xl z-30 text-left animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-xs font-semibold text-[#e5a93b]">{hs.title}</span>
                          <span className="text-[10px] text-white/40">Point {hs.id}</span>
                        </div>
                        <p className="text-[11px] text-white/80 leading-relaxed font-sans">{hs.desc}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom Photo Metadata overlay */}
              <div className="relative z-10 p-5 bg-gradient-to-t from-[#12141c] to-transparent">
                <div className="p-3.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-white/90">
                    <span className="font-semibold text-white">Shri Kashi Vishwanath Temple</span>
                    <span className="text-[11px] text-white/50 font-mono">West Bank, Ganges</span>
                  </div>
                  <p className="text-xs text-white/70 italic">
                    "Standing before the golden spire as the morning bell tolled was the spiritual centerpiece of the stay."
                  </p>
                </div>
              </div>

            </div>

            {/* RIGHT SIDE: Wikipedia Matter, History & Architectural Significance */}
            <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between overflow-y-auto max-h-[720px] bg-[#12141c]">
              
              <div className="space-y-6">
                
                {/* Wikipedia Badge & Native Name */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2 text-xs text-white/60">
                    <BookOpen className="w-3.5 h-3.5 text-[#e5a93b]" />
                    <span className="font-medium text-white/80">Wikipedia Encyclopedia Article</span>
                  </div>
                  <span className="text-xs font-mono text-[#e5a93b]">Wikidata: Q1751141</span>
                </div>

                {/* Sub-Tabs for Reading Experience */}
                <div className="flex items-center gap-1.5 p-1 bg-black/40 rounded-lg border border-white/10 text-xs">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`flex-1 py-1.5 rounded-md font-medium transition-colors ${
                      activeTab === 'overview'
                        ? 'bg-[#e5a93b] text-black shadow-sm'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    The Jyotirlinga
                  </button>
                  <button
                    onClick={() => setActiveTab('history')}
                    className={`flex-1 py-1.5 rounded-md font-medium transition-colors ${
                      activeTab === 'history'
                        ? 'bg-[#e5a93b] text-black shadow-sm'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    History &amp; Ahilyabai
                  </button>
                  <button
                    onClick={() => setActiveTab('architecture')}
                    className={`flex-1 py-1.5 rounded-md font-medium transition-colors ${
                      activeTab === 'architecture'
                        ? 'bg-[#e5a93b] text-black shadow-sm'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    Gold Dome &amp; Corridor
                  </button>
                </div>

                {/* Tab 1: Overview & Spiritual Importance */}
                {activeTab === 'overview' && (
                  <div className="space-y-4 text-sm text-white/80 leading-relaxed animate-in fade-in duration-300">
                    <p>
                      <strong>Shri Kashi Vishwanath Temple</strong> is one of the most famous Hindu temples dedicated to <strong>Lord Shiva</strong>. It is located in Varanasi, Uttar Pradesh, India, situated on the western bank of the sacred river Ganga, and is counted among the <strong>twelve holiest Jyotirlingas</strong>.
                    </p>
                    <p>
                      According to the Shiva Purana, Shiva manifested as a boundless, fiery column of endless cosmic light: the <em>Jyotirlinga</em>. Varanasi is considered the first and most auspicious of these manifestations, where the deity is worshipped as <strong>Vishwanatha</strong> or <strong>Vishveshwara</strong> ("Ruler of the Universe").
                    </p>
                    
                    <div className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-[#e5a93b] font-medium">
                        <Quote className="w-3.5 h-3.5" />
                        <span>Mark Twain on Benares (1897)</span>
                      </div>
                      <p className="text-xs text-white/70 italic font-serif leading-relaxed">
                        "Benares is older than history, older than tradition, older even than legend, and looks twice as old as all of them put together."
                      </p>
                    </div>
                  </div>
                )}

                {/* Tab 2: History & Maharani Ahilyabai Holkar */}
                {activeTab === 'history' && (
                  <div className="space-y-4 text-sm text-white/80 leading-relaxed animate-in fade-in duration-300">
                    <p>
                      The temple was mentioned in ancient Puranas including the Kashi Khanda. Over its history, the shrine faced repeated demolitions by Delhi Sultanate and Mughal rulers, including Qutb-ud-din Aibak in 1194 CE and later Mughal Emperor Aurangzeb in 1669, who constructed the Gyanvapi Mosque on its site.
                    </p>
                    <p>
                      In <strong>1780 CE</strong>, the noble Maratha ruler <strong>Maharani Ahilyabai Holkar</strong> of the Malwa kingdom (Indore) undertook the historic rebuilding of the temple at its adjacent sacred spot, creating the enduring stone structure that millions revere today.
                    </p>
                    <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs text-amber-200/90">
                      <strong>Historical Heritage Note:</strong> Rani Ahilyabai rebuilt hundreds of temples, ghats, and pilgrim wells across India from Kedarnath to Rameswaram, with Kashi Vishwanath as her crowning spiritual endeavor.
                    </div>
                  </div>
                )}

                {/* Tab 3: The Golden Spire & 2021 Corridor */}
                {activeTab === 'architecture' && (
                  <div className="space-y-4 text-sm text-white/80 leading-relaxed animate-in fade-in duration-300">
                    <p>
                      In <strong>1839 CE</strong>, the renowned Sikh Empire ruler, <strong>Sher-e-Punjab Maharaja Ranjit Singh</strong>, generously donated <strong>1,000 kilograms (2,200 lb) of pure gold</strong> to plate the two primary soaring shikhara spires of the temple, creating its radiant golden silhouette.
                    </p>
                    <p>
                      In <strong>December 2021</strong>, the massive <strong>Kashi Vishwanath Dham Corridor</strong> project was inaugurated. Transforming previously cramped, narrow alleyways into a sprawling 50,000-square-meter plaza, it restored a direct ceremonial walkway between the ancient Ganga ghats (Manikarnika and Lalita Ghats) and the temple sanctum.
                    </p>
                    <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-xs text-white/70">
                      <strong>Architectural Style:</strong> Classic Nagara temple design featuring carved sandstone pillared mandapas, ornamental floral cornices, and soaring tiered spires crowned with amalaka and kalasha.
                    </div>
                  </div>
                )}

                {/* Structured Wikipedia Facts Table */}
                <div className="pt-2">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-white/50 mb-2">
                    Encyclopedia Key Facts
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {KASHI_WIKIPEDIA_FACTS.map((fact, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                        <span className="text-white/40 block text-[10px] uppercase font-mono">{fact.label}</span>
                        <span className="text-white/90 font-medium">{fact.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Bottom notice */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/40">
                <span>Matter synthesized from English Wikipedia · CC BY-SA 4.0</span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
