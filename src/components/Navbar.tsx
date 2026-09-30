import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Kashi Vishwanath', href: '#kashi-vishwanath' },
    { label: 'Food', href: '#section-food' },
    { label: 'street', href: '#section-streets' },
    { label: 'ganga Aarti', href: '#section-aarti' },
    { label: 'Travelling', href: '#section-travelling' },
    { label: 'Reels', href: '#instagram-reels' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0b0c10]/90 backdrop-blur-md border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="text-lg font-editorial tracking-wider text-white hover:text-[#e5a93b] transition-colors whitespace-nowrap"
        >
          <span className="font-semibold uppercase tracking-widest text-sm sm:text-base">
            Fardin Shaik
          </span>
          <span className="text-xs text-white/40 font-sans tracking-normal hidden md:inline ml-2">
            · Varanasi Portfolio
          </span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs tracking-wider uppercase font-medium text-white/70">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#e5a93b] transition-colors hover:underline underline-offset-8 decoration-[#e5a93b]/60 whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-white/60 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
            <span className="text-[#e5a93b] font-medium">6 Days</span>
            <span>·</span>
            <span>22 Clips</span>
            <span>·</span>
            <span>4 Reels</span>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white/80 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e1017] border-b border-white/10 px-6 py-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm text-white/80 hover:text-[#e5a93b] py-1.5"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 text-xs text-white/40 font-mono">
            6-Day Trip (3 Days Travelling · 3 Days Staying) · 21 Clips · 4 Reels
          </div>
        </div>
      )}
    </header>
  );
};
