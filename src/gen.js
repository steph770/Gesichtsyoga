/* ===== Abendtau: Ablauf-Generator ===== */
const PREP = 5, SWITCH = 3;
const stepCost = s => { const ex = EX[s.id]; return (ex.sides ? 2 * s.dur + SWITCH : s.dur) + PREP; };
const totalSecs = steps => steps.reduce((a, s) => a + stepCost(s), 0);
const practiceSecs = steps => steps.reduce((a, s) => a + (EX[s.id].sides ? 2 * s.dur : s.dur), 0);
function toolOf(steps) {
  const has = c => steps.some(s => EX[s.id] && EX[s.id].cat === c);
  const g = has('guasha'), r = has('roller');
  return g && r ? 'kombi' : g ? 'guasha' : r ? 'roller' : 'haende';
}
function hashStr(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function rng(seed) {
  let a = (seed >>> 0) || 1;
  return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

/* Baut aus Hilfsmittel, Dauer und Fokus einen Ablauf: Ankommen, Öffnen am Hals, Hauptteil, Abschluss.
   Der Hauptteil wird nach Fokus gewichtet und mit einem Tages-Seed gemischt, damit die Abende variieren. */
function generate({ tool, minutes, focus, pflege }, seed) {
  const budget = minutes * 60;
  const scale = minutes === 5 ? 0.75 : minutes === 15 ? 1.1 : 1;
  const rnd = rng(hashStr(seed));
  const D = ex => Math.max(15, Math.round(ex.dur * scale / 5) * 5);
  const out = [], have = new Set();
  let used = 0;
  const take = (id, dur) => {
    const ex = EX[id]; if (!ex || have.has(id)) return;
    const d = dur || D(ex);
    out.push({ id, dur: d }); have.add(id); used += stepCost({ id, dur: d });
  };

  take('atem', minutes === 5 ? 40 : 60);
  if (minutes === 15 || (minutes === 10 && (focus === 'kiefer' || focus === 'entspannen'))) take('schultern', 30);
  if (tool !== 'haende') take('oel', minutes === 5 ? 25 : 30);
  if (focus === 'abschwellen' || minutes === 15 || (minutes === 10 && focus === 'ausgewogen' && tool === 'haende')) take('schluesselbein', minutes === 5 ? 20 : 30);
  if (tool === 'guasha' || tool === 'kombi') take('gs-hals');
  if (tool === 'roller') take('ro-hals');

  const closers = [];
  if (tool === 'haende') closers.push('abschluss-haende');
  if (tool === 'guasha' || tool === 'kombi') closers.push('gs-abschluss');
  if (tool === 'roller' || tool === 'kombi') closers.push('ro-kuehl');
  if (minutes >= 10 || focus === 'entspannen') closers.push('palmieren');
  const closerCost = closers.reduce((a, id) => a + stepCost({ id, dur: D(EX[id]) }), 0);

  const toolCat = tool === 'roller' ? 'roller' : tool === 'haende' ? null : 'guasha';
  const pool = EX_LIST.filter(ex => !ex.role && !have.has(ex.id) && ex.modes.includes(tool) && (ex.cat === 'yoga' || ex.cat === toolCat));
  let toolCap = { 5: 3, 10: 5, 15: 7 }[minutes] || 5;
  let yogaCap = tool === 'haende' ? 99 : ({ 5: 1, 10: 2, 15: 4 }[minutes] || 2);
  if (focus === 'kiefer' && tool !== 'haende') { yogaCap += 1; toolCap = Math.max(2, toolCap - 1); }
  const scored = pool.map(ex => ({
    ex,
    s: ex.prio + (focus === 'ausgewogen' ? 1 : ex.focus.includes(focus) ? 3.5 : 0) + rnd() * 2.2 - (ex.cat === 'yoga' && tool !== 'haende' ? 0.6 : 0)
  })).sort((a, b) => b.s - a.s);

  const mainBudget = budget - used - closerCost, tol = 15;
  let mainUsed = 0, nTool = 0, nYoga = 0;
  const picked = [];
  for (const { ex } of scored) {
    const yoga = ex.cat === 'yoga';
    if (yoga ? nYoga >= yogaCap : nTool >= toolCap) continue;
    const c = stepCost({ id: ex.id, dur: D(ex) });
    if (mainUsed + c > mainBudget + tol) continue;
    picked.push(ex); mainUsed += c; if (yoga) nYoga++; else nTool++;
  }
  if (mainBudget - mainUsed > 40) {
    for (const { ex } of scored) {
      if (picked.includes(ex)) continue;
      const c = stepCost({ id: ex.id, dur: D(ex) });
      if (mainUsed + c <= mainBudget + tol) { picked.push(ex); mainUsed += c; }
    }
  }
  picked.forEach(ex => take(ex.id));
  closers.forEach(id => take(id));
  if (pflege) { take('reinigen', 60); take('serum', 30); take('nachtpflege', 45); }
  out.sort((a, b) => EX[a.id].order - EX[b.id].order);
  return out;
}
