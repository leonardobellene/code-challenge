import "@testing-library/jest-dom";

// Mock IntersectionObserver for Vitest
// Prevents test failures due to IntersectionObserver not being available
globalThis.IntersectionObserver = class {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
} as any;
