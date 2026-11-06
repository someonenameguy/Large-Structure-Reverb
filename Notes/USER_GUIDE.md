# Megastructure Audio Workstation - User Guide & Features

## Summary
`index.html` is an all-in-one single-file audio processor simulating the acoustic physics of massive architectural structures (cathedrals, hangars, caverns, sports stadiums, tunnels) and multi-speaker public-address (PA) sound reinforcement systems.

## Key Feature Matrix

### 1. Acoustic Structure Simulation
- **Architectural Presets**:
  - Grand Gothic Cathedral (RT60: 7.8s)
  - Boeing 747 Aircraft Hangar (RT60: 5.4s)
  - Subterranean Cavern (RT60: 9.2s)
  - Open-Air Sports Arena & PA (RT60: 4.2s)
  - Brutalist Parking Garage (RT60: 3.5s)
  - Industrial Steel Distribution Hub (RT60: 4.8s)
  - High-School Gymnasium (RT60: 2.6s)
  - Nuclear Cooling Tower (RT60: 12.0s)
  - Custom Parametric Space
- **Physical Room Controls**:
  - Length (15m to 200m), Width (10m to 150m), Height (4m to 75m)
  - Calculated volume badge (e.g. 64,800 m³)
  - Surface Materials: Polished Concrete, Weathered Brick, Corrugated Metal, Hardwood, Dense Marble, Reinforced Glass
  - RT60 Decay Time: 0.5s to 22.0s
  - Acoustic Pre-Delay: 0ms to 250ms
  - Air & Wall High Damping cutoff: 800Hz to 18,000Hz
  - Bass Resonance Decay Multiplier: 0.5x to 3.0x
  - Reflection Diffusion: 10% to 100%
  - Real-time procedural Impulse Response (IR) generation with early reflections ray-tracing and multi-band stochastic decay
  - Visual IR waveform preview canvas and Test Clap audition trigger

### 2. Multi-Speaker Spatial Sound System & PA Distribution
- **Interactive 2D Spatial Arena Radar**:
  - Top-down visual floorplan with acoustic boundary walls
  - Interactive drag-and-drop: move Listener (Ear) and any Speaker (S1-S12) anywhere in the space
  - Real-time animated soundwave ripples expanding at $343\text{ m/s}$ when audio plays
  - Calculated line-of-sight distance rays with distance in meters and arrival time in milliseconds
  - "Scatter" button for randomized acoustic speaker placements
- **Speaker Array System (1 to 12 configurable speakers)**:
  - Speaker tabs (S1 to S12) with Solo and Mute switches
  - Speaker Driver Emulation:
    - Stadium PA Horn (350Hz - 4.5kHz bandpass, resonant horn peak)
    - Warehouse Ceiling Cone (250Hz - 6kHz midrange)
    - Megaphone / Bullhorn (500Hz - 3kHz, high saturation)
    - Tannoy Intercom (gritty telephony band)
    - Full-Range Arena Line Array (punchy sub)
    - High-Fidelity Flat Studio Monitor
  - Physical Speed-of-Sound Delay: Automatic calculation ($t = d / 343$) or manual override (0 to 450 ms)
  - Stereo Pan (-100% Left to +100% Right)
  - Volume Level (-40dB to +6dB)
  - Diaphragm Saturation & Overdrive (0% to 100%)
  - Low-Pass Filter (400Hz to 18,000Hz)
  - Individual Speaker Reverb Room Send (0% to 100%)

### 3. Low-Quality Cable & Transmission Degradation
- **Cable Emulation Toggle (Engaged / Bypassed)**
- **Cable Profiles**:
  - Budget Unshielded 100m Copper (Heavy High-Cut)
  - Weathered Stadium Multicore (Hum + HF Drop)
  - Corroded Industrial PA Wiring (Crackle + Saturated)
  - Vintage 1970s Coaxial Cable
  - Pristine Oxygen-Free Studio Mogami
- **Degradation Controls**:
  - Cable Run Distance (5m to 300m)
  - Capacitance High-Frequency Rolloff (1,000Hz to 18,000Hz)
  - AC Ground Loop Hum (50Hz UK/EU or 60Hz US with harmonic overtones)
  - Contact Static Crackle & Microphonic Pops (sparse Poisson impulse bursts)
  - Transformer Slew Distortion

### 4. Randomization / "Chaos Engine"
- **"Randomize All" Master Button**: Simultaneously randomizes room architecture, materials, RT60, speaker count, positions, delays, pans, cutoffs, volume levels, cable degradation, and reverb balance!
- Dedicated Sub-Randomizers:
  - Random Room Architecture
  - Random Speakers (driver types, pans, delays, filters, drives)
  - Scatter 2D Radar Positions
  - Randomize Cable Wear & Static

### 5. Multi-Format Audio Import & Export
- **Audio Inputs**:
  - File Upload / Drag-and-Drop: Supports WAV, MP3, OGG, FLAC, AAC, M4A, WEBM, AIFF
  - 6 Built-in High-Fidelity Synthetic Demos:
    - European Airport/Station PA Chime & Vocal Announcement
    - Acoustic Snare & Handclap
    - 808 Hip-Hop Drum Break
    - Synth Brass Chord Progression
    - Plucked Guitar Harmonic
    - Dirac Acoustic Impulse Click
  - Live Microphone input with real-time room monitoring
- **Audio Export Formats**:
  - WAV 16-bit Lossless PCM (Standard Universal Master)
  - WAV 24-bit Lossless Studio Master PCM
  - WAV 32-bit Floating Point Lossless Master
  - MP3 High Quality (320 kbps / 192 kbps)
  - WebM / OGG Vorbis Streaming Audio
- **Export Features**:
  - Reverb Tail Ring-out Capture Padding (+0s to +18s) to ensure cathedral decay is never clipped
  - OfflineAudioContext accelerated rendering
  - In-browser playback preview of rendered file + direct file download button

### 6. Mixing, Visualizers & Master Controls
- Total Reverb Level (Wet) and Direct Speaker Level (Dry) faders
- Stereo Acoustic Width (0% to 200%)
- 3-Band Parametric Equalizer (Low Shelf, Mid Peaking, High Shelf)
- Master Volume (-24dB to +6dB)
- Transparent Brickwall Limiter (0 dBFS ceiling) to prevent clipping
- Dual Visualizers: Real-Time FFT Frequency Spectrum Analyzer & Stereo Lissajous Vectorscope
- Dual Left/Right Stereo Peak & RMS Meters
- A/B Compare Toggle (Dry Direct vs Wet Space)
- Spacebar shortcut for Play/Pause, R for Randomize All
