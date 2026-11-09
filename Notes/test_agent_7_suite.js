// Comprehensive Verification Suite for Agent 7 Audio Import/Export Engine
const fs = require('fs');

console.log("=== Agent 7: High-Speed Audio Export & File Format Specialist Verification Suite ===");

// 1. Inspect index.html contents
const html = fs.readFileSync('index.html', 'utf8');

// Check demo sound options
const demoSounds = [
  'pa_announcement',
  'stadium_siren',
  'drum_loop',
  'snare_clap',
  'guitar_arpeggio',
  'clean_vocal',
  'impulse_click'
];
console.log("\n1. Verifying Built-in Synthetic Test Library Options in HTML:");
demoSounds.forEach(sound => {
  const present = html.includes(`value="${sound}"`);
  console.log(`   - ${sound}: ${present ? 'PASSED' : 'FAILED'}`);
  if (!present) process.exit(1);
});

// Check file upload extensions
console.log("\n2. Verifying Drag-and-Drop / File Uploader Support in HTML:");
const exts = ['wav', 'mp3', 'ogg', 'flac', 'aac', 'm4a', 'webm', 'aiff'];
exts.forEach(ext => {
  const present = html.toLowerCase().includes(`.${ext}`);
  console.log(`   - .${ext.toUpperCase()}: ${present ? 'PASSED' : 'FAILED'}`);
  if (!present) process.exit(1);
});

// Check IR Export buttons
console.log("\n3. Verifying 'Export Impulse Response Only' Buttons in HTML:");
const hasDirectIRBtn = html.includes('id="btnExportIRDirect"');
const hasModalIRBtn = html.includes('id="btnExportIROnly"');
const hasFormatIR = html.includes('value="ir_wav"');
console.log(`   - Direct IR Button (#btnExportIRDirect): ${hasDirectIRBtn ? 'PASSED' : 'FAILED'}`);
console.log(`   - Modal IR Button (#btnExportIROnly): ${hasModalIRBtn ? 'PASSED' : 'FAILED'}`);
console.log(`   - Format Select Option (ir_wav): ${hasFormatIR ? 'PASSED' : 'FAILED'}`);
if (!hasDirectIRBtn || !hasModalIRBtn || !hasFormatIR) process.exit(1);

// Check Tail Padding up to +20s
console.log("\n4. Verifying Decay Tail Padding up to +20s in HTML:");
const hasTail20 = html.includes('max="20"');
console.log(`   - paramTailPadding max="20": ${hasTail20 ? 'PASSED' : 'FAILED'}`);
if (!hasTail20) process.exit(1);

// Check Live Mic Pulse & Stream
console.log("\n5. Verifying Live Mic Monitoring & Pulse in HTML:");
const hasMicPulse = html.includes('mic-live-pulse') && html.includes('pulse-live-mic');
const hasMediaStreamSource = html.includes('createMediaStreamSource');
console.log(`   - Mic Live Pulse CSS/Class: ${hasMicPulse ? 'PASSED' : 'FAILED'}`);
console.log(`   - MediaStreamSource Routing: ${hasMediaStreamSource ? 'PASSED' : 'FAILED'}`);
if (!hasMicPulse || !hasMediaStreamSource) process.exit(1);

// 6. Test WAV Encoder Output Data Integrity
console.log("\n6. Testing Pure JS Lossless WAV Exporter (16-bit, 24-bit, 32-bit Float):");

function mockBuffer(numChannels, length, sampleRate) {
  const channels = [];
  for (let c = 0; c < numChannels; c++) channels.push(new Float32Array(length));
  return {
    numberOfChannels: numChannels,
    length,
    sampleRate,
    duration: length / sampleRate,
    getChannelData(c) { return channels[c]; }
  };
}

// Extract encodeWavBlob function from index.html script tag
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
const fnWav = new Function('audioBuffer', 'bitDepth', 'Blob', `
  ${scriptMatch[1].match(/function encodeWavBlob[\s\S]*?\n    \}/)[0]}
  return encodeWavBlob(audioBuffer, bitDepth);
`);

const MockBlob = class {
  constructor(parts, options) {
    this.buffer = Buffer.from(parts[0]);
    this.type = options.type;
    this.size = this.buffer.length;
  }
};

const testBuffer = mockBuffer(2, 48000, 48000);
const c0 = testBuffer.getChannelData(0);
const c1 = testBuffer.getChannelData(1);
for (let i = 0; i < 48000; i++) {
  c0[i] = Math.sin(2 * Math.PI * 440 * (i / 48000)) * 0.75;
  c1[i] = Math.cos(2 * Math.PI * 440 * (i / 48000)) * 0.75;
}

[16, 24, 32].forEach(bitDepth => {
  const blob = fnWav(testBuffer, bitDepth, MockBlob);
  const buf = blob.buffer;
  const riff = buf.toString('ascii', 0, 4);
  const wave = buf.toString('ascii', 8, 12);
  const fmt = buf.toString('ascii', 12, 16);
  const audioFormat = buf.readUInt16LE(20);
  const numCh = buf.readUInt16LE(22);
  const sr = buf.readUInt32LE(24);
  const bits = buf.readUInt16LE(34);
  const dataTag = buf.toString('ascii', 36, 40);
  const dataSize = buf.readUInt32LE(40);

  const expectedDataSize = 48000 * 2 * (bitDepth / 8);
  const expectedFormatCode = (bitDepth === 32 ? 3 : 1);

  const ok = (riff === 'RIFF' && wave === 'WAVE' && fmt === 'fmt ' &&
              audioFormat === expectedFormatCode && numCh === 2 && sr === 48000 &&
              bits === bitDepth && dataTag === 'data' && dataSize === expectedDataSize &&
              buf.length === 44 + expectedDataSize);

  console.log(`   - WAV ${bitDepth}-bit: ${ok ? 'PASSED' : 'FAILED'} (Format Code: ${audioFormat}, Data Size: ${dataSize} bytes, Total Size: ${buf.length} bytes)`);
  if (!ok) process.exit(1);
});

console.log("\n=== ALL AGENT 7 VERIFICATION CHECKS PASSED PERFECTLY! ===");
