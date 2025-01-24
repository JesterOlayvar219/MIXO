import { c as Cu, g as _u } from "./index.CrPmW2s9.js";
function lu() {
  return {
    async: !1,
    breaks: !1,
    extensions: null,
    gfm: !0,
    hooks: null,
    pedantic: !1,
    renderer: null,
    silent: !1,
    tokenizer: null,
    walkTokens: null,
  };
}
let T = lu();
function vu(l) {
  T = l;
}
const qu = /[&<>"']/,
  Zu = new RegExp(qu.source, "g"),
  Tu = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
  Mu = new RegExp(Tu.source, "g"),
  Ju = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  },
  Eu = (l) => Ju[l];
function C(l, r) {
  if (r) {
    if (qu.test(l)) return l.replace(Zu, Eu);
  } else if (Tu.test(l)) return l.replace(Mu, Eu);
  return l;
}
const Qu = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;
function Yu(l) {
  return l.replace(
    Qu,
    (r, e) => (
      (e = e.toLowerCase()),
      e === "colon"
        ? ":"
        : e.charAt(0) === "#"
        ? e.charAt(1) === "x"
          ? String.fromCharCode(parseInt(e.substring(2), 16))
          : String.fromCharCode(+e.substring(1))
        : ""
    )
  );
}
const Ku = /(^|[^\[])\^/g;
function A(l, r) {
  let e = typeof l == "string" ? l : l.source;
  r = r || "";
  const u = {
    replace: (n, a) => {
      let t = typeof a == "string" ? a : a.source;
      return (t = t.replace(Ku, "$1")), (e = e.replace(n, t)), u;
    },
    getRegex: () => new RegExp(e, r),
  };
  return u;
}
function Bu(l) {
  try {
    l = encodeURI(l).replace(/%25/g, "%");
  } catch {
    return null;
  }
  return l;
}
const G = {
  exec: () => null,
};
function wu(l, r) {
  const e = l.replace(/\|/g, (a, t, s) => {
      let o = !1,
        D = t;
      for (; --D >= 0 && s[D] === "\\"; ) o = !o;
      return o ? "|" : " |";
    }),
    u = e.split(/ \|/);
  let n = 0;
  if (
    (u[0].trim() || u.shift(),
    u.length > 0 && !u[u.length - 1].trim() && u.pop(),
    r)
  )
    if (u.length > r) u.splice(r);
    else for (; u.length < r; ) u.push("");
  for (; n < u.length; n++) u[n] = u[n].trim().replace(/\\\|/g, "|");
  return u;
}
function W(l, r, e) {
  const u = l.length;
  if (u === 0) return "";
  let n = 0;
  for (; n < u; ) {
    const a = l.charAt(u - n - 1);
    if (a === r && !e) n++;
    else if (a !== r && e) n++;
    else break;
  }
  return l.slice(0, u - n);
}
function Wu(l, r) {
  if (l.indexOf(r[1]) === -1) return -1;
  let e = 0;
  for (let u = 0; u < l.length; u++)
    if (l[u] === "\\") u++;
    else if (l[u] === r[0]) e++;
    else if (l[u] === r[1] && (e--, e < 0)) return u;
  return -1;
}
function ku(l, r, e, u) {
  const n = r.href,
    a = r.title ? C(r.title) : null,
    t = l[1].replace(/\\([\[\]])/g, "$1");
  if (l[0].charAt(0) !== "!") {
    u.state.inLink = !0;
    const s = {
      type: "link",
      raw: e,
      href: n,
      title: a,
      text: t,
      tokens: u.inlineTokens(t),
    };
    return (u.state.inLink = !1), s;
  }
  return {
    type: "image",
    raw: e,
    href: n,
    title: a,
    text: C(t),
  };
}
function Xu(l, r) {
  const e = l.match(/^(\s+)(?:```)/);
  if (e === null) return r;
  const u = e[1];
  return r
    .split(
      `
`
    )
    .map((n) => {
      const a = n.match(/^\s+/);
      if (a === null) return n;
      const [t] = a;
      return t.length >= u.length ? n.slice(u.length) : n;
    }).join(`
`);
}
class eu {
  options;
  rules;
  lexer;
  constructor(r) {
    this.options = r || T;
  }
  space(r) {
    const e = this.rules.block.newline.exec(r);
    if (e && e[0].length > 0)
      return {
        type: "space",
        raw: e[0],
      };
  }
  code(r) {
    const e = this.rules.block.code.exec(r);
    if (e) {
      const u = e[0].replace(/^ {1,4}/gm, "");
      return {
        type: "code",
        raw: e[0],
        codeBlockStyle: "indented",
        text: this.options.pedantic
          ? u
          : W(
              u,
              `
`
            ),
      };
    }
  }
  fences(r) {
    const e = this.rules.block.fences.exec(r);
    if (e) {
      const u = e[0],
        n = Xu(u, e[3] || "");
      return {
        type: "code",
        raw: u,
        lang: e[2]
          ? e[2].trim().replace(this.rules.inline.anyPunctuation, "$1")
          : e[2],
        text: n,
      };
    }
  }
  heading(r) {
    const e = this.rules.block.heading.exec(r);
    if (e) {
      let u = e[2].trim();
      if (/#$/.test(u)) {
        const n = W(u, "#");
        (this.options.pedantic || !n || / $/.test(n)) && (u = n.trim());
      }
      return {
        type: "heading",
        raw: e[0],
        depth: e[1].length,
        text: u,
        tokens: this.lexer.inline(u),
      };
    }
  }
  hr(r) {
    const e = this.rules.block.hr.exec(r);
    if (e)
      return {
        type: "hr",
        raw: e[0],
      };
  }
  blockquote(r) {
    const e = this.rules.block.blockquote.exec(r);
    if (e) {
      let u = e[0].replace(
        /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
        `
    $1`
      );
      u = W(
        u.replace(/^ *>[ \t]?/gm, ""),
        `
`
      );
      const n = this.lexer.state.top;
      this.lexer.state.top = !0;
      const a = this.lexer.blockTokens(u);
      return (
        (this.lexer.state.top = n),
        {
          type: "blockquote",
          raw: e[0],
          tokens: a,
          text: u,
        }
      );
    }
  }
  list(r) {
    let e = this.rules.block.list.exec(r);
    if (e) {
      let u = e[1].trim();
      const n = u.length > 1,
        a = {
          type: "list",
          raw: "",
          ordered: n,
          start: n ? +u.slice(0, -1) : "",
          loose: !1,
          items: [],
        };
      (u = n ? `\\d{1,9}\\${u.slice(-1)}` : `\\${u}`),
        this.options.pedantic && (u = n ? u : "[*+-]");
      const t = new RegExp(`^( {0,3}${u})((?:[	 ][^\\n]*)?(?:\\n|$))`);
      let s = "",
        o = "",
        D = !1;
      for (; r; ) {
        let i = !1;
        if (!(e = t.exec(r)) || this.rules.block.hr.test(r)) break;
        (s = e[0]), (r = r.substring(s.length));
        let h = e[2]
            .split(
              `
`,
              1
            )[0]
            .replace(/^\t+/, (S) => " ".repeat(3 * S.length)),
          p = r.split(
            `
`,
            1
          )[0],
          g = 0;
        this.options.pedantic
          ? ((g = 2), (o = h.trimStart()))
          : ((g = e[2].search(/[^ ]/)),
            (g = g > 4 ? 1 : g),
            (o = h.slice(g)),
            (g += e[1].length));
        let B = !1;
        if (
          (!h &&
            /^ *$/.test(p) &&
            ((s +=
              p +
              `
`),
            (r = r.substring(p.length + 1)),
            (i = !0)),
          !i)
        ) {
          const S = new RegExp(
              `^ {0,${Math.min(
                3,
                g - 1
              )}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`
            ),
            R = new RegExp(
              `^ {0,${Math.min(
                3,
                g - 1
              )}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`
            ),
            P = new RegExp(`^ {0,${Math.min(3, g - 1)}}(?:\`\`\`|~~~)`),
            N = new RegExp(`^ {0,${Math.min(3, g - 1)}}#`);
          for (; r; ) {
            const U = r.split(
              `
`,
              1
            )[0];
            if (
              ((p = U),
              this.options.pedantic &&
                (p = p.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ")),
              P.test(p) || N.test(p) || S.test(p) || R.test(r))
            )
              break;
            if (p.search(/[^ ]/) >= g || !p.trim())
              o +=
                `
` + p.slice(g);
            else {
              if (
                B ||
                h.search(/[^ ]/) >= 4 ||
                P.test(h) ||
                N.test(h) ||
                R.test(h)
              )
                break;
              o +=
                `
` + p;
            }
            !B && !p.trim() && (B = !0),
              (s +=
                U +
                `
`),
              (r = r.substring(U.length + 1)),
              (h = p.slice(g));
          }
        }
        a.loose || (D ? (a.loose = !0) : /\n *\n *$/.test(s) && (D = !0));
        let x = null,
          y;
        this.options.gfm &&
          ((x = /^\[[ xX]\] /.exec(o)),
          x && ((y = x[0] !== "[ ] "), (o = o.replace(/^\[[ xX]\] +/, "")))),
          a.items.push({
            type: "list_item",
            raw: s,
            task: !!x,
            checked: y,
            loose: !1,
            text: o,
            tokens: [],
          }),
          (a.raw += s);
      }
      (a.items[a.items.length - 1].raw = s.trimEnd()),
        (a.items[a.items.length - 1].text = o.trimEnd()),
        (a.raw = a.raw.trimEnd());
      for (let i = 0; i < a.items.length; i++)
        if (
          ((this.lexer.state.top = !1),
          (a.items[i].tokens = this.lexer.blockTokens(a.items[i].text, [])),
          !a.loose)
        ) {
          const h = a.items[i].tokens.filter((g) => g.type === "space"),
            p = h.length > 0 && h.some((g) => /\n.*\n/.test(g.raw));
          a.loose = p;
        }
      if (a.loose)
        for (let i = 0; i < a.items.length; i++) a.items[i].loose = !0;
      return a;
    }
  }
  html(r) {
    const e = this.rules.block.html.exec(r);
    if (e)
      return {
        type: "html",
        block: !0,
        raw: e[0],
        pre: e[1] === "pre" || e[1] === "script" || e[1] === "style",
        text: e[0],
      };
  }
  def(r) {
    const e = this.rules.block.def.exec(r);
    if (e) {
      const u = e[1].toLowerCase().replace(/\s+/g, " "),
        n = e[2]
          ? e[2]
              .replace(/^<(.*)>$/, "$1")
              .replace(this.rules.inline.anyPunctuation, "$1")
          : "",
        a = e[3]
          ? e[3]
              .substring(1, e[3].length - 1)
              .replace(this.rules.inline.anyPunctuation, "$1")
          : e[3];
      return {
        type: "def",
        tag: u,
        raw: e[0],
        href: n,
        title: a,
      };
    }
  }
  table(r) {
    const e = this.rules.block.table.exec(r);
    if (!e || !/[:|]/.test(e[2])) return;
    const u = wu(e[1]),
      n = e[2].replace(/^\||\| *$/g, "").split("|"),
      a =
        e[3] && e[3].trim()
          ? e[3].replace(/\n[ \t]*$/, "").split(`
`)
          : [],
      t = {
        type: "table",
        raw: e[0],
        header: [],
        align: [],
        rows: [],
      };
    if (u.length === n.length) {
      for (const s of n)
        /^ *-+: *$/.test(s)
          ? t.align.push("right")
          : /^ *:-+: *$/.test(s)
          ? t.align.push("center")
          : /^ *:-+ *$/.test(s)
          ? t.align.push("left")
          : t.align.push(null);
      for (const s of u)
        t.header.push({
          text: s,
          tokens: this.lexer.inline(s),
        });
      for (const s of a)
        t.rows.push(
          wu(s, t.header.length).map((o) => ({
            text: o,
            tokens: this.lexer.inline(o),
          }))
        );
      return t;
    }
  }
  lheading(r) {
    const e = this.rules.block.lheading.exec(r);
    if (e)
      return {
        type: "heading",
        raw: e[0],
        depth: e[2].charAt(0) === "=" ? 1 : 2,
        text: e[1],
        tokens: this.lexer.inline(e[1]),
      };
  }
  paragraph(r) {
    const e = this.rules.block.paragraph.exec(r);
    if (e) {
      const u =
        e[1].charAt(e[1].length - 1) ===
        `
`
          ? e[1].slice(0, -1)
          : e[1];
      return {
        type: "paragraph",
        raw: e[0],
        text: u,
        tokens: this.lexer.inline(u),
      };
    }
  }
  text(r) {
    const e = this.rules.block.text.exec(r);
    if (e)
      return {
        type: "text",
        raw: e[0],
        text: e[0],
        tokens: this.lexer.inline(e[0]),
      };
  }
  escape(r) {
    const e = this.rules.inline.escape.exec(r);
    if (e)
      return {
        type: "escape",
        raw: e[0],
        text: C(e[1]),
      };
  }
  tag(r) {
    const e = this.rules.inline.tag.exec(r);
    if (e)
      return (
        !this.lexer.state.inLink && /^<a /i.test(e[0])
          ? (this.lexer.state.inLink = !0)
          : this.lexer.state.inLink &&
            /^<\/a>/i.test(e[0]) &&
            (this.lexer.state.inLink = !1),
        !this.lexer.state.inRawBlock &&
        /^<(pre|code|kbd|script)(\s|>)/i.test(e[0])
          ? (this.lexer.state.inRawBlock = !0)
          : this.lexer.state.inRawBlock &&
            /^<\/(pre|code|kbd|script)(\s|>)/i.test(e[0]) &&
            (this.lexer.state.inRawBlock = !1),
        {
          type: "html",
          raw: e[0],
          inLink: this.lexer.state.inLink,
          inRawBlock: this.lexer.state.inRawBlock,
          block: !1,
          text: e[0],
        }
      );
  }
  link(r) {
    const e = this.rules.inline.link.exec(r);
    if (e) {
      const u = e[2].trim();
      if (!this.options.pedantic && /^</.test(u)) {
        if (!/>$/.test(u)) return;
        const t = W(u.slice(0, -1), "\\");
        if ((u.length - t.length) % 2 === 0) return;
      } else {
        const t = Wu(e[2], "()");
        if (t > -1) {
          const o = (e[0].indexOf("!") === 0 ? 5 : 4) + e[1].length + t;
          (e[2] = e[2].substring(0, t)),
            (e[0] = e[0].substring(0, o).trim()),
            (e[3] = "");
        }
      }
      let n = e[2],
        a = "";
      if (this.options.pedantic) {
        const t = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(n);
        t && ((n = t[1]), (a = t[3]));
      } else a = e[3] ? e[3].slice(1, -1) : "";
      return (
        (n = n.trim()),
        /^</.test(n) &&
          (this.options.pedantic && !/>$/.test(u)
            ? (n = n.slice(1))
            : (n = n.slice(1, -1))),
        ku(
          e,
          {
            href: n && n.replace(this.rules.inline.anyPunctuation, "$1"),
            title: a && a.replace(this.rules.inline.anyPunctuation, "$1"),
          },
          e[0],
          this.lexer
        )
      );
    }
  }
  reflink(r, e) {
    let u;
    if (
      (u = this.rules.inline.reflink.exec(r)) ||
      (u = this.rules.inline.nolink.exec(r))
    ) {
      const n = (u[2] || u[1]).replace(/\s+/g, " "),
        a = e[n.toLowerCase()];
      if (!a) {
        const t = u[0].charAt(0);
        return {
          type: "text",
          raw: t,
          text: t,
        };
      }
      return ku(u, a, u[0], this.lexer);
    }
  }
  emStrong(r, e, u = "") {
    let n = this.rules.inline.emStrongLDelim.exec(r);
    if (!n || (n[3] && u.match(/[\p{L}\p{N}]/u))) return;
    if (!(n[1] || n[2] || "") || !u || this.rules.inline.punctuation.exec(u)) {
      const t = [...n[0]].length - 1;
      let s,
        o,
        D = t,
        i = 0;
      const h =
        n[0][0] === "*"
          ? this.rules.inline.emStrongRDelimAst
          : this.rules.inline.emStrongRDelimUnd;
      for (
        h.lastIndex = 0, e = e.slice(-1 * r.length + t);
        (n = h.exec(e)) != null;

      ) {
        if (((s = n[1] || n[2] || n[3] || n[4] || n[5] || n[6]), !s)) continue;
        if (((o = [...s].length), n[3] || n[4])) {
          D += o;
          continue;
        } else if ((n[5] || n[6]) && t % 3 && !((t + o) % 3)) {
          i += o;
          continue;
        }
        if (((D -= o), D > 0)) continue;
        o = Math.min(o, o + D + i);
        const p = [...n[0]][0].length,
          g = r.slice(0, t + n.index + p + o);
        if (Math.min(t, o) % 2) {
          const x = g.slice(1, -1);
          return {
            type: "em",
            raw: g,
            text: x,
            tokens: this.lexer.inlineTokens(x),
          };
        }
        const B = g.slice(2, -2);
        return {
          type: "strong",
          raw: g,
          text: B,
          tokens: this.lexer.inlineTokens(B),
        };
      }
    }
  }
  codespan(r) {
    const e = this.rules.inline.code.exec(r);
    if (e) {
      let u = e[2].replace(/\n/g, " ");
      const n = /[^ ]/.test(u),
        a = /^ /.test(u) && / $/.test(u);
      return (
        n && a && (u = u.substring(1, u.length - 1)),
        (u = C(u, !0)),
        {
          type: "codespan",
          raw: e[0],
          text: u,
        }
      );
    }
  }
  br(r) {
    const e = this.rules.inline.br.exec(r);
    if (e)
      return {
        type: "br",
        raw: e[0],
      };
  }
  del(r) {
    const e = this.rules.inline.del.exec(r);
    if (e)
      return {
        type: "del",
        raw: e[0],
        text: e[2],
        tokens: this.lexer.inlineTokens(e[2]),
      };
  }
  autolink(r) {
    const e = this.rules.inline.autolink.exec(r);
    if (e) {
      let u, n;
      return (
        e[2] === "@"
          ? ((u = C(e[1])), (n = "mailto:" + u))
          : ((u = C(e[1])), (n = u)),
        {
          type: "link",
          raw: e[0],
          text: u,
          href: n,
          tokens: [
            {
              type: "text",
              raw: u,
              text: u,
            },
          ],
        }
      );
    }
  }
  url(r) {
    let e;
    if ((e = this.rules.inline.url.exec(r))) {
      let u, n;
      if (e[2] === "@") (u = C(e[0])), (n = "mailto:" + u);
      else {
        let a;
        do
          (a = e[0]),
            (e[0] = this.rules.inline._backpedal.exec(e[0])?.[0] ?? "");
        while (a !== e[0]);
        (u = C(e[0])), e[1] === "www." ? (n = "http://" + e[0]) : (n = e[0]);
      }
      return {
        type: "link",
        raw: e[0],
        text: u,
        href: n,
        tokens: [
          {
            type: "text",
            raw: u,
            text: u,
          },
        ],
      };
    }
  }
  inlineText(r) {
    const e = this.rules.inline.text.exec(r);
    if (e) {
      let u;
      return (
        this.lexer.state.inRawBlock ? (u = e[0]) : (u = C(e[0])),
        {
          type: "text",
          raw: e[0],
          text: u,
        }
      );
    }
  }
}
const ue = /^(?: *(?:\n|$))+/,
  ee = /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
  re =
    /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
  $ = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
  te = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
  Lu = /(?:[*+-]|\d{1,9}[.)])/,
  Su = A(
    /^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/
  )
    .replace(/bull/g, Lu)
    .replace(/blockCode/g, / {4}/)
    .replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/)
    .replace(/blockquote/g, / {0,3}>/)
    .replace(/heading/g, / {0,3}#{1,6}/)
    .replace(/html/g, / {0,3}<[^\n>]+>\n/)
    .getRegex(),
  cu =
    /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
  ae = /^[^\n]+/,
  pu = /(?!\s*\])(?:\\.|[^\[\]\\])+/,
  ne = A(
    /^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/
  )
    .replace("label", pu)
    .replace(
      "title",
      /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/
    )
    .getRegex(),
  se = A(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/)
    .replace(/bull/g, Lu)
    .getRegex(),
  au =
    "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",
  Du = /<!--(?:-?>|[\s\S]*?(?:-->|$))/,
  oe = A(
    "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
    "i"
  )
    .replace("comment", Du)
    .replace("tag", au)
    .replace(
      "attribute",
      / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/
    )
    .getRegex(),
  Ru = A(cu)
    .replace("hr", $)
    .replace("heading", " {0,3}#{1,6}(?:\\s|$)")
    .replace("|lheading", "")
    .replace("|table", "")
    .replace("blockquote", " {0,3}>")
    .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
    .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
    .replace(
      "html",
      "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)"
    )
    .replace("tag", au)
    .getRegex(),
  ie = A(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/)
    .replace("paragraph", Ru)
    .getRegex(),
  hu = {
    blockquote: ie,
    code: ee,
    def: ne,
    fences: re,
    heading: te,
    hr: $,
    html: oe,
    lheading: Su,
    list: se,
    newline: ue,
    paragraph: Ru,
    table: G,
    text: ae,
  },
  Fu = A(
    "^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
  )
    .replace("hr", $)
    .replace("heading", " {0,3}#{1,6}(?:\\s|$)")
    .replace("blockquote", " {0,3}>")
    .replace("code", " {4}[^\\n]")
    .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
    .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
    .replace(
      "html",
      "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)"
    )
    .replace("tag", au)
    .getRegex(),
  le = {
    ...hu,
    table: Fu,
    paragraph: A(cu)
      .replace("hr", $)
      .replace("heading", " {0,3}#{1,6}(?:\\s|$)")
      .replace("|lheading", "")
      .replace("table", Fu)
      .replace("blockquote", " {0,3}>")
      .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
      .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
      .replace(
        "html",
        "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)"
      )
      .replace("tag", au)
      .getRegex(),
  },
  ce = {
    ...hu,
    html: A(
      `^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`
    )
      .replace("comment", Du)
      .replace(
        /tag/g,
        "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b"
      )
      .getRegex(),
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
    heading: /^(#{1,6})(.*)(?:\n+|$)/,
    fences: G,
    lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
    paragraph: A(cu)
      .replace("hr", $)
      .replace(
        "heading",
        ` *#{1,6} *[^
]`
      )
      .replace("lheading", Su)
      .replace("|table", "")
      .replace("blockquote", " {0,3}>")
      .replace("|fences", "")
      .replace("|list", "")
      .replace("|html", "")
      .replace("|tag", "")
      .getRegex(),
  },
  Nu = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
  pe = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
  Uu = /^( {2,}|\\)\n(?!\s*$)/,
  De =
    /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
  O = "\\p{P}\\p{S}",
  he = A(/^((?![*_])[\spunctuation])/, "u")
    .replace(/punctuation/g, O)
    .getRegex(),
  ge = /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g,
  de = A(
    /^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,
    "u"
  )
    .replace(/punct/g, O)
    .getRegex(),
  Ae = A(
    "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])",
    "gu"
  )
    .replace(/punct/g, O)
    .getRegex(),
  fe = A(
    "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])",
    "gu"
  )
    .replace(/punct/g, O)
    .getRegex(),
  me = A(/\\([punct])/, "gu")
    .replace(/punct/g, O)
    .getRegex(),
  be = A(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/)
    .replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/)
    .replace(
      "email",
      /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/
    )
    .getRegex(),
  xe = A(Du).replace("(?:-->|$)", "-->").getRegex(),
  Ce = A(
    "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>"
  )
    .replace("comment", xe)
    .replace(
      "attribute",
      /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/
    )
    .getRegex(),
  ru = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,
  Ee = A(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/)
    .replace("label", ru)
    .replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/)
    .replace(
      "title",
      /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/
    )
    .getRegex(),
  Vu = A(/^!?\[(label)\]\[(ref)\]/)
    .replace("label", ru)
    .replace("ref", pu)
    .getRegex(),
  zu = A(/^!?\[(ref)\](?:\[\])?/)
    .replace("ref", pu)
    .getRegex(),
  Be = A("reflink|nolink(?!\\()", "g")
    .replace("reflink", Vu)
    .replace("nolink", zu)
    .getRegex(),
  gu = {
    _backpedal: G,
    anyPunctuation: me,
    autolink: be,
    blockSkip: ge,
    br: Uu,
    code: pe,
    del: G,
    emStrongLDelim: de,
    emStrongRDelimAst: Ae,
    emStrongRDelimUnd: fe,
    escape: Nu,
    link: Ee,
    nolink: zu,
    punctuation: he,
    reflink: Vu,
    reflinkSearch: Be,
    tag: Ce,
    text: De,
    url: G,
  },
  we = {
    ...gu,
    link: A(/^!?\[(label)\]\((.*?)\)/)
      .replace("label", ru)
      .getRegex(),
    reflink: A(/^!?\[(label)\]\s*\[([^\]]*)\]/)
      .replace("label", ru)
      .getRegex(),
  },
  iu = {
    ...gu,
    escape: A(Nu).replace("])", "~|])").getRegex(),
    url: A(
      /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
      "i"
    )
      .replace(
        "email",
        /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/
      )
      .getRegex(),
    _backpedal:
      /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
    del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
    text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/,
  },
  ke = {
    ...iu,
    br: A(Uu).replace("{2,}", "*").getRegex(),
    text: A(iu.text)
      .replace("\\b_", "\\b_| {2,}\\n")
      .replace(/\{2,\}/g, "*")
      .getRegex(),
  },
  X = {
    normal: hu,
    gfm: le,
    pedantic: ce,
  },
  I = {
    normal: gu,
    gfm: iu,
    breaks: ke,
    pedantic: we,
  };
class k {
  tokens;
  options;
  state;
  tokenizer;
  inlineQueue;
  constructor(r) {
    (this.tokens = []),
      (this.tokens.links = Object.create(null)),
      (this.options = r || T),
      (this.options.tokenizer = this.options.tokenizer || new eu()),
      (this.tokenizer = this.options.tokenizer),
      (this.tokenizer.options = this.options),
      (this.tokenizer.lexer = this),
      (this.inlineQueue = []),
      (this.state = {
        inLink: !1,
        inRawBlock: !1,
        top: !0,
      });
    const e = {
      block: X.normal,
      inline: I.normal,
    };
    this.options.pedantic
      ? ((e.block = X.pedantic), (e.inline = I.pedantic))
      : this.options.gfm &&
        ((e.block = X.gfm),
        this.options.breaks ? (e.inline = I.breaks) : (e.inline = I.gfm)),
      (this.tokenizer.rules = e);
  }
  static get rules() {
    return {
      block: X,
      inline: I,
    };
  }
  static lex(r, e) {
    return new k(e).lex(r);
  }
  static lexInline(r, e) {
    return new k(e).inlineTokens(r);
  }
  lex(r) {
    (r = r.replace(
      /\r\n|\r/g,
      `
`
    )),
      this.blockTokens(r, this.tokens);
    for (let e = 0; e < this.inlineQueue.length; e++) {
      const u = this.inlineQueue[e];
      this.inlineTokens(u.src, u.tokens);
    }
    return (this.inlineQueue = []), this.tokens;
  }
  blockTokens(r, e = []) {
    this.options.pedantic
      ? (r = r.replace(/\t/g, "    ").replace(/^ +$/gm, ""))
      : (r = r.replace(
          /^( *)(\t+)/gm,
          (s, o, D) => o + "    ".repeat(D.length)
        ));
    let u, n, a, t;
    for (; r; )
      if (
        !(
          this.options.extensions &&
          this.options.extensions.block &&
          this.options.extensions.block.some((s) =>
            (u = s.call(
              {
                lexer: this,
              },
              r,
              e
            ))
              ? ((r = r.substring(u.raw.length)), e.push(u), !0)
              : !1
          )
        )
      ) {
        if ((u = this.tokenizer.space(r))) {
          (r = r.substring(u.raw.length)),
            u.raw.length === 1 && e.length > 0
              ? (e[e.length - 1].raw += `
`)
              : e.push(u);
          continue;
        }
        if ((u = this.tokenizer.code(r))) {
          (r = r.substring(u.raw.length)),
            (n = e[e.length - 1]),
            n && (n.type === "paragraph" || n.type === "text")
              ? ((n.raw +=
                  `
` + u.raw),
                (n.text +=
                  `
` + u.text),
                (this.inlineQueue[this.inlineQueue.length - 1].src = n.text))
              : e.push(u);
          continue;
        }
        if ((u = this.tokenizer.fences(r))) {
          (r = r.substring(u.raw.length)), e.push(u);
          continue;
        }
        if ((u = this.tokenizer.heading(r))) {
          (r = r.substring(u.raw.length)), e.push(u);
          continue;
        }
        if ((u = this.tokenizer.hr(r))) {
          (r = r.substring(u.raw.length)), e.push(u);
          continue;
        }
        if ((u = this.tokenizer.blockquote(r))) {
          (r = r.substring(u.raw.length)), e.push(u);
          continue;
        }
        if ((u = this.tokenizer.list(r))) {
          (r = r.substring(u.raw.length)), e.push(u);
          continue;
        }
        if ((u = this.tokenizer.html(r))) {
          (r = r.substring(u.raw.length)), e.push(u);
          continue;
        }
        if ((u = this.tokenizer.def(r))) {
          (r = r.substring(u.raw.length)),
            (n = e[e.length - 1]),
            n && (n.type === "paragraph" || n.type === "text")
              ? ((n.raw +=
                  `
` + u.raw),
                (n.text +=
                  `
` + u.raw),
                (this.inlineQueue[this.inlineQueue.length - 1].src = n.text))
              : this.tokens.links[u.tag] ||
                (this.tokens.links[u.tag] = {
                  href: u.href,
                  title: u.title,
                });
          continue;
        }
        if ((u = this.tokenizer.table(r))) {
          (r = r.substring(u.raw.length)), e.push(u);
          continue;
        }
        if ((u = this.tokenizer.lheading(r))) {
          (r = r.substring(u.raw.length)), e.push(u);
          continue;
        }
        if (
          ((a = r),
          this.options.extensions && this.options.extensions.startBlock)
        ) {
          let s = 1 / 0;
          const o = r.slice(1);
          let D;
          this.options.extensions.startBlock.forEach((i) => {
            (D = i.call(
              {
                lexer: this,
              },
              o
            )),
              typeof D == "number" && D >= 0 && (s = Math.min(s, D));
          }),
            s < 1 / 0 && s >= 0 && (a = r.substring(0, s + 1));
        }
        if (this.state.top && (u = this.tokenizer.paragraph(a))) {
          (n = e[e.length - 1]),
            t && n.type === "paragraph"
              ? ((n.raw +=
                  `
` + u.raw),
                (n.text +=
                  `
` + u.text),
                this.inlineQueue.pop(),
                (this.inlineQueue[this.inlineQueue.length - 1].src = n.text))
              : e.push(u),
            (t = a.length !== r.length),
            (r = r.substring(u.raw.length));
          continue;
        }
        if ((u = this.tokenizer.text(r))) {
          (r = r.substring(u.raw.length)),
            (n = e[e.length - 1]),
            n && n.type === "text"
              ? ((n.raw +=
                  `
` + u.raw),
                (n.text +=
                  `
` + u.text),
                this.inlineQueue.pop(),
                (this.inlineQueue[this.inlineQueue.length - 1].src = n.text))
              : e.push(u);
          continue;
        }
        if (r) {
          const s = "Infinite loop on byte: " + r.charCodeAt(0);
          if (this.options.silent) {
            console.error(s);
            break;
          } else throw new Error(s);
        }
      }
    return (this.state.top = !0), e;
  }
  inline(r, e = []) {
    return (
      this.inlineQueue.push({
        src: r,
        tokens: e,
      }),
      e
    );
  }
  inlineTokens(r, e = []) {
    let u,
      n,
      a,
      t = r,
      s,
      o,
      D;
    if (this.tokens.links) {
      const i = Object.keys(this.tokens.links);
      if (i.length > 0)
        for (
          ;
          (s = this.tokenizer.rules.inline.reflinkSearch.exec(t)) != null;

        )
          i.includes(s[0].slice(s[0].lastIndexOf("[") + 1, -1)) &&
            (t =
              t.slice(0, s.index) +
              "[" +
              "a".repeat(s[0].length - 2) +
              "]" +
              t.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (s = this.tokenizer.rules.inline.blockSkip.exec(t)) != null; )
      t =
        t.slice(0, s.index) +
        "[" +
        "a".repeat(s[0].length - 2) +
        "]" +
        t.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    for (; (s = this.tokenizer.rules.inline.anyPunctuation.exec(t)) != null; )
      t =
        t.slice(0, s.index) +
        "++" +
        t.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    for (; r; )
      if (
        (o || (D = ""),
        (o = !1),
        !(
          this.options.extensions &&
          this.options.extensions.inline &&
          this.options.extensions.inline.some((i) =>
            (u = i.call(
              {
                lexer: this,
              },
              r,
              e
            ))
              ? ((r = r.substring(u.raw.length)), e.push(u), !0)
              : !1
          )
        ))
      ) {
        if ((u = this.tokenizer.escape(r))) {
          (r = r.substring(u.raw.length)), e.push(u);
          continue;
        }
        if ((u = this.tokenizer.tag(r))) {
          (r = r.substring(u.raw.length)),
            (n = e[e.length - 1]),
            n && u.type === "text" && n.type === "text"
              ? ((n.raw += u.raw), (n.text += u.text))
              : e.push(u);
          continue;
        }
        if ((u = this.tokenizer.link(r))) {
          (r = r.substring(u.raw.length)), e.push(u);
          continue;
        }
        if ((u = this.tokenizer.reflink(r, this.tokens.links))) {
          (r = r.substring(u.raw.length)),
            (n = e[e.length - 1]),
            n && u.type === "text" && n.type === "text"
              ? ((n.raw += u.raw), (n.text += u.text))
              : e.push(u);
          continue;
        }
        if ((u = this.tokenizer.emStrong(r, t, D))) {
          (r = r.substring(u.raw.length)), e.push(u);
          continue;
        }
        if ((u = this.tokenizer.codespan(r))) {
          (r = r.substring(u.raw.length)), e.push(u);
          continue;
        }
        if ((u = this.tokenizer.br(r))) {
          (r = r.substring(u.raw.length)), e.push(u);
          continue;
        }
        if ((u = this.tokenizer.del(r))) {
          (r = r.substring(u.raw.length)), e.push(u);
          continue;
        }
        if ((u = this.tokenizer.autolink(r))) {
          (r = r.substring(u.raw.length)), e.push(u);
          continue;
        }
        if (!this.state.inLink && (u = this.tokenizer.url(r))) {
          (r = r.substring(u.raw.length)), e.push(u);
          continue;
        }
        if (
          ((a = r),
          this.options.extensions && this.options.extensions.startInline)
        ) {
          let i = 1 / 0;
          const h = r.slice(1);
          let p;
          this.options.extensions.startInline.forEach((g) => {
            (p = g.call(
              {
                lexer: this,
              },
              h
            )),
              typeof p == "number" && p >= 0 && (i = Math.min(i, p));
          }),
            i < 1 / 0 && i >= 0 && (a = r.substring(0, i + 1));
        }
        if ((u = this.tokenizer.inlineText(a))) {
          (r = r.substring(u.raw.length)),
            u.raw.slice(-1) !== "_" && (D = u.raw.slice(-1)),
            (o = !0),
            (n = e[e.length - 1]),
            n && n.type === "text"
              ? ((n.raw += u.raw), (n.text += u.text))
              : e.push(u);
          continue;
        }
        if (r) {
          const i = "Infinite loop on byte: " + r.charCodeAt(0);
          if (this.options.silent) {
            console.error(i);
            break;
          } else throw new Error(i);
        }
      }
    return e;
  }
}
class tu {
  options;
  constructor(r) {
    this.options = r || T;
  }
  code(r, e, u) {
    const n = (e || "").match(/^\S*/)?.[0];
    return (
      (r =
        r.replace(/\n$/, "") +
        `
`),
      n
        ? '<pre><code class="language-' +
          C(n) +
          '">' +
          (u ? r : C(r, !0)) +
          `</code></pre>
`
        : "<pre><code>" +
          (u ? r : C(r, !0)) +
          `</code></pre>
`
    );
  }
  blockquote(r) {
    return `<blockquote>
${r}</blockquote>
`;
  }
  html(r, e) {
    return r;
  }
  heading(r, e, u) {
    return `<h${e}>${r}</h${e}>
`;
  }
  hr() {
    return `<hr>
`;
  }
  list(r, e, u) {
    const n = e ? "ol" : "ul",
      a = e && u !== 1 ? ' start="' + u + '"' : "";
    return (
      "<" +
      n +
      a +
      `>
` +
      r +
      "</" +
      n +
      `>
`
    );
  }
  listitem(r, e, u) {
    return `<li>${r}</li>
`;
  }
  checkbox(r) {
    return (
      "<input " + (r ? 'checked="" ' : "") + 'disabled="" type="checkbox">'
    );
  }
  paragraph(r) {
    return `<p>${r}</p>
`;
  }
  table(r, e) {
    return (
      e && (e = `<tbody>${e}</tbody>`),
      `<table>
<thead>
` +
        r +
        `</thead>
` +
        e +
        `</table>
`
    );
  }
  tablerow(r) {
    return `<tr>
${r}</tr>
`;
  }
  tablecell(r, e) {
    const u = e.header ? "th" : "td";
    return (
      (e.align ? `<${u} align="${e.align}">` : `<${u}>`) +
      r +
      `</${u}>
`
    );
  }
  strong(r) {
    return `<strong>${r}</strong>`;
  }
  em(r) {
    return `<em>${r}</em>`;
  }
  codespan(r) {
    return `<code>${r}</code>`;
  }
  br() {
    return "<br>";
  }
  del(r) {
    return `<del>${r}</del>`;
  }
  link(r, e, u) {
    const n = Bu(r);
    if (n === null) return u;
    r = n;
    let a = '<a href="' + r + '"';
    return e && (a += ' title="' + e + '"'), (a += ">" + u + "</a>"), a;
  }
  image(r, e, u) {
    const n = Bu(r);
    if (n === null) return u;
    r = n;
    let a = `<img src="${r}" alt="${u}"`;
    return e && (a += ` title="${e}"`), (a += ">"), a;
  }
  text(r) {
    return r;
  }
}
class du {
  strong(r) {
    return r;
  }
  em(r) {
    return r;
  }
  codespan(r) {
    return r;
  }
  del(r) {
    return r;
  }
  html(r) {
    return r;
  }
  text(r) {
    return r;
  }
  link(r, e, u) {
    return "" + u;
  }
  image(r, e, u) {
    return "" + u;
  }
  br() {
    return "";
  }
}
class F {
  options;
  renderer;
  textRenderer;
  constructor(r) {
    (this.options = r || T),
      (this.options.renderer = this.options.renderer || new tu()),
      (this.renderer = this.options.renderer),
      (this.renderer.options = this.options),
      (this.textRenderer = new du());
  }
  static parse(r, e) {
    return new F(e).parse(r);
  }
  static parseInline(r, e) {
    return new F(e).parseInline(r);
  }
  parse(r, e = !0) {
    let u = "";
    for (let n = 0; n < r.length; n++) {
      const a = r[n];
      if (
        this.options.extensions &&
        this.options.extensions.renderers &&
        this.options.extensions.renderers[a.type]
      ) {
        const t = a,
          s = this.options.extensions.renderers[t.type].call(
            {
              parser: this,
            },
            t
          );
        if (
          s !== !1 ||
          ![
            "space",
            "hr",
            "heading",
            "code",
            "table",
            "blockquote",
            "list",
            "html",
            "paragraph",
            "text",
          ].includes(t.type)
        ) {
          u += s || "";
          continue;
        }
      }
      switch (a.type) {
        case "space":
          continue;
        case "hr": {
          u += this.renderer.hr();
          continue;
        }
        case "heading": {
          const t = a;
          u += this.renderer.heading(
            this.parseInline(t.tokens),
            t.depth,
            Yu(this.parseInline(t.tokens, this.textRenderer))
          );
          continue;
        }
        case "code": {
          const t = a;
          u += this.renderer.code(t.text, t.lang, !!t.escaped);
          continue;
        }
        case "table": {
          const t = a;
          let s = "",
            o = "";
          for (let i = 0; i < t.header.length; i++)
            o += this.renderer.tablecell(this.parseInline(t.header[i].tokens), {
              header: !0,
              align: t.align[i],
            });
          s += this.renderer.tablerow(o);
          let D = "";
          for (let i = 0; i < t.rows.length; i++) {
            const h = t.rows[i];
            o = "";
            for (let p = 0; p < h.length; p++)
              o += this.renderer.tablecell(this.parseInline(h[p].tokens), {
                header: !1,
                align: t.align[p],
              });
            D += this.renderer.tablerow(o);
          }
          u += this.renderer.table(s, D);
          continue;
        }
        case "blockquote": {
          const t = a,
            s = this.parse(t.tokens);
          u += this.renderer.blockquote(s);
          continue;
        }
        case "list": {
          const t = a,
            s = t.ordered,
            o = t.start,
            D = t.loose;
          let i = "";
          for (let h = 0; h < t.items.length; h++) {
            const p = t.items[h],
              g = p.checked,
              B = p.task;
            let x = "";
            if (p.task) {
              const y = this.renderer.checkbox(!!g);
              D
                ? p.tokens.length > 0 && p.tokens[0].type === "paragraph"
                  ? ((p.tokens[0].text = y + " " + p.tokens[0].text),
                    p.tokens[0].tokens &&
                      p.tokens[0].tokens.length > 0 &&
                      p.tokens[0].tokens[0].type === "text" &&
                      (p.tokens[0].tokens[0].text =
                        y + " " + p.tokens[0].tokens[0].text))
                  : p.tokens.unshift({
                      type: "text",
                      text: y + " ",
                    })
                : (x += y + " ");
            }
            (x += this.parse(p.tokens, D)),
              (i += this.renderer.listitem(x, B, !!g));
          }
          u += this.renderer.list(i, s, o);
          continue;
        }
        case "html": {
          const t = a;
          u += this.renderer.html(t.text, t.block);
          continue;
        }
        case "paragraph": {
          const t = a;
          u += this.renderer.paragraph(this.parseInline(t.tokens));
          continue;
        }
        case "text": {
          let t = a,
            s = t.tokens ? this.parseInline(t.tokens) : t.text;
          for (; n + 1 < r.length && r[n + 1].type === "text"; )
            (t = r[++n]),
              (s +=
                `
` + (t.tokens ? this.parseInline(t.tokens) : t.text));
          u += e ? this.renderer.paragraph(s) : s;
          continue;
        }
        default: {
          const t = 'Token with "' + a.type + '" type was not found.';
          if (this.options.silent) return console.error(t), "";
          throw new Error(t);
        }
      }
    }
    return u;
  }
  parseInline(r, e) {
    e = e || this.renderer;
    let u = "";
    for (let n = 0; n < r.length; n++) {
      const a = r[n];
      if (
        this.options.extensions &&
        this.options.extensions.renderers &&
        this.options.extensions.renderers[a.type]
      ) {
        const t = this.options.extensions.renderers[a.type].call(
          {
            parser: this,
          },
          a
        );
        if (
          t !== !1 ||
          ![
            "escape",
            "html",
            "link",
            "image",
            "strong",
            "em",
            "codespan",
            "br",
            "del",
            "text",
          ].includes(a.type)
        ) {
          u += t || "";
          continue;
        }
      }
      switch (a.type) {
        case "escape": {
          const t = a;
          u += e.text(t.text);
          break;
        }
        case "html": {
          const t = a;
          u += e.html(t.text);
          break;
        }
        case "link": {
          const t = a;
          u += e.link(t.href, t.title, this.parseInline(t.tokens, e));
          break;
        }
        case "image": {
          const t = a;
          u += e.image(t.href, t.title, t.text);
          break;
        }
        case "strong": {
          const t = a;
          u += e.strong(this.parseInline(t.tokens, e));
          break;
        }
        case "em": {
          const t = a;
          u += e.em(this.parseInline(t.tokens, e));
          break;
        }
        case "codespan": {
          const t = a;
          u += e.codespan(t.text);
          break;
        }
        case "br": {
          u += e.br();
          break;
        }
        case "del": {
          const t = a;
          u += e.del(this.parseInline(t.tokens, e));
          break;
        }
        case "text": {
          const t = a;
          u += e.text(t.text);
          break;
        }
        default: {
          const t = 'Token with "' + a.type + '" type was not found.';
          if (this.options.silent) return console.error(t), "";
          throw new Error(t);
        }
      }
    }
    return u;
  }
}
class uu {
  options;
  constructor(r) {
    this.options = r || T;
  }
  static passThroughHooks = new Set([
    "preprocess",
    "postprocess",
    "processAllTokens",
  ]);
  preprocess(r) {
    return r;
  }
  postprocess(r) {
    return r;
  }
  processAllTokens(r) {
    return r;
  }
}
class Iu {
  defaults = lu();
  options = this.setOptions;
  parse = this.#u(k.lex, F.parse);
  parseInline = this.#u(k.lexInline, F.parseInline);
  Parser = F;
  Renderer = tu;
  TextRenderer = du;
  Lexer = k;
  Tokenizer = eu;
  Hooks = uu;
  constructor(...r) {
    this.use(...r);
  }
  walkTokens(r, e) {
    let u = [];
    for (const n of r)
      switch (((u = u.concat(e.call(this, n))), n.type)) {
        case "table": {
          const a = n;
          for (const t of a.header) u = u.concat(this.walkTokens(t.tokens, e));
          for (const t of a.rows)
            for (const s of t) u = u.concat(this.walkTokens(s.tokens, e));
          break;
        }
        case "list": {
          const a = n;
          u = u.concat(this.walkTokens(a.items, e));
          break;
        }
        default: {
          const a = n;
          this.defaults.extensions?.childTokens?.[a.type]
            ? this.defaults.extensions.childTokens[a.type].forEach((t) => {
                const s = a[t].flat(1 / 0);
                u = u.concat(this.walkTokens(s, e));
              })
            : a.tokens && (u = u.concat(this.walkTokens(a.tokens, e)));
        }
      }
    return u;
  }
  use(...r) {
    const e = this.defaults.extensions || {
      renderers: {},
      childTokens: {},
    };
    return (
      r.forEach((u) => {
        const n = {
          ...u,
        };
        if (
          ((n.async = this.defaults.async || n.async || !1),
          u.extensions &&
            (u.extensions.forEach((a) => {
              if (!a.name) throw new Error("extension name required");
              if ("renderer" in a) {
                const t = e.renderers[a.name];
                t
                  ? (e.renderers[a.name] = function (...s) {
                      let o = a.renderer.apply(this, s);
                      return o === !1 && (o = t.apply(this, s)), o;
                    })
                  : (e.renderers[a.name] = a.renderer);
              }
              if ("tokenizer" in a) {
                if (!a.level || (a.level !== "block" && a.level !== "inline"))
                  throw new Error(
                    "extension level must be 'block' or 'inline'"
                  );
                const t = e[a.level];
                t ? t.unshift(a.tokenizer) : (e[a.level] = [a.tokenizer]),
                  a.start &&
                    (a.level === "block"
                      ? e.startBlock
                        ? e.startBlock.push(a.start)
                        : (e.startBlock = [a.start])
                      : a.level === "inline" &&
                        (e.startInline
                          ? e.startInline.push(a.start)
                          : (e.startInline = [a.start])));
              }
              "childTokens" in a &&
                a.childTokens &&
                (e.childTokens[a.name] = a.childTokens);
            }),
            (n.extensions = e)),
          u.renderer)
        ) {
          const a = this.defaults.renderer || new tu(this.defaults);
          for (const t in u.renderer) {
            if (!(t in a)) throw new Error(`renderer '${t}' does not exist`);
            if (t === "options") continue;
            const s = t,
              o = u.renderer[s],
              D = a[s];
            a[s] = (...i) => {
              let h = o.apply(a, i);
              return h === !1 && (h = D.apply(a, i)), h || "";
            };
          }
          n.renderer = a;
        }
        if (u.tokenizer) {
          const a = this.defaults.tokenizer || new eu(this.defaults);
          for (const t in u.tokenizer) {
            if (!(t in a)) throw new Error(`tokenizer '${t}' does not exist`);
            if (["options", "rules", "lexer"].includes(t)) continue;
            const s = t,
              o = u.tokenizer[s],
              D = a[s];
            a[s] = (...i) => {
              let h = o.apply(a, i);
              return h === !1 && (h = D.apply(a, i)), h;
            };
          }
          n.tokenizer = a;
        }
        if (u.hooks) {
          const a = this.defaults.hooks || new uu();
          for (const t in u.hooks) {
            if (!(t in a)) throw new Error(`hook '${t}' does not exist`);
            if (t === "options") continue;
            const s = t,
              o = u.hooks[s],
              D = a[s];
            uu.passThroughHooks.has(t)
              ? (a[s] = (i) => {
                  if (this.defaults.async)
                    return Promise.resolve(o.call(a, i)).then((p) =>
                      D.call(a, p)
                    );
                  const h = o.call(a, i);
                  return D.call(a, h);
                })
              : (a[s] = (...i) => {
                  let h = o.apply(a, i);
                  return h === !1 && (h = D.apply(a, i)), h;
                });
          }
          n.hooks = a;
        }
        if (u.walkTokens) {
          const a = this.defaults.walkTokens,
            t = u.walkTokens;
          n.walkTokens = function (s) {
            let o = [];
            return (
              o.push(t.call(this, s)), a && (o = o.concat(a.call(this, s))), o
            );
          };
        }
        this.defaults = {
          ...this.defaults,
          ...n,
        };
      }),
      this
    );
  }
  setOptions(r) {
    return (
      (this.defaults = {
        ...this.defaults,
        ...r,
      }),
      this
    );
  }
  lexer(r, e) {
    return k.lex(r, e ?? this.defaults);
  }
  parser(r, e) {
    return F.parse(r, e ?? this.defaults);
  }
  #u(r, e) {
    return (u, n) => {
      const a = {
          ...n,
        },
        t = {
          ...this.defaults,
          ...a,
        };
      this.defaults.async === !0 &&
        a.async === !1 &&
        (t.silent ||
          console.warn(
            "marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."
          ),
        (t.async = !0));
      const s = this.#e(!!t.silent, !!t.async);
      if (typeof u > "u" || u === null)
        return s(new Error("marked(): input parameter is undefined or null"));
      if (typeof u != "string")
        return s(
          new Error(
            "marked(): input parameter is of type " +
              Object.prototype.toString.call(u) +
              ", string expected"
          )
        );
      if ((t.hooks && (t.hooks.options = t), t.async))
        return Promise.resolve(t.hooks ? t.hooks.preprocess(u) : u)
          .then((o) => r(o, t))
          .then((o) => (t.hooks ? t.hooks.processAllTokens(o) : o))
          .then((o) =>
            t.walkTokens
              ? Promise.all(this.walkTokens(o, t.walkTokens)).then(() => o)
              : o
          )
          .then((o) => e(o, t))
          .then((o) => (t.hooks ? t.hooks.postprocess(o) : o))
          .catch(s);
      try {
        t.hooks && (u = t.hooks.preprocess(u));
        let o = r(u, t);
        t.hooks && (o = t.hooks.processAllTokens(o)),
          t.walkTokens && this.walkTokens(o, t.walkTokens);
        let D = e(o, t);
        return t.hooks && (D = t.hooks.postprocess(D)), D;
      } catch (o) {
        return s(o);
      }
    };
  }
  #e(r, e) {
    return (u) => {
      if (
        ((u.message += `
Please report this to https://github.com/markedjs/marked.`),
        r)
      ) {
        const n =
          "<p>An error occurred:</p><pre>" + C(u.message + "", !0) + "</pre>";
        return e ? Promise.resolve(n) : n;
      }
      if (e) return Promise.reject(u);
      throw u;
    };
  }
}
const q = new Iu();
function d(l, r) {
  return q.parse(l, r);
}
d.options = d.setOptions = function (l) {
  return q.setOptions(l), (d.defaults = q.defaults), vu(d.defaults), d;
};
d.getDefaults = lu;
d.defaults = T;
d.use = function (...l) {
  return q.use(...l), (d.defaults = q.defaults), vu(d.defaults), d;
};
d.walkTokens = function (l, r) {
  return q.walkTokens(l, r);
};
d.parseInline = q.parseInline;
d.Parser = F;
d.parser = F.parse;
d.Renderer = tu;
d.TextRenderer = du;
d.Lexer = k;
d.lexer = k.lex;
d.Tokenizer = eu;
d.Hooks = uu;
d.parse = d;
d.options;
d.setOptions;
d.use;
d.walkTokens;
d.parseInline;
F.parse;
k.lex;
var H = {
  exports: {},
};
/*! https://mths.be/he v1.2.0 by @mathias | MIT license */
var Fe = H.exports,
  yu;
function ye() {
  return (
    yu ||
      ((yu = 1),
      (function (l, r) {
        (function (e) {
          var u = r,
            n = l && l.exports == u && l,
            a = typeof Cu == "object" && Cu;
          (a.global === a || a.window === a) && (e = a);
          var t = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
            s = /[\x01-\x7F]/g,
            o = /[\x01-\t\x0B\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g,
            D =
              /<\u20D2|=\u20E5|>\u20D2|\u205F\u200A|\u219D\u0338|\u2202\u0338|\u2220\u20D2|\u2229\uFE00|\u222A\uFE00|\u223C\u20D2|\u223D\u0331|\u223E\u0333|\u2242\u0338|\u224B\u0338|\u224D\u20D2|\u224E\u0338|\u224F\u0338|\u2250\u0338|\u2261\u20E5|\u2264\u20D2|\u2265\u20D2|\u2266\u0338|\u2267\u0338|\u2268\uFE00|\u2269\uFE00|\u226A\u0338|\u226A\u20D2|\u226B\u0338|\u226B\u20D2|\u227F\u0338|\u2282\u20D2|\u2283\u20D2|\u228A\uFE00|\u228B\uFE00|\u228F\u0338|\u2290\u0338|\u2293\uFE00|\u2294\uFE00|\u22B4\u20D2|\u22B5\u20D2|\u22D8\u0338|\u22D9\u0338|\u22DA\uFE00|\u22DB\uFE00|\u22F5\u0338|\u22F9\u0338|\u2933\u0338|\u29CF\u0338|\u29D0\u0338|\u2A6D\u0338|\u2A70\u0338|\u2A7D\u0338|\u2A7E\u0338|\u2AA1\u0338|\u2AA2\u0338|\u2AAC\uFE00|\u2AAD\uFE00|\u2AAF\u0338|\u2AB0\u0338|\u2AC5\u0338|\u2AC6\u0338|\u2ACB\uFE00|\u2ACC\uFE00|\u2AFD\u20E5|[\xA0-\u0113\u0116-\u0122\u0124-\u012B\u012E-\u014D\u0150-\u017E\u0192\u01B5\u01F5\u0237\u02C6\u02C7\u02D8-\u02DD\u0311\u0391-\u03A1\u03A3-\u03A9\u03B1-\u03C9\u03D1\u03D2\u03D5\u03D6\u03DC\u03DD\u03F0\u03F1\u03F5\u03F6\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E\u045F\u2002-\u2005\u2007-\u2010\u2013-\u2016\u2018-\u201A\u201C-\u201E\u2020-\u2022\u2025\u2026\u2030-\u2035\u2039\u203A\u203E\u2041\u2043\u2044\u204F\u2057\u205F-\u2063\u20AC\u20DB\u20DC\u2102\u2105\u210A-\u2113\u2115-\u211E\u2122\u2124\u2127-\u2129\u212C\u212D\u212F-\u2131\u2133-\u2138\u2145-\u2148\u2153-\u215E\u2190-\u219B\u219D-\u21A7\u21A9-\u21AE\u21B0-\u21B3\u21B5-\u21B7\u21BA-\u21DB\u21DD\u21E4\u21E5\u21F5\u21FD-\u2205\u2207-\u2209\u220B\u220C\u220F-\u2214\u2216-\u2218\u221A\u221D-\u2238\u223A-\u2257\u2259\u225A\u225C\u225F-\u2262\u2264-\u228B\u228D-\u229B\u229D-\u22A5\u22A7-\u22B0\u22B2-\u22BB\u22BD-\u22DB\u22DE-\u22E3\u22E6-\u22F7\u22F9-\u22FE\u2305\u2306\u2308-\u2310\u2312\u2313\u2315\u2316\u231C-\u231F\u2322\u2323\u232D\u232E\u2336\u233D\u233F\u237C\u23B0\u23B1\u23B4-\u23B6\u23DC-\u23DF\u23E2\u23E7\u2423\u24C8\u2500\u2502\u250C\u2510\u2514\u2518\u251C\u2524\u252C\u2534\u253C\u2550-\u256C\u2580\u2584\u2588\u2591-\u2593\u25A1\u25AA\u25AB\u25AD\u25AE\u25B1\u25B3-\u25B5\u25B8\u25B9\u25BD-\u25BF\u25C2\u25C3\u25CA\u25CB\u25EC\u25EF\u25F8-\u25FC\u2605\u2606\u260E\u2640\u2642\u2660\u2663\u2665\u2666\u266A\u266D-\u266F\u2713\u2717\u2720\u2736\u2758\u2772\u2773\u27C8\u27C9\u27E6-\u27ED\u27F5-\u27FA\u27FC\u27FF\u2902-\u2905\u290C-\u2913\u2916\u2919-\u2920\u2923-\u292A\u2933\u2935-\u2939\u293C\u293D\u2945\u2948-\u294B\u294E-\u2976\u2978\u2979\u297B-\u297F\u2985\u2986\u298B-\u2996\u299A\u299C\u299D\u29A4-\u29B7\u29B9\u29BB\u29BC\u29BE-\u29C5\u29C9\u29CD-\u29D0\u29DC-\u29DE\u29E3-\u29E5\u29EB\u29F4\u29F6\u2A00-\u2A02\u2A04\u2A06\u2A0C\u2A0D\u2A10-\u2A17\u2A22-\u2A27\u2A29\u2A2A\u2A2D-\u2A31\u2A33-\u2A3C\u2A3F\u2A40\u2A42-\u2A4D\u2A50\u2A53-\u2A58\u2A5A-\u2A5D\u2A5F\u2A66\u2A6A\u2A6D-\u2A75\u2A77-\u2A9A\u2A9D-\u2AA2\u2AA4-\u2AB0\u2AB3-\u2AC8\u2ACB\u2ACC\u2ACF-\u2ADB\u2AE4\u2AE6-\u2AE9\u2AEB-\u2AF3\u2AFD\uFB00-\uFB04]|\uD835[\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDD6B]/g,
            i = {
              "­": "shy",
              "‌": "zwnj",
              "‍": "zwj",
              "‎": "lrm",
              "⁣": "ic",
              "⁢": "it",
              "⁡": "af",
              "‏": "rlm",
              "​": "ZeroWidthSpace",
              "⁠": "NoBreak",
              "̑": "DownBreve",
              "⃛": "tdot",
              "⃜": "DotDot",
              "	": "Tab",
              "\n": "NewLine",
              " ": "puncsp",
              " ": "MediumSpace",
              " ": "thinsp",
              " ": "hairsp",
              " ": "emsp13",
              " ": "ensp",
              " ": "emsp14",
              " ": "emsp",
              " ": "numsp",
              " ": "nbsp",
              "  ": "ThickSpace",
              "‾": "oline",
              _: "lowbar",
              "‐": "dash",
              "–": "ndash",
              "—": "mdash",
              "―": "horbar",
              ",": "comma",
              ";": "semi",
              "⁏": "bsemi",
              ":": "colon",
              "⩴": "Colone",
              "!": "excl",
              "¡": "iexcl",
              "?": "quest",
              "¿": "iquest",
              ".": "period",
              "‥": "nldr",
              "…": "mldr",
              "·": "middot",
              "'": "apos",
              "‘": "lsquo",
              "’": "rsquo",
              "‚": "sbquo",
              "‹": "lsaquo",
              "›": "rsaquo",
              '"': "quot",
              "“": "ldquo",
              "”": "rdquo",
              "„": "bdquo",
              "«": "laquo",
              "»": "raquo",
              "(": "lpar",
              ")": "rpar",
              "[": "lsqb",
              "]": "rsqb",
              "{": "lcub",
              "}": "rcub",
              "⌈": "lceil",
              "⌉": "rceil",
              "⌊": "lfloor",
              "⌋": "rfloor",
              "⦅": "lopar",
              "⦆": "ropar",
              "⦋": "lbrke",
              "⦌": "rbrke",
              "⦍": "lbrkslu",
              "⦎": "rbrksld",
              "⦏": "lbrksld",
              "⦐": "rbrkslu",
              "⦑": "langd",
              "⦒": "rangd",
              "⦓": "lparlt",
              "⦔": "rpargt",
              "⦕": "gtlPar",
              "⦖": "ltrPar",
              "⟦": "lobrk",
              "⟧": "robrk",
              "⟨": "lang",
              "⟩": "rang",
              "⟪": "Lang",
              "⟫": "Rang",
              "⟬": "loang",
              "⟭": "roang",
              "❲": "lbbrk",
              "❳": "rbbrk",
              "‖": "Vert",
              "§": "sect",
              "¶": "para",
              "@": "commat",
              "*": "ast",
              "/": "sol",
              undefined: null,
              "&": "amp",
              "#": "num",
              "%": "percnt",
              "‰": "permil",
              "‱": "pertenk",
              "†": "dagger",
              "‡": "Dagger",
              "•": "bull",
              "⁃": "hybull",
              "′": "prime",
              "″": "Prime",
              "‴": "tprime",
              "⁗": "qprime",
              "‵": "bprime",
              "⁁": "caret",
              "`": "grave",
              "´": "acute",
              "˜": "tilde",
              "^": "Hat",
              "¯": "macr",
              "˘": "breve",
              "˙": "dot",
              "¨": "die",
              "˚": "ring",
              "˝": "dblac",
              "¸": "cedil",
              "˛": "ogon",
              ˆ: "circ",
              ˇ: "caron",
              "°": "deg",
              "©": "copy",
              "®": "reg",
              "℗": "copysr",
              "℘": "wp",
              "℞": "rx",
              "℧": "mho",
              "℩": "iiota",
              "←": "larr",
              "↚": "nlarr",
              "→": "rarr",
              "↛": "nrarr",
              "↑": "uarr",
              "↓": "darr",
              "↔": "harr",
              "↮": "nharr",
              "↕": "varr",
              "↖": "nwarr",
              "↗": "nearr",
              "↘": "searr",
              "↙": "swarr",
              "↝": "rarrw",
              "↝̸": "nrarrw",
              "↞": "Larr",
              "↟": "Uarr",
              "↠": "Rarr",
              "↡": "Darr",
              "↢": "larrtl",
              "↣": "rarrtl",
              "↤": "mapstoleft",
              "↥": "mapstoup",
              "↦": "map",
              "↧": "mapstodown",
              "↩": "larrhk",
              "↪": "rarrhk",
              "↫": "larrlp",
              "↬": "rarrlp",
              "↭": "harrw",
              "↰": "lsh",
              "↱": "rsh",
              "↲": "ldsh",
              "↳": "rdsh",
              "↵": "crarr",
              "↶": "cularr",
              "↷": "curarr",
              "↺": "olarr",
              "↻": "orarr",
              "↼": "lharu",
              "↽": "lhard",
              "↾": "uharr",
              "↿": "uharl",
              "⇀": "rharu",
              "⇁": "rhard",
              "⇂": "dharr",
              "⇃": "dharl",
              "⇄": "rlarr",
              "⇅": "udarr",
              "⇆": "lrarr",
              "⇇": "llarr",
              "⇈": "uuarr",
              "⇉": "rrarr",
              "⇊": "ddarr",
              "⇋": "lrhar",
              "⇌": "rlhar",
              "⇐": "lArr",
              "⇍": "nlArr",
              "⇑": "uArr",
              "⇒": "rArr",
              "⇏": "nrArr",
              "⇓": "dArr",
              "⇔": "iff",
              "⇎": "nhArr",
              "⇕": "vArr",
              "⇖": "nwArr",
              "⇗": "neArr",
              "⇘": "seArr",
              "⇙": "swArr",
              "⇚": "lAarr",
              "⇛": "rAarr",
              "⇝": "zigrarr",
              "⇤": "larrb",
              "⇥": "rarrb",
              "⇵": "duarr",
              "⇽": "loarr",
              "⇾": "roarr",
              "⇿": "hoarr",
              "∀": "forall",
              "∁": "comp",
              "∂": "part",
              "∂̸": "npart",
              "∃": "exist",
              "∄": "nexist",
              "∅": "empty",
              "∇": "Del",
              "∈": "in",
              "∉": "notin",
              "∋": "ni",
              "∌": "notni",
              "϶": "bepsi",
              "∏": "prod",
              "∐": "coprod",
              "∑": "sum",
              "+": "plus",
              "±": "pm",
              "÷": "div",
              "×": "times",
              "<": "lt",
              "≮": "nlt",
              "<⃒": "nvlt",
              "=": "equals",
              "≠": "ne",
              "=⃥": "bne",
              "⩵": "Equal",
              ">": "gt",
              "≯": "ngt",
              ">⃒": "nvgt",
              "¬": "not",
              "|": "vert",
              "¦": "brvbar",
              "−": "minus",
              "∓": "mp",
              "∔": "plusdo",
              "⁄": "frasl",
              "∖": "setmn",
              "∗": "lowast",
              "∘": "compfn",
              "√": "Sqrt",
              "∝": "prop",
              "∞": "infin",
              "∟": "angrt",
              "∠": "ang",
              "∠⃒": "nang",
              "∡": "angmsd",
              "∢": "angsph",
              "∣": "mid",
              "∤": "nmid",
              "∥": "par",
              "∦": "npar",
              "∧": "and",
              "∨": "or",
              "∩": "cap",
              "∩︀": "caps",
              "∪": "cup",
              "∪︀": "cups",
              "∫": "int",
              "∬": "Int",
              "∭": "tint",
              "⨌": "qint",
              "∮": "oint",
              "∯": "Conint",
              "∰": "Cconint",
              "∱": "cwint",
              "∲": "cwconint",
              "∳": "awconint",
              "∴": "there4",
              "∵": "becaus",
              "∶": "ratio",
              "∷": "Colon",
              "∸": "minusd",
              "∺": "mDDot",
              "∻": "homtht",
              "∼": "sim",
              "≁": "nsim",
              "∼⃒": "nvsim",
              "∽": "bsim",
              "∽̱": "race",
              "∾": "ac",
              "∾̳": "acE",
              "∿": "acd",
              "≀": "wr",
              "≂": "esim",
              "≂̸": "nesim",
              "≃": "sime",
              "≄": "nsime",
              "≅": "cong",
              "≇": "ncong",
              "≆": "simne",
              "≈": "ap",
              "≉": "nap",
              "≊": "ape",
              "≋": "apid",
              "≋̸": "napid",
              "≌": "bcong",
              "≍": "CupCap",
              "≭": "NotCupCap",
              "≍⃒": "nvap",
              "≎": "bump",
              "≎̸": "nbump",
              "≏": "bumpe",
              "≏̸": "nbumpe",
              "≐": "doteq",
              "≐̸": "nedot",
              "≑": "eDot",
              "≒": "efDot",
              "≓": "erDot",
              "≔": "colone",
              "≕": "ecolon",
              "≖": "ecir",
              "≗": "cire",
              "≙": "wedgeq",
              "≚": "veeeq",
              "≜": "trie",
              "≟": "equest",
              "≡": "equiv",
              "≢": "nequiv",
              "≡⃥": "bnequiv",
              "≤": "le",
              "≰": "nle",
              "≤⃒": "nvle",
              "≥": "ge",
              "≱": "nge",
              "≥⃒": "nvge",
              "≦": "lE",
              "≦̸": "nlE",
              "≧": "gE",
              "≧̸": "ngE",
              "≨︀": "lvnE",
              "≨": "lnE",
              "≩": "gnE",
              "≩︀": "gvnE",
              "≪": "ll",
              "≪̸": "nLtv",
              "≪⃒": "nLt",
              "≫": "gg",
              "≫̸": "nGtv",
              "≫⃒": "nGt",
              "≬": "twixt",
              "≲": "lsim",
              "≴": "nlsim",
              "≳": "gsim",
              "≵": "ngsim",
              "≶": "lg",
              "≸": "ntlg",
              "≷": "gl",
              "≹": "ntgl",
              "≺": "pr",
              "⊀": "npr",
              "≻": "sc",
              "⊁": "nsc",
              "≼": "prcue",
              "⋠": "nprcue",
              "≽": "sccue",
              "⋡": "nsccue",
              "≾": "prsim",
              "≿": "scsim",
              "≿̸": "NotSucceedsTilde",
              "⊂": "sub",
              "⊄": "nsub",
              "⊂⃒": "vnsub",
              "⊃": "sup",
              "⊅": "nsup",
              "⊃⃒": "vnsup",
              "⊆": "sube",
              "⊈": "nsube",
              "⊇": "supe",
              "⊉": "nsupe",
              "⊊︀": "vsubne",
              "⊊": "subne",
              "⊋︀": "vsupne",
              "⊋": "supne",
              "⊍": "cupdot",
              "⊎": "uplus",
              "⊏": "sqsub",
              "⊏̸": "NotSquareSubset",
              "⊐": "sqsup",
              "⊐̸": "NotSquareSuperset",
              "⊑": "sqsube",
              "⋢": "nsqsube",
              "⊒": "sqsupe",
              "⋣": "nsqsupe",
              "⊓": "sqcap",
              "⊓︀": "sqcaps",
              "⊔": "sqcup",
              "⊔︀": "sqcups",
              "⊕": "oplus",
              "⊖": "ominus",
              "⊗": "otimes",
              "⊘": "osol",
              "⊙": "odot",
              "⊚": "ocir",
              "⊛": "oast",
              "⊝": "odash",
              "⊞": "plusb",
              "⊟": "minusb",
              "⊠": "timesb",
              "⊡": "sdotb",
              "⊢": "vdash",
              "⊬": "nvdash",
              "⊣": "dashv",
              "⊤": "top",
              "⊥": "bot",
              "⊧": "models",
              "⊨": "vDash",
              "⊭": "nvDash",
              "⊩": "Vdash",
              "⊮": "nVdash",
              "⊪": "Vvdash",
              "⊫": "VDash",
              "⊯": "nVDash",
              "⊰": "prurel",
              "⊲": "vltri",
              "⋪": "nltri",
              "⊳": "vrtri",
              "⋫": "nrtri",
              "⊴": "ltrie",
              "⋬": "nltrie",
              "⊴⃒": "nvltrie",
              "⊵": "rtrie",
              "⋭": "nrtrie",
              "⊵⃒": "nvrtrie",
              "⊶": "origof",
              "⊷": "imof",
              "⊸": "mumap",
              "⊹": "hercon",
              "⊺": "intcal",
              "⊻": "veebar",
              "⊽": "barvee",
              "⊾": "angrtvb",
              "⊿": "lrtri",
              "⋀": "Wedge",
              "⋁": "Vee",
              "⋂": "xcap",
              "⋃": "xcup",
              "⋄": "diam",
              "⋅": "sdot",
              "⋆": "Star",
              "⋇": "divonx",
              "⋈": "bowtie",
              "⋉": "ltimes",
              "⋊": "rtimes",
              "⋋": "lthree",
              "⋌": "rthree",
              "⋍": "bsime",
              "⋎": "cuvee",
              "⋏": "cuwed",
              "⋐": "Sub",
              "⋑": "Sup",
              "⋒": "Cap",
              "⋓": "Cup",
              "⋔": "fork",
              "⋕": "epar",
              "⋖": "ltdot",
              "⋗": "gtdot",
              "⋘": "Ll",
              "⋘̸": "nLl",
              "⋙": "Gg",
              "⋙̸": "nGg",
              "⋚︀": "lesg",
              "⋚": "leg",
              "⋛": "gel",
              "⋛︀": "gesl",
              "⋞": "cuepr",
              "⋟": "cuesc",
              "⋦": "lnsim",
              "⋧": "gnsim",
              "⋨": "prnsim",
              "⋩": "scnsim",
              "⋮": "vellip",
              "⋯": "ctdot",
              "⋰": "utdot",
              "⋱": "dtdot",
              "⋲": "disin",
              "⋳": "isinsv",
              "⋴": "isins",
              "⋵": "isindot",
              "⋵̸": "notindot",
              "⋶": "notinvc",
              "⋷": "notinvb",
              "⋹": "isinE",
              "⋹̸": "notinE",
              "⋺": "nisd",
              "⋻": "xnis",
              "⋼": "nis",
              "⋽": "notnivc",
              "⋾": "notnivb",
              "⌅": "barwed",
              "⌆": "Barwed",
              "⌌": "drcrop",
              "⌍": "dlcrop",
              "⌎": "urcrop",
              "⌏": "ulcrop",
              "⌐": "bnot",
              "⌒": "profline",
              "⌓": "profsurf",
              "⌕": "telrec",
              "⌖": "target",
              "⌜": "ulcorn",
              "⌝": "urcorn",
              "⌞": "dlcorn",
              "⌟": "drcorn",
              "⌢": "frown",
              "⌣": "smile",
              "⌭": "cylcty",
              "⌮": "profalar",
              "⌶": "topbot",
              "⌽": "ovbar",
              "⌿": "solbar",
              "⍼": "angzarr",
              "⎰": "lmoust",
              "⎱": "rmoust",
              "⎴": "tbrk",
              "⎵": "bbrk",
              "⎶": "bbrktbrk",
              "⏜": "OverParenthesis",
              "⏝": "UnderParenthesis",
              "⏞": "OverBrace",
              "⏟": "UnderBrace",
              "⏢": "trpezium",
              "⏧": "elinters",
              "␣": "blank",
              "─": "boxh",
              "│": "boxv",
              "┌": "boxdr",
              "┐": "boxdl",
              "└": "boxur",
              "┘": "boxul",
              "├": "boxvr",
              "┤": "boxvl",
              "┬": "boxhd",
              "┴": "boxhu",
              "┼": "boxvh",
              "═": "boxH",
              "║": "boxV",
              "╒": "boxdR",
              "╓": "boxDr",
              "╔": "boxDR",
              "╕": "boxdL",
              "╖": "boxDl",
              "╗": "boxDL",
              "╘": "boxuR",
              "╙": "boxUr",
              "╚": "boxUR",
              "╛": "boxuL",
              "╜": "boxUl",
              "╝": "boxUL",
              "╞": "boxvR",
              "╟": "boxVr",
              "╠": "boxVR",
              "╡": "boxvL",
              "╢": "boxVl",
              "╣": "boxVL",
              "╤": "boxHd",
              "╥": "boxhD",
              "╦": "boxHD",
              "╧": "boxHu",
              "╨": "boxhU",
              "╩": "boxHU",
              "╪": "boxvH",
              "╫": "boxVh",
              "╬": "boxVH",
              "▀": "uhblk",
              "▄": "lhblk",
              "█": "block",
              "░": "blk14",
              "▒": "blk12",
              "▓": "blk34",
              "□": "squ",
              "▪": "squf",
              "▫": "EmptyVerySmallSquare",
              "▭": "rect",
              "▮": "marker",
              "▱": "fltns",
              "△": "xutri",
              "▴": "utrif",
              "▵": "utri",
              "▸": "rtrif",
              "▹": "rtri",
              "▽": "xdtri",
              "▾": "dtrif",
              "▿": "dtri",
              "◂": "ltrif",
              "◃": "ltri",
              "◊": "loz",
              "○": "cir",
              "◬": "tridot",
              "◯": "xcirc",
              "◸": "ultri",
              "◹": "urtri",
              "◺": "lltri",
              "◻": "EmptySmallSquare",
              "◼": "FilledSmallSquare",
              "★": "starf",
              "☆": "star",
              "☎": "phone",
              "♀": "female",
              "♂": "male",
              "♠": "spades",
              "♣": "clubs",
              "♥": "hearts",
              "♦": "diams",
              "♪": "sung",
              "✓": "check",
              "✗": "cross",
              "✠": "malt",
              "✶": "sext",
              "❘": "VerticalSeparator",
              "⟈": "bsolhsub",
              "⟉": "suphsol",
              "⟵": "xlarr",
              "⟶": "xrarr",
              "⟷": "xharr",
              "⟸": "xlArr",
              "⟹": "xrArr",
              "⟺": "xhArr",
              "⟼": "xmap",
              "⟿": "dzigrarr",
              "⤂": "nvlArr",
              "⤃": "nvrArr",
              "⤄": "nvHarr",
              "⤅": "Map",
              "⤌": "lbarr",
              "⤍": "rbarr",
              "⤎": "lBarr",
              "⤏": "rBarr",
              "⤐": "RBarr",
              "⤑": "DDotrahd",
              "⤒": "UpArrowBar",
              "⤓": "DownArrowBar",
              "⤖": "Rarrtl",
              "⤙": "latail",
              "⤚": "ratail",
              "⤛": "lAtail",
              "⤜": "rAtail",
              "⤝": "larrfs",
              "⤞": "rarrfs",
              "⤟": "larrbfs",
              "⤠": "rarrbfs",
              "⤣": "nwarhk",
              "⤤": "nearhk",
              "⤥": "searhk",
              "⤦": "swarhk",
              "⤧": "nwnear",
              "⤨": "toea",
              "⤩": "tosa",
              "⤪": "swnwar",
              "⤳": "rarrc",
              "⤳̸": "nrarrc",
              "⤵": "cudarrr",
              "⤶": "ldca",
              "⤷": "rdca",
              "⤸": "cudarrl",
              "⤹": "larrpl",
              "⤼": "curarrm",
              "⤽": "cularrp",
              "⥅": "rarrpl",
              "⥈": "harrcir",
              "⥉": "Uarrocir",
              "⥊": "lurdshar",
              "⥋": "ldrushar",
              "⥎": "LeftRightVector",
              "⥏": "RightUpDownVector",
              "⥐": "DownLeftRightVector",
              "⥑": "LeftUpDownVector",
              "⥒": "LeftVectorBar",
              "⥓": "RightVectorBar",
              "⥔": "RightUpVectorBar",
              "⥕": "RightDownVectorBar",
              "⥖": "DownLeftVectorBar",
              "⥗": "DownRightVectorBar",
              "⥘": "LeftUpVectorBar",
              "⥙": "LeftDownVectorBar",
              "⥚": "LeftTeeVector",
              "⥛": "RightTeeVector",
              "⥜": "RightUpTeeVector",
              "⥝": "RightDownTeeVector",
              "⥞": "DownLeftTeeVector",
              "⥟": "DownRightTeeVector",
              "⥠": "LeftUpTeeVector",
              "⥡": "LeftDownTeeVector",
              "⥢": "lHar",
              "⥣": "uHar",
              "⥤": "rHar",
              "⥥": "dHar",
              "⥦": "luruhar",
              "⥧": "ldrdhar",
              "⥨": "ruluhar",
              "⥩": "rdldhar",
              "⥪": "lharul",
              "⥫": "llhard",
              "⥬": "rharul",
              "⥭": "lrhard",
              "⥮": "udhar",
              "⥯": "duhar",
              "⥰": "RoundImplies",
              "⥱": "erarr",
              "⥲": "simrarr",
              "⥳": "larrsim",
              "⥴": "rarrsim",
              "⥵": "rarrap",
              "⥶": "ltlarr",
              "⥸": "gtrarr",
              "⥹": "subrarr",
              "⥻": "suplarr",
              "⥼": "lfisht",
              "⥽": "rfisht",
              "⥾": "ufisht",
              "⥿": "dfisht",
              "⦚": "vzigzag",
              "⦜": "vangrt",
              "⦝": "angrtvbd",
              "⦤": "ange",
              "⦥": "range",
              "⦦": "dwangle",
              "⦧": "uwangle",
              "⦨": "angmsdaa",
              "⦩": "angmsdab",
              "⦪": "angmsdac",
              "⦫": "angmsdad",
              "⦬": "angmsdae",
              "⦭": "angmsdaf",
              "⦮": "angmsdag",
              "⦯": "angmsdah",
              "⦰": "bemptyv",
              "⦱": "demptyv",
              "⦲": "cemptyv",
              "⦳": "raemptyv",
              "⦴": "laemptyv",
              "⦵": "ohbar",
              "⦶": "omid",
              "⦷": "opar",
              "⦹": "operp",
              "⦻": "olcross",
              "⦼": "odsold",
              "⦾": "olcir",
              "⦿": "ofcir",
              "⧀": "olt",
              "⧁": "ogt",
              "⧂": "cirscir",
              "⧃": "cirE",
              "⧄": "solb",
              "⧅": "bsolb",
              "⧉": "boxbox",
              "⧍": "trisb",
              "⧎": "rtriltri",
              "⧏": "LeftTriangleBar",
              "⧏̸": "NotLeftTriangleBar",
              "⧐": "RightTriangleBar",
              "⧐̸": "NotRightTriangleBar",
              "⧜": "iinfin",
              "⧝": "infintie",
              "⧞": "nvinfin",
              "⧣": "eparsl",
              "⧤": "smeparsl",
              "⧥": "eqvparsl",
              "⧫": "lozf",
              "⧴": "RuleDelayed",
              "⧶": "dsol",
              "⨀": "xodot",
              "⨁": "xoplus",
              "⨂": "xotime",
              "⨄": "xuplus",
              "⨆": "xsqcup",
              "⨍": "fpartint",
              "⨐": "cirfnint",
              "⨑": "awint",
              "⨒": "rppolint",
              "⨓": "scpolint",
              "⨔": "npolint",
              "⨕": "pointint",
              "⨖": "quatint",
              "⨗": "intlarhk",
              "⨢": "pluscir",
              "⨣": "plusacir",
              "⨤": "simplus",
              "⨥": "plusdu",
              "⨦": "plussim",
              "⨧": "plustwo",
              "⨩": "mcomma",
              "⨪": "minusdu",
              "⨭": "loplus",
              "⨮": "roplus",
              "⨯": "Cross",
              "⨰": "timesd",
              "⨱": "timesbar",
              "⨳": "smashp",
              "⨴": "lotimes",
              "⨵": "rotimes",
              "⨶": "otimesas",
              "⨷": "Otimes",
              "⨸": "odiv",
              "⨹": "triplus",
              "⨺": "triminus",
              "⨻": "tritime",
              "⨼": "iprod",
              "⨿": "amalg",
              "⩀": "capdot",
              "⩂": "ncup",
              "⩃": "ncap",
              "⩄": "capand",
              "⩅": "cupor",
              "⩆": "cupcap",
              "⩇": "capcup",
              "⩈": "cupbrcap",
              "⩉": "capbrcup",
              "⩊": "cupcup",
              "⩋": "capcap",
              "⩌": "ccups",
              "⩍": "ccaps",
              "⩐": "ccupssm",
              "⩓": "And",
              "⩔": "Or",
              "⩕": "andand",
              "⩖": "oror",
              "⩗": "orslope",
              "⩘": "andslope",
              "⩚": "andv",
              "⩛": "orv",
              "⩜": "andd",
              "⩝": "ord",
              "⩟": "wedbar",
              "⩦": "sdote",
              "⩪": "simdot",
              "⩭": "congdot",
              "⩭̸": "ncongdot",
              "⩮": "easter",
              "⩯": "apacir",
              "⩰": "apE",
              "⩰̸": "napE",
              "⩱": "eplus",
              "⩲": "pluse",
              "⩳": "Esim",
              "⩷": "eDDot",
              "⩸": "equivDD",
              "⩹": "ltcir",
              "⩺": "gtcir",
              "⩻": "ltquest",
              "⩼": "gtquest",
              "⩽": "les",
              "⩽̸": "nles",
              "⩾": "ges",
              "⩾̸": "nges",
              "⩿": "lesdot",
              "⪀": "gesdot",
              "⪁": "lesdoto",
              "⪂": "gesdoto",
              "⪃": "lesdotor",
              "⪄": "gesdotol",
              "⪅": "lap",
              "⪆": "gap",
              "⪇": "lne",
              "⪈": "gne",
              "⪉": "lnap",
              "⪊": "gnap",
              "⪋": "lEg",
              "⪌": "gEl",
              "⪍": "lsime",
              "⪎": "gsime",
              "⪏": "lsimg",
              "⪐": "gsiml",
              "⪑": "lgE",
              "⪒": "glE",
              "⪓": "lesges",
              "⪔": "gesles",
              "⪕": "els",
              "⪖": "egs",
              "⪗": "elsdot",
              "⪘": "egsdot",
              "⪙": "el",
              "⪚": "eg",
              "⪝": "siml",
              "⪞": "simg",
              "⪟": "simlE",
              "⪠": "simgE",
              "⪡": "LessLess",
              "⪡̸": "NotNestedLessLess",
              "⪢": "GreaterGreater",
              "⪢̸": "NotNestedGreaterGreater",
              "⪤": "glj",
              "⪥": "gla",
              "⪦": "ltcc",
              "⪧": "gtcc",
              "⪨": "lescc",
              "⪩": "gescc",
              "⪪": "smt",
              "⪫": "lat",
              "⪬": "smte",
              "⪬︀": "smtes",
              "⪭": "late",
              "⪭︀": "lates",
              "⪮": "bumpE",
              "⪯": "pre",
              "⪯̸": "npre",
              "⪰": "sce",
              "⪰̸": "nsce",
              "⪳": "prE",
              "⪴": "scE",
              "⪵": "prnE",
              "⪶": "scnE",
              "⪷": "prap",
              "⪸": "scap",
              "⪹": "prnap",
              "⪺": "scnap",
              "⪻": "Pr",
              "⪼": "Sc",
              "⪽": "subdot",
              "⪾": "supdot",
              "⪿": "subplus",
              "⫀": "supplus",
              "⫁": "submult",
              "⫂": "supmult",
              "⫃": "subedot",
              "⫄": "supedot",
              "⫅": "subE",
              "⫅̸": "nsubE",
              "⫆": "supE",
              "⫆̸": "nsupE",
              "⫇": "subsim",
              "⫈": "supsim",
              "⫋︀": "vsubnE",
              "⫋": "subnE",
              "⫌︀": "vsupnE",
              "⫌": "supnE",
              "⫏": "csub",
              "⫐": "csup",
              "⫑": "csube",
              "⫒": "csupe",
              "⫓": "subsup",
              "⫔": "supsub",
              "⫕": "subsub",
              "⫖": "supsup",
              "⫗": "suphsub",
              "⫘": "supdsub",
              "⫙": "forkv",
              "⫚": "topfork",
              "⫛": "mlcp",
              "⫤": "Dashv",
              "⫦": "Vdashl",
              "⫧": "Barv",
              "⫨": "vBar",
              "⫩": "vBarv",
              "⫫": "Vbar",
              "⫬": "Not",
              "⫭": "bNot",
              "⫮": "rnmid",
              "⫯": "cirmid",
              "⫰": "midcir",
              "⫱": "topcir",
              "⫲": "nhpar",
              "⫳": "parsim",
              "⫽": "parsl",
              "⫽⃥": "nparsl",
              "♭": "flat",
              "♮": "natur",
              "♯": "sharp",
              "¤": "curren",
              "¢": "cent",
              $: "dollar",
              "£": "pound",
              "¥": "yen",
              "€": "euro",
              "¹": "sup1",
              "½": "half",
              "⅓": "frac13",
              "¼": "frac14",
              "⅕": "frac15",
              "⅙": "frac16",
              "⅛": "frac18",
              "²": "sup2",
              "⅔": "frac23",
              "⅖": "frac25",
              "³": "sup3",
              "¾": "frac34",
              "⅗": "frac35",
              "⅜": "frac38",
              "⅘": "frac45",
              "⅚": "frac56",
              "⅝": "frac58",
              "⅞": "frac78",
              "𝒶": "ascr",
              "𝕒": "aopf",
              "𝔞": "afr",
              "𝔸": "Aopf",
              "𝔄": "Afr",
              "𝒜": "Ascr",
              ª: "ordf",
              á: "aacute",
              Á: "Aacute",
              à: "agrave",
              À: "Agrave",
              ă: "abreve",
              Ă: "Abreve",
              â: "acirc",
              Â: "Acirc",
              å: "aring",
              Å: "angst",
              ä: "auml",
              Ä: "Auml",
              ã: "atilde",
              Ã: "Atilde",
              ą: "aogon",
              Ą: "Aogon",
              ā: "amacr",
              Ā: "Amacr",
              æ: "aelig",
              Æ: "AElig",
              "𝒷": "bscr",
              "𝕓": "bopf",
              "𝔟": "bfr",
              "𝔹": "Bopf",
              ℬ: "Bscr",
              "𝔅": "Bfr",
              "𝔠": "cfr",
              "𝒸": "cscr",
              "𝕔": "copf",
              ℭ: "Cfr",
              "𝒞": "Cscr",
              ℂ: "Copf",
              ć: "cacute",
              Ć: "Cacute",
              ĉ: "ccirc",
              Ĉ: "Ccirc",
              č: "ccaron",
              Č: "Ccaron",
              ċ: "cdot",
              Ċ: "Cdot",
              ç: "ccedil",
              Ç: "Ccedil",
              "℅": "incare",
              "𝔡": "dfr",
              ⅆ: "dd",
              "𝕕": "dopf",
              "𝒹": "dscr",
              "𝒟": "Dscr",
              "𝔇": "Dfr",
              ⅅ: "DD",
              "𝔻": "Dopf",
              ď: "dcaron",
              Ď: "Dcaron",
              đ: "dstrok",
              Đ: "Dstrok",
              ð: "eth",
              Ð: "ETH",
              ⅇ: "ee",
              ℯ: "escr",
              "𝔢": "efr",
              "𝕖": "eopf",
              ℰ: "Escr",
              "𝔈": "Efr",
              "𝔼": "Eopf",
              é: "eacute",
              É: "Eacute",
              è: "egrave",
              È: "Egrave",
              ê: "ecirc",
              Ê: "Ecirc",
              ě: "ecaron",
              Ě: "Ecaron",
              ë: "euml",
              Ë: "Euml",
              ė: "edot",
              Ė: "Edot",
              ę: "eogon",
              Ę: "Eogon",
              ē: "emacr",
              Ē: "Emacr",
              "𝔣": "ffr",
              "𝕗": "fopf",
              "𝒻": "fscr",
              "𝔉": "Ffr",
              "𝔽": "Fopf",
              ℱ: "Fscr",
              ﬀ: "fflig",
              ﬃ: "ffilig",
              ﬄ: "ffllig",
              ﬁ: "filig",
              fj: "fjlig",
              ﬂ: "fllig",
              ƒ: "fnof",
              ℊ: "gscr",
              "𝕘": "gopf",
              "𝔤": "gfr",
              "𝒢": "Gscr",
              "𝔾": "Gopf",
              "𝔊": "Gfr",
              ǵ: "gacute",
              ğ: "gbreve",
              Ğ: "Gbreve",
              ĝ: "gcirc",
              Ĝ: "Gcirc",
              ġ: "gdot",
              Ġ: "Gdot",
              Ģ: "Gcedil",
              "𝔥": "hfr",
              ℎ: "planckh",
              "𝒽": "hscr",
              "𝕙": "hopf",
              ℋ: "Hscr",
              ℌ: "Hfr",
              ℍ: "Hopf",
              ĥ: "hcirc",
              Ĥ: "Hcirc",
              ℏ: "hbar",
              ħ: "hstrok",
              Ħ: "Hstrok",
              "𝕚": "iopf",
              "𝔦": "ifr",
              "𝒾": "iscr",
              ⅈ: "ii",
              "𝕀": "Iopf",
              ℐ: "Iscr",
              ℑ: "Im",
              í: "iacute",
              Í: "Iacute",
              ì: "igrave",
              Ì: "Igrave",
              î: "icirc",
              Î: "Icirc",
              ï: "iuml",
              Ï: "Iuml",
              ĩ: "itilde",
              Ĩ: "Itilde",
              İ: "Idot",
              į: "iogon",
              Į: "Iogon",
              ī: "imacr",
              Ī: "Imacr",
              ĳ: "ijlig",
              Ĳ: "IJlig",
              ı: "imath",
              "𝒿": "jscr",
              "𝕛": "jopf",
              "𝔧": "jfr",
              "𝒥": "Jscr",
              "𝔍": "Jfr",
              "𝕁": "Jopf",
              ĵ: "jcirc",
              Ĵ: "Jcirc",
              ȷ: "jmath",
              "𝕜": "kopf",
              "𝓀": "kscr",
              "𝔨": "kfr",
              "𝒦": "Kscr",
              "𝕂": "Kopf",
              "𝔎": "Kfr",
              ķ: "kcedil",
              Ķ: "Kcedil",
              "𝔩": "lfr",
              "𝓁": "lscr",
              ℓ: "ell",
              "𝕝": "lopf",
              ℒ: "Lscr",
              "𝔏": "Lfr",
              "𝕃": "Lopf",
              ĺ: "lacute",
              Ĺ: "Lacute",
              ľ: "lcaron",
              Ľ: "Lcaron",
              ļ: "lcedil",
              Ļ: "Lcedil",
              ł: "lstrok",
              Ł: "Lstrok",
              ŀ: "lmidot",
              Ŀ: "Lmidot",
              "𝔪": "mfr",
              "𝕞": "mopf",
              "𝓂": "mscr",
              "𝔐": "Mfr",
              "𝕄": "Mopf",
              ℳ: "Mscr",
              "𝔫": "nfr",
              "𝕟": "nopf",
              "𝓃": "nscr",
              ℕ: "Nopf",
              "𝒩": "Nscr",
              "𝔑": "Nfr",
              ń: "nacute",
              Ń: "Nacute",
              ň: "ncaron",
              Ň: "Ncaron",
              ñ: "ntilde",
              Ñ: "Ntilde",
              ņ: "ncedil",
              Ņ: "Ncedil",
              "№": "numero",
              ŋ: "eng",
              Ŋ: "ENG",
              "𝕠": "oopf",
              "𝔬": "ofr",
              ℴ: "oscr",
              "𝒪": "Oscr",
              "𝔒": "Ofr",
              "𝕆": "Oopf",
              º: "ordm",
              ó: "oacute",
              Ó: "Oacute",
              ò: "ograve",
              Ò: "Ograve",
              ô: "ocirc",
              Ô: "Ocirc",
              ö: "ouml",
              Ö: "Ouml",
              ő: "odblac",
              Ő: "Odblac",
              õ: "otilde",
              Õ: "Otilde",
              ø: "oslash",
              Ø: "Oslash",
              ō: "omacr",
              Ō: "Omacr",
              œ: "oelig",
              Œ: "OElig",
              "𝔭": "pfr",
              "𝓅": "pscr",
              "𝕡": "popf",
              ℙ: "Popf",
              "𝔓": "Pfr",
              "𝒫": "Pscr",
              "𝕢": "qopf",
              "𝔮": "qfr",
              "𝓆": "qscr",
              "𝒬": "Qscr",
              "𝔔": "Qfr",
              ℚ: "Qopf",
              ĸ: "kgreen",
              "𝔯": "rfr",
              "𝕣": "ropf",
              "𝓇": "rscr",
              ℛ: "Rscr",
              ℜ: "Re",
              ℝ: "Ropf",
              ŕ: "racute",
              Ŕ: "Racute",
              ř: "rcaron",
              Ř: "Rcaron",
              ŗ: "rcedil",
              Ŗ: "Rcedil",
              "𝕤": "sopf",
              "𝓈": "sscr",
              "𝔰": "sfr",
              "𝕊": "Sopf",
              "𝔖": "Sfr",
              "𝒮": "Sscr",
              "Ⓢ": "oS",
              ś: "sacute",
              Ś: "Sacute",
              ŝ: "scirc",
              Ŝ: "Scirc",
              š: "scaron",
              Š: "Scaron",
              ş: "scedil",
              Ş: "Scedil",
              ß: "szlig",
              "𝔱": "tfr",
              "𝓉": "tscr",
              "𝕥": "topf",
              "𝒯": "Tscr",
              "𝔗": "Tfr",
              "𝕋": "Topf",
              ť: "tcaron",
              Ť: "Tcaron",
              ţ: "tcedil",
              Ţ: "Tcedil",
              "™": "trade",
              ŧ: "tstrok",
              Ŧ: "Tstrok",
              "𝓊": "uscr",
              "𝕦": "uopf",
              "𝔲": "ufr",
              "𝕌": "Uopf",
              "𝔘": "Ufr",
              "𝒰": "Uscr",
              ú: "uacute",
              Ú: "Uacute",
              ù: "ugrave",
              Ù: "Ugrave",
              ŭ: "ubreve",
              Ŭ: "Ubreve",
              û: "ucirc",
              Û: "Ucirc",
              ů: "uring",
              Ů: "Uring",
              ü: "uuml",
              Ü: "Uuml",
              ű: "udblac",
              Ű: "Udblac",
              ũ: "utilde",
              Ũ: "Utilde",
              ų: "uogon",
              Ų: "Uogon",
              ū: "umacr",
              Ū: "Umacr",
              "𝔳": "vfr",
              "𝕧": "vopf",
              "𝓋": "vscr",
              "𝔙": "Vfr",
              "𝕍": "Vopf",
              "𝒱": "Vscr",
              "𝕨": "wopf",
              "𝓌": "wscr",
              "𝔴": "wfr",
              "𝒲": "Wscr",
              "𝕎": "Wopf",
              "𝔚": "Wfr",
              ŵ: "wcirc",
              Ŵ: "Wcirc",
              "𝔵": "xfr",
              "𝓍": "xscr",
              "𝕩": "xopf",
              "𝕏": "Xopf",
              "𝔛": "Xfr",
              "𝒳": "Xscr",
              "𝔶": "yfr",
              "𝓎": "yscr",
              "𝕪": "yopf",
              "𝒴": "Yscr",
              "𝔜": "Yfr",
              "𝕐": "Yopf",
              ý: "yacute",
              Ý: "Yacute",
              ŷ: "ycirc",
              Ŷ: "Ycirc",
              ÿ: "yuml",
              Ÿ: "Yuml",
              "𝓏": "zscr",
              "𝔷": "zfr",
              "𝕫": "zopf",
              ℨ: "Zfr",
              ℤ: "Zopf",
              "𝒵": "Zscr",
              ź: "zacute",
              Ź: "Zacute",
              ž: "zcaron",
              Ž: "Zcaron",
              ż: "zdot",
              Ż: "Zdot",
              Ƶ: "imped",
              þ: "thorn",
              Þ: "THORN",
              ŉ: "napos",
              α: "alpha",
              Α: "Alpha",
              β: "beta",
              Β: "Beta",
              γ: "gamma",
              Γ: "Gamma",
              δ: "delta",
              Δ: "Delta",
              ε: "epsi",
              ϵ: "epsiv",
              Ε: "Epsilon",
              ϝ: "gammad",
              Ϝ: "Gammad",
              ζ: "zeta",
              Ζ: "Zeta",
              η: "eta",
              Η: "Eta",
              θ: "theta",
              ϑ: "thetav",
              Θ: "Theta",
              ι: "iota",
              Ι: "Iota",
              κ: "kappa",
              ϰ: "kappav",
              Κ: "Kappa",
              λ: "lambda",
              Λ: "Lambda",
              μ: "mu",
              µ: "micro",
              Μ: "Mu",
              ν: "nu",
              Ν: "Nu",
              ξ: "xi",
              Ξ: "Xi",
              ο: "omicron",
              Ο: "Omicron",
              π: "pi",
              ϖ: "piv",
              Π: "Pi",
              ρ: "rho",
              ϱ: "rhov",
              Ρ: "Rho",
              σ: "sigma",
              Σ: "Sigma",
              ς: "sigmaf",
              τ: "tau",
              Τ: "Tau",
              υ: "upsi",
              Υ: "Upsilon",
              ϒ: "Upsi",
              φ: "phi",
              ϕ: "phiv",
              Φ: "Phi",
              χ: "chi",
              Χ: "Chi",
              ψ: "psi",
              Ψ: "Psi",
              ω: "omega",
              Ω: "ohm",
              а: "acy",
              А: "Acy",
              б: "bcy",
              Б: "Bcy",
              в: "vcy",
              В: "Vcy",
              г: "gcy",
              Г: "Gcy",
              ѓ: "gjcy",
              Ѓ: "GJcy",
              д: "dcy",
              Д: "Dcy",
              ђ: "djcy",
              Ђ: "DJcy",
              е: "iecy",
              Е: "IEcy",
              ё: "iocy",
              Ё: "IOcy",
              є: "jukcy",
              Є: "Jukcy",
              ж: "zhcy",
              Ж: "ZHcy",
              з: "zcy",
              З: "Zcy",
              ѕ: "dscy",
              Ѕ: "DScy",
              и: "icy",
              И: "Icy",
              і: "iukcy",
              І: "Iukcy",
              ї: "yicy",
              Ї: "YIcy",
              й: "jcy",
              Й: "Jcy",
              ј: "jsercy",
              Ј: "Jsercy",
              к: "kcy",
              К: "Kcy",
              ќ: "kjcy",
              Ќ: "KJcy",
              л: "lcy",
              Л: "Lcy",
              љ: "ljcy",
              Љ: "LJcy",
              м: "mcy",
              М: "Mcy",
              н: "ncy",
              Н: "Ncy",
              њ: "njcy",
              Њ: "NJcy",
              о: "ocy",
              О: "Ocy",
              п: "pcy",
              П: "Pcy",
              р: "rcy",
              Р: "Rcy",
              с: "scy",
              С: "Scy",
              т: "tcy",
              Т: "Tcy",
              ћ: "tshcy",
              Ћ: "TSHcy",
              у: "ucy",
              У: "Ucy",
              ў: "ubrcy",
              Ў: "Ubrcy",
              ф: "fcy",
              Ф: "Fcy",
              х: "khcy",
              Х: "KHcy",
              ц: "tscy",
              Ц: "TScy",
              ч: "chcy",
              Ч: "CHcy",
              џ: "dzcy",
              Џ: "DZcy",
              ш: "shcy",
              Ш: "SHcy",
              щ: "shchcy",
              Щ: "SHCHcy",
              ъ: "hardcy",
              Ъ: "HARDcy",
              ы: "ycy",
              Ы: "Ycy",
              ь: "softcy",
              Ь: "SOFTcy",
              э: "ecy",
              Э: "Ecy",
              ю: "yucy",
              Ю: "YUcy",
              я: "yacy",
              Я: "YAcy",
              ℵ: "aleph",
              ℶ: "beth",
              ℷ: "gimel",
              ℸ: "daleth",
            },
            h = /["&'<>`]/g,
            p = {
              '"': "&quot;",
              "&": "&amp;",
              "'": "&#x27;",
              "<": "&lt;",
              ">": "&gt;",
              "`": "&#x60;",
            },
            g = /&#(?:[xX][^a-fA-F0-9]|[^0-9xX])/,
            B =
              /[\0-\x08\x0B\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]|[\uD83F\uD87F\uD8BF\uD8FF\uD93F\uD97F\uD9BF\uD9FF\uDA3F\uDA7F\uDABF\uDAFF\uDB3F\uDB7F\uDBBF\uDBFF][\uDFFE\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,
            x =
              /&(CounterClockwiseContourIntegral|DoubleLongLeftRightArrow|ClockwiseContourIntegral|NotNestedGreaterGreater|NotSquareSupersetEqual|DiacriticalDoubleAcute|NotRightTriangleEqual|NotSucceedsSlantEqual|NotPrecedesSlantEqual|CloseCurlyDoubleQuote|NegativeVeryThinSpace|DoubleContourIntegral|FilledVerySmallSquare|CapitalDifferentialD|OpenCurlyDoubleQuote|EmptyVerySmallSquare|NestedGreaterGreater|DoubleLongRightArrow|NotLeftTriangleEqual|NotGreaterSlantEqual|ReverseUpEquilibrium|DoubleLeftRightArrow|NotSquareSubsetEqual|NotDoubleVerticalBar|RightArrowLeftArrow|NotGreaterFullEqual|NotRightTriangleBar|SquareSupersetEqual|DownLeftRightVector|DoubleLongLeftArrow|leftrightsquigarrow|LeftArrowRightArrow|NegativeMediumSpace|blacktriangleright|RightDownVectorBar|PrecedesSlantEqual|RightDoubleBracket|SucceedsSlantEqual|NotLeftTriangleBar|RightTriangleEqual|SquareIntersection|RightDownTeeVector|ReverseEquilibrium|NegativeThickSpace|longleftrightarrow|Longleftrightarrow|LongLeftRightArrow|DownRightTeeVector|DownRightVectorBar|GreaterSlantEqual|SquareSubsetEqual|LeftDownVectorBar|LeftDoubleBracket|VerticalSeparator|rightleftharpoons|NotGreaterGreater|NotSquareSuperset|blacktriangleleft|blacktriangledown|NegativeThinSpace|LeftDownTeeVector|NotLessSlantEqual|leftrightharpoons|DoubleUpDownArrow|DoubleVerticalBar|LeftTriangleEqual|FilledSmallSquare|twoheadrightarrow|NotNestedLessLess|DownLeftTeeVector|DownLeftVectorBar|RightAngleBracket|NotTildeFullEqual|NotReverseElement|RightUpDownVector|DiacriticalTilde|NotSucceedsTilde|circlearrowright|NotPrecedesEqual|rightharpoondown|DoubleRightArrow|NotSucceedsEqual|NonBreakingSpace|NotRightTriangle|LessEqualGreater|RightUpTeeVector|LeftAngleBracket|GreaterFullEqual|DownArrowUpArrow|RightUpVectorBar|twoheadleftarrow|GreaterEqualLess|downharpoonright|RightTriangleBar|ntrianglerighteq|NotSupersetEqual|LeftUpDownVector|DiacriticalAcute|rightrightarrows|vartriangleright|UpArrowDownArrow|DiacriticalGrave|UnderParenthesis|EmptySmallSquare|LeftUpVectorBar|leftrightarrows|DownRightVector|downharpoonleft|trianglerighteq|ShortRightArrow|OverParenthesis|DoubleLeftArrow|DoubleDownArrow|NotSquareSubset|bigtriangledown|ntrianglelefteq|UpperRightArrow|curvearrowright|vartriangleleft|NotLeftTriangle|nleftrightarrow|LowerRightArrow|NotHumpDownHump|NotGreaterTilde|rightthreetimes|LeftUpTeeVector|NotGreaterEqual|straightepsilon|LeftTriangleBar|rightsquigarrow|ContourIntegral|rightleftarrows|CloseCurlyQuote|RightDownVector|LeftRightVector|nLeftrightarrow|leftharpoondown|circlearrowleft|SquareSuperset|OpenCurlyQuote|hookrightarrow|HorizontalLine|DiacriticalDot|NotLessGreater|ntriangleright|DoubleRightTee|InvisibleComma|InvisibleTimes|LowerLeftArrow|DownLeftVector|NotSubsetEqual|curvearrowleft|trianglelefteq|NotVerticalBar|TildeFullEqual|downdownarrows|NotGreaterLess|RightTeeVector|ZeroWidthSpace|looparrowright|LongRightArrow|doublebarwedge|ShortLeftArrow|ShortDownArrow|RightVectorBar|GreaterGreater|ReverseElement|rightharpoonup|LessSlantEqual|leftthreetimes|upharpoonright|rightarrowtail|LeftDownVector|Longrightarrow|NestedLessLess|UpperLeftArrow|nshortparallel|leftleftarrows|leftrightarrow|Leftrightarrow|LeftRightArrow|longrightarrow|upharpoonleft|RightArrowBar|ApplyFunction|LeftTeeVector|leftarrowtail|NotEqualTilde|varsubsetneqq|varsupsetneqq|RightTeeArrow|SucceedsEqual|SucceedsTilde|LeftVectorBar|SupersetEqual|hookleftarrow|DifferentialD|VerticalTilde|VeryThinSpace|blacktriangle|bigtriangleup|LessFullEqual|divideontimes|leftharpoonup|UpEquilibrium|ntriangleleft|RightTriangle|measuredangle|shortparallel|longleftarrow|Longleftarrow|LongLeftArrow|DoubleLeftTee|Poincareplane|PrecedesEqual|triangleright|DoubleUpArrow|RightUpVector|fallingdotseq|looparrowleft|PrecedesTilde|NotTildeEqual|NotTildeTilde|smallsetminus|Proportional|triangleleft|triangledown|UnderBracket|NotHumpEqual|exponentiale|ExponentialE|NotLessTilde|HilbertSpace|RightCeiling|blacklozenge|varsupsetneq|HumpDownHump|GreaterEqual|VerticalLine|LeftTeeArrow|NotLessEqual|DownTeeArrow|LeftTriangle|varsubsetneq|Intersection|NotCongruent|DownArrowBar|LeftUpVector|LeftArrowBar|risingdotseq|GreaterTilde|RoundImplies|SquareSubset|ShortUpArrow|NotSuperset|quaternions|precnapprox|backepsilon|preccurlyeq|OverBracket|blacksquare|MediumSpace|VerticalBar|circledcirc|circleddash|CircleMinus|CircleTimes|LessGreater|curlyeqprec|curlyeqsucc|diamondsuit|UpDownArrow|Updownarrow|RuleDelayed|Rrightarrow|updownarrow|RightVector|nRightarrow|nrightarrow|eqslantless|LeftCeiling|Equilibrium|SmallCircle|expectation|NotSucceeds|thickapprox|GreaterLess|SquareUnion|NotPrecedes|NotLessLess|straightphi|succnapprox|succcurlyeq|SubsetEqual|sqsupseteq|Proportion|Laplacetrf|ImaginaryI|supsetneqq|NotGreater|gtreqqless|NotElement|ThickSpace|TildeEqual|TildeTilde|Fouriertrf|rmoustache|EqualTilde|eqslantgtr|UnderBrace|LeftVector|UpArrowBar|nLeftarrow|nsubseteqq|subsetneqq|nsupseteqq|nleftarrow|succapprox|lessapprox|UpTeeArrow|upuparrows|curlywedge|lesseqqgtr|varepsilon|varnothing|RightFloor|complement|CirclePlus|sqsubseteq|Lleftarrow|circledast|RightArrow|Rightarrow|rightarrow|lmoustache|Bernoullis|precapprox|mapstoleft|mapstodown|longmapsto|dotsquare|downarrow|DoubleDot|nsubseteq|supsetneq|leftarrow|nsupseteq|subsetneq|ThinSpace|ngeqslant|subseteqq|HumpEqual|NotSubset|triangleq|NotCupCap|lesseqgtr|heartsuit|TripleDot|Leftarrow|Coproduct|Congruent|varpropto|complexes|gvertneqq|LeftArrow|LessTilde|supseteqq|MinusPlus|CircleDot|nleqslant|NotExists|gtreqless|nparallel|UnionPlus|LeftFloor|checkmark|CenterDot|centerdot|Mellintrf|gtrapprox|bigotimes|OverBrace|spadesuit|therefore|pitchfork|rationals|PlusMinus|Backslash|Therefore|DownBreve|backsimeq|backprime|DownArrow|nshortmid|Downarrow|lvertneqq|eqvparsl|imagline|imagpart|infintie|integers|Integral|intercal|LessLess|Uarrocir|intlarhk|sqsupset|angmsdaf|sqsubset|llcorner|vartheta|cupbrcap|lnapprox|Superset|SuchThat|succnsim|succneqq|angmsdag|biguplus|curlyvee|trpezium|Succeeds|NotTilde|bigwedge|angmsdah|angrtvbd|triminus|cwconint|fpartint|lrcorner|smeparsl|subseteq|urcorner|lurdshar|laemptyv|DDotrahd|approxeq|ldrushar|awconint|mapstoup|backcong|shortmid|triangle|geqslant|gesdotol|timesbar|circledR|circledS|setminus|multimap|naturals|scpolint|ncongdot|RightTee|boxminus|gnapprox|boxtimes|andslope|thicksim|angmsdaa|varsigma|cirfnint|rtriltri|angmsdab|rppolint|angmsdac|barwedge|drbkarow|clubsuit|thetasym|bsolhsub|capbrcup|dzigrarr|doteqdot|DotEqual|dotminus|UnderBar|NotEqual|realpart|otimesas|ulcorner|hksearow|hkswarow|parallel|PartialD|elinters|emptyset|plusacir|bbrktbrk|angmsdad|pointint|bigoplus|angmsdae|Precedes|bigsqcup|varkappa|notindot|supseteq|precneqq|precnsim|profalar|profline|profsurf|leqslant|lesdotor|raemptyv|subplus|notnivb|notnivc|subrarr|zigrarr|vzigzag|submult|subedot|Element|between|cirscir|larrbfs|larrsim|lotimes|lbrksld|lbrkslu|lozenge|ldrdhar|dbkarow|bigcirc|epsilon|simrarr|simplus|ltquest|Epsilon|luruhar|gtquest|maltese|npolint|eqcolon|npreceq|bigodot|ddagger|gtrless|bnequiv|harrcir|ddotseq|equivDD|backsim|demptyv|nsqsube|nsqsupe|Upsilon|nsubset|upsilon|minusdu|nsucceq|swarrow|nsupset|coloneq|searrow|boxplus|napprox|natural|asympeq|alefsym|congdot|nearrow|bigstar|diamond|supplus|tritime|LeftTee|nvinfin|triplus|NewLine|nvltrie|nvrtrie|nwarrow|nexists|Diamond|ruluhar|Implies|supmult|angzarr|suplarr|suphsub|questeq|because|digamma|Because|olcross|bemptyv|omicron|Omicron|rotimes|NoBreak|intprod|angrtvb|orderof|uwangle|suphsol|lesdoto|orslope|DownTee|realine|cudarrl|rdldhar|OverBar|supedot|lessdot|supdsub|topfork|succsim|rbrkslu|rbrksld|pertenk|cudarrr|isindot|planckh|lessgtr|pluscir|gesdoto|plussim|plustwo|lesssim|cularrp|rarrsim|Cayleys|notinva|notinvb|notinvc|UpArrow|Uparrow|uparrow|NotLess|dwangle|precsim|Product|curarrm|Cconint|dotplus|rarrbfs|ccupssm|Cedilla|cemptyv|notniva|quatint|frac35|frac38|frac45|frac56|frac58|frac78|tridot|xoplus|gacute|gammad|Gammad|lfisht|lfloor|bigcup|sqsupe|gbreve|Gbreve|lharul|sqsube|sqcups|Gcedil|apacir|llhard|lmidot|Lmidot|lmoust|andand|sqcaps|approx|Abreve|spades|circeq|tprime|divide|topcir|Assign|topbot|gesdot|divonx|xuplus|timesd|gesles|atilde|solbar|SOFTcy|loplus|timesb|lowast|lowbar|dlcorn|dlcrop|softcy|dollar|lparlt|thksim|lrhard|Atilde|lsaquo|smashp|bigvee|thinsp|wreath|bkarow|lsquor|lstrok|Lstrok|lthree|ltimes|ltlarr|DotDot|simdot|ltrPar|weierp|xsqcup|angmsd|sigmav|sigmaf|zeetrf|Zcaron|zcaron|mapsto|vsupne|thetav|cirmid|marker|mcomma|Zacute|vsubnE|there4|gtlPar|vsubne|bottom|gtrarr|SHCHcy|shchcy|midast|midcir|middot|minusb|minusd|gtrdot|bowtie|sfrown|mnplus|models|colone|seswar|Colone|mstpos|searhk|gtrsim|nacute|Nacute|boxbox|telrec|hairsp|Tcedil|nbumpe|scnsim|ncaron|Ncaron|ncedil|Ncedil|hamilt|Scedil|nearhk|hardcy|HARDcy|tcedil|Tcaron|commat|nequiv|nesear|tcaron|target|hearts|nexist|varrho|scedil|Scaron|scaron|hellip|Sacute|sacute|hercon|swnwar|compfn|rtimes|rthree|rsquor|rsaquo|zacute|wedgeq|homtht|barvee|barwed|Barwed|rpargt|horbar|conint|swarhk|roplus|nltrie|hslash|hstrok|Hstrok|rmoust|Conint|bprime|hybull|hyphen|iacute|Iacute|supsup|supsub|supsim|varphi|coprod|brvbar|agrave|Supset|supset|igrave|Igrave|notinE|Agrave|iiiint|iinfin|copysr|wedbar|Verbar|vangrt|becaus|incare|verbar|inodot|bullet|drcorn|intcal|drcrop|cularr|vellip|Utilde|bumpeq|cupcap|dstrok|Dstrok|CupCap|cupcup|cupdot|eacute|Eacute|supdot|iquest|easter|ecaron|Ecaron|ecolon|isinsv|utilde|itilde|Itilde|curarr|succeq|Bumpeq|cacute|ulcrop|nparsl|Cacute|nprcue|egrave|Egrave|nrarrc|nrarrw|subsup|subsub|nrtrie|jsercy|nsccue|Jsercy|kappav|kcedil|Kcedil|subsim|ulcorn|nsimeq|egsdot|veebar|kgreen|capand|elsdot|Subset|subset|curren|aacute|lacute|Lacute|emptyv|ntilde|Ntilde|lagran|lambda|Lambda|capcap|Ugrave|langle|subdot|emsp13|numero|emsp14|nvdash|nvDash|nVdash|nVDash|ugrave|ufisht|nvHarr|larrfs|nvlArr|larrhk|larrlp|larrpl|nvrArr|Udblac|nwarhk|larrtl|nwnear|oacute|Oacute|latail|lAtail|sstarf|lbrace|odblac|Odblac|lbrack|udblac|odsold|eparsl|lcaron|Lcaron|ograve|Ograve|lcedil|Lcedil|Aacute|ssmile|ssetmn|squarf|ldquor|capcup|ominus|cylcty|rharul|eqcirc|dagger|rfloor|rfisht|Dagger|daleth|equals|origof|capdot|equest|dcaron|Dcaron|rdquor|oslash|Oslash|otilde|Otilde|otimes|Otimes|urcrop|Ubreve|ubreve|Yacute|Uacute|uacute|Rcedil|rcedil|urcorn|parsim|Rcaron|Vdashl|rcaron|Tstrok|percnt|period|permil|Exists|yacute|rbrack|rbrace|phmmat|ccaron|Ccaron|planck|ccedil|plankv|tstrok|female|plusdo|plusdu|ffilig|plusmn|ffllig|Ccedil|rAtail|dfisht|bernou|ratail|Rarrtl|rarrtl|angsph|rarrpl|rarrlp|rarrhk|xwedge|xotime|forall|ForAll|Vvdash|vsupnE|preceq|bigcap|frac12|frac13|frac14|primes|rarrfs|prnsim|frac15|Square|frac16|square|lesdot|frac18|frac23|propto|prurel|rarrap|rangle|puncsp|frac25|Racute|qprime|racute|lesges|frac34|abreve|AElig|eqsim|utdot|setmn|urtri|Equal|Uring|seArr|uring|searr|dashv|Dashv|mumap|nabla|iogon|Iogon|sdote|sdotb|scsim|napid|napos|equiv|natur|Acirc|dblac|erarr|nbump|iprod|erDot|ucirc|awint|esdot|angrt|ncong|isinE|scnap|Scirc|scirc|ndash|isins|Ubrcy|nearr|neArr|isinv|nedot|ubrcy|acute|Ycirc|iukcy|Iukcy|xutri|nesim|caret|jcirc|Jcirc|caron|twixt|ddarr|sccue|exist|jmath|sbquo|ngeqq|angst|ccaps|lceil|ngsim|UpTee|delta|Delta|rtrif|nharr|nhArr|nhpar|rtrie|jukcy|Jukcy|kappa|rsquo|Kappa|nlarr|nlArr|TSHcy|rrarr|aogon|Aogon|fflig|xrarr|tshcy|ccirc|nleqq|filig|upsih|nless|dharl|nlsim|fjlig|ropar|nltri|dharr|robrk|roarr|fllig|fltns|roang|rnmid|subnE|subne|lAarr|trisb|Ccirc|acirc|ccups|blank|VDash|forkv|Vdash|langd|cedil|blk12|blk14|laquo|strns|diams|notin|vDash|larrb|blk34|block|disin|uplus|vdash|vBarv|aelig|starf|Wedge|check|xrArr|lates|lbarr|lBarr|notni|lbbrk|bcong|frasl|lbrke|frown|vrtri|vprop|vnsup|gamma|Gamma|wedge|xodot|bdquo|srarr|doteq|ldquo|boxdl|boxdL|gcirc|Gcirc|boxDl|boxDL|boxdr|boxdR|boxDr|TRADE|trade|rlhar|boxDR|vnsub|npart|vltri|rlarr|boxhd|boxhD|nprec|gescc|nrarr|nrArr|boxHd|boxHD|boxhu|boxhU|nrtri|boxHu|clubs|boxHU|times|colon|Colon|gimel|xlArr|Tilde|nsime|tilde|nsmid|nspar|THORN|thorn|xlarr|nsube|nsubE|thkap|xhArr|comma|nsucc|boxul|boxuL|nsupe|nsupE|gneqq|gnsim|boxUl|boxUL|grave|boxur|boxuR|boxUr|boxUR|lescc|angle|bepsi|boxvh|varpi|boxvH|numsp|Theta|gsime|gsiml|theta|boxVh|boxVH|boxvl|gtcir|gtdot|boxvL|boxVl|boxVL|crarr|cross|Cross|nvsim|boxvr|nwarr|nwArr|sqsup|dtdot|Uogon|lhard|lharu|dtrif|ocirc|Ocirc|lhblk|duarr|odash|sqsub|Hacek|sqcup|llarr|duhar|oelig|OElig|ofcir|boxvR|uogon|lltri|boxVr|csube|uuarr|ohbar|csupe|ctdot|olarr|olcir|harrw|oline|sqcap|omacr|Omacr|omega|Omega|boxVR|aleph|lneqq|lnsim|loang|loarr|rharu|lobrk|hcirc|operp|oplus|rhard|Hcirc|orarr|Union|order|ecirc|Ecirc|cuepr|szlig|cuesc|breve|reals|eDDot|Breve|hoarr|lopar|utrif|rdquo|Umacr|umacr|efDot|swArr|ultri|alpha|rceil|ovbar|swarr|Wcirc|wcirc|smtes|smile|bsemi|lrarr|aring|parsl|lrhar|bsime|uhblk|lrtri|cupor|Aring|uharr|uharl|slarr|rbrke|bsolb|lsime|rbbrk|RBarr|lsimg|phone|rBarr|rbarr|icirc|lsquo|Icirc|emacr|Emacr|ratio|simne|plusb|simlE|simgE|simeq|pluse|ltcir|ltdot|empty|xharr|xdtri|iexcl|Alpha|ltrie|rarrw|pound|ltrif|xcirc|bumpe|prcue|bumpE|asymp|amacr|cuvee|Sigma|sigma|iiint|udhar|iiota|ijlig|IJlig|supnE|imacr|Imacr|prime|Prime|image|prnap|eogon|Eogon|rarrc|mdash|mDDot|cuwed|imath|supne|imped|Amacr|udarr|prsim|micro|rarrb|cwint|raquo|infin|eplus|range|rangd|Ucirc|radic|minus|amalg|veeeq|rAarr|epsiv|ycirc|quest|sharp|quot|zwnj|Qscr|race|qscr|Qopf|qopf|qint|rang|Rang|Zscr|zscr|Zopf|zopf|rarr|rArr|Rarr|Pscr|pscr|prop|prod|prnE|prec|ZHcy|zhcy|prap|Zeta|zeta|Popf|popf|Zdot|plus|zdot|Yuml|yuml|phiv|YUcy|yucy|Yscr|yscr|perp|Yopf|yopf|part|para|YIcy|Ouml|rcub|yicy|YAcy|rdca|ouml|osol|Oscr|rdsh|yacy|real|oscr|xvee|andd|rect|andv|Xscr|oror|ordm|ordf|xscr|ange|aopf|Aopf|rHar|Xopf|opar|Oopf|xopf|xnis|rhov|oopf|omid|xmap|oint|apid|apos|ogon|ascr|Ascr|odot|odiv|xcup|xcap|ocir|oast|nvlt|nvle|nvgt|nvge|nvap|Wscr|wscr|auml|ntlg|ntgl|nsup|nsub|nsim|Nscr|nscr|nsce|Wopf|ring|npre|wopf|npar|Auml|Barv|bbrk|Nopf|nopf|nmid|nLtv|beta|ropf|Ropf|Beta|beth|nles|rpar|nleq|bnot|bNot|nldr|NJcy|rscr|Rscr|Vscr|vscr|rsqb|njcy|bopf|nisd|Bopf|rtri|Vopf|nGtv|ngtr|vopf|boxh|boxH|boxv|nges|ngeq|boxV|bscr|scap|Bscr|bsim|Vert|vert|bsol|bull|bump|caps|cdot|ncup|scnE|ncap|nbsp|napE|Cdot|cent|sdot|Vbar|nang|vBar|chcy|Mscr|mscr|sect|semi|CHcy|Mopf|mopf|sext|circ|cire|mldr|mlcp|cirE|comp|shcy|SHcy|vArr|varr|cong|copf|Copf|copy|COPY|malt|male|macr|lvnE|cscr|ltri|sime|ltcc|simg|Cscr|siml|csub|Uuml|lsqb|lsim|uuml|csup|Lscr|lscr|utri|smid|lpar|cups|smte|lozf|darr|Lopf|Uscr|solb|lopf|sopf|Sopf|lneq|uscr|spar|dArr|lnap|Darr|dash|Sqrt|LJcy|ljcy|lHar|dHar|Upsi|upsi|diam|lesg|djcy|DJcy|leqq|dopf|Dopf|dscr|Dscr|dscy|ldsh|ldca|squf|DScy|sscr|Sscr|dsol|lcub|late|star|Star|Uopf|Larr|lArr|larr|uopf|dtri|dzcy|sube|subE|Lang|lang|Kscr|kscr|Kopf|kopf|KJcy|kjcy|KHcy|khcy|DZcy|ecir|edot|eDot|Jscr|jscr|succ|Jopf|jopf|Edot|uHar|emsp|ensp|Iuml|iuml|eopf|isin|Iscr|iscr|Eopf|epar|sung|epsi|escr|sup1|sup2|sup3|Iota|iota|supe|supE|Iopf|iopf|IOcy|iocy|Escr|esim|Esim|imof|Uarr|QUOT|uArr|uarr|euml|IEcy|iecy|Idot|Euml|euro|excl|Hscr|hscr|Hopf|hopf|TScy|tscy|Tscr|hbar|tscr|flat|tbrk|fnof|hArr|harr|half|fopf|Fopf|tdot|gvnE|fork|trie|gtcc|fscr|Fscr|gdot|gsim|Gscr|gscr|Gopf|gopf|gneq|Gdot|tosa|gnap|Topf|topf|geqq|toea|GJcy|gjcy|tint|gesl|mid|Sfr|ggg|top|ges|gla|glE|glj|geq|gne|gEl|gel|gnE|Gcy|gcy|gap|Tfr|tfr|Tcy|tcy|Hat|Tau|Ffr|tau|Tab|hfr|Hfr|ffr|Fcy|fcy|icy|Icy|iff|ETH|eth|ifr|Ifr|Eta|eta|int|Int|Sup|sup|ucy|Ucy|Sum|sum|jcy|ENG|ufr|Ufr|eng|Jcy|jfr|els|ell|egs|Efr|efr|Jfr|uml|kcy|Kcy|Ecy|ecy|kfr|Kfr|lap|Sub|sub|lat|lcy|Lcy|leg|Dot|dot|lEg|leq|les|squ|div|die|lfr|Lfr|lgE|Dfr|dfr|Del|deg|Dcy|dcy|lne|lnE|sol|loz|smt|Cup|lrm|cup|lsh|Lsh|sim|shy|map|Map|mcy|Mcy|mfr|Mfr|mho|gfr|Gfr|sfr|cir|Chi|chi|nap|Cfr|vcy|Vcy|cfr|Scy|scy|ncy|Ncy|vee|Vee|Cap|cap|nfr|scE|sce|Nfr|nge|ngE|nGg|vfr|Vfr|ngt|bot|nGt|nis|niv|Rsh|rsh|nle|nlE|bne|Bfr|bfr|nLl|nlt|nLt|Bcy|bcy|not|Not|rlm|wfr|Wfr|npr|nsc|num|ocy|ast|Ocy|ofr|xfr|Xfr|Ofr|ogt|ohm|apE|olt|Rho|ape|rho|Rfr|rfr|ord|REG|ang|reg|orv|And|and|AMP|Rcy|amp|Afr|ycy|Ycy|yen|yfr|Yfr|rcy|par|pcy|Pcy|pfr|Pfr|phi|Phi|afr|Acy|acy|zcy|Zcy|piv|acE|acd|zfr|Zfr|pre|prE|psi|Psi|qfr|Qfr|zwj|Or|ge|Gg|gt|gg|el|oS|lt|Lt|LT|Re|lg|gl|eg|ne|Im|it|le|DD|wp|wr|nu|Nu|dd|lE|Sc|sc|pi|Pi|ee|af|ll|Ll|rx|gE|xi|pm|Xi|ic|pr|Pr|in|ni|mp|mu|ac|Mu|or|ap|Gt|GT|ii);|&(Aacute|Agrave|Atilde|Ccedil|Eacute|Egrave|Iacute|Igrave|Ntilde|Oacute|Ograve|Oslash|Otilde|Uacute|Ugrave|Yacute|aacute|agrave|atilde|brvbar|ccedil|curren|divide|eacute|egrave|frac12|frac14|frac34|iacute|igrave|iquest|middot|ntilde|oacute|ograve|oslash|otilde|plusmn|uacute|ugrave|yacute|AElig|Acirc|Aring|Ecirc|Icirc|Ocirc|THORN|Ucirc|acirc|acute|aelig|aring|cedil|ecirc|icirc|iexcl|laquo|micro|ocirc|pound|raquo|szlig|thorn|times|ucirc|Auml|COPY|Euml|Iuml|Ouml|QUOT|Uuml|auml|cent|copy|euml|iuml|macr|nbsp|ordf|ordm|ouml|para|quot|sect|sup1|sup2|sup3|uuml|yuml|AMP|ETH|REG|amp|deg|eth|not|reg|shy|uml|yen|GT|LT|gt|lt)(?!;)([=a-zA-Z0-9]?)|&#([0-9]+)(;?)|&#[xX]([a-fA-F0-9]+)(;?)|&([0-9a-zA-Z]+)/g,
            y = {
              aacute: "á",
              Aacute: "Á",
              abreve: "ă",
              Abreve: "Ă",
              ac: "∾",
              acd: "∿",
              acE: "∾̳",
              acirc: "â",
              Acirc: "Â",
              acute: "´",
              acy: "а",
              Acy: "А",
              aelig: "æ",
              AElig: "Æ",
              af: "⁡",
              afr: "𝔞",
              Afr: "𝔄",
              agrave: "à",
              Agrave: "À",
              alefsym: "ℵ",
              aleph: "ℵ",
              alpha: "α",
              Alpha: "Α",
              amacr: "ā",
              Amacr: "Ā",
              amalg: "⨿",
              amp: "&",
              AMP: "&",
              and: "∧",
              And: "⩓",
              andand: "⩕",
              andd: "⩜",
              andslope: "⩘",
              andv: "⩚",
              ang: "∠",
              ange: "⦤",
              angle: "∠",
              angmsd: "∡",
              angmsdaa: "⦨",
              angmsdab: "⦩",
              angmsdac: "⦪",
              angmsdad: "⦫",
              angmsdae: "⦬",
              angmsdaf: "⦭",
              angmsdag: "⦮",
              angmsdah: "⦯",
              angrt: "∟",
              angrtvb: "⊾",
              angrtvbd: "⦝",
              angsph: "∢",
              angst: "Å",
              angzarr: "⍼",
              aogon: "ą",
              Aogon: "Ą",
              aopf: "𝕒",
              Aopf: "𝔸",
              ap: "≈",
              apacir: "⩯",
              ape: "≊",
              apE: "⩰",
              apid: "≋",
              apos: "'",
              ApplyFunction: "⁡",
              approx: "≈",
              approxeq: "≊",
              aring: "å",
              Aring: "Å",
              ascr: "𝒶",
              Ascr: "𝒜",
              Assign: "≔",
              ast: "*",
              asymp: "≈",
              asympeq: "≍",
              atilde: "ã",
              Atilde: "Ã",
              auml: "ä",
              Auml: "Ä",
              awconint: "∳",
              awint: "⨑",
              backcong: "≌",
              backepsilon: "϶",
              backprime: "‵",
              backsim: "∽",
              backsimeq: "⋍",
              Backslash: "∖",
              Barv: "⫧",
              barvee: "⊽",
              barwed: "⌅",
              Barwed: "⌆",
              barwedge: "⌅",
              bbrk: "⎵",
              bbrktbrk: "⎶",
              bcong: "≌",
              bcy: "б",
              Bcy: "Б",
              bdquo: "„",
              becaus: "∵",
              because: "∵",
              Because: "∵",
              bemptyv: "⦰",
              bepsi: "϶",
              bernou: "ℬ",
              Bernoullis: "ℬ",
              beta: "β",
              Beta: "Β",
              beth: "ℶ",
              between: "≬",
              bfr: "𝔟",
              Bfr: "𝔅",
              bigcap: "⋂",
              bigcirc: "◯",
              bigcup: "⋃",
              bigodot: "⨀",
              bigoplus: "⨁",
              bigotimes: "⨂",
              bigsqcup: "⨆",
              bigstar: "★",
              bigtriangledown: "▽",
              bigtriangleup: "△",
              biguplus: "⨄",
              bigvee: "⋁",
              bigwedge: "⋀",
              bkarow: "⤍",
              blacklozenge: "⧫",
              blacksquare: "▪",
              blacktriangle: "▴",
              blacktriangledown: "▾",
              blacktriangleleft: "◂",
              blacktriangleright: "▸",
              blank: "␣",
              blk12: "▒",
              blk14: "░",
              blk34: "▓",
              block: "█",
              bne: "=⃥",
              bnequiv: "≡⃥",
              bnot: "⌐",
              bNot: "⫭",
              bopf: "𝕓",
              Bopf: "𝔹",
              bot: "⊥",
              bottom: "⊥",
              bowtie: "⋈",
              boxbox: "⧉",
              boxdl: "┐",
              boxdL: "╕",
              boxDl: "╖",
              boxDL: "╗",
              boxdr: "┌",
              boxdR: "╒",
              boxDr: "╓",
              boxDR: "╔",
              boxh: "─",
              boxH: "═",
              boxhd: "┬",
              boxhD: "╥",
              boxHd: "╤",
              boxHD: "╦",
              boxhu: "┴",
              boxhU: "╨",
              boxHu: "╧",
              boxHU: "╩",
              boxminus: "⊟",
              boxplus: "⊞",
              boxtimes: "⊠",
              boxul: "┘",
              boxuL: "╛",
              boxUl: "╜",
              boxUL: "╝",
              boxur: "└",
              boxuR: "╘",
              boxUr: "╙",
              boxUR: "╚",
              boxv: "│",
              boxV: "║",
              boxvh: "┼",
              boxvH: "╪",
              boxVh: "╫",
              boxVH: "╬",
              boxvl: "┤",
              boxvL: "╡",
              boxVl: "╢",
              boxVL: "╣",
              boxvr: "├",
              boxvR: "╞",
              boxVr: "╟",
              boxVR: "╠",
              bprime: "‵",
              breve: "˘",
              Breve: "˘",
              brvbar: "¦",
              bscr: "𝒷",
              Bscr: "ℬ",
              bsemi: "⁏",
              bsim: "∽",
              bsime: "⋍",
              bsol: "\\",
              bsolb: "⧅",
              bsolhsub: "⟈",
              bull: "•",
              bullet: "•",
              bump: "≎",
              bumpe: "≏",
              bumpE: "⪮",
              bumpeq: "≏",
              Bumpeq: "≎",
              cacute: "ć",
              Cacute: "Ć",
              cap: "∩",
              Cap: "⋒",
              capand: "⩄",
              capbrcup: "⩉",
              capcap: "⩋",
              capcup: "⩇",
              capdot: "⩀",
              CapitalDifferentialD: "ⅅ",
              caps: "∩︀",
              caret: "⁁",
              caron: "ˇ",
              Cayleys: "ℭ",
              ccaps: "⩍",
              ccaron: "č",
              Ccaron: "Č",
              ccedil: "ç",
              Ccedil: "Ç",
              ccirc: "ĉ",
              Ccirc: "Ĉ",
              Cconint: "∰",
              ccups: "⩌",
              ccupssm: "⩐",
              cdot: "ċ",
              Cdot: "Ċ",
              cedil: "¸",
              Cedilla: "¸",
              cemptyv: "⦲",
              cent: "¢",
              centerdot: "·",
              CenterDot: "·",
              cfr: "𝔠",
              Cfr: "ℭ",
              chcy: "ч",
              CHcy: "Ч",
              check: "✓",
              checkmark: "✓",
              chi: "χ",
              Chi: "Χ",
              cir: "○",
              circ: "ˆ",
              circeq: "≗",
              circlearrowleft: "↺",
              circlearrowright: "↻",
              circledast: "⊛",
              circledcirc: "⊚",
              circleddash: "⊝",
              CircleDot: "⊙",
              circledR: "®",
              circledS: "Ⓢ",
              CircleMinus: "⊖",
              CirclePlus: "⊕",
              CircleTimes: "⊗",
              cire: "≗",
              cirE: "⧃",
              cirfnint: "⨐",
              cirmid: "⫯",
              cirscir: "⧂",
              ClockwiseContourIntegral: "∲",
              CloseCurlyDoubleQuote: "”",
              CloseCurlyQuote: "’",
              clubs: "♣",
              clubsuit: "♣",
              colon: ":",
              Colon: "∷",
              colone: "≔",
              Colone: "⩴",
              coloneq: "≔",
              comma: ",",
              commat: "@",
              comp: "∁",
              compfn: "∘",
              complement: "∁",
              complexes: "ℂ",
              cong: "≅",
              congdot: "⩭",
              Congruent: "≡",
              conint: "∮",
              Conint: "∯",
              ContourIntegral: "∮",
              copf: "𝕔",
              Copf: "ℂ",
              coprod: "∐",
              Coproduct: "∐",
              copy: "©",
              COPY: "©",
              copysr: "℗",
              CounterClockwiseContourIntegral: "∳",
              crarr: "↵",
              cross: "✗",
              Cross: "⨯",
              cscr: "𝒸",
              Cscr: "𝒞",
              csub: "⫏",
              csube: "⫑",
              csup: "⫐",
              csupe: "⫒",
              ctdot: "⋯",
              cudarrl: "⤸",
              cudarrr: "⤵",
              cuepr: "⋞",
              cuesc: "⋟",
              cularr: "↶",
              cularrp: "⤽",
              cup: "∪",
              Cup: "⋓",
              cupbrcap: "⩈",
              cupcap: "⩆",
              CupCap: "≍",
              cupcup: "⩊",
              cupdot: "⊍",
              cupor: "⩅",
              cups: "∪︀",
              curarr: "↷",
              curarrm: "⤼",
              curlyeqprec: "⋞",
              curlyeqsucc: "⋟",
              curlyvee: "⋎",
              curlywedge: "⋏",
              curren: "¤",
              curvearrowleft: "↶",
              curvearrowright: "↷",
              cuvee: "⋎",
              cuwed: "⋏",
              cwconint: "∲",
              cwint: "∱",
              cylcty: "⌭",
              dagger: "†",
              Dagger: "‡",
              daleth: "ℸ",
              darr: "↓",
              dArr: "⇓",
              Darr: "↡",
              dash: "‐",
              dashv: "⊣",
              Dashv: "⫤",
              dbkarow: "⤏",
              dblac: "˝",
              dcaron: "ď",
              Dcaron: "Ď",
              dcy: "д",
              Dcy: "Д",
              dd: "ⅆ",
              DD: "ⅅ",
              ddagger: "‡",
              ddarr: "⇊",
              DDotrahd: "⤑",
              ddotseq: "⩷",
              deg: "°",
              Del: "∇",
              delta: "δ",
              Delta: "Δ",
              demptyv: "⦱",
              dfisht: "⥿",
              dfr: "𝔡",
              Dfr: "𝔇",
              dHar: "⥥",
              dharl: "⇃",
              dharr: "⇂",
              DiacriticalAcute: "´",
              DiacriticalDot: "˙",
              DiacriticalDoubleAcute: "˝",
              DiacriticalGrave: "`",
              DiacriticalTilde: "˜",
              diam: "⋄",
              diamond: "⋄",
              Diamond: "⋄",
              diamondsuit: "♦",
              diams: "♦",
              die: "¨",
              DifferentialD: "ⅆ",
              digamma: "ϝ",
              disin: "⋲",
              div: "÷",
              divide: "÷",
              divideontimes: "⋇",
              divonx: "⋇",
              djcy: "ђ",
              DJcy: "Ђ",
              dlcorn: "⌞",
              dlcrop: "⌍",
              dollar: "$",
              dopf: "𝕕",
              Dopf: "𝔻",
              dot: "˙",
              Dot: "¨",
              DotDot: "⃜",
              doteq: "≐",
              doteqdot: "≑",
              DotEqual: "≐",
              dotminus: "∸",
              dotplus: "∔",
              dotsquare: "⊡",
              doublebarwedge: "⌆",
              DoubleContourIntegral: "∯",
              DoubleDot: "¨",
              DoubleDownArrow: "⇓",
              DoubleLeftArrow: "⇐",
              DoubleLeftRightArrow: "⇔",
              DoubleLeftTee: "⫤",
              DoubleLongLeftArrow: "⟸",
              DoubleLongLeftRightArrow: "⟺",
              DoubleLongRightArrow: "⟹",
              DoubleRightArrow: "⇒",
              DoubleRightTee: "⊨",
              DoubleUpArrow: "⇑",
              DoubleUpDownArrow: "⇕",
              DoubleVerticalBar: "∥",
              downarrow: "↓",
              Downarrow: "⇓",
              DownArrow: "↓",
              DownArrowBar: "⤓",
              DownArrowUpArrow: "⇵",
              DownBreve: "̑",
              downdownarrows: "⇊",
              downharpoonleft: "⇃",
              downharpoonright: "⇂",
              DownLeftRightVector: "⥐",
              DownLeftTeeVector: "⥞",
              DownLeftVector: "↽",
              DownLeftVectorBar: "⥖",
              DownRightTeeVector: "⥟",
              DownRightVector: "⇁",
              DownRightVectorBar: "⥗",
              DownTee: "⊤",
              DownTeeArrow: "↧",
              drbkarow: "⤐",
              drcorn: "⌟",
              drcrop: "⌌",
              dscr: "𝒹",
              Dscr: "𝒟",
              dscy: "ѕ",
              DScy: "Ѕ",
              dsol: "⧶",
              dstrok: "đ",
              Dstrok: "Đ",
              dtdot: "⋱",
              dtri: "▿",
              dtrif: "▾",
              duarr: "⇵",
              duhar: "⥯",
              dwangle: "⦦",
              dzcy: "џ",
              DZcy: "Џ",
              dzigrarr: "⟿",
              eacute: "é",
              Eacute: "É",
              easter: "⩮",
              ecaron: "ě",
              Ecaron: "Ě",
              ecir: "≖",
              ecirc: "ê",
              Ecirc: "Ê",
              ecolon: "≕",
              ecy: "э",
              Ecy: "Э",
              eDDot: "⩷",
              edot: "ė",
              eDot: "≑",
              Edot: "Ė",
              ee: "ⅇ",
              efDot: "≒",
              efr: "𝔢",
              Efr: "𝔈",
              eg: "⪚",
              egrave: "è",
              Egrave: "È",
              egs: "⪖",
              egsdot: "⪘",
              el: "⪙",
              Element: "∈",
              elinters: "⏧",
              ell: "ℓ",
              els: "⪕",
              elsdot: "⪗",
              emacr: "ē",
              Emacr: "Ē",
              empty: "∅",
              emptyset: "∅",
              EmptySmallSquare: "◻",
              emptyv: "∅",
              EmptyVerySmallSquare: "▫",
              emsp: " ",
              emsp13: " ",
              emsp14: " ",
              eng: "ŋ",
              ENG: "Ŋ",
              ensp: " ",
              eogon: "ę",
              Eogon: "Ę",
              eopf: "𝕖",
              Eopf: "𝔼",
              epar: "⋕",
              eparsl: "⧣",
              eplus: "⩱",
              epsi: "ε",
              epsilon: "ε",
              Epsilon: "Ε",
              epsiv: "ϵ",
              eqcirc: "≖",
              eqcolon: "≕",
              eqsim: "≂",
              eqslantgtr: "⪖",
              eqslantless: "⪕",
              Equal: "⩵",
              equals: "=",
              EqualTilde: "≂",
              equest: "≟",
              Equilibrium: "⇌",
              equiv: "≡",
              equivDD: "⩸",
              eqvparsl: "⧥",
              erarr: "⥱",
              erDot: "≓",
              escr: "ℯ",
              Escr: "ℰ",
              esdot: "≐",
              esim: "≂",
              Esim: "⩳",
              eta: "η",
              Eta: "Η",
              eth: "ð",
              ETH: "Ð",
              euml: "ë",
              Euml: "Ë",
              euro: "€",
              excl: "!",
              exist: "∃",
              Exists: "∃",
              expectation: "ℰ",
              exponentiale: "ⅇ",
              ExponentialE: "ⅇ",
              fallingdotseq: "≒",
              fcy: "ф",
              Fcy: "Ф",
              female: "♀",
              ffilig: "ﬃ",
              fflig: "ﬀ",
              ffllig: "ﬄ",
              ffr: "𝔣",
              Ffr: "𝔉",
              filig: "ﬁ",
              FilledSmallSquare: "◼",
              FilledVerySmallSquare: "▪",
              fjlig: "fj",
              flat: "♭",
              fllig: "ﬂ",
              fltns: "▱",
              fnof: "ƒ",
              fopf: "𝕗",
              Fopf: "𝔽",
              forall: "∀",
              ForAll: "∀",
              fork: "⋔",
              forkv: "⫙",
              Fouriertrf: "ℱ",
              fpartint: "⨍",
              frac12: "½",
              frac13: "⅓",
              frac14: "¼",
              frac15: "⅕",
              frac16: "⅙",
              frac18: "⅛",
              frac23: "⅔",
              frac25: "⅖",
              frac34: "¾",
              frac35: "⅗",
              frac38: "⅜",
              frac45: "⅘",
              frac56: "⅚",
              frac58: "⅝",
              frac78: "⅞",
              frasl: "⁄",
              frown: "⌢",
              fscr: "𝒻",
              Fscr: "ℱ",
              gacute: "ǵ",
              gamma: "γ",
              Gamma: "Γ",
              gammad: "ϝ",
              Gammad: "Ϝ",
              gap: "⪆",
              gbreve: "ğ",
              Gbreve: "Ğ",
              Gcedil: "Ģ",
              gcirc: "ĝ",
              Gcirc: "Ĝ",
              gcy: "г",
              Gcy: "Г",
              gdot: "ġ",
              Gdot: "Ġ",
              ge: "≥",
              gE: "≧",
              gel: "⋛",
              gEl: "⪌",
              geq: "≥",
              geqq: "≧",
              geqslant: "⩾",
              ges: "⩾",
              gescc: "⪩",
              gesdot: "⪀",
              gesdoto: "⪂",
              gesdotol: "⪄",
              gesl: "⋛︀",
              gesles: "⪔",
              gfr: "𝔤",
              Gfr: "𝔊",
              gg: "≫",
              Gg: "⋙",
              ggg: "⋙",
              gimel: "ℷ",
              gjcy: "ѓ",
              GJcy: "Ѓ",
              gl: "≷",
              gla: "⪥",
              glE: "⪒",
              glj: "⪤",
              gnap: "⪊",
              gnapprox: "⪊",
              gne: "⪈",
              gnE: "≩",
              gneq: "⪈",
              gneqq: "≩",
              gnsim: "⋧",
              gopf: "𝕘",
              Gopf: "𝔾",
              grave: "`",
              GreaterEqual: "≥",
              GreaterEqualLess: "⋛",
              GreaterFullEqual: "≧",
              GreaterGreater: "⪢",
              GreaterLess: "≷",
              GreaterSlantEqual: "⩾",
              GreaterTilde: "≳",
              gscr: "ℊ",
              Gscr: "𝒢",
              gsim: "≳",
              gsime: "⪎",
              gsiml: "⪐",
              gt: ">",
              Gt: "≫",
              GT: ">",
              gtcc: "⪧",
              gtcir: "⩺",
              gtdot: "⋗",
              gtlPar: "⦕",
              gtquest: "⩼",
              gtrapprox: "⪆",
              gtrarr: "⥸",
              gtrdot: "⋗",
              gtreqless: "⋛",
              gtreqqless: "⪌",
              gtrless: "≷",
              gtrsim: "≳",
              gvertneqq: "≩︀",
              gvnE: "≩︀",
              Hacek: "ˇ",
              hairsp: " ",
              half: "½",
              hamilt: "ℋ",
              hardcy: "ъ",
              HARDcy: "Ъ",
              harr: "↔",
              hArr: "⇔",
              harrcir: "⥈",
              harrw: "↭",
              Hat: "^",
              hbar: "ℏ",
              hcirc: "ĥ",
              Hcirc: "Ĥ",
              hearts: "♥",
              heartsuit: "♥",
              hellip: "…",
              hercon: "⊹",
              hfr: "𝔥",
              Hfr: "ℌ",
              HilbertSpace: "ℋ",
              hksearow: "⤥",
              hkswarow: "⤦",
              hoarr: "⇿",
              homtht: "∻",
              hookleftarrow: "↩",
              hookrightarrow: "↪",
              hopf: "𝕙",
              Hopf: "ℍ",
              horbar: "―",
              HorizontalLine: "─",
              hscr: "𝒽",
              Hscr: "ℋ",
              hslash: "ℏ",
              hstrok: "ħ",
              Hstrok: "Ħ",
              HumpDownHump: "≎",
              HumpEqual: "≏",
              hybull: "⁃",
              hyphen: "‐",
              iacute: "í",
              Iacute: "Í",
              ic: "⁣",
              icirc: "î",
              Icirc: "Î",
              icy: "и",
              Icy: "И",
              Idot: "İ",
              iecy: "е",
              IEcy: "Е",
              iexcl: "¡",
              iff: "⇔",
              ifr: "𝔦",
              Ifr: "ℑ",
              igrave: "ì",
              Igrave: "Ì",
              ii: "ⅈ",
              iiiint: "⨌",
              iiint: "∭",
              iinfin: "⧜",
              iiota: "℩",
              ijlig: "ĳ",
              IJlig: "Ĳ",
              Im: "ℑ",
              imacr: "ī",
              Imacr: "Ī",
              image: "ℑ",
              ImaginaryI: "ⅈ",
              imagline: "ℐ",
              imagpart: "ℑ",
              imath: "ı",
              imof: "⊷",
              imped: "Ƶ",
              Implies: "⇒",
              in: "∈",
              incare: "℅",
              infin: "∞",
              infintie: "⧝",
              inodot: "ı",
              int: "∫",
              Int: "∬",
              intcal: "⊺",
              integers: "ℤ",
              Integral: "∫",
              intercal: "⊺",
              Intersection: "⋂",
              intlarhk: "⨗",
              intprod: "⨼",
              InvisibleComma: "⁣",
              InvisibleTimes: "⁢",
              iocy: "ё",
              IOcy: "Ё",
              iogon: "į",
              Iogon: "Į",
              iopf: "𝕚",
              Iopf: "𝕀",
              iota: "ι",
              Iota: "Ι",
              iprod: "⨼",
              iquest: "¿",
              iscr: "𝒾",
              Iscr: "ℐ",
              isin: "∈",
              isindot: "⋵",
              isinE: "⋹",
              isins: "⋴",
              isinsv: "⋳",
              isinv: "∈",
              it: "⁢",
              itilde: "ĩ",
              Itilde: "Ĩ",
              iukcy: "і",
              Iukcy: "І",
              iuml: "ï",
              Iuml: "Ï",
              jcirc: "ĵ",
              Jcirc: "Ĵ",
              jcy: "й",
              Jcy: "Й",
              jfr: "𝔧",
              Jfr: "𝔍",
              jmath: "ȷ",
              jopf: "𝕛",
              Jopf: "𝕁",
              jscr: "𝒿",
              Jscr: "𝒥",
              jsercy: "ј",
              Jsercy: "Ј",
              jukcy: "є",
              Jukcy: "Є",
              kappa: "κ",
              Kappa: "Κ",
              kappav: "ϰ",
              kcedil: "ķ",
              Kcedil: "Ķ",
              kcy: "к",
              Kcy: "К",
              kfr: "𝔨",
              Kfr: "𝔎",
              kgreen: "ĸ",
              khcy: "х",
              KHcy: "Х",
              kjcy: "ќ",
              KJcy: "Ќ",
              kopf: "𝕜",
              Kopf: "𝕂",
              kscr: "𝓀",
              Kscr: "𝒦",
              lAarr: "⇚",
              lacute: "ĺ",
              Lacute: "Ĺ",
              laemptyv: "⦴",
              lagran: "ℒ",
              lambda: "λ",
              Lambda: "Λ",
              lang: "⟨",
              Lang: "⟪",
              langd: "⦑",
              langle: "⟨",
              lap: "⪅",
              Laplacetrf: "ℒ",
              laquo: "«",
              larr: "←",
              lArr: "⇐",
              Larr: "↞",
              larrb: "⇤",
              larrbfs: "⤟",
              larrfs: "⤝",
              larrhk: "↩",
              larrlp: "↫",
              larrpl: "⤹",
              larrsim: "⥳",
              larrtl: "↢",
              lat: "⪫",
              latail: "⤙",
              lAtail: "⤛",
              late: "⪭",
              lates: "⪭︀",
              lbarr: "⤌",
              lBarr: "⤎",
              lbbrk: "❲",
              lbrace: "{",
              lbrack: "[",
              lbrke: "⦋",
              lbrksld: "⦏",
              lbrkslu: "⦍",
              lcaron: "ľ",
              Lcaron: "Ľ",
              lcedil: "ļ",
              Lcedil: "Ļ",
              lceil: "⌈",
              lcub: "{",
              lcy: "л",
              Lcy: "Л",
              ldca: "⤶",
              ldquo: "“",
              ldquor: "„",
              ldrdhar: "⥧",
              ldrushar: "⥋",
              ldsh: "↲",
              le: "≤",
              lE: "≦",
              LeftAngleBracket: "⟨",
              leftarrow: "←",
              Leftarrow: "⇐",
              LeftArrow: "←",
              LeftArrowBar: "⇤",
              LeftArrowRightArrow: "⇆",
              leftarrowtail: "↢",
              LeftCeiling: "⌈",
              LeftDoubleBracket: "⟦",
              LeftDownTeeVector: "⥡",
              LeftDownVector: "⇃",
              LeftDownVectorBar: "⥙",
              LeftFloor: "⌊",
              leftharpoondown: "↽",
              leftharpoonup: "↼",
              leftleftarrows: "⇇",
              leftrightarrow: "↔",
              Leftrightarrow: "⇔",
              LeftRightArrow: "↔",
              leftrightarrows: "⇆",
              leftrightharpoons: "⇋",
              leftrightsquigarrow: "↭",
              LeftRightVector: "⥎",
              LeftTee: "⊣",
              LeftTeeArrow: "↤",
              LeftTeeVector: "⥚",
              leftthreetimes: "⋋",
              LeftTriangle: "⊲",
              LeftTriangleBar: "⧏",
              LeftTriangleEqual: "⊴",
              LeftUpDownVector: "⥑",
              LeftUpTeeVector: "⥠",
              LeftUpVector: "↿",
              LeftUpVectorBar: "⥘",
              LeftVector: "↼",
              LeftVectorBar: "⥒",
              leg: "⋚",
              lEg: "⪋",
              leq: "≤",
              leqq: "≦",
              leqslant: "⩽",
              les: "⩽",
              lescc: "⪨",
              lesdot: "⩿",
              lesdoto: "⪁",
              lesdotor: "⪃",
              lesg: "⋚︀",
              lesges: "⪓",
              lessapprox: "⪅",
              lessdot: "⋖",
              lesseqgtr: "⋚",
              lesseqqgtr: "⪋",
              LessEqualGreater: "⋚",
              LessFullEqual: "≦",
              LessGreater: "≶",
              lessgtr: "≶",
              LessLess: "⪡",
              lesssim: "≲",
              LessSlantEqual: "⩽",
              LessTilde: "≲",
              lfisht: "⥼",
              lfloor: "⌊",
              lfr: "𝔩",
              Lfr: "𝔏",
              lg: "≶",
              lgE: "⪑",
              lHar: "⥢",
              lhard: "↽",
              lharu: "↼",
              lharul: "⥪",
              lhblk: "▄",
              ljcy: "љ",
              LJcy: "Љ",
              ll: "≪",
              Ll: "⋘",
              llarr: "⇇",
              llcorner: "⌞",
              Lleftarrow: "⇚",
              llhard: "⥫",
              lltri: "◺",
              lmidot: "ŀ",
              Lmidot: "Ŀ",
              lmoust: "⎰",
              lmoustache: "⎰",
              lnap: "⪉",
              lnapprox: "⪉",
              lne: "⪇",
              lnE: "≨",
              lneq: "⪇",
              lneqq: "≨",
              lnsim: "⋦",
              loang: "⟬",
              loarr: "⇽",
              lobrk: "⟦",
              longleftarrow: "⟵",
              Longleftarrow: "⟸",
              LongLeftArrow: "⟵",
              longleftrightarrow: "⟷",
              Longleftrightarrow: "⟺",
              LongLeftRightArrow: "⟷",
              longmapsto: "⟼",
              longrightarrow: "⟶",
              Longrightarrow: "⟹",
              LongRightArrow: "⟶",
              looparrowleft: "↫",
              looparrowright: "↬",
              lopar: "⦅",
              lopf: "𝕝",
              Lopf: "𝕃",
              loplus: "⨭",
              lotimes: "⨴",
              lowast: "∗",
              lowbar: "_",
              LowerLeftArrow: "↙",
              LowerRightArrow: "↘",
              loz: "◊",
              lozenge: "◊",
              lozf: "⧫",
              lpar: "(",
              lparlt: "⦓",
              lrarr: "⇆",
              lrcorner: "⌟",
              lrhar: "⇋",
              lrhard: "⥭",
              lrm: "‎",
              lrtri: "⊿",
              lsaquo: "‹",
              lscr: "𝓁",
              Lscr: "ℒ",
              lsh: "↰",
              Lsh: "↰",
              lsim: "≲",
              lsime: "⪍",
              lsimg: "⪏",
              lsqb: "[",
              lsquo: "‘",
              lsquor: "‚",
              lstrok: "ł",
              Lstrok: "Ł",
              lt: "<",
              Lt: "≪",
              LT: "<",
              ltcc: "⪦",
              ltcir: "⩹",
              ltdot: "⋖",
              lthree: "⋋",
              ltimes: "⋉",
              ltlarr: "⥶",
              ltquest: "⩻",
              ltri: "◃",
              ltrie: "⊴",
              ltrif: "◂",
              ltrPar: "⦖",
              lurdshar: "⥊",
              luruhar: "⥦",
              lvertneqq: "≨︀",
              lvnE: "≨︀",
              macr: "¯",
              male: "♂",
              malt: "✠",
              maltese: "✠",
              map: "↦",
              Map: "⤅",
              mapsto: "↦",
              mapstodown: "↧",
              mapstoleft: "↤",
              mapstoup: "↥",
              marker: "▮",
              mcomma: "⨩",
              mcy: "м",
              Mcy: "М",
              mdash: "—",
              mDDot: "∺",
              measuredangle: "∡",
              MediumSpace: " ",
              Mellintrf: "ℳ",
              mfr: "𝔪",
              Mfr: "𝔐",
              mho: "℧",
              micro: "µ",
              mid: "∣",
              midast: "*",
              midcir: "⫰",
              middot: "·",
              minus: "−",
              minusb: "⊟",
              minusd: "∸",
              minusdu: "⨪",
              MinusPlus: "∓",
              mlcp: "⫛",
              mldr: "…",
              mnplus: "∓",
              models: "⊧",
              mopf: "𝕞",
              Mopf: "𝕄",
              mp: "∓",
              mscr: "𝓂",
              Mscr: "ℳ",
              mstpos: "∾",
              mu: "μ",
              Mu: "Μ",
              multimap: "⊸",
              mumap: "⊸",
              nabla: "∇",
              nacute: "ń",
              Nacute: "Ń",
              nang: "∠⃒",
              nap: "≉",
              napE: "⩰̸",
              napid: "≋̸",
              napos: "ŉ",
              napprox: "≉",
              natur: "♮",
              natural: "♮",
              naturals: "ℕ",
              nbsp: " ",
              nbump: "≎̸",
              nbumpe: "≏̸",
              ncap: "⩃",
              ncaron: "ň",
              Ncaron: "Ň",
              ncedil: "ņ",
              Ncedil: "Ņ",
              ncong: "≇",
              ncongdot: "⩭̸",
              ncup: "⩂",
              ncy: "н",
              Ncy: "Н",
              ndash: "–",
              ne: "≠",
              nearhk: "⤤",
              nearr: "↗",
              neArr: "⇗",
              nearrow: "↗",
              nedot: "≐̸",
              NegativeMediumSpace: "​",
              NegativeThickSpace: "​",
              NegativeThinSpace: "​",
              NegativeVeryThinSpace: "​",
              nequiv: "≢",
              nesear: "⤨",
              nesim: "≂̸",
              NestedGreaterGreater: "≫",
              NestedLessLess: "≪",
              NewLine: `
`,
              nexist: "∄",
              nexists: "∄",
              nfr: "𝔫",
              Nfr: "𝔑",
              nge: "≱",
              ngE: "≧̸",
              ngeq: "≱",
              ngeqq: "≧̸",
              ngeqslant: "⩾̸",
              nges: "⩾̸",
              nGg: "⋙̸",
              ngsim: "≵",
              ngt: "≯",
              nGt: "≫⃒",
              ngtr: "≯",
              nGtv: "≫̸",
              nharr: "↮",
              nhArr: "⇎",
              nhpar: "⫲",
              ni: "∋",
              nis: "⋼",
              nisd: "⋺",
              niv: "∋",
              njcy: "њ",
              NJcy: "Њ",
              nlarr: "↚",
              nlArr: "⇍",
              nldr: "‥",
              nle: "≰",
              nlE: "≦̸",
              nleftarrow: "↚",
              nLeftarrow: "⇍",
              nleftrightarrow: "↮",
              nLeftrightarrow: "⇎",
              nleq: "≰",
              nleqq: "≦̸",
              nleqslant: "⩽̸",
              nles: "⩽̸",
              nless: "≮",
              nLl: "⋘̸",
              nlsim: "≴",
              nlt: "≮",
              nLt: "≪⃒",
              nltri: "⋪",
              nltrie: "⋬",
              nLtv: "≪̸",
              nmid: "∤",
              NoBreak: "⁠",
              NonBreakingSpace: " ",
              nopf: "𝕟",
              Nopf: "ℕ",
              not: "¬",
              Not: "⫬",
              NotCongruent: "≢",
              NotCupCap: "≭",
              NotDoubleVerticalBar: "∦",
              NotElement: "∉",
              NotEqual: "≠",
              NotEqualTilde: "≂̸",
              NotExists: "∄",
              NotGreater: "≯",
              NotGreaterEqual: "≱",
              NotGreaterFullEqual: "≧̸",
              NotGreaterGreater: "≫̸",
              NotGreaterLess: "≹",
              NotGreaterSlantEqual: "⩾̸",
              NotGreaterTilde: "≵",
              NotHumpDownHump: "≎̸",
              NotHumpEqual: "≏̸",
              notin: "∉",
              notindot: "⋵̸",
              notinE: "⋹̸",
              notinva: "∉",
              notinvb: "⋷",
              notinvc: "⋶",
              NotLeftTriangle: "⋪",
              NotLeftTriangleBar: "⧏̸",
              NotLeftTriangleEqual: "⋬",
              NotLess: "≮",
              NotLessEqual: "≰",
              NotLessGreater: "≸",
              NotLessLess: "≪̸",
              NotLessSlantEqual: "⩽̸",
              NotLessTilde: "≴",
              NotNestedGreaterGreater: "⪢̸",
              NotNestedLessLess: "⪡̸",
              notni: "∌",
              notniva: "∌",
              notnivb: "⋾",
              notnivc: "⋽",
              NotPrecedes: "⊀",
              NotPrecedesEqual: "⪯̸",
              NotPrecedesSlantEqual: "⋠",
              NotReverseElement: "∌",
              NotRightTriangle: "⋫",
              NotRightTriangleBar: "⧐̸",
              NotRightTriangleEqual: "⋭",
              NotSquareSubset: "⊏̸",
              NotSquareSubsetEqual: "⋢",
              NotSquareSuperset: "⊐̸",
              NotSquareSupersetEqual: "⋣",
              NotSubset: "⊂⃒",
              NotSubsetEqual: "⊈",
              NotSucceeds: "⊁",
              NotSucceedsEqual: "⪰̸",
              NotSucceedsSlantEqual: "⋡",
              NotSucceedsTilde: "≿̸",
              NotSuperset: "⊃⃒",
              NotSupersetEqual: "⊉",
              NotTilde: "≁",
              NotTildeEqual: "≄",
              NotTildeFullEqual: "≇",
              NotTildeTilde: "≉",
              NotVerticalBar: "∤",
              npar: "∦",
              nparallel: "∦",
              nparsl: "⫽⃥",
              npart: "∂̸",
              npolint: "⨔",
              npr: "⊀",
              nprcue: "⋠",
              npre: "⪯̸",
              nprec: "⊀",
              npreceq: "⪯̸",
              nrarr: "↛",
              nrArr: "⇏",
              nrarrc: "⤳̸",
              nrarrw: "↝̸",
              nrightarrow: "↛",
              nRightarrow: "⇏",
              nrtri: "⋫",
              nrtrie: "⋭",
              nsc: "⊁",
              nsccue: "⋡",
              nsce: "⪰̸",
              nscr: "𝓃",
              Nscr: "𝒩",
              nshortmid: "∤",
              nshortparallel: "∦",
              nsim: "≁",
              nsime: "≄",
              nsimeq: "≄",
              nsmid: "∤",
              nspar: "∦",
              nsqsube: "⋢",
              nsqsupe: "⋣",
              nsub: "⊄",
              nsube: "⊈",
              nsubE: "⫅̸",
              nsubset: "⊂⃒",
              nsubseteq: "⊈",
              nsubseteqq: "⫅̸",
              nsucc: "⊁",
              nsucceq: "⪰̸",
              nsup: "⊅",
              nsupe: "⊉",
              nsupE: "⫆̸",
              nsupset: "⊃⃒",
              nsupseteq: "⊉",
              nsupseteqq: "⫆̸",
              ntgl: "≹",
              ntilde: "ñ",
              Ntilde: "Ñ",
              ntlg: "≸",
              ntriangleleft: "⋪",
              ntrianglelefteq: "⋬",
              ntriangleright: "⋫",
              ntrianglerighteq: "⋭",
              nu: "ν",
              Nu: "Ν",
              num: "#",
              numero: "№",
              numsp: " ",
              nvap: "≍⃒",
              nvdash: "⊬",
              nvDash: "⊭",
              nVdash: "⊮",
              nVDash: "⊯",
              nvge: "≥⃒",
              nvgt: ">⃒",
              nvHarr: "⤄",
              nvinfin: "⧞",
              nvlArr: "⤂",
              nvle: "≤⃒",
              nvlt: "<⃒",
              nvltrie: "⊴⃒",
              nvrArr: "⤃",
              nvrtrie: "⊵⃒",
              nvsim: "∼⃒",
              nwarhk: "⤣",
              nwarr: "↖",
              nwArr: "⇖",
              nwarrow: "↖",
              nwnear: "⤧",
              oacute: "ó",
              Oacute: "Ó",
              oast: "⊛",
              ocir: "⊚",
              ocirc: "ô",
              Ocirc: "Ô",
              ocy: "о",
              Ocy: "О",
              odash: "⊝",
              odblac: "ő",
              Odblac: "Ő",
              odiv: "⨸",
              odot: "⊙",
              odsold: "⦼",
              oelig: "œ",
              OElig: "Œ",
              ofcir: "⦿",
              ofr: "𝔬",
              Ofr: "𝔒",
              ogon: "˛",
              ograve: "ò",
              Ograve: "Ò",
              ogt: "⧁",
              ohbar: "⦵",
              ohm: "Ω",
              oint: "∮",
              olarr: "↺",
              olcir: "⦾",
              olcross: "⦻",
              oline: "‾",
              olt: "⧀",
              omacr: "ō",
              Omacr: "Ō",
              omega: "ω",
              Omega: "Ω",
              omicron: "ο",
              Omicron: "Ο",
              omid: "⦶",
              ominus: "⊖",
              oopf: "𝕠",
              Oopf: "𝕆",
              opar: "⦷",
              OpenCurlyDoubleQuote: "“",
              OpenCurlyQuote: "‘",
              operp: "⦹",
              oplus: "⊕",
              or: "∨",
              Or: "⩔",
              orarr: "↻",
              ord: "⩝",
              order: "ℴ",
              orderof: "ℴ",
              ordf: "ª",
              ordm: "º",
              origof: "⊶",
              oror: "⩖",
              orslope: "⩗",
              orv: "⩛",
              oS: "Ⓢ",
              oscr: "ℴ",
              Oscr: "𝒪",
              oslash: "ø",
              Oslash: "Ø",
              osol: "⊘",
              otilde: "õ",
              Otilde: "Õ",
              otimes: "⊗",
              Otimes: "⨷",
              otimesas: "⨶",
              ouml: "ö",
              Ouml: "Ö",
              ovbar: "⌽",
              OverBar: "‾",
              OverBrace: "⏞",
              OverBracket: "⎴",
              OverParenthesis: "⏜",
              par: "∥",
              para: "¶",
              parallel: "∥",
              parsim: "⫳",
              parsl: "⫽",
              part: "∂",
              PartialD: "∂",
              pcy: "п",
              Pcy: "П",
              percnt: "%",
              period: ".",
              permil: "‰",
              perp: "⊥",
              pertenk: "‱",
              pfr: "𝔭",
              Pfr: "𝔓",
              phi: "φ",
              Phi: "Φ",
              phiv: "ϕ",
              phmmat: "ℳ",
              phone: "☎",
              pi: "π",
              Pi: "Π",
              pitchfork: "⋔",
              piv: "ϖ",
              planck: "ℏ",
              planckh: "ℎ",
              plankv: "ℏ",
              plus: "+",
              plusacir: "⨣",
              plusb: "⊞",
              pluscir: "⨢",
              plusdo: "∔",
              plusdu: "⨥",
              pluse: "⩲",
              PlusMinus: "±",
              plusmn: "±",
              plussim: "⨦",
              plustwo: "⨧",
              pm: "±",
              Poincareplane: "ℌ",
              pointint: "⨕",
              popf: "𝕡",
              Popf: "ℙ",
              pound: "£",
              pr: "≺",
              Pr: "⪻",
              prap: "⪷",
              prcue: "≼",
              pre: "⪯",
              prE: "⪳",
              prec: "≺",
              precapprox: "⪷",
              preccurlyeq: "≼",
              Precedes: "≺",
              PrecedesEqual: "⪯",
              PrecedesSlantEqual: "≼",
              PrecedesTilde: "≾",
              preceq: "⪯",
              precnapprox: "⪹",
              precneqq: "⪵",
              precnsim: "⋨",
              precsim: "≾",
              prime: "′",
              Prime: "″",
              primes: "ℙ",
              prnap: "⪹",
              prnE: "⪵",
              prnsim: "⋨",
              prod: "∏",
              Product: "∏",
              profalar: "⌮",
              profline: "⌒",
              profsurf: "⌓",
              prop: "∝",
              Proportion: "∷",
              Proportional: "∝",
              propto: "∝",
              prsim: "≾",
              prurel: "⊰",
              pscr: "𝓅",
              Pscr: "𝒫",
              psi: "ψ",
              Psi: "Ψ",
              puncsp: " ",
              qfr: "𝔮",
              Qfr: "𝔔",
              qint: "⨌",
              qopf: "𝕢",
              Qopf: "ℚ",
              qprime: "⁗",
              qscr: "𝓆",
              Qscr: "𝒬",
              quaternions: "ℍ",
              quatint: "⨖",
              quest: "?",
              questeq: "≟",
              quot: '"',
              QUOT: '"',
              rAarr: "⇛",
              race: "∽̱",
              racute: "ŕ",
              Racute: "Ŕ",
              radic: "√",
              raemptyv: "⦳",
              rang: "⟩",
              Rang: "⟫",
              rangd: "⦒",
              range: "⦥",
              rangle: "⟩",
              raquo: "»",
              rarr: "→",
              rArr: "⇒",
              Rarr: "↠",
              rarrap: "⥵",
              rarrb: "⇥",
              rarrbfs: "⤠",
              rarrc: "⤳",
              rarrfs: "⤞",
              rarrhk: "↪",
              rarrlp: "↬",
              rarrpl: "⥅",
              rarrsim: "⥴",
              rarrtl: "↣",
              Rarrtl: "⤖",
              rarrw: "↝",
              ratail: "⤚",
              rAtail: "⤜",
              ratio: "∶",
              rationals: "ℚ",
              rbarr: "⤍",
              rBarr: "⤏",
              RBarr: "⤐",
              rbbrk: "❳",
              rbrace: "}",
              rbrack: "]",
              rbrke: "⦌",
              rbrksld: "⦎",
              rbrkslu: "⦐",
              rcaron: "ř",
              Rcaron: "Ř",
              rcedil: "ŗ",
              Rcedil: "Ŗ",
              rceil: "⌉",
              rcub: "}",
              rcy: "р",
              Rcy: "Р",
              rdca: "⤷",
              rdldhar: "⥩",
              rdquo: "”",
              rdquor: "”",
              rdsh: "↳",
              Re: "ℜ",
              real: "ℜ",
              realine: "ℛ",
              realpart: "ℜ",
              reals: "ℝ",
              rect: "▭",
              reg: "®",
              REG: "®",
              ReverseElement: "∋",
              ReverseEquilibrium: "⇋",
              ReverseUpEquilibrium: "⥯",
              rfisht: "⥽",
              rfloor: "⌋",
              rfr: "𝔯",
              Rfr: "ℜ",
              rHar: "⥤",
              rhard: "⇁",
              rharu: "⇀",
              rharul: "⥬",
              rho: "ρ",
              Rho: "Ρ",
              rhov: "ϱ",
              RightAngleBracket: "⟩",
              rightarrow: "→",
              Rightarrow: "⇒",
              RightArrow: "→",
              RightArrowBar: "⇥",
              RightArrowLeftArrow: "⇄",
              rightarrowtail: "↣",
              RightCeiling: "⌉",
              RightDoubleBracket: "⟧",
              RightDownTeeVector: "⥝",
              RightDownVector: "⇂",
              RightDownVectorBar: "⥕",
              RightFloor: "⌋",
              rightharpoondown: "⇁",
              rightharpoonup: "⇀",
              rightleftarrows: "⇄",
              rightleftharpoons: "⇌",
              rightrightarrows: "⇉",
              rightsquigarrow: "↝",
              RightTee: "⊢",
              RightTeeArrow: "↦",
              RightTeeVector: "⥛",
              rightthreetimes: "⋌",
              RightTriangle: "⊳",
              RightTriangleBar: "⧐",
              RightTriangleEqual: "⊵",
              RightUpDownVector: "⥏",
              RightUpTeeVector: "⥜",
              RightUpVector: "↾",
              RightUpVectorBar: "⥔",
              RightVector: "⇀",
              RightVectorBar: "⥓",
              ring: "˚",
              risingdotseq: "≓",
              rlarr: "⇄",
              rlhar: "⇌",
              rlm: "‏",
              rmoust: "⎱",
              rmoustache: "⎱",
              rnmid: "⫮",
              roang: "⟭",
              roarr: "⇾",
              robrk: "⟧",
              ropar: "⦆",
              ropf: "𝕣",
              Ropf: "ℝ",
              roplus: "⨮",
              rotimes: "⨵",
              RoundImplies: "⥰",
              rpar: ")",
              rpargt: "⦔",
              rppolint: "⨒",
              rrarr: "⇉",
              Rrightarrow: "⇛",
              rsaquo: "›",
              rscr: "𝓇",
              Rscr: "ℛ",
              rsh: "↱",
              Rsh: "↱",
              rsqb: "]",
              rsquo: "’",
              rsquor: "’",
              rthree: "⋌",
              rtimes: "⋊",
              rtri: "▹",
              rtrie: "⊵",
              rtrif: "▸",
              rtriltri: "⧎",
              RuleDelayed: "⧴",
              ruluhar: "⥨",
              rx: "℞",
              sacute: "ś",
              Sacute: "Ś",
              sbquo: "‚",
              sc: "≻",
              Sc: "⪼",
              scap: "⪸",
              scaron: "š",
              Scaron: "Š",
              sccue: "≽",
              sce: "⪰",
              scE: "⪴",
              scedil: "ş",
              Scedil: "Ş",
              scirc: "ŝ",
              Scirc: "Ŝ",
              scnap: "⪺",
              scnE: "⪶",
              scnsim: "⋩",
              scpolint: "⨓",
              scsim: "≿",
              scy: "с",
              Scy: "С",
              sdot: "⋅",
              sdotb: "⊡",
              sdote: "⩦",
              searhk: "⤥",
              searr: "↘",
              seArr: "⇘",
              searrow: "↘",
              sect: "§",
              semi: ";",
              seswar: "⤩",
              setminus: "∖",
              setmn: "∖",
              sext: "✶",
              sfr: "𝔰",
              Sfr: "𝔖",
              sfrown: "⌢",
              sharp: "♯",
              shchcy: "щ",
              SHCHcy: "Щ",
              shcy: "ш",
              SHcy: "Ш",
              ShortDownArrow: "↓",
              ShortLeftArrow: "←",
              shortmid: "∣",
              shortparallel: "∥",
              ShortRightArrow: "→",
              ShortUpArrow: "↑",
              shy: "­",
              sigma: "σ",
              Sigma: "Σ",
              sigmaf: "ς",
              sigmav: "ς",
              sim: "∼",
              simdot: "⩪",
              sime: "≃",
              simeq: "≃",
              simg: "⪞",
              simgE: "⪠",
              siml: "⪝",
              simlE: "⪟",
              simne: "≆",
              simplus: "⨤",
              simrarr: "⥲",
              slarr: "←",
              SmallCircle: "∘",
              smallsetminus: "∖",
              smashp: "⨳",
              smeparsl: "⧤",
              smid: "∣",
              smile: "⌣",
              smt: "⪪",
              smte: "⪬",
              smtes: "⪬︀",
              softcy: "ь",
              SOFTcy: "Ь",
              sol: "/",
              solb: "⧄",
              solbar: "⌿",
              sopf: "𝕤",
              Sopf: "𝕊",
              spades: "♠",
              spadesuit: "♠",
              spar: "∥",
              sqcap: "⊓",
              sqcaps: "⊓︀",
              sqcup: "⊔",
              sqcups: "⊔︀",
              Sqrt: "√",
              sqsub: "⊏",
              sqsube: "⊑",
              sqsubset: "⊏",
              sqsubseteq: "⊑",
              sqsup: "⊐",
              sqsupe: "⊒",
              sqsupset: "⊐",
              sqsupseteq: "⊒",
              squ: "□",
              square: "□",
              Square: "□",
              SquareIntersection: "⊓",
              SquareSubset: "⊏",
              SquareSubsetEqual: "⊑",
              SquareSuperset: "⊐",
              SquareSupersetEqual: "⊒",
              SquareUnion: "⊔",
              squarf: "▪",
              squf: "▪",
              srarr: "→",
              sscr: "𝓈",
              Sscr: "𝒮",
              ssetmn: "∖",
              ssmile: "⌣",
              sstarf: "⋆",
              star: "☆",
              Star: "⋆",
              starf: "★",
              straightepsilon: "ϵ",
              straightphi: "ϕ",
              strns: "¯",
              sub: "⊂",
              Sub: "⋐",
              subdot: "⪽",
              sube: "⊆",
              subE: "⫅",
              subedot: "⫃",
              submult: "⫁",
              subne: "⊊",
              subnE: "⫋",
              subplus: "⪿",
              subrarr: "⥹",
              subset: "⊂",
              Subset: "⋐",
              subseteq: "⊆",
              subseteqq: "⫅",
              SubsetEqual: "⊆",
              subsetneq: "⊊",
              subsetneqq: "⫋",
              subsim: "⫇",
              subsub: "⫕",
              subsup: "⫓",
              succ: "≻",
              succapprox: "⪸",
              succcurlyeq: "≽",
              Succeeds: "≻",
              SucceedsEqual: "⪰",
              SucceedsSlantEqual: "≽",
              SucceedsTilde: "≿",
              succeq: "⪰",
              succnapprox: "⪺",
              succneqq: "⪶",
              succnsim: "⋩",
              succsim: "≿",
              SuchThat: "∋",
              sum: "∑",
              Sum: "∑",
              sung: "♪",
              sup: "⊃",
              Sup: "⋑",
              sup1: "¹",
              sup2: "²",
              sup3: "³",
              supdot: "⪾",
              supdsub: "⫘",
              supe: "⊇",
              supE: "⫆",
              supedot: "⫄",
              Superset: "⊃",
              SupersetEqual: "⊇",
              suphsol: "⟉",
              suphsub: "⫗",
              suplarr: "⥻",
              supmult: "⫂",
              supne: "⊋",
              supnE: "⫌",
              supplus: "⫀",
              supset: "⊃",
              Supset: "⋑",
              supseteq: "⊇",
              supseteqq: "⫆",
              supsetneq: "⊋",
              supsetneqq: "⫌",
              supsim: "⫈",
              supsub: "⫔",
              supsup: "⫖",
              swarhk: "⤦",
              swarr: "↙",
              swArr: "⇙",
              swarrow: "↙",
              swnwar: "⤪",
              szlig: "ß",
              Tab: "	",
              target: "⌖",
              tau: "τ",
              Tau: "Τ",
              tbrk: "⎴",
              tcaron: "ť",
              Tcaron: "Ť",
              tcedil: "ţ",
              Tcedil: "Ţ",
              tcy: "т",
              Tcy: "Т",
              tdot: "⃛",
              telrec: "⌕",
              tfr: "𝔱",
              Tfr: "𝔗",
              there4: "∴",
              therefore: "∴",
              Therefore: "∴",
              theta: "θ",
              Theta: "Θ",
              thetasym: "ϑ",
              thetav: "ϑ",
              thickapprox: "≈",
              thicksim: "∼",
              ThickSpace: "  ",
              thinsp: " ",
              ThinSpace: " ",
              thkap: "≈",
              thksim: "∼",
              thorn: "þ",
              THORN: "Þ",
              tilde: "˜",
              Tilde: "∼",
              TildeEqual: "≃",
              TildeFullEqual: "≅",
              TildeTilde: "≈",
              times: "×",
              timesb: "⊠",
              timesbar: "⨱",
              timesd: "⨰",
              tint: "∭",
              toea: "⤨",
              top: "⊤",
              topbot: "⌶",
              topcir: "⫱",
              topf: "𝕥",
              Topf: "𝕋",
              topfork: "⫚",
              tosa: "⤩",
              tprime: "‴",
              trade: "™",
              TRADE: "™",
              triangle: "▵",
              triangledown: "▿",
              triangleleft: "◃",
              trianglelefteq: "⊴",
              triangleq: "≜",
              triangleright: "▹",
              trianglerighteq: "⊵",
              tridot: "◬",
              trie: "≜",
              triminus: "⨺",
              TripleDot: "⃛",
              triplus: "⨹",
              trisb: "⧍",
              tritime: "⨻",
              trpezium: "⏢",
              tscr: "𝓉",
              Tscr: "𝒯",
              tscy: "ц",
              TScy: "Ц",
              tshcy: "ћ",
              TSHcy: "Ћ",
              tstrok: "ŧ",
              Tstrok: "Ŧ",
              twixt: "≬",
              twoheadleftarrow: "↞",
              twoheadrightarrow: "↠",
              uacute: "ú",
              Uacute: "Ú",
              uarr: "↑",
              uArr: "⇑",
              Uarr: "↟",
              Uarrocir: "⥉",
              ubrcy: "ў",
              Ubrcy: "Ў",
              ubreve: "ŭ",
              Ubreve: "Ŭ",
              ucirc: "û",
              Ucirc: "Û",
              ucy: "у",
              Ucy: "У",
              udarr: "⇅",
              udblac: "ű",
              Udblac: "Ű",
              udhar: "⥮",
              ufisht: "⥾",
              ufr: "𝔲",
              Ufr: "𝔘",
              ugrave: "ù",
              Ugrave: "Ù",
              uHar: "⥣",
              uharl: "↿",
              uharr: "↾",
              uhblk: "▀",
              ulcorn: "⌜",
              ulcorner: "⌜",
              ulcrop: "⌏",
              ultri: "◸",
              umacr: "ū",
              Umacr: "Ū",
              uml: "¨",
              UnderBar: "_",
              UnderBrace: "⏟",
              UnderBracket: "⎵",
              UnderParenthesis: "⏝",
              Union: "⋃",
              UnionPlus: "⊎",
              uogon: "ų",
              Uogon: "Ų",
              uopf: "𝕦",
              Uopf: "𝕌",
              uparrow: "↑",
              Uparrow: "⇑",
              UpArrow: "↑",
              UpArrowBar: "⤒",
              UpArrowDownArrow: "⇅",
              updownarrow: "↕",
              Updownarrow: "⇕",
              UpDownArrow: "↕",
              UpEquilibrium: "⥮",
              upharpoonleft: "↿",
              upharpoonright: "↾",
              uplus: "⊎",
              UpperLeftArrow: "↖",
              UpperRightArrow: "↗",
              upsi: "υ",
              Upsi: "ϒ",
              upsih: "ϒ",
              upsilon: "υ",
              Upsilon: "Υ",
              UpTee: "⊥",
              UpTeeArrow: "↥",
              upuparrows: "⇈",
              urcorn: "⌝",
              urcorner: "⌝",
              urcrop: "⌎",
              uring: "ů",
              Uring: "Ů",
              urtri: "◹",
              uscr: "𝓊",
              Uscr: "𝒰",
              utdot: "⋰",
              utilde: "ũ",
              Utilde: "Ũ",
              utri: "▵",
              utrif: "▴",
              uuarr: "⇈",
              uuml: "ü",
              Uuml: "Ü",
              uwangle: "⦧",
              vangrt: "⦜",
              varepsilon: "ϵ",
              varkappa: "ϰ",
              varnothing: "∅",
              varphi: "ϕ",
              varpi: "ϖ",
              varpropto: "∝",
              varr: "↕",
              vArr: "⇕",
              varrho: "ϱ",
              varsigma: "ς",
              varsubsetneq: "⊊︀",
              varsubsetneqq: "⫋︀",
              varsupsetneq: "⊋︀",
              varsupsetneqq: "⫌︀",
              vartheta: "ϑ",
              vartriangleleft: "⊲",
              vartriangleright: "⊳",
              vBar: "⫨",
              Vbar: "⫫",
              vBarv: "⫩",
              vcy: "в",
              Vcy: "В",
              vdash: "⊢",
              vDash: "⊨",
              Vdash: "⊩",
              VDash: "⊫",
              Vdashl: "⫦",
              vee: "∨",
              Vee: "⋁",
              veebar: "⊻",
              veeeq: "≚",
              vellip: "⋮",
              verbar: "|",
              Verbar: "‖",
              vert: "|",
              Vert: "‖",
              VerticalBar: "∣",
              VerticalLine: "|",
              VerticalSeparator: "❘",
              VerticalTilde: "≀",
              VeryThinSpace: " ",
              vfr: "𝔳",
              Vfr: "𝔙",
              vltri: "⊲",
              vnsub: "⊂⃒",
              vnsup: "⊃⃒",
              vopf: "𝕧",
              Vopf: "𝕍",
              vprop: "∝",
              vrtri: "⊳",
              vscr: "𝓋",
              Vscr: "𝒱",
              vsubne: "⊊︀",
              vsubnE: "⫋︀",
              vsupne: "⊋︀",
              vsupnE: "⫌︀",
              Vvdash: "⊪",
              vzigzag: "⦚",
              wcirc: "ŵ",
              Wcirc: "Ŵ",
              wedbar: "⩟",
              wedge: "∧",
              Wedge: "⋀",
              wedgeq: "≙",
              weierp: "℘",
              wfr: "𝔴",
              Wfr: "𝔚",
              wopf: "𝕨",
              Wopf: "𝕎",
              wp: "℘",
              wr: "≀",
              wreath: "≀",
              wscr: "𝓌",
              Wscr: "𝒲",
              xcap: "⋂",
              xcirc: "◯",
              xcup: "⋃",
              xdtri: "▽",
              xfr: "𝔵",
              Xfr: "𝔛",
              xharr: "⟷",
              xhArr: "⟺",
              xi: "ξ",
              Xi: "Ξ",
              xlarr: "⟵",
              xlArr: "⟸",
              xmap: "⟼",
              xnis: "⋻",
              xodot: "⨀",
              xopf: "𝕩",
              Xopf: "𝕏",
              xoplus: "⨁",
              xotime: "⨂",
              xrarr: "⟶",
              xrArr: "⟹",
              xscr: "𝓍",
              Xscr: "𝒳",
              xsqcup: "⨆",
              xuplus: "⨄",
              xutri: "△",
              xvee: "⋁",
              xwedge: "⋀",
              yacute: "ý",
              Yacute: "Ý",
              yacy: "я",
              YAcy: "Я",
              ycirc: "ŷ",
              Ycirc: "Ŷ",
              ycy: "ы",
              Ycy: "Ы",
              yen: "¥",
              yfr: "𝔶",
              Yfr: "𝔜",
              yicy: "ї",
              YIcy: "Ї",
              yopf: "𝕪",
              Yopf: "𝕐",
              yscr: "𝓎",
              Yscr: "𝒴",
              yucy: "ю",
              YUcy: "Ю",
              yuml: "ÿ",
              Yuml: "Ÿ",
              zacute: "ź",
              Zacute: "Ź",
              zcaron: "ž",
              Zcaron: "Ž",
              zcy: "з",
              Zcy: "З",
              zdot: "ż",
              Zdot: "Ż",
              zeetrf: "ℨ",
              ZeroWidthSpace: "​",
              zeta: "ζ",
              Zeta: "Ζ",
              zfr: "𝔷",
              Zfr: "ℨ",
              zhcy: "ж",
              ZHcy: "Ж",
              zigrarr: "⇝",
              zopf: "𝕫",
              Zopf: "ℤ",
              zscr: "𝓏",
              Zscr: "𝒵",
              zwj: "‍",
              zwnj: "‌",
            },
            S = {
              aacute: "á",
              Aacute: "Á",
              acirc: "â",
              Acirc: "Â",
              acute: "´",
              aelig: "æ",
              AElig: "Æ",
              agrave: "à",
              Agrave: "À",
              amp: "&",
              AMP: "&",
              aring: "å",
              Aring: "Å",
              atilde: "ã",
              Atilde: "Ã",
              auml: "ä",
              Auml: "Ä",
              brvbar: "¦",
              ccedil: "ç",
              Ccedil: "Ç",
              cedil: "¸",
              cent: "¢",
              copy: "©",
              COPY: "©",
              curren: "¤",
              deg: "°",
              divide: "÷",
              eacute: "é",
              Eacute: "É",
              ecirc: "ê",
              Ecirc: "Ê",
              egrave: "è",
              Egrave: "È",
              eth: "ð",
              ETH: "Ð",
              euml: "ë",
              Euml: "Ë",
              frac12: "½",
              frac14: "¼",
              frac34: "¾",
              gt: ">",
              GT: ">",
              iacute: "í",
              Iacute: "Í",
              icirc: "î",
              Icirc: "Î",
              iexcl: "¡",
              igrave: "ì",
              Igrave: "Ì",
              iquest: "¿",
              iuml: "ï",
              Iuml: "Ï",
              laquo: "«",
              lt: "<",
              LT: "<",
              macr: "¯",
              micro: "µ",
              middot: "·",
              nbsp: " ",
              not: "¬",
              ntilde: "ñ",
              Ntilde: "Ñ",
              oacute: "ó",
              Oacute: "Ó",
              ocirc: "ô",
              Ocirc: "Ô",
              ograve: "ò",
              Ograve: "Ò",
              ordf: "ª",
              ordm: "º",
              oslash: "ø",
              Oslash: "Ø",
              otilde: "õ",
              Otilde: "Õ",
              ouml: "ö",
              Ouml: "Ö",
              para: "¶",
              plusmn: "±",
              pound: "£",
              quot: '"',
              QUOT: '"',
              raquo: "»",
              reg: "®",
              REG: "®",
              sect: "§",
              shy: "­",
              sup1: "¹",
              sup2: "²",
              sup3: "³",
              szlig: "ß",
              thorn: "þ",
              THORN: "Þ",
              times: "×",
              uacute: "ú",
              Uacute: "Ú",
              ucirc: "û",
              Ucirc: "Û",
              ugrave: "ù",
              Ugrave: "Ù",
              uml: "¨",
              uuml: "ü",
              Uuml: "Ü",
              yacute: "ý",
              Yacute: "Ý",
              yen: "¥",
              yuml: "ÿ",
            },
            R = {
              0: "�",
              128: "€",
              130: "‚",
              131: "ƒ",
              132: "„",
              133: "…",
              134: "†",
              135: "‡",
              136: "ˆ",
              137: "‰",
              138: "Š",
              139: "‹",
              140: "Œ",
              142: "Ž",
              145: "‘",
              146: "’",
              147: "“",
              148: "”",
              149: "•",
              150: "–",
              151: "—",
              152: "˜",
              153: "™",
              154: "š",
              155: "›",
              156: "œ",
              158: "ž",
              159: "Ÿ",
            },
            P = [
              1, 2, 3, 4, 5, 6, 7, 8, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21,
              22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 127, 128, 129, 130, 131,
              132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144,
              145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157,
              158, 159, 64976, 64977, 64978, 64979, 64980, 64981, 64982, 64983,
              64984, 64985, 64986, 64987, 64988, 64989, 64990, 64991, 64992,
              64993, 64994, 64995, 64996, 64997, 64998, 64999, 65e3, 65001,
              65002, 65003, 65004, 65005, 65006, 65007, 65534, 65535, 131070,
              131071, 196606, 196607, 262142, 262143, 327678, 327679, 393214,
              393215, 458750, 458751, 524286, 524287, 589822, 589823, 655358,
              655359, 720894, 720895, 786430, 786431, 851966, 851967, 917502,
              917503, 983038, 983039, 1048574, 1048575, 1114110, 1114111,
            ],
            N = String.fromCharCode,
            U = {},
            Gu = U.hasOwnProperty,
            j = function (c, f) {
              return Gu.call(c, f);
            },
            $u = function (c, f) {
              for (var m = -1, E = c.length; ++m < E; )
                if (c[m] == f) return !0;
              return !1;
            },
            Au = function (c, f) {
              if (!c) return f;
              var m = {},
                E;
              for (E in f) m[E] = j(c, E) ? c[E] : f[E];
              return m;
            },
            fu = function (c, f) {
              var m = "";
              return (c >= 55296 && c <= 57343) || c > 1114111
                ? (f &&
                    w(
                      "character reference outside the permissible Unicode range"
                    ),
                  "�")
                : j(R, c)
                ? (f && w("disallowed character reference"), R[c])
                : (f && $u(P, c) && w("disallowed character reference"),
                  c > 65535 &&
                    ((c -= 65536),
                    (m += N(((c >>> 10) & 1023) | 55296)),
                    (c = 56320 | (c & 1023))),
                  (m += N(c)),
                  m);
            },
            Ou = function (c) {
              return "&#x" + c.toString(16).toUpperCase() + ";";
            },
            Pu = function (c) {
              return "&#" + c + ";";
            },
            w = function (c) {
              throw Error("Parse error: " + c);
            },
            nu = function (c, f) {
              f = Au(f, nu.options);
              var m = f.strict;
              m && B.test(c) && w("forbidden code point");
              var E = f.encodeEverything,
                v = f.useNamedReferences,
                z = f.allowUnsafeSymbols,
                Z = f.decimal ? Pu : Ou,
                L = function (b) {
                  return Z(b.charCodeAt(0));
                };
              return (
                E
                  ? ((c = c.replace(s, function (b) {
                      return v && j(i, b) ? "&" + i[b] + ";" : L(b);
                    })),
                    v &&
                      (c = c
                        .replace(/&gt;\u20D2/g, "&nvgt;")
                        .replace(/&lt;\u20D2/g, "&nvlt;")
                        .replace(/&#x66;&#x6A;/g, "&fjlig;")),
                    v &&
                      (c = c.replace(D, function (b) {
                        return "&" + i[b] + ";";
                      })))
                  : v
                  ? (z ||
                      (c = c.replace(h, function (b) {
                        return "&" + i[b] + ";";
                      })),
                    (c = c
                      .replace(/&gt;\u20D2/g, "&nvgt;")
                      .replace(/&lt;\u20D2/g, "&nvlt;")),
                    (c = c.replace(D, function (b) {
                      return "&" + i[b] + ";";
                    })))
                  : z || (c = c.replace(h, L)),
                c
                  .replace(t, function (b) {
                    var M = b.charCodeAt(0),
                      ou = b.charCodeAt(1),
                      mu = (M - 55296) * 1024 + ou - 56320 + 65536;
                    return Z(mu);
                  })
                  .replace(o, L)
              );
            };
          nu.options = {
            allowUnsafeSymbols: !1,
            encodeEverything: !1,
            strict: !1,
            useNamedReferences: !1,
            decimal: !1,
          };
          var _ = function (c, f) {
            f = Au(f, _.options);
            var m = f.strict;
            return (
              m && g.test(c) && w("malformed character reference"),
              c.replace(x, function (E, v, z, Z, L, b, M, ou, mu) {
                var J, Q, bu, xu, Y, K;
                return v
                  ? ((Y = v), y[Y])
                  : z
                  ? ((Y = z),
                    (K = Z),
                    K && f.isAttributeValue
                      ? (m &&
                          K == "=" &&
                          w("`&` did not start a character reference"),
                        E)
                      : (m &&
                          w(
                            "named character reference was not terminated by a semicolon"
                          ),
                        S[Y] + (K || "")))
                  : L
                  ? ((bu = L),
                    (Q = b),
                    m &&
                      !Q &&
                      w(
                        "character reference was not terminated by a semicolon"
                      ),
                    (J = parseInt(bu, 10)),
                    fu(J, m))
                  : M
                  ? ((xu = M),
                    (Q = ou),
                    m &&
                      !Q &&
                      w(
                        "character reference was not terminated by a semicolon"
                      ),
                    (J = parseInt(xu, 16)),
                    fu(J, m))
                  : (m &&
                      w(
                        "named character reference was not terminated by a semicolon"
                      ),
                    E);
              })
            );
          };
          _.options = {
            isAttributeValue: !1,
            strict: !1,
          };
          var ju = function (c) {
              return c.replace(h, function (f) {
                return p[f];
              });
            },
            V = {
              version: "1.2.0",
              encode: nu,
              decode: _,
              escape: ju,
              unescape: _,
            };
          if (u && !u.nodeType)
            if (n) n.exports = V;
            else for (var su in V) j(V, su) && (u[su] = V[su]);
          else e.he = V;
        })(Fe);
      })(H, H.exports)),
    H.exports
  );
}
var ve = ye();
const qe = _u(ve),
  Hu = new Iu({
    breaks: !0,
  });
Hu.use({
  tokenizer: {
    heading: () => {},
  },
  renderer: {
    image(l, r, e) {
      let u = `![${e || ""}](${l}`;
      return r && (u += ` "${r}"`), (u += ")"), u;
    },
    html: (l) => qe.escape(l),
  },
});
const Le = (l) =>
  Hu.parse(l, {
    async: !1,
  });
export { Le as r };
