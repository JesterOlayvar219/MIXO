const c = (r) => {
  const e = {};
  return (
    r.forEach((o) => {
      const t = o.Category ?? "Uncategorized";
      e[t] || (e[t] = []), e[t].push(o);
    }),
    e
  );
};
export { c };
