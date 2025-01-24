const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "_astro/PopupChatInner.efzPDgEb.js",
      "_astro/jsx-runtime.CDeAccHH.js",
      "_astro/index.D2MAbzvX.js",
      "_astro/index.CrPmW2s9.js",
      "_astro/useChat.BfwcT6K7.js",
      "_astro/chatClient.nr179Z3f.js",
      "_astro/consts.BqJveuZl.js",
      "_astro/httpClient.BFRTIcNZ.js",
      "_astro/chat.Dkwpnclq.js",
      "_astro/useEbsState.DkCPYDF2.js",
      "_astro/clsx.B-dksMZM.js",
      "_astro/useMarkChannelAsRead.Dnlr9Wpl.js",
      "_astro/chatMarkdown.CEay0G5R.js",
      "_astro/ebs.Bnp6cHqf.js",
      "_astro/iconBase.BqiLPpiy.js",
      "_astro/AttachmentsList.Zgo7k2Ms.js",
      "_astro/AttachmentWindow.D-wwGdMm.js",
      "_astro/Modal.DAbqui3k.js",
      "_astro/index.Cb2GqDXq.js",
      "_astro/index.B-gKb-S2.js",
      "_astro/RepliedMessagePreview.DPystDlY.js",
      "_astro/useChannelsByUserId.D5u2Qxbs.js",
      "_astro/useSearchParam.G6pYfR-D.js",
      "_astro/useChatSubscription.B4PwWwRa.js",
      "_astro/exportChatHistory.HAmnRl9h.js",
    ])
) => i.map((i) => d[i]);
import { j as e } from "./jsx-runtime.CDeAccHH.js";
import { u as B } from "./useChannelsByUserId.D5u2Qxbs.js";
import { u as _, g as T } from "./useSearchParam.G6pYfR-D.js";
import { b as z, c as M, a as O } from "./chat.Dkwpnclq.js";
import { g as b } from "./httpClient.BFRTIcNZ.js";
import { r } from "./index.CrPmW2s9.js";
import { c as v } from "./clsx.B-dksMZM.js";
import { u as V } from "./useChatSubscription.B4PwWwRa.js";
import { e as U } from "./exportChatHistory.HAmnRl9h.js";
import { G as S } from "./iconBase.BqiLPpiy.js";
const F = "modulepreload",
  H = function (t) {
    return "/" + t;
  },
  L = {},
  R = function (a, n, m) {
    let p = Promise.resolve();
    if (n && n.length > 0) {
      document.getElementsByTagName("link");
      const l = document.querySelector("meta[property=csp-nonce]"),
        o = l?.nonce || l?.getAttribute("nonce");
      p = Promise.allSettled(
        n.map((s) => {
          if (((s = H(s)), s in L)) return;
          L[s] = !0;
          const h = s.endsWith(".css"),
            i = h ? '[rel="stylesheet"]' : "";
          if (document.querySelector(`link[href="${s}"]${i}`)) return;
          const c = document.createElement("link");
          if (
            ((c.rel = h ? "stylesheet" : F),
            h || (c.as = "script"),
            (c.crossOrigin = ""),
            (c.href = s),
            o && c.setAttribute("nonce", o),
            document.head.appendChild(c),
            h)
          )
            return new Promise((x, g) => {
              c.addEventListener("load", x),
                c.addEventListener("error", () =>
                  g(new Error(`Unable to preload CSS for ${s}`))
                );
            });
        })
      );
    }
    function f(l) {
      const o = new Event("vite:preloadError", {
        cancelable: !0,
      });
      if (((o.payload = l), window.dispatchEvent(o), !o.defaultPrevented))
        throw l;
    }
    return p.then((l) => {
      for (const o of l || []) o.status === "rejected" && f(o.reason);
      return a().catch(f);
    });
  },
  $ = () =>
    e.jsx("svg", {
      viewBox: "0 0 256 256",
      height: "30px",
      width: "30px",
      xmlns: "http://www.w3.org/2000/svg",
      className: "fill-primary",
      children: e.jsx("path", {
        d: "M216,76H188V48a20,20,0,0,0-20-20H40A20,20,0,0,0,20,48V176a12,12,0,0,0,19.54,9.33l28.46-23V184a20,20,0,0,0,20,20h92.17l36.29,29.33A12,12,0,0,0,236,224V96A20,20,0,0,0,216,76ZM44,150.87V52H164v80H71.58A12,12,0,0,0,64,134.67Zm168,48-20-16.2a12,12,0,0,0-7.54-2.67H92V156h76a20,20,0,0,0,20-20V100h24Z",
      }),
    }),
  y = {
    AnswerId: null,
    Channel: "",
    DateTime: "",
    Id: 0,
    Subject: "",
    UserId: "",
    Visibility: "PUBLIC",
  },
  I = r.createContext(null),
  Z = ({ children: t }) => {
    const [a, n] = _("floating_chat_open"),
      m = !!a,
      p = b(),
      [f, l] = r.useState(!1),
      [o, s] = r.useState(null),
      [h, i] = r.useState("reception"),
      [c, x] = r.useState(y),
      {
        channels: g,
        lazyInit: w,
        isLoading: C,
      } = B({
        isLazy: !0,
        longpoll: h === "reception" && m,
        pageSize: 1e3,
      }),
      j = (d) => {
        x(d), i("conversation");
      },
      P = (d) => {
        i("loading"),
          z(d)
            .then((u) => {
              u.Id === 0
                ? (s("Conversation not found. Create new one?"),
                  i("join-error"))
                : j(u);
            })
            .catch((u) => {
              s(
                `An error occured: ${u?.message}. Try reloading page. If error persists, contact us via e-mail.`
              ),
                i("init-error");
            });
      },
      N = (d) => {
        M({
          subject: d,
        })
          .then(({ channel: u }) => {
            j(u);
          })
          .catch((u) => {
            s(
              `An error occured: ${u?.message}. Try reloading page. If error persists, contact us via e-mail.`
            ),
              i("init-error");
          });
      },
      E = () => {
        i("reception"), x(y);
      },
      A = {
        chatState: h,
        channel: c,
        setChannel: x,
        channels: g,
        moveToChannel: j,
        loading: f,
        setLoading: l,
        isAuthorized: p.type === "user",
        createConversation: N,
        exitConversation: E,
        error: o,
        isOpen: !!a,
        setIsOpen: (d) => {
          n(d ? 1 : "");
        },
        toNewChat: () => {
          i("new-chat");
        },
        channelsLoading: C,
      };
    return (
      r.useEffect(() => {
        const d = b(),
          u = T("chatChannel");
        if (u) {
          if (d.type === "guest") {
            alert("Please authorize to be able to use chat link.");
            return;
          }
          n("1"), P(Number(u));
        }
      }, []),
      r.useEffect(() => {
        const d = b();
        h === "reception" && d.type === "user" && m && w();
      }, [h, m]),
      e.jsx(I.Provider, {
        value: A,
        children: t,
      })
    );
  },
  k = () => {
    const t = r.useContext(I);
    if (!t) throw new Error("Please make sure you used provider!");
    return t;
  },
  D = () =>
    e.jsx("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      width: "20",
      height: "20",
      children: e.jsx("path", {
        fill: "currentColor",
        d: "M10.001 7.8a2.2 2.2 0 1 0 0 4.402A2.2 2.2 0 0 0 10 7.8zm0-2.6A2.2 2.2 0 1 0 9.999.8a2.2 2.2 0 0 0 .002 4.4zm0 9.6a2.2 2.2 0 1 0 0 4.402 2.2 2.2 0 0 0 0-4.402z",
      }),
    }),
  W = () =>
    e.jsxs("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 20 20",
      children: [
        e.jsx("path", {
          strokeWidth: "2",
          d: "M16,16 L4,4",
        }),
        e.jsx("path", {
          strokeWidth: "2",
          d: "M16,4 L4,16",
        }),
      ],
    });
function q(t) {
  return S({
    tag: "svg",
    attr: {
      viewBox: "0 0 32 32",
    },
    child: [
      {
        tag: "path",
        attr: {
          d: "M 13.28125 6.78125 L 4.78125 15.28125 L 4.09375 16 L 4.78125 16.71875 L 13.28125 25.21875 L 14.71875 23.78125 L 7.9375 17 L 28 17 L 28 15 L 7.9375 15 L 14.71875 8.21875 Z",
        },
        child: [],
      },
    ],
  })(t);
}
function de(t) {
  return S({
    tag: "svg",
    attr: {
      viewBox: "0 0 32 32",
    },
    child: [
      {
        tag: "path",
        attr: {
          d: "M 3.59375 5.34375 L 4.03125 7.21875 L 5.96875 16 L 4.03125 24.78125 L 3.59375 26.65625 L 5.375 25.9375 L 27.375 16.9375 L 29.65625 16 L 27.375 15.0625 L 5.375 6.0625 Z M 6.375 8.65625 L 21.90625 15 L 7.78125 15 Z M 7.78125 17 L 21.90625 17 L 6.375 23.34375 Z",
        },
        child: [],
      },
    ],
  })(t);
}
const G = async (t) => {
    const a = `${window.location.origin}?chatChannel=${t.Id}`;
    await navigator.clipboard.writeText(a);
  },
  J = v(
    "grid",
    "grid-cols-[24px_auto_24px]",
    "items-center",
    "justify-between",
    "p-4",
    "shadow-sm",
    "bg-secondary",
    "text-accent",
    "relative"
  ),
  K = () => {
    const { chatState: t, exitConversation: a, channel: n, setIsOpen: m } = k(),
      p = ["conversation", "join-error", "new-chat"],
      { isSubscribed: f, toggleSubscription: l } = V(n.Id),
      [o, s] = r.useState(!1),
      [h, i] = r.useState("Copy chat URL"),
      c = p.includes(t),
      x = t === "conversation",
      g =
        t === "reception" ||
        t === "init-error" ||
        t === "join-error" ||
        t === "loading",
      w = () => {
        G(n)
          .then(() => {
            i("Copied"),
              setTimeout(() => {
                i("Copy chat URL");
              }, 3e3);
          })
          .catch(() => {});
      };
    return e.jsxs("div", {
      className: J,
      children: [
        c &&
          e.jsx("button", {
            className: "",
            onClick: () => {
              a();
            },
            children: e.jsx(q, {
              className: "w-[25px] h-[25px]",
            }),
          }),
        g &&
          e.jsx("button", {
            onClick: () => {
              m(!1);
            },
            children: e.jsx(W, {}),
          }),
        e.jsx("span", {
          className: "text-lg font-medium capitalize col-start-2",
          children: t === "conversation" ? n.Subject : "Chat",
        }),
        e.jsxs("div", {
          className: "flex gap-x-1 items-center",
          children: [
            x &&
              e.jsx("button", {
                onClick: () => {
                  s(!o);
                },
                children: e.jsx(D, {}),
              }),
            o &&
              e.jsxs("div", {
                className:
                  "absolute top-full right-0 bg-secondary flex flex-col text-left z-50",
                children: [
                  e.jsxs("button", {
                    className:
                      "text-left hover:bg-accent hover:bg-opacity-5 bg-opa p-2",
                    onClick: l,
                    children: [
                      "Turn ",
                      f ? "off" : "on",
                      " email notifications",
                    ],
                  }),
                  e.jsx("button", {
                    className:
                      "text-left hover:bg-accent hover:bg-opacity-5 p-2",
                    onClick: w,
                    children: h,
                  }),
                  e.jsx("a", {
                    href: `/chat/${n.Id}`,
                    className:
                      "text-left hover:bg-accent hover:bg-opacity-5 p-2",
                    children: "Open full version",
                  }),
                  e.jsx("button", {
                    className:
                      "text-left hover:bg-accent hover:bg-opacity-5 p-2",
                    onClick: () => {
                      O(n.Channel)
                        .then((C) => {
                          U(C.messages);
                        })
                        .catch((C) => {
                          throw C;
                        });
                    },
                    children: "Download chat history(.txt)",
                  }),
                ],
              }),
          ],
        }),
      ],
    });
  },
  Q = v("md:bottom-10", "md:right-10", "md:w-72"),
  X = v("xs:left-0", "xs:right-0", "xs:top-0", "xs:bottom-0", "xs:modal-open"),
  Y = ({ children: t, footerSlot: a }) =>
    e.jsxs("div", {
      className: v(
        "fixed",
        "grid",
        "grid-rows-[max-content_auto_max-content]",
        "z-50",
        "text-slate",
        "shadow-md",
        X,
        Q
      ),
      children: [
        e.jsx(K, {}),
        e.jsx("div", {
          className: "p-4 overflow-y-auto bg-white md:h-96",
          children: t,
        }),
        a,
      ],
    }),
  ee = () => {
    const { isOpen: t, setIsOpen: a } = k(),
      [n, m] = r.useState(null);
    return (
      r.useEffect(() => {
        t &&
          R(
            () => import("./PopupChatInner.efzPDgEb.js"),
            __vite__mapDeps([
              0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
              19, 20, 21, 22, 23, 24,
            ])
          )
            .then((p) => {
              m(e.jsx(p.PopupChatInner, {}));
            })
            .catch((p) => {
              console.error(p);
            });
      }, [t]),
      e.jsxs(e.Fragment, {
        children: [
          !t &&
            e.jsx("div", {
              className: "md:fixed bottom-10 right-10",
              children: e.jsx("div", {
                className:
                  "flex w-10 h-10 p-1 border-2 border-primary rounded-full bg-accent hover:bg-secondary text-slate justify-center items-center cursor-pointer",
                onClick: () => {
                  a(!t);
                },
                children: e.jsx($, {}),
              }),
            }),
          t &&
            e.jsx(r.Suspense, {
              fallback: e.jsx(Y, {
                children: e.jsx("p", {
                  children: "Chat is loading...",
                }),
              }),
              children: n,
            }),
        ],
      })
    );
  },
  ue = () =>
    e.jsx(Z, {
      children: e.jsx(ee, {}),
    });
export { Y as C, ue as F, de as L, k as u };
