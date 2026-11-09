# Multi-Speaker Array & Spatial Audio Engineering Report

**Agent**: Agent 3 (Multi-Speaker Array & Spatial Audio Engineer)  
**Date**: 2026-11-09  
**Status**: COMPLETED & VERIFIED  

---

## 1. Executive Summary

The multi-speaker sound reinforcement system in `index.html` has been comprehensively upgraded to professional live-sound and architectural acoustic standards. The system now models high-density sound reinforcement grids and distributed column arrays up to 16 independently positioned speakers with real-time physical propagation delay, inverse-square law attenuation, ISO 9613-1 air molecular absorption high-frequency filtering, driver electromechanical filtering, polar horn directivity with variable beamwidth dispersion, and listener head-orientation spatial azimuth panning.

---

## 2. Audio Graph Architecture (Per Speaker)

Each speaker $S_k$ ($k \in [1, 16]$) possesses an independent, real-time Web Audio DSP graph node pipeline:

```
[masterInputNode]
       |
  [inputGain]
       |
 [cableFilter]             (BiquadFilter 'lowpass': Cable capacitance high-frequency rolloff)
       |
  [phaseGain]              (GainNode: Polarity inversion 0° [+1.0] / 180° [-1.0])
       |
 [userHpFilter]            (BiquadFilter 'highpass': User high-pass cutoff 20 Hz - 2,000 Hz, Q = 0.707)
       |
[driverHpFilter]           (BiquadFilter 'highpass': Driver acoustic low-end cutoff, e.g. horn flare cutoff)
       |
[driverLpFilter]           (BiquadFilter 'lowpass': Driver diaphragm mass rolloff & horn resonance peak)
       |
 [userLpFilter]            (BiquadFilter 'lowpass': User low-pass cutoff 400 Hz - 20,000 Hz, Q = 0.707)
       |
  [airFilter]              (BiquadFilter 'lowpass': Dynamic air absorption fc = 20,000 / (1 + 0.015 * d))
       |
[saturationNode]           (WaveShaperNode: Diaphragm distortion & transformer saturation curve)
       |
  [delayNode]              (DelayNode: Physical delay t = d / 343 m/s + user delay offset compensation)
       |
[distDirGain]              (GainNode: Combined inverse-square attenuation g_dist * polar directivity g_dir)
       |
 [pannerNode]              (StereoPannerNode: Azimuth angle relative to listener head orientation)
       |
       +-----------------------------------+
       |                                   |
  [directGain]                       [reverbSendGain]
       |                                   |
[masterDryGain]                     [masterConvolverNode]
```

This exact same audio graph is synthesized both in the live interactive `AudioContext` and in the high-speed `OfflineAudioContext` multi-format bounce engine.

---

## 3. Mathematical Formulations & Acoustic Physics

### 3.1 3D Physical Propagation Delay
- Speed of sound in ambient air (at 20°C): $c = 343.0\text{ m/s}$.
- Euclidean distance in structure (meters):
  $$d = \sqrt{((x_s - x_l) \cdot W)^2 + ((y_s - y_l) \cdot L)^2 + (z_s - z_l)^2}$$
- Physical propagation delay:
  $$t_{\text{phys}} = \frac{d}{c}$$
- Total delay with user delay offset compensation ($\Delta t_{\text{offset}}$):
  $$t_{\text{total}} = t_{\text{phys}} + \frac{\Delta t_{\text{offset}}}{1000}$$

### 3.2 Inverse-Square Law Attenuation
Sound pressure decreases with physical distance from the acoustic radiator:
$$g_{\text{dist}} = \min\left(1.0, \frac{d_0}{\max(d_0, d)}\right)$$
where $d_0 = 2.0\text{ m}$ is the reference calibration distance for large halls and arenas.

### 3.3 Atmospheric Air Absorption High-Frequency Damping
High frequencies attenuate progressively due to molecular relaxation of oxygen and nitrogen molecules (ISO 9613-1 approximation):
$$f_{c,\text{air}} = \max\left(800\text{ Hz}, \min\left(20000\text{ Hz}, \frac{20000}{1 + 0.015 \cdot d}\right)\right)$$

### 3.4 Polar Directivity & Horn Dispersion Modeling
Radiation angle from speaker to listener:
$$\phi = \operatorname{atan2}((x_l - x_s) \cdot W, (y_l - y_s) \cdot L)$$
Angular offset off-axis from speaker aim angle $\theta_{\text{aim}}$:
$$\Delta\theta = |\operatorname{normalizeAngle}(\phi - \theta_{\text{aim}})|$$
For nominal horn coverage beamwidth $\theta_{\text{beam}}$:
- On-axis / inside nominal beam ($\Delta\theta \le \theta_{\text{beam}} / 2$):
  $$g_{\text{dir}} = 1.0 - 0.293 \cdot \left(\frac{2 \Delta\theta}{\theta_{\text{beam}}}\right)^2 \quad (-3\text{ dB at beam boundary})$$
- Off-axis / behind cabinet ($\Delta\theta > \theta_{\text{beam}} / 2$):
  $$g_{\text{dir}} = \max\left(0.20, 0.707 \cdot \left(1 - 0.72 \cdot \frac{\Delta\theta - \theta_{\text{beam}}/2}{\pi - \theta_{\text{beam}}/2}\right)\right) \quad (\text{down to }-14\text{ dB})$$

### 3.5 Listener Head Orientation & Azimuth Panning
Listener heading: $\theta_{\text{head}}$ (0 rad = North/Stage). Bearing angle to speaker:
$$\alpha_{\text{bearing}} = \operatorname{atan2}((x_s - x_l) \cdot W, -(y_s - y_l) \cdot L)$$
Relative azimuth:
$$\Delta\theta_{\text{ear}} = \operatorname{normalizeAngle}(\alpha_{\text{bearing}} - \theta_{\text{head}})$$
Stereo pan:
$$\text{pan}_{\text{auto}} = \sin(\Delta\theta_{\text{ear}})$$
Sounds arriving from behind ($|\Delta\theta_{\text{ear}}| > 99^\circ$) apply acoustic pinna shadow filtering ($f_{c,\text{shadow}} = 11.5\text{ kHz}$).

---

## 4. Pre-Configured Speaker Topologies

1. **Arena 4-Point (Quad)**:
   - 4 full-range line arrays placed in the perimeter corners (NW, NE, SW, SE) angled at 45°/135° inward to the arena center.
2. **Stadium Endzones**:
   - Dual clusters (6 high-output stadium horns): 3 speakers clustered at the North endzone firing South (0°), 3 speakers clustered at the South endzone firing North (180°).
3. **Cathedral Distributed Columns (with delay compensation)**:
   - 8 column speakers staggered in pairs along the Left and Right aisles of the nave.
   - Delay compensation offsets:
     - Bay 1 (Chancel): 0 ms
     - Bay 2 (Transept): +65 ms
     - Bay 3 (Mid-Nave): +130 ms
     - Bay 4 (Narthex): +195 ms
     (Synchronizes the acoustic arrival time of sound radiating from the front pulpit wavefront).
4. **Warehouse Grid (Ceiling Matrix)**:
   - 9 distributed ceiling cone speakers in a uniform 3x3 grid across the space with wide 130° downward conical coverage.
5. **Perimeter Surround 7.1**:
   - 8 speakers configured according to ITU-R BS.775 surround geometry around the listener: C (0°), FL (-30°), FR (+30°), SL (-90°), SR (+90°), RL (-140°), RR (+140°), Sub/LFE (near-field).
6. **Concentric Ring Array**:
   - 12 line array modules arranged symmetrically in a circular perimeter ring (radius = 36% room width) angled inward towards center.

---

## 5. Speaker Driver Profiles

| Profile Name | Key Identifier | High-Pass Filter | Low-Pass Filter | Dispersion Beamwidth | Character |
|---|---|---|---|---|---|
| **Stadium Horn** | `stadium_horn` / `pa_horn` | 350 Hz (Q = 1.3) | 4,800 Hz (Q = 2.0) | 90° | Exponential flare cutoff, resonant diaphragm projection |
| **Ceiling Cone** | `ceiling_cone` | 180 Hz (Q = 0.7) | 6,500 Hz (Q = 0.8) | 130° | Smooth coaxial rolloff, wide distributed dispersion |
| **Megaphone** | `megaphone` | 520 Hz (Q = 2.4) | 3,200 Hz (Q = 3.0) | 55° | Extreme nasal honk, narrow focused beam, lo-fi saturation |
| **Telephony Intercom** | `telephony_intercom` / `tannoy` | 300 Hz (Q = 1.4) | 3,400 Hz (Q = 1.8) | 110° | Speech bandpass (G.711 / Bell System standard) |
| **Line Array** | `line_array` / `arena_stack` | 35 Hz (Q = 0.7) | 16,500 Hz (Q = 0.7) | 110° | Full-range, deep punchy sub-bass & high SPL dynamic headroom |
| **Flat Reference** | `studio_flat` | 20 Hz (Q = 0.5) | User LP (Q = 0.7) | 360° (Omni) | Linear reference monitor response, uncolored accuracy |

---

## 6. Speaker Controls Matrix

- **Pan**: -1.00 (100% Left) to +1.00 (100% Right), with 1-click **Auto Azimuth** tracking.
- **Volume**: -40.0 dB to +6.0 dB in 0.5 dB increments.
- **Overdrive**: 0% to 100% saturation curve via WaveShaper.
- **Low-pass filter (LPF)**: 400 Hz to 20,000 Hz.
- **High-pass filter (HPF)**: 20 Hz to 2,000 Hz.
- **Reverb Room Send**: 0% to 100% wet convolution feed.
- **Physical Delay**: Speed of sound auto calculation ($t = d/343\text{ m/s}$) + manual delay override.
- **Delay Offset (ms)**: -50 ms to +250 ms fine delay offset / wavefront compensation.
- **Phase Inversion**: 0° / 180° polarity flip button (`btnSpeakerPhase`).
- **Solo**: Exclusive solo auditioning.
- **Mute**: Instant channel muting with crossed-out tab indicator.
- **Horn Aim Angle**: 0° to 360° with **Aim at Ear** auto-alignment.
- **Radiation Dispersion**: 55°, 90°, 110°, 130°, and 360° (Omni).
