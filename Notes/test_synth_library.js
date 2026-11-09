// Test script for 7 procedural audio generators
const fs = require('fs');

function mockAudioBuffer(numChannels, length, sampleRate) {
  const channels = [];
  for (let c = 0; c < numChannels; c++) {
    channels.push(new Float32Array(length));
  }
  return {
    numberOfChannels: numChannels,
    length: length,
    sampleRate: sampleRate,
    duration: length / sampleRate,
    getChannelData(c) { return channels[c]; }
  };
}

function generateDemoAudioBuffer(type = 'pa_announcement', sampleRate = 44100) {
  const sr = sampleRate;
  let durationSec = 4.0;
  if (type === 'pa_announcement') durationSec = 5.2;
  if (type === 'stadium_siren') durationSec = 5.5;
  if (type === 'drum_loop') durationSec = 4.0;
  if (type === 'snare_clap') durationSec = 3.2;
  if (type === 'guitar_arpeggio' || type === 'acoustic_guitar') durationSec = 5.0;
  if (type === 'clean_vocal') durationSec = 4.8;
  if (type === 'impulse_click') durationSec = 1.5;
  if (type === 'synth_lead') durationSec = 5.5;

  const numSamples = Math.floor(sr * durationSec);
  const buffer = mockAudioBuffer(2, numSamples, sr);
  const chL = buffer.getChannelData(0);
  const chR = buffer.getChannelData(1);

  if (type === 'pa_announcement') {
    // Cathedral PA Two-Tone Chime (C5 -> G4) with rich metallic bell partials + resonant vocal announcement
    const chime1Time = 0.12;
    const chime2Time = 0.75;
    for (let i = 0; i < numSamples; i++) {
      const t = i / sr;
      let sL = 0;
      let sR = 0;

      // Bell Chime 1: C5 (523.25 Hz) with bell harmonics (1x, 2.0x, 3.01x, 4.18x)
      if (t >= chime1Time && t < chime1Time + 1.2) {
        const dt = t - chime1Time;
        const env1 = Math.exp(-dt * 3.2);
        const env2 = Math.exp(-dt * 5.0);
        const bell = Math.sin(2 * Math.PI * 523.25 * dt) * 0.5 * env1
                   + Math.sin(2 * Math.PI * 1046.5 * dt) * 0.25 * env2
                   + Math.sin(2 * Math.PI * 1575.0 * dt) * 0.15 * Math.exp(-dt * 6.5)
                   + Math.sin(2 * Math.PI * 2187.0 * dt) * 0.1 * Math.exp(-dt * 8.0);
        sL += bell * 0.85;
        sR += bell * 0.8;
      }

      // Bell Chime 2: G4 (392.00 Hz)
      if (t >= chime2Time && t < chime2Time + 1.4) {
        const dt = t - chime2Time;
        const env1 = Math.exp(-dt * 2.8);
        const env2 = Math.exp(-dt * 4.5);
        const bell = Math.sin(2 * Math.PI * 392.00 * dt) * 0.55 * env1
                   + Math.sin(2 * Math.PI * 784.00 * dt) * 0.28 * env2
                   + Math.sin(2 * Math.PI * 1180.0 * dt) * 0.16 * Math.exp(-dt * 6.0)
                   + Math.sin(2 * Math.PI * 1638.0 * dt) * 0.1 * Math.exp(-dt * 7.5);
        sL += bell * 0.8;
        sR += bell * 0.85;
      }

      // Voice announcement syllables simulation: "Attention please: passenger boarding call..."
      if (t >= 1.8 && t < 5.0) {
        const vt = t - 1.8;
        const syllableFreq = 3.6; // syllables per second
        const syllPhase = vt * Math.PI * syllableFreq;
        const syllEnv = Math.max(0, Math.sin(syllPhase)) * Math.min(1.0, (5.0 - t) * 2.0);

        if (syllEnv > 0.001) {
          // Fundamental pitch with natural speaker intonation inflection
          const f0 = 138 + Math.sin(vt * 8.0) * 14 + Math.sin(vt * 2.5) * 8;
          // Pulse train excitation
          const pulse = (Math.sin(2 * Math.PI * f0 * vt) > 0.1 ? 0.4 : -0.4);
          // Human vocal tract formants (F1: 720 Hz, F2: 1280 Hz, F3: 2500 Hz)
          const formant1 = Math.sin(2 * Math.PI * 720 * vt) * 0.45;
          const formant2 = Math.sin(2 * Math.PI * 1280 * vt) * 0.35;
          const formant3 = Math.sin(2 * Math.PI * 2500 * vt) * 0.2;
          // Unvoiced consonant bursts (sibilance/fricatives)
          const sibilance = (Math.sin(syllPhase) > 0.85) ? (Math.random() * 2 - 1) * 0.18 : 0;

          const voice = (pulse * (formant1 + formant2 + formant3) * 0.7 + sibilance) * syllEnv;
          sL += voice * 0.5;
          sR += voice * 0.5;
        }
      }

      chL[i] = Math.max(-1, Math.min(1, sL));
      chR[i] = Math.max(-1, Math.min(1, sR));
    }
  } else if (type === 'stadium_siren') {
    // Stadium Roaring Crowd Cheer & Dual-Tone Emergency Siren
    let crowdNoiseL = 0;
    let crowdNoiseR = 0;
    for (let i = 0; i < numSamples; i++) {
      const t = i / sr;
      let sL = 0;
      let sR = 0;

      // Roaring stadium crowd noise floor (filtered brownian noise with crowd cheering modulation)
      const whiteL = Math.random() * 2 - 1;
      const whiteR = Math.random() * 2 - 1;
      crowdNoiseL = crowdNoiseL * 0.94 + whiteL * 0.06;
      crowdNoiseR = crowdNoiseR * 0.94 + whiteR * 0.06;

      // Dynamic cheering swells (50,000 fans cheering in stadium)
      const crowdSwell = (0.35 + 0.25 * Math.sin(2 * Math.PI * 0.4 * t) + 0.15 * Math.sin(2 * Math.PI * 0.95 * t));
      const cheeringWhistle = (Math.sin(2 * Math.PI * (1450 + Math.sin(t * 12) * 200) * t)) * Math.max(0, Math.sin(t * 1.5)) * 0.04;

      sL += (crowdNoiseL * crowdSwell * 1.8 + cheeringWhistle) * 0.35;
      sR += (crowdNoiseR * crowdSwell * 1.8 + cheeringWhistle) * 0.35;

      // Dual-Tone Stadium Air Horn / Siren (Two blasts: at t=0.6s and t=2.8s)
      const blasts = [0.6, 2.8];
      blasts.forEach((bt) => {
        const dt = t - bt;
        if (dt >= 0 && dt < 1.3) {
          const hornEnv = Math.min(1.0, dt / 0.06) * Math.exp(-dt * 0.9);
          // Dual pitch: 680 Hz + 820 Hz with odd harmonics (square/brass overtone character)
          const f1 = 680 + Math.sin(dt * 25) * 8;
          const f2 = 820 + Math.sin(dt * 25) * 8;
          const horn = (Math.sin(2 * Math.PI * f1 * dt) * 0.35
                      + Math.sin(2 * Math.PI * f1 * 3 * dt) * 0.15
                      + Math.sin(2 * Math.PI * f2 * dt) * 0.3
                      + Math.sin(2 * Math.PI * f2 * 3 * dt) * 0.12) * hornEnv;
          sL += horn * 0.7;
          sR += horn * 0.7;
        }
      });

      chL[i] = Math.max(-1, Math.min(1, sL));
      chR[i] = Math.max(-1, Math.min(1, sR));
    }
  } else if (type === 'drum_loop') {
    // 808 Hip-Hop Break (120 BPM): Deep Sub Kick with Pitch Glide, Crisp 808 Snare, Trap Hats & Triplet Roll
    const bpm = 120;
    const beatSec = 60 / bpm; // 0.5s per beat, 4 beats = 2.0s per bar
    for (let i = 0; i < numSamples; i++) {
      const t = i / sr;
      const beat = (t / beatSec) % 4; // 0 to 4
      const bar = Math.floor(t / (4 * beatSec));
      let sL = 0;
      let sR = 0;

      // 808 Kick Hits on Beat 0, Beat 1.75, Beat 2.5
      const kickBeats = [0, 1.75, 2.5];
      kickBeats.forEach(kb => {
        const dt = (beat - kb) * beatSec;
        if (dt >= 0 && dt < 0.48) {
          // Pitch drops fast from 145 Hz to 42 Hz
          const pitch = 145 * Math.exp(-dt * 28) + 42;
          const phase = 2 * Math.PI * pitch * dt;
          const kickAmp = Math.exp(-dt * 6.2);
          const kickSample = Math.sin(phase) * kickAmp * 0.85;
          sL += kickSample;
          sR += kickSample;
        }
      });

      // 808 Snare Hits on Beat 1 and Beat 3
      const snareBeats = [1.0, 3.0];
      snareBeats.forEach(sb => {
        const dt = (beat - sb) * beatSec;
        if (dt >= 0 && dt < 0.32) {
          const tone = Math.sin(2 * Math.PI * 185 * dt) * Math.exp(-dt * 19) * 0.45;
          const noise = (Math.random() * 2 - 1) * Math.exp(-dt * 15) * 0.55;
          const snap = (dt < 0.005) ? (Math.random() * 2 - 1) * 0.7 : 0;
          const snareSample = (tone + noise + snap) * 0.75;
          sL += snareSample * 0.95;
          sR += snareSample * 1.05;
        }
      });

      // Closed Hi-Hats every 0.25 beats (16th notes) + 32nd triplet roll at bar end
      const sixteenth = beat % 0.25;
      const hatDt = sixteenth * beatSec;
      const isTripletBarEnd = (bar >= 1 && beat >= 3.5);

      if (isTripletBarEnd) {
        // Rapid 32nd triplet rolls
        const rollPhase = (beat % 0.0833) * beatSec;
        if (rollPhase < 0.04) {
          const hatNoise = (Math.random() * 2 - 1) * Math.exp(-rollPhase * 75) * 0.22;
          sL += hatNoise;
          sR += hatNoise * 0.9;
        }
      } else {
        if (hatDt < 0.06) {
          const accent = (Math.floor(beat / 0.25) % 2 === 0) ? 0.24 : 0.16;
          const hatNoise = (Math.random() * 2 - 1) * Math.exp(-hatDt * 55) * accent;
          sL += hatNoise;
          sR += hatNoise * 0.95;
        }
      }

      // Open Hi-Hat on upbeat of beat 2 (2.5)
      const openDt = (beat - 2.5) * beatSec;
      if (openDt >= 0 && openDt < 0.22) {
        const openNoise = (Math.random() * 2 - 1) * Math.exp(-openDt * 16) * 0.28;
        sL += openNoise * 1.1;
        sR += openNoise * 0.8;
      }

      chL[i] = Math.max(-1, Math.min(1, sL));
      chR[i] = Math.max(-1, Math.min(1, sR));
    }
  } else if (type === 'snare_clap') {
    // Punchy Snare & Handclap with separated acoustic hits to audition long decay tails
    const clapTime = 0.25;
    const snareTime = 1.85;
    for (let i = 0; i < numSamples; i++) {
      const t = i / sr;
      let sL = 0;
      let sR = 0;

      // Hit 1: Handclap at t = 0.25s (Multiple pre-burst slaps + acoustic clap body)
      if (t >= clapTime && t < clapTime + 0.7) {
        const dt = t - clapTime;
        // 3 distinct micro-transient claps (0ms, 12ms, 23ms)
        const burst1 = (dt < 0.011) ? (Math.random() * 2 - 1) * 0.5 : 0;
        const burst2 = (dt >= 0.011 && dt < 0.022) ? (Math.random() * 2 - 1) * 0.65 : 0;
        const burst3 = (dt >= 0.022) ? (Math.random() * 2 - 1) * Math.exp(-(dt - 0.022) * 22) * 0.85 : 0;
        const clapBody = (Math.sin(2 * Math.PI * 1150 * dt) + Math.sin(2 * Math.PI * 2400 * dt)) * 0.15 * Math.exp(-dt * 18);
        const clap = (burst1 + burst2 + burst3 + clapBody) * 0.85;
        sL += clap * 0.9;
        sR += clap * 1.0;
      }

      // Hit 2: Punchy Acoustic Snare at t = 1.85s (Transient stick strike + rim + resonant shell + snare wires)
      if (t >= snareTime && t < snareTime + 0.9) {
        const dt = t - snareTime;
        // Dirac stick crack
        const stickCrack = (dt < 0.003) ? (Math.random() * 2 - 1) * 0.95 : 0;
        // Shell tone with fast pitch dive (240Hz -> 180Hz)
        const shellPitch = 240 * Math.exp(-dt * 30) + 180;
        const shell = Math.sin(2 * Math.PI * shellPitch * dt) * Math.exp(-dt * 16) * 0.65;
        // High frequency snare wire rattle (filtered noise sizzle)
        const wires = (Math.random() * 2 - 1) * Math.exp(-dt * 12) * 0.7;
        const snare = (stickCrack + shell + wires) * 0.8;
        sL += snare * 1.0;
        sR += snare * 0.92;
      }

      chL[i] = Math.max(-1, Math.min(1, sL));
      chR[i] = Math.max(-1, Math.min(1, sR));
    }
  } else if (type === 'guitar_arpeggio' || type === 'acoustic_guitar') {
    // Acoustic Guitar Arpeggio (Am -> C -> G -> D) with physical string harmonics & soundboard resonance
    // Plucked string frequencies (Hz):
    // Pattern: A2(110), E3(164.8), A3(220), C4(261.6), E4(329.6), C4(261.6), A3(220), E3(164.8)
    const plucks = [
      { t: 0.1, freq: 110.0, vel: 0.85 },  // A2
      { t: 0.5, freq: 164.81, vel: 0.70 }, // E3
      { t: 0.9, freq: 220.0, vel: 0.75 },  // A3
      { t: 1.3, freq: 261.63, vel: 0.80 }, // C4
      { t: 1.7, freq: 329.63, vel: 0.85 }, // E4
      { t: 2.1, freq: 261.63, vel: 0.65 }, // C4
      { t: 2.5, freq: 196.00, vel: 0.75 }, // G3
      { t: 2.9, freq: 246.94, vel: 0.70 }, // B3
      { t: 3.3, freq: 293.66, vel: 0.80 }, // D4
      { t: 3.7, freq: 392.00, vel: 0.85 }, // G4
      { t: 4.1, freq: 220.00, vel: 0.70 }  // A3
    ];

    for (let i = 0; i < numSamples; i++) {
      const t = i / sr;
      let sL = 0;
      let sR = 0;

      plucks.forEach(pluck => {
        const dt = t - pluck.t;
        if (dt >= 0 && dt < 1.6) {
          const f0 = pluck.freq;
          // Karplus-Strong style harmonic decay: higher partials damp faster
          const fund = Math.sin(2 * Math.PI * f0 * dt) * Math.exp(-dt * 2.2);
          const harm2 = Math.sin(2 * Math.PI * (f0 * 2) * dt) * 0.45 * Math.exp(-dt * 4.5);
          const harm3 = Math.sin(2 * Math.PI * (f0 * 3) * dt) * 0.25 * Math.exp(-dt * 7.5);
          const harm4 = Math.sin(2 * Math.PI * (f0 * 4) * dt) * 0.12 * Math.exp(-dt * 11.0);
          // Metallic plectrum pick click
          const pickClick = (dt < 0.008) ? (Math.random() * 2 - 1) * 0.3 * Math.exp(-dt * 300) : 0;
          // Acoustic soundboard body resonance (190Hz, 380Hz)
          const soundboard = Math.sin(2 * Math.PI * 190 * dt) * 0.15 * Math.exp(-dt * 3.5);

          const stringSound = (fund + harm2 + harm3 + harm4 + pickClick + soundboard) * pluck.vel * 0.42;
          sL += stringSound * (0.95 + 0.05 * Math.sin(f0));
          sR += stringSound * (0.95 - 0.05 * Math.sin(f0));
        }
      });

      chL[i] = Math.max(-1, Math.min(1, sL));
      chR[i] = Math.max(-1, Math.min(1, sR));
    }
  } else if (type === 'clean_vocal') {
    // Clean Melodic Vocal Phrase: Lyrical vocal melody with natural vibrato and vowel formant filtering
    // Notes: C4(261.6Hz) -> D4(293.7Hz) -> E4(329.6Hz) -> G4(392.0Hz) -> E4(329.6Hz)
    const notes = [
      { start: 0.15, end: 1.05, f0: 261.63, vowel: 'ah' },
      { start: 1.15, end: 1.95, f0: 293.66, vowel: 'oh' },
      { start: 2.05, end: 3.10, f0: 329.63, vowel: 'ee' },
      { start: 3.20, end: 4.50, f0: 392.00, vowel: 'ah' }
    ];

    for (let i = 0; i < numSamples; i++) {
      const t = i / sr;
      let sL = 0;
      let sR = 0;

      notes.forEach(n => {
        if (t >= n.start && t < n.end) {
          const dt = t - n.start;
          const dur = n.end - n.start;
          // Note amplitude envelope with soft attack and gentle release
          const env = Math.min(1.0, dt / 0.08) * Math.min(1.0, (dur - dt) / 0.1);
          // Natural expressive pitch vibrato (starts after 120ms of sustain)
          const vibratoDepth = Math.min(1.0, Math.max(0, (dt - 0.12) / 0.3)) * 0.025; // semitone depth
          const vibrato = Math.sin(2 * Math.PI * 5.4 * dt) * vibratoDepth;
          const freq = n.f0 * (1 + vibrato);

          // Vocal source excitation (bandlimited glottal pulse approximation)
          const glottal = Math.sin(2 * Math.PI * freq * dt) * 0.5
                        + Math.sin(2 * Math.PI * freq * 2 * dt) * 0.3
                        + Math.sin(2 * Math.PI * freq * 3 * dt) * 0.18
                        + Math.sin(2 * Math.PI * freq * 4 * dt) * 0.1;

          // Vowel formants:
          // 'ah': F1=750Hz, F2=1200Hz, F3=2600Hz
          // 'oh': F1=500Hz, F2=900Hz,  F3=2400Hz
          // 'ee': F1=300Hz, F2=2300Hz, F3=3000Hz
          let f1 = 750, f2 = 1200, f3 = 2600;
          if (n.vowel === 'oh') { f1 = 500; f2 = 900; f3 = 2400; }
          if (n.vowel === 'ee') { f1 = 300; f2 = 2300; f3 = 3000; }

          const formantFilter = Math.sin(2 * Math.PI * f1 * dt) * 0.45
                              + Math.sin(2 * Math.PI * f2 * dt) * 0.35
                              + Math.sin(2 * Math.PI * f3 * dt) * 0.2;

          const voice = (glottal * formantFilter) * env * 0.65;
          sL += voice;
          sR += voice;
        }
      });

      chL[i] = Math.max(-1, Math.min(1, sL));
      chR[i] = Math.max(-1, Math.min(1, sR));
    }
  } else if (type === 'impulse_click') {
    // Single pristine Dirac delta impulse click at sample 4410 (0.1s in)
    const spikeIndex = Math.floor(0.1 * sr);
    chL[spikeIndex] = 0.99;
    chR[spikeIndex] = 0.99;
  }

  return buffer;
}

const types = ['pa_announcement', 'stadium_siren', 'drum_loop', 'snare_clap', 'guitar_arpeggio', 'clean_vocal', 'impulse_click'];
types.forEach(t => {
  const buf = generateDemoAudioBuffer(t, 44100);
  console.log(`Generated "${t}": duration=${buf.duration.toFixed(2)}s, samples=${buf.length}`);
});
