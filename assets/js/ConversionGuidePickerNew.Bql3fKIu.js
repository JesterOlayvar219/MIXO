import { j as s } from "./jsx-runtime.CDeAccHH.js";
import { u as c } from "./useEbsState.DkCPYDF2.js";
import { c as h, a as g } from "./conversionPicker.ebs.BbfQ6pTo.js";
import { B as d, a as p } from "./bi.CblkrmYy.js";
import { u as v } from "./useGuidesMeta.CETKDxHX.js";
import "./index.D2MAbzvX.js";
import "./index.CrPmW2s9.js";
import "./ebs.Bnp6cHqf.js";
import "./iconBase.BqiLPpiy.js";
import "./useCache.CvyO7EUM.js";
import "./consts.BqJveuZl.js";
const m = [
    "Rekordbox",
    "Traktor",
    "Serato",
    "Virtual DJ",
    "Engine DJ",
    "Mixxx",
    "Digital DJ 2",
    "Djay Pro",
    "Cross DJ",
    "DEX 3",
    "Ultramixer",
    "Deckadance 2",
    "iTunes",
  ],
  E = () => {
    const [r, a] = c(h),
      [t, i] = c(g),
      { guides: l } = v(),
      x = () => {
        const e = `ConvertFrom:${r}`,
          u = `ConvertTo:${t}`;
        let o;
        r === "iTunes" || t === "iTunes"
          ? (o = l.find((n) => n.Slug === "itunes-and-apple-music-to-mixo"))
          : (o = l.find((n) => n.Tags.includes(e) && n.Tags.includes(u))),
          o || alert("Something went wrong! Contact team."),
          (window.location.href = `/guides/${o?.Slug}`);
      };
    return s.jsx("div", {
      children: s.jsxs("div", {
        className:
          "xs:inline-grid xs:grid-cols-1 xs:gap-6 inline-flex gap-4 items-center",
        children: [
          s.jsxs("label", {
            children: [
              s.jsx("span", {
                className: "sr-only",
                children: "Select platform to convert from:",
              }),
              s.jsxs("select", {
                className:
                  "select lg:mr-4 text-2xl bg-transparent bordered border-accent border-2",
                onChange: (e) => {
                  a(e.target.value);
                },
                value: r,
                children: [
                  m.map((e) =>
                    s.jsx(
                      "option",
                      {
                        value: e,
                        disabled: e === t,
                        children: e,
                      },
                      `ConvertFrom:${e}`
                    )
                  ),
                  s.jsx("option", {
                    value: "Traktor",
                    children: "Traktor",
                  }),
                ],
              }),
            ],
          }),
          s.jsxs("button", {
            className: "xs:flex xs:justify-center",
            onClick: () => {
              const e = r;
              a(t), i(e);
            },
            "aria-label": "Switch programs",
            children: [
              s.jsx(d, {
                className: "xs:hidden w-[50px] h-[50px] fill-accent",
              }),
              s.jsx(p, {
                className: "hidden xs:block  w-[50px] h-[50px] fill-accent",
              }),
            ],
          }),
          s.jsxs("label", {
            children: [
              s.jsx("span", {
                className: "sr-only",
                children: "Select platform to convert to:",
              }),
              s.jsx("select", {
                className:
                  "select lg:mr-4 text-2xl bg-transparent bordered border-accent border-2",
                onChange: (e) => {
                  i(e.target.value);
                },
                value: t,
                children: m.map((e) =>
                  s.jsx(
                    "option",
                    {
                      value: e,
                      disabled: e === r,
                      children: e,
                    },
                    `ConvertTo:${e}`
                  )
                ),
              }),
            ],
          }),
          s.jsxs("button", {
            disabled: r === t,
            type: "button",
            className: "cta xs:mb-4",
            onClick: x,
            children: [
              s.jsx("span", {
                children: "Go",
              }),
              s.jsx(d, {
                className: "fill-accent w-[25px] h-[25px] home-transition",
              }),
            ],
          }),
        ],
      }),
    });
  };
export { E as ConversionGuidePicker };
