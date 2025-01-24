function i(t, d) {
  let n = d;
  return {
    sub: (e) => {
      const s = (a) => {
        e(a.detail);
      };
      return (
        window.addEventListener(`ebs::${t}::update`, s),
        () => {
          window.removeEventListener(`ebs::${t}::update`, s);
        }
      );
    },
    set: (e) => {
      window.dispatchEvent(
        new CustomEvent(`ebs::${t}::update`, {
          detail: e,
        })
      ),
        (n = e);
    },
    get: () => n,
  };
}
export { i as m };
