import { describe, expect, it } from "vitest";

import {
  isContactFormConfigured,
  isEmailJsConfigured,
  isQuoteFormConfigured,
  isStripeConfigured,
  resolveApiBaseUrl,
} from "./runtimeConfig";

describe("resolveApiBaseUrl", () => {
  it("prefers the configured env base url", () => {
    expect(
      resolveApiBaseUrl({
        envBaseUrl: "https://api.example.com/",
        browserOrigin: "https://fallback.example.com",
      })
    ).toBe("https://api.example.com");
  });

  it("falls back to the browser origin", () => {
    expect(
      resolveApiBaseUrl({
        browserOrigin: "https://app.example.com/",
      })
    ).toBe("https://app.example.com");
  });
});

describe("runtime feature configuration", () => {
  it("detects when booking email configuration is complete", () => {
    expect(
      isEmailJsConfigured({
        VITE_EMAILJS_SERVICE_ID: "service",
        VITE_EMAILJS_PUBLIC_KEY: "public",
        VITE_EMAILJS_TEMPLATE_ID_CLIENT: "client",
        VITE_EMAILJS_TEMPLATE_ID_COMPANY: "company",
      })
    ).toBe(true);
  });

  it("detects when the contact form is configured", () => {
    expect(
      isContactFormConfigured({
        VITE_EMAILJS_SERVICE_ID: "service",
        VITE_EMAILJS_PUBLIC_KEY: "public",
        VITE_EMAILJS_TEMPLATE_ID_COMPANY: "company",
      })
    ).toBe(true);
  });

  it("detects when the quote form is configured", () => {
    expect(
      isQuoteFormConfigured({
        VITE_EMAILJS_SERVICE_ID: "service",
        VITE_EMAILJS_PUBLIC_KEY: "public",
        VITE_EMAILJS_TEMPLATE_ID_QUOTE: "quote",
      })
    ).toBe(true);
  });

  it("detects when stripe is configured", () => {
    expect(
      isStripeConfigured({
        VITE_STRIPE_PUBLISHABLE_KEY: "pk_test_123",
      })
    ).toBe(true);
  });
});
