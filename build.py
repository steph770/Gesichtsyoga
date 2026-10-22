#!/usr/bin/env python3
"""Baut die fertige App index.html aus den Dateien in src/.

Aufruf im Projektordner:  python3 build.py
"""
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent
SRC = ROOT / 'src'
JS_FILES = ['data.js', 'gen.js', 'illus.js', 'audio.js', 'app.js']

ICON = (
    "data:image/svg+xml,"
    "%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-2 -2 32 32'%3E"
    "%3Crect x='-2' y='-2' width='32' height='32' rx='8' fill='%23EBEFE5'/%3E"
    "%3Cpath d='M4.5 23C4.5 12.5 11 5.2 23.5 4.2c.6 11.6-6.4 18.8-19 18.8Z' fill='%234D7357'/%3E"
    "%3Cpath d='M4.5 23 15 12.5M10 17.5l-.6-4M13 14.5l4 .4' fill='none' stroke='%23F6F7F1' stroke-width='.9' stroke-linecap='round'/%3E"
    "%3Ccircle cx='19.6' cy='19.8' r='2.7' fill='%239C6F12'/%3E"
    "%3C/svg%3E"
)

HEAD = f"""<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="description" content="Abendliche Gesichtsyoga-Routine mit Gua Sha und Gesichtsroller">
<meta name="theme-color" content="#EBEFE5" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0D1712" media="(prefers-color-scheme: dark)">
<link rel="icon" href="{ICON}">
<link rel="manifest" href="manifest.webmanifest">
<style>:root{{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}}body{{margin:0}}img{{max-width:100%}}[hidden]{{display:none!important}}</style>
"""

# Meldet den Service Worker an (Installation als App, Start ohne Netz). Nur auf https oder localhost.
SW_REGISTER = """<script>
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
}
</script>
"""


def main():
    shell = (SRC / 'shell.html').read_text(encoding='utf-8')
    css = (SRC / 'styles.css').read_text(encoding='utf-8')
    js = '\n'.join((SRC / name).read_text(encoding='utf-8') for name in JS_FILES)
    if '</script' in js.lower():
        raise SystemExit('Abbruch: Das JavaScript enthält "</script" und würde die Seite zerbrechen.')
    page = shell.replace('/*CSS*/', css).replace('/*JS*/', js)
    cut = page.index('</style>') + len('</style>')
    head, body = page[:cut], page[cut:]
    out = HEAD + head + '\n</head>\n<body>\n' + body.strip() + '\n' + SW_REGISTER + '</body>\n</html>\n'
    (ROOT / 'index.html').write_text(out, encoding='utf-8')
    print(f'index.html geschrieben ({len(out.encode("utf-8")) // 1024} KB)')


if __name__ == '__main__':
    main()
