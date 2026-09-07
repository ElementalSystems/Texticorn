const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
//make noiseBuffer
const bufferSize = 2 * audioCtx.sampleRate;
const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
const output = noiseBuffer.getChannelData(0);
for (let i = 0; i < bufferSize; i++) {
  output[i] = Math.random() * 2 - 1; // white noise
}

function noiseS() {
  //creates a node for white noise
  const noise = audioCtx.createBufferSource();
  noise.buffer = noiseBuffer;
  noise.loop = true;
  return noise;
}

function playHoof(time, volume = 1.0, pitch = 1) {
  const osc = audioCtx.createOscillator();
  const oscGain = audioCtx.createGain();
  if (!time) time = audioCtx.currentTime;

  // Low-frequency impact body
  osc.type = "triangle";
  osc.frequency.setValueAtTime(120 * pitch, time);
  osc.frequency.exponentialRampToValueAtTime(30 * pitch, time + 0.08);

  oscGain.gain.setValueAtTime(0.8 * volume, time);
  oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);

  osc.connect(oscGain);
  oscGain.connect(audioCtx.destination);

  // Bandpass filter to sculpt the impact surface sound
  const filter = audioCtx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(800 * pitch, time);
  filter.Q.setValueAtTime(1.5, time);

  const noiseGain = audioCtx.createGain();
  noiseGain.gain.setValueAtTime(0.5 * volume, time);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

  const noiseSource = noiseS();
  noiseSource.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(audioCtx.destination);

  osc.start(time);
  osc.stop(time + 0.09);

  noiseSource.start(time);
  noiseSource.stop(time + 0.06);
}

function nay(dur, off = 0, fr = 600, fre = 400, rep = 10) {
  const now = audioCtx.currentTime + off;

  // Base vocal oscillator
  const osc = audioCtx.createOscillator();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(400, now); // base pitch (~cat meow)
  osc.frequency.exponentialRampToValueAtTime(fr, now + dur * 0.2); // upward screech
  osc.frequency.linearRampToValueAtTime(fre, now + dur * 0.8); // then settle

  // First formant filter (throat resonance)
  const formant1 = audioCtx.createBiquadFilter();
  formant1.type = "bandpass";
  formant1.frequency.value = 1000; // resonance frequency
  formant1.Q.value = 4;

  // Second formant filter (mouth resonance)
  const formant2 = audioCtx.createBiquadFilter();
  formant2.type = "bandpass";
  formant2.frequency.value = 2500;
  formant2.Q.value = 6;

  // Add jittery modulation (for angry instability)
  const lfo = audioCtx.createOscillator();
  lfo.frequency.value = rep; // jitter speed
  const lfoGain = audioCtx.createGain();
  lfoGain.gain.value = 40; // +/- Hz
  lfo.connect(lfoGain).connect(osc.frequency);
  lfo.start(now);

  // Amplitude envelope
  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(5.0, now + dur * 0.05); // quick attack
  gain.gain.setValueAtTime(4.0, now + dur * 0.5); // sustain
  gain.gain.exponentialRampToValueAtTime(0.001, now + dur * 1.2); // decay

  // Connect chain: osc -> formants -> gain -> out
  osc
    .connect(formant1)
    .connect(formant2)
    .connect(gain)
    .connect(audioCtx.destination);

  // Start/stop
  osc.start(now);
  osc.stop(now + dur);
}

const snd = {
  g: (l = 1) => {
    let t = audioCtx.currentTime;
    playHoof(t, 0.6, 0.85);
    playHoof(t + l * 0.05, 1, 1);
    playHoof(t + l * 0.2, 0.8, 1.15);
  },
  t: (l = 0.5) => {
    let t = audioCtx.currentTime;
    playHoof(t, 0.3, 1.1);
    playHoof(t + l * 0.25, 0.4, 0.9);
    playHoof(t + l * 0.55, 0.4, 0.9);
    playHoof(t + l * 0.75, 0.2, 1);
  },
  n: (l = 1) => nay(l, 0, 600, 400, 10), //refusenay
  o: (l = 1) => nay(l, 0, 600, 400, 30), //oomph
  w: (l = 1.5) => nay(l, 0, 600, 850, 15), //weeeeee
};
