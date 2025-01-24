import { b as h, i as b, t as f } from "./chat.Dkwpnclq.js";
import { g } from "./httpClient.BFRTIcNZ.js";
import { r as s } from "./index.CrPmW2s9.js";
const d = (r) => {
  const n = g(),
    [u, e] = s.useState(!0),
    [a, o] = s.useState(!1),
    [i, c] = s.useState(null);
  return (
    s.useEffect(() => {
      n.type === "guest" ||
        r === 0 ||
        (e(!0),
        h(r)
          .then(async (t) => (c(t), await b(n.name, t.Channel)))
          .then(o)
          .catch((t) => {
            throw t;
          })
          .finally(() => {
            e(!1);
          }));
    }, []),
    {
      loading: u,
      isSubscribed: a,
      toggleSubscription: () => {
        if (!i) return;
        e(!0);
        const t = a ? "unsubscribe" : "subscribe";
        f(n.name, i.Channel, t)
          .then(() => {
            o(!a);
          })
          .catch((l) => {
            throw l;
          })
          .finally(() => {
            e(!1);
          });
      },
    }
  );
};
export { d as u };
