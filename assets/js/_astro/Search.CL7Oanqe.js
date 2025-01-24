import { j as e } from "../jsx-runtime.CDeAccHH.js";
import { S as y } from "../events.mBVLhjc9.js";
import { r as c, R as g } from "./index.CrPmW2s9.js";
import { u as v } from "../useAllIdeas.DdXRQWMv.js";
import { u as j } from "../useGuidesMeta.CETKDxHX.js";
import { r as w } from "../react.6lcJyD2o.js";
import { c as k } from "../categorizeGuides.CgJInX0a.js";
import { b as E } from "../fa.DgzscMXU.js";
import { a as S } from "../index.B-gKb-S2.js";
import "./index.D2MAbzvX.js";
import "../ideas.BUdAWsYH.js";
import "../httpClient.BFRTIcNZ.js";
import "../consts.BqJveuZl.js";
import "../useCache.CvyO7EUM.js";
import "../iconBase.BqiLPpiy.js";
const N = ({ open: u, containerId: m }) => {
    c.useEffect(() => {
      const f = (o) => {
        if (!u) return;
        const b =
            '[href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          r = document.querySelector(`#${m}`);
        if (r === null) return;
        const s = r?.querySelectorAll(b),
          i = s?.[0],
          h = s?.[s.length - 1];
        if (
          !(
            o.key !== "Tab" &&
            o.key !== "ArrowDown" &&
            o.key !== "ArrowUp" &&
            o.key !== "Enter"
          )
        )
          switch ((o.preventDefault(), o.key)) {
            case "ArrowDown":
              if (document.activeElement === h) i?.focus();
              else {
                const l =
                  (Array.from(s).findIndex(
                    (d) => d === document.activeElement
                  ) +
                    1) %
                  s.length;
                s[l]?.focus();
              }
              break;
            case "ArrowUp":
              if (document.activeElement === i) h?.focus();
              else {
                const l =
                  (Array.from(s).findIndex(
                    (d) => d === document.activeElement
                  ) -
                    1 +
                    s.length) %
                  s.length;
                s[l]?.focus();
              }
              break;
            case "Enter":
              document.activeElement?.click();
              break;
          }
      };
      return (
        window.addEventListener("keydown", f),
        () => {
          window.removeEventListener("keydown", f);
        }
      );
    }, [u, m]);
  },
  H = () => {
    const { ideas: u } = v(),
      { guides: m } = j(),
      f = c.useRef(null),
      [o, b] = c.useState("Ctrl"),
      [r, s] = c.useState(!1),
      [i, h] = c.useState(""),
      x = w.useFuzzySearchList({
        list: m,
        mapResultItem: ({ item: t }) => t,
        queryText: i,
        getText: (t) => [t.Name],
      }),
      l = w.useFuzzySearchList({
        list: u,
        mapResultItem: ({ item: t }) => t,
        queryText: i,
        getText: (t) => [t.Title],
      });
    N({
      open: r,
      containerId: "guide-search",
    }),
      c.useEffect(() => {
        r && f.current?.focus();
      }, [r]),
      g.useEffect(() => {
        const t = (n) => {
            n.key === "k" &&
              (n.metaKey || n.ctrlKey) &&
              (n.preventDefault(), s((p) => !p)),
              n.key === "Escape" && (n.preventDefault(), s(!1));
          },
          a = () => {
            console.log("event listed"), s(!0);
          };
        return (
          window.addEventListener("keydown", t),
          window.addEventListener(y, a),
          () => {
            window.removeEventListener("keydown", t),
              window.removeEventListener(y, a);
          }
        );
      }, []),
      c.useEffect(() => {
        (navigator.platform.indexOf("Mac") === 0 ||
          navigator.platform === "iPhone") &&
          b("⌘");
      }, []),
      c.useEffect(() => {
        const t = (a) => {
          const n = document.getElementById("guide-search-modal-box");
          r && n && !n.contains(a.target) && s(!1);
        };
        return (
          document.addEventListener("mousedown", t),
          () => {
            document.removeEventListener("mousedown", t);
          }
        );
      }, [r, s]);
    const d = k(x);
    return e.jsx("div", {
      className: `modal ${r ? "modal-open" : ""}`,
      id: "guide-search",
      children: e.jsxs("div", {
        className: "modal-box pt-0 top-24 absolute pb-2",
        id: "guide-search-modal-box",
        children: [
          e.jsx("div", {
            className:
              "form-control sticky top-0 z-10 pt-4 mb-4 shadow-xl  bg-primary",
            children: e.jsxs("div", {
              className:
                "flex border-2 border-secondary items-center p-2 bg-white",
              children: [
                e.jsx("div", {
                  className: "pr-2 bg-white",
                  children: e.jsx(E, {
                    className: "fill-black stroke-black",
                  }),
                }),
                e.jsx("input", {
                  autoFocus: !0,
                  type: "text",
                  ref: f,
                  placeholder: "Search Guides",
                  className:
                    "w-full pl-0 h-6 rounded-3 outline-none text-[16px] text-black",
                  value: i,
                  onChange: (t) => {
                    h(t.target.value);
                  },
                }),
                e.jsx("button", {
                  "aria-label": "Open Search",
                  onClick: () => {
                    s(!1);
                  },
                  children: e.jsx(S, {
                    className: "fill-black stroke-black",
                  }),
                }),
              ],
            }),
          }),
          e.jsx("div", {
            children:
              x.length !== m.length &&
              Object.entries(d).length > 0 &&
              e.jsxs("div", {
                children: [
                  e.jsx("div", {
                    className: "w-full bg-secondary my-2 p-2",
                    children: e.jsx("p", {
                      className: " text-primary font-bold",
                      children: "Guides",
                    }),
                  }),
                  Object.entries(d).map(([t, a]) =>
                    e.jsxs(
                      "div",
                      {
                        children: [
                          e.jsx("p", {
                            className: " font-bold",
                            children: t,
                          }),
                          e.jsx("ul", {
                            children: a.map((n, p) =>
                              e.jsx(
                                "li",
                                {
                                  tabIndex: 0,
                                  autoFocus: p === 0,
                                  className:
                                    "block hover:bg-secondary px-2 py-1 focus:outline-none focus:bg-secondary",
                                  "data-result-index": p,
                                  onClick: () =>
                                    (window.location.href = `/guides/${n.Slug}/`),
                                  children: n.Name,
                                },
                                n.Slug + `-${Math.random() * 6}`
                              )
                            ),
                          }),
                        ],
                      },
                      t
                    )
                  ),
                ],
              }),
          }),
          e.jsx("div", {
            children:
              l.length !== u.length &&
              l.length > 0 &&
              e.jsxs("div", {
                children: [
                  e.jsx("div", {
                    className: "w-full bg-secondary my-2 p-2",
                    children: e.jsx("p", {
                      className: " text-primary font-bold",
                      children: "Ideas",
                    }),
                  }),
                  e.jsx("ul", {
                    children: l.map((t, a) =>
                      e.jsx(
                        "li",
                        {
                          tabIndex: 0,
                          className:
                            "block hover:bg-secondary px-2 py-1 focus:outline-none focus:bg-secondary",
                          "data-result-index": a,
                          onClick: () =>
                            (window.location.href = `/roadmap/${t?.Title.toLowerCase()
                              .split(" ")
                              .join("-")}/`),
                          children: t.Title,
                        },
                        t.id + "-i"
                      )
                    ),
                  }),
                ],
              }),
          }),
          e.jsx("div", {
            className: "flex justify-end",
            children: e.jsx("div", {
              children: e.jsxs("span", {
                className: "text-secondary",
                children: [
                  "Shortcut: ",
                  e.jsxs("span", {
                    className: "font-semibold",
                    children: [o, " + K"],
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
    });
  };
export { H as default };
