import { I as o } from "./events.mBVLhjc9.js";
import { r as t } from "./index.CrPmW2s9.js";
import { f as l } from "./ideas.BUdAWsYH.js";
const E = () => {
  const [n, d] = t.useState([]),
    [c, s] = t.useState(!0),
    [i, r] = t.useState(null),
    a = async () => {
      s(!0), r(null);
      try {
        const e = await l();
        d(e);
      } catch (e) {
        r(e);
      } finally {
        s(!1);
      }
    };
  return (
    t.useEffect(() => {
      a();
      const e = async () => {
        await a();
      };
      return (
        window.addEventListener(o, e),
        () => {
          window.removeEventListener(o, e);
        }
      );
    }, []),
    {
      ideas: n,
      loading: c,
      error: i,
    }
  );
};
export { E as u };
