// Pure Web Audio API synthesizers for train horn and sacred temple chime
class AudioManager {
  private ctx: AudioContext | null = null;

  private initCtx(): AudioContext | null {
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  // Authentic Indian Railways twin-tone express train horn
  playTrainHorn() {
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    
    // Low tone (approx 311 Hz - D#4) and High tone (approx 370 Hz - F#4)
    const freqs = [311, 370, 622];
    
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = idx === 2 ? 'triangle' : 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);

      // Filter for air horn resonance
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.08);
      gain.gain.setValueAtTime(0.08, now + 1.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.9);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 2.0);
    });
  }

  // Sacred bronze temple bell chime with rich natural harmonics
  playTempleBell() {
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Harmonic partials of a heavy temple bronze bell
    const partials = [
      { f: 432, g: 0.15, decay: 3.5 },
      { f: 864, g: 0.08, decay: 2.8 },
      { f: 1296, g: 0.04, decay: 2.0 },
      { f: 1728, g: 0.02, decay: 1.5 },
      { f: 2160, g: 0.01, decay: 1.0 },
    ];

    partials.forEach(({ f, g, decay }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(g, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + decay + 0.1);
    });
  }
}

export const soundFx = new AudioManager();
