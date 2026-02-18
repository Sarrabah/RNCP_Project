// vitest-dom adds custom matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Mock window.matchMedia for Ant Design & other libraries that rely on it
global.matchMedia =
  global.matchMedia ||
  function (): MediaQueryList {
    return {
      matches: false,
      media: "",
      onchange: null,
      addListener: vi.fn(), // ← jest.fn() → vi.fn()
      removeListener: vi.fn(), // ← jest.fn() → vi.fn()
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as MediaQueryList;
  };
