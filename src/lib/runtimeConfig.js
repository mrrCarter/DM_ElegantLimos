const stripTrailingSlash = (value = "") => value.replace(/\/+$/, "");
const hasValue = (value) => Boolean(String(value ?? "").trim());

const hasEmailJsCoreConfig = (env = {}) =>
  hasValue(env.VITE_EMAILJS_SERVICE_ID) && hasValue(env.VITE_EMAILJS_PUBLIC_KEY);

export function resolveApiBaseUrl({ envBaseUrl = "", browserOrigin = "" } = {}) {
  if (envBaseUrl?.trim()) {
    return stripTrailingSlash(envBaseUrl.trim());
  }

  if (browserOrigin?.trim()) {
    return stripTrailingSlash(browserOrigin.trim());
  }

  return "";
}

export function isEmailJsConfigured(env = {}) {
  return Boolean(
    hasEmailJsCoreConfig(env) &&
      hasValue(env.VITE_EMAILJS_TEMPLATE_ID_CLIENT) &&
      hasValue(env.VITE_EMAILJS_TEMPLATE_ID_COMPANY)
  );
}

export function isContactFormConfigured(env = {}) {
  return Boolean(
    hasEmailJsCoreConfig(env) && hasValue(env.VITE_EMAILJS_TEMPLATE_ID_COMPANY)
  );
}

export function isQuoteFormConfigured(env = {}) {
  return Boolean(
    hasEmailJsCoreConfig(env) && hasValue(env.VITE_EMAILJS_TEMPLATE_ID_QUOTE)
  );
}

export function isStripeConfigured(env = {}) {
  return hasValue(env.VITE_STRIPE_PUBLISHABLE_KEY);
}
