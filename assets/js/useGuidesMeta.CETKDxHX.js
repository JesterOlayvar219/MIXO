import { r as e } from "./index.CrPmW2s9.js";
import { u as r } from "./useCache.CvyO7EUM.js";
import { F as g } from "./consts.BqJveuZl.js";
const h = () => {
  const { load: i, save: u } = r(),
    [d, t] = e.useState([]),
    [c, a] = e.useState(!0),
    n = async () => {
      const o = await (
        await fetch(`${g}/guides/meta`, {
          method: "POST",
        })
      ).json();
      t(o.data), u("guides", o.data, 30), a(!1);
    };
  return (
    e.useEffect(() => {
      const s = i("guides");
      s ? (t(s), a(!1)) : n();
    }, []),
    {
      guides: d,
      isLoading: c,
    }
  );
};
export { h as u };
