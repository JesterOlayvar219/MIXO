import { j as e } from "./jsx-runtime.CDeAccHH.js";
import { r as i } from "./index.Cb2GqDXq.js";
var r = i();
const n = ({ children: o, isOpen: t = !1, onClose: s, title: a }) => {
  if (t)
    return r.createPortal(
      e.jsx("div", {
        className: "modal modal-open",
        children: e.jsxs("div", {
          className: "modal-box",
          children: [
            e.jsxs("div", {
              className: "flex justify-between",
              children: [
                a &&
                  e.jsx("span", {
                    className: "text-2xl font-bold",
                    children: a,
                  }),
                s &&
                  e.jsx("button", {
                    className: "pl-4",
                    "aria-label": "Hide new topic window",
                    onClick: s,
                    children: e.jsxs("svg", {
                      width: "20",
                      height: "20",
                      viewBox: "0 0 20 20",
                      children: [
                        e.jsx("path", {
                          strokeWidth: "1.06",
                          d: "M16,16 L4,4",
                        }),
                        e.jsx("path", {
                          fill: "none",
                          strokeWidth: "1.06",
                          d: "M16,4 L4,16",
                        }),
                      ],
                    }),
                  }),
              ],
            }),
            o,
          ],
        }),
      }),
      document.body
    );
};
export { n as M };
