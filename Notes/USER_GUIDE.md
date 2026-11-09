# MEGASTRUCTURE // Comprehensive User Guide & Operation Manual

## 1. Quick Start Guide
MEGASTRUCTURE is a zero-dependency, single-file in-browser audio workstation.
1. Open `index.html` in any modern web browser (Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge).
2. The simulation initializes with the default **Grand Gothic Cathedral** preset and loaded PA chime announcement demo.
3. Hit `Spacebar` to start playback and experience the physical reverberation in real time.
4. Drag the listener (`EAR`) or any of the speakers (`S1`–`S16`) on the top-down **2D Spatial Arena Radar** to observe real-time spatial panning and speed-of-sound arrival delays.

---

## 2. Architectural Presets (10 Realistic Mega-Spaces)

| # | Preset Name | $RT_{60}$ | Dimensions ($L \times W \times H$) | Volume ($\text{m}^3$) | Surface Material | Speaker Configuration | Cable Degradation Profile |
|---|---|---|---|---|---|---|---|
| 1 | **Grand Gothic Cathedral** | 8.5s | $115\text{m} \times 42\text{m} \times 38\text{m}$ | $183,540\,\text{m}^3$ | Italian Marble ($\alpha=0.01$) | 6 Distributed Column Speakers (`tannoy`) | Vintage 1970s Coax ($120\text{m}$, 50Hz hum, 4.2kHz rolloff) |
| 2 | **Boeing 747 Aircraft Hangar** | 5.6s | $140\text{m} \times 80\text{m} \times 12.5\text{m}$ | $140,000\,\text{m}^3$ | Corrugated Metal ($\alpha=0.03$) | 4 High-Bay Ceiling Truss Horns (`pa_horn`) | Heavy Stage Snake ($140\text{m}$, 60Hz hum cart, 3.8kHz rolloff) |
| 3 | **Subterranean Salt Mine / Cavern** | 11.5s | $135\text{m} \times 65\text{m} \times 24\text{m}$ | $210,600\,\text{m}^3$ | Crystalline Rock ($\alpha=0.012$) | 4 Salt Alcove Tannoys & Horns (`tannoy`, `pa_horn`) | Weathered Multicore ($165\text{m}$, damp saline corrosion & crackle) |
| 4 | **Olympic Sports Stadium** | 4.5s | $195\text{m} \times 135\text{m} \times 48\text{m}$ | $1,263,600\,\text{m}^3$ | Cast Tier Concrete ($\alpha=0.025$) | 6 Field Perimeter Arrays & PA Horns (`arena_stack`, `pa_horn`) | Weathered Multicore ($200\text{m}$, outdoor snake, lighting ripple) |
| 5 | **Brutalist Concrete Parking Garage** | 3.4s | $80\text{m} \times 45\text{m} \times 3.4\text{m}$ | $12,240\,\text{m}^3$ | Bare Concrete Deck ($\alpha=0.02$) | 4 Low-Ceiling Cones & Intercoms (`ceiling_cone`, `tannoy`) | Corroded Duct PA Wiring ($90\text{m}$, ballast buzz & crackle) |
| 6 | **Nuclear Concrete Cooling Tower** | 14.0s | $88\text{m} \times 88\text{m} \times 140\text{m}$ | $1,084,160\,\text{m}^3$ | Hyperboloid Concrete ($\alpha=0.015$) | 6 Basin Ring Arrays (`arena_stack`, `pa_horn`) | Heavy Stage Snake ($150\text{m}$, cooling pump hum, 3.5kHz rolloff) |
| 7 | **CERN Supercollider Concrete Tunnel** | 6.8s | $200\text{m} \times 10\text{m} \times 6\text{m}$ | $12,000\,\text{m}^3$ | Concrete Liner ($\alpha=0.02$) | 4 Waveguide Intercoms & Megaphones (`tannoy`, `megaphone`) | Vintage Coax ($175\text{m}$, instrumentation line, RF/klystron hum) |
| 8 | **Taj Mahal Marble Mausoleum** | 9.6s | $58\text{m} \times 58\text{m} \times 44\text{m}$ | $148,016\,\text{m}^3$ | Makrana Marble ($\alpha=0.008$) | 4 Concealed Archway Monitors (`studio_flat`) | Studio Mogami Gold ($60\text{m}$, pristine OFC, ultra-low noise floor) |
| 9 | **Industrial Grain Silo** | 7.5s | $26\text{m} \times 26\text{m} \times 52\text{m}$ | $35,152\,\text{m}^3$ | Galvanized Sheet Steel ($\alpha=0.035$) | 3 Suspended Cylindrical Horns (`pa_horn`, `megaphone`) | Corroded Duct PA Wiring ($75\text{m}$, motor induction hum & crackle) |
| 10 | **Abbey Vintage Echo Chamber** | 2.8s | $18\text{m} \times 14\text{m} \times 6.5\text{m}$ | $1,638\,\text{m}^3$ | Glazed Plaster & Tile ($\alpha=0.035$) | 2 Corner Diffuser Monitors (`studio_flat`) | Vintage 1970s Coax ($45\text{m}$, warm valve saturation, 50Hz hum) |

---

## 3. Physical Acoustics & Procedural IR Engine
- **Room Dimension Sliders**:
  - Length ($15 - 200\text{m}$), Width ($10 - 150\text{m}$), Height ($4 - 75\text{m}$).
  - Live volume readouts in cubic meters ($\text{m}^3$).
- **Surface Materials**:
  - Select between Concrete, Brick, Metal, Wood, Marble, and Glass.
  - Automatically loads empirical absorption coefficients based on Eyring-Norris acoustic modeling.
- **Parametric Acoustic Controls**:
  - **$RT_{60}$**: Decay time from $0.5\text{s}$ to $22.0\text{s}$.
  - **Pre-Delay**: Initial silence gap ($0 - 250\text{ms}$) simulating direct-to-boundary flight time.
  - **Air & Wall Damping**: Lowpass cutoff ($800\text{Hz} - 18,000\text{Hz}$) modeling atmospheric absorption over distance.
  - **Bass Multiplier**: Scales low-frequency decay ($0.5\times - 3.0\times$) for cavernous resonances.
  - **Reflection Diffusion**: Controls ray scattering density ($10\% - 100\%$).
- **Test Clap Dirac Trigger**:
  - Instantaneous acoustic impulse button (`Audition Test Clap`) to evaluate room decay tail in isolation.

---

## 4. 16-Speaker Spatial Array & Delay Alignment
- **Interactive 2D Spatial Arena Radar**:
  - Drag listener (`EAR`) to reposition the binaural monitoring vantage point.
  - Drag individual speakers (`S1` through `S16`) to design stadium, arena, or warehouse sound reinforcement systems.
  - Live animated wavefront ripples visualize acoustic sound waves travelling at physical speed ($343\text{ m/s}$).
  - Distance rays display physical distance ($m$) and arrival time ($ms$).
- **Delay Alignment Network**:
  - **Auto Delay Alignment**: Automatically computes and injects compensation delays across all satellite speakers so their wavefronts arrive at the listener simultaneously.
  - **Haas Precedence Mode**: Introduces a $10 - 25\text{ms}$ delay offset to secondary clusters, anchoring perceived localization to the stage while adding reinforcing acoustic power.
  - **Manual Delay Override**: Set explicit delay times ($0 - 450\text{ms}$) per speaker channel.
- **Speaker Driver Emulations**:
  1. *Stadium PA Horn*: $350\text{Hz} - 4.5\text{kHz}$ bandpass with resonant horn flare.
  2. *Warehouse Ceiling Cone*: Midrange cone with wide dispersion.
  3. *Bullhorn / Megaphone*: Severe bandwidth restriction with aggressive diaphragm distortion.
  4. *Tannoy Intercom*: Vintage paging horn with gritty asymmetric clipping.
  5. *Arena Line Array*: High-SPL full-range driver with sub-bass coupling.
  6. *Studio Monitor*: Transparent, ultra-flat frequency response.
- **Per-Speaker Strip Controls**:
  - Pan ($-100\%$ Left to $+100\%$ Right), Volume ($-40\text{dB}$ to $+6\text{dB}$), Diaphragm Drive ($0 - 100\%$), Low-Pass Filter ($400\text{Hz} - 18\text{kHz}$), Reverb Send ($0 - 100\%$), Solo, and Mute switches.

---

## 5. Vintage Transmission & Cable Degradation
- **Cable Emulation Toggle**: Easily toggle degradation on or off for A/B testing.
- **Cable Models**:
  - *Budget Unshielded Copper (100m)*: Heavy capacitive high-frequency attenuation.
  - *Weathered Stadium Multicore*: High-frequency rolloff + noticeable inductive hum.
  - *Corroded Industrial PA Wiring*: Severe contact crackle and microphonic pops.
  - *Vintage 1970s Coaxial*: Warm transformer saturation and mild roll-off.
  - *Studio Mogami*: Pristine, wideband, reference-grade transfer.
- **Degradation Parameters**:
  - Run Distance ($5 - 300\text{m}$).
  - Capacitive Cutoff ($1,000\text{Hz} - 18,000\text{Hz}$).
  - AC Ground Loop Hum ($50\text{Hz}$ UK/EU or $60\text{Hz}$ US with harmonic overtones).
  - Poisson Contact Crackle & Microphonic Pops ($0 - 100\%$).
  - Transformer Slew Distortion ($0 - 100\%$).

---

## 6. Multi-Mode 60FPS Visualizer Suite
- **Mode 1: 64-Band FFT Spectrum Analyzer**: Real-time logarithmic frequency visualization with animated peak decay.
- **Mode 2: Stereo Lissajous Goniometer / Vectorscope**: $45^\circ$ rotated phase correlation display to verify mono compatibility and stereo spread.
- **Mode 3: Time-Domain Oscilloscope**: Crisp real-time waveform monitoring synchronized to zero-crossings.
- **Mode 4: Procedural IR Waveform Canvas**: Displays synthesized early reflections and exponential decay envelope.
- **Stereo VU Meter**: Left/Right peak and RMS meters with 3-second peak-hold indicator and clip warnings.

---

## 7. Pure-JS Lossless WAV & IR WAV Exporter
- **OfflineAudioContext Accelerated Bounce**:
  - Fast offline bounce rendering up to $35\times$ faster than real-time.
  - Reverb Tail Ring-Out Capture ($0 - 18\text{s}$) prevents decay cutoffs.
- **Export Formats**:
  1. **WAV 16-bit PCM**: Universal CD-standard master.
  2. **WAV 24-bit PCM**: High-resolution studio master.
  3. **WAV 32-bit IEEE Float**: Professional DAW floating-point interchange.
  4. **MP3**: 320 kbps CBR / 192 kbps CBR.
  5. **WebM / OGG Vorbis**: Web audio streaming format.
  6. **Impulse Response (IR) WAV Export**: Direct download of the procedural stereo impulse response WAV for loading into Altiverb, FabFilter Pro-R 2, REAPER ReaVerb, or hardware convolvers.

---

## 8. Keyboard Shortcuts Reference

| Shortcut | Action | Description |
|---|---|---|
| `Space` | **Play / Pause** | Toggle playback of the current audio source or synth demo |
| `R` | **Randomize All** | Trigger the Chaos Engine to randomize architecture, speakers, and cables |
| `C` | **Test Clap** | Audition Dirac clap transient to evaluate room acoustics |
| `A` | **A/B Compare** | Instant switch between processed Wet space and direct Dry audio |
| `M` | **Master Mute** | Mute or unmute the master audio output |
| `S` | **Solo Speaker** | Solo the currently selected speaker channel |
| `V` | **Cycle Visualizer** | Cycle between FFT Spectrum, Lissajous Vectorscope, and Oscilloscope |
| `1` – `9`, `0` | **Select Preset** | Rapidly switch through architectural space presets 1 through 10 |
| `Esc` | **Close Dialogs** | Dismiss active export modals or dialog windows |
