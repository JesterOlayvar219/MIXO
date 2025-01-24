import { O as Me } from "../fancybox.M5rlWkS2.js";
function fe(i) {
  return (
    i !== null &&
    typeof i == "object" &&
    "constructor" in i &&
    i.constructor === Object
  );
}
function ce(i, e) {
  i === void 0 && (i = {}),
    e === void 0 && (e = {}),
    Object.keys(e).forEach((t) => {
      typeof i[t] > "u"
        ? (i[t] = e[t])
        : fe(e[t]) &&
          fe(i[t]) &&
          Object.keys(e[t]).length > 0 &&
          ce(i[t], e[t]);
    });
}
const ve = {
  body: {},
  addEventListener() {},
  removeEventListener() {},
  activeElement: {
    blur() {},
    nodeName: "",
  },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
  getElementById() {
    return null;
  },
  createEvent() {
    return {
      initEvent() {},
    };
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName() {
        return [];
      },
    };
  },
  createElementNS() {
    return {};
  },
  importNode() {
    return null;
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: "",
  },
};
function _() {
  const i = typeof document < "u" ? document : {};
  return ce(i, ve), i;
}
const Pe = {
  document: ve,
  navigator: {
    userAgent: "",
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: "",
  },
  history: {
    replaceState() {},
    pushState() {},
    go() {},
    back() {},
  },
  CustomEvent: function () {
    return this;
  },
  addEventListener() {},
  removeEventListener() {},
  getComputedStyle() {
    return {
      getPropertyValue() {
        return "";
      },
    };
  },
  Image() {},
  Date() {},
  screen: {},
  setTimeout() {},
  clearTimeout() {},
  matchMedia() {
    return {};
  },
  requestAnimationFrame(i) {
    return typeof setTimeout > "u" ? (i(), null) : setTimeout(i, 0);
  },
  cancelAnimationFrame(i) {
    typeof setTimeout > "u" || clearTimeout(i);
  },
};
function $() {
  const i = typeof window < "u" ? window : {};
  return ce(i, Pe), i;
}
function Le(i) {
  return (
    i === void 0 && (i = ""),
    i
      .trim()
      .split(" ")
      .filter((e) => !!e.trim())
  );
}
function Ie(i) {
  const e = i;
  Object.keys(e).forEach((t) => {
    try {
      e[t] = null;
    } catch {}
    try {
      delete e[t];
    } catch {}
  });
}
function le(i, e) {
  return e === void 0 && (e = 0), setTimeout(i, e);
}
function U() {
  return Date.now();
}
function Oe(i) {
  const e = $();
  let t;
  return (
    e.getComputedStyle && (t = e.getComputedStyle(i, null)),
    !t && i.currentStyle && (t = i.currentStyle),
    t || (t = i.style),
    t
  );
}
function Ae(i, e) {
  e === void 0 && (e = "x");
  const t = $();
  let s, n, r;
  const o = Oe(i);
  return (
    t.WebKitCSSMatrix
      ? ((n = o.transform || o.webkitTransform),
        n.split(",").length > 6 &&
          (n = n
            .split(", ")
            .map((l) => l.replace(",", "."))
            .join(", ")),
        (r = new t.WebKitCSSMatrix(n === "none" ? "" : n)))
      : ((r =
          o.MozTransform ||
          o.OTransform ||
          o.MsTransform ||
          o.msTransform ||
          o.transform ||
          o
            .getPropertyValue("transform")
            .replace("translate(", "matrix(1, 0, 0, 1,")),
        (s = r.toString().split(","))),
    e === "x" &&
      (t.WebKitCSSMatrix
        ? (n = r.m41)
        : s.length === 16
        ? (n = parseFloat(s[12]))
        : (n = parseFloat(s[4]))),
    e === "y" &&
      (t.WebKitCSSMatrix
        ? (n = r.m42)
        : s.length === 16
        ? (n = parseFloat(s[13]))
        : (n = parseFloat(s[5]))),
    n || 0
  );
}
function j(i) {
  return (
    typeof i == "object" &&
    i !== null &&
    i.constructor &&
    Object.prototype.toString.call(i).slice(8, -1) === "Object"
  );
}
function ze(i) {
  return typeof window < "u" && typeof window.HTMLElement < "u"
    ? i instanceof HTMLElement
    : i && (i.nodeType === 1 || i.nodeType === 11);
}
function B() {
  const i = Object(arguments.length <= 0 ? void 0 : arguments[0]),
    e = ["__proto__", "constructor", "prototype"];
  for (let t = 1; t < arguments.length; t += 1) {
    const s = t < 0 || arguments.length <= t ? void 0 : arguments[t];
    if (s != null && !ze(s)) {
      const n = Object.keys(Object(s)).filter((r) => e.indexOf(r) < 0);
      for (let r = 0, o = n.length; r < o; r += 1) {
        const l = n[r],
          a = Object.getOwnPropertyDescriptor(s, l);
        a !== void 0 &&
          a.enumerable &&
          (j(i[l]) && j(s[l])
            ? s[l].__swiper__
              ? (i[l] = s[l])
              : B(i[l], s[l])
            : !j(i[l]) && j(s[l])
            ? ((i[l] = {}), s[l].__swiper__ ? (i[l] = s[l]) : B(i[l], s[l]))
            : (i[l] = s[l]));
      }
    }
  }
  return i;
}
function Y(i, e, t) {
  i.style.setProperty(e, t);
}
function we(i) {
  let { swiper: e, targetPosition: t, side: s } = i;
  const n = $(),
    r = -e.translate;
  let o = null,
    l;
  const a = e.params.speed;
  (e.wrapperEl.style.scrollSnapType = "none"),
    n.cancelAnimationFrame(e.cssModeFrameID);
  const c = t > r ? "next" : "prev",
    f = (g, h) => (c === "next" && g >= h) || (c === "prev" && g <= h),
    p = () => {
      (l = new Date().getTime()), o === null && (o = l);
      const g = Math.max(Math.min((l - o) / a, 1), 0),
        h = 0.5 - Math.cos(g * Math.PI) / 2;
      let m = r + h * (t - r);
      if (
        (f(m, t) && (m = t),
        e.wrapperEl.scrollTo({
          [s]: m,
        }),
        f(m, t))
      ) {
        (e.wrapperEl.style.overflow = "hidden"),
          (e.wrapperEl.style.scrollSnapType = ""),
          setTimeout(() => {
            (e.wrapperEl.style.overflow = ""),
              e.wrapperEl.scrollTo({
                [s]: m,
              });
          }),
          n.cancelAnimationFrame(e.cssModeFrameID);
        return;
      }
      e.cssModeFrameID = n.requestAnimationFrame(p);
    };
  p();
}
function ye(i) {
  return (
    i.querySelector(".swiper-slide-transform") ||
    (i.shadowRoot && i.shadowRoot.querySelector(".swiper-slide-transform")) ||
    i
  );
}
function N(i, e) {
  e === void 0 && (e = "");
  const t = [...i.children];
  return (
    i instanceof HTMLSlotElement && t.push(...i.assignedElements()),
    e ? t.filter((s) => s.matches(e)) : t
  );
}
function ke(i, e) {
  const t = e.contains(i);
  return !t && e instanceof HTMLSlotElement
    ? [...e.assignedElements()].includes(i)
    : t;
}
function K(i) {
  try {
    console.warn(i);
    return;
  } catch {}
}
function J(i, e) {
  e === void 0 && (e = []);
  const t = document.createElement(i);
  return t.classList.add(...(Array.isArray(e) ? e : Le(e))), t;
}
function De(i, e) {
  const t = [];
  for (; i.previousElementSibling; ) {
    const s = i.previousElementSibling;
    e ? s.matches(e) && t.push(s) : t.push(s), (i = s);
  }
  return t;
}
function Ge(i, e) {
  const t = [];
  for (; i.nextElementSibling; ) {
    const s = i.nextElementSibling;
    e ? s.matches(e) && t.push(s) : t.push(s), (i = s);
  }
  return t;
}
function H(i, e) {
  return $().getComputedStyle(i, null).getPropertyValue(e);
}
function Q(i) {
  let e = i,
    t;
  if (e) {
    for (t = 0; (e = e.previousSibling) !== null; )
      e.nodeType === 1 && (t += 1);
    return t;
  }
}
function Se(i, e) {
  const t = [];
  let s = i.parentElement;
  for (; s; ) e ? s.matches(e) && t.push(s) : t.push(s), (s = s.parentElement);
  return t;
}
function Be(i, e) {
  function t(s) {
    s.target === i && (e.call(i, s), i.removeEventListener("transitionend", t));
  }
  e && i.addEventListener("transitionend", t);
}
function oe(i, e, t) {
  const s = $();
  return (
    i[e === "width" ? "offsetWidth" : "offsetHeight"] +
    parseFloat(
      s
        .getComputedStyle(i, null)
        .getPropertyValue(e === "width" ? "margin-right" : "margin-top")
    ) +
    parseFloat(
      s
        .getComputedStyle(i, null)
        .getPropertyValue(e === "width" ? "margin-left" : "margin-bottom")
    )
  );
}
function k(i) {
  return (Array.isArray(i) ? i : [i]).filter((e) => !!e);
}
let ee;
function $e() {
  const i = $(),
    e = _();
  return {
    smoothScroll:
      e.documentElement &&
      e.documentElement.style &&
      "scrollBehavior" in e.documentElement.style,
    touch: !!(
      "ontouchstart" in i ||
      (i.DocumentTouch && e instanceof i.DocumentTouch)
    ),
  };
}
function Te() {
  return ee || (ee = $e()), ee;
}
let te;
function Ve(i) {
  let { userAgent: e } = i === void 0 ? {} : i;
  const t = Te(),
    s = $(),
    n = s.navigator.platform,
    r = e || s.navigator.userAgent,
    o = {
      ios: !1,
      android: !1,
    },
    l = s.screen.width,
    a = s.screen.height,
    c = r.match(/(Android);?[\s\/]+([\d.]+)?/);
  let f = r.match(/(iPad).*OS\s([\d_]+)/);
  const p = r.match(/(iPod)(.*OS\s([\d_]+))?/),
    g = !f && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
    h = n === "Win32";
  let m = n === "MacIntel";
  const v = [
    "1024x1366",
    "1366x1024",
    "834x1194",
    "1194x834",
    "834x1112",
    "1112x834",
    "768x1024",
    "1024x768",
    "820x1180",
    "1180x820",
    "810x1080",
    "1080x810",
  ];
  return (
    !f &&
      m &&
      t.touch &&
      v.indexOf(`${l}x${a}`) >= 0 &&
      ((f = r.match(/(Version)\/([\d.]+)/)),
      f || (f = [0, 1, "13_0_0"]),
      (m = !1)),
    c && !h && ((o.os = "android"), (o.android = !0)),
    (f || g || p) && ((o.os = "ios"), (o.ios = !0)),
    o
  );
}
function be(i) {
  return i === void 0 && (i = {}), te || (te = Ve(i)), te;
}
let ie;
function Fe() {
  const i = $(),
    e = be();
  let t = !1;
  function s() {
    const l = i.navigator.userAgent.toLowerCase();
    return (
      l.indexOf("safari") >= 0 &&
      l.indexOf("chrome") < 0 &&
      l.indexOf("android") < 0
    );
  }
  if (s()) {
    const l = String(i.navigator.userAgent);
    if (l.includes("Version/")) {
      const [a, c] = l
        .split("Version/")[1]
        .split(" ")[0]
        .split(".")
        .map((f) => Number(f));
      t = a < 16 || (a === 16 && c < 2);
    }
  }
  const n = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
      i.navigator.userAgent
    ),
    r = s(),
    o = r || (n && e.ios);
  return {
    isSafari: t || r,
    needPerspectiveFix: t,
    need3dFix: o,
    isWebView: n,
  };
}
function Ne() {
  return ie || (ie = Fe()), ie;
}
function _e(i) {
  let { swiper: e, on: t, emit: s } = i;
  const n = $();
  let r = null,
    o = null;
  const l = () => {
      !e || e.destroyed || !e.initialized || (s("beforeResize"), s("resize"));
    },
    a = () => {
      !e ||
        e.destroyed ||
        !e.initialized ||
        ((r = new ResizeObserver((p) => {
          o = n.requestAnimationFrame(() => {
            const { width: g, height: h } = e;
            let m = g,
              v = h;
            p.forEach((b) => {
              let { contentBoxSize: w, contentRect: d, target: u } = b;
              (u && u !== e.el) ||
                ((m = d ? d.width : (w[0] || w).inlineSize),
                (v = d ? d.height : (w[0] || w).blockSize));
            }),
              (m !== g || v !== h) && l();
          });
        })),
        r.observe(e.el));
    },
    c = () => {
      o && n.cancelAnimationFrame(o),
        r && r.unobserve && e.el && (r.unobserve(e.el), (r = null));
    },
    f = () => {
      !e || e.destroyed || !e.initialized || s("orientationchange");
    };
  t("init", () => {
    if (e.params.resizeObserver && typeof n.ResizeObserver < "u") {
      a();
      return;
    }
    n.addEventListener("resize", l), n.addEventListener("orientationchange", f);
  }),
    t("destroy", () => {
      c(),
        n.removeEventListener("resize", l),
        n.removeEventListener("orientationchange", f);
    });
}
function He(i) {
  let { swiper: e, extendParams: t, on: s, emit: n } = i;
  const r = [],
    o = $(),
    l = function (f, p) {
      p === void 0 && (p = {});
      const g = o.MutationObserver || o.WebkitMutationObserver,
        h = new g((m) => {
          if (e.__preventObserver__) return;
          if (m.length === 1) {
            n("observerUpdate", m[0]);
            return;
          }
          const v = function () {
            n("observerUpdate", m[0]);
          };
          o.requestAnimationFrame
            ? o.requestAnimationFrame(v)
            : o.setTimeout(v, 0);
        });
      h.observe(f, {
        attributes: typeof p.attributes > "u" ? !0 : p.attributes,
        childList: e.isElement || (typeof p.childList > "u" ? !0 : p).childList,
        characterData: typeof p.characterData > "u" ? !0 : p.characterData,
      }),
        r.push(h);
    },
    a = () => {
      if (e.params.observer) {
        if (e.params.observeParents) {
          const f = Se(e.hostEl);
          for (let p = 0; p < f.length; p += 1) l(f[p]);
        }
        l(e.hostEl, {
          childList: e.params.observeSlideChildren,
        }),
          l(e.wrapperEl, {
            attributes: !1,
          });
      }
    },
    c = () => {
      r.forEach((f) => {
        f.disconnect();
      }),
        r.splice(0, r.length);
    };
  t({
    observer: !1,
    observeParents: !1,
    observeSlideChildren: !1,
  }),
    s("init", a),
    s("destroy", c);
}
var Re = {
  on(i, e, t) {
    const s = this;
    if (!s.eventsListeners || s.destroyed || typeof e != "function") return s;
    const n = t ? "unshift" : "push";
    return (
      i.split(" ").forEach((r) => {
        s.eventsListeners[r] || (s.eventsListeners[r] = []),
          s.eventsListeners[r][n](e);
      }),
      s
    );
  },
  once(i, e, t) {
    const s = this;
    if (!s.eventsListeners || s.destroyed || typeof e != "function") return s;
    function n() {
      s.off(i, n), n.__emitterProxy && delete n.__emitterProxy;
      for (var r = arguments.length, o = new Array(r), l = 0; l < r; l++)
        o[l] = arguments[l];
      e.apply(s, o);
    }
    return (n.__emitterProxy = e), s.on(i, n, t);
  },
  onAny(i, e) {
    const t = this;
    if (!t.eventsListeners || t.destroyed || typeof i != "function") return t;
    const s = e ? "unshift" : "push";
    return t.eventsAnyListeners.indexOf(i) < 0 && t.eventsAnyListeners[s](i), t;
  },
  offAny(i) {
    const e = this;
    if (!e.eventsListeners || e.destroyed || !e.eventsAnyListeners) return e;
    const t = e.eventsAnyListeners.indexOf(i);
    return t >= 0 && e.eventsAnyListeners.splice(t, 1), e;
  },
  off(i, e) {
    const t = this;
    return (
      !t.eventsListeners ||
        t.destroyed ||
        !t.eventsListeners ||
        i.split(" ").forEach((s) => {
          typeof e > "u"
            ? (t.eventsListeners[s] = [])
            : t.eventsListeners[s] &&
              t.eventsListeners[s].forEach((n, r) => {
                (n === e || (n.__emitterProxy && n.__emitterProxy === e)) &&
                  t.eventsListeners[s].splice(r, 1);
              });
        }),
      t
    );
  },
  emit() {
    const i = this;
    if (!i.eventsListeners || i.destroyed || !i.eventsListeners) return i;
    let e, t, s;
    for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)
      r[o] = arguments[o];
    return (
      typeof r[0] == "string" || Array.isArray(r[0])
        ? ((e = r[0]), (t = r.slice(1, r.length)), (s = i))
        : ((e = r[0].events), (t = r[0].data), (s = r[0].context || i)),
      t.unshift(s),
      (Array.isArray(e) ? e : e.split(" ")).forEach((a) => {
        i.eventsAnyListeners &&
          i.eventsAnyListeners.length &&
          i.eventsAnyListeners.forEach((c) => {
            c.apply(s, [a, ...t]);
          }),
          i.eventsListeners &&
            i.eventsListeners[a] &&
            i.eventsListeners[a].forEach((c) => {
              c.apply(s, t);
            });
      }),
      i
    );
  },
};
function qe() {
  const i = this;
  let e, t;
  const s = i.el;
  typeof i.params.width < "u" && i.params.width !== null
    ? (e = i.params.width)
    : (e = s.clientWidth),
    typeof i.params.height < "u" && i.params.height !== null
      ? (t = i.params.height)
      : (t = s.clientHeight),
    !((e === 0 && i.isHorizontal()) || (t === 0 && i.isVertical())) &&
      ((e =
        e -
        parseInt(H(s, "padding-left") || 0, 10) -
        parseInt(H(s, "padding-right") || 0, 10)),
      (t =
        t -
        parseInt(H(s, "padding-top") || 0, 10) -
        parseInt(H(s, "padding-bottom") || 0, 10)),
      Number.isNaN(e) && (e = 0),
      Number.isNaN(t) && (t = 0),
      Object.assign(i, {
        width: e,
        height: t,
        size: i.isHorizontal() ? e : t,
      }));
}
function We() {
  const i = this;
  function e(T, E) {
    return parseFloat(T.getPropertyValue(i.getDirectionLabel(E)) || 0);
  }
  const t = i.params,
    { wrapperEl: s, slidesEl: n, size: r, rtlTranslate: o, wrongRTL: l } = i,
    a = i.virtual && t.virtual.enabled,
    c = a ? i.virtual.slides.length : i.slides.length,
    f = N(n, `.${i.params.slideClass}, swiper-slide`),
    p = a ? i.virtual.slides.length : f.length;
  let g = [];
  const h = [],
    m = [];
  let v = t.slidesOffsetBefore;
  typeof v == "function" && (v = t.slidesOffsetBefore.call(i));
  let b = t.slidesOffsetAfter;
  typeof b == "function" && (b = t.slidesOffsetAfter.call(i));
  const w = i.snapGrid.length,
    d = i.slidesGrid.length;
  let u = t.spaceBetween,
    y = -v,
    S = 0,
    C = 0;
  if (typeof r > "u") return;
  typeof u == "string" && u.indexOf("%") >= 0
    ? (u = (parseFloat(u.replace("%", "")) / 100) * r)
    : typeof u == "string" && (u = parseFloat(u)),
    (i.virtualSize = -u),
    f.forEach((T) => {
      o ? (T.style.marginLeft = "") : (T.style.marginRight = ""),
        (T.style.marginBottom = ""),
        (T.style.marginTop = "");
    }),
    t.centeredSlides &&
      t.cssMode &&
      (Y(s, "--swiper-centered-offset-before", ""),
      Y(s, "--swiper-centered-offset-after", ""));
  const z = t.grid && t.grid.rows > 1 && i.grid;
  z ? i.grid.initSlides(f) : i.grid && i.grid.unsetSlides();
  let L;
  const I =
    t.slidesPerView === "auto" &&
    t.breakpoints &&
    Object.keys(t.breakpoints).filter(
      (T) => typeof t.breakpoints[T].slidesPerView < "u"
    ).length > 0;
  for (let T = 0; T < p; T += 1) {
    L = 0;
    let E;
    if (
      (f[T] && (E = f[T]),
      z && i.grid.updateSlide(T, E, f),
      !(f[T] && H(E, "display") === "none"))
    ) {
      if (t.slidesPerView === "auto") {
        I && (f[T].style[i.getDirectionLabel("width")] = "");
        const M = getComputedStyle(E),
          x = E.style.transform,
          P = E.style.webkitTransform;
        if (
          (x && (E.style.transform = "none"),
          P && (E.style.webkitTransform = "none"),
          t.roundLengths)
        )
          L = i.isHorizontal() ? oe(E, "width") : oe(E, "height");
        else {
          const O = e(M, "width"),
            D = e(M, "padding-left"),
            Z = e(M, "padding-right"),
            A = e(M, "margin-left"),
            V = e(M, "margin-right"),
            G = M.getPropertyValue("box-sizing");
          if (G && G === "border-box") L = O + A + V;
          else {
            const { clientWidth: R, offsetWidth: W } = E;
            L = O + D + Z + A + V + (W - R);
          }
        }
        x && (E.style.transform = x),
          P && (E.style.webkitTransform = P),
          t.roundLengths && (L = Math.floor(L));
      } else
        (L = (r - (t.slidesPerView - 1) * u) / t.slidesPerView),
          t.roundLengths && (L = Math.floor(L)),
          f[T] && (f[T].style[i.getDirectionLabel("width")] = `${L}px`);
      f[T] && (f[T].swiperSlideSize = L),
        m.push(L),
        t.centeredSlides
          ? ((y = y + L / 2 + S / 2 + u),
            S === 0 && T !== 0 && (y = y - r / 2 - u),
            T === 0 && (y = y - r / 2 - u),
            Math.abs(y) < 1 / 1e3 && (y = 0),
            t.roundLengths && (y = Math.floor(y)),
            C % t.slidesPerGroup === 0 && g.push(y),
            h.push(y))
          : (t.roundLengths && (y = Math.floor(y)),
            (C - Math.min(i.params.slidesPerGroupSkip, C)) %
              i.params.slidesPerGroup ===
              0 && g.push(y),
            h.push(y),
            (y = y + L + u)),
        (i.virtualSize += L + u),
        (S = L),
        (C += 1);
    }
  }
  if (
    ((i.virtualSize = Math.max(i.virtualSize, r) + b),
    o &&
      l &&
      (t.effect === "slide" || t.effect === "coverflow") &&
      (s.style.width = `${i.virtualSize + u}px`),
    t.setWrapperSize &&
      (s.style[i.getDirectionLabel("width")] = `${i.virtualSize + u}px`),
    z && i.grid.updateWrapperSize(L, g),
    !t.centeredSlides)
  ) {
    const T = [];
    for (let E = 0; E < g.length; E += 1) {
      let M = g[E];
      t.roundLengths && (M = Math.floor(M)),
        g[E] <= i.virtualSize - r && T.push(M);
    }
    (g = T),
      Math.floor(i.virtualSize - r) - Math.floor(g[g.length - 1]) > 1 &&
        g.push(i.virtualSize - r);
  }
  if (a && t.loop) {
    const T = m[0] + u;
    if (t.slidesPerGroup > 1) {
      const E = Math.ceil(
          (i.virtual.slidesBefore + i.virtual.slidesAfter) / t.slidesPerGroup
        ),
        M = T * t.slidesPerGroup;
      for (let x = 0; x < E; x += 1) g.push(g[g.length - 1] + M);
    }
    for (let E = 0; E < i.virtual.slidesBefore + i.virtual.slidesAfter; E += 1)
      t.slidesPerGroup === 1 && g.push(g[g.length - 1] + T),
        h.push(h[h.length - 1] + T),
        (i.virtualSize += T);
  }
  if ((g.length === 0 && (g = [0]), u !== 0)) {
    const T =
      i.isHorizontal() && o ? "marginLeft" : i.getDirectionLabel("marginRight");
    f.filter((E, M) =>
      !t.cssMode || t.loop ? !0 : M !== f.length - 1
    ).forEach((E) => {
      E.style[T] = `${u}px`;
    });
  }
  if (t.centeredSlides && t.centeredSlidesBounds) {
    let T = 0;
    m.forEach((M) => {
      T += M + (u || 0);
    }),
      (T -= u);
    const E = T > r ? T - r : 0;
    g = g.map((M) => (M <= 0 ? -v : M > E ? E + b : M));
  }
  if (t.centerInsufficientSlides) {
    let T = 0;
    m.forEach((M) => {
      T += M + (u || 0);
    }),
      (T -= u);
    const E = (t.slidesOffsetBefore || 0) + (t.slidesOffsetAfter || 0);
    if (T + E < r) {
      const M = (r - T - E) / 2;
      g.forEach((x, P) => {
        g[P] = x - M;
      }),
        h.forEach((x, P) => {
          h[P] = x + M;
        });
    }
  }
  if (
    (Object.assign(i, {
      slides: f,
      snapGrid: g,
      slidesGrid: h,
      slidesSizesGrid: m,
    }),
    t.centeredSlides && t.cssMode && !t.centeredSlidesBounds)
  ) {
    Y(s, "--swiper-centered-offset-before", `${-g[0]}px`),
      Y(
        s,
        "--swiper-centered-offset-after",
        `${i.size / 2 - m[m.length - 1] / 2}px`
      );
    const T = -i.snapGrid[0],
      E = -i.slidesGrid[0];
    (i.snapGrid = i.snapGrid.map((M) => M + T)),
      (i.slidesGrid = i.slidesGrid.map((M) => M + E));
  }
  if (
    (p !== c && i.emit("slidesLengthChange"),
    g.length !== w &&
      (i.params.watchOverflow && i.checkOverflow(),
      i.emit("snapGridLengthChange")),
    h.length !== d && i.emit("slidesGridLengthChange"),
    t.watchSlidesProgress && i.updateSlidesOffset(),
    i.emit("slidesUpdated"),
    !a && !t.cssMode && (t.effect === "slide" || t.effect === "fade"))
  ) {
    const T = `${t.containerModifierClass}backface-hidden`,
      E = i.el.classList.contains(T);
    p <= t.maxBackfaceHiddenSlides
      ? E || i.el.classList.add(T)
      : E && i.el.classList.remove(T);
  }
}
function je(i) {
  const e = this,
    t = [],
    s = e.virtual && e.params.virtual.enabled;
  let n = 0,
    r;
  typeof i == "number"
    ? e.setTransition(i)
    : i === !0 && e.setTransition(e.params.speed);
  const o = (l) => (s ? e.slides[e.getSlideIndexByData(l)] : e.slides[l]);
  if (e.params.slidesPerView !== "auto" && e.params.slidesPerView > 1)
    if (e.params.centeredSlides)
      (e.visibleSlides || []).forEach((l) => {
        t.push(l);
      });
    else
      for (r = 0; r < Math.ceil(e.params.slidesPerView); r += 1) {
        const l = e.activeIndex + r;
        if (l > e.slides.length && !s) break;
        t.push(o(l));
      }
  else t.push(o(e.activeIndex));
  for (r = 0; r < t.length; r += 1)
    if (typeof t[r] < "u") {
      const l = t[r].offsetHeight;
      n = l > n ? l : n;
    }
  (n || n === 0) && (e.wrapperEl.style.height = `${n}px`);
}
function Ye() {
  const i = this,
    e = i.slides,
    t = i.isElement
      ? i.isHorizontal()
        ? i.wrapperEl.offsetLeft
        : i.wrapperEl.offsetTop
      : 0;
  for (let s = 0; s < e.length; s += 1)
    e[s].swiperSlideOffset =
      (i.isHorizontal() ? e[s].offsetLeft : e[s].offsetTop) -
      t -
      i.cssOverflowAdjustment();
}
const ue = (i, e, t) => {
  e && !i.classList.contains(t)
    ? i.classList.add(t)
    : !e && i.classList.contains(t) && i.classList.remove(t);
};
function Xe(i) {
  i === void 0 && (i = (this && this.translate) || 0);
  const e = this,
    t = e.params,
    { slides: s, rtlTranslate: n, snapGrid: r } = e;
  if (s.length === 0) return;
  typeof s[0].swiperSlideOffset > "u" && e.updateSlidesOffset();
  let o = -i;
  n && (o = i), (e.visibleSlidesIndexes = []), (e.visibleSlides = []);
  let l = t.spaceBetween;
  typeof l == "string" && l.indexOf("%") >= 0
    ? (l = (parseFloat(l.replace("%", "")) / 100) * e.size)
    : typeof l == "string" && (l = parseFloat(l));
  for (let a = 0; a < s.length; a += 1) {
    const c = s[a];
    let f = c.swiperSlideOffset;
    t.cssMode && t.centeredSlides && (f -= s[0].swiperSlideOffset);
    const p =
        (o + (t.centeredSlides ? e.minTranslate() : 0) - f) /
        (c.swiperSlideSize + l),
      g =
        (o - r[0] + (t.centeredSlides ? e.minTranslate() : 0) - f) /
        (c.swiperSlideSize + l),
      h = -(o - f),
      m = h + e.slidesSizesGrid[a],
      v = h >= 0 && h <= e.size - e.slidesSizesGrid[a],
      b =
        (h >= 0 && h < e.size - 1) ||
        (m > 1 && m <= e.size) ||
        (h <= 0 && m >= e.size);
    b && (e.visibleSlides.push(c), e.visibleSlidesIndexes.push(a)),
      ue(c, b, t.slideVisibleClass),
      ue(c, v, t.slideFullyVisibleClass),
      (c.progress = n ? -p : p),
      (c.originalProgress = n ? -g : g);
  }
}
function Ue(i) {
  const e = this;
  if (typeof i > "u") {
    const f = e.rtlTranslate ? -1 : 1;
    i = (e && e.translate && e.translate * f) || 0;
  }
  const t = e.params,
    s = e.maxTranslate() - e.minTranslate();
  let { progress: n, isBeginning: r, isEnd: o, progressLoop: l } = e;
  const a = r,
    c = o;
  if (s === 0) (n = 0), (r = !0), (o = !0);
  else {
    n = (i - e.minTranslate()) / s;
    const f = Math.abs(i - e.minTranslate()) < 1,
      p = Math.abs(i - e.maxTranslate()) < 1;
    (r = f || n <= 0), (o = p || n >= 1), f && (n = 0), p && (n = 1);
  }
  if (t.loop) {
    const f = e.getSlideIndexByData(0),
      p = e.getSlideIndexByData(e.slides.length - 1),
      g = e.slidesGrid[f],
      h = e.slidesGrid[p],
      m = e.slidesGrid[e.slidesGrid.length - 1],
      v = Math.abs(i);
    v >= g ? (l = (v - g) / m) : (l = (v + m - h) / m), l > 1 && (l -= 1);
  }
  Object.assign(e, {
    progress: n,
    progressLoop: l,
    isBeginning: r,
    isEnd: o,
  }),
    (t.watchSlidesProgress || (t.centeredSlides && t.autoHeight)) &&
      e.updateSlidesProgress(i),
    r && !a && e.emit("reachBeginning toEdge"),
    o && !c && e.emit("reachEnd toEdge"),
    ((a && !r) || (c && !o)) && e.emit("fromEdge"),
    e.emit("progress", n);
}
const se = (i, e, t) => {
  e && !i.classList.contains(t)
    ? i.classList.add(t)
    : !e && i.classList.contains(t) && i.classList.remove(t);
};
function Ke() {
  const i = this,
    { slides: e, params: t, slidesEl: s, activeIndex: n } = i,
    r = i.virtual && t.virtual.enabled,
    o = i.grid && t.grid && t.grid.rows > 1,
    l = (p) => N(s, `.${t.slideClass}${p}, swiper-slide${p}`)[0];
  let a, c, f;
  if (r)
    if (t.loop) {
      let p = n - i.virtual.slidesBefore;
      p < 0 && (p = i.virtual.slides.length + p),
        p >= i.virtual.slides.length && (p -= i.virtual.slides.length),
        (a = l(`[data-swiper-slide-index="${p}"]`));
    } else a = l(`[data-swiper-slide-index="${n}"]`);
  else
    o
      ? ((a = e.filter((p) => p.column === n)[0]),
        (f = e.filter((p) => p.column === n + 1)[0]),
        (c = e.filter((p) => p.column === n - 1)[0]))
      : (a = e[n]);
  a &&
    (o ||
      ((f = Ge(a, `.${t.slideClass}, swiper-slide`)[0]),
      t.loop && !f && (f = e[0]),
      (c = De(a, `.${t.slideClass}, swiper-slide`)[0]),
      t.loop && !c === 0 && (c = e[e.length - 1]))),
    e.forEach((p) => {
      se(p, p === a, t.slideActiveClass),
        se(p, p === f, t.slideNextClass),
        se(p, p === c, t.slidePrevClass);
    }),
    i.emitSlidesClasses();
}
const X = (i, e) => {
    if (!i || i.destroyed || !i.params) return;
    const t = () => (i.isElement ? "swiper-slide" : `.${i.params.slideClass}`),
      s = e.closest(t());
    if (s) {
      let n = s.querySelector(`.${i.params.lazyPreloaderClass}`);
      !n &&
        i.isElement &&
        (s.shadowRoot
          ? (n = s.shadowRoot.querySelector(`.${i.params.lazyPreloaderClass}`))
          : requestAnimationFrame(() => {
              s.shadowRoot &&
                ((n = s.shadowRoot.querySelector(
                  `.${i.params.lazyPreloaderClass}`
                )),
                n && n.remove());
            })),
        n && n.remove();
    }
  },
  re = (i, e) => {
    if (!i.slides[e]) return;
    const t = i.slides[e].querySelector('[loading="lazy"]');
    t && t.removeAttribute("loading");
  },
  de = (i) => {
    if (!i || i.destroyed || !i.params) return;
    let e = i.params.lazyPreloadPrevNext;
    const t = i.slides.length;
    if (!t || !e || e < 0) return;
    e = Math.min(e, t);
    const s =
        i.params.slidesPerView === "auto"
          ? i.slidesPerViewDynamic()
          : Math.ceil(i.params.slidesPerView),
      n = i.activeIndex;
    if (i.params.grid && i.params.grid.rows > 1) {
      const o = n,
        l = [o - e];
      l.push(
        ...Array.from({
          length: e,
        }).map((a, c) => o + s + c)
      ),
        i.slides.forEach((a, c) => {
          l.includes(a.column) && re(i, c);
        });
      return;
    }
    const r = n + s - 1;
    if (i.params.rewind || i.params.loop)
      for (let o = n - e; o <= r + e; o += 1) {
        const l = ((o % t) + t) % t;
        (l < n || l > r) && re(i, l);
      }
    else
      for (let o = Math.max(n - e, 0); o <= Math.min(r + e, t - 1); o += 1)
        o !== n && (o > r || o < n) && re(i, o);
  };
function Je(i) {
  const { slidesGrid: e, params: t } = i,
    s = i.rtlTranslate ? i.translate : -i.translate;
  let n;
  for (let r = 0; r < e.length; r += 1)
    typeof e[r + 1] < "u"
      ? s >= e[r] && s < e[r + 1] - (e[r + 1] - e[r]) / 2
        ? (n = r)
        : s >= e[r] && s < e[r + 1] && (n = r + 1)
      : s >= e[r] && (n = r);
  return t.normalizeSlideIndex && (n < 0 || typeof n > "u") && (n = 0), n;
}
function Qe(i) {
  const e = this,
    t = e.rtlTranslate ? e.translate : -e.translate,
    { snapGrid: s, params: n, activeIndex: r, realIndex: o, snapIndex: l } = e;
  let a = i,
    c;
  const f = (h) => {
    let m = h - e.virtual.slidesBefore;
    return (
      m < 0 && (m = e.virtual.slides.length + m),
      m >= e.virtual.slides.length && (m -= e.virtual.slides.length),
      m
    );
  };
  if ((typeof a > "u" && (a = Je(e)), s.indexOf(t) >= 0)) c = s.indexOf(t);
  else {
    const h = Math.min(n.slidesPerGroupSkip, a);
    c = h + Math.floor((a - h) / n.slidesPerGroup);
  }
  if ((c >= s.length && (c = s.length - 1), a === r && !e.params.loop)) {
    c !== l && ((e.snapIndex = c), e.emit("snapIndexChange"));
    return;
  }
  if (a === r && e.params.loop && e.virtual && e.params.virtual.enabled) {
    e.realIndex = f(a);
    return;
  }
  const p = e.grid && n.grid && n.grid.rows > 1;
  let g;
  if (e.virtual && n.virtual.enabled && n.loop) g = f(a);
  else if (p) {
    const h = e.slides.filter((v) => v.column === a)[0];
    let m = parseInt(h.getAttribute("data-swiper-slide-index"), 10);
    Number.isNaN(m) && (m = Math.max(e.slides.indexOf(h), 0)),
      (g = Math.floor(m / n.grid.rows));
  } else if (e.slides[a]) {
    const h = e.slides[a].getAttribute("data-swiper-slide-index");
    h ? (g = parseInt(h, 10)) : (g = a);
  } else g = a;
  Object.assign(e, {
    previousSnapIndex: l,
    snapIndex: c,
    previousRealIndex: o,
    realIndex: g,
    previousIndex: r,
    activeIndex: a,
  }),
    e.initialized && de(e),
    e.emit("activeIndexChange"),
    e.emit("snapIndexChange"),
    (e.initialized || e.params.runCallbacksOnInit) &&
      (o !== g && e.emit("realIndexChange"), e.emit("slideChange"));
}
function Ze(i, e) {
  const t = this,
    s = t.params;
  let n = i.closest(`.${s.slideClass}, swiper-slide`);
  !n &&
    t.isElement &&
    e &&
    e.length > 1 &&
    e.includes(i) &&
    [...e.slice(e.indexOf(i) + 1, e.length)].forEach((l) => {
      !n && l.matches && l.matches(`.${s.slideClass}, swiper-slide`) && (n = l);
    });
  let r = !1,
    o;
  if (n) {
    for (let l = 0; l < t.slides.length; l += 1)
      if (t.slides[l] === n) {
        (r = !0), (o = l);
        break;
      }
  }
  if (n && r)
    (t.clickedSlide = n),
      t.virtual && t.params.virtual.enabled
        ? (t.clickedIndex = parseInt(
            n.getAttribute("data-swiper-slide-index"),
            10
          ))
        : (t.clickedIndex = o);
  else {
    (t.clickedSlide = void 0), (t.clickedIndex = void 0);
    return;
  }
  s.slideToClickedSlide &&
    t.clickedIndex !== void 0 &&
    t.clickedIndex !== t.activeIndex &&
    t.slideToClickedSlide();
}
var et = {
  updateSize: qe,
  updateSlides: We,
  updateAutoHeight: je,
  updateSlidesOffset: Ye,
  updateSlidesProgress: Xe,
  updateProgress: Ue,
  updateSlidesClasses: Ke,
  updateActiveIndex: Qe,
  updateClickedSlide: Ze,
};
function tt(i) {
  i === void 0 && (i = this.isHorizontal() ? "x" : "y");
  const e = this,
    { params: t, rtlTranslate: s, translate: n, wrapperEl: r } = e;
  if (t.virtualTranslate) return s ? -n : n;
  if (t.cssMode) return n;
  let o = Ae(r, i);
  return (o += e.cssOverflowAdjustment()), s && (o = -o), o || 0;
}
function it(i, e) {
  const t = this,
    { rtlTranslate: s, params: n, wrapperEl: r, progress: o } = t;
  let l = 0,
    a = 0;
  const c = 0;
  t.isHorizontal() ? (l = s ? -i : i) : (a = i),
    n.roundLengths && ((l = Math.floor(l)), (a = Math.floor(a))),
    (t.previousTranslate = t.translate),
    (t.translate = t.isHorizontal() ? l : a),
    n.cssMode
      ? (r[t.isHorizontal() ? "scrollLeft" : "scrollTop"] = t.isHorizontal()
          ? -l
          : -a)
      : n.virtualTranslate ||
        (t.isHorizontal()
          ? (l -= t.cssOverflowAdjustment())
          : (a -= t.cssOverflowAdjustment()),
        (r.style.transform = `translate3d(${l}px, ${a}px, ${c}px)`));
  let f;
  const p = t.maxTranslate() - t.minTranslate();
  p === 0 ? (f = 0) : (f = (i - t.minTranslate()) / p),
    f !== o && t.updateProgress(i),
    t.emit("setTranslate", t.translate, e);
}
function st() {
  return -this.snapGrid[0];
}
function rt() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function nt(i, e, t, s, n) {
  i === void 0 && (i = 0),
    e === void 0 && (e = this.params.speed),
    t === void 0 && (t = !0),
    s === void 0 && (s = !0);
  const r = this,
    { params: o, wrapperEl: l } = r;
  if (r.animating && o.preventInteractionOnTransition) return !1;
  const a = r.minTranslate(),
    c = r.maxTranslate();
  let f;
  if (
    (s && i > a ? (f = a) : s && i < c ? (f = c) : (f = i),
    r.updateProgress(f),
    o.cssMode)
  ) {
    const p = r.isHorizontal();
    if (e === 0) l[p ? "scrollLeft" : "scrollTop"] = -f;
    else {
      if (!r.support.smoothScroll)
        return (
          we({
            swiper: r,
            targetPosition: -f,
            side: p ? "left" : "top",
          }),
          !0
        );
      l.scrollTo({
        [p ? "left" : "top"]: -f,
        behavior: "smooth",
      });
    }
    return !0;
  }
  return (
    e === 0
      ? (r.setTransition(0),
        r.setTranslate(f),
        t && (r.emit("beforeTransitionStart", e, n), r.emit("transitionEnd")))
      : (r.setTransition(e),
        r.setTranslate(f),
        t && (r.emit("beforeTransitionStart", e, n), r.emit("transitionStart")),
        r.animating ||
          ((r.animating = !0),
          r.onTranslateToWrapperTransitionEnd ||
            (r.onTranslateToWrapperTransitionEnd = function (g) {
              !r ||
                r.destroyed ||
                (g.target === this &&
                  (r.wrapperEl.removeEventListener(
                    "transitionend",
                    r.onTranslateToWrapperTransitionEnd
                  ),
                  (r.onTranslateToWrapperTransitionEnd = null),
                  delete r.onTranslateToWrapperTransitionEnd,
                  (r.animating = !1),
                  t && r.emit("transitionEnd")));
            }),
          r.wrapperEl.addEventListener(
            "transitionend",
            r.onTranslateToWrapperTransitionEnd
          ))),
    !0
  );
}
var at = {
  getTranslate: tt,
  setTranslate: it,
  minTranslate: st,
  maxTranslate: rt,
  translateTo: nt,
};
function lt(i, e) {
  const t = this;
  t.params.cssMode ||
    ((t.wrapperEl.style.transitionDuration = `${i}ms`),
    (t.wrapperEl.style.transitionDelay = i === 0 ? "0ms" : "")),
    t.emit("setTransition", i, e);
}
function xe(i) {
  let { swiper: e, runCallbacks: t, direction: s, step: n } = i;
  const { activeIndex: r, previousIndex: o } = e;
  let l = s;
  if (
    (l || (r > o ? (l = "next") : r < o ? (l = "prev") : (l = "reset")),
    e.emit(`transition${n}`),
    t && r !== o)
  ) {
    if (l === "reset") {
      e.emit(`slideResetTransition${n}`);
      return;
    }
    e.emit(`slideChangeTransition${n}`),
      l === "next"
        ? e.emit(`slideNextTransition${n}`)
        : e.emit(`slidePrevTransition${n}`);
  }
}
function ot(i, e) {
  i === void 0 && (i = !0);
  const t = this,
    { params: s } = t;
  s.cssMode ||
    (s.autoHeight && t.updateAutoHeight(),
    xe({
      swiper: t,
      runCallbacks: i,
      direction: e,
      step: "Start",
    }));
}
function dt(i, e) {
  i === void 0 && (i = !0);
  const t = this,
    { params: s } = t;
  (t.animating = !1),
    !s.cssMode &&
      (t.setTransition(0),
      xe({
        swiper: t,
        runCallbacks: i,
        direction: e,
        step: "End",
      }));
}
var ct = {
  setTransition: lt,
  transitionStart: ot,
  transitionEnd: dt,
};
function ft(i, e, t, s, n) {
  i === void 0 && (i = 0),
    t === void 0 && (t = !0),
    typeof i == "string" && (i = parseInt(i, 10));
  const r = this;
  let o = i;
  o < 0 && (o = 0);
  const {
    params: l,
    snapGrid: a,
    slidesGrid: c,
    previousIndex: f,
    activeIndex: p,
    rtlTranslate: g,
    wrapperEl: h,
    enabled: m,
  } = r;
  if (
    (!m && !s && !n) ||
    r.destroyed ||
    (r.animating && l.preventInteractionOnTransition)
  )
    return !1;
  typeof e > "u" && (e = r.params.speed);
  const v = Math.min(r.params.slidesPerGroupSkip, o);
  let b = v + Math.floor((o - v) / r.params.slidesPerGroup);
  b >= a.length && (b = a.length - 1);
  const w = -a[b];
  if (l.normalizeSlideIndex)
    for (let S = 0; S < c.length; S += 1) {
      const C = -Math.floor(w * 100),
        z = Math.floor(c[S] * 100),
        L = Math.floor(c[S + 1] * 100);
      typeof c[S + 1] < "u"
        ? C >= z && C < L - (L - z) / 2
          ? (o = S)
          : C >= z && C < L && (o = S + 1)
        : C >= z && (o = S);
    }
  if (
    r.initialized &&
    o !== p &&
    ((!r.allowSlideNext &&
      (g
        ? w > r.translate && w > r.minTranslate()
        : w < r.translate && w < r.minTranslate())) ||
      (!r.allowSlidePrev &&
        w > r.translate &&
        w > r.maxTranslate() &&
        (p || 0) !== o))
  )
    return !1;
  o !== (f || 0) && t && r.emit("beforeSlideChangeStart"), r.updateProgress(w);
  let d;
  o > p ? (d = "next") : o < p ? (d = "prev") : (d = "reset");
  const u = r.virtual && r.params.virtual.enabled;
  if (!(u && n) && ((g && -w === r.translate) || (!g && w === r.translate)))
    return (
      r.updateActiveIndex(o),
      l.autoHeight && r.updateAutoHeight(),
      r.updateSlidesClasses(),
      l.effect !== "slide" && r.setTranslate(w),
      d !== "reset" && (r.transitionStart(t, d), r.transitionEnd(t, d)),
      !1
    );
  if (l.cssMode) {
    const S = r.isHorizontal(),
      C = g ? w : -w;
    if (e === 0)
      u &&
        ((r.wrapperEl.style.scrollSnapType = "none"),
        (r._immediateVirtual = !0)),
        u && !r._cssModeVirtualInitialSet && r.params.initialSlide > 0
          ? ((r._cssModeVirtualInitialSet = !0),
            requestAnimationFrame(() => {
              h[S ? "scrollLeft" : "scrollTop"] = C;
            }))
          : (h[S ? "scrollLeft" : "scrollTop"] = C),
        u &&
          requestAnimationFrame(() => {
            (r.wrapperEl.style.scrollSnapType = ""), (r._immediateVirtual = !1);
          });
    else {
      if (!r.support.smoothScroll)
        return (
          we({
            swiper: r,
            targetPosition: C,
            side: S ? "left" : "top",
          }),
          !0
        );
      h.scrollTo({
        [S ? "left" : "top"]: C,
        behavior: "smooth",
      });
    }
    return !0;
  }
  return (
    r.setTransition(e),
    r.setTranslate(w),
    r.updateActiveIndex(o),
    r.updateSlidesClasses(),
    r.emit("beforeTransitionStart", e, s),
    r.transitionStart(t, d),
    e === 0
      ? r.transitionEnd(t, d)
      : r.animating ||
        ((r.animating = !0),
        r.onSlideToWrapperTransitionEnd ||
          (r.onSlideToWrapperTransitionEnd = function (C) {
            !r ||
              r.destroyed ||
              (C.target === this &&
                (r.wrapperEl.removeEventListener(
                  "transitionend",
                  r.onSlideToWrapperTransitionEnd
                ),
                (r.onSlideToWrapperTransitionEnd = null),
                delete r.onSlideToWrapperTransitionEnd,
                r.transitionEnd(t, d)));
          }),
        r.wrapperEl.addEventListener(
          "transitionend",
          r.onSlideToWrapperTransitionEnd
        )),
    !0
  );
}
function ut(i, e, t, s) {
  i === void 0 && (i = 0),
    t === void 0 && (t = !0),
    typeof i == "string" && (i = parseInt(i, 10));
  const n = this;
  if (n.destroyed) return;
  typeof e > "u" && (e = n.params.speed);
  const r = n.grid && n.params.grid && n.params.grid.rows > 1;
  let o = i;
  if (n.params.loop)
    if (n.virtual && n.params.virtual.enabled) o = o + n.virtual.slidesBefore;
    else {
      let l;
      if (r) {
        const g = o * n.params.grid.rows;
        l = n.slides.filter(
          (h) => h.getAttribute("data-swiper-slide-index") * 1 === g
        )[0].column;
      } else l = n.getSlideIndexByData(o);
      const a = r
          ? Math.ceil(n.slides.length / n.params.grid.rows)
          : n.slides.length,
        { centeredSlides: c } = n.params;
      let f = n.params.slidesPerView;
      f === "auto"
        ? (f = n.slidesPerViewDynamic())
        : ((f = Math.ceil(parseFloat(n.params.slidesPerView, 10))),
          c && f % 2 === 0 && (f = f + 1));
      let p = a - l < f;
      if (
        (c && (p = p || l < Math.ceil(f / 2)),
        s && c && n.params.slidesPerView !== "auto" && !r && (p = !1),
        p)
      ) {
        const g = c
          ? l < n.activeIndex
            ? "prev"
            : "next"
          : l - n.activeIndex - 1 < n.params.slidesPerView
          ? "next"
          : "prev";
        n.loopFix({
          direction: g,
          slideTo: !0,
          activeSlideIndex: g === "next" ? l + 1 : l - a + 1,
          slideRealIndex: g === "next" ? n.realIndex : void 0,
        });
      }
      if (r) {
        const g = o * n.params.grid.rows;
        o = n.slides.filter(
          (h) => h.getAttribute("data-swiper-slide-index") * 1 === g
        )[0].column;
      } else o = n.getSlideIndexByData(o);
    }
  return (
    requestAnimationFrame(() => {
      n.slideTo(o, e, t, s);
    }),
    n
  );
}
function pt(i, e, t) {
  e === void 0 && (e = !0);
  const s = this,
    { enabled: n, params: r, animating: o } = s;
  if (!n || s.destroyed) return s;
  typeof i > "u" && (i = s.params.speed);
  let l = r.slidesPerGroup;
  r.slidesPerView === "auto" &&
    r.slidesPerGroup === 1 &&
    r.slidesPerGroupAuto &&
    (l = Math.max(s.slidesPerViewDynamic("current", !0), 1));
  const a = s.activeIndex < r.slidesPerGroupSkip ? 1 : l,
    c = s.virtual && r.virtual.enabled;
  if (r.loop) {
    if (o && !c && r.loopPreventsSliding) return !1;
    if (
      (s.loopFix({
        direction: "next",
      }),
      (s._clientLeft = s.wrapperEl.clientLeft),
      s.activeIndex === s.slides.length - 1 && r.cssMode)
    )
      return (
        requestAnimationFrame(() => {
          s.slideTo(s.activeIndex + a, i, e, t);
        }),
        !0
      );
  }
  return r.rewind && s.isEnd
    ? s.slideTo(0, i, e, t)
    : s.slideTo(s.activeIndex + a, i, e, t);
}
function mt(i, e, t) {
  e === void 0 && (e = !0);
  const s = this,
    {
      params: n,
      snapGrid: r,
      slidesGrid: o,
      rtlTranslate: l,
      enabled: a,
      animating: c,
    } = s;
  if (!a || s.destroyed) return s;
  typeof i > "u" && (i = s.params.speed);
  const f = s.virtual && n.virtual.enabled;
  if (n.loop) {
    if (c && !f && n.loopPreventsSliding) return !1;
    s.loopFix({
      direction: "prev",
    }),
      (s._clientLeft = s.wrapperEl.clientLeft);
  }
  const p = l ? s.translate : -s.translate;
  function g(w) {
    return w < 0 ? -Math.floor(Math.abs(w)) : Math.floor(w);
  }
  const h = g(p),
    m = r.map((w) => g(w));
  let v = r[m.indexOf(h) - 1];
  if (typeof v > "u" && n.cssMode) {
    let w;
    r.forEach((d, u) => {
      h >= d && (w = u);
    }),
      typeof w < "u" && (v = r[w > 0 ? w - 1 : w]);
  }
  let b = 0;
  if (
    (typeof v < "u" &&
      ((b = o.indexOf(v)),
      b < 0 && (b = s.activeIndex - 1),
      n.slidesPerView === "auto" &&
        n.slidesPerGroup === 1 &&
        n.slidesPerGroupAuto &&
        ((b = b - s.slidesPerViewDynamic("previous", !0) + 1),
        (b = Math.max(b, 0)))),
    n.rewind && s.isBeginning)
  ) {
    const w =
      s.params.virtual && s.params.virtual.enabled && s.virtual
        ? s.virtual.slides.length - 1
        : s.slides.length - 1;
    return s.slideTo(w, i, e, t);
  } else if (n.loop && s.activeIndex === 0 && n.cssMode)
    return (
      requestAnimationFrame(() => {
        s.slideTo(b, i, e, t);
      }),
      !0
    );
  return s.slideTo(b, i, e, t);
}
function ht(i, e, t) {
  e === void 0 && (e = !0);
  const s = this;
  if (!s.destroyed)
    return (
      typeof i > "u" && (i = s.params.speed), s.slideTo(s.activeIndex, i, e, t)
    );
}
function gt(i, e, t, s) {
  e === void 0 && (e = !0), s === void 0 && (s = 0.5);
  const n = this;
  if (n.destroyed) return;
  typeof i > "u" && (i = n.params.speed);
  let r = n.activeIndex;
  const o = Math.min(n.params.slidesPerGroupSkip, r),
    l = o + Math.floor((r - o) / n.params.slidesPerGroup),
    a = n.rtlTranslate ? n.translate : -n.translate;
  if (a >= n.snapGrid[l]) {
    const c = n.snapGrid[l],
      f = n.snapGrid[l + 1];
    a - c > (f - c) * s && (r += n.params.slidesPerGroup);
  } else {
    const c = n.snapGrid[l - 1],
      f = n.snapGrid[l];
    a - c <= (f - c) * s && (r -= n.params.slidesPerGroup);
  }
  return (
    (r = Math.max(r, 0)),
    (r = Math.min(r, n.slidesGrid.length - 1)),
    n.slideTo(r, i, e, t)
  );
}
function vt() {
  const i = this;
  if (i.destroyed) return;
  const { params: e, slidesEl: t } = i,
    s = e.slidesPerView === "auto" ? i.slidesPerViewDynamic() : e.slidesPerView;
  let n = i.clickedIndex,
    r;
  const o = i.isElement ? "swiper-slide" : `.${e.slideClass}`;
  if (e.loop) {
    if (i.animating) return;
    (r = parseInt(i.clickedSlide.getAttribute("data-swiper-slide-index"), 10)),
      e.centeredSlides
        ? n < i.loopedSlides - s / 2 ||
          n > i.slides.length - i.loopedSlides + s / 2
          ? (i.loopFix(),
            (n = i.getSlideIndex(
              N(t, `${o}[data-swiper-slide-index="${r}"]`)[0]
            )),
            le(() => {
              i.slideTo(n);
            }))
          : i.slideTo(n)
        : n > i.slides.length - s
        ? (i.loopFix(),
          (n = i.getSlideIndex(
            N(t, `${o}[data-swiper-slide-index="${r}"]`)[0]
          )),
          le(() => {
            i.slideTo(n);
          }))
        : i.slideTo(n);
  } else i.slideTo(n);
}
var wt = {
  slideTo: ft,
  slideToLoop: ut,
  slideNext: pt,
  slidePrev: mt,
  slideReset: ht,
  slideToClosest: gt,
  slideToClickedSlide: vt,
};
function yt(i) {
  const e = this,
    { params: t, slidesEl: s } = e;
  if (!t.loop || (e.virtual && e.params.virtual.enabled)) return;
  const n = () => {
      N(s, `.${t.slideClass}, swiper-slide`).forEach((p, g) => {
        p.setAttribute("data-swiper-slide-index", g);
      });
    },
    r = e.grid && t.grid && t.grid.rows > 1,
    o = t.slidesPerGroup * (r ? t.grid.rows : 1),
    l = e.slides.length % o !== 0,
    a = r && e.slides.length % t.grid.rows !== 0,
    c = (f) => {
      for (let p = 0; p < f; p += 1) {
        const g = e.isElement
          ? J("swiper-slide", [t.slideBlankClass])
          : J("div", [t.slideClass, t.slideBlankClass]);
        e.slidesEl.append(g);
      }
    };
  if (l) {
    if (t.loopAddBlankSlides) {
      const f = o - (e.slides.length % o);
      c(f), e.recalcSlides(), e.updateSlides();
    } else
      K(
        "Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)"
      );
    n();
  } else if (a) {
    if (t.loopAddBlankSlides) {
      const f = t.grid.rows - (e.slides.length % t.grid.rows);
      c(f), e.recalcSlides(), e.updateSlides();
    } else
      K(
        "Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)"
      );
    n();
  } else n();
  e.loopFix({
    slideRealIndex: i,
    direction: t.centeredSlides ? void 0 : "next",
  });
}
function St(i) {
  let {
    slideRealIndex: e,
    slideTo: t = !0,
    direction: s,
    setTranslate: n,
    activeSlideIndex: r,
    byController: o,
    byMousewheel: l,
  } = i === void 0 ? {} : i;
  const a = this;
  if (!a.params.loop) return;
  a.emit("beforeLoopFix");
  const {
      slides: c,
      allowSlidePrev: f,
      allowSlideNext: p,
      slidesEl: g,
      params: h,
    } = a,
    { centeredSlides: m } = h;
  if (
    ((a.allowSlidePrev = !0),
    (a.allowSlideNext = !0),
    a.virtual && h.virtual.enabled)
  ) {
    t &&
      (!h.centeredSlides && a.snapIndex === 0
        ? a.slideTo(a.virtual.slides.length, 0, !1, !0)
        : h.centeredSlides && a.snapIndex < h.slidesPerView
        ? a.slideTo(a.virtual.slides.length + a.snapIndex, 0, !1, !0)
        : a.snapIndex === a.snapGrid.length - 1 &&
          a.slideTo(a.virtual.slidesBefore, 0, !1, !0)),
      (a.allowSlidePrev = f),
      (a.allowSlideNext = p),
      a.emit("loopFix");
    return;
  }
  let v = h.slidesPerView;
  v === "auto"
    ? (v = a.slidesPerViewDynamic())
    : ((v = Math.ceil(parseFloat(h.slidesPerView, 10))),
      m && v % 2 === 0 && (v = v + 1));
  const b = h.slidesPerGroupAuto ? v : h.slidesPerGroup;
  let w = b;
  w % b !== 0 && (w += b - (w % b)),
    (w += h.loopAdditionalSlides),
    (a.loopedSlides = w);
  const d = a.grid && h.grid && h.grid.rows > 1;
  c.length < v + w
    ? K(
        "Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters"
      )
    : d &&
      h.grid.fill === "row" &&
      K(
        "Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`"
      );
  const u = [],
    y = [];
  let S = a.activeIndex;
  typeof r > "u"
    ? (r = a.getSlideIndex(
        c.filter((x) => x.classList.contains(h.slideActiveClass))[0]
      ))
    : (S = r);
  const C = s === "next" || !s,
    z = s === "prev" || !s;
  let L = 0,
    I = 0;
  const T = d ? Math.ceil(c.length / h.grid.rows) : c.length,
    M = (d ? c[r].column : r) + (m && typeof n > "u" ? -v / 2 + 0.5 : 0);
  if (M < w) {
    L = Math.max(w - M, b);
    for (let x = 0; x < w - M; x += 1) {
      const P = x - Math.floor(x / T) * T;
      if (d) {
        const O = T - P - 1;
        for (let D = c.length - 1; D >= 0; D -= 1)
          c[D].column === O && u.push(D);
      } else u.push(T - P - 1);
    }
  } else if (M + v > T - w) {
    I = Math.max(M - (T - w * 2), b);
    for (let x = 0; x < I; x += 1) {
      const P = x - Math.floor(x / T) * T;
      d
        ? c.forEach((O, D) => {
            O.column === P && y.push(D);
          })
        : y.push(P);
    }
  }
  if (
    ((a.__preventObserver__ = !0),
    requestAnimationFrame(() => {
      a.__preventObserver__ = !1;
    }),
    z &&
      u.forEach((x) => {
        (c[x].swiperLoopMoveDOM = !0),
          g.prepend(c[x]),
          (c[x].swiperLoopMoveDOM = !1);
      }),
    C &&
      y.forEach((x) => {
        (c[x].swiperLoopMoveDOM = !0),
          g.append(c[x]),
          (c[x].swiperLoopMoveDOM = !1);
      }),
    a.recalcSlides(),
    h.slidesPerView === "auto"
      ? a.updateSlides()
      : d &&
        ((u.length > 0 && z) || (y.length > 0 && C)) &&
        a.slides.forEach((x, P) => {
          a.grid.updateSlide(P, x, a.slides);
        }),
    h.watchSlidesProgress && a.updateSlidesOffset(),
    t)
  ) {
    if (u.length > 0 && z) {
      if (typeof e > "u") {
        const x = a.slidesGrid[S],
          O = a.slidesGrid[S + L] - x;
        l
          ? a.setTranslate(a.translate - O)
          : (a.slideTo(S + Math.ceil(L), 0, !1, !0),
            n &&
              ((a.touchEventsData.startTranslate =
                a.touchEventsData.startTranslate - O),
              (a.touchEventsData.currentTranslate =
                a.touchEventsData.currentTranslate - O)));
      } else if (n) {
        const x = d ? u.length / h.grid.rows : u.length;
        a.slideTo(a.activeIndex + x, 0, !1, !0),
          (a.touchEventsData.currentTranslate = a.translate);
      }
    } else if (y.length > 0 && C)
      if (typeof e > "u") {
        const x = a.slidesGrid[S],
          O = a.slidesGrid[S - I] - x;
        l
          ? a.setTranslate(a.translate - O)
          : (a.slideTo(S - I, 0, !1, !0),
            n &&
              ((a.touchEventsData.startTranslate =
                a.touchEventsData.startTranslate - O),
              (a.touchEventsData.currentTranslate =
                a.touchEventsData.currentTranslate - O)));
      } else {
        const x = d ? y.length / h.grid.rows : y.length;
        a.slideTo(a.activeIndex - x, 0, !1, !0);
      }
  }
  if (
    ((a.allowSlidePrev = f),
    (a.allowSlideNext = p),
    a.controller && a.controller.control && !o)
  ) {
    const x = {
      slideRealIndex: e,
      direction: s,
      setTranslate: n,
      activeSlideIndex: r,
      byController: !0,
    };
    Array.isArray(a.controller.control)
      ? a.controller.control.forEach((P) => {
          !P.destroyed &&
            P.params.loop &&
            P.loopFix({
              ...x,
              slideTo: P.params.slidesPerView === h.slidesPerView ? t : !1,
            });
        })
      : a.controller.control instanceof a.constructor &&
        a.controller.control.params.loop &&
        a.controller.control.loopFix({
          ...x,
          slideTo:
            a.controller.control.params.slidesPerView === h.slidesPerView
              ? t
              : !1,
        });
  }
  a.emit("loopFix");
}
function Tt() {
  const i = this,
    { params: e, slidesEl: t } = i;
  if (!e.loop || (i.virtual && i.params.virtual.enabled)) return;
  i.recalcSlides();
  const s = [];
  i.slides.forEach((n) => {
    const r =
      typeof n.swiperSlideIndex > "u"
        ? n.getAttribute("data-swiper-slide-index") * 1
        : n.swiperSlideIndex;
    s[r] = n;
  }),
    i.slides.forEach((n) => {
      n.removeAttribute("data-swiper-slide-index");
    }),
    s.forEach((n) => {
      t.append(n);
    }),
    i.recalcSlides(),
    i.slideTo(i.realIndex, 0);
}
var bt = {
  loopCreate: yt,
  loopFix: St,
  loopDestroy: Tt,
};
function xt(i) {
  const e = this;
  if (
    !e.params.simulateTouch ||
    (e.params.watchOverflow && e.isLocked) ||
    e.params.cssMode
  )
    return;
  const t = e.params.touchEventsTarget === "container" ? e.el : e.wrapperEl;
  e.isElement && (e.__preventObserver__ = !0),
    (t.style.cursor = "move"),
    (t.style.cursor = i ? "grabbing" : "grab"),
    e.isElement &&
      requestAnimationFrame(() => {
        e.__preventObserver__ = !1;
      });
}
function Et() {
  const i = this;
  (i.params.watchOverflow && i.isLocked) ||
    i.params.cssMode ||
    (i.isElement && (i.__preventObserver__ = !0),
    (i[
      i.params.touchEventsTarget === "container" ? "el" : "wrapperEl"
    ].style.cursor = ""),
    i.isElement &&
      requestAnimationFrame(() => {
        i.__preventObserver__ = !1;
      }));
}
var Ct = {
  setGrabCursor: xt,
  unsetGrabCursor: Et,
};
function Mt(i, e) {
  e === void 0 && (e = this);
  function t(s) {
    if (!s || s === _() || s === $()) return null;
    s.assignedSlot && (s = s.assignedSlot);
    const n = s.closest(i);
    return !n && !s.getRootNode ? null : n || t(s.getRootNode().host);
  }
  return t(e);
}
function pe(i, e, t) {
  const s = $(),
    { params: n } = i,
    r = n.edgeSwipeDetection,
    o = n.edgeSwipeThreshold;
  return r && (t <= o || t >= s.innerWidth - o)
    ? r === "prevent"
      ? (e.preventDefault(), !0)
      : !1
    : !0;
}
function Pt(i) {
  const e = this,
    t = _();
  let s = i;
  s.originalEvent && (s = s.originalEvent);
  const n = e.touchEventsData;
  if (s.type === "pointerdown") {
    if (n.pointerId !== null && n.pointerId !== s.pointerId) return;
    n.pointerId = s.pointerId;
  } else
    s.type === "touchstart" &&
      s.targetTouches.length === 1 &&
      (n.touchId = s.targetTouches[0].identifier);
  if (s.type === "touchstart") {
    pe(e, s, s.targetTouches[0].pageX);
    return;
  }
  const { params: r, touches: o, enabled: l } = e;
  if (
    !l ||
    (!r.simulateTouch && s.pointerType === "mouse") ||
    (e.animating && r.preventInteractionOnTransition)
  )
    return;
  !e.animating && r.cssMode && r.loop && e.loopFix();
  let a = s.target;
  if (
    (r.touchEventsTarget === "wrapper" && !ke(a, e.wrapperEl)) ||
    ("which" in s && s.which === 3) ||
    ("button" in s && s.button > 0) ||
    (n.isTouched && n.isMoved)
  )
    return;
  const c = !!r.noSwipingClass && r.noSwipingClass !== "",
    f = s.composedPath ? s.composedPath() : s.path;
  c && s.target && s.target.shadowRoot && f && (a = f[0]);
  const p = r.noSwipingSelector ? r.noSwipingSelector : `.${r.noSwipingClass}`,
    g = !!(s.target && s.target.shadowRoot);
  if (r.noSwiping && (g ? Mt(p, a) : a.closest(p))) {
    e.allowClick = !0;
    return;
  }
  if (r.swipeHandler && !a.closest(r.swipeHandler)) return;
  (o.currentX = s.pageX), (o.currentY = s.pageY);
  const h = o.currentX,
    m = o.currentY;
  if (!pe(e, s, h)) return;
  Object.assign(n, {
    isTouched: !0,
    isMoved: !1,
    allowTouchCallbacks: !0,
    isScrolling: void 0,
    startMoving: void 0,
  }),
    (o.startX = h),
    (o.startY = m),
    (n.touchStartTime = U()),
    (e.allowClick = !0),
    e.updateSize(),
    (e.swipeDirection = void 0),
    r.threshold > 0 && (n.allowThresholdMove = !1);
  let v = !0;
  a.matches(n.focusableElements) &&
    ((v = !1), a.nodeName === "SELECT" && (n.isTouched = !1)),
    t.activeElement &&
      t.activeElement.matches(n.focusableElements) &&
      t.activeElement !== a &&
      (s.pointerType === "mouse" ||
        (s.pointerType !== "mouse" && !a.matches(n.focusableElements))) &&
      t.activeElement.blur();
  const b = v && e.allowTouchMove && r.touchStartPreventDefault;
  (r.touchStartForcePreventDefault || b) &&
    !a.isContentEditable &&
    s.preventDefault(),
    r.freeMode &&
      r.freeMode.enabled &&
      e.freeMode &&
      e.animating &&
      !r.cssMode &&
      e.freeMode.onTouchStart(),
    e.emit("touchStart", s);
}
function Lt(i) {
  const e = _(),
    t = this,
    s = t.touchEventsData,
    { params: n, touches: r, rtlTranslate: o, enabled: l } = t;
  if (!l || (!n.simulateTouch && i.pointerType === "mouse")) return;
  let a = i;
  if (
    (a.originalEvent && (a = a.originalEvent),
    a.type === "pointermove" &&
      (s.touchId !== null || a.pointerId !== s.pointerId))
  )
    return;
  let c;
  if (a.type === "touchmove") {
    if (
      ((c = [...a.changedTouches].filter((C) => C.identifier === s.touchId)[0]),
      !c || c.identifier !== s.touchId)
    )
      return;
  } else c = a;
  if (!s.isTouched) {
    s.startMoving && s.isScrolling && t.emit("touchMoveOpposite", a);
    return;
  }
  const f = c.pageX,
    p = c.pageY;
  if (a.preventedByNestedSwiper) {
    (r.startX = f), (r.startY = p);
    return;
  }
  if (!t.allowTouchMove) {
    a.target.matches(s.focusableElements) || (t.allowClick = !1),
      s.isTouched &&
        (Object.assign(r, {
          startX: f,
          startY: p,
          currentX: f,
          currentY: p,
        }),
        (s.touchStartTime = U()));
    return;
  }
  if (n.touchReleaseOnEdges && !n.loop) {
    if (t.isVertical()) {
      if (
        (p < r.startY && t.translate <= t.maxTranslate()) ||
        (p > r.startY && t.translate >= t.minTranslate())
      ) {
        (s.isTouched = !1), (s.isMoved = !1);
        return;
      }
    } else if (
      (f < r.startX && t.translate <= t.maxTranslate()) ||
      (f > r.startX && t.translate >= t.minTranslate())
    )
      return;
  }
  if (
    (e.activeElement &&
      e.activeElement.matches(s.focusableElements) &&
      e.activeElement !== a.target &&
      a.pointerType !== "mouse" &&
      e.activeElement.blur(),
    e.activeElement &&
      a.target === e.activeElement &&
      a.target.matches(s.focusableElements))
  ) {
    (s.isMoved = !0), (t.allowClick = !1);
    return;
  }
  s.allowTouchCallbacks && t.emit("touchMove", a),
    (r.previousX = r.currentX),
    (r.previousY = r.currentY),
    (r.currentX = f),
    (r.currentY = p);
  const g = r.currentX - r.startX,
    h = r.currentY - r.startY;
  if (t.params.threshold && Math.sqrt(g ** 2 + h ** 2) < t.params.threshold)
    return;
  if (typeof s.isScrolling > "u") {
    let C;
    (t.isHorizontal() && r.currentY === r.startY) ||
    (t.isVertical() && r.currentX === r.startX)
      ? (s.isScrolling = !1)
      : g * g + h * h >= 25 &&
        ((C = (Math.atan2(Math.abs(h), Math.abs(g)) * 180) / Math.PI),
        (s.isScrolling = t.isHorizontal()
          ? C > n.touchAngle
          : 90 - C > n.touchAngle));
  }
  if (
    (s.isScrolling && t.emit("touchMoveOpposite", a),
    typeof s.startMoving > "u" &&
      (r.currentX !== r.startX || r.currentY !== r.startY) &&
      (s.startMoving = !0),
    s.isScrolling ||
      (a.type === "touchmove" && s.preventTouchMoveFromPointerMove))
  ) {
    s.isTouched = !1;
    return;
  }
  if (!s.startMoving) return;
  (t.allowClick = !1),
    !n.cssMode && a.cancelable && a.preventDefault(),
    n.touchMoveStopPropagation && !n.nested && a.stopPropagation();
  let m = t.isHorizontal() ? g : h,
    v = t.isHorizontal() ? r.currentX - r.previousX : r.currentY - r.previousY;
  n.oneWayMovement &&
    ((m = Math.abs(m) * (o ? 1 : -1)), (v = Math.abs(v) * (o ? 1 : -1))),
    (r.diff = m),
    (m *= n.touchRatio),
    o && ((m = -m), (v = -v));
  const b = t.touchesDirection;
  (t.swipeDirection = m > 0 ? "prev" : "next"),
    (t.touchesDirection = v > 0 ? "prev" : "next");
  const w = t.params.loop && !n.cssMode,
    d =
      (t.touchesDirection === "next" && t.allowSlideNext) ||
      (t.touchesDirection === "prev" && t.allowSlidePrev);
  if (!s.isMoved) {
    if (
      (w &&
        d &&
        t.loopFix({
          direction: t.swipeDirection,
        }),
      (s.startTranslate = t.getTranslate()),
      t.setTransition(0),
      t.animating)
    ) {
      const C = new window.CustomEvent("transitionend", {
        bubbles: !0,
        cancelable: !0,
        detail: {
          bySwiperTouchMove: !0,
        },
      });
      t.wrapperEl.dispatchEvent(C);
    }
    (s.allowMomentumBounce = !1),
      n.grabCursor &&
        (t.allowSlideNext === !0 || t.allowSlidePrev === !0) &&
        t.setGrabCursor(!0),
      t.emit("sliderFirstMove", a);
  }
  let u;
  if (
    (new Date().getTime(),
    s.isMoved &&
      s.allowThresholdMove &&
      b !== t.touchesDirection &&
      w &&
      d &&
      Math.abs(m) >= 1)
  ) {
    Object.assign(r, {
      startX: f,
      startY: p,
      currentX: f,
      currentY: p,
      startTranslate: s.currentTranslate,
    }),
      (s.loopSwapReset = !0),
      (s.startTranslate = s.currentTranslate);
    return;
  }
  t.emit("sliderMove", a),
    (s.isMoved = !0),
    (s.currentTranslate = m + s.startTranslate);
  let y = !0,
    S = n.resistanceRatio;
  if (
    (n.touchReleaseOnEdges && (S = 0),
    m > 0
      ? (w &&
          d &&
          !u &&
          s.allowThresholdMove &&
          s.currentTranslate >
            (n.centeredSlides
              ? t.minTranslate() -
                t.slidesSizesGrid[t.activeIndex + 1] -
                (n.slidesPerView !== "auto" &&
                t.slides.length - n.slidesPerView >= 2
                  ? t.slidesSizesGrid[t.activeIndex + 1] + t.params.spaceBetween
                  : 0) -
                t.params.spaceBetween
              : t.minTranslate()) &&
          t.loopFix({
            direction: "prev",
            setTranslate: !0,
            activeSlideIndex: 0,
          }),
        s.currentTranslate > t.minTranslate() &&
          ((y = !1),
          n.resistance &&
            (s.currentTranslate =
              t.minTranslate() -
              1 +
              (-t.minTranslate() + s.startTranslate + m) ** S)))
      : m < 0 &&
        (w &&
          d &&
          !u &&
          s.allowThresholdMove &&
          s.currentTranslate <
            (n.centeredSlides
              ? t.maxTranslate() +
                t.slidesSizesGrid[t.slidesSizesGrid.length - 1] +
                t.params.spaceBetween +
                (n.slidesPerView !== "auto" &&
                t.slides.length - n.slidesPerView >= 2
                  ? t.slidesSizesGrid[t.slidesSizesGrid.length - 1] +
                    t.params.spaceBetween
                  : 0)
              : t.maxTranslate()) &&
          t.loopFix({
            direction: "next",
            setTranslate: !0,
            activeSlideIndex:
              t.slides.length -
              (n.slidesPerView === "auto"
                ? t.slidesPerViewDynamic()
                : Math.ceil(parseFloat(n.slidesPerView, 10))),
          }),
        s.currentTranslate < t.maxTranslate() &&
          ((y = !1),
          n.resistance &&
            (s.currentTranslate =
              t.maxTranslate() +
              1 -
              (t.maxTranslate() - s.startTranslate - m) ** S))),
    y && (a.preventedByNestedSwiper = !0),
    !t.allowSlideNext &&
      t.swipeDirection === "next" &&
      s.currentTranslate < s.startTranslate &&
      (s.currentTranslate = s.startTranslate),
    !t.allowSlidePrev &&
      t.swipeDirection === "prev" &&
      s.currentTranslate > s.startTranslate &&
      (s.currentTranslate = s.startTranslate),
    !t.allowSlidePrev &&
      !t.allowSlideNext &&
      (s.currentTranslate = s.startTranslate),
    n.threshold > 0)
  )
    if (Math.abs(m) > n.threshold || s.allowThresholdMove) {
      if (!s.allowThresholdMove) {
        (s.allowThresholdMove = !0),
          (r.startX = r.currentX),
          (r.startY = r.currentY),
          (s.currentTranslate = s.startTranslate),
          (r.diff = t.isHorizontal()
            ? r.currentX - r.startX
            : r.currentY - r.startY);
        return;
      }
    } else {
      s.currentTranslate = s.startTranslate;
      return;
    }
  !n.followFinger ||
    n.cssMode ||
    (((n.freeMode && n.freeMode.enabled && t.freeMode) ||
      n.watchSlidesProgress) &&
      (t.updateActiveIndex(), t.updateSlidesClasses()),
    n.freeMode && n.freeMode.enabled && t.freeMode && t.freeMode.onTouchMove(),
    t.updateProgress(s.currentTranslate),
    t.setTranslate(s.currentTranslate));
}
function It(i) {
  const e = this,
    t = e.touchEventsData;
  let s = i;
  s.originalEvent && (s = s.originalEvent);
  let n;
  if (s.type === "touchend" || s.type === "touchcancel") {
    if (
      ((n = [...s.changedTouches].filter((S) => S.identifier === t.touchId)[0]),
      !n || n.identifier !== t.touchId)
    )
      return;
  } else {
    if (t.touchId !== null || s.pointerId !== t.pointerId) return;
    n = s;
  }
  if (
    ["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(
      s.type
    ) &&
    !(
      ["pointercancel", "contextmenu"].includes(s.type) &&
      (e.browser.isSafari || e.browser.isWebView)
    )
  )
    return;
  (t.pointerId = null), (t.touchId = null);
  const {
    params: o,
    touches: l,
    rtlTranslate: a,
    slidesGrid: c,
    enabled: f,
  } = e;
  if (!f || (!o.simulateTouch && s.pointerType === "mouse")) return;
  if (
    (t.allowTouchCallbacks && e.emit("touchEnd", s),
    (t.allowTouchCallbacks = !1),
    !t.isTouched)
  ) {
    t.isMoved && o.grabCursor && e.setGrabCursor(!1),
      (t.isMoved = !1),
      (t.startMoving = !1);
    return;
  }
  o.grabCursor &&
    t.isMoved &&
    t.isTouched &&
    (e.allowSlideNext === !0 || e.allowSlidePrev === !0) &&
    e.setGrabCursor(!1);
  const p = U(),
    g = p - t.touchStartTime;
  if (e.allowClick) {
    const S = s.path || (s.composedPath && s.composedPath());
    e.updateClickedSlide((S && S[0]) || s.target, S),
      e.emit("tap click", s),
      g < 300 &&
        p - t.lastClickTime < 300 &&
        e.emit("doubleTap doubleClick", s);
  }
  if (
    ((t.lastClickTime = U()),
    le(() => {
      e.destroyed || (e.allowClick = !0);
    }),
    !t.isTouched ||
      !t.isMoved ||
      !e.swipeDirection ||
      (l.diff === 0 && !t.loopSwapReset) ||
      (t.currentTranslate === t.startTranslate && !t.loopSwapReset))
  ) {
    (t.isTouched = !1), (t.isMoved = !1), (t.startMoving = !1);
    return;
  }
  (t.isTouched = !1), (t.isMoved = !1), (t.startMoving = !1);
  let h;
  if (
    (o.followFinger
      ? (h = a ? e.translate : -e.translate)
      : (h = -t.currentTranslate),
    o.cssMode)
  )
    return;
  if (o.freeMode && o.freeMode.enabled) {
    e.freeMode.onTouchEnd({
      currentPos: h,
    });
    return;
  }
  const m = h >= -e.maxTranslate() && !e.params.loop;
  let v = 0,
    b = e.slidesSizesGrid[0];
  for (
    let S = 0;
    S < c.length;
    S += S < o.slidesPerGroupSkip ? 1 : o.slidesPerGroup
  ) {
    const C = S < o.slidesPerGroupSkip - 1 ? 1 : o.slidesPerGroup;
    typeof c[S + C] < "u"
      ? (m || (h >= c[S] && h < c[S + C])) && ((v = S), (b = c[S + C] - c[S]))
      : (m || h >= c[S]) && ((v = S), (b = c[c.length - 1] - c[c.length - 2]));
  }
  let w = null,
    d = null;
  o.rewind &&
    (e.isBeginning
      ? (d =
          o.virtual && o.virtual.enabled && e.virtual
            ? e.virtual.slides.length - 1
            : e.slides.length - 1)
      : e.isEnd && (w = 0));
  const u = (h - c[v]) / b,
    y = v < o.slidesPerGroupSkip - 1 ? 1 : o.slidesPerGroup;
  if (g > o.longSwipesMs) {
    if (!o.longSwipes) {
      e.slideTo(e.activeIndex);
      return;
    }
    e.swipeDirection === "next" &&
      (u >= o.longSwipesRatio
        ? e.slideTo(o.rewind && e.isEnd ? w : v + y)
        : e.slideTo(v)),
      e.swipeDirection === "prev" &&
        (u > 1 - o.longSwipesRatio
          ? e.slideTo(v + y)
          : d !== null && u < 0 && Math.abs(u) > o.longSwipesRatio
          ? e.slideTo(d)
          : e.slideTo(v));
  } else {
    if (!o.shortSwipes) {
      e.slideTo(e.activeIndex);
      return;
    }
    e.navigation &&
    (s.target === e.navigation.nextEl || s.target === e.navigation.prevEl)
      ? s.target === e.navigation.nextEl
        ? e.slideTo(v + y)
        : e.slideTo(v)
      : (e.swipeDirection === "next" && e.slideTo(w !== null ? w : v + y),
        e.swipeDirection === "prev" && e.slideTo(d !== null ? d : v));
  }
}
function me() {
  const i = this,
    { params: e, el: t } = i;
  if (t && t.offsetWidth === 0) return;
  e.breakpoints && i.setBreakpoint();
  const { allowSlideNext: s, allowSlidePrev: n, snapGrid: r } = i,
    o = i.virtual && i.params.virtual.enabled;
  (i.allowSlideNext = !0),
    (i.allowSlidePrev = !0),
    i.updateSize(),
    i.updateSlides(),
    i.updateSlidesClasses();
  const l = o && e.loop;
  (e.slidesPerView === "auto" || e.slidesPerView > 1) &&
  i.isEnd &&
  !i.isBeginning &&
  !i.params.centeredSlides &&
  !l
    ? i.slideTo(i.slides.length - 1, 0, !1, !0)
    : i.params.loop && !o
    ? i.slideToLoop(i.realIndex, 0, !1, !0)
    : i.slideTo(i.activeIndex, 0, !1, !0),
    i.autoplay &&
      i.autoplay.running &&
      i.autoplay.paused &&
      (clearTimeout(i.autoplay.resizeTimeout),
      (i.autoplay.resizeTimeout = setTimeout(() => {
        i.autoplay &&
          i.autoplay.running &&
          i.autoplay.paused &&
          i.autoplay.resume();
      }, 500))),
    (i.allowSlidePrev = n),
    (i.allowSlideNext = s),
    i.params.watchOverflow && r !== i.snapGrid && i.checkOverflow();
}
function Ot(i) {
  const e = this;
  e.enabled &&
    (e.allowClick ||
      (e.params.preventClicks && i.preventDefault(),
      e.params.preventClicksPropagation &&
        e.animating &&
        (i.stopPropagation(), i.stopImmediatePropagation())));
}
function At() {
  const i = this,
    { wrapperEl: e, rtlTranslate: t, enabled: s } = i;
  if (!s) return;
  (i.previousTranslate = i.translate),
    i.isHorizontal()
      ? (i.translate = -e.scrollLeft)
      : (i.translate = -e.scrollTop),
    i.translate === 0 && (i.translate = 0),
    i.updateActiveIndex(),
    i.updateSlidesClasses();
  let n;
  const r = i.maxTranslate() - i.minTranslate();
  r === 0 ? (n = 0) : (n = (i.translate - i.minTranslate()) / r),
    n !== i.progress && i.updateProgress(t ? -i.translate : i.translate),
    i.emit("setTranslate", i.translate, !1);
}
function zt(i) {
  const e = this;
  X(e, i.target),
    !(
      e.params.cssMode ||
      (e.params.slidesPerView !== "auto" && !e.params.autoHeight)
    ) && e.update();
}
function kt() {
  const i = this;
  i.documentTouchHandlerProceeded ||
    ((i.documentTouchHandlerProceeded = !0),
    i.params.touchReleaseOnEdges && (i.el.style.touchAction = "auto"));
}
const Ee = (i, e) => {
  const t = _(),
    { params: s, el: n, wrapperEl: r, device: o } = i,
    l = !!s.nested,
    a = e === "on" ? "addEventListener" : "removeEventListener",
    c = e;
  !n ||
    typeof n == "string" ||
    (t[a]("touchstart", i.onDocumentTouchStart, {
      passive: !1,
      capture: l,
    }),
    n[a]("touchstart", i.onTouchStart, {
      passive: !1,
    }),
    n[a]("pointerdown", i.onTouchStart, {
      passive: !1,
    }),
    t[a]("touchmove", i.onTouchMove, {
      passive: !1,
      capture: l,
    }),
    t[a]("pointermove", i.onTouchMove, {
      passive: !1,
      capture: l,
    }),
    t[a]("touchend", i.onTouchEnd, {
      passive: !0,
    }),
    t[a]("pointerup", i.onTouchEnd, {
      passive: !0,
    }),
    t[a]("pointercancel", i.onTouchEnd, {
      passive: !0,
    }),
    t[a]("touchcancel", i.onTouchEnd, {
      passive: !0,
    }),
    t[a]("pointerout", i.onTouchEnd, {
      passive: !0,
    }),
    t[a]("pointerleave", i.onTouchEnd, {
      passive: !0,
    }),
    t[a]("contextmenu", i.onTouchEnd, {
      passive: !0,
    }),
    (s.preventClicks || s.preventClicksPropagation) &&
      n[a]("click", i.onClick, !0),
    s.cssMode && r[a]("scroll", i.onScroll),
    s.updateOnWindowResize
      ? i[c](
          o.ios || o.android
            ? "resize orientationchange observerUpdate"
            : "resize observerUpdate",
          me,
          !0
        )
      : i[c]("observerUpdate", me, !0),
    n[a]("load", i.onLoad, {
      capture: !0,
    }));
};
function Dt() {
  const i = this,
    { params: e } = i;
  (i.onTouchStart = Pt.bind(i)),
    (i.onTouchMove = Lt.bind(i)),
    (i.onTouchEnd = It.bind(i)),
    (i.onDocumentTouchStart = kt.bind(i)),
    e.cssMode && (i.onScroll = At.bind(i)),
    (i.onClick = Ot.bind(i)),
    (i.onLoad = zt.bind(i)),
    Ee(i, "on");
}
function Gt() {
  Ee(this, "off");
}
var Bt = {
  attachEvents: Dt,
  detachEvents: Gt,
};
const he = (i, e) => i.grid && e.grid && e.grid.rows > 1;
function $t() {
  const i = this,
    { realIndex: e, initialized: t, params: s, el: n } = i,
    r = s.breakpoints;
  if (!r || (r && Object.keys(r).length === 0)) return;
  const o = i.getBreakpoint(r, i.params.breakpointsBase, i.el);
  if (!o || i.currentBreakpoint === o) return;
  const a = (o in r ? r[o] : void 0) || i.originalParams,
    c = he(i, s),
    f = he(i, a),
    p = i.params.grabCursor,
    g = a.grabCursor,
    h = s.enabled;
  c && !f
    ? (n.classList.remove(
        `${s.containerModifierClass}grid`,
        `${s.containerModifierClass}grid-column`
      ),
      i.emitContainerClasses())
    : !c &&
      f &&
      (n.classList.add(`${s.containerModifierClass}grid`),
      ((a.grid.fill && a.grid.fill === "column") ||
        (!a.grid.fill && s.grid.fill === "column")) &&
        n.classList.add(`${s.containerModifierClass}grid-column`),
      i.emitContainerClasses()),
    p && !g ? i.unsetGrabCursor() : !p && g && i.setGrabCursor(),
    ["navigation", "pagination", "scrollbar"].forEach((u) => {
      if (typeof a[u] > "u") return;
      const y = s[u] && s[u].enabled,
        S = a[u] && a[u].enabled;
      y && !S && i[u].disable(), !y && S && i[u].enable();
    });
  const m = a.direction && a.direction !== s.direction,
    v = s.loop && (a.slidesPerView !== s.slidesPerView || m),
    b = s.loop;
  m && t && i.changeDirection(), B(i.params, a);
  const w = i.params.enabled,
    d = i.params.loop;
  Object.assign(i, {
    allowTouchMove: i.params.allowTouchMove,
    allowSlideNext: i.params.allowSlideNext,
    allowSlidePrev: i.params.allowSlidePrev,
  }),
    h && !w ? i.disable() : !h && w && i.enable(),
    (i.currentBreakpoint = o),
    i.emit("_beforeBreakpoint", a),
    t &&
      (v
        ? (i.loopDestroy(), i.loopCreate(e), i.updateSlides())
        : !b && d
        ? (i.loopCreate(e), i.updateSlides())
        : b && !d && i.loopDestroy()),
    i.emit("breakpoint", a);
}
function Vt(i, e, t) {
  if ((e === void 0 && (e = "window"), !i || (e === "container" && !t))) return;
  let s = !1;
  const n = $(),
    r = e === "window" ? n.innerHeight : t.clientHeight,
    o = Object.keys(i).map((l) => {
      if (typeof l == "string" && l.indexOf("@") === 0) {
        const a = parseFloat(l.substr(1));
        return {
          value: r * a,
          point: l,
        };
      }
      return {
        value: l,
        point: l,
      };
    });
  o.sort((l, a) => parseInt(l.value, 10) - parseInt(a.value, 10));
  for (let l = 0; l < o.length; l += 1) {
    const { point: a, value: c } = o[l];
    e === "window"
      ? n.matchMedia(`(min-width: ${c}px)`).matches && (s = a)
      : c <= t.clientWidth && (s = a);
  }
  return s || "max";
}
var Ft = {
  setBreakpoint: $t,
  getBreakpoint: Vt,
};
function Nt(i, e) {
  const t = [];
  return (
    i.forEach((s) => {
      typeof s == "object"
        ? Object.keys(s).forEach((n) => {
            s[n] && t.push(e + n);
          })
        : typeof s == "string" && t.push(e + s);
    }),
    t
  );
}
function _t() {
  const i = this,
    { classNames: e, params: t, rtl: s, el: n, device: r } = i,
    o = Nt(
      [
        "initialized",
        t.direction,
        {
          "free-mode": i.params.freeMode && t.freeMode.enabled,
        },
        {
          autoheight: t.autoHeight,
        },
        {
          rtl: s,
        },
        {
          grid: t.grid && t.grid.rows > 1,
        },
        {
          "grid-column": t.grid && t.grid.rows > 1 && t.grid.fill === "column",
        },
        {
          android: r.android,
        },
        {
          ios: r.ios,
        },
        {
          "css-mode": t.cssMode,
        },
        {
          centered: t.cssMode && t.centeredSlides,
        },
        {
          "watch-progress": t.watchSlidesProgress,
        },
      ],
      t.containerModifierClass
    );
  e.push(...o), n.classList.add(...e), i.emitContainerClasses();
}
function Ht() {
  const i = this,
    { el: e, classNames: t } = i;
  !e ||
    typeof e == "string" ||
    (e.classList.remove(...t), i.emitContainerClasses());
}
var Rt = {
  addClasses: _t,
  removeClasses: Ht,
};
function qt() {
  const i = this,
    { isLocked: e, params: t } = i,
    { slidesOffsetBefore: s } = t;
  if (s) {
    const n = i.slides.length - 1,
      r = i.slidesGrid[n] + i.slidesSizesGrid[n] + s * 2;
    i.isLocked = i.size > r;
  } else i.isLocked = i.snapGrid.length === 1;
  t.allowSlideNext === !0 && (i.allowSlideNext = !i.isLocked),
    t.allowSlidePrev === !0 && (i.allowSlidePrev = !i.isLocked),
    e && e !== i.isLocked && (i.isEnd = !1),
    e !== i.isLocked && i.emit(i.isLocked ? "lock" : "unlock");
}
var Wt = {
    checkOverflow: qt,
  },
  ge = {
    init: !0,
    direction: "horizontal",
    oneWayMovement: !1,
    swiperElementNodeName: "SWIPER-CONTAINER",
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    eventsPrefix: "swiper",
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopAddBlankSlides: !0,
    loopAdditionalSlides: 0,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-blank",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideFullyVisibleClass: "swiper-slide-fully-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
function jt(i, e) {
  return function (s) {
    s === void 0 && (s = {});
    const n = Object.keys(s)[0],
      r = s[n];
    if (typeof r != "object" || r === null) {
      B(e, s);
      return;
    }
    if (
      (i[n] === !0 &&
        (i[n] = {
          enabled: !0,
        }),
      n === "navigation" &&
        i[n] &&
        i[n].enabled &&
        !i[n].prevEl &&
        !i[n].nextEl &&
        (i[n].auto = !0),
      ["pagination", "scrollbar"].indexOf(n) >= 0 &&
        i[n] &&
        i[n].enabled &&
        !i[n].el &&
        (i[n].auto = !0),
      !(n in i && "enabled" in r))
    ) {
      B(e, s);
      return;
    }
    typeof i[n] == "object" && !("enabled" in i[n]) && (i[n].enabled = !0),
      i[n] ||
        (i[n] = {
          enabled: !1,
        }),
      B(e, s);
  };
}
const ne = {
    eventsEmitter: Re,
    update: et,
    translate: at,
    transition: ct,
    slide: wt,
    loop: bt,
    grabCursor: Ct,
    events: Bt,
    breakpoints: Ft,
    checkOverflow: Wt,
    classes: Rt,
  },
  ae = {};
class F {
  constructor() {
    let e, t;
    for (var s = arguments.length, n = new Array(s), r = 0; r < s; r++)
      n[r] = arguments[r];
    n.length === 1 &&
    n[0].constructor &&
    Object.prototype.toString.call(n[0]).slice(8, -1) === "Object"
      ? (t = n[0])
      : ([e, t] = n),
      t || (t = {}),
      (t = B({}, t)),
      e && !t.el && (t.el = e);
    const o = _();
    if (
      t.el &&
      typeof t.el == "string" &&
      o.querySelectorAll(t.el).length > 1
    ) {
      const f = [];
      return (
        o.querySelectorAll(t.el).forEach((p) => {
          const g = B({}, t, {
            el: p,
          });
          f.push(new F(g));
        }),
        f
      );
    }
    const l = this;
    (l.__swiper__ = !0),
      (l.support = Te()),
      (l.device = be({
        userAgent: t.userAgent,
      })),
      (l.browser = Ne()),
      (l.eventsListeners = {}),
      (l.eventsAnyListeners = []),
      (l.modules = [...l.__modules__]),
      t.modules && Array.isArray(t.modules) && l.modules.push(...t.modules);
    const a = {};
    l.modules.forEach((f) => {
      f({
        params: t,
        swiper: l,
        extendParams: jt(t, a),
        on: l.on.bind(l),
        once: l.once.bind(l),
        off: l.off.bind(l),
        emit: l.emit.bind(l),
      });
    });
    const c = B({}, ge, a);
    return (
      (l.params = B({}, c, ae, t)),
      (l.originalParams = B({}, l.params)),
      (l.passedParams = B({}, t)),
      l.params &&
        l.params.on &&
        Object.keys(l.params.on).forEach((f) => {
          l.on(f, l.params.on[f]);
        }),
      l.params && l.params.onAny && l.onAny(l.params.onAny),
      Object.assign(l, {
        enabled: l.params.enabled,
        el: e,
        classNames: [],
        slides: [],
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        isHorizontal() {
          return l.params.direction === "horizontal";
        },
        isVertical() {
          return l.params.direction === "vertical";
        },
        activeIndex: 0,
        realIndex: 0,
        isBeginning: !0,
        isEnd: !1,
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: !1,
        cssOverflowAdjustment() {
          return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
        },
        allowSlideNext: l.params.allowSlideNext,
        allowSlidePrev: l.params.allowSlidePrev,
        touchEventsData: {
          isTouched: void 0,
          isMoved: void 0,
          allowTouchCallbacks: void 0,
          touchStartTime: void 0,
          isScrolling: void 0,
          currentTranslate: void 0,
          startTranslate: void 0,
          allowThresholdMove: void 0,
          focusableElements: l.params.focusableElements,
          lastClickTime: 0,
          clickTimeout: void 0,
          velocities: [],
          allowMomentumBounce: void 0,
          startMoving: void 0,
          pointerId: null,
          touchId: null,
        },
        allowClick: !0,
        allowTouchMove: l.params.allowTouchMove,
        touches: {
          startX: 0,
          startY: 0,
          currentX: 0,
          currentY: 0,
          diff: 0,
        },
        imagesToLoad: [],
        imagesLoaded: 0,
      }),
      l.emit("_swiper"),
      l.params.init && l.init(),
      l
    );
  }
  getDirectionLabel(e) {
    return this.isHorizontal()
      ? e
      : {
          width: "height",
          "margin-top": "margin-left",
          "margin-bottom ": "margin-right",
          "margin-left": "margin-top",
          "margin-right": "margin-bottom",
          "padding-left": "padding-top",
          "padding-right": "padding-bottom",
          marginRight: "marginBottom",
        }[e];
  }
  getSlideIndex(e) {
    const { slidesEl: t, params: s } = this,
      n = N(t, `.${s.slideClass}, swiper-slide`),
      r = Q(n[0]);
    return Q(e) - r;
  }
  getSlideIndexByData(e) {
    return this.getSlideIndex(
      this.slides.filter(
        (t) => t.getAttribute("data-swiper-slide-index") * 1 === e
      )[0]
    );
  }
  recalcSlides() {
    const e = this,
      { slidesEl: t, params: s } = e;
    e.slides = N(t, `.${s.slideClass}, swiper-slide`);
  }
  enable() {
    const e = this;
    e.enabled ||
      ((e.enabled = !0),
      e.params.grabCursor && e.setGrabCursor(),
      e.emit("enable"));
  }
  disable() {
    const e = this;
    e.enabled &&
      ((e.enabled = !1),
      e.params.grabCursor && e.unsetGrabCursor(),
      e.emit("disable"));
  }
  setProgress(e, t) {
    const s = this;
    e = Math.min(Math.max(e, 0), 1);
    const n = s.minTranslate(),
      o = (s.maxTranslate() - n) * e + n;
    s.translateTo(o, typeof t > "u" ? 0 : t),
      s.updateActiveIndex(),
      s.updateSlidesClasses();
  }
  emitContainerClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el) return;
    const t = e.el.className
      .split(" ")
      .filter(
        (s) =>
          s.indexOf("swiper") === 0 ||
          s.indexOf(e.params.containerModifierClass) === 0
      );
    e.emit("_containerClasses", t.join(" "));
  }
  getSlideClasses(e) {
    const t = this;
    return t.destroyed
      ? ""
      : e.className
          .split(" ")
          .filter(
            (s) =>
              s.indexOf("swiper-slide") === 0 ||
              s.indexOf(t.params.slideClass) === 0
          )
          .join(" ");
  }
  emitSlidesClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el) return;
    const t = [];
    e.slides.forEach((s) => {
      const n = e.getSlideClasses(s);
      t.push({
        slideEl: s,
        classNames: n,
      }),
        e.emit("_slideClass", s, n);
    }),
      e.emit("_slideClasses", t);
  }
  slidesPerViewDynamic(e, t) {
    e === void 0 && (e = "current"), t === void 0 && (t = !1);
    const s = this,
      {
        params: n,
        slides: r,
        slidesGrid: o,
        slidesSizesGrid: l,
        size: a,
        activeIndex: c,
      } = s;
    let f = 1;
    if (typeof n.slidesPerView == "number") return n.slidesPerView;
    if (n.centeredSlides) {
      let p = r[c] ? Math.ceil(r[c].swiperSlideSize) : 0,
        g;
      for (let h = c + 1; h < r.length; h += 1)
        r[h] &&
          !g &&
          ((p += Math.ceil(r[h].swiperSlideSize)), (f += 1), p > a && (g = !0));
      for (let h = c - 1; h >= 0; h -= 1)
        r[h] &&
          !g &&
          ((p += r[h].swiperSlideSize), (f += 1), p > a && (g = !0));
    } else if (e === "current")
      for (let p = c + 1; p < r.length; p += 1)
        (t ? o[p] + l[p] - o[c] < a : o[p] - o[c] < a) && (f += 1);
    else for (let p = c - 1; p >= 0; p -= 1) o[c] - o[p] < a && (f += 1);
    return f;
  }
  update() {
    const e = this;
    if (!e || e.destroyed) return;
    const { snapGrid: t, params: s } = e;
    s.breakpoints && e.setBreakpoint(),
      [...e.el.querySelectorAll('[loading="lazy"]')].forEach((o) => {
        o.complete && X(e, o);
      }),
      e.updateSize(),
      e.updateSlides(),
      e.updateProgress(),
      e.updateSlidesClasses();
    function n() {
      const o = e.rtlTranslate ? e.translate * -1 : e.translate,
        l = Math.min(Math.max(o, e.maxTranslate()), e.minTranslate());
      e.setTranslate(l), e.updateActiveIndex(), e.updateSlidesClasses();
    }
    let r;
    if (s.freeMode && s.freeMode.enabled && !s.cssMode)
      n(), s.autoHeight && e.updateAutoHeight();
    else {
      if (
        (s.slidesPerView === "auto" || s.slidesPerView > 1) &&
        e.isEnd &&
        !s.centeredSlides
      ) {
        const o = e.virtual && s.virtual.enabled ? e.virtual.slides : e.slides;
        r = e.slideTo(o.length - 1, 0, !1, !0);
      } else r = e.slideTo(e.activeIndex, 0, !1, !0);
      r || n();
    }
    s.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update");
  }
  changeDirection(e, t) {
    t === void 0 && (t = !0);
    const s = this,
      n = s.params.direction;
    return (
      e || (e = n === "horizontal" ? "vertical" : "horizontal"),
      e === n ||
        (e !== "horizontal" && e !== "vertical") ||
        (s.el.classList.remove(`${s.params.containerModifierClass}${n}`),
        s.el.classList.add(`${s.params.containerModifierClass}${e}`),
        s.emitContainerClasses(),
        (s.params.direction = e),
        s.slides.forEach((r) => {
          e === "vertical" ? (r.style.width = "") : (r.style.height = "");
        }),
        s.emit("changeDirection"),
        t && s.update()),
      s
    );
  }
  changeLanguageDirection(e) {
    const t = this;
    (t.rtl && e === "rtl") ||
      (!t.rtl && e === "ltr") ||
      ((t.rtl = e === "rtl"),
      (t.rtlTranslate = t.params.direction === "horizontal" && t.rtl),
      t.rtl
        ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`),
          (t.el.dir = "rtl"))
        : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`),
          (t.el.dir = "ltr")),
      t.update());
  }
  mount(e) {
    const t = this;
    if (t.mounted) return !0;
    let s = e || t.params.el;
    if ((typeof s == "string" && (s = document.querySelector(s)), !s))
      return !1;
    (s.swiper = t),
      s.parentNode &&
        s.parentNode.host &&
        s.parentNode.host.nodeName ===
          t.params.swiperElementNodeName.toUpperCase() &&
        (t.isElement = !0);
    const n = () =>
      `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
    let o =
      s && s.shadowRoot && s.shadowRoot.querySelector
        ? s.shadowRoot.querySelector(n())
        : N(s, n())[0];
    return (
      !o &&
        t.params.createElements &&
        ((o = J("div", t.params.wrapperClass)),
        s.append(o),
        N(s, `.${t.params.slideClass}`).forEach((l) => {
          o.append(l);
        })),
      Object.assign(t, {
        el: s,
        wrapperEl: o,
        slidesEl:
          t.isElement && !s.parentNode.host.slideSlots ? s.parentNode.host : o,
        hostEl: t.isElement ? s.parentNode.host : s,
        mounted: !0,
        rtl: s.dir.toLowerCase() === "rtl" || H(s, "direction") === "rtl",
        rtlTranslate:
          t.params.direction === "horizontal" &&
          (s.dir.toLowerCase() === "rtl" || H(s, "direction") === "rtl"),
        wrongRTL: H(o, "display") === "-webkit-box",
      }),
      !0
    );
  }
  init(e) {
    const t = this;
    if (t.initialized || t.mount(e) === !1) return t;
    t.emit("beforeInit"),
      t.params.breakpoints && t.setBreakpoint(),
      t.addClasses(),
      t.updateSize(),
      t.updateSlides(),
      t.params.watchOverflow && t.checkOverflow(),
      t.params.grabCursor && t.enabled && t.setGrabCursor(),
      t.params.loop && t.virtual && t.params.virtual.enabled
        ? t.slideTo(
            t.params.initialSlide + t.virtual.slidesBefore,
            0,
            t.params.runCallbacksOnInit,
            !1,
            !0
          )
        : t.slideTo(
            t.params.initialSlide,
            0,
            t.params.runCallbacksOnInit,
            !1,
            !0
          ),
      t.params.loop && t.loopCreate(),
      t.attachEvents();
    const n = [...t.el.querySelectorAll('[loading="lazy"]')];
    return (
      t.isElement && n.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),
      n.forEach((r) => {
        r.complete
          ? X(t, r)
          : r.addEventListener("load", (o) => {
              X(t, o.target);
            });
      }),
      de(t),
      (t.initialized = !0),
      de(t),
      t.emit("init"),
      t.emit("afterInit"),
      t
    );
  }
  destroy(e, t) {
    e === void 0 && (e = !0), t === void 0 && (t = !0);
    const s = this,
      { params: n, el: r, wrapperEl: o, slides: l } = s;
    return (
      typeof s.params > "u" ||
        s.destroyed ||
        (s.emit("beforeDestroy"),
        (s.initialized = !1),
        s.detachEvents(),
        n.loop && s.loopDestroy(),
        t &&
          (s.removeClasses(),
          r && typeof r != "string" && r.removeAttribute("style"),
          o && o.removeAttribute("style"),
          l &&
            l.length &&
            l.forEach((a) => {
              a.classList.remove(
                n.slideVisibleClass,
                n.slideFullyVisibleClass,
                n.slideActiveClass,
                n.slideNextClass,
                n.slidePrevClass
              ),
                a.removeAttribute("style"),
                a.removeAttribute("data-swiper-slide-index");
            })),
        s.emit("destroy"),
        Object.keys(s.eventsListeners).forEach((a) => {
          s.off(a);
        }),
        e !== !1 &&
          (s.el && typeof s.el != "string" && (s.el.swiper = null), Ie(s)),
        (s.destroyed = !0)),
      null
    );
  }
  static extendDefaults(e) {
    B(ae, e);
  }
  static get extendedDefaults() {
    return ae;
  }
  static get defaults() {
    return ge;
  }
  static installModule(e) {
    F.prototype.__modules__ || (F.prototype.__modules__ = []);
    const t = F.prototype.__modules__;
    typeof e == "function" && t.indexOf(e) < 0 && t.push(e);
  }
  static use(e) {
    return Array.isArray(e)
      ? (e.forEach((t) => F.installModule(t)), F)
      : (F.installModule(e), F);
  }
}
Object.keys(ne).forEach((i) => {
  Object.keys(ne[i]).forEach((e) => {
    F.prototype[e] = ne[i][e];
  });
});
F.use([_e, He]);
function Ce(i, e, t, s) {
  return (
    i.params.createElements &&
      Object.keys(s).forEach((n) => {
        if (!t[n] && t.auto === !0) {
          let r = N(i.el, `.${s[n]}`)[0];
          r || ((r = J("div", s[n])), (r.className = s[n]), i.el.append(r)),
            (t[n] = r),
            (e[n] = r);
        }
      }),
    t
  );
}
function Yt(i) {
  let { swiper: e, extendParams: t, on: s, emit: n } = i;
  t({
    navigation: {
      nextEl: null,
      prevEl: null,
      hideOnClick: !1,
      disabledClass: "swiper-button-disabled",
      hiddenClass: "swiper-button-hidden",
      lockClass: "swiper-button-lock",
      navigationDisabledClass: "swiper-navigation-disabled",
    },
  }),
    (e.navigation = {
      nextEl: null,
      prevEl: null,
    });
  function r(m) {
    let v;
    return m &&
      typeof m == "string" &&
      e.isElement &&
      ((v = e.el.querySelector(m) || e.hostEl.querySelector(m)), v)
      ? v
      : (m &&
          (typeof m == "string" && (v = [...document.querySelectorAll(m)]),
          e.params.uniqueNavElements &&
          typeof m == "string" &&
          v &&
          v.length > 1 &&
          e.el.querySelectorAll(m).length === 1
            ? (v = e.el.querySelector(m))
            : v && v.length === 1 && (v = v[0])),
        m && !v ? m : v);
  }
  function o(m, v) {
    const b = e.params.navigation;
    (m = k(m)),
      m.forEach((w) => {
        w &&
          (w.classList[v ? "add" : "remove"](...b.disabledClass.split(" ")),
          w.tagName === "BUTTON" && (w.disabled = v),
          e.params.watchOverflow &&
            e.enabled &&
            w.classList[e.isLocked ? "add" : "remove"](b.lockClass));
      });
  }
  function l() {
    const { nextEl: m, prevEl: v } = e.navigation;
    if (e.params.loop) {
      o(v, !1), o(m, !1);
      return;
    }
    o(v, e.isBeginning && !e.params.rewind), o(m, e.isEnd && !e.params.rewind);
  }
  function a(m) {
    m.preventDefault(),
      !(e.isBeginning && !e.params.loop && !e.params.rewind) &&
        (e.slidePrev(), n("navigationPrev"));
  }
  function c(m) {
    m.preventDefault(),
      !(e.isEnd && !e.params.loop && !e.params.rewind) &&
        (e.slideNext(), n("navigationNext"));
  }
  function f() {
    const m = e.params.navigation;
    if (
      ((e.params.navigation = Ce(
        e,
        e.originalParams.navigation,
        e.params.navigation,
        {
          nextEl: "swiper-button-next",
          prevEl: "swiper-button-prev",
        }
      )),
      !(m.nextEl || m.prevEl))
    )
      return;
    let v = r(m.nextEl),
      b = r(m.prevEl);
    Object.assign(e.navigation, {
      nextEl: v,
      prevEl: b,
    }),
      (v = k(v)),
      (b = k(b));
    const w = (d, u) => {
      d && d.addEventListener("click", u === "next" ? c : a),
        !e.enabled && d && d.classList.add(...m.lockClass.split(" "));
    };
    v.forEach((d) => w(d, "next")), b.forEach((d) => w(d, "prev"));
  }
  function p() {
    let { nextEl: m, prevEl: v } = e.navigation;
    (m = k(m)), (v = k(v));
    const b = (w, d) => {
      w.removeEventListener("click", d === "next" ? c : a),
        w.classList.remove(...e.params.navigation.disabledClass.split(" "));
    };
    m.forEach((w) => b(w, "next")), v.forEach((w) => b(w, "prev"));
  }
  s("init", () => {
    e.params.navigation.enabled === !1 ? h() : (f(), l());
  }),
    s("toEdge fromEdge lock unlock", () => {
      l();
    }),
    s("destroy", () => {
      p();
    }),
    s("enable disable", () => {
      let { nextEl: m, prevEl: v } = e.navigation;
      if (((m = k(m)), (v = k(v)), e.enabled)) {
        l();
        return;
      }
      [...m, ...v]
        .filter((b) => !!b)
        .forEach((b) => b.classList.add(e.params.navigation.lockClass));
    }),
    s("click", (m, v) => {
      let { nextEl: b, prevEl: w } = e.navigation;
      (b = k(b)), (w = k(w));
      const d = v.target;
      let u = w.includes(d) || b.includes(d);
      if (e.isElement && !u) {
        const y = v.path || (v.composedPath && v.composedPath());
        y && (u = y.find((S) => b.includes(S) || w.includes(S)));
      }
      if (e.params.navigation.hideOnClick && !u) {
        if (
          e.pagination &&
          e.params.pagination &&
          e.params.pagination.clickable &&
          (e.pagination.el === d || e.pagination.el.contains(d))
        )
          return;
        let y;
        b.length
          ? (y = b[0].classList.contains(e.params.navigation.hiddenClass))
          : w.length &&
            (y = w[0].classList.contains(e.params.navigation.hiddenClass)),
          n(y === !0 ? "navigationShow" : "navigationHide"),
          [...b, ...w]
            .filter((S) => !!S)
            .forEach((S) =>
              S.classList.toggle(e.params.navigation.hiddenClass)
            );
      }
    });
  const g = () => {
      e.el.classList.remove(
        ...e.params.navigation.navigationDisabledClass.split(" ")
      ),
        f(),
        l();
    },
    h = () => {
      e.el.classList.add(
        ...e.params.navigation.navigationDisabledClass.split(" ")
      ),
        p();
    };
  Object.assign(e.navigation, {
    enable: g,
    disable: h,
    update: l,
    init: f,
    destroy: p,
  });
}
function q(i) {
  return (
    i === void 0 && (i = ""),
    `.${i
      .trim()
      .replace(/([\.:!+\/])/g, "\\$1")
      .replace(/ /g, ".")}`
  );
}
function Xt(i) {
  let { swiper: e, extendParams: t, on: s, emit: n } = i;
  const r = "swiper-pagination";
  t({
    pagination: {
      el: null,
      bulletElement: "span",
      clickable: !1,
      hideOnClick: !1,
      renderBullet: null,
      renderProgressbar: null,
      renderFraction: null,
      renderCustom: null,
      progressbarOpposite: !1,
      type: "bullets",
      dynamicBullets: !1,
      dynamicMainBullets: 1,
      formatFractionCurrent: (d) => d,
      formatFractionTotal: (d) => d,
      bulletClass: `${r}-bullet`,
      bulletActiveClass: `${r}-bullet-active`,
      modifierClass: `${r}-`,
      currentClass: `${r}-current`,
      totalClass: `${r}-total`,
      hiddenClass: `${r}-hidden`,
      progressbarFillClass: `${r}-progressbar-fill`,
      progressbarOppositeClass: `${r}-progressbar-opposite`,
      clickableClass: `${r}-clickable`,
      lockClass: `${r}-lock`,
      horizontalClass: `${r}-horizontal`,
      verticalClass: `${r}-vertical`,
      paginationDisabledClass: `${r}-disabled`,
    },
  }),
    (e.pagination = {
      el: null,
      bullets: [],
    });
  let o,
    l = 0;
  function a() {
    return (
      !e.params.pagination.el ||
      !e.pagination.el ||
      (Array.isArray(e.pagination.el) && e.pagination.el.length === 0)
    );
  }
  function c(d, u) {
    const { bulletActiveClass: y } = e.params.pagination;
    d &&
      ((d = d[`${u === "prev" ? "previous" : "next"}ElementSibling`]),
      d &&
        (d.classList.add(`${y}-${u}`),
        (d = d[`${u === "prev" ? "previous" : "next"}ElementSibling`]),
        d && d.classList.add(`${y}-${u}-${u}`)));
  }
  function f(d, u, y) {
    if (((d = d % y), (u = u % y), u === d + 1)) return "next";
    if (u === d - 1) return "previous";
  }
  function p(d) {
    const u = d.target.closest(q(e.params.pagination.bulletClass));
    if (!u) return;
    d.preventDefault();
    const y = Q(u) * e.params.slidesPerGroup;
    if (e.params.loop) {
      if (e.realIndex === y) return;
      const S = f(e.realIndex, y, e.slides.length);
      S === "next"
        ? e.slideNext()
        : S === "previous"
        ? e.slidePrev()
        : e.slideToLoop(y);
    } else e.slideTo(y);
  }
  function g() {
    const d = e.rtl,
      u = e.params.pagination;
    if (a()) return;
    let y = e.pagination.el;
    y = k(y);
    let S, C;
    const z =
        e.virtual && e.params.virtual.enabled
          ? e.virtual.slides.length
          : e.slides.length,
      L = e.params.loop
        ? Math.ceil(z / e.params.slidesPerGroup)
        : e.snapGrid.length;
    if (
      (e.params.loop
        ? ((C = e.previousRealIndex || 0),
          (S =
            e.params.slidesPerGroup > 1
              ? Math.floor(e.realIndex / e.params.slidesPerGroup)
              : e.realIndex))
        : typeof e.snapIndex < "u"
        ? ((S = e.snapIndex), (C = e.previousSnapIndex))
        : ((C = e.previousIndex || 0), (S = e.activeIndex || 0)),
      u.type === "bullets" &&
        e.pagination.bullets &&
        e.pagination.bullets.length > 0)
    ) {
      const I = e.pagination.bullets;
      let T, E, M;
      if (
        (u.dynamicBullets &&
          ((o = oe(I[0], e.isHorizontal() ? "width" : "height")),
          y.forEach((x) => {
            x.style[e.isHorizontal() ? "width" : "height"] = `${
              o * (u.dynamicMainBullets + 4)
            }px`;
          }),
          u.dynamicMainBullets > 1 &&
            C !== void 0 &&
            ((l += S - (C || 0)),
            l > u.dynamicMainBullets - 1
              ? (l = u.dynamicMainBullets - 1)
              : l < 0 && (l = 0)),
          (T = Math.max(S - l, 0)),
          (E = T + (Math.min(I.length, u.dynamicMainBullets) - 1)),
          (M = (E + T) / 2)),
        I.forEach((x) => {
          const P = [
            ...["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map(
              (O) => `${u.bulletActiveClass}${O}`
            ),
          ]
            .map((O) =>
              typeof O == "string" && O.includes(" ") ? O.split(" ") : O
            )
            .flat();
          x.classList.remove(...P);
        }),
        y.length > 1)
      )
        I.forEach((x) => {
          const P = Q(x);
          P === S
            ? x.classList.add(...u.bulletActiveClass.split(" "))
            : e.isElement && x.setAttribute("part", "bullet"),
            u.dynamicBullets &&
              (P >= T &&
                P <= E &&
                x.classList.add(...`${u.bulletActiveClass}-main`.split(" ")),
              P === T && c(x, "prev"),
              P === E && c(x, "next"));
        });
      else {
        const x = I[S];
        if (
          (x && x.classList.add(...u.bulletActiveClass.split(" ")),
          e.isElement &&
            I.forEach((P, O) => {
              P.setAttribute("part", O === S ? "bullet-active" : "bullet");
            }),
          u.dynamicBullets)
        ) {
          const P = I[T],
            O = I[E];
          for (let D = T; D <= E; D += 1)
            I[D] &&
              I[D].classList.add(...`${u.bulletActiveClass}-main`.split(" "));
          c(P, "prev"), c(O, "next");
        }
      }
      if (u.dynamicBullets) {
        const x = Math.min(I.length, u.dynamicMainBullets + 4),
          P = (o * x - o) / 2 - M * o,
          O = d ? "right" : "left";
        I.forEach((D) => {
          D.style[e.isHorizontal() ? O : "top"] = `${P}px`;
        });
      }
    }
    y.forEach((I, T) => {
      if (
        (u.type === "fraction" &&
          (I.querySelectorAll(q(u.currentClass)).forEach((E) => {
            E.textContent = u.formatFractionCurrent(S + 1);
          }),
          I.querySelectorAll(q(u.totalClass)).forEach((E) => {
            E.textContent = u.formatFractionTotal(L);
          })),
        u.type === "progressbar")
      ) {
        let E;
        u.progressbarOpposite
          ? (E = e.isHorizontal() ? "vertical" : "horizontal")
          : (E = e.isHorizontal() ? "horizontal" : "vertical");
        const M = (S + 1) / L;
        let x = 1,
          P = 1;
        E === "horizontal" ? (x = M) : (P = M),
          I.querySelectorAll(q(u.progressbarFillClass)).forEach((O) => {
            (O.style.transform = `translate3d(0,0,0) scaleX(${x}) scaleY(${P})`),
              (O.style.transitionDuration = `${e.params.speed}ms`);
          });
      }
      u.type === "custom" && u.renderCustom
        ? ((I.innerHTML = u.renderCustom(e, S + 1, L)),
          T === 0 && n("paginationRender", I))
        : (T === 0 && n("paginationRender", I), n("paginationUpdate", I)),
        e.params.watchOverflow &&
          e.enabled &&
          I.classList[e.isLocked ? "add" : "remove"](u.lockClass);
    });
  }
  function h() {
    const d = e.params.pagination;
    if (a()) return;
    const u =
      e.virtual && e.params.virtual.enabled
        ? e.virtual.slides.length
        : e.grid && e.params.grid.rows > 1
        ? e.slides.length / Math.ceil(e.params.grid.rows)
        : e.slides.length;
    let y = e.pagination.el;
    y = k(y);
    let S = "";
    if (d.type === "bullets") {
      let C = e.params.loop
        ? Math.ceil(u / e.params.slidesPerGroup)
        : e.snapGrid.length;
      e.params.freeMode && e.params.freeMode.enabled && C > u && (C = u);
      for (let z = 0; z < C; z += 1)
        d.renderBullet
          ? (S += d.renderBullet.call(e, z, d.bulletClass))
          : (S += `<${d.bulletElement} ${
              e.isElement ? 'part="bullet"' : ""
            } class="${d.bulletClass}"></${d.bulletElement}>`);
    }
    d.type === "fraction" &&
      (d.renderFraction
        ? (S = d.renderFraction.call(e, d.currentClass, d.totalClass))
        : (S = `<span class="${d.currentClass}"></span> / <span class="${d.totalClass}"></span>`)),
      d.type === "progressbar" &&
        (d.renderProgressbar
          ? (S = d.renderProgressbar.call(e, d.progressbarFillClass))
          : (S = `<span class="${d.progressbarFillClass}"></span>`)),
      (e.pagination.bullets = []),
      y.forEach((C) => {
        d.type !== "custom" && (C.innerHTML = S || ""),
          d.type === "bullets" &&
            e.pagination.bullets.push(...C.querySelectorAll(q(d.bulletClass)));
      }),
      d.type !== "custom" && n("paginationRender", y[0]);
  }
  function m() {
    e.params.pagination = Ce(
      e,
      e.originalParams.pagination,
      e.params.pagination,
      {
        el: "swiper-pagination",
      }
    );
    const d = e.params.pagination;
    if (!d.el) return;
    let u;
    typeof d.el == "string" && e.isElement && (u = e.el.querySelector(d.el)),
      !u &&
        typeof d.el == "string" &&
        (u = [...document.querySelectorAll(d.el)]),
      u || (u = d.el),
      !(!u || u.length === 0) &&
        (e.params.uniqueNavElements &&
          typeof d.el == "string" &&
          Array.isArray(u) &&
          u.length > 1 &&
          ((u = [...e.el.querySelectorAll(d.el)]),
          u.length > 1 &&
            (u = u.filter((y) => Se(y, ".swiper")[0] === e.el)[0])),
        Array.isArray(u) && u.length === 1 && (u = u[0]),
        Object.assign(e.pagination, {
          el: u,
        }),
        (u = k(u)),
        u.forEach((y) => {
          d.type === "bullets" &&
            d.clickable &&
            y.classList.add(...(d.clickableClass || "").split(" ")),
            y.classList.add(d.modifierClass + d.type),
            y.classList.add(
              e.isHorizontal() ? d.horizontalClass : d.verticalClass
            ),
            d.type === "bullets" &&
              d.dynamicBullets &&
              (y.classList.add(`${d.modifierClass}${d.type}-dynamic`),
              (l = 0),
              d.dynamicMainBullets < 1 && (d.dynamicMainBullets = 1)),
            d.type === "progressbar" &&
              d.progressbarOpposite &&
              y.classList.add(d.progressbarOppositeClass),
            d.clickable && y.addEventListener("click", p),
            e.enabled || y.classList.add(d.lockClass);
        }));
  }
  function v() {
    const d = e.params.pagination;
    if (a()) return;
    let u = e.pagination.el;
    u &&
      ((u = k(u)),
      u.forEach((y) => {
        y.classList.remove(d.hiddenClass),
          y.classList.remove(d.modifierClass + d.type),
          y.classList.remove(
            e.isHorizontal() ? d.horizontalClass : d.verticalClass
          ),
          d.clickable &&
            (y.classList.remove(...(d.clickableClass || "").split(" ")),
            y.removeEventListener("click", p));
      })),
      e.pagination.bullets &&
        e.pagination.bullets.forEach((y) =>
          y.classList.remove(...d.bulletActiveClass.split(" "))
        );
  }
  s("changeDirection", () => {
    if (!e.pagination || !e.pagination.el) return;
    const d = e.params.pagination;
    let { el: u } = e.pagination;
    (u = k(u)),
      u.forEach((y) => {
        y.classList.remove(d.horizontalClass, d.verticalClass),
          y.classList.add(
            e.isHorizontal() ? d.horizontalClass : d.verticalClass
          );
      });
  }),
    s("init", () => {
      e.params.pagination.enabled === !1 ? w() : (m(), h(), g());
    }),
    s("activeIndexChange", () => {
      typeof e.snapIndex > "u" && g();
    }),
    s("snapIndexChange", () => {
      g();
    }),
    s("snapGridLengthChange", () => {
      h(), g();
    }),
    s("destroy", () => {
      v();
    }),
    s("enable disable", () => {
      let { el: d } = e.pagination;
      d &&
        ((d = k(d)),
        d.forEach((u) =>
          u.classList[e.enabled ? "remove" : "add"](
            e.params.pagination.lockClass
          )
        ));
    }),
    s("lock unlock", () => {
      g();
    }),
    s("click", (d, u) => {
      const y = u.target,
        S = k(e.pagination.el);
      if (
        e.params.pagination.el &&
        e.params.pagination.hideOnClick &&
        S &&
        S.length > 0 &&
        !y.classList.contains(e.params.pagination.bulletClass)
      ) {
        if (
          e.navigation &&
          ((e.navigation.nextEl && y === e.navigation.nextEl) ||
            (e.navigation.prevEl && y === e.navigation.prevEl))
        )
          return;
        const C = S[0].classList.contains(e.params.pagination.hiddenClass);
        n(C === !0 ? "paginationShow" : "paginationHide"),
          S.forEach((z) => z.classList.toggle(e.params.pagination.hiddenClass));
      }
    });
  const b = () => {
      e.el.classList.remove(e.params.pagination.paginationDisabledClass);
      let { el: d } = e.pagination;
      d &&
        ((d = k(d)),
        d.forEach((u) =>
          u.classList.remove(e.params.pagination.paginationDisabledClass)
        )),
        m(),
        h(),
        g();
    },
    w = () => {
      e.el.classList.add(e.params.pagination.paginationDisabledClass);
      let { el: d } = e.pagination;
      d &&
        ((d = k(d)),
        d.forEach((u) =>
          u.classList.add(e.params.pagination.paginationDisabledClass)
        )),
        v();
    };
  Object.assign(e.pagination, {
    enable: b,
    disable: w,
    render: h,
    update: g,
    init: m,
    destroy: v,
  });
}
function Ut(i) {
  let { swiper: e, extendParams: t, on: s, emit: n, params: r } = i;
  (e.autoplay = {
    running: !1,
    paused: !1,
    timeLeft: 0,
  }),
    t({
      autoplay: {
        enabled: !1,
        delay: 3e3,
        waitForTransition: !0,
        disableOnInteraction: !1,
        stopOnLastSlide: !1,
        reverseDirection: !1,
        pauseOnMouseEnter: !1,
      },
    });
  let o,
    l,
    a = r && r.autoplay ? r.autoplay.delay : 3e3,
    c = r && r.autoplay ? r.autoplay.delay : 3e3,
    f,
    p = new Date().getTime(),
    g,
    h,
    m,
    v,
    b,
    w,
    d;
  function u(A) {
    !e ||
      e.destroyed ||
      !e.wrapperEl ||
      (A.target === e.wrapperEl &&
        (e.wrapperEl.removeEventListener("transitionend", u),
        !(d || (A.detail && A.detail.bySwiperTouchMove)) && T()));
  }
  const y = () => {
      if (e.destroyed || !e.autoplay.running) return;
      e.autoplay.paused ? (g = !0) : g && ((c = f), (g = !1));
      const A = e.autoplay.paused ? f : p + c - new Date().getTime();
      (e.autoplay.timeLeft = A),
        n("autoplayTimeLeft", A, A / a),
        (l = requestAnimationFrame(() => {
          y();
        }));
    },
    S = () => {
      let A;
      return (
        e.virtual && e.params.virtual.enabled
          ? (A = e.slides.filter((G) =>
              G.classList.contains("swiper-slide-active")
            )[0])
          : (A = e.slides[e.activeIndex]),
        A ? parseInt(A.getAttribute("data-swiper-autoplay"), 10) : void 0
      );
    },
    C = (A) => {
      if (e.destroyed || !e.autoplay.running) return;
      cancelAnimationFrame(l), y();
      let V = typeof A > "u" ? e.params.autoplay.delay : A;
      (a = e.params.autoplay.delay), (c = e.params.autoplay.delay);
      const G = S();
      !Number.isNaN(G) &&
        G > 0 &&
        typeof A > "u" &&
        ((V = G), (a = G), (c = G)),
        (f = V);
      const R = e.params.speed,
        W = () => {
          !e ||
            e.destroyed ||
            (e.params.autoplay.reverseDirection
              ? !e.isBeginning || e.params.loop || e.params.rewind
                ? (e.slidePrev(R, !0, !0), n("autoplay"))
                : e.params.autoplay.stopOnLastSlide ||
                  (e.slideTo(e.slides.length - 1, R, !0, !0), n("autoplay"))
              : !e.isEnd || e.params.loop || e.params.rewind
              ? (e.slideNext(R, !0, !0), n("autoplay"))
              : e.params.autoplay.stopOnLastSlide ||
                (e.slideTo(0, R, !0, !0), n("autoplay")),
            e.params.cssMode &&
              ((p = new Date().getTime()),
              requestAnimationFrame(() => {
                C();
              })));
        };
      return (
        V > 0
          ? (clearTimeout(o),
            (o = setTimeout(() => {
              W();
            }, V)))
          : requestAnimationFrame(() => {
              W();
            }),
        V
      );
    },
    z = () => {
      (p = new Date().getTime()),
        (e.autoplay.running = !0),
        C(),
        n("autoplayStart");
    },
    L = () => {
      (e.autoplay.running = !1),
        clearTimeout(o),
        cancelAnimationFrame(l),
        n("autoplayStop");
    },
    I = (A, V) => {
      if (e.destroyed || !e.autoplay.running) return;
      clearTimeout(o), A || (w = !0);
      const G = () => {
        n("autoplayPause"),
          e.params.autoplay.waitForTransition
            ? e.wrapperEl.addEventListener("transitionend", u)
            : T();
      };
      if (((e.autoplay.paused = !0), V)) {
        b && (f = e.params.autoplay.delay), (b = !1), G();
        return;
      }
      (f = (f || e.params.autoplay.delay) - (new Date().getTime() - p)),
        !(e.isEnd && f < 0 && !e.params.loop) && (f < 0 && (f = 0), G());
    },
    T = () => {
      (e.isEnd && f < 0 && !e.params.loop) ||
        e.destroyed ||
        !e.autoplay.running ||
        ((p = new Date().getTime()),
        w ? ((w = !1), C(f)) : C(),
        (e.autoplay.paused = !1),
        n("autoplayResume"));
    },
    E = () => {
      if (e.destroyed || !e.autoplay.running) return;
      const A = _();
      A.visibilityState === "hidden" && ((w = !0), I(!0)),
        A.visibilityState === "visible" && T();
    },
    M = (A) => {
      A.pointerType === "mouse" &&
        ((w = !0), (d = !0), !(e.animating || e.autoplay.paused) && I(!0));
    },
    x = (A) => {
      A.pointerType === "mouse" && ((d = !1), e.autoplay.paused && T());
    },
    P = () => {
      e.params.autoplay.pauseOnMouseEnter &&
        (e.el.addEventListener("pointerenter", M),
        e.el.addEventListener("pointerleave", x));
    },
    O = () => {
      e.el &&
        typeof e.el != "string" &&
        (e.el.removeEventListener("pointerenter", M),
        e.el.removeEventListener("pointerleave", x));
    },
    D = () => {
      _().addEventListener("visibilitychange", E);
    },
    Z = () => {
      _().removeEventListener("visibilitychange", E);
    };
  s("init", () => {
    e.params.autoplay.enabled && (P(), D(), z());
  }),
    s("destroy", () => {
      O(), Z(), e.autoplay.running && L();
    }),
    s("_freeModeStaticRelease", () => {
      (m || w) && T();
    }),
    s("_freeModeNoMomentumRelease", () => {
      e.params.autoplay.disableOnInteraction ? L() : I(!0, !0);
    }),
    s("beforeTransitionStart", (A, V, G) => {
      e.destroyed ||
        !e.autoplay.running ||
        (G || !e.params.autoplay.disableOnInteraction ? I(!0, !0) : L());
    }),
    s("sliderFirstMove", () => {
      if (!(e.destroyed || !e.autoplay.running)) {
        if (e.params.autoplay.disableOnInteraction) {
          L();
          return;
        }
        (h = !0),
          (m = !1),
          (w = !1),
          (v = setTimeout(() => {
            (w = !0), (m = !0), I(!0);
          }, 200));
      }
    }),
    s("touchEnd", () => {
      if (!(e.destroyed || !e.autoplay.running || !h)) {
        if (
          (clearTimeout(v),
          clearTimeout(o),
          e.params.autoplay.disableOnInteraction)
        ) {
          (m = !1), (h = !1);
          return;
        }
        m && e.params.cssMode && T(), (m = !1), (h = !1);
      }
    }),
    s("slideChange", () => {
      e.destroyed || !e.autoplay.running || (b = !0);
    }),
    Object.assign(e.autoplay, {
      start: z,
      stop: L,
      pause: I,
      resume: T,
    });
}
function Kt(i) {
  const {
    effect: e,
    swiper: t,
    on: s,
    setTranslate: n,
    setTransition: r,
    overwriteParams: o,
    perspective: l,
    recreateShadows: a,
    getEffectParams: c,
  } = i;
  s("beforeInit", () => {
    if (t.params.effect !== e) return;
    t.classNames.push(`${t.params.containerModifierClass}${e}`),
      l && l() && t.classNames.push(`${t.params.containerModifierClass}3d`);
    const p = o ? o() : {};
    Object.assign(t.params, p), Object.assign(t.originalParams, p);
  }),
    s("setTranslate", () => {
      t.params.effect === e && n();
    }),
    s("setTransition", (p, g) => {
      t.params.effect === e && r(g);
    }),
    s("transitionEnd", () => {
      if (t.params.effect === e && a) {
        if (!c || !c().slideShadows) return;
        t.slides.forEach((p) => {
          p.querySelectorAll(
            ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
          ).forEach((g) => g.remove());
        }),
          a();
      }
    });
  let f;
  s("virtualUpdate", () => {
    t.params.effect === e &&
      (t.slides.length || (f = !0),
      requestAnimationFrame(() => {
        f && t.slides && t.slides.length && (n(), (f = !1));
      }));
  });
}
function Jt(i, e) {
  const t = ye(e);
  return (
    t !== e &&
      ((t.style.backfaceVisibility = "hidden"),
      (t.style["-webkit-backface-visibility"] = "hidden")),
    t
  );
}
function Qt(i) {
  let { swiper: e, duration: t, transformElements: s, allSlides: n } = i;
  const { activeIndex: r } = e,
    o = (l) =>
      l.parentElement
        ? l.parentElement
        : e.slides.filter(
            (c) => c.shadowRoot && c.shadowRoot === l.parentNode
          )[0];
  if (e.params.virtualTranslate && t !== 0) {
    let l = !1,
      a;
    n
      ? (a = s)
      : (a = s.filter((c) => {
          const f = c.classList.contains("swiper-slide-transform") ? o(c) : c;
          return e.getSlideIndex(f) === r;
        })),
      a.forEach((c) => {
        Be(c, () => {
          if (l || !e || e.destroyed) return;
          (l = !0), (e.animating = !1);
          const f = new window.CustomEvent("transitionend", {
            bubbles: !0,
            cancelable: !0,
          });
          e.wrapperEl.dispatchEvent(f);
        });
      });
  }
}
function Zt(i) {
  let { swiper: e, extendParams: t, on: s } = i;
  t({
    fadeEffect: {
      crossFade: !1,
    },
  }),
    Kt({
      effect: "fade",
      swiper: e,
      on: s,
      setTranslate: () => {
        const { slides: o } = e,
          l = e.params.fadeEffect;
        for (let a = 0; a < o.length; a += 1) {
          const c = e.slides[a];
          let p = -c.swiperSlideOffset;
          e.params.virtualTranslate || (p -= e.translate);
          let g = 0;
          e.isHorizontal() || ((g = p), (p = 0));
          const h = e.params.fadeEffect.crossFade
              ? Math.max(1 - Math.abs(c.progress), 0)
              : 1 + Math.min(Math.max(c.progress, -1), 0),
            m = Jt(l, c);
          (m.style.opacity = h),
            (m.style.transform = `translate3d(${p}px, ${g}px, 0px)`);
        }
      },
      setTransition: (o) => {
        const l = e.slides.map((a) => ye(a));
        l.forEach((a) => {
          a.style.transitionDuration = `${o}ms`;
        }),
          Qt({
            swiper: e,
            duration: o,
            transformElements: l,
            allSlides: !0,
          });
      },
      overwriteParams: () => ({
        slidesPerView: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: !0,
        spaceBetween: 0,
        virtualTranslate: !e.params.cssMode,
      }),
    });
}
document.addEventListener("DOMContentLoaded", () => {
  Me.bind("[data-fancybox='gallery']", {
    Toolbar: !1,
    Carousel: {
      Navigation: {
        nextTpl:
          '<svg class="fancybox-custom-nav" stroke-width="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M10.296 7.71 14.621 12l-4.325 4.29 1.408 1.42L17.461 12l-5.757-5.71z"></path><path d="M6.704 6.29 5.296 7.71 9.621 12l-4.325 4.29 1.408 1.42L12.461 12z"></path></svg>',
        prevTpl:
          '<svg class="fancybox-custom-nav" stroke-width="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="m12.707 7.707-1.414-1.414L5.586 12l5.707 5.707 1.414-1.414L8.414 12z"></path><path d="M16.293 6.293 10.586 12l5.707 5.707 1.414-1.414L13.414 12l4.293-4.293z"></path></svg>',
      },
    },
  }),
    new F(".mySwiper", {
      effect: "fade",
      modules: [Yt, Xt, Zt, Ut],
      spaceBetween: 30,
      speed: 650,
      loop: !0,
      navigation: {
        nextEl: ".hero-slideshow-control-next",
        prevEl: ".hero-slideshow-control-prev",
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: !1,
      },
    });
});
