# MEGASTRUCTURE // System Architecture & Technical Specifications (v2.0-PRO)

## 1. System Overview
**MEGASTRUCTURE** is an in-browser digital audio workstation (DAW) and physical acoustics simulator modeled after colossal architectural enclosures (volume up to 1,000,000+ $\text{m}^3$) and distributed public-address (PA) sound reinforcement systems.

The entire application is engineered as a self-contained, single-file HTML5/CSS3/JavaScript production asset requiring **zero build tools, zero package managers, and zero external CDN or network dependencies**.

---

## 2. Architectural Subsystem Layout

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
| - AudioSourceManager  |                                           | - Tactile Controls    |
| - IRSynthesizer (3D)  | <===== State Subscriptions & Actions =====>| - 16-Speaker Matrix   |
| - SpeakerArray (1-16) |                                           | - Transport Timeline  |
| - CableDegradation    |                                           | - Chaos Randomizers   |
| - MasterChain & Limit |                                           | - Preset Manager      |
+-----------+-----------+                                           +-----------+-----------+
            |                                                                   |
            | Analyser Taps (FFT/Vectorscope/O-scope)                           | User Inputs
            v                                                                   v
+-----------------------+                                           +-----------------------+
|   CANVAS VISUALIZERS  |                                           |      PRESET BANK      |
| - Spatial Arena Radar |                                           | - 10 Architecture PR  |
| - 64-Band FFT Spectrum|                                           | - 5 Cable Profiles    |
| - Lissajous Vectorscop|                                           | - Speaker Array Pres  |
| - Time Oscilloscope   |                                           | - JSON State Profiles |
| - IR Envelope Canvas  |                                           +-----------------------+
+-----------------------+                                                       |
                                                                                v
                                                                    +-----------------------+
                                                                    |     EXPORT ENGINE     |
                                                                    | - OfflineAudioContext |
                                                                    | - Lossless WAV (16/24)|
                                                                    | - IEEE Float WAV (32) |
                                                                    | - IR WAV Stems        |
                                                                    | - MP3 / WebM Vorbis   |
                                                                    +-----------------------+
```

---

## 3. Core Subsystems

### 3.1 3D Physical Acoustics & Procedural IR Synthesizer
- **Physical Boundary Modeler**:
  - Continuous 3D dimensional boundaries: Length ($15\text{m} - 200\text{m}$), Width ($10\text{m} - 150\text{m}$), Height ($4\text{m} - 75\text{m}$).
  - Volume computation with automatic cubic meter badge ($V = L \times W \times H$).
  - Physical surface materials with empirical absorption coefficients:
    - **Dense Marble**: Highly specular, minimal absorption ($\bar{\alpha} \approx 0.01$).
    - **Polished Concrete**: Cold, hard boundary with high treble persistence ($\bar{\alpha} \approx 0.02 - 0.04$).
    - **Weathered Brick**: Diffuse scattering with balanced mids ($\bar{\alpha} \approx 0.03 - 0.07$).
    - **Hardwood**: Resonant warm decay ($\bar{\alpha} \approx 0.08 - 0.18$).
    - **Corrugated Steel/Metal**: Resonant flutter reflections ($\bar{\alpha} \approx 0.04 - 0.15$).
    - **Reinforced Glass**: Bright high-frequency acoustic reflections ($\bar{\alpha} \approx 0.03 - 0.18$).
- **Eyring-Norris & Sabine Reverberation Equations**:
  - Calculates true physical decay times across tri-band acoustic spectra (Low: $125\text{Hz} - 500\text{Hz}$, Mid: $500\text{Hz} - 2\text{kHz}$, High: $2\text{kHz} - 16\text{kHz}$).
  - Full implementation of ISO 9613-1 atmospheric attenuation coefficients ($m_{\text{air}}$ at $20^\circ\text{C}$, $40\%$ relative humidity).
- **3D Image Source Model (ISM)**:
  - Synthesizes 24 discrete specular early reflections:
    - 6 Order-1 planar reflections (Back, Front, Left, Right, Floor, Ceiling).
    - 18 Order-2 corner and axial bounce reflections.
  - Computes exact spatial propagation vectors, arrival delay offsets ($\Delta t = \frac{d_i - d_{\text{dir}}}{c}$), angle of incidence, and Interaural Time Differences (ITD) for head-related spatial localization.
- **Stochastic Exponential Decay Tail**:
  - Multi-band Gaussian noise envelope with non-linear rise time ($\tau_{\text{rise}} = 15 - 35\text{ms}$) eliminating unnatural Dirac transients.
  - Frequency-dependent decay damping ($RT_{60,\text{low}} = RT_{60} \times \beta_{\text{bass}}$, $RT_{60,\text{high}} = RT_{60} \times \delta_{\text{damp}}$).

### 3.2 16-Speaker Spatial Array & Delay Alignment Engine
- **Spatial Positioning in 3D Space**:
  - Up to 16 independently placed sound reinforcement speakers in top-down coordinates $(x, y, z)$.
  - Direct distance calculation to the binaural listener:
    $$d = \sqrt{(x_s - x_l)^2 + (y_s - y_l)^2 + (z_s - z_l)^2}$$
- **Speed of Sound Delay**:
  - Acoustic propagation time: $\tau = \frac{d}{343\text{ m/s}}$.
  - Simulates the physical arrival time lags characteristic of stadium and cathedral sound installations (up to $450\text{ms}$).
- **Delay Alignment Network**:
  - **FOH Time-Alignment Mode**: Calculates compensation delays to align multiple speaker clusters to a common acoustic wavefront, eliminating comb filtering and phase smear.
  - **Haas Precedence Mode**: Applies $10 - 25\text{ms}$ psychoacoustic offsets to anchor localization to the primary stage while reinforcing volume through satellite fills.
- **Driver Emulation Profiles**:
  - *Stadium PA Horn*: $350\text{Hz} - 4.5\text{kHz}$ bandpass with resonant horn throat flare.
  - *Warehouse Ceiling Cone*: $250\text{Hz} - 6\text{kHz}$ midrange emphasis with boundary bass coupling.
  - *Bullhorn / Megaphone*: $500\text{Hz} - 3\text{kHz}$ narrow telephone resonance with extreme non-linear clipping.
  - *Tannoy Intercom*: Gritty lo-fi response with asymmetric crossover distortion.
  - *Arena Line Array*: Full-range high-output curve with sub-bass extension down to $32\text{Hz}$.
  - *Flat Studio Monitor*: Ultra-linear reference transfer function ($20\text{Hz} - 20\text{kHz}$).

### 3.3 Vintage Transmission & Cable Degradation
- **Cable Transmission Line Physics**:
  - Capacitive high-frequency rolloff modeling unshielded runs up to $300\text{m}$:
    $$f_c = \frac{1}{2\pi R C \cdot L}$$
- **Ground Loop AC Mains Hum**:
  - Phase-coherent $50\text{Hz}$ (UK/Europe) or $60\text{Hz}$ (US) fundamental oscillator.
  - Harmonic overtones at $2\times, 3\times, 4\times$ the fundamental ($100/120\text{Hz}, 150/180\text{Hz}, 200/240\text{Hz}$).
- **Microphonic Contact Noise & RF Static**:
  - Poisson-distributed stochastic impulse crackles simulating oxidized jacks, loose XLR pins, and phantom power pops.
- **Transformer Core Saturation**:
  - Slew-rate limiting and non-linear magnetic hysteresis curves emulating vintage passive audio transformers.

### 3.4 60FPS Multi-Mode Visualizer Suite
- **Interactive 2D Spatial Arena Radar**:
  - HiDPI retina-rendered acoustic floorplan with boundary walls and dimensional grid.
  - Real-time drag-and-drop for both listener (`EAR`) and speakers (`S1`–`S16`).
  - Outwardly expanding acoustic wavefront ripples propagating at true scale ($343\text{ m/s}$).
  - Live distance vectors with floating millisecond arrival tags.
- **Real-Time Visualizer Engine**:
  - **Mode 1: 64-Band FFT Spectrum Analyzer**: Logarithmically spaced frequency bins with glowing cyan-to-amber amplitude bars and peak hold drops.
  - **Mode 2: Stereo Lissajous Vectorscope / Goniometer**: $45^\circ$-rotated mid-side phase correlation display showing true stereo spatial width.
  - **Mode 3: Real-Time Oscilloscope**: Time-domain waveform trace with zero-crossing sync.
  - **Mode 4: IR Envelope Preview**: Visual canvas rendering synthesized early reflection clusters and exponential decay tail.

### 3.5 Pure-JS Lossless WAV, Compressed & IR WAV Exporter
- **Multi-Threaded Offline Rendering**:
  - Clones the full DSP graph into an `OfflineAudioContext` for rendering up to $35\times$ faster than real-time.
  - Configurable Reverb Tail Ring-out Padding ($0 - 18\text{s}$) guaranteeing no decay truncation.
- **Bit-Depth Exporters (Zero Dependencies)**:
  - **16-bit PCM WAV**: Universal master format with triangular dither.
  - **24-bit PCM WAV**: Studio-grade high-resolution master format.
  - **32-bit IEEE Float WAV**: Uncompressed 32-bit float DAW interchange format.
  - **MP3 (320 / 192 kbps)**: Embedded pure-JS LAME encoder.
  - **WebM / OGG Vorbis**: Lightweight streaming compressed container.
  - **Direct IR WAV Stem Export**: Exports pure stereo Impulse Response WAV files for immediate loading into third-party convolution plugins (Altiverb, FabFilter Pro-R 2, Logic Space Designer, REAPER ReaVerb).

---

## 4. Concurrency & Multi-Agent Conventions
- Strict code section isolation (`[SECTION-1]` through `[SECTION-10]`).
- Distributed concurrency locks coordinated via `/Progress/`.
- Zero runtime external imports, retaining 100% self-contained single-file deployment.
