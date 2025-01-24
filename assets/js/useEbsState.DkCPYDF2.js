import { r as s } from "./index.CrPmW2s9.js";
function o(t) {
  const [r, u] = s.useState(t.get());
  return (
    s.useEffect(() => {
      const e = t.sub((a) => {
        u(a);
      });
      return () => {
        e();
      };
    }, []),
    [
      r,
      (e) => {
        t.set(e);
      },
    ]
  );
}
export { o as u };
