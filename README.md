# Fucina — Generatori offline (PWA)

PWA con 4 tool generatori (Password, QR Code, UUID, Hash), tutti calcolati
nel browser. Nessun backend, nessun dato che lascia il dispositivo.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (design system neumorfico custom, vedi `tailwind.config.js`)
- `qrcode` per la generazione QR lato client
- Service Worker custom (`public/sw.js`) per il funzionamento offline
- Zero database, zero API esterne (a parte AdSense quando lo attivi)

## Sviluppo locale

```bash
npm install
npm run dev
```

Apri http://localhost:3000

## Build di produzione

```bash
npm run build
npm start
```

## Deploy su Vercel (consigliato)

1. Crea un repo GitHub e pusha questo progetto:
   ```bash
   git init
   git add .
   git commit -m "Prima versione"
   git branch -M main
   git remote add origin <URL_DEL_TUO_REPO>
   git push -u origin main
   ```
2. Vai su https://vercel.com, "Add New Project", importa il repo.
3. Vercel rileva Next.js automaticamente: build command `next build`,
   output `.next`. Non serve configurare nulla.
4. Deploy. In 1-2 minuti hai un URL pubblico (`tuoprogetto.vercel.app`).
5. (Opzionale) collega un dominio custom da Vercel → Settings → Domains.

## Attivare AdSense (quando hai l'approvazione)

Il banner è già scaffoldato in `components/AdBanner.tsx` ma resta
invisibile finché non lo configuri:

1. In `app/layout.tsx`, aggiungi nell'head lo script AdSense ufficiale
   con il tuo `client id`.
2. In `components/AdBanner.tsx`, valorizza `DATA_AD_CLIENT` e `DATA_AD_SLOT`
   con i valori reali dal tuo pannello AdSense.
3. Fatto: i banner (già posizionati in fondo a ogni tool, non invasivi)
   iniziano a mostrare annunci.

**Nota:** per l'approvazione AdSense serve un sito già online (quindi
deploya prima su Vercel), con contenuto reale e una privacy policy.
Aggiungi una pagina `/privacy` prima di richiedere l'approvazione — te la
preparo quando serve.

## Aggiungere un nuovo tool

1. Crea `app/tools/nome-tool/page.tsx` (copia struttura da uno esistente).
2. Aggiungi la logica pura in `lib/generators.ts` (mantieni tutto client-side).
3. Aggiungi la card nella griglia in `app/page.tsx`.
4. Aggiungi il path alla lista `APP_SHELL` in `public/sw.js` per il caching offline.

## Icone PWA

Le icone in `public/icons/` sono generate proceduralmente col gradiente
del brand. Se vuoi un logo diverso, sostituiscile mantenendo le stesse
dimensioni (192x192, 512x512, 512x512 maskable).

## Note su design system

Tutti i token (colori, ombre neumorfiche, font) sono centralizzati in
`tailwind.config.js` e `app/globals.css`. Per restare coerenti aggiungendo
pagine nuove, riusa le classi `.neu-surface`, `.neu-pressed`, `.btn-brand`,
`.btn-icon`, `.readout` invece di scrivere ombre custom.
