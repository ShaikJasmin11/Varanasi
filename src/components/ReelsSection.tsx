import React, { useState } from 'react';
import { Play, Music, Instagram } from 'lucide-react';
import { INSTAGRAM_REELS } from '../data/portfolioData';
import { ReelModal } from './ReelModal';

export const ReelsSection: React.FC = () => {
  const [selectedReelIndex, setSelectedReelIndex] = useState<number | null>(null);

  const selectedReel = selectedReelIndex !== null ? INSTAGRAM_REELS[selectedReelIndex] : null;

  const handleNext = () => {
    if (selectedReelIndex !== null) {
      setSelectedReelIndex((selectedReelIndex + 1) % INSTAGRAM_REELS.length);
    }
  };

  const handlePrev = () => {
    if (selectedReelIndex !== null) {
      setSelectedReelIndex((selectedReelIndex - 1 + INSTAGRAM_REELS.length) % INSTAGRAM_REELS.length);
    }
  };

  return (
    <section id="instagram-reels" className="py-24 bg-[#0b0c10] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-[#e5a93b] font-medium mb-3">
              <Instagram className="w-3.5 h-3.5" />
              <span>Instagram Reels Series</span>
              <span aria-hidden="true">·</span>
              <a
                href="https://instagram.com/fardhuu.scapes"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                @fardhuu.scapes
              </a>
              <span aria-hidden="true">·</span>
              <span className="text-white/60">with</span>
              <a
                href="https://instagram.com/the._nani.05"
                target="_blank"
                rel="noreferrer"
                className="text-white/80 hover:text-[#e5a93b] hover:underline"
              >
                @the._nani.05
              </a>
            </div>
            <h2 className="text-3xl sm:text-5xl font-editorial text-white font-normal tracking-tight">
              4 Reels in Varanasi
            </h2>
            <p className="text-sm text-white/60 mt-1 max-w-xl font-light">
              Short-form video dispatches captured and published on Instagram during the 3 days in Varanasi.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-white/50 bg-[#141620] px-3.5 py-2 rounded-xl border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>4 Original Reels</span>
          </div>
        </div>

        {/* 4-Column Grid of 9:16 Vertical Reel Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INSTAGRAM_REELS.map((reel, idx) => (
            <div
              key={reel.id}
              onClick={() => setSelectedReelIndex(idx)}
              className="group cursor-pointer rounded-2xl bg-[#141622] border border-white/10 overflow-hidden hover:border-[#e5a93b]/60 transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-2xl flex flex-col justify-between"
            >
              {/* Vertical Reel Preview Container (9:16 aspect ratio) */}
              <div className="relative aspect-[9/16] bg-black overflow-hidden">
                <video
                  src={reel.coverImage}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-85 group-hover:opacity-100"
                  muted
                  playsInline
                  preload="metadata"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90 pointer-events-none" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 pointer-events-none">
                  <span className="font-mono bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 text-[10px] text-white/90">
                    {reel.duration}
                  </span>
                </div>

                {/* Center Play Button on Hover */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-[#e5a93b] group-hover:text-black transition-all shadow-lg">
                    <Play className="w-5 h-5 translate-x-0.5" />
                  </div>
                </div>

                {/* Bottom Details on Cover */}
                <div className="absolute bottom-3 left-3 right-3 space-y-1.5 pointer-events-none">
                  {reel.overlayQuote && (
                    <div className="inline-block px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono text-amber-200 truncate max-w-full">
                      "{reel.overlayQuote}"
                    </div>
                  )}
                  <h4 className="text-xs font-semibold text-white line-clamp-2 leading-snug drop-shadow-sm">
                    {reel.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[10px] text-white/70">
                    <Music className="w-3 h-3 text-[#e5a93b] shrink-0" />
                    <span className="truncate">{reel.audioTrack}</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Interactive Reel Player Modal */}
      <ReelModal
        reel={selectedReel}
        onClose={() => setSelectedReelIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
};
