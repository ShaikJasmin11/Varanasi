import React, { useState } from 'react';
import { MapPin, Maximize2, Compass, Utensils, Flame, Footprints, Train, Play, Volume2, Sparkles } from 'lucide-react';
import { PHOTO_CLIPS } from '../data/portfolioData';
import { CategoryType, PhotoClip } from '../types/portfolio';

interface CuratedGalleriesSectionProps {
  onSelectClip: (clip: PhotoClip) => void;
}

export const CuratedGalleriesSection: React.FC<CuratedGalleriesSectionProps> = ({
  onSelectClip,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType | 'all'>('all');

  const categories = [
    { id: 'all', label: 'All (22)', icon: Compass, count: 22 },
    { id: 'food', label: 'Food (5)', icon: Utensils, count: 5 },
    { id: 'streets', label: 'street (8)', icon: Footprints, count: 8 },
    { id: 'aarti', label: 'ganga Aarti (3)', icon: Flame, count: 3 },
    { id: 'travelling', label: 'Travelling (5)', icon: Train, count: 5 },
  ];

  const filteredClips = activeCategory === 'all'
    ? PHOTO_CLIPS
    : PHOTO_CLIPS.filter((clip) => clip.category === activeCategory);

  const categoryDescriptions: Record<string, { title: string; subtitle: string; intro: string; anchor: string }> = {
    food: {
      title: 'Food (5 Clips)',
      subtitle: 'Sal Leaf Donas, Saffron Chai & The Blue Lassi Legacy',
      intro: 'Capturing the sensory culinary rituals of Varanasi: hot Tamatar and Kachori Chaat in hand, glistening single Gulab Jamun on sal leaf, bubbling coal-stove chai, Blue Lassi shop, and fresh halwai trays.',
      anchor: 'section-food',
    },
    streets: {
      title: 'street (8 Clips)',
      subtitle: 'Ancient Galis, Manikarnika Ghat, Night Rickshaw & Flood Steps',
      intro: 'Walking through 3,000-year-old stone alleys: Godowlia market traffic, temple sanctuary turtles, the eternal cremation fires at Manikarnika Ghat, night rickshaws, and rainy ghat steps.',
      anchor: 'section-streets',
    },
    aarti: {
      title: 'ganga Aarti (3 Clips)',
      subtitle: 'Sacred River Offerings & Reverence on the Ghats',
      intro: 'The profound spiritual rituals on Mother Ganga: single floating marigold diya, constellation of lamps tagged "FAITH", and thunderous "Hara Hara Mahadeva" invocations.',
      anchor: 'section-aarti',
    },
    travelling: {
      title: 'Travelling (5 Clips)',
      subtitle: 'The 3-Day Transit · Express Rails, Cabin Mirrors & Banaras Stations',
      intro: 'Documenting the train journey across the northern plains with friend @the._nani.05: coach mirror selfies, WAP-7 locomotive arrival, sleeper berth views, and rain on Banaras platform.',
      anchor: 'section-travelling',
    },
  };

  return (
    <section id="photo-journal" className="py-24 bg-[#0e1017] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-[#e5a93b] font-medium mb-3">
              <span>Documentary Clip Collection</span>
              <span aria-hidden="true">·</span>
              <span>22 Total Clips</span>
              <span aria-hidden="true">·</span>
              <span>Shot by Xiaomi 15 Ultra</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-editorial text-white font-normal tracking-tight">
              Curated Chapters
            </h2>
            <p className="text-sm text-white/60 mt-1 max-w-xl font-light">
              All 22 authentic documentary clips clicked and captured by Fardin Shaik
              during the 6-day Varanasi expedition with his friend.
            </p>
          </div>

          {/* Category Filter Controls */}
          <div className="flex items-center gap-1.5 p-1.5 bg-black/50 border border-white/10 rounded-xl overflow-x-auto max-w-full">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as CategoryType | 'all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#e5a93b] text-black shadow-md font-semibold'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section Anchors for Direct Navigation */}
        <div id="section-travelling" className="pt-2" />

        {/* Dynamic Chapter Header */}
        {activeCategory !== 'all' && (
          <div id={categoryDescriptions[activeCategory].anchor} className="mb-10 p-6 rounded-2xl bg-[#141722] border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#e5a93b] font-mono">
                {categoryDescriptions[activeCategory].subtitle}
              </span>
              <h3 className="text-2xl font-editorial text-white mt-1">
                {categoryDescriptions[activeCategory].title}
              </h3>
              <p className="text-xs text-white/70 mt-2 max-w-2xl font-light leading-relaxed">
                {categoryDescriptions[activeCategory].intro}
              </p>
            </div>
            <span className="text-xs font-mono text-white/40 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5 whitespace-nowrap">
              {filteredClips.length} Clips
            </span>
          </div>
        )}

        {/* 21 Clips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredClips.map((clip) => (
            <div
              key={clip.id}
              onClick={() => onSelectClip(clip)}
              className="group cursor-pointer rounded-2xl bg-[#141620] border border-white/10 overflow-hidden hover:border-[#e5a93b]/50 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-2xl flex flex-col justify-between"
            >
              {/* Media Preview Container */}
              <div className="relative aspect-[4/3] bg-black overflow-hidden">
                {clip.videoUrl || (clip.image && (clip.image.endsWith('.mp4') || clip.image.endsWith('.mov') || clip.image.endsWith('.webm') || clip.image.endsWith('.m4v'))) ? (
                  <video
                    src={clip.videoUrl || clip.image}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onMouseEnter={(e) => { e.currentTarget.play().catch(() => {}); }}
                    onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                ) : (
                  <img
                    src={clip.image}
                    alt={clip.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#141620] via-black/25 to-black/30 pointer-events-none" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[#e5a93b] border border-white/10">
                      {clip.category}
                    </span>
                    {clip.mediaType === 'video' ? (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                        <Play className="w-2.5 h-2.5 fill-current" />
                        <span>{clip.duration || 'VIDEO'}</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 border border-white/10">
                        PHOTO
                      </span>
                    )}
                  </div>
                  
                  <div className="p-1.5 rounded-full bg-black/60 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Center Play Icon for Video Clips on hover */}
                {clip.mediaType === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-[#e5a93b] group-hover:text-black transition-all shadow-xl">
                      <Play className="w-4 h-4 translate-x-0.5 fill-current" />
                    </div>
                  </div>
                )}

                {/* Location */}
                <div className="absolute bottom-3 left-3 right-3 text-[11px] text-white/70 font-mono flex items-center gap-1.5 pointer-events-none">
                  <MapPin className="w-3 h-3 text-[#e5a93b] shrink-0" />
                  <span className="truncate">{clip.location}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h4 className="text-lg font-editorial font-medium text-white group-hover:text-[#e5a93b] transition-colors leading-snug">
                    {clip.title}
                  </h4>
                  
                  <p className="text-xs text-white/65 line-clamp-2 leading-relaxed font-light">
                    {clip.story}
                  </p>

                  {/* Poetic Overlay preview if present */}
                  {clip.overlayText && (
                    <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200/90 font-serif italic line-clamp-1">
                      "{clip.overlayText}"
                    </div>
                  )}

                  {/* Audio mood preview if present */}
                  {clip.audioMood && (
                    <div className="flex items-center gap-1.5 text-[10px] text-white/50 font-mono">
                      <Volume2 className="w-3 h-3 text-[#e5a93b]" />
                      <span className="truncate">{clip.audioMood}</span>
                    </div>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Section Anchors for Direct Navigation */}
        <div id="section-food" />
        <div id="section-streets" />
        <div id="section-aarti" />

        {/* Clean Summary Footer */}
        <div className="mt-14 p-6 rounded-2xl bg-[#12141c] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-white/60 space-y-1 text-center sm:text-left">
            <span className="font-semibold text-white">All 22 Clips Categorized</span>
            <p>Food (5) · street (8) · ganga Aarti (3) · Travelling (5) · Captured with friend @the._nani.05</p>
          </div>
          <div className="text-xs font-mono text-[#e5a93b]">
            Shot by Xiaomi 15 Ultra
          </div>
        </div>

      </div>
    </section>
  );
};
