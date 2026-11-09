/**
 * MEGASTRUCTURE // Enhanced Procedural Stereo Impulse Response & Audition DSP Engine
 * Specialized Physical Acoustics & Non-Blocking Web Audio Convolution Synthesizer
 *
 * Designed by Agent 2 (Physical Acoustics & Procedural IR DSP Specialist)
 * Conforms strictly to W3C Web Audio API and ES2022+ standards. Zero external dependencies.
 */

/* ==========================================================================
   1. PHYSICAL ACOUSTICS & ISO 9613-1 ATMOSPHERIC CONSTANTS
   ========================================================================== */

export const PHYSICAL_ACOUSTICS = {
  // Speed of sound in dry air at 20°C (343.2 m/s)
  c: 343.2,

  // ISO 9613-1 Atmospheric Energy Absorption Coefficient m (m^-1)
  // Evaluated at T = 20°C (293.15 K), RH = 40%, p_a = 101.325 kPa
  airAbsorption: {
    low: 0.00010,   // ~250 Hz (0.00043 dB/m) - virtually lossless
    mid: 0.00115,   // ~1000 Hz (0.0050 dB/m)
    high: 0.00945,  // ~4000 Hz (0.0410 dB/m) - significant over large distances
    ultra: 0.03280  // ~8000 Hz (0.1425 dB/m)
  },

  // Frequency-dependent boundary absorption coefficients [Low (250Hz), Mid (1kHz), High (4kHz)]
  materialAbsorption: {
    concrete: { low: 0.015, mid: 0.025, high: 0.040 },
    brick:    { low: 0.030, mid: 0.040, high: 0.070 },
    metal:    { low: 0.150, mid: 0.080, high: 0.040 }, // panel/diaphragmatic absorption at bass
    wood:     { low: 0.180, mid: 0.120, high: 0.080 }, // wood resonant cavity absorption
    marble:   { low: 0.010, mid: 0.010, high: 0.015 },
    glass:    { low: 0.180, mid: 0.060, high: 0.030 }
  }
};

/* ==========================================================================
   2. EYRING-NORRIS 3-BAND DECAY CALCULATOR
   ========================================================================== */

/**
 * Calculates physically grounded 3-band reverberation times based on room dimensions,
 * boundary materials, air absorption, and user-specified scaling.
 */
export function calculateRoomAcoustics(room, bassMultiplier = 1.6, highDampCutoff = 3800, nominalRT60 = null) {
  const L = Math.max(5, room.length);
  const W = Math.max(5, room.width);
  const H = Math.max(3, room.height);

  const V = L * W * H;
  const S = 2 * (L * W + L * H + W * H);
  const meanFreePath = (4 * V) / S;

  const mat = PHYSICAL_ACOUSTICS.materialAbsorption[room.material] || PHYSICAL_ACOUSTICS.materialAbsorption.concrete;
  const air = PHYSICAL_ACOUSTICS.airAbsorption;

  // Eyring-Norris equation for enclosed spaces:
  // RT60 = 0.1611 * V / ( -S * ln(1 - alpha) + 4 * m * V )
  const calcBandRT = (alpha, m) => {
    const denom = -S * Math.log(Math.max(0.0001, 1 - alpha)) + 4 * m * V;
    return (0.1611 * V) / Math.max(0.001, denom);
  };

  const rtLowPhys = calcBandRT(mat.low, air.low);
  const rtMidPhys = calcBandRT(mat.mid, air.mid);
  const rtHighPhys = calcBandRT(mat.high, air.high);

  // If user has provided a target nominal RT60, scale bands proportionally to physical ratios
  const baseRT60 = nominalRT60 || rtMidPhys;
  const scale = baseRT60 / Math.max(0.1, rtMidPhys);

  const rt60Mid = baseRT60;
  // Bass decay: scaled by material physical ratio and user Bass Multiplier
  const rt60Low = Math.min(baseRT60 * 3.0, rtLowPhys * scale * (bassMultiplier || 1.0));
  // High decay: scaled by material physical ratio and air damping cutoff
  const dampFactor = highDampCutoff ? Math.pow(highDampCutoff / 5000.0, 0.55) : 1.0;
  const rt60High = Math.max(0.2, rtHighPhys * scale * dampFactor);

  // Physical mixing time: transition from specular reflections to diffuse tail
  // tau_mix ≈ sqrt(V / c^3)
  const mixingTimeSec = Math.min(0.15, Math.max(0.02, Math.sqrt(V / Math.pow(PHYSICAL_ACOUSTICS.c, 3))));

  return {
    volume: V,
    surface: S,
    meanFreePath,
    mixingTimeSec,
    rt60Low,
    rt60Mid,
    rt60High,
    decayLow: -3 * Math.log(10) / rt60Low,
    decayMid: -3 * Math.log(10) / rt60Mid,
    decayHigh: -3 * Math.log(10) / rt60High
  };
}

/* ==========================================================================
   3. 3D IMAGE-SOURCE METHOD (ISM) RAY TRACER (Order 1 & 2)
   ========================================================================== */

/**
 * Computes 24 true 3D image-source specular reflections:
 * - 6 First-order planar reflections (Back, Front, Left, Right, Floor, Ceiling)
 * - 18 Second-order corner & axial double bounces
 * Includes 1/d spherical pressure spreading, wall absorption, air absorption,
 * constant-power stereo panning, and Interaural Time Difference (ITD).
 */
export function trace3DImageSources(room, listener, speaker) {
  const L = room.length;
  const W = room.width;
  const H = room.height;

  // Source position in meters
  const xs = (speaker.x !== undefined ? speaker.x : 0.5) * L;
  const ys = (speaker.y !== undefined ? speaker.y : 0.5) * W;
  const zs = (speaker.z !== undefined ? speaker.z : 3.2);

  // Receiver position in meters (listener)
  const xr = (listener.x !== undefined ? listener.x : 0.5) * L;
  const yr = (listener.y !== undefined ? listener.y : 0.7) * W;
  const zr = (listener.z !== undefined ? listener.z : 1.7); // standard seated ear height
  const facing = listener.facingAngle || 0;

  const c = PHYSICAL_ACOUSTICS.c;
  const dDirect = Math.sqrt((xs - xr) ** 2 + (ys - yr) ** 2 + (zs - zr) ** 2);

  const mat = PHYSICAL_ACOUSTICS.materialAbsorption[room.material] || PHYSICAL_ACOUSTICS.materialAbsorption.concrete;
  const R1 = Math.sqrt(Math.max(0.01, 1 - mat.mid)); // pressure reflection coefficient
  const R2 = R1 * R1;

  const rays = [
    // 6 First-Order Planar Reflections
    { name: 'Back Wall (X=0)',   pos: [-xs, ys, zs], order: 1 },
    { name: 'Front Wall (X=L)',  pos: [2 * L - xs, ys, zs], order: 1 },
    { name: 'Left Wall (Y=0)',   pos: [xs, -ys, zs], order: 1 },
    { name: 'Right Wall (Y=W)',  pos: [xs, 2 * W - ys, zs], order: 1 },
    { name: 'Floor (Z=0)',       pos: [xs, ys, -zs], order: 1 },
    { name: 'Ceiling (Z=H)',     pos: [xs, ys, 2 * H - zs], order: 1 },

    // 18 Second-Order Reflections
    // X and Y double bounces
    { name: 'Back+Left',     pos: [-xs, -ys, zs], order: 2 },
    { name: 'Back+Right',    pos: [-xs, 2 * W - ys, zs], order: 2 },
    { name: 'Front+Left',    pos: [2 * L - xs, -ys, zs], order: 2 },
    { name: 'Front+Right',   pos: [2 * L - xs, 2 * W - ys, zs], order: 2 },
    // X and Z double bounces
    { name: 'Back+Floor',    pos: [-xs, ys, -zs], order: 2 },
    { name: 'Back+Ceiling',  pos: [-xs, ys, 2 * H - zs], order: 2 },
    { name: 'Front+Floor',   pos: [2 * L - xs, ys, -zs], order: 2 },
    { name: 'Front+Ceiling', pos: [2 * L - xs, ys, 2 * H - zs], order: 2 },
    // Y and Z double bounces
    { name: 'Left+Floor',    pos: [xs, -ys, -zs], order: 2 },
    { name: 'Left+Ceiling',  pos: [xs, -ys, 2 * H - zs], order: 2 },
    { name: 'Right+Floor',   pos: [xs, 2 * W - ys, -zs], order: 2 },
    { name: 'Right+Ceiling', pos: [xs, 2 * W - ys, 2 * H - zs], order: 2 },
    // Opposite-wall axial bounces
    { name: 'Back-Front',    pos: [2 * L + xs, ys, zs], order: 2 },
    { name: 'Front-Back',    pos: [-2 * L + xs, ys, zs], order: 2 },
    { name: 'Left-Right',    pos: [xs, 2 * W + ys, zs], order: 2 },
    { name: 'Right-Left',    pos: [xs, -2 * W + ys, zs], order: 2 },
    { name: 'Floor-Ceiling', pos: [xs, ys, 2 * H + zs], order: 2 },
    { name: 'Ceiling-Floor', pos: [xs, ys, -2 * H + zs], order: 2 }
  ];

  const reflections = [];

  for (let i = 0; i < rays.length; i++) {
    const ray = rays[i];
    const [xi, yi, zi] = ray.pos;
    const d = Math.sqrt((xi - xr) ** 2 + (yi - yr) ** 2 + (zi - zr) ** 2);
    const delaySec = (d - dDirect) / c;

    // Boundary absorption
    const R = ray.order === 1 ? R1 : R2;

    // Geometric inverse-distance attenuation relative to direct sound
    const geom = dDirect / Math.max(1.0, d);

    // Atmospheric air attenuation
    const airLoss = Math.exp(-(PHYSICAL_ACOUSTICS.airAbsorption.mid / 2) * (d - dDirect));
    const amp = geom * R * airLoss;

    // Azimuth calculation relative to listener head orientation
    const dx = xi - xr;
    const dy = yi - yr;
    const phi = Math.atan2(dy, dx);
    const theta = phi - facing;

    // Pan law (-1 to +1)
    const pan = Math.sin(theta);

    // Constant power panning gains
    const gL = Math.cos((pan + 1) * Math.PI / 4);
    const gR = Math.sin((pan + 1) * Math.PI / 4);

    // Interaural Time Difference (ITD, Woodworth's head model ~0.28ms max)
    const itdSec = 0.00028 * pan;

    reflections.push({
      name: ray.name,
      order: ray.order,
      distance: d,
      delaySec,
      amp,
      pan,
      itdSec,
      gL,
      gR
    });
  }

  return { dDirect, reflections };
}

/* ==========================================================================
   4. NON-BLOCKING PROCEDURAL STEREO IR SYNTHESIZER
   ========================================================================== */

let _activeSynthesisTaskId = 0;
let _irDebounceTimer = null;

/**
 * Asynchronously synthesizes a high-precision procedural stereo impulse response.
 * Utilizes chunked time-slicing to yield control to the UI event loop, ensuring
 * 60FPS visualizer rendering without UI freezing or audio glitches.
 */
export function synthesizeImpulseResponseEnhanced(options = {}) {
  const {
    audioCtx = AppState.audioCtx,
    room = AppState.room,
    listener = AppState.listener,
    speakers = AppState.speakers,
    masterConvolver = window.masterConvolverNode,
    onProgress = null,
    onComplete = null,
    immediate = false
  } = options;

  if (!audioCtx) return;

  const currentTaskId = ++_activeSynthesisTaskId;
  const sampleRate = audioCtx.sampleRate;

  // Compute 3-band room physics
  const acoustics = calculateRoomAcoustics(
    room,
    room.bassMult,
    room.highDamp,
    room.rt60
  );

  const lengthSeconds = Math.max(1.0, Math.min(16.0, acoustics.rt60Mid * 1.25));
  const lengthSamples = Math.floor(sampleRate * lengthSeconds);
  const preDelaySamples = Math.floor(((room.preDelay || 0) / 1000) * sampleRate);

  // Create destination stereo buffer
  const irBuffer = audioCtx.createBuffer(2, lengthSamples, sampleRate);
  const left = irBuffer.getChannelData(0);
  const right = irBuffer.getChannelData(1);

  // Trace 3D image source reflections from active speaker (or speaker 0)
  const activeSpeaker = (speakers && speakers.length > 0) ? speakers[AppState.selectedSpeakerIndex || 0] || speakers[0] : { x: 0.5, y: 0.3, z: 3.2 };
  const ism = trace3DImageSources(room, listener, activeSpeaker);

  // 1-Pole Crossover Filter coefficients for 3-band noise split
  // Low crossover at 350 Hz, High crossover at 3400 Hz
  const alphaL = Math.exp(-2 * Math.PI * 350 / sampleRate);
  const alphaH = Math.exp(-2 * Math.PI * (Math.min(room.highDamp || 3800, 3800)) / sampleRate);

  let lpL = 0, lpR = 0;
  let hpInL = 0, hpOutL = 0;
  let hpInR = 0, hpOutR = 0;

  const decayL = acoustics.decayLow;
  const decayM = acoustics.decayMid;
  const decayH = acoustics.decayHigh;
  const mixTime = acoustics.mixingTimeSec;

  const chunkSize = immediate ? lengthSamples : 32768;
  let currentSample = 0;

  function runNextChunk() {
    // If a newer synthesis task has been queued, cancel this task immediately
    if (_activeSynthesisTaskId !== currentTaskId) return;

    const endSample = Math.min(lengthSamples, currentSample + chunkSize);

    for (let i = currentSample; i < endSample; i++) {
      if (i < preDelaySamples) {
        left[i] = 0;
        right[i] = 0;
        continue;
      }

      const t = (i - preDelaySamples) / sampleRate;

      // 1. Box-Muller Gaussian Noise for Left & Right (Stereo Decorrelated)
      const u1L = Math.max(1e-12, Math.random());
      const u2L = Math.random();
      const gL = Math.sqrt(-2.0 * Math.log(u1L)) * Math.cos(2.0 * Math.PI * u2L);

      const u1R = Math.max(1e-12, Math.random());
      const u2R = Math.random();
      const gR = Math.sqrt(-2.0 * Math.log(u1R)) * Math.sin(2.0 * Math.PI * u2R);

      // 2. 3-Band State Separation:
      // Lowpass component (< 350 Hz)
      lpL = (1 - alphaL) * gL + alphaL * lpL;
      lpR = (1 - alphaL) * gR + alphaL * lpR;

      // Highpass component (> 3400 Hz)
      hpOutL = alphaH * (hpOutL + gL - hpInL);
      hpInL = gL;
      hpOutR = alphaH * (hpOutR + gR - hpInR);
      hpInR = gR;

      // Mid component (350 Hz - 3400 Hz)
      const midL = gL - lpL - hpOutL;
      const midR = gR - lpR - hpOutR;

      // 3. Multi-Band Exponential Decay Envelopes
      const eLow = Math.exp(decayL * t);
      const eMid = Math.exp(decayM * t);
      const eHigh = Math.exp(decayH * t);

      // 4. Smooth Raised-Cosine Acoustic Onset Ramp (replaces click-prone linear ramp)
      const onset = (t < mixTime) ? Math.sin((Math.PI / 2) * (t / mixTime)) ** 2 : 1.0;

      // 5. Synthesize Diffuse Late Tail
      left[i] = (lpL * eLow + midL * eMid + hpOutL * eHigh) * onset;
      right[i] = (lpR * eLow + midR * eMid + hpOutR * eHigh) * onset;
    }

    currentSample = endSample;

    if (currentSample < lengthSamples) {
      if (onProgress) onProgress(currentSample / lengthSamples);
      if (immediate) {
        runNextChunk();
      } else {
        setTimeout(runNextChunk, 0);
      }
    } else {
      finalizeSynthesis();
    }
  }

  function finalizeSynthesis() {
    // 6. Inject 3D Specular Early Reflections
    const diffusion = (room.diffusion || 85) / 100;
    const specularScale = (1.0 - 0.25 * diffusion) * 0.85;

    ism.reflections.forEach(ref => {
      const baseIdx = Math.floor((ref.delaySec + (room.preDelay || 0) / 1000) * sampleRate);
      const itdOffset = Math.round(ref.itdSec * sampleRate);

      const idxL = Math.max(0, Math.min(lengthSamples - 1, baseIdx - Math.max(0, itdOffset)));
      const idxR = Math.max(0, Math.min(lengthSamples - 1, baseIdx + Math.max(0, -itdOffset)));

      left[idxL] += ref.amp * ref.gL * specularScale;
      right[idxR] += ref.amp * ref.gR * specularScale;
    });

    // 7. Equal-Power Energy Normalization (preserving dynamic range across variable RT60)
    let sumSquares = 0;
    const step = 4;
    for (let i = 0; i < lengthSamples; i += step) {
      sumSquares += left[i] * left[i] + right[i] * right[i];
    }
    const rms = Math.sqrt(sumSquares / (lengthSamples / 2));
    const targetRms = 0.048;
    const normGain = (rms > 0.0001) ? (targetRms / rms) : 1.0;

    for (let i = 0; i < lengthSamples; i++) {
      left[i] = Math.max(-1.0, Math.min(1.0, left[i] * normGain));
      right[i] = Math.max(-1.0, Math.min(1.0, right[i] * normGain));
    }

    // Assign to AppState & Master Convolver
    room.irBuffer = irBuffer;
    if (masterConvolver) {
      masterConvolver.buffer = irBuffer;
    }

    if (typeof window.drawIrWaveform === 'function') {
      window.drawIrWaveform();
    }

    const statusElem = document.getElementById('irStatusText');
    if (statusElem) {
      statusElem.textContent = `Ready (${acoustics.rt60Mid.toFixed(1)}s, 3D ISM)`;
    }

    if (onComplete) onComplete(irBuffer, acoustics);
  }

  // Start execution
  if (immediate) {
    runNextChunk();
  } else {
    setTimeout(runNextChunk, 0);
  }
}

/**
 * Debounced wrapper for live slider updates (e.g. 40ms trailing edge)
 */
export function debounceSynthesizeImpulseResponse(delayMs = 40) {
  if (_irDebounceTimer) clearTimeout(_irDebounceTimer);
  _irDebounceTimer = setTimeout(() => {
    synthesizeImpulseResponseEnhanced({ immediate: false });
  }, delayMs);
}

/* ==========================================================================
   5. AUDITION TEST IMPULSE GENERATOR
   ========================================================================== */

/**
 * Generates an audition test impulse excitation buffer:
 * - 'starter_pistol': Friedlander shockwave + barrel resonance + gas hiss
 * - 'balloon_burst': Low-frequency expansion dipole + rubber membrane tear
 * - 'dirac_clap': 3-stage palmar impact with acoustic Helmholtz cavity formants
 * - 'dirac_impulse': Bandlimited windowed sinc impulse
 */
export function generateAuditionTestImpulse(type = 'starter_pistol', sampleRate = 48000) {
  const durationSec = (type === 'balloon_burst') ? 0.35 : 0.25;
  const numSamples = Math.floor(sampleRate * durationSec);

  const ctx = (typeof getAudioContext === 'function') ? getAudioContext() : new (window.AudioContext || window.webkitAudioContext)();
  const buffer = ctx.createBuffer(2, numSamples, sampleRate);
  const left = buffer.getChannelData(0);
  const right = buffer.getChannelData(1);

  const startSample = Math.floor(0.015 * sampleRate); // 15ms lead-in silence

  if (type === 'starter_pistol') {
    // Acoustic Starter Pistol: Friedlander blast shockwave + barrel ringing
    const tPlus = 0.00085; // 0.85 ms positive shock phase
    const barrelFreq = 1850; // Hz
    for (let i = startSample; i < numSamples; i++) {
      const t = (i - startSample) / sampleRate;
      if (t < 0.045) {
        const shock = (1 - t / tPlus) * Math.exp(-4.5 * t / tPlus);
        const ring = Math.sin(2 * Math.PI * barrelFreq * t) * Math.exp(-t * 220) * 0.45;
        const gasHiss = (Math.random() * 2 - 1) * Math.exp(-t * 320) * 0.35;
        const s = shock * 0.85 + ring + gasHiss;
        left[i] = s;
        right[i] = s;
      }
    }
  } else if (type === 'balloon_burst') {
    // Balloon Burst: Low-end expansion thump (115Hz) + high-frequency latex tear
    const helmFreq = 115;
    for (let i = startSample; i < numSamples; i++) {
      const t = (i - startSample) / sampleRate;
      if (t < 0.09) {
        const thump = -Math.sin(2 * Math.PI * helmFreq * t) * Math.exp(-t * 55) * 0.95;
        const tear = (Math.random() * 2 - 1) * Math.exp(-t * 160) * 0.55;
        const s = thump + tear;
        left[i] = s;
        right[i] = s;
      }
    }
  } else if (type === 'dirac_clap') {
    // Standardized Acoustic Handclap: Multi-strike palmar transients
    const subHits = [0.0, 0.0032, 0.0078];
    for (let i = startSample; i < numSamples; i++) {
      const t = (i - startSample) / sampleRate;
      let s = 0;
      subHits.forEach((hitTime, idx) => {
        const dt = t - hitTime;
        if (dt >= 0 && dt < 0.065) {
          const weight = (idx === 2) ? 1.0 : 0.35;
          const formant1 = Math.sin(2 * Math.PI * 1050 * dt) * Math.exp(-dt * 90) * 0.45;
          const formant2 = Math.sin(2 * Math.PI * 1750 * dt) * Math.exp(-dt * 130) * 0.30;
          const noise = (Math.random() * 2 - 1) * Math.exp(-dt * 75) * 0.70;
          s += (formant1 + formant2 + noise) * weight;
        }
      });
      left[i] = s;
      right[i] = s;
    }
  } else if (type === 'dirac_impulse') {
    // Bandlimited windowed sinc unit impulse
    const fc = 0.45 * sampleRate;
    const filterLen = 31;
    const center = startSample + Math.floor(filterLen / 2);
    for (let k = -15; k <= 15; k++) {
      const idx = center + k;
      if (k === 0) {
        left[idx] = 1.0;
        right[idx] = 1.0;
      } else {
        const x = 2 * Math.PI * (fc / sampleRate) * k;
        const w = 0.42 - 0.5 * Math.cos(2 * Math.PI * (k + 15) / 30) + 0.08 * Math.cos(4 * Math.PI * (k + 15) / 30);
        const val = (Math.sin(x) / x) * w;
        left[idx] = val;
        right[idx] = val;
      }
    }
  }

  // Peak normalize to -1.0 dBFS (0.891)
  let peak = 0;
  for (let i = 0; i < numSamples; i++) {
    const absL = Math.abs(left[i]);
    if (absL > peak) peak = absL;
  }
  if (peak > 0.0001) {
    const norm = 0.891 / peak;
    for (let i = 0; i < numSamples; i++) {
      left[i] *= norm;
      right[i] *= norm;
    }
  }

  return buffer;
}
