# Payments Path Instructions

- Treat Stripe as a server-owned integration. Validate amounts and configuration server-side.
- Do not expose secret keys or secret-derived values in client code.
- Keep payment endpoints idempotent where possible and return actionable error messages.
- Booking confirmation must not depend on `localhost` or environment-specific hardcoding.
