/**
 * High-volume, multi-layered stamp impact sound generator using Web Audio API.
 * Synthesizes a loud, crisp, wooden stamp thud and paper slap.
 */

let globalAudioCtx = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;

  if (!globalAudioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      globalAudioCtx = new AudioContextClass();
    }
  }

  if (globalAudioCtx && globalAudioCtx.state === "suspended") {
    globalAudioCtx.resume().catch(() => {});
  }

  return globalAudioCtx;
}

// Global listener to unlock browser AudioContext on first user interaction
if (typeof window !== "undefined") {
  const unlockAudio = () => {
    const ctx = getAudioContext();
    if (ctx && ctx.state === "running") {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
      window.removeEventListener("pointerdown", unlockAudio);
    }
  };
  window.addEventListener("click", unlockAudio, { passive: true });
  window.addEventListener("keydown", unlockAudio, { passive: true });
  window.addEventListener("touchstart", unlockAudio, { passive: true });
  window.addEventListener("pointerdown", unlockAudio, { passive: true });
}

export function playStampSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Force resume if suspended
    if (ctx.state === "suspended") {
      ctx.resume().then(() => playLayers(ctx)).catch(() => {});
    } else {
      playLayers(ctx);
    }
  } catch (e) {
    console.warn("Stamp sound playback issue:", e);
  }
}

function playLayers(ctx) {
  const now = ctx.currentTime;

  // Master Gain Stage for high volume punch
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(2.0, now);
  masterGain.connect(ctx.destination);

  // --- LAYER 1: Deep Wooden Body Thud ---
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(260, now);
  osc.frequency.exponentialRampToValueAtTime(35, now + 0.15);

  oscGain.gain.setValueAtTime(1.5, now);
  oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

  osc.connect(oscGain);
  oscGain.connect(masterGain);

  osc.start(now);
  osc.stop(now + 0.2);

  // --- LAYER 2: Wooden Handle Pop / Snap ---
  const popOsc = ctx.createOscillator();
  const popGain = ctx.createGain();

  popOsc.type = "triangle";
  popOsc.frequency.setValueAtTime(750, now);
  popOsc.frequency.exponentialRampToValueAtTime(120, now + 0.08);

  popGain.gain.setValueAtTime(1.2, now);
  popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

  popOsc.connect(popGain);
  popGain.connect(masterGain);

  popOsc.start(now);
  popOsc.stop(now + 0.1);

  // --- LAYER 3: Paper Contact Slap Noise ---
  const bufferSize = Math.floor(ctx.sampleRate * 0.08); // 80ms noise
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(1600, now);
  filter.Q.setValueAtTime(1.2, now);

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(1.4, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.005, now + 0.08);

  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(masterGain);

  noise.start(now);
}
