# Architectural Sound Design & Calibrated Preset Library
## Megastructure Reverb Audio Workstation (Agent 8 Specification)

---

### Executive Summary
This document provides complete architectural, acoustic, and electro-acoustic calibrations for the **10 Realistic Architectural Mega-Spaces** integrated into the Megastructure Reverb WebUI. Each preset models true physical dimensions, volumetric acoustics ($V = L \times W \times H$), material boundary absorption ($\alpha$), early reflection ray-tracing delay clusters, multi-band frequency-dependent exponential decay ($RT_{60}$ and Bass Multipliers), tailored multi-speaker sound reinforcement arrays, and vintage/industrial cable transmission degradation lines.

---

### Master Acoustic Parameter Matrix

| # | Architectural Space | $RT_{60}$ | Dimensions ($L \times W \times H$) | Volume | Surface Area | Mean Free Path | Boundary Material ($\alpha$) | Pre-Delay | HF Damp | Bass Mult ($RT_{60,\text{low}}$) | Diff. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **1** | **Grand Gothic Cathedral** | 8.5 s | $115\text{m} \times 42\text{m} \times 38\text{m}$ | $183,540\,\text{m}^3$ | $21,588\,\text{m}^2$ | $34.0\,\text{m}$ | Dense Italian Marble ($0.010$) | 48 ms | 3,400 Hz | $1.85\times$ ($15.7\,\text{s}$) | 94% |
| **2** | **Boeing 747 Aircraft Hangar** | 5.6 s | $140\text{m} \times 80\text{m} \times 12.5\text{m}$ | $140,000\,\text{m}^3$ | $27,900\,\text{m}^2$ | $20.1\,\text{m}$ | Corrugated Sheet Steel ($0.030$) | 62 ms | 4,800 Hz | $1.35\times$ ($7.6\,\text{s}$) | 74% |
| **3** | **Subterranean Salt Mine / Cavern** | 11.5 s | $135\text{m} \times 65\text{m} \times 24\text{m}$ | $210,600\,\text{m}^3$ | $27,150\,\text{m}^2$ | $31.0\,\text{m}$ | Crystalline Halite Rock ($0.012$) | 58 ms | 2,100 Hz | $2.70\times$ ($31.0\,\text{s}$) | 97% |
| **4** | **Olympic Sports Stadium** | 4.5 s | $195\text{m} \times 135\text{m} \times 48\text{m}$ | $1,263,600\,\text{m}^3$ | $84,330\,\text{m}^2$ | $59.9\,\text{m}$ | Concrete Grandstands ($0.025$) | 92 ms | 2,800 Hz | $1.40\times$ ($6.3\,\text{s}$) | 66% |
| **5** | **Brutalist Concrete Parking Garage** | 3.4 s | $80\text{m} \times 45\text{m} \times 3.4\text{m}$ | $12,240\,\text{m}^3$ | $8,050\,\text{m}^2$ | $6.1\,\text{m}$ | Cast Smooth Concrete ($0.020$) | 16 ms | 4,600 Hz | $1.75\times$ ($5.9\,\text{s}$) | 52% |
| **6** | **Nuclear Concrete Cooling Tower** | 14.0 s | $88\text{m} \times 88\text{m} \times 140\text{m}$ | $1,084,160\,\text{m}^3$ | $64,768\,\text{m}^2$ | $66.9\,\text{m}$ | Hyperboloid Concrete Shell ($0.015$) | 78 ms | 2,500 Hz | $2.60\times$ ($36.4\,\text{s}$) | 96% |
| **7** | **CERN Supercollider Concrete Tunnel** | 6.8 s | $200\text{m} \times 10\text{m} \times 6\text{m}$ | $12,000\,\text{m}^3$ | $6,520\,\text{m}^2$ | $7.4\,\text{m}$ | Precast Concrete Liner ($0.020$) | 22 ms | 3,600 Hz | $1.55\times$ ($10.5\,\text{s}$) | 92% |
| **8** | **Taj Mahal Marble Mausoleum** | 9.6 s | $58\text{m} \times 58\text{m} \times 44\text{m}$ | $148,016\,\text{m}^3$ | $16,936\,\text{m}^2$ | $35.0\,\text{m}$ | Makrana White Marble ($0.008$) | 54 ms | 5,400 Hz | $2.15\times$ ($20.6\,\text{s}$) | 97% |
| **9** | **Industrial Grain Silo** | 7.5 s | $26\text{m} \times 26\text{m} \times 52\text{m}$ | $35,152\,\text{m}^3$ | $6,760\,\text{m}^2$ | $20.8\,\text{m}$ | Corrugated Galvanized Steel ($0.035$) | 26 ms | 6,400 Hz | $1.95\times$ ($14.6\,\text{s}$) | 84% |
| **10** | **Abbey Vintage Echo Chamber** | 2.8 s | $18\text{m} \times 14\text{m} \times 6.5\text{m}$ | $1,638\,\text{m}^3$ | $920\,\text{m}^2$ | $7.1\,\text{m}$ | Glazed Plaster & Ceramic Tile ($0.035$) | 14 ms | 7,800 Hz | $1.20\times$ ($3.4\,\text{s}$) | 92% |

---

### Detailed Space Profiles & Sound Design Calibrations

#### 1. Grand Gothic Cathedral
- **Acoustic Archetype**: High-vaulted medieval cathedral (e.g. Notre-Dame de Paris, Cologne Cathedral).
- **Physical Dynamics**: Immense vertical volume ($183,540\,\text{m}^3$) with stone groin-ribbed vaults, clerestory windows, and marble paving.
- **Acoustic Behavior**: Dense early reflections with prolonged high-order scattering. Marble absorption ($\alpha = 0.01$) reflects $99\%$ of incident energy. Organ and choral sub-bass persists for over $15$ seconds ($1.85\times$ multiplier).
- **Speaker System**: 6 distributed column line-source speakers mounted along the stone nave pillars, delay-staggered to maintain speech intelligibility down the center aisle.
  - S1: Left Nave Front ($x=0.32, y=0.25, z=3.2\text{m}$, `tannoy`, $-1.0\text{ dB}$, Drive $4\%$, RevSend $82\%$)
  - S2: Right Nave Front ($x=0.68, y=0.25, z=3.2\text{m}$, `tannoy`, $-1.0\text{ dB}$, Drive $4\%$, RevSend $82\%$)
  - S3: Left Nave Mid ($x=0.32, y=0.50, z=3.2\text{m}$, `tannoy`, $-2.0\text{ dB}$, Drive $5\%$, RevSend $85\%$)
  - S4: Right Nave Mid ($x=0.68, y=0.50, z=3.2\text{m}$, `tannoy`, $-2.0\text{ dB}$, Drive $5\%$, RevSend $85\%$)
  - S5: Left Nave Rear ($x=0.32, y=0.75, z=3.2\text{m}$, `tannoy`, $-3.0\text{ dB}$, Drive $6\%$, RevSend $88\%$)
  - S6: Right Nave Rear ($x=0.68, y=0.75, z=3.2\text{m}$, `tannoy`, $-3.0\text{ dB}$, Drive $6\%$, RevSend $88\%$)
- **Cable Profile**: `vintage_coax` ($120\text{m}$, $20\text{ AWG}$, $4,200\text{ Hz}$ cutoff, $8\%$ $50\text{Hz}$ hum, $5\%$ contact crackle).

#### 2. Boeing 747 Aircraft Hangar
- **Acoustic Archetype**: Wide-span twin-bay aviation maintenance hangar.
- **Physical Dynamics**: Calibrated to exactly **$140,000\,\text{m}^3$ volume** ($140\text{m} \times 80\text{m} \times 12.5\text{m}$).
- **Acoustic Behavior**: Polished concrete apron floor with corrugated sheet metal cladding on walls and ceiling trusses. High-frequency metallic reflections ring out before air molecular absorption rolls off highs at $4,800\text{ Hz}$. Low sub-bass slightly damps through skin flex ($1.35\times$).
- **Speaker System**: 4 high-bay overhead PA horn clusters suspended from ceiling trusses at $z=10\text{m}$.
  - S1: Bay 1 North ($x=0.28, y=0.25, z=10.0\text{m}$, `pa_horn`, $0\text{ dB}$, Drive $18\%$, RevSend $76\%$)
  - S2: Bay 2 North ($x=0.72, y=0.25, z=10.0\text{m}$, `pa_horn`, $0\text{ dB}$, Drive $18\%$, RevSend $76\%$)
  - S3: Bay 1 South ($x=0.28, y=0.75, z=10.0\text{m}$, `pa_horn`, $-1.0\text{ dB}$, Drive $20\%$, RevSend $78\%$)
  - S4: Bay 2 South ($x=0.72, y=0.75, z=10.0\text{m}$, `pa_horn`, $-1.0\text{ dB}$, Drive $20\%$, RevSend $78\%$)
- **Cable Profile**: `stage_snake_150m` ($140\text{m}$, $24\text{ AWG}$, $3,800\text{ Hz}$ cutoff, $16\%$ $60\text{Hz}$ machinery hum, $18\%$ crackle, $24\%$ slew).

#### 3. Subterranean Salt Mine / Cavern
- **Acoustic Archetype**: Deep underground halite excavation chamber (e.g. Wieliczka or Kansas salt caverns).
- **Physical Dynamics**: $135\text{m} \times 65\text{m} \times 24\text{m}$ ($210,600\,\text{m}^3$) carved into non-porous crystalline salt.
- **Acoustic Behavior**: Extreme $11.5\text{s}$ decay time. The faceted, unpolished crystalline rock yields $97\%$ spatial diffusion. A massive bass multiplier ($2.70\times$) simulates intense subterranean infrasonic persistence ($RT_{60,\text{low}} = 31.0\text{s}$) while damp air attenuates high frequencies above $2,100\text{ Hz}$.
- **Speaker System**: 4 intercom/tannoy horns mounted on rock salt alcoves.
  - S1: Portal West ($x=0.20, y=0.25, z=2.5\text{m}$, `tannoy`, $0\text{ dB}$, Drive $12\%$, RevSend $92\%$)
  - S2: Vault East ($x=0.80, y=0.30, z=3.0\text{m}$, `pa_horn`, $-1.0\text{ dB}$, Drive $15\%$, RevSend $94\%$)
  - S3: Pool Walkway West ($x=0.25, y=0.70, z=2.5\text{m}$, `tannoy`, $-2.0\text{ dB}$, Drive $14\%$, RevSend $95\%$)
  - S4: Deep Drift Alcove ($x=0.75, y=0.75, z=3.0\text{m}$, `tannoy`, $-2.0\text{ dB}$, Drive $15\%$, RevSend $95\%$)
- **Cable Profile**: `weathered_multicore` ($165\text{m}$, $26\text{ AWG}$, $3,200\text{ Hz}$ cutoff, $22\%$ hum, $26\%$ saline corrosion crackle, $35\%$ slew).

#### 4. Olympic Sports Stadium
- **Acoustic Archetype**: Modern open-air bowl sports arena with perimeter concrete cantilever grandstands.
- **Physical Dynamics**: $195\text{m} \times 135\text{m} \times 48\text{m}$ ($1,263,600\,\text{m}^3$).
- **Acoustic Behavior**: Immense open-air pre-delay ($92\text{ ms}$) representing multi-hundred-meter flight times before sound collides with grandstands. Discrete, multi-second slapback flutter ($66\%$ diffusion) and steep high-frequency rolloff ($2,800\text{ Hz}$) due to outdoor thermal gradients.
- **Speaker System**: 6 field perimeter line arrays and high-power stadium PA horns.
  - S1: North Goal Array ($x=0.50, y=0.15, z=16.0\text{m}$, `arena_stack`, $+2.0\text{ dB}$, Drive $26\%$, RevSend $80\%$)
  - S2: East Grandstand Upper ($x=0.85, y=0.35, z=18.0\text{m}$, `pa_horn`, $+1.0\text{ dB}$, Drive $30\%$, RevSend $82\%$)
  - S3: East Grandstand Lower ($x=0.85, y=0.65, z=12.0\text{m}$, `pa_horn`, $+1.0\text{ dB}$, Drive $30\%$, RevSend $82\%$)
  - S4: South Goal Array ($x=0.50, y=0.85, z=16.0\text{m}$, `arena_stack`, $+2.0\text{ dB}$, Drive $26\%$, RevSend $80\%$)
  - S5: West Grandstand Lower ($x=0.15, y=0.65, z=12.0\text{m}$, `pa_horn`, $+1.0\text{ dB}$, Drive $30\%$, RevSend $82\%$)
  - S6: West Grandstand Upper ($x=0.15, y=0.35, z=18.0\text{m}$, `pa_horn`, $+1.0\text{ dB}$, Drive $30\%$, RevSend $82\%$)
- **Cable Profile**: `weathered_multicore` ($200\text{m}$, $24\text{ AWG}$, $3,000\text{ Hz}$ cutoff, $18\%$ floodlight hum, $20\%$ crackle, $28\%$ slew).

#### 5. Brutalist Multi-Story Concrete Parking Garage
- **Acoustic Archetype**: Heavy cast-concrete low-clearance parking structure.
- **Physical Dynamics**: $80\text{m} \times 45\text{m} \times 3.4\text{m}$ ($12,240\,\text{m}^3$).
- **Acoustic Behavior**: Severe axial flutter echo ($52\%$ diffusion) trapped between parallel concrete slabs separated by only $3.4\text{m}$. Immediate early bounce ($16\text{ ms}$) followed by cold, metallic, unyielding high-frequency slapback ($4,600\text{ Hz}$) and low-end boom ($1.75\times$ bass multiplier).
- **Speaker System**: 4 ceiling-cone flush monitors and security tannoys.
  - S1: Ramp Entry North ($x=0.25, y=0.25, z=3.0\text{m}$, `ceiling_cone`, $-1.0\text{ dB}$, Drive $22\%$, RevSend $72\%$)
  - S2: Bay 3B East ($x=0.75, y=0.25, z=3.0\text{m}$, `tannoy`, $-1.0\text{ dB}$, Drive $25\%$, RevSend $74\%$)
  - S3: Bay 3C West ($x=0.25, y=0.75, z=3.0\text{m}$, `tannoy`, $-1.0\text{ dB}$, Drive $25\%$, RevSend $74\%$)
  - S4: Stairwell South ($x=0.75, y=0.75, z=3.0\text{m}$, `ceiling_cone`, $-1.0\text{ dB}$, Drive $22\%$, RevSend $72\%$)
- **Cable Profile**: `corroded_duct` ($90\text{m}$, $18\text{ AWG}$, $2,800\text{ Hz}$ cutoff, $28\%$ ballast hum, $32\%$ crackle, $45\%$ slew).

#### 6. Nuclear Concrete Cooling Tower
- **Acoustic Archetype**: Hyperboloid natural-draft concrete cooling tower shell.
- **Physical Dynamics**: $88\text{m} \times 88\text{m} \times 140\text{m}$ ($1,084,160\,\text{m}^3$).
- **Acoustic Behavior**: Soaring $14.0\text{s}$ decay time. Sound waves spiral up the $140\text{m}$ open vertical chimney throat, creating massive quarter-wave pipe resonances ($2.60\times$ bass multiplier, extending to $36.4\text{s}$ below $100\text{Hz}$). The continuous curved wall smoothly diffuses echoes ($96\%$) into an ethereal wash.
- **Speaker System**: 6 inward-facing circular perimeter ring speakers along the water collection rim.
  - S1: Rim 0° North ($x=0.50, y=0.15, z=4.0\text{m}$, `arena_stack`, $+1.0\text{ dB}$, Drive $12\%$, RevSend $92\%$)
  - S2: Rim 60° NE ($x=0.80, y=0.32, z=4.0\text{m}$, `pa_horn`, $0\text{ dB}$, Drive $15\%$, RevSend $95\%$)
  - S3: Rim 120° SE ($x=0.80, y=0.68, z=4.0\text{m}$, `pa_horn`, $0\text{ dB}$, Drive $15\%$, RevSend $95\%$)
  - S4: Rim 180° South ($x=0.50, y=0.85, z=4.0\text{m}$, `arena_stack`, $+1.0\text{ dB}$, Drive $12\%$, RevSend $92\%$)
  - S5: Rim 240° SW ($x=0.20, y=0.68, z=4.0\text{m}$, `pa_horn`, $0\text{ dB}$, Drive $15\%$, RevSend $95\%$)
  - S6: Rim 300° NW ($x=0.20, y=0.32, z=4.0\text{m}$, `pa_horn`, $0\text{ dB}$, Drive $15\%$, RevSend $95\%$)
- **Cable Profile**: `stage_snake_150m` ($150\text{m}$, $24\text{ AWG}$, $3,500\text{ Hz}$ cutoff, $14\%$ cooling pump hum, $15\%$ crackle, $20\%$ slew).

#### 7. CERN Supercollider Concrete Tunnel
- **Acoustic Archetype**: Subterranean particle accelerator tunnel (LHC / SPS ring).
- **Physical Dynamics**: $200\text{m} \times 10\text{m} \times 6\text{m}$ ($12,000\,\text{m}^3$).
- **Acoustic Behavior**: 1D circular waveguide tube acoustics ($RT_{60} = 6.8\text{s}$). Energy cannot disperse laterally and instead undergoes thousands of longitudinal boundary reflections per second ($92\%$ diffusion).
- **Speaker System**: 4 maintenance gallery wall intercoms and bullhorns.
  - S1: Cryostat Sector 1 ($x=0.30, y=0.20, z=2.2\text{m}$, `tannoy`, $-1.0\text{ dB}$, Drive $20\%$, RevSend $84\%$)
  - S2: RF Cavity Access ($x=0.70, y=0.40, z=2.2\text{m}$, `tannoy`, $-1.5\text{ dB}$, Drive $20\%$, RevSend $86\%$)
  - S3: Quadrupole Sector 4 ($x=0.30, y=0.65, z=2.2\text{m}$, `megaphone`, $-2.0\text{ dB}$, Drive $25\%$, RevSend $88\%$)
  - S4: Dump Line Sector 7 ($x=0.70, y=0.85, z=2.2\text{m}$, `tannoy`, $-2.5\text{ dB}$, Drive $20\%$, RevSend $90\%$)
- **Cable Profile**: `vintage_coax` ($175\text{m}$, $20\text{ AWG}$, $4,000\text{ Hz}$ cutoff, $12\%$ RF/klystron ripple, $8\%$ crackle, $18\%$ slew).

#### 8. Taj Mahal Marble Mausoleum
- **Acoustic Archetype**: Octagonal domed marble mortuary chamber in Agra, India.
- **Physical Dynamics**: $58\text{m} \times 58\text{m} \times 44\text{m}$ ($148,016\,\text{m}^3$) under a $44\text{m}$-high inner marble dome.
- **Acoustic Behavior**: Famous "whispering gallery" effect ($RT_{60} = 9.6\text{s}$). Polished Makrana marble ($\alpha = 0.008$) delivers glassy, pristine high-frequency preservation ($5,400\text{ Hz}$). Vocal tones linger in the vault with rich harmonic warmth ($2.15\times$ bass multiplier).
- **Speaker System**: 4 concealed studio-flat monitors placed under corner arched iwans.
  - S1: NW Pishtaq ($x=0.25, y=0.25, z=3.5\text{m}$, `studio_flat`, $0\text{ dB}$, Drive $2\%$, RevSend $90\%$)
  - S2: NE Pishtaq ($x=0.75, y=0.25, z=3.5\text{m}$, `studio_flat`, $0\text{ dB}$, Drive $2\%$, RevSend $90\%$)
  - S3: SW Pishtaq ($x=0.25, y=0.75, z=3.5\text{m}$, `studio_flat`, $0\text{ dB}$, Drive $2\%$, RevSend $90\%$)
  - S4: SE Pishtaq ($x=0.75, y=0.75, z=3.5\text{m}$, `studio_flat`, $0\text{ dB}$, Drive $2\%$, RevSend $90\%$)
- **Cable Profile**: `studio_mogami` ($60\text{m}$, $22\text{ AWG}$, $18,000\text{ Hz}$ cutoff, $0\%$ hum, $0\%$ crackle, $0\%$ slew).

#### 9. Industrial Grain Silo
- **Acoustic Archetype**: Tall cylindrical corrugated agricultural storage bin.
- **Physical Dynamics**: $26\text{m} \times 26\text{m} \times 52\text{m}$ ($35,152\,\text{m}^3$).
- **Acoustic Behavior**: Intense cylindrical ringing resonance ($RT_{60} = 7.5\text{s}$). Reflections focus along the metallic perimeter before scattering upwards ($84\%$ diffusion), causing bright "boing" modal coloration with high damping at $6,400\text{ Hz}$ and heavy Helmholtz bass build-up ($1.95\times$).
- **Speaker System**: 3 suspended PA horns and bullhorns at tiered heights.
  - S1: Lower Hatch Horn ($x=0.35, y=0.35, z=4.0\text{m}$, `pa_horn`, $+1.0\text{ dB}$, Drive $28\%$, RevSend $86\%$)
  - S2: Mid Chute Bullhorn ($x=0.65, y=0.40, z=20.0\text{m}$, `megaphone`, $0\text{ dB}$, Drive $35\%$, RevSend $90\%$)
  - S3: Upper Gantry Horn ($x=0.50, y=0.75, z=40.0\text{m}$, `pa_horn`, $-1.0\text{ dB}$, Drive $25\%$, RevSend $88\%$)
- **Cable Profile**: `corroded_duct` ($75\text{m}$, $18\text{ AWG}$, $2,700\text{ Hz}$ cutoff, $32\%$ auger motor hum, $36\%$ crackle, $50\%$ slew).

#### 10. Abbey Vintage Echo Chamber
- **Acoustic Archetype**: Subterranean echo chamber (modeled on Abbey Road Studio Two Chamber).
- **Physical Dynamics**: $18\text{m} \times 14\text{m} \times 6.5\text{m}$ ($1,638\,\text{m}^3$).
- **Acoustic Behavior**: Silky, warm vintage diffusion ($RT_{60} = 2.8\text{s}$). Glazed plaster walls and ceramic sewer drainage pipe diffusers eliminate flutter echo ($92\%$ diffusion). High damping cutoff of $7,800\text{ Hz}$ and tight bass multiplier ($1.20\times$) deliver the classic 1960s plate/chamber vocal sound.
- **Speaker System**: 2 vintage studio monitors facing corner diffusion pillars.
  - S1: Left Corner Monitor ($x=0.25, y=0.20, z=1.8\text{m}$, `studio_flat`, $0\text{ dB}$, Drive $6\%$, RevSend $85\%$)
  - S2: Right Corner Monitor ($x=0.75, y=0.20, z=1.8\text{m}$, `studio_flat`, $0\text{ dB}$, Drive $6\%$, RevSend $85\%$)
- **Cable Profile**: `vintage_coax` ($45\text{m}$, $20\text{ AWG}$, $6,500\text{ Hz}$ cutoff, $6\%$ valve hum, $4\%$ crackle, $12\%$ slew).

---
*Calibrated & certified by Agent 8 (Architectural Sound Design & Preset Library Curator).*
