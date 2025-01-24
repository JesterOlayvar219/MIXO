import { j as $ } from "../jsx-runtime.CDeAccHH.js";
import { r as E1 } from "./index.D2MAbzvX.js";
/* empty css                       */
import { r as p1 } from "./index.CrPmW2s9.js";
import { c as I1, a as D1 } from "../conversionPicker.ebs.BbfQ6pTo.js";
import { u as m1 } from "../useEbsState.DkCPYDF2.js";
import { c as g1 } from "../clsx.B-dksMZM.js";
import "../ebs.Bnp6cHqf.js";
var i1 = {},
  h1;
function j1() {
  if (h1) return i1;
  (h1 = 1),
    Object.defineProperty(i1, "__esModule", {
      value: !0,
    });
  var B = E1();
  function Q(t) {
    return Array.prototype.slice.call(t);
  }
  function K(t, n) {
    var e = Math.floor(t);
    return e === n || e + 1 === n ? t : n;
  }
  function Z() {
    return Date.now();
  }
  function U(t, n, e) {
    if (((n = "data-keen-slider-" + n), e === null))
      return t.removeAttribute(n);
    t.setAttribute(n, e || "");
  }
  function _(t, n) {
    return (
      (n = n || document),
      typeof t == "function" && (t = t(n)),
      Array.isArray(t)
        ? t
        : typeof t == "string"
        ? Q(n.querySelectorAll(t))
        : t instanceof HTMLElement
        ? [t]
        : t instanceof NodeList
        ? Q(t)
        : []
    );
  }
  function Y(t) {
    t.raw && (t = t.raw),
      t.cancelable && !t.defaultPrevented && t.preventDefault();
  }
  function G(t) {
    t.raw && (t = t.raw), t.stopPropagation && t.stopPropagation();
  }
  function s1() {
    var t = [];
    return {
      add: function (n, e, a, s) {
        n.addListener ? n.addListener(a) : n.addEventListener(e, a, s),
          t.push([n, e, a, s]);
      },
      input: function (n, e, a, s) {
        this.add(
          n,
          e,
          (function (o) {
            return function (i) {
              i.nativeEvent && (i = i.nativeEvent);
              var M = i.changedTouches || [],
                x = i.targetTouches || [],
                d = i.detail && i.detail.x ? i.detail : null;
              return o({
                id: d
                  ? d.identifier
                    ? d.identifier
                    : "i"
                  : x[0]
                  ? x[0]
                    ? x[0].identifier
                    : "e"
                  : "d",
                idChanged: d
                  ? d.identifier
                    ? d.identifier
                    : "i"
                  : M[0]
                  ? M[0]
                    ? M[0].identifier
                    : "e"
                  : "d",
                raw: i,
                x: d && d.x ? d.x : x[0] ? x[0].screenX : d ? d.x : i.pageX,
                y: d && d.y ? d.y : x[0] ? x[0].screenY : d ? d.y : i.pageY,
              });
            };
          })(a),
          s
        );
      },
      purge: function () {
        t.forEach(function (n) {
          n[0].removeListener
            ? n[0].removeListener(n[2])
            : n[0].removeEventListener(n[1], n[2], n[3]);
        }),
          (t = []);
      },
    };
  }
  function o1(t, n, e) {
    return Math.min(Math.max(t, n), e);
  }
  function J(t) {
    return (t > 0 ? 1 : 0) - (t < 0 ? 1 : 0) || +t;
  }
  function c1(t) {
    var n = t.getBoundingClientRect();
    return {
      height: K(n.height, t.offsetHeight),
      width: K(n.width, t.offsetWidth),
    };
  }
  function V(t, n, e, a) {
    var s = t && t[n];
    return s == null ? e : a && typeof s == "function" ? s() : s;
  }
  function F(t) {
    return Math.round(1e6 * t) / 1e6;
  }
  function u1(t, n) {
    if (t === n) return !0;
    var e = typeof t;
    if (e !== typeof n) return !1;
    if (e !== "object" || t === null || n === null)
      return e === "function" && t.toString() === n.toString();
    if (
      t.length !== n.length ||
      Object.getOwnPropertyNames(t).length !==
        Object.getOwnPropertyNames(n).length
    )
      return !1;
    for (var a in t) if (!u1(t[a], n[a])) return !1;
    return !0;
  }
  var t1 = function () {
    return (
      (t1 =
        Object.assign ||
        function (t) {
          for (var n, e = 1, a = arguments.length; e < a; e++)
            for (var s in (n = arguments[e]))
              Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
          return t;
        }),
      t1.apply(this, arguments)
    );
  };
  function l1(t, n, e) {
    for (var a, s = 0, o = n.length; s < o; s++)
      (!a && s in n) ||
        (a || (a = Array.prototype.slice.call(n, 0, s)), (a[s] = n[s]));
    return t.concat(a || Array.prototype.slice.call(n));
  }
  function w1(t) {
    var n, e, a, s, o, i;
    function M(C) {
      i || (i = C), x(!0);
      var T = C - i;
      T > a && (T = a);
      var p = s[e];
      if (p[3] < T) return e++, M(C);
      var k = p[2],
        E = p[4],
        m = p[0],
        g = p[1] * (0, p[5])(E === 0 ? 1 : (T - k) / E);
      if ((g && t.track.to(m + g), T < a)) return y();
      (i = null), x(!1), d(null), t.emit("animationEnded");
    }
    function x(C) {
      n.active = C;
    }
    function d(C) {
      n.targetIdx = C;
    }
    function y() {
      var C;
      (C = M), (o = window.requestAnimationFrame(C));
    }
    function L() {
      var C;
      (C = o),
        window.cancelAnimationFrame(C),
        x(!1),
        d(null),
        i && t.emit("animationStopped"),
        (i = null);
    }
    return (n = {
      active: !1,
      start: function (C) {
        if ((L(), t.track.details)) {
          var T = 0,
            p = t.track.details.position;
          (e = 0),
            (a = 0),
            (s = C.map(function (k) {
              var E,
                m = Number(p),
                g = (E = k.earlyExit) !== null && E !== void 0 ? E : k.duration,
                v = k.easing,
                P = k.distance * v(g / k.duration) || 0;
              p += P;
              var I = a;
              return (a += g), (T += P), [m, k.distance, I, a, k.duration, v];
            })),
            d(t.track.distToIdx(T)),
            y(),
            t.emit("animationStarted");
        }
      },
      stop: L,
      targetIdx: null,
    });
  }
  function x1(t) {
    var n,
      e,
      a,
      s,
      o,
      i,
      M,
      x,
      d,
      y,
      L,
      C,
      T,
      p,
      k = 1 / 0,
      E = [],
      m = null,
      g = 0;
    function v(f) {
      H(g + f);
    }
    function P(f) {
      var u = I(g + f).abs;
      return z(u) ? u : null;
    }
    function I(f) {
      var u = Math.floor(Math.abs(F(f / e))),
        r = F(((f % e) + e) % e);
      r === e && (r = 0);
      var w = J(f),
        l = M.indexOf(
          l1([], M).reduce(function (D, j) {
            return Math.abs(j - r) < Math.abs(D - r) ? j : D;
          })
        ),
        b = l;
      return (
        w < 0 && u++,
        l === i && ((b = 0), (u += w > 0 ? 1 : -1)),
        {
          abs: b + u * i * w,
          origin: l,
          rel: b,
        }
      );
    }
    function S(f, u, r) {
      var w;
      if (u || !q()) return c(f, r);
      if (!z(f)) return null;
      var l = I(r ?? g),
        b = l.abs,
        D = f - l.rel,
        j = b + D;
      w = c(j);
      var R = c(j - i * J(D));
      return (
        ((R !== null && Math.abs(R) < Math.abs(w)) || w === null) && (w = R),
        F(w)
      );
    }
    function c(f, u) {
      if ((u == null && (u = F(g)), !z(f) || f === null)) return null;
      f = Math.round(f);
      var r = I(u),
        w = r.abs,
        l = r.rel,
        b = r.origin,
        D = N(f),
        j = ((u % e) + e) % e,
        R = M[b],
        W = Math.floor((f - (w - l)) / i) * e;
      return F(R - j - R + M[D] + W + (b === i ? e : 0));
    }
    function z(f) {
      return A(f) === f;
    }
    function A(f) {
      return o1(f, d, y);
    }
    function q() {
      return s.loop;
    }
    function N(f) {
      return ((f % i) + i) % i;
    }
    function H(f) {
      var u;
      (u = f - g),
        E.push({
          distance: u,
          timestamp: Z(),
        }),
        E.length > 6 && (E = E.slice(-6)),
        (g = F(f));
      var r = h().abs;
      if (r !== m) {
        var w = m !== null;
        (m = r), w && t.emit("slideChanged");
      }
    }
    function h(f) {
      var u = f
        ? null
        : (function () {
            if (i) {
              var r = q(),
                w = r ? ((g % e) + e) % e : g,
                l = (r ? g % e : g) - o[0][2],
                b = 0 - (l < 0 && r ? e - Math.abs(l) : l),
                D = 0,
                j = I(g),
                R = j.abs,
                W = j.rel,
                n1 = o[W][2],
                r1 = o.map(function (X, y1) {
                  var O = b + D;
                  (O < 0 - X[0] || O > 1) &&
                    (O += (Math.abs(O) > e - 1 && r ? e : 0) * J(-O));
                  var d1 = y1 - W,
                    f1 = J(d1),
                    e1 = d1 + R;
                  r &&
                    (f1 === -1 && O > n1 && (e1 += i),
                    f1 === 1 && O < n1 && (e1 -= i),
                    L !== null && e1 < L && (O += e),
                    C !== null && e1 > C && (O -= e));
                  var v1 = O + X[0] + X[1],
                    T1 = Math.max(
                      O >= 0 && v1 <= 1
                        ? 1
                        : v1 < 0 || O > 1
                        ? 0
                        : O < 0
                        ? Math.min(1, (X[0] + O) / X[0])
                        : (1 - O) / X[0],
                      0
                    );
                  return (
                    (D += X[0] + X[1]),
                    {
                      abs: e1,
                      distance: s.rtl ? -1 * O + 1 - X[0] : O,
                      portion: T1,
                      size: X[0],
                    }
                  );
                });
              return (
                (R = A(R)),
                (W = N(R)),
                {
                  abs: A(R),
                  length: a,
                  max: p,
                  maxIdx: y,
                  min: T,
                  minIdx: d,
                  position: g,
                  progress: r ? w / e : g / a,
                  rel: W,
                  slides: r1,
                  slidesLength: e,
                }
              );
            }
          })();
      return (n.details = u), t.emit("detailsChanged"), u;
    }
    return (n = {
      absToRel: N,
      add: v,
      details: null,
      distToIdx: P,
      idxToDist: S,
      init: function (f) {
        if (
          ((function () {
            if (
              ((s = t.options),
              (o = (s.trackConfig || []).map(function (l) {
                return [V(l, "size", 1), V(l, "spacing", 0), V(l, "origin", 0)];
              })),
              (i = o.length))
            ) {
              e = F(
                o.reduce(function (l, b) {
                  return l + b[0] + b[1];
                }, 0)
              );
              var r,
                w = i - 1;
              (a = F(e + o[0][2] - o[w][0] - o[w][2] - o[w][1])),
                (M = o.reduce(function (l, b) {
                  if (!l) return [0];
                  var D = o[l.length - 1],
                    j = l[l.length - 1] + (D[0] + D[2]) + D[1];
                  return (
                    (j -= b[2]),
                    l[l.length - 1] > j && (j = l[l.length - 1]),
                    (j = F(j)),
                    l.push(j),
                    (!r || r < j) && (x = l.length - 1),
                    (r = j),
                    l
                  );
                }, null)),
                a === 0 && (x = 0),
                M.push(F(e));
            }
          })(),
          !i)
        )
          return h(!0);
        var u;
        (function () {
          var r = t.options.range,
            w = t.options.loop;
          (L = d = w ? V(w, "min", -1 / 0) : 0),
            (C = y = w ? V(w, "max", k) : x);
          var l = V(r, "min", null),
            b = V(r, "max", null);
          l !== null && (d = l),
            b !== null && (y = b),
            (T = d === -1 / 0 ? d : t.track.idxToDist(d || 0, !0, 0)),
            (p = y === k ? y : S(y, !0, 0)),
            b === null && (C = y),
            V(r, "align", !1) &&
              y !== k &&
              o[N(y)][2] === 0 &&
              ((p -= 1 - o[N(y)][0]), (y = P(p - g))),
            (T = F(T)),
            (p = F(p));
        })(),
          (u = f),
          Number(u) === u ? v(c(A(f))) : h();
      },
      to: H,
      velocity: function () {
        var f = Z(),
          u = E.reduce(
            function (r, w) {
              var l = w.distance,
                b = w.timestamp;
              return (
                f - b > 200 ||
                  (J(l) !== J(r.distance) &&
                    r.distance &&
                    (r = {
                      distance: 0,
                      lastTimestamp: 0,
                      time: 0,
                    }),
                  r.time && (r.distance += l),
                  r.lastTimestamp && (r.time += b - r.lastTimestamp),
                  (r.lastTimestamp = b)),
                r
              );
            },
            {
              distance: 0,
              lastTimestamp: 0,
              time: 0,
            }
          );
        return u.distance / u.time || 0;
      },
    });
  }
  function b1(t) {
    var n, e, a, s, o, i, M, x;
    function d(m) {
      return 2 * m;
    }
    function y(m) {
      return o1(m, M, x);
    }
    function L(m) {
      return 1 - Math.pow(1 - m, 3);
    }
    function C() {
      return a ? t.track.velocity() : 0;
    }
    function T() {
      E();
      var m = t.options.mode === "free-snap",
        g = t.track,
        v = C();
      s = J(v);
      var P = t.track.details,
        I = [];
      if (v || !m) {
        var S = p(v),
          c = S.dist,
          z = S.dur;
        if (((z = d(z)), (c *= s), m)) {
          var A = g.idxToDist(g.distToIdx(c), !0);
          A && (c = A);
        }
        I.push({
          distance: c,
          duration: z,
          easing: L,
        });
        var q = P.position,
          N = q + c;
        if (N < o || N > i) {
          var H = N < o ? o - q : i - q,
            h = 0,
            f = v;
          if (J(H) === s) {
            var u = Math.min(Math.abs(H) / Math.abs(c), 1),
              r =
                (function (b) {
                  return 1 - Math.pow(1 - b, 1 / 3);
                })(u) * z;
            (I[0].earlyExit = r), (f = v * (1 - u));
          } else (I[0].earlyExit = 0), (h += H);
          var w = p(f, 100),
            l = w.dist * s;
          t.options.rubberband &&
            (I.push({
              distance: l,
              duration: d(w.dur),
              easing: L,
            }),
            I.push({
              distance: -l + h,
              duration: 500,
              easing: L,
            }));
        }
        t.animator.start(I);
      } else
        t.moveToIdx(y(P.abs), !0, {
          duration: 500,
          easing: function (b) {
            return 1 + --b * b * b * b * b;
          },
        });
    }
    function p(m, g) {
      g === void 0 && (g = 1e3);
      var v = 147e-9 + (m = Math.abs(m)) / g;
      return {
        dist: Math.pow(m, 2) / v,
        dur: m / v,
      };
    }
    function k() {
      var m = t.track.details;
      m && ((o = m.min), (i = m.max), (M = m.minIdx), (x = m.maxIdx));
    }
    function E() {
      t.animator.stop();
    }
    t.on("updated", k),
      t.on("optionsChanged", k),
      t.on("created", k),
      t.on("dragStarted", function () {
        (a = !1), E(), (n = e = t.track.details.abs);
      }),
      t.on("dragChecked", function () {
        a = !0;
      }),
      t.on("dragEnded", function () {
        var m = t.options.mode;
        m === "snap" &&
          (function () {
            var g = t.track,
              v = t.track.details,
              P = v.position,
              I = J(C());
            (P > i || P < o) && (I = 0);
            var S = n + I;
            v.slides[g.absToRel(S)].portion === 0 && (S -= I),
              n !== e && (S = e),
              J(g.idxToDist(S, !0)) !== I && (S += I),
              (S = y(S));
            var c = g.idxToDist(S, !0);
            t.animator.start([
              {
                distance: c,
                duration: 500,
                easing: function (z) {
                  return 1 + --z * z * z * z * z;
                },
              },
            ]);
          })(),
          (m !== "free" && m !== "free-snap") || T();
      }),
      t.on("dragged", function () {
        e = t.track.details.abs;
      });
  }
  function M1(t) {
    var n,
      e,
      a,
      s,
      o,
      i,
      M,
      x,
      d,
      y,
      L,
      C,
      T,
      p,
      k,
      E,
      m,
      g,
      v = s1();
    function P(h) {
      if (i && x === h.id) {
        var f = z(h);
        if (d) {
          if (!c(h)) return S(h);
          (y = f), (d = !1), t.emit("dragChecked");
        }
        if (E) return (y = f);
        Y(h);
        var u = (function (w) {
          if (m === -1 / 0 && g === 1 / 0) return w;
          var l = t.track.details,
            b = l.length,
            D = l.position,
            j = o1(w, m - D, g - D);
          if (b === 0) return 0;
          if (!t.options.rubberband) return j;
          if ((D <= g && D >= m) || (D < m && e > 0) || (D > g && e < 0))
            return w;
          var R = (D < m ? D - m : D - g) / b,
            W = s * b,
            n1 = Math.abs(R * W),
            r1 = Math.max(0, 1 - (n1 / o) * 2);
          return r1 * r1 * w;
        })((M(y - f) / s) * a);
        e = J(u);
        var r = t.track.details.position;
        ((r > m && r < g) || (r === m && e > 0) || (r === g && e < 0)) && G(h),
          (L += u),
          !C && Math.abs(L * s) > 5 && (C = !0),
          t.track.add(u),
          (y = f),
          t.emit("dragged");
      }
    }
    function I(h) {
      !i &&
        t.track.details &&
        t.track.details.length &&
        ((L = 0),
        (i = !0),
        (C = !1),
        (d = !0),
        (x = h.id),
        c(h),
        (y = z(h)),
        t.emit("dragStarted"));
    }
    function S(h) {
      i && x === h.idChanged && ((i = !1), t.emit("dragEnded"));
    }
    function c(h) {
      var f = A(),
        u = f ? h.y : h.x,
        r = f ? h.x : h.y,
        w = T !== void 0 && p !== void 0 && Math.abs(p - r) <= Math.abs(T - u);
      return (T = u), (p = r), w;
    }
    function z(h) {
      return A() ? h.y : h.x;
    }
    function A() {
      return t.options.vertical;
    }
    function q() {
      (s = t.size), (o = A() ? window.innerHeight : window.innerWidth);
      var h = t.track.details;
      h && ((m = h.min), (g = h.max));
    }
    function N(h) {
      C && (G(h), Y(h));
    }
    function H() {
      if ((v.purge(), t.options.drag && !t.options.disabled)) {
        var h;
        (h = t.options.dragSpeed || 1),
          (M =
            typeof h == "function"
              ? h
              : function (u) {
                  return u * h;
                }),
          (a = t.options.rtl ? -1 : 1),
          q(),
          (n = t.container),
          (function () {
            var u = "data-keen-slider-clickable";
            _("[".concat(u, "]:not([").concat(u, "=false])"), n).map(function (
              r
            ) {
              v.add(r, "dragstart", G),
                v.add(r, "mousedown", G),
                v.add(r, "touchstart", G);
            });
          })(),
          v.add(n, "dragstart", function (u) {
            Y(u);
          }),
          v.add(n, "click", N, {
            capture: !0,
          }),
          v.input(n, "ksDragStart", I),
          v.input(n, "ksDrag", P),
          v.input(n, "ksDragEnd", S),
          v.input(n, "mousedown", I),
          v.input(n, "mousemove", P),
          v.input(n, "mouseleave", S),
          v.input(n, "mouseup", S),
          v.input(n, "touchstart", I, {
            passive: !0,
          }),
          v.input(n, "touchmove", P, {
            passive: !1,
          }),
          v.input(n, "touchend", S),
          v.input(n, "touchcancel", S),
          v.add(window, "wheel", function (u) {
            i && Y(u);
          });
        var f = "data-keen-slider-scrollable";
        _("[".concat(f, "]:not([").concat(f, "=false])"), t.container).map(
          function (u) {
            return (function (r) {
              var w;
              v.input(
                r,
                "touchstart",
                function (l) {
                  (w = z(l)), (E = !0), (k = !0);
                },
                {
                  passive: !0,
                }
              ),
                v.input(r, "touchmove", function (l) {
                  var b = A(),
                    D = b
                      ? r.scrollHeight - r.clientHeight
                      : r.scrollWidth - r.clientWidth,
                    j = w - z(l),
                    R = b ? r.scrollTop : r.scrollLeft,
                    W =
                      (b && r.style.overflowY === "scroll") ||
                      (!b && r.style.overflowX === "scroll");
                  if (
                    ((w = z(l)),
                    ((j < 0 && R > 0) || (j > 0 && R < D)) && k && W)
                  )
                    return (E = !0);
                  (k = !1), Y(l), (E = !1);
                }),
                v.input(r, "touchend", function () {
                  E = !1;
                });
            })(u);
          }
        );
      }
    }
    t.on("updated", q),
      t.on("optionsChanged", H),
      t.on("created", H),
      t.on("destroyed", v.purge);
  }
  function z1(t) {
    var n,
      e,
      a = null;
    function s(T, p, k) {
      t.animator.active
        ? i(T, p, k)
        : requestAnimationFrame(function () {
            return i(T, p, k);
          });
    }
    function o() {
      s(!1, !1, e);
    }
    function i(T, p, k) {
      var E = 0,
        m = t.size,
        g = t.track.details;
      if (g && n) {
        var v = g.slides;
        n.forEach(function (P, I) {
          if (T) !a && p && x(P, null, k), d(P, null, k);
          else {
            if (!v[I]) return;
            var S = v[I].size * m;
            !a && p && x(P, S, k), d(P, v[I].distance * m - E, k), (E += S);
          }
        });
      }
    }
    function M(T) {
      return t.options.renderMode === "performance" ? Math.round(T) : T;
    }
    function x(T, p, k) {
      var E = k ? "height" : "width";
      p !== null && (p = M(p) + "px"),
        (T.style["min-" + E] = p),
        (T.style["max-" + E] = p);
    }
    function d(T, p, k) {
      if (p !== null) {
        p = M(p);
        var E = k ? p : 0;
        p = "translate3d(".concat(k ? 0 : p, "px, ").concat(E, "px, 0)");
      }
      (T.style.transform = p), (T.style["-webkit-transform"] = p);
    }
    function y() {
      n && (i(!0, !0, e), (n = null)), t.on("detailsChanged", o, !0);
    }
    function L() {
      s(!1, !0, e);
    }
    function C() {
      y(),
        (e = t.options.vertical),
        t.options.disabled ||
          t.options.renderMode === "custom" ||
          ((a = V(t.options.slides, "perView", null) === "auto"),
          t.on("detailsChanged", o),
          (n = t.slides).length && L());
    }
    t.on("created", C),
      t.on("optionsChanged", C),
      t.on("beforeOptionsChanged", function () {
        y();
      }),
      t.on("updated", L),
      t.on("destroyed", y);
  }
  function C1(t, n) {
    return function (e) {
      var a,
        s,
        o,
        i,
        M,
        x = s1();
      function d(c) {
        var z;
        U(
          e.container,
          "reverse",
          ((z = e.container),
          window.getComputedStyle(z, null).getPropertyValue("direction") !==
            "rtl" || c
            ? null
            : "")
        ),
          U(e.container, "v", e.options.vertical && !c ? "" : null),
          U(e.container, "disabled", e.options.disabled && !c ? "" : null);
      }
      function y() {
        L() && E();
      }
      function L() {
        var c = null;
        if (
          (i.forEach(function (A) {
            A.matches && (c = A.__media);
          }),
          c === a)
        )
          return !1;
        a || e.emit("beforeOptionsChanged"), (a = c);
        var z = c ? o.breakpoints[c] : o;
        return (e.options = t1(t1({}, o), z)), d(), I(), S(), g(), !0;
      }
      function C(c) {
        var z = c1(c);
        return (e.options.vertical ? z.height : z.width) / e.size || 1;
      }
      function T() {
        return e.options.trackConfig.length;
      }
      function p(c) {
        for (var z in ((a = !1),
        (o = t1(t1({}, n), c)),
        x.purge(),
        (s = e.size),
        (i = []),
        o.breakpoints || [])) {
          var A = window.matchMedia(z);
          (A.__media = z), i.push(A), x.add(A, "change", y);
        }
        x.add(window, "orientationchange", P), x.add(window, "resize", v), L();
      }
      function k(c) {
        e.animator.stop();
        var z = e.track.details;
        e.track.init(c ?? (z ? z.abs : 0));
      }
      function E(c) {
        k(c), e.emit("optionsChanged");
      }
      function m(c, z) {
        if (c) return p(c), void E(z);
        I(), S();
        var A = T();
        g(), T() !== A ? E(z) : k(z), e.emit("updated");
      }
      function g() {
        var c = e.options.slides;
        if (typeof c == "function")
          return (e.options.trackConfig = c(e.size, e.slides));
        for (
          var z = e.slides,
            A = z.length,
            q = typeof c == "number" ? c : V(c, "number", A, !0),
            N = [],
            H = V(c, "perView", 1, !0),
            h = V(c, "spacing", 0, !0) / e.size || 0,
            f = H === "auto" ? h : h / H,
            u = V(c, "origin", "auto"),
            r = 0,
            w = 0;
          w < q;
          w++
        ) {
          var l = H === "auto" ? C(z[w]) : 1 / H - h + f,
            b = u === "center" ? 0.5 - l / 2 : u === "auto" ? 0 : u;
          N.push({
            origin: b,
            size: l,
            spacing: h,
          }),
            (r += l);
        }
        if (((r += h * (q - 1)), u === "auto" && !e.options.loop && H !== 1)) {
          var D = 0;
          N.map(function (j) {
            var R = r - D;
            return (
              (D += j.size + h),
              R >= 1 || (j.origin = 1 - R - (r > 1 ? 0 : 1 - r)),
              j
            );
          });
        }
        e.options.trackConfig = N;
      }
      function v() {
        I();
        var c = e.size;
        e.options.disabled || c === s || ((s = c), m());
      }
      function P() {
        v(), setTimeout(v, 500), setTimeout(v, 2e3);
      }
      function I() {
        var c = c1(e.container);
        e.size = (e.options.vertical ? c.height : c.width) || 1;
      }
      function S() {
        e.slides = _(e.options.selector, e.container);
      }
      (e.container = (M = _(t, document)).length ? M[0] : null),
        (e.destroy = function () {
          x.purge(), e.emit("destroyed"), d(!0);
        }),
        (e.prev = function () {
          e.moveToIdx(e.track.details.abs - 1, !0);
        }),
        (e.next = function () {
          e.moveToIdx(e.track.details.abs + 1, !0);
        }),
        (e.update = m),
        p(e.options);
    };
  }
  var k1 = function (t, n, e) {
    try {
      return (function (a, s) {
        var o,
          i = {};
        return (
          (o = {
            emit: function (M) {
              i[M] &&
                i[M].forEach(function (d) {
                  d(o);
                });
              var x = o.options && o.options[M];
              x && x(o);
            },
            moveToIdx: function (M, x, d) {
              var y = o.track.idxToDist(M, x);
              if (y) {
                var L = o.options.defaultAnimation;
                o.animator.start([
                  {
                    distance: y,
                    duration: V(d || L, "duration", 500),
                    easing: V(d || L, "easing", function (C) {
                      return 1 + --C * C * C * C * C;
                    }),
                  },
                ]);
              }
            },
            on: function (M, x, d) {
              d === void 0 && (d = !1), i[M] || (i[M] = []);
              var y = i[M].indexOf(x);
              y > -1 ? d && delete i[M][y] : d || i[M].push(x);
            },
            options: a,
          }),
          (function () {
            if (((o.track = x1(o)), (o.animator = w1(o)), s))
              for (var M = 0, x = s; M < x.length; M++) (0, x[M])(o);
            o.track.init(o.options.initial || 0), o.emit("created");
          })(),
          o
        );
      })(
        n,
        l1(
          [
            C1(t, {
              drag: !0,
              mode: "snap",
              renderMode: "precision",
              rubberband: !0,
              selector: ".keen-slider__slide",
            }),
            z1,
            M1,
            b1,
          ],
          e || [],
          !0
        )
      );
    } catch (a) {
      console.error(a);
    }
  };
  return (
    (i1.useKeenSlider = function (t, n) {
      var e = B.useRef(null),
        a = B.useRef(!1),
        s = B.useRef(t),
        o = B.useCallback(function (i) {
          i
            ? ((s.current = t), (e.current = new k1(i, t, n)), (a.current = !1))
            : (e.current && e.current.destroy && e.current.destroy(),
              (e.current = null));
        }, []);
      return (
        B.useEffect(
          function () {
            u1(s.current, t) ||
              ((s.current = t), e.current && e.current.update(s.current));
          },
          [t]
        ),
        [o, e]
      );
    }),
    i1
  );
}
var S1 = j1();
const _1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" width="100%" version="1.0">
  <path
    d="M61.5 2.4c-15.8 3.1-27.6 9.4-39 21C8.5 37.6 1.8 53.9 1.9 74c0 33.2 19.8 60.1 51.6 70.2 8.7 2.8 25 3.5 34.7 1.5 31.9-6.6 54.3-31.4 57.7-63.8.6-5.8.9-11.2.7-12-.3-.8-.7-3.9-1-6.9-2.1-21.4-20.5-46-41.3-55.2-13-5.7-30.2-7.8-42.8-5.4zM83 48.7c19 6.1 24.2 32 9.2 45.5-5.8 5.2-10.5 7.1-18.2 7.1-10.4 0-18.2-4.7-23.8-14.2-2.3-4-2.7-5.7-2.7-12.6 0-7.1.4-8.6 3.1-13.5C57.1 49.4 70 44.5 83 48.7z" />
  <path
    d="M70.9 58.9c-2.2 1.8-2.3 2.1-.8 3.6 2.2 2.3 6.2.4 5.7-2.7-.4-2.9-2.1-3.2-4.9-.9zM76 66.5c-1.6 1.9-.6 4.5 1.8 4.5 2.5 0 4.6-2.5 3.8-4.5-.7-1.9-4-1.9-5.6 0zM66.2 72.7c-1.2 2.4-.4 4.3 1.7 4.3 2.2 0 4.1-1.9 4.1-4.2 0-2.4-4.6-2.4-5.8-.1zM82.3 72.7c-1.5.6-1.7 4.9-.3 5.8 1.5 1 5-1.4 5-3.4 0-1.5-2.3-3.5-3.3-3-.1 0-.8.3-1.4.6zM71.7 79.7c-1 1-.8 4.1.3 4.8 2 1.2 5-.6 5-3.1 0-1.8-.5-2.4-2.3-2.4-1.3 0-2.7.3-3 .7zM62 87c-1.3 2.4-.5 4 1.9 4s4.5-2.5 3.7-4.5c-.8-2.2-4.3-1.8-5.6.5z" />
</svg>`,
  L1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" width="100%" version="1.0">
  <path
    d="M59 2.6c-15.2 3.1-31.5 12.9-41.4 25C-15 67.2 2.5 127.3 51.5 143.7c7.2 2.5 9.4 2.7 22 2.7 12.5 0 14.9-.3 22-2.7 19.9-6.7 35-19.9 43.7-38.4 5.3-11.3 7.1-21 6.6-34.8-1-23.7-12.3-43.7-32.2-57C97.8 3 77.1-1.1 59 2.6zm37.3 4.9c21.1 7.4 38 25.2 44.8 47.5 1.9 5.9 2.3 9.8 2.3 18.5 0 13.4-1.3 19.3-6.9 31-9.2 18.9-23.6 31.2-44.5 37.7-5.9 1.8-9.7 2.3-18 2.3-19.2-.1-34.7-6.4-48.4-19.5-12.7-12.2-18.4-23.3-21.2-40.9C3.1 75.5 3 72.5 4 65.7c4.3-30 23.8-51.9 53.5-60.3 3.5-1 8.9-1.3 18-1 11 .3 14.2.8 20.8 3.1z" />
  <path
    d="M60.7 12.1c-7.8 1.8-7.8 1.9-7.1 11.8.7 9.9 1.1 9.1-8.5 16.5-9.1 7.1-14.3 15-15.5 24.1-1.1 7.7-1.4 8.3-5.4 9.5-6.5 2.1-8.2 3.7-8.2 7.6 0 7.9 2.7 8.9 13.4 4.9 9.2-3.5 12.1-3.2 21.3 1.6 13.9 7.4 15.4 8 21.2 9.1 3.1.6 6.2 1.2 6.9 1.4 2.1.6 1.3 3.4-1.3 4.6-3.6 1.6-12.7-1.1-25.4-7.8-11.8-6.1-14.9-6.6-23.5-3.4-10.7 4.1-13 8.3-8.4 15.9C22.8 112.3 31 121 32.5 121c.6 0 3.8-2 6.9-4.5 6.8-5.3 9.1-5.5 16.9-2 3 1.4 8.8 3.2 12.7 3.9 7.7 1.5 10.9 1.1 21.9-2.8l4.4-1.6 3.8 3.5c2.4 2.2 4.9 3.5 6.6 3.5 2.8 0 8.3-4.4 8.3-6.6 0-.7-3-3.8-6.6-7-9.1-8-9.7-9.4-10.5-25.4-.4-8.9-1.2-15-2.4-18-3-8.1-3.1-9.2-.4-8.8 5.4.7 8.9 13.7 8.9 33.1v7.8l4.4 4.3c5.1 5.2 8.3 7.4 12.2 8.5 4.4 1.2 7.1-.3 9.7-5.6 2.4-4.6 5.7-14.5 5.7-16.7 0-.6-3.2-2.4-7.1-4-8.4-3.5-10-5.5-11.1-14.5-.4-3.6-1.8-9.5-3-13.1-1.9-5.5-3.4-7.6-9.4-13.3l-7.1-6.9.9-4.6c1.3-7 .5-8.8-4.8-10.8-4.5-1.7-4.7-1.7-6 .1-.8 1-1.6 3.5-1.9 5.4-1.1 7.3-2.6 12.7-4.4 15.1-1.8 2.5-7 6.4-18.1 13.3-3.4 2.2-7.7 6.1-9.8 8.8-3.9 5.3-7.2 6.5-7.2 2.6 0-5.3 7.2-12.5 20.2-20.3 11.2-6.6 12.9-9 14.3-20.1.9-7.1 0-10.8-3.1-12.2-2.9-1.3-11.2-1.3-16.7 0zM80.9 63c5.6 3 7.7 11.8 4.1 17.7-5.5 9-16.8 9.3-22.7.4-8-11.9 5.6-25.1 18.6-18.1z" />
</svg>`,
  A1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 142 129" width="100%" version="1.0">
  <path
    d="M81.4 2.8c-1.2 1-2.6 2.7-3.1 3.7-1.2 2.2-36.5 94-39.4 102.4-2.2 6.3-2.4 10-.7 13.6 2.2 4.9 9.6 6.9 15.3 4.3 3.4-1.5 6.2-7.7 18-39.3C76.8 73.2 85.2 51 90.1 38.3c10.2-26.6 10.6-29.2 5.6-34.1C93 1.6 91.6 1 88 1c-2.8.1-5.3.7-6.6 1.8zM124.3 14c-3.2 1.3-4.6 3.9-11.3 22-3.4 9.1-10.2 27.1-15.2 40-5 12.9-9.3 25.6-9.6 28.2-.4 4.4-.2 5 3.2 8.4 3.4 3.4 4 3.6 8.2 3.1 3-.3 5.5-1.3 7-2.8 2.8-2.9 33.4-82.2 34.2-88.6.4-3.8.1-4.6-3.1-7.8-2.8-2.8-4.2-3.5-7.3-3.4-2.2 0-4.9.4-6.1.9zM25.2 29.5c-1.6 1.3-3.7 4.6-4.7 7.2-1 2.6-5.8 15.3-10.6 28C.5 89.3-.6 94.5 2.8 98.6c4.9 6.1 14.8 5.9 18.4-.4 3.4-5.9 21.9-56.6 22-60.2 0-4.7-1.5-7.6-5.2-9.5-4.4-2.3-9.4-1.9-12.8 1z" />
</svg>`,
  P1 = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 147 147" version="1.0">
  <path
    d="M66 .7C35.2 4.2 10.5 25.9 2.8 56.2 1.1 62.9.9 66.4 1.3 75.9c.5 12.8 2.1 19.8 6.7 29.3 14.3 30 48.1 46.4 81.4 39.3 19.8-4.2 38.3-18.7 48.3-38 6.2-11.9 7.7-18.7 7.7-34-.1-11.9-.3-13.8-3.1-21.8-3.9-11.2-8.2-18.4-16.2-26.9-11.6-12.4-25.8-19.9-42.6-22.4C74.6 0 72.7 0 66 .7zm12 70.5c1.6 3 .9 5.2-2.3 7.2-2.3 1.5-7.1-1.2-7.5-4.3-.9-5.8 6.9-8.1 9.8-2.9z" />
</svg>`,
  R1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 155" width="100%" version="1.0">
  <path
    d="M49.5 2.2c-2.7.5-8.6 2.7-13.1 4.8-14 6.7-25.5 21.8-28.4 36.9-.5 2.9-1 11.7-1 19.4 0 14 0 14.1-2.7 17l-2.8 2.8-.3 17.5c-.3 14.7-.1 17.9 1.3 20 .8 1.3 2.2 2.4 3 2.4.8 0 1.5.6 1.5 1.4 0 .7 1.2 2.5 2.6 4 3.3 3.2 9 3.5 12.5.7l2.4-1.9.5-40.4.5-40.3 3.3-6.7c4-8.2 11.1-14.9 19-17.8 7.8-3 20.5-2.6 27.5.8 6.3 3.2 12.9 9.8 16.3 16.3 2.6 5.1 2.8 6.5 3.6 23.9.4 10.2.5 27.3.1 38.1-.6 21 0 25.6 4 28.4 3.3 2.3 9 1.9 11.5-.8 1.2-1.3 2.2-2.7 2.2-3.1 0-.4 1.4-2.1 3.1-3.7l3-2.8-.3-17.9c-.3-17.8-.3-17.8-3-21.1-2.8-3.2-2.8-3.3-2.8-19 0-11.5-.4-17.2-1.6-21.2C103.5 13.1 77.1-3 49.5 2.2z" />
  <path
    d="M53.6 45.1 51 48.2v40.7c0 30.3.3 41 1.2 41.9 1.6 1.6 14 1.6 15.6 0 .9-.9 1.2-11.7 1.2-42.5V46.9l-2.5-2.4c-3.7-3.8-9.5-3.5-12.9.6zM78.8 72.9c-5.6 2.8-5.8 3.6-5.8 38.3 0 30.5.1 31.9 2 33.8 1.5 1.5 3.3 2 7.1 2 9.6 0 8.9 2.7 8.9-36.4V76.3l-2.2-2c-3.3-2.9-6.2-3.3-10-1.4zM33.2 72.7c-.7.3-1.9 1.8-2.7 3.3-1.2 2.4-1.5 8.7-1.5 35.3 0 37.4-.4 35.7 9.2 35.7 9.2 0 8.8 1.6 8.8-36.9V76.9l-2.5-2.4c-2.3-2.4-7.7-3.3-11.3-1.8z" />
</svg>`,
  O1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 133 35" width="100%" version="1.0">
  <path
    d="M.5 2.2C.2 3 .1 10.3.2 18.5l.3 15 3.8.3 3.7.3v-8.5c0-4.9.4-8.6 1-8.6.5 0 2.7 2.7 5 5.9 2.2 3.3 4.4 6.2 4.9 6.5.5.3 3.1-2.6 5.7-6.5l4.9-7.1.5 8.8.5 8.9 3.4.3c2 .2 3.7-.2 4.2-1 1-1.5 1.2-24.1.3-28.7-.6-2.9-.9-3.1-4.8-3.1-4.1.1-4.2.1-9 8.1-3.5 5.9-5.1 7.8-5.9 7-.6-.6-3-4.2-5.2-7.9-3.9-6.4-4.2-6.7-8.3-7-2.8-.2-4.4.1-4.7 1zM43 17.5C43 33.9 43 34 45.3 34c1.2 0 2.8-.4 3.5-.9 1.9-1.1 2.6-10.9 1.7-22.5L49.8 1H43v16.5zM56.5 2c-.3.6 1.6 4.2 4.4 8.1l5 7.1-5 7.5c-2.8 4.1-4.9 7.7-4.6 7.9.2.3 2.1.7 4 1.1 3.4.5 3.8.3 6.8-4.1 3.6-5 4.3-5 8 1 1.9 3.1 2.5 3.4 6.8 3.4 4.5 0 4.9-.3 8-4.5 1.8-2.5 3.3-4.5 3.5-4.5.1 0 1.7 2 3.5 4.5 3 4.2 3.5 4.5 7.9 4.5s4.9-.3 7.2-4c1.4-2.2 3-4 3.7-4 .7 0 2.5 1.8 3.9 4 2.5 3.8 3 4 7.6 4h4.9l-5.5-7.9c-3.1-4.3-5.6-8.2-5.6-8.6 0-.4 2.5-4.2 5.4-8.6l5.5-7.9h-4.8c-4.5 0-5 .3-7.5 4-1.4 2.2-3.2 4-3.9 4-.7 0-2.3-1.8-3.7-4-2.3-3.7-2.8-4-7.2-4s-4.9.3-7.9 4.5C95.1 8 93.5 10 93.4 10c-.2 0-1.7-2-3.4-4.5C87.1 1.2 86.7 1 82.1 1c-4.5 0-4.9.2-8 4.5C72.3 8 70.7 10 70.5 10c-.2 0-1.6-2-3.2-4.5-2.5-4-3.2-4.5-6.5-4.5-2 0-4 .5-4.3 1zM108 12.5c3.3 4.9 3.3 5.5-1.3 11.7l-2.1 2.8-3.3-4.7c-3.6-5.1-3.7-4 1.3-11.8.9-1.4 1.8-2.5 2-2.5.2 0 1.7 2 3.4 4.5zm-22.5.2c1.4 2.1 2.5 4.2 2.5 4.8 0 1.5-4.9 8.5-6 8.5-.5 0-2.2-1.9-3.8-4.2l-3-4.3 3-4.2C79.8 10.9 81.5 9 82 9s2.1 1.7 3.5 3.7z" />
</svg>`,
  B1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 155" width="100%" version="1.0">
  <path
    d="M60.5 2.4C36.9 7.1 18.9 21 8.5 42.5.9 58.3-.9 74.3 3 90.7c6.5 27.2 27.1 47.8 54.2 54.3 36.3 8.7 73.4-12.4 85.5-48.5 2.4-7.2 2.7-9.5 2.7-22.5 0-13.7-.2-15-3.1-23.3-6.9-19.5-19-33.1-37.8-42.4-12.4-6.2-30.3-8.6-44-5.9zm17.7 11.3c1.6 1.4 1.8 3.4 1.8 16.9 0 12.5.3 15.5 1.6 16.8 2 2 3.3 2 5.6-.1 1.3-1.2 1.8-3.1 1.8-7.1 0-5.9 1.8-9.2 5.1-9.2 4 0 4.9 3.5 4.9 20.2 0 14.7.1 15.8 2 16.8 1.4.8 2.6.8 4 0 1.8-.9 2-2.1 2-9.4 0-9.6 1.2-11.7 5.5-9.8L115 50l-.2 24.1c-.3 21.8-.5 24.3-2 25.3-1.3.8-2.3.8-3.5 0-1.4-.9-1.9-2.7-2.1-8-.4-11.1-1.6-13.4-6.3-11.9-1.8.6-1.9 1.9-1.9 17.2 0 17.9-.6 20.3-5.5 20.3-3.4 0-4.5-2-4.5-8.3 0-3.2-.5-6.7-1-7.8-1.4-2.5-5.6-2.5-7 0-.5 1.1-1 8.5-1 17v15l-2.6 2c-3.4 2.7-5 2.6-7.9-.4-2.4-2.3-2.5-2.8-2.5-17.8C67 101 66.5 99 62.9 99c-3.4 0-4.9 2.8-4.9 9.4 0 6.6-1.1 8.6-4.5 8.6-4.1 0-4.5-1.6-4.5-18.5 0-18-.6-20.3-5.3-19.1-2.6.6-2.7.9-2.7 7 0 9.5-.8 12.5-3.6 13.2-5.2 1.3-5.4.1-5.4-25.7 0-22.8.1-23.9 2-24.9 2.6-1.4 5.8.2 6.5 3.3.3 1.2.6 5.1.7 8.7.3 5.9.5 6.5 2.6 6.8 4.7.7 5.2-.9 5.2-17.5 0-8.7.4-16.3 1-17.4 1.2-2.1 5-2.5 6.8-.7.7.7 1.2 3.8 1.2 7 0 4.5.5 6.3 2 7.8 2.3 2.3 3 2.4 5.3.7 1.3-1 1.6-3.7 1.9-16.8.2-11.4.7-16 1.7-17.2 1.7-2.2 6.9-2.2 9.3 0zm52.6 53.1c.6.9 1.2 4.2 1.2 7.4 0 6.3-2.4 10.2-5.8 9.6-1.4-.3-1.8-1.8-2-8.7-.2-5 .2-8.8.8-9.6 1.3-1.6 3.9-.9 5.8 1.3zm-107 6.8c.3 9.4-.9 11.6-5.3 9.6-2.4-1.1-2.5-1.6-2.5-9 0-4.3.3-8.2.7-8.6.4-.4 2.1-.6 3.8-.4l3 .3.3 8.1z" />
  <path d="M70.9 69.4C66 71.8 68.1 80 73.6 80c3.1 0 5.4-2.6 5.4-5.9 0-4.4-4.1-6.7-8.1-4.7z" />
</svg>`,
  V1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 145" width="100%" version="1.0">
  <path
    d="M32 17C16.9 25.7 3.5 34.1 2.2 35.6l-2.3 2.6.3 34.4.3 34.4 2.5 2.4c2.8 2.8 51.3 31.1 57.1 33.4 3.6 1.4 4.1 1.3 8.7-1.1 14.7-7.7 52.1-30.2 54.5-32.7l2.7-3V38l-2.7-2.9c-1.6-1.6-15-10-29.9-18.5C73 4.9 65.4 1 62.9 1S52.5 5.1 32 17zm39.4 6c3.8.6 9.8 2.4 13.3 4.1 6.4 3 19.3 14 19.3 16.4C104 44.6 83.8 57 82.2 57c-.4 0-2.5-1.4-4.7-3.1-2.2-1.6-6.3-3.7-9.1-4.5-6.6-1.9-12.8-.5-19.1 4.3-2.5 1.9-5 3.3-5.7 3.1-.6-.2-5.5-2.8-10.9-5.8-7-4-9.7-6-9.7-7.5 0-3 10.8-12.6 18.5-16.4 9.5-4.7 17.8-5.8 29.9-4.1zm39.2 35.8c2.4 8.1 1.6 23.9-1.6 31.2-5.3 12.4-13.6 21.3-24.7 26.6-3.9 1.9-9.5 3.7-12.2 4.1l-5.1.6V96.5l6-2.8C83.1 89 87.8 80.2 86.6 68.8l-.7-5.7 10.3-6c11.7-6.8 12-6.8 14.4 1.7zm-80-1.2 9.5 5.6-.7 5.8c-1.2 11 5 21.7 15 25.5l4.6 1.8v25l-5.1-.6c-8.3-1-18.9-6.9-26.2-14.6C18.1 95.9 14 85.7 14 71.9c0-6.3 1.9-16.2 3.7-19.2.9-1.6 3.8-.5 12.9 4.9z" />
</svg>`,
  N1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" width="100%" version="1.0">
  <path
    d="M59.9 2.5c-14.4 2.9-27 9.6-37.4 20-32.8 32.8-26.8 88.2 12.1 113.1 22.4 14.3 52.5 15 75.4 1.7 3.6-2.1 10.4-7.6 15.1-12.3 7.4-7.3 9.3-10 13.2-18 4-8.4 5.2-11.9 7.3-22 .3-1.4.5-6.6.4-11.7-.4-45.4-42-79.6-86.1-70.8zm26.3 13c17.6 3.7 32.7 15.6 41.3 32.4 6.5 12.9 7.8 30.9 3.1 44.6-8.6 25-31.2 41.5-57 41.5-25.1 0-46.5-14.8-55.8-38.5-4-10.2-5-25.3-2.4-35.4C23.6 28 54.3 8.7 86.2 15.5z" />
  <path
    d="M62 27.8c-3.6.9-8.7 3-11.4 4.6C45.5 35.4 38 41.7 38 43c0 .4 4.1 3.3 9 6.4l9 5.8 6.2-3.1c8.3-4.2 14.3-4.2 22.6 0 6.9 3.4 6.1 3.6 17.5-3.9 3.7-2.5 6.7-4.8 6.7-5.2 0-1.5-9-9-13.9-11.4-6.1-3.1-16-5.6-22.1-5.5-2.5 0-7.4.8-11 1.7zM28.3 59.7c-2.4 7.9-2.4 22 0 29 1 2.9 2.1 5.3 2.4 5.3.9 0 31.2-19.4 31.2-20 .1-.6-28.1-18.8-30.3-19.6-1.1-.4-2 1-3.3 5.3zM101 63.5c-7.9 5.1-14.6 9.8-14.8 10.3-.2.7 28.9 20.2 30.2 20.2.3 0 1.3-2.1 2.3-4.8 1.3-3.5 1.8-7.4 1.8-15.2 0-7.8-.5-11.7-1.8-15.3-1-2.6-2.2-4.7-2.5-4.7-.4 0-7.2 4.3-15.2 9.5zM46.8 98.6c-4.9 3.1-8.8 5.9-8.8 6.4 0 1.8 8.9 9.2 14.4 11.9 18.3 8.8 38 6.1 53.2-7.4 2.7-2.4 4.7-4.5 4.4-4.8-.3-.2-4.5-3-9.4-6.1l-8.9-5.7-6.4 3.1c-5.8 2.9-7.2 3.2-13.3 2.8-5.2-.3-7.6-.9-10.8-3.1-2.3-1.5-4.5-2.7-4.9-2.7-.5 0-4.7 2.5-9.5 5.6z" />
</svg>`,
  H1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 145" width="100%" version="1.0">
  <path
    d="M68 3.6c-1.4 3.6-4.3 20.9-8.5 50.4-2.1 14-4.1 25.9-4.5 26.4-.5.4-1.1-1.1-1.4-3.5C50.8 56 47.9 38 47.1 35.7c-1.3-3.5-4.7-3.6-6.2-.3-.7 1.4-2.8 10.1-4.8 19.6-2 9.4-4.1 17.1-4.6 17.1s-2.1-4-3.6-9c-2.8-9.7-4.1-12.1-7-12.1-2 0-4.8 4.8-8.9 15.5-3.1 8.1-3.7 8.6-6.5 5.1C2.8 68.2 1 68.9 1 73.4 1 77.1 6.3 83 9.6 83c2 0 4.9-5.2 9.4-16.8.7-1.8 1.6-2.9 2.1-2.5.4.4 1.9 5.5 3.4 11.2 4 16.1 5.5 18.7 9.1 16.3 1.5-.9 3.7-8.9 6.4-22.7 3.4-17.5 3.5-17.6 5-6.4 4.7 35.8 6 44.6 6.5 46.2.7 1.8 3.2 2.2 5.1.9 1-.6 5.4-27.5 9.9-60.7.9-6.6 1.9-12.7 2.3-13.5 1.2-3.2 2 10.7 2.1 40 .1 16.8.6 37.9 1.1 46.9.7 14 1.1 16.7 2.6 17.8 1.5 1.1 2 1 3.4-.2 2.2-2 3.7-9.2 10.4-49.3 3-17.8 5.7-32.7 6-33 1.2-1.1 1.5.7 3.1 14.8 3.3 31.3 4.1 35 7.4 35 2.8 0 3.2-1 8.6-21.3 2.7-9.8 5.2-17.4 5.5-17 .4.4 1.5 3.9 2.4 7.8 2.5 10.4 3.5 12.5 6.1 12.5 3.1 0 4-1.3 7.3-11.3 1.7-4.9 3.3-9.1 3.6-9.4.3-.4 1.7.4 3 1.6 3 2.8 4.6 2 4.6-2.3 0-2.3-.9-4.1-3.3-6.4-5.5-5.4-7.4-4.1-11.7 7.6-1.3 3.5-2.6 5.9-3.1 5.5-.4-.4-1.5-4.6-2.4-9.2-2.2-11-3.2-13.1-6.2-13.1-3.2 0-4.7 3.7-11.3 28.7-.6 2.4-1.4 4.3-1.9 4.3-.4 0-1.1-4.2-1.5-9.3-1.1-15.2-4.6-38-6.2-40.5-2.4-3.7-5-2.8-6.7 2.3-.9 2.5-3.7 17-6.2 32.3-2.6 15.2-5.3 29.7-5.9 32.2-1.4 5-1.4 5.3-3.5-66-.5-17.3-1.3-32.3-1.6-33.3C73.4 0 69.1.5 68 3.6z" />
</svg>`,
  F1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" width="100%" version="1.0">
  <path
    d="M44.5 10C20.3 14.9.4 19 .2 19c-.1 0-.1 24.2 0 53.7l.3 53.8 8.5 1.7c43.9 8.8 80.4 15.7 81.1 15.2.5-.3.9-3.1.9-6.2.1-5.1.2-5.5 1.5-3.8 1.3 1.7 1.6 1.7 6.7.1 20.2-6.7 35.2-22.3 41.4-43.1 2.8-9.4 2.4-24.8-.9-35-6.3-19.3-20.7-33.5-40.5-40L91 12.7V6.8c0-4-.4-5.8-1.2-5.7-.7 0-21.1 4-45.3 8.9zm12.6 31.1c12.2 6.2 20.2 21.5 18.5 35.5-2.6 22.1-21.7 36.6-40.9 31-15.1-4.4-26-21.5-24.3-38.1 1.2-11.7 9.7-24.5 19.3-29 4.6-2.2 14.4-3.3 19.6-2.3 2.2.5 5.7 1.8 7.8 2.9z" />
  <path
    d="M33.5 48.4c-5.9 2.2-13 10.3-14.5 16.7-1.6 6.5-.8 15.4 1.8 20.5 11.3 22.2 41.9 15.2 43.9-10.1.6-6.5-1-14-3-14.8-.7-.3-3 1.1-5 2.9-3.4 3.2-3.7 3.8-3.1 7.3 1.3 7.8-4.5 16.2-12 17.6-7.2 1.4-14.4-4.8-15.4-13-.6-5.9.3-8.8 3.9-13 3.7-4.2 8.5-5.7 13.5-4.3 3.4.9 3.9.7 7.5-2.8l3.9-3.8-3-1.9c-4-2.5-13.3-3.2-18.5-1.3z" />
  <path d="M35 68c-2.6 2.6-2.6 8.1 0 10.5 2.7 2.4 7 2.2 9.2-.5 2.4-2.9 2.3-6.1-.3-9.4-2.5-3.1-6.1-3.4-8.9-.6z" />
</svg>`,
  q1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 125 145" width="100%" version="1.0">
  <path
    d="M84.8 1.4C72.5 4.7 62 17.9 62 30c0 3.8.1 4 3.3 4 4.6 0 12.5-4 17.2-8.7 5.4-5.5 8.8-12.5 9.3-19.6.5-6.4.6-6.3-7-4.3zM28.5 35.9C14 39.8 4.7 50.8 1.9 67.3.5 75.9 1.2 91 3.5 99.5c4 14.7 15.5 32.8 26 40.9 6.8 5.1 11.9 5.6 19.8 2 5.4-2.5 7.4-2.9 15.2-2.9 7.3 0 10.1.5 15 2.5 9.1 3.8 13 3.4 19.9-1.9 3.1-2.4 7.7-6.9 10.1-10 4.6-5.8 12.5-19.8 12.5-22.3 0-.7-1.6-2.2-3.6-3.3-5.3-2.8-12-10.8-14.3-17.1-4.4-11.7-1.7-23.8 7.5-33.3 3-3 5.4-5.8 5.4-6.2 0-1.4-8.7-7.9-13.6-10.1-3.9-1.8-6.7-2.3-13.9-2.3-7.9 0-9.8.4-15.5 3-8.4 3.8-13.6 3.8-21.5.1-6.4-3-18-4.3-24-2.7z" />
</svg>`,
  a1 = {
    duration: 12e3,
    easing: (B) => B,
  },
  J1 = ({ rawSwg: B, onClick: Q, isSelected: K }) => {
    const Z = p1.useRef(null),
      [U, _] = p1.useState(!1);
    return $.jsxs("div", {
      className: "relative cursor-pointer",
      onClick: () => {
        _(!0),
          setTimeout(() => {
            _(!1);
          }, 750),
          Q?.();
      },
      children: [
        $.jsx("div", {
          className: g1(
            "w-[50px] lg:w-[100px] self-center home-carousel-icon",
            U && "home-carousel-icon-dupe",
            K && "home-carousel-icon-selected"
          ),
          dangerouslySetInnerHTML: {
            __html: B,
          },
        }),
        $.jsx("div", {
          ref: Z,
          className: g1(
            "w-[50px] lg:w-[100px] self-center absolute top-0 left-0 home-carousel-icon",
            K && "home-carousel-icon-selected"
          ),
          dangerouslySetInnerHTML: {
            __html: B,
          },
        }),
      ],
    });
  },
  W1 = [
    {
      svg: _1,
      title: "Cross DJ",
    },
    {
      svg: L1,
      title: "DEX 3",
    },
    {
      svg: A1,
      title: "Digital DJ 2",
    },
    {
      svg: P1,
      title: "Djay Pro",
    },
    {
      svg: R1,
      title: "Engine Prime",
    },
    {
      svg: O1,
      title: "Mixxx",
    },
    {
      svg: B1,
      title: "Serato",
    },
    {
      svg: V1,
      title: "Rekordbox",
    },
    {
      svg: N1,
      title: "Traktor",
    },
    {
      svg: H1,
      title: "Ultramixer",
    },
    {
      svg: F1,
      title: "Virtual DJ",
    },
    {
      svg: q1,
      title: "iTunes",
    },
  ],
  t2 = () => {
    const [B, Q] = m1(I1),
      [K, Z] = m1(D1),
      [U] = S1.useKeenSlider({
        loop: !0,
        renderMode: "performance",
        slides: {
          perView: 3,
          spacing: 5,
        },
        breakpoints: {
          "(min-width: 640px)": {
            slides: {
              perView: 6,
            },
          },
        },
        drag: !1,
        created(_) {
          _.moveToIdx(5, !0, a1);
        },
        updated(_) {
          _.moveToIdx(_.track.details.abs + 5, !0, a1);
        },
        animationEnded(_) {
          _.moveToIdx(_.track.details.abs + 5, !0, a1);
        },
      });
    return $.jsx("div", {
      ref: U,
      className: "keen-slider grid grid-rows-12 mb-12",
      children: W1.map((_) =>
        $.jsxs(
          "div",
          {
            className:
              "keen-slider__slide grid grid-rows-[auto,max-content] items-center justify-center h-auto",
            children: [
              $.jsx("div", {
                className: "mx-auto",
                children: $.jsx(J1, {
                  isSelected:
                    _.title === B ||
                    _.title === K ||
                    (_.title === "Engine Prime" && B === "Engine DJ") ||
                    (_.title === "Engine Prime" && K === "Engine DJ"),
                  rawSwg: _.svg,
                  onClick: () => {
                    if (_.title === B) return;
                    let Y = _.title;
                    Y === "Engine Prime" && (Y = "Engine DJ");
                    const G = B;
                    Q(Y), Z(G);
                  },
                }),
              }),
              $.jsx("p", {
                className: "text-lg",
                children: _.title,
              }),
            ],
          },
          _.title
        )
      ),
    });
  };
export { t2 as HomeCarousel };
