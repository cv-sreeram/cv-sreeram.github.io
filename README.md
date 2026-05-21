# My Portal - Single-SPA Portfolio MVP

This repository contains a personal site implemented as a micro-frontend system.

## Apps
- `apps/shell` - React host with Single-SPA orchestration
- `apps/mfe-react-home` - React home page MFE
- `apps/mfe-angular-about` - Angular about page MFE

## Packages
- `packages/ui` - shared framework badge UI
- `packages/types` - shared event/type contracts
- `packages/utils` - event bus helpers

## Run
```bash
npm install
npm run dev:shell
```

Open `http://localhost:5173` and navigate between `/home` and `/about`.

## Build
```bash
npm run build
```

## Run All Apps Together
```bash
npm run dev:all
```

## Smoke Test
One-command smoke run (starts shell, tests `/home` and `/about`, then exits):
```bash
npm run smoke
```

If shell is already running:
```bash
npm run smoke:local
```
