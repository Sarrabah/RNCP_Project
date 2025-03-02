// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// Jest setup for React Testing Library
import "@testing-library/jest-dom";

// Mock window.matchMedia for Ant Design & other libraries that rely on it
global.matchMedia =
  global.matchMedia ||
  function (): MediaQueryList {
    return {
      matches: false,
      media: "",
      onchange: null,
      addListener: jest.fn(), // Deprecated, but some libraries still use it
      removeListener: jest.fn(), // Deprecated, but some libraries still use it
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    } as MediaQueryList;
  };
