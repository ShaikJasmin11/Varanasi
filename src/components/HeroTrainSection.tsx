import React, { useState } from 'react';
import { MapPin, Sun, Moon } from 'lucide-react';

interface HeroTrainSectionProps {
  onExploreClick: () => void;
  onExploreClipsClick: () => void;
}

export const HeroTrainSection: React.FC<HeroTrainSectionProps> = ({
  onExploreClick,
  onExploreClipsClick,
}) => {
  const [speed, setSpeed] = useState<'scenic' | 'express'>('scenic');
  const [isDusk, setIsDusk] = useState(false);

  const getAnimationClass = () => {
    return speed === 'express' ? 'animate-train-fast' : 'animate-train';
  };

  return (
    <section id="train-journey" className="relative pt-24 pb-16 overflow-hidden bg-[#0b0c10]">
      {/* Editorial Title & Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-[#e5a93b] font-medium mb-3">
              <span>6-Day Travel Memory Portfolio</span>
              <span aria-hidden="true">·</span>
              <span>3 Days Travelling · 3 Days Staying</span>
              <span aria-hidden="true">·</span>
              <span>Varanasi, India</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-editorial font-normal tracking-tight text-white leading-[1.05]">
              Varanasi: The Timeless <br />
              <span className="italic font-light text-[#e5a93b]">City of Light & Shadow</span>
            </h1>
          </div>

          <div className="max-w-md space-y-3">
            <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light">
              A 6-day photographic memory portfolio documented by{' '}
              <strong className="text-white font-medium">Fardin Shaik</strong>{' '}
              (<a href="https://instagram.com/fardhuu.scapes" target="_blank" rel="noreferrer" className="text-[#e5a93b] hover:underline">@fardhuu.scapes</a>) during an autumn journey
              to Varanasi with his friend{' '}
              (<a href="https://instagram.com/the._nani.05" target="_blank" rel="noreferrer" className="text-white/80 hover:text-[#e5a93b] hover:underline">@the._nani.05</a>), spending 3 days travelling and 3 days immersed in the sacred city.
            </p>
            <div className="flex items-center gap-2.5 text-xs text-white/50 font-mono">
              <span className="text-[#e5a93b]">6 Days</span>
              <span aria-hidden="true">·</span>
              <span>22 Photo Clips</span>
              <span aria-hidden="true">·</span>
              <span>4 Instagram Reels</span>
              <span aria-hidden="true">·</span>
              <span className="text-white/80">Shot by Xiaomi 15 Ultra</span>
            </div>
          </div>
        </div>
      </div>

      {/* Train Moving Across Lush Greenery Feature Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-[#0d1017]">
          
          {/* Top Bar inside the container with train controls */}
          <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 text-xs">
            <div className="flex items-center gap-2 text-white/80">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-mono uppercase tracking-wider text-[11px]">
                Northern Express · 3 Days Rail &amp; Road Transit
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Day/Dusk toggle */}
              <button
                onClick={() => setIsDusk(!isDusk)}
                className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-colors"
                title="Toggle Morning / Twilight Scenery"
              >
                {isDusk ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-blue-300" />}
                <span className="hidden sm:inline">{isDusk ? 'Morning Light' : 'Twilight View'}</span>
              </button>

              {/* Train Speed Toggle */}
              <button
                onClick={() => setSpeed(speed === 'scenic' ? 'express' : 'scenic')}
                className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                Speed: <span className="text-[#e5a93b] font-medium">{speed === 'scenic' ? 'Scenic 22s' : 'Express 14s'}</span>
              </button>
            </div>
          </div>

          {/* Panoramic Scenery Canvas */}
          <div className={`relative h-[360px] sm:h-[440px] w-full transition-all duration-700 overflow-hidden ${
            isDusk ? 'bg-gradient-to-b from-indigo-950 via-slate-900 to-emerald-950' : 'bg-gradient-to-b from-amber-100/10 via-emerald-950/40 to-[#07130d]'
          }`}>
            
            {/* Background Landscape Photo Layer (Lush green Uttar Pradesh fields) */}
            <img
              src="/src/assets/images/varanasi_train_greenery_1790759397806.jpg"
              alt="Lush green fields and railway tracks en route to Varanasi"
              referrerPolicy="no-referrer"
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
                isDusk ? 'opacity-40 brightness-75 contrast-125' : 'opacity-85'
              }`}
            />

            {/* Gradient Scrims for depth and atmospheric morning mist */}
            <div className={`absolute inset-0 pointer-events-none transition-colors duration-700 ${
              isDusk 
                ? 'bg-gradient-to-t from-black via-black/40 to-indigo-950/60' 
                : 'bg-gradient-to-t from-[#0b0c10] via-black/25 to-amber-500/10'
            }`} />

            {/* Distant Telegraph Poles & Catenary Wire Silhouette */}
            <div className="absolute bottom-28 left-0 right-0 h-1 border-b border-white/20 z-0">
              <div className="flex justify-between w-full opacity-30">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="w-[2px] h-14 bg-white/40 transform -translate-y-12" />
                ))}
              </div>
            </div>

            {/* The Moving Train Track Level */}
            <div className="absolute bottom-16 left-0 right-0 h-10 border-t-2 border-stone-600 bg-stone-900/90 z-10">
              <div className="w-full h-full flex justify-between items-center px-1 overflow-hidden opacity-60">
                {[...Array(60)].map((_, i) => (
                  <div key={i} className="w-1.5 h-6 bg-amber-950/80 rounded-xs mx-[2px] border-r border-stone-800" />
                ))}
              </div>
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-slate-400 shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
              <div className="absolute bottom-2 left-0 right-0 h-[2px] bg-slate-500" />
            </div>

            {/* Moving Indian Railways Express Train from Left to Right */}
            <div className={`absolute bottom-20 z-10 will-change-transform ${getAnimationClass()}`}>
              <div className="flex items-end">
                
                {/* 1. Indian Railways Locomotive */}
                <div className="relative w-44 h-16 bg-gradient-to-r from-red-800 via-red-700 to-red-900 rounded-t-lg border-t-2 border-r-2 border-red-500 shadow-xl flex flex-col justify-between p-2">
                  
                  {/* Roof & Electric Pantograph */}
                  <div className="absolute -top-6 left-10 w-12 h-6 flex flex-col items-center">
                    <div className="w-10 h-[2px] bg-stone-300" />
                    <div className="w-6 h-5 border-l border-r border-t border-stone-300 transform -skew-x-12" />
                    <div className="w-1 h-3 bg-stone-400" />
                  </div>

                  {/* Engine Front Nose */}
                  <div className="absolute top-2 right-1 flex flex-col items-end">
                    <div className="flex items-center gap-1">
                      <div className="w-3.5 h-3.5 rounded-full bg-amber-200 border-2 border-white shadow-[0_0_20px_10px_rgba(253,224,71,0.7)] animate-pulse" />
                      <div className="w-24 h-8 bg-gradient-to-r from-amber-200/50 to-transparent transform -skew-x-45 pointer-events-none" />
                    </div>
                    <span className="text-[8px] font-mono text-white/90 font-bold uppercase tracking-wider pr-1">
                      IR · 30214
                    </span>
                  </div>

                  <div className="w-12 h-4 bg-sky-200/90 rounded border border-white/60 ml-auto mr-4 shadow-inner" />

                  <div className="w-full h-2.5 bg-amber-100 flex items-center justify-between px-2 my-auto shadow-sm">
                    <span className="text-[7px] font-bold text-red-900 tracking-wider">INDIAN RAILWAYS</span>
                    <span className="text-[7px] font-mono text-red-900">WAP-7</span>
                  </div>

                  <div className="flex justify-around items-center -mb-4 pt-1">
                    <div className="w-5 h-5 rounded-full bg-stone-800 border-2 border-stone-400 flex items-center justify-center animate-spin">
                      <div className="w-2 h-2 rounded-full bg-stone-600" />
                    </div>
                    <div className="w-5 h-5 rounded-full bg-stone-800 border-2 border-stone-400 flex items-center justify-center animate-spin">
                      <div className="w-2 h-2 rounded-full bg-stone-600" />
                    </div>
                    <div className="w-5 h-5 rounded-full bg-stone-800 border-2 border-stone-400 flex items-center justify-center animate-spin">
                      <div className="w-2 h-2 rounded-full bg-stone-600" />
                    </div>
                  </div>
                </div>

                <div className="w-2.5 h-3 bg-stone-900 mb-2 border-t border-b border-stone-600" />

                {/* 2. Coach 1 (B1 AC-3 Tier) */}
                <div className="relative w-56 h-15 bg-gradient-to-b from-sky-900 to-blue-950 rounded-t border-t border-sky-400 shadow-lg flex flex-col justify-between p-1.5">
                  <div className="flex justify-between items-center text-[7px] text-white/60 font-mono px-1">
                    <span>NORTHERN ZONE</span>
                    <span className="text-[#e5a93b] font-bold">GEN - SL</span>
                  </div>

                  <div className="flex justify-between gap-1.5 my-auto px-1">
                    {[1, 2, 3, 4, 5].map((w) => (
                      <div
                        key={w}
                        className={`w-8 h-4.5 rounded-sm border border-white/40 overflow-hidden relative ${
                          isDusk ? 'bg-amber-200/90 shadow-[0_0_8px_rgba(251,191,36,0.6)]' : 'bg-sky-100/80'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="w-full h-1 bg-[#e5a93b]" />

                  <div className="flex justify-between px-3 -mb-3.5">
                    <div className="flex gap-1">
                      <div className="w-4 h-4 rounded-full bg-stone-800 border border-stone-400 animate-spin" />
                      <div className="w-4 h-4 rounded-full bg-stone-800 border border-stone-400 animate-spin" />
                    </div>
                    <div className="flex gap-1">
                      <div className="w-4 h-4 rounded-full bg-stone-800 border border-stone-400 animate-spin" />
                      <div className="w-4 h-4 rounded-full bg-stone-800 border border-stone-400 animate-spin" />
                    </div>
                  </div>
                </div>

                <div className="w-2.5 h-3 bg-stone-900 mb-2 border-t border-b border-stone-600" />

                {/* 3. Coach 2 (B2 AC-3 Tier) */}
                <div className="relative w-56 h-15 bg-gradient-to-b from-sky-900 to-blue-950 rounded-t border-t border-sky-400 shadow-lg flex flex-col justify-between p-1.5">
                  <div className="flex justify-between items-center text-[7px] text-white/60 font-mono px-1">
                    <span>VARANASI EXP</span>
                    <span className="text-[#e5a93b] font-bold">GEN - SL</span>
                  </div>

                  <div className="flex justify-between gap-1.5 my-auto px-1">
                    {[1, 2, 3, 4, 5].map((w) => (
                      <div
                        key={w}
                        className={`w-8 h-4.5 rounded-sm border border-white/40 overflow-hidden relative ${
                          isDusk ? 'bg-amber-200/90 shadow-[0_0_8px_rgba(251,191,36,0.6)]' : 'bg-sky-100/80'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="w-full h-1 bg-[#e5a93b]" />

                  <div className="flex justify-between px-3 -mb-3.5">
                    <div className="flex gap-1">
                      <div className="w-4 h-4 rounded-full bg-stone-800 border border-stone-400 animate-spin" />
                      <div className="w-4 h-4 rounded-full bg-stone-800 border border-stone-400 animate-spin" />
                    </div>
                    <div className="flex gap-1">
                      <div className="w-4 h-4 rounded-full bg-stone-800 border border-stone-400 animate-spin" />
                      <div className="w-4 h-4 rounded-full bg-stone-800 border border-stone-400 animate-spin" />
                    </div>
                  </div>
                </div>

                <div className="w-2.5 h-3 bg-stone-900 mb-2 border-t border-b border-stone-600" />

                {/* 4. Coach 3 (S1 Sleeper) */}
                <div className="relative w-52 h-15 bg-gradient-to-b from-sky-950 to-slate-900 rounded-t border-t border-sky-400/80 shadow-lg flex flex-col justify-between p-1.5">
                  <div className="flex justify-between items-center text-[7px] text-white/50 font-mono px-1">
                    <span>INDIAN RAILWAYS</span>
                    <span>S1 · SLEEPER</span>
                  </div>

                  <div className="flex justify-between gap-1.5 my-auto px-1">
                    {[1, 2, 3, 4].map((w) => (
                      <div
                        key={w}
                        className={`w-8 h-4.5 rounded-sm border border-white/30 overflow-hidden ${
                          isDusk ? 'bg-amber-100/70' : 'bg-sky-100/60'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="w-full h-1 bg-[#e5a93b]/70" />

                  <div className="flex justify-between px-3 -mb-3.5">
                    <div className="flex gap-1">
                      <div className="w-4 h-4 rounded-full bg-stone-800 border border-stone-400 animate-spin" />
                      <div className="w-4 h-4 rounded-full bg-stone-800 border border-stone-400 animate-spin" />
                    </div>
                    <div className="flex gap-1">
                      <div className="w-4 h-4 rounded-full bg-stone-800 border border-stone-400 animate-spin" />
                      <div className="w-4 h-4 rounded-full bg-stone-800 border border-stone-400 animate-spin" />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Foreground Landscape Details */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0b0c10] via-emerald-950/70 to-transparent pointer-events-none z-20 flex items-end">
              <div className="w-full flex justify-between px-6 pb-2 text-white/40 text-[11px] font-mono">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#e5a93b]" />
                  Coordinates: 25.3176° N, 82.9739° E
                </span>
                <span className="hidden sm:inline">
                  Speed: 110 km/h · Malviya Rail Bridge Corridor
                </span>
              </div>
            </div>

          </div>

          {/* Bottom Banner inside Container */}
          <div className="bg-[#12141c] p-4 sm:p-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#e5a93b]/10 border border-[#e5a93b]/30 flex items-center justify-center text-[#e5a93b] shrink-0 font-editorial text-base font-bold">
                FS
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">
                  6-Day Journey: 3 Days Travelling, 3 Days in Varanasi
                </h4>
                <p className="text-xs text-white/60">
                  Documented by Fardin Shaik during his journey with his friend.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onExploreClipsClick}
                className="flex-1 sm:flex-none px-4 py-2 text-xs font-medium text-white/90 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors whitespace-nowrap text-center"
              >
                View 22 Photo Clips
              </button>
              <button
                onClick={onExploreClick}
                className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-black bg-[#e5a93b] hover:bg-[#f5b84c] rounded-lg transition-all shadow-md whitespace-nowrap text-center"
              >
                Explore Kashi Vishwanath ↓
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
