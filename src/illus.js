/* ===== Abendtau: Illustrationen (Gesicht, Bahnen, Blätter) ===== */
const Illus = (() => {
  const NS = 'http://www.w3.org/2000/svg';
  const MIRROR = 'matrix(-1 0 0 1 240 0)';

  /* Bewegungsbahnen, gezeichnet für die linke Bildhälfte; die zweite Seite wird gespiegelt */
  const P = {
    neck1: 'M66,150 C76,176 90,204 94,244',
    neck2: 'M105,204 C104,217 102,231 101,246',
    clav: 'M114,263 C100,259 86,259 68,263',
    jaw: 'M116,201.5 C104,200 90,192 82,181 C74,170 67,158 64,144',
    mass: 'M80,170 C77,159 75,148 73,136',
    cheek: 'M104,160 C92,153 78,141 64,128',
    cheekbone: 'M108,133 C96,128 80,121 64,112',
    undereye: 'M106,114 C98,120 86,120 78,114 C72,109 68,104 64,98',
    brow: 'M110,88 C100,82 88,82 78,86 C72,88 67,91 63,94',
    fh1: 'M114,82 L114,55',
    fh2: 'M100,82 L98,57',
    fh3: 'M86,86 L80.5,64',
    fh4: 'M118,73 C102,71 84,75 66,87',
    gl: 'M117,101 L115,82',
    drain: 'M116,66 C100,64 78,72 66,88 C60,100 60,122 64,140 C72,168 88,198 94,244',
    orbit: 'M108,111 C102,121 86,121 80,113 C76,105 80,95 88,93 C96,91 104,93 108,99',
    ear: 'M56,106 C47,108 45,122 50,133',
    smooth: 'M118,71 C102,69 84,73 66,87'
  };
  const ZONES = { chin: [120, 215, 24, 10] };

  const MK = {
    guasha: '<path class="mk-stone" d="M-11,-5.5 C-5,-9.5 6,-9.5 11,-4.5 C13.2,-1.5 13.2,1.5 11,4.5 C6,9.5 -5,9.5 -11,5.5 C-7.5,2.2 -7.5,-2.2 -11,-5.5 Z"/><path class="mk-shine" d="M-3.5,-4.6 C0.5,-6.4 5,-5.8 8,-3.2"/>',
    roller: '<path class="mk-handle" d="M-3,0 H-17"/><rect class="mk-stone" x="-25" y="-2.8" width="10" height="5.6" rx="2.8"/><rect class="mk-stone" x="-3.5" y="-11.5" width="8" height="23" rx="4"/><path class="mk-shine" d="M-1,-8 V-3"/>',
    finger: '<circle class="mk-tip" r="6.5"/><circle class="mk-dot" r="2.2"/>',
    knuckle: '<rect class="mk-tip" x="-7.5" y="-5.5" width="15" height="11" rx="5.5"/><circle class="mk-dot" r="1.8"/>'
  };

  const ease = x => 0.5 - 0.5 * Math.cos(Math.PI * Math.max(0, Math.min(1, x)));
  const el = (tag, attrs, parent) => {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  };
  const lenOf = p => { try { return p.getTotalLength() || 60; } catch (e) { return 60; } };

  /* ---------- Grundfigur ---------- */
  /* Gezeichnet nach Lisa: hellblondes, zurückgekämmtes Haar mit tiefem Zopf, braune Augen,
     lange, sanft geschwungene Brauen, gerade Nase, feine Sommersprossen, schmales Lächeln */
  const BROW = 'M110.6,90.6 C110.2,88.4 108.8,87.4 106.8,87 C100.5,85.6 95,83.6 90,83.3 C85.8,83.1 82.3,85.4 79,89 C82.6,86.7 86.2,86 90,86.2 C95.4,86.5 101.6,88.3 110.6,90.6 Z';
  const FRECKLES = [[97, 124, 1], [102, 128, .9], [94, 130, .8], [90, 125, .85], [104, 121, .75], [99, 133, .7], [118.5, 121, .7], [122, 126, .75], [116, 129, .65],
    [137, 123, .95], [142, 128, .85], [135, 130, .8], [147, 125, .8], [140, 133, .7], [133, 121, .7]];
  function face(o = {}) {
    const hT = o.headT ? ` transform="${o.headT}"` : '';
    return `
<g class="fx-back"></g>
<g class="head-back"${hT}>
  <path class="hair" d="M164,120 C181,128 190,152 189,182 C188,208 183,234 178,264 L166,264 C168,238 169,212 167,186 C165,162 159,142 160,124 Z"/>
  <path class="hair-ln" d="M175,142 C181,164 182,198 178,244 M168,152 C171,176 172,210 171,250"/>
</g>
<g class="body"${o.bodyT ? ` transform="${o.bodyT}"` : ''} mask="url(#fade-body)">
  <path class="sk" d="M97,166 C98,200 98,226 91,242 C76,250 50,256 22,270 C8,277 -2,286 -8,300 L-8,330 L248,330 L248,300 C242,286 232,277 218,270 C190,256 164,250 149,242 C142,226 142,200 143,166 Z"/>
  <path class="ln soft" d="M112,258 C100,253 86,252 64,257"/>
  <path class="ln soft" d="M128,258 C140,253 154,252 176,257"/>
  <path class="ln soft" d="M116,265 Q120,269 124,265"/>
</g>
<g class="head"${hT}>
  <path class="sk" d="M60,106 C50,101 45,112 47,122 C49,132 54,140 62,140 Z"/>
  <path class="ln soft" d="M56,114 C52,118 53,126 57,131"/>
  <path class="sk" d="M180,106 C190,101 195,112 193,122 C191,132 186,140 178,140 Z"/>
  <path class="ln soft" d="M184,114 C188,118 187,126 183,131"/>
  <path class="sk" d="M120,33 C153,33 179,56 181,96 C182,118 179,141 170,161 C162,188 144,204 120,204 C96,204 78,188 70,161 C61,141 58,118 59,96 C61,56 87,33 120,33 Z"/>
  <path class="hair" d="M58.5,108 C52,86 54,58 72,41 C86,29 102,24 120,24 C138,24 154,29 168,41 C186,58 188,86 181.5,108 C180,94 177,82 171,72 C162,59 143,51 120,51 C97,51 78,59 69,72 C63,82 60,94 58.5,108 Z"/>
  <path class="hair-ln" d="M70,76 C72,60 84,46 102,37 M86,58 C94,46 108,38 126,35 M108,52 C120,44 136,40 152,42 M136,52 C150,50 162,55 171,65 M162,60 C171,67 176,77 179,89"/>
  <g class="hair-sprig">
    <path class="ln soft" d="M147,41 C154,34 161,29 171,26"/>
    <ellipse class="sp-leaf" cx="155" cy="33" rx="4.8" ry="2.4" transform="rotate(-48 155 33)"/>
    <ellipse class="sp-leaf" cx="161" cy="36" rx="4.8" ry="2.4" transform="rotate(14 161 36)"/>
    <ellipse class="sp-leaf" cx="168" cy="25.5" rx="4.4" ry="2.2" transform="rotate(-24 168 25.5)"/>
  </g>
  <ellipse class="blush" cx="88" cy="145" rx="13" ry="7.5"/>
  <ellipse class="blush" cx="152" cy="145" rx="13" ry="7.5"/>
  <g class="freckles">${FRECKLES.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g>
  <path class="brow" d="${BROW}"/>
  <path class="brow" d="${BROW}" transform="${MIRROR}"/>
  <g class="eyes e-closed">
    <path class="ln" d="M83,107 C89,112 101,112 108,106.5"/>
    <path class="ln" d="M132,106.5 C139,112 151,112 157,107"/>
    <path class="ln soft" d="M88,110.3 L86.4,113.4 M96,111.3 L95.6,114.7 M103.6,109.8 L105.1,112.8 M136.4,109.8 L134.9,112.8 M144,111.3 L144.4,114.7 M152,110.3 L153.6,113.4"/>
  </g>
  <g class="eyes e-open">
    <path class="ln soft" d="M85,101.5 C91,97.6 101,97.6 107,101 M133,101 C139,97.6 149,97.6 155,101.5"/>
    <path class="eye-w" d="M83,106 C89,100.5 101,100 108,105.5 C102,110.5 90,111 83,106 Z"/>
    <path class="eye-w" d="M132,105.5 C139,100 151,100.5 157,106 C150,111 138,110.5 132,105.5 Z"/>
    <g class="iris"><circle cx="95.5" cy="105.4" r="3.4"/><circle cx="144.5" cy="105.4" r="3.4"/><circle class="pupil" cx="95.5" cy="105.4" r="1.45"/><circle class="pupil" cx="144.5" cy="105.4" r="1.45"/><circle class="glint" cx="96.6" cy="104.3" r=".7"/><circle class="glint" cx="145.6" cy="104.3" r=".7"/></g>
  </g>
  <path class="ln soft" d="M117,102 C116,117 113,131 112,137.5 C114.5,142.5 120,143.5 124.5,141.2"/>
  <g class="mouth m-neutral"><path class="ln" d="M103,166 C110,173 130,173 137,166"/><path class="ln soft" d="M113,177.5 C117,179.2 123,179.2 127,177.5"/></g>
  <g class="mouth m-o"><ellipse class="lips" cx="120" cy="171" rx="7.5" ry="9.5"/></g>
  <g class="mouth m-osmile"><path class="lips" d="M106,165 C110,159 130,159 134,165 C131,177 109,177 106,165 Z"/><path class="ln soft" d="M103,164 C101,160 101,156 103,152 M137,164 C139,160 139,156 137,152"/></g>
  <g class="mouth m-fish"><ellipse class="lips" cx="120" cy="170" rx="5" ry="7"/><path class="ln soft" d="M95,150 C99,158 100,167 97,177 M145,150 C141,158 140,167 143,177"/></g>
  <g class="mouth m-kiss"><path class="lips" d="M112,169 C112,162 128,162 128,169 C128,176 112,176 112,169 Z"/><path class="ln soft" d="M115.5,169 L124.5,169"/></g>
  <g class="mouth m-lion"><path class="lionmouth" d="M105,162 C107,154 133,154 135,162 C137,179 129,194 120,194 C111,194 103,179 105,162 Z"/><path class="tongue" d="M111,178 C110,193 130,193 129,178 C125,175 115,175 111,178 Z"/></g>
  <g class="mouth m-puff"><path class="ln" d="M110,170 C114,168 126,168 130,170"/></g>
  <circle class="puff" cx="92" cy="157" r="11"/>
  <g class="vfingers">
    <path class="finger-o" d="M108,89 L99,150 M82,108 L97,151"/><path class="finger" d="M108,89 L99,150 M82,108 L97,151"/>
    <path class="finger-o" d="M132,89 L141,150 M158,108 L143,151"/><path class="finger" d="M132,89 L141,150 M158,108 L143,151"/>
  </g>
  <g class="palms">
    <g transform="rotate(-16 91 104)"><rect class="palm" x="67" y="74" width="48" height="56" rx="22"/><path class="ln soft" d="M79,76.5 V93 M91,74.5 V92 M103,76.5 V93"/></g>
    <g transform="${MIRROR}"><g transform="rotate(-16 91 104)"><rect class="palm" x="67" y="74" width="48" height="56" rx="22"/><path class="ln soft" d="M79,76.5 V93 M91,74.5 V92 M103,76.5 V93"/></g></g>
  </g>
</g>
<g class="fx fx-a"></g>
<g class="fx fx-b" transform="${MIRROR}"></g>`;
  }

  /* ---------- Live-Animation ---------- */
  const ACTIVE = new Set();
  let raf = 0;
  function loop() {
    ACTIVE.forEach(c => { try { c.tick(); } catch (e) { console.error('Animation ' + c.ex.id + ': ' + (e && e.stack || e)); ACTIVE.delete(c); } });
    raf = ACTIVE.size ? requestAnimationFrame(loop) : 0;
  }

  const EXPR = {
    kiss:   { period: 6,   mouth: [[0, 'neutral'], [1, 'kiss'], [5, 'neutral']], tilt: 'kiss' },
    osmile: { period: 6.5, mouth: [[0, 'neutral'], [0.8, 'o'], [1.8, 'osmile'], [5.4, 'neutral']] },
    fish:   { period: 6,   mouth: [[0, 'neutral'], [0.8, 'fish'], [5, 'neutral']] },
    lion:   { period: 5.5, mouth: [[0, 'neutral'], [2, 'lion'], [4.2, 'neutral']], eyes: [[0, 'closed'], [2, 'open'], [4.2, 'closed']] },
    puff:   { period: 6,   mouth: [[0, 'puff']] },
    vsign:  { period: 6,   mouth: [[0, 'neutral']], eyes: [[0, 'open'], [1, 'up'], [5, 'open']] }
  };
  const pickKey = (keys, t) => { let v = keys[0][1]; for (const [at, val] of keys) if (t >= at) v = val; return v; };
  function setData(node, name, val, def) {
    const cur = node.getAttribute(name);
    if (val === def || val == null) { if (cur !== null) node.removeAttribute(name); }
    else if (cur !== val) node.setAttribute(name, val);
  }

  class Ctrl {
    constructor(svg, ex, opts = {}) {
      this.svg = svg; this.ex = ex; this.a = ex.anim || {};
      this.side = opts.side || 1; this.phase = 0;
      this.auto = !!opts.auto;
      this.A = svg.querySelector('.fx-a'); this.B = svg.querySelector('.fx-b'); this.back = svg.querySelector('.fx-back');
      this.heads = Array.from(svg.querySelectorAll('.head, .head-back')); this.body = svg.querySelector('.body');
      this.paused = false; this.base = performance.now(); this.pauseAt = 0; this.label = '';
      this.setup();
      ACTIVE.add(this);
      if (!raf) raf = requestAnimationFrame(loop);
    }
    time() { return Math.max(0, ((this.paused ? this.pauseAt : performance.now()) - this.base) / 1000); }
    pause() { if (!this.paused) { this.paused = true; this.pauseAt = performance.now(); } }
    resume() { if (this.paused) { this.base += performance.now() - this.pauseAt; this.paused = false; } }
    restart() { this.base = performance.now(); this.pauseAt = this.base; }
    setSide(s) { if (s !== this.side) { this.side = s; this.setup(); this.restart(); } }
    setPhase(p) { if (p !== this.phase) { this.phase = p; this.setup(); this.restart(); } }
    phaseCount() { return (this.a.phases && this.a.phases.length) || 1; }
    destroy() { ACTIVE.delete(this); }
    setHead(t) { this.heads.forEach(h => { if (t) h.setAttribute('transform', t); else h.removeAttribute('transform'); }); }
    mode() { return this.a.mode || (this.ex.sides ? 'side' : 'center'); }
    layers() { const m = this.mode(); if (m === 'both') return [this.A, this.B]; if (m === 'side') return [this.side === 2 ? this.B : this.A]; return [this.A]; }
    clear() {
      this.A.replaceChildren(); this.B.replaceChildren(); this.back.replaceChildren();
      ['data-mouth', 'data-eyes', 'data-hands', 'data-puff'].forEach(n => this.svg.removeAttribute(n));
      this.setHead(null); this.body.removeAttribute('transform');
      this.k = 0;
    }
    setup() { this.clear(); const f = SETUP[this.a.type]; if (f) f(this); }
    tick() {
      const t = this.time();
      if (this.auto && !this.paused) {
        const span = Math.max(6, (this.loopLen || 5) * 1.6);
        if (t > span) {
          if (this.phaseCount() > 1 && this.phase < this.phaseCount() - 1) { this.setPhase(this.phase + 1); return; }
          if (this.ex.sides) { this.phase = 0; this.side = this.side === 1 ? 2 : 1; this.setup(); this.restart(); return; }
          if (this.phaseCount() > 1) { this.setPhase(0); return; }
        }
      }
      const f = TICK[this.a.type]; if (f) f(this, t);
    }
  }

  const SETUP = {}, TICK = {};
  const marker = (tool, parent, extra = '') => { const g = el('g', { class: 'mk mk-' + tool + extra, opacity: 0 }, parent); g.innerHTML = MK[tool] || MK.finger; return g; };

  /* Striche (Gua Sha, Roller, Finger) */
  SETUP.stroke = c => {
    const a = c.a;
    const names = a.phases ? a.phases[Math.min(c.phase, a.phases.length - 1)] : a.paths;
    const m = c.mode();
    const passes = m === 'alt'
      ? [...names.map(n => ({ layers: [c.A], n })), ...names.map(n => ({ layers: [c.B], n }))]
      : names.map(n => ({ layers: c.layers(), n }));
    const made = new Map();
    passes.forEach(p => {
      p.els = p.layers.map(L => {
        const key = (L === c.B ? 'B:' : 'A:') + p.n;
        if (!made.has(key)) {
          const g = el('path', { d: P[p.n], class: 'guide', 'marker-end': 'url(#arr)' }, L);
          const tr = el('path', { d: P[p.n], class: 'trail' }, L);
          const len = lenOf(g);
          tr.style.strokeDasharray = `${len} ${len}`; tr.style.strokeDashoffset = len;
          made.set(key, { g, tr, len });
        }
        return made.get(key);
      });
      p.dur = Math.min(2.6, Math.max(1.1, p.els[0].len / 52));
    });
    c.tool = a.tool || 'finger';
    c.mk = new Map();
    [c.A, c.B].forEach(L => { if (passes.some(p => p.layers.includes(L))) c.mk.set(L, marker(c.tool, L)); });
    c.lead = 0.25; c.tail = c.tool === 'guasha' ? 0.6 : 0.35;
    let acc = 0; passes.forEach(p => { p.start = acc; acc += c.lead + p.dur + c.tail; });
    c.passes = passes; c.loopLen = acc; c.lastPass = -1;
  };
  TICK.stroke = (c, t) => {
    if (!c.passes || !c.passes.length) return;
    const tt = t % c.loopLen;
    let i = c.passes.findIndex(p => tt >= p.start && tt < p.start + c.lead + p.dur + c.tail);
    if (i < 0) i = c.passes.length - 1;
    const p = c.passes[i];
    if (i !== c.lastPass) {
      c.passes.forEach((q, k) => { if (k !== i) q.els.forEach(e => { if (!p.els.includes(e)) { e.tr.style.transition = 'opacity .7s'; e.tr.style.opacity = 0; } }); });
      p.els.forEach(e => { e.tr.style.transition = 'none'; e.tr.style.opacity = 1; e.tr.style.strokeDashoffset = e.len; });
      c.mk.forEach((g, L) => { if (!p.layers.includes(L)) g.setAttribute('opacity', 0); });
      c.lastPass = i;
    }
    const lt = tt - p.start;
    let prog, op = 1, wig = 0;
    if (lt < c.lead) { prog = 0; op = lt / c.lead; }
    else if (lt < c.lead + p.dur) prog = ease((lt - c.lead) / p.dur);
    else {
      prog = 1;
      const k = (lt - c.lead - p.dur) / c.tail;
      op = 1 - Math.max(0, (k - 0.6) / 0.4);
      if (c.tool === 'guasha') wig = Math.sin(k * Math.PI * 6) * 1.8 * (1 - k);
    }
    p.els.forEach((e, k) => {
      const L = p.layers[k], g = c.mk.get(L); if (!g) return;
      const at = prog * e.len;
      const pt = e.g.getPointAtLength(at);
      const p2 = e.g.getPointAtLength(Math.min(e.len, at + 1)), p1 = e.g.getPointAtLength(Math.max(0, at - 1));
      const ang = Math.atan2(p2.y - p1.y, p2.x - p1.x);
      const x = pt.x - Math.sin(ang) * wig, y = pt.y + Math.cos(ang) * wig;
      const deg = ang * 180 / Math.PI;
      const rot = c.tool === 'guasha' ? ` rotate(${(deg + 90).toFixed(1)})` : c.tool === 'roller' ? ` rotate(${deg.toFixed(1)})` : '';
      g.setAttribute('transform', `translate(${x.toFixed(2)} ${y.toFixed(2)})${rot}`);
      g.setAttribute('opacity', op.toFixed(3));
      e.tr.style.strokeDashoffset = (e.len * (1 - prog)).toFixed(2);
    });
  };

  /* Kreise mit den Fingerkuppen */
  SETUP.circles = c => {
    c.items = [];
    const Ls = c.a.mode === 'both' ? [c.A, c.B] : c.layers();
    const extra = c.a.behind ? ' behind' : '';
    Ls.forEach(L => c.a.at.forEach(([x, y, r]) => {
      el('circle', { cx: x, cy: y, r: r + 3.5, class: 'guide-ring' + extra }, L);
      const g = marker('finger', L, extra); g.setAttribute('opacity', 1);
      c.items.push({ g, x, y, r });
    }));
    c.loopLen = 4;
  };
  TICK.circles = (c, t) => {
    const th = t * Math.PI * 2 / 1.9;
    c.items.forEach(({ g, x, y, r }) => g.setAttribute('transform', `translate(${(x + r * Math.cos(th)).toFixed(2)} ${(y + r * Math.sin(th)).toFixed(2)})`));
  };

  /* Tippen */
  SETUP.taps = c => {
    const Ls = c.a.mode === 'both' ? [c.A, c.B] : [c.A];
    let pts;
    if (c.a.path) {
      let g0 = null;
      Ls.forEach(L => { const g = el('path', { d: P[c.a.path], class: 'guide' }, L); if (!g0) g0 = g; });
      const len = lenOf(g0), N = 10; pts = [];
      for (let i = 0; i < N; i++) { const q = g0.getPointAtLength(len * i / (N - 1)); pts.push([q.x, q.y]); }
    } else pts = c.a.points;
    c.pts = pts;
    c.taps = Ls.map(L => ({ ring: el('circle', { r: 3, class: 'tap-ring', opacity: 0 }, L), g: marker('finger', L) }));
    c.taps.forEach(o => o.g.setAttribute('opacity', 1));
    c.loopLen = pts.length * 0.42;
  };
  TICK.taps = (c, t) => {
    const per = 0.42, i = Math.floor(t / per) % c.pts.length, f = (t % per) / per;
    const [x, y] = c.pts[i];
    c.taps.forEach(({ ring, g }) => {
      g.setAttribute('transform', `translate(${x} ${y}) scale(${(1 - 0.22 * Math.sin(f * Math.PI)).toFixed(3)})`);
      ring.setAttribute('cx', x); ring.setAttribute('cy', y);
      ring.setAttribute('r', (4 + 9 * f).toFixed(2)); ring.setAttribute('opacity', (0.9 * (1 - f)).toFixed(3));
    });
  };

  /* Druckpunkte */
  SETUP.points = c => {
    const phases = c.a.phases, grp = phases[Math.min(c.phase, phases.length - 1)];
    const both = c.a.mode === 'both';
    c.pp = [];
    phases.forEach((g2, k) => {
      if (k === c.phase) return;
      g2.forEach(([x, y]) => { el('circle', { cx: x, cy: y, r: 2.4, class: 'pt-ghost' }, c.A); if (both && Math.abs(x - 120) > 1) el('circle', { cx: x, cy: y, r: 2.4, class: 'pt-ghost' }, c.B); });
    });
    grp.forEach(([x, y]) => {
      const add = L => c.pp.push({ ring: el('circle', { cx: x, cy: y, r: 6, class: 'pt-ring' }, L), dot: el('circle', { cx: x, cy: y, r: 5, class: 'pt-dot' }, L) });
      add(c.A); if (both && Math.abs(x - 120) > 1) add(c.B);
    });
    c.loopLen = 3;
  };
  TICK.points = (c, t) => {
    const per = c.a.pump ? 1.1 : 2.6, f = (t % per) / per;
    c.pp.forEach(({ ring, dot }) => {
      ring.setAttribute('r', (5 + 8 * f).toFixed(2)); ring.setAttribute('opacity', (0.85 * (1 - f)).toFixed(3));
      if (c.a.pump) dot.setAttribute('r', (5 - 1.5 * Math.sin(f * Math.PI)).toFixed(2));
    });
  };

  /* Zonen mit Pfeilen */
  const arrows = (c, list) => (list || []).map(([x1, y1, x2, y2]) => el('path', { d: `M${x1},${y1} L${x2},${y2}`, class: 'zarrow', 'marker-end': 'url(#arr)' }, c.A));
  SETUP.zone = c => {
    c.zs = (c.a.zones || []).map(z => { const [cx, cy, rx, ry] = ZONES[z]; return el('ellipse', { cx, cy, rx, ry, class: 'zone' }, c.A); });
    c.ar = arrows(c, c.a.arrows);
    c.loopLen = 5;
  };
  TICK.zone = (c, t) => {
    const k = 0.5 - 0.5 * Math.cos(t * Math.PI * 2 / 5);
    c.zs.forEach(z => z.setAttribute('opacity', (0.25 + 0.4 * k).toFixed(3)));
    c.ar.forEach(a => a.setAttribute('transform', `translate(0 ${(-3 * k).toFixed(2)})`));
  };

  /* Mimik */
  SETUP.expr = c => {
    const e = c.a.expr;
    c.ar = arrows(c, c.a.arrows);
    if (e === 'kiss') c.ar.push(el('path', { d: 'M202,150 C210,128 208,104 198,86', class: 'zarrow', 'marker-end': 'url(#arr)' }, c.A));
    if (e === 'vsign') { c.svg.setAttribute('data-hands', 'v'); c.ar.push(el('path', { d: 'M120,96 L120,80', class: 'zarrow', 'marker-end': 'url(#arr)' }, c.A)); }
    if (e === 'puff') { c.svg.setAttribute('data-puff', '1'); c.puff = c.svg.querySelector('.puff'); }
    c.loopLen = EXPR[e] ? EXPR[e].period : 6;
  };
  TICK.expr = (c, t) => {
    const E = EXPR[c.a.expr]; if (!E) return;
    const tt = t % E.period;
    const mouth = pickKey(E.mouth, tt);
    setData(c.svg, 'data-mouth', mouth, 'neutral');
    if (E.eyes) setData(c.svg, 'data-eyes', pickKey(E.eyes, tt), 'closed');
    if (E.tilt) {
      const target = mouth === E.tilt ? 1 : 0;
      c.k += (target - c.k) * 0.06;
      const k = c.k;
      c.setHead(`translate(0 ${(-5 * k).toFixed(2)}) translate(120 120) scale(1 ${(1 - 0.045 * k).toFixed(4)}) translate(-120 -120)`);
    }
    if (c.puff) {
      const spots = [[92, 157, 11], [120, 161, 7], [148, 157, 11], [120, 180, 7]];
      const seg = 1.5, i = Math.floor(tt / seg) % 4, f = (tt % seg) / seg;
      const a = spots[i], b = spots[(i + 1) % 4], m = f < 0.6 ? 0 : ease((f - 0.6) / 0.4);
      c.puff.setAttribute('cx', (a[0] + (b[0] - a[0]) * m).toFixed(2));
      c.puff.setAttribute('cy', (a[1] + (b[1] - a[1]) * m).toFixed(2));
      c.puff.setAttribute('r', (a[2] + (b[2] - a[2]) * m).toFixed(2));
    }
    const k2 = 0.5 - 0.5 * Math.cos(tt * Math.PI * 2 / 3);
    c.ar.forEach(a => a.setAttribute('opacity', (0.5 + 0.5 * k2).toFixed(3)));
  };

  /* Kopf neigen */
  SETUP.tilt = c => {
    c.ar = [el('path', { d: c.side === 2 ? 'M150,20 C176,26 193,44 201,68' : 'M90,20 C64,26 47,44 39,68', class: 'zarrow', 'marker-end': 'url(#arr)' }, c.A)];
    c.loopLen = 6;
  };
  TICK.tilt = (c, t) => {
    const k = ease(t / 1.6);
    const sway = k >= 1 ? Math.sin(t * 2 * Math.PI / 5) * 0.07 : 0;
    const ang = (c.side === 2 ? 1 : -1) * 14 * (k + sway);
    c.setHead(`rotate(${ang.toFixed(2)} 120 232)`);
  };

  /* Schultern kreisen */
  SETUP.shoulders = c => {
    [c.A, c.B].forEach(L => el('path', { d: 'M32,272 C24,258 32,244 48,244', class: 'zarrow', 'marker-end': 'url(#arr)' }, L));
    c.loopLen = 4;
  };
  TICK.shoulders = (c, t) => {
    const f = (t % 4) / 4;
    const k = f < 0.35 ? ease(f / 0.35) : 1 - ease((f - 0.35) / 0.65);
    c.body.setAttribute('transform', `translate(0 ${(-8 * k).toFixed(2)})`);
  };

  /* Atem */
  SETUP.breath = c => {
    c.br = el('g', { class: 'breath' }, c.back);
    el('circle', { cx: 120, cy: 128, r: 106, class: 'br-fill' }, c.br);
    el('circle', { cx: 120, cy: 128, r: 106, class: 'br-ring' }, c.br);
    c.loopLen = 10;
  };
  TICK.breath = (c, t) => {
    const tt = t % 10;
    let s, word, n;
    if (tt < 4) { s = 0.84 + 0.16 * ease(tt / 4); word = 'Einatmen'; n = 4 - Math.floor(tt); }
    else { s = 1 - 0.16 * ease((tt - 4) / 6); word = 'Ausatmen'; n = 6 - Math.floor(tt - 4); }
    c.br.setAttribute('transform', `translate(120 128) scale(${s.toFixed(4)}) translate(-120 -128)`);
    c.label = `${word} · ${n}`;
  };

  /* Öl */
  SETUP.drops = c => {
    c.glow = el('ellipse', { cx: 120, cy: 128, rx: 60, ry: 74, class: 'glow' }, c.A);
    c.drop = el('path', { d: 'M0,-9 C4,-3 6,1 6,4 C6,8 3,10.5 0,10.5 C-3,10.5 -6,8 -6,4 C-6,1 -4,-3 0,-9 Z', class: 'drop', opacity: 0 }, c.A);
    c.loopLen = 3.2;
  };
  TICK.drops = (c, t) => {
    const P2 = 3.2, tt = t % P2;
    if (tt < 1.1) {
      const y = 2 + 120 * Math.pow(tt / 1.1, 2);
      c.drop.setAttribute('transform', `translate(96 ${y.toFixed(1)})`); c.drop.setAttribute('opacity', 1);
      c.glow.setAttribute('opacity', 0);
    } else {
      c.drop.setAttribute('opacity', 0);
      const f = (tt - 1.1) / (P2 - 1.1);
      c.glow.setAttribute('opacity', (0.42 * Math.sin(Math.PI * Math.min(1, f * 1.25))).toFixed(3));
      c.glow.setAttribute('transform', `translate(120 128) scale(${(0.55 + 0.45 * f).toFixed(3)}) translate(-120 -128)`);
    }
  };

  /* Palmieren */
  SETUP.palms = c => {
    c.svg.setAttribute('data-hands', 'palms');
    c.warm = [c.A, c.B].map(L => el('ellipse', { cx: 89, cy: 103, rx: 30, ry: 26, class: 'warm' }, L));
    c.loopLen = 4;
  };
  TICK.palms = (c, t) => { const k = 0.5 - 0.5 * Math.cos(t * Math.PI * 2 / 4); c.warm.forEach(w => w.setAttribute('opacity', (0.05 + 0.12 * k).toFixed(3))); };

  function mount(container, ex, opts = {}) {
    container.innerHTML = `<svg class="face-svg" viewBox="0 0 240 300" role="img" aria-label="Anleitung: ${ex.name}">${face()}</svg>`;
    return new Ctrl(container.querySelector('svg'), ex, opts);
  }

  /* ---------- Standbild für die Übungskarten ---------- */
  function thumb(ex) {
    const a = ex.anim || {};
    const m = a.mode || (ex.sides ? 'side' : 'center');
    const mirror = m === 'both' || m === 'alt';
    let A = '', back = '', attrs = '', headT = '', bodyT = '';
    const arr = list => (list || []).map(([x1, y1, x2, y2]) => `<path class="zarrow" d="M${x1},${y1} L${x2},${y2}" marker-end="url(#arr)"/>`).join('');
    switch (a.type) {
      case 'stroke': A = (a.phases ? a.phases.flat() : a.paths).map(n => `<path class="tpath" d="${P[n]}" marker-end="url(#arr)"/>`).join(''); break;
      case 'circles': A = a.at.map(([x, y, r]) => `<circle class="guide-ring${a.behind ? ' behind' : ''}" cx="${x}" cy="${y}" r="${r + 3.5}"/><circle class="pt-dot" cx="${x + r}" cy="${y}" r="4"/>`).join(''); break;
      case 'taps': A = a.path ? `<path class="guide" d="${P[a.path]}" marker-end="url(#arr)"/>` : a.points.map(([x, y]) => `<circle class="pt-dot" cx="${x}" cy="${y}" r="3.4"/>`).join(''); break;
      case 'points': A = a.phases.flat().map(([x, y]) => `<circle class="pt-dot" cx="${x}" cy="${y}" r="4.4"/>`).join(''); break;
      case 'zone': A = (a.zones || []).map(z => { const [cx, cy, rx, ry] = ZONES[z]; return `<ellipse class="zone" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" opacity=".55"/>`; }).join('') + arr(a.arrows); break;
      case 'expr': {
        const map = { kiss: 'data-mouth="kiss"', osmile: 'data-mouth="osmile"', fish: 'data-mouth="fish"', lion: 'data-mouth="lion" data-eyes="open"', puff: 'data-mouth="puff" data-puff="1"', vsign: 'data-hands="v" data-eyes="up"' };
        attrs = map[a.expr] || '';
        if (a.expr === 'kiss') { headT = 'translate(0 -5) translate(120 120) scale(1 .955) translate(-120 -120)'; A = arr([[204, 146, 200, 92]]); }
        A += arr(a.arrows);
        break;
      }
      case 'tilt': headT = 'rotate(-12 120 232)'; A = `<path class="zarrow" d="M90,20 C64,26 47,44 39,68" marker-end="url(#arr)"/>`; break;
      case 'shoulders': bodyT = 'translate(0 -6)'; A = `<path class="zarrow" d="M32,272 C24,258 32,244 48,244" marker-end="url(#arr)"/>`; break;
      case 'breath': back = `<circle class="br-fill" cx="120" cy="128" r="106"/><circle class="br-ring" cx="120" cy="128" r="106"/>`; break;
      case 'drops': A = `<ellipse class="glow" cx="120" cy="128" rx="54" ry="66" opacity=".3"/><path class="drop" transform="translate(96 72)" d="M0,-9 C4,-3 6,1 6,4 C6,8 3,10.5 0,10.5 C-3,10.5 -6,8 -6,4 C-6,1 -4,-3 0,-9 Z"/>`; break;
      case 'palms': attrs = 'data-hands="palms"'; break;
    }
    const mir = mirror && A ? `<g transform="${MIRROR}">${A}</g>` : '';
    const markup = face({ headT, bodyT }).replace('<g class="fx-back"></g>', `<g class="fx-back">${back}</g>`).replace('<g class="fx fx-a"></g>', `<g class="fx fx-a">${A}</g>`).replace(`<g class="fx fx-b" transform="${MIRROR}"></g>`, mir);
    return `<svg class="face-svg thumb" viewBox="4 0 232 296" aria-hidden="true" ${attrs}>${markup}</svg>`;
  }

  /* ---------- Gepresste Blätter ---------- */
  const LEAF = {
    haende: '<path class="ls" d="M12 21.6V19"/><path class="lf" d="M12 2.6C16.8 6.6 17.2 13.6 12 20.6C6.8 13.6 7.2 6.6 12 2.6Z"/><path class="lv" d="M12 5.5V19.6M12 10.4 9.6 8.4M12 13.8l2.6-2M12 17 9.8 15.2"/>',
    guasha: '<path class="ls" d="M12 21.6V13.4"/><path class="lf" d="M12 13.6C6.7 13.7 3 10.4 2.7 5.4C5.7 6.6 9 6 11.2 4.2L12 6.9l.8-2.7C15 6 18.3 6.6 21.3 5.4 21 10.4 17.3 13.7 12 13.6Z"/><path class="lv" d="M12 13.2 6.2 7.4M12 13.2 9.4 6.4M12 13.2l2.6-6.8M12 13.2l5.8-5.8"/>',
    roller: '<path class="ls" d="M12 18.8v2.8"/><path class="lf" d="M12 3.4c4.9 0 8 3.8 7.6 8.3-.4 4.6-3.8 7.4-7.6 7.4s-7.2-2.8-7.6-7.4C4 7.2 7.1 3.4 12 3.4Z"/><path class="lv" d="M12 6v12.2M12 10.4 9 8.2M12 13.2l3.2-2.4"/>',
    kombi: '<path class="ls" d="M6.6 21.6C8.6 15 11.6 9 18 2.8"/><path class="lf" d="M9.2 15.6c-3.6.2-5.6-1.6-6-4.2 2.8-.8 5.2.4 6 4.2Z"/><path class="lf" d="M12.4 10.4c-.6-3.4 1-5.8 3.6-6.6.8 2.8-.4 5.4-3.6 6.6Z"/><path class="lf" d="M13.6 11.4c3.2-1.4 6-.6 7.4 1.6-2.4 1.6-5.2 1.2-7.4-1.6Z"/><path class="lf" d="M8.6 17.8c1.8-2.8 4.6-3.6 7-2.6-1.2 2.6-4 3.6-7 2.6Z"/>'
  };
  const leaf = (kind, cls = '') => `<svg viewBox="0 0 24 24" class="leaf k-${LEAF[kind] ? kind : 'haende'} ${cls}" aria-hidden="true">${LEAF[kind] || LEAF.haende}</svg>`;

  /* Eukalyptuszweig mit Mondsichel, berechnet statt gezeichnet */
  function sprig({ w = 120, h = 140, n = 11, moon = true } = {}) {
    const p0 = [18, h - 6], p1 = [w * 0.62, h * 0.72], p2 = [w * 0.18, h * 0.32], p3 = [w * 0.6, 12];
    const bz = t => { const u = 1 - t; return [0, 1].map(i => u * u * u * p0[i] + 3 * u * u * t * p1[i] + 3 * u * t * t * p2[i] + t * t * t * p3[i]); };
    const d1 = t => { const u = 1 - t; return [0, 1].map(i => 3 * u * u * (p1[i] - p0[i]) + 6 * u * t * (p2[i] - p1[i]) + 3 * t * t * (p3[i] - p2[i])); };
    let leaves = '';
    for (let i = 0; i < n; i++) {
      const t = 0.08 + i * (0.86 / (n - 1));
      const [x, y] = bz(t), [dx, dy] = d1(t);
      const a = Math.atan2(dy, dx) * 180 / Math.PI;
      const side = i % 2 ? 1 : -1;
      const s = 1 - t * 0.5, rx = 10.5 * s, ry = 8 * s;
      const ang = a + side * 62, r = ang * Math.PI / 180;
      const cx = x + Math.cos(r) * rx * 0.95, cy = y + Math.sin(r) * rx * 0.95;
      const op = (0.62 + 0.3 * ((i * 37) % 10) / 10).toFixed(2);
      leaves += `<ellipse class="sp-leaf" cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" transform="rotate(${ang.toFixed(1)} ${cx.toFixed(1)} ${cy.toFixed(1)})" fill-opacity="${op}"/>`;
      leaves += `<path class="sp-vein" d="M${x.toFixed(1)},${y.toFixed(1)} L${(x + Math.cos(r) * rx * 1.7).toFixed(1)},${(y + Math.sin(r) * rx * 1.7).toFixed(1)}"/>`;
    }
    const mx = w - 16, my = 20, mr = 11;
    const moonPath = moon ? `<path class="sp-moon" d="M${mx},${my - mr} A${mr},${mr} 0 1,0 ${mx},${my + mr} A${(mr * 0.72).toFixed(1)},${mr} 0 1,1 ${mx},${my - mr} Z"/>` : '';
    return `<svg viewBox="0 0 ${w} ${h}" class="sprig" aria-hidden="true">${moonPath}<path class="sp-stem" d="M${p0} C${p1} ${p2} ${p3}"/>${leaves}</svg>`;
  }

  return { mount, thumb, leaf, sprig, P };
})();
