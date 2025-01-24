import { j as e } from "./jsx-runtime.CDeAccHH.js";
import { r as m } from "./index.CrPmW2s9.js";
import { u as S } from "./useChat.BfwcT6K7.js";
import { c } from "./clsx.B-dksMZM.js";
import {
  r as k,
  R as I,
  a as T,
  u as A,
} from "./useMarkChannelAsRead.Dnlr9Wpl.js";
import { g as C } from "./httpClient.BFRTIcNZ.js";
import { r as E } from "./chatMarkdown.CEay0G5R.js";
import { u as w } from "./useEbsState.DkCPYDF2.js";
import { m as y } from "./ebs.Bnp6cHqf.js";
import { G as F } from "./iconBase.BqiLPpiy.js";
import { AttachmentsList as B } from "./AttachmentsList.Zgo7k2Ms.js";
import { u as h, C as d, L as D } from "./FloatingChat.6afTOzIB.js";
import { u as P } from "./chat.Dkwpnclq.js";
import { a as U } from "./chatClient.nr179Z3f.js";
import { A as W } from "./AttachmentWindow.D-wwGdMm.js";
import { R as G } from "./RepliedMessagePreview.DPystDlY.js";
import { r as H } from "./consts.BqJveuZl.js";
import "./index.D2MAbzvX.js";
import "./useChannelsByUserId.D5u2Qxbs.js";
import "./useSearchParam.G6pYfR-D.js";
import "./useChatSubscription.B4PwWwRa.js";
import "./exportChatHistory.HAmnRl9h.js";
import "./Modal.DAbqui3k.js";
import "./index.Cb2GqDXq.js";
import "./index.B-gKb-S2.js";
const _ = () => {
    const [, t] = m.useState(Date.now()),
      a = (o) => {
        let s = o.getHours();
        const n = o.getMinutes(),
          l = s >= 12 ? "pm" : "am";
        (s = s % 12), (s = s || 12);
        const i = n < 10 ? "0" + n : n;
        return `${s}:${i} ${l}`;
      },
      r = (o) => {
        if (!o) return "some time ago";
        const s = Date.now(),
          n = new Date(o),
          l = Math.floor((s - Number(n)) / 6e4);
        return l < 1
          ? "0 mins ago"
          : l < 2
          ? "1 min ago"
          : l <= 5
          ? `${l} mins ago`
          : a(n);
      };
    return (
      m.useEffect(() => {
        const o = setInterval(() => {
          t(Date.now());
        }, 1e4);
        return () => {
          clearInterval(o);
        };
      }, []),
      {
        formatDateForChat: r,
      }
    );
  },
  f = y("replyToFloating", null);
function $(t) {
  return F({
    tag: "svg",
    attr: {
      fill: "currentColor",
      viewBox: "0 0 16 16",
    },
    child: [
      {
        tag: "path",
        attr: {
          d: "M5.921 11.9 1.353 8.62a.72.72 0 0 1 0-1.238L5.921 4.1A.716.716 0 0 1 7 4.719V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z",
        },
        child: [],
      },
    ],
  })(t);
}
const z = ({ message: t, onReaction: a }) => {
    const r = C(),
      o = t.reactions?.find((s) => s.Reactors.find((n) => n.AuthorId === r.id));
    return t.reactions
      ? e.jsx("div", {
          className: c("flex items-center gap-x-2"),
          children: t.reactions?.map((s) =>
            e.jsx(
              "button",
              {
                "aria-label": "Show Emoji",
                className: c(),
                onClick: () => {
                  a(s.reaction);
                },
                children: e.jsxs("div", {
                  className: c(
                    "flex",
                    "gap-x-1",
                    "items-baseline",
                    "px-1",
                    "rounded-xl",
                    "bg-accent",
                    "h-[24px]",
                    s.reaction === o?.reaction && [
                      "bordered",
                      "border",
                      "border-secondary",
                    ]
                  ),
                  children: [
                    e.jsx("span", {
                      className: "inline-block w-[20px] h-[20px]",
                      children: k[s.reaction],
                    }),
                    s.count > 1 &&
                      e.jsx("span", {
                        className: "font-mono text-sm",
                        children: s.count,
                      }),
                  ],
                }),
              },
              t.Id + s.reaction
            )
          ),
        })
      : null;
  },
  O = ({ message: t, sendReaction: a, repliedMessageResolved: r }) => {
    const { formatDateForChat: o } = _(),
      s = C(),
      n = t.Username === s?.name,
      [, l] = w(f);
    return e.jsxs("div", {
      className: c(
        "flex",
        "gap-2",
        n && "flex-row-reverse",
        "relative",
        "group/message"
      ),
      children: [
        e.jsxs("div", {
          className: c("max-w-xs", "p-2", "pb-1", "min-w-[160px]", {
            "bg-slate text-white": n,
            "bg-gray text-black": !n,
          }),
          children: [
            r &&
              e.jsx(I, {
                messageId: t.MessageId,
                repliedMessage: r,
              }),
            e.jsx("div", {
              dangerouslySetInnerHTML: {
                __html: E(t.MessageData),
              },
            }),
            e.jsx(B, {
              message: t,
            }),
            e.jsxs("div", {
              className: c(
                "flex",
                "flex-wrap",
                "gap-2",
                "justify-between",
                "items-center",
                "text-xs",
                "leading-none",
                "opacity-0",
                "group-hover/message:opacity-75",
                n && "text-right"
              ),
              children: [
                e.jsx("span", {
                  children: t.Username,
                }),
                e.jsx("span", {
                  children: o(t.DateTime),
                }),
              ],
            }),
          ],
        }),
        e.jsxs("div", {
          className: "absolute -bottom-6 flex gap-2",
          children: [
            e.jsx(T, {
              className: "group-hover/message:visible invisible",
              onSelect: (i) => {
                a(t.MessageId, i);
              },
            }),
            e.jsx(z, {
              message: t,
              onReaction: (i) => {
                a(t.MessageId, i);
              },
            }),
          ],
        }),
        e.jsx("button", {
          type: "button",
          onClick: () => {
            l(t);
          },
          className: c("opacity-0", "group-hover/message:opacity-100"),
          children: e.jsx($, {
            className: "fill-slate",
          }),
        }),
      ],
    });
  },
  V = ({ messages: t, sendReaction: a }) => {
    const r = m.useRef(null),
      o = m.useMemo(() => t.length, [t]),
      s = () => {
        r.current?.scrollIntoView();
      };
    return (
      m.useLayoutEffect(() => {
        s();
      }, [o]),
      e.jsxs("div", {
        className: "flex flex-col gap-6",
        children: [
          t.map((n, l) =>
            e.jsx(
              O,
              {
                message: n,
                sendReaction: a,
                repliedMessageResolved: n.ReplyTo
                  ? t.find((i) => i.MessageId === n.ReplyTo) ?? null
                  : null,
              },
              l
            )
          ),
          e.jsx("div", {
            ref: r,
          }),
        ],
      })
    );
  },
  v = y("floatingChatMessages", []),
  Y = U(v, "FLOATING_CHAT"),
  Z = () =>
    e.jsx("svg", {
      strokeWidth: "0",
      viewBox: "0 0 24 24",
      className: "w-5 h-5 stroke-black fill-black",
      xmlns: "http://www.w3.org/2000/svg",
      children: e.jsx("path", {
        d: "M14.8287 7.75737L9.1718 13.4142C8.78127 13.8047 8.78127 14.4379 9.1718 14.8284C9.56232 15.219 10.1955 15.219 10.586 14.8284L16.2429 9.17158C17.4144 8.00001 17.4144 6.10052 16.2429 4.92894C15.0713 3.75737 13.1718 3.75737 12.0002 4.92894L6.34337 10.5858C4.39075 12.5384 4.39075 15.7042 6.34337 17.6569C8.29599 19.6095 11.4618 19.6095 13.4144 17.6569L19.0713 12L20.4855 13.4142L14.8287 19.0711C12.095 21.8047 7.66283 21.8047 4.92916 19.0711C2.19549 16.3374 2.19549 11.9053 4.92916 9.17158L10.586 3.51473C12.5386 1.56211 15.7045 1.56211 17.6571 3.51473C19.6097 5.46735 19.6097 8.63317 17.6571 10.5858L12.0002 16.2427C10.8287 17.4142 8.92916 17.4142 7.75759 16.2427C6.58601 15.0711 6.58601 13.1716 7.75759 12L13.4144 6.34316L14.8287 7.75737Z",
      }),
    }),
  q = () => {
    const { channel: t } = h(),
      {
        sendMessage: a,
        sendReaction: r,
        allMessages: o,
      } = S({
        channelName: t.Channel,
        client: Y,
        messagesEbs: v,
        usedIn: "FLOATING_CHAT",
      }),
      [s, n] = w(f);
    A(t);
    const [l, i] = m.useState(""),
      [x, g] = m.useState([]),
      j = m.useRef(null),
      M = async (p) => {
        p.preventDefault();
        const b = await Promise.all(
          x.map(
            async (u, R) =>
              await P({
                file: u,
                ordinalNumber: R + 1,
              })
          )
        );
        if (b.find((u) => u.error !== null)) {
          alert("Something went wrong while uploading attachment.");
          return;
        }
        await a({
          subject: t.Subject,
          body: l,
          attachments: b.map((u) => u.attachmentRecord.Id),
          replyTo: s?.MessageId ?? null,
        }),
          i(""),
          g([]),
          n(null);
      },
      L = o;
    return e.jsx(d, {
      footerSlot: e.jsxs("div", {
        className: "border-t bg-white",
        children: [
          e.jsx(G, {
            ebs: f,
          }),
          e.jsxs("form", {
            onSubmit: M,
            className: "flex",
            children: [
              e.jsx("input", {
                type: "text",
                value: l,
                onChange: (p) => {
                  i(p.target.value);
                },
                placeholder: "Type message here",
                className:
                  "flex-1 p-2 rounded-lg focus:outline-none bg-slate-50 text-black",
              }),
              e.jsx("button", {
                type: "button",
                className: c(
                  "relative",
                  x.length && [
                    "after:block",
                    "after:w-[5px]",
                    "after:h-[5px]",
                    "after:absolute",
                    "after:top-[5px]",
                    "after:right-0",
                    "after:bg-black",
                    "after:rounded-full",
                  ]
                ),
                onClick: () => {
                  j.current?.setOpen(!0);
                },
                children: e.jsx(Z, {}),
              }),
              e.jsx("button", {
                type: "submit",
                "aria-label": "Send Message",
                className: "ml-2  text-white bg-slate-50",
                children: e.jsx("svg", {
                  className: "w-5 h-5 stroke-slate fill-slate",
                  focusable: "false",
                  viewBox: "0 0 24 24",
                  "aria-hidden": "true",
                  children: e.jsx("path", {
                    d: "M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z",
                  }),
                }),
              }),
              e.jsx(W, {
                selectedFiles: x,
                onChange: g,
                ref: j,
              }),
            ],
          }),
        ],
      }),
      children: e.jsx(V, {
        messages: L,
        sendReaction: r,
      }),
    });
  },
  J = () =>
    e.jsxs(d, {
      children: [
        e.jsx("p", {
          className: "text-lg font-semibold mb-2 text-slate",
          children: "Please login to chat",
        }),
        e.jsx("p", {
          className: "text-slate mb-4",
          children: "We typically reply in minutes",
        }),
        e.jsx("a", {
          href: H.login,
          "aria-label": "Login to Chat",
          className: "w-full bg-slate p-2 flex items-center justify-center",
          children: e.jsx("span", {
            className: "pt-[4px] px-1 font-semibold text-white",
            children: "Login to Chat",
          }),
        }),
      ],
    }),
  N = () => {
    const { toNewChat: t } = h();
    return e.jsx("button", {
      className: "text-center text-white bg-slate w-full p-2 text-lg",
      onClick: t,
      children: "Start new chat",
    });
  },
  K = () => {
    const { moveToChannel: t, channels: a, channelsLoading: r } = h(),
      o = a.toSorted((s, n) => Number(s.IsRead) - Number(n.IsRead));
    return e.jsxs(d, {
      footerSlot: e.jsx(N, {}),
      children: [
        a.length > 0 &&
          e.jsx("ul", {
            className: "flex flex-col gap-1",
            children: o.map((s) =>
              e.jsxs(
                "li",
                {
                  className: c(
                    "w-full",
                    "text-slate",
                    "border-x",
                    "border-y",
                    "border-slate",
                    "p-2",
                    "flex",
                    "cursor-pointer",
                    "hover:border-l-4",
                    "box-border"
                  ),
                  onClick: () => {
                    t(s);
                  },
                  children: [
                    !s.IsRead &&
                      e.jsx("span", {
                        children: "📩",
                      }),
                    "Re: ",
                    s.Subject,
                  ],
                },
                s.Id
              )
            ),
          }),
        r &&
          a.length === 0 &&
          e.jsx("p", {
            children: "Loading conversations...",
          }),
        a.length === 0 &&
          !r &&
          e.jsx("p", {
            children: "You have no active conversations.",
          }),
      ],
    });
  },
  Q = () => {
    const { createConversation: t } = h(),
      [a, r] = m.useState("");
    return e.jsxs(d, {
      children: [
        e.jsx("p", {
          className: "text-lg font-semibold mb-2 text-slate",
          children: "Ask us anything!",
        }),
        e.jsx("p", {
          className: "text-slate",
          children: "We typically reply in minutes",
        }),
        e.jsxs("div", {
          className: "my-4",
          children: [
            e.jsx("label", {
              className: "block text-sm font-medium text-gray-700",
              children: "Subject:",
            }),
            e.jsx("input", {
              type: "text",
              value: a,
              placeholder: "Enter subject",
              onChange: (o) => {
                r(o.target.value);
              },
              className:
                "text-black mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500",
            }),
          ],
        }),
        e.jsxs("button", {
          onClick: async () => {
            t(a);
          },
          "aria-label": "Start Chat",
          className:
            "w-full bg-slate p-2 flex items-center justify-center text-white gap-1",
          children: [
            e.jsx("span", {
              className: "font-semibold",
              children: "Start Chat",
            }),
            e.jsx(D, {
              className: "fill-white w-[20px] h-[20px]",
            }),
          ],
        }),
      ],
    });
  },
  Ne = () => {
    const { isAuthorized: t, chatState: a, error: r } = h();
    return e.jsxs(e.Fragment, {
      children: [
        a === "reception" && !t && e.jsx(J, {}),
        a === "reception" && t && e.jsx(K, {}),
        a === "conversation" && e.jsx(q, {}),
        a === "loading" &&
          e.jsx(d, {
            children: e.jsx("p", {
              children: "Loading...",
            }),
          }),
        a === "new-chat" && e.jsx(Q, {}),
        a === "join-error" &&
          e.jsx(d, {
            footerSlot: e.jsx(N, {}),
            children: e.jsx("p", {
              children: r,
            }),
          }),
        a === "init-error" &&
          e.jsx(d, {
            children: e.jsx("p", {
              children: r,
            }),
          }),
      ],
    });
  };
export { Ne as PopupChatInner };
