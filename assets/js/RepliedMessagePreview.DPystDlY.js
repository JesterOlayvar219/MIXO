import { j as e } from "./jsx-runtime.CDeAccHH.js";
import { u as a } from "./useEbsState.DkCPYDF2.js";
import { r as t } from "./chatMarkdown.CEay0G5R.js";
import { I as o } from "./index.B-gKb-S2.js";
const x = ({ ebs: r }) => {
  const [s, l] = a(r);
  return s
    ? e.jsxs("div", {
        className: "flex items-center gap-x-2",
        children: [
          e.jsxs("div", {
            className:
              "border-l-2 bordered border-secondary pl-3 text-xs w-full",
            children: [
              e.jsx("p", {
                className: "font",
                children: e.jsx("span", {
                  className: "font-bold",
                  children: s.Username,
                }),
              }),
              e.jsx("div", {
                dangerouslySetInnerHTML: {
                  __html: t(s.MessageData),
                },
                className: "text-xs",
              }),
            ],
          }),
          e.jsx("button", {
            onClick: () => {
              l(null);
            },
            children: e.jsx(o, {
              className: "fill-slate w-[20px] h-[20px]",
            }),
          }),
        ],
      })
    : null;
};
export { x as R };
