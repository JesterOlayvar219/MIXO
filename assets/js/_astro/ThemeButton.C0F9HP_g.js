import { j as e } from "../jsx-runtime.CDeAccHH.js";
import { r as c } from "./index.CrPmW2s9.js";
import { d as l, t as n } from "../consts.BqJveuZl.js";
import "./index.D2MAbzvX.js";
const h = () =>
    e.jsx("div", {
      className:
        "flex h-10 w-10 p-1 border-2 border-primary rounded-full bg-accent hover:bg-secondary justify-center items-center",
      children: e.jsx("svg", {
        viewBox: "0 0 512 512",
        height: "35px",
        width: "35px",
        xmlns: "http://www.w3.org/2000/svg",
        className: "fill-primary",
        children: e.jsx("path", {
          d: "M136.5 77.7l37 67L32 285.7 216.4 464l152.4-148.6 54.4-11.4L166.4 48l-29.9 29.7zm184 208H114.9l102.8-102.3 102.8 102.3zM423.3 304s-56.7 61.5-56.7 92.1c0 30.7 25.4 55.5 56.7 55.5 31.3 0 56.7-24.9 56.7-55.5S423.3 304 423.3 304z",
        }),
      }),
    }),
  f = () => {
    const [m, a] = c.useState(localStorage.getItem("currentTheme") ?? l.name);
    function s() {
      const o = (n.findIndex((r) => r.name === m) + 1) % n.length,
        t = n[o].name;
      if ((a(t), typeof window < "u")) {
        localStorage.setItem("currentTheme", t),
          document.documentElement.setAttribute("data-theme", t),
          document
            .querySelector('meta[name="theme-color"]')
            ?.setAttribute("content", n[o].color);
        const r = new CustomEvent("themeChange", {
          detail: {
            newTheme: t,
          },
        });
        window.dispatchEvent(r);
      }
    }
    return e.jsx("button", {
      onClick: s,
      "aria-label": "Change Theme",
      children: e.jsx(h, {}),
    });
  };
export { f as default };
