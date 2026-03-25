# Evidence Index

| Control Area | Required Evidence Artifact | Owner | Cadence | Source Location | Last Verified | Risk if Missing |
|---|---|---|---|---|---|---|
| Quality Gates | Lint, test, and build logs | Engineering | Per PR | GitHub Actions `CI` | 2026-03-25 | High |
| Booking Flow | Search -> vehicle -> passenger -> payment smoke proof | Engineering | Per release | `tasks/progress.md` | 2026-03-25 | High |
| Payments | Stripe payment intent creation proof and fallback behavior | Engineering | Per release | `tasks/progress.md` | 2026-03-25 | High |
| Accessibility | Keyboard smoke and basic form label review | Engineering | Per release | `tasks/progress.md` | 2026-03-25 | Medium |
| Responsive UI | Mobile/tablet/desktop screenshots for home + booking | Engineering | Per release | `tasks/progress.md` | 2026-03-25 | Medium |
| Deployment | EC2 deploy log, health check output, rollback command | Engineering | Per release | `tasks/progress.md` | Pending | High |
| Omar Gate | Workflow run URL and secret wiring proof | Engineering | Per PR | GitHub Actions `omar-gate` | 2026-03-25 | High |
