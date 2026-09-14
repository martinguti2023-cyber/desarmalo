const AudioSys = {
  ctx: null,
  enabled: true,

  init() {
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      this.enabled = false;
    }
  },

  resume() {
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  },

  playTone(freq, duration = 0.1, type = "sine", volume = 0.15) {
    if (!this.enabled || !this.ctx) return;
    this.resume();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(volume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  },

  snap() {
    this.playTone(880, 0.08, "triangle", 0.18);
    setTimeout(() => this.playTone(1320, 0.06, "sine", 0.12), 40);
  },

  wrong() {
    this.playTone(220, 0.12, "sawtooth", 0.1);
  },

  disassemble() {
    this.playTone(150, 0.25, "square", 0.12);
    setTimeout(() => this.playTone(120, 0.3, "square", 0.1), 80);
  },

  success() {
    const notes = [523, 659, 784, 1047];
    notes.forEach((n, i) => {
      setTimeout(() => this.playTone(n, 0.15, "sine", 0.14), i * 90);
    });
  },

  fail() {
    this.playTone(180, 0.4, "sawtooth", 0.15);
    setTimeout(() => this.playTone(140, 0.5, "sawtooth", 0.12), 200);
  },

  tick() {
    this.playTone(600, 0.04, "square", 0.06);
  }
};
