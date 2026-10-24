/**
 * Vitest setup file - runs before every test
 */
import "@testing-library/jest-dom";
import { vi } from "vitest";

// Silence console errors during tests that intentionally trigger them
const originalConsoleError = console.error;
console.error = (...args: unknown[]) => {
    // Filter out expected warnings (e.g., React hydration, aria issues in tests)
    if (typeof args[0] === "string") {
        const msg = args[0];
        if (msg.includes("ReactDOM.render")) return;
        if (msg.includes("act")) return;
        if (msg.includes("aria-*")) return;
    }
    originalConsoleError.apply(console, args);
};

// Mock window.matchMedia (used by many responsive UI libraries)
Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

// Mock ResizeObserver (used by many React UI libraries)
class MockResizeObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
}
Object.defineProperty(window, "ResizeObserver", {
    writable: true,
    value: MockResizeObserver,
});
