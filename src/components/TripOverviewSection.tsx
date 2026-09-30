import React from 'react';
import { Calendar, Train, MapPin, Camera } from 'lucide-react';

export const TripOverviewSection: React.FC = () => {
  const itinerary = [
    {
      day: 'Days 1 – 2',
      phase: 'Travelling Phase',
      title: 'Rail Transit Across Northern Plains',
      description: 'Journeying by express train through Uttar Pradesh’s lush emerald countryside, crossing the iron Malviya Bridge at dusk, and arriving at Banaras Junction.',
      icon: Train,
    },
    {
      day: 'Days 3 – 5',
      phase: 'Staying in Varanasi',
      title: '3 Days Immersed in Kashi',
      description: 'Documenting the morning darshan at Shri Kashi Vishwanath Temple, dawn boat rides past 84 ghats, the labyrinth of Chowk alleys, winter Malaiyo, and the evening Maha Ganga Aarti.',
      icon: MapPin,
    },
    {
      day: 'Day 6',
      phase: 'Travelling Phase',
      title: 'Return Transit & Final Reflections',
      description: 'Final sunrise photography on Assi Ghat before embarking on the return rail journey home with 21 curated photo clips and 4 Instagram reels.',
      icon: Calendar,
    },
  ];

  return (
    <section className="py-20 bg-[#0d0f16] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="p-8 sm:p-12 rounded-3xl bg-[#131622] border border-white/10 shadow-2xl space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-[#e5a93b] font-medium mb-2">
                <span>Expedition Structure</span>
                <span aria-hidden="true">·</span>
                <span>Fardin Shaik</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-editorial text-white font-normal tracking-tight">
                6-Day Journey: 3 Days Travelling, 3 Days in Varanasi
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-white/70 max-w-md font-light leading-relaxed">
              This trip memory portfolio was photographed by{' '}
              <strong className="text-white font-medium">Fardin Shaik</strong>{' '}
              (<a href="https://instagram.com/fardhuu.scapes" target="_blank" rel="noreferrer" className="text-[#e5a93b] hover:underline">@fardhuu.scapes</a>), who traveled to Varanasi with his friend{' '}
              (<a href="https://instagram.com/the._nani.05" target="_blank" rel="noreferrer" className="text-white/85 hover:text-[#e5a93b] hover:underline">@the._nani.05</a>) to document the spiritual architecture, street life, and culinary heritage of the sacred city.
            </p>
          </div>

          {/* 3-Column Itinerary Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {itinerary.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#0f111a] border border-white/5 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#e5a93b] bg-[#e5a93b]/10 px-2.5 py-1 rounded">
                        {item.day}
                      </span>
                      <span className="text-[11px] font-mono text-white/40">
                        {item.phase}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <div className="p-2 rounded-lg bg-white/5 text-white/80">
                        <Icon className="w-4 h-4 text-[#e5a93b]" />
                      </div>
                      <h3 className="text-base font-semibold text-white">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-xs text-white/65 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 text-[11px] font-mono text-white/40">
                    With friend @the._nani.05
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trip Summary bar */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-white/50 border-t border-white/10">
            <div className="flex items-center gap-4">
              <span>Total Duration: <strong className="text-white">6 Days</strong></span>
              <span>·</span>
              <span>Travel Time: <strong className="text-white">3 Days</strong></span>
              <span>·</span>
              <span>Stay Time: <strong className="text-white">3 Days in Kashi</strong></span>
            </div>
            <div className="flex items-center gap-4 text-[#e5a93b]">
              <span>21 Documentary Clips</span>
              <span>·</span>
              <span>4 Instagram Reels</span>
              <span>·</span>
              <span className="text-white/80">Shot by Xiaomi 15 Ultra</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
