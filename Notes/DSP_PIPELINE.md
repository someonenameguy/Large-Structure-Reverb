# DSP Pipeline Specification

## Audio Graph Flowchart

```
[Audio Source: File / Mic / Synth Demo]
                     |
       [Master Pre-Amp / Input Gain]
                     |
  +------------------+------------------+
  |                                     |
  v                                     v
[Speaker Distribution Network]     [Global Pre-Reverb Dry Path]
  |                                     |
  +---> Speaker 1 [Cable Sim -> EQ -> Dist -> Delay -> Pan -> Vol] --+
  +---> Speaker 2 [Cable Sim -> EQ -> Dist -> Delay -> Pan -> Vol] --+
  +---> Speaker N [Cable Sim -> EQ -> Dist -> Delay -> Pan -> Vol] --+
                                        |
                             [Summing Speaker Bus]
                                 |         |
                  +--------------+         |
                  |                        v
                  v                [Dry Speaker Send]
           [Reverb Send]                   |
                  |                        |
       [Stereo Impulse Response            |
          Convolution Engine]              |
                  |                        |
           [Reverb Return]                 |
                  |                        |
                  +--------------+---------+
                                 |
                        [Master Summing]
                                 |
                        [Master Equalizer]
                                 |
                      [Brickwall Lookahead Limiter]
                                 |
                        [Audio Destination & Visualizers]
```

## Mathematical Formulations
1. **Speed of Sound & Distance Delay**:
   - $c \approx 343 \text{ m/s}$ (at 20°C in air)
   - Propagation delay $\tau = \frac{\sqrt{(x_s - x_l)^2 + (y_s - y_l)^2 + (z_s - z_l)^2}}{c}$
   - Delay range in a 100m structure: $0$ to $\approx 350 \text{ ms}$.

2. **Distance Rolloff & Air Attenuation**:
   - Sound pressure level decreases with distance: $g(d) = \frac{d_0}{\max(d_0, d)}$
   - Air molecular absorption: high frequencies attenuate significantly faster than low frequencies over large distances. A 1st-order low-pass filter cutoff is modulated as $f_c = \max(800, 20000 \cdot e^{-0.015 \cdot d})$.

3. **Impulse Response Synthesis (Physical Model)**:
   - Early reflections: Ray-casting / image-source calculations for primary planar reflections (floor, ceiling, front, back, left, right walls) with material absorption factors ($\alpha_{\text{floor}}, \alpha_{\text{ceiling}}, \dots$).
   - Late reverberation: Gaussian noise envelope shaped by exponential decay:
     $h(t) = n(t) \cdot e^{-3 \ln(10) \cdot t / RT_{60}} \cdot (1 - e^{-t / \tau_{\text{rise}}})$
   - Dual-band or Tri-band frequency decay: Low frequencies decay longer ($RT_{60,\text{low}} \approx 1.3 \times RT_{60}$), High frequencies decay rapidly ($RT_{60,\text{high}} \approx 0.4 \times RT_{60}$).

4. **Cable Degradation & Noise Modeling**:
   - Cable capacitance creates a low-pass filter: $f_{\text{cable}} = \frac{1}{2 \pi R C \cdot L}$
   - Mains hum: 50Hz/60Hz oscillator with phase-locked harmonics at 100/120Hz, 150/180Hz, 200/240Hz, mixed with low gain.
   - Microphonics / contact crackle: sparse Poisson-distributed impulse noise bursts.

5. **LAME MP3 / WAV Exporter**:
   - WAV: 16-bit / 24-bit / 32-bit Float PCM chunk encoding directly in ArrayBuffer.
   - LAME MP3: Embedded lightweight pure JS MP3 encoder for seamless `.mp3` export without server dependencies.
