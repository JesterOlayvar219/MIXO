import { r as n } from "./index.CrPmW2s9.js";
import { i as r } from "./chatClient.nr179Z3f.js";
import "./httpClient.BFRTIcNZ.js";
import { u } from "./useEbsState.DkCPYDF2.js";
const g = (s) => {
  const { sendMessage: a, sendReaction: c } = r(s.usedIn ?? "CHAT"),
    [t, i] = n.useState(null),
    [o] = u(s.messagesEbs);
  return (
    n.useEffect(() => {
      s.client
        .connect(s.channelName)
        .then(async (e) => {
          e && i(e);
        })
        .catch((e) => {
          throw e;
        });
    }, []),
    {
      allMessages: o,
      sendMessage: async (e) => {
        t && (await a(t, e));
      },
      sendReaction: async (e, l) => {
        t && (await c(t, s.channelName, e, l));
      },
    }
  );
};
export { g as u };
