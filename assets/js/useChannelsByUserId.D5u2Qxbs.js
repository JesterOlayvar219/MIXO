import { d as P } from "./chat.Dkwpnclq.js";
import { r as t } from "./index.CrPmW2s9.js";
const b = ({ isLazy: n, longpoll: i, pageSize: l }) => {
  const [g, u] = t.useState([]),
    [f, c] = t.useState(!n),
    [e, r] = t.useState(1),
    d = l ?? 30,
    [p, h] = t.useState(1),
    [I, m] = t.useState(!n),
    o = async (
      { pageNumber: a } = {
        pageNumber: 1,
      }
    ) => {
      c(!0);
      try {
        const s = await P({
          pageNumber: a,
          pageSize: d,
        });
        h(s.totalPages), u(s.data);
      } catch (s) {
        console.log(s);
      } finally {
        c(!1);
      }
    };
  return (
    t.useEffect(() => {
      I &&
        o({
          pageNumber: e,
        });
    }, [n, e]),
    t.useEffect(() => {
      let a;
      return (
        i &&
          (a = setInterval(() => {
            o({
              pageNumber: e,
            });
          }, 1e3 * 10)),
        () => {
          clearInterval(a);
        }
      );
    }, [i, e]),
    {
      channels: g,
      isLoading: f,
      lazyInit: () => {
        o({
          pageNumber: 1,
        })
          .then(() => {
            m(!0);
          })
          .catch(() => {});
      },
      nextPage: () => {
        e < p && r(e + 1);
      },
      prevPage: () => {
        e > 1 && r(e - 1);
      },
      resetPaging: () => {
        r(1);
      },
    }
  );
};
export { b as u };
