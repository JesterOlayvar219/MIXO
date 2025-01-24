function i(t, e) {
  const n = new CustomEvent(t, {
    detail: e,
  });
  window.dispatchEvent(n);
}
export { i as t };
