import { j as s } from "./jsx-runtime.CDeAccHH.js";
import { g as i } from "./httpClient.BFRTIcNZ.js";
import { c as r } from "./clsx.B-dksMZM.js";
import { r as l } from "./index.CrPmW2s9.js";
import { r as h } from "./chatMarkdown.CEay0G5R.js";
import { m } from "./chat.Dkwpnclq.js";
const p = {
    "thumbs-up": "👍",
    "grinning-face": "😀",
    heart: "❤️",
    "tears-of-joy": "😂",
    shock: "😮",
    "sad-tear": "😢",
    angry: "😡",
  },
  u = [
    "thumbs-up",
    "grinning-face",
    "heart",
    "tears-of-joy",
    "shock",
    "sad-tear",
    "angry",
  ],
  c = ({ className: a }) =>
    s.jsxs("svg", {
      className: a,
      strokeWidth: "0",
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        s.jsx("path", {
          fill: "none",
          d: "M0 0h24v24H0z",
        }),
        s.jsx("path", {
          d: "M7 9.5C7 8.67 7.67 8 8.5 8s1.5.67 1.5 1.5S9.33 11 8.5 11 7 10.33 7 9.5zm5 8c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5zm3.5-6.5c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zM22 1h-2v2h-2v2h2v2h2V5h2V3h-2V1zm-2 11c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8c1.46 0 2.82.4 4 1.08V2.84A9.929 9.929 0 0 0 11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12c0-1.05-.17-2.05-.47-3H19.4c.38.93.6 1.94.6 3z",
        }),
      ],
    }),
  w = ({ onSelect: a, className: e }) => {
    const [n, t] = l.useState(!1),
      d = i().type !== "guest";
    return n
      ? s.jsx("div", {
          className: r(e),
          children: s.jsxs("div", {
            className: r(
              "inline-flex",
              "gap-x-1",
              "bg-white",
              "bg-opacity-15",
              "rounded-xl",
              "px-2",
              "h-[30px]"
            ),
            children: [
              u.map((o, x) =>
                s.jsx(
                  "button",
                  {
                    onClick: () => {
                      a(o), t(!1);
                    },
                    className: "text-lg hover:scale-125",
                    children: p[o],
                  },
                  x
                )
              ),
              s.jsx("button", {
                onClick: () => {
                  t(!1);
                },
                children: s.jsx(c, {
                  className:
                    "fill-secondary stroke-secondary w-[15px] h-[15px]",
                }),
              }),
            ],
          }),
        })
      : s.jsx("div", {
          className: r(e),
          children: s.jsx("div", {
            className: r(
              "flex items-center gap-x-2 justify-center text-center"
            ),
            children:
              d &&
              s.jsx("button", {
                "aria-label": "Show Emoji",
                className: r(
                  "rounded-full",
                  "bg-accent",
                  "h-[24px]",
                  "w-[24px]"
                ),
                onClick: () => {
                  t(!n);
                },
                children: s.jsx(c, {
                  className:
                    "fill-secondary stroke-secondary w-[15px] h-[15px] mx-auto",
                }),
              }),
          }),
        });
  },
  N = ({ messageId: a, repliedMessage: e }) =>
    e
      ? s.jsxs("div", {
          className:
            "border-l-2 bordered border-secondary pl-3 py-2 bg-secondary bg-opacity-15",
          children: [
            s.jsxs("p", {
              className: "font-mono text-xs",
              children: [
                "In reply to",
                " ",
                s.jsx("span", {
                  className: "font-bold",
                  children: e.Username,
                }),
              ],
            }),
            s.jsx("div", {
              dangerouslySetInnerHTML: {
                __html: h(e.MessageData),
              },
            }),
          ],
        })
      : s.jsx("div", {
          className:
            "border-l-2 bordered border-secondary bg-secondary bg-opacity-15 pl-3 text-xs",
          children: s.jsxs("p", {
            children: ["Reply to #", a],
          }),
        }),
  C = (a) => {
    l.useEffect(() => {
      const e = i();
      e.type === "user" && m(a.Channel, e.name);
    }, []);
  };
export { N as R, w as a, p as r, C as u };
