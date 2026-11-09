# MEGASTRUCTURE // DSP Pipeline & Acoustic Physics Mathematical Specification

## 1. Web Audio Routing Graph

```
[Audio Source: Drag-and-Drop File / Live Mic / 6 Synthetic Demos]
                       |
             [Master Input Pre-Amp Gain]
                       |
  +--------------------+--------------------+
  |                                         |
  v                                         v
[16-Speaker Spatial Distribution]      [Direct Master Dry Bypass]
  |
  +---> Speaker 01 [Cable Filter -> Driver Bandpass -> Waveshaper -> DelayNode -> Panner -> Gain]
  +---> Speaker 02 [Cable Filter -> Driver Bandpass -> Waveshaper -> DelayNode -> Panner -> Gain]
  +---> Speaker ...
  +---> Speaker 16 [Cable Filter -> Driver Bandpass -> Waveshaper -> DelayNode -> Panner -> Gain]
  |                     |
  |                     +---------------------------------------+
  |                                                             |
  v                                                             v
[Speaker Reverb Send Bus]                            [Direct Speaker Bus]
  |                                                             |
[Stereo Convolver Node]                                         |
(Procedural 3D Eyring-Norris / ISM Impulse Response)             |
  |                                                             |
[Reverb Return (Wet) Gain]                                      |
  |                                                             |
  +-----------------------------+-------------------------------+
                                |
                        [Master Summing Bus]
                                |
                        [Mid/Side Stereo Width Matrix]
                                |
                        [3-Band Parametric Equalizer]
                        (Low Shelf 120Hz, Mid Peak 1.8kHz, High Shelf 6.5kHz)
                                |
                        [Lookahead Brickwall Limiter]
                        (Threshold: -0.5 dBFS, Ratio: 20:1, Fast Attack)
                                |
                    [Global / Master Output Volume Gain]
                    (-24 dB to +6 dB, calibrated fader)
                                |
                        +-------+-------+
                        |               |
                        v               v
            [Analysers & Visualizers] [AudioDestinationNode]
            - 64-Band Log FFT         (Speakers / Headphones)
            - Lissajous Goniometer
            - Time Oscilloscope
            - Peak & RMS Meters
```

---

## 2. Mathematical Formulations & Acoustic Physics

### 2.1 Eyring-Norris Reverberation Formula
The classical Sabine formula assumes uniform diffuse energy and underestimates absorption in live or massive structures. We implement the **Eyring-Norris** formulation accounting for high-absorption boundaries and ISO 9613-1 atmospheric damping:

$$RT_{60} = \frac{0.1611 \cdot V}{-S \cdot \ln(1 - \bar{\alpha}) + 4 \cdot m_{\text{air}} \cdot V}$$

Where:
- $V = L \times W \times H$ is the total volume of the architectural space ($\text{m}^3$).
- $S = 2(LW + LH + WH)$ is the total surface boundary area ($\text{m}^2$).
- $\bar{\alpha} = \frac{\sum S_i \alpha_i}{S}$ is the area-weighted composite absorption coefficient.
- $m_{\text{air}}$ is the ISO 9613-1 air attenuation constant ($20^\circ\text{C}$, $40\%$ RH):
  - $m_{\text{low}} \approx 0.00010\text{ m}^{-1}$ ($250\text{ Hz}$)
  - $m_{\text{mid}} \approx 0.00115\text{ m}^{-1}$ ($1000\text{ Hz}$)
  - $m_{\text{high}} \approx 0.00945\text{ m}^{-1}$ ($4000\text{ Hz}$)

Mean Free Path ($\lambda_{\text{MFP}}$):
$$\lambda_{\text{MFP}} = \frac{4V}{S}$$

Mixing Time ($\tau_{\text{mix}}$) transition from specular early reflections to stochastic diffuse tail:
$$\tau_{\text{mix}} = \sqrt{\frac{V}{c^3}} \quad (c = 343.2\text{ m/s})$$

---

### 2.2 3D Image Source Model (ISM) Early Reflections
For any speaker position $\vec{p}_s = [x_s, y_s, z_s]^T$ and listener position $\vec{p}_l = [x_l, y_l, z_l]^T$, specular reflections off boundary planes are modeled by virtual mirror sources:

$$\vec{p}_{i, j, k} = \begin{bmatrix}
(-1)^i x_s + \left(i + \frac{1 - (-1)^i}{2}\right) L \\
(-1)^j y_s + \left(j + \frac{1 - (-1)^j}{2}\right) W \\
(-1)^k z_s + \left(k + \frac{1 - (-1)^k}{2}\right) H
\end{bmatrix}$$

For order $N = |i| + |j| + |k| \le 2$, the synthesizer evaluates 24 spatial reflection vectors:
1. **6 First-Order Planar Reflections**:
   - Back Wall ($X=0$): $[-x_s, y_s, z_s]$
   - Front Wall ($X=L$): $[2L - x_s, y_s, z_s]$
   - Left Wall ($Y=0$): $[x_s, -y_s, z_s]$
   - Right Wall ($Y=W$): $[x_s, 2W - y_s, z_s]$
   - Floor ($Z=0$): $[x_s, y_s, -z_s]$
   - Ceiling ($Z=H$): $[x_s, y_s, 2H - z_s]$
2. **18 Second-Order Corner & Axial Reflections**:
   - Double wall bounces: Back-Left, Back-Right, Front-Left, Front-Right, Wall-Floor, Wall-Ceiling, Axial standing waves.

#### Physical Distance, Delay, & Interaural Time Difference (ITD):
$$d_i = \|\vec{p}_{i} - \vec{p}_l\|_2$$
$$\Delta \tau_i = \frac{d_i - d_{\text{direct}}}{c}$$
$$\text{Azimuth } \theta_i = \text{atan2}(y_i - y_l, x_i - x_l) - \theta_{\text{listener}}$$
$$\text{ITD}_i = \frac{D_{\text{head}}}{2c} \cdot (\sin\theta_i + \theta_i) \approx 0.00028 \cdot \sin\theta_i \text{ seconds}$$
$$\text{Gain}_{\text{Left}} = \cos\left(\frac{\sin\theta_i + 1}{4}\pi\right), \quad \text{Gain}_{\text{Right}} = \sin\left(\frac{\sin\theta_i + 1}{4}\pi\right)$$

---

### 2.3 Delay Alignment Network & Haas Effect
In distributed sound reinforcement systems, distant satellite speakers require delay alignment to prevent destructive comb filtering:

$$\tau_{\text{delay}, i} = \max_k(\tau_k) - \tau_i$$

- **Time-Aligned Mode**: Synchronizes all acoustic wavefront arrivals to the listener's ear simultaneously ($\sum \Delta \tau \to 0$).
- **Haas Precedence Mode**: Injects a $15\text{ms}$ delay offset to satellite clusters, forcing human psychoacoustic precedence toward the primary stage while providing up to $+10\text{dB}$ of clean reinforcement.

---

### 2.4 Transmission Line Physics & Cable Non-Linearities

#### Capacitive Low-Pass Attenuation:
For a cable of length $L$ with core resistance $R = 0.08\,\Omega/\text{m}$ and capacitance $C = 120\,\text{pF}/\text{m}$:
$$f_{\text{cable}} = \frac{1}{2\pi (R \cdot L) (C \cdot L)} = \frac{1}{2\pi R C \cdot L^2}$$

#### AC Ground Loop Hum Generation:
$$s_{\text{hum}}(t) = A_1 \sin(2\pi f_0 t) + A_2 \sin(4\pi f_0 t + \phi_2) + A_3 \sin(6\pi f_0 t + \phi_3)$$
Where $f_0 \in \{50\text{ Hz}, 60\text{ Hz}\}$ and $A_1 = 0.75, A_2 = 0.18, A_3 = 0.07$.

#### Contact Crackle & Microphonics:
Modeled via a stochastic Poisson arrival process:
$$P(k \text{ clicks in } \Delta t) = \frac{(\lambda \Delta t)^k e^{-\lambda \Delta t}}{k!}$$
When an arrival event occurs, an exponentially damped high-pass Dirac impulse ($h_{\text{pop}}(t) = e^{-t/\tau_{\text{pop}}} \cdot \text{sign}(\text{rand})$) is injected into the audio stream.

#### Transformer Core Saturation:
Non-linear waveshaping function simulating magnetic hysteresis and core flux saturation:
$$f_{\text{sat}}(x) = \frac{\tanh(\gamma \cdot x)}{\tanh(\gamma)}$$
Where $\gamma \ge 1.0$ is the saturation drive coefficient.

---

### 2.5 3-Band Frequency-Dependent Diffuse Late Reverberation Synthesis

In diffuse reverberant fields, high frequencies decay significantly faster than low frequencies due to the combined action of boundary absorption and atmospheric dissipation. The late reverberation tail is modeled as a 3-band stochastic process:

$$h_{\text{diffuse}}(t) = w_{\text{onset}}(t) \cdot \left[ s_{\text{low}}(t) \cdot e^{-\lambda_{\text{low}} t} + s_{\text{mid}}(t) \cdot e^{-\lambda_{\text{mid}} t} + s_{\text{high}}(t) \cdot e^{-\lambda_{\text{high}} t} \cdot e^{-\frac{m_{\text{high}} c}{2} t} \right]$$

#### Orthogonal Band Split & Gaussian Stochastic Field:
- Uncorrelated Gaussian white noise streams $Z_L[n], Z_R[n]$ are generated via the **Box-Muller transform**:
  $$Z_0 = \sqrt{-2 \ln U_1} \cos(2\pi U_2), \quad Z_1 = \sqrt{-2 \ln U_1} \sin(2\pi U_2) \quad (U_1, U_2 \sim \mathcal{U}(0, 1))$$
- Band 1 (Low, $< 350\text{ Hz}$): 2nd-order lowpass filtered noise capturing structural cavity resonance and room rumble.
- Band 2 (Mid, $350\text{ Hz} - 3500\text{ Hz}$): Bandpass filtered noise capturing structural body and vocal formants.
- Band 3 (High, $> 3500\text{ Hz}$): Highpass filtered noise capturing sheen, reflections, and rapid air damping.

#### Decay Exponents:
$$\lambda_{\text{low}} = \frac{3 \ln(10)}{RT_{60, \text{low}}}, \quad \lambda_{\text{mid}} = \frac{3 \ln(10)}{RT_{60, \text{mid}}}, \quad \lambda_{\text{high}} = \frac{3 \ln(10)}{RT_{60, \text{high}}}$$
Where $3 \ln(10) = \ln(1000) \approx 6.9078$ represents the exact $-60\text{ dB}$ decay constant.

#### Smooth $C^1$-Continuous Onset Envelope:
To eliminate transient clicks, DC offsets, and artificial discontinuities at the pre-delay boundary, the late tail is shaped by a smooth raised-cosine onset ramp up to the physical mixing time $\tau_{\text{mix}} = \sqrt{V/c^3}$:
$$w_{\text{onset}}(t) = \begin{cases}
\sin^2\left(\frac{\pi}{2} \cdot \frac{t}{\tau_{\text{mix}}}\right), & 0 \le t < \tau_{\text{mix}} \\
1.0, & t \ge \tau_{\text{mix}}
\end{cases}$$

---

### 2.6 Atmospheric Air Absorption Modeling (ISO 9613-1 / ANSI S1.26)

At standard conditions ($T = 20^\circ\text{C} = 293.15\text{ K}$, $\text{RH} = 40\%$, atmospheric pressure $p_a = 101.325\text{ kPa}$), the energy attenuation coefficient $m$ (in $\text{m}^{-1}$) accounts for classical viscosity, thermal conduction, and molecular relaxation of Oxygen ($O_2$) and Nitrogen ($N_2$):

$$m(f) = \frac{2 \alpha_{\text{Np}}}{1} \approx 2 \cdot f^2 \left[ 1.84 \times 10^{-11} \left(\frac{T}{T_0}\right)^{1/2} + \left(\frac{T}{T_0}\right)^{-5/2} \left( \frac{0.01275 e^{-2239.1/T}}{f_{r, O} + f^2/f_{r, O}} + \frac{0.1068 e^{-3352.0/T}}{f_{r, N} + f^2/f_{r, N}} \right) \right]$$

For octave center frequencies:
- $250\text{ Hz}$: $m \approx 0.00010\text{ m}^{-1}$ ($0.00043\text{ dB/m}$)
- $1000\text{ Hz}$: $m \approx 0.00115\text{ m}^{-1}$ ($0.0050\text{ dB/m}$)
- $4000\text{ Hz}$: $m \approx 0.00945\text{ m}^{-1}$ ($0.0410\text{ dB/m}$)
- $8000\text{ Hz}$: $m \approx 0.03280\text{ m}^{-1}$ ($0.1425\text{ dB/m}$)

In massive structures (e.g. $100\text{m}$ path length), high-frequency air attenuation exceeds $8\text{ dB}$ per bounce, making air absorption the dominant acoustic damping factor above $2\text{ kHz}$.

---

### 2.7 Audition Test Impulse Excitation Physics

To rigorously evaluate acoustic spaces without coloration from complex program material, four physical excitation models are provided:

1. **Acoustic Starter Pistol (Blank Gun Shockwave)**:
   - Shock wave physics modeled via the modified **Friedlander blast equation**:
     $$p_{\text{pistol}}(t) = P_0 \left(1 - \frac{t}{t_+}\right) e^{-\beta \frac{t}{t_+}} + A_{\text{barrel}} \sin(2\pi f_{\text{barrel}} t) e^{-t/\tau_b} + n_{\text{gas}}(t) e^{-t/\tau_g}$$
   - Characteristics: $t_+ = 0.8\text{ ms}$, $f_{\text{barrel}} = 1850\text{ Hz}$, rapid $<0.05\text{ ms}$ rise time, broadband high-frequency crack to inspect specular flutter echoes.

2. **Balloon Burst (Volumetric Expansion Dipole)**:
   - Sudden rupture of a pressurized membrane creates an instantaneous low-frequency rarefaction wave accompanied by rubber rupture tear noise:
     $$p_{\text{balloon}}(t) = -P_{\text{step}} \sin(2\pi f_{\text{helm}} t) e^{-t/\tau_{\text{helm}}} + n_{\text{tear}}(t) e^{-t/\tau_{\text{tear}}}$$
   - Characteristics: $f_{\text{helm}} = 115\text{ Hz}$, $\tau_{\text{helm}} = 15\text{ ms}$, rich low-end pressure pulse designed specifically to excite room modes and bass reverberation.

3. **Standardized Dirac Clap (Palmar Acoustic Burst)**:
   - Three distinct micro-impacts (finger arrival sequence followed by hermetic palmar cavity compression):
     $$p_{\text{clap}}(t) = \sum_{k=1}^3 w_k \cdot \left[ \sin(2\pi f_{1} (t - t_k)) e^{-(t-t_k)/\tau_1} + \sin(2\pi f_{2} (t - t_k)) e^{-(t-t_k)/\tau_2} + n(t-t_k) e^{-(t-t_k)/\tau_n} \right]$$
   - Characteristics: Formants at $1050\text{ Hz}$ and $1750\text{ Hz}$, $t_k \in \{0, 3.2, 7.5\}\text{ ms}$, standardized acoustic handclap for assessing speech intimacy.

4. **Bandlimited Dirac Impulse (Sinc Pulse)**:
   - Windowed sinc impulse bandlimited to $0.45 f_s$ with Blackman-Harris windowing to ensure mathematically ideal delta excitation without Nyquist aliasing.

---

### 2.8 Non-Blocking Execution & Asynchronous Convolver Double-Buffering

1. **Debounced UI Triggering ($35\text{ ms}$ Trailing Edge)**:
   Ensures continuous slider drags do not flood the thread with redundant computations.
2. **Chunked Time-Slicing**:
   Generation is partitioned into $32,768$-sample blocks. The loop yields control back to the browser via `setTimeout(..., 0)` or `requestIdleCallback`, keeping UI canvas rendering locked at 60 FPS.
3. **Cancellation Token (`_irSynthesisId`)**:
   If a new parameter change occurs during computation, the ongoing worker task aborts immediately, reclaiming CPU resources.
4. **Glitch-Free Convolver Buffer Assignment**:
   The new stereo `AudioBuffer` is assigned to `masterConvolverNode.buffer` only upon complete synthesis and normalization, completely preventing audio dropouts.

---

### 2.9 Vintage Transmission Line & Cable Degradation Physics Model

### 2.9.1 High-Capacitance Distributed Transmission Line Filtering
Long analog cable runs exhibit distributed series resistance $R$, series inductance $L$, and shunt capacitance $C$. In audio frequency regimes ($20\text{ Hz} - 20\text{ kHz}$), the dominant electrical degradation over long lines ($1\text{m} - 300\text{m}$) is the lumped $RC$ low-pass filter formed by line driver source impedance $R_s$, conductor loop resistance $R_{\text{cable}}(\text{AWG}) \cdot L$, and shunt capacitance $C_{\text{unit}} \cdot L$:

$$R_{\text{total}} = R_s \cdot (1 + 0.02 \cdot L) + R_{\text{per\_meter}}(\text{AWG}) \cdot L \cdot 35$$
$$C_{\text{total}} = C_{\text{unit}}(\text{profile}) \cdot L$$
$$f_c = \frac{1}{2 \pi \cdot R_{\text{total}} \cdot C_{\text{total}}}$$

Where:
- AWG Loop Resistances: $14\text{ AWG} = 0.017\,\Omega/\text{m}$, $18\text{ AWG} = 0.042\,\Omega/\text{m}$, $20\text{ AWG} = 0.066\,\Omega/\text{m}$, $22\text{ AWG} = 0.106\,\Omega/\text{m}$, $24\text{ AWG} = 0.168\,\Omega/\text{m}$, $26\text{ AWG} = 0.268\,\Omega/\text{m}$.
- Cable Shunt Capacitances:
  - Studio Mogami Gold: $65\text{ pF/m}$ ($f_c \approx 20\text{ kHz}$ at $\le 100\text{m}$)
  - Vintage 1970s Coaxial: $105\text{ pF/m}$
  - Heavy Stage Snake: $130\text{ pF/m}$ ($f_c \approx 4,172\text{ Hz}$ at $150\text{m}$)
  - Weathered Stadium Multicore: $180\text{ pF/m}$
  - Corroded Duct PA Wiring: $230\text{ pF/m}$ ($f_c \approx 2,358\text{ Hz}$ at $150\text{m}$, $1,000\text{ Hz}$ at $300\text{m}$)

### 2.9.2 AC Ground Loop Hum & Transformer Core Buzz Synthesis
Ground loops between equipment chassis create shield currents that induce fundamental $50\text{ Hz}$ / $60\text{ Hz}$ inductive pickup, dominated by full-wave rectified DC ripple ($2f_0 = 100/120\text{ Hz}$) and magnetic core saturation ($3f_0 = 150/180\text{ Hz}$):

$$s_{\text{hum}}(t) = \sum_{n=1}^{16} A_n \sin(2\pi \cdot n \cdot f_0 \cdot t)$$

Fourier Harmonic Coefficients:
- $n=1$ ($50/60\text{ Hz}$): $A_1 = 0.60$ (Inductive loop pickup)
- $n=2$ ($100/120\text{ Hz}$): $A_2 = 1.00$ (Dominant full-wave DC rectifier leakage ripple)
- $n=3$ ($150/180\text{ Hz}$): $A_3 = 0.55$ (Core saturation odd harmonic)
- $n=4$ ($200/240\text{ Hz}$): $A_4 = 0.38$
- $n=5$ ($250/300\text{ Hz}$): $A_5 = 0.24$
- $n=6$ ($300/360\text{ Hz}$): $A_6 = 0.16$
- $n \ge 7$: Decaying magnetic buzz: $A_n = \frac{0.12}{n - 5} \cdot (n \text{ odd} ? 1.0 : 0.6)$

Transformer core buzz is produced by magnetostriction vibration of silicon-steel laminations, synthesized via a sharp-pulse wave routed through a resonant bandpass filter centered at $720\text{ Hz}$ ($Q = 2.6$). In Dual Grid mode, a $60\text{ Hz}$ hum beats against a $100\text{ Hz}$ ($50\text{ Hz} \times 2$) core buzz, producing authentic inter-continental ground potential beats.

### 2.9.3 Stochastic Poisson Contact Crackle, Microphonics & RF Interference Floor
1. **Poisson-Distributed Contact Crackle**:
   Mechanical contact micro-bouncing and surface copper oxidation are modeled via Poisson arrival statistics:
   $$\Delta t_k = -\frac{\ln(1 - U)}{\lambda} \quad (\lambda = 6.0\text{ bursts/s})$$
   Each burst generates $3 - 9$ micro-spikes spaced by $0.8 - 2.2\text{ ms}$. Each spike triggers a damped parasitic $LC$ oscillation:
   $$s_{\text{spike}}(t) = A_s \cdot e^{-t / \tau_{\text{decay}}} \cdot \sin(2\pi f_{\text{ring}} t)$$
   where $f_{\text{ring}} \in [3000, 5800]\text{ Hz}$, $\tau_{\text{decay}} \in [0.4, 1.0]\text{ ms}$.
2. **Loose Jack Microphonics**:
   Mechanical handling rumble and triboelectric charge transfer generate low-frequency damped thumps:
   $$s_{\text{thump}}(t) = A_{\text{thump}} \cdot e^{-t / \tau_{\text{thump}}} \cdot \sin(2\pi f_{\text{thump}} t)$$
   where $f_{\text{thump}} \in [55, 145]\text{ Hz}$, $\tau_{\text{thump}} \in [25, 65]\text{ ms}$.
3. **RF Radio Interference Floor**:
   Long unshielded lines pick up Paul Kellet 1/f thermal pink noise ($1/\sqrt{f}$) and faint amplitude-modulated AM heterodyne whistles ($1580\text{ Hz}$, $3240\text{ Hz}$).
   Buffers are precomputed once into a seamless $5.0$-second stereo buffer with $100\text{ ms}$ equal-power cosine crossfade boundaries, ensuring 0% CPU overhead and zero memory leaks.

### 2.9.4 Transformer Core Saturation & Slew Compression
Audio matching transformers exhibit magnetic $B\text{-}H$ core saturation and high-velocity slew-rate compression:
$$y(x) = x \cdot (1 - 0.7k) + \frac{\tanh((1 + 4.5k) \cdot x)}{\tanh(1 + 4.5k)} \cdot 0.7k$$
where $k \in [0, 1]$ is the user-controlled transformer slew distortion amount. The curve is evaluated via a 4096-sample `WaveShaperNode` with $2\times$ oversampling inserted directly into each speaker's transmission chain.


