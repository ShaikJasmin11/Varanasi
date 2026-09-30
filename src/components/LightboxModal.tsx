import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Play, Pause, Volume2 } from 'lucide-react';
import { PhotoClip } from '../types/portfolio';

interface LightboxModalProps {
  clip: PhotoClip | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  clip,
  onClose,
  onNext,
  onPrev,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(25);

  useEffect(() => {
    if (clip) {
      setIsPlaying(true);
      setProgress(10);
    }
  }, [clip]);

  // Simulated progress bar for video clips
  useEffect(() => {
    if (!clip || clip.mediaType !== 'video' || !isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 200);
    return () => clearInterval(interval);
  }, [clip, isPlaying]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === ' ' && clip?.mediaType === 'video') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev, clip]);

  if (!clip) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-6 lg:p-10 animate-in fade-in duration-200">
      
      {/* Close button top right */}
      <button
        onClick={onClose}
        aria-label="Close Lightbox"
        className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Prev / Next controls */}
      {onPrev && (
        <button
          onClick={onPrev}
          aria-label="Previous Clip"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15 hidden sm:flex items-center justify-center"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {onNext && (
        <button
          onClick={onNext}
          aria-label="Next Clip"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15 hidden sm:flex items-center justify-center"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Modal Main Content Container */}
      <div className="relative max-w-6xl w-full max-h-[90vh] bg-[#10121a] rounded-2xl border border-white/15 overflow-hidden flex flex-col lg:flex-row shadow-2xl">
        
        {/* Media Viewport */}
        <div className="lg:w-2/3 bg-black flex flex-col items-center justify-center relative min-h-[320px] lg:min-h-[580px] p-2 overflow-hidden group">
          
          {clip.videoUrl || (clip.image && (clip.image.endsWith('.mp4') || clip.image.endsWith('.mov') || clip.image.endsWith('.webm') || clip.image.endsWith('.m4v'))) ? (
            <video
              src={clip.videoUrl || clip.image}
              controls
              autoPlay
              playsInline
              className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg"
            />
          ) : (
            <img
              src={clip.image}
              alt={clip.title}
              referrerPolicy="no-referrer"
              className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg"
            />
          )}

          {/* Poetic overlay text directly on media if present */}
          {clip.overlayText && (
            <div className="absolute inset-x-6 top-8 z-20 pointer-events-none">
              <div className="max-w-md mx-auto p-3.5 rounded-xl bg-black/65 backdrop-blur-md border border-white/15 text-center text-xs sm:text-sm font-serif italic text-amber-100 shadow-2xl">
                "{clip.overlayText}"
              </div>
            </div>
          )}

          {/* Video Player Controls Bar if mediaType is video and not native video controls */}
          {clip.mediaType === 'video' && !(clip.videoUrl || (clip.image && (clip.image.endsWith('.mp4') || clip.image.endsWith('.mov') || clip.image.endsWith('.webm') || clip.image.endsWith('.m4v')))) && (
            <div className="absolute bottom-4 left-4 right-4 z-20 bg-black/70 backdrop-blur-md p-3 rounded-xl border border-white/10 space-y-2">
              <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#e5a93b] transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-white/80">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <span className="font-mono text-[11px] text-white/60">
                    {clip.duration || '0:10'} · 8K Master Cinema
                  </span>
                </div>

                {clip.audioMood && (
                  <div className="flex items-center gap-1.5 text-[11px] text-[#e5a93b] font-mono">
                    <Volume2 className="w-3.5 h-3.5" />
                    <span className="truncate max-w-[200px]">{clip.audioMood}</span>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Metadata & Story Pane */}
        <div className="lg:w-1/3 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[450px] lg:max-h-[580px] bg-[#12141c]">
          <div className="space-y-4">
            
            {/* Category and media type */}
            <div className="flex items-center justify-between text-xs text-white/50 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="uppercase tracking-widest text-[#e5a93b] font-medium">
                  {clip.category}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/70">
                  {clip.mediaType === 'video' ? `VIDEO (${clip.duration})` : 'PHOTO'}
                </span>
              </div>
              <span className="text-[10px] font-mono text-white/40 uppercase">
                {clip.aspectRatio}
              </span>
            </div>

            {/* Title & subtitle */}
            <div>
              <h3 className="text-xl sm:text-2xl font-editorial font-normal text-white">
                {clip.title}
              </h3>
              <p className="text-xs text-white/60 mt-1">{clip.subtitle}</p>
            </div>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-xs text-white/70">
              <MapPin className="w-3.5 h-3.5 text-[#e5a93b]" />
              <span>{clip.location}</span>
            </div>

            {/* Story */}
            <div className="text-xs text-white/80 leading-relaxed font-sans pt-2">
              <p>{clip.story}</p>
            </div>

            {/* Friend note / mention */}
            {clip.friendNote && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 space-y-1">
                <span className="font-semibold block text-[10px] uppercase tracking-wider text-[#e5a93b]">
                  With @the._nani.05:
                </span>
                <p className="italic">"{clip.friendNote}"</p>
              </div>
            )}

            {/* Audio Mood in sidebar if present */}
            {clip.audioMood && (
              <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 text-xs text-white/70 flex items-center gap-2">
                <Volume2 className="w-3.5 h-3.5 text-[#e5a93b]" />
                <span className="text-[11px] font-mono">Audio: {clip.audioMood}</span>
              </div>
            )}

            {/* Device tag */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
              <span>Shot on Xiaomi 15 Ultra</span>
              <span>{clip.aspectRatio}</span>
            </div>

          </div>

          <div className="pt-4 border-t border-white/10 text-[11px] text-white/40 flex items-center justify-between">
            <span>By Fardin Shaik (@fardhuu.scapes)</span>
            <span className="text-[#e5a93b]">With @the._nani.05</span>
          </div>

        </div>

      </div>

    </div>
  );
};
