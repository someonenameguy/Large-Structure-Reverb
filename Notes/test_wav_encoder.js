// Test script for procedural generators and WAV encoding
const fs = require('fs');

function mockAudioBuffer(numChannels, length, sampleRate) {
  const channels = [];
  for (let c = 0; c < numChannels; c++) {
    channels.push(new Float32Array(length));
  }
  return {
    numberOfChannels: numChannels,
    length: length,
    sampleRate: sampleRate,
    duration: length / sampleRate,
    getChannelData(c) { return channels[c]; }
  };
}

// Pure JavaScript Lossless WAV Chunk Encoder (16-bit, 24-bit studio PCM, 32-bit float)
function encodeWavArrayBuffer(audioBuffer, bitDepth = 16) {
  const numChannels = audioBuffer.numberOfChannels;
  const sampleRate = audioBuffer.sampleRate;
  const numSamples = audioBuffer.length;
  const bytesPerSample = bitDepth / 8;
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = numSamples * blockAlign;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  function writeString(offset, str) {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  }

  // RIFF Header
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(8, 'WAVE');

  // fmt sub-chunk
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true); // subchunk1size (16 for PCM / IEEE Float standard)
  view.setUint16(20, bitDepth === 32 ? 3 : 1, true); // 1 = PCM, 3 = IEEE Float
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitDepth, true);

  // data sub-chunk
  writeString(36, 'data');
  view.setUint32(40, dataSize, true);

  // Write interleaved sample channels
  let offset = 44;
  const chL = audioBuffer.getChannelData(0);
  const chR = numChannels > 1 ? audioBuffer.getChannelData(1) : chL;

  if (bitDepth === 16) {
    for (let i = 0; i < numSamples; i++) {
      let sL = Math.max(-1, Math.min(1, chL[i]));
      let valL = Math.round(sL < 0 ? sL * 32768 : sL * 32767);
      view.setInt16(offset, valL, true);
      offset += 2;

      if (numChannels > 1) {
        let sR = Math.max(-1, Math.min(1, chR[i]));
        let valR = Math.round(sR < 0 ? sR * 32768 : sR * 32767);
        view.setInt16(offset, valR, true);
        offset += 2;
      }
    }
  } else if (bitDepth === 24) {
    for (let i = 0; i < numSamples; i++) {
      let sL = Math.max(-1, Math.min(1, chL[i]));
      let valL = Math.round(sL < 0 ? sL * 8388608 : sL * 8388607);
      valL = Math.max(-8388608, Math.min(8388607, valL));
      view.setUint8(offset, valL & 0xFF);
      view.setUint8(offset + 1, (valL >> 8) & 0xFF);
      view.setUint8(offset + 2, (valL >> 16) & 0xFF);
      offset += 3;

      if (numChannels > 1) {
        let sR = Math.max(-1, Math.min(1, chR[i]));
        let valR = Math.round(sR < 0 ? sR * 8388608 : sR * 8388607);
        valR = Math.max(-8388608, Math.min(8388607, valR));
        view.setUint8(offset, valR & 0xFF);
        view.setUint8(offset + 1, (valR >> 8) & 0xFF);
        view.setUint8(offset + 2, (valR >> 16) & 0xFF);
        offset += 3;
      }
    }
  } else if (bitDepth === 32) {
    for (let i = 0; i < numSamples; i++) {
      view.setFloat32(offset, chL[i], true);
      offset += 4;
      if (numChannels > 1) {
        view.setFloat32(offset, chR[i], true);
        offset += 4;
      }
    }
  }

  return Buffer.from(buffer);
}

// Test generating WAV files for 16, 24, 32 bit
const testBuf = mockAudioBuffer(2, 44100, 44100);
const d0 = testBuf.getChannelData(0);
const d1 = testBuf.getChannelData(1);
for (let i = 0; i < 44100; i++) {
  d0[i] = Math.sin(2 * Math.PI * 440 * (i / 44100)) * 0.5;
  d1[i] = Math.sin(2 * Math.PI * 880 * (i / 44100)) * 0.5;
}

const wav16 = encodeWavArrayBuffer(testBuf, 16);
const wav24 = encodeWavArrayBuffer(testBuf, 24);
const wav32 = encodeWavArrayBuffer(testBuf, 32);

console.log("WAV 16 size:", wav16.length, "Expected:", 44 + 44100 * 4);
console.log("WAV 24 size:", wav24.length, "Expected:", 44 + 44100 * 6);
console.log("WAV 32 size:", wav32.length, "Expected:", 44 + 44100 * 8);

// Verify headers
console.log("RIFF Header 16-bit:", wav16.toString('ascii', 0, 4), wav16.toString('ascii', 8, 12), "AudioFormat:", wav16.readUInt16LE(20), "Bits:", wav16.readUInt16LE(34));
console.log("RIFF Header 24-bit:", wav24.toString('ascii', 0, 4), wav24.toString('ascii', 8, 12), "AudioFormat:", wav24.readUInt16LE(20), "Bits:", wav24.readUInt16LE(34));
console.log("RIFF Header 32-bit:", wav32.toString('ascii', 0, 4), wav32.toString('ascii', 8, 12), "AudioFormat:", wav32.readUInt16LE(20), "Bits:", wav32.readUInt16LE(34));
