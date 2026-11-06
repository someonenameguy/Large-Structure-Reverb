# Large Structure Reverb - Project Architecture & Notes

## Project Overview
This application is an all-in-one, single-file HTML5 web workstation designed to simulate the realistic acoustic reverberation and public-address (PA) sound reinforcement behavior of massive architectural spaces (cathedrals, aircraft hangars, underground caverns, sports stadiums, parking garages, industrial warehouses).

## Core Systems
1. **Physical Acoustics & Impulse Response Synthesizer**:
   - Algorithmic generation of stereo Impulse Responses (IR) utilizing Sabine / Eyring reverberation time formulas, frequency-dependent absorption coefficients (materials: concrete, steel, glass, wood, marble, air humidity), and stochastic ray/image source early reflections.
   - Convolver Node integration with high-precision normalization and wet/dry blending.
   - Procedural Feedback Delay Network (FDN) / Schroeder-Moorer backup engine.

2. **Multi-Speaker Array & PA Distribution Emulation**:
   - 1 to 16 independently positioned speakers on an interactive 2D spatial acoustic floorplan.
   - Individual speaker propagation delay ($t = d / 343\text{ m/s}$) simulating the acoustic arrival times of sound waves from distant speakers.
   - Distance-dependent air absorption filtering (high-frequency rolloff over physical distance).
   - Speaker driver / horn profiles: Stadium PA horn, Warehouse ceiling cone, Megaphone, Tannoy intercom, Full-range arena line array.
   - Individual speaker pan, volume, saturation/clipping, and reverb feed.

3. **Low-Quality Cable & Transmission Degradation**:
   - Capacitive high-cut attenuation modeling long runs of unshielded, high-capacitance copper cable.
   - Ground loop AC hum emulation (50Hz / 60Hz mains buzz with 2nd, 3rd, and 4th harmonics).
   - Cable microphonics, intermittent contact crackle, and RF interference / pink noise floor.
   - Transformer core saturation / slew rate limit.

4. **Multi-Variable Randomization Matrix ("Chaos Engine")**:
   - Randomizes speaker count, positions, delays, pans, low-pass filters, drive, cable degradation, room dimensions, RT60 decay time, and master reverb dynamics.
   - Smart randomizer presets: subtle variance, industrial realism, chaotic cavern echo.

5. **Audio Input & Export Architecture**:
   - Input: Drag-and-drop / file selector supporting WAV, MP3, OGG, FLAC, AAC, M4A, AIFF.
   - Built-in test sound generator (vocal announcements, drum breaks, acoustic impulses, synth chords).
   - Live microphone monitoring for instant acoustic test.
   - Export: High-speed OfflineAudioContext rendering.
   - Multi-format exporter: Pristine WAV (16/24/32-bit), WebM/OGG, and LAME MP3 encoding.

6. **UI / Visualization**:
   - Single self-contained HTML file (no external file dependencies).
   - High-end professional studio dark UI with tactile rotary knobs, faders, and toggle switches.
   - Interactive 2D Acoustic Arena Radar with draggable speakers and listener.
   - Real-time Stereo Spectrogram, Lissajous Vectorscope, and Waveform scrubbing bar.
   - Peak Limiter & Output metering.
