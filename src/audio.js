/* ===== Abendtau: Klang & Stimme ===== */
const Sound = (() => {
  let ctx = null, master, chimeBus, ambBus, amb = null;
  let ambVol = 0.35, duckLevel = 1, dimLevel = 1;
  const bufs = {};
  let cfg = () => ({ sound: true, chime: true });

  function ensure() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      try { ctx = new AC(); } catch (e) { return null; }
      master = ctx.createGain(); master.gain.value = cfg().sound ? 1 : 0; master.connect(ctx.destination);
      chimeBus = ctx.createGain(); chimeBus.gain.value = 0.9; chimeBus.connect(master);
      ambBus = ctx.createGain(); ambBus.gain.value = 0; ambBus.connect(master);
    }
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});
    return ctx;
  }

  /* Rauschen als nahtlose Schleife: Anfang und Ende werden überblendet */
  function noise(kind) {
    if (bufs[kind]) return bufs[kind];
    const sr = ctx.sampleRate, n = Math.floor(sr * 8), L = Math.floor(sr * 0.25);
    const gen = new Float32Array(n + L);
    if (kind === 'brown') {
      let last = 0;
      for (let i = 0; i < gen.length; i++) { const w = Math.random() * 2 - 1; last = (last + 0.02 * w) / 1.02; gen[i] = last; }
    } else {
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < gen.length; i++) {
        const w = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + w * 0.0555179; b1 = 0.99332 * b1 + w * 0.0750759; b2 = 0.969 * b2 + w * 0.153852;
        b3 = 0.8665 * b3 + w * 0.3104856; b4 = 0.55 * b4 + w * 0.5329522; b5 = -0.7616 * b5 - w * 0.016898;
        gen[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11; b6 = w * 0.115926;
      }
    }
    const buf = ctx.createBuffer(1, n, sr), d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = gen[i];
    for (let j = 0; j < L; j++) { const f = j / L; d[j] = gen[j] * f + gen[n + j] * (1 - f); }
    let peak = 0; for (let i = 0; i < n; i++) peak = Math.max(peak, Math.abs(d[i]));
    const g = peak ? 0.9 / peak : 1; for (let i = 0; i < n; i++) d[i] *= g;
    return (bufs[kind] = buf);
  }
  const src = (kind) => { const s = ctx.createBufferSource(); s.buffer = noise(kind); s.loop = true; return s; };
  const lfo = (freq, depth, target) => { const o = ctx.createOscillator(); o.frequency.value = freq; const g = ctx.createGain(); g.gain.value = depth; o.connect(g); g.connect(target); return o; };

  function sea(out) {
    const s1 = src('brown'), lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 520; lp.Q.value = 0.4;
    const wave = ctx.createGain(); wave.gain.value = 0.55;
    const l1 = lfo(0.085, 0.32, wave.gain), l2 = lfo(0.137, 0.12, wave.gain);
    s1.connect(lp); lp.connect(wave); wave.connect(out);
    const s2 = src('pink'), bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1800; bp.Q.value = 0.5;
    const foam = ctx.createGain(); foam.gain.value = 0.05; const l3 = lfo(0.085, 0.045, foam.gain);
    s2.connect(bp); bp.connect(foam); foam.connect(out);
    return [s1, s2, l1, l2, l3];
  }
  function rain(out) {
    const s1 = src('pink'), hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 450;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 5200;
    const g = ctx.createGain(); g.gain.value = 0.3; const l1 = lfo(0.21, 0.05, g.gain);
    s1.connect(hp); hp.connect(lp); lp.connect(g); g.connect(out);
    const s2 = src('brown'), lp2 = ctx.createBiquadFilter(); lp2.type = 'lowpass'; lp2.frequency.value = 300;
    const g2 = ctx.createGain(); g2.gain.value = 0.22; s2.connect(lp2); lp2.connect(g2); g2.connect(out);
    return [s1, s2, l1];
  }
  function pad(out) {
    const notes = [146.83, 220.0, 293.66, 329.63, 440.0];
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900; lp.Q.value = 0.7;
    const l0 = lfo(0.05, 350, lp.frequency);
    const sum = ctx.createGain(); sum.gain.value = 0.9; lp.connect(sum); sum.connect(out);
    const nodes = [l0];
    notes.forEach((f, i) => [-0.6, 0.6].forEach(det => {
      const o = ctx.createOscillator(); o.type = i % 2 ? 'sine' : 'triangle'; o.frequency.value = f + det;
      const g = ctx.createGain(); const base = i === 4 ? 0.022 : 0.055; g.gain.value = base;
      const tl = lfo(0.03 + i * 0.011, base * 0.6, g.gain);
      o.connect(g); g.connect(lp); nodes.push(o, tl);
    }));
    return nodes;
  }

  function applyAmb() { if (ctx) ambBus.gain.setTargetAtTime(ambVol * duckLevel * dimLevel, ctx.currentTime, 0.25); }

  function startAmbient(type, vol) {
    if (!ensure()) return;
    stopAmbient(1);
    if (!type || type === 'aus') return;
    ambVol = vol; applyAmb();
    const out = ctx.createGain(), t = ctx.currentTime;
    out.gain.setValueAtTime(0, t); out.gain.linearRampToValueAtTime(1, t + 3); out.connect(ambBus);
    const nodes = type === 'meer' ? sea(out) : type === 'regen' ? rain(out) : pad(out);
    nodes.forEach(nd => { try { nd.start(); } catch (e) {} });
    amb = { nodes, out };
  }
  function stopAmbient(fade = 1.5) {
    if (!amb || !ctx) return;
    const { nodes, out } = amb; amb = null;
    const t = ctx.currentTime;
    out.gain.cancelScheduledValues(t); out.gain.setValueAtTime(out.gain.value, t); out.gain.linearRampToValueAtTime(0, t + fade);
    setTimeout(() => { nodes.forEach(nd => { try { nd.stop(); } catch (e) {} }); try { out.disconnect(); } catch (e) {} }, fade * 1000 + 120);
  }

  /* Klangschale: mehrere unharmonische Teiltöne mit leichter Schwebung */
  function bowl({ strength = 1, pitch = 1, decay = 1 } = {}) {
    const c = cfg(); if (!c.sound || !c.chime) return;
    if (!ensure()) return;
    const t = ctx.currentTime + 0.03, f0 = 207.65 * pitch;
    const out = ctx.createGain(); out.gain.value = 0.16 * strength; out.connect(chimeBus);
    [[1, 1, 6.5], [2.71, 0.5, 4.2], [5.15, 0.22, 2.6], [8.43, 0.09, 1.6]].forEach(([r, a, d]) => {
      [0, 1.1].forEach((det, k) => {
        const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f0 * r + det * r;
        const g = ctx.createGain(), peak = a * (k ? 0.55 : 1), end = t + d * decay;
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, end);
        o.connect(g); g.connect(out); o.start(t); o.stop(end + 0.05);
      });
    });
    setTimeout(() => { try { out.disconnect(); } catch (e) {} }, 7500 * decay);
  }

  return {
    config(fn) { cfg = fn; },
    unlock() { ensure(); },
    bowl,
    ting() { bowl({ strength: 0.55, pitch: 2, decay: 0.45 }); },
    startAmbient, stopAmbient,
    setAmbientVol(v) { ambVol = v; applyAmb(); },
    duck(on) { duckLevel = on ? 0.45 : 1; applyAmb(); },
    dim(on) { dimLevel = on ? 0.4 : 1; applyAmb(); },
    setMuted(m) { if (ctx) master.gain.setTargetAtTime(m ? 0 : 1, ctx.currentTime, 0.08); },
    ambientOn: () => !!amb
  };
})();

const Voice = (() => {
  const synth = window.speechSynthesis || null;
  let voices = [], cfg = () => ({}), current = null, timer = 0;
  function refresh() { try { voices = (synth ? synth.getVoices() : []).filter(v => /^de([-_]|$)/i.test(v.lang)); } catch (e) { voices = []; } }
  if (synth) { refresh(); try { synth.addEventListener('voiceschanged', refresh); } catch (e) { synth.onvoiceschanged = refresh; } }
  function pick() {
    const c = cfg();
    return voices.find(v => v.voiceURI === c.voiceURI) || voices.find(v => /de[-_]AT/i.test(v.lang)) || voices.find(v => /google/i.test(v.name)) || voices.find(v => v.localService) || voices[0] || null;
  }
  function say(text) {
    const c = cfg();
    if (!synth || !c.sound || !c.voice || !text) return;
    try {
      clearTimeout(timer); if (synth.speaking || synth.pending) synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      const v = pick(); if (v) u.voice = v;
      u.lang = v ? v.lang : 'de-DE'; u.rate = c.rate || 0.95; u.pitch = 1;
      u.onstart = () => Sound.duck(true);
      u.onend = u.onerror = () => { Sound.duck(false); if (current === u) current = null; };
      current = u;
      if (synth.speaking || synth.pending) timer = setTimeout(() => { try { synth.speak(u); } catch (e) {} }, 60);
      else synth.speak(u);
    } catch (e) {}
  }
  function cancel() { clearTimeout(timer); try { if (synth) synth.cancel(); } catch (e) {} current = null; Sound.duck(false); }
  return { say, cancel, config(fn) { cfg = fn; }, list: () => (refresh(), voices), available: () => !!synth };
})();
