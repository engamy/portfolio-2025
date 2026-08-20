// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// jsdom has no layout engine, so window.scrollTo is unimplemented and throws a
// noisy "Not implemented" error on every route change. App.tsx calls it in a
// layout effect, so stub it out.
window.scrollTo = () => {};
