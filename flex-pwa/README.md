# FLEX · Mobility Daily

PWA für tägliche Mobility & Stretch-Routinen.

## Lokal entwickeln

```bash
npm install
npm run dev
```

Dann auf http://localhost:5173 öffnen.

## Build testen

```bash
npm run build
npm run preview
```

## Deployment auf GitHub Pages

### Einmalig: Repository einrichten

1. **Pages aktivieren**: Repository → Settings → Pages → Source: **GitHub Actions** (NICHT "Deploy from a branch")
2. Bei einem User-Site-Repo (`vanimio.github.io`) ist `base: '/'` in `vite.config.js` korrekt.
3. Bei einem Project-Site-Repo (z.B. `vanimio/flex`) `vite.config.js` öffnen und ändern:
   ```js
   base: '/flex/',
   ```

### Pushen

```bash
git add .
git commit -m "Initial FLEX deployment"
git push origin main
```

Der Workflow `.github/workflows/deploy.yml` läuft automatisch und deployed nach
ein paar Minuten auf https://vanimio.github.io/

### Auf Android als App installieren

1. URL im Chrome auf dem Handy öffnen
2. Menü (drei Punkte) → "Zum Startbildschirm hinzufügen"
3. App-Icon erscheint wie eine native App
