import { j as o } from "./jsx-runtime.CDeAccHH.js";
import { h as m, j as l } from "./chat.Dkwpnclq.js";
import { c } from "./clsx.B-dksMZM.js";
import { r as n } from "./index.CrPmW2s9.js";
import "./index.D2MAbzvX.js";
import "./consts.BqJveuZl.js";
import "./httpClient.BFRTIcNZ.js";
const s = (t) => "Filename" in t,
  g = ({ message: t, needsDiscover: a = !1 }) => {
    const [r, i] = n.useState(t);
    return (
      n.useEffect(() => {
        a &&
          t.attachments?.length &&
          m(r.MessageId)
            .then((e) => {
              e?.attachmentsData?.length &&
                i({
                  ...r,
                  attachments: e.attachmentsData,
                });
            })
            .catch(() => {
              console.error("Couldnt discover attachment!");
            });
      }, []),
      r?.attachments?.length
        ? o.jsx("ul", {
            className: "bordered border border-secondary p-2 mb-4",
            children: r.attachments.map((e) =>
              o.jsx(
                "li",
                {
                  className: c("text-sm", "mb-1", s(e) && "cursor-pointer"),
                  onClick: () => {
                    s(e) && l(e.Id, e.Filename);
                  },
                  children: s(e) ? e.Filename : "File uploaded",
                },
                e.Id
              )
            ),
          })
        : null
    );
  };
export { g as AttachmentsList };
