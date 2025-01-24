const b = (r, e = 1e4) => (
    (r = parseFloat(r + "") || 0), Math.round((r + Number.EPSILON) * e) / e
  ),
  We = function (r) {
    if (!(r && r instanceof Element && r.offsetParent)) return !1;
    const e = r.scrollHeight > r.clientHeight,
      t = window.getComputedStyle(r).overflowY,
      i = t.indexOf("hidden") !== -1,
      n = t.indexOf("visible") !== -1;
    return e && !i && !n;
  },
  Pe = function (r, e = void 0) {
    return (
      !(!r || r === document.body || (e && r === e)) &&
      (We(r) ? r : Pe(r.parentElement, e))
    );
  },
  _ = function (r) {
    var e = new DOMParser().parseFromString(r, "text/html").body;
    if (e.childElementCount > 1) {
      for (var t = document.createElement("div"); e.firstChild; )
        t.appendChild(e.firstChild);
      return t;
    }
    return e.firstChild;
  },
  Ye = (r) => `${r || ""}`.split(" ").filter((e) => !!e),
  W = (r, e, t) => {
    r &&
      Ye(e).forEach((i) => {
        r.classList.toggle(i, t || !1);
      });
  };
class ie {
  constructor(e) {
    Object.defineProperty(this, "pageX", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0,
    }),
      Object.defineProperty(this, "pageY", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "clientX", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "clientY", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "id", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "time", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "nativePointer", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.nativePointer = e),
      (this.pageX = e.pageX),
      (this.pageY = e.pageY),
      (this.clientX = e.clientX),
      (this.clientY = e.clientY),
      (this.id = self.Touch && e instanceof Touch ? e.identifier : -1),
      (this.time = Date.now());
  }
}
const ne = {
  passive: !1,
};
class Kt {
  constructor(
    e,
    { start: t = () => !0, move: i = () => {}, end: n = () => {} }
  ) {
    Object.defineProperty(this, "element", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0,
    }),
      Object.defineProperty(this, "startCallback", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "moveCallback", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "endCallback", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "currentPointers", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: [],
      }),
      Object.defineProperty(this, "startPointers", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: [],
      }),
      (this.element = e),
      (this.startCallback = t),
      (this.moveCallback = i),
      (this.endCallback = n);
    for (const s of [
      "onPointerStart",
      "onTouchStart",
      "onMove",
      "onTouchEnd",
      "onPointerEnd",
      "onWindowBlur",
    ])
      this[s] = this[s].bind(this);
    this.element.addEventListener("mousedown", this.onPointerStart, ne),
      this.element.addEventListener("touchstart", this.onTouchStart, ne),
      this.element.addEventListener("touchmove", this.onMove, ne),
      this.element.addEventListener("touchend", this.onTouchEnd),
      this.element.addEventListener("touchcancel", this.onTouchEnd);
  }
  onPointerStart(e) {
    if (!e.buttons || e.button !== 0) return;
    const t = new ie(e);
    this.currentPointers.some((i) => i.id === t.id) ||
      (this.triggerPointerStart(t, e) &&
        (window.addEventListener("mousemove", this.onMove),
        window.addEventListener("mouseup", this.onPointerEnd),
        window.addEventListener("blur", this.onWindowBlur)));
  }
  onTouchStart(e) {
    for (const t of Array.from(e.changedTouches || []))
      this.triggerPointerStart(new ie(t), e);
    window.addEventListener("blur", this.onWindowBlur);
  }
  onMove(e) {
    const t = this.currentPointers.slice(),
      i =
        "changedTouches" in e
          ? Array.from(e.changedTouches || []).map((s) => new ie(s))
          : [new ie(e)],
      n = [];
    for (const s of i) {
      const o = this.currentPointers.findIndex((a) => a.id === s.id);
      o < 0 || (n.push(s), (this.currentPointers[o] = s));
    }
    n.length && this.moveCallback(e, this.currentPointers.slice(), t);
  }
  onPointerEnd(e) {
    (e.buttons > 0 && e.button !== 0) ||
      (this.triggerPointerEnd(e, new ie(e)),
      window.removeEventListener("mousemove", this.onMove),
      window.removeEventListener("mouseup", this.onPointerEnd),
      window.removeEventListener("blur", this.onWindowBlur));
  }
  onTouchEnd(e) {
    for (const t of Array.from(e.changedTouches || []))
      this.triggerPointerEnd(e, new ie(t));
  }
  triggerPointerStart(e, t) {
    return (
      !!this.startCallback(t, e, this.currentPointers.slice()) &&
      (this.currentPointers.push(e), this.startPointers.push(e), !0)
    );
  }
  triggerPointerEnd(e, t) {
    const i = this.currentPointers.findIndex((n) => n.id === t.id);
    i < 0 ||
      (this.currentPointers.splice(i, 1),
      this.startPointers.splice(i, 1),
      this.endCallback(e, t, this.currentPointers.slice()));
  }
  onWindowBlur() {
    this.clear();
  }
  clear() {
    for (; this.currentPointers.length; ) {
      const e = this.currentPointers[this.currentPointers.length - 1];
      this.currentPointers.splice(this.currentPointers.length - 1, 1),
        this.startPointers.splice(this.currentPointers.length - 1, 1),
        this.endCallback(
          new Event("touchend", {
            bubbles: !0,
            cancelable: !0,
            clientX: e.clientX,
            clientY: e.clientY,
          }),
          e,
          this.currentPointers.slice()
        );
    }
  }
  stop() {
    this.element.removeEventListener("mousedown", this.onPointerStart, ne),
      this.element.removeEventListener("touchstart", this.onTouchStart, ne),
      this.element.removeEventListener("touchmove", this.onMove, ne),
      this.element.removeEventListener("touchend", this.onTouchEnd),
      this.element.removeEventListener("touchcancel", this.onTouchEnd),
      window.removeEventListener("mousemove", this.onMove),
      window.removeEventListener("mouseup", this.onPointerEnd),
      window.removeEventListener("blur", this.onWindowBlur);
  }
}
function Je(r, e) {
  return e
    ? Math.sqrt(
        Math.pow(e.clientX - r.clientX, 2) + Math.pow(e.clientY - r.clientY, 2)
      )
    : 0;
}
function Qe(r, e) {
  return e
    ? {
        clientX: (r.clientX + e.clientX) / 2,
        clientY: (r.clientY + e.clientY) / 2,
      }
    : r;
}
const Xe = (r) =>
    typeof r == "object" &&
    r !== null &&
    r.constructor === Object &&
    Object.prototype.toString.call(r) === "[object Object]",
  R = (r, ...e) => {
    const t = e.length;
    for (let i = 0; i < t; i++) {
      const n = e[i] || {};
      Object.entries(n).forEach(([s, o]) => {
        const a = Array.isArray(o) ? [] : {};
        r[s] ||
          Object.assign(r, {
            [s]: a,
          }),
          Xe(o)
            ? Object.assign(r[s], R(a, o))
            : Array.isArray(o)
            ? Object.assign(r, {
                [s]: [...o],
              })
            : Object.assign(r, {
                [s]: o,
              });
      });
    }
    return r;
  },
  Me = function (r, e) {
    return r
      .split(".")
      .reduce((t, i) => (typeof t == "object" ? t[i] : void 0), e);
  };
class Ce {
  constructor(e = {}) {
    Object.defineProperty(this, "options", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: e,
    }),
      Object.defineProperty(this, "events", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: new Map(),
      }),
      this.setOptions(e);
    for (const t of Object.getOwnPropertyNames(Object.getPrototypeOf(this)))
      t.startsWith("on") &&
        typeof this[t] == "function" &&
        (this[t] = this[t].bind(this));
  }
  setOptions(e) {
    this.options = e ? R({}, this.constructor.defaults, e) : {};
    for (const [t, i] of Object.entries(this.option("on") || {})) this.on(t, i);
  }
  option(e, ...t) {
    let i = Me(e, this.options);
    return i && typeof i == "function" && (i = i.call(this, this, ...t)), i;
  }
  optionFor(e, t, i, ...n) {
    let s = Me(t, e);
    var o;
    typeof (o = s) != "string" ||
      isNaN(o) ||
      isNaN(parseFloat(o)) ||
      (s = parseFloat(s)),
      s === "true" && (s = !0),
      s === "false" && (s = !1),
      s && typeof s == "function" && (s = s.call(this, this, e, ...n));
    let a = Me(t, this.options);
    return (
      a && typeof a == "function"
        ? (s = a.call(this, this, e, ...n, s))
        : s === void 0 && (s = a),
      s === void 0 ? i : s
    );
  }
  cn(e) {
    const t = this.options.classes;
    return (t && t[e]) || "";
  }
  localize(e, t = []) {
    e = String(e).replace(/\{\{(\w+).?(\w+)?\}\}/g, (i, n, s) => {
      let o = "";
      return (
        s
          ? (o = this.option(
              `${n[0] + n.toLowerCase().substring(1)}.l10n.${s}`
            ))
          : n && (o = this.option(`l10n.${n}`)),
        o || (o = i),
        o
      );
    });
    for (let i = 0; i < t.length; i++) e = e.split(t[i][0]).join(t[i][1]);
    return (e = e.replace(/\{\{(.*?)\}\}/g, (i, n) => n));
  }
  on(e, t) {
    let i = [];
    typeof e == "string" ? (i = e.split(" ")) : Array.isArray(e) && (i = e),
      this.events || (this.events = new Map()),
      i.forEach((n) => {
        let s = this.events.get(n);
        s || (this.events.set(n, []), (s = [])),
          s.includes(t) || s.push(t),
          this.events.set(n, s);
      });
  }
  off(e, t) {
    let i = [];
    typeof e == "string" ? (i = e.split(" ")) : Array.isArray(e) && (i = e),
      i.forEach((n) => {
        const s = this.events.get(n);
        if (Array.isArray(s)) {
          const o = s.indexOf(t);
          o > -1 && s.splice(o, 1);
        }
      });
  }
  emit(e, ...t) {
    [...(this.events.get(e) || [])].forEach((i) => i(this, ...t)),
      e !== "*" && this.emit("*", e, ...t);
  }
}
Object.defineProperty(Ce, "version", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: "5.0.36",
}),
  Object.defineProperty(Ce, "defaults", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: {},
  });
class Ve extends Ce {
  constructor(e = {}) {
    super(e),
      Object.defineProperty(this, "plugins", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {},
      });
  }
  attachPlugins(e = {}) {
    const t = new Map();
    for (const [i, n] of Object.entries(e)) {
      const s = this.option(i),
        o = this.plugins[i];
      o || s === !1
        ? o && s === !1 && (o.detach(), delete this.plugins[i])
        : t.set(i, new n(this, s || {}));
    }
    for (const [i, n] of t) (this.plugins[i] = n), n.attach();
  }
  detachPlugins(e) {
    e = e || Object.keys(this.plugins);
    for (const t of e) {
      const i = this.plugins[t];
      i && i.detach(), delete this.plugins[t];
    }
    return this.emit("detachPlugins"), this;
  }
}
var C;
(function (r) {
  (r[(r.Init = 0)] = "Init"),
    (r[(r.Error = 1)] = "Error"),
    (r[(r.Ready = 2)] = "Ready"),
    (r[(r.Panning = 3)] = "Panning"),
    (r[(r.Mousemove = 4)] = "Mousemove"),
    (r[(r.Destroy = 5)] = "Destroy");
})(C || (C = {}));
const X = ["a", "b", "c", "d", "e", "f"],
  Mt = {
    PANUP: "Move up",
    PANDOWN: "Move down",
    PANLEFT: "Move left",
    PANRIGHT: "Move right",
    ZOOMIN: "Zoom in",
    ZOOMOUT: "Zoom out",
    TOGGLEZOOM: "Toggle zoom level",
    TOGGLE1TO1: "Toggle zoom level",
    ITERATEZOOM: "Toggle zoom level",
    ROTATECCW: "Rotate counterclockwise",
    ROTATECW: "Rotate clockwise",
    FLIPX: "Flip horizontally",
    FLIPY: "Flip vertically",
    FITX: "Fit horizontally",
    FITY: "Fit vertically",
    RESET: "Reset",
    TOGGLEFS: "Toggle fullscreen",
  },
  Jt = {
    content: null,
    width: "auto",
    height: "auto",
    panMode: "drag",
    touch: !0,
    dragMinThreshold: 3,
    lockAxis: !1,
    mouseMoveFactor: 1,
    mouseMoveFriction: 0.12,
    zoom: !0,
    pinchToZoom: !0,
    panOnlyZoomed: "auto",
    minScale: 1,
    maxScale: 2,
    friction: 0.25,
    dragFriction: 0.35,
    decelFriction: 0.05,
    click: "toggleZoom",
    dblClick: !1,
    wheel: "zoom",
    wheelLimit: 7,
    spinner: !0,
    bounds: "auto",
    infinite: !1,
    rubberband: !0,
    bounce: !0,
    maxVelocity: 75,
    transformParent: !1,
    classes: {
      content: "f-panzoom__content",
      isLoading: "is-loading",
      canZoomIn: "can-zoom_in",
      canZoomOut: "can-zoom_out",
      isDraggable: "is-draggable",
      isDragging: "is-dragging",
      inFullscreen: "in-fullscreen",
      htmlHasFullscreen: "with-panzoom-in-fullscreen",
    },
    l10n: Mt,
  },
  et = '<circle cx="25" cy="25" r="20"></circle>',
  Ze =
    '<div class="f-spinner"><svg viewBox="0 0 50 50">' +
    et +
    et +
    "</svg></div>",
  z = (r) => r && r !== null && r instanceof Element && "nodeType" in r,
  P = (r, e) => {
    r &&
      Ye(e).forEach((t) => {
        r.classList.remove(t);
      });
  },
  w = (r, e) => {
    r &&
      Ye(e).forEach((t) => {
        r.classList.add(t);
      });
  },
  ue = {
    a: 1,
    b: 0,
    c: 0,
    d: 1,
    e: 0,
    f: 0,
  },
  Qt = 1e5,
  pe = 1e4,
  k = "mousemove",
  tt = "drag",
  it = "content",
  I = "auto";
let Oe = null,
  Ae = null;
class te extends Ve {
  get fits() {
    return (
      this.contentRect.width - this.contentRect.fitWidth < 1 &&
      this.contentRect.height - this.contentRect.fitHeight < 1
    );
  }
  get isTouchDevice() {
    return Ae === null && (Ae = window.matchMedia("(hover: none)").matches), Ae;
  }
  get isMobile() {
    return (
      Oe === null &&
        (Oe = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)),
      Oe
    );
  }
  get panMode() {
    return this.options.panMode !== k || this.isTouchDevice ? tt : k;
  }
  get panOnlyZoomed() {
    const e = this.options.panOnlyZoomed;
    return e === I ? this.isTouchDevice : e;
  }
  get isInfinite() {
    return this.option("infinite");
  }
  get angle() {
    return (180 * Math.atan2(this.current.b, this.current.a)) / Math.PI || 0;
  }
  get targetAngle() {
    return (180 * Math.atan2(this.target.b, this.target.a)) / Math.PI || 0;
  }
  get scale() {
    const { a: e, b: t } = this.current;
    return Math.sqrt(e * e + t * t) || 1;
  }
  get targetScale() {
    const { a: e, b: t } = this.target;
    return Math.sqrt(e * e + t * t) || 1;
  }
  get minScale() {
    return this.option("minScale") || 1;
  }
  get fullScale() {
    const { contentRect: e } = this;
    return e.fullWidth / e.fitWidth || 1;
  }
  get maxScale() {
    return this.fullScale * (this.option("maxScale") || 1) || 1;
  }
  get coverScale() {
    const { containerRect: e, contentRect: t } = this,
      i = Math.max(e.height / t.fitHeight, e.width / t.fitWidth) || 1;
    return Math.min(this.fullScale, i);
  }
  get isScaling() {
    return Math.abs(this.targetScale - this.scale) > 1e-5 && !this.isResting;
  }
  get isContentLoading() {
    const e = this.content;
    return !!(e && e instanceof HTMLImageElement) && !e.complete;
  }
  get isResting() {
    if (this.isBouncingX || this.isBouncingY) return !1;
    for (const e of X) {
      const t = e == "e" || e === "f" ? 1e-4 : 1e-5;
      if (Math.abs(this.target[e] - this.current[e]) > t) return !1;
    }
    return !(!this.ignoreBounds && !this.checkBounds().inBounds);
  }
  constructor(e, t = {}, i = {}) {
    var n;
    if (
      (super(t),
      Object.defineProperty(this, "pointerTracker", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "resizeObserver", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "updateTimer", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "clickTimer", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "rAF", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "isTicking", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1,
      }),
      Object.defineProperty(this, "ignoreBounds", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1,
      }),
      Object.defineProperty(this, "isBouncingX", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1,
      }),
      Object.defineProperty(this, "isBouncingY", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1,
      }),
      Object.defineProperty(this, "clicks", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0,
      }),
      Object.defineProperty(this, "trackingPoints", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: [],
      }),
      Object.defineProperty(this, "pwt", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0,
      }),
      Object.defineProperty(this, "cwd", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0,
      }),
      Object.defineProperty(this, "pmme", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "friction", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0,
      }),
      Object.defineProperty(this, "state", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: C.Init,
      }),
      Object.defineProperty(this, "isDragging", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1,
      }),
      Object.defineProperty(this, "container", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "content", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "spinner", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "containerRect", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {
          width: 0,
          height: 0,
          innerWidth: 0,
          innerHeight: 0,
        },
      }),
      Object.defineProperty(this, "contentRect", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          fullWidth: 0,
          fullHeight: 0,
          fitWidth: 0,
          fitHeight: 0,
          width: 0,
          height: 0,
        },
      }),
      Object.defineProperty(this, "dragStart", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {
          x: 0,
          y: 0,
          top: 0,
          left: 0,
          time: 0,
        },
      }),
      Object.defineProperty(this, "dragOffset", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {
          x: 0,
          y: 0,
          time: 0,
        },
      }),
      Object.defineProperty(this, "current", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: Object.assign({}, ue),
      }),
      Object.defineProperty(this, "target", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: Object.assign({}, ue),
      }),
      Object.defineProperty(this, "velocity", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {
          a: 0,
          b: 0,
          c: 0,
          d: 0,
          e: 0,
          f: 0,
        },
      }),
      Object.defineProperty(this, "lockedAxis", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1,
      }),
      !e)
    )
      throw new Error("Container Element Not Found");
    (this.container = e),
      this.initContent(),
      this.attachPlugins(Object.assign(Object.assign({}, te.Plugins), i)),
      this.emit("attachPlugins"),
      this.emit("init");
    const s = this.content;
    if (
      (s.addEventListener("load", this.onLoad),
      s.addEventListener("error", this.onError),
      this.isContentLoading)
    ) {
      if (this.option("spinner")) {
        e.classList.add(this.cn("isLoading"));
        const o = _(Ze);
        !e.contains(s) || s.parentElement instanceof HTMLPictureElement
          ? (this.spinner = e.appendChild(o))
          : (this.spinner =
              ((n = s.parentElement) === null || n === void 0
                ? void 0
                : n.insertBefore(o, s)) || null);
      }
      this.emit("beforeLoad");
    } else
      queueMicrotask(() => {
        this.enable();
      });
  }
  initContent() {
    const { container: e } = this,
      t = this.cn(it);
    let i = this.option(it) || e.querySelector(`.${t}`);
    if (
      (i ||
        ((i = e.querySelector("img,picture") || e.firstElementChild),
        i && w(i, t)),
      i instanceof HTMLPictureElement && (i = i.querySelector("img")),
      !i)
    )
      throw new Error("No content found");
    this.content = i;
  }
  onLoad() {
    const { spinner: e, container: t, state: i } = this;
    e && (e.remove(), (this.spinner = null)),
      this.option("spinner") && t.classList.remove(this.cn("isLoading")),
      this.emit("afterLoad"),
      i === C.Init ? this.enable() : this.updateMetrics();
  }
  onError() {
    this.state !== C.Destroy &&
      (this.spinner && (this.spinner.remove(), (this.spinner = null)),
      this.stop(),
      this.detachEvents(),
      (this.state = C.Error),
      this.emit("error"));
  }
  getNextScale(e) {
    const {
      fullScale: t,
      targetScale: i,
      coverScale: n,
      maxScale: s,
      minScale: o,
    } = this;
    let a = o;
    switch (e) {
      case "toggleMax":
        a = i - o < 0.5 * (s - o) ? s : o;
        break;
      case "toggleCover":
        a = i - o < 0.5 * (n - o) ? n : o;
        break;
      case "toggleZoom":
        a = i - o < 0.5 * (t - o) ? t : o;
        break;
      case "iterateZoom":
        let l = [1, t, s].sort((h, u) => h - u),
          c = l.findIndex((h) => h > i + 1e-5);
        a = l[c] || 1;
    }
    return a;
  }
  attachObserver() {
    var e;
    const t = () => {
      const { container: i, containerRect: n } = this;
      return (
        Math.abs(n.width - i.getBoundingClientRect().width) > 0.1 ||
        Math.abs(n.height - i.getBoundingClientRect().height) > 0.1
      );
    };
    this.resizeObserver ||
      window.ResizeObserver === void 0 ||
      (this.resizeObserver = new ResizeObserver(() => {
        this.updateTimer ||
          (t()
            ? (this.onResize(),
              this.isMobile &&
                (this.updateTimer = setTimeout(() => {
                  t() && this.onResize(), (this.updateTimer = null);
                }, 500)))
            : this.updateTimer &&
              (clearTimeout(this.updateTimer), (this.updateTimer = null)));
      })),
      (e = this.resizeObserver) === null ||
        e === void 0 ||
        e.observe(this.container);
  }
  detachObserver() {
    var e;
    (e = this.resizeObserver) === null || e === void 0 || e.disconnect();
  }
  attachEvents() {
    const { container: e } = this;
    e.addEventListener("click", this.onClick, {
      passive: !1,
      capture: !1,
    }),
      e.addEventListener("wheel", this.onWheel, {
        passive: !1,
      }),
      (this.pointerTracker = new Kt(e, {
        start: this.onPointerDown,
        move: this.onPointerMove,
        end: this.onPointerUp,
      })),
      document.addEventListener(k, this.onMouseMove);
  }
  detachEvents() {
    var e;
    const { container: t } = this;
    t.removeEventListener("click", this.onClick, {
      passive: !1,
      capture: !1,
    }),
      t.removeEventListener("wheel", this.onWheel, {
        passive: !1,
      }),
      (e = this.pointerTracker) === null || e === void 0 || e.stop(),
      (this.pointerTracker = null),
      document.removeEventListener(k, this.onMouseMove),
      document.removeEventListener("keydown", this.onKeydown, !0),
      this.clickTimer &&
        (clearTimeout(this.clickTimer), (this.clickTimer = null)),
      this.updateTimer &&
        (clearTimeout(this.updateTimer), (this.updateTimer = null));
  }
  animate() {
    this.setTargetForce();
    const e = this.friction,
      t = this.option("maxVelocity");
    for (const i of X)
      e
        ? ((this.velocity[i] *= 1 - e),
          t &&
            !this.isScaling &&
            (this.velocity[i] = Math.max(
              Math.min(this.velocity[i], t),
              -1 * t
            )),
          (this.current[i] += this.velocity[i]))
        : (this.current[i] = this.target[i]);
    this.setTransform(),
      this.setEdgeForce(),
      !this.isResting || this.isDragging
        ? (this.rAF = requestAnimationFrame(() => this.animate()))
        : this.stop("current");
  }
  setTargetForce() {
    for (const e of X)
      (e === "e" && this.isBouncingX) ||
        (e === "f" && this.isBouncingY) ||
        (this.velocity[e] =
          (1 / (1 - this.friction) - 1) * (this.target[e] - this.current[e]));
  }
  checkBounds(e = 0, t = 0) {
    const { current: i } = this,
      n = i.e + e,
      s = i.f + t,
      o = this.getBounds(),
      { x: a, y: l } = o,
      c = a.min,
      h = a.max,
      u = l.min,
      p = l.max;
    let d = 0,
      f = 0;
    return (
      c !== 1 / 0 && n < c ? (d = c - n) : h !== 1 / 0 && n > h && (d = h - n),
      u !== 1 / 0 && s < u ? (f = u - s) : p !== 1 / 0 && s > p && (f = p - s),
      Math.abs(d) < 1e-4 && (d = 0),
      Math.abs(f) < 1e-4 && (f = 0),
      Object.assign(Object.assign({}, o), {
        xDiff: d,
        yDiff: f,
        inBounds: !d && !f,
      })
    );
  }
  clampTargetBounds() {
    const { target: e } = this,
      { x: t, y: i } = this.getBounds();
    t.min !== 1 / 0 && (e.e = Math.max(e.e, t.min)),
      t.max !== 1 / 0 && (e.e = Math.min(e.e, t.max)),
      i.min !== 1 / 0 && (e.f = Math.max(e.f, i.min)),
      i.max !== 1 / 0 && (e.f = Math.min(e.f, i.max));
  }
  calculateContentDim(e = this.current) {
    const { content: t, contentRect: i } = this,
      { fitWidth: n, fitHeight: s, fullWidth: o, fullHeight: a } = i;
    let l = o,
      c = a;
    if (this.option("zoom") || this.angle !== 0) {
      const h =
          !(t instanceof HTMLImageElement) &&
          (window.getComputedStyle(t).maxWidth === "none" ||
            window.getComputedStyle(t).maxHeight === "none"),
        u = h ? o : n,
        p = h ? a : s,
        d = this.getMatrix(e),
        f = new DOMPoint(0, 0).matrixTransform(d),
        g = new DOMPoint(0 + u, 0).matrixTransform(d),
        m = new DOMPoint(0 + u, 0 + p).matrixTransform(d),
        v = new DOMPoint(0, 0 + p).matrixTransform(d),
        y = Math.abs(m.x - f.x),
        x = Math.abs(m.y - f.y),
        E = Math.abs(v.x - g.x),
        j = Math.abs(v.y - g.y);
      (l = Math.max(y, E)), (c = Math.max(x, j));
    }
    return {
      contentWidth: l,
      contentHeight: c,
    };
  }
  setEdgeForce() {
    if (
      this.ignoreBounds ||
      this.isDragging ||
      this.panMode === k ||
      this.targetScale < this.scale
    )
      return (this.isBouncingX = !1), void (this.isBouncingY = !1);
    const { target: e } = this,
      { x: t, y: i, xDiff: n, yDiff: s } = this.checkBounds(),
      o = this.option("maxVelocity");
    let a = this.velocity.e,
      l = this.velocity.f;
    n !== 0
      ? ((this.isBouncingX = !0),
        n * a <= 0
          ? (a += 0.14 * n)
          : ((a = 0.14 * n),
            t.min !== 1 / 0 && (this.target.e = Math.max(e.e, t.min)),
            t.max !== 1 / 0 && (this.target.e = Math.min(e.e, t.max))),
        o && (a = Math.max(Math.min(a, o), -1 * o)))
      : (this.isBouncingX = !1),
      s !== 0
        ? ((this.isBouncingY = !0),
          s * l <= 0
            ? (l += 0.14 * s)
            : ((l = 0.14 * s),
              i.min !== 1 / 0 && (this.target.f = Math.max(e.f, i.min)),
              i.max !== 1 / 0 && (this.target.f = Math.min(e.f, i.max))),
          o && (l = Math.max(Math.min(l, o), -1 * o)))
        : (this.isBouncingY = !1),
      this.isBouncingX && (this.velocity.e = a),
      this.isBouncingY && (this.velocity.f = l);
  }
  enable() {
    const { content: e } = this,
      t = new DOMMatrixReadOnly(window.getComputedStyle(e).transform);
    for (const i of X) this.current[i] = this.target[i] = t[i];
    this.updateMetrics(),
      this.attachObserver(),
      this.attachEvents(),
      (this.state = C.Ready),
      this.emit("ready");
  }
  onClick(e) {
    var t;
    e.type === "click" &&
      e.detail === 0 &&
      ((this.dragOffset.x = 0), (this.dragOffset.y = 0)),
      this.isDragging &&
        ((t = this.pointerTracker) === null || t === void 0 || t.clear(),
        (this.trackingPoints = []),
        this.startDecelAnim());
    const i = e.target;
    if (!i || e.defaultPrevented) return;
    if (i.hasAttribute("disabled"))
      return e.preventDefault(), void e.stopPropagation();
    if (
      (() => {
        const d = window.getSelection();
        return d && d.type === "Range";
      })() &&
      !i.closest("button")
    )
      return;
    const n = i.closest("[data-panzoom-action]"),
      s = i.closest("[data-panzoom-change]"),
      o = n || s,
      a = o && z(o) ? o.dataset : null;
    if (a) {
      const d = a.panzoomChange,
        f = a.panzoomAction;
      if (((d || f) && e.preventDefault(), d)) {
        let g = {};
        try {
          g = JSON.parse(d);
        } catch {
          console && console.warn("The given data was not valid JSON");
        }
        return void this.applyChange(g);
      }
      if (f) return void (this[f] && this[f]());
    }
    if (Math.abs(this.dragOffset.x) > 3 || Math.abs(this.dragOffset.y) > 3)
      return e.preventDefault(), void e.stopPropagation();
    if (i.closest("[data-fancybox]")) return;
    const l = this.content.getBoundingClientRect(),
      c = this.dragStart;
    if (
      c.time &&
      !this.canZoomOut() &&
      (Math.abs(l.x - c.x) > 2 || Math.abs(l.y - c.y) > 2)
    )
      return;
    this.dragStart.time = 0;
    const h = (d) => {
        this.option("zoom", e) &&
          d &&
          typeof d == "string" &&
          /(iterateZoom)|(toggle(Zoom|Full|Cover|Max)|(zoomTo(Fit|Cover|Max)))/.test(
            d
          ) &&
          typeof this[d] == "function" &&
          (e.preventDefault(),
          this[d]({
            event: e,
          }));
      },
      u = this.option("click", e),
      p = this.option("dblClick", e);
    p
      ? (this.clicks++,
        this.clicks == 1 &&
          (this.clickTimer = setTimeout(() => {
            this.clicks === 1
              ? (this.emit("click", e), !e.defaultPrevented && u && h(u))
              : (this.emit("dblClick", e), e.defaultPrevented || h(p)),
              (this.clicks = 0),
              (this.clickTimer = null);
          }, 350)))
      : (this.emit("click", e), !e.defaultPrevented && u && h(u));
  }
  addTrackingPoint(e) {
    const t = this.trackingPoints.filter((i) => i.time > Date.now() - 100);
    t.push(e), (this.trackingPoints = t);
  }
  onPointerDown(e, t, i) {
    var n;
    if (this.option("touch", e) === !1) return !1;
    (this.pwt = 0),
      (this.dragOffset = {
        x: 0,
        y: 0,
        time: 0,
      }),
      (this.trackingPoints = []);
    const s = this.content.getBoundingClientRect();
    if (
      ((this.dragStart = {
        x: s.x,
        y: s.y,
        top: s.top,
        left: s.left,
        time: Date.now(),
      }),
      this.clickTimer)
    )
      return !1;
    if (this.panMode === k && this.targetScale > 1)
      return e.preventDefault(), e.stopPropagation(), !1;
    const o = e.composedPath()[0];
    if (!i.length) {
      if (
        ["TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO", "IFRAME"].includes(
          o.nodeName
        ) ||
        o.closest(
          "[contenteditable],[data-selectable],[data-draggable],[data-clickable],[data-panzoom-change],[data-panzoom-action]"
        )
      )
        return !1;
      (n = window.getSelection()) === null ||
        n === void 0 ||
        n.removeAllRanges();
    }
    if (e.type === "mousedown")
      ["A", "BUTTON"].includes(o.nodeName) || e.preventDefault();
    else if (Math.abs(this.velocity.a) > 0.3) return !1;
    return (
      (this.target.e = this.current.e),
      (this.target.f = this.current.f),
      this.stop(),
      this.isDragging ||
        ((this.isDragging = !0),
        this.addTrackingPoint(t),
        this.emit("touchStart", e)),
      !0
    );
  }
  onPointerMove(e, t, i) {
    if (
      this.option("touch", e) === !1 ||
      !this.isDragging ||
      (t.length < 2 &&
        this.panOnlyZoomed &&
        b(this.targetScale) <= b(this.minScale)) ||
      (this.emit("touchMove", e), e.defaultPrevented)
    )
      return;
    this.addTrackingPoint(t[0]);
    const { content: n } = this,
      s = Qe(i[0], i[1]),
      o = Qe(t[0], t[1]);
    let a = 0,
      l = 0;
    if (t.length > 1) {
      const x = n.getBoundingClientRect();
      (a = s.clientX - x.left - 0.5 * x.width),
        (l = s.clientY - x.top - 0.5 * x.height);
    }
    const c = Je(i[0], i[1]),
      h = Je(t[0], t[1]);
    let u = c ? h / c : 1,
      p = o.clientX - s.clientX,
      d = o.clientY - s.clientY;
    (this.dragOffset.x += p),
      (this.dragOffset.y += d),
      (this.dragOffset.time = Date.now() - this.dragStart.time);
    let f = b(this.targetScale) === b(this.minScale) && this.option("lockAxis");
    if (f && !this.lockedAxis)
      if (f === "xy" || f === "y" || e.type === "touchmove") {
        if (Math.abs(this.dragOffset.x) < 6 && Math.abs(this.dragOffset.y) < 6)
          return void e.preventDefault();
        const x = Math.abs(
          (180 * Math.atan2(this.dragOffset.y, this.dragOffset.x)) / Math.PI
        );
        (this.lockedAxis = x > 45 && x < 135 ? "y" : "x"),
          (this.dragOffset.x = 0),
          (this.dragOffset.y = 0),
          (p = 0),
          (d = 0);
      } else this.lockedAxis = f;
    if (
      (Pe(e.target, this.content) && ((f = "x"), (this.dragOffset.y = 0)),
      f &&
        f !== "xy" &&
        this.lockedAxis !== f &&
        b(this.targetScale) === b(this.minScale))
    )
      return;
    e.cancelable && e.preventDefault(),
      this.container.classList.add(this.cn("isDragging"));
    const g = this.checkBounds(p, d);
    this.option("rubberband")
      ? (this.isInfinite !== "x" &&
          ((g.xDiff > 0 && p < 0) || (g.xDiff < 0 && p > 0)) &&
          (p *= Math.max(
            0,
            0.5 - Math.abs((0.75 / this.contentRect.fitWidth) * g.xDiff)
          )),
        this.isInfinite !== "y" &&
          ((g.yDiff > 0 && d < 0) || (g.yDiff < 0 && d > 0)) &&
          (d *= Math.max(
            0,
            0.5 - Math.abs((0.75 / this.contentRect.fitHeight) * g.yDiff)
          )))
      : (g.xDiff && (p = 0), g.yDiff && (d = 0));
    const m = this.targetScale,
      v = this.minScale,
      y = this.maxScale;
    m < 0.5 * v && (u = Math.max(u, v)),
      m > 1.5 * y && (u = Math.min(u, y)),
      this.lockedAxis === "y" && b(m) === b(v) && (p = 0),
      this.lockedAxis === "x" && b(m) === b(v) && (d = 0),
      this.applyChange({
        originX: a,
        originY: l,
        panX: p,
        panY: d,
        scale: u,
        friction: this.option("dragFriction"),
        ignoreBounds: !0,
      });
  }
  onPointerUp(e, t, i) {
    if (i.length)
      return (
        (this.dragOffset.x = 0),
        (this.dragOffset.y = 0),
        void (this.trackingPoints = [])
      );
    this.container.classList.remove(this.cn("isDragging")),
      this.isDragging &&
        (this.addTrackingPoint(t),
        this.panOnlyZoomed &&
          this.contentRect.width - this.contentRect.fitWidth < 1 &&
          this.contentRect.height - this.contentRect.fitHeight < 1 &&
          (this.trackingPoints = []),
        Pe(e.target, this.content) &&
          this.lockedAxis === "y" &&
          (this.trackingPoints = []),
        this.emit("touchEnd", e),
        (this.isDragging = !1),
        (this.lockedAxis = !1),
        this.state !== C.Destroy &&
          (e.defaultPrevented || this.startDecelAnim()));
  }
  startDecelAnim() {
    var e;
    const t = this.isScaling;
    this.rAF && (cancelAnimationFrame(this.rAF), (this.rAF = null)),
      (this.isBouncingX = !1),
      (this.isBouncingY = !1);
    for (const x of X) this.velocity[x] = 0;
    (this.target.e = this.current.e),
      (this.target.f = this.current.f),
      P(this.container, "is-scaling"),
      P(this.container, "is-animating"),
      (this.isTicking = !1);
    const { trackingPoints: i } = this,
      n = i[0],
      s = i[i.length - 1];
    let o = 0,
      a = 0,
      l = 0;
    s &&
      n &&
      ((o = s.clientX - n.clientX),
      (a = s.clientY - n.clientY),
      (l = s.time - n.time));
    const c =
      ((e = window.visualViewport) === null || e === void 0
        ? void 0
        : e.scale) || 1;
    c !== 1 && ((o *= c), (a *= c));
    let h = 0,
      u = 0,
      p = 0,
      d = 0,
      f = this.option("decelFriction");
    const g = this.targetScale;
    if (l > 0) {
      (p = Math.abs(o) > 3 ? o / (l / 30) : 0),
        (d = Math.abs(a) > 3 ? a / (l / 30) : 0);
      const x = this.option("maxVelocity");
      x &&
        ((p = Math.max(Math.min(p, x), -1 * x)),
        (d = Math.max(Math.min(d, x), -1 * x)));
    }
    p && (h = p / (1 / (1 - f) - 1)),
      d && (u = d / (1 / (1 - f) - 1)),
      (this.option("lockAxis") === "y" ||
        (this.option("lockAxis") === "xy" &&
          this.lockedAxis === "y" &&
          b(g) === this.minScale)) &&
        (h = p = 0),
      (this.option("lockAxis") === "x" ||
        (this.option("lockAxis") === "xy" &&
          this.lockedAxis === "x" &&
          b(g) === this.minScale)) &&
        (u = d = 0);
    const m = this.dragOffset.x,
      v = this.dragOffset.y,
      y = this.option("dragMinThreshold") || 0;
    Math.abs(m) < y && Math.abs(v) < y && ((h = u = 0), (p = d = 0)),
      ((this.option("zoom") &&
        (g < this.minScale - 1e-5 || g > this.maxScale + 1e-5)) ||
        (t && !h && !u)) &&
        (f = 0.35),
      this.applyChange({
        panX: h,
        panY: u,
        friction: f,
      }),
      this.emit("decel", p, d, m, v);
  }
  onWheel(e) {
    var t = [-e.deltaX || 0, -e.deltaY || 0, -e.detail || 0].reduce(function (
      s,
      o
    ) {
      return Math.abs(o) > Math.abs(s) ? o : s;
    });
    const i = Math.max(-1, Math.min(1, t));
    if ((this.emit("wheel", e, i), this.panMode === k || e.defaultPrevented))
      return;
    const n = this.option("wheel");
    n === "pan"
      ? (e.preventDefault(),
        (this.panOnlyZoomed && !this.canZoomOut()) ||
          this.applyChange({
            panX: 2 * -e.deltaX,
            panY: 2 * -e.deltaY,
            bounce: !1,
          }))
      : n === "zoom" && this.option("zoom") !== !1 && this.zoomWithWheel(e);
  }
  onMouseMove(e) {
    this.panWithMouse(e);
  }
  onKeydown(e) {
    e.key === "Escape" && this.toggleFS();
  }
  onResize() {
    this.updateMetrics(), this.checkBounds().inBounds || this.requestTick();
  }
  setTransform() {
    this.emit("beforeTransform");
    const { current: e, target: t, content: i, contentRect: n } = this,
      s = Object.assign({}, ue);
    for (const m of X) {
      const v = m == "e" || m === "f" ? pe : Qt;
      (s[m] = b(e[m], v)),
        Math.abs(t[m] - e[m]) < (m == "e" || m === "f" ? 0.51 : 0.001) &&
          (e[m] = t[m]);
    }
    let { a: o, b: a, c: l, d: c, e: h, f: u } = s,
      p = `matrix(${o}, ${a}, ${l}, ${c}, ${h}, ${u})`,
      d = i.parentElement instanceof HTMLPictureElement ? i.parentElement : i;
    if (
      (this.option("transformParent") && (d = d.parentElement || d),
      d.style.transform === p)
    )
      return;
    d.style.transform = p;
    const { contentWidth: f, contentHeight: g } = this.calculateContentDim();
    (n.width = f), (n.height = g), this.emit("afterTransform");
  }
  updateMetrics(e = !1) {
    var t;
    if (!this || this.state === C.Destroy || this.isContentLoading) return;
    const i = Math.max(
        1,
        ((t = window.visualViewport) === null || t === void 0
          ? void 0
          : t.scale) || 1
      ),
      { container: n, content: s } = this,
      o = s instanceof HTMLImageElement,
      a = n.getBoundingClientRect(),
      l = getComputedStyle(this.container);
    let c = a.width * i,
      h = a.height * i;
    const u = parseFloat(l.paddingTop) + parseFloat(l.paddingBottom),
      p = c - (parseFloat(l.paddingLeft) + parseFloat(l.paddingRight)),
      d = h - u;
    this.containerRect = {
      width: c,
      height: h,
      innerWidth: p,
      innerHeight: d,
    };
    const f =
        parseFloat(s.dataset.width || "") ||
        ((A) => {
          let V = 0;
          return (
            (V =
              A instanceof HTMLImageElement
                ? A.naturalWidth
                : A instanceof SVGElement
                ? A.width.baseVal.value
                : Math.max(A.offsetWidth, A.scrollWidth)),
            V || 0
          );
        })(s),
      g =
        parseFloat(s.dataset.height || "") ||
        ((A) => {
          let V = 0;
          return (
            (V =
              A instanceof HTMLImageElement
                ? A.naturalHeight
                : A instanceof SVGElement
                ? A.height.baseVal.value
                : Math.max(A.offsetHeight, A.scrollHeight)),
            V || 0
          );
        })(s);
    let m = this.option("width", f) || I,
      v = this.option("height", g) || I;
    const y = m === I,
      x = v === I;
    typeof m != "number" && (m = f),
      typeof v != "number" && (v = g),
      y && (m = f * (v / g)),
      x && (v = g / (f / m));
    let E = s.parentElement instanceof HTMLPictureElement ? s.parentElement : s;
    this.option("transformParent") && (E = E.parentElement || E);
    const j = E.getAttribute("style") || "";
    E.style.setProperty("transform", "none", "important"),
      o && ((E.style.width = ""), (E.style.height = "")),
      E.offsetHeight;
    const B = s.getBoundingClientRect();
    let T = B.width * i,
      H = B.height * i,
      qt = T,
      Yt = H;
    (T = Math.min(T, m)),
      (H = Math.min(H, v)),
      o
        ? ({ width: T, height: H } = ((A, V, Vt, Zt) => {
            const Ut = Vt / A,
              Gt = Zt / V,
              Ke = Math.min(Ut, Gt);
            return {
              width: (A *= Ke),
              height: (V *= Ke),
            };
          })(m, v, T, H))
        : ((T = Math.min(T, m)), (H = Math.min(H, v)));
    let Ue = 0.5 * (Yt - H),
      Ge = 0.5 * (qt - T);
    (this.contentRect = Object.assign(Object.assign({}, this.contentRect), {
      top: B.top - a.top + Ue,
      bottom: a.bottom - B.bottom + Ue,
      left: B.left - a.left + Ge,
      right: a.right - B.right + Ge,
      fitWidth: T,
      fitHeight: H,
      width: T,
      height: H,
      fullWidth: m,
      fullHeight: v,
    })),
      (E.style.cssText = j),
      o && ((E.style.width = `${T}px`), (E.style.height = `${H}px`)),
      this.setTransform(),
      e !== !0 && this.emit("refresh"),
      this.ignoreBounds ||
        (b(this.targetScale) < b(this.minScale)
          ? this.zoomTo(this.minScale, {
              friction: 0,
            })
          : this.targetScale > this.maxScale
          ? this.zoomTo(this.maxScale, {
              friction: 0,
            })
          : this.state === C.Init ||
            this.checkBounds().inBounds ||
            this.requestTick()),
      this.updateControls();
  }
  calculateBounds() {
    const { contentWidth: e, contentHeight: t } = this.calculateContentDim(
        this.target
      ),
      { targetScale: i, lockedAxis: n } = this,
      { fitWidth: s, fitHeight: o } = this.contentRect;
    let a = 0,
      l = 0,
      c = 0,
      h = 0;
    const u = this.option("infinite");
    if (u === !0 || (n && u === n))
      (a = -1 / 0), (c = 1 / 0), (l = -1 / 0), (h = 1 / 0);
    else {
      let { containerRect: p, contentRect: d } = this,
        f = b(s * i, pe),
        g = b(o * i, pe),
        { innerWidth: m, innerHeight: v } = p;
      if (
        (p.width === f && (m = p.width), p.width === g && (v = p.height), e > m)
      ) {
        (c = 0.5 * (e - m)), (a = -1 * c);
        let y = 0.5 * (d.right - d.left);
        (a += y), (c += y);
      }
      if (
        (s > m && e < m && ((a -= 0.5 * (s - m)), (c -= 0.5 * (s - m))), t > v)
      ) {
        (h = 0.5 * (t - v)), (l = -1 * h);
        let y = 0.5 * (d.bottom - d.top);
        (l += y), (h += y);
      }
      o > v && t < v && ((a -= 0.5 * (o - v)), (c -= 0.5 * (o - v)));
    }
    return {
      x: {
        min: a,
        max: c,
      },
      y: {
        min: l,
        max: h,
      },
    };
  }
  getBounds() {
    const e = this.option("bounds");
    return e !== I ? e : this.calculateBounds();
  }
  updateControls() {
    const e = this,
      t = e.container,
      { panMode: i, contentRect: n, targetScale: s, minScale: o } = e;
    let a = o,
      l = e.option("click") || !1;
    l && (a = e.getNextScale(l));
    let c = e.canZoomIn(),
      h = e.canZoomOut(),
      u = i === tt && !!this.option("touch"),
      p = h && u;
    if (
      (u &&
        (b(s) < b(o) && !this.panOnlyZoomed && (p = !0),
        (b(n.width, 1) > b(n.fitWidth, 1) ||
          b(n.height, 1) > b(n.fitHeight, 1)) &&
          (p = !0)),
      b(n.width * s, 1) < b(n.fitWidth, 1) && (p = !1),
      i === k && (p = !1),
      W(t, this.cn("isDraggable"), p),
      !this.option("zoom"))
    )
      return;
    let d = c && b(a) > b(s),
      f = !d && !p && h && b(a) < b(s);
    W(t, this.cn("canZoomIn"), d), W(t, this.cn("canZoomOut"), f);
    for (const g of t.querySelectorAll("[data-panzoom-action]")) {
      let m = !1,
        v = !1;
      switch (g.dataset.panzoomAction) {
        case "zoomIn":
          c ? (m = !0) : (v = !0);
          break;
        case "zoomOut":
          h ? (m = !0) : (v = !0);
          break;
        case "toggleZoom":
        case "iterateZoom":
          c || h ? (m = !0) : (v = !0);
          const y = g.querySelector("g");
          y && (y.style.display = c ? "" : "none");
      }
      m
        ? (g.removeAttribute("disabled"), g.removeAttribute("tabindex"))
        : v &&
          (g.setAttribute("disabled", ""), g.setAttribute("tabindex", "-1"));
    }
  }
  panTo({
    x: e = this.target.e,
    y: t = this.target.f,
    scale: i = this.targetScale,
    friction: n = this.option("friction"),
    angle: s = 0,
    originX: o = 0,
    originY: a = 0,
    flipX: l = !1,
    flipY: c = !1,
    ignoreBounds: h = !1,
  }) {
    this.state !== C.Destroy &&
      this.applyChange({
        panX: e - this.target.e,
        panY: t - this.target.f,
        scale: i / this.targetScale,
        angle: s,
        originX: o,
        originY: a,
        friction: n,
        flipX: l,
        flipY: c,
        ignoreBounds: h,
      });
  }
  applyChange({
    panX: e = 0,
    panY: t = 0,
    scale: i = 1,
    angle: n = 0,
    originX: s = -this.current.e,
    originY: o = -this.current.f,
    friction: a = this.option("friction"),
    flipX: l = !1,
    flipY: c = !1,
    ignoreBounds: h = !1,
    bounce: u = this.option("bounce"),
  }) {
    const p = this.state;
    if (p === C.Destroy) return;
    this.rAF && (cancelAnimationFrame(this.rAF), (this.rAF = null)),
      (this.friction = a || 0),
      (this.ignoreBounds = h);
    const { current: d } = this,
      f = d.e,
      g = d.f,
      m = this.getMatrix(this.target);
    let v = new DOMMatrix().translate(f, g).translate(s, o).translate(e, t);
    if (this.option("zoom")) {
      if (!h) {
        const y = this.targetScale,
          x = this.minScale,
          E = this.maxScale;
        y * i < x && (i = x / y), y * i > E && (i = E / y);
      }
      v = v.scale(i);
    }
    (v = v.translate(-s, -o).translate(-f, -g).multiply(m)),
      n && (v = v.rotate(n)),
      l && (v = v.scale(-1, 1)),
      c && (v = v.scale(1, -1));
    for (const y of X)
      y !== "e" &&
      y !== "f" &&
      (v[y] > this.minScale + 1e-5 || v[y] < this.minScale - 1e-5)
        ? (this.target[y] = v[y])
        : (this.target[y] = b(v[y], pe));
    (this.targetScale < this.scale ||
      Math.abs(i - 1) > 0.1 ||
      this.panMode === k ||
      u === !1) &&
      !h &&
      this.clampTargetBounds(),
      p === C.Init
        ? this.animate()
        : this.isResting || ((this.state = C.Panning), this.requestTick());
  }
  stop(e = !1) {
    if (this.state === C.Init || this.state === C.Destroy) return;
    const t = this.isTicking;
    this.rAF && (cancelAnimationFrame(this.rAF), (this.rAF = null)),
      (this.isBouncingX = !1),
      (this.isBouncingY = !1);
    for (const i of X)
      (this.velocity[i] = 0),
        e === "current"
          ? (this.current[i] = this.target[i])
          : e === "target" && (this.target[i] = this.current[i]);
    this.setTransform(),
      P(this.container, "is-scaling"),
      P(this.container, "is-animating"),
      (this.isTicking = !1),
      (this.state = C.Ready),
      t && (this.emit("endAnimation"), this.updateControls());
  }
  requestTick() {
    this.isTicking ||
      (this.emit("startAnimation"),
      this.updateControls(),
      w(this.container, "is-animating"),
      this.isScaling && w(this.container, "is-scaling")),
      (this.isTicking = !0),
      this.rAF || (this.rAF = requestAnimationFrame(() => this.animate()));
  }
  panWithMouse(e, t = this.option("mouseMoveFriction")) {
    if (
      ((this.pmme = e),
      this.panMode !== k || !e || b(this.targetScale) <= b(this.minScale))
    )
      return;
    this.emit("mouseMove", e);
    const { container: i, containerRect: n, contentRect: s } = this,
      o = n.width,
      a = n.height,
      l = i.getBoundingClientRect(),
      c = (e.clientX || 0) - l.left,
      h = (e.clientY || 0) - l.top;
    let { contentWidth: u, contentHeight: p } = this.calculateContentDim(
      this.target
    );
    const d = this.option("mouseMoveFactor");
    d > 1 && (u !== o && (u *= d), p !== a && (p *= d));
    let f = 0.5 * (u - o) - (((c / o) * 100) / 100) * (u - o);
    f += 0.5 * (s.right - s.left);
    let g = 0.5 * (p - a) - (((h / a) * 100) / 100) * (p - a);
    (g += 0.5 * (s.bottom - s.top)),
      this.applyChange({
        panX: f - this.target.e,
        panY: g - this.target.f,
        friction: t,
      });
  }
  zoomWithWheel(e) {
    if (this.state === C.Destroy || this.state === C.Init) return;
    const t = Date.now();
    if (t - this.pwt < 45) return void e.preventDefault();
    this.pwt = t;
    var i = [-e.deltaX || 0, -e.deltaY || 0, -e.detail || 0].reduce(function (
      c,
      h
    ) {
      return Math.abs(h) > Math.abs(c) ? h : c;
    });
    const n = Math.max(-1, Math.min(1, i)),
      { targetScale: s, maxScale: o, minScale: a } = this;
    let l = (s * (100 + 45 * n)) / 100;
    b(l) < b(a) && b(s) <= b(a)
      ? ((this.cwd += Math.abs(n)), (l = a))
      : b(l) > b(o) && b(s) >= b(o)
      ? ((this.cwd += Math.abs(n)), (l = o))
      : ((this.cwd = 0), (l = Math.max(Math.min(l, o), a))),
      this.cwd > this.option("wheelLimit") ||
        (e.preventDefault(),
        b(l) !== b(s) &&
          this.zoomTo(l, {
            event: e,
          }));
  }
  canZoomIn() {
    return (
      this.option("zoom") &&
      (b(this.contentRect.width, 1) < b(this.contentRect.fitWidth, 1) ||
        b(this.targetScale) < b(this.maxScale))
    );
  }
  canZoomOut() {
    return this.option("zoom") && b(this.targetScale) > b(this.minScale);
  }
  zoomIn(e = 1.25, t) {
    this.zoomTo(this.targetScale * e, t);
  }
  zoomOut(e = 0.8, t) {
    this.zoomTo(this.targetScale * e, t);
  }
  zoomToFit(e) {
    this.zoomTo("fit", e);
  }
  zoomToCover(e) {
    this.zoomTo("cover", e);
  }
  zoomToFull(e) {
    this.zoomTo("full", e);
  }
  zoomToMax(e) {
    this.zoomTo("max", e);
  }
  toggleZoom(e) {
    this.zoomTo(this.getNextScale("toggleZoom"), e);
  }
  toggleMax(e) {
    this.zoomTo(this.getNextScale("toggleMax"), e);
  }
  toggleCover(e) {
    this.zoomTo(this.getNextScale("toggleCover"), e);
  }
  iterateZoom(e) {
    this.zoomTo("next", e);
  }
  zoomTo(
    e = 1,
    { friction: t = I, originX: i = I, originY: n = I, event: s } = {}
  ) {
    if (this.isContentLoading || this.state === C.Destroy) return;
    const { targetScale: o, fullScale: a, maxScale: l, coverScale: c } = this;
    if (
      (this.stop(),
      this.panMode === k && (s = this.pmme || s),
      s || i === I || n === I)
    ) {
      const u = this.content.getBoundingClientRect(),
        p = this.container.getBoundingClientRect(),
        d = s ? s.clientX : p.left + 0.5 * p.width,
        f = s ? s.clientY : p.top + 0.5 * p.height;
      (i = d - u.left - 0.5 * u.width), (n = f - u.top - 0.5 * u.height);
    }
    let h = 1;
    typeof e == "number"
      ? (h = e)
      : e === "full"
      ? (h = a)
      : e === "cover"
      ? (h = c)
      : e === "max"
      ? (h = l)
      : e === "fit"
      ? (h = 1)
      : e === "next" && (h = this.getNextScale("iterateZoom")),
      (h = h / o || 1),
      (t = t === I ? (h > 1 ? 0.15 : 0.25) : t),
      this.applyChange({
        scale: h,
        originX: i,
        originY: n,
        friction: t,
      }),
      s && this.panMode === k && this.panWithMouse(s, t);
  }
  rotateCCW() {
    this.applyChange({
      angle: -90,
    });
  }
  rotateCW() {
    this.applyChange({
      angle: 90,
    });
  }
  flipX() {
    this.applyChange({
      flipX: !0,
    });
  }
  flipY() {
    this.applyChange({
      flipY: !0,
    });
  }
  fitX() {
    this.stop("target");
    const { containerRect: e, contentRect: t, target: i } = this;
    this.applyChange({
      panX: 0.5 * e.width - (t.left + 0.5 * t.fitWidth) - i.e,
      panY: 0.5 * e.height - (t.top + 0.5 * t.fitHeight) - i.f,
      scale: e.width / t.fitWidth / this.targetScale,
      originX: 0,
      originY: 0,
      ignoreBounds: !0,
    });
  }
  fitY() {
    this.stop("target");
    const { containerRect: e, contentRect: t, target: i } = this;
    this.applyChange({
      panX: 0.5 * e.width - (t.left + 0.5 * t.fitWidth) - i.e,
      panY: 0.5 * e.innerHeight - (t.top + 0.5 * t.fitHeight) - i.f,
      scale: e.height / t.fitHeight / this.targetScale,
      originX: 0,
      originY: 0,
      ignoreBounds: !0,
    });
  }
  toggleFS() {
    const { container: e } = this,
      t = this.cn("inFullscreen"),
      i = this.cn("htmlHasFullscreen");
    e.classList.toggle(t);
    const n = e.classList.contains(t);
    n
      ? (document.documentElement.classList.add(i),
        document.addEventListener("keydown", this.onKeydown, !0))
      : (document.documentElement.classList.remove(i),
        document.removeEventListener("keydown", this.onKeydown, !0)),
      this.updateMetrics(),
      this.emit(n ? "enterFS" : "exitFS");
  }
  getMatrix(e = this.current) {
    const { a: t, b: i, c: n, d: s, e: o, f: a } = e;
    return new DOMMatrix([t, i, n, s, o, a]);
  }
  reset(e) {
    if (this.state !== C.Init && this.state !== C.Destroy) {
      this.stop("current");
      for (const t of X) this.target[t] = ue[t];
      (this.target.a = this.minScale),
        (this.target.d = this.minScale),
        this.clampTargetBounds(),
        this.isResting ||
          ((this.friction = e === void 0 ? this.option("friction") : e),
          (this.state = C.Panning),
          this.requestTick());
    }
  }
  destroy() {
    this.stop(),
      (this.state = C.Destroy),
      this.detachEvents(),
      this.detachObserver();
    const { container: e, content: t } = this,
      i = this.option("classes") || {};
    for (const n of Object.values(i)) e.classList.remove(n + "");
    t &&
      (t.removeEventListener("load", this.onLoad),
      t.removeEventListener("error", this.onError)),
      this.detachPlugins();
  }
}
Object.defineProperty(te, "defaults", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: Jt,
}),
  Object.defineProperty(te, "Plugins", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: {},
  });
const nt = function (r, e) {
    let t = !0;
    return (...i) => {
      t &&
        ((t = !1),
        r(...i),
        setTimeout(() => {
          t = !0;
        }, e));
    };
  },
  st = (r, e) => {
    let t = [];
    return (
      r.childNodes.forEach((i) => {
        i.nodeType !== Node.ELEMENT_NODE || (e && !i.matches(e)) || t.push(i);
      }),
      t
    );
  },
  ei = {
    viewport: null,
    track: null,
    enabled: !0,
    slides: [],
    axis: "x",
    transition: "fade",
    preload: 1,
    slidesPerPage: "auto",
    initialPage: 0,
    friction: 0.12,
    Panzoom: {
      decelFriction: 0.12,
    },
    center: !0,
    infinite: !0,
    fill: !0,
    dragFree: !1,
    adaptiveHeight: !1,
    direction: "ltr",
    classes: {
      container: "f-carousel",
      viewport: "f-carousel__viewport",
      track: "f-carousel__track",
      slide: "f-carousel__slide",
      isLTR: "is-ltr",
      isRTL: "is-rtl",
      isHorizontal: "is-horizontal",
      isVertical: "is-vertical",
      inTransition: "in-transition",
      isSelected: "is-selected",
    },
    l10n: {
      NEXT: "Next slide",
      PREV: "Previous slide",
      GOTO: "Go to slide #%d",
    },
  };
var M;
(function (r) {
  (r[(r.Init = 0)] = "Init"),
    (r[(r.Ready = 1)] = "Ready"),
    (r[(r.Destroy = 2)] = "Destroy");
})(M || (M = {}));
const Le = (r) => {
    if (typeof r == "string" || r instanceof HTMLElement)
      r = {
        html: r,
      };
    else {
      const e = r.thumb;
      e !== void 0 &&
        (typeof e == "string" && (r.thumbSrc = e),
        e instanceof HTMLImageElement &&
          ((r.thumbEl = e), (r.thumbElSrc = e.src), (r.thumbSrc = e.src)),
        delete r.thumb);
    }
    return Object.assign(
      {
        html: "",
        el: null,
        isDom: !1,
        class: "",
        customClass: "",
        index: -1,
        dim: 0,
        gap: 0,
        pos: 0,
        transition: !1,
      },
      r
    );
  },
  ti = (r = {}) =>
    Object.assign(
      {
        index: -1,
        slides: [],
        dim: 0,
        pos: -1,
      },
      r
    );
class N extends Ce {
  constructor(e, t) {
    super(t),
      Object.defineProperty(this, "instance", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: e,
      });
  }
  attach() {}
  detach() {}
}
const ii = {
  classes: {
    list: "f-carousel__dots",
    isDynamic: "is-dynamic",
    hasDots: "has-dots",
    dot: "f-carousel__dot",
    isBeforePrev: "is-before-prev",
    isPrev: "is-prev",
    isCurrent: "is-current",
    isNext: "is-next",
    isAfterNext: "is-after-next",
  },
  dotTpl:
    '<button type="button" data-carousel-page="%i" aria-label="{{GOTO}}"><span class="f-carousel__dot" aria-hidden="true"></span></button>',
  dynamicFrom: 11,
  maxCount: 1 / 0,
  minCount: 2,
};
class Ot extends N {
  constructor() {
    super(...arguments),
      Object.defineProperty(this, "isDynamic", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1,
      }),
      Object.defineProperty(this, "list", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      });
  }
  onRefresh() {
    this.refresh();
  }
  build() {
    let e = this.list;
    if (!e) {
      (e = document.createElement("ul")),
        w(e, this.cn("list")),
        e.setAttribute("role", "tablist");
      const t = this.instance.container;
      t.appendChild(e), w(t, this.cn("hasDots")), (this.list = e);
    }
    return e;
  }
  refresh() {
    var e;
    const t = this.instance.pages.length,
      i = Math.min(2, this.option("minCount")),
      n = Math.max(2e3, this.option("maxCount")),
      s = this.option("dynamicFrom");
    if (t < i || t > n) return void this.cleanup();
    const o = typeof s == "number" && t > 5 && t >= s,
      a = !this.list || this.isDynamic !== o || this.list.children.length !== t;
    a && this.cleanup();
    const l = this.build();
    if ((W(l, this.cn("isDynamic"), !!o), a))
      for (let u = 0; u < t; u++) l.append(this.createItem(u));
    let c,
      h = 0;
    for (const u of [...l.children]) {
      const p = h === this.instance.page;
      p && (c = u),
        W(u, this.cn("isCurrent"), p),
        (e = u.children[0]) === null ||
          e === void 0 ||
          e.setAttribute("aria-selected", p ? "true" : "false");
      for (const d of ["isBeforePrev", "isPrev", "isNext", "isAfterNext"])
        P(u, this.cn(d));
      h++;
    }
    if (((c = c || l.firstChild), o && c)) {
      const u = c.previousElementSibling,
        p = u && u.previousElementSibling;
      w(u, this.cn("isPrev")), w(p, this.cn("isBeforePrev"));
      const d = c.nextElementSibling,
        f = d && d.nextElementSibling;
      w(d, this.cn("isNext")), w(f, this.cn("isAfterNext"));
    }
    this.isDynamic = o;
  }
  createItem(e = 0) {
    var t;
    const i = document.createElement("li");
    i.setAttribute("role", "presentation");
    const n = _(
      this.instance
        .localize(this.option("dotTpl"), [["%d", e + 1]])
        .replace(/\%i/g, e + "")
    );
    return (
      i.appendChild(n),
      (t = i.children[0]) === null ||
        t === void 0 ||
        t.setAttribute("role", "tab"),
      i
    );
  }
  cleanup() {
    this.list && (this.list.remove(), (this.list = null)),
      (this.isDynamic = !1),
      P(this.instance.container, this.cn("hasDots"));
  }
  attach() {
    this.instance.on(["refresh", "change"], this.onRefresh);
  }
  detach() {
    this.instance.off(["refresh", "change"], this.onRefresh), this.cleanup();
  }
}
Object.defineProperty(Ot, "defaults", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: ii,
});
const fe = "disabled",
  ge = "next",
  ot = "prev";
class At extends N {
  constructor() {
    super(...arguments),
      Object.defineProperty(this, "container", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "prev", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "next", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "isDom", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1,
      });
  }
  onRefresh() {
    const e = this.instance,
      t = e.pages.length,
      i = e.page;
    if (t < 2) return void this.cleanup();
    this.build();
    let n = this.prev,
      s = this.next;
    n &&
      s &&
      (n.removeAttribute(fe),
      s.removeAttribute(fe),
      e.isInfinite ||
        (i <= 0 && n.setAttribute(fe, ""),
        i >= t - 1 && s.setAttribute(fe, "")));
  }
  addBtn(e) {
    var t;
    const i = this.instance,
      n = document.createElement("button");
    n.setAttribute("tabindex", "0"),
      n.setAttribute("title", i.localize(`{{${e.toUpperCase()}}}`)),
      w(n, this.cn("button") + " " + this.cn(e === ge ? "isNext" : "isPrev"));
    const s = i.isRTL ? (e === ge ? ot : ge) : e;
    var o;
    return (
      (n.innerHTML = i.localize(this.option(`${s}Tpl`))),
      (n.dataset[
        `carousel${
          ((o = e),
          o
            ? o.match("^[a-z]")
              ? o.charAt(0).toUpperCase() + o.substring(1)
              : o
            : "")
        }`
      ] = "true"),
      (t = this.container) === null || t === void 0 || t.appendChild(n),
      n
    );
  }
  build() {
    const e = this.instance.container,
      t = this.cn("container");
    let { container: i, prev: n, next: s } = this;
    i || ((i = e.querySelector("." + t)), (this.isDom = !!i)),
      i || ((i = document.createElement("div")), w(i, t), e.appendChild(i)),
      (this.container = i),
      s || (s = i.querySelector("[data-carousel-next]")),
      s || (s = this.addBtn(ge)),
      (this.next = s),
      n || (n = i.querySelector("[data-carousel-prev]")),
      n || (n = this.addBtn(ot)),
      (this.prev = n);
  }
  cleanup() {
    this.isDom ||
      (this.prev && this.prev.remove(),
      this.next && this.next.remove(),
      this.container && this.container.remove()),
      (this.prev = null),
      (this.next = null),
      (this.container = null),
      (this.isDom = !1);
  }
  attach() {
    this.instance.on(["refresh", "change"], this.onRefresh);
  }
  detach() {
    this.instance.off(["refresh", "change"], this.onRefresh), this.cleanup();
  }
}
Object.defineProperty(At, "defaults", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: {
    classes: {
      container: "f-carousel__nav",
      button: "f-button",
      isNext: "is-next",
      isPrev: "is-prev",
    },
    nextTpl:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M9 3l9 9-9 9"/></svg>',
    prevTpl:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M15 3l-9 9 9 9"/></svg>',
  },
});
class Lt extends N {
  constructor() {
    super(...arguments),
      Object.defineProperty(this, "selectedIndex", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "target", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "nav", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      });
  }
  addAsTargetFor(e) {
    (this.target = this.instance), (this.nav = e), this.attachEvents();
  }
  addAsNavFor(e) {
    (this.nav = this.instance), (this.target = e), this.attachEvents();
  }
  attachEvents() {
    const { nav: e, target: t } = this;
    e &&
      t &&
      ((e.options.initialSlide = t.options.initialPage),
      e.state === M.Ready ? this.onNavReady(e) : e.on("ready", this.onNavReady),
      t.state === M.Ready
        ? this.onTargetReady(t)
        : t.on("ready", this.onTargetReady));
  }
  onNavReady(e) {
    e.on("createSlide", this.onNavCreateSlide),
      e.on("Panzoom.click", this.onNavClick),
      e.on("Panzoom.touchEnd", this.onNavTouch),
      this.onTargetChange();
  }
  onTargetReady(e) {
    e.on("change", this.onTargetChange),
      e.on("Panzoom.refresh", this.onTargetChange),
      this.onTargetChange();
  }
  onNavClick(e, t, i) {
    this.onNavTouch(e, e.panzoom, i);
  }
  onNavTouch(e, t, i) {
    var n, s;
    if (Math.abs(t.dragOffset.x) > 3 || Math.abs(t.dragOffset.y) > 3) return;
    const o = i.target,
      { nav: a, target: l } = this;
    if (!a || !l || !o) return;
    const c = o.closest("[data-index]");
    if ((i.stopPropagation(), i.preventDefault(), !c)) return;
    const h = parseInt(c.dataset.index || "", 10) || 0,
      u = l.getPageForSlide(h),
      p = a.getPageForSlide(h);
    a.slideTo(p),
      l.slideTo(u, {
        friction:
          ((s =
            (n = this.nav) === null || n === void 0 ? void 0 : n.plugins) ===
            null || s === void 0
            ? void 0
            : s.Sync.option("friction")) || 0,
      }),
      this.markSelectedSlide(h);
  }
  onNavCreateSlide(e, t) {
    t.index === this.selectedIndex && this.markSelectedSlide(t.index);
  }
  onTargetChange() {
    var e, t;
    const { target: i, nav: n } = this;
    if (!i || !n || n.state !== M.Ready || i.state !== M.Ready) return;
    const s =
        (t =
          (e = i.pages[i.page]) === null || e === void 0
            ? void 0
            : e.slides[0]) === null || t === void 0
          ? void 0
          : t.index,
      o = n.getPageForSlide(s);
    this.markSelectedSlide(s),
      n.slideTo(
        o,
        n.prevPage === null && i.prevPage === null
          ? {
              friction: 0,
            }
          : void 0
      );
  }
  markSelectedSlide(e) {
    const t = this.nav;
    t &&
      t.state === M.Ready &&
      ((this.selectedIndex = e),
      [...t.slides].map((i) => {
        i.el &&
          i.el.classList[i.index === e ? "add" : "remove"]("is-nav-selected");
      }));
  }
  attach() {
    const e = this;
    let t = e.options.target,
      i = e.options.nav;
    t ? e.addAsNavFor(t) : i && e.addAsTargetFor(i);
  }
  detach() {
    const e = this,
      t = e.nav,
      i = e.target;
    t &&
      (t.off("ready", e.onNavReady),
      t.off("createSlide", e.onNavCreateSlide),
      t.off("Panzoom.click", e.onNavClick),
      t.off("Panzoom.touchEnd", e.onNavTouch)),
      (e.nav = null),
      i &&
        (i.off("ready", e.onTargetReady),
        i.off("refresh", e.onTargetChange),
        i.off("change", e.onTargetChange)),
      (e.target = null);
  }
}
Object.defineProperty(Lt, "defaults", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: {
    friction: 0.35,
  },
});
const ni = {
    Navigation: At,
    Dots: Ot,
    Sync: Lt,
  },
  me = "animationend",
  at = "isSelected",
  ve = "slide";
class ee extends Ve {
  get axis() {
    return this.isHorizontal ? "e" : "f";
  }
  get isEnabled() {
    return this.state === M.Ready;
  }
  get isInfinite() {
    let e = !1;
    const { contentDim: t, viewportDim: i, pages: n, slides: s } = this,
      o = s[0];
    return (
      n.length >= 2 && o && t + o.dim >= i && (e = this.option("infinite")), e
    );
  }
  get isRTL() {
    return this.option("direction") === "rtl";
  }
  get isHorizontal() {
    return this.option("axis") === "x";
  }
  constructor(e, t = {}, i = {}) {
    if (
      (super(),
      Object.defineProperty(this, "bp", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "",
      }),
      Object.defineProperty(this, "lp", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0,
      }),
      Object.defineProperty(this, "userOptions", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {},
      }),
      Object.defineProperty(this, "userPlugins", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {},
      }),
      Object.defineProperty(this, "state", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: M.Init,
      }),
      Object.defineProperty(this, "page", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0,
      }),
      Object.defineProperty(this, "prevPage", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "container", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "viewport", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "track", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "slides", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: [],
      }),
      Object.defineProperty(this, "pages", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: [],
      }),
      Object.defineProperty(this, "panzoom", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "inTransition", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: new Set(),
      }),
      Object.defineProperty(this, "contentDim", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0,
      }),
      Object.defineProperty(this, "viewportDim", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0,
      }),
      typeof e == "string" && (e = document.querySelector(e)),
      !e || !z(e))
    )
      throw new Error("No Element found");
    (this.container = e),
      (this.slideNext = nt(this.slideNext.bind(this), 150)),
      (this.slidePrev = nt(this.slidePrev.bind(this), 150)),
      (this.userOptions = t),
      (this.userPlugins = i),
      queueMicrotask(() => {
        this.processOptions();
      });
  }
  processOptions() {
    var e, t;
    const i = R({}, ee.defaults, this.userOptions);
    let n = "";
    const s = i.breakpoints;
    if (s && Xe(s))
      for (const [o, a] of Object.entries(s))
        window.matchMedia(o).matches && Xe(a) && ((n += o), R(i, a));
    (n === this.bp && this.state !== M.Init) ||
      ((this.bp = n),
      this.state === M.Ready &&
        (i.initialSlide =
          ((t =
            (e = this.pages[this.page]) === null || e === void 0
              ? void 0
              : e.slides[0]) === null || t === void 0
            ? void 0
            : t.index) || 0),
      this.state !== M.Init && this.destroy(),
      super.setOptions(i),
      this.option("enabled") === !1
        ? this.attachEvents()
        : setTimeout(() => {
            this.init();
          }, 0));
  }
  init() {
    (this.state = M.Init),
      this.emit("init"),
      this.attachPlugins(
        Object.assign(Object.assign({}, ee.Plugins), this.userPlugins)
      ),
      this.emit("attachPlugins"),
      this.initLayout(),
      this.initSlides(),
      this.updateMetrics(),
      this.setInitialPosition(),
      this.initPanzoom(),
      this.attachEvents(),
      (this.state = M.Ready),
      this.emit("ready");
  }
  initLayout() {
    const { container: e } = this,
      t = this.option("classes");
    w(e, this.cn("container")),
      W(e, t.isLTR, !this.isRTL),
      W(e, t.isRTL, this.isRTL),
      W(e, t.isVertical, !this.isHorizontal),
      W(e, t.isHorizontal, this.isHorizontal);
    let i = this.option("viewport") || e.querySelector(`.${t.viewport}`);
    i ||
      ((i = document.createElement("div")),
      w(i, t.viewport),
      i.append(...st(e, `.${t.slide}`)),
      e.prepend(i)),
      i.addEventListener("scroll", this.onScroll);
    let n = this.option("track") || e.querySelector(`.${t.track}`);
    n ||
      ((n = document.createElement("div")),
      w(n, t.track),
      n.append(...Array.from(i.childNodes))),
      n.setAttribute("aria-live", "polite"),
      i.contains(n) || i.prepend(n),
      (this.viewport = i),
      (this.track = n),
      this.emit("initLayout");
  }
  initSlides() {
    const { track: e } = this;
    if (!e) return;
    const t = [...this.slides],
      i = [];
    [...st(e, `.${this.cn(ve)}`)].forEach((n) => {
      if (z(n)) {
        const s = Le({
          el: n,
          isDom: !0,
          index: this.slides.length,
        });
        i.push(s);
      }
    });
    for (let n of [...(this.option("slides", []) || []), ...t]) i.push(Le(n));
    this.slides = i;
    for (let n = 0; n < this.slides.length; n++) this.slides[n].index = n;
    for (const n of i)
      this.emit("beforeInitSlide", n, n.index),
        this.emit("initSlide", n, n.index);
    this.emit("initSlides");
  }
  setInitialPage() {
    const e = this.option("initialSlide");
    this.page =
      typeof e == "number"
        ? this.getPageForSlide(e)
        : parseInt(this.option("initialPage", 0) + "", 10) || 0;
  }
  setInitialPosition() {
    const { track: e, pages: t, isHorizontal: i } = this;
    if (!e || !t.length) return;
    let n = this.page;
    t[n] || (this.page = n = 0);
    const s = (t[n].pos || 0) * (this.isRTL && i ? 1 : -1),
      o = i ? `${s}px` : "0",
      a = i ? "0" : `${s}px`;
    (e.style.transform = `translate3d(${o}, ${a}, 0) scale(1)`),
      this.option("adaptiveHeight") && this.setViewportHeight();
  }
  initPanzoom() {
    this.panzoom && (this.panzoom.destroy(), (this.panzoom = null));
    const e = this.option("Panzoom") || {};
    (this.panzoom = new te(
      this.viewport,
      R(
        {},
        {
          content: this.track,
          zoom: !1,
          panOnlyZoomed: !1,
          lockAxis: this.isHorizontal ? "x" : "y",
          infinite: this.isInfinite,
          click: !1,
          dblClick: !1,
          touch: (t) => !(this.pages.length < 2 && !t.options.infinite),
          bounds: () => this.getBounds(),
          maxVelocity: (t) =>
            Math.abs(t.target[this.axis] - t.current[this.axis]) <
            2 * this.viewportDim
              ? 100
              : 0,
        },
        e
      )
    )),
      this.panzoom.on("*", (t, i, ...n) => {
        this.emit(`Panzoom.${i}`, t, ...n);
      }),
      this.panzoom.on("decel", this.onDecel),
      this.panzoom.on("refresh", this.onRefresh),
      this.panzoom.on("beforeTransform", this.onBeforeTransform),
      this.panzoom.on("endAnimation", this.onEndAnimation);
  }
  attachEvents() {
    const e = this.container;
    e &&
      (e.addEventListener("click", this.onClick, {
        passive: !1,
        capture: !1,
      }),
      e.addEventListener("slideTo", this.onSlideTo)),
      window.addEventListener("resize", this.onResize);
  }
  createPages() {
    let e = [];
    const { contentDim: t, viewportDim: i } = this;
    let n = this.option("slidesPerPage");
    n =
      (n === "auto" || t <= i) && this.option("fill") !== !1
        ? 1 / 0
        : parseFloat(n + "");
    let s = 0,
      o = 0,
      a = 0;
    for (const l of this.slides)
      (!e.length || o + l.dim - i > 0.05 || a >= n) &&
        (e.push(ti()), (s = e.length - 1), (o = 0), (a = 0)),
        e[s].slides.push(l),
        (o += l.dim + l.gap),
        a++;
    return e;
  }
  processPages() {
    const e = this.pages,
      { contentDim: t, viewportDim: i, isInfinite: n } = this,
      s = this.option("center"),
      o = this.option("fill"),
      a = o && s && t > i && !n;
    if (
      (e.forEach((h, u) => {
        var p;
        (h.index = u),
          (h.pos =
            ((p = h.slides[0]) === null || p === void 0 ? void 0 : p.pos) || 0),
          (h.dim = 0);
        for (const [d, f] of h.slides.entries())
          (h.dim += f.dim), d < h.slides.length - 1 && (h.dim += f.gap);
        a && h.pos + 0.5 * h.dim < 0.5 * i
          ? (h.pos = 0)
          : a && h.pos + 0.5 * h.dim >= t - 0.5 * i
          ? (h.pos = t - i)
          : s && (h.pos += -0.5 * (i - h.dim));
      }),
      e.forEach((h) => {
        o &&
          !n &&
          t > i &&
          ((h.pos = Math.max(h.pos, 0)), (h.pos = Math.min(h.pos, t - i))),
          (h.pos = b(h.pos, 1e3)),
          (h.dim = b(h.dim, 1e3)),
          Math.abs(h.pos) <= 0.1 && (h.pos = 0);
      }),
      n)
    )
      return e;
    const l = [];
    let c;
    return (
      e.forEach((h) => {
        const u = Object.assign({}, h);
        c && u.pos === c.pos
          ? ((c.dim += u.dim), (c.slides = [...c.slides, ...u.slides]))
          : ((u.index = l.length), (c = u), l.push(u));
      }),
      l
    );
  }
  getPageFromIndex(e = 0) {
    const t = this.pages.length;
    let i;
    return (
      (e = parseInt((e || 0).toString()) || 0),
      (i = this.isInfinite
        ? ((e % t) + t) % t
        : Math.max(Math.min(e, t - 1), 0)),
      i
    );
  }
  getSlideMetrics(e) {
    var t, i;
    const n = this.isHorizontal ? "width" : "height";
    let s = 0,
      o = 0,
      a = e.el;
    const l = !(!a || a.parentNode);
    if (
      (a
        ? (s = parseFloat(a.dataset[n] || "") || 0)
        : ((a = document.createElement("div")),
          (a.style.visibility = "hidden"),
          (this.track || document.body).prepend(a)),
      w(a, this.cn(ve) + " " + e.class + " " + e.customClass),
      s)
    )
      (a.style[n] = `${s}px`),
        (a.style[n === "width" ? "height" : "width"] = "");
    else {
      l && (this.track || document.body).prepend(a),
        (s =
          a.getBoundingClientRect()[n] *
          Math.max(
            1,
            ((t = window.visualViewport) === null || t === void 0
              ? void 0
              : t.scale) || 1
          ));
      let h = a[this.isHorizontal ? "offsetWidth" : "offsetHeight"];
      h - 1 > s && (s = h);
    }
    const c = getComputedStyle(a);
    return (
      c.boxSizing === "content-box" &&
        (this.isHorizontal
          ? ((s += parseFloat(c.paddingLeft) || 0),
            (s += parseFloat(c.paddingRight) || 0))
          : ((s += parseFloat(c.paddingTop) || 0),
            (s += parseFloat(c.paddingBottom) || 0))),
      (o =
        parseFloat(c[this.isHorizontal ? "marginRight" : "marginBottom"]) || 0),
      l
        ? (i = a.parentElement) === null || i === void 0 || i.removeChild(a)
        : e.el || a.remove(),
      {
        dim: b(s, 1e3),
        gap: b(o, 1e3),
      }
    );
  }
  getBounds() {
    const { isInfinite: e, isRTL: t, isHorizontal: i, pages: n } = this;
    let s = {
      min: 0,
      max: 0,
    };
    if (e)
      s = {
        min: -1 / 0,
        max: 1 / 0,
      };
    else if (n.length) {
      const o = n[0].pos,
        a = n[n.length - 1].pos;
      s =
        t && i
          ? {
              min: o,
              max: a,
            }
          : {
              min: -1 * a,
              max: -1 * o,
            };
    }
    return {
      x: i
        ? s
        : {
            min: 0,
            max: 0,
          },
      y: i
        ? {
            min: 0,
            max: 0,
          }
        : s,
    };
  }
  repositionSlides() {
    let e,
      {
        isHorizontal: t,
        isRTL: i,
        isInfinite: n,
        viewport: s,
        viewportDim: o,
        contentDim: a,
        page: l,
        pages: c,
        slides: h,
        panzoom: u,
      } = this,
      p = 0,
      d = 0,
      f = 0,
      g = 0;
    u ? (g = -1 * u.current[this.axis]) : c[l] && (g = c[l].pos || 0),
      (e = t ? (i ? "right" : "left") : "top"),
      i && t && (g *= -1);
    for (const x of h) {
      const E = x.el;
      E
        ? (e === "top"
            ? ((E.style.right = ""), (E.style.left = ""))
            : (E.style.top = ""),
          x.index !== p
            ? (E.style[e] = d === 0 ? "" : `${b(d, 1e3)}px`)
            : (E.style[e] = ""),
          (f += x.dim + x.gap),
          p++)
        : (d += x.dim + x.gap);
    }
    if (n && f && s) {
      let x = getComputedStyle(s),
        E = "padding",
        j = t ? "Right" : "Bottom",
        B = parseFloat(x[E + (t ? "Left" : "Top")]);
      (g -= B), (o += B), (o += parseFloat(x[E + j]));
      for (const T of h)
        T.el &&
          (b(T.pos) < b(o) &&
            b(T.pos + T.dim + T.gap) < b(g) &&
            b(g) > b(a - o) &&
            (T.el.style[e] = `${b(d + f, 1e3)}px`),
          b(T.pos + T.gap) >= b(a - o) &&
            b(T.pos) > b(g + o) &&
            b(g) < b(o) &&
            (T.el.style[e] = `-${b(f, 1e3)}px`));
    }
    let m,
      v,
      y = [...this.inTransition];
    if ((y.length > 1 && ((m = c[y[0]]), (v = c[y[1]])), m && v)) {
      let x = 0;
      for (const E of h)
        E.el
          ? this.inTransition.has(E.index) &&
            m.slides.indexOf(E) < 0 &&
            (E.el.style[e] = `${b(x + (m.pos - v.pos), 1e3)}px`)
          : (x += E.dim + E.gap);
    }
  }
  createSlideEl(e) {
    const { track: t, slides: i } = this;
    if (!t || !e || (e.el && e.el.parentNode)) return;
    const n = e.el || document.createElement("div");
    w(n, this.cn(ve)), w(n, e.class), w(n, e.customClass);
    const s = e.html;
    s &&
      (s instanceof HTMLElement
        ? n.appendChild(s)
        : (n.innerHTML = e.html + ""));
    const o = [];
    i.forEach((h, u) => {
      h.el && o.push(u);
    });
    const a = e.index;
    let l = null;
    o.length &&
      (l = i[o.reduce((h, u) => (Math.abs(u - a) < Math.abs(h - a) ? u : h))]);
    const c =
      l && l.el && l.el.parentNode
        ? l.index < e.index
          ? l.el.nextSibling
          : l.el
        : null;
    t.insertBefore(n, t.contains(c) ? c : null),
      (e.el = n),
      this.emit("createSlide", e);
  }
  removeSlideEl(e, t = !1) {
    const i = e?.el;
    if (!i || !i.parentNode) return;
    const n = this.cn(at);
    if (
      (i.classList.contains(n) && (P(i, n), this.emit("unselectSlide", e)),
      e.isDom && !t)
    )
      return (
        i.removeAttribute("aria-hidden"),
        i.removeAttribute("data-index"),
        void (i.style.left = "")
      );
    this.emit("removeSlide", e);
    const s = new CustomEvent(me);
    i.dispatchEvent(s), e.el && (e.el.remove(), (e.el = null));
  }
  transitionTo(e = 0, t = this.option("transition")) {
    var i, n, s, o;
    if (!t) return !1;
    const a = this.page,
      { pages: l, panzoom: c } = this;
    e = parseInt((e || 0).toString()) || 0;
    const h = this.getPageFromIndex(e);
    if (
      !c ||
      !l[h] ||
      l.length < 2 ||
      Math.abs(
        (((n = (i = l[a]) === null || i === void 0 ? void 0 : i.slides[0]) ===
          null || n === void 0
          ? void 0
          : n.dim) || 0) - this.viewportDim
      ) > 1
    )
      return !1;
    let u = e > a ? 1 : -1;
    this.isInfinite &&
      (a === 0 && e === l.length - 1 && (u = -1),
      a === l.length - 1 && e === 0 && (u = 1));
    const p = l[h].pos * (this.isRTL ? 1 : -1);
    if (a === h && Math.abs(p - c.target[this.axis]) < 1) return !1;
    this.clearTransitions();
    const d = c.isResting;
    w(this.container, this.cn("inTransition"));
    const f =
        ((s = l[a]) === null || s === void 0 ? void 0 : s.slides[0]) || null,
      g = ((o = l[h]) === null || o === void 0 ? void 0 : o.slides[0]) || null;
    this.inTransition.add(g.index), this.createSlideEl(g);
    let m = f.el,
      v = g.el;
    d || t === ve || ((t = "fadeFast"), (m = null));
    const y = this.isRTL ? "next" : "prev",
      x = this.isRTL ? "prev" : "next";
    return (
      m &&
        (this.inTransition.add(f.index),
        (f.transition = t),
        m.addEventListener(me, this.onAnimationEnd),
        m.classList.add(`f-${t}Out`, `to-${u > 0 ? x : y}`)),
      v &&
        ((g.transition = t),
        v.addEventListener(me, this.onAnimationEnd),
        v.classList.add(`f-${t}In`, `from-${u > 0 ? y : x}`)),
      (c.current[this.axis] = p),
      (c.target[this.axis] = p),
      c.requestTick(),
      this.onChange(h),
      !0
    );
  }
  manageSlideVisiblity() {
    const e = new Set(),
      t = new Set(),
      i = this.getVisibleSlides(
        parseFloat(this.option("preload", 0) + "") || 0
      );
    for (const n of this.slides) i.has(n) ? e.add(n) : t.add(n);
    for (const n of this.inTransition) e.add(this.slides[n]);
    for (const n of e) this.createSlideEl(n), this.lazyLoadSlide(n);
    for (const n of t) e.has(n) || this.removeSlideEl(n);
    this.markSelectedSlides(), this.repositionSlides();
  }
  markSelectedSlides() {
    if (!this.pages[this.page] || !this.pages[this.page].slides) return;
    const e = "aria-hidden";
    let t = this.cn(at);
    if (t)
      for (const i of this.slides) {
        const n = i.el;
        n &&
          ((n.dataset.index = `${i.index}`),
          n.classList.contains("f-thumbs__slide")
            ? this.getVisibleSlides(0).has(i)
              ? n.removeAttribute(e)
              : n.setAttribute(e, "true")
            : this.pages[this.page].slides.includes(i)
            ? (n.classList.contains(t) ||
                (w(n, t), this.emit("selectSlide", i)),
              n.removeAttribute(e))
            : (n.classList.contains(t) &&
                (P(n, t), this.emit("unselectSlide", i)),
              n.setAttribute(e, "true")));
      }
  }
  flipInfiniteTrack() {
    const {
        axis: e,
        isHorizontal: t,
        isInfinite: i,
        isRTL: n,
        viewportDim: s,
        contentDim: o,
      } = this,
      a = this.panzoom;
    if (!a || !i) return;
    let l = a.current[e],
      c = a.target[e] - l,
      h = 0,
      u = 0.5 * s;
    n && t
      ? (l < -u && ((h = -1), (l += o)), l > o - u && ((h = 1), (l -= o)))
      : (l > u && ((h = 1), (l -= o)), l < -o + u && ((h = -1), (l += o))),
      h && ((a.current[e] = l), (a.target[e] = l + c));
  }
  lazyLoadImg(e, t) {
    const i = this,
      n = "f-fadeIn",
      s = "is-preloading";
    let o = !1,
      a = null;
    const l = () => {
      o ||
        ((o = !0),
        a && (a.remove(), (a = null)),
        P(t, s),
        t.complete &&
          (w(t, n),
          setTimeout(() => {
            P(t, n);
          }, 350)),
        this.option("adaptiveHeight") &&
          e.el &&
          this.pages[this.page].slides.indexOf(e) > -1 &&
          (i.updateMetrics(), i.setViewportHeight()),
        this.emit("load", e));
    };
    w(t, s),
      (t.src = t.dataset.lazySrcset || t.dataset.lazySrc || ""),
      delete t.dataset.lazySrc,
      delete t.dataset.lazySrcset,
      t.addEventListener("error", () => {
        l();
      }),
      t.addEventListener("load", () => {
        l();
      }),
      setTimeout(() => {
        const c = t.parentNode;
        c &&
          e.el &&
          (t.complete ? l() : o || ((a = _(Ze)), c.insertBefore(a, t)));
      }, 300);
  }
  lazyLoadSlide(e) {
    const t = e && e.el;
    if (!t) return;
    const i = new Set();
    let n = Array.from(
      t.querySelectorAll("[data-lazy-src],[data-lazy-srcset]")
    );
    t.dataset.lazySrc && n.push(t),
      n.map((s) => {
        s instanceof HTMLImageElement
          ? i.add(s)
          : s instanceof HTMLElement &&
            s.dataset.lazySrc &&
            ((s.style.backgroundImage = `url('${s.dataset.lazySrc}')`),
            delete s.dataset.lazySrc);
      });
    for (const s of i) this.lazyLoadImg(e, s);
  }
  onAnimationEnd(e) {
    var t;
    const i = e.target,
      n = i ? parseInt(i.dataset.index || "", 10) || 0 : -1,
      s = this.slides[n],
      o = e.animationName;
    if (!i || !s || !o) return;
    const a = !!this.inTransition.has(n) && s.transition;
    a &&
      o.substring(0, a.length + 2) === `f-${a}` &&
      this.inTransition.delete(n),
      this.inTransition.size || this.clearTransitions(),
      n === this.page &&
        !((t = this.panzoom) === null || t === void 0) &&
        t.isResting &&
        this.emit("settle");
  }
  onDecel(e, t = 0, i = 0, n = 0, s = 0) {
    if (this.option("dragFree")) return void this.setPageFromPosition();
    const { isRTL: o, isHorizontal: a, axis: l, pages: c } = this,
      h = c.length,
      u = Math.abs(Math.atan2(i, t) / (Math.PI / 180));
    let p = 0;
    if (((p = u > 45 && u < 135 ? (a ? 0 : i) : a ? t : 0), !h)) return;
    let d = this.page,
      f = o && a ? 1 : -1;
    const g = e.current[l] * f;
    let { pageIndex: m } = this.getPageFromPosition(g);
    Math.abs(p) > 5
      ? (c[d].dim <
          document.documentElement[
            "client" + (this.isHorizontal ? "Width" : "Height")
          ] -
            1 && (d = m),
        (d = o && a ? (p < 0 ? d - 1 : d + 1) : p < 0 ? d + 1 : d - 1))
      : (d = n === 0 && s === 0 ? d : m),
      this.slideTo(d, {
        transition: !1,
        friction: e.option("decelFriction"),
      });
  }
  onClick(e) {
    const t = e.target,
      i = t && z(t) ? t.dataset : null;
    let n, s;
    i &&
      (i.carouselPage !== void 0
        ? ((s = "slideTo"), (n = i.carouselPage))
        : i.carouselNext !== void 0
        ? (s = "slideNext")
        : i.carouselPrev !== void 0 && (s = "slidePrev")),
      s
        ? (e.preventDefault(),
          e.stopPropagation(),
          t && !t.hasAttribute("disabled") && this[s](n))
        : this.emit("click", e);
  }
  onSlideTo(e) {
    const t = e.detail || 0;
    this.slideTo(this.getPageForSlide(t), {
      friction: 0,
    });
  }
  onChange(e, t = 0) {
    const i = this.page;
    (this.prevPage = i),
      (this.page = e),
      this.option("adaptiveHeight") && this.setViewportHeight(),
      e !== i && (this.markSelectedSlides(), this.emit("change", e, i, t));
  }
  onRefresh() {
    let e = this.contentDim,
      t = this.viewportDim;
    this.updateMetrics(),
      (this.contentDim === e && this.viewportDim === t) ||
        this.slideTo(this.page, {
          friction: 0,
          transition: !1,
        });
  }
  onScroll() {
    var e;
    (e = this.viewport) === null || e === void 0 || e.scroll(0, 0);
  }
  onResize() {
    this.option("breakpoints") && this.processOptions();
  }
  onBeforeTransform(e) {
    this.lp !== e.current[this.axis] &&
      (this.flipInfiniteTrack(), this.manageSlideVisiblity()),
      (this.lp = e.current.e);
  }
  onEndAnimation() {
    this.inTransition.size || this.emit("settle");
  }
  reInit(e = null, t = null) {
    this.destroy(),
      (this.state = M.Init),
      (this.prevPage = null),
      (this.userOptions = e || this.userOptions),
      (this.userPlugins = t || this.userPlugins),
      this.processOptions();
  }
  slideTo(
    e = 0,
    {
      friction: t = this.option("friction"),
      transition: i = this.option("transition"),
    } = {}
  ) {
    if (this.state === M.Destroy) return;
    e = parseInt((e || 0).toString()) || 0;
    const n = this.getPageFromIndex(e),
      { axis: s, isHorizontal: o, isRTL: a, pages: l, panzoom: c } = this,
      h = l.length,
      u = a && o ? 1 : -1;
    if (!c || !h) return;
    if (this.page !== n) {
      const d = new Event("beforeChange", {
        bubbles: !0,
        cancelable: !0,
      });
      if ((this.emit("beforeChange", d, e), d.defaultPrevented)) return;
    }
    if (this.transitionTo(e, i)) return;
    let p = l[n].pos;
    if (this.isInfinite) {
      const d = this.contentDim,
        f = c.target[s] * u;
      h === 2
        ? (p += d * Math.floor(parseFloat(e + "") / 2))
        : (p = [p, p - d, p + d].reduce(function (g, m) {
            return Math.abs(m - f) < Math.abs(g - f) ? m : g;
          }));
    }
    (p *= u),
      Math.abs(c.target[s] - p) < 1 ||
        (c.panTo({
          x: o ? p : 0,
          y: o ? 0 : p,
          friction: t,
        }),
        this.onChange(n));
  }
  slideToClosest(e) {
    if (this.panzoom) {
      const { pageIndex: t } = this.getPageFromPosition();
      this.slideTo(t, e);
    }
  }
  slideNext() {
    this.slideTo(this.page + 1);
  }
  slidePrev() {
    this.slideTo(this.page - 1);
  }
  clearTransitions() {
    this.inTransition.clear(), P(this.container, this.cn("inTransition"));
    const e = ["to-prev", "to-next", "from-prev", "from-next"];
    for (const t of this.slides) {
      const i = t.el;
      if (i) {
        i.removeEventListener(me, this.onAnimationEnd),
          i.classList.remove(...e);
        const n = t.transition;
        n && i.classList.remove(`f-${n}Out`, `f-${n}In`);
      }
    }
    this.manageSlideVisiblity();
  }
  addSlide(e, t) {
    var i, n, s, o;
    const a = this.panzoom,
      l =
        ((i = this.pages[this.page]) === null || i === void 0
          ? void 0
          : i.pos) || 0,
      c =
        ((n = this.pages[this.page]) === null || n === void 0
          ? void 0
          : n.dim) || 0,
      h = this.contentDim < this.viewportDim;
    let u = Array.isArray(t) ? t : [t];
    const p = [];
    for (const d of u) p.push(Le(d));
    this.slides.splice(e, 0, ...p);
    for (let d = 0; d < this.slides.length; d++) this.slides[d].index = d;
    for (const d of p) this.emit("beforeInitSlide", d, d.index);
    if ((this.page >= e && (this.page += p.length), this.updateMetrics(), a)) {
      const d =
          ((s = this.pages[this.page]) === null || s === void 0
            ? void 0
            : s.pos) || 0,
        f =
          ((o = this.pages[this.page]) === null || o === void 0
            ? void 0
            : o.dim) || 0,
        g = this.pages.length || 1,
        m = this.isRTL ? c - f : f - c,
        v = this.isRTL ? l - d : d - l;
      h && g === 1
        ? (e <= this.page &&
            ((a.current[this.axis] -= m), (a.target[this.axis] -= m)),
          a.panTo({
            [this.isHorizontal ? "x" : "y"]: -1 * d,
          }))
        : v &&
          e <= this.page &&
          ((a.target[this.axis] -= v),
          (a.current[this.axis] -= v),
          a.requestTick());
    }
    for (const d of p) this.emit("initSlide", d, d.index);
  }
  prependSlide(e) {
    this.addSlide(0, e);
  }
  appendSlide(e) {
    this.addSlide(this.slides.length, e);
  }
  removeSlide(e) {
    const t = this.slides.length;
    e = ((e % t) + t) % t;
    const i = this.slides[e];
    if (i) {
      this.removeSlideEl(i, !0), this.slides.splice(e, 1);
      for (let n = 0; n < this.slides.length; n++) this.slides[n].index = n;
      this.updateMetrics(),
        this.slideTo(this.page, {
          friction: 0,
          transition: !1,
        }),
        this.emit("destroySlide", i);
    }
  }
  updateMetrics() {
    const {
      panzoom: e,
      viewport: t,
      track: i,
      slides: n,
      isHorizontal: s,
      isInfinite: o,
    } = this;
    if (!i) return;
    const a = s ? "width" : "height",
      l = s ? "offsetWidth" : "offsetHeight";
    if (t) {
      let u = Math.max(t[l], b(t.getBoundingClientRect()[a], 1e3)),
        p = getComputedStyle(t),
        d = "padding",
        f = s ? "Right" : "Bottom";
      (u -= parseFloat(p[d + (s ? "Left" : "Top")]) + parseFloat(p[d + f])),
        (this.viewportDim = u);
    }
    let c,
      h = 0;
    for (const [u, p] of n.entries()) {
      let d = 0,
        f = 0;
      !p.el && c
        ? ((d = c.dim), (f = c.gap))
        : (({ dim: d, gap: f } = this.getSlideMetrics(p)), (c = p)),
        (d = b(d, 1e3)),
        (f = b(f, 1e3)),
        (p.dim = d),
        (p.gap = f),
        (p.pos = h),
        (h += d),
        (o || u < n.length - 1) && (h += f);
    }
    (h = b(h, 1e3)),
      (this.contentDim = h),
      e &&
        ((e.contentRect[a] = h),
        (e.contentRect[s ? "fullWidth" : "fullHeight"] = h)),
      (this.pages = this.createPages()),
      (this.pages = this.processPages()),
      this.state === M.Init && this.setInitialPage(),
      (this.page = Math.max(0, Math.min(this.page, this.pages.length - 1))),
      this.manageSlideVisiblity(),
      this.emit("refresh");
  }
  getProgress(e, t = !1, i = !1) {
    e === void 0 && (e = this.page);
    const n = this,
      s = n.panzoom,
      o = n.contentDim,
      a = n.pages[e] || 0;
    if (!a || !s) return e > this.page ? -1 : 1;
    let l = -1 * s.current.e,
      c = b((l - a.pos) / (1 * a.dim), 1e3),
      h = c,
      u = c;
    this.isInfinite &&
      i !== !0 &&
      ((h = b((l - a.pos + o) / (1 * a.dim), 1e3)),
      (u = b((l - a.pos - o) / (1 * a.dim), 1e3)));
    let p = [c, h, u].reduce(function (d, f) {
      return Math.abs(f) < Math.abs(d) ? f : d;
    });
    return t ? p : p > 1 ? 1 : p < -1 ? -1 : p;
  }
  setViewportHeight() {
    const { page: e, pages: t, viewport: i, isHorizontal: n } = this;
    if (!i || !t[e]) return;
    let s = 0;
    n &&
      this.track &&
      ((this.track.style.height = "auto"),
      t[e].slides.forEach((o) => {
        o.el && (s = Math.max(s, o.el.offsetHeight));
      })),
      (i.style.height = s ? `${s}px` : "");
  }
  getPageForSlide(e) {
    for (const t of this.pages)
      for (const i of t.slides) if (i.index === e) return t.index;
    return -1;
  }
  getVisibleSlides(e = 0) {
    var t;
    const i = new Set();
    let { panzoom: n, contentDim: s, viewportDim: o, pages: a, page: l } = this;
    if (o) {
      s =
        s +
          ((t = this.slides[this.slides.length - 1]) === null || t === void 0
            ? void 0
            : t.gap) || 0;
      let c = 0;
      (c =
        n && n.state !== C.Init && n.state !== C.Destroy
          ? -1 * n.current[this.axis]
          : (a[l] && a[l].pos) || 0),
        this.isInfinite && (c -= Math.floor(c / s) * s),
        this.isRTL && this.isHorizontal && (c *= -1);
      const h = c - o * e,
        u = c + o * (e + 1),
        p = this.isInfinite ? [-1, 0, 1] : [0];
      for (const d of this.slides)
        for (const f of p) {
          const g = d.pos + f * s,
            m = g + d.dim + d.gap;
          g < u && m > h && i.add(d);
        }
    }
    return i;
  }
  getPageFromPosition(e) {
    const {
        viewportDim: t,
        contentDim: i,
        slides: n,
        pages: s,
        panzoom: o,
      } = this,
      a = s.length,
      l = n.length,
      c = n[0],
      h = n[l - 1],
      u = this.option("center");
    let p = 0,
      d = 0,
      f = 0,
      g = e === void 0 ? -1 * (o?.target[this.axis] || 0) : e;
    u && (g += 0.5 * t),
      this.isInfinite
        ? (g < c.pos - 0.5 * h.gap && ((g -= i), (f = -1)),
          g > h.pos + h.dim + 0.5 * h.gap && ((g -= i), (f = 1)))
        : (g = Math.max(c.pos || 0, Math.min(g, h.pos)));
    let m = h,
      v = n.find((y) => {
        const x = y.pos - 0.5 * m.gap,
          E = y.pos + y.dim + 0.5 * y.gap;
        return (m = y), g >= x && g < E;
      });
    return (
      v || (v = h),
      (d = this.getPageForSlide(v.index)),
      (p = d + f * a),
      {
        page: p,
        pageIndex: d,
      }
    );
  }
  setPageFromPosition() {
    const { pageIndex: e } = this.getPageFromPosition();
    this.onChange(e);
  }
  destroy() {
    if ([M.Destroy].includes(this.state)) return;
    this.state = M.Destroy;
    const { container: e, viewport: t, track: i, slides: n, panzoom: s } = this,
      o = this.option("classes");
    e.removeEventListener("click", this.onClick, {
      passive: !1,
      capture: !1,
    }),
      e.removeEventListener("slideTo", this.onSlideTo),
      window.removeEventListener("resize", this.onResize),
      s && (s.destroy(), (this.panzoom = null)),
      n &&
        n.forEach((l) => {
          this.removeSlideEl(l);
        }),
      this.detachPlugins(),
      t &&
        (t.removeEventListener("scroll", this.onScroll),
        t.offsetParent &&
          i &&
          i.offsetParent &&
          t.replaceWith(...i.childNodes));
    for (const [l, c] of Object.entries(o))
      l !== "container" && c && e.classList.remove(c);
    (this.track = null),
      (this.viewport = null),
      (this.page = 0),
      (this.slides = []);
    const a = this.events.get("ready");
    (this.events = new Map()), a && this.events.set("ready", a);
  }
}
Object.defineProperty(ee, "Panzoom", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: te,
}),
  Object.defineProperty(ee, "defaults", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: ei,
  }),
  Object.defineProperty(ee, "Plugins", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: ni,
  });
const zt = function (r) {
    if (!z(r)) return 0;
    const e = window.scrollY,
      t = window.innerHeight,
      i = e + t,
      n = r.getBoundingClientRect(),
      s = n.y + e,
      o = n.height,
      a = s + o;
    if (e > a || i < s) return 0;
    if ((e < s && i > a) || (s < e && a > i)) return 100;
    let l = o;
    s < e && (l -= e - s), a > i && (l -= a - i);
    const c = (l / t) * 100;
    return Math.round(c);
  },
  de = !(
    typeof window > "u" ||
    !window.document ||
    !window.document.createElement
  );
let ze;
const Re = [
    "a[href]",
    "area[href]",
    'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
    "select:not([disabled]):not([aria-hidden])",
    "textarea:not([disabled]):not([aria-hidden])",
    "button:not([disabled]):not([aria-hidden]):not(.fancybox-focus-guard)",
    "iframe",
    "object",
    "embed",
    "video",
    "audio",
    "[contenteditable]",
    '[tabindex]:not([tabindex^="-"]):not([disabled]):not([aria-hidden])',
  ].join(","),
  rt = (r) => {
    if (r && de) {
      ze === void 0 &&
        document.createElement("div").focus({
          get preventScroll() {
            return (ze = !0), !1;
          },
        });
      try {
        if (ze)
          r.focus({
            preventScroll: !0,
          });
        else {
          const e = window.scrollY || document.body.scrollTop,
            t = window.scrollX || document.body.scrollLeft;
          r.focus(),
            document.body.scrollTo({
              top: e,
              left: t,
              behavior: "auto",
            });
        }
      } catch {}
    }
  },
  Rt = () => {
    const r = document;
    let e,
      t = "",
      i = "",
      n = "";
    return (
      r.fullscreenEnabled
        ? ((t = "requestFullscreen"),
          (i = "exitFullscreen"),
          (n = "fullscreenElement"))
        : r.webkitFullscreenEnabled &&
          ((t = "webkitRequestFullscreen"),
          (i = "webkitExitFullscreen"),
          (n = "webkitFullscreenElement")),
      t &&
        (e = {
          request: function (s = r.documentElement) {
            return t === "webkitRequestFullscreen"
              ? s[t](Element.ALLOW_KEYBOARD_INPUT)
              : s[t]();
          },
          exit: function () {
            return r[n] && r[i]();
          },
          isFullscreen: function () {
            return r[n];
          },
        }),
      e
    );
  },
  qe = {
    animated: !0,
    autoFocus: !0,
    backdropClick: "close",
    Carousel: {
      classes: {
        container: "fancybox__carousel",
        viewport: "fancybox__viewport",
        track: "fancybox__track",
        slide: "fancybox__slide",
      },
    },
    closeButton: "auto",
    closeExisting: !1,
    commonCaption: !1,
    compact: () =>
      window.matchMedia("(max-width: 578px), (max-height: 578px)").matches,
    contentClick: "toggleZoom",
    contentDblClick: !1,
    defaultType: "image",
    defaultDisplay: "flex",
    dragToClose: !0,
    Fullscreen: {
      autoStart: !1,
    },
    groupAll: !1,
    groupAttr: "data-fancybox",
    hideClass: "f-fadeOut",
    hideScrollbar: !0,
    idle: 3500,
    keyboard: {
      Escape: "close",
      Delete: "close",
      Backspace: "close",
      PageUp: "next",
      PageDown: "prev",
      ArrowUp: "prev",
      ArrowDown: "next",
      ArrowRight: "next",
      ArrowLeft: "prev",
    },
    l10n: Object.assign(Object.assign({}, Mt), {
      CLOSE: "Close",
      NEXT: "Next",
      PREV: "Previous",
      MODAL: "You can close this modal content with the ESC key",
      ERROR: "Something Went Wrong, Please Try Again Later",
      IMAGE_ERROR: "Image Not Found",
      ELEMENT_NOT_FOUND: "HTML Element Not Found",
      AJAX_NOT_FOUND: "Error Loading AJAX : Not Found",
      AJAX_FORBIDDEN: "Error Loading AJAX : Forbidden",
      IFRAME_ERROR: "Error Loading Page",
      TOGGLE_ZOOM: "Toggle zoom level",
      TOGGLE_THUMBS: "Toggle thumbnails",
      TOGGLE_SLIDESHOW: "Toggle slideshow",
      TOGGLE_FULLSCREEN: "Toggle full-screen mode",
      DOWNLOAD: "Download",
    }),
    parentEl: null,
    placeFocusBack: !0,
    showClass: "f-zoomInUp",
    startIndex: 0,
    tpl: {
      closeButton:
        '<button data-fancybox-close class="f-button is-close-btn" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M20 20L4 4m16 0L4 20"/></svg></button>',
      main: `<div class="fancybox__container" role="dialog" aria-modal="true" aria-label="{{MODAL}}" tabindex="-1">
    <div class="fancybox__backdrop"></div>
    <div class="fancybox__carousel"></div>
    <div class="fancybox__footer"></div>
  </div>`,
    },
    trapFocus: !0,
    wheel: "zoom",
  };
var O, L;
(function (r) {
  (r[(r.Init = 0)] = "Init"),
    (r[(r.Ready = 1)] = "Ready"),
    (r[(r.Closing = 2)] = "Closing"),
    (r[(r.CustomClosing = 3)] = "CustomClosing"),
    (r[(r.Destroy = 4)] = "Destroy");
})(O || (O = {})),
  (function (r) {
    (r[(r.Loading = 0)] = "Loading"),
      (r[(r.Opening = 1)] = "Opening"),
      (r[(r.Ready = 2)] = "Ready"),
      (r[(r.Closing = 3)] = "Closing");
  })(L || (L = {}));
let lt = "",
  he = !1,
  be = !1,
  J = null;
const kt = () => {
    let r = "",
      e = "";
    const t = S.getInstance();
    if (t) {
      const i = t.carousel,
        n = t.getSlide();
      if (i && n) {
        let s = n.slug || void 0,
          o = n.triggerEl || void 0;
        (e = s || t.option("slug") || ""),
          !e && o && o.dataset && (e = o.dataset.fancybox || ""),
          e &&
            e !== "true" &&
            (r =
              "#" + e + (!s && i.slides.length > 1 ? "-" + (n.index + 1) : ""));
      }
    }
    return {
      hash: r,
      slug: e,
      index: 1,
    };
  },
  Te = () => {
    const r = new URL(document.URL).hash,
      e = r.slice(1).split("-"),
      t = e[e.length - 1],
      i = (t && /^\+?\d+$/.test(t) && parseInt(e.pop() || "1", 10)) || 1;
    return {
      hash: r,
      slug: e.join("-"),
      index: i,
    };
  },
  It = () => {
    const { slug: r, index: e } = Te();
    if (!r) return;
    let t = document.querySelector(`[data-slug="${r}"]`);
    if (
      (t &&
        t.dispatchEvent(
          new CustomEvent("click", {
            bubbles: !0,
            cancelable: !0,
          })
        ),
      S.getInstance())
    )
      return;
    const i = document.querySelectorAll(`[data-fancybox="${r}"]`);
    i.length &&
      ((t = i[e - 1]),
      t &&
        t.dispatchEvent(
          new CustomEvent("click", {
            bubbles: !0,
            cancelable: !0,
          })
        ));
  },
  Dt = () => {
    if (S.defaults.Hash === !1) return;
    const r = S.getInstance();
    if (r?.options.Hash === !1) return;
    const { slug: e, index: t } = Te(),
      { slug: i } = kt();
    r && (e === i ? r.jumpTo(t - 1) : ((he = !0), r.close())), It();
  },
  Ft = () => {
    J && clearTimeout(J),
      queueMicrotask(() => {
        Dt();
      });
  },
  ct = () => {
    window.addEventListener("hashchange", Ft, !1),
      setTimeout(() => {
        Dt();
      }, 500);
  };
de &&
  (/complete|interactive|loaded/.test(document.readyState)
    ? ct()
    : document.addEventListener("DOMContentLoaded", ct));
const ye = "is-zooming-in";
class jt extends N {
  onCreateSlide(e, t, i) {
    const n = this.instance.optionFor(i, "src") || "";
    i.el && i.type === "image" && typeof n == "string" && this.setImage(i, n);
  }
  onRemoveSlide(e, t, i) {
    i.panzoom && i.panzoom.destroy(),
      (i.panzoom = void 0),
      (i.imageEl = void 0);
  }
  onChange(e, t, i, n) {
    P(this.instance.container, ye);
    for (const s of t.slides) {
      const o = s.panzoom;
      o && s.index !== i && o.reset(0.35);
    }
  }
  onClose() {
    var e;
    const t = this.instance,
      i = t.container,
      n = t.getSlide();
    if (!i || !i.parentElement || !n) return;
    const { el: s, contentEl: o, panzoom: a, thumbElSrc: l } = n;
    if (
      !s ||
      !l ||
      !o ||
      !a ||
      a.isContentLoading ||
      a.state === C.Init ||
      a.state === C.Destroy
    )
      return;
    a.updateMetrics();
    let c = this.getZoomInfo(n);
    if (!c) return;
    (this.instance.state = O.CustomClosing),
      i.classList.remove(ye),
      i.classList.add("is-zooming-out"),
      (o.style.backgroundImage = `url('${l}')`);
    const h = i.getBoundingClientRect();
    (((e = window.visualViewport) === null || e === void 0
      ? void 0
      : e.scale) || 1) === 1 &&
      Object.assign(i.style, {
        position: "absolute",
        top: `${i.offsetTop + window.scrollY}px`,
        left: `${i.offsetLeft + window.scrollX}px`,
        bottom: "auto",
        right: "auto",
        width: `${h.width}px`,
        height: `${h.height}px`,
        overflow: "hidden",
      });
    const { x: u, y: p, scale: d, opacity: f } = c;
    if (f) {
      const g = ((m, v, y, x) => {
        const E = v - m,
          j = x - y;
        return (B) => y + (((B - m) / E) * j || 0);
      })(a.scale, d, 1, 0);
      a.on("afterTransform", () => {
        o.style.opacity = g(a.scale) + "";
      });
    }
    a.on("endAnimation", () => {
      t.destroy();
    }),
      (a.target.a = d),
      (a.target.b = 0),
      (a.target.c = 0),
      (a.target.d = d),
      a.panTo({
        x: u,
        y: p,
        scale: d,
        friction: f ? 0.2 : 0.33,
        ignoreBounds: !0,
      }),
      a.isResting && t.destroy();
  }
  setImage(e, t) {
    const i = this.instance;
    (e.src = t),
      this.process(e, t).then(
        (n) => {
          const { contentEl: s, imageEl: o, thumbElSrc: a, el: l } = e;
          if (i.isClosing() || !s || !o) return;
          s.offsetHeight;
          const c = !!i.isOpeningSlide(e) && this.getZoomInfo(e);
          if (this.option("protected") && l) {
            l.addEventListener("contextmenu", (p) => {
              p.preventDefault();
            });
            const u = document.createElement("div");
            w(u, "fancybox-protected"), s.appendChild(u);
          }
          if (a && c) {
            const u = n.contentRect,
              p = Math.max(u.fullWidth, u.fullHeight);
            let d = null;
            !c.opacity &&
              p > 1200 &&
              ((d = document.createElement("img")),
              w(d, "fancybox-ghost"),
              (d.src = a),
              s.appendChild(d));
            const f = () => {
              d &&
                (w(d, "f-fadeFastOut"),
                setTimeout(() => {
                  d && (d.remove(), (d = null));
                }, 200));
            };
            ((h = a),
            new Promise((g, m) => {
              const v = new Image();
              (v.onload = g), (v.onerror = m), (v.src = h);
            })).then(
              () => {
                i.hideLoading(e),
                  (e.state = L.Opening),
                  this.instance.emit("reveal", e),
                  this.zoomIn(e).then(
                    () => {
                      f(), this.instance.done(e);
                    },
                    () => {}
                  ),
                  d &&
                    setTimeout(
                      () => {
                        f();
                      },
                      p > 2500 ? 800 : 200
                    );
              },
              () => {
                i.hideLoading(e), i.revealContent(e);
              }
            );
          } else {
            const u = this.optionFor(e, "initialSize"),
              p = this.optionFor(e, "zoom"),
              d = {
                event: i.prevMouseMoveEvent || i.options.event,
                friction: p ? 0.12 : 0,
              };
            let f = i.optionFor(e, "showClass") || void 0,
              g = !0;
            i.isOpeningSlide(e) &&
              (u === "full"
                ? n.zoomToFull(d)
                : u === "cover"
                ? n.zoomToCover(d)
                : u === "max"
                ? n.zoomToMax(d)
                : (g = !1),
              n.stop("current")),
              g && f && (f = n.isDragging ? "f-fadeIn" : ""),
              i.hideLoading(e),
              i.revealContent(e, f);
          }
          var h;
        },
        () => {
          i.setError(e, "{{IMAGE_ERROR}}");
        }
      );
  }
  process(e, t) {
    return new Promise((i, n) => {
      var s;
      const o = this.instance,
        a = e.el;
      o.clearContent(e), o.showLoading(e);
      let l = this.optionFor(e, "content");
      if ((typeof l == "string" && (l = _(l)), !l || !z(l))) {
        if (
          ((l = document.createElement("img")), l instanceof HTMLImageElement)
        ) {
          let c = "",
            h = e.caption;
          (c =
            typeof h == "string" && h
              ? h.replace(/<[^>]+>/gi, "").substring(0, 1e3)
              : `Image ${e.index + 1} of ${
                  ((s = o.carousel) === null || s === void 0
                    ? void 0
                    : s.pages.length) || 1
                }`),
            (l.src = t || ""),
            (l.alt = c),
            (l.draggable = !1),
            e.srcset && l.setAttribute("srcset", e.srcset),
            this.instance.isOpeningSlide(e) && (l.fetchPriority = "high");
        }
        e.sizes && l.setAttribute("sizes", e.sizes);
      }
      w(l, "fancybox-image"),
        (e.imageEl = l),
        o.setContent(e, l, !1),
        (e.panzoom = new te(
          a,
          R(
            {
              transformParent: !0,
            },
            this.option("Panzoom") || {},
            {
              content: l,
              width: (c, h) => o.optionFor(e, "width", "auto", h) || "auto",
              height: (c, h) => o.optionFor(e, "height", "auto", h) || "auto",
              wheel: () => {
                const c = o.option("wheel");
                return (c === "zoom" || c == "pan") && c;
              },
              click: (c, h) => {
                var u, p;
                if (
                  o.isCompact ||
                  o.isClosing() ||
                  e.index !==
                    ((u = o.getSlide()) === null || u === void 0
                      ? void 0
                      : u.index)
                )
                  return !1;
                if (h) {
                  const f = h.composedPath()[0];
                  if (
                    [
                      "A",
                      "BUTTON",
                      "TEXTAREA",
                      "OPTION",
                      "INPUT",
                      "SELECT",
                      "VIDEO",
                    ].includes(f.nodeName)
                  )
                    return !1;
                }
                let d =
                  !h ||
                  (h.target &&
                    ((p = e.contentEl) === null || p === void 0
                      ? void 0
                      : p.contains(h.target)));
                return o.option(d ? "contentClick" : "backdropClick") || !1;
              },
              dblClick: () =>
                o.isCompact ? "toggleZoom" : o.option("contentDblClick") || !1,
              spinner: !1,
              panOnlyZoomed: !0,
              wheelLimit: 1 / 0,
              on: {
                ready: (c) => {
                  i(c);
                },
                error: () => {
                  n();
                },
                destroy: () => {
                  n();
                },
              },
            }
          )
        ));
    });
  }
  zoomIn(e) {
    return new Promise((t, i) => {
      const n = this.instance,
        s = n.container,
        { panzoom: o, contentEl: a, el: l } = e;
      o && o.updateMetrics();
      const c = this.getZoomInfo(e);
      if (!(c && l && a && o && s)) return void i();
      const { x: h, y: u, scale: p, opacity: d } = c,
        f = () => {
          e.state !== L.Closing &&
            (d &&
              (a.style.opacity =
                Math.max(Math.min(1, 1 - (1 - o.scale) / (1 - p)), 0) + ""),
            o.scale >= 1 && o.scale > o.targetScale - 0.1 && t(o));
        },
        g = (y) => {
          ((y.scale < 0.99 || y.scale > 1.01) && !y.isDragging) ||
            (P(s, ye),
            (a.style.opacity = ""),
            y.off("endAnimation", g),
            y.off("touchStart", g),
            y.off("afterTransform", f),
            t(y));
        };
      o.on("endAnimation", g),
        o.on("touchStart", g),
        o.on("afterTransform", f),
        o.on(["error", "destroy"], () => {
          i();
        }),
        o.panTo({
          x: h,
          y: u,
          scale: p,
          friction: 0,
          ignoreBounds: !0,
        }),
        o.stop("current");
      const m = {
          event:
            o.panMode === "mousemove"
              ? n.prevMouseMoveEvent || n.options.event
              : void 0,
        },
        v = this.optionFor(e, "initialSize");
      w(s, ye),
        n.hideLoading(e),
        v === "full"
          ? o.zoomToFull(m)
          : v === "cover"
          ? o.zoomToCover(m)
          : v === "max"
          ? o.zoomToMax(m)
          : o.reset(0.172);
    });
  }
  getZoomInfo(e) {
    const { el: t, imageEl: i, thumbEl: n, panzoom: s } = e,
      o = this.instance,
      a = o.container;
    if (
      !t ||
      !i ||
      !n ||
      !s ||
      zt(n) < 3 ||
      !this.optionFor(e, "zoom") ||
      !a ||
      o.state === O.Destroy ||
      getComputedStyle(a).getPropertyValue("--f-images-zoom") === "0"
    )
      return !1;
    const l = window.visualViewport || null;
    if ((l ? l.scale : 1) !== 1) return !1;
    let { top: c, left: h, width: u, height: p } = n.getBoundingClientRect(),
      { top: d, left: f, fitWidth: g, fitHeight: m } = s.contentRect;
    if (!(u && p && g && m)) return !1;
    const v = s.container.getBoundingClientRect();
    (f += v.left), (d += v.top);
    const y = -1 * (f + 0.5 * g - (h + 0.5 * u)),
      x = -1 * (d + 0.5 * m - (c + 0.5 * p)),
      E = u / g;
    let j = this.option("zoomOpacity") || !1;
    return (
      j === "auto" && (j = Math.abs(u / p - g / m) > 0.1),
      {
        x: y,
        y: x,
        scale: E,
        opacity: j,
      }
    );
  }
  attach() {
    const e = this,
      t = e.instance;
    t.on("Carousel.change", e.onChange),
      t.on("Carousel.createSlide", e.onCreateSlide),
      t.on("Carousel.removeSlide", e.onRemoveSlide),
      t.on("close", e.onClose);
  }
  detach() {
    const e = this,
      t = e.instance;
    t.off("Carousel.change", e.onChange),
      t.off("Carousel.createSlide", e.onCreateSlide),
      t.off("Carousel.removeSlide", e.onRemoveSlide),
      t.off("close", e.onClose);
  }
}
Object.defineProperty(jt, "defaults", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: {
    initialSize: "fit",
    Panzoom: {
      maxScale: 1,
    },
    protected: !1,
    zoom: !0,
    zoomOpacity: "auto",
  },
}),
  typeof SuppressedError == "function" && SuppressedError;
const ke = "html",
  ht = "image",
  Ie = "map",
  q = "youtube",
  U = "vimeo",
  le = "html5video",
  dt = (r, e = {}) => {
    const t = new URL(r),
      i = new URLSearchParams(t.search),
      n = new URLSearchParams();
    for (const [a, l] of [...i, ...Object.entries(e)]) {
      let c = l + "";
      if (a === "t") {
        let h = c.match(/((\d*)m)?(\d*)s?/);
        h &&
          n.set(
            "start",
            60 * parseInt(h[2] || "0") + parseInt(h[3] || "0") + ""
          );
      } else n.set(a, c);
    }
    let s = n + "",
      o = r.match(/#t=((.*)?\d+s)/);
    return o && (s += `#t=${o[1]}`), s;
  },
  si = {
    ajax: null,
    autoSize: !0,
    iframeAttr: {
      allow: "autoplay; fullscreen",
      scrolling: "auto",
    },
    preload: !0,
    videoAutoplay: !0,
    videoRatio: 16 / 9,
    videoTpl: `<video class="fancybox__html5video" playsinline controls controlsList="nodownload" poster="{{poster}}">
  <source src="{{src}}" type="{{format}}" />Sorry, your browser doesn't support embedded videos.</video>`,
    videoFormat: "",
    vimeo: {
      byline: 1,
      color: "00adef",
      controls: 1,
      dnt: 1,
      muted: 0,
    },
    youtube: {
      controls: 1,
      enablejsapi: 1,
      nocookie: 1,
      rel: 0,
      fs: 1,
    },
  },
  oi = [
    "image",
    "html",
    "ajax",
    "inline",
    "clone",
    "iframe",
    "map",
    "pdf",
    "html5video",
    "youtube",
    "vimeo",
  ];
class Bt extends N {
  onBeforeInitSlide(e, t, i) {
    this.processType(i);
  }
  onCreateSlide(e, t, i) {
    this.setContent(i);
  }
  onClearContent(e, t) {
    t.xhr && (t.xhr.abort(), (t.xhr = null));
    const i = t.iframeEl;
    i &&
      ((i.onload = i.onerror = null),
      (i.src = "//about:blank"),
      (t.iframeEl = null));
    const n = t.contentEl,
      s = t.placeholderEl;
    if (t.type === "inline" && n && s)
      n.classList.remove("fancybox__content"),
        getComputedStyle(n).getPropertyValue("display") !== "none" &&
          (n.style.display = "none"),
        setTimeout(() => {
          s &&
            (n && s.parentNode && s.parentNode.insertBefore(n, s), s.remove());
        }, 0),
        (t.contentEl = void 0),
        (t.placeholderEl = void 0);
    else for (; t.el && t.el.firstChild; ) t.el.removeChild(t.el.firstChild);
  }
  onSelectSlide(e, t, i) {
    i.state === L.Ready && this.playVideo();
  }
  onUnselectSlide(e, t, i) {
    var n, s;
    if (i.type === le) {
      try {
        (s =
          (n = i.el) === null || n === void 0
            ? void 0
            : n.querySelector("video")) === null ||
          s === void 0 ||
          s.pause();
      } catch {}
      return;
    }
    let o;
    i.type === U
      ? (o = {
          method: "pause",
          value: "true",
        })
      : i.type === q &&
        (o = {
          event: "command",
          func: "pauseVideo",
        }),
      o &&
        i.iframeEl &&
        i.iframeEl.contentWindow &&
        i.iframeEl.contentWindow.postMessage(JSON.stringify(o), "*"),
      i.poller && clearTimeout(i.poller);
  }
  onDone(e, t) {
    e.isCurrentSlide(t) && !e.isClosing() && this.playVideo();
  }
  onRefresh(e, t) {
    t.slides.forEach((i) => {
      i.el && (this.resizeIframe(i), this.setAspectRatio(i));
    });
  }
  onMessage(e) {
    try {
      let t = JSON.parse(e.data);
      if (e.origin === "https://player.vimeo.com") {
        if (t.event === "ready")
          for (let i of Array.from(
            document.getElementsByClassName("fancybox__iframe")
          ))
            i instanceof HTMLIFrameElement &&
              i.contentWindow === e.source &&
              (i.dataset.ready = "true");
      } else if (
        e.origin.match(/^https:\/\/(www.)?youtube(-nocookie)?.com$/) &&
        t.event === "onReady"
      ) {
        const i = document.getElementById(t.id);
        i && (i.dataset.ready = "true");
      }
    } catch {}
  }
  loadAjaxContent(e) {
    const t = this.instance.optionFor(e, "src") || "";
    this.instance.showLoading(e);
    const i = this.instance,
      n = new XMLHttpRequest();
    i.showLoading(e),
      (n.onreadystatechange = function () {
        n.readyState === XMLHttpRequest.DONE &&
          i.state === O.Ready &&
          (i.hideLoading(e),
          n.status === 200
            ? i.setContent(e, n.responseText)
            : i.setError(
                e,
                n.status === 404 ? "{{AJAX_NOT_FOUND}}" : "{{AJAX_FORBIDDEN}}"
              ));
      });
    const s = e.ajax || null;
    n.open(s ? "POST" : "GET", t + ""),
      n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
      n.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
      n.send(s),
      (e.xhr = n);
  }
  setInlineContent(e) {
    let t = null;
    if (z(e.src)) t = e.src;
    else if (typeof e.src == "string") {
      const i = e.src.split("#", 2).pop();
      t = i ? document.getElementById(i) : null;
    }
    if (t) {
      if (e.type === "clone" || t.closest(".fancybox__slide")) {
        t = t.cloneNode(!0);
        const i = t.dataset.animationName;
        i && (t.classList.remove(i), delete t.dataset.animationName);
        let n = t.getAttribute("id");
        (n = n ? `${n}--clone` : `clone-${this.instance.id}-${e.index}`),
          t.setAttribute("id", n);
      } else if (t.parentNode) {
        const i = document.createElement("div");
        i.classList.add("fancybox-placeholder"),
          t.parentNode.insertBefore(i, t),
          (e.placeholderEl = i);
      }
      this.instance.setContent(e, t);
    } else this.instance.setError(e, "{{ELEMENT_NOT_FOUND}}");
  }
  setIframeContent(e) {
    const { src: t, el: i } = e;
    if (!t || typeof t != "string" || !i) return;
    i.classList.add("is-loading");
    const n = this.instance,
      s = document.createElement("iframe");
    (s.className = "fancybox__iframe"),
      s.setAttribute("id", `fancybox__iframe_${n.id}_${e.index}`);
    for (const [a, l] of Object.entries(this.optionFor(e, "iframeAttr") || {}))
      s.setAttribute(a, l);
    (s.onerror = () => {
      n.setError(e, "{{IFRAME_ERROR}}");
    }),
      (e.iframeEl = s);
    const o = this.optionFor(e, "preload");
    if (e.type !== "iframe" || o === !1)
      return (
        s.setAttribute("src", e.src + ""),
        n.setContent(e, s, !1),
        this.resizeIframe(e),
        void n.revealContent(e)
      );
    n.showLoading(e),
      (s.onload = () => {
        if (!s.src.length) return;
        const a = s.dataset.ready !== "true";
        (s.dataset.ready = "true"),
          this.resizeIframe(e),
          a ? n.revealContent(e) : n.hideLoading(e);
      }),
      s.setAttribute("src", t),
      n.setContent(e, s, !1);
  }
  resizeIframe(e) {
    const { type: t, iframeEl: i } = e;
    if (t === q || t === U) return;
    const n = i?.parentElement;
    if (!i || !n) return;
    let s = e.autoSize;
    s === void 0 && (s = this.optionFor(e, "autoSize"));
    let o = e.width || 0,
      a = e.height || 0;
    o && a && (s = !1);
    const l = n && n.style;
    if (e.preload !== !1 && s !== !1 && l)
      try {
        const c = window.getComputedStyle(n),
          h = parseFloat(c.paddingLeft) + parseFloat(c.paddingRight),
          u = parseFloat(c.paddingTop) + parseFloat(c.paddingBottom),
          p = i.contentWindow;
        if (p) {
          const d = p.document,
            f = d.getElementsByTagName(ke)[0],
            g = d.body;
          (l.width = ""),
            (g.style.overflow = "hidden"),
            (o = o || f.scrollWidth + h),
            (l.width = `${o}px`),
            (g.style.overflow = ""),
            (l.flex = "0 0 auto"),
            (l.height = `${g.scrollHeight}px`),
            (a = f.scrollHeight + u);
        }
      } catch {}
    if (o || a) {
      const c = {
        flex: "0 1 auto",
        width: "",
        height: "",
      };
      o && o !== "auto" && (c.width = `${o}px`),
        a && a !== "auto" && (c.height = `${a}px`),
        Object.assign(l, c);
    }
  }
  playVideo() {
    const e = this.instance.getSlide();
    if (!e) return;
    const { el: t } = e;
    if (!t || !t.offsetParent || !this.optionFor(e, "videoAutoplay")) return;
    if (e.type === le)
      try {
        const n = t.querySelector("video");
        if (n) {
          const s = n.play();
          s !== void 0 &&
            s
              .then(() => {})
              .catch((o) => {
                (n.muted = !0), n.play();
              });
        }
      } catch {}
    if (e.type !== q && e.type !== U) return;
    const i = () => {
      if (e.iframeEl && e.iframeEl.contentWindow) {
        let n;
        if (e.iframeEl.dataset.ready === "true")
          return (
            (n =
              e.type === q
                ? {
                    event: "command",
                    func: "playVideo",
                  }
                : {
                    method: "play",
                    value: "true",
                  }),
            n && e.iframeEl.contentWindow.postMessage(JSON.stringify(n), "*"),
            void (e.poller = void 0)
          );
        e.type === q &&
          ((n = {
            event: "listening",
            id: e.iframeEl.getAttribute("id"),
          }),
          e.iframeEl.contentWindow.postMessage(JSON.stringify(n), "*"));
      }
      e.poller = setTimeout(i, 250);
    };
    i();
  }
  processType(e) {
    if (e.html) return (e.type = ke), (e.src = e.html), void (e.html = "");
    const t = this.instance.optionFor(e, "src", "");
    if (!t || typeof t != "string") return;
    let i = e.type,
      n = null;
    if (
      (n = t.match(
        /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(?:watch\?(?:.*&)?v=|v\/|u\/|shorts\/|embed\/?)?(videoseries\?list=(?:.*)|[\w-]{11}|\?listType=(?:.*)&list=(?:.*))(?:.*)/i
      ))
    ) {
      const s = this.optionFor(e, q),
        { nocookie: o } = s,
        a = (function (u, p) {
          var d = {};
          for (var f in u)
            Object.prototype.hasOwnProperty.call(u, f) &&
              p.indexOf(f) < 0 &&
              (d[f] = u[f]);
          if (u != null && typeof Object.getOwnPropertySymbols == "function") {
            var g = 0;
            for (f = Object.getOwnPropertySymbols(u); g < f.length; g++)
              p.indexOf(f[g]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(u, f[g]) &&
                (d[f[g]] = u[f[g]]);
          }
          return d;
        })(s, ["nocookie"]),
        l = `www.youtube${o ? "-nocookie" : ""}.com`,
        c = dt(t, a),
        h = encodeURIComponent(n[2]);
      (e.videoId = h),
        (e.src = `https://${l}/embed/${h}?${c}`),
        (e.thumbSrc =
          e.thumbSrc || `https://i.ytimg.com/vi/${h}/mqdefault.jpg`),
        (i = q);
    } else if (
      (n = t.match(/^.+vimeo.com\/(?:\/)?([\d]+)((\/|\?h=)([a-z0-9]+))?(.*)?/))
    ) {
      const s = dt(t, this.optionFor(e, U)),
        o = encodeURIComponent(n[1]),
        a = n[4] || "";
      (e.videoId = o),
        (e.src = `https://player.vimeo.com/video/${o}?${
          a ? `h=${a}${s ? "&" : ""}` : ""
        }${s}`),
        (i = U);
    }
    if (!i && e.triggerEl) {
      const s = e.triggerEl.dataset.type;
      oi.includes(s) && (i = s);
    }
    i ||
      (typeof t == "string" &&
        (t.charAt(0) === "#"
          ? (i = "inline")
          : (n = t.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i))
          ? ((i = le),
            (e.videoFormat =
              e.videoFormat || "video/" + (n[1] === "ogv" ? "ogg" : n[1])))
          : t.match(
              /(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i
            )
          ? (i = ht)
          : t.match(/\.(pdf)((\?|#).*)?$/i) && (i = "pdf"))),
      (n = t.match(
        /(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:(?:(?:maps\/(?:place\/(?:.*)\/)?\@(.*),(\d+.?\d+?)z))|(?:\?ll=))(.*)?/i
      ))
        ? ((e.src = `https://maps.google.${n[1]}/?ll=${(n[2]
            ? n[2] +
              "&z=" +
              Math.floor(parseFloat(n[3])) +
              (n[4] ? n[4].replace(/^\//, "&") : "")
            : n[4] + ""
          ).replace(/\?/, "&")}&output=${
            n[4] && n[4].indexOf("layer=c") > 0 ? "svembed" : "embed"
          }`),
          (i = Ie))
        : (n = t.match(
            /(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:maps\/search\/)(.*)/i
          )) &&
          ((e.src = `https://maps.google.${n[1]}/maps?q=${n[2]
            .replace("query=", "q=")
            .replace("api=1", "")}&output=embed`),
          (i = Ie)),
      (i = i || this.instance.option("defaultType")),
      (e.type = i),
      i === ht && (e.thumbSrc = e.thumbSrc || e.src);
  }
  setContent(e) {
    const t = this.instance.optionFor(e, "src") || "";
    if (e && e.type && t) {
      switch (e.type) {
        case ke:
          this.instance.setContent(e, t);
          break;
        case le:
          const i = this.option("videoTpl");
          i &&
            this.instance.setContent(
              e,
              i
                .replace(/\{\{src\}\}/gi, t + "")
                .replace(
                  /\{\{format\}\}/gi,
                  this.optionFor(e, "videoFormat") || ""
                )
                .replace(/\{\{poster\}\}/gi, e.poster || e.thumbSrc || "")
            );
          break;
        case "inline":
        case "clone":
          this.setInlineContent(e);
          break;
        case "ajax":
          this.loadAjaxContent(e);
          break;
        case "pdf":
        case Ie:
        case q:
        case U:
          e.preload = !1;
        case "iframe":
          this.setIframeContent(e);
      }
      this.setAspectRatio(e);
    }
  }
  setAspectRatio(e) {
    const t = e.contentEl;
    if (!(e.el && t && e.type && [q, U, le].includes(e.type))) return;
    let i,
      n = e.width || "auto",
      s = e.height || "auto";
    if (n === "auto" || s === "auto") {
      i = this.optionFor(e, "videoRatio");
      const c = (i + "").match(/(\d+)\s*\/\s?(\d+)/);
      i =
        c && c.length > 2
          ? parseFloat(c[1]) / parseFloat(c[2])
          : parseFloat(i + "");
    } else n && s && (i = n / s);
    if (!i) return;
    (t.style.aspectRatio = ""),
      (t.style.width = ""),
      (t.style.height = ""),
      t.offsetHeight;
    const o = t.getBoundingClientRect(),
      a = o.width || 1,
      l = o.height || 1;
    (t.style.aspectRatio = i + ""),
      i < a / l
        ? ((s = s === "auto" ? l : Math.min(l, s)),
          (t.style.width = "auto"),
          (t.style.height = `${s}px`))
        : ((n = n === "auto" ? a : Math.min(a, n)),
          (t.style.width = `${n}px`),
          (t.style.height = "auto"));
  }
  attach() {
    const e = this,
      t = e.instance;
    t.on("Carousel.beforeInitSlide", e.onBeforeInitSlide),
      t.on("Carousel.createSlide", e.onCreateSlide),
      t.on("Carousel.selectSlide", e.onSelectSlide),
      t.on("Carousel.unselectSlide", e.onUnselectSlide),
      t.on("Carousel.Panzoom.refresh", e.onRefresh),
      t.on("done", e.onDone),
      t.on("clearContent", e.onClearContent),
      window.addEventListener("message", e.onMessage);
  }
  detach() {
    const e = this,
      t = e.instance;
    t.off("Carousel.beforeInitSlide", e.onBeforeInitSlide),
      t.off("Carousel.createSlide", e.onCreateSlide),
      t.off("Carousel.selectSlide", e.onSelectSlide),
      t.off("Carousel.unselectSlide", e.onUnselectSlide),
      t.off("Carousel.Panzoom.refresh", e.onRefresh),
      t.off("done", e.onDone),
      t.off("clearContent", e.onClearContent),
      window.removeEventListener("message", e.onMessage);
  }
}
Object.defineProperty(Bt, "defaults", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: si,
});
const we = "play",
  xe = "pause",
  ce = "ready";
class Ht extends N {
  constructor() {
    super(...arguments),
      Object.defineProperty(this, "state", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: ce,
      }),
      Object.defineProperty(this, "inHover", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1,
      }),
      Object.defineProperty(this, "timer", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "progressBar", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      });
  }
  get isActive() {
    return this.state !== ce;
  }
  onReady(e) {
    this.option("autoStart") &&
      (e.isInfinite || e.page < e.pages.length - 1) &&
      this.start();
  }
  onChange() {
    this.removeProgressBar(), this.pause();
  }
  onSettle() {
    this.resume();
  }
  onVisibilityChange() {
    document.visibilityState === "visible" ? this.resume() : this.pause();
  }
  onMouseEnter() {
    (this.inHover = !0), this.pause();
  }
  onMouseLeave() {
    var e;
    (this.inHover = !1),
      !((e = this.instance.panzoom) === null || e === void 0) &&
        e.isResting &&
        this.resume();
  }
  onTimerEnd() {
    const e = this.instance;
    this.state === "play" &&
      (e.isInfinite || e.page !== e.pages.length - 1
        ? e.slideNext()
        : e.slideTo(0));
  }
  removeProgressBar() {
    this.progressBar && (this.progressBar.remove(), (this.progressBar = null));
  }
  createProgressBar() {
    var e;
    if (!this.option("showProgress")) return null;
    this.removeProgressBar();
    const t = this.instance,
      i =
        ((e = t.pages[t.page]) === null || e === void 0 ? void 0 : e.slides) ||
        [];
    let n = this.option("progressParentEl");
    if ((n || (n = (i.length === 1 ? i[0].el : null) || t.viewport), !n))
      return null;
    const s = document.createElement("div");
    return (
      w(s, "f-progress"),
      n.prepend(s),
      (this.progressBar = s),
      s.offsetHeight,
      s
    );
  }
  set() {
    const e = this,
      t = e.instance;
    if (t.pages.length < 2 || e.timer) return;
    const i = e.option("timeout");
    (e.state = we), w(t.container, "has-autoplay");
    let n = e.createProgressBar();
    n &&
      ((n.style.transitionDuration = `${i}ms`),
      (n.style.transform = "scaleX(1)")),
      (e.timer = setTimeout(() => {
        (e.timer = null), e.inHover || e.onTimerEnd();
      }, i)),
      e.emit("set");
  }
  clear() {
    const e = this;
    e.timer && (clearTimeout(e.timer), (e.timer = null)), e.removeProgressBar();
  }
  start() {
    const e = this;
    if ((e.set(), e.state !== ce)) {
      if (e.option("pauseOnHover")) {
        const t = e.instance.container;
        t.addEventListener("mouseenter", e.onMouseEnter, !1),
          t.addEventListener("mouseleave", e.onMouseLeave, !1);
      }
      document.addEventListener("visibilitychange", e.onVisibilityChange, !1),
        e.emit("start");
    }
  }
  stop() {
    const e = this,
      t = e.state,
      i = e.instance.container;
    e.clear(),
      (e.state = ce),
      i.removeEventListener("mouseenter", e.onMouseEnter, !1),
      i.removeEventListener("mouseleave", e.onMouseLeave, !1),
      document.removeEventListener(
        "visibilitychange",
        e.onVisibilityChange,
        !1
      ),
      P(i, "has-autoplay"),
      t !== ce && e.emit("stop");
  }
  pause() {
    const e = this;
    e.state === we && ((e.state = xe), e.clear(), e.emit(xe));
  }
  resume() {
    const e = this,
      t = e.instance;
    if (t.isInfinite || t.page !== t.pages.length - 1)
      if (e.state !== we) {
        if (e.state === xe && !e.inHover) {
          const i = new Event("resume", {
            bubbles: !0,
            cancelable: !0,
          });
          e.emit("resume", i), i.defaultPrevented || e.set();
        }
      } else e.set();
    else e.stop();
  }
  toggle() {
    this.state === we || this.state === xe ? this.stop() : this.start();
  }
  attach() {
    const e = this,
      t = e.instance;
    t.on("ready", e.onReady),
      t.on("Panzoom.startAnimation", e.onChange),
      t.on("Panzoom.endAnimation", e.onSettle),
      t.on("Panzoom.touchMove", e.onChange);
  }
  detach() {
    const e = this,
      t = e.instance;
    t.off("ready", e.onReady),
      t.off("Panzoom.startAnimation", e.onChange),
      t.off("Panzoom.endAnimation", e.onSettle),
      t.off("Panzoom.touchMove", e.onChange),
      e.stop();
  }
}
Object.defineProperty(Ht, "defaults", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: {
    autoStart: !0,
    pauseOnHover: !0,
    progressParentEl: null,
    showProgress: !0,
    timeout: 3e3,
  },
});
class Nt extends N {
  constructor() {
    super(...arguments),
      Object.defineProperty(this, "ref", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      });
  }
  onPrepare(e) {
    const t = e.carousel;
    if (!t) return;
    const i = e.container;
    i &&
      ((t.options.Autoplay = R(
        {
          autoStart: !1,
        },
        this.option("Autoplay") || {},
        {
          pauseOnHover: !1,
          timeout: this.option("timeout"),
          progressParentEl: () => this.option("progressParentEl") || null,
          on: {
            start: () => {
              e.emit("startSlideshow");
            },
            set: (n) => {
              var s;
              i.classList.add("has-slideshow"),
                ((s = e.getSlide()) === null || s === void 0
                  ? void 0
                  : s.state) !== L.Ready && n.pause();
            },
            stop: () => {
              i.classList.remove("has-slideshow"),
                e.isCompact || e.endIdle(),
                e.emit("endSlideshow");
            },
            resume: (n, s) => {
              var o, a, l;
              !s ||
                !s.cancelable ||
                (((o = e.getSlide()) === null || o === void 0
                  ? void 0
                  : o.state) === L.Ready &&
                  !(
                    (l =
                      (a = e.carousel) === null || a === void 0
                        ? void 0
                        : a.panzoom) === null || l === void 0
                  ) &&
                  l.isResting) ||
                s.preventDefault();
            },
          },
        }
      )),
      t.attachPlugins({
        Autoplay: Ht,
      }),
      (this.ref = t.plugins.Autoplay));
  }
  onReady(e) {
    const t = e.carousel,
      i = this.ref;
    i &&
      t &&
      this.option("playOnStart") &&
      (t.isInfinite || t.page < t.pages.length - 1) &&
      i.start();
  }
  onDone(e, t) {
    const i = this.ref,
      n = e.carousel;
    if (!i || !n) return;
    const s = t.panzoom;
    s &&
      s.on("startAnimation", () => {
        e.isCurrentSlide(t) && i.stop();
      }),
      e.isCurrentSlide(t) && i.resume();
  }
  onKeydown(e, t) {
    var i;
    const n = this.ref;
    n &&
      t === this.option("key") &&
      ((i = document.activeElement) === null || i === void 0
        ? void 0
        : i.nodeName) !== "BUTTON" &&
      n.toggle();
  }
  attach() {
    const e = this,
      t = e.instance;
    t.on("Carousel.init", e.onPrepare),
      t.on("Carousel.ready", e.onReady),
      t.on("done", e.onDone),
      t.on("keydown", e.onKeydown);
  }
  detach() {
    const e = this,
      t = e.instance;
    t.off("Carousel.init", e.onPrepare),
      t.off("Carousel.ready", e.onReady),
      t.off("done", e.onDone),
      t.off("keydown", e.onKeydown);
  }
}
Object.defineProperty(Nt, "defaults", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: {
    key: " ",
    playOnStart: !1,
    progressParentEl: (r) => {
      var e;
      return (
        ((e = r.instance.container) === null || e === void 0
          ? void 0
          : e.querySelector(
              ".fancybox__toolbar [data-fancybox-toggle-slideshow]"
            )) || r.instance.container
      );
    },
    timeout: 3e3,
  },
});
const $t = {
  classes: {
    container: "f-thumbs f-carousel__thumbs",
    viewport: "f-thumbs__viewport",
    track: "f-thumbs__track",
    slide: "f-thumbs__slide",
    isResting: "is-resting",
    isSelected: "is-selected",
    isLoading: "is-loading",
    hasThumbs: "has-thumbs",
  },
  minCount: 2,
  parentEl: null,
  thumbTpl:
    '<button class="f-thumbs__slide__button" tabindex="0" type="button" aria-label="{{GOTO}}" data-carousel-index="%i"><img class="f-thumbs__slide__img" data-lazy-src="{{%s}}" alt="" /></button>',
  type: "modern",
};
var Y;
(function (r) {
  (r[(r.Init = 0)] = "Init"),
    (r[(r.Ready = 1)] = "Ready"),
    (r[(r.Hidden = 2)] = "Hidden");
})(Y || (Y = {}));
const ut = "isResting",
  Ee = "thumbWidth",
  se = "thumbHeight",
  $ = "thumbClipWidth";
let _t = class extends N {
  constructor() {
    super(...arguments),
      Object.defineProperty(this, "type", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "modern",
      }),
      Object.defineProperty(this, "container", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "track", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "carousel", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "thumbWidth", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0,
      }),
      Object.defineProperty(this, "thumbClipWidth", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0,
      }),
      Object.defineProperty(this, "thumbHeight", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0,
      }),
      Object.defineProperty(this, "thumbGap", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0,
      }),
      Object.defineProperty(this, "thumbExtraGap", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0,
      }),
      Object.defineProperty(this, "state", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: Y.Init,
      });
  }
  get isModern() {
    return this.type === "modern";
  }
  onInitSlide(r, e) {
    const t = e.el ? e.el.dataset : void 0;
    t &&
      ((e.thumbSrc = t.thumbSrc || e.thumbSrc || ""),
      (e[$] = parseFloat(t[$] || "") || e[$] || 0),
      (e[se] = parseFloat(t.thumbHeight || "") || e[se] || 0)),
      this.addSlide(e);
  }
  onInitSlides() {
    this.build();
  }
  onChange() {
    var r;
    if (!this.isModern) return;
    const e = this.container,
      t = this.instance,
      i = t.panzoom,
      n = this.carousel,
      s = n ? n.panzoom : null,
      o = t.page;
    if (i && n && s) {
      if (i.isDragging) {
        P(e, this.cn(ut));
        let a =
          ((r = n.pages[o]) === null || r === void 0 ? void 0 : r.pos) || 0;
        a += t.getProgress(o) * (this[$] + this.thumbGap);
        let l = s.getBounds();
        -1 * a > l.x.min &&
          -1 * a < l.x.max &&
          s.panTo({
            x: -1 * a,
            friction: 0.12,
          });
      } else W(e, this.cn(ut), i.isResting);
      this.shiftModern();
    }
  }
  onRefresh() {
    this.updateProps();
    for (const r of this.instance.slides || []) this.resizeModernSlide(r);
    this.shiftModern();
  }
  isDisabled() {
    const r = this.option("minCount") || 0;
    if (r) {
      const t = this.instance;
      let i = 0;
      for (const n of t.slides || []) n.thumbSrc && i++;
      if (i < r) return !0;
    }
    const e = this.option("type");
    return ["modern", "classic"].indexOf(e) < 0;
  }
  getThumb(r) {
    const e = this.option("thumbTpl") || "";
    return {
      html: this.instance.localize(e, [
        ["%i", r.index],
        ["%d", r.index + 1],
        [
          "%s",
          r.thumbSrc ||
            "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
        ],
      ]),
    };
  }
  addSlide(r) {
    const e = this.carousel;
    e && e.addSlide(r.index, this.getThumb(r));
  }
  getSlides() {
    const r = [];
    for (const e of this.instance.slides || []) r.push(this.getThumb(e));
    return r;
  }
  resizeModernSlide(r) {
    this.isModern &&
      (r[Ee] =
        r[$] && r[se] ? Math.round(this[se] * (r[$] / r[se])) : this[Ee]);
  }
  updateProps() {
    const r = this.container;
    if (!r) return;
    const e = (t) =>
      parseFloat(getComputedStyle(r).getPropertyValue("--f-thumb-" + t)) || 0;
    (this.thumbGap = e("gap")),
      (this.thumbExtraGap = e("extra-gap")),
      (this[Ee] = e("width") || 40),
      (this[$] = e("clip-width") || 40),
      (this[se] = e("height") || 40);
  }
  build() {
    const r = this;
    if (r.state !== Y.Init) return;
    if (r.isDisabled()) return void r.emit("disabled");
    const e = r.instance,
      t = e.container,
      i = r.getSlides(),
      n = r.option("type");
    r.type = n;
    const s = r.option("parentEl"),
      o = r.cn("container"),
      a = r.cn("track");
    let l = s?.querySelector("." + o);
    l ||
      ((l = document.createElement("div")),
      w(l, o),
      s ? s.appendChild(l) : t.after(l)),
      w(l, `is-${n}`),
      w(t, r.cn("hasThumbs")),
      (r.container = l),
      r.updateProps();
    let c = l.querySelector("." + a);
    c ||
      ((c = document.createElement("div")),
      w(c, r.cn("track")),
      l.appendChild(c)),
      (r.track = c);
    const h = R(
        {},
        {
          track: c,
          infinite: !1,
          center: !0,
          fill: n === "classic",
          dragFree: !0,
          slidesPerPage: 1,
          transition: !1,
          preload: 0.25,
          friction: 0.12,
          Panzoom: {
            maxVelocity: 0,
          },
          Dots: !1,
          Navigation: !1,
          classes: {
            container: "f-thumbs",
            viewport: "f-thumbs__viewport",
            track: "f-thumbs__track",
            slide: "f-thumbs__slide",
          },
        },
        r.option("Carousel") || {},
        {
          Sync: {
            target: e,
          },
          slides: i,
        }
      ),
      u = new e.constructor(l, h);
    u.on("createSlide", (p, d) => {
      r.setProps(d.index), r.emit("createSlide", d, d.el);
    }),
      u.on("ready", () => {
        r.shiftModern(), r.emit("ready");
      }),
      u.on("refresh", () => {
        r.shiftModern();
      }),
      u.on("Panzoom.click", (p, d, f) => {
        r.onClick(f);
      }),
      (r.carousel = u),
      (r.state = Y.Ready);
  }
  onClick(r) {
    r.preventDefault(), r.stopPropagation();
    const e = this.instance,
      { pages: t, page: i } = e,
      n = (g) => {
        if (g) {
          const m = g.closest("[data-carousel-index]");
          if (m) return [parseInt(m.dataset.carouselIndex || "", 10) || 0, m];
        }
        return [-1, void 0];
      },
      s = (g, m) => {
        const v = document.elementFromPoint(g, m);
        return v ? n(v) : [-1, void 0];
      };
    let [o, a] = n(r.target);
    if (o > -1) return;
    const l = this[$],
      c = r.clientX,
      h = r.clientY;
    let [u, p] = s(c - l, h),
      [d, f] = s(c + l, h);
    p && f
      ? ((o =
          Math.abs(c - p.getBoundingClientRect().right) <
          Math.abs(c - f.getBoundingClientRect().left)
            ? u
            : d),
        o === i && (o = o === u ? d : u))
      : p
      ? (o = u)
      : f && (o = d),
      o > -1 && t[o] && e.slideTo(o);
  }
  getShift(r) {
    var e;
    const t = this,
      { instance: i } = t,
      n = t.carousel;
    if (!i || !n) return 0;
    const s = t[Ee],
      o = t[$],
      a = t.thumbGap,
      l = t.thumbExtraGap;
    if (!(!((e = n.slides[r]) === null || e === void 0) && e.el)) return 0;
    const c = 0.5 * (s - o),
      h = i.pages.length - 1;
    let u = i.getProgress(0),
      p = i.getProgress(h),
      d = i.getProgress(r, !1, !0),
      f = 0,
      g = c + l + a;
    const m = u < 0 && u > -1,
      v = p > 0 && p < 1;
    return (
      r === 0
        ? ((f = g * Math.abs(u)), v && u === 1 && (f -= g * Math.abs(p)))
        : r === h
        ? ((f = g * Math.abs(p) * -1), m && p === -1 && (f += g * Math.abs(u)))
        : m || v
        ? ((f = -1 * g), (f += g * Math.abs(u)), (f += g * (1 - Math.abs(p))))
        : (f = g * d),
      f
    );
  }
  setProps(r) {
    var e;
    const t = this;
    if (!t.isModern) return;
    const { instance: i } = t,
      n = t.carousel;
    if (i && n) {
      const s = (e = n.slides[r]) === null || e === void 0 ? void 0 : e.el;
      if (s && s.childNodes.length) {
        let o = b(1 - Math.abs(i.getProgress(r))),
          a = b(t.getShift(r));
        s.style.setProperty("--progress", o ? o + "" : ""),
          s.style.setProperty("--shift", a + "");
      }
    }
  }
  shiftModern() {
    const r = this;
    if (!r.isModern) return;
    const { instance: e, track: t } = r,
      i = e.panzoom,
      n = r.carousel;
    if (!(e && t && i && n) || i.state === C.Init || i.state === C.Destroy)
      return;
    for (const o of e.slides) r.setProps(o.index);
    let s = (r[$] + r.thumbGap) * (n.slides.length || 0);
    t.style.setProperty("--width", s + "");
  }
  cleanup() {
    const r = this;
    r.carousel && r.carousel.destroy(),
      (r.carousel = null),
      r.container && r.container.remove(),
      (r.container = null),
      r.track && r.track.remove(),
      (r.track = null),
      (r.state = Y.Init),
      P(r.instance.container, r.cn("hasThumbs"));
  }
  attach() {
    const r = this,
      e = r.instance;
    e.on("initSlide", r.onInitSlide),
      e.state === M.Init
        ? e.on("initSlides", r.onInitSlides)
        : r.onInitSlides(),
      e.on(["change", "Panzoom.afterTransform"], r.onChange),
      e.on("Panzoom.refresh", r.onRefresh);
  }
  detach() {
    const r = this,
      e = r.instance;
    e.off("initSlide", r.onInitSlide),
      e.off("initSlides", r.onInitSlides),
      e.off(["change", "Panzoom.afterTransform"], r.onChange),
      e.off("Panzoom.refresh", r.onRefresh),
      r.cleanup();
  }
};
Object.defineProperty(_t, "defaults", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: $t,
});
const ai = Object.assign(Object.assign({}, $t), {
    key: "t",
    showOnStart: !0,
    parentEl: null,
  }),
  pt = "is-masked",
  ft = "aria-hidden";
class Wt extends N {
  constructor() {
    super(...arguments),
      Object.defineProperty(this, "ref", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "hidden", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1,
      });
  }
  get isEnabled() {
    const e = this.ref;
    return e && !e.isDisabled();
  }
  get isHidden() {
    return this.hidden;
  }
  onClick(e, t) {
    t.stopPropagation();
  }
  onCreateSlide(e, t) {
    var i, n, s;
    const o =
        ((s =
          (n =
            (i = this.instance) === null || i === void 0
              ? void 0
              : i.carousel) === null || n === void 0
            ? void 0
            : n.slides[t.index]) === null || s === void 0
          ? void 0
          : s.type) || "",
      a = t.el;
    if (a && o) {
      let l = `for-${o}`;
      ["video", "youtube", "vimeo", "html5video"].includes(o) &&
        (l += " for-video"),
        w(a, l);
    }
  }
  onInit() {
    var e;
    const t = this,
      i = t.instance,
      n = i.carousel;
    if (t.ref || !n) return;
    const s = t.option("parentEl") || i.footer || i.container;
    if (!s) return;
    const o = R({}, t.options, {
      parentEl: s,
      classes: {
        container: "f-thumbs fancybox__thumbs",
      },
      Carousel: {
        Sync: {
          friction: i.option("Carousel.friction") || 0,
        },
      },
      on: {
        ready: (a) => {
          const l = a.container;
          l &&
            this.hidden &&
            (t.refresh(),
            (l.style.transition = "none"),
            t.hide(),
            l.offsetHeight,
            queueMicrotask(() => {
              (l.style.transition = ""), t.show();
            }));
        },
      },
    });
    (o.Carousel = o.Carousel || {}),
      (o.Carousel.on = R(
        ((e = t.options.Carousel) === null || e === void 0 ? void 0 : e.on) ||
          {},
        {
          click: this.onClick,
          createSlide: this.onCreateSlide,
        }
      )),
      (n.options.Thumbs = o),
      n.attachPlugins({
        Thumbs: _t,
      }),
      (t.ref = n.plugins.Thumbs),
      t.option("showOnStart") || ((t.ref.state = Y.Hidden), (t.hidden = !0));
  }
  onResize() {
    var e;
    const t = (e = this.ref) === null || e === void 0 ? void 0 : e.container;
    t && (t.style.maxHeight = "");
  }
  onKeydown(e, t) {
    const i = this.option("key");
    i && i === t && this.toggle();
  }
  toggle() {
    const e = this.ref;
    if (e && !e.isDisabled())
      return e.state === Y.Hidden
        ? ((e.state = Y.Init), void e.build())
        : void (this.hidden ? this.show() : this.hide());
  }
  show() {
    const e = this.ref;
    if (!e || e.isDisabled()) return;
    const t = e.container;
    t &&
      (this.refresh(),
      t.offsetHeight,
      t.removeAttribute(ft),
      t.classList.remove(pt),
      (this.hidden = !1));
  }
  hide() {
    const e = this.ref,
      t = e && e.container;
    t &&
      (this.refresh(),
      t.offsetHeight,
      t.classList.add(pt),
      t.setAttribute(ft, "true")),
      (this.hidden = !0);
  }
  refresh() {
    const e = this.ref;
    if (!e || !e.state) return;
    const t = e.container,
      i = t?.firstChild || null;
    t &&
      i &&
      i.childNodes.length &&
      (t.style.maxHeight = `${i.getBoundingClientRect().height}px`);
  }
  attach() {
    const e = this,
      t = e.instance;
    t.state === O.Init ? t.on("Carousel.init", e.onInit) : e.onInit(),
      t.on("resize", e.onResize),
      t.on("keydown", e.onKeydown);
  }
  detach() {
    var e;
    const t = this,
      i = t.instance;
    i.off("Carousel.init", t.onInit),
      i.off("resize", t.onResize),
      i.off("keydown", t.onKeydown),
      (e = i.carousel) === null || e === void 0 || e.detachPlugins(["Thumbs"]),
      (t.ref = null);
  }
}
Object.defineProperty(Wt, "defaults", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: ai,
});
const De = {
  panLeft: {
    icon: '<svg><path d="M5 12h14M5 12l6 6M5 12l6-6"/></svg>',
    change: {
      panX: -100,
    },
  },
  panRight: {
    icon: '<svg><path d="M5 12h14M13 18l6-6M13 6l6 6"/></svg>',
    change: {
      panX: 100,
    },
  },
  panUp: {
    icon: '<svg><path d="M12 5v14M18 11l-6-6M6 11l6-6"/></svg>',
    change: {
      panY: -100,
    },
  },
  panDown: {
    icon: '<svg><path d="M12 5v14M18 13l-6 6M6 13l6 6"/></svg>',
    change: {
      panY: 100,
    },
  },
  zoomIn: {
    icon: '<svg><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/></svg>',
    action: "zoomIn",
  },
  zoomOut: {
    icon: '<svg><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',
    action: "zoomOut",
  },
  toggle1to1: {
    icon: '<svg><path d="M3.51 3.07c5.74.02 11.48-.02 17.22.02 1.37.1 2.34 1.64 2.18 3.13 0 4.08.02 8.16 0 12.23-.1 1.54-1.47 2.64-2.79 2.46-5.61-.01-11.24.02-16.86-.01-1.36-.12-2.33-1.65-2.17-3.14 0-4.07-.02-8.16 0-12.23.1-1.36 1.22-2.48 2.42-2.46Z"/><path d="M5.65 8.54h1.49v6.92m8.94-6.92h1.49v6.92M11.5 9.4v.02m0 5.18v0"/></svg>',
    action: "toggleZoom",
  },
  toggleZoom: {
    icon: '<svg><g><line x1="11" y1="8" x2="11" y2="14"></line></g><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',
    action: "toggleZoom",
  },
  iterateZoom: {
    icon: '<svg><g><line x1="11" y1="8" x2="11" y2="14"></line></g><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',
    action: "iterateZoom",
  },
  rotateCCW: {
    icon: '<svg><path d="M15 4.55a8 8 0 0 0-6 14.9M9 15v5H4M18.37 7.16v.01M13 19.94v.01M16.84 18.37v.01M19.37 15.1v.01M19.94 11v.01"/></svg>',
    action: "rotateCCW",
  },
  rotateCW: {
    icon: '<svg><path d="M9 4.55a8 8 0 0 1 6 14.9M15 15v5h5M5.63 7.16v.01M4.06 11v.01M4.63 15.1v.01M7.16 18.37v.01M11 19.94v.01"/></svg>',
    action: "rotateCW",
  },
  flipX: {
    icon: '<svg style="stroke-width: 1.3"><path d="M12 3v18M16 7v10h5L16 7M8 7v10H3L8 7"/></svg>',
    action: "flipX",
  },
  flipY: {
    icon: '<svg style="stroke-width: 1.3"><path d="M3 12h18M7 16h10L7 21v-5M7 8h10L7 3v5"/></svg>',
    action: "flipY",
  },
  fitX: {
    icon: '<svg><path d="M4 12V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6M10 18H3M21 18h-7M6 15l-3 3 3 3M18 15l3 3-3 3"/></svg>',
    action: "fitX",
  },
  fitY: {
    icon: '<svg><path d="M12 20H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6M18 14v7M18 3v7M15 18l3 3 3-3M15 6l3-3 3 3"/></svg>',
    action: "fitY",
  },
  reset: {
    icon: '<svg><path d="M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"/></svg>',
    action: "reset",
  },
  toggleFS: {
    icon: '<svg><g><path d="M14.5 9.5 21 3m0 0h-6m6 0v6M3 21l6.5-6.5M3 21v-6m0 6h6"/></g><g><path d="m14 10 7-7m-7 7h6m-6 0V4M3 21l7-7m0 0v6m0-6H4"/></g></svg>',
    action: "toggleFS",
  },
};
var Q;
(function (r) {
  (r[(r.Init = 0)] = "Init"),
    (r[(r.Ready = 1)] = "Ready"),
    (r[(r.Disabled = 2)] = "Disabled");
})(Q || (Q = {}));
const ri = {
    absolute: "auto",
    display: {
      left: ["infobar"],
      middle: [],
      right: ["iterateZoom", "slideshow", "fullscreen", "thumbs", "close"],
    },
    enabled: "auto",
    items: {
      infobar: {
        tpl: '<div class="fancybox__infobar" tabindex="-1"><span data-fancybox-current-index></span>/<span data-fancybox-count></span></div>',
      },
      download: {
        tpl: '<a class="f-button" title="{{DOWNLOAD}}" data-fancybox-download href="javasript:;"><svg><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 11l5 5 5-5M12 4v12"/></svg></a>',
      },
      prev: {
        tpl: '<button class="f-button" title="{{PREV}}" data-fancybox-prev><svg><path d="m15 6-6 6 6 6"/></svg></button>',
      },
      next: {
        tpl: '<button class="f-button" title="{{NEXT}}" data-fancybox-next><svg><path d="m9 6 6 6-6 6"/></svg></button>',
      },
      slideshow: {
        tpl: '<button class="f-button" title="{{TOGGLE_SLIDESHOW}}" data-fancybox-toggle-slideshow><svg><g><path d="M8 4v16l13 -8z"></path></g><g><path d="M8 4v15M17 4v15"/></g></svg></button>',
      },
      fullscreen: {
        tpl: '<button class="f-button" title="{{TOGGLE_FULLSCREEN}}" data-fancybox-toggle-fullscreen><svg><g><path d="M4 8V6a2 2 0 0 1 2-2h2M4 16v2a2 2 0 0 0 2 2h2M16 4h2a2 2 0 0 1 2 2v2M16 20h2a2 2 0 0 0 2-2v-2"/></g><g><path d="M15 19v-2a2 2 0 0 1 2-2h2M15 5v2a2 2 0 0 0 2 2h2M5 15h2a2 2 0 0 1 2 2v2M5 9h2a2 2 0 0 0 2-2V5"/></g></svg></button>',
      },
      thumbs: {
        tpl: '<button class="f-button" title="{{TOGGLE_THUMBS}}" data-fancybox-toggle-thumbs><svg><circle cx="5.5" cy="5.5" r="1"/><circle cx="12" cy="5.5" r="1"/><circle cx="18.5" cy="5.5" r="1"/><circle cx="5.5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="18.5" cy="12" r="1"/><circle cx="5.5" cy="18.5" r="1"/><circle cx="12" cy="18.5" r="1"/><circle cx="18.5" cy="18.5" r="1"/></svg></button>',
      },
      close: {
        tpl: '<button class="f-button" title="{{CLOSE}}" data-fancybox-close><svg><path d="m19.5 4.5-15 15M4.5 4.5l15 15"/></svg></button>',
      },
    },
    parentEl: null,
  },
  li = {
    tabindex: "-1",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg",
  },
  gt = "has-toolbar",
  Fe = "fancybox__toolbar";
class Xt extends N {
  constructor() {
    super(...arguments),
      Object.defineProperty(this, "state", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: Q.Init,
      }),
      Object.defineProperty(this, "container", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      });
  }
  onReady(e) {
    var t;
    if (!e.carousel) return;
    let i = this.option("display"),
      n = this.option("absolute"),
      s = this.option("enabled");
    if (s === "auto") {
      const c = this.instance.carousel;
      let h = 0;
      if (c) for (const u of c.slides) (u.panzoom || u.type === "image") && h++;
      h || (s = !1);
    }
    s || (i = void 0);
    let o = 0;
    const a = {
      left: [],
      middle: [],
      right: [],
    };
    if (i)
      for (const c of ["left", "middle", "right"])
        for (const h of i[c]) {
          const u = this.createEl(h);
          u && ((t = a[c]) === null || t === void 0 || t.push(u), o++);
        }
    let l = null;
    if ((o && (l = this.createContainer()), l)) {
      for (const [c, h] of Object.entries(a)) {
        const u = document.createElement("div");
        w(u, Fe + "__column is-" + c);
        for (const p of h) u.appendChild(p);
        n !== "auto" || c !== "middle" || h.length || (n = !0),
          l.appendChild(u);
      }
      n === !0 && w(l, "is-absolute"), (this.state = Q.Ready), this.onRefresh();
    } else this.state = Q.Disabled;
  }
  onClick(e) {
    var t, i;
    const n = this.instance,
      s = n.getSlide(),
      o = s?.panzoom,
      a = e.target,
      l = a && z(a) ? a.dataset : null;
    if (!l) return;
    if (l.fancyboxToggleThumbs !== void 0)
      return (
        e.preventDefault(),
        e.stopPropagation(),
        void ((t = n.plugins.Thumbs) === null || t === void 0 || t.toggle())
      );
    if (l.fancyboxToggleFullscreen !== void 0)
      return (
        e.preventDefault(),
        e.stopPropagation(),
        void this.instance.toggleFullscreen()
      );
    if (l.fancyboxToggleSlideshow !== void 0) {
      e.preventDefault(), e.stopPropagation();
      const u =
        (i = n.carousel) === null || i === void 0 ? void 0 : i.plugins.Autoplay;
      let p = u.isActive;
      return (
        o && o.panMode === "mousemove" && !p && o.reset(),
        void (p ? u.stop() : u.start())
      );
    }
    const c = l.panzoomAction,
      h = l.panzoomChange;
    if (((h || c) && (e.preventDefault(), e.stopPropagation()), h)) {
      let u = {};
      try {
        u = JSON.parse(h);
      } catch {}
      o && o.applyChange(u);
    } else c && o && o[c] && o[c]();
  }
  onChange() {
    this.onRefresh();
  }
  onRefresh() {
    if (this.instance.isClosing()) return;
    const e = this.container;
    if (!e) return;
    const t = this.instance.getSlide();
    if (!t || t.state !== L.Ready) return;
    const i = t && !t.error && t.panzoom;
    for (const o of e.querySelectorAll("[data-panzoom-action]"))
      i
        ? (o.removeAttribute("disabled"), o.removeAttribute("tabindex"))
        : (o.setAttribute("disabled", ""), o.setAttribute("tabindex", "-1"));
    let n = i && i.canZoomIn(),
      s = i && i.canZoomOut();
    for (const o of e.querySelectorAll('[data-panzoom-action="zoomIn"]'))
      n
        ? (o.removeAttribute("disabled"), o.removeAttribute("tabindex"))
        : (o.setAttribute("disabled", ""), o.setAttribute("tabindex", "-1"));
    for (const o of e.querySelectorAll('[data-panzoom-action="zoomOut"]'))
      s
        ? (o.removeAttribute("disabled"), o.removeAttribute("tabindex"))
        : (o.setAttribute("disabled", ""), o.setAttribute("tabindex", "-1"));
    for (const o of e.querySelectorAll(
      '[data-panzoom-action="toggleZoom"],[data-panzoom-action="iterateZoom"]'
    )) {
      s || n
        ? (o.removeAttribute("disabled"), o.removeAttribute("tabindex"))
        : (o.setAttribute("disabled", ""), o.setAttribute("tabindex", "-1"));
      const a = o.querySelector("g");
      a && (a.style.display = n ? "" : "none");
    }
  }
  onDone(e, t) {
    var i;
    (i = t.panzoom) === null ||
      i === void 0 ||
      i.on("afterTransform", () => {
        this.instance.isCurrentSlide(t) && this.onRefresh();
      }),
      this.instance.isCurrentSlide(t) && this.onRefresh();
  }
  createContainer() {
    const e = this.instance.container;
    if (!e) return null;
    const t = this.option("parentEl") || e;
    let i = t.querySelector("." + Fe);
    return (
      i || ((i = document.createElement("div")), w(i, Fe), t.prepend(i)),
      i.addEventListener("click", this.onClick, {
        passive: !1,
        capture: !0,
      }),
      e && w(e, gt),
      (this.container = i),
      i
    );
  }
  createEl(e) {
    const t = this.instance,
      i = t.carousel;
    if (!i || e === "toggleFS" || (e === "fullscreen" && !Rt())) return null;
    let n = null;
    const s = i.slides.length || 0;
    let o = 0,
      a = 0;
    for (const c of i.slides)
      (c.panzoom || c.type === "image") && o++,
        (c.type === "image" || c.downloadSrc) && a++;
    if (s < 2 && ["infobar", "prev", "next"].includes(e)) return n;
    if ((De[e] !== void 0 && !o) || (e === "download" && !a)) return null;
    if (e === "thumbs") {
      const c = t.plugins.Thumbs;
      if (!c || !c.isEnabled) return null;
    }
    if (e === "slideshow" && (!i.plugins.Autoplay || s < 2)) return null;
    if (De[e] !== void 0) {
      const c = De[e];
      (n = document.createElement("button")),
        n.setAttribute(
          "title",
          this.instance.localize(`{{${e.toUpperCase()}}}`)
        ),
        w(n, "f-button"),
        c.action && (n.dataset.panzoomAction = c.action),
        c.change && (n.dataset.panzoomChange = JSON.stringify(c.change)),
        n.appendChild(_(this.instance.localize(c.icon)));
    } else {
      const c = (this.option("items") || [])[e];
      c &&
        ((n = _(this.instance.localize(c.tpl))),
        typeof c.click == "function" &&
          n.addEventListener("click", (h) => {
            h.preventDefault(),
              h.stopPropagation(),
              typeof c.click == "function" && c.click.call(this, this, h);
          }));
    }
    const l = n?.querySelector("svg");
    if (l)
      for (const [c, h] of Object.entries(li))
        l.getAttribute(c) || l.setAttribute(c, String(h));
    return n;
  }
  removeContainer() {
    const e = this.container;
    e && e.remove(), (this.container = null), (this.state = Q.Disabled);
    const t = this.instance.container;
    t && P(t, gt);
  }
  attach() {
    const e = this,
      t = e.instance;
    t.on("Carousel.initSlides", e.onReady),
      t.on("done", e.onDone),
      t.on(["reveal", "Carousel.change"], e.onChange),
      e.onReady(e.instance);
  }
  detach() {
    const e = this,
      t = e.instance;
    t.off("Carousel.initSlides", e.onReady),
      t.off("done", e.onDone),
      t.off(["reveal", "Carousel.change"], e.onChange),
      e.removeContainer();
  }
}
Object.defineProperty(Xt, "defaults", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: ri,
});
const ci = {
    Hash: class extends N {
      onReady() {
        he = !1;
      }
      onChange(r) {
        J && clearTimeout(J);
        const { hash: e } = kt(),
          { hash: t } = Te(),
          i = r.isOpeningSlide(r.getSlide());
        i && (lt = t === e ? "" : t),
          e &&
            e !== t &&
            (J = setTimeout(() => {
              try {
                if (r.state === O.Ready) {
                  let n = "replaceState";
                  i && !be && ((n = "pushState"), (be = !0)),
                    window.history[n](
                      {},
                      document.title,
                      window.location.pathname + window.location.search + e
                    );
                }
              } catch {}
            }, 300));
      }
      onClose(r) {
        if ((J && clearTimeout(J), !he && be))
          return (be = !1), (he = !1), void window.history.back();
        if (!he)
          try {
            window.history.replaceState(
              {},
              document.title,
              window.location.pathname + window.location.search + (lt || "")
            );
          } catch {}
      }
      attach() {
        const r = this.instance;
        r.on("ready", this.onReady),
          r.on(["Carousel.ready", "Carousel.change"], this.onChange),
          r.on("close", this.onClose);
      }
      detach() {
        const r = this.instance;
        r.off("ready", this.onReady),
          r.off(["Carousel.ready", "Carousel.change"], this.onChange),
          r.off("close", this.onClose);
      }
      static parseURL() {
        return Te();
      }
      static startFromUrl() {
        It();
      }
      static destroy() {
        window.removeEventListener("hashchange", Ft, !1);
      }
    },
    Html: Bt,
    Images: jt,
    Slideshow: Nt,
    Thumbs: Wt,
    Toolbar: Xt,
  },
  mt = "with-fancybox",
  je = "hide-scrollbar",
  vt = "--fancybox-scrollbar-compensate",
  bt = "--fancybox-body-margin",
  Be = "aria-hidden",
  He = "is-using-tab",
  Ne = "is-animated",
  yt = "is-compact",
  wt = "is-loading",
  $e = "is-opening",
  Se = "has-caption",
  oe = "disabled",
  G = "tabindex",
  xt = "download",
  _e = "href",
  ae = "src",
  Z = (r) => typeof r == "string",
  Et = function () {
    var r = window.getSelection();
    return !!r && r.type === "Range";
  };
let D,
  F = null,
  K = null,
  St = 0,
  Pt = 0,
  Ct = 0,
  Tt = 0;
const re = new Map();
let hi = 0;
class S extends Ve {
  get isIdle() {
    return this.idle;
  }
  get isCompact() {
    return this.option("compact");
  }
  constructor(e = [], t = {}, i = {}) {
    super(t),
      Object.defineProperty(this, "userSlides", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: [],
      }),
      Object.defineProperty(this, "userPlugins", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {},
      }),
      Object.defineProperty(this, "idle", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1,
      }),
      Object.defineProperty(this, "idleTimer", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "clickTimer", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "pwt", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0,
      }),
      Object.defineProperty(this, "ignoreFocusChange", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1,
      }),
      Object.defineProperty(this, "startedFs", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1,
      }),
      Object.defineProperty(this, "state", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: O.Init,
      }),
      Object.defineProperty(this, "id", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0,
      }),
      Object.defineProperty(this, "container", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "caption", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "footer", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "carousel", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "lastFocus", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "prevMouseMoveEvent", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      D || (D = Rt()),
      (this.id = t.id || ++hi),
      re.set(this.id, this),
      (this.userSlides = e),
      (this.userPlugins = i),
      queueMicrotask(() => {
        this.init();
      });
  }
  init() {
    if (this.state === O.Destroy) return;
    (this.state = O.Init),
      this.attachPlugins(
        Object.assign(Object.assign({}, S.Plugins), this.userPlugins)
      ),
      this.emit("init"),
      this.emit("attachPlugins"),
      this.option("hideScrollbar") === !0 &&
        (() => {
          if (!de) return;
          const t = document,
            i = t.body,
            n = t.documentElement;
          if (i.classList.contains(je)) return;
          let s = window.innerWidth - n.getBoundingClientRect().width;
          const o = parseFloat(window.getComputedStyle(i).marginRight);
          s < 0 && (s = 0),
            n.style.setProperty(vt, `${s}px`),
            o && i.style.setProperty(bt, `${o}px`),
            i.classList.add(je);
        })(),
      this.initLayout(),
      this.scale();
    const e = () => {
      this.initCarousel(this.userSlides),
        (this.state = O.Ready),
        this.attachEvents(),
        this.emit("ready"),
        setTimeout(() => {
          this.container && this.container.setAttribute(Be, "false");
        }, 16);
    };
    this.option("Fullscreen.autoStart") && D && !D.isFullscreen()
      ? D.request()
          .then(() => {
            (this.startedFs = !0), e();
          })
          .catch(() => e())
      : e();
  }
  initLayout() {
    var e, t;
    const i = this.option("parentEl") || document.body,
      n = _(this.localize(this.option("tpl.main") || ""));
    if (n) {
      if (
        (n.setAttribute("id", `fancybox-${this.id}`),
        n.setAttribute("aria-label", this.localize("{{MODAL}}")),
        n.classList.toggle(yt, this.isCompact),
        w(n, this.option("mainClass") || ""),
        w(n, $e),
        (this.container = n),
        (this.footer = n.querySelector(".fancybox__footer")),
        i.appendChild(n),
        w(document.documentElement, mt),
        (F && K) ||
          ((F = document.createElement("span")),
          w(F, "fancybox-focus-guard"),
          F.setAttribute(G, "0"),
          F.setAttribute(Be, "true"),
          F.setAttribute("aria-label", "Focus guard"),
          (K = F.cloneNode()),
          (e = n.parentElement) === null ||
            e === void 0 ||
            e.insertBefore(F, n),
          (t = n.parentElement) === null || t === void 0 || t.append(K)),
        n.addEventListener("mousedown", (s) => {
          (St = s.pageX), (Pt = s.pageY), P(n, He);
        }),
        this.option("closeExisting"))
      )
        for (const s of re.values()) s.id !== this.id && s.close();
      else
        this.option("animated") &&
          (w(n, Ne),
          setTimeout(() => {
            this.isClosing() || P(n, Ne);
          }, 350));
      this.emit("initLayout");
    }
  }
  initCarousel(e) {
    const t = this.container;
    if (!t) return;
    const i = t.querySelector(".fancybox__carousel");
    if (!i) return;
    const n = (this.carousel = new ee(
      i,
      R(
        {},
        {
          slides: e,
          transition: "fade",
          Panzoom: {
            lockAxis: this.option("dragToClose") ? "xy" : "x",
            infinite: !!this.option("dragToClose") && "y",
          },
          Dots: !1,
          Navigation: {
            classes: {
              container: "fancybox__nav",
              button: "f-button",
              isNext: "is-next",
              isPrev: "is-prev",
            },
          },
          initialPage: this.option("startIndex"),
          l10n: this.option("l10n"),
        },
        this.option("Carousel") || {}
      )
    ));
    n.on("*", (s, o, ...a) => {
      this.emit(`Carousel.${o}`, s, ...a);
    }),
      n.on(["ready", "change"], () => {
        this.manageCaption();
      }),
      this.on("Carousel.removeSlide", (s, o, a) => {
        this.clearContent(a), (a.state = void 0);
      }),
      n.on("Panzoom.touchStart", () => {
        var s, o;
        this.isCompact || this.endIdle(),
          !((s = document.activeElement) === null || s === void 0) &&
            s.closest(".f-thumbs") &&
            ((o = this.container) === null || o === void 0 || o.focus());
      }),
      n.on("settle", () => {
        this.idleTimer ||
          this.isCompact ||
          !this.option("idle") ||
          this.setIdle(),
          this.option("autoFocus") && !this.isClosing && this.checkFocus();
      }),
      this.option("dragToClose") &&
        (n.on("Panzoom.afterTransform", (s, o) => {
          const a = this.getSlide();
          if (a && We(a.el)) return;
          const l = this.container;
          if (l) {
            const c = Math.abs(o.current.f),
              h =
                c < 1
                  ? ""
                  : Math.max(
                      0.5,
                      Math.min(1, 1 - (c / o.contentRect.fitHeight) * 1.5)
                    );
            l.style.setProperty("--fancybox-ts", h ? "0s" : ""),
              l.style.setProperty("--fancybox-opacity", h + "");
          }
        }),
        n.on("Panzoom.touchEnd", (s, o, a) => {
          var l;
          const c = this.getSlide();
          if (
            (c && We(c.el)) ||
            (o.isMobile &&
              document.activeElement &&
              ["TEXTAREA", "INPUT"].indexOf(
                (l = document.activeElement) === null || l === void 0
                  ? void 0
                  : l.nodeName
              ) !== -1)
          )
            return;
          const h = Math.abs(o.dragOffset.y);
          o.lockedAxis === "y" &&
            (h >= 200 || (h >= 50 && o.dragOffset.time < 300)) &&
            (a && a.cancelable && a.preventDefault(),
            this.close(a, "f-throwOut" + (o.current.f < 0 ? "Up" : "Down")));
        })),
      n.on("change", (s) => {
        var o;
        let a =
          (o = this.getSlide()) === null || o === void 0 ? void 0 : o.triggerEl;
        if (a) {
          const l = new CustomEvent("slideTo", {
            bubbles: !0,
            cancelable: !0,
            detail: s.page,
          });
          a.dispatchEvent(l);
        }
      }),
      n.on(["refresh", "change"], (s) => {
        const o = this.container;
        if (!o) return;
        for (const c of o.querySelectorAll("[data-fancybox-current-index]"))
          c.innerHTML = s.page + 1;
        for (const c of o.querySelectorAll("[data-fancybox-count]"))
          c.innerHTML = s.pages.length;
        if (!s.isInfinite) {
          for (const c of o.querySelectorAll("[data-fancybox-next]"))
            s.page < s.pages.length - 1
              ? (c.removeAttribute(oe), c.removeAttribute(G))
              : (c.setAttribute(oe, ""), c.setAttribute(G, "-1"));
          for (const c of o.querySelectorAll("[data-fancybox-prev]"))
            s.page > 0
              ? (c.removeAttribute(oe), c.removeAttribute(G))
              : (c.setAttribute(oe, ""), c.setAttribute(G, "-1"));
        }
        const a = this.getSlide();
        if (!a) return;
        let l = a.downloadSrc || "";
        l || a.type !== "image" || a.error || !Z(a[ae]) || (l = a[ae]);
        for (const c of o.querySelectorAll("[data-fancybox-download]")) {
          const h = a.downloadFilename;
          l
            ? (c.removeAttribute(oe),
              c.removeAttribute(G),
              c.setAttribute(_e, l),
              c.setAttribute(xt, h || l),
              c.setAttribute("target", "_blank"))
            : (c.setAttribute(oe, ""),
              c.setAttribute(G, "-1"),
              c.removeAttribute(_e),
              c.removeAttribute(xt));
        }
      }),
      this.emit("initCarousel");
  }
  attachEvents() {
    const e = this,
      t = e.container;
    if (!t) return;
    t.addEventListener("click", e.onClick, {
      passive: !1,
      capture: !1,
    }),
      t.addEventListener("wheel", e.onWheel, {
        passive: !1,
        capture: !1,
      }),
      document.addEventListener("keydown", e.onKeydown, {
        passive: !1,
        capture: !0,
      }),
      document.addEventListener("visibilitychange", e.onVisibilityChange, !1),
      document.addEventListener("mousemove", e.onMousemove),
      e.option("trapFocus") &&
        document.addEventListener("focus", e.onFocus, !0),
      window.addEventListener("resize", e.onResize);
    const i = window.visualViewport;
    i &&
      (i.addEventListener("scroll", e.onResize),
      i.addEventListener("resize", e.onResize));
  }
  detachEvents() {
    const e = this,
      t = e.container;
    if (!t) return;
    document.removeEventListener("keydown", e.onKeydown, {
      passive: !1,
      capture: !0,
    }),
      t.removeEventListener("wheel", e.onWheel, {
        passive: !1,
        capture: !1,
      }),
      t.removeEventListener("click", e.onClick, {
        passive: !1,
        capture: !1,
      }),
      document.removeEventListener("mousemove", e.onMousemove),
      window.removeEventListener("resize", e.onResize);
    const i = window.visualViewport;
    i &&
      (i.removeEventListener("resize", e.onResize),
      i.removeEventListener("scroll", e.onResize)),
      document.removeEventListener(
        "visibilitychange",
        e.onVisibilityChange,
        !1
      ),
      document.removeEventListener("focus", e.onFocus, !0);
  }
  scale() {
    const e = this.container;
    if (!e) return;
    const t = window.visualViewport,
      i = Math.max(1, t?.scale || 1);
    let n = "",
      s = "",
      o = "";
    if (t && i > 1) {
      let a = `${t.offsetLeft}px`,
        l = `${t.offsetTop}px`;
      (n = t.width * i + "px"),
        (s = t.height * i + "px"),
        (o = `translate3d(${a}, ${l}, 0) scale(${1 / i})`);
    }
    (e.style.transform = o), (e.style.width = n), (e.style.height = s);
  }
  onClick(e) {
    var t;
    const { container: i, isCompact: n } = this;
    if (!i || this.isClosing()) return;
    !n && this.option("idle") && this.resetIdle();
    const s = e.composedPath()[0];
    if (s.closest(".fancybox-spinner") || s.closest("[data-fancybox-close]"))
      return e.preventDefault(), void this.close(e);
    if (s.closest("[data-fancybox-prev]"))
      return e.preventDefault(), void this.prev();
    if (s.closest("[data-fancybox-next]"))
      return e.preventDefault(), void this.next();
    if (
      (e.type === "click" && e.detail === 0) ||
      Math.abs(e.pageX - St) > 30 ||
      Math.abs(e.pageY - Pt) > 30
    )
      return;
    const o = document.activeElement;
    if (Et() && o && i.contains(o)) return;
    if (
      n &&
      ((t = this.getSlide()) === null || t === void 0 ? void 0 : t.type) ===
        "image"
    )
      return void (this.clickTimer
        ? (clearTimeout(this.clickTimer), (this.clickTimer = null))
        : (this.clickTimer = setTimeout(() => {
            this.toggleIdle(), (this.clickTimer = null);
          }, 350)));
    if ((this.emit("click", e), e.defaultPrevented)) return;
    let a = !1;
    if (s.closest(".fancybox__content")) {
      if (o) {
        if (o.closest("[contenteditable]")) return;
        s.matches(Re) || o.blur();
      }
      if (Et()) return;
      a = this.option("contentClick");
    } else
      s.closest(".fancybox__carousel") &&
        !s.matches(Re) &&
        (a = this.option("backdropClick"));
    a === "close"
      ? (e.preventDefault(), this.close(e))
      : a === "next"
      ? (e.preventDefault(), this.next())
      : a === "prev" && (e.preventDefault(), this.prev());
  }
  onWheel(e) {
    const t = e.target;
    let i = this.option("wheel", e);
    t.closest(".fancybox__thumbs") && (i = "slide");
    const n = i === "slide",
      s = [-e.deltaX || 0, -e.deltaY || 0, -e.detail || 0].reduce(function (
        l,
        c
      ) {
        return Math.abs(c) > Math.abs(l) ? c : l;
      }),
      o = Math.max(-1, Math.min(1, s)),
      a = Date.now();
    this.pwt && a - this.pwt < 300
      ? n && e.preventDefault()
      : ((this.pwt = a),
        this.emit("wheel", e, o),
        e.defaultPrevented ||
          (i === "close"
            ? (e.preventDefault(), this.close(e))
            : i === "slide" &&
              (Pe(t) ||
                (e.preventDefault(), this[o > 0 ? "prev" : "next"]()))));
  }
  onScroll() {
    window.scrollTo(Ct, Tt);
  }
  onKeydown(e) {
    if (!this.isTopmost()) return;
    this.isCompact ||
      !this.option("idle") ||
      this.isClosing() ||
      this.resetIdle();
    const t = e.key,
      i = this.option("keyboard");
    if (!i) return;
    const n = e.composedPath()[0],
      s = document.activeElement && document.activeElement.classList,
      o =
        (s && s.contains("f-button")) ||
        n.dataset.carouselPage ||
        n.dataset.carouselIndex;
    if (
      (t !== "Escape" &&
        !o &&
        z(n) &&
        (n.isContentEditable ||
          ["TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO"].indexOf(
            n.nodeName
          ) !== -1)) ||
      (e.key === "Tab" ? w(this.container, He) : P(this.container, He),
      e.ctrlKey || e.altKey || e.shiftKey)
    )
      return;
    this.emit("keydown", t, e);
    const a = i[t];
    a && typeof this[a] == "function" && (e.preventDefault(), this[a]());
  }
  onResize() {
    const e = this.container;
    if (!e) return;
    const t = this.isCompact;
    e.classList.toggle(yt, t),
      this.manageCaption(this.getSlide()),
      this.isCompact ? this.clearIdle() : this.endIdle(),
      this.scale(),
      this.emit("resize");
  }
  onFocus(e) {
    this.isTopmost() && this.checkFocus(e);
  }
  onMousemove(e) {
    (this.prevMouseMoveEvent = e),
      !this.isCompact && this.option("idle") && this.resetIdle();
  }
  onVisibilityChange() {
    document.visibilityState === "visible" ? this.checkFocus() : this.endIdle();
  }
  manageCloseBtn(e) {
    const t = this.optionFor(e, "closeButton") || !1;
    if (t === "auto") {
      const n = this.plugins.Toolbar;
      if (n && n.state === Q.Ready) return;
    }
    if (!t || !e.contentEl || e.closeBtnEl) return;
    const i = this.option("tpl.closeButton");
    if (i) {
      const n = _(this.localize(i));
      (e.closeBtnEl = e.contentEl.appendChild(n)),
        e.el && w(e.el, "has-close-btn");
    }
  }
  manageCaption(e = void 0) {
    var t, i;
    const n = "fancybox__caption",
      s = this.container;
    if (!s) return;
    P(s, Se);
    const o = this.isCompact || this.option("commonCaption"),
      a = !o;
    if (
      (this.caption && this.stop(this.caption),
      a && this.caption && (this.caption.remove(), (this.caption = null)),
      o && !this.caption)
    )
      for (const u of ((t = this.carousel) === null || t === void 0
        ? void 0
        : t.slides) || [])
        u.captionEl &&
          (u.captionEl.remove(),
          (u.captionEl = void 0),
          P(u.el, Se),
          (i = u.el) === null ||
            i === void 0 ||
            i.removeAttribute("aria-labelledby"));
    if ((e || (e = this.getSlide()), !e || (o && !this.isCurrentSlide(e))))
      return;
    const l = e.el;
    let c = this.optionFor(e, "caption", "");
    if (!c)
      return void (
        o &&
        this.caption &&
        this.animate(this.caption, "f-fadeOut", () => {
          this.caption && (this.caption.innerHTML = "");
        })
      );
    let h = null;
    if (a) {
      if (((h = e.captionEl || null), l && !h)) {
        const u = n + `_${this.id}_${e.index}`;
        (h = document.createElement("div")),
          w(h, n),
          h.setAttribute("id", u),
          (e.captionEl = l.appendChild(h)),
          w(l, Se),
          l.setAttribute("aria-labelledby", u);
      }
    } else
      (h = this.caption),
        h || (h = s.querySelector("." + n)),
        !h &&
          ((h = document.createElement("div")),
          (h.dataset.fancyboxCaption = ""),
          w(h, n),
          (this.footer || s).prepend(h)),
        w(s, Se),
        (this.caption = h);
    h &&
      ((h.innerHTML = ""),
      Z(c) || typeof c == "number"
        ? (h.innerHTML = c + "")
        : c instanceof HTMLElement && h.appendChild(c));
  }
  checkFocus(e) {
    this.focus(e);
  }
  focus(e) {
    var t;
    if (this.ignoreFocusChange) return;
    const i = document.activeElement || null,
      n = e?.target || null,
      s = this.container,
      o = (t = this.carousel) === null || t === void 0 ? void 0 : t.viewport;
    if (!s || !o || (!e && i && s.contains(i))) return;
    const a = this.getSlide(),
      l = a && a.state === L.Ready ? a.el : null;
    if (!l || l.contains(i) || s === i) return;
    e && e.cancelable && e.preventDefault(), (this.ignoreFocusChange = !0);
    const c = Array.from(s.querySelectorAll(Re));
    let h = [],
      u = null;
    for (let d of c) {
      const f = !d.offsetParent || !!d.closest('[aria-hidden="true"]'),
        g = l && l.contains(d),
        m = !o.contains(d);
      if (d === s || ((g || m) && !f)) {
        h.push(d);
        const v = d.dataset.origTabindex;
        v !== void 0 && v && (d.tabIndex = parseFloat(v)),
          d.removeAttribute("data-orig-tabindex"),
          (!d.hasAttribute("autoFocus") && u) || (u = d);
      } else {
        const v =
          d.dataset.origTabindex === void 0
            ? d.getAttribute("tabindex") || ""
            : d.dataset.origTabindex;
        v && (d.dataset.origTabindex = v), (d.tabIndex = -1);
      }
    }
    let p = null;
    e
      ? (!n || h.indexOf(n) < 0) &&
        ((p = u || s),
        h.length &&
          (i === K
            ? (p = h[0])
            : (this.lastFocus !== s && i !== F) || (p = h[h.length - 1])))
      : (p = a && a.type === "image" ? s : u || s),
      p && rt(p),
      (this.lastFocus = document.activeElement),
      (this.ignoreFocusChange = !1);
  }
  next() {
    const e = this.carousel;
    e && e.pages.length > 1 && e.slideNext();
  }
  prev() {
    const e = this.carousel;
    e && e.pages.length > 1 && e.slidePrev();
  }
  jumpTo(...e) {
    this.carousel && this.carousel.slideTo(...e);
  }
  isTopmost() {
    var e;
    return (
      ((e = S.getInstance()) === null || e === void 0 ? void 0 : e.id) ==
      this.id
    );
  }
  animate(e = null, t = "", i) {
    if (!e || !t) return void (i && i());
    this.stop(e);
    const n = (s) => {
      s.target === e &&
        e.dataset.animationName &&
        (e.removeEventListener("animationend", n),
        delete e.dataset.animationName,
        i && i(),
        P(e, t));
    };
    (e.dataset.animationName = t),
      e.addEventListener("animationend", n),
      w(e, t);
  }
  stop(e) {
    e &&
      e.dispatchEvent(
        new CustomEvent("animationend", {
          bubbles: !1,
          cancelable: !0,
          currentTarget: e,
        })
      );
  }
  setContent(e, t = "", i = !0) {
    if (this.isClosing()) return;
    const n = e.el;
    if (!n) return;
    let s = null;
    if (
      (z(t)
        ? (s = t)
        : ((s = _(t + "")),
          z(s) ||
            ((s = document.createElement("div")), (s.innerHTML = t + ""))),
      ["img", "picture", "iframe", "video", "audio"].includes(
        s.nodeName.toLowerCase()
      ))
    ) {
      const o = document.createElement("div");
      o.appendChild(s), (s = o);
    }
    z(s) && e.filter && !e.error && (s = s.querySelector(e.filter)),
      s && z(s)
        ? (w(s, "fancybox__content"),
          e.id && s.setAttribute("id", e.id),
          n.classList.add(`has-${e.error ? "error" : e.type || "unknown"}`),
          n.prepend(s),
          s.style.display === "none" && (s.style.display = ""),
          getComputedStyle(s).getPropertyValue("display") === "none" &&
            (s.style.display =
              e.display || this.option("defaultDisplay") || "flex"),
          (e.contentEl = s),
          i && this.revealContent(e),
          this.manageCloseBtn(e),
          this.manageCaption(e))
        : this.setError(e, "{{ELEMENT_NOT_FOUND}}");
  }
  revealContent(e, t) {
    const i = e.el,
      n = e.contentEl;
    i &&
      n &&
      (this.emit("reveal", e),
      this.hideLoading(e),
      (e.state = L.Opening),
      (t = this.isOpeningSlide(e)
        ? t === void 0
          ? this.optionFor(e, "showClass")
          : t
        : "f-fadeIn")
        ? this.animate(n, t, () => {
            this.done(e);
          })
        : this.done(e));
  }
  done(e) {
    this.isClosing() ||
      ((e.state = L.Ready),
      this.emit("done", e),
      w(e.el, "is-done"),
      this.isCurrentSlide(e) &&
        this.option("autoFocus") &&
        queueMicrotask(() => {
          var t;
          (t = e.panzoom) === null || t === void 0 || t.updateControls(),
            this.option("autoFocus") && this.focus();
        }),
      this.isOpeningSlide(e) &&
        (P(this.container, $e),
        !this.isCompact && this.option("idle") && this.setIdle()));
  }
  isCurrentSlide(e) {
    const t = this.getSlide();
    return !(!e || !t) && t.index === e.index;
  }
  isOpeningSlide(e) {
    var t, i;
    return (
      ((t = this.carousel) === null || t === void 0 ? void 0 : t.prevPage) ===
        null &&
      e &&
      e.index ===
        ((i = this.getSlide()) === null || i === void 0 ? void 0 : i.index)
    );
  }
  showLoading(e) {
    e.state = L.Loading;
    const t = e.el;
    t &&
      (w(t, wt),
      this.emit("loading", e),
      e.spinnerEl ||
        setTimeout(() => {
          if (!this.isClosing() && !e.spinnerEl && e.state === L.Loading) {
            let i = _(Ze);
            w(i, "fancybox-spinner"),
              (e.spinnerEl = i),
              t.prepend(i),
              this.animate(i, "f-fadeIn");
          }
        }, 250));
  }
  hideLoading(e) {
    const t = e.el;
    if (!t) return;
    const i = e.spinnerEl;
    this.isClosing()
      ? i?.remove()
      : (P(t, wt),
        i &&
          this.animate(i, "f-fadeOut", () => {
            i.remove();
          }),
        e.state === L.Loading && (this.emit("loaded", e), (e.state = L.Ready)));
  }
  setError(e, t) {
    if (this.isClosing()) return;
    const i = new Event("error", {
      bubbles: !0,
      cancelable: !0,
    });
    if ((this.emit("error", i, e), i.defaultPrevented)) return;
    (e.error = t), this.hideLoading(e), this.clearContent(e);
    const n = document.createElement("div");
    n.classList.add("fancybox-error"),
      (n.innerHTML = this.localize(t || "<p>{{ERROR}}</p>")),
      this.setContent(e, n);
  }
  clearContent(e) {
    if (e.state === void 0) return;
    this.emit("clearContent", e),
      e.contentEl && (e.contentEl.remove(), (e.contentEl = void 0));
    const t = e.el;
    t &&
      (P(t, "has-error"),
      P(t, "has-unknown"),
      P(t, `has-${e.type || "unknown"}`)),
      e.closeBtnEl && e.closeBtnEl.remove(),
      (e.closeBtnEl = void 0),
      e.captionEl && e.captionEl.remove(),
      (e.captionEl = void 0),
      e.spinnerEl && e.spinnerEl.remove(),
      (e.spinnerEl = void 0);
  }
  getSlide() {
    var e;
    const t = this.carousel;
    return (
      ((e = t?.pages[t?.page]) === null || e === void 0
        ? void 0
        : e.slides[0]) || void 0
    );
  }
  close(e, t) {
    if (this.isClosing()) return;
    const i = new Event("shouldClose", {
      bubbles: !0,
      cancelable: !0,
    });
    if ((this.emit("shouldClose", i, e), i.defaultPrevented)) return;
    e && e.cancelable && (e.preventDefault(), e.stopPropagation());
    const n = () => {
      this.proceedClose(e, t);
    };
    this.startedFs && D && D.isFullscreen()
      ? Promise.resolve(D.exit()).then(() => n())
      : n();
  }
  clearIdle() {
    this.idleTimer && clearTimeout(this.idleTimer), (this.idleTimer = null);
  }
  setIdle(e = !1) {
    const t = () => {
      this.clearIdle(),
        (this.idle = !0),
        w(this.container, "is-idle"),
        this.emit("setIdle");
    };
    if ((this.clearIdle(), !this.isClosing()))
      if (e) t();
      else {
        const i = this.option("idle");
        i && (this.idleTimer = setTimeout(t, i));
      }
  }
  endIdle() {
    this.clearIdle(),
      this.idle &&
        !this.isClosing() &&
        ((this.idle = !1), P(this.container, "is-idle"), this.emit("endIdle"));
  }
  resetIdle() {
    this.endIdle(), this.setIdle();
  }
  toggleIdle() {
    this.idle ? this.endIdle() : this.setIdle(!0);
  }
  toggleFullscreen() {
    D &&
      (D.isFullscreen()
        ? D.exit()
        : D.request().then(() => {
            this.startedFs = !0;
          }));
  }
  isClosing() {
    return [O.Closing, O.CustomClosing, O.Destroy].includes(this.state);
  }
  proceedClose(e, t) {
    var i, n;
    (this.state = O.Closing), this.clearIdle(), this.detachEvents();
    const s = this.container,
      o = this.carousel,
      a = this.getSlide(),
      l =
        a && this.option("placeFocusBack")
          ? a.triggerEl || this.option("triggerEl")
          : null;
    if (
      (l && (zt(l) ? rt(l) : l.focus()),
      s &&
        (P(s, $e),
        w(s, "is-closing"),
        s.setAttribute(Be, "true"),
        this.option("animated") && w(s, Ne),
        (s.style.pointerEvents = "none")),
      o)
    ) {
      o.clearTransitions(),
        (i = o.panzoom) === null || i === void 0 || i.destroy(),
        (n = o.plugins.Navigation) === null || n === void 0 || n.detach();
      for (const c of o.slides) {
        (c.state = L.Closing), this.hideLoading(c);
        const h = c.contentEl;
        h && this.stop(h);
        const u = c?.panzoom;
        u && (u.stop(), u.detachEvents(), u.detachObserver()),
          this.isCurrentSlide(c) || o.emit("removeSlide", c);
      }
    }
    (Ct = window.scrollX),
      (Tt = window.scrollY),
      window.addEventListener("scroll", this.onScroll),
      this.emit("close", e),
      this.state !== O.CustomClosing
        ? (t === void 0 && a && (t = this.optionFor(a, "hideClass")),
          t && a
            ? (this.animate(a.contentEl, t, () => {
                o && o.emit("removeSlide", a);
              }),
              setTimeout(() => {
                this.destroy();
              }, 500))
            : this.destroy())
        : setTimeout(() => {
            this.destroy();
          }, 500);
  }
  destroy() {
    var e;
    if (this.state === O.Destroy) return;
    window.removeEventListener("scroll", this.onScroll),
      (this.state = O.Destroy),
      (e = this.carousel) === null || e === void 0 || e.destroy();
    const t = this.container;
    t && t.remove(), re.delete(this.id);
    const i = S.getInstance();
    i
      ? i.focus()
      : (F && (F.remove(), (F = null)),
        K && (K.remove(), (K = null)),
        P(document.documentElement, mt),
        (() => {
          if (!de) return;
          const n = document,
            s = n.body;
          s.classList.remove(je),
            s.style.setProperty(bt, ""),
            n.documentElement.style.setProperty(vt, "");
        })(),
        this.emit("destroy"));
  }
  static bind(e, t, i) {
    if (!de) return;
    let n,
      s = "",
      o = {};
    if (
      (e === void 0
        ? (n = document.body)
        : Z(e)
        ? ((n = document.body), (s = e), typeof t == "object" && (o = t || {}))
        : ((n = e), Z(t) && (s = t), typeof i == "object" && (o = i || {})),
      !n || !z(n))
    )
      return;
    s = s || "[data-fancybox]";
    const a = S.openers.get(n) || new Map();
    a.set(s, o),
      S.openers.set(n, a),
      a.size === 1 && n.addEventListener("click", S.fromEvent);
  }
  static unbind(e, t) {
    let i,
      n = "";
    if (
      (Z(e) ? ((i = document.body), (n = e)) : ((i = e), Z(t) && (n = t)), !i)
    )
      return;
    const s = S.openers.get(i);
    s && n && s.delete(n),
      (n && s) ||
        (S.openers.delete(i), i.removeEventListener("click", S.fromEvent));
  }
  static destroy() {
    let e;
    for (; (e = S.getInstance()); ) e.destroy();
    for (const t of S.openers.keys())
      t.removeEventListener("click", S.fromEvent);
    S.openers = new Map();
  }
  static fromEvent(e) {
    if (
      e.defaultPrevented ||
      (e.button && e.button !== 0) ||
      e.ctrlKey ||
      e.metaKey ||
      e.shiftKey
    )
      return;
    let t = e.composedPath()[0];
    const i = t.closest("[data-fancybox-trigger]");
    if (i) {
      const f = i.dataset.fancyboxTrigger || "",
        g = document.querySelectorAll(`[data-fancybox="${f}"]`),
        m = parseInt(i.dataset.fancyboxIndex || "", 10) || 0;
      t = g[m] || t;
    }
    if (!(t && t instanceof Element)) return;
    let n, s, o, a;
    if (
      ([...S.openers].reverse().find(
        ([f, g]) =>
          !(
            !f.contains(t) ||
            ![...g].reverse().find(([m, v]) => {
              let y = t.closest(m);
              return !!y && ((n = f), (s = m), (o = y), (a = v), !0);
            })
          )
      ),
      !n || !s || !o)
    )
      return;
    (a = a || {}), e.preventDefault(), (t = o);
    let l = [],
      c = R({}, qe, a);
    (c.event = e), (c.triggerEl = t), (c.delegate = i);
    const h = c.groupAll,
      u = c.groupAttr,
      p = u && t ? t.getAttribute(`${u}`) : "";
    if (
      ((!t || p || h) && (l = [].slice.call(n.querySelectorAll(s))),
      t && !h && (l = p ? l.filter((f) => f.getAttribute(`${u}`) === p) : [t]),
      !l.length)
    )
      return;
    const d = S.getInstance();
    return d && d.options.triggerEl && l.indexOf(d.options.triggerEl) > -1
      ? void 0
      : (t && (c.startIndex = l.indexOf(t)), S.fromNodes(l, c));
  }
  static fromSelector(e, t, i) {
    let n = null,
      s = "",
      o = {};
    if (
      (Z(e)
        ? ((n = document.body), (s = e), typeof t == "object" && (o = t || {}))
        : e instanceof HTMLElement &&
          Z(t) &&
          ((n = e), (s = t), typeof i == "object" && (o = i || {})),
      !n || !s)
    )
      return !1;
    const a = S.openers.get(n);
    return (
      !!a &&
      ((o = R({}, a.get(s) || {}, o)),
      !!o && S.fromNodes(Array.from(n.querySelectorAll(s)), o))
    );
  }
  static fromNodes(e, t) {
    t = R({}, qe, t || {});
    const i = [];
    for (const n of e) {
      const s = n.dataset || {},
        o =
          s[ae] ||
          n.getAttribute(_e) ||
          n.getAttribute("currentSrc") ||
          n.getAttribute(ae) ||
          void 0;
      let a;
      const l = t.delegate;
      let c;
      l &&
        i.length === t.startIndex &&
        (a =
          l instanceof HTMLImageElement
            ? l
            : l.querySelector("img:not([aria-hidden])")),
        a ||
          (a =
            n instanceof HTMLImageElement
              ? n
              : n.querySelector("img:not([aria-hidden])")),
        a &&
          ((c = a.currentSrc || a[ae] || void 0),
          !c &&
            a.dataset &&
            (c = a.dataset.lazySrc || a.dataset[ae] || void 0));
      const h = {
        src: o,
        triggerEl: n,
        thumbEl: a,
        thumbElSrc: c,
        thumbSrc: c,
      };
      for (const u in s) {
        let p = s[u] + "";
        (p = p !== "false" && (p === "true" || p)), (h[u] = p);
      }
      i.push(h);
    }
    return new S(i, t);
  }
  static getInstance(e) {
    return e
      ? re.get(e)
      : Array.from(re.values())
          .reverse()
          .find((t) => !t.isClosing() && t) || null;
  }
  static getSlide() {
    var e;
    return (
      ((e = S.getInstance()) === null || e === void 0
        ? void 0
        : e.getSlide()) || null
    );
  }
  static show(e = [], t = {}) {
    return new S(e, t);
  }
  static next() {
    const e = S.getInstance();
    e && e.next();
  }
  static prev() {
    const e = S.getInstance();
    e && e.prev();
  }
  static close(e = !0, ...t) {
    if (e) for (const i of re.values()) i.close(...t);
    else {
      const i = S.getInstance();
      i && i.close(...t);
    }
  }
}
Object.defineProperty(S, "version", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: "5.0.36",
}),
  Object.defineProperty(S, "defaults", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: qe,
  }),
  Object.defineProperty(S, "Plugins", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: ci,
  }),
  Object.defineProperty(S, "openers", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: new Map(),
  });
export { S as O };
