import { r as s } from "./index.CrPmW2s9.js";
const o = (t) => new URLSearchParams(window.location.search).get(t),
  c = (t, e) => {
    const r = new URL(window.location.toString()),
      a = r.searchParams;
    e === "" ? a.delete(t) : a.set(t, e),
      history.pushState(
        {
          page: 1,
        },
        document.title,
        r.toString()
      ),
      window.dispatchEvent(new CustomEvent(`searchParam::set::${t}`));
  },
  h = (t, e) => {
    const r = () => {
      e(o(t));
    };
    return (
      window.addEventListener(`searchParam::set::${t}`, r),
      () => {
        window.removeEventListener(`searchParam::set::${t}`, r);
      }
    );
  },
  P = (t) => {
    const [e, r] = s.useState(o(t));
    return (
      s.useEffect(() => {
        const a = h(t, (n) => {
          r(n);
        });
        return () => {
          a();
        };
      }, []),
      [
        e,
        (a) => {
          c(t, String(a));
        },
      ]
    );
  };
export { o as g, P as u };
