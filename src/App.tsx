import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroTrainSection } from './components/HeroTrainSection';
import { KashiVishwanathSection } from './components/KashiVishwanathSection';
import { CuratedGalleriesSection } from './components/CuratedGalleriesSection';
import { ReelsSection } from './components/ReelsSection';
import { TripOverviewSection } from './components/TripOverviewSection';
import { Footer } from './components/Footer';
import { LightboxModal } from './components/LightboxModal';
import { PHOTO_CLIPS } from './data/portfolioData';
import { PhotoClip } from './types/portfolio';

export default function App() {
  const [selectedClip, setSelectedClip] = useState<PhotoClip | null>(null);

  const handleNextClip = () => {
    if (!selectedClip) return;
    const currentIndex = PHOTO_CLIPS.findIndex((c) => c.id === selectedClip.id);
    const nextIndex = (currentIndex + 1) % PHOTO_CLIPS.length;
    setSelectedClip(PHOTO_CLIPS[nextIndex]);
  };

  const handlePrevClip = () => {
    if (!selectedClip) return;
    const currentIndex = PHOTO_CLIPS.findIndex((c) => c.id === selectedClip.id);
    const prevIndex = (currentIndex - 1 + PHOTO_CLIPS.length) % PHOTO_CLIPS.length;
    setSelectedClip(PHOTO_CLIPS[prevIndex]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#f2efe9] flex flex-col font-sans selection:bg-[#e5a93b] selection:text-black">
      
      {/* Clean 3-Zone Navigation Top Bar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* 1. Hero: Train moving across greenery with authentic controls */}
        <HeroTrainSection
          onExploreClick={() => scrollToSection('kashi-vishwanath')}
          onExploreClipsClick={() => scrollToSection('photo-journal')}
        />

        {/* 2. Mid Home Page: Full container with Kashi Vishwanath on left & Wikipedia matter on right */}
        <KashiVishwanathSection />

        {/* 3. The 4 Chapters: Travelling (6), Food (5), Varanasi Streets (5), Ganga Aarti (5) = 21 Clips */}
        <CuratedGalleriesSection
          onSelectClip={(clip) => setSelectedClip(clip)}
        />

        {/* 4. Instagram Reels: 4 Reels in Varanasi */}
        <ReelsSection />

        {/* 5. 6-Day Expedition Overview: 3 Days Travelling, 3 Days in Varanasi (Trip with his friend) */}
        <TripOverviewSection />

      </main>

      {/* Professional Portfolio Footer */}
      <Footer />

      {/* High-Resolution Photo Lightbox Modal */}
      <LightboxModal
        clip={selectedClip}
        onClose={() => setSelectedClip(null)}
        onNext={handleNextClip}
        onPrev={handlePrevClip}
      />

    </div>
  );
}
