import { j as e } from "./jsx-runtime.CDeAccHH.js";
import { M as m } from "./Modal.DAbqui3k.js";
import { c as f } from "./clsx.B-dksMZM.js";
import { r as a } from "./index.CrPmW2s9.js";
import { I as x } from "./index.B-gKb-S2.js";
const u = ({ onChange: s, selectedFiles: t }, i) => {
    const [c, o] = a.useState(!1);
    return (
      a.useImperativeHandle(i, () => ({
        setOpen: (r) => {
          o(r);
        },
      })),
      e.jsxs(m, {
        isOpen: c,
        children: [
          e.jsxs("label", {
            className: f(
              "block",
              "w-full",
              "h-[200px]",
              "bordered",
              "border-2",
              "border-secondary",
              "border-dashed",
              "rounded",
              "mb-4",
              "p-2",
              "flex",
              "flex-col",
              "justify-center",
              "cursor-pointer",
              "relative"
            ),
            children: [
              e.jsxs("div", {
                className: "text-center",
                children: [
                  e.jsx("p", {
                    children:
                      "Drop your files here or click to open file dialog.",
                  }),
                  e.jsx("p", {
                    children:
                      "Allowed file extensions: .pdf, .jpg, .png, .doc, .db, .zip",
                  }),
                  e.jsx("p", {
                    children: "Max file size: 10MB",
                  }),
                  e.jsx("p", {
                    children: "Max files count per message: 10",
                  }),
                ],
              }),
              e.jsx("input", {
                className:
                  "opacity-0 absolute left-0 top-0 right-0 bottom-0 cursor-pointer",
                type: "file",
                multiple: !0,
                accept:
                  ".pdf,.jpg,.png,.doc,.db,.zip,application/msword,application/vnd.sqlite3,application/zip,application/pdf,image/jpeg,image/png",
                onChange: (r) => {
                  const n = Array.from(r?.target?.files).filter(
                    (p) => typeof t.find((d) => d.name === p.name) > "u"
                  );
                  if (n.length > 10 || t.length + n.length > 10) {
                    alert("Too many files."), (r.target.value = "");
                    return;
                  }
                  s(t.concat(n)), (r.target.value = "");
                },
              }),
            ],
          }),
          t.length > 0 &&
            e.jsxs(e.Fragment, {
              children: [
                e.jsx("p", {
                  children: "Selected files:",
                }),
                e.jsx("ul", {
                  className: "mb-2",
                  children: t.map((r) =>
                    e.jsxs(
                      "li",
                      {
                        className: "flex items-center",
                        children: [
                          e.jsx("button", {
                            className: "mr-2",
                            onClick: () => {
                              s(t.filter((l) => l.name !== r.name));
                            },
                            children: e.jsx(x, {
                              className: "stroke-secondary fill-secondary",
                            }),
                          }),
                          e.jsx("span", {
                            children: r.name,
                          }),
                        ],
                      },
                      r.name
                    )
                  ),
                }),
              ],
            }),
          e.jsx("div", {
            className: "modal-bottom",
            children: e.jsx("button", {
              type: "button",
              className: "btn btn-sm",
              onClick: () => {
                s(t), o(!1);
              },
              children: "Ok",
            }),
          }),
        ],
      })
    );
  },
  N = a.forwardRef(u);
export { N as A };
