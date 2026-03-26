# Lessons

- Keep generated specs grounded in the actual repository shape before changing architecture.
- Avoid client-side hardcoded origins for any runtime integration that must survive deployment.
- Treat EmailJS delivery as an explicit runtime capability; silent success states are worse than disabled submission when templates are missing.
- The fastest path to a safe EC2 release in this repo is a single Node service behind Nginx, not a larger container/orchestration detour.
- Do not stop at desktop polish; validate the core booking journey on mobile and keyboard navigation before calling a premium landing page complete.
