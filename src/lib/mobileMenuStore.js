const listeners = new Set();

let isMobileMenuOpen = false;

const notify = () => {
  listeners.forEach((listener) => listener());
};

const syncBodyClass = () => {
  if (typeof document !== "undefined") {
    document.body.classList.toggle("mobile-menu-active", isMobileMenuOpen);
  }
};

export function subscribeToMobileMenu(listener) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function getMobileMenuSnapshot() {
  return isMobileMenuOpen;
}

export function setMobileMenuOpen(nextValue) {
  const normalizedValue = Boolean(nextValue);

  if (normalizedValue === isMobileMenuOpen) {
    return;
  }

  isMobileMenuOpen = normalizedValue;
  syncBodyClass();
  notify();
}

export function toggleMobileMenu() {
  setMobileMenuOpen(!isMobileMenuOpen);
}
