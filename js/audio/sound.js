/**
 * Procedural Web Audio API Sound Engine
 * Synthesizes authentic school classroom sound effects & ambient noise:
 * - Lively classroom background chatter, student blabbering, gossiping & whispers
 * - Finger flick thwacks (নখের টোকা)
 * - Plastic pen clatters, wood slides, scale snaps
 * - Table drop falls & floor clatter
 * - School period bell (ঢং ঢং ঢং)
 * - "দাইন দাইন তিন দাইন!" victory celebration & table-tapping rhythms!
 */
export class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.masterGain = null;
    this.ambienceGain = null;
    this.sfxGain = null;
    this.isInitialized = false;
    this.isAmbiencePlaying = false;

    this.masterVolume = 1.0;
    this.ambienceVolume = 0.85;
    this.sfxVolume = 0.90;

    // Load saved volume preferences if available
    try {
      const savedMaster = localStorage.getItem('penfight_vol_master');
      const savedAmb = localStorage.getItem('penfight_vol_ambience');
      const savedSfx = localStorage.getItem('penfight_vol_sfx');
      if (savedMaster !== null) this.masterVolume = parseFloat(savedMaster);
      if (savedAmb !== null) this.ambienceVolume = parseFloat(savedAmb);
      if (savedSfx !== null) this.sfxVolume = parseFloat(savedSfx);
    } catch (e) {}

    // Real Classroom Ambience Audio Track (from YouTube recording)
    if (typeof Audio !== 'undefined') {
      try {
        this.bgAudio = new Audio('audio/classroom_ambience.webm');
        this.bgAudio.loop = true;
        this.bgAudio.preload = 'auto';
        this.bgAudio.volume = this.ambienceVolume;
      } catch (e) {
        this.bgAudio = null;
      }
    } else {
      this.bgAudio = null;
    }

    // Authentic School Gong Bell Audio Track (from user's YouTube extract)
    if (typeof Audio !== 'undefined') {
      try {
        this.bellAudio = new Audio('audio/school_bell_real.webm');
        this.bellAudio.preload = 'auto';
      } catch (e) {
        this.bellAudio = null;
      }
    } else {
      this.bellAudio = null;
    }

    // Authentic Classroom Monsoon Rain Audio Track (extracted from user's YouTube link)
    if (typeof Audio !== 'undefined') {
      try {
        this.rainAudio = new Audio('audio/classroom_rain.mp3');
        this.rainAudio.loop = true;
        this.rainAudio.preload = 'auto';
      } catch (e) {
        this.rainAudio = null;
      }
    } else {
      this.rainAudio = null;
    }

    this.mediaSourceNode = null;
  }

  init() {
    if (this.isInitialized) {
      this.resume();
      return;
    }
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();

      // Master Compressor for clear, loud, non-clipping audio
      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-18, this.ctx.currentTime);
      this.compressor.knee.setValueAtTime(12, this.ctx.currentTime);
      this.compressor.ratio.setValueAtTime(6, this.ctx.currentTime);
      this.compressor.attack.setValueAtTime(0.003, this.ctx.currentTime);
      this.compressor.release.setValueAtTime(0.15, this.ctx.currentTime);
      this.compressor.connect(this.ctx.destination);

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.muted ? 0 : this.masterVolume, this.ctx.currentTime);
      this.masterGain.connect(this.compressor);

      // SFX Gain (Flicks, hits, drops, bells, paper, chalk)
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(this.sfxVolume, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);

      // Dedicated loud ambience gain for classroom chatter
      this.ambienceGain = this.ctx.createGain();
      this.ambienceGain.gain.setValueAtTime(this.ambienceVolume, this.ctx.currentTime);
      this.ambienceGain.connect(this.masterGain);

      this.isInitialized = true;
      this.startClassroomAmbience();
    } catch (e) {
      console.warn('Web Audio API not supported', e);
      // Fallback: direct HTML5 Audio play
      if (this.bgAudio) {
        this.bgAudio.play().catch(() => {});
      }
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (this.bgAudio && this.bgAudio.paused && !this.muted) {
      this.bgAudio.play().catch(() => {});
    }
    if (!this.isAmbiencePlaying && this.isInitialized) {
      this.startClassroomAmbience();
    }
  }

  setMasterVolume(val) {
    this.masterVolume = Math.max(0, Math.min(1, val));
    try { localStorage.setItem('penfight_vol_master', this.masterVolume.toString()); } catch (e) {}
    if (this.masterGain && this.ctx && !this.muted) {
      this.masterGain.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);
    }
  }

  setAmbienceVolume(val) {
    this.ambienceVolume = Math.max(0, Math.min(1, val));
    try { localStorage.setItem('penfight_vol_ambience', this.ambienceVolume.toString()); } catch (e) {}
    if (this.ambienceGain && this.ctx) {
      this.ambienceGain.gain.setValueAtTime(this.ambienceVolume, this.ctx.currentTime);
    }
    if (this.bgAudio) {
      this.bgAudio.volume = this.ambienceVolume;
    }
  }

  setSfxVolume(val) {
    this.sfxVolume = Math.max(0, Math.min(1, val));
    try { localStorage.setItem('penfight_vol_sfx', this.sfxVolume.toString()); } catch (e) {}
    if (this.sfxGain && this.ctx) {
      this.sfxGain.gain.setValueAtTime(this.sfxVolume, this.ctx.currentTime);
    }
  }

  setMuted(muted) {
    this.muted = muted;
    if (this.bgAudio) {
      this.bgAudio.muted = muted;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : this.masterVolume, this.ctx.currentTime);
    }
  }

  toggleMute() {
    this.setMuted(!this.muted);
    return this.muted;
  }

  /**
   * Continuous Real Classroom Background Chatter (YouTube Audio + School Commotion Events)
   */
  startClassroomAmbience() {
    if (this.isAmbiencePlaying) return;
    this.isAmbiencePlaying = true;

    // 1. Play the authentic recorded YouTube classroom chatter audio
    try {
      if (this.ctx && !this.mediaSourceNode) {
        try {
          this.mediaSourceNode = this.ctx.createMediaElementSource(this.bgAudio);
          this.mediaSourceNode.connect(this.ambienceGain);
        } catch (e) {
          // If already connected or restricted, fallback to direct audio element
        }
      }
      this.bgAudio.play().catch((err) => {
        console.log('Classroom audio waiting for interaction:', err);
      });
    } catch (e) {
      console.warn('Error starting classroom audio element', e);
    }

    // 2. Continuous real classroom commotion events (laughter, shouts, bench beats, chair screeches)
    this.scheduleClassroomGossipEvents();
  }

  /**
   * Multi-Speaker speech babble layer using filtered noise modulated by speech rhythm
   */
  createSpeechBabbleLayer(f1, f2, lfoSpeed, volume) {
    if (!this.ctx) return;

    const bufferSize = this.ctx.sampleRate * 4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.035 * white) / 1.035;
      lastOut = data[i];
      data[i] *= 4.5;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    // Bandpass filter for speech vowel range
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime((f1 + f2) / 2, this.ctx.currentTime);
    filter.Q.setValueAtTime(2.2, this.ctx.currentTime);

    // LFO modulating vocal pitch for natural Bengali speech intonations
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(lfoSpeed, this.ctx.currentTime);
    lfoGain.gain.setValueAtTime((f2 - f1) * 0.45, this.ctx.currentTime);
    lfo.connect(filter.frequency);

    // Secondary amplitude modulation for syllable bursts
    const ampLfo = this.ctx.createOscillator();
    const ampLfoGain = this.ctx.createGain();
    ampLfo.frequency.setValueAtTime(lfoSpeed * 2.2, this.ctx.currentTime);
    ampLfoGain.gain.setValueAtTime(0.35, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume * 0.55, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ambienceGain);

    noise.start();
    lfo.start();
    ampLfo.start();
  }

  /**
   * Resonant Formant Voice Synthesizer simulating kids chattering in sentences
   */
  createFormantVocalLayer(baseFreq, formantFreq, cadenceSpeed, volume) {
    if (!this.ctx) return;

    // Syllable pulse oscillator simulating vocal cords
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);

    // Pitch modulation simulating excited speech prosody
    const pitchLfo = this.ctx.createOscillator();
    const pitchGain = this.ctx.createGain();
    pitchLfo.frequency.setValueAtTime(cadenceSpeed, this.ctx.currentTime);
    pitchGain.gain.setValueAtTime(baseFreq * 0.35, this.ctx.currentTime);
    pitchLfo.connect(osc.frequency);

    // Dual Formant Filters (F1 & F2) simulating mouth/vowel shapes
    const filter1 = this.ctx.createBiquadFilter();
    filter1.type = 'bandpass';
    filter1.frequency.setValueAtTime(formantFreq * 0.6, this.ctx.currentTime);
    filter1.Q.setValueAtTime(4.0, this.ctx.currentTime);

    const filter2 = this.ctx.createBiquadFilter();
    filter2.type = 'bandpass';
    filter2.frequency.setValueAtTime(formantFreq * 1.4, this.ctx.currentTime);
    filter2.Q.setValueAtTime(4.5, this.ctx.currentTime);

    // Amplitude gate simulating speech pauses and words
    const ampLfo = this.ctx.createOscillator();
    const ampLfoGain = this.ctx.createGain();
    ampLfo.frequency.setValueAtTime(cadenceSpeed * 1.5, this.ctx.currentTime);
    ampLfoGain.gain.setValueAtTime(0.4, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume * 0.40, this.ctx.currentTime);

    osc.connect(filter1);
    osc.connect(filter2);
    filter1.connect(gain);
    filter2.connect(gain);
    gain.connect(this.ambienceGain);

    osc.start();
    pitchLfo.start();
    ampLfo.start();
  }

  /**
   * Schedule frequent real classroom noise events (every 1-2.5 seconds)
   */
  scheduleClassroomGossipEvents() {
    if (!this.ctx || !this.isAmbiencePlaying) return;

    const interval = 1000 + Math.random() * 1800; // Frequent events!
    setTimeout(() => {
      if (this.isAmbiencePlaying && !this.muted && this.ctx) {
        this.triggerGossipEvent();
        this.scheduleClassroomGossipEvents();
      }
    }, interval);
  }

  /**
   * Loud Classroom Commotion Event Generator (Kids laughing, shouting, desk beats)
   */
  triggerGossipEvent() {
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime;
    const eventType = Math.floor(Math.random() * 6);

    if (eventType === 0) {
      // 1. Kids Giggling & Laughing (বাচ্চাদের হাসির কলরোল)
      const numGiggles = Math.floor(Math.random() * 3) + 4;
      const basePitch = 480 + Math.random() * 180;
      for (let i = 0; i < numGiggles; i++) {
        const gt = t + i * 0.09;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(basePitch + (i % 2) * 90, gt);
        osc.frequency.exponentialRampToValueAtTime(basePitch * 0.7, gt + 0.07);

        gain.gain.setValueAtTime(0.24, gt);
        gain.gain.exponentialRampToValueAtTime(0.001, gt + 0.07);

        osc.connect(gain);
        gain.connect(this.ambienceGain);
        osc.start(gt);
        osc.stop(gt + 0.07);
      }
    } else if (eventType === 1) {
      // 2. Bench rhythm / pencil tapping (পেন্সিল দিয়ে বেঞ্চে তবলা বাজানো)
      const taps = [0, 0.12, 0.24, 0.36];
      for (const delay of taps) {
        const pt = t + delay;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(360 + Math.random() * 80, pt);
        osc.frequency.exponentialRampToValueAtTime(70, pt + 0.05);

        gain.gain.setValueAtTime(0.28, pt);
        gain.gain.exponentialRampToValueAtTime(0.001, pt + 0.05);

        osc.connect(gain);
        gain.connect(this.ambienceGain);
        osc.start(pt);
        osc.stop(pt + 0.05);
      }
    } else if (eventType === 2) {
      // 3. Excited student shout / callout ("এই দোস্ত!", "আরেহ!", "স্যার আসতাছে!")
      const st = t;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      const shoutFreq = 380 + Math.random() * 220;
      osc.frequency.setValueAtTime(shoutFreq, st);
      osc.frequency.linearRampToValueAtTime(shoutFreq * 1.35, st + 0.14);
      osc.frequency.linearRampToValueAtTime(shoutFreq * 0.85, st + 0.28);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1100, st);
      filter.Q.setValueAtTime(3.0, st);

      gain.gain.setValueAtTime(0.32, st);
      gain.gain.exponentialRampToValueAtTime(0.001, st + 0.30);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ambienceGain);
      osc.start(st);
      osc.stop(st + 0.30);
    } else if (eventType === 3) {
      // 4. Wooden chair/bench sliding on concrete floor
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(95, t);
      osc.frequency.linearRampToValueAtTime(160, t + 0.22);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, t);

      gain.gain.setValueAtTime(0.22, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ambienceGain);
      osc.start(t);
      osc.stop(t + 0.22);
    } else if (eventType === 4) {
      // 5. Metal geometry box / pencil case clatter (জ্যামিতি বক্সের ঝনঝন)
      for (let i = 0; i < 3; i++) {
        const ct = t + i * 0.06;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1400 + Math.random() * 600, ct);
        gain.gain.setValueAtTime(0.18, ct);
        gain.gain.exponentialRampToValueAtTime(0.001, ct + 0.05);

        osc.connect(gain);
        gain.connect(this.ambienceGain);
        osc.start(ct);
        osc.stop(ct + 0.05);
      }
    } else {
      // 6. Rapid whispering / gossiping burst ("শোন শোন শোন!")
      this.playWhisperBurst(0.35, 0.26);
    }
  }

  playWhisperBurst(duration, volume) {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const out = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      out[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1600, this.ctx.currentTime);
    filter.Q.setValueAtTime(2.5, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ambienceGain);

    noise.start();
  }

  /**
   * Finger Flick Thwack (নখের টোকা)
   */
  playFlick(powerRatio = 0.5) {
    if (this.muted || !this.ctx) return;
    this.resume();

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const startFreq = 220 + powerRatio * 380;
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(startFreq, t);
    osc.frequency.exponentialRampToValueAtTime(40, t + 0.08);

    gain.gain.setValueAtTime(0.85 * (0.3 + powerRatio * 0.7), t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1600, t);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain || this.masterGain);

    osc.start(t);
    osc.stop(t + 0.09);

    this.playNoiseBurst(0.03, 0.45 * powerRatio);
  }

  /**
   * Plastic Pen Collision
   */
  playHit(speed = 100, heavy = false) {
    if (this.muted || !this.ctx) return;
    this.resume();

    const t = this.ctx.currentTime;
    const vol = Math.min(1.0, Math.max(0.18, speed / 320));

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = heavy ? 'sawtooth' : 'sine';
    const baseFreq = heavy ? 360 : (640 + Math.random() * 220);
    osc.frequency.setValueAtTime(baseFreq, t);
    osc.frequency.exponentialRampToValueAtTime(80, t + 0.05);

    gain.gain.setValueAtTime(vol * 0.95, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

    osc.connect(gain);
    gain.connect(this.sfxGain || this.masterGain);
    osc.start(t);
    osc.stop(t + 0.06);

    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(160 + Math.random() * 50, t);
    osc2.frequency.exponentialRampToValueAtTime(40, t + 0.08);

    gain2.gain.setValueAtTime(vol * 0.65, t);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    osc2.connect(gain2);
    gain2.connect(this.sfxGain || this.masterGain);
    osc2.start(t);
    osc2.stop(t + 0.08);
  }

  /**
   * Obstacle Hit
   */
  playObstacleHit(type = 'ruler') {
    if (this.muted || !this.ctx) return;
    this.resume();
    const t = this.ctx.currentTime;

    if (type === 'geometry_box') {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, t);
      osc.frequency.exponentialRampToValueAtTime(440, t + 0.22);
      gain.gain.setValueAtTime(0.65, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
      osc.connect(gain);
      gain.connect(this.sfxGain || this.masterGain);
      osc.start(t);
      osc.stop(t + 0.22);
    } else if (type === 'ruler') {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(540, t);
      osc.frequency.exponentialRampToValueAtTime(120, t + 0.07);
      gain.gain.setValueAtTime(0.75, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
      osc.connect(gain);
      gain.connect(this.sfxGain || this.masterGain);
      osc.start(t);
      osc.stop(t + 0.07);
    } else {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, t);
      osc.frequency.exponentialRampToValueAtTime(30, t + 0.09);
      gain.gain.setValueAtTime(0.55, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
      osc.connect(gain);
      gain.connect(this.sfxGain || this.masterGain);
      osc.start(t);
      osc.stop(t + 0.09);
    }
  }

  /**
   * Pen Falling off High-Bench
   */
  playFall() {
    if (this.muted || !this.ctx) return;
    this.resume();

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(380, t);
    osc.frequency.exponentialRampToValueAtTime(70, t + 0.35);

    gain.gain.setValueAtTime(0.6, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.35);

    osc.connect(gain);
    gain.connect(this.sfxGain || this.masterGain);
    osc.start(t);
    osc.stop(t + 0.35);

    setTimeout(() => {
      if (this.ctx && !this.muted) {
        const ct = this.ctx.currentTime;
        const clatter = this.ctx.createOscillator();
        const cGain = this.ctx.createGain();
        clatter.type = 'sawtooth';
        clatter.frequency.setValueAtTime(220, ct);
        clatter.frequency.exponentialRampToValueAtTime(30, ct + 0.18);

        cGain.gain.setValueAtTime(0.75, ct);
        cGain.gain.exponentialRampToValueAtTime(0.001, ct + 0.18);

        clatter.connect(cGain);
        cGain.connect(this.sfxGain || this.masterGain);
        clatter.start(ct);
        clatter.stop(ct + 0.18);
      }
    }, 260);
  }

  /**
   * School Period Bell (ঢং ঢং ঢং)
   */
  playSchoolBell() {
    if (this.muted || !this.ctx) return;
    this.resume();

    const t = this.ctx.currentTime;
    const strikes = [0, 0.26, 0.52];

    for (const delay of strikes) {
      const st = t + delay;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(784, st);
      gain.gain.setValueAtTime(0.8, st);
      gain.gain.exponentialRampToValueAtTime(0.001, st + 0.65);

      osc.connect(gain);
      gain.connect(this.sfxGain || this.masterGain);
      osc.start(st);
      osc.stop(st + 0.65);

      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1568, st);
      gain2.gain.setValueAtTime(0.4, st);
      gain2.gain.exponentialRampToValueAtTime(0.001, st + 0.45);

      osc2.connect(gain2);
      gain2.connect(this.sfxGain || this.masterGain);
      osc2.start(st);
      osc2.stop(st + 0.45);
    }
  }

  /**
   * "দাইন দাইন তিন দাইন!" Legendary Grand Victory Fanfare
   */
  playDainDainTinDain() {
    if (this.muted || !this.ctx) return;
    this.resume();

    const t = this.ctx.currentTime;

    // 3 Distinctive rhythmic school desk celebration strikes (১ম দাইন, ২য় দাইন, ৩য় দাইন!)
    const beats = [0, 0.28, 0.56];
    for (let i = 0; i < beats.length; i++) {
      const bt = t + beats[i];
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320 + i * 140, bt);
      osc.frequency.exponentialRampToValueAtTime(70, bt + 0.16);

      gain.gain.setValueAtTime(0.95, bt);
      gain.gain.exponentialRampToValueAtTime(0.001, bt + 0.18);

      osc.connect(gain);
      gain.connect(this.sfxGain || this.masterGain);
      osc.start(bt);
      osc.stop(bt + 0.18);

      this.playNoiseBurst(0.06, 0.6);
    }

    // Extended victory fanfare melody
    const notes = [
      { f: 523.25, d: 0.18, t: 0.82 }, // C5
      { f: 659.25, d: 0.18, t: 1.02 }, // E5
      { f: 783.99, d: 0.22, t: 1.24 }, // G5
      { f: 1046.5, d: 0.75, t: 1.48 }  // C6 (High Peak)
    ];

    for (const n of notes) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(n.f, t + n.t);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2400, t + n.t);

      gain.gain.setValueAtTime(0.65, t + n.t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + n.t + n.d);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain || this.masterGain);

      osc.start(t + n.t);
      osc.stop(t + n.t + n.d);
    }
  }

  playNoiseBurst(duration, volume) {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const out = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      out[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

    whiteNoise.connect(gain);
    gain.connect(this.sfxGain || this.masterGain);

    whiteNoise.start();
  }

  /**
   * Chalk writing on board screech sound
   */
  playChalkWrite() {
    if (this.muted || !this.ctx) return;
    this.resume();

    const t = this.ctx.currentTime;
    for (let i = 0; i < 3; i++) {
      const st = t + i * 0.07;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1200 + Math.random() * 800, st);
      osc.frequency.linearRampToValueAtTime(600 + Math.random() * 400, st + 0.05);

      gain.gain.setValueAtTime(0.12, st);
      gain.gain.exponentialRampToValueAtTime(0.001, st + 0.05);

      osc.connect(gain);
      gain.connect(this.sfxGain || this.masterGain);
      osc.start(st);
      osc.stop(st + 0.05);
    }
  }

  /**
   * Page flip / Register notebook open sound
   */
  playPageTurn() {
    if (this.muted || !this.ctx) return;
    this.resume();
    this.playNoiseBurst(0.12, 0.28);
  }

  /**
   * Authentic Bangladeshi School Brass Gong Bell (Real YouTube Audio Extract)
   */
  playBellSingle() {
    if (this.muted) return;
    this.resume();

    if (this.bellAudio) {
      try {
        this.bellAudio.currentTime = 0;
        this.bellAudio.volume = Math.min(1.0, this.sfxVolume * this.masterVolume);
        const playPromise = this.bellAudio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            this.synthesizeBellFallback();
          });
        }
        return;
      } catch (e) {
        this.synthesizeBellFallback();
      }
    } else {
      this.synthesizeBellFallback();
    }
  }

  synthesizeBellFallback() {
    if (this.muted || !this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(784, t);
    gain.gain.setValueAtTime(0.9, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.85);

    osc.connect(gain);
    gain.connect(this.sfxGain || this.masterGain);
    osc.start(t);
    osc.stop(t + 0.85);

    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1568, t);
    gain2.gain.setValueAtTime(0.45, t);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.6);

    osc2.connect(gain2);
    gain2.connect(this.sfxGain || this.masterGain);
    osc2.start(t);
    osc2.stop(t + 0.6);
  }

  /**
   * Monsoon Rain Sound Track (Real YouTube Rain Audio with Ambient Loop)
   */
  startRainSound() {
    if (this.muted) return;
    this.resume();

    if (this.isRainPlaying) return;
    this.isRainPlaying = true;

    if (this.rainAudio) {
      try {
        this.rainAudio.currentTime = 0;
        this.rainAudio.volume = Math.min(1.0, this.ambienceVolume * this.masterVolume * 0.95);
        this.rainAudio.loop = true;
        const playPromise = this.rainAudio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            this.startSynthesizedRainFallback();
          });
        }
      } catch (e) {
        this.startSynthesizedRainFallback();
      }
    } else {
      this.startSynthesizedRainFallback();
    }
  }

  stopRainSound() {
    this.isRainPlaying = false;
    if (this.rainAudio) {
      try {
        this.rainAudio.pause();
        this.rainAudio.currentTime = 0;
      } catch (e) {}
    }
    this.stopSynthesizedRainFallback();
  }

  startSynthesizedRainFallback() {
    if (this.muted || !this.ctx) return;
    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02; // Pink-brown continuous noise
        lastOut = output[i];
      }

      this.rainSource = this.ctx.createBufferSource();
      this.rainSource.buffer = noiseBuffer;
      this.rainSource.loop = true;

      // Bandpass lowpass filter to sculpt soothing rainfall timbre
      this.rainFilter = this.ctx.createBiquadFilter();
      this.rainFilter.type = 'lowpass';
      this.rainFilter.frequency.setValueAtTime(1400, this.ctx.currentTime);

      this.rainGain = this.ctx.createGain();
      this.rainGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.rainGain.gain.linearRampToValueAtTime(0.48 * this.sfxVolume, this.ctx.currentTime + 1.0);

      this.rainSource.connect(this.rainFilter);
      this.rainFilter.connect(this.rainGain);
      this.rainGain.connect(this.masterGain || this.ctx.destination);

      this.rainSource.start();

      // Tin-roof droplet patters (টিনের চালে টুপটুপ বৃষ্টির ফোঁটা)
      this.dropletInterval = setInterval(() => {
        if (!this.isRainPlaying || this.muted || !this.ctx) return;
        if (Math.random() < 0.65) {
          const t = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const g = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(3200 + Math.random() * 1800, t);
          g.gain.setValueAtTime(0.08 * this.sfxVolume, t);
          g.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
          osc.connect(g);
          g.connect(this.sfxGain || this.masterGain);
          osc.start(t);
          osc.stop(t + 0.04);
        }
      }, 90);
    } catch (e) {
      console.warn('Rain audio synthesis error', e);
    }
  }

  stopSynthesizedRainFallback() {
    if (this.dropletInterval) {
      clearInterval(this.dropletInterval);
      this.dropletInterval = null;
    }
    if (this.rainGain && this.ctx) {
      try {
        const t = this.ctx.currentTime;
        this.rainGain.gain.linearRampToValueAtTime(0.001, t + 0.6);
        setTimeout(() => {
          if (this.rainSource) {
            try {
              this.rainSource.stop();
            } catch (e) {}
            this.rainSource = null;
          }
        }, 700);
      } catch (e) {}
    }
  }

  /**
   * Paper Airplane Whooshing Flight Sound
   */
  playPlaneWhoosh() {
    if (this.muted || !this.ctx) return;
    this.resume();
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, t);
    osc.frequency.exponentialRampToValueAtTime(320, t + 0.35);
    osc.frequency.exponentialRampToValueAtTime(110, t + 0.85);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, t);
    filter.frequency.linearRampToValueAtTime(1400, t + 0.35);
    filter.frequency.linearRampToValueAtTime(400, t + 0.85);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.25 * this.sfxVolume, t + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.85);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain || this.masterGain);

    osc.start(t);
    osc.stop(t + 0.85);
  }

  /**
   * Secret Tiffin Snack Munch / Crunch Sound (সিঙ্গাড়া খাওয়ার মুচমুচে শব্দ)
   */
  playTiffinMunch() {
    if (this.muted || !this.ctx) return;
    this.resume();
    const t = this.ctx.currentTime;

    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        if (!this.ctx || this.muted) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180 + Math.random() * 80, now);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.06);

        g.gain.setValueAtTime(0.4 * this.sfxVolume, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

        osc.connect(g);
        g.connect(this.sfxGain || this.masterGain);
        osc.start(now);
        osc.stop(now + 0.06);
      }, i * 70);
    }
  }

  /**
   * Secret Paper Note Passing Rustle
   */
  playPaperPass() {
    if (this.muted || !this.ctx) return;
    this.resume();
    this.playNoiseBurst(0.08, 0.22);
  }

  /**
   * Pen Spinning Plastic Click
   */
  playPenSpinClick() {
    if (this.muted || !this.ctx) return;
    this.resume();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1250, t);
    g.gain.setValueAtTime(0.18 * this.sfxVolume, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.035);
    osc.connect(g);
    g.connect(this.sfxGain || this.masterGain);
    osc.start(t);
    osc.stop(t + 0.035);
  }
}

