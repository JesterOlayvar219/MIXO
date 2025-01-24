import { a as r, C as y } from "./consts.BqJveuZl.js";
import { h as c } from "./httpClient.BFRTIcNZ.js";
let l;
const p = new Uint8Array(16);
function g() {
  if (
    !l &&
    ((l =
      typeof crypto < "u" &&
      crypto.getRandomValues &&
      crypto.getRandomValues.bind(crypto)),
    !l)
  )
    throw new Error(
      "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
    );
  return l(p);
}
const s = [];
for (let t = 0; t < 256; ++t) s.push((t + 256).toString(16).slice(1));
function w(t, a = 0) {
  return (
    s[t[a + 0]] +
    s[t[a + 1]] +
    s[t[a + 2]] +
    s[t[a + 3]] +
    "-" +
    s[t[a + 4]] +
    s[t[a + 5]] +
    "-" +
    s[t[a + 6]] +
    s[t[a + 7]] +
    "-" +
    s[t[a + 8]] +
    s[t[a + 9]] +
    "-" +
    s[t[a + 10]] +
    s[t[a + 11]] +
    s[t[a + 12]] +
    s[t[a + 13]] +
    s[t[a + 14]] +
    s[t[a + 15]]
  );
}
const b =
    typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto),
  u = {
    randomUUID: b,
  };
function U(t, a, n) {
  if (u.randomUUID && !a && !t) return u.randomUUID();
  t = t || {};
  const e = t.random || (t.rng || g)();
  return (e[6] = (e[6] & 15) | 64), (e[8] = (e[8] & 63) | 128), w(e);
}
const d = (t) => ({
    ...t,
    error: null,
  }),
  i = {
    AnswerId: null,
    Channel: "",
    DateTime: "",
    Id: 0,
    Subject: "",
    UserId: "",
    Visibility: "PUBLIC",
  },
  S = async (t) => {
    const a = r + "/channelCreate",
      n = {
        subject: t.subject,
        channel: t.channelName ?? `${y}:${U()}`,
      };
    try {
      const e = await c.post(a, n);
      if (e.status !== 201) throw new Error(`HTTP error! status: ${e.status}`);
      return {
        success: !0,
        channel: e.data.channel,
      };
    } catch (e) {
      return (
        console.error(e?.toString()),
        {
          success: !1,
          channel: i,
        }
      );
    }
  },
  R = async ({ pageNumber: t = 1, pageSize: a = 100 }) =>
    await (
      await c.post(`${r}/channelsList`, {
        pageNumber: t,
        pageSize: a,
      })
    ).data,
  T = async ({ pageNumber: t = 1, pageSize: a = 100 }) =>
    await (
      await c.post(`${r}/channelsListByUser`, {
        pageNumber: t,
        pageSize: a,
      })
    ).data,
  $ = async (t) => {
    const a = `${r}/channelRead`;
    try {
      const n = await c.post(a, {
        id: t,
      });
      return n.status === 404 ? i : n.data;
    } catch {
      return i;
    }
  },
  A = async (t, a) => {
    try {
      return await (
        await c.post(
          `${r}/firstMessageInChannel`,
          {
            channelId: t,
          },
          {
            headers: {
              "X-Access-Token": a,
            },
          }
        )
      ).data;
    } catch {
      return null;
    }
  },
  M = (t, a) => ({
    Id: t.timestamp,
    Channel: a,
    MessageId: t.id,
    DateTime: new Date(t.timestamp).toISOString(),
    MessageData: t.data.body,
    MessageName: t.name,
    ClientId: t.clientId,
    reactions: t.data.reactions ? t.data.reactions : null,
    attachments: t.data.attachments,
    ReplyTo: t.data.replyTo,
    UserID: t.data.UserID,
    Username: t.data.Username,
  }),
  L = async (t, a) => {
    const n = `${r}/channelReadStatusUpdate`;
    await c.post(n, {
      channelName: t,
      username: a,
    });
  },
  N = async (t, a) => {
    const n = `${r}/channelSubscriptionGet`;
    return !!(
      await c.post(n, {
        username: t,
        channelName: a,
      })
    ).data.subscription;
  },
  x = async (t, a, n) => {
    const e = `${r}/channelSubscriptionManage`;
    await c.post(e, {
      username: t,
      channelName: a,
      action: n,
    });
  },
  H = async (t, a) => {
    try {
      const n = `${r}/messagesList`,
        e = await c.post(n, {
          pageNumber: 1,
          pageSize: 1e4,
          channel: t,
          excludeInitialMessage: a,
        });
      return (
        (e.data.data = e.data.data.map((o) => ({
          ...o,
          reactions: o.reactions ? JSON.parse(o.reactions) : null,
        }))),
        d(e.data)
      );
    } catch (n) {
      return (
        console.error(n),
        {
          error: n,
          data: [],
          totalCount: 0,
          totalPages: 0,
        }
      );
    }
  },
  j = async (t) => {
    try {
      const a = `${r}/chatHistory`,
        e = (
          await c.post(a, {
            channel: t,
          })
        ).data.messages;
      return d({
        messages: e,
      });
    } catch (a) {
      return {
        error: a,
        messages: [],
      };
    }
  },
  I = {
    Id: 0,
    DateTime: "",
    Filename: "",
    MessageId: "",
    UserId: "",
  },
  B = async ({ file: t, ordinalNumber: a }) => {
    const n = `${r}/attachment/upload`,
      e = new FormData();
    e.set("attachment", t), e.set("ordinalNumber", String(a));
    try {
      const o = await c.post(n, e);
      return d({
        attachmentRecord: o.data.attachmentRecord,
      });
    } catch (o) {
      return {
        error: o,
        attachmentRecord: I,
      };
    }
  },
  v = async (t) => {
    const a = `${r}/attachment/discover`;
    try {
      const n = await c.post(a, {
        messageId: t,
      });
      return d({
        attachmentsData: n.data.attachmentsData,
      });
    } catch (n) {
      return {
        error: n,
        attachmentsData: [],
      };
    }
  },
  E = async (t, a) => {
    const n = `${r}/attachment/get`;
    try {
      const e = await c.post(
          n,
          {
            attachmentId: t,
          },
          {
            responseType: "blob",
          }
        ),
        o = new Blob([e.data], {
          type: e.headers["content-type"],
        }),
        h = document.createElement("a"),
        m = window.URL.createObjectURL(o);
      (h.href = m), h.setAttribute("download", a), h.click();
    } catch (e) {
      console.error(e);
    }
  };
export {
  j as a,
  $ as b,
  S as c,
  T as d,
  R as e,
  A as f,
  H as g,
  v as h,
  N as i,
  E as j,
  L as m,
  M as r,
  x as t,
  B as u,
};
