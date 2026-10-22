/* ===== Abendtau: App ===== */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const uid = () => Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-5);
  const clone = o => JSON.parse(JSON.stringify(o));

  /* ---------- Icons ---------- */
  const IC = {
    moon: '<path d="M19.5 14.6A7.8 7.8 0 1 1 9.4 4.5a6.3 6.3 0 0 0 10.1 10.1Z"/>',
    book: '<path d="M4 5.5C4 4.7 4.7 4 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5Z"/><path d="M20 5.5c0-.8-.7-1.5-1.5-1.5H13v16h5.5c.8 0 1.5-.7 1.5-1.5Z"/>',
    list: '<path d="M9 6.5h11M9 12h11M9 17.5h11"/><circle cx="4.6" cy="6.5" r="1.1"/><circle cx="4.6" cy="12" r="1.1"/><circle cx="4.6" cy="17.5" r="1.1"/>',
    cal: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/>',
    sound: '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4Z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>',
    mute: '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4Z"/><path d="m16 9.5 5 5M21 9.5l-5 5"/>',
    play: '<path d="M8 5.5v13l10.5-6.5Z" fill="currentColor"/>',
    pause: '<path d="M8.5 5.5v13M15.5 5.5v13" stroke-width="2.6"/>',
    next: '<path d="M6 6v12l8.5-6Z" fill="currentColor"/><path d="M18 6v12" stroke-width="2.2"/>',
    prev: '<path d="M18 6v12L9.5 12Z" fill="currentColor"/><path d="M6 6v12" stroke-width="2.2"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    shuffle: '<path d="M4 7h3.5c2 0 3.1 1 4.1 2.6l1.8 3c1 1.6 2.1 2.4 4.1 2.4H20"/><path d="M4 17h3.5c1.4 0 2.4-.5 3.2-1.4M13.3 8.4C14.1 7.5 15.1 7 16.5 7H20"/><path d="m17.5 4.5 2.5 2.5-2.5 2.5M17.5 14.5l2.5 2.5-2.5 2.5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    up: '<path d="m6 14 6-6 6 6"/>',
    down: '<path d="m6 10 6 6 6-6"/>',
    trash: '<path d="M4.5 7h15M10 11v6M14 11v6M6.5 7l1 12.5c.1.8.7 1.5 1.5 1.5h6c.8 0 1.4-.7 1.5-1.5L17.5 7M9.5 7V4.5h5V7"/>',
    edit: '<path d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17Z"/><path d="m14.5 7.5 3 3"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    chevL: '<path d="m14.5 6-6 6 6 6"/>',
    chevR: '<path d="m9.5 6 6 6-6 6"/>',
    info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.8v.2"/>',
    hand: '<path d="M8 12.5V6.8a1.5 1.5 0 0 1 3 0V11"/><path d="M11 10.5V5.3a1.5 1.5 0 0 1 3 0v5.2"/><path d="M14 10.5V6.8a1.5 1.5 0 0 1 3 0V13"/><path d="M17 10.8a1.5 1.5 0 0 1 3 0v3.4c0 3.9-3 6.8-6.8 6.8h-.7c-2.3 0-4-1-5.3-2.8l-2.6-3.7a1.6 1.6 0 0 1 2.4-2.1L8 14"/>',
    stone: '<path d="M3.5 8.6C7 4.6 14.5 3.8 19.2 7.2c2 1.5 2.1 4.3.4 6.1-3.6 3.9-10.6 5.4-15.2 2.6 1.6-1.9 1.4-5.1-.9-7.3Z"/><path d="M9.5 7.6c2-.7 4.3-.5 6 .6" opacity=".6"/>',
    roller: '<rect x="3" y="3.5" width="11" height="5" rx="2.5"/><path d="M8.5 8.5v3l7.5 7.5"/><rect x="14.5" y="17" width="6" height="3.6" rx="1.8" transform="rotate(45 17.5 18.8)"/>',
    layers: '<path d="m12 4 8.5 4.5L12 13 3.5 8.5Z"/><path d="m3.5 13 8.5 4.5 8.5-4.5"/>',
    drop: '<path d="M12 3.5c3.2 4 5.5 7 5.5 10a5.5 5.5 0 0 1-11 0c0-3 2.3-6 5.5-10Z"/>',
    breath: '<path d="M4 9h9a3 3 0 1 0-3-3M4 13h13a3 3 0 1 1-3 3M4 17h6"/>',
    copy: '<rect x="8.5" y="8.5" width="11" height="11" rx="2"/><path d="M15.5 8.5V6a1.5 1.5 0 0 0-1.5-1.5H6A1.5 1.5 0 0 0 4.5 6v8A1.5 1.5 0 0 0 6 15.5h2.5"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    leaf: '<path d="M5 19c0-8 5-13.5 14-14 .2 9-5.3 14-14 14Z"/><path d="M5 19 13 11"/>'
  };
  const ic = (n, cls = '') => `<svg viewBox="0 0 24 24" class="ic ${cls}" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${IC[n] || ''}</svg>`;
  const CAT_IC = { pflege: 'drop', ankommen: 'breath', yoga: 'hand', guasha: 'stone', roller: 'roller', abschluss: 'moon' };
  const TOOL_IC = { haende: 'hand', guasha: 'stone', roller: 'roller', kombi: 'layers' };

  /* ---------- Datum ---------- */
  const pad = n => String(n).padStart(2, '0');
  const fmtKey = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const dayKey = (d = new Date()) => fmtKey(new Date(d.getTime() - 4 * 3600e3)); // nach Mitternacht zählt noch zum Abend
  const keyDate = k => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d, 12); };
  const addDays = (k, n) => { const d = keyDate(k); d.setDate(d.getDate() + n); return fmtKey(d); };
  const fmt = (d, o) => { try { return new Intl.DateTimeFormat('de-AT', o).format(d); } catch (e) { return d.toLocaleDateString(); } };
  const fmtDur = s => { s = Math.max(0, Math.round(s)); return `${Math.floor(s / 60)}:${pad(s % 60)}`; };
  const mins = s => Math.max(1, Math.round(s / 60));
  const greeting = (d = new Date()) => { const h = d.getHours(); return (h >= 17 || h < 4) ? 'Guten Abend' : h < 11 ? 'Guten Morgen' : 'Hallo'; };
  const isEvening = () => greeting() === 'Guten Abend';
  const durLabel = ex => (ex.sides ? '2 × ' : '') + (ex.dur >= 60 && ex.dur % 60 === 0 ? `${ex.dur / 60} Min` : `${ex.dur} Sek`);
  const stepTime = s => (EX[s.id].sides ? '2 × ' : '') + fmtDur(s.dur);

  /* ---------- Zustand & Speicher ---------- */
  const KEY = 'abendtau.v1';
  const DEFAULTS = {
    settings: { name: 'Minelli', sound: true, voice: true, chime: true, ambient: 'meer', ambientVol: 0.35, rate: 0.95, voiceURI: '', theme: 'auto', stone: 'rose', pflege: true, wake: true, vibrate: true },
    sel: { tool: 'guasha', minutes: 10, focus: 'ausgewogen', pflege: true, shuffle: 0, shuffleDay: '' },
    log: [], routines: [], seeded: false
  };
  const TEMPLATES = () => [
    { id: uid(), name: 'Kurz vorm Schlafen', template: true, created: Date.now(), steps: [{ id: 'atem', dur: 60 }, { id: 'nacken-dehnen', dur: 20 }, { id: 'kiefer', dur: 45 }, { id: 'schlaefen', dur: 30 }, { id: 'druckpunkte', dur: 60 }, { id: 'palmieren', dur: 45 }] },
    { id: uid(), name: 'Sonntags-Glow', template: true, created: Date.now(), steps: [{ id: 'reinigen', dur: 60 }, { id: 'oel', dur: 30 }, { id: 'gs-hals', dur: 25 }, { id: 'gs-kinnlinie', dur: 25 }, { id: 'gs-wangen', dur: 30 }, { id: 'gs-augen', dur: 20 }, { id: 'gs-stirn', dur: 40 }, { id: 'gs-abschluss', dur: 20 }, { id: 'ro-kuehl', dur: 40 }, { id: 'nachtpflege', dur: 45 }] }
  ];
  let S = clone(DEFAULTS), storageOk = true;
  const cleanRoutines = list => list.filter(r => r && Array.isArray(r.steps)).map(r => ({ ...r, steps: r.steps.filter(s => s && EX[s.id]).map(s => ({ id: s.id, dur: Math.max(10, Math.min(180, Number(s.dur) || EX[s.id].dur)) })) }));
  function load() {
    let data = null;
    try { const raw = localStorage.getItem(KEY); if (raw) data = JSON.parse(raw); } catch (e) { storageOk = false; data = null; }
    if (data && typeof data === 'object') {
      Object.assign(S.settings, data.settings || {});
      Object.assign(S.sel, data.sel || {});
      if (Array.isArray(data.log)) S.log = data.log.filter(e => e && e.day && e.id);
      if (Array.isArray(data.routines)) S.routines = cleanRoutines(data.routines);
      S.seeded = !!data.seeded;
    }
    if (!TOOLS[S.sel.tool]) S.sel.tool = 'guasha';
    if (![5, 10, 15].includes(S.sel.minutes)) S.sel.minutes = 10;
    if (!FOCI[S.sel.focus]) S.sel.focus = 'ausgewogen';
    if (!S.seeded) { S.routines.push(...TEMPLATES()); S.seeded = true; save(); }
  }
  let saveT = 0;
  function save() {
    clearTimeout(saveT);
    saveT = setTimeout(() => {
      try { localStorage.setItem(KEY, JSON.stringify({ settings: S.settings, sel: S.sel, log: S.log, routines: S.routines, seeded: S.seeded })); storageOk = true; }
      catch (e) { storageOk = false; }
    }, 120);
  }

  const UI = { tab: 'heute', calMonth: null, selDay: null, libCat: 'alle', libFocus: 'alle', addForm: false, addTool: 'guasha', addMin: 10, logConfirm: null, draft: null, edConfirm: false, pickQ: '', setConfirm: null, backupMsg: '', backupCode: '' };
  const getPath = p => { const [r, k] = p.split('.'); const o = r === 'settings' ? S.settings : r === 'sel' ? S.sel : r === 'draft' ? UI.draft : UI; return o ? o[k] : undefined; };
  const setPath = (p, v) => { const [r, k] = p.split('.'); const o = r === 'settings' ? S.settings : r === 'sel' ? S.sel : r === 'draft' ? UI.draft : UI; if (o) o[k] = v; };

  /* ---------- Auswertung ---------- */
  const daySet = () => new Set(S.log.map(e => e.day));
  function streakNow() { const set = daySet(); let k = dayKey(); if (!set.has(k)) k = addDays(k, -1); let n = 0; while (set.has(k)) { n++; k = addDays(k, -1); } return n; }
  function streakMax() { const days = [...daySet()].sort(); let best = 0, cur = 0, prev = null; days.forEach(d => { cur = prev && addDays(prev, 1) === d ? cur + 1 : 1; best = Math.max(best, cur); prev = d; }); return best; }
  const dayEntries = k => S.log.filter(e => e.day === k).sort((a, b) => a.ts - b.ts);
  const kindOfDay = k => { const es = dayEntries(k); return es.length ? (es[es.length - 1].tool || 'haende') : null; };

  function todaySteps() {
    const sel = S.sel, dk = dayKey();
    if (sel.shuffleDay !== dk) { sel.shuffle = 0; sel.shuffleDay = dk; save(); }
    return generate(sel, `${dk}|${sel.tool}|${sel.minutes}|${sel.focus}|${sel.shuffle}`);
  }

  /* ---------- Darstellung ---------- */
  const rootEl = document.documentElement;
  let hostTheme = rootEl.getAttribute('data-theme');
  let applying = false;
  function applyLook() {
    applying = true;
    const t = S.settings.theme;
    if (t === 'dark' || t === 'light') rootEl.setAttribute('data-theme', t);
    else if (hostTheme) rootEl.setAttribute('data-theme', hostTheme);
    else rootEl.removeAttribute('data-theme');
    if (S.settings.stone && S.settings.stone !== 'rose') rootEl.setAttribute('data-stone', S.settings.stone); else rootEl.removeAttribute('data-stone');
    applying = false;
  }
  try {
    new MutationObserver(() => {
      if (applying) return;
      const t = S.settings.theme, cur = rootEl.getAttribute('data-theme');
      if (t === 'auto') hostTheme = cur; else if (cur !== t) applyLook();
    }).observe(rootEl, { attributes: true, attributeFilter: ['data-theme'] });
  } catch (e) {}

  let locks = 0;
  const lockScroll = () => { locks++; rootEl.classList.add('locked'); };
  const unlockScroll = () => { locks = Math.max(0, locks - 1); if (!locks) rootEl.classList.remove('locked'); };
  let toastT = 0;
  function toast(msg) { const t = $('#toast'); t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => { t.hidden = true; }, 2400); }
  const buzz = ms => { if (S.settings.vibrate && navigator.vibrate) { try { navigator.vibrate(ms); } catch (e) {} } };
  function updateSoundButtons() {
    $$('[data-act="sound-toggle"]').forEach(b => {
      b.setAttribute('aria-pressed', String(!!S.settings.sound));
      b.setAttribute('aria-label', S.settings.sound ? 'Ton ausschalten' : 'Ton einschalten');
      b.innerHTML = ic(S.settings.sound ? 'sound' : 'mute');
    });
  }

  /* ---------- Ansicht: Heute ---------- */
  function planList(steps) {
    return `<ol class="plan-list">${steps.map((s, i) => {
      const ex = EX[s.id];
      return `<li class="${ex.cat === 'pflege' && ex.role !== 'prep' ? 'care' : ''}"><span class="n">${pad(i + 1)}</span>${ic(CAT_IC[ex.cat])}<button class="nm" data-act="ex-open" data-id="${ex.id}">${esc(ex.name)}</button><span class="t">${stepTime(s)}</span></li>`;
    }).join('')}</ol>`;
  }
  function routineMeta(r) { return `${r.steps.length} Schritte · ca. ${mins(totalSecs(r.steps))} Min`; }
  function catStrip(steps) { return `<div class="cat-strip" aria-hidden="true">${steps.map(s => `<span class="c-${EX[s.id].cat}" style="flex:${stepCost(s)}"></span>`).join('')}</div>`; }

  function viewHome() {
    const now = new Date(), dk = dayKey(now), name = S.settings.name;
    const sel = S.sel, steps = todaySteps(), tot = totalSecs(steps);
    const careSecs = steps.filter(s => ['reinigen', 'serum', 'nachtpflege'].includes(s.id)).reduce((a, s) => a + stepCost(s), 0);
    const phrase = PHRASES[hashStr(dk) % PHRASES.length];
    const mon = (() => { const d = keyDate(dk); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return fmtKey(d); })();
    const set = daySet(), streak = streakNow(), doneToday = set.has(dk);
    const week = Array.from({ length: 7 }, (_, i) => {
      const k = addDays(mon, i), kind = kindOfDay(k), lbl = fmt(keyDate(k), { weekday: 'short' }).replace('.', '').slice(0, 2);
      return `<div class="day${kind ? ' done' : ''}${k === dk ? ' today' : ''}"><span class="pod">${kind ? Illus.leaf(kind) : ''}</span>${lbl}<span class="sr">${kind ? 'geübt' : 'offen'}</span></div>`;
    }).join('');
    const abende = n => `${n} ${n === 1 ? 'Abend' : 'Abende'}`;
    const note = doneToday
      ? `<b>${streak > 1 ? abende(streak) + ' in Folge.' : 'Heute geübt.'}</b> Das Blatt für heute ist gepresst.`
      : streak > 0 ? `<b>${abende(streak)} in Folge.</b> Heute Abend geht es weiter.` : 'Für jeden Abend, an dem du dir Zeit nimmst, wird ein Blatt gepresst.';
    const toolTiles = Object.entries(TOOLS).map(([k, t]) => `<button class="tool" data-act="set" data-key="sel.tool" data-val="${k}" aria-pressed="${sel.tool === k}">${ic(TOOL_IC[k])}<b>${t.label}</b><small>${t.hint}</small></button>`).join('');
    const minBtns = [5, 10, 15].map(m => `<button data-act="set" data-key="sel.minutes" data-val="${m}" data-num aria-pressed="${sel.minutes === m}">${m} Min</button>`).join('');
    const focusChips = Object.entries(FOCI).map(([k, f]) => `<button class="chip" data-act="set" data-key="sel.focus" data-val="${k}" aria-pressed="${sel.focus === k}">${f.label}</button>`).join('');
    const mine = S.routines.slice(0, 3).map(r => `<div class="routine-card"><div><h3>${esc(r.name)}${r.template ? '<span class="pill">Vorlage</span>' : ''}</h3><span class="meta">${routineMeta(r)}</span></div><button class="play-btn" data-act="routine-start" data-id="${r.id}" aria-label="${esc(r.name)} starten">${ic('play')}</button>${catStrip(r.steps)}</div>`).join('');
    return `
<section class="hero">
  <div>
    <p class="eyebrow">${fmt(now, { weekday: 'long', day: 'numeric', month: 'long' })}</p>
    <h1 class="greet">${greeting(now)},<em>${esc(name || 'du')}</em></h1>
    <p class="phrase">${phrase}</p>
  </div>
  <div class="hero-art">${Illus.sprig()}</div>
</section>
<section class="week" aria-label="Diese Woche">
  <div class="week-row">${week}</div>
  <p class="week-note">${ic('leaf')}<span>${note}</span></p>
</section>
<section class="card" aria-labelledby="h-tonight">
  <h2 class="h2" id="h-tonight">Heute Abend</h2>
  <div class="field"><span class="field-label">Hilfsmittel</span><div class="tool-grid">${toolTiles}</div></div>
  <div class="field"><span class="field-label">Dauer</span><div class="seg">${minBtns}</div></div>
  <div class="field"><span class="field-label">Fokus</span><div class="chips">${focusChips}</div><p class="hint">${FOCI[sel.focus].hint}</p></div>
  <label class="switch-row" for="sw-pflege"><span><b>Pflegeschritte einbauen</b><small>Reinigen und Serum zu Beginn, Nachtpflege am Ende</small></span><input type="checkbox" class="switch" id="sw-pflege" data-bind="sel.pflege" ${sel.pflege ? 'checked' : ''}></label>
  <div class="start-row"><button class="btn-primary" data-act="start-today">${ic('play')} Ritual beginnen <span class="sub">· ca. ${mins(tot)} Min</span></button></div>
  <div class="plan">
    <div class="plan-head"><h3>Ablauf</h3><button class="btn-text" data-act="shuffle">${ic('shuffle')} Neu mischen</button></div>
    <p class="plan-meta">${steps.length} Schritte${careSecs ? `, davon ${mins(careSecs)} Min Pflege` : ''}</p>
    ${planList(steps)}
    <div class="plan-actions"><button class="btn-ghost" data-act="save-today">${ic('plus')} Als eigene Routine speichern</button></div>
  </div>
</section>
${S.routines.length ? `<section class="section"><div class="section-head"><h2>Meine Routinen</h2><button class="btn-text" data-act="tab" data-tab="routinen">Alle ${ic('chevR')}</button></div><div class="routines">${mine}</div></section>` : ''}`;
  }

  /* ---------- Ansicht: Routinen ---------- */
  function viewRoutines() {
    const cards = S.routines.map(r => `
<div class="routine-card">
  <div><h3>${esc(r.name)}${r.template ? '<span class="pill">Vorlage</span>' : ''}</h3><span class="meta">${routineMeta(r)} · ${TOOLS[toolOf(r.steps)].label}</span></div>
  <button class="play-btn" data-act="routine-start" data-id="${r.id}" aria-label="${esc(r.name)} starten">${ic('play')}</button>
  ${catStrip(r.steps)}
  <div class="row"><button class="btn-ghost" data-act="routine-edit" data-id="${r.id}">${ic('edit')} Bearbeiten</button></div>
</div>`).join('');
    return `
<header class="page-head"><h1>Meine Routinen</h1><p>Stell dir deinen eigenen Ablauf zusammen: Übungen auswählen, Reihenfolge und Dauer anpassen.</p></header>
<div class="btn-row"><button class="btn-ghost" data-act="routine-new">${ic('plus')} Neue Routine</button><button class="btn-ghost" data-act="save-today">${ic('moon')} Heutige Auswahl übernehmen</button></div>
<div class="routines" style="margin-top:12px">${cards || `<div class="empty"><p>Noch keine eigene Routine. Stell dir eine zusammen oder übernimm die Auswahl von heute Abend.</p></div>`}</div>`;
  }

  /* ---------- Ansicht: Übungen ---------- */
  const LIB_CATS = [['alle', 'Alle'], ['yoga', 'Gesichtsyoga'], ['guasha', 'Gua Sha'], ['roller', 'Roller'], ['rahmen', 'Ankommen & Pflege']];
  function viewLibrary() {
    const inCat = ex => UI.libCat === 'alle' || (UI.libCat === 'rahmen' ? ['pflege', 'ankommen', 'abschluss'].includes(ex.cat) : ex.cat === UI.libCat);
    const inFocus = ex => UI.libFocus === 'alle' || ex.focus.includes(UI.libFocus);
    const list = EX_LIST.filter(ex => inCat(ex) && inFocus(ex));
    const cards = list.map(ex => `
<button class="specimen" data-act="ex-open" data-id="${ex.id}">
  <span class="mount">${Illus.thumb(ex)}</span>
  <span class="label">
    <span class="latin">${esc(ex.specimen ? ex.specimen[0] : CATS[ex.cat].label)}</span>
    <span class="nm">${esc(ex.name)}</span>
    <span class="meta">${ic(CAT_IC[ex.cat])}<span class="sr">${CATS[ex.cat].label}, </span>${durLabel(ex)}</span>
  </span>
</button>`).join('');
    const catChips = LIB_CATS.map(([k, l]) => `<button class="chip" data-act="set" data-key="ui.libCat" data-val="${k}" aria-pressed="${UI.libCat === k}">${l}</button>`).join('');
    const focChips = [['alle', 'Jeder Fokus'], ...Object.entries(FOCI).filter(([k]) => k !== 'ausgewogen').map(([k, f]) => [k, f.label])].map(([k, l]) => `<button class="chip" data-act="set" data-key="ui.libFocus" data-val="${k}" aria-pressed="${UI.libFocus === k}">${l}</button>`).join('');
    const know = KNOWLEDGE.map(k => `<details class="acc"><summary>${ic(k.icon === 'info' ? 'info' : k.icon)}${esc(k.title)}</summary><ul>${k.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul></details>`).join('');
    return `
<header class="page-head"><h1>Übungen</h1><p>Jede Übung mit animierter Anleitung. Die kleinen Etiketten nennen den Muskel oder die Stelle, um die es geht.</p></header>
<div class="filters"><div class="chips scroll" role="group" aria-label="Art">${catChips}</div><div class="chips scroll" role="group" aria-label="Fokus">${focChips}</div></div>
<p class="count-note">${list.length} ${list.length === 1 ? 'Übung' : 'Übungen'}</p>
<div class="specimens">${cards || '<p class="hint">Keine Übung passt zu diesem Filter.</p>'}</div>
<section class="know" aria-labelledby="h-know"><h2 id="h-know">Gut zu wissen</h2>${know}</section>`;
  }

  /* ---------- Ansicht: Verlauf ---------- */
  function viewHistory() {
    const dk = dayKey();
    if (!UI.calMonth) UI.calMonth = dk.slice(0, 7);
    if (!UI.selDay) UI.selDay = dk;
    const [y, m] = UI.calMonth.split('-').map(Number);
    const first = new Date(y, m - 1, 1, 12), daysIn = new Date(y, m, 0).getDate(), lead = (first.getDay() + 6) % 7;
    const dows = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(d => `<span class="cal-dow">${d}</span>`).join('');
    let cells = '';
    for (let i = 0; i < lead; i++) cells += '<span class="cal-day blank" aria-hidden="true"></span>';
    for (let d = 1; d <= daysIn; d++) {
      const k = `${y}-${pad(m)}-${pad(d)}`, kind = kindOfDay(k);
      const cls = ['cal-day', kind ? 'has' : '', k === dk ? 'today' : '', k === UI.selDay ? 'sel' : '', k > dk ? 'future' : ''].filter(Boolean).join(' ');
      cells += `<button class="${cls}" data-act="cal-day" data-day="${k}" aria-label="${fmt(keyDate(k), { day: 'numeric', month: 'long' })}${kind ? ', geübt' : ''}"><span class="num">${d}</span>${kind ? Illus.leaf(kind) : ''}</button>`;
    }
    const isCurrent = UI.calMonth === dk.slice(0, 7);
    const totalMin = Math.round(S.log.reduce((a, e) => a + (e.secs || 0), 0) / 60), sNow = streakNow(), nDays = daySet().size;
    const sel = UI.selDay, entries = dayEntries(sel);
    const entryHtml = entries.map(e => {
      const tm = fmt(new Date(e.ts), { hour: '2-digit', minute: '2-digit' });
      const title = [TOOLS[e.tool] ? TOOLS[e.tool].label : 'Ritual', e.focus && FOCI[e.focus] ? FOCI[e.focus].label : (e.name && !e.manual ? e.name : '')].filter(Boolean).join(' · ');
      const mood = e.mood && MOODS[e.mood] ? ` · ${MOODS[e.mood].label}` : '';
      return `<div class="entry">${Illus.leaf(e.tool || 'haende')}<div><b>${esc(title)}</b><small>${e.manual ? 'nachgetragen' : tm} · ${mins(e.secs || 0)} Min${mood}</small>${e.note ? `<p class="note">„${esc(e.note)}“</p>` : ''}
        ${UI.logConfirm === e.id ? `<div class="confirm-row">Eintrag löschen? <button class="btn-ghost danger" data-act="log-del-yes" data-id="${e.id}">${ic('trash')} Löschen</button><button class="btn-text" data-act="log-del-no">Abbrechen</button></div>` : ''}</div>
        <button class="mini-btn" data-act="log-del" data-id="${e.id}" aria-label="Eintrag löschen">${ic('trash')}</button></div>`;
    }).join('');
    const addForm = UI.addForm ? `
      <div class="addform">
        <div class="field"><span class="field-label">Womit</span><div class="chips">${Object.entries(TOOLS).map(([k, t]) => `<button class="chip" data-act="set" data-key="ui.addTool" data-val="${k}" aria-pressed="${UI.addTool === k}">${ic(TOOL_IC[k])} ${t.label}</button>`).join('')}</div></div>
        <div class="field"><span class="field-label">Wie lange</span><div class="seg">${[5, 10, 15].map(n => `<button data-act="set" data-key="ui.addMin" data-val="${n}" data-num aria-pressed="${UI.addMin === n}">${n} Min</button>`).join('')}</div></div>
        <div class="btn-row"><button class="btn-ghost" data-act="add-save">${ic('check')} Eintragen</button><button class="btn-text" data-act="add-cancel">Abbrechen</button></div>
      </div>` : '';
    const legend = Object.entries(TOOLS).map(([k, t]) => `<span>${Illus.leaf(k)}${t.label}</span>`).join('');
    return `
<header class="page-head"><h1>Verlauf</h1><p>Dein Herbarium: Jeder Abend mit Ritual wird als Blatt eingepresst. Die Blattform zeigt, womit du geübt hast.</p></header>
<div class="stats">
  <div class="stat hl"><b>${sNow}</b><span>${sNow === 1 ? 'Abend' : 'Abende'} in Folge</span></div>
  <div class="stat"><b>${streakMax()}</b><span>längste Serie</span></div>
  <div class="stat"><b>${nDays}</b><span>${nDays === 1 ? 'Abend' : 'Abende'} insgesamt</span></div>
  <div class="stat"><b>${totalMin}</b><span>${totalMin === 1 ? 'Minute' : 'Minuten'} insgesamt</span></div>
</div>
<section class="card cal" aria-label="Kalender">
  <div class="cal-head">
    <button class="icon-btn" data-act="cal-prev" aria-label="Voriger Monat">${ic('chevL')}</button>
    <h2>${fmt(first, { month: 'long', year: 'numeric' })}</h2>
    <button class="icon-btn" data-act="cal-next" aria-label="Nächster Monat" ${isCurrent ? 'disabled' : ''}>${ic('chevR')}</button>
  </div>
  <div class="cal-grid">${dows}${cells}</div>
  <div class="legend">${legend}</div>
</section>
<section class="card daydetail" aria-live="polite">
  <h3>${fmt(keyDate(sel), { weekday: 'long', day: 'numeric', month: 'long' })}</h3>
  ${entryHtml || `<p class="hint">${sel > dk ? 'Dieser Abend kommt noch.' : 'An diesem Abend gibt es noch keinen Eintrag.'}</p>`}
  ${sel <= dk && !UI.addForm ? `<div class="btn-row"><button class="btn-ghost" data-act="add-open">${ic('plus')} Abend nachtragen</button></div>` : ''}
  ${addForm}
</section>`;
  }

  function render() {
    const v = $('#view');
    v.innerHTML = UI.tab === 'routinen' ? viewRoutines() : UI.tab === 'uebungen' ? viewLibrary() : UI.tab === 'verlauf' ? viewHistory() : viewHome();
    $$('.tab').forEach(t => t.setAttribute('aria-current', t.dataset.tab === UI.tab ? 'page' : 'false'));
    updateSoundButtons();
  }

  /* ---------- Sheets ---------- */
  const sheets = [];
  function openSheet(id, renderFn, onMount) {
    const wrap = document.createElement('div');
    wrap.className = 'sheet-wrap'; wrap.dataset.sheet = id;
    wrap.innerHTML = '<div class="sheet" role="dialog" aria-modal="true"><div class="sheet-grip"></div><div class="sheet-body"></div></div>';
    wrap.addEventListener('click', e => { if (e.target === wrap) closeSheet(); });
    document.body.appendChild(wrap);
    const entry = { id, wrap, renderFn, onMount, ctrls: [], timers: [] };
    sheets.push(entry); lockScroll(); refreshSheet(entry);
    const h = wrap.querySelector('h2, .ex-title'); if (h) { h.setAttribute('tabindex', '-1'); try { h.focus({ preventScroll: true }); } catch (e) {} }
    return entry;
  }
  function cleanup(entry) { entry.ctrls.forEach(c => c.destroy()); entry.ctrls = []; entry.timers.forEach(t => clearInterval(t)); entry.timers = []; }
  function refreshSheet(entry = sheets[sheets.length - 1]) {
    if (!entry) return;
    cleanup(entry);
    const sh = entry.wrap.querySelector('.sheet'), top = sh.scrollTop;
    entry.wrap.querySelector('.sheet-body').innerHTML = entry.renderFn();
    sh.scrollTop = top;
    updateSoundButtons();
    if (entry.onMount) entry.onMount(entry);
  }
  function closeSheet() {
    const e = sheets.pop(); if (!e) return;
    cleanup(e); e.wrap.remove(); unlockScroll();
    if (sheets.length) refreshSheet(sheets[sheets.length - 1]);
  }
  const topSheet = id => { const e = sheets[sheets.length - 1]; return e && (!id || e.id === id) ? e : null; };
  const headClose = (title) => `<div class="sheet-head"><h2>${title}</h2><button class="icon-btn" data-act="sheet-close" aria-label="Schließen">${ic('close')}</button></div>`;

  function openExercise(id) {
    const ex = EX[id]; if (!ex) return;
    openSheet('ex', () => {
      const sp = ex.specimen;
      const foci = ex.focus.map(f => `<span class="chip">${FOCI[f].label}</span>`).join('');
      return `
<div class="sheet-head"><span class="badge">${ic(CAT_IC[ex.cat])} ${CATS[ex.cat].label}</span><button class="icon-btn" data-act="sheet-close" aria-label="Schließen">${ic('close')}</button></div>
<div class="ex-stage"><div class="illus"></div>${ex.sides ? '<span class="badge side-badge">Erste Seite</span>' : ''}</div>
${sp ? `<p class="latin ex-tagline">${esc(sp[0])} · ${esc(sp[1])}</p>` : ''}
<h2 class="ex-title">${esc(ex.name)}</h2>
<div class="ex-meta"><span class="chip">${ic('clock')} ${durLabel(ex)}</span>${ex.reps ? `<span class="chip">${esc(ex.reps)}</span>` : ''}${foci}</div>
<p class="ex-short">${esc(ex.short)}</p>
<ol class="steps">${ex.steps.map(s => `<li>${esc(s)}</li>`).join('')}</ol>
<div class="tipbox">${ic('leaf')}<span>${esc(ex.tip)}</span></div>
<div class="ex-actions"><button class="btn-primary" data-act="ex-single" data-id="${ex.id}">${ic('play')} Einzeln üben</button><button class="btn-ghost" data-act="ex-add" data-id="${ex.id}">${ic('plus')} Zur Routine</button></div>`;
    }, entry => {
      const c = Illus.mount($('.ex-stage .illus', entry.wrap), ex, { auto: true });
      entry.ctrls.push(c);
      const badge = $('.side-badge', entry.wrap);
      if (badge) entry.timers.push(setInterval(() => { badge.textContent = c.side === 2 ? 'Zweite Seite' : 'Erste Seite'; }, 300));
    });
  }

  function openAddTo(id) {
    const ex = EX[id];
    openSheet('addto', () => `
${headClose('Zur Routine')}
<p class="hint">„${esc(ex.name)}“ kommt ans Ende der Routine. Reihenfolge und Dauer kannst du danach anpassen.</p>
<div style="margin-top:8px">${S.routines.map(r => `<button class="list-btn" data-act="addto" data-rid="${r.id}" data-id="${id}">${ic('list')}<span>${esc(r.name)}<small>${routineMeta(r)}</small></span>${ic('plus', 'add')}</button>`).join('')}</div>
<div class="btn-row" style="margin-top:14px"><button class="btn-ghost" data-act="addto-new" data-id="${id}">${ic('plus')} Neue Routine mit dieser Übung</button></div>`);
  }

  function openEditor(r, steps, name) {
    UI.draft = r ? clone(r) : { id: uid(), name: name || '', steps: clone(steps || []), created: Date.now(), isNew: true };
    UI.edConfirm = false;
    openSheet('editor', renderEditor);
  }
  function renderEditor() {
    const d = UI.draft, tot = totalSecs(d.steps);
    const rows = d.steps.map((s, i) => {
      const ex = EX[s.id];
      return `<li class="ed-row">
  <div class="ed-top"><span class="n">${pad(i + 1)}</span><span><b>${esc(ex.name)}</b><small>${CATS[ex.cat].label}</small></span></div>
  <div class="ed-bottom">
    <div class="stepper"><button data-act="ed-dur" data-i="${i}" data-d="-5" aria-label="Kürzer">${ic('minus')}</button><output>${stepTime(s)}</output><button data-act="ed-dur" data-i="${i}" data-d="5" aria-label="Länger">${ic('plus')}</button></div>
    <div class="ed-move"><button class="mini-btn" data-act="ed-up" data-i="${i}" ${i === 0 ? 'disabled' : ''} aria-label="Nach oben">${ic('up')}</button><button class="mini-btn" data-act="ed-down" data-i="${i}" ${i === d.steps.length - 1 ? 'disabled' : ''} aria-label="Nach unten">${ic('down')}</button><button class="mini-btn" data-act="ed-del" data-i="${i}" aria-label="Entfernen">${ic('trash')}</button></div>
  </div>
</li>`;
    }).join('');
    return `
${headClose(d.isNew ? 'Neue Routine' : 'Routine bearbeiten')}
<div class="field"><label class="field-label" for="ed-name">Name</label><input class="text-in" id="ed-name" data-bind="draft.name" data-live value="${esc(d.name)}" placeholder="z. B. Sonntagabend" maxlength="40" autocomplete="off"></div>
${d.steps.length ? `<ol class="ed-list">${rows}</ol>` : '<div class="empty"><p>Noch keine Übungen. Füge die erste hinzu.</p></div>'}
<div class="btn-row"><button class="btn-ghost" data-act="ed-add">${ic('plus')} Übung hinzufügen</button></div>
${d.isNew ? '' : UI.edConfirm
        ? `<div class="confirm-row">Routine wirklich löschen? <button class="btn-ghost danger" data-act="ed-delete-yes">${ic('trash')} Ja, löschen</button><button class="btn-text" data-act="ed-delete-no">Abbrechen</button></div>`
        : `<div class="btn-row"><button class="btn-text" data-act="ed-delete">${ic('trash')} Routine löschen</button></div>`}
<div class="sheet-foot"><span class="tot">Gesamt<b>ca. ${mins(tot)} Min · ${d.steps.length} Schritte</b></span><button class="btn-primary" data-act="ed-save" ${d.steps.length ? '' : 'disabled'}>Speichern</button></div>`;
  }

  function pickerList() {
    const q = UI.pickQ.trim().toLowerCase();
    const groups = ['ankommen', 'pflege', 'yoga', 'guasha', 'roller', 'abschluss'].map(cat => {
      const exs = EX_LIST.filter(e => e.cat === cat && (!q || (e.name + ' ' + e.short + ' ' + (e.specimen || []).join(' ')).toLowerCase().includes(q)));
      if (!exs.length) return '';
      return `<p class="group-label">${CATS[cat].label}</p>` + exs.map(e => `<button class="list-btn" data-act="pick-add" data-id="${e.id}">${ic(CAT_IC[e.cat])}<span>${esc(e.name)}<small>${durLabel(e)} · ${esc(e.short)}</small></span>${ic('plus', 'add')}</button>`).join('');
    }).join('');
    return groups || '<p class="hint">Nichts gefunden.</p>';
  }
  function openPicker() {
    UI.pickQ = '';
    openSheet('picker', () => `
<div class="sheet-head"><h2>Übung hinzufügen</h2><button class="btn-text" data-act="sheet-close">${ic('check')} Fertig</button></div>
<input class="text-in search" id="pick-q" type="search" placeholder="Suchen, z. B. Kinn oder Masseter" value="${esc(UI.pickQ)}" autocomplete="off">
<div class="pick-list">${pickerList()}</div>`, entry => {
      const inp = $('#pick-q', entry.wrap);
      inp.addEventListener('input', () => { UI.pickQ = inp.value; $('.pick-list', entry.wrap).innerHTML = pickerList(); });
    });
  }

  function openSettings() { UI.setConfirm = null; UI.backupMsg = ''; UI.backupCode = ''; openSheet('settings', renderSettings); }
  function renderSettings() {
    const s = S.settings, vs = Voice.list();
    const seg = (key, opts) => `<div class="seg${opts.length === 4 ? ' four' : ''}">${opts.map(([v, l]) => `<button data-act="set" data-key="${key}" data-val="${v}" aria-pressed="${String(getPath(key)) === String(v)}">${l}</button>`).join('')}</div>`;
    const sw = (id, key, title, sub) => `<label class="switch-row" for="${id}"><span><b>${title}</b><small>${sub}</small></span><input type="checkbox" class="switch" id="${id}" data-bind="${key}" ${getPath(key) ? 'checked' : ''}></label>`;
    const rateWord = s.rate < 0.9 ? 'ruhig' : s.rate > 1.02 ? 'zügig' : 'normal';
    return `
${headClose('Einstellungen')}
<section class="set-group"><h3>Begrüßung</h3>
  <div class="field"><label class="field-label" for="set-name">Name in der Begrüßung</label><input class="text-in" id="set-name" data-bind="settings.name" value="${esc(s.name)}" maxlength="24" autocomplete="off"></div>
</section>
<section class="set-group"><h3>Ton</h3>
  ${sw('set-sound', 'settings.sound', 'Ton', 'Alles auf einmal an oder aus, wie der Lautsprecher-Knopf oben')}
  ${sw('set-voice', 'settings.voice', 'Sprachansagen', 'Eine Stimme sagt jede Übung an, das Handy kann am Spiegel lehnen')}
  ${sw('set-chime', 'settings.chime', 'Klangschale', 'Sanfter Ton bei jedem Übungs- und Seitenwechsel')}
  <div class="field" style="margin-top:8px"><span class="field-label">Hintergrundklang</span>${seg('settings.ambient', [['aus', 'Aus'], ['meer', 'Meer'], ['regen', 'Regen'], ['teppich', 'Klang']])}<p class="hint">Antippen spielt eine kurze Hörprobe.</p></div>
  <div class="range-row"><label for="set-vol">Lautstärke Hintergrund</label><output>${Math.round(s.ambientVol * 100)} %</output><input type="range" id="set-vol" min="0" max="1" step="0.05" value="${s.ambientVol}" data-bind="settings.ambientVol" data-live></div>
  <div class="range-row"><label for="set-rate">Sprechtempo</label><output>${rateWord}</output><input type="range" id="set-rate" min="0.75" max="1.15" step="0.05" value="${s.rate}" data-bind="settings.rate" data-live></div>
  ${vs.length ? `<div class="field"><label class="field-label" for="set-voiceuri">Stimme</label><select class="text-in" id="set-voiceuri" data-bind="settings.voiceURI"><option value="">Automatisch</option>${vs.map(v => `<option value="${esc(v.voiceURI)}" ${v.voiceURI === s.voiceURI ? 'selected' : ''}>${esc(v.name)} (${esc(v.lang)})</option>`).join('')}</select></div>`
        : `<p class="hint">${Voice.available() ? 'Auf diesem Gerät wurde keine deutsche Stimme gefunden. Die Ansagen nutzen dann die Standardstimme des Geräts.' : 'Dieser Browser unterstützt keine Sprachansagen.'}</p>`}
  <div class="btn-row"><button class="btn-ghost" data-act="test-voice">${ic('sound')} Stimme testen</button><button class="btn-ghost" data-act="test-chime">${ic('moon')} Klangschale testen</button></div>
</section>
<section class="set-group"><h3>Darstellung</h3>
  <div class="field"><span class="field-label">Farbschema</span>${seg('settings.theme', [['auto', 'Automatisch'], ['light', 'Hell'], ['dark', 'Dunkel']])}</div>
  <div class="field"><span class="field-label">Farbe von Stein und Roller</span>${seg('settings.stone', [['rose', 'Rosenquarz'], ['jade', 'Jade'], ['amethyst', 'Amethyst']])}</div>
</section>
<section class="set-group"><h3>Ablauf</h3>
  ${sw('set-pflege', 'settings.pflege', 'Pflegeschritte vorschlagen', 'Reinigen, Serum und Nachtpflege sind beim Öffnen eingeschaltet')}
  ${sw('set-wake', 'settings.wake', 'Bildschirm wach halten', 'Während des Rituals bleibt das Display an, wenn der Browser es erlaubt')}
  ${sw('set-vib', 'settings.vibrate', 'Vibration', 'Kurzes Vibrieren bei jedem Wechsel, auch wenn der Ton aus ist')}
</section>
<section class="set-group"><h3>Deine Daten</h3>
  <p class="hint">Verlauf und eigene Routinen bleiben in diesem Browser auf diesem Gerät. Öffne die App deshalb am besten immer im selben Browser. Mit dem Sicherungscode nimmst du alles mit.</p>
  ${storageOk ? '' : '<p class="notice" style="margin-top:8px">Dieser Browser erlaubt gerade kein Speichern. Die App funktioniert, merkt sich aber nichts.</p>'}
  <div class="btn-row"><button class="btn-ghost" data-act="backup-copy">${ic('copy')} Sicherungscode kopieren</button></div>
  ${UI.backupCode ? `<textarea class="text-in" id="backup-out" readonly aria-label="Sicherungscode">${esc(UI.backupCode)}</textarea>` : ''}
  <div class="field" style="margin-top:10px"><label class="field-label" for="backup-in">Sicherung einspielen</label><textarea class="text-in" id="backup-in" placeholder="Sicherungscode hier einfügen" autocomplete="off"></textarea></div>
  <div class="btn-row"><button class="btn-ghost" data-act="backup-restore">${ic('check')} Übernehmen</button></div>
  ${UI.backupMsg ? `<p class="notice">${esc(UI.backupMsg)}</p>` : ''}
  ${UI.setConfirm === 'log'
        ? `<div class="confirm-row">Den ganzen Verlauf löschen? <button class="btn-ghost danger" data-act="log-clear-yes">${ic('trash')} Ja, löschen</button><button class="btn-text" data-act="set-confirm-no">Abbrechen</button></div>`
        : `<div class="btn-row"><button class="btn-text" data-act="log-clear">${ic('trash')} Verlauf löschen</button></div>`}
</section>
<p class="fine">Abendtau ist eine Anleitung für Entspannung und Pflege. Sie ersetzt keine ärztliche oder kosmetische Beratung.</p>`;
  }

  /* ---------- Sicherung ---------- */
  function encode(obj) { const bytes = new TextEncoder().encode(JSON.stringify(obj)); let bin = ''; bytes.forEach(b => { bin += String.fromCharCode(b); }); return 'AT1.' + btoa(bin); }
  function decode(code) { const raw = code.replace(/^AT1\./, ''); const bin = atob(raw); return JSON.parse(new TextDecoder().decode(Uint8Array.from(bin, c => c.charCodeAt(0)))); }

  /* ---------- Wake Lock & Schleife ---------- */
  const Wake = {
    lock: null, want: false,
    async on() { this.want = !!S.settings.wake; if (!this.want || this.lock) return; try { if (navigator.wakeLock) { this.lock = await navigator.wakeLock.request('screen'); this.lock.addEventListener('release', () => { this.lock = null; }); } } catch (e) { this.lock = null; } },
    off() { this.want = false; try { if (this.lock) this.lock.release(); } catch (e) {} this.lock = null; }
  };
  const Loop = (() => {
    const fns = new Set(); let raf = 0, last = 0;
    const frame = now => { const dt = last ? (now - last) / 1000 : 0; last = now; fns.forEach(f => f(dt)); if (fns.size) raf = requestAnimationFrame(frame); else { raf = 0; last = 0; } };
    return { add(f) { fns.add(f); if (!raf) { last = 0; raf = requestAnimationFrame(frame); } }, remove(f) { fns.delete(f); } };
  })();

  /* ---------- Player ---------- */
  const Player = (() => {
    let st = null;
    const RING = 2 * Math.PI * 52;
    const P = () => $('#player');
    function buildItems(steps) {
      const items = [];
      steps.forEach((s, i) => {
        items.push({ k: 'prep', i, d: PREP });
        if (EX[s.id].sides) items.push({ k: 'run', i, side: 1, d: s.dur }, { k: 'switch', i, d: SWITCH }, { k: 'run', i, side: 2, d: s.dur });
        else items.push({ k: 'run', i, side: 0, d: s.dur });
      });
      return items;
    }
    const stepTotal = i => st.items.filter(x => x.i === i).reduce((a, x) => a + x.d, 0);
    const runTotal = i => st.items.filter(x => x.i === i && x.k === 'run').reduce((a, x) => a + x.d, 0);
    function hintFor(ex) {
      const m = { reinigen: 'Milde Reinigung und Handtuch', serum: 'Serum bereitstellen', oel: 'Gesichtsöl bereitstellen', nachtpflege: 'Nachtcreme bereitstellen' };
      if (m[ex.id]) return m[ex.id];
      if (ex.cat === 'guasha') return 'Gua Sha bereithalten';
      if (ex.cat === 'roller') return ex.id === 'ro-kuehl' ? 'Roller, am besten gekühlt' : 'Roller bereithalten';
      if (ex.cat === 'ankommen') return 'Bequem hinsetzen oder hinstellen';
      return 'Nur deine Hände';
    }
    function open(steps, meta = {}) {
      steps = (steps || []).filter(s => EX[s.id]);
      if (!steps.length) return;
      while (sheets.length) closeSheet();
      Sound.unlock();
      st = { steps: clone(steps), meta, items: buildItems(steps), idx: 0, el: 0, paused: false, practiced: 0, done: false, ctrl: null, ctrlId: null, fired: new Set(), lastT: '', lastCue: '' };
      const p = P(); p.hidden = false; p.classList.remove('paused'); lockScroll();
      const cover = $('#pl-cover'); cover.hidden = true; cover.innerHTML = '';
      $('#pl-progress').innerHTML = st.steps.map((s, i) => `<span style="flex:${Math.max(1, stepTotal(i))}"><i></i></span>`).join('');
      st.segs = $$('#pl-progress i');
      updateSoundButtons();
      if (S.settings.sound && S.settings.ambient !== 'aus') Sound.startAmbient(S.settings.ambient, S.settings.ambientVol);
      Wake.on();
      enter(0);
      Loop.add(tick);
    }
    function mountIllus(ex, side) {
      if (st.ctrl && st.ctrlId === ex.id) { st.ctrl.setSide(side); return; }
      if (st.ctrl) st.ctrl.destroy();
      st.ctrl = Illus.mount($('#pl-illus'), ex, { side }); st.ctrlId = ex.id;
      if (st.paused) st.ctrl.pause();
    }
    function fillInfo(i) {
      const ex = EX[st.steps[i].id], nx = st.steps[i + 1];
      $('#pl-meta').textContent = `${CATS[ex.cat].label} · Schritt ${i + 1} von ${st.steps.length}`;
      $('#pl-title').textContent = ex.name;
      $('#pl-short').textContent = ex.short;
      $('#pl-steps').innerHTML = ex.steps.map(x => `<li>${esc(x)}</li>`).join('');
      $('#pl-tip').innerHTML = `${ic('leaf')}<span>${esc(ex.tip)}</span>`;
      $('#pl-next').innerHTML = nx ? `Als Nächstes: <b>${esc(EX[nx.id].name)}</b>` : 'Danach: geschafft';
      $('#pl-more').open = false;
    }
    function setSide(text, sw) { const b = $('#pl-side'); b.hidden = !text; b.textContent = text || ''; b.classList.toggle('switch', !!sw); }
    function enter(idx) {
      st.idx = idx; st.el = 0; st.fired = new Set(); st.lastCue = '';
      const it = st.items[idx], ex = EX[st.steps[it.i].id];
      if (it.k === 'prep') {
        mountIllus(ex, 1); st.ctrl.setPhase(0); st.ctrl.restart();
        fillInfo(it.i); setSide(''); $('#pl-cue').textContent = '';
        const pr = $('#pl-prep'); pr.hidden = false;
        pr.innerHTML = `<p class="eyebrow">${it.i === 0 ? 'Gleich geht es los' : 'Als Nächstes'}</p><span class="count" id="pl-count">${PREP}</span><span class="tool-hint">${ic(CAT_IC[ex.cat])} ${hintFor(ex)}</span>`;
        const lead = it.i === 0 ? `Schön, dass du da bist${S.settings.name && isEvening() ? ', ' + S.settings.name : ''}. ` : '';
        Voice.say(`${lead}${ex.name}. ${ex.say}`);
      } else if (it.k === 'run') {
        $('#pl-prep').hidden = true;
        mountIllus(ex, it.side || 1);
        if (it.side === 2) st.ctrl.setPhase(0);
        st.ctrl.restart();
        setSide(ex.sides ? (it.side === 2 ? 'Zweite Seite' : 'Erste Seite') : '');
        $('#pl-cue').textContent = '';
      } else {
        setSide('Seite wechseln', true);
        if (st.ctrl) { st.ctrl.setPhase(0); st.ctrl.setSide(2); }
        Sound.ting(); buzz(40);
        Voice.say(ex.sideSay || 'Und jetzt die andere Seite.');
      }
      renderControls(); updateTime(true);
    }
    function tick(dt) {
      if (!st || st.done || st.paused) return;
      dt = Math.max(0, Math.min(dt, 0.25));
      const it = st.items[st.idx], ex = EX[st.steps[it.i].id];
      st.el += dt;
      if (it.k === 'run') {
        st.practiced += dt;
        (ex.cues || []).forEach((c, ci) => {
          if (!st.fired.has(ci) && st.el >= c.at * it.d) { st.fired.add(ci); if (st.ctrl) st.ctrl.setPhase(ci + 1); $('#pl-cue').textContent = c.label; Voice.say(c.say); }
        });
        if (ex.anim.type === 'breath' && st.ctrl && st.ctrl.label !== st.lastCue) { st.lastCue = st.ctrl.label; $('#pl-cue').textContent = st.lastCue; }
      }
      if (st.el >= it.d) { advance(); return; }
      updateTime();
    }
    function advance() {
      const it = st.items[st.idx], n = st.idx + 1;
      if (it.k === 'run' && (n >= st.items.length || st.items[n].k === 'prep')) { Sound.bowl(); buzz(25); }
      if (n >= st.items.length) { finish(true); return; }
      enter(n);
    }
    function updateTime(force) {
      const it = st.items[st.idx], rem = Math.max(0, it.d - st.el), sec = Math.ceil(rem - 1e-6);
      if (it.k === 'prep') { const c = $('#pl-count'); if (c && c.textContent !== String(sec)) c.textContent = String(Math.max(1, sec)); }
      const t = it.k === 'prep' ? fmtDur(runTotal(it.i)) : it.k === 'switch' ? '·' : fmtDur(sec);
      if (force || st.lastT !== t) { $('#pl-time').textContent = t; st.lastT = t; }
      const ring = it.k === 'run' ? st.el / it.d : it.k === 'switch' ? 1 : 0;
      $('#pl-ring').style.strokeDashoffset = (RING * (1 - Math.min(1, ring))).toFixed(1);
      const before = st.items.slice(0, st.idx).filter(x => x.i === it.i).reduce((a, x) => a + x.d, 0);
      const f = Math.min(1, (before + st.el) / stepTotal(it.i));
      st.segs.forEach((s, i) => { const w = i < it.i ? 100 : i > it.i ? 0 : f * 100; s.style.width = w.toFixed(1) + '%'; });
    }
    function renderControls() {
      const it = st.items[st.idx];
      const label = it.k === 'prep' && !st.paused ? 'Los' : st.paused ? 'Weiter' : 'Pause';
      $('#pl-state').innerHTML = `${ic(label === 'Pause' ? 'pause' : 'play')} ${label}`;
      $('#pl-toggle').setAttribute('aria-label', label === 'Los' ? 'Übung jetzt starten' : label === 'Weiter' ? 'Fortsetzen' : 'Pausieren');
      P().classList.toggle('paused', st.paused);
      $('#pl-prev').disabled = it.i === 0 && it.k === 'prep';
    }
    function pause() { if (!st || st.paused || st.done) return; st.paused = true; if (st.ctrl) st.ctrl.pause(); Voice.cancel(); Sound.dim(true); renderControls(); }
    function resume() { if (!st || !st.paused || st.done) return; st.paused = false; if (st.ctrl) st.ctrl.resume(); Sound.dim(false); Wake.on(); renderControls(); }
    function toggle() {
      if (!st || st.done) return;
      Sound.unlock();
      const it = st.items[st.idx];
      if (st.paused) { resume(); return; }
      if (it.k === 'prep') { enter(st.idx + 1); return; }
      pause();
    }
    function next() {
      if (!st || st.done) return;
      if (st.paused) resume();
      const cur = st.items[st.idx].i;
      const j = st.items.findIndex((x, k) => k > st.idx && x.k === 'prep' && x.i === cur + 1);
      Voice.cancel();
      if (j < 0) { finish(true); return; }
      enter(j);
    }
    function prev() {
      if (!st || st.done) return;
      if (st.paused) resume();
      const it = st.items[st.idx];
      const target = it.k === 'prep' && st.el < 1.5 ? Math.max(0, it.i - 1) : it.i;
      Voice.cancel();
      enter(st.items.findIndex(x => x.k === 'prep' && x.i === target));
    }
    function askClose() {
      if (!st) return;
      if (st.done) { close(); return; }
      pause();
      const m = Math.floor(st.practiced / 60), cover = $('#pl-cover');
      cover.innerHTML = `<div class="confirm-box"><h2>Ritual beenden?</h2><p class="sum">${st.practiced >= 120 ? `Deine ${m} Minuten kommen in den Verlauf.` : 'Für einen Eintrag im Verlauf braucht es mindestens zwei Minuten.'}</p><div class="btn-row"><button class="btn-primary" data-act="pl-stay" style="width:auto;padding:0 24px">Weiter üben</button><button class="btn-ghost" data-act="pl-end">Beenden</button></div></div>`;
      cover.hidden = false;
    }
    function stay() { $('#pl-cover').hidden = true; resume(); }
    function finish(complete) {
      if (!st || st.done) return;
      st.done = true; Loop.remove(tick);
      if (st.ctrl) st.ctrl.pause();
      Wake.off();
      const secs = Math.round(st.practiced);
      const logIt = (complete && secs >= 90) || secs >= 120;
      let entry = null;
      if (logIt) {
        entry = { id: uid(), day: dayKey(), ts: Date.now(), secs, tool: st.meta.tool || toolOf(st.steps), focus: st.meta.focus || null, name: st.meta.name || '', mood: null, note: '' };
        S.log.push(entry); save();
      }
      st.entry = entry;
      if (complete) { Sound.bowl({ strength: 1.3, pitch: 0.8 }); Voice.say(`Schön gemacht${S.settings.name ? ', ' + S.settings.name : ''}.${isEvening() ? ' Gute Nacht.' : ''}`); }
      Sound.stopAmbient(complete ? 5 : 1.5);
      if (entry) showDone(entry, complete); else { close(); toast(complete ? 'Schön geübt.' : 'Ritual beendet.'); }
    }
    function showDone(entry, complete) {
      const streak = streakNow(), tools = st.steps.some(s => ['guasha', 'roller'].includes(EX[s.id].cat));
      const cover = $('#pl-cover');
      cover.innerHTML = `<div>
  <div class="done-leaf">${Illus.leaf(entry.tool)}</div>
  <p class="eyebrow" style="margin:0">Ein Blatt mehr in deinem Herbarium</p>
  <h2>${complete ? 'Schön gemacht' : 'Gut, dass du da warst'}${S.settings.name ? `, ${esc(S.settings.name)}` : ''}.</h2>
  <p class="sum">${mins(entry.secs)} Minuten nur für dich · ${TOOLS[entry.tool] ? TOOLS[entry.tool].label : ''}${entry.focus && FOCI[entry.focus] ? ' · ' + FOCI[entry.focus].label : ''}</p>
  ${streak > 1 ? `<p class="streak">${ic('leaf')} ${streak} Abende in Folge</p>` : ''}
  <div class="field" style="margin:0"><span class="field-label">Wie fühlt sich dein Gesicht an?</span><div class="chips">${Object.entries(MOODS).map(([k, m]) => `<button class="chip" data-act="done-mood" data-mood="${k}" aria-pressed="false">${ic(m.icon)} ${m.label}</button>`).join('')}</div></div>
  <label for="done-note"><span class="field-label">Notiz für dich</span><textarea class="text-in" id="done-note" placeholder="Zum Beispiel: Haut heute etwas trocken" maxlength="280"></textarea></label>
  <ul class="aftercare">${tools ? '<li>Stein und Roller mit lauwarmem Wasser und milder Seife abwaschen und trocknen lassen.</li>' : ''}<li>Ein Glas Wasser tut jetzt gut.</li>${isEvening() ? '<li>Am schönsten geht es jetzt direkt ins Bett, solange die Ruhe noch da ist.</li>' : ''}</ul>
  <button class="btn-primary" data-act="done-close">${ic('check')} Fertig</button>
</div>`;
      cover.hidden = false; cover.scrollTop = 0;
    }
    function mood(k, btn) { if (!st || !st.entry) return; st.entry.mood = st.entry.mood === k ? null : k; $$('[data-act="done-mood"]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.mood === st.entry.mood))); save(); }
    function doneClose() { if (st && st.entry) { const n = $('#done-note'); st.entry.note = n ? n.value.trim() : ''; save(); } close(); }
    function close() {
      Loop.remove(tick);
      if (st && st.ctrl) st.ctrl.destroy();
      Voice.cancel(); Sound.stopAmbient(1.2); Wake.off();
      st = null;
      P().hidden = true; $('#pl-cover').hidden = true; $('#pl-illus').innerHTML = '';
      unlockScroll(); render();
    }
    return { open, toggle, next, prev, askClose, stay, finish, mood, doneClose, pause, running: () => !!st && !st.done };
  })();

  /* ---------- Aktionen ---------- */
  function afterSetting(k, v) {
    if (k === 'theme' || k === 'stone') applyLook();
    if (k === 'sound') { Sound.setMuted(!v); if (!v) Voice.cancel(); else if (Player.running() && S.settings.ambient !== 'aus' && !Sound.ambientOn()) Sound.startAmbient(S.settings.ambient, S.settings.ambientVol); updateSoundButtons(); }
    if (k === 'ambientVol') Sound.setAmbientVol(v);
    if (k === 'ambient' && !Player.running()) {
      Sound.stopAmbient(0.6);
      if (v !== 'aus' && S.settings.sound) { Sound.unlock(); Sound.startAmbient(v, S.settings.ambientVol); clearTimeout(afterSetting.t); afterSetting.t = setTimeout(() => { if (!Player.running()) Sound.stopAmbient(2); }, 6500); }
    }
    if (k === 'pflege') { S.sel.pflege = v; }
    if (k === 'name' || k === 'pflege') render();
  }

  const ACT = {
    tab: b => { UI.tab = b.dataset.tab; UI.logConfirm = null; render(); window.scrollTo(0, 0); },
    set: b => {
      const key = b.dataset.key; let val = b.dataset.val;
      if (b.hasAttribute('data-num')) val = Number(val);
      setPath(key, val);
      const root = key.split('.')[0];
      if (root === 'settings') { save(); afterSetting(key.split('.')[1], val); refreshSheet(topSheet('settings')); }
      else { if (root === 'sel') save(); render(); }
    },
    'sound-toggle': () => { S.settings.sound = !S.settings.sound; save(); Sound.unlock(); afterSetting('sound', S.settings.sound); const s = topSheet('settings'); if (s) refreshSheet(s); toast(S.settings.sound ? 'Ton an' : 'Ton aus'); },
    'settings-open': () => openSettings(),
    'sheet-close': () => closeSheet(),
    'start-today': () => { const sel = S.sel; Player.open(todaySteps(), { tool: sel.tool, focus: sel.focus, name: `${TOOLS[sel.tool].label} · ${FOCI[sel.focus].label}` }); },
    shuffle: () => { S.sel.shuffle = (S.sel.shuffle || 0) + 1; save(); render(); toast('Neu gemischt'); },
    'save-today': () => { const sel = S.sel; openEditor(null, todaySteps(), `${TOOLS[sel.tool].label} · ${FOCI[sel.focus].label}`); },
    'ex-open': b => openExercise(b.dataset.id),
    'ex-single': b => { const ex = EX[b.dataset.id]; Player.open([{ id: ex.id, dur: ex.dur }], { name: ex.name }); },
    'ex-add': b => openAddTo(b.dataset.id),
    addto: b => {
      const r = S.routines.find(x => x.id === b.dataset.rid), ex = EX[b.dataset.id]; if (!r || !ex) return;
      r.steps.push({ id: ex.id, dur: ex.dur }); delete r.template; save(); closeSheet(); render(); toast(`Zu „${r.name}“ hinzugefügt`);
    },
    'addto-new': b => { const ex = EX[b.dataset.id]; closeSheet(); openEditor(null, [{ id: ex.id, dur: ex.dur }], ''); },
    'routine-start': b => { const r = S.routines.find(x => x.id === b.dataset.id); if (r) Player.open(r.steps, { name: r.name }); },
    'routine-edit': b => { const r = S.routines.find(x => x.id === b.dataset.id); if (r) openEditor(r); },
    'routine-new': () => openEditor(null, [], ''),
    'ed-dur': b => { const s = UI.draft.steps[+b.dataset.i]; if (!s) return; s.dur = Math.max(10, Math.min(180, s.dur + Number(b.dataset.d))); refreshSheet(); },
    'ed-up': b => { const i = +b.dataset.i, a = UI.draft.steps; if (i > 0) { [a[i - 1], a[i]] = [a[i], a[i - 1]]; refreshSheet(); } },
    'ed-down': b => { const i = +b.dataset.i, a = UI.draft.steps; if (i < a.length - 1) { [a[i + 1], a[i]] = [a[i], a[i + 1]]; refreshSheet(); } },
    'ed-del': b => { UI.draft.steps.splice(+b.dataset.i, 1); refreshSheet(); },
    'ed-add': () => openPicker(),
    'pick-add': b => { const ex = EX[b.dataset.id]; if (!ex || !UI.draft) return; UI.draft.steps.push({ id: ex.id, dur: ex.dur }); toast(`„${ex.name}“ hinzugefügt`); },
    'ed-save': () => {
      const d = UI.draft; if (!d || !d.steps.length) return;
      const nameEl = $('#ed-name'); if (nameEl) d.name = nameEl.value;
      const r = { id: d.id, name: (d.name || '').trim() || 'Meine Routine', steps: d.steps, created: d.created || Date.now() };
      const i = S.routines.findIndex(x => x.id === d.id);
      if (i >= 0) S.routines[i] = r; else S.routines.unshift(r);
      save(); UI.draft = null; closeSheet(); render(); toast('Routine gespeichert');
    },
    'ed-delete': () => { UI.edConfirm = true; refreshSheet(); },
    'ed-delete-no': () => { UI.edConfirm = false; refreshSheet(); },
    'ed-delete-yes': () => { const d = UI.draft; S.routines = S.routines.filter(x => x.id !== d.id); save(); UI.draft = null; closeSheet(); render(); toast('Routine gelöscht'); },
    'cal-prev': () => { const [y, m] = UI.calMonth.split('-').map(Number); const d = new Date(y, m - 2, 1); UI.calMonth = `${d.getFullYear()}-${pad(d.getMonth() + 1)}`; render(); },
    'cal-next': () => { const [y, m] = UI.calMonth.split('-').map(Number); const d = new Date(y, m, 1); UI.calMonth = `${d.getFullYear()}-${pad(d.getMonth() + 1)}`; render(); },
    'cal-day': b => { UI.selDay = b.dataset.day; UI.addForm = false; UI.logConfirm = null; render(); },
    'log-del': b => { UI.logConfirm = b.dataset.id; render(); },
    'log-del-no': () => { UI.logConfirm = null; render(); },
    'log-del-yes': b => { S.log = S.log.filter(e => e.id !== b.dataset.id); UI.logConfirm = null; save(); render(); toast('Eintrag gelöscht'); },
    'add-open': () => { UI.addForm = true; render(); },
    'add-cancel': () => { UI.addForm = false; render(); },
    'add-save': () => {
      const k = UI.selDay || dayKey();
      S.log.push({ id: uid(), day: k, ts: keyDate(k).getTime() + 9 * 3600e3, secs: UI.addMin * 60, tool: UI.addTool, focus: null, name: '', manual: true, mood: null, note: '' });
      UI.addForm = false; save(); render(); toast('Abend nachgetragen');
    },
    'test-voice': () => { Sound.unlock(); if (!S.settings.sound || !S.settings.voice) { toast('Ton oder Sprachansagen sind ausgeschaltet'); return; } Voice.say(`${greeting()}, ${S.settings.name || ''}. So klingen die Ansagen.`); },
    'test-chime': () => { Sound.unlock(); if (!S.settings.sound || !S.settings.chime) { toast('Ton oder Klangschale sind ausgeschaltet'); return; } Sound.bowl(); },
    'backup-copy': () => {
      const code = encode({ v: 1, settings: S.settings, log: S.log, routines: S.routines });
      UI.backupCode = code;
      const done = ok => { UI.backupMsg = ok ? 'Sicherungscode kopiert. Bewahre ihn zum Beispiel in einer Notiz auf.' : 'Kopieren hat nicht geklappt. Markiere den Code im Feld und kopiere ihn von Hand.'; refreshSheet(topSheet('settings')); if (!ok) { const t = $('#backup-out'); if (t) { t.focus(); t.select(); } } };
      try { navigator.clipboard.writeText(code).then(() => done(true), () => done(false)); } catch (e) { done(false); }
    },
    'backup-restore': () => {
      const raw = (($('#backup-in') || {}).value || '').trim().replace(/\s+/g, '');
      if (!raw) { UI.backupMsg = 'Füge zuerst einen Sicherungscode ein.'; refreshSheet(topSheet('settings')); return; }
      try {
        const data = decode(raw);
        if (!data || !Array.isArray(data.log) || !Array.isArray(data.routines)) throw new Error('format');
        const ids = new Set(S.log.map(e => e.id)); let nl = 0;
        data.log.forEach(e => { if (e && e.day && e.id && !ids.has(e.id)) { S.log.push(e); nl++; } });
        const sig = r => r.name + '|' + r.steps.map(x => x.id + ':' + x.dur).join(',');
        const rids = new Set(S.routines.map(r => r.id)), sigs = new Set(S.routines.map(sig)); let nr = 0;
        cleanRoutines(data.routines).forEach(r => { if (!rids.has(r.id) && !sigs.has(sig(r))) { S.routines.push(r); nr++; } });
        if (data.settings && typeof data.settings === 'object') Object.assign(S.settings, data.settings);
        save(); applyLook();
        UI.backupMsg = `Übernommen: ${nl} ${nl === 1 ? 'Eintrag' : 'Einträge'} und ${nr} ${nr === 1 ? 'Routine' : 'Routinen'}.`;
        render();
      } catch (e) { UI.backupMsg = 'Dieser Code ließ sich nicht lesen. Prüfe, ob er vollständig kopiert wurde.'; }
      refreshSheet(topSheet('settings'));
    },
    'log-clear': () => { UI.setConfirm = 'log'; refreshSheet(topSheet('settings')); },
    'set-confirm-no': () => { UI.setConfirm = null; refreshSheet(topSheet('settings')); },
    'log-clear-yes': () => { S.log = []; UI.setConfirm = null; save(); render(); refreshSheet(topSheet('settings')); toast('Verlauf gelöscht'); },
    'pl-toggle': () => Player.toggle(),
    'pl-next': () => Player.next(),
    'pl-prev': () => Player.prev(),
    'pl-close': () => Player.askClose(),
    'pl-stay': () => Player.stay(),
    'pl-end': () => { $('#pl-cover').hidden = true; Player.finish(false); },
    'done-mood': b => Player.mood(b.dataset.mood, b),
    'done-close': () => Player.doneClose()
  };

  document.addEventListener('click', e => {
    const b = e.target.closest('[data-act]');
    if (!b || b.disabled) return;
    const fn = ACT[b.dataset.act];
    if (fn) { e.preventDefault(); fn(b, e); }
  });
  function bindSet(el) {
    const path = el.dataset.bind;
    const val = el.type === 'checkbox' ? el.checked : el.type === 'range' ? parseFloat(el.value) : el.value;
    setPath(path, val);
    const [root, key] = path.split('.');
    if (el.type === 'range') {
      const out = el.parentElement.querySelector('output');
      if (out) out.textContent = key === 'ambientVol' ? `${Math.round(val * 100)} %` : val < 0.9 ? 'ruhig' : val > 1.02 ? 'zügig' : 'normal';
    }
    if (root === 'settings') { save(); afterSetting(key, val); }
    if (root === 'sel') { save(); render(); }
  }
  document.addEventListener('change', e => { const el = e.target; if (el.matches && el.matches('[data-bind]') && !el.hasAttribute('data-live')) bindSet(el); });
  document.addEventListener('input', e => { const el = e.target; if (el.matches && el.matches('[data-bind][data-live]')) bindSet(el); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { if (sheets.length) closeSheet(); else if (Player.running()) Player.askClose(); }
    if (e.key === ' ' && Player.running() && !e.target.closest('input, textarea, button, select, summary')) { e.preventDefault(); Player.toggle(); }
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { if (Player.running()) Player.pause(); }
    else if (Wake.want && !Wake.lock) Wake.on();
  });

  /* ---------- Start ---------- */
  load();
  if (!S.sel.shuffleDay) S.sel.pflege = S.settings.pflege;
  Sound.config(() => S.settings);
  Voice.config(() => S.settings);
  applyLook();
  $('#brand-mark').innerHTML = '<svg class="mark leaf" viewBox="0 0 28 28" aria-hidden="true"><path class="lf" d="M4.5 23C4.5 12.5 11 5.2 23.5 4.2c.6 11.6-6.4 18.8-19 18.8Z"/><path class="lv" d="M4.5 23 15 12.5M10 17.5l-.6-4M13 14.5l4 .4"/><circle cx="19.6" cy="19.8" r="2.7" style="fill:var(--pollen)"/></svg>';
  $('#pl-prev').innerHTML = ic('prev');
  $('#pl-next-btn').innerHTML = ic('next');
  $('[data-act="pl-close"]').innerHTML = ic('close');
  $('[data-act="settings-open"]').innerHTML = ic('gear');
  $$('.tab').forEach(t => { const n = { heute: 'moon', routinen: 'list', uebungen: 'book', verlauf: 'cal' }[t.dataset.tab]; t.insertAdjacentHTML('afterbegin', ic(n)); });
  render();
  let lastDay = dayKey();
  setInterval(() => { const k = dayKey(); if (k !== lastDay && !Player.running() && !sheets.length) { lastDay = k; render(); } }, 60000);
})();
