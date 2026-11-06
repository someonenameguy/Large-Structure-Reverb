# MEGASTRUCTURE // Large Architectural Reverb & PA Acoustic Simulator

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-00e5ff?style=for-the-badge&logo=github)](https://someonenameguy.github.io/Large-Structure-Reverb/)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber?style=for-the-badge)](LICENSE)

An in-browser digital audio workstation (DAW) and physical acoustics simulator modeled after massive architectural spaces (gothic cathedrals, aircraft hangars, underground caverns, sports stadiums, parking structures, and cooling towers) and public-address (PA) sound reinforcement systems.

Built entirely with pure vanilla HTML5, CSS3, and the **Web Audio API** — single-file, zero dependencies.

---

## 🌐 Live Web Application

Experience the simulation directly in your browser:  
👉 **[https://someonenameguy.github.io/Large-Structure-Reverb/](https://someonenameguy.github.io/Large-Structure-Reverb/)**

---

## 🏛️ Acoustic Features & Architecture

### 1. Physical Room Acoustics & Procedural IR Synthesizer
- **Architectural Presets:**
  - **Grand Gothic Cathedral** ($RT_{60}$: 7.8s, marble surfaces, dense diffuse tail)
  - **Boeing 747 Aircraft Hangar** ($RT_{60}$: 5.4s, metallic flutter echoes, 120,000 $m^3$)
  - **Subterranean Cavern** ($RT_{60}$: 9.2s, deep resonant bass reverberation)
  - **Open-Air Sports Arena & PA** ($RT_{60}$: 4.2s, stadium horn reflections)
  - **Brutalist Multi-Story Concrete Garage** ($RT_{60}$: 3.5s, specular cold reflections)
  - **Industrial Steel Distribution Hub** ($RT_{60}$: 4.8s)
  - **High-School Gymnasium** ($RT_{60}$: 2.6s, hardwood floor reflections)
  - **Nuclear Concrete Cooling Tower** ($RT_{60}$: 12.0s, colossal vertical modal decay)
- **Room Dimension Modeler:** Length (15–200m), Width (10–150m), Height (4–75m) with calculated cubic volume.
- **Surface Materials:** Concrete, Brick, Metal, Wood, Marble, Glass with realistic Sabine/Eyring absorption coefficients.
- **Parametric Acoustic Controls:** $RT_{60}$ (0.5s–22.0s), Pre-Delay (0–250ms), High-Frequency Air Damping, Bass Multiplier (0.5x–3.0x), and Reflection Diffusion.
- **Procedural Stereo Impulse Response (IR):** Algorithmic image-source early reflections coupled to stochastic multi-band exponential decay envelopes.
- **Audition Test Clap:** Instant acoustic Dirac/clap transient trigger to evaluate decay tails.

### 2. Multi-Speaker Spatial Sound System & PA Distribution
- **Interactive 2D Spatial Arena Radar:**
  - Top-down visual floorplan with acoustic boundary walls.
  - Interactive drag-and-drop: move the listener (`EAR`) and any speaker (`S1`–`SN`) in real-time.
  - Animated soundwave ripples propagating at the physical speed of sound ($c = 343\text{ m/s}$).
  - Live distance vector rays with arrival delay ($t = d / 343$) in milliseconds.
- **Configurable Speaker Array (1 to 12 Speakers):**
  - **Driver Emulation Profiles:**
    - Stadium PA Horn (350Hz–4.5kHz bandpass, resonant horn peak)
    - Warehouse Ceiling Cone (250Hz–6kHz midrange focus)
    - Megaphone / Bullhorn (500Hz–3kHz, nasal overdrive)
    - Tannoy Intercom (gritty telephony band)
    - Full-Range Arena Line Array (punchy sub extension)
    - High-Fidelity Flat Studio Monitor
  - Independent speaker controls: Pan, Volume (-40dB to +6dB), Overdrive/Saturation, Low-Pass filter, Reverb Send, Solo, and Mute.

### 3. Cable & Transmission Degradation Emulation
- **Cable Profiles:** Budget Unshielded 100m Copper, Weathered Stadium Multicore, Corroded Industrial PA Wiring, Vintage 1970s Coax, and Studio Mogami.
- **Degradation Controls:**
  - Length-dependent high-frequency capacitive attenuation.
  - AC Ground Loop Hum (switchable 50Hz UK/EU or 60Hz US with harmonic overtones).
  - Intermittent contact static crackle and microphonic pops (Poisson impulse noise).
  - Transformer saturation and slew-rate distortion.

### 4. Randomization / "Chaos Engine"
- **`RANDOMIZE ALL` Master Button:** Instantly randomizes architecture, materials, RT60, speaker count, positions, delays, pans, driver types, filters, cable wear, and wet/dry balance.
- **Targeted Sub-Randomizers:** Room Architecture, Speaker Array, 2D Floorplan Scatter, and Cable Wear.

### 5. Multi-Format Audio Import & Offline Bounce Export
- **Audio Inputs:**
  - File Upload & Drag-and-Drop: `.wav`, `.mp3`, `.ogg`, `.flac`, `.aac`, `.m4a`, `.webm`, `.aiff`.
  - 6 Built-in synthetic demos: PA Announcement & Chime, Snare & Handclap, 808 Hip-Hop Break, Synth Brass, Plucked Guitar, and Dirac Click.
  - Live microphone input for real-time acoustic testing.
- **Offline Render & Export:**
  - High-speed `OfflineAudioContext` rendering.
  - Formats: WAV (16-bit, 24-bit high-res, 32-bit float), MP3, and WebM / OGG Vorbis.
  - Reverb tail ring-out capture padding (up to +18s) to prevent decay cutoff.
  - In-browser preview player + direct file download.

### 6. Master Section & Real-Time Visualizers
- Total Reverb Level (Wet) and Direct Speaker Level (Dry) mix faders.
- Stereo Acoustic Width (0% to 200%).
- 3-Band Parametric Master Equalizer (Low Shelf, Mid Peaking, High Shelf).
- Transparent Brickwall Limiter (0 dBFS ceiling).
- Dual Visualizer modes: Real-time FFT Frequency Spectrum Analyzer & Stereo Lissajous Vectorscope / Goniometer.
- A/B Comparison Toggle (Direct Dry vs Processed Reverb Space).

---

## 🚀 Running Locally

No build tools or web servers required. Simply open `index.html` in any modern web browser:

```bash
git clone https://github.com/someonenameguy/Large-Structure-Reverb.git
cd Large-Structure-Reverb
open index.html # On macOS
# or xdg-open index.html on Linux
# or start index.html on Windows
```

---

## 📁 Repository Structure
```
Large-Structure-Reverb/
├── index.html                       # Self-contained application (HTML5/CSS3/Web Audio API)
├── README.md                        # Documentation & live GitHub Pages link
├── Notes/
│   ├── ARCHITECTURE.md              # System architecture and specifications
│   ├── DSP_PIPELINE.md              # Web Audio routing graphs & mathematical formulations
│   └── USER_GUIDE.md                # Comprehensive user guide
├── Handoffs/
│   └── HANDOFF_COMPLETION_REPORT.md # Technical completion & handoff report
└── Progress/                        # Agent lock & progress directory
```

---

## 📄 License
This project is licensed under the MIT License.
