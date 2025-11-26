
import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playHover: () => void;
  playClick: () => void;
  playSwipeIn: () => void;
  playSwipeOut: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

// Expanded Musical Note Frequencies
const NOTES = {
  C3: 130.81,
  E3: 164.81,
  G3: 196.00,
  A3: 220.00,
  B3: 246.94,
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.00,
  A4: 440.00,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
  G5: 783.99,
  A5: 880.00,
  B5: 987.77,
  C6: 1046.50
};

export const SoundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  // Audio Context & Nodes
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const bgmGainRef = useRef<GainNode | null>(null);
  
  // Buffers for texture
  const noiseBufferRef = useRef<AudioBuffer | null>(null);

  // Initialize Audio Engine
  useEffect(() => {
    const initAudio = () => {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Master Gain (Volume Control)
      const masterGain = ctx.createGain();
      masterGain.gain.value = isMuted ? 0 : 0.8;
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // BGM Gain
      const bgmGain = ctx.createGain();
      bgmGain.gain.value = 0.12; // Subtle Ambient level
      bgmGain.connect(masterGain);
      bgmGainRef.current = bgmGain;

      // Generate White/Pink Noise Buffer (High Quality)
      const bufferSize = ctx.sampleRate * 2; // 2 seconds
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        // Pink noise approximation
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        data[i] *= 0.11; 
        b6 = white * 0.115926;
      }
      noiseBufferRef.current = buffer;
    };

    initAudio();

    return () => {
      audioCtxRef.current?.close();
    };
  }, []);

  // Handle Mute
  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      const now = audioCtxRef.current.currentTime;
      masterGainRef.current.gain.cancelScheduledValues(now);
      masterGainRef.current.gain.linearRampToValueAtTime(isMuted ? 0 : 0.8, now + 0.3);
    }
  }, [isMuted]);

  // Start BGM on Interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted && audioCtxRef.current) {
        setHasInteracted(true);
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }
        if (bgmGainRef.current) {
             startCinematicBGM(audioCtxRef.current, bgmGainRef.current);
        }
      }
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [hasInteracted]);

  // --- Sound Generation ---

  const startCinematicBGM = (ctx: AudioContext, destination: AudioNode) => {
    const t = ctx.currentTime;

    // Layer 1: The "Deep Space" Drone
    if (noiseBufferRef.current) {
        const src = ctx.createBufferSource();
        src.buffer = noiseBufferRef.current;
        src.loop = true;
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 80; // Very deep

        // LFO to modulate filter (breathing effect)
        const lfo = ctx.createOscillator();
        lfo.frequency.value = 0.05; 
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 40; 
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        lfo.start(t);

        src.connect(filter);
        filter.connect(destination);
        src.start(t);
    }

    // Layer 2: Ethereal Pads (C Major 9)
    // C3 + G3 + B3 + E4 (Open voicing)
    const frequencies = [NOTES.C3, NOTES.G3, NOTES.B3, NOTES.E4];
    
    frequencies.forEach((freq, i) => {
       const osc = ctx.createOscillator();
       const gain = ctx.createGain();
       
       // Triangle waves are softer
       osc.type = 'triangle'; 
       osc.frequency.value = freq;
       
       // Slight detune for richness (Chorus effect)
       osc.detune.value = i % 2 === 0 ? 5 : -5;

       const panner = ctx.createStereoPanner();
       // Static panning spread
       panner.pan.value = (i / frequencies.length) * 2 - 1; 

       osc.connect(gain);
       gain.connect(panner);
       panner.connect(destination);
       
       // Very low volume for background
       gain.gain.value = 0.03; 

       osc.start(t);
    });
  };

  const playHover = () => {
    if (isMuted || !audioCtxRef.current || !masterGainRef.current) return;
    const ctx = audioCtxRef.current;
    const t = ctx.currentTime;

    // High Tech "Blip"
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(masterGainRef.current);

    osc.type = 'sine';
    // Fast pitch drop
    osc.frequency.setValueAtTime(1200, t);
    osc.frequency.exponentialRampToValueAtTime(800, t + 0.03);

    gain.gain.setValueAtTime(0.05, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);

    osc.start(t);
    osc.stop(t + 0.04);
  };

  const playClick = () => {
    if (isMuted || !audioCtxRef.current || !masterGainRef.current) return;
    const ctx = audioCtxRef.current;
    const t = ctx.currentTime;

    // "Engagement" Sound (Low Thud + High Click)
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'triangle'; // Body
    osc.connect(gain);
    gain.connect(masterGainRef.current);

    // Pitch sweep
    osc.frequency.setValueAtTime(300, t);
    osc.frequency.exponentialRampToValueAtTime(50, t + 0.1);
    
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

    osc.start(t);
    osc.stop(t + 0.1);
  };

  const playSwipeIn = () => {
    // "Departure" / Scene Close
    // EFFECT: Vacuum Seal / Shutter Close / Sci-Fi Airlock
    if (isMuted || !audioCtxRef.current || !masterGainRef.current || !noiseBufferRef.current) return;
    const ctx = audioCtxRef.current;
    const t = ctx.currentTime;
    const dest = masterGainRef.current;

    // 1. Noise Suction (Quick Lowpass Sweep Down)
    const src = ctx.createBufferSource();
    src.buffer = noiseBufferRef.current;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.Q.value = 4; // Resonant peak for "whoosh" character

    const gain = ctx.createGain();

    src.connect(filter);
    filter.connect(gain);
    gain.connect(dest);

    // Filter closes down rapidly
    filter.frequency.setValueAtTime(8000, t);
    filter.frequency.exponentialRampToValueAtTime(50, t + 0.25);

    // Volume cuts off
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

    src.start(t);
    src.stop(t + 0.3);

    // 2. Sub-bass Lock (The "Thud" at the end)
    const osc = ctx.createOscillator();
    osc.frequency.setValueAtTime(120, t);
    osc.frequency.exponentialRampToValueAtTime(0.01, t + 0.2);
    
    const subGain = ctx.createGain();
    subGain.gain.setValueAtTime(0.3, t);
    subGain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    
    osc.connect(subGain);
    subGain.connect(dest);
    osc.start(t);
    osc.stop(t + 0.2);
  };

  const playSwipeOut = () => {
    // "Arrival" / Scene Reveal
    // EFFECT: Ethereal Hologram / Glassy Swell / System Online
    // Replaces the old 8-bit arpeggio with something more sophisticated.
    
    if (isMuted || !audioCtxRef.current || !masterGainRef.current) return;
    const ctx = audioCtxRef.current;
    const t = ctx.currentTime;
    const dest = masterGainRef.current;

    // 1. The Glassy Chord (Esus2 + High E) - Airy and Open
    // Frequencies: E4, F#4, B4, E5, B5
    const freqs = [329.63, 370.00, 493.88, 659.25, 987.77];
    
    freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        // High notes are pure sine (glassy), mids have slight texture (triangle)
        osc.type = i > 2 ? 'sine' : 'triangle'; 
        osc.frequency.value = f;

        const gain = ctx.createGain();
        const panner = ctx.createStereoPanner();
        panner.pan.value = (Math.random() * 2) - 1; // Wide stereo image

        osc.connect(gain);
        gain.connect(panner);
        panner.connect(dest);

        // Envelope: Swell in fast, then long decay
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.06, t + 0.1); // Fast attack
        gain.gain.exponentialRampToValueAtTime(0.001, t + 2.0); // Long crystalline tail

        osc.start(t);
        osc.stop(t + 2.0);
    });

    // 2. High Frequency "Digital Sparkle"
    if (noiseBufferRef.current) {
        const src = ctx.createBufferSource();
        src.buffer = noiseBufferRef.current;
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 6000; // Only very high fizz
        
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.04, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3); // Short burst
        
        src.connect(filter);
        filter.connect(gain);
        gain.connect(dest);
        src.start(t);
        src.stop(t + 0.3);
    }
  };

  const toggleMute = () => setIsMuted(prev => !prev);

  // Global Event Listener for UI Sounds
  useEffect(() => {
    let lastHoveredElement: Element | null = null;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;
      const interactive = target.closest('a, button, .interactive-target, input, textarea');
      
      if (interactive && interactive !== lastHoveredElement) {
        lastHoveredElement = interactive;
        playHover();
      } else if (!interactive) {
        lastHoveredElement = null;
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('a, button, .interactive-target, input, textarea')) {
        playClick();
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('click', handleClick);
    };
  }, [isMuted]);

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playHover, playClick, playSwipeIn, playSwipeOut }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
