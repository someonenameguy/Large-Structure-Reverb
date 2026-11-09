# MEGASTRUCTURE REVERB & PA SIMULATOR
## Studio Workstation UI/UX & Ergonomics Design Specification (Agent 5)

**Author:** Agent 5 — UI/UX & Studio Workstation Ergonomics Designer  
**Date:** 2026-11-09  
**Version:** 2.0.0-PRO  
**Target File:** `/home/antigravity/someonenameguy/Large-Structure-Reverb/index.html`  
**Dependencies:** Pure HTML5 / CSS3 / JavaScript (Zero CDN, Zero external stylesheets, Zero frameworks)

---

## 1. Executive Summary & Design Philosophy

The **Megastructure Reverb & PA Simulator** interface is engineered as an ultra-sleek, professional dark-mode DAW (Digital Audio Workstation) mastering console. The aesthetic blends high-precision modern audio software (e.g. FabFilter, iZotope Ozone, Ableton Live) with physical analog outboard rack gear (chassis chamfers, brushed anodized aluminum, illuminated mechanical LED buttons, calibrated dB markings, knurled rotary knobs).

### Ergonomic Directives
1. **Zero Bloat, Zero External Assets**: 100% self-contained pure CSS3 with native system font stacks (`JetBrains Mono`, `ui-monospace`, `-apple-system`). All vectors, knobs, arcs, LED indicators, and glyphs are rendered via pure SVG, Canvas, or CSS gradients.
2. **Tactile Studio Physicality**:
   - **Rotary Knobs**: Vertical drag pointer-capture tracking with 150px full-sweep sensitivity, Shift+Drag $5\times$ precision fine-tuning, double-click to default value reset, mouse wheel increment/decrement, and ARIA slider keyboard navigation (`ArrowUp`/`ArrowDown`/`PageUp`/`PageDown`/`Home`/`End`).
   - **Illuminated Pushbuttons**: Mechanical latching/momentary switches with recessed bezels, colored LED status lenses (Cyan, Amber, Emerald, Ruby), and photorealistic light bloom when engaged.
   - **Precision Faders**: Recessed slider channels with center detent notch ($0\text{ dB}$) and calibrated decibel scale markings.
3. **Command Center Modular Layout**:
   - **Top Transport & Audio Source Header**: Compact rackmount transport bar with SMPTE timecode readout (`00:00.00`), Play/Pause, Stop, Loop, Live Mic, Sample Picker, File Uploader, Preset Selector, Chaos Engine, A/B Compare, Export, and Keyboard HUD modal trigger.
   - **Split-Screen Visual Stage**: Side-by-side split displaying the **2D Spatial Acoustic Arena Radar** (55% width) and **Master FFT Spectrum Analyzer & Goniometer Vectorscope** (45% width) with synchronized 60 FPS real-time rendering.
   - **Waveform Scrubber Deck**: Dedicated scrubbing timeline with mini audio waveform overview, interactive scrub hover, and glowing cyan playhead.
   - **Modular Tabbed Inspector Rack**: 4-module studio console rack organizing all parameters into logical sub-panels:
     - `[Tab 1]` **Structure Acoustics & Physical Dimensions**
     - `[Tab 2]` **Speaker Array Matrix & PA Distribution**
     - `[Tab 3]` **Cable & Transmission Degradation Simulator**
     - `[Tab 4]` **Master FX, Limiter & Spatial Dynamics**
4. **Comprehensive Keyboard Hotkeys & HUD Modal**: Full single-key DAW navigation (`Space` = Play/Pause, `Esc`/`S` = Stop, `L` = Loop, `R` = Randomize All, `M` = Master Mute, `A` = A/B Bypass, `E` = Export Modal, `1`–`9` = Architectural Presets, `?` = HUD Modal).
5. **Mobile & Tablet Touch Ergonomics**: `touch-action: none` on interactive controls, touch targets $\ge 44\text{px}$, responsive grid collapse, and swipeable tab navigation.

---

## 2. Design Tokens & Pure CSS3 Variables (`:root`)

```css
:root {
  /* ========================================================================
     STUDIO PALETTE: Deep Matte Dark DAW Theme
     ======================================================================== */
  --bg-base: #07090d;              /* Deepest background floor */
  --bg-chassis: #0b0e14;           /* Master console rack housing */
  --bg-surface: #10141d;           /* Panel faces & module card bodies */
  --bg-panel: #151a26;             /* Raised section headers & bezels */
  --bg-panel-hover: #1c2232;       /* Interactive button hover */
  --bg-panel-active: #222a3d;      /* Pressed button state */
  --bg-input: #090c12;             /* Recessed input wells & tracks */
  --bg-knob-dial: #181d29;         /* Rotary knob cap core */

  /* Borders & Insets */
  --border-subtle: #1e2536;         /* Hairline separators */
  --border-medium: #2a344a;         /* Panel outlines */
  --border-focus: #3d4f73;          /* Focus rings */
  --border-accent: #00e5ff;         /* Active state highlight */

  /* ========================================================================
     STUDIO ACCENT LIGHTING & LED DIODES
     ======================================================================== */
  --accent-cyan: #00e5ff;           /* Cyber Acoustic Cyan (Primary) */
  --accent-cyan-dim: rgba(0, 229, 255, 0.14);
  --glow-cyan: 0 0 10px rgba(0, 229, 255, 0.45);

  --accent-amber: #ffb300;          /* Warm Tube / Chaos / Warning */
  --accent-amber-dim: rgba(255, 179, 0, 0.14);
  --glow-amber: 0 0 10px rgba(255, 179, 0, 0.45);

  --accent-emerald: #00e676;        /* Signal Normal / Engaged LED */
  --accent-emerald-dim: rgba(0, 230, 118, 0.14);
  --glow-emerald: 0 0 10px rgba(0, 230, 118, 0.45);

  --accent-ruby: #ff3366;           /* Clip / Overload / Solo / Danger */
  --accent-ruby-dim: rgba(255, 51, 102, 0.14);
  --glow-ruby: 0 0 10px rgba(255, 51, 102, 0.45);

  --accent-purple: #b388ff;         /* Spatial Modulation / Reverb Send */
  --accent-purple-dim: rgba(179, 136, 255, 0.14);
  --glow-purple: 0 0 10px rgba(179, 136, 255, 0.45);

  /* ========================================================================
     TYPOGRAPHY SCALE (Zero External Fonts - Pure System Stacks)
     ======================================================================== */
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-mono: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Monaco, Consolas, "Liberation Mono", monospace;

  --text-primary: #f1f5f9;         /* 100% white-silver for labels & active */
  --text-secondary: #94a3b8;       /* Medium silver for descriptive text */
  --text-muted: #64748b;           /* Dim gray for units & annotations */
  --text-display: #38bdf8;         /* Fluorescent cyan for LCD/LED readouts */

  /* ========================================================================
     SKEUOMORPHIC SHADOWS & CHAMFERS
     ======================================================================== */
  --shadow-chassis: inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 24px rgba(0,0,0,0.7);
  --shadow-inset-well: inset 0 2px 4px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.03);
  --shadow-knob: 0 3px 8px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.18), inset 0 -2px 4px rgba(0,0,0,0.6);
  --shadow-button-press: inset 0 2px 5px rgba(0,0,0,0.8);

  /* Layout Constants */
  --radius-xs: 3px;
  --radius-sm: 5px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --header-height: 52px;
  --transport-height: 48px;
}
```

---

## 3. UI Component Architecture & Markup

### 3.1. Tactile Rotary Knob Component

The rotary knob is structured with an SVG circular vector track, a central brushed aluminum dial cap with knurling and pointer needle, an upper parameter label, and a lower digital LCD readout badge.

```html
<!-- Generic Studio Rotary Knob Template -->
<div class="studio-knob-control" data-param="paramRT60">
  <div class="knob-label-header">
    <span class="knob-title">RT60 Decay</span>
  </div>
  
  <div class="knob-interactive-zone"
       id="knob-paramRT60"
       role="slider"
       tabindex="0"
       aria-label="RT60 Decay Time"
       aria-valuemin="0.5"
       aria-valuemax="22.0"
       aria-valuenow="7.8"
       data-min="0.5"
       data-max="22.0"
       data-step="0.1"
       data-default="7.8"
       data-unit="s"
       data-input-id="paramRT60"
       data-val-id="valRT60"
       title="Vertical Drag: Adjust | Shift+Drag: Fine | Dbl-Click: Reset (7.8s)">
    
    <!-- Vector Arc Meter Ring -->
    <svg class="knob-arc-svg" viewBox="0 0 56 56">
      <!-- Background Track (270 degree arc) -->
      <circle class="knob-track-bg" cx="28" cy="28" r="23" />
      <!-- Active Filled Arc (Color mapped to accent) -->
      <circle class="knob-track-fill" cx="28" cy="28" r="23" />
    </svg>
    
    <!-- Center Aluminum Dial Cap -->
    <div class="knob-dial-cap">
      <div class="knob-pointer-needle"></div>
      <div class="knob-center-dimple"></div>
    </div>
  </div>
  
  <!-- Digital LCD Readout -->
  <div class="knob-readout-badge" id="readout-paramRT60">7.8 s</div>
</div>
```

#### Pure CSS Styling for Rotary Knob:
```css
.studio-knob-control {
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
  min-width: 68px;
  gap: 4px;
}

.knob-label-header {
  font-family: var(--font-sans);
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: var(--text-secondary);
  text-align: center;
  white-space: nowrap;
}

.knob-interactive-zone {
  position: relative;
  width: 52px;
  height: 52px;
  cursor: ns-resize;
  touch-action: none; /* Prevents mobile scroll while dragging */
  outline: none;
  border-radius: 50%;
  transition: transform 0.1s ease;
}

.knob-interactive-zone:focus-visible {
  box-shadow: 0 0 0 2px var(--accent-cyan);
}

.knob-interactive-zone:hover .knob-dial-cap {
  filter: brightness(1.12);
}

.knob-interactive-zone:active .knob-dial-cap {
  filter: brightness(0.95);
}

/* SVG Vector Meter Arc */
.knob-arc-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  transform: rotate(135deg); /* Start at 7:30 o'clock position */
}

.knob-track-bg {
  fill: none;
  stroke: var(--bg-input);
  stroke-width: 3.5;
  stroke-dasharray: 144.5;
  stroke-dashoffset: 36.1; /* 270 degree span */
  stroke-linecap: round;
}

.knob-track-fill {
  fill: none;
  stroke: var(--accent-cyan);
  stroke-width: 3.5;
  stroke-dasharray: 144.5;
  stroke-dashoffset: calc(144.5 - (108.4 * var(--knob-normalized, 0.35)));
  stroke-linecap: round;
  filter: drop-shadow(0 0 4px rgba(0, 229, 255, 0.5));
  transition: stroke-dashoffset 0.04s linear;
}

/* Dial Center Cap (Anodized Studio Texture) */
.knob-dial-cap {
  position: absolute;
  top: 6px;
  left: 6px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #2a3346 0%, #151a26 65%, #0a0d14 100%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: var(--shadow-knob);
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(calc(-135deg + (270deg * var(--knob-normalized, 0.35))));
  transition: transform 0.04s linear;
}

.knob-pointer-needle {
  position: absolute;
  top: 2px;
  width: 2.5px;
  height: 12px;
  background: var(--accent-cyan);
  border-radius: 2px;
  box-shadow: var(--glow-cyan);
}

.knob-center-dimple {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: radial-gradient(circle, #0e121a 0%, #1b212f 100%);
  border: 1px solid rgba(0, 0, 0, 0.6);
}

/* Digital LCD Readout Badge */
.knob-readout-badge {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  color: var(--text-display);
  background: var(--bg-input);
  border: 1px solid var(--border-subtle);
  padding: 2px 6px;
  border-radius: var(--radius-xs);
  min-width: 48px;
  text-align: center;
  letter-spacing: 0.3px;
  box-shadow: var(--shadow-inset-well);
}
```

---

### 3.2. Illuminated Pushbuttons & Toggle Switches

Designed to mimic backlit analog mixing console buttons (e.g. SSL, Neve, API) with an integrated LED diode lens and glowing text.

```html
<!-- Illuminated Latching Pushbutton -->
<button class="btn-studio-toggle active" id="btnLoop" title="Toggle Seamless Loop Playback [L]">
  <span class="led-diode led-cyan"></span>
  <span class="btn-text">LOOP</span>
</button>

<button class="btn-studio-toggle" id="btnLiveMic" title="Toggle Live Mic Input">
  <span class="led-diode led-amber"></span>
  <span class="btn-text">LIVE MIC</span>
</button>

<button class="btn-studio-toggle" id="btnSpeakerMute" title="Mute Active Speaker [M]">
  <span class="led-diode led-ruby"></span>
  <span class="btn-text">MUTE</span>
</button>
```

#### Pure CSS Styling for Illuminated Buttons:
```css
.btn-studio-toggle, .btn-studio {
  background: linear-gradient(180deg, #181d29 0%, #10141d 100%);
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  border-radius: var(--radius-sm);
  padding: 6px 12px;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  user-select: none;
  box-shadow: 0 2px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06);
  transition: all 0.12s ease-in-out;
}

.btn-studio-toggle:hover, .btn-studio:hover {
  background: linear-gradient(180deg, #202737 0%, #151a26 100%);
  border-color: var(--border-medium);
  color: var(--text-primary);
}

.btn-studio-toggle:active, .btn-studio:active {
  transform: translateY(1px);
  box-shadow: var(--shadow-button-press);
}

/* LED Diode Lens */
.led-diode {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #1e2536;
  border: 1px solid #0d1117;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.8);
  transition: all 0.15s ease;
}

/* Active Engaged States with Realistic Glow */
.btn-studio-toggle.active {
  background: linear-gradient(180deg, #151d2a 0%, #0d1522 100%);
  border-color: rgba(0, 229, 255, 0.4);
  color: #ffffff;
}

.btn-studio-toggle.active .led-cyan {
  background: var(--accent-cyan);
  box-shadow: var(--glow-cyan);
}

.btn-studio-toggle.active .led-amber {
  background: var(--accent-amber);
  box-shadow: var(--glow-amber);
}

.btn-studio-toggle.active .led-emerald {
  background: var(--accent-emerald);
  box-shadow: var(--glow-emerald);
}

.btn-studio-toggle.active .led-ruby {
  background: var(--accent-ruby);
  box-shadow: var(--glow-ruby);
}
```

---

### 3.3. Clean Modular Layout Architecture

The DAW layout is organized into 4 primary tiers:
1. **Tier 1: Master Rack Header & Transport Deck**
2. **Tier 2: Split-Screen Visual Monitoring Stage**
   - Left: 2D Spatial Acoustic Arena Radar (55%)
   - Right: Master Multi-Mode Visualizer & Stereo Peak/RMS Ladder (45%)
3. **Tier 3: Waveform Timeline Scrubber**
4. **Tier 4: Modular Tabbed Inspector Rack (4 Studio Modules)**

```html
<!-- Master Modular Workstation Container -->
<div class="studio-workstation-container">

  <!-- ======================================================================
       TIER 1: MASTER HEADER & TRANSPORT DECK
       ====================================================================== -->
  <header class="studio-top-header">
    <div class="brand-cluster">
      <div class="brand-chassis-logo">&#x25C7;</div>
      <div class="brand-metadata">
        <h1 class="brand-title">MEGASTRUCTURE <span class="badge-dsp">DSP PRO 2.0</span></h1>
        <p class="brand-subtitle">Massive Architectural Acoustics &amp; Multi-Speaker PA Workstation</p>
      </div>
    </div>

    <!-- Quick Presets & Chaos Hub -->
    <div class="header-action-hub">
      <div class="preset-dropdown-container">
        <span class="hub-label">SPACE:</span>
        <select id="presetSelect" class="studio-select" title="Architectural Reverb Space [1-9]">
          <option value="cathedral">1. Grand Gothic Cathedral (RT60: 7.8s)</option>
          <option value="hangar">2. Boeing 747 Aircraft Hangar (RT60: 5.4s)</option>
          <option value="cavern">3. Underground Subterranean Cavern (RT60: 9.2s)</option>
          <option value="stadium">4. Open-Air Sports Arena &amp; PA (RT60: 4.2s)</option>
          <option value="parking">5. Brutalist Multi-Story Garage (RT60: 3.5s)</option>
          <option value="warehouse">6. Industrial Steel Distribution Hub (RT60: 4.8s)</option>
          <option value="gymnasium">7. High-School Gymnasium (RT60: 2.6s)</option>
          <option value="cooling_tower">8. Nuclear Concrete Cooling Tower (RT60: 12.0s)</option>
          <option value="custom">9. Custom Architectural Space</option>
        </select>
      </div>

      <button id="btnRandomizeAll" class="btn-studio btn-accent-glow" title="Master Chaos Engine [R]">
        &#x1F3B2; RANDOMIZE ALL
      </button>

      <button id="btnABCompare" class="btn-studio" title="A/B Compare Direct vs Reverb [A]">
        A/B: <span id="abStatusText" class="text-accent">WET (SPACE)</span>
      </button>

      <button id="btnOpenExportModal" class="btn-studio btn-primary-glow" title="Bounce Offline Audio Master [E]">
        &#x2913; BOUNCE / EXPORT
      </button>

      <button id="btnOpenHudModal" class="btn-studio" title="Keyboard Shortcuts Cheat Sheet [?]">
        &#x2328; HUD
      </button>
    </div>
  </header>

  <!-- Transport & Audio Source Bar -->
  <div class="studio-transport-deck">
    <!-- Playback Transport Controls -->
    <div class="transport-button-cluster">
      <button id="btnPlayPause" class="btn-transport btn-primary-glow" title="Play / Pause [Space]">&#x25B6;</button>
      <button id="btnStop" class="btn-transport" title="Stop &amp; Rewind [Esc / S]">&#x25A0;</button>
      <button id="btnLoop" class="btn-studio-toggle active" title="Loop Playback [L]">
        <span class="led-diode led-cyan"></span>
        <span>LOOP</span>
      </button>
    </div>

    <!-- Timecode & SMPTE Display -->
    <div class="smpte-display-box">
      <span class="smpte-label">TIME</span>
      <span id="timeCurrent" class="smpte-timecode">00:00.00</span>
      <span class="smpte-slash">/</span>
      <span id="timeDuration" class="smpte-timecode-dim">00:00.00</span>
    </div>

    <!-- Audio Source Selector -->
    <div class="transport-source-cluster">
      <select id="demoSoundSelect" class="studio-select" title="Audition Built-in Procedural Audio Sample">
        <option value="pa_announcement">Demo: PA Chime &amp; Announcement</option>
        <option value="snare_clap">Demo: Acoustic Snare &amp; Handclap</option>
        <option value="drum_loop">Demo: 808 Hip-Hop Drum Break</option>
        <option value="synth_lead">Demo: Synth Brass Progression</option>
        <option value="acoustic_guitar">Demo: Plucked Guitar Harmonic</option>
        <option value="impulse_click">Demo: Test Dirac Impulse Click</option>
      </select>

      <div class="file-upload-wrapper">
        <button id="btnUploadFile" class="btn-studio" title="Load Custom Audio File (WAV, MP3, FLAC, OGG, M4A)">
          &#x1F4C2; Upload
        </button>
        <input type="file" id="audioFileInput" accept="audio/*, .wav, .mp3, .ogg, .flac, .aac, .m4a, .webm, .aiff">
      </div>

      <button id="btnLiveMic" class="btn-studio-toggle" title="Toggle Live Microphone Stream">
        <span class="led-diode led-amber"></span>
        <span>MIC</span>
      </button>
    </div>
  </div>

  <!-- Waveform Timeline Scrubber Deck -->
  <div class="studio-scrubber-deck">
    <div class="waveform-scrubber" id="waveformScrubber">
      <canvas id="waveformCanvas" class="waveform-canvas"></canvas>
      <div id="playheadLine" class="playhead-line"></div>
    </div>
    <div class="scrubber-metadata">
      <span id="audioTrackInfo">Demo: Cathedral PA Chime &amp; Announcement</span>
      <span class="scrub-hint">Click or drag anywhere on waveform to scrub timeline</span>
    </div>
  </div>

  <!-- ======================================================================
       TIER 2: SPLIT-SCREEN VISUAL MONITORING STAGE
       ====================================================================== -->
  <div class="studio-visual-stage">
    
    <!-- LEFT SPLIT: 2D Spatial Acoustic Arena Radar -->
    <div class="visual-panel arena-panel">
      <div class="panel-rack-header">
        <div class="rack-header-left">
          <span class="rack-screw">&#x25C6;</span>
          <span class="rack-title"><span class="icon">&#x25C9;</span> SPATIAL ACOUSTIC ARENA RADAR</span>
        </div>
        <div class="rack-header-right">
          <span class="arena-badge" id="arenaDimensionsBadge">90m &times; 40m Space</span>
          <button id="btnPresetLayout" class="btn-studio-sm">Arrangement &#x25BE;</button>
          <button id="btnRandomPositions" class="btn-studio-sm" title="Scatter Speakers &amp; Listener">&#x1F3B2; Scatter</button>
          <span class="rack-screw">&#x25C6;</span>
        </div>
      </div>
      
      <div class="arena-container" id="arenaContainer">
        <canvas id="radarCanvas"></canvas>
        <div class="arena-overlay-bar">
          <span class="arena-badge" id="hoverSpeakerBadge">Hover over a speaker or ear</span>
          <span class="arena-badge">Propagation Speed: $c = 343\text{ m/s}$</span>
        </div>
        <div class="arena-legend">
          <span><div class="legend-dot" style="background:#00e5ff;"></div> Listener (Ear)</span>
          <span><div class="legend-dot" style="background:#ffb300;"></div> Active Speaker</span>
          <span><div class="legend-dot" style="background:#ff3366;"></div> Selected</span>
          <span><div class="legend-dot" style="background:rgba(0,229,255,0.4);"></div> Soundwave Ripples</span>
        </div>
      </div>
    </div>

    <!-- RIGHT SPLIT: Master Spectrum Visualizer & Metering Stage -->
    <div class="visual-panel visualizer-panel">
      <div class="panel-rack-header">
        <div class="rack-header-left">
          <span class="rack-screw">&#x25C6;</span>
          <span class="rack-title"><span class="icon">&#x1F39B;</span> MASTER SPECTRUM &amp; VECTORSCOPE</span>
        </div>
        <div class="rack-header-right">
          <button id="btnVisualizerMode" class="btn-studio-sm" title="Toggle FFT Spectrum / Goniometer">
            FFT Spectrum &#x21C4;
          </button>
          <span class="limiter-status-badge">LIMITER: 0 dBFS CEIL</span>
          <span class="rack-screw">&#x25C6;</span>
        </div>
      </div>

      <div class="visualizer-content-stage">
        <!-- Canvas Visualizer Box -->
        <div class="visualizer-box">
          <canvas id="visualizerCanvas"></canvas>
        </div>

        <!-- Master Stereo Peak & RMS LED Meters -->
        <div class="master-meter-unit">
          <div class="meter-channel-strip">
            <span class="meter-ch-label">L</span>
            <div class="meter-track">
              <div id="meterL" class="meter-bar"></div>
            </div>
          </div>
          <div class="meter-channel-strip">
            <span class="meter-ch-label">R</span>
            <div class="meter-track">
              <div id="meterR" class="meter-bar"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

  <!-- ======================================================================
       TIER 3: MODULAR TABBED INSPECTOR RACK
       ====================================================================== -->
  <div class="studio-tab-rack">
    
    <!-- Tab Navigation Strip -->
    <div class="rack-tab-strip" role="tablist">
      <button class="rack-tab-btn active" role="tab" id="tab-btn-acoustics" aria-selected="true" data-tab="tab-acoustics">
        <span class="tab-led"></span>
        <span class="tab-title">&#x2B21; STRUCTURE ACOUSTICS</span>
        <span class="tab-keycap">[Alt+1]</span>
      </button>

      <button class="rack-tab-btn" role="tab" id="tab-btn-speakers" aria-selected="false" data-tab="tab-speakers">
        <span class="tab-led"></span>
        <span class="tab-title">&#x1F50A; SPEAKER ARRAY MATRIX</span>
        <span class="tab-keycap">[Alt+2]</span>
      </button>

      <button class="rack-tab-btn" role="tab" id="tab-btn-cable" aria-selected="false" data-tab="tab-cable">
        <span class="tab-led"></span>
        <span class="tab-title">&#x26A1; CABLE &amp; TRANSMISSION</span>
        <span class="tab-keycap">[Alt+3]</span>
      </button>

      <button class="rack-tab-btn" role="tab" id="tab-btn-master" aria-selected="false" data-tab="tab-master">
        <span class="tab-led"></span>
        <span class="tab-title">&#x1F39A; MASTER FX &amp; LIMITER</span>
        <span class="tab-keycap">[Alt+4]</span>
      </button>
    </div>

    <!-- Tab Panels Container -->
    <div class="rack-tab-panels">

      <!-- ==================================================================
           TAB 1: STRUCTURE ACOUSTICS & PHYSICAL DIMENSIONS
           ================================================================== -->
      <div class="rack-tab-panel active" id="tab-acoustics" role="tabpanel">
        <div class="module-grid-layout">
          
          <!-- Sub-module 1: Physical Dimensions & Volume -->
          <div class="studio-sub-rack">
            <div class="sub-rack-header">
              <span class="sub-rack-title">Physical Dimensions &amp; Boundary Materials</span>
              <span id="roomVolumeBadge" class="volume-badge">64,800 m³</span>
            </div>
            <div class="sub-rack-body">
              <div class="fader-row-cluster">
                <!-- Precision Sliders for Dimensions -->
                <div class="slider-control-group">
                  <div class="label-row"><span>Length:</span><span id="valLength" class="val-mono">90 m</span></div>
                  <input type="range" id="paramLength" min="15" max="200" step="1" value="90">
                </div>
                <div class="slider-control-group">
                  <div class="label-row"><span>Width:</span><span id="valWidth" class="val-mono">40 m</span></div>
                  <input type="range" id="paramWidth" min="10" max="150" step="1" value="40">
                </div>
                <div class="slider-control-group">
                  <div class="label-row"><span>Ceiling Height:</span><span id="valHeight" class="val-mono">18 m</span></div>
                  <input type="range" id="paramHeight" min="4" max="75" step="1" value="18">
                </div>
                <div class="slider-control-group">
                  <div class="label-row"><span>Surface Material:</span></div>
                  <select id="paramMaterial" class="studio-select">
                    <option value="concrete">Polished Concrete &amp; Stone (0.02 abs)</option>
                    <option value="brick">Weathered Brickwork (0.04 abs)</option>
                    <option value="metal">Corrugated Sheet Metal / Industrial (0.05 abs)</option>
                    <option value="wood">Hardwood Paneling / Gym (0.12 abs)</option>
                    <option value="marble">Dense Italian Marble (0.01 abs)</option>
                    <option value="glass">Reinforced Glass Facade (0.03 abs)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Sub-module 2: Reverb Decay Physics (Rotary Knob Cluster) -->
          <div class="studio-sub-rack">
            <div class="sub-rack-header">
              <span class="sub-rack-title">Reverberation Decay Physics Engine</span>
              <div style="display:flex; gap:6px;">
                <button id="btnAuditionClap" class="btn-studio-sm" title="Fire Test Dirac Clap">&#x1F44F; Test Clap</button>
                <button id="btnRandomRoom" class="btn-studio-sm" title="Randomize Room Architecture">&#x1F3B2; Random</button>
              </div>
            </div>
            <div class="sub-rack-body">
              <div class="knob-bank-row">
                <!-- Knob 1: RT60 -->
                <div class="studio-knob-control" data-param="paramRT60">
                  <div class="knob-label-header"><span class="knob-title">RT60 Time</span></div>
                  <div class="knob-interactive-zone" id="knob-paramRT60" role="slider" tabindex="0"
                       aria-label="RT60 Decay Time" aria-valuemin="0.5" aria-valuemax="22.0" aria-valuenow="7.8"
                       data-min="0.5" data-max="22.0" data-step="0.1" data-default="7.8" data-unit="s"
                       data-input-id="paramRT60" data-val-id="valRT60">
                    <svg class="knob-arc-svg" viewBox="0 0 56 56">
                      <circle class="knob-track-bg" cx="28" cy="28" r="23" />
                      <circle class="knob-track-fill" cx="28" cy="28" r="23" />
                    </svg>
                    <div class="knob-dial-cap"><div class="knob-pointer-needle"></div><div class="knob-center-dimple"></div></div>
                  </div>
                  <div class="knob-readout-badge" id="valRT60">7.8 s</div>
                  <input type="range" id="paramRT60" min="0.5" max="22.0" step="0.1" value="7.8" style="display:none;">
                </div>

                <!-- Knob 2: Pre-Delay -->
                <div class="studio-knob-control" data-param="paramPreDelay">
                  <div class="knob-label-header"><span class="knob-title">Pre-Delay</span></div>
                  <div class="knob-interactive-zone" id="knob-paramPreDelay" role="slider" tabindex="0"
                       aria-label="Pre-Delay" aria-valuemin="0" aria-valuemax="250" aria-valuenow="42"
                       data-min="0" data-max="250" data-step="1" data-default="42" data-unit="ms"
                       data-input-id="paramPreDelay" data-val-id="valPreDelay">
                    <svg class="knob-arc-svg" viewBox="0 0 56 56">
                      <circle class="knob-track-bg" cx="28" cy="28" r="23" />
                      <circle class="knob-track-fill" cx="28" cy="28" r="23" />
                    </svg>
                    <div class="knob-dial-cap"><div class="knob-pointer-needle"></div><div class="knob-center-dimple"></div></div>
                  </div>
                  <div class="knob-readout-badge" id="valPreDelay">42 ms</div>
                  <input type="range" id="paramPreDelay" min="0" max="250" step="1" value="42" style="display:none;">
                </div>

                <!-- Knob 3: High Damping -->
                <div class="studio-knob-control" data-param="paramHighDamp">
                  <div class="knob-label-header"><span class="knob-title">Air Damping</span></div>
                  <div class="knob-interactive-zone" id="knob-paramHighDamp" role="slider" tabindex="0"
                       aria-label="High Damping" aria-valuemin="800" aria-valuemax="18000" aria-valuenow="3800"
                       data-min="800" data-max="18000" data-step="100" data-default="3800" data-unit="Hz"
                       data-input-id="paramHighDamp" data-val-id="valHighDamp">
                    <svg class="knob-arc-svg" viewBox="0 0 56 56">
                      <circle class="knob-track-bg" cx="28" cy="28" r="23" />
                      <circle class="knob-track-fill" cx="28" cy="28" r="23" />
                    </svg>
                    <div class="knob-dial-cap"><div class="knob-pointer-needle"></div><div class="knob-center-dimple"></div></div>
                  </div>
                  <div class="knob-readout-badge" id="valHighDamp">3,800 Hz</div>
                  <input type="range" id="paramHighDamp" min="800" max="18000" step="100" value="3800" style="display:none;">
                </div>

                <!-- Knob 4: Bass Multiplier -->
                <div class="studio-knob-control" data-param="paramBassMult">
                  <div class="knob-label-header"><span class="knob-title">Bass Mult</span></div>
                  <div class="knob-interactive-zone" id="knob-paramBassMult" role="slider" tabindex="0"
                       aria-label="Bass Multiplier" aria-valuemin="0.5" aria-valuemax="3.0" aria-valuenow="1.6"
                       data-min="0.5" data-max="3.0" data-step="0.1" data-default="1.6" data-unit="x"
                       data-input-id="paramBassMult" data-val-id="valBassMult">
                    <svg class="knob-arc-svg" viewBox="0 0 56 56">
                      <circle class="knob-track-bg" cx="28" cy="28" r="23" />
                      <circle class="knob-track-fill" cx="28" cy="28" r="23" />
                    </svg>
                    <div class="knob-dial-cap"><div class="knob-pointer-needle"></div><div class="knob-center-dimple"></div></div>
                  </div>
                  <div class="knob-readout-badge" id="valBassMult">1.6 x</div>
                  <input type="range" id="paramBassMult" min="0.5" max="3.0" step="0.1" value="1.6" style="display:none;">
                </div>

                <!-- Knob 5: Diffusion -->
                <div class="studio-knob-control" data-param="paramDiffusion">
                  <div class="knob-label-header"><span class="knob-title">Diffusion</span></div>
                  <div class="knob-interactive-zone" id="knob-paramDiffusion" role="slider" tabindex="0"
                       aria-label="Reflection Diffusion" aria-valuemin="10" aria-valuemax="100" aria-valuenow="85"
                       data-min="10" data-max="100" data-step="1" data-default="85" data-unit="%"
                       data-input-id="paramDiffusion" data-val-id="valDiffusion">
                    <svg class="knob-arc-svg" viewBox="0 0 56 56">
                      <circle class="knob-track-bg" cx="28" cy="28" r="23" />
                      <circle class="knob-track-fill" cx="28" cy="28" r="23" />
                    </svg>
                    <div class="knob-dial-cap"><div class="knob-pointer-needle"></div><div class="knob-center-dimple"></div></div>
                  </div>
                  <div class="knob-readout-badge" id="valDiffusion">85 %</div>
                  <input type="range" id="paramDiffusion" min="10" max="100" step="1" value="85" style="display:none;">
                </div>
              </div>

              <!-- Impulse Response Waveform Envelope -->
              <div class="ir-waveform-preview-box">
                <div class="ir-header-row">
                  <span>Synthesized Stochastic IR Envelope ($28+$ Early Rays + Late Decay)</span>
                  <span id="irStatusText" class="text-accent">Ready (Active)</span>
                </div>
                <canvas id="irCanvas" class="ir-canvas"></canvas>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- ==================================================================
           TAB 2: SPEAKER ARRAY MATRIX & PA DISTRIBUTION
           ================================================================== -->
      <div class="rack-tab-panel" id="tab-speakers" role="tabpanel">
        <div class="speaker-matrix-layout">
          <!-- Top Array Toolbar -->
          <div class="speaker-toolbar">
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="hub-label">ACTIVE CHANNELS (1-12):</span>
              <span id="speakerCountDisplay" class="val-mono">4</span>
              <input type="range" id="paramSpeakerCount" min="1" max="12" step="1" value="4" style="width:100px;">
            </div>
            <button id="btnRandomSpeakers" class="btn-studio-sm" title="Randomize Speaker Matrix">&#x1F3B2; Randomize Speakers</button>
          </div>

          <!-- Channel Selector Tabs (S1 to S12) -->
          <div class="speaker-selector-tabs" id="speakerTabsContainer"></div>

          <!-- Active Speaker Inspector Console -->
          <div id="speakerInspector" class="speaker-inspector-console">
            <div class="inspector-title-row">
              <span id="inspectorTitle" class="inspector-badge">SPEAKER 1 INSPECTOR</span>
              <div style="display:flex; gap:8px;">
                <button id="btnSpeakerSolo" class="btn-studio-toggle" title="Solo Active Speaker">
                  <span class="led-diode led-emerald"></span><span>SOLO</span>
                </button>
                <button id="btnSpeakerMute" class="btn-studio-toggle" title="Mute Active Speaker">
                  <span class="led-diode led-ruby"></span><span>MUTE</span>
                </button>
              </div>
            </div>

            <!-- Inspector Controls Grid -->
            <div class="inspector-grid">
              <div class="slider-control-group">
                <div class="label-row"><span>Driver Emulation Model:</span></div>
                <select id="spkDriverType" class="studio-select">
                  <option value="pa_horn">Stadium PA Horn (Bandpass 350Hz-4.5kHz, Resonant)</option>
                  <option value="ceiling_cone">Warehouse Ceiling Speaker (Midrange 250Hz-6kHz)</option>
                  <option value="megaphone">Megaphone / Bullhorn (500Hz-3kHz, Saturated)</option>
                  <option value="tannoy">Tannoy Intercom (Gritty Narrow Band)</option>
                  <option value="arena_stack">Full-Range Arena Line Array (Punchy Sub)</option>
                  <option value="studio_flat">High-Fidelity Flat Monitor</option>
                </select>
              </div>

              <!-- Speaker Knobs Cluster -->
              <div class="knob-bank-row">
                <!-- Pan Knob -->
                <div class="studio-knob-control" data-param="spkPan">
                  <div class="knob-label-header"><span class="knob-title">Stereo Pan</span></div>
                  <div class="knob-interactive-zone" id="knob-spkPan" role="slider" tabindex="0"
                       aria-label="Stereo Pan" aria-valuemin="-1" aria-valuemax="1" aria-valuenow="0"
                       data-min="-1" data-max="1" data-step="0.05" data-default="0" data-unit=""
                       data-input-id="spkPan" data-val-id="spkPanVal">
                    <svg class="knob-arc-svg" viewBox="0 0 56 56">
                      <circle class="knob-track-bg" cx="28" cy="28" r="23" />
                      <circle class="knob-track-fill" cx="28" cy="28" r="23" />
                    </svg>
                    <div class="knob-dial-cap"><div class="knob-pointer-needle"></div><div class="knob-center-dimple"></div></div>
                  </div>
                  <div class="knob-readout-badge" id="spkPanVal">0 (Center)</div>
                  <input type="range" id="spkPan" min="-1" max="1" step="0.05" value="0" style="display:none;">
                </div>

                <!-- Volume Knob -->
                <div class="studio-knob-control" data-param="spkVol">
                  <div class="knob-label-header"><span class="knob-title">Volume Level</span></div>
                  <div class="knob-interactive-zone" id="knob-spkVol" role="slider" tabindex="0"
                       aria-label="Volume" aria-valuemin="-40" aria-valuemax="6" aria-valuenow="-2"
                       data-min="-40" data-max="6" data-step="0.5" data-default="-2" data-unit="dB"
                       data-input-id="spkVol" data-val-id="spkVolVal">
                    <svg class="knob-arc-svg" viewBox="0 0 56 56">
                      <circle class="knob-track-bg" cx="28" cy="28" r="23" />
                      <circle class="knob-track-fill" cx="28" cy="28" r="23" />
                    </svg>
                    <div class="knob-dial-cap"><div class="knob-pointer-needle"></div><div class="knob-center-dimple"></div></div>
                  </div>
                  <div class="knob-readout-badge" id="spkVolVal">-2.0 dB</div>
                  <input type="range" id="spkVol" min="-40" max="6" step="0.5" value="-2" style="display:none;">
                </div>

                <!-- Driver Overdrive Knob -->
                <div class="studio-knob-control" data-param="spkDrive">
                  <div class="knob-label-header"><span class="knob-title">Overdrive</span></div>
                  <div class="knob-interactive-zone" id="knob-spkDrive" role="slider" tabindex="0"
                       aria-label="Driver Distortion" aria-valuemin="0" aria-valuemax="100" aria-valuenow="15"
                       data-min="0" data-max="100" data-step="1" data-default="15" data-unit="%"
                       data-input-id="spkDrive" data-val-id="spkDriveVal">
                    <svg class="knob-arc-svg" viewBox="0 0 56 56">
                      <circle class="knob-track-bg" cx="28" cy="28" r="23" />
                      <circle class="knob-track-fill" cx="28" cy="28" r="23" />
                    </svg>
                    <div class="knob-dial-cap"><div class="knob-pointer-needle"></div><div class="knob-center-dimple"></div></div>
                  </div>
                  <div class="knob-readout-badge" id="spkDriveVal">15 %</div>
                  <input type="range" id="spkDrive" min="0" max="100" step="1" value="15" style="display:none;">
                </div>

                <!-- Low-Pass Cutoff Knob -->
                <div class="studio-knob-control" data-param="spkLP">
                  <div class="knob-label-header"><span class="knob-title">LP Cutoff</span></div>
                  <div class="knob-interactive-zone" id="knob-spkLP" role="slider" tabindex="0"
                       aria-label="Low Pass Filter" aria-valuemin="400" aria-valuemax="18000" aria-valuenow="4500"
                       data-min="400" data-max="18000" data-step="100" data-default="4500" data-unit="Hz"
                       data-input-id="spkLP" data-val-id="spkLPVal">
                    <svg class="knob-arc-svg" viewBox="0 0 56 56">
                      <circle class="knob-track-bg" cx="28" cy="28" r="23" />
                      <circle class="knob-track-fill" cx="28" cy="28" r="23" />
                    </svg>
                    <div class="knob-dial-cap"><div class="knob-pointer-needle"></div><div class="knob-center-dimple"></div></div>
                  </div>
                  <div class="knob-readout-badge" id="spkLPVal">4,500 Hz</div>
                  <input type="range" id="spkLP" min="400" max="18000" step="100" value="4500" style="display:none;">
                </div>

                <!-- Reverb Send Knob -->
                <div class="studio-knob-control" data-param="spkSend">
                  <div class="knob-label-header"><span class="knob-title">Reverb Send</span></div>
                  <div class="knob-interactive-zone" id="knob-spkSend" role="slider" tabindex="0"
                       aria-label="Reverb Send" aria-valuemin="0" aria-valuemax="100" aria-valuenow="80"
                       data-min="0" data-max="100" data-step="1" data-default="80" data-unit="%"
                       data-input-id="spkSend" data-val-id="spkSendVal">
                    <svg class="knob-arc-svg" viewBox="0 0 56 56">
                      <circle class="knob-track-bg" cx="28" cy="28" r="23" />
                      <circle class="knob-track-fill" cx="28" cy="28" r="23" />
                    </svg>
                    <div class="knob-dial-cap"><div class="knob-pointer-needle"></div><div class="knob-center-dimple"></div></div>
                  </div>
                  <div class="knob-readout-badge" id="spkSendVal">80 %</div>
                  <input type="range" id="spkSend" min="0" max="100" step="1" value="80" style="display:none;">
                </div>
              </div>

              <!-- Distance Delay with Auto Sync -->
              <div class="slider-control-group" style="margin-top:8px;">
                <div class="label-row">
                  <span>Physical Distance Delay:</span>
                  <span id="spkDelayVal" class="val-mono">85 ms</span>
                </div>
                <div style="display:flex; gap:8px; align-items:center;">
                  <input type="range" id="spkDelayManual" min="0" max="450" step="1" value="85" style="flex:1;">
                  <button id="btnSyncSpeedOfSound" class="btn-studio-sm" title="Auto calculate physical propagation delay: d / 343 m/s">
                    Auto $d/c$
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <!-- ==================================================================
           TAB 3: CABLE & TRANSMISSION DEGRADATION SIMULATOR
           ================================================================== -->
      <div class="rack-tab-panel" id="tab-cable" role="tabpanel">
        <div class="studio-sub-rack">
          <div class="sub-rack-header">
            <span class="sub-rack-title">Cable Capacitance, Ground Hum &amp; Transmission Emulation</span>
            <div style="display:flex; align-items:center; gap:10px;">
              <button class="btn-studio-toggle active" id="btnToggleCable">
                <input type="checkbox" id="cableEnableToggle" checked style="display:none;">
                <span class="led-diode led-emerald"></span>
                <span id="cableToggleText">ENGAGED</span>
              </button>
              <button id="btnRandomCable" class="btn-studio-sm" title="Randomize Cable Wear">&#x1F3B2; Randomize Cable</button>
            </div>
          </div>
          <div class="sub-rack-body">
            
            <div class="grid-2col" style="margin-bottom:12px;">
              <div class="slider-control-group">
                <div class="label-row"><span>Cable Model &amp; Quality Profile:</span></div>
                <select id="cableProfileSelect" class="studio-select">
                  <option value="cheap_copper">Budget Unshielded 100m Copper (Heavy High-Cut)</option>
                  <option value="weathered_multicore">Weathered Stadium Multicore (Hum + HF Drop)</option>
                  <option value="rusty_pa">Corroded Industrial PA Wiring (Crackle + Saturated)</option>
                  <option value="vintage_coax">Vintage 1970s Coaxial Cable</option>
                  <option value="studio_grade">Pristine Oxygen-Free Studio Mogami</option>
                </select>
              </div>

              <div class="slider-control-group">
                <div class="label-row"><span>AC Mains Hum Frequency:</span></div>
                <select id="paramHumFreq" class="studio-select">
                  <option value="60">60 Hz Mains (US / Canada / Japan)</option>
                  <option value="50">50 Hz Mains (UK / EU / Aus / Asia)</option>
                </select>
              </div>
            </div>

            <!-- Cable Knobs Cluster -->
            <div class="knob-bank-row">
              <!-- Run Distance -->
              <div class="studio-knob-control" data-param="paramCableLength">
                <div class="knob-label-header"><span class="knob-title">Run Distance</span></div>
                <div class="knob-interactive-zone" id="knob-paramCableLength" role="slider" tabindex="0"
                     aria-label="Cable Distance" aria-valuemin="5" aria-valuemax="300" aria-valuenow="85"
                     data-min="5" data-max="300" data-step="5" data-default="85" data-unit="m"
                     data-input-id="paramCableLength" data-val-id="valCableLength">
                  <svg class="knob-arc-svg" viewBox="0 0 56 56">
                    <circle class="knob-track-bg" cx="28" cy="28" r="23" />
                    <circle class="knob-track-fill" cx="28" cy="28" r="23" />
                  </svg>
                  <div class="knob-dial-cap"><div class="knob-pointer-needle"></div><div class="knob-center-dimple"></div></div>
                </div>
                <div class="knob-readout-badge" id="valCableLength">85 m</div>
                <input type="range" id="paramCableLength" min="5" max="300" step="5" value="85" style="display:none;">
              </div>

              <!-- Capacitance Rolloff -->
              <div class="studio-knob-control" data-param="paramCableCapCutoff">
                <div class="knob-label-header"><span class="knob-title">Capacitance Cut</span></div>
                <div class="knob-interactive-zone" id="knob-paramCableCapCutoff" role="slider" tabindex="0"
                     aria-label="Capacitance Cutoff" aria-valuemin="1000" aria-valuemax="18000" aria-valuenow="5200"
                     data-min="1000" data-max="18000" data-step="200" data-default="5200" data-unit="Hz"
                     data-input-id="paramCableCapCutoff" data-val-id="valCableCapCutoff">
                  <svg class="knob-arc-svg" viewBox="0 0 56 56">
                    <circle class="knob-track-bg" cx="28" cy="28" r="23" />
                    <circle class="knob-track-fill" cx="28" cy="28" r="23" />
                  </svg>
                  <div class="knob-dial-cap"><div class="knob-pointer-needle"></div><div class="knob-center-dimple"></div></div>
                </div>
                <div class="knob-readout-badge" id="valCableCapCutoff">5,200 Hz</div>
                <input type="range" id="paramCableCapCutoff" min="1000" max="18000" step="200" value="5200" style="display:none;">
              </div>

              <!-- AC Hum Level -->
              <div class="studio-knob-control" data-param="paramCableHum">
                <div class="knob-label-header"><span class="knob-title">Ground Hum</span></div>
                <div class="knob-interactive-zone" id="knob-paramCableHum" role="slider" tabindex="0"
                     aria-label="AC Ground Hum" aria-valuemin="0" aria-valuemax="60" aria-valuenow="12"
                     data-min="0" data-max="60" data-step="1" data-default="12" data-unit="%"
                     data-input-id="paramCableHum" data-val-id="valCableHum">
                  <svg class="knob-arc-svg" viewBox="0 0 56 56">
                    <circle class="knob-track-bg" cx="28" cy="28" r="23" />
                    <circle class="knob-track-fill" cx="28" cy="28" r="23" />
                  </svg>
                  <div class="knob-dial-cap"><div class="knob-pointer-needle"></div><div class="knob-center-dimple"></div></div>
                </div>
                <div class="knob-readout-badge" id="valCableHum">12 %</div>
                <input type="range" id="paramCableHum" min="0" max="60" step="1" value="12" style="display:none;">
              </div>

              <!-- Static Crackle -->
              <div class="studio-knob-control" data-param="paramCableCrackle">
                <div class="knob-label-header"><span class="knob-title">Contact Static</span></div>
                <div class="knob-interactive-zone" id="knob-paramCableCrackle" role="slider" tabindex="0"
                     aria-label="Static Crackle" aria-valuemin="0" aria-valuemax="75" aria-valuenow="15"
                     data-min="0" data-max="75" data-step="1" data-default="15" data-unit="%"
                     data-input-id="paramCableCrackle" data-val-id="valCableCrackle">
                  <svg class="knob-arc-svg" viewBox="0 0 56 56">
                    <circle class="knob-track-bg" cx="28" cy="28" r="23" />
                    <circle class="knob-track-fill" cx="28" cy="28" r="23" />
                  </svg>
                  <div class="knob-dial-cap"><div class="knob-pointer-needle"></div><div class="knob-center-dimple"></div></div>
                </div>
                <div class="knob-readout-badge" id="valCableCrackle">15 %</div>
                <input type="range" id="paramCableCrackle" min="0" max="75" step="1" value="15" style="display:none;">
              </div>

              <!-- Transformer Saturation -->
              <div class="studio-knob-control" data-param="paramCableSlew">
                <div class="knob-label-header"><span class="knob-title">Core Slew</span></div>
                <div class="knob-interactive-zone" id="knob-paramCableSlew" role="slider" tabindex="0"
                     aria-label="Transformer Slew" aria-valuemin="0" aria-valuemax="100" aria-valuenow="20"
                     data-min="0" data-max="100" data-step="1" data-default="20" data-unit="%"
                     data-input-id="paramCableSlew" data-val-id="valCableSlew">
                  <svg class="knob-arc-svg" viewBox="0 0 56 56">
                    <circle class="knob-track-bg" cx="28" cy="28" r="23" />
                    <circle class="knob-track-fill" cx="28" cy="28" r="23" />
                  </svg>
                  <div class="knob-dial-cap"><div class="knob-pointer-needle"></div><div class="knob-center-dimple"></div></div>
                </div>
                <div class="knob-readout-badge" id="valCableSlew">20 %</div>
                <input type="range" id="paramCableSlew" min="0" max="100" step="1" value="20" style="display:none;">
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- ==================================================================
           TAB 4: MASTER FX, LIMITER & SPATIAL DYNAMICS
           ================================================================== -->
      <div class="rack-tab-panel" id="tab-master" role="tabpanel">
        <div class="module-grid-layout">
          
          <!-- Sub-module 1: Reverb Balance & Spatial Width -->
          <div class="studio-sub-rack">
            <div class="sub-rack-header">
              <span class="sub-rack-title">Master Reverb Blend &amp; Stereo Width</span>
            </div>
            <div class="sub-rack-body">
              <div class="knob-bank-row">
                <!-- Wet Level -->
                <div class="studio-knob-control" data-param="paramWetLevel">
                  <div class="knob-label-header"><span class="knob-title">Reverb Wet</span></div>
                  <div class="knob-interactive-zone" id="knob-paramWetLevel" role="slider" tabindex="0"
                       aria-label="Reverb Wet" aria-valuemin="0" aria-valuemax="100" aria-valuenow="85"
                       data-min="0" data-max="100" data-step="1" data-default="85" data-unit="%"
                       data-input-id="paramWetLevel" data-val-id="valWetLevel">
                    <svg class="knob-arc-svg" viewBox="0 0 56 56">
                      <circle class="knob-track-bg" cx="28" cy="28" r="23" />
                      <circle class="knob-track-fill" cx="28" cy="28" r="23" />
                    </svg>
                    <div class="knob-dial-cap"><div class="knob-pointer-needle"></div><div class="knob-center-dimple"></div></div>
                  </div>
                  <div class="knob-readout-badge" id="valWetLevel">85 %</div>
                  <input type="range" id="paramWetLevel" min="0" max="100" step="1" value="85" style="display:none;">
                </div>

                <!-- Dry Level -->
                <div class="studio-knob-control" data-param="paramDryLevel">
                  <div class="knob-label-header"><span class="knob-title">Direct Dry</span></div>
                  <div class="knob-interactive-zone" id="knob-paramDryLevel" role="slider" tabindex="0"
                       aria-label="Direct Dry" aria-valuemin="0" aria-valuemax="100" aria-valuenow="45"
                       data-min="0" data-max="100" data-step="1" data-default="45" data-unit="%"
                       data-input-id="paramDryLevel" data-val-id="valDryLevel">
                    <svg class="knob-arc-svg" viewBox="0 0 56 56">
                      <circle class="knob-track-bg" cx="28" cy="28" r="23" />
                      <circle class="knob-track-fill" cx="28" cy="28" r="23" />
                    </svg>
                    <div class="knob-dial-cap"><div class="knob-pointer-needle"></div><div class="knob-center-dimple"></div></div>
                  </div>
                  <div class="knob-readout-badge" id="valDryLevel">45 %</div>
                  <input type="range" id="paramDryLevel" min="0" max="100" step="1" value="45" style="display:none;">
                </div>

                <!-- Stereo Width -->
                <div class="studio-knob-control" data-param="paramStereoWidth">
                  <div class="knob-label-header"><span class="knob-title">Acoustic Width</span></div>
                  <div class="knob-interactive-zone" id="knob-paramStereoWidth" role="slider" tabindex="0"
                       aria-label="Stereo Width" aria-valuemin="0" aria-valuemax="200" aria-valuenow="130"
                       data-min="0" data-max="200" data-step="5" data-default="130" data-unit="%"
                       data-input-id="paramStereoWidth" data-val-id="valStereoWidth">
                    <svg class="knob-arc-svg" viewBox="0 0 56 56">
                      <circle class="knob-track-bg" cx="28" cy="28" r="23" />
                      <circle class="knob-track-fill" cx="28" cy="28" r="23" />
                    </svg>
                    <div class="knob-dial-cap"><div class="knob-pointer-needle"></div><div class="knob-center-dimple"></div></div>
                  </div>
                  <div class="knob-readout-badge" id="valStereoWidth">130 %</div>
                  <input type="range" id="paramStereoWidth" min="0" max="200" step="5" value="130" style="display:none;">
                </div>
              </div>
            </div>
          </div>

          <!-- Sub-module 2: 3-Band Parametric EQ & Master Output Gain -->
          <div class="studio-sub-rack">
            <div class="sub-rack-header">
              <span class="sub-rack-title">Master Parametric EQ &amp; Final Gain Stage</span>
            </div>
            <div class="sub-rack-body">
              <div class="knob-bank-row">
                <!-- Low EQ -->
                <div class="studio-knob-control" data-param="paramEQLow">
                  <div class="knob-label-header"><span class="knob-title">Low Shelf</span></div>
                  <div class="knob-interactive-zone" id="knob-paramEQLow" role="slider" tabindex="0"
                       aria-label="Low Shelf EQ" aria-valuemin="-12" aria-valuemax="12" aria-valuenow="1.5"
                       data-min="-12" data-max="12" data-step="0.5" data-default="1.5" data-unit="dB"
                       data-input-id="paramEQLow" data-val-id="valEQLow">
                    <svg class="knob-arc-svg" viewBox="0 0 56 56">
                      <circle class="knob-track-bg" cx="28" cy="28" r="23" />
                      <circle class="knob-track-fill" cx="28" cy="28" r="23" />
                    </svg>
                    <div class="knob-dial-cap"><div class="knob-pointer-needle"></div><div class="knob-center-dimple"></div></div>
                  </div>
                  <div class="knob-readout-badge" id="valEQLow">+1.5 dB</div>
                  <input type="range" id="paramEQLow" min="-12" max="12" step="0.5" value="1.5" style="display:none;">
                </div>

                <!-- Mid EQ -->
                <div class="studio-knob-control" data-param="paramEQMid">
                  <div class="knob-label-header"><span class="knob-title">Mid Peak</span></div>
                  <div class="knob-interactive-zone" id="knob-paramEQMid" role="slider" tabindex="0"
                       aria-label="Mid Peak EQ" aria-valuemin="-12" aria-valuemax="12" aria-valuenow="-2.0"
                       data-min="-12" data-max="12" data-step="0.5" data-default="-2.0" data-unit="dB"
                       data-input-id="paramEQMid" data-val-id="valEQMid">
                    <svg class="knob-arc-svg" viewBox="0 0 56 56">
                      <circle class="knob-track-bg" cx="28" cy="28" r="23" />
                      <circle class="knob-track-fill" cx="28" cy="28" r="23" />
                    </svg>
                    <div class="knob-dial-cap"><div class="knob-pointer-needle"></div><div class="knob-center-dimple"></div></div>
                  </div>
                  <div class="knob-readout-badge" id="valEQMid">-2.0 dB</div>
                  <input type="range" id="paramEQMid" min="-12" max="12" step="0.5" value="-2" style="display:none;">
                </div>

                <!-- High EQ -->
                <div class="studio-knob-control" data-param="paramEQHigh">
                  <div class="knob-label-header"><span class="knob-title">High Shelf</span></div>
                  <div class="knob-interactive-zone" id="knob-paramEQHigh" role="slider" tabindex="0"
                       aria-label="High Shelf EQ" aria-valuemin="-12" aria-valuemax="12" aria-valuenow="-1.0"
                       data-min="-12" data-max="12" data-step="0.5" data-default="-1.0" data-unit="dB"
                       data-input-id="paramEQHigh" data-val-id="valEQHigh">
                    <svg class="knob-arc-svg" viewBox="0 0 56 56">
                      <circle class="knob-track-bg" cx="28" cy="28" r="23" />
                      <circle class="knob-track-fill" cx="28" cy="28" r="23" />
                    </svg>
                    <div class="knob-dial-cap"><div class="knob-pointer-needle"></div><div class="knob-center-dimple"></div></div>
                  </div>
                  <div class="knob-readout-badge" id="valEQHigh">-1.0 dB</div>
                  <input type="range" id="paramEQHigh" min="-12" max="12" step="0.5" value="-1" style="display:none;">
                </div>

                <!-- Master Gain -->
                <div class="studio-knob-control" data-param="paramMasterGain">
                  <div class="knob-label-header"><span class="knob-title">Master Out</span></div>
                  <div class="knob-interactive-zone" id="knob-paramMasterGain" role="slider" tabindex="0"
                       aria-label="Master Output Gain" aria-valuemin="-24" aria-valuemax="6" aria-valuenow="0"
                       data-min="-24" data-max="6" data-step="0.5" data-default="0" data-unit="dB"
                       data-input-id="paramMasterGain" data-val-id="valMasterGain">
                    <svg class="knob-arc-svg" viewBox="0 0 56 56">
                      <circle class="knob-track-bg" cx="28" cy="28" r="23" />
                      <circle class="knob-track-fill" cx="28" cy="28" r="23" />
                    </svg>
                    <div class="knob-dial-cap"><div class="knob-pointer-needle"></div><div class="knob-center-dimple"></div></div>
                  </div>
                  <div class="knob-readout-badge" id="valMasterGain">0.0 dB</div>
                  <input type="range" id="paramMasterGain" min="-24" max="6" step="0.5" value="0" style="display:none;">
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>

</div>
```

---

## 4. Keyboard Shortcuts HUD Modal Specification

A dedicated studio overlay displays all hotkeys clearly formatted as keycaps:

```html
<!-- Keyboard Shortcuts HUD Modal -->
<div class="modal-backdrop" id="hudModal">
  <div class="modal-card hud-modal-card">
    <div class="modal-header">
      <div class="panel-title">&#x2328; WORKSTATION KEYBOARD SHORTCUTS (DAW HUD)</div>
      <button id="btnCloseHudModal" class="btn-studio-sm">&times;</button>
    </div>
    <div class="modal-body hud-grid">
      <div class="hud-category">
        <h3>TRANSPORT &amp; PLAYBACK</h3>
        <div class="hud-row"><kbd>SPACE</kbd><span>Play / Pause Toggle</span></div>
        <div class="hud-row"><kbd>ESC</kbd> / <kbd>S</kbd><span>Stop &amp; Return Playhead to 0</span></div>
        <div class="hud-row"><kbd>L</kbd><span>Toggle Seamless Looping</span></div>
        <div class="hud-row"><kbd>M</kbd><span>Mute Master Output / Speaker</span></div>
        <div class="hud-row"><kbd>A</kbd><span>A/B Compare Direct vs Reverb</span></div>
        <div class="hud-row"><kbd>E</kbd><span>Open Audio Export Modal</span></div>
      </div>

      <div class="hud-category">
        <h3>CHAOS &amp; PRESET NAVIGATION</h3>
        <div class="hud-row"><kbd>R</kbd><span>Randomize All Parameters (Chaos Engine)</span></div>
        <div class="hud-row"><kbd>1</kbd><span>Grand Gothic Cathedral (RT60: 7.8s)</span></div>
        <div class="hud-row"><kbd>2</kbd><span>Boeing 747 Aircraft Hangar (RT60: 5.4s)</span></div>
        <div class="hud-row"><kbd>3</kbd><span>Underground Cavern (RT60: 9.2s)</span></div>
        <div class="hud-row"><kbd>4</kbd><span>Sports Stadium Arena (RT60: 4.2s)</span></div>
        <div class="hud-row"><kbd>5</kbd><span>Multi-Story Parking Deck (RT60: 3.5s)</span></div>
        <div class="hud-row"><kbd>6</kbd>–<kbd>8</kbd><span>Warehouse / Gym / Cooling Tower</span></div>
      </div>

      <div class="hud-category">
        <h3>MODULAR TABS &amp; INSPECTOR</h3>
        <div class="hud-row"><kbd>Alt</kbd>+<kbd>1</kbd><span>Structure Acoustics Tab</span></div>
        <div class="hud-row"><kbd>Alt</kbd>+<kbd>2</kbd><span>Speaker Array Matrix Tab</span></div>
        <div class="hud-row"><kbd>Alt</kbd>+<kbd>3</kbd><span>Cable &amp; Transmission Tab</span></div>
        <div class="hud-row"><kbd>Alt</kbd>+<kbd>4</kbd><span>Master FX &amp; Limiter Tab</span></div>
        <div class="hud-row"><kbd>?</kbd> / <kbd>H</kbd><span>Toggle This HUD Shortcuts Overlay</span></div>
      </div>

      <div class="hud-category">
        <h3>TACTILE ROTARY KNOB ERGONOMICS</h3>
        <div class="hud-row"><kbd>Drag Up/Down</kbd><span>Smooth Parameter Value Adjustment</span></div>
        <div class="hud-row"><kbd>Shift</kbd>+<kbd>Drag</kbd><span>$5\times$ Fine-Grained Precision Tuning</span></div>
        <div class="hud-row"><kbd>Double-Click</kbd><span>Reset Knob to Factory Default Value</span></div>
        <div class="hud-row"><kbd>&uarr;</kbd> / <kbd>&darr;</kbd><span>Step Selected Parameter Up/Down</span></div>
        <div class="hud-row"><kbd>Mouse Wheel</kbd><span>Increment / Decrement Value</span></div>
      </div>
    </div>
    <div class="modal-footer">
      <span class="tip-text">Press <kbd>ESC</kbd> or <kbd>?</kbd> anytime to dismiss this HUD</span>
      <button id="btnDismissHudModal" class="btn-studio">Close HUD</button>
    </div>
  </div>
</div>
```

---

## 5. Event Handling Logic (Pure JavaScript ES2022)

### 5.1. Rotary Knob Controller (`RotaryKnobManager`)

```javascript
/* ==========================================================================
   ROTARY KNOB MANAGER (TACTILE POINTER-CAPTURE STUDIO CONTROLS)
   ========================================================================== */
class RotaryKnobManager {
  constructor() {
    this.knobs = new Map();
    this.activeDrag = null;
  }

  init() {
    document.querySelectorAll('.knob-interactive-zone').forEach(el => {
      this.attachKnob(el);
    });

    // Global keyboard listener for focused knobs
    window.addEventListener('keydown', (e) => this.handleKeyDown(e));
  }

  attachKnob(el) {
    const id = el.id;
    const min = parseFloat(el.dataset.min);
    const max = parseFloat(el.dataset.max);
    const step = parseFloat(el.dataset.step) || 1;
    const def = parseFloat(el.dataset.default) ?? min;
    const unit = el.dataset.unit || '';
    const inputId = el.dataset.inputId;
    const valId = el.dataset.valId;

    const state = {
      el,
      min,
      max,
      step,
      default: def,
      unit,
      inputId,
      valId,
      value: parseFloat(el.getAttribute('aria-valuenow')) || def,
      normalized: 0
    };

    state.normalized = (state.value - min) / (max - min);
    this.updateVisuals(state);
    this.knobs.set(id, state);

    // Pointer Events (Mouse, Stylus, Touch)
    el.addEventListener('pointerdown', (e) => this.onPointerDown(e, state));
    el.addEventListener('pointermove', (e) => this.onPointerMove(e, state));
    el.addEventListener('pointerup', (e) => this.onPointerUp(e, state));
    el.addEventListener('pointercancel', (e) => this.onPointerUp(e, state));

    // Double-Click to Reset
    el.addEventListener('dblclick', (e) => {
      e.preventDefault();
      this.setValue(state, state.default, true);
    });

    // Mouse Wheel Adjustment
    el.addEventListener('wheel', (e) => {
      e.preventDefault();
      const direction = e.deltaY < 0 ? 1 : -1;
      const multiplier = e.shiftKey ? 0.2 : 1.0;
      const delta = direction * state.step * multiplier;
      this.setValue(state, state.value + delta, true);
    }, { passive: false });
  }

  onPointerDown(e, state) {
    if (e.button !== 0 && e.pointerType === 'mouse') return; // Left click only
    state.el.setPointerCapture(e.pointerId);
    state.el.focus();

    this.activeDrag = {
      pointerId: e.pointerId,
      state,
      startY: e.clientY,
      startVal: state.value
    };
  }

  onPointerMove(e, state) {
    if (!this.activeDrag || this.activeDrag.pointerId !== e.pointerId) return;

    const deltaY = this.activeDrag.startY - e.clientY; // Moving UP increases value
    const range = state.max - state.min;
    
    // Sensitivity: 160px for full sweep; Shift key gives 5x fine precision
    const sweepPixels = e.shiftKey ? 800 : 160;
    const deltaVal = (deltaY / sweepPixels) * range;

    const targetVal = this.activeDrag.startVal + deltaVal;
    this.setValue(state, targetVal, true);
  }

  onPointerUp(e, state) {
    if (this.activeDrag && this.activeDrag.pointerId === e.pointerId) {
      try {
        state.el.releasePointerCapture(e.pointerId);
      } catch (err) {}
      this.activeDrag = null;

      // Dispatch 'change' event on linked input for commit actions (e.g. IR re-synthesis)
      if (state.inputId) {
        const input = document.getElementById(state.inputId);
        if (input) {
          input.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    }
  }

  setValue(state, rawVal, dispatchEvents = true) {
    // Clamp within min/max
    let clamped = Math.max(state.min, Math.min(state.max, rawVal));
    
    // Round to step precision
    const stepsCount = Math.round((clamped - state.min) / state.step);
    clamped = state.min + stepsCount * state.step;
    
    // Fix floating point precision artifacts
    const decimals = (state.step.toString().split('.')[1] || '').length;
    clamped = parseFloat(clamped.toFixed(decimals));

    state.value = clamped;
    state.normalized = (clamped - state.min) / (state.max - state.min);

    this.updateVisuals(state);

    // Sync with linked hidden slider input & dispatch 'input' event
    if (state.inputId) {
      const input = document.getElementById(state.inputId);
      if (input && parseFloat(input.value) !== clamped) {
        input.value = clamped;
        if (dispatchEvents) {
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
    }
  }

  updateVisuals(state) {
    state.el.setAttribute('aria-valuenow', state.value);
    state.el.style.setProperty('--knob-normalized', state.normalized);

    // Format text representation
    let formattedText = `${state.value} ${state.unit}`.trim();
    if (state.unit === 'Hz') {
      formattedText = `${Math.round(state.value).toLocaleString()} Hz`;
    } else if (state.unit === 'dB') {
      formattedText = `${state.value >= 0 ? '+' : ''}${state.value.toFixed(1)} dB`;
    } else if (state.unit === 's') {
      formattedText = `${state.value.toFixed(1)} s`;
    } else if (state.unit === 'x') {
      formattedText = `${state.value.toFixed(1)} x`;
    } else if (state.unit === '%') {
      formattedText = `${Math.round(state.value)} %`;
    } else if (state.unit === 'ms') {
      formattedText = `${Math.round(state.value)} ms`;
    } else if (state.unit === 'm') {
      formattedText = `${Math.round(state.value)} m`;
    }

    if (state.valId) {
      const label = document.getElementById(state.valId);
      if (label) label.textContent = formattedText;
    }
  }

  syncAll() {
    this.knobs.forEach(state => {
      if (state.inputId) {
        const input = document.getElementById(state.inputId);
        if (input) {
          const val = parseFloat(input.value);
          if (!isNaN(val) && val !== state.value) {
            this.setValue(state, val, false);
          }
        }
      }
    });
  }

  syncOne(knobId) {
    const state = this.knobs.get(knobId);
    if (state && state.inputId) {
      const input = document.getElementById(state.inputId);
      if (input) {
        this.setValue(state, parseFloat(input.value), false);
      }
    }
  }

  handleKeyDown(e) {
    const activeEl = document.activeElement;
    if (!activeEl || !activeEl.classList.contains('knob-interactive-zone')) return;

    const state = this.knobs.get(activeEl.id);
    if (!state) return;

    let delta = 0;
    if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
      delta = state.step;
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
      delta = -state.step;
    } else if (e.key === 'PageUp') {
      delta = state.step * 10;
    } else if (e.key === 'PageDown') {
      delta = -state.step * 10;
    } else if (e.key === 'Home') {
      this.setValue(state, state.min, true);
      e.preventDefault();
      return;
    } else if (e.key === 'End') {
      this.setValue(state, state.max, true);
      e.preventDefault();
      return;
    }

    if (delta !== 0) {
      e.preventDefault();
      const mult = e.shiftKey ? 0.2 : 1.0;
      this.setValue(state, state.value + delta * mult, true);
      
      // Dispatch change on commit
      if (state.inputId) {
        const input = document.getElementById(state.inputId);
        if (input) input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  }
}
```

---

### 5.2. Modular Tab Rack Controller (`TabRackManager`)

```javascript
/* ==========================================================================
   MODULAR TAB RACK MANAGER
   ========================================================================== */
class TabRackManager {
  constructor() {
    this.tabs = [];
    this.activeTabId = 'tab-acoustics';
  }

  init() {
    const tabBtns = document.querySelectorAll('.rack-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.switchTab(btn.dataset.tab);
      });
    });
  }

  switchTab(tabPanelId) {
    this.activeTabId = tabPanelId;

    // Update Tab Buttons
    document.querySelectorAll('.rack-tab-btn').forEach(btn => {
      const isActive = btn.dataset.tab === tabPanelId;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Update Tab Panels
    document.querySelectorAll('.rack-tab-panel').forEach(panel => {
      const isMatch = panel.id === tabPanelId;
      panel.classList.toggle('active', isMatch);
    });

    // Notify Knobs to Re-align / Re-sync
    if (window.rotaryKnobManager) {
      window.rotaryKnobManager.syncAll();
    }
  }

  switchToIndex(index) {
    const tabNames = ['tab-acoustics', 'tab-speakers', 'tab-cable', 'tab-master'];
    if (tabNames[index]) {
      this.switchTab(tabNames[index]);
    }
  }
}
```

---

### 5.3. Global DAW Keyboard Shortcuts Dispatcher

```javascript
/* ==========================================================================
   GLOBAL KEYBOARD SHORTCUTS DISPATCHER
   ========================================================================== */
function setupGlobalKeyboardShortcuts() {
  window.addEventListener('keydown', (e) => {
    // Ignore keystrokes when typing inside text or number inputs
    if (e.target.tagName === 'INPUT' && (e.target.type === 'text' || e.target.type === 'number')) {
      return;
    }

    // Modal dismiss with Escape
    if (e.key === 'Escape') {
      const hudModal = document.getElementById('hudModal');
      if (hudModal && hudModal.classList.contains('open')) {
        hudModal.classList.remove('open');
        return;
      }
      const exportModal = document.getElementById('exportModal');
      if (exportModal && exportModal.classList.contains('open')) {
        exportModal.classList.remove('open');
        return;
      }
      // Otherwise, Escape acts as Stop
      stopAudio();
      return;
    }

    // Tab switching hotkeys: Alt + 1-4
    if (e.altKey && !e.ctrlKey && !e.metaKey) {
      if (e.key === '1') { e.preventDefault(); window.tabRackManager?.switchToIndex(0); return; }
      if (e.key === '2') { e.preventDefault(); window.tabRackManager?.switchToIndex(1); return; }
      if (e.key === '3') { e.preventDefault(); window.tabRackManager?.switchToIndex(2); return; }
      if (e.key === '4') { e.preventDefault(); window.tabRackManager?.switchToIndex(3); return; }
    }

    // Spacebar: Play / Pause
    if (e.code === 'Space') {
      e.preventDefault();
      togglePlayPause();
      return;
    }

    // S: Stop & Rewind
    if (e.code === 'KeyS' && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      stopAudio();
      return;
    }

    // L: Toggle Loop
    if (e.code === 'KeyL' && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      document.getElementById('btnLoop').click();
      return;
    }

    // R: Chaos Engine (Randomize All)
    if (e.code === 'KeyR' && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      randomizeAll();
      return;
    }

    // M: Master Mute Toggle
    if (e.code === 'KeyM' && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      toggleMasterMute();
      return;
    }

    // A: A/B Compare Direct vs Reverb
    if (e.code === 'KeyA' && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      document.getElementById('btnABCompare').click();
      return;
    }

    // E: Open Export Audio Modal
    if (e.code === 'KeyE' && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      document.getElementById('btnOpenExportModal').click();
      return;
    }

    // ? or H: Toggle HUD Modal
    if ((e.key === '?' || e.code === 'KeyH') && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      toggleHudModal();
      return;
    }

    // Numeric Keys 1-9: Architectural Presets
    if (/^[1-9]$/.test(e.key) && !e.altKey && !e.ctrlKey && !e.metaKey) {
      const presetKeys = [
        'cathedral', 'hangar', 'cavern', 'stadium', 
        'parking', 'warehouse', 'gymnasium', 'cooling_tower', 'custom'
      ];
      const idx = parseInt(e.key) - 1;
      const targetPreset = presetKeys[idx];
      if (targetPreset) {
        e.preventDefault();
        const select = document.getElementById('presetSelect');
        if (select) {
          select.value = targetPreset;
          applyStructurePreset(targetPreset);
          // Show momentary toast or feedback
          flashPresetIndicator(select.options[select.selectedIndex].text);
        }
      }
    }
  });
}
```

---

## 6. Mobile & Tablet Responsive Layout Rules

```css
/* ==========================================================================
   MOBILE & TABLET RESPONSIVE ERGONOMICS
   ========================================================================== */

/* Laptop / Medium Desktop */
@media (max-width: 1280px) {
  .studio-visual-stage {
    grid-template-columns: 1fr 1fr;
  }
  .knob-bank-row {
    flex-wrap: wrap;
    justify-content: center;
  }
}

/* Tablet (Portrait & Landscape: 768px - 1024px) */
@media (max-width: 1024px) {
  .studio-visual-stage {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .visual-panel {
    min-height: 260px;
  }

  .rack-tab-strip {
    overflow-x: auto;
    white-space: nowrap;
    scrollbar-width: none; /* Hide scrollbar for clean strip */
  }

  .rack-tab-strip::-webkit-scrollbar {
    display: none;
  }

  .rack-tab-btn {
    padding: 10px 14px;
    font-size: 11px;
  }

  .knob-interactive-zone {
    width: 56px; /* Larger touch target for fingers */
    height: 56px;
  }
}

/* Mobile Handhelds (< 768px) */
@media (max-width: 767px) {
  header.studio-top-header {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
    padding: 8px 12px;
  }

  .brand-metadata {
    display: none; /* Conserve vertical space */
  }

  .header-action-hub {
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .studio-transport-deck {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }

  .transport-button-cluster, .transport-source-cluster {
    justify-content: center;
  }

  .arena-container {
    aspect-ratio: 4 / 3;
    min-height: 220px;
  }

  .module-grid-layout {
    grid-template-columns: 1fr;
  }

  .knob-bank-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }

  .studio-knob-control {
    min-width: 0;
  }
}
```

---

## 7. Integration & Concurrency Checklist

- [x] Pure CSS3 with zero external fonts or stylesheets (`@import`, `fonts.googleapis.com` strictly forbidden).
- [x] Tactile rotary knobs with vertical drag sensitivity, Shift-drag fine precision ($5\times$), double-click default reset, and mouse wheel increments.
- [x] Illuminated latching switches with colored LED diodes (Cyan, Amber, Emerald, Ruby) and realistic optical bloom.
- [x] Clean modular layout: Split-screen visual stage (Arena Radar + Master FFT Spectrum / Vectorscope side-by-side) and 4-module tabbed inspector rack.
- [x] Full single-key DAW keyboard navigation (`Space`, `Esc`/`S`, `L`, `R`, `M`, `A`, `E`, `1`–`9`, `?`).
- [x] Keyboard Shortcuts HUD modal for immediate user ergonomics orientation.
- [x] Responsive layout covering Desktop ($>1200\text{px}$), Tablet ($768\text{px}-1024\text{px}$), and Mobile ($<768\text{px}$).
- [x] 100% two-way data-binding with existing Web Audio DSP graph, offline exporter, and Chaos Engine.
