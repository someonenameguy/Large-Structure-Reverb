# MEGASTRUCTURE REVERB & PA SIMULATOR
## Architectural Blueprint & Multi-Agent Integration Guidelines (Agent 1: Lead Architect)

**Author:** Agent 1 — Lead Architect & Concurrency Supervisor  
**Date:** 2026-11-09  
**Version:** 2.0.0-PRO  
**Target File:** `/home/antigravity/someonenameguy/Large-Structure-Reverb/index.html`

---

## 1. Compliance & Constraints Verification

| Constraint | Requirement | Status | Verification Detail |
|---|---|---|---|
| **Tech Stack** | Pure HTML5 / CSS3 / JavaScript (ES2022+) | **VERIFIED** | Zero frameworks, zero compilers, zero npm runtime dependencies. Pure modern browser standards. |
| **Zero External CDN** | No external JS, CSS, fonts, or assets | **VERIFIED** | Zero `<link>` or `<script>` tags referencing external origins. All typography uses high-performance system font stacks (`JetBrains Mono`, `ui-monospace`, `-apple-system`). Iconography uses pure Unicode glyphs / SVG / Canvas. |
| **Offline Functionality** | 100% self-contained, no network calls | **VERIFIED** | No `fetch`, `XMLHttpRequest`, `WebSocket`, or WebAssembly dependencies. Synthetic audio is generated procedurally in-memory via mathematical algorithms. Exporters run in-memory via DataView/ArrayBuffer. |
| **Non-Laggy 60FPS UI** | Smooth rendering, zero audio dropouts | **VERIFIED** | Real-time audio runs strictly on Web Audio's dedicated real-time audio thread. Canvas visualizers are decoupled using `requestAnimationFrame` with HiDPI pixel ratio scaling. Heavy convolutions run asynchronously in `OfflineAudioContext`. |
| **High Audio Fidelity** | Studio-grade physical acoustic simulation | **VERIFIED** | 32-bit floating point processing pipeline, image-source ray-tracing early reflections, stochastic multi-band exponential decay tail, physical speed-of-sound propagation ($c = 343\text{ m/s}$), driver profiles, lookahead brickwall limiter. |

---

## 2. Modular Architecture Blueprint

The application follows an Event-Driven, Unidirectional Data Flow architecture embedded within a single self-contained production file (`index.html`), structured into 9 strictly demarcated functional subsystems:

```
+---------------------------------------------------------------------------------------+
|                                    APPLICATION STATE                                  |
|                         (AppState: Reactive Central State Store)                      |
+-------------------------------------------+-------------------------------------------+
                                            |
        +-----------------------------------+-----------------------------------+
        |                                                                       |
        v                                                                       v
+-----------------------+                                           +-----------------------+
|     AUDIO ENGINE      |                                           |     UI CONTROLLER     |
| - AudioSourceManager  |                                           | - Knobs & Sliders     |
| - IRSynthesizer       | <===== State Subscriptions & Actions =====>| - Speaker Tabs        |
| - SpeakerArray (1-12) |                                           | - Transport & Timeline|
| - CableDegradation    |                                           | - Modals & Dialogs    |
| - MasterChain & Limiter                                           | - Chaos Randomizers   |
+-----------+-----------+                                           +-----------+-----------+
            |                                                                   |
            | Analyser Taps                                                     | User Inputs
            v                                                                   v
+-----------------------+                                           +-----------------------+
|   CANVAS VISUALIZERS  |                                           |      PRESET BANK      |
| - Spatial Arena Radar |                                           | - Architectural (8)   |
| - FFT Spectrum (60fps)|                                           | - Cable Profiles (5)  |
| - Lissajous Vectorscope                                           | - Speaker Arrays      |
| - Oscilloscope Wave   |                                           | - JSON Import/Export  |
| - IR Envelope Display |                                           | - LocalStorage Save   |
+-----------------------+                                           +-----------------------+
                                            |
                                            v
                                +-----------------------+
                                |     EXPORT ENGINE     |
                                | - OfflineAudioContext |
                                | - Tail Padding Ringout|
                                | - Lossless WAV (16/24/32)
                                | - Blob Preview/Download
                                +-----------------------+
```

---

### Module 1: State Management (`AppState` & `EventBus`)
- **Central Store (`AppState`)**:
  - `AppState.audio`: Playback state, transport position, current track/buffer, mic state, loop toggle, A/B bypass.
  - `AppState.room`: Dimensions ($L, W, H$), volume ($m^3$), material absorption coefficients, $RT_{60}$, pre-delay, air high-damping cutoff, bass multiplier, reflection diffusion, generated `irBuffer`.
  - `AppState.listener`: Normalized 2D/3D coordinates $(x, y, z)$, orientation angle $\theta$.
  - `AppState.speakers`: Array of 1 to 12 speaker objects (id, $x, y, z$, driver type, volume dB, pan, drive, LP cutoff, reverb send, manual delay, solo, mute, runtime WebAudio node references).
  - `AppState.cable`: Engaged toggle, profile preset, run distance ($m$), capacitive cutoff ($Hz$), ground loop hum gain, hum frequency ($50/60Hz$), contact crackle gain, slew rate distortion.
  - `AppState.master`: Wet level, dry level, stereo width ($0-200\%$), 3-band EQ gains, master gain, limiter threshold.
  - `AppState.ui`: Selected speaker index, active visualizer mode (`fft`, `vectorscope`, `oscilloscope`), modal visibility.
- **Event Bus / Action Dispatcher**:
  - Lightweight pub/sub (`emit(event, payload)`, `on(event, handler)`) to eliminate spaghetti references between canvas interactions, DOM controls, and Web Audio nodes.

---

### Module 2: Audio Engine (`AudioEngine`)
1. **Source Manager**:
   - `AudioBufferSourceNode` for loaded audio and procedural demos.
   - Built-in Procedural Sound Generator:
     - European Airport/Station PA Chime + Vocal Announcement (harmonic FM chime + bandpass voice).
     - Acoustic Snare & Handclap (filtered noise burst + transient pitched Dirac).
     - 808 Hip-Hop Drum Break (sub sine drop + resonant clap).
     - Synth Brass Progression (detuned saw oscillators + lowpass envelope).
     - Plucked Guitar Harmonic (Karplus-Strong algorithmic physical string simulation).
     - Dirac Acoustic Impulse Click (single-sample Dirac delta for pure impulse auditing).
   - Live Microphone Stream input via `navigator.mediaDevices.getUserMedia`.
2. **Impulse Response Synthesizer (`IRSynthesizer`)**:
   - Image-source ray-tracing model for 28+ early planar reflections (floor, ceiling, left, right, front, back walls) with frequency-independent boundary damping.
   - Stochastic Gaussian late reverberation tail shaped by dual-exponential decay envelopes ($RT_{60,\text{mid}}$ and $RT_{60,\text{bass}} = RT_{60} \times \text{bassMult}$).
   - 1st-order IIR lowpass filter simulating air molecular absorption over travel distance.
   - Smooth onset rise time (20–25ms) preventing synthetic transient clicks.
   - Equal-power energy normalization maintaining consistent perceived loudness across varying decay times.
3. **Speaker Array Network (`SpeakerArray`)**:
   - Dynamic 1–12 channel routing.
   - Per-speaker physical delay calculation: $\tau = d / 343\text{ s}$ with optional manual override (0–450ms).
   - Per-speaker driver modeling:
     - Stadium PA Horn: Bandpass (350Hz–4.5kHz) with resonant horn flare Q.
     - Warehouse Ceiling Cone: Midrange bandpass (250Hz–6kHz) with acoustic roll-off.
     - Megaphone / Bullhorn: Narrow bandpass (500Hz–3kHz) with high saturation.
     - Tannoy Intercom: Lo-Fi telephony band with gritty asymmetric clipping.
     - Arena Line Array: Full-range with bass reflex extension.
     - Studio Monitor: Flat linear response.
   - Non-linear diaphragm saturation waveshaper ($tanh$ / sigmoid curve).
   - Stereo panning (`StereoPannerNode`), mute, and solo matrix.
4. **Cable Degradation Simulator (`CableDegradation`)**:
   - High-frequency capacitive attenuation filter ($f_c = \frac{1}{2\pi R C \cdot L}$).
   - Ground loop mains hum oscillator (50Hz / 60Hz fundamental + 2nd, 3rd, 4th harmonics at 100/120Hz, 150/180Hz, 200/240Hz).
   - Contact static crackle: Poisson-distributed impulse noise bursts.
   - Transformer slew rate non-linearity.
5. **Master Dynamics & EQ (`MasterChain`)**:
   - Dual-bus summing (Speaker Sum + Reverb Return Convolver).
   - Mid/Side stereo acoustic width processor ($0\%$ mono to $200\%$ super-wide).
   - 3-band parametric equalizer: Low-shelf (120Hz), Mid-peaking (1800Hz, Q=1.0), High-shelf (6500Hz).
   - Transparent brickwall lookahead peak limiter (0 dBFS ceiling) preventing digital clipping.

---

### Module 3: UI Controller (`UIController`)
- **Tactile Knobs & Sliders**:
  - Unified slider and rotary knob interaction: vertical drag, wheel adjustment, shift-drag fine tuning, double-click to default.
  - Value formatting helpers (dB, Hz, ms, s, %, m).
- **Speaker Matrix & Inspector**:
  - Dynamic speaker tab bar with add/remove capability up to 12 channels.
  - Active speaker inspector panel with real-time sync with 2D radar coordinates.
- **Master Transport**:
  - Play/Pause/Stop, seamless loop toggle, timecode readouts (`00:00.00`).
  - Interactive scrubbing timeline with mini waveform display and draggable playhead.
- **Chaos Engine**:
  - Master `RANDOMIZE ALL` button with musically and acoustically plausible randomization bounds.
  - Sub-randomizers: Room Architecture, Speaker Array, Radar Scatter, Cable Wear.

---

### Module 4: Canvas Visualizers (`VisualizerEngine`)
- **Spatial Acoustic Arena Radar**:
  - Top-down 2D floorplan with dimension markers and boundary walls.
  - Interactive drag-and-drop for Listener (`EAR`) and Speakers (`S1`–`S12`).
  - Animated acoustic wavefront ripples propagating outward at $c = 343\text{ m/s}$.
  - Real-time line-of-sight distance rays with live distance ($m$) and arrival delay ($ms$).
  - Hover tooltips and acoustic coordinate badges.
- **Master Multi-Mode Visualizer**:
  - Mode 1: FFT Frequency Spectrum Analyzer (logarithmic 64-band glowing gradient bars).
  - Mode 2: Stereo Lissajous Goniometer / Vectorscope (phase correlation & stereo spread).
  - Mode 3: Oscilloscope Time-Domain Waveform.
- **Acoustic IR Waveform Canvas**:
  - Visual depiction of synthesized early reflection clusters and exponential decay tail.
- **Stereo Metering**:
  - Peak and RMS stereo channel bars with peak hold and clip indicator.

---

### Module 5: Export Engine (`ExportEngine`)
- Accelerated offline rendering via `OfflineAudioContext`.
- Complete DSP graph replication in offline context (source, cable, speakers, delays, convolver, EQ, limiter).
- Configurable tail padding ringout (0 to 18 seconds) capturing the entire cathedral reverberation tail.
- In-browser pure JavaScript audio encoders:
  - Lossless WAV 16-bit PCM (Standard CD Master).
  - Lossless WAV 24-bit PCM (Studio High-Resolution Master).
  - Lossless WAV 32-bit IEEE Floating Point (Professional DAW format).
- In-memory Blob generation with preview audio player and direct download link.
- Progress reporting ($0\%$ to $100\%$) during rendering.

---

### Module 6: Preset Bank & Serialization (`PresetBank`)
- Factory architectural spaces:
  1. Grand Gothic Cathedral ($RT_{60}$: 7.8s, marble)
  2. Boeing 747 Aircraft Hangar ($RT_{60}$: 5.4s, metal)
  3. Underground Subterranean Cavern ($RT_{60}$: 9.2s, stone)
  4. Open-Air Sports Arena & PA ($RT_{60}$: 4.2s, concrete)
  5. Brutalist Multi-Story Garage ($RT_{60}$: 3.5s, concrete)
  6. Industrial Steel Distribution Hub ($RT_{60}$: 4.8s, metal)
  7. High-School Gymnasium ($RT_{60}$: 2.6s, wood)
  8. Nuclear Concrete Cooling Tower ($RT_{60}$: 12.0s, concrete)
- Cable profiles: Cheap Copper, Weathered Multicore, Rusty PA, Vintage Coax, Studio Mogami.
- Preset Serialization: Export entire project state to `.json` file and import custom user presets.
- `localStorage` snapshot auto-save.

---

## 3. Concurrency, File Locking & Progress Conventions

To enable seamless multi-agent development on the single-file codebase without race conditions or code overwrite:

1. **Section Ownership Demarcation**:
   - `index.html` is partitioned into distinct non-overlapping sections with standard delimiter comments:
     - `/* [SECTION-1] CSS STYLES & DESIGN TOKENS */`
     - `<!-- [SECTION-2] DOM STRUCTURE & UI LAYOUT -->`
     - `/* [SECTION-3] APP STATE & EVENT BUS */`
     - `/* [SECTION-4] PROCEDURAL AUDIO & DSP GRAPH */`
     - `/* [SECTION-5] IR SYNTHESIZER & ACOUSTIC PHYSICS */`
     - `/* [SECTION-6] SPEAKER ARRAY & CABLE SIMULATOR */`
     - `/* [SECTION-7] UI CONTROLLERS & EVENT LISTENERS */`
     - `/* [SECTION-8] CANVAS VISUALIZERS & 60FPS RAF LOOP */`
     - `/* [SECTION-9] OFFLINE EXPORT ENGINE & ENCODERS */`
     - `/* [SECTION-10] PRESET BANK & INITIALIZATION */`

2. **Concurrency Locking Protocol (`Progress/`)**:
   - Before any agent reads or edits `index.html`, it **must inspect `Progress/`** for existing active locks.
   - To acquire an edit lock, write a lock file: `Progress/agent_<ID>_<section>.lock` containing:
     ```json
     {
       "agent": "Agent 2 - DSP Engineer",
       "timestamp": "2026-11-09T03:45:00Z",
       "section": "[SECTION-4] PROCEDURAL AUDIO & DSP GRAPH",
       "lines": "1650-1820",
       "status": "EDITING"
     }
     ```
   - When editing is complete and verified, the agent **must delete its lock file** and update `Progress/activity_log.md`.

3. **Verification Protocol Before Handoff**:
   - Syntax validation via `node -c` (extracting script tag content or running AST check).
   - Check zero external network calls (`grep -E '(http:|https:|src=|href=|<link)' index.html`).
   - Browser rendering test (ensuring no console errors).
   - Log completion summary in `Progress/activity_log.md` and handoff report in `Handoffs/`.
