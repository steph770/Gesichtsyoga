/* ===== Abendtau: Inhalte ===== */

const TOOLS = {
  haende: { label: 'Hände',   hint: 'Reines Gesichtsyoga' },
  guasha: { label: 'Gua Sha', hint: 'Mit dem Stein' },
  roller: { label: 'Roller',  hint: 'Mit dem Gesichtsroller' },
  kombi:  { label: 'Kombi',   hint: 'Gua Sha, danach kühlender Roller' }
};

const FOCI = {
  ausgewogen:  { label: 'Ausgewogen',      hint: 'Von allem etwas' },
  entspannen:  { label: 'Entspannen',      hint: 'Ruhig werden, gut einschlafen' },
  abschwellen: { label: 'Abschwellen',     hint: 'Sanfte Lymphdrainage für ein frisches Gesicht' },
  kiefer:      { label: 'Kiefer & Nacken', hint: 'Spannung im Kiefer und Nacken lösen' },
  konturen:    { label: 'Konturen',        hint: 'Stirn, Augen, Wangen, Kinnlinie' }
};

const CATS = {
  pflege:    { label: 'Pflege' },
  ankommen:  { label: 'Ankommen' },
  yoga:      { label: 'Gesichtsyoga' },
  guasha:    { label: 'Gua Sha' },
  roller:    { label: 'Roller' },
  abschluss: { label: 'Abschluss' }
};

const ALL_MODES = ['haende', 'guasha', 'roller', 'kombi'];

const MOODS = {
  entspannt: { label: 'Entspannt', icon: 'leaf' },
  frisch:    { label: 'Frisch',    icon: 'drop' },
  muede:     { label: 'Müde',      icon: 'moon' }
};

const EX_LIST = [
  /* ---------- Pflege ---------- */
  {
    id: 'reinigen', name: 'Sanft reinigen', cat: 'pflege', role: 'care-start',
    modes: ALL_MODES, focus: [], order: 0, dur: 60, prio: 0,
    short: 'Make-up und den Tag mit einer milden Reinigung abnehmen.',
    steps: [
      'Make-up zuerst entfernen, dann eine milde Reinigung mit lauwarmem Wasser verwenden.',
      'Mit den Fingerkuppen in kleinen, ruhigen Kreisen einmassieren.',
      'Gründlich abspülen und mit einem Handtuch trocken tupfen, nicht reiben.'
    ],
    tip: 'Lauwarm statt heiß: Heißes Wasser trocknet die Haut aus.',
    say: 'Wir beginnen mit einem sauberen Gesicht. Reinige dein Gesicht sanft mit lauwarmem Wasser und tupfe es trocken.',
    anim: { type: 'circles', tool: 'finger', at: [[90, 144, 6], [100, 72, 6], [112, 189, 5]], mode: 'both' }
  },
  {
    id: 'serum', name: 'Serum einklopfen', cat: 'pflege', role: 'care-start',
    modes: ALL_MODES, focus: [], order: 1, dur: 30, prio: 0,
    short: 'Ein paar Tropfen Serum mit den Fingerkuppen sanft einklopfen.',
    steps: [
      '2 bis 3 Tropfen Serum auf die Fingerkuppen geben.',
      'Auf Stirn, Wangen und Kinn verteilen und sanft einklopfen, wie leichter Regen.',
      'Kurz einziehen lassen.'
    ],
    tip: 'Leicht feuchte Haut nimmt ein Serum besonders gut auf.',
    say: 'Gib ein paar Tropfen Serum auf die Fingerkuppen und klopfe es sanft ein, wie leichter Regen.',
    anim: { type: 'taps', tool: 'finger', points: [[100, 72], [140, 72], [120, 63], [88, 140], [152, 140], [96, 157], [144, 157], [120, 191], [108, 126], [132, 126]] }
  },

  /* ---------- Ankommen ---------- */
  {
    id: 'atem', name: 'Ankommen', cat: 'ankommen', role: 'arrival',
    modes: ALL_MODES, focus: ['entspannen'], order: 5, dur: 60, prio: 0,
    short: 'Vier Sekunden ein, sechs Sekunden aus. Folge dem Kreis.',
    steps: [
      'Setz oder stell dich bequem hin und lass die Schultern sinken.',
      'Durch die Nase 4 Sekunden einatmen, 6 Sekunden langsam ausatmen.',
      'Die Zunge liegt locker, die Zähne berühren sich nicht.'
    ],
    tip: 'Ein langes Ausatmen hilft dem Körper, in den Ruhemodus zu wechseln. Ideal vor dem Schlafen.',
    say: 'Komm an. Atme vier Sekunden durch die Nase ein, und sechs Sekunden langsam aus. Lass die Schultern sinken.',
    anim: { type: 'breath' }
  },
  {
    id: 'schultern', name: 'Schultern kreisen', cat: 'ankommen', role: 'arrival-extra',
    modes: ALL_MODES, focus: ['kiefer', 'entspannen'], order: 6, dur: 30, prio: 1,
    reps: '5×',
    short: 'Schultern langsam nach hinten kreisen lassen.',
    steps: [
      'Schultern hochziehen, nach hinten rollen und tief sinken lassen.',
      'Langsam, im Rhythmus deines Atems, etwa 5 Mal.',
      'Zum Schluss die Schultern locker hängen lassen.'
    ],
    tip: 'Viel Spannung im Kiefer hängt mit Schultern und Nacken zusammen.',
    say: 'Kreise deine Schultern langsam nach hinten. Hoch, zurück, und tief sinken lassen.',
    anim: { type: 'shoulders' }
  },

  /* ---------- Gesichtsyoga ---------- */
  {
    id: 'nacken-dehnen', name: 'Nacken dehnen', cat: 'yoga',
    modes: ALL_MODES, focus: ['kiefer', 'entspannen'], order: 7, dur: 20, sides: true, prio: 1,
    reps: '3 Atemzüge',
    short: 'Ohr sanft Richtung Schulter neigen, drei ruhige Atemzüge.',
    steps: [
      'Kopf langsam zur Seite neigen, das Ohr Richtung Schulter.',
      'Die andere Schulter bleibt unten, gern mit der Hand sanft nach unten schieben.',
      'Drei ruhige Atemzüge, dann langsam zur Mitte zurück.'
    ],
    tip: 'Nur so weit, wie es angenehm zieht, und nie ruckartig.',
    say: 'Neige deinen Kopf sanft zur Seite, das Ohr Richtung Schulter. Atme ruhig in die Dehnung.',
    sideSay: 'Langsam zur Mitte, und jetzt zur anderen Seite.',
    anim: { type: 'tilt', dir: 'side' }
  },
  {
    id: 'nackenmassage', name: 'Nackenansatz lösen', cat: 'yoga',
    modes: ALL_MODES, focus: ['kiefer', 'entspannen'], order: 8, dur: 40, prio: 1,
    short: 'Fingerkuppen unter den Hinterkopf legen und kleine Kreise ziehen.',
    steps: [
      'Fingerkuppen beider Hände an den unteren Rand des Hinterkopfs legen, dort wo die Nackenmuskeln ansetzen.',
      'Den Kopf ein wenig in die Finger sinken lassen.',
      'Kleine, langsame Kreise, nach und nach von der Mitte nach außen bis hinter die Ohren.'
    ],
    tip: 'Hier sitzen Muskeln, die bei Bildschirmarbeit gern fest werden.',
    say: 'Leg die Fingerkuppen unter den Hinterkopf, lass den Kopf hineinsinken, und massiere in kleinen Kreisen.',
    anim: { type: 'circles', tool: 'finger', at: [[62, 148, 5], [72, 158, 5]], mode: 'both', behind: true }
  },

  /* ---------- Vorbereitung für Hilfsmittel ---------- */
  {
    id: 'oel', name: 'Gesichtsöl auftragen', cat: 'pflege', role: 'prep',
    modes: ['guasha', 'roller', 'kombi'], focus: [], order: 10, dur: 30, prio: 0,
    short: '4 bis 6 Tropfen Öl in den Händen wärmen und sanft einpressen.',
    steps: [
      '4 bis 6 Tropfen Gesichtsöl in die Handflächen geben und kurz verreiben.',
      'Hände auf Gesicht und Hals legen und das Öl sanft einpressen.',
      'Das Öl sorgt dafür, dass Stein und Roller gleiten, statt an der Haut zu ziehen.'
    ],
    tip: 'Zieht der Stein an der Haut, nimm einfach noch ein, zwei Tropfen nach.',
    say: 'Wärme ein paar Tropfen Gesichtsöl in deinen Händen und presse es sanft auf Gesicht und Hals.',
    anim: { type: 'drops' }
  },
  {
    id: 'schluesselbein', name: 'Schlüsselbein öffnen', cat: 'yoga', role: 'opener-pre',
    modes: ALL_MODES, focus: ['abschwellen'], order: 12, dur: 30, prio: 1,
    reps: '10×',
    short: 'Mit zwei Fingern sanft in die Grube über dem Schlüsselbein pumpen.',
    steps: [
      'Zeige- und Mittelfinger in die kleine Grube oberhalb der Schlüsselbeine legen.',
      'Mit ganz leichtem Druck nach unten und innen drücken, dann lösen, etwa 10 Mal.',
      'Hier fließt die Lymphe, also die Gewebeflüssigkeit, zurück ins Blut. Deshalb beginnt jede Lymphdrainage an dieser Stelle.'
    ],
    tip: 'Ganz wenig Druck reicht, die Lymphbahnen liegen direkt unter der Haut.',
    say: 'Leg zwei Finger in die Grube über deinen Schlüsselbeinen und pumpe sanft, ganz ohne Kraft.',
    anim: { type: 'points', phases: [[[86, 247]]], mode: 'both', pump: true }
  },
  {
    id: 'hals-ausstreichen', name: 'Hals ausstreichen', cat: 'yoga',
    modes: ['haende'], focus: ['abschwellen', 'entspannen'], order: 13, dur: 40, prio: 2,
    reps: '8×',
    short: 'Mit flachen Fingern vom Ohr den Hals hinab zum Schlüsselbein streichen.',
    steps: [
      'Finger flach unterhalb der Ohren anlegen.',
      'Langsam seitlich am Hals hinunter bis zum Schlüsselbein streichen, wie Wasser, das abfließt.',
      'Beide Seiten gleichzeitig, etwa 8 Mal.'
    ],
    tip: 'Leicht wie ein Pinselstrich: Lymphdrainage braucht keinen Druck.',
    say: 'Streiche mit flachen Fingern von unterhalb der Ohren den Hals hinunter bis zu den Schlüsselbeinen.',
    anim: { type: 'stroke', tool: 'finger', paths: ['neck1'], mode: 'both' }
  },

  /* ---------- Gua Sha: Öffnen ---------- */
  {
    id: 'gs-hals', name: 'Hals öffnen', cat: 'guasha', role: 'opener',
    modes: ['guasha', 'kombi'], focus: ['abschwellen', 'konturen'], order: 13, dur: 25, sides: true, prio: 3,
    reps: '5× pro Bahn',
    short: 'Mit der langen Kante vom Ohr den Hals hinab zum Schlüsselbein.',
    steps: [
      'Den Stein fast flach halten, etwa im Winkel von 15 Grad zur Haut.',
      'Mit der langen Kante von unterhalb des Ohrs seitlich am Hals hinunter bis zum Schlüsselbein streichen.',
      'Danach etwas weiter vorn am Hals, immer abwärts und mit sehr leichtem Druck.'
    ],
    tip: 'Wir beginnen am Hals, damit die Flüssigkeit aus dem Gesicht später gut abfließen kann. Nie auf den Kehlkopf drücken.',
    say: 'Halte den Stein fast flach. Streiche mit der langen Kante vom Ohr den Hals hinunter bis zum Schlüsselbein. Ganz sanft.',
    anim: { type: 'stroke', tool: 'guasha', paths: ['neck1', 'neck2'] }
  },
  {
    id: 'gs-dekollete', name: 'Dekolleté', cat: 'guasha',
    modes: ['guasha', 'kombi'], focus: ['abschwellen'], order: 14, dur: 15, sides: true, prio: 0,
    reps: '5×',
    short: 'Unter dem Schlüsselbein von der Mitte nach außen streichen.',
    steps: [
      'Den Stein unterhalb des Schlüsselbeins nahe der Brustbeinmitte ansetzen.',
      'Entlang des Schlüsselbeins nach außen Richtung Schulter streichen, 5 Mal.'
    ],
    tip: 'Ein schöner Übergang, wenn du ein paar Minuten mehr Zeit hast.',
    say: 'Streiche unterhalb des Schlüsselbeins von der Mitte nach außen zur Schulter.',
    anim: { type: 'stroke', tool: 'guasha', paths: ['clav'] }
  },

  /* ---------- Kinn & Hals ---------- */
  {
    id: 'kuss-decke', name: 'Kuss an die Decke', cat: 'yoga',
    modes: ALL_MODES, focus: ['konturen'], order: 20, dur: 40, prio: 1,
    reps: '5×',
    short: 'Kopf leicht in den Nacken, Lippen spitzen, kurz halten.',
    steps: [
      'Den Kopf langsam etwas in den Nacken legen, nur so weit, wie es angenehm ist.',
      'Lippen spitzen, als wolltest du die Decke küssen. 3 bis 5 Sekunden halten.',
      'Lösen, Kopf zur Mitte, 5 Mal wiederholen.'
    ],
    tip: 'Du spürst die Dehnung vorn am Hals und unter dem Kinn.',
    say: 'Lege den Kopf sanft etwas in den Nacken, spitze die Lippen, als wolltest du die Decke küssen, und halte kurz.',
    anim: { type: 'expr', expr: 'kiss' }
  },
  {
    id: 'zunge', name: 'Zunge an den Gaumen', cat: 'yoga',
    modes: ALL_MODES, focus: ['konturen'], order: 21, dur: 40, prio: 1,
    reps: '5×',
    short: 'Zunge flach an den Gaumen drücken, Kinn leicht heben.',
    steps: [
      'Lippen geschlossen, die Zunge flach an den oberen Gaumen pressen.',
      'Kinn leicht anheben, bis du die Muskeln unter dem Kinn spürst. 5 Sekunden halten.',
      'Lösen und 5 Mal wiederholen.'
    ],
    tip: 'Ein unauffälliges Training für die Partie unter dem Kinn. Geht sogar nebenbei auf dem Sofa.',
    say: 'Drücke deine Zunge flach an den Gaumen, hebe das Kinn ein wenig und halte fünf Sekunden.',
    anim: { type: 'zone', zones: ['chin'], arrows: [[120, 229, 120, 211]] }
  },
  {
    id: 'kinn-hals', name: 'Kinnlinie ausstreichen', cat: 'yoga',
    modes: ['haende'], focus: ['konturen', 'abschwellen'], order: 22, dur: 40, prio: 2,
    reps: '8×',
    short: 'Mit den Fingerknöcheln vom Kinn entlang der Kinnlinie zum Ohr.',
    steps: [
      'Hände zu lockeren Fäusten formen, die mittleren Fingerknöchel unters Kinn legen.',
      'Mit sanftem Druck entlang der Kinnlinie bis unter die Ohren streichen.',
      'Beide Seiten gleichzeitig, 8 Mal.'
    ],
    tip: 'Eine Spur Creme oder Öl macht die Bewegung angenehmer.',
    say: 'Lege die Fingerknöchel unter dein Kinn und streiche entlang der Kinnlinie bis unter die Ohren.',
    anim: { type: 'stroke', tool: 'knuckle', paths: ['jaw'], mode: 'both' }
  },
  {
    id: 'gs-kinnlinie', name: 'Kinnlinie', cat: 'guasha',
    modes: ['guasha', 'kombi'], focus: ['konturen', 'abschwellen'], order: 23, dur: 25, sides: true, prio: 3,
    reps: '5×',
    short: 'Mit der Kerbe vom Kinn bis unters Ohr ziehen.',
    steps: [
      'Die Kerbe des Steins, also die herzförmige Einbuchtung, an die Kinnmitte legen, so dass sie die Kinnlinie umfasst.',
      'Langsam entlang des Kiefers bis unters Ohr ziehen.',
      'Am Ende kurz sanft hin und her wackeln, dann neu ansetzen. 5 Mal.'
    ],
    tip: 'Mit der freien Hand die Haut am Kinn leicht festhalten, dann gleitet der Stein sauber.',
    say: 'Leg die Kerbe des Steins an dein Kinn und ziehe ihn langsam entlang der Kinnlinie bis unters Ohr.',
    anim: { type: 'stroke', tool: 'guasha', paths: ['jaw'] }
  },

  /* ---------- Kiefer ---------- */
  {
    id: 'kiefer', name: 'Kiefer lösen', cat: 'yoga',
    modes: ALL_MODES, focus: ['kiefer', 'entspannen'], order: 25, dur: 45, prio: 2,
    short: 'Die Kaumuskeln mit kleinen, langsamen Kreisen massieren.',
    steps: [
      'Zähne leicht auseinander, den Unterkiefer locker hängen lassen.',
      'Fingerkuppen auf die Kaumuskeln legen. Du findest sie, wenn du kurz die Zähne zusammenbeißt: dort, wo sich die Wange vor dem Ohr wölbt.',
      'Kleine, langsame Kreise mit angenehmem Druck. Wo es fest ist, kurz verweilen.'
    ],
    tip: 'Viele pressen tagsüber oder nachts unbewusst die Zähne zusammen. Abends zu lockern lohnt sich.',
    say: 'Lass den Unterkiefer locker hängen und massiere deine Kaumuskeln vor den Ohren in kleinen, langsamen Kreisen.',
    anim: { type: 'circles', tool: 'finger', at: [[76, 152, 6]], mode: 'both' }
  },
  {
    id: 'gs-kiefer', name: 'Kaumuskel mit dem Stein', cat: 'guasha',
    modes: ['guasha', 'kombi'], focus: ['kiefer'], order: 26, dur: 20, sides: true, prio: 1,
    reps: '5×',
    short: 'Mit der runden Kante vom Kieferwinkel aufwärts zum Wangenknochen.',
    steps: [
      'Zähne auseinander, der Kiefer bleibt locker.',
      'Die breite, runde Kante am Kieferwinkel ansetzen.',
      'Langsam nach oben bis zum Wangenknochen streichen, mit etwas mehr Druck als sonst im Gesicht. 5 Mal.'
    ],
    tip: 'An festen Stellen darfst du kurz verweilen und sanft drücken.',
    say: 'Setz die runde Kante am Kieferwinkel an und streiche langsam nach oben zum Wangenknochen.',
    anim: { type: 'stroke', tool: 'guasha', paths: ['mass'] }
  },
  {
    id: 'loewe', name: 'Löwe', cat: 'yoga',
    modes: ALL_MODES, focus: ['entspannen', 'kiefer'], order: 27, dur: 30, prio: 1,
    reps: '3×',
    short: 'Einatmen, beim Ausatmen Mund weit auf, Zunge raus, alles loslassen.',
    steps: [
      'Tief durch die Nase einatmen.',
      'Beim Ausatmen den Mund weit öffnen, die Zunge Richtung Kinn strecken, die Augen weit auf, und hörbar „haaa“ ausatmen.',
      'Das Gesicht wieder ganz entspannen. 3 Mal.'
    ],
    tip: 'Darf albern aussehen. Gerade das löst die Spannung im ganzen Gesicht.',
    say: 'Atme tief ein. Beim Ausatmen öffne den Mund weit, streck die Zunge heraus, und lass alles los.',
    anim: { type: 'expr', expr: 'lion' }
  },

  /* ---------- Wangen & Mund ---------- */
  {
    id: 'luftkugel', name: 'Luftkugel', cat: 'yoga',
    modes: ALL_MODES, focus: ['konturen', 'entspannen'], order: 30, dur: 30, prio: 0,
    short: 'Luft in den Mund nehmen und langsam von Wange zu Wange schieben.',
    steps: [
      'Lippen schließen und Luft in den Mund nehmen.',
      'Die Luft langsam von der einen Wange in die andere schieben, dann über die Oberlippe und unter die Unterlippe.',
      'Ruhig durch die Nase weiteratmen.'
    ],
    tip: 'Wie eine Mundspülung ohne Wasser. Lockert Wangen und Lippen.',
    say: 'Nimm Luft in den Mund und schiebe sie langsam von einer Wange zur anderen.',
    anim: { type: 'expr', expr: 'puff' }
  },
  {
    id: 'fischmund', name: 'Fischmund', cat: 'yoga',
    modes: ALL_MODES, focus: ['konturen'], order: 31, dur: 30, prio: 0,
    reps: '5×',
    short: 'Wangen einsaugen, versuchen zu lächeln, kurz halten.',
    steps: [
      'Die Wangen nach innen saugen, die Lippen formen einen Fischmund.',
      'Jetzt versuchen zu lächeln und 5 Sekunden halten.',
      'Lösen, 5 Mal wiederholen.'
    ],
    tip: 'Du spürst ein Ziehen in den Wangen, genau dort arbeitet es.',
    say: 'Sauge die Wangen nach innen, forme einen Fischmund, und versuche zu lächeln.',
    anim: { type: 'expr', expr: 'fish' }
  },
  {
    id: 'wangen-lift', name: 'Wangen-Lift', cat: 'yoga',
    modes: ALL_MODES, focus: ['konturen'], order: 32, dur: 40, prio: 1,
    reps: '5×',
    short: 'O-Mund formen, dann lächeln, bis sich die Wangen heben.',
    steps: [
      'Den Mund zu einem länglichen O formen und die Oberlippe über die Zähne ziehen.',
      'Die Mundwinkel nach oben ziehen, als würdest du lächeln. Die Wangen heben sich.',
      'Fingerkuppen leicht auf die Wangenknochen legen, 5 Sekunden halten, lösen. 5 Mal.'
    ],
    tip: 'Die Stirn bleibt dabei ganz glatt und entspannt.',
    say: 'Forme mit dem Mund ein O, zieh die Oberlippe über die Zähne, und lächle, bis sich deine Wangen heben.',
    anim: { type: 'expr', expr: 'osmile', arrows: [[88, 156, 84, 136], [152, 156, 156, 136]] }
  },
  {
    id: 'gs-wangen', name: 'Wangen & Wangenknochen', cat: 'guasha',
    modes: ['guasha', 'kombi'], focus: ['konturen', 'abschwellen'], order: 33, dur: 30, sides: true, prio: 3,
    reps: '5× pro Bahn',
    short: 'Mit der langen Kante unter dem Wangenknochen zum Ohr, dann darüber zur Schläfe.',
    steps: [
      'Die lange Kante neben dem Mundwinkel ansetzen und unter dem Wangenknochen entlang zum Ohr streichen, 5 Mal.',
      'Dann neben dem Nasenflügel ansetzen und über den Wangenknochen zur Schläfe streichen, 5 Mal.',
      'Am Ende jeder Bahn kurz wackeln und neu ansetzen.'
    ],
    tip: 'Immer in eine Richtung arbeiten: nach außen und leicht nach oben.',
    say: 'Streiche mit der langen Kante vom Mundwinkel unter dem Wangenknochen zum Ohr.',
    cues: [{ at: 0.5, label: 'Über den Wangenknochen', say: 'Jetzt vom Nasenflügel über den Wangenknochen zur Schläfe.' }],
    anim: { type: 'stroke', tool: 'guasha', phases: [['cheek'], ['cheekbone']] }
  },

  /* ---------- Augen ---------- */
  {
    id: 'augen-kreise', name: 'Augen-Regentropfen', cat: 'yoga',
    modes: ALL_MODES, focus: ['abschwellen', 'entspannen'], order: 40, dur: 40, prio: 1,
    short: 'Mit den Ringfingern sanft rund ums Auge tippen.',
    steps: [
      'Die Ringfinger nehmen, sie haben am wenigsten Kraft.',
      'Vom inneren Augenwinkel unter dem Auge nach außen tippen, wie leichte Regentropfen, dann über den Brauenknochen zurück.',
      'Ein paar Runden, ganz locker.'
    ],
    tip: 'Schön bei müden oder geschwollenen Augen. Nie direkt aufs Augenlid drücken.',
    say: 'Tippe mit den Ringfingern sanft rund um die Augen, wie leichte Regentropfen.',
    anim: { type: 'taps', tool: 'finger', path: 'orbit', mode: 'both' }
  },
  {
    id: 'augen-v', name: 'Das V', cat: 'yoga',
    modes: ALL_MODES, focus: ['konturen'], order: 41, dur: 40, prio: 1,
    reps: '3 bis 5×',
    short: 'Finger als V um die Augen, nach oben schauen, untere Lider anspannen.',
    steps: [
      'Mittelfinger an die inneren Enden der Augenbrauen, Zeigefinger an die äußeren Augenwinkel. So entsteht ein V.',
      'Nach oben schauen, dann die unteren Lider leicht anspannen, wie beim Blinzeln gegen die Sonne.',
      '5 Sekunden halten, entspannen, 3 bis 5 Mal.'
    ],
    tip: 'Nur sanft halten, die Finger sollen die Haut nicht ziehen.',
    say: 'Leg die Finger wie ein V um deine Augen, schau nach oben, und spanne die unteren Lider leicht an.',
    anim: { type: 'expr', expr: 'vsign' }
  },
  {
    id: 'gs-augen', name: 'Unter den Augen', cat: 'guasha',
    modes: ['guasha', 'kombi'], focus: ['abschwellen'], order: 42, dur: 20, sides: true, prio: 2,
    reps: '3 bis 5×',
    short: 'Mit der kleinsten Rundung ganz leicht vom inneren Augenwinkel zur Schläfe.',
    steps: [
      'Die kleinste Rundung des Steins nehmen und fast ohne Druck arbeiten, die Haut hier ist sehr dünn.',
      'Vom inneren Augenwinkel unter dem Auge entlang nach außen zur Schläfe streichen.',
      '3 bis 5 Mal, an der Schläfe kurz halten.'
    ],
    tip: 'Ein gekühlter Stein wirkt hier besonders erfrischend.',
    say: 'Nimm die kleinste Rundung und streiche ganz leicht vom inneren Augenwinkel unter dem Auge zur Schläfe.',
    anim: { type: 'stroke', tool: 'guasha', paths: ['undereye'] }
  },
  {
    id: 'gs-brauen', name: 'Augenbrauen', cat: 'guasha',
    modes: ['guasha', 'kombi'], focus: ['entspannen', 'konturen'], order: 45, dur: 15, sides: true, prio: 1,
    reps: '3 bis 5×',
    short: 'Über die Braue vom inneren Ende zur Schläfe streichen.',
    steps: [
      'Kerbe oder Kante am inneren Ende der Augenbraue ansetzen.',
      'Entlang der Braue nach außen bis zur Schläfe streichen und dort kurz halten.',
      '3 bis 5 Mal.'
    ],
    tip: 'Löst die Spannung, die sich beim Konzentrieren rund um die Brauen sammelt.',
    say: 'Streiche über deine Augenbraue nach außen bis zur Schläfe, und halte dort kurz.',
    anim: { type: 'stroke', tool: 'guasha', paths: ['brow'] }
  },

  /* ---------- Stirn ---------- */
  {
    id: 'gs-zornesfalte', name: 'Zwischen den Brauen', cat: 'guasha',
    modes: ['guasha', 'kombi'], focus: ['konturen', 'entspannen'], order: 50, dur: 20, prio: 1,
    reps: 'ca. 10×',
    short: 'Kurze Striche von der Nasenwurzel nach oben, abwechselnd links und rechts.',
    steps: [
      'Mit der kleinen Kante oder der Kerbe an der Nasenwurzel ansetzen.',
      'Kurze Striche nach oben Richtung Stirn, abwechselnd etwas links und rechts.',
      'Etwa 10 Mal, locker und zügig.'
    ],
    tip: 'Die senkrechten Linien hier heißen Zornesfalten. Sie entstehen oft durch Stirnrunzeln.',
    say: 'Setz an der Nasenwurzel an und mach kurze Striche nach oben, abwechselnd links und rechts.',
    anim: { type: 'stroke', tool: 'guasha', paths: ['gl'], mode: 'alt' }
  },
  {
    id: 'stirn-glaetten', name: 'Stirn glätten', cat: 'yoga',
    modes: ['haende'], focus: ['entspannen', 'konturen'], order: 51, dur: 40, prio: 2,
    reps: '8×',
    short: 'Mit flachen Fingern von der Stirnmitte zu den Schläfen streichen.',
    steps: [
      'Fingerspitzen beider Hände in der Stirnmitte aneinanderlegen.',
      'Mit sanftem Druck nach außen zu den Schläfen streichen und dort kurz kreisen.',
      'Die Brauen bleiben locker. 8 Mal.'
    ],
    tip: 'Stell dir vor, du streichst ein Tuch glatt.',
    say: 'Leg die Fingerspitzen in die Stirnmitte und streiche langsam nach außen zu den Schläfen.',
    anim: { type: 'stroke', tool: 'finger', paths: ['smooth'], mode: 'both' }
  },
  {
    id: 'gs-stirn', name: 'Stirn', cat: 'guasha',
    modes: ['guasha', 'kombi'], focus: ['konturen', 'entspannen'], order: 52, dur: 40, prio: 2,
    short: 'Von den Brauen nach oben zum Haaransatz, Bahn für Bahn.',
    steps: [
      'Die lange Kante über der Augenbraue ansetzen und senkrecht nach oben bis zum Haaransatz streichen.',
      'Bahn für Bahn von der Mitte nach außen arbeiten, auf beiden Seiten.',
      'Zum Schluss ein paar Mal quer von der Stirnmitte zu den Schläfen.'
    ],
    tip: 'Am Haaransatz kurz wackeln. Das fühlt sich an wie eine kleine Kopfmassage.',
    say: 'Streiche mit der langen Kante von den Brauen nach oben zum Haaransatz, Bahn für Bahn nach außen.',
    cues: [{ at: 0.7, label: 'Quer zu den Schläfen', say: 'Und jetzt ein paar Mal quer, von der Stirnmitte zu den Schläfen.' }],
    anim: { type: 'stroke', tool: 'guasha', phases: [['fh1', 'fh2', 'fh3'], ['fh4']], mode: 'alt' }
  },
  {
    id: 'schlaefen', name: 'Schläfen kreisen', cat: 'yoga',
    modes: ALL_MODES, focus: ['entspannen', 'kiefer'], order: 55, dur: 30, prio: 1,
    short: 'Fingerkuppen auf die Schläfen, langsame Kreise.',
    steps: [
      'Zeige- und Mittelfinger auf die Schläfen legen.',
      'Langsam kreisen, 5 Mal vorwärts, 5 Mal rückwärts.',
      'Dabei tief ausatmen.'
    ],
    tip: 'Gut, wenn der Tag noch im Kopf nachhallt.',
    say: 'Leg die Fingerkuppen auf die Schläfen und kreise langsam, erst in die eine, dann in die andere Richtung.',
    anim: { type: 'circles', tool: 'finger', at: [[66, 92, 5]], mode: 'both' }
  },
  {
    id: 'ohren', name: 'Ohren ausstreichen', cat: 'yoga',
    modes: ALL_MODES, focus: ['entspannen'], order: 56, dur: 30, prio: 0,
    short: 'Ohrmuscheln zwischen Daumen und Zeigefinger ausstreichen.',
    steps: [
      'Die Ohrmuscheln oben zwischen Daumen und Zeigefinger nehmen.',
      'Am Rand entlang nach unten ausstreichen und leicht kneten.',
      'Am Ende die Ohrläppchen sanft nach unten ziehen.'
    ],
    tip: 'Warme Ohren fühlen sich erstaunlich entspannend an.',
    say: 'Nimm die Ohrmuscheln zwischen Daumen und Zeigefinger, und streiche sie von oben nach unten aus.',
    anim: { type: 'stroke', tool: 'finger', paths: ['ear'], mode: 'both' }
  },
  {
    id: 'druckpunkte', name: 'Druckpunkte', cat: 'yoga',
    modes: ALL_MODES, focus: ['entspannen', 'abschwellen'], order: 57, dur: 60, prio: 2,
    short: 'Vier Punkte, jeweils drei ruhige Atemzüge sanft halten.',
    steps: [
      'Zwischen den Augenbrauen mit einem Finger, drei Atemzüge.',
      'Neben den Nasenflügeln, beidseitig, drei Atemzüge.',
      'Unter den Wangenknochen, dann an den Schläfen, jeweils drei Atemzüge.'
    ],
    tip: 'Das nennt man Akupressur: sanfter Fingerdruck auf bestimmte Punkte, angelehnt an die traditionelle chinesische Medizin. Angenehm darf es sein, schmerzhaft nie.',
    say: 'Wir halten ein paar Druckpunkte. Zuerst zwischen den Augenbrauen, sanft, für drei Atemzüge.',
    cues: [
      { at: 0.25, label: 'Neben den Nasenflügeln', say: 'Jetzt neben den Nasenflügeln.' },
      { at: 0.5,  label: 'Unter den Wangenknochen', say: 'Unter den Wangenknochen.' },
      { at: 0.75, label: 'An den Schläfen', say: 'Und an den Schläfen.' }
    ],
    anim: { type: 'points', phases: [[[120, 95]], [[108, 139]], [[88, 146]], [[66, 92]]], mode: 'both' }
  },

  /* ---------- Roller ---------- */
  {
    id: 'ro-hals', name: 'Hals rollen', cat: 'roller', role: 'opener',
    modes: ['roller'], focus: ['abschwellen'], order: 13, dur: 20, sides: true, prio: 3,
    reps: '5×',
    short: 'Von der Kinnlinie den Hals hinab Richtung Schlüsselbein rollen.',
    steps: [
      'Die große Rolle unter dem Kiefer ansetzen.',
      'Seitlich am Hals hinunter zum Schlüsselbein rollen.',
      'Abheben und neu ansetzen, nicht hin und her rollen. 5 Mal.'
    ],
    tip: 'Ein Roller aus dem Kühlschrank fühlt sich hier herrlich frisch an.',
    say: 'Setz den Roller unter dem Kiefer an und rolle den Hals hinunter Richtung Schlüsselbein.',
    anim: { type: 'stroke', tool: 'roller', paths: ['neck1', 'neck2'] }
  },
  {
    id: 'ro-kinnlinie', name: 'Kinnlinie rollen', cat: 'roller',
    modes: ['roller'], focus: ['konturen', 'abschwellen'], order: 23, dur: 20, sides: true, prio: 3,
    reps: '5 bis 8×',
    short: 'Vom Kinn entlang der Kinnlinie zum Ohr rollen.',
    steps: [
      'Den Roller an der Kinnmitte ansetzen.',
      'Entlang der Kinnlinie bis zum Ohr rollen.',
      'Abheben und neu ansetzen. 5 bis 8 Mal.'
    ],
    tip: 'Immer nur in eine Richtung rollen, nach außen.',
    say: 'Rolle von der Kinnmitte entlang der Kinnlinie bis zum Ohr. Abheben, neu ansetzen.',
    anim: { type: 'stroke', tool: 'roller', paths: ['jaw'] }
  },
  {
    id: 'ro-wangen', name: 'Wangen rollen', cat: 'roller',
    modes: ['roller'], focus: ['konturen', 'abschwellen'], order: 33, dur: 25, sides: true, prio: 3,
    reps: '5 bis 8×',
    short: 'Von der Nase über die Wange nach außen zum Ohr rollen.',
    steps: [
      'Den Roller neben der Nase ansetzen.',
      'Über die Wange nach außen und leicht nach oben Richtung Ohr rollen.',
      'Bahn für Bahn vom Mund bis zum Wangenknochen. 5 bis 8 Mal.'
    ],
    tip: 'Lieber langsam und gleichmäßig als schnell und viel.',
    say: 'Rolle von der Nase über die Wange nach außen bis zum Ohr.',
    anim: { type: 'stroke', tool: 'roller', paths: ['cheek', 'cheekbone'] }
  },
  {
    id: 'ro-augen', name: 'Augenpartie rollen', cat: 'roller',
    modes: ['roller'], focus: ['abschwellen'], order: 42, dur: 15, sides: true, prio: 2,
    reps: '3 bis 5×',
    short: 'Mit der kleinen Rolle vom inneren Augenwinkel nach außen.',
    steps: [
      'Die kleine Rolle verwenden, falls dein Roller zwei Seiten hat.',
      'Unter dem Auge vom inneren Winkel nach außen zur Schläfe rollen, ganz ohne Druck.',
      'Dann über der Braue nach außen. 3 bis 5 Mal.'
    ],
    tip: 'Gekühlt wirkt der Roller besonders gut gegen geschwollene Augen.',
    say: 'Nimm die kleine Rolle und rolle ganz leicht unter dem Auge nach außen zur Schläfe.',
    cues: [{ at: 0.5, label: 'Über der Braue', say: 'Jetzt über der Braue nach außen.' }],
    anim: { type: 'stroke', tool: 'roller', phases: [['undereye'], ['brow']] }
  },
  {
    id: 'ro-stirn', name: 'Stirn rollen', cat: 'roller',
    modes: ['roller'], focus: ['entspannen', 'konturen'], order: 52, dur: 30, prio: 2,
    short: 'Von den Brauen nach oben, dann von der Mitte zu den Schläfen.',
    steps: [
      'Den Roller über der Braue ansetzen und nach oben zum Haaransatz rollen.',
      'Bahn für Bahn über die ganze Stirn.',
      'Zum Schluss von der Stirnmitte nach außen zu den Schläfen.'
    ],
    tip: 'Auf der Stirn darf der Druck etwas kräftiger sein als unter den Augen.',
    say: 'Rolle von den Brauen nach oben zum Haaransatz, Bahn für Bahn, und zum Schluss zu den Schläfen.',
    anim: { type: 'stroke', tool: 'roller', paths: ['fh1', 'fh2', 'fh3', 'fh4'], mode: 'alt' }
  },

  /* ---------- Abschluss ---------- */
  {
    id: 'abschluss-haende', name: 'Ausstreichen zum Abschluss', cat: 'abschluss', role: 'closer',
    modes: ['haende'], focus: ['abschwellen', 'entspannen'], order: 60, dur: 40, prio: 0,
    reps: '5×',
    short: 'Von der Stirnmitte zu den Schläfen, vor den Ohren hinab und den Hals entlang.',
    steps: [
      'Die Hände flach in die Stirnmitte legen.',
      'Zu den Schläfen streichen, vor den Ohren nach unten und seitlich am Hals hinab bis zum Schlüsselbein.',
      'Ein fließender Zug, 5 Mal.'
    ],
    tip: 'So leitest du alles, was du gelockert hast, sanft Richtung Lymphknoten am Hals.',
    say: 'Streiche zum Abschluss von der Stirnmitte zu den Schläfen, vor den Ohren hinunter, und den Hals entlang bis zum Schlüsselbein.',
    anim: { type: 'stroke', tool: 'finger', paths: ['drain'], mode: 'both' }
  },
  {
    id: 'gs-abschluss', name: 'Abschluss-Drainage', cat: 'guasha', role: 'closer',
    modes: ['guasha', 'kombi'], focus: ['abschwellen'], order: 60, dur: 20, sides: true, prio: 0,
    reps: '3×',
    short: 'Von der Stirn über die Schläfe den Hals hinab, in einem Zug.',
    steps: [
      'Die lange Kante in der Stirnmitte ansetzen.',
      'Zur Schläfe streichen, vor dem Ohr hinunter und den Hals entlang bis zum Schlüsselbein.',
      'Ein langer, fließender Zug, 3 Mal pro Seite.'
    ],
    tip: 'Dieser Zug sammelt alles ein und schickt es Richtung Schlüsselbein.',
    say: 'Zum Abschluss ein langer Zug: von der Stirn zur Schläfe, vor dem Ohr hinunter, und den Hals entlang bis zum Schlüsselbein.',
    anim: { type: 'stroke', tool: 'guasha', paths: ['drain'] }
  },
  {
    id: 'ro-kuehl', name: 'Kühlende Runde', cat: 'roller', role: 'closer',
    modes: ['roller', 'kombi'], focus: ['abschwellen', 'entspannen'], order: 62, dur: 40, prio: 0,
    short: 'Mit dem Roller locker übers ganze Gesicht, nach außen und zum Hals hinab.',
    steps: [
      'Am schönsten mit einem Roller aus dem Kühlschrank.',
      'Locker über Stirn, Wangen und Kinnlinie nach außen rollen.',
      'Zum Schluss seitlich am Hals hinunter.'
    ],
    tip: 'Nach dem Gua Sha beruhigt die Kühle die leicht gerötete Haut.',
    say: 'Rolle zum Abschluss locker über das ganze Gesicht nach außen, und dann den Hals hinunter.',
    anim: { type: 'stroke', tool: 'roller', paths: ['fh4', 'cheekbone', 'cheek', 'jaw', 'neck1'], mode: 'alt' }
  },
  {
    id: 'palmieren', name: 'Augen palmieren', cat: 'abschluss', role: 'final',
    modes: ALL_MODES, focus: ['entspannen'], order: 70, dur: 45, prio: 0,
    short: 'Hände warm reiben und über die geschlossenen Augen legen.',
    steps: [
      'Die Handflächen kräftig aneinanderreiben, bis sie warm sind.',
      'Die Hände leicht gewölbt über die geschlossenen Augen legen, ohne Druck.',
      'Nur atmen und die Wärme spüren.'
    ],
    tip: 'Palmieren kommt vom englischen „palm“, die Handfläche. Ein schöner Moment, um den Tag abzuschließen.',
    say: 'Reibe deine Hände warm und lege sie über die geschlossenen Augen. Spüre einfach die Wärme.',
    anim: { type: 'palms' }
  },
  {
    id: 'nachtpflege', name: 'Nachtpflege', cat: 'pflege', role: 'care-end',
    modes: ALL_MODES, focus: [], order: 80, dur: 45, prio: 0,
    short: 'Nachtcreme mit sanften Bewegungen nach außen und oben einarbeiten.',
    steps: [
      'Eine erbsengroße Menge Nachtcreme auf die Fingerspitzen geben.',
      'Auf Stirn, Wangen, Kinn und Hals tupfen.',
      'Mit sanften Bewegungen nach außen und oben einarbeiten, Reste vom Öl gleich mit.'
    ],
    tip: 'Den Hals nicht vergessen. Er bekommt die gleiche Pflege wie das Gesicht.',
    say: 'Zum Schluss deine Nachtpflege. Arbeite sie sanft nach außen und oben ein, und denk an den Hals.',
    anim: { type: 'stroke', tool: 'finger', paths: ['fh4', 'cheekbone', 'jaw', 'neck2'], mode: 'both' }
  }
];

/* Etiketten wie im Herbarium: Fachname und was er bedeutet */
const SPECIMEN = {
  'reinigen':          ['Cutis', 'die Haut'],
  'serum':             ['Cutis', 'die Haut'],
  'atem':              ['Diaphragma', 'Zwerchfell'],
  'schultern':         ['M. trapezius', 'Kapuzenmuskel'],
  'nacken-dehnen':     ['M. trapezius', 'Kapuzenmuskel'],
  'nackenmassage':     ['Mm. suboccipitales', 'kurze Nackenmuskeln'],
  'oel':               ['Cutis', 'die Haut'],
  'schluesselbein':    ['Angulus venosus', 'Venenwinkel'],
  'hals-ausstreichen': ['Nodi lymphoidei cervicales', 'Halslymphknoten'],
  'gs-hals':           ['Nodi lymphoidei cervicales', 'Halslymphknoten'],
  'gs-dekollete':      ['Clavicula', 'Schlüsselbein'],
  'kuss-decke':        ['Platysma', 'Halshautmuskel'],
  'zunge':             ['Mm. suprahyoidei', 'Mundbodenmuskeln'],
  'kinn-hals':         ['Mandibula', 'Unterkiefer'],
  'gs-kinnlinie':      ['Mandibula', 'Unterkiefer'],
  'kiefer':            ['M. masseter', 'Kaumuskel'],
  'gs-kiefer':         ['M. masseter', 'Kaumuskel'],
  'loewe':             ['Simhasana', 'Löwenhaltung im Yoga'],
  'luftkugel':         ['M. buccinator', 'Wangenmuskel'],
  'fischmund':         ['M. buccinator', 'Wangenmuskel'],
  'wangen-lift':       ['M. zygomaticus major', 'großer Jochbeinmuskel'],
  'gs-wangen':         ['Os zygomaticum', 'Jochbein'],
  'augen-kreise':      ['M. orbicularis oculi', 'Augenringmuskel'],
  'augen-v':           ['M. orbicularis oculi', 'Augenringmuskel'],
  'gs-augen':          ['M. orbicularis oculi', 'Augenringmuskel'],
  'gs-brauen':         ['Arcus superciliaris', 'Brauenbogen'],
  'gs-zornesfalte':    ['M. corrugator supercilii', 'Augenbrauenrunzler'],
  'stirn-glaetten':    ['M. frontalis', 'Stirnmuskel'],
  'gs-stirn':          ['M. frontalis', 'Stirnmuskel'],
  'schlaefen':         ['M. temporalis', 'Schläfenmuskel, hilft beim Kauen'],
  'ohren':             ['Auricula', 'Ohrmuschel'],
  'druckpunkte':       ['Akupressur', 'sanfter Fingerdruck'],
  'ro-hals':           ['Nodi lymphoidei cervicales', 'Halslymphknoten'],
  'ro-kinnlinie':      ['Mandibula', 'Unterkiefer'],
  'ro-wangen':         ['Os zygomaticum', 'Jochbein'],
  'ro-augen':          ['M. orbicularis oculi', 'Augenringmuskel'],
  'ro-stirn':          ['M. frontalis', 'Stirnmuskel'],
  'abschluss-haende':  ['Vasa lymphatica', 'Lymphbahnen'],
  'gs-abschluss':      ['Vasa lymphatica', 'Lymphbahnen'],
  'ro-kuehl':          ['Vasa lymphatica', 'Lymphbahnen'],
  'palmieren':         ['Palmieren', 'Ruhe für die Augen'],
  'nachtpflege':       ['Cutis', 'die Haut']
};
EX_LIST.forEach(e => { e.specimen = SPECIMEN[e.id] || null; });

const EX = Object.fromEntries(EX_LIST.map(e => [e.id, e]));

/* Wissen für die Bibliothek */
const KNOWLEDGE = [
  {
    title: 'Gua Sha: die Grundlagen',
    icon: 'stone',
    items: [
      'Immer mit Öl oder einem reichhaltigen Serum arbeiten, damit der Stein gleitet.',
      'Den Stein fast flach halten, etwa 15 Grad zur Haut. Je flacher, desto sanfter.',
      'Richtung: von der Gesichtsmitte nach außen und oben, am Hals nach unten.',
      'Druck: im Gesicht leicht bis mittel, unter den Augen und am Hals ganz leicht.',
      'Jede Bahn 3 bis 5 Mal, langsam. Am Ende kurz wackeln, dann neu ansetzen.',
      'Die Formen: lange Kante für Wangen, Stirn und Hals, die Kerbe für die Kinnlinie, die kleine Rundung für die Augenpartie.',
      'Eine leichte Rötung ist normal und vergeht bald. Kleine rote Pünktchen oder blaue Flecken bedeuten: zu viel Druck.'
    ]
  },
  {
    title: 'Gesichtsroller',
    icon: 'roller',
    items: [
      'In eine Richtung rollen, nach außen und oben, dann abheben und neu ansetzen.',
      'Die große Rolle für Wangen, Stirn und Hals, die kleine für die Augenpartie.',
      'Aus dem Kühlschrank wirkt er zusätzlich erfrischend und abschwellend.',
      'Funktioniert mit Serum, mit Öl oder auch auf trockener Haut.'
    ]
  },
  {
    title: 'Gesichtsyoga',
    icon: 'hand',
    items: [
      'Gesichtsyoga verbindet gezielte Übungen für die Gesichtsmuskeln mit Massage und Entspannung.',
      'Langsam und bewusst üben, nicht verkrampfen. Die Stirn bleibt bei den meisten Übungen glatt.',
      'Regelmäßigkeit zählt mehr als Dauer: lieber oft fünf Minuten als selten eine halbe Stunde.',
      'Erste kleine Studien deuten auf sichtbare Effekte bei regelmäßigem Training hin. Sicher ist: Es entspannt.'
    ]
  },
  {
    title: 'Pflege & Hygiene',
    icon: 'drop',
    items: [
      'Stein und Roller nach jeder Anwendung mit lauwarmem Wasser und milder Seife abwaschen und gut trocknen lassen.',
      'Vorsicht beim Ablegen: Rosenquarz und Jade brechen leicht, wenn sie fallen.',
      'Mit sauberen Händen und frisch gereinigter Haut beginnen.'
    ]
  },
  {
    title: 'Wann lieber nicht',
    icon: 'info',
    items: [
      'Offene Wunden, Sonnenbrand, entzündete Pickel, Ausschlag oder gereizte Stellen auslassen.',
      'Nach Botox, Fillern, Laser oder Peelings erst nach Rücksprache mit der behandelnden Praxis.',
      'Bei Rosazea, sehr empfindlicher Haut oder blutverdünnenden Medikamenten nur ganz sanft arbeiten und im Zweifel ärztlich abklären.',
      'Bei Nacken- oder Kieferbeschwerden nur im angenehmen Bereich dehnen. Halten die Beschwerden an, ärztlich abklären lassen.',
      'Schmerz ist nie das Ziel. Angenehm ist die richtige Intensität.'
    ]
  }
];

const PHRASES = [
  'Ein paar Minuten nur für dich.',
  'Langsam ist genau richtig.',
  'Der Tag darf jetzt weich werden.',
  'Atmen, lösen, ankommen.',
  'Kleine Rituale, große Ruhe.',
  'Zeit, die Schultern sinken zu lassen.',
  'Was heute war, darf jetzt gehen.',
  'Sanft zu dir, wie zu einer Pflanze.'
];
