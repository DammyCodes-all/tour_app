# Tourify (tour_app)

Monorepo containing two main parts:
- web_app — Next.js frontend for the Tourify dashboard and marketing site.
- widget — standalone Vite + TS widget used to embed Shepherd tours.

Quick overview, setup, and common commands to run the project locally on Windows.

## Repo structure (key folders)
- web_app/ — Next.js app (app router, components, layouts).
- widget/ — Vite + TypeScript widget (includes run-shepard.ts and sample tour).
- mock/, lib/, public/, etc. — supporting code and assets.

## Prerequisites
- Node.js 18+ (recommended)
- pnpm (the repo uses pnpm) — install with: `npm install -g pnpm`
- Git (optional)
- VS Code (recommended)

## Setup (Windows)
Open a terminal (PowerShell or cmd) at the repo root:

Install dependencies for both projects:
```powershell
cd c:\Users\HP PC 2023\dev\tour_app\web_app
pnpm install

cd ..\widget
pnpm install
```

## Run (development)

Run the Next.js web app:
```powershell
cd c:\Users\HP PC 2023\dev\tour_app\web_app
pnpm dev
# open http://localhost:3000 (or port shown)
```

Run the widget (Vite dev server):
```powershell
cd c:\Users\HP PC 2023\dev\tour_app\widget
pnpm dev
# open the Vite URL shown (usually http://localhost:5173) or open widget/index.html via the dev server
```

You can run both servers in separate terminals to develop the full experience.

## Build / Production

Build web_app:
```powershell
cd c:\Users\HP PC 2023\dev\tour_app\web_app
pnpm build
pnpm start
```

Build widget:
```powershell
cd c:\Users\HP PC 2023\dev\tour_app\widget
pnpm build
# serve the dist directory with a static server
```

## Environment
The Next.js app may expect a `.env` at `web_app/.env`. Check `web_app/next.config.ts` and `web_app/app` for references to environment keys (e.g., Supabase). Do not commit secrets.

## Important files
- widget/src/run-shepard.ts — bootstraps and runs Shepherd tours for the widget; sample tour at `widget/lib/sample-tour.json`.
- web_app/app/(external-pages)/page.tsx — landing page; includes GSAP fade animations in development changes.
- web_app/app/tour-dashboard/_components/TourDashboardLayout.tsx — layout including mobile logout button.

## Development tips
- Use two terminal panes (one for `web_app`, one for `widget`).
- Open workspace in VS Code at repo root to get TS/Next/Vite intellisense.
- When modifying Shepherd tour output, edit `widget/src/run-shepard.ts` and test the widget dev server.

## Troubleshooting
- Port conflicts: change ports in `package.json` scripts or set env PORT.
- Missing packages: run `pnpm install` again in the affected folder.
- Type errors: run `pnpm -w` (workspace) or open in VS Code to see diagnostics.

## Contributing
Follow existing code style, run linters if configured, and test locally before opening PRs.

---

If you want, I can:
- Add a short section with exact scripts from package.json (paste them here).
- Add GitHub Actions or a dev script to run both servers concurrently.