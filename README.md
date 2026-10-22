# Abendtau

Eine kleine Web-App für die abendliche Gesichtsyoga-Routine, auf Wunsch mit Gua Sha und Gesichtsroller.

**Zur App:** https://steph770.github.io/Gesichtsyoga/

## Was sie kann

- Stellt jeden Abend einen Ablauf aus Hilfsmittel (Hände, Gua Sha, Roller oder Kombi), Dauer (5, 10 oder 15 Minuten) und Fokus zusammen
- 42 Übungen mit animierter Anleitung, Sprachansagen, Klangschale und Hintergrundklang; der Ton lässt sich mit einem Knopf abschalten
- Eigene Routinen, eine Übungsbibliothek und ein Verlauf als Herbarium-Kalender
- Verlauf und Routinen bleiben im Browser des jeweiligen Geräts. Ein Sicherungscode in den Einstellungen nimmt sie auf ein anderes Gerät oder in einen anderen Browser mit.

Am Handy lässt sie sich in Chrome über das Menü mit „App installieren“ (oder „Zum Startbildschirm hinzufügen“) installieren. Sie startet dann mit eigenem Icon im Vollbild und funktioniert nach dem ersten Öffnen auch ohne Internet.

## Aufbau

- `index.html` ist die fertige App in einer einzigen Datei. GitHub Pages liefert sie aus.
- `src/` enthält die Quellen:
  - `data.js`: Übungen, Texte und Wissensseiten
  - `gen.js`: stellt den Ablauf für den Abend zusammen
  - `illus.js`: Figur, Bewegungsbahnen und Animationen
  - `audio.js`: Klangschale, Hintergrundklänge und Sprachansagen
  - `app.js`: Ansichten, Player, Verlauf und Einstellungen
  - `styles.css` und `shell.html`: Gestaltung und Grundgerüst
- `manifest.webmanifest`, `sw.js` und die `icon-*.png` machen die Seite installierbar. Die Icons sind aus `src/icon.svg` gerendert.
- Nach Änderungen in `src/` baut `python3 build.py` die `index.html` neu.

Die App ist eine Anleitung für Entspannung und Pflege. Sie ersetzt keine ärztliche oder kosmetische Beratung.
