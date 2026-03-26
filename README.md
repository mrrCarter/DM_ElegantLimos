# DM Elegant Limos

Premium Boston black car booking experience built with Vite, React, and a small Express payment server.

## Stack

- React 18 + Vite 5
- Express 5 server for Stripe payment intents and static asset serving
- EmailJS for quote/contact/booking notifications
- Google Maps Places/Directions for itinerary capture

## Local development

1. Install Node 20.
2. Copy `.env.example` to `.env`.
3. Install dependencies with `npm install`.
4. Run the frontend with `npm run dev`.
5. Run the payment server with `npm run dev:server`.

## Quality gates

- `npm run lint`
- `npm run test`
- `npm run build`

The same command set is enforced by:

- `.claude/hooks/quality-gate.sh`
- `.github/workflows/ci.yml`
- `.github/workflows/omar-gate.yml`

## Runtime variables

Client build variables:

- `VITE_API_BASE_URL`
- `VITE_GOOGLE_MAPS_API_KEY`
- `VITE_STRIPE_PUBLISHABLE_KEY`
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID_CLIENT`
- `VITE_EMAILJS_TEMPLATE_ID_COMPANY`
- `VITE_EMAILJS_TEMPLATE_ID_QUOTE`
- `VITE_EMAILJS_PUBLIC_KEY`

Server variables:

- `PORT`
- `NODE_ENV`
- `CORS_ORIGINS_CSV`
- `STRIPE_SECRET_KEY`

GitHub workflow secret:

- `SENTINELAYER_TOKEN`
- `OPENAI_API_KEY`

## EC2 deployment

Infrastructure assets live under [`infra/ec2`](./infra/ec2):

- `bootstrap.sh` installs Node 20, Nginx, and base packages
- `release.sh` unpacks a release, runs quality gates, builds the app, and restarts services
- `nginx.conf` proxies public HTTP traffic to the Node app on port `4242`
- `dm-elegant-limos.service` runs the production server under `systemd`

The deployment helper is [`scripts/deploy-ec2.ps1`](./scripts/deploy-ec2.ps1). It expects:

- an EC2 host/IP
- an SSH private key path
- two ignored files in `infra/tmp/`
  - `client-<release>.env`
  - `server-<release>.env`

The release script then:

1. packages `HEAD` with `git archive`
2. uploads the release tarball and env files
3. bootstraps the instance
4. runs lint, tests, and build on the server
5. activates the new release through `systemd` and Nginx
