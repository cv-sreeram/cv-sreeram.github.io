# Micro-Frontend MVP Overview

## System
- Host: `apps/shell` (React + Single-SPA)
- Remote MFE 1: `apps/mfe-react-home`
- Remote MFE 2: `apps/mfe-angular-about`
- Shared packages: `packages/ui`, `packages/types`, `packages/utils`

## Route Mapping
- `/home` -> React Home MFE
- `/about` -> Angular About MFE

## Cross-MFE Communication
- Event: `framework:active` updates shell framework indicator
- Event: `theme:changed` reserved for theme synchronization

## Performance and Accessibility Baseline
- Shell records route-change duration with `performance.mark/measure`.
- Navbar and architecture controls use semantic button elements.

## Deployment Baseline
Deploy each app independently:
- `shell`: Vercel project A
- `mfe-react-home`: Vercel project B
- `mfe-angular-about`: Vercel project C

For production composition, shell imports deployed remote entry URLs via env vars.
