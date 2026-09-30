import React from 'react';
import { MapPin, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#08090d] border-t border-white/10 text-white/60 py-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Tier */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-10 border-b border-white/10">
          <div className="space-y-3 max-w-sm">
            <span className="text-lg font-editorial font-semibold tracking-wider text-white uppercase block">
              Fardin Shaik
            </span>
            <p className="text-white/60 leading-relaxed font-light">
              Visual travelogue and documentary portfolio chronicling Varanasi, the sacred Ganges, and ancient street traditions. A 6-day journey (3 days travelling, 3 days staying in Varanasi) documented with his friend.
            </p>
            <div className="flex items-center gap-2 text-[#e5a93b] font-mono text-[11px]">
              <MapPin className="w-3.5 h-3.5" />
              <span>Varanasi, Uttar Pradesh · 25.3176° N, 82.9739° E</span>
            </div>
          </div>

          {/* Quick links & Chapters */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-2">
              <h4 className="text-white uppercase tracking-wider text-[11px] font-semibold font-mono">
                Chapters
              </h4>
              <ul className="space-y-1.5 text-white/50">
                <li><a href="#kashi-vishwanath" className="hover:text-white transition-colors">Kashi Vishwanath Temple</a></li>
                <li><a href="#section-food" className="hover:text-white transition-colors">Food (5 Clips)</a></li>
                <li><a href="#section-streets" className="hover:text-white transition-colors">street (8 Clips)</a></li>
                <li><a href="#section-aarti" className="hover:text-white transition-colors">ganga Aarti (3 Clips)</a></li>
                <li><a href="#section-travelling" className="hover:text-white transition-colors">Travelling (5 Clips)</a></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-white uppercase tracking-wider text-[11px] font-semibold font-mono">
                Media Series
              </h4>
              <ul className="space-y-1.5 text-white/50">
                <li>
                  <a href="#instagram-reels" className="hover:text-white transition-colors">
                    4 Reels (@fardhuu.scapes · @the._nani.05)
                  </a>
                </li>
                <li><a href="#photo-journal" className="hover:text-white transition-colors">21 Curated Photo Clips</a></li>
                <li><a href="#kashi-vishwanath" className="hover:text-white transition-colors">Wikipedia Encyclopedia</a></li>
              </ul>
            </div>

            <div className="space-y-2 col-span-2 sm:col-span-1">
              <h4 className="text-white uppercase tracking-wider text-[11px] font-semibold font-mono">
                Camera Gear
              </h4>
              <ul className="space-y-1.5 text-white/50 font-mono text-[11px]">
                <li className="text-white/80 font-semibold">Xiaomi 15 Ultra</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Tier */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white/40">
          <p className="text-center sm:text-left">
            © 2024 Fardin Shaik · 6-Day Varanasi Trip · Shot by Xiaomi 15 Ultra · 22 Clips &amp; 4 Reels
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-[#e5a93b] transition-colors font-medium text-xs"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
