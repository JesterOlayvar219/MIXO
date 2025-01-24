import { j as t } from "./jsx-runtime.CDeAccHH.js";
import { C as s } from "./events.mBVLhjc9.js";
import { r as a } from "./index.CrPmW2s9.js";
import "./index.D2MAbzvX.js";
const h = () => {
  const [r, n] = a.useState(0);
  return (
    a.useEffect(() => {
      const e = () => {
        const o = JSON.parse(localStorage.getItem("cart") ?? "[]");
        n(o.length);
      };
      return (
        window.addEventListener(s, e),
        e(),
        () => {
          window.removeEventListener(s, e);
        }
      );
    }, []),
    t.jsx("a", {
      "aria-label": "Bag",
      href: "/bag",
      children: t.jsx("div", {
        className: "relative",
        children:
          r > 0 &&
          t.jsxs(t.Fragment, {
            children: [
              t.jsx("div", {
                className:
                  "absolute -right-3 -top-3 p-1 rounded-full bg-secondary h-6 w-6 flex items-center justify-center",
                children: t.jsx("span", {
                  className: "text-primary text-sm",
                  children: r,
                }),
              }),
              t.jsx("div", {
                children: t.jsxs("svg", {
                  stroke: "currentColor",
                  fill: "currentColor",
                  strokeWidth: "0",
                  viewBox: "0 0 24 24",
                  height: "28px",
                  width: "28px",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: [
                    t.jsx("path", {
                      fill: "none",
                      d: "M0 0h24v24H0z",
                    }),
                    t.jsx("path", {
                      d: "M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z",
                    }),
                  ],
                }),
              }),
            ],
          }),
      }),
    })
  );
};
export { h as default };
