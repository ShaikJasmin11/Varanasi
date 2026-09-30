import React, { useState, useEffect, useRef } from 'react';
import { X, Volume2, VolumeX, Play, Pause, Music } from 'lucide-react';
import { InstagramReel } from '../types/portfolio';

interface ReelModalProps {
  reel: InstagramReel | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const ReelModal: React.FC<ReelModalProps> = ({
  reel,
  onClose,
  onNext,
  onPrev,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const hasVideoFile = Boolean(
    reel && (
      reel.videoUrl || 
      (reel.coverImage && (
        reel.coverImage.endsWith('.mp4') || 
        reel.coverImage.endsWith('.mov') || 
        reel.coverImage.endsWith('.webm') || 
        reel.coverImage.endsWith('.m4v')
      ))
    )
  );

  // Synchronize mute state with HTML5 video element
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Synchronize play/pause and handle browser autoplay audio policies
  useEffect(() => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.volume = 1.0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Modern browsers block autoplay with audio until user interaction
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch(() => {});
          }
        });
      }
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying, reel]);

  // Fallback simulated progress bar for static images; real timeupdate for videos
  useEffect(() => {
    if (hasVideoFile || !isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1.5));
    }, 200);
    return () => clearInterval(interval);
  }, [hasVideoFile, isPlaying]);

  const toggleSound = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      videoRef.current.volume = 1.0;
      setIsMuted(nextMuted);
      if (nextMuted === false && videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      }
    } else {
      setIsMuted((prev) => !prev);
    }
  };

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === ' ' || e.key === 'k') {
        e.preventDefault();
        togglePlay();
      }
      if (e.key === 'm') {
        e.preventDefault();
        toggleSound();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev, isMuted, isPlaying]);

  if (!reel) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-6 animate-in fade-in duration-200">
      
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close Reel Player"
        className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Main Reel Device Container (9:16 aspect ratio) */}
      <div 
        onClick={toggleSound}
        className="relative w-full max-w-sm sm:max-w-md h-[85vh] max-h-[760px] bg-black rounded-3xl overflow-hidden border border-white/20 shadow-2xl flex flex-col justify-between cursor-pointer select-none"
      >
        
        {/* Background Visual Layer */}
        <div className="absolute inset-0 z-0">
          {hasVideoFile ? (
            <video
              ref={videoRef}
              src={reel.videoUrl || reel.coverImage}
              autoPlay
              loop
              playsInline
              onTimeUpdate={(e) => {
                const el = e.currentTarget;
                if (el.duration) {
                  setProgress((el.currentTime / el.duration) * 100);
                }
              }}
              className="w-full h-full object-cover object-center transform scale-105 filter brightness-85"
            />
          ) : (
            <img
              src={reel.coverImage}
              alt={reel.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transform scale-105 filter brightness-85"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />
        </div>

        {/* Floating Tap-to-Unmute Banner if muted */}
        {hasVideoFile && isMuted && (
          <div className="absolute top-24 inset-x-0 z-30 flex justify-center pointer-events-none animate-bounce">
            <div className="px-4 py-2 rounded-full bg-amber-500 text-black font-semibold text-xs flex items-center gap-2 shadow-2xl">
              <VolumeX className="w-4 h-4" />
              <span>Tap Reel to Unmute Sound</span>
            </div>
          </div>
        )}

        {/* Top Progress bar & Instagram Header */}
        <div className="relative z-20 p-4 space-y-3 pointer-events-auto" onClick={(e) => e.stopPropagation()}>
          {/* Progress bar */}
          <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* User profile & sound toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#e5a93b] text-black font-bold text-xs flex items-center justify-center ring-2 ring-white/50">
                FS
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <a
                    href="https://instagram.com/fardhuu.scapes"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-white hover:text-[#e5a93b] transition-colors"
                  >
                    fardhuu.scapes
                  </a>
                  <span className="text-[10px] text-white/40">with</span>
                  <a
                    href="https://instagram.com/the._nani.05"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-medium text-amber-200/90 hover:underline"
                  >
                    the._nani.05
                  </a>
                </div>
                <span className="text-[10px] text-white/70 block">Varanasi, Uttar Pradesh · Shot on Xiaomi 15 Ultra</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleSound}
                className="p-2 rounded-full bg-black/60 text-white hover:bg-black/90 border border-white/20 text-xs transition-colors"
                title={isMuted ? 'Unmute (M)' : 'Mute (M)'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-amber-400" /> : <Volume2 className="w-4 h-4 text-white" />}
              </button>
              <button
                onClick={togglePlay}
                className="p-2 rounded-full bg-black/60 text-white hover:bg-black/90 border border-white/20 text-xs transition-colors"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Center Dynamic Video Visuals & Typography Layer */}
        <div className="relative z-10 m-auto w-full px-6 flex flex-col items-center justify-center pointer-events-none text-center">
          {/* Reel 1: Dynamic Sequence 'EGO' -> 'Money?' -> 'Power?' -> 'Attitude?' -> 'Pride?' -> 'Ends here' */}
          {reel.quoteSequence && (
            <div className="space-y-2 animate-in fade-in zoom-in-90 duration-300">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#e5a93b] bg-black/60 px-2.5 py-1 rounded-full border border-white/10">
                मणिकर्णिका द्वार
              </span>
              <div className="text-3xl sm:text-4xl font-black text-white tracking-wider drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] uppercase font-mono">
                {(() => {
                  const seq = reel.quoteSequence;
                  const idx = Math.min(
                    Math.floor((progress / 100) * seq.length),
                    seq.length - 1
                  );
                  return seq[idx];
                })()}
              </div>
            </div>
          )}

          {/* Reel 2: FAITH */}
          {reel.id === 'reel-02' && (
            <div className="space-y-1.5 animate-in fade-in zoom-in-95 duration-500">
              <div className="text-3xl sm:text-4xl font-bold tracking-[0.25em] text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                FAITH
              </div>
              <div className="text-[11px] font-mono tracking-wider text-amber-200/90 drop-shadow-md">
                © FARDHUU.SCAPES
              </div>
            </div>
          )}

          {/* Reel 3: Hindi Poetry */}
          {reel.id === 'reel-03' && (
            <div className="max-w-xs space-y-2 p-3 rounded-2xl bg-black/70 backdrop-blur-md border border-white/15 animate-in fade-in duration-300">
              <p className="text-xs sm:text-sm font-serif text-white/95 leading-relaxed">
                पैसा, घर, प्यार, लोग, दुनिया, मोहब्बत। सब रह जाएगा। सब साथ छोड़ देते हैं। बस यादें और खामोशियां साथ रहती हैं।
              </p>
              <span className="text-[10px] font-mono text-[#e5a93b] block">
                IG - FARDHUU.SCAPES
              </span>
            </div>
          )}

          {/* Reel 4: Life & Eternity */}
          {reel.id === 'reel-04' && (
            <div className="max-w-xs space-y-2 p-3 rounded-2xl bg-black/70 backdrop-blur-md border border-white/15 animate-in fade-in duration-300">
              <div className="text-xs sm:text-sm font-serif text-white font-medium">
                मणिकर्णिका - जहां जीवन और अनंतता का मिलन होता है
              </div>
              <div className="text-[11px] text-white/70 italic">
                Manikarnika - where life and eternity meet
              </div>
              <span className="text-[10px] font-mono text-cyan-300 block">
                IG - fardhuu.scapes
              </span>
            </div>
          )}

          {/* Playback Pause Icon */}
          {!isPlaying && (
            <div className="mt-4 p-4 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/20 animate-in zoom-in-75">
              <Play className="w-8 h-8 translate-x-0.5" />
            </div>
          )}
        </div>

        {/* Bottom Reel Caption & Action Bar */}
        <div className="relative z-10 p-5 space-y-3 bg-gradient-to-t from-black via-black/80 to-transparent">
          
          {/* Reel Caption */}
          <div className="space-y-1.5 text-left">
            <h4 className="text-sm font-semibold text-white">{reel.title}</h4>
            <p className="text-xs text-white/80 leading-relaxed font-sans line-clamp-3">
              {reel.caption}
            </p>
            {reel.friendMention && (
              <p className="text-[11px] text-[#e5a93b] font-medium pt-1">
                👥 {reel.friendMention}
              </p>
            )}
          </div>

          {/* Audio track info with animated vinyl */}
          <div className="flex items-center gap-2 text-[11px] text-white/70 py-1 border-t border-white/10">
            <Music className="w-3.5 h-3.5 text-[#e5a93b] animate-spin" />
            <span className="truncate">{reel.audioTrack}</span>
          </div>

          {/* Navigation and actions row */}
          <div className="flex items-center justify-between pt-1">
            <a
              href="https://instagram.com/fardhuu.scapes"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-[#e5a93b] hover:underline font-mono"
            >
              Watch on Instagram ↗
            </a>

            {/* Next / Prev quick jump */}
            <div className="flex items-center gap-1 text-[11px] text-white/70">
              {onPrev && (
                <button onClick={onPrev} className="px-2.5 py-1 bg-white/10 rounded hover:bg-white/20 transition-colors">
                  Prev
                </button>
              )}
              {onNext && (
                <button onClick={onNext} className="px-2.5 py-1 bg-white/10 rounded hover:bg-white/20 transition-colors">
                  Next
                </button>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
