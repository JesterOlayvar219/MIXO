import { P as be } from "./consts.BqJveuZl.js";
import { h as rn, g as Te } from "./httpClient.BFRTIcNZ.js";
import { g as on, m as an, h as cn, r as ln } from "./chat.Dkwpnclq.js";
/*@license Copyright 2015-2022 Ably Real-time Ltd (ably.com)

Ably JavaScript Library v2.5.0
https://github.com/ably/ably-js

Released under the Apache Licence v2.0*/
var et = Object.defineProperty,
  hn = Object.defineProperties,
  un = Object.getOwnPropertyDescriptors,
  oe = Object.getOwnPropertySymbols,
  tt = Object.prototype.hasOwnProperty,
  nt = Object.prototype.propertyIsEnumerable,
  He = (e, t, n) =>
    t in e
      ? et(e, t, {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: n,
        })
      : (e[t] = n),
  x = (e, t) => {
    for (var n in t || (t = {})) tt.call(t, n) && He(e, n, t[n]);
    if (oe) for (var n of oe(t)) nt.call(t, n) && He(e, n, t[n]);
    return e;
  },
  fe = (e, t) => hn(e, un(t)),
  fn = (e, t) => {
    var n = {};
    for (var s in e) tt.call(e, s) && t.indexOf(s) < 0 && (n[s] = e[s]);
    if (e != null && oe)
      for (var s of oe(e)) t.indexOf(s) < 0 && nt.call(e, s) && (n[s] = e[s]);
    return n;
  },
  dn = (e, t) => {
    for (var n in t)
      et(e, n, {
        get: t[n],
        enumerable: !0,
      });
  },
  f = class {},
  De = typeof global < "u" ? global : typeof window < "u" ? window : self;
function se(e, t) {
  return `${e}`.padStart(t ? 3 : 2, "0");
}
function gn(e) {
  return f.Config.logTimestamps
    ? function (t) {
        const n = new Date();
        e(
          se(n.getHours()) +
            ":" +
            se(n.getMinutes()) +
            ":" +
            se(n.getSeconds()) +
            "." +
            se(n.getMilliseconds(), 1) +
            " " +
            t
        );
      }
    : function (t) {
        e(t);
      };
}
var pn = () => {
    var e;
    let t, n;
    return (
      typeof ((e = De?.console) == null ? void 0 : e.log) == "function"
        ? ((t = function (...s) {
            console.log.apply(console, s);
          }),
          (n = console.warn
            ? function (...s) {
                console.warn.apply(console, s);
              }
            : t))
        : (t = n = function () {}),
      [t, n].map(gn)
    );
  },
  q = class ee {
    constructor() {
      (this.deprecated = (t, n) => {
        this.deprecationWarning(
          `${t} is deprecated and will be removed in a future version. ${n}`
        );
      }),
        (this.shouldLog = (t) => t <= this.logLevel),
        (this.setLog = (t, n) => {
          t !== void 0 && (this.logLevel = t),
            n !== void 0 && (this.logHandler = this.logErrorHandler = n);
        }),
        (this.logLevel = ee.defaultLogLevel),
        (this.logHandler = ee.defaultLogHandler),
        (this.logErrorHandler = ee.defaultLogErrorHandler);
    }
    static initLogHandlers() {
      const [t, n] = pn();
      (this.defaultLogHandler = t),
        (this.defaultLogErrorHandler = n),
        (this.defaultLogger = new ee());
    }
    static logActionNoStrip(t, n, s, i) {
      t.logAction(n, s, i);
    }
    logAction(t, n, s) {
      this.shouldLog(t) &&
        (t === 1 ? this.logErrorHandler : this.logHandler)(
          "Ably: " + n + ": " + s,
          t
        );
    }
    renamedClientOption(t, n) {
      this.deprecationWarning(
        `The \`${t}\` client option has been renamed to \`${n}\`. Please update your code to use \`${n}\` instead. \`${t}\` will be removed in a future version.`
      );
    }
    renamedMethod(t, n, s) {
      this.deprecationWarning(
        `\`${t}\`’s \`${n}\` method has been renamed to \`${s}\`. Please update your code to use \`${s}\` instead. \`${n}\` will be removed in a future version.`
      );
    }
    deprecationWarning(t) {
      this.shouldLog(1) &&
        this.logErrorHandler(`Ably: Deprecation warning - ${t}`, 1);
    }
  };
q.defaultLogLevel = 1;
q.LOG_NONE = 0;
q.LOG_ERROR = 1;
q.LOG_MAJOR = 2;
q.LOG_MINOR = 3;
q.LOG_MICRO = 4;
q.logAction = (e, t, n, s) => {
  q.logActionNoStrip(e, t, n, s);
};
var mn = q,
  l = mn,
  st = {};
dn(st, {
  Format: () => ft,
  allSame: () => ut,
  allToLowerCase: () => vt,
  allToUpperCase: () => wt,
  arrChooseN: () => pt,
  arrDeleteValue: () => lt,
  arrEquals: () => Et,
  arrIntersect: () => at,
  arrIntersectOb: () => ct,
  arrPopRandomElement: () => Pe,
  arrSubtract: () => Cn,
  arrWithoutValue: () => En,
  cheapRandStr: () => xe,
  containsValue: () => Sn,
  copy: () => ae,
  createMissingPluginError: () => At,
  dataSizeBytes: () => gt,
  decodeBody: () => mt,
  encodeBody: () => yt,
  ensureArray: () => vn,
  forInOwnNonNullProperties: () => ht,
  getBackoffCoefficient: () => bt,
  getGlobalObject: () => Ne,
  getJitterCoefficient: () => Tt,
  getRetryTime: () => Le,
  inherits: () => Tn,
  inspectBody: () => Rn,
  inspectError: () => P,
  intersect: () => ot,
  isEmpty: () => wn,
  isErrorInfoOrPartialErrorInfo: () => dt,
  isNil: () => U,
  isObject: () => ne,
  keysArray: () => ce,
  matchDerivedChannel: () => Ct,
  mixin: () => L,
  parseQueryString: () => Ue,
  prototypicalClone: () => rt,
  randomString: () => kn,
  shallowClone: () => bn,
  shallowEquals: () => St,
  throwMissingPluginError: () => B,
  toBase64: () => le,
  toQueryString: () => Me,
  valuesArray: () => An,
  whenPromiseSettles: () => O,
  withTimeoutAsync: () => Rt,
});
function it(e) {
  let t = "[" + e.constructor.name;
  return (
    e.message && (t += ": " + e.message),
    e.statusCode && (t += "; statusCode=" + e.statusCode),
    e.code && (t += "; code=" + e.code),
    e.cause && (t += "; cause=" + P(e.cause)),
    e.href &&
      !(e.message && e.message.indexOf("help.ably.io") > -1) &&
      (t += "; see " + e.href + " "),
    (t += "]"),
    t
  );
}
var u = class Se extends Error {
    constructor(t, n, s, i) {
      super(t),
        typeof Object.setPrototypeOf < "u" &&
          Object.setPrototypeOf(this, Se.prototype),
        (this.code = n),
        (this.statusCode = s),
        (this.cause = i);
    }
    toString() {
      return it(this);
    }
    static fromValues(t) {
      const { message: n, code: s, statusCode: i } = t;
      if (typeof n != "string" || typeof s != "number" || typeof i != "number")
        throw new Error(
          "ErrorInfo.fromValues(): invalid values: " + f.Config.inspect(t)
        );
      const r = Object.assign(new Se(n, s, i), t);
      return (
        r.code && !r.href && (r.href = "https://help.ably.io/error/" + r.code),
        r
      );
    }
  },
  W = class Ce extends Error {
    constructor(t, n, s, i) {
      super(t),
        typeof Object.setPrototypeOf < "u" &&
          Object.setPrototypeOf(this, Ce.prototype),
        (this.code = n),
        (this.statusCode = s),
        (this.cause = i);
    }
    toString() {
      return it(this);
    }
    static fromValues(t) {
      const { message: n, code: s, statusCode: i } = t;
      if (
        typeof n != "string" ||
        (!U(s) && typeof s != "number") ||
        (!U(i) && typeof i != "number")
      )
        throw new Error(
          "PartialErrorInfo.fromValues(): invalid values: " +
            f.Config.inspect(t)
        );
      const r = Object.assign(new Ce(n, s, i), t);
      return (
        r.code && !r.href && (r.href = "https://help.ably.io/error/" + r.code),
        r
      );
    }
  };
function yn(e) {
  return Math.floor(Math.random() * e.length);
}
function L(e, ...t) {
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    if (!s) break;
    for (const i in s)
      Object.prototype.hasOwnProperty.call(s, i) && (e[i] = s[i]);
  }
  return e;
}
function ae(e) {
  return L({}, e);
}
function vn(e) {
  return U(e) ? [] : Array.isArray(e) ? e : [e];
}
function ne(e) {
  return Object.prototype.toString.call(e) == "[object Object]";
}
function wn(e) {
  for (const t in e) return !1;
  return !0;
}
function U(e) {
  return e == null;
}
function bn(e) {
  const t = new Object();
  for (const n in e) t[n] = e[n];
  return t;
}
function rt(e, t) {
  class n {}
  n.prototype = e;
  const s = new n();
  return t && L(s, t), s;
}
var Tn = function (e, t) {
  if (f.Config.inherits) {
    f.Config.inherits(e, t);
    return;
  }
  (e.super_ = t),
    (e.prototype = rt(t.prototype, {
      constructor: e,
    }));
};
function Sn(e, t) {
  for (const n in e) if (e[n] == t) return !0;
  return !1;
}
function ot(e, t) {
  return Array.isArray(t) ? at(e, t) : ct(e, t);
}
function at(e, t) {
  const n = [];
  for (let s = 0; s < e.length; s++) {
    const i = e[s];
    t.indexOf(i) != -1 && n.push(i);
  }
  return n;
}
function ct(e, t) {
  const n = [];
  for (let s = 0; s < e.length; s++) {
    const i = e[s];
    i in t && n.push(i);
  }
  return n;
}
function Cn(e, t) {
  const n = [];
  for (let s = 0; s < e.length; s++) {
    const i = e[s];
    t.indexOf(i) == -1 && n.push(i);
  }
  return n;
}
function lt(e, t) {
  const n = e.indexOf(t),
    s = n != -1;
  return s && e.splice(n, 1), s;
}
function En(e, t) {
  const n = e.slice();
  return lt(n, t), n;
}
function ce(e, t) {
  const n = [];
  for (const s in e)
    (t && !Object.prototype.hasOwnProperty.call(e, s)) || n.push(s);
  return n;
}
function An(e, t) {
  const n = [];
  for (const s in e)
    (t && !Object.prototype.hasOwnProperty.call(e, s)) || n.push(e[s]);
  return n;
}
function ht(e, t) {
  for (const n in e) Object.prototype.hasOwnProperty.call(e, n) && e[n] && t(n);
}
function ut(e, t) {
  if (e.length === 0) return !0;
  const n = e[0][t];
  return e.every(function (s) {
    return s[t] === n;
  });
}
var ft = ((e) => ((e.msgpack = "msgpack"), (e.json = "json"), e))(ft || {});
function Pe(e) {
  return e.splice(yn(e), 1)[0];
}
function Me(e) {
  const t = [];
  if (e)
    for (const n in e)
      t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
  return t.length ? "?" + t.join("&") : "";
}
function Ue(e) {
  let t;
  const n = /([^?&=]+)=?([^&]*)/g,
    s = {};
  for (; (t = n.exec(e)); )
    s[decodeURIComponent(t[1])] = decodeURIComponent(t[2]);
  return s;
}
function dt(e) {
  return (
    typeof e == "object" && e !== null && (e instanceof u || e instanceof W)
  );
}
function P(e) {
  var t, n;
  return e instanceof Error ||
    ((t = e?.constructor) == null ? void 0 : t.name) === "ErrorInfo" ||
    ((n = e?.constructor) == null ? void 0 : n.name) === "PartialErrorInfo"
    ? e.toString()
    : f.Config.inspect(e);
}
function Rn(e) {
  return f.BufferUtils.isBuffer(e)
    ? e.toString()
    : typeof e == "string"
    ? e
    : f.Config.inspect(e);
}
function gt(e) {
  if (f.BufferUtils.isBuffer(e)) return f.BufferUtils.byteLength(e);
  if (typeof e == "string") return f.Config.stringByteSize(e);
  throw new Error(
    "Expected input of Utils.dataSizeBytes to be a buffer or string, but was: " +
      typeof e
  );
}
function xe() {
  return String(Math.random()).substr(2);
}
var kn = async (e) => {
  const t = await f.Config.getRandomArrayBuffer(e);
  return f.BufferUtils.base64Encode(t);
};
function pt(e, t) {
  const n = Math.min(t, e.length),
    s = e.slice(),
    i = [];
  for (let r = 0; r < n; r++) i.push(Pe(s));
  return i;
}
function O(e, t) {
  e.then((n) => {
    t?.(null, n);
  }).catch((n) => {
    t?.(n);
  });
}
function mt(e, t, n) {
  return n == "msgpack"
    ? (t || B("MsgPack"), t.decode(e))
    : JSON.parse(String(e));
}
function yt(e, t, n) {
  return n == "msgpack"
    ? (t || B("MsgPack"), t.encode(e, !0))
    : JSON.stringify(e);
}
function vt(e) {
  return e.map(function (t) {
    return t && t.toLowerCase();
  });
}
function wt(e) {
  return e.map(function (t) {
    return t && t.toUpperCase();
  });
}
function bt(e) {
  return Math.min((e + 2) / 3, 2);
}
function Tt() {
  return 1 - Math.random() * 0.2;
}
function Le(e, t) {
  return e * bt(t) * Tt();
}
function Ne() {
  return typeof global < "u" ? global : typeof window < "u" ? window : self;
}
function St(e, t) {
  return (
    Object.keys(e).every((n) => e[n] === t[n]) &&
    Object.keys(t).every((n) => t[n] === e[n])
  );
}
function Ct(e) {
  const t = /^(\[([^?]*)(?:(.*))\])?(.+)$/,
    n = e.match(t);
  if (!n || !n.length || n.length < 5)
    throw new u("regex match failed", 400, 40010);
  if (n[2])
    throw new u(
      `cannot use a derived option with a ${n[2]} channel`,
      400,
      40010
    );
  return {
    qualifierParam: n[3] || "",
    channelName: n[4],
  };
}
function le(e) {
  const t = f.BufferUtils,
    n = t.utf8Encode(e);
  return t.base64Encode(n);
}
function Et(e, t) {
  return (
    e.length === t.length &&
    e.every(function (n, s) {
      return n === t[s];
    })
  );
}
function At(e) {
  return new u(`${e} plugin not provided`, 40019, 400);
}
function B(e) {
  throw At(e);
}
async function Rt(e, t = 5e3, n = "Timeout expired") {
  const s = new u(n, 5e4, 500);
  return Promise.race([e, new Promise((i, r) => setTimeout(() => r(s), t))]);
}
var kt = "2.5.0",
  _n = "ably-js/" + kt,
  E = {
    ENVIRONMENT: "",
    REST_HOST: "rest.ably.io",
    REALTIME_HOST: "realtime.ably.io",
    FALLBACK_HOSTS: [
      "A.ably-realtime.com",
      "B.ably-realtime.com",
      "C.ably-realtime.com",
      "D.ably-realtime.com",
      "E.ably-realtime.com",
    ],
    PORT: 80,
    TLS_PORT: 443,
    TIMEOUTS: {
      disconnectedRetryTimeout: 15e3,
      suspendedRetryTimeout: 3e4,
      httpRequestTimeout: 1e4,
      httpMaxRetryDuration: 15e3,
      channelRetryTimeout: 15e3,
      fallbackRetryTimeout: 6e5,
      connectionStateTtl: 12e4,
      realtimeRequestTimeout: 1e4,
      recvTimeout: 9e4,
      webSocketConnectTimeout: 1e4,
      webSocketSlowTimeout: 4e3,
    },
    httpMaxRetryCount: 3,
    maxMessageSize: 65536,
    version: kt,
    protocolVersion: 3,
    agent: _n,
    getHost: _t,
    getPort: On,
    getHttpScheme: In,
    environmentFallbackHosts: Ot,
    getFallbackHosts: It,
    getHosts: Pn,
    checkHost: Pt,
    objectifyOptions: xn,
    normaliseOptions: Ln,
    defaultGetHeaders: Nn,
    defaultPostHeaders: Bn,
  };
function _t(e, t, n) {
  return (
    n
      ? (t = (t == e.restHost && e.realtimeHost) || t || e.realtimeHost)
      : (t = t || e.restHost),
    t
  );
}
function On(e, t) {
  return t || e.tls ? e.tlsPort : e.port;
}
function In(e) {
  return e.tls ? "https://" : "http://";
}
function Ot(e) {
  return [
    e + "-a-fallback.ably-realtime.com",
    e + "-b-fallback.ably-realtime.com",
    e + "-c-fallback.ably-realtime.com",
    e + "-d-fallback.ably-realtime.com",
    e + "-e-fallback.ably-realtime.com",
  ];
}
function It(e) {
  const t = e.fallbackHosts,
    n =
      typeof e.httpMaxRetryCount < "u"
        ? e.httpMaxRetryCount
        : E.httpMaxRetryCount;
  return t ? pt(t, n) : [];
}
function Pn(e, t) {
  const n = [e.restHost].concat(It(e));
  return t ? n.map((s) => _t(e, s, !0)) : n;
}
function Pt(e) {
  if (typeof e != "string")
    throw new u("host must be a string; was a " + typeof e, 4e4, 400);
  if (!e.length) throw new u("host must not be zero-length", 4e4, 400);
}
function Mn(e, t, n, s) {
  return e.realtimeHost
    ? e.realtimeHost
    : e.restHost
    ? e.restHost
    : t
    ? E.REALTIME_HOST
    : n + "-" + E.REALTIME_HOST;
}
function Un(e) {
  const t = {};
  for (const n in E.TIMEOUTS) t[n] = e[n] || E.TIMEOUTS[n];
  return t;
}
function Be(e) {
  let t = E.agent;
  if (e.agents) for (var n in e.agents) t += " " + n + "/" + e.agents[n];
  return t;
}
function xn(e, t, n, s, i) {
  if (e === void 0) {
    const o = t
      ? `${n} must be initialized with either a client options object, an Ably API key, or an Ably Token`
      : `${n} must be initialized with a client options object`;
    throw (l.logAction(s, l.LOG_ERROR, `${n}()`, o), new Error(o));
  }
  let r;
  if (typeof e == "string")
    if (e.indexOf(":") == -1) {
      if (!t) {
        const o = `${n} cannot be initialized with just an Ably Token; you must provide a client options object with a \`plugins\` property. (Set this Ably Token as the object’s \`token\` property.)`;
        throw (l.logAction(s, l.LOG_ERROR, `${n}()`, o), new Error(o));
      }
      r = {
        token: e,
      };
    } else {
      if (!t) {
        const o = `${n} cannot be initialized with just an Ably API key; you must provide a client options object with a \`plugins\` property. (Set this Ably API key as the object’s \`key\` property.)`;
        throw (l.logAction(s, l.LOG_ERROR, `${n}()`, o), new Error(o));
      }
      r = {
        key: e,
      };
    }
  else r = e;
  return (
    i &&
      (r = fe(x({}, r), {
        plugins: x(x({}, i), r.plugins),
      })),
    r
  );
}
function Ln(e, t, n) {
  const s = n ?? l.defaultLogger;
  typeof e.recover == "function" &&
    e.closeOnUnload === !0 &&
    (l.logAction(
      s,
      l.LOG_ERROR,
      "Defaults.normaliseOptions",
      "closeOnUnload was true and a session recovery function was set - these are mutually exclusive, so unsetting the latter"
    ),
    (e.recover = void 0)),
    "closeOnUnload" in e || (e.closeOnUnload = !e.recover),
    "queueMessages" in e || (e.queueMessages = !0);
  const i =
      (e.environment && String(e.environment).toLowerCase()) || E.ENVIRONMENT,
    r = !i || i === "production";
  !e.fallbackHosts &&
    !e.restHost &&
    !e.realtimeHost &&
    !e.port &&
    !e.tlsPort &&
    (e.fallbackHosts = r ? E.FALLBACK_HOSTS : Ot(i));
  const o = e.restHost || (r ? E.REST_HOST : i + "-" + E.REST_HOST),
    a = Mn(e, r, i);
  (e.fallbackHosts || []).concat(o, a).forEach(Pt),
    (e.port = e.port || E.PORT),
    (e.tlsPort = e.tlsPort || E.TLS_PORT),
    "tls" in e || (e.tls = !0);
  const h = Un(e);
  t
    ? "useBinaryProtocol" in e
      ? (e.useBinaryProtocol = f.Config.supportsBinary && e.useBinaryProtocol)
      : (e.useBinaryProtocol = f.Config.preferBinary)
    : (e.useBinaryProtocol = !1);
  const c = {};
  e.clientId &&
    (c["X-Ably-ClientId"] = f.BufferUtils.base64Encode(
      f.BufferUtils.utf8Encode(e.clientId)
    )),
    "idempotentRestPublishing" in e || (e.idempotentRestPublishing = !0);
  let d = null,
    g = e.connectivityCheckUrl;
  if (e.connectivityCheckUrl) {
    let [m, b] = e.connectivityCheckUrl.split("?");
    (d = b ? Ue(b) : {}),
      m.indexOf("://") === -1 && (m = "https://" + m),
      (g = m);
  }
  let p = e.wsConnectivityCheckUrl;
  return (
    p && p.indexOf("://") === -1 && (p = "wss://" + p),
    fe(x({}, e), {
      realtimeHost: a,
      restHost: o,
      maxMessageSize: e.maxMessageSize || E.maxMessageSize,
      timeouts: h,
      connectivityCheckParams: d,
      connectivityCheckUrl: g,
      wsConnectivityCheckUrl: p,
      headers: c,
    })
  );
}
function We(e, t, n) {
  const s = n || {};
  if (s.cipher) {
    e || B("Crypto");
    const i = e.getCipher(s.cipher, t);
    (s.cipher = i.cipherParams), (s.channelCipher = i.cipher);
  } else "cipher" in s && ((s.cipher = void 0), (s.channelCipher = null));
  return s;
}
var Mt = {
    json: "application/json",
    xml: "application/xml",
    html: "text/html",
    msgpack: "application/x-msgpack",
    text: "text/plain",
  },
  he = {
    format: "json",
    protocolVersion: E.protocolVersion,
  };
function Nn(
  e,
  { format: t = he.format, protocolVersion: n = he.protocolVersion } = {}
) {
  return {
    accept: Mt[t],
    "X-Ably-Version": n.toString(),
    "Ably-Agent": Be(e),
  };
}
function Bn(
  e,
  { format: t = he.format, protocolVersion: n = he.protocolVersion } = {}
) {
  let s;
  return {
    accept: (s = Mt[t]),
    "content-type": s,
    "X-Ably-Version": n.toString(),
    "Ably-Agent": Be(e),
  };
}
var A = E;
function qn(e) {
  return Object.assign(E, e);
}
var Hn = class Ut {
    constructor(t, n) {
      (this.logger = t), (this.members = n || []);
    }
    call(t, n) {
      for (const s of this.members)
        if (s)
          try {
            s(t, n);
          } catch (i) {
            l.logAction(
              this.logger,
              l.LOG_ERROR,
              "Multicaster multiple callback handler",
              "Unexpected exception: " + i + "; stack = " + i.stack
            );
          }
    }
    push(...t) {
      this.members.push(...t);
    }
    createPromise() {
      return new Promise((t, n) => {
        this.push((s, i) => {
          s ? n(s) : t(i);
        });
      });
    }
    resolveAll(t) {
      this.call(null, t);
    }
    rejectAll(t) {
      this.call(t);
    }
    static create(t, n) {
      const s = new Ut(t, n);
      return Object.assign((i, r) => s.call(i, r), {
        push: (i) => s.push(i),
        createPromise: () => s.createPromise(),
        resolveAll: (i) => s.resolveAll(i),
        rejectAll: (i) => s.rejectAll(i),
      });
    }
  },
  xt = Hn,
  Lt = ((e) => (
    (e.Get = "get"),
    (e.Delete = "delete"),
    (e.Post = "post"),
    (e.Put = "put"),
    (e.Patch = "patch"),
    e
  ))(Lt || {}),
  R = Lt,
  Nt = ((e) => (
    (e[(e.Success = 200)] = "Success"),
    (e[(e.NoContent = 204)] = "NoContent"),
    (e[(e.BadRequest = 400)] = "BadRequest"),
    (e[(e.Unauthorized = 401)] = "Unauthorized"),
    (e[(e.Forbidden = 403)] = "Forbidden"),
    (e[(e.RequestTimeout = 408)] = "RequestTimeout"),
    (e[(e.InternalServerError = 500)] = "InternalServerError"),
    e
  ))(Nt || {});
function Dn(e) {
  return e >= 200 && e < 400;
}
var Bt = Nt,
  ge = Math.pow(2, 17);
function Wn() {
  return ("000000" + Math.floor(Math.random() * 1e16)).slice(-16);
}
function Gn(e) {
  return !!e.connection;
}
function Ge(e) {
  return dt(e)
    ? (e.code ||
        (e.statusCode === 403
          ? (e.code = 40300)
          : ((e.code = 40170), (e.statusCode = 401))),
      e)
    : new u(P(e), e.code || 40170, e.statusCode || 401);
}
var Fn = (e, t) => {
  const n = f.BufferUtils,
    s = n.utf8Encode(e),
    i = n.utf8Encode(t),
    r = n.hmacSha256(s, i);
  return n.base64Encode(r);
};
function Fe(e) {
  if (!e) return "";
  typeof e == "string" && (e = JSON.parse(e));
  const t = Object.create(null),
    n = ce(e, !0);
  if (!n) return "";
  n.sort();
  for (let s = 0; s < n.length; s++) t[n[s]] = e[n[s]].sort();
  return JSON.stringify(t);
}
function je(e, t) {
  if (!e.authCallback) {
    if (!e.authUrl) {
      if (!e.key) {
        if (!e.tokenDetails) {
          const n = "authOptions must include valid authentication parameters";
          throw (l.logAction(t, l.LOG_ERROR, "Auth()", n), new Error(n));
        }
      }
    }
  }
}
function jn(e) {
  return "useTokenAuth" in e && !e.useTokenAuth;
}
function Vn(e) {
  return (
    e.useTokenAuth ||
    (!jn(e) && (e.authCallback || e.authUrl || e.token || e.tokenDetails))
  );
}
function zn(e) {
  return !e.key && !e.authCallback && !e.authUrl;
}
var Kn = 0;
function Qn() {
  return Kn++;
}
var $n = class {
    constructor(e, t) {
      if (
        ((this.authOptions = {}),
        (this.client = e),
        (this.tokenParams = t.defaultTokenParams || {}),
        (this.currentTokenRequestId = null),
        (this.waitingForTokenRequest = null),
        Vn(t))
      )
        zn(t) &&
          l.logAction(
            this.logger,
            l.LOG_ERROR,
            "Auth()",
            "Warning: library initialized with a token literal without any way to renew the token when it expires (no authUrl, authCallback, or key). See https://help.ably.io/error/40171 for help"
          ),
          this._saveTokenOptions(t.defaultTokenParams, t),
          je(this.authOptions, this.logger);
      else {
        if (!t.key) {
          const n =
            "No authentication options provided; need one of: key, authUrl, or authCallback (or for testing only, token or tokenDetails)";
          throw (
            (l.logAction(this.logger, l.LOG_ERROR, "Auth()", n),
            new u(n, 40160, 401))
          );
        }
        this._saveBasicOptions(t);
      }
    }
    get logger() {
      return this.client.logger;
    }
    async authorize(e, t) {
      if (t && t.key && this.authOptions.key !== t.key)
        throw new u(
          "Unable to update auth options with incompatible key",
          40102,
          401
        );
      try {
        let n = await this._forceNewToken(e ?? null, t ?? null);
        return Gn(this.client)
          ? new Promise((s, i) => {
              this.client.connection.connectionManager.onAuthUpdated(
                n,
                (r, o) => (r ? i(r) : s(o))
              );
            })
          : n;
      } catch (n) {
        throw (
          (this.client.connection &&
            n.statusCode === Bt.Forbidden &&
            this.client.connection.connectionManager.actOnErrorFromAuthorize(n),
          n)
        );
      }
    }
    async _forceNewToken(e, t) {
      (this.tokenDetails = null),
        this._saveTokenOptions(e, t),
        je(this.authOptions, this.logger);
      try {
        return this._ensureValidAuthCredentials(!0);
      } finally {
        delete this.tokenParams.timestamp, delete this.authOptions.queryTime;
      }
    }
    async requestToken(e, t) {
      const n = t || this.authOptions,
        s = e || ae(this.tokenParams);
      let i,
        r = this.client;
      if (n.authCallback) i = n.authCallback;
      else if (n.authUrl)
        i = (a, h) => {
          const c = L(
              {
                accept: "application/json, text/plain",
              },
              n.authHeaders
            ),
            d = n.authMethod && n.authMethod.toLowerCase() === "post";
          let g;
          const p = n.authUrl.indexOf("?");
          p > -1 &&
            ((g = Ue(n.authUrl.slice(p))),
            (n.authUrl = n.authUrl.slice(0, p)),
            d || (n.authParams = L(g, n.authParams)));
          const m = L({}, n.authParams || {}, a),
            b = (y) => {
              var w, S;
              let C = (w = y.body) != null ? w : null,
                _ = null;
              if (!y.error) {
                const Q = (S = y.headers["content-type"]) != null ? S : null;
                Array.isArray(Q) ? (_ = Q.join(", ")) : (_ = Q);
              }
              if (y.error) {
                h(y.error, null);
                return;
              }
              if (y.unpacked) {
                h(null, C);
                return;
              }
              if ((f.BufferUtils.isBuffer(C) && (C = C.toString()), !_)) {
                h(
                  new u(
                    "authUrl response is missing a content-type header",
                    40170,
                    401
                  ),
                  null
                );
                return;
              }
              const K = _.indexOf("application/json") > -1,
                de =
                  _.indexOf("text/plain") > -1 ||
                  _.indexOf("application/jwt") > -1;
              if (!K && !de) {
                h(
                  new u(
                    "authUrl responded with unacceptable content-type " +
                      _ +
                      ", should be either text/plain, application/jwt or application/json",
                    40170,
                    401
                  ),
                  null
                );
                return;
              }
              if (K) {
                if (C.length > ge) {
                  h(
                    new u(
                      "authUrl response exceeded max permitted length",
                      40170,
                      401
                    ),
                    null
                  );
                  return;
                }
                try {
                  C = JSON.parse(C);
                } catch (Q) {
                  h(
                    new u(
                      "Unexpected error processing authURL response; err = " +
                        Q.message,
                      40170,
                      401
                    ),
                    null
                  );
                  return;
                }
              }
              h(null, C, _);
            };
          if (d) {
            const y = c || {};
            y["content-type"] = "application/x-www-form-urlencoded";
            const w = Me(m).slice(1);
            O(this.client.http.doUri(R.Post, n.authUrl, y, w, g), (S, C) =>
              b(S || C)
            );
          } else
            O(
              this.client.http.doUri(R.Get, n.authUrl, c || {}, null, m),
              (y, w) => b(y || w)
            );
        };
      else if (n.key)
        i = (a, h) => {
          O(this.createTokenRequest(a, n), (c, d) => h(c, d ?? null));
        };
      else {
        const a =
          "Need a new token, but authOptions does not include any way to request one (no authUrl, authCallback, or key)";
        throw (
          (l.logAction(
            this.logger,
            l.LOG_ERROR,
            "Auth()",
            "library initialized with a token literal without any way to renew the token when it expires (no authUrl, authCallback, or key). See https://help.ably.io/error/40171 for help"
          ),
          new u(a, 40171, 403))
        );
      }
      "capability" in s && (s.capability = Fe(s.capability));
      const o = (a, h) => {
        const c = a.keyName,
          d = "/keys/" + c + "/requestToken",
          g = function (m) {
            return r.baseUri(m) + d;
          },
          p = A.defaultPostHeaders(this.client.options);
        n.requestHeaders && L(p, n.requestHeaders),
          O(
            this.client.http.do(R.Post, g, p, JSON.stringify(a), null),
            (m, b) => (m ? h(m) : h(b.error, b.body, b.unpacked))
          );
      };
      return new Promise((a, h) => {
        let c = !1,
          d = this.client.options.timeouts.realtimeRequestTimeout,
          g = setTimeout(() => {
            c = !0;
            const p =
              "Token request callback timed out after " + d / 1e3 + " seconds";
            l.logAction(this.logger, l.LOG_ERROR, "Auth.requestToken()", p),
              h(new u(p, 40170, 401));
          }, d);
        i(s, (p, m, b) => {
          if (c) return;
          if ((clearTimeout(g), p)) {
            l.logAction(
              this.logger,
              l.LOG_ERROR,
              "Auth.requestToken()",
              "token request signing call returned error; err = " + P(p)
            ),
              h(Ge(p));
            return;
          }
          if (typeof m == "string") {
            m.length === 0
              ? h(new u("Token string is empty", 40170, 401))
              : m.length > ge
              ? h(
                  new u(
                    "Token string exceeded max permitted length (was " +
                      m.length +
                      " bytes)",
                    40170,
                    401
                  )
                )
              : m === "undefined" || m === "null"
              ? h(new u("Token string was literal null/undefined", 40170, 401))
              : m[0] === "{" && !(b && b.indexOf("application/jwt") > -1)
              ? h(
                  new u(
                    "Token was double-encoded; make sure you're not JSON-encoding an already encoded token request or details",
                    40170,
                    401
                  )
                )
              : a({
                  token: m,
                });
            return;
          }
          if (typeof m != "object" || m === null) {
            const w =
              "Expected token request callback to call back with a token string or token request/details object, but got a " +
              typeof m;
            l.logAction(this.logger, l.LOG_ERROR, "Auth.requestToken()", w),
              h(new u(w, 40170, 401));
            return;
          }
          const y = JSON.stringify(m).length;
          if (y > ge && !n.suppressMaxLengthCheck) {
            h(
              new u(
                "Token request/details object exceeded max permitted stringified size (was " +
                  y +
                  " bytes)",
                40170,
                401
              )
            );
            return;
          }
          if ("issued" in m) {
            a(m);
            return;
          }
          if (!("keyName" in m)) {
            const w =
              "Expected token request callback to call back with a token string, token request object, or token details object";
            l.logAction(this.logger, l.LOG_ERROR, "Auth.requestToken()", w),
              h(new u(w, 40170, 401));
            return;
          }
          o(m, (w, S, C) => {
            if (w) {
              l.logAction(
                this.logger,
                l.LOG_ERROR,
                "Auth.requestToken()",
                "token request API call returned error; err = " + P(w)
              ),
                h(Ge(w));
              return;
            }
            C || (S = JSON.parse(S)), a(S);
          });
        });
      });
    }
    async createTokenRequest(e, t) {
      (t = t || this.authOptions), (e = e || ae(this.tokenParams));
      const n = t.key;
      if (!n) throw new u("No key specified", 40101, 403);
      const s = n.split(":"),
        i = s[0],
        r = s[1];
      if (!r) throw new u("Invalid key specified", 40101, 403);
      if (e.clientId === "")
        throw new u("clientId can’t be an empty string", 40012, 400);
      "capability" in e && (e.capability = Fe(e.capability));
      const o = L(
          {
            keyName: i,
          },
          e
        ),
        a = e.clientId || "",
        h = e.ttl || "",
        c = e.capability || "";
      o.timestamp || (o.timestamp = await this.getTimestamp(t && t.queryTime));
      const d = o.nonce || (o.nonce = Wn()),
        g = o.timestamp,
        p =
          o.keyName +
          `
` +
          h +
          `
` +
          c +
          `
` +
          a +
          `
` +
          g +
          `
` +
          d +
          `
`;
      return (o.mac = o.mac || Fn(p, r)), o;
    }
    async getAuthParams() {
      if (this.method == "basic")
        return {
          key: this.key,
        };
      {
        let e = await this._ensureValidAuthCredentials(!1);
        if (!e)
          throw new Error(
            "Auth.getAuthParams(): _ensureValidAuthCredentials returned no error or tokenDetails"
          );
        return {
          access_token: e.token,
        };
      }
    }
    async getAuthHeaders() {
      if (this.method == "basic")
        return {
          authorization: "Basic " + this.basicKey,
        };
      {
        const e = await this._ensureValidAuthCredentials(!1);
        if (!e)
          throw new Error(
            "Auth.getAuthParams(): _ensureValidAuthCredentials returned no error or tokenDetails"
          );
        return {
          authorization: "Bearer " + le(e.token),
        };
      }
    }
    async getTimestamp(e) {
      return !this.isTimeOffsetSet() && (e || this.authOptions.queryTime)
        ? this.client.time()
        : this.getTimestampUsingOffset();
    }
    getTimestampUsingOffset() {
      return Date.now() + (this.client.serverTimeOffset || 0);
    }
    isTimeOffsetSet() {
      return this.client.serverTimeOffset !== null;
    }
    _saveBasicOptions(e) {
      (this.method = "basic"),
        (this.key = e.key),
        (this.basicKey = le(e.key)),
        (this.authOptions = e || {}),
        "clientId" in e && this._userSetClientId(e.clientId);
    }
    _saveTokenOptions(e, t) {
      (this.method = "token"),
        e && (this.tokenParams = e),
        t &&
          (t.token &&
            (t.tokenDetails =
              typeof t.token == "string"
                ? {
                    token: t.token,
                  }
                : t.token),
          t.tokenDetails && (this.tokenDetails = t.tokenDetails),
          "clientId" in t && this._userSetClientId(t.clientId),
          (this.authOptions = t));
    }
    async _ensureValidAuthCredentials(e) {
      const t = this.tokenDetails;
      if (t) {
        if (this._tokenClientIdMismatch(t.clientId))
          throw new u(
            "Mismatch between clientId in token (" +
              t.clientId +
              ") and current clientId (" +
              this.clientId +
              ")",
            40102,
            403
          );
        if (
          !this.isTimeOffsetSet() ||
          !t.expires ||
          t.expires >= this.getTimestampUsingOffset()
        )
          return t;
        this.tokenDetails = null;
      }
      const n = (
        this.waitingForTokenRequest ||
        (this.waitingForTokenRequest = xt.create(this.logger))
      ).createPromise();
      if (this.currentTokenRequestId !== null && !e) return n;
      const s = (this.currentTokenRequestId = Qn());
      let i,
        r = null;
      try {
        i = await this.requestToken(this.tokenParams, this.authOptions);
      } catch (a) {
        r = a;
      }
      if (this.currentTokenRequestId > s) return n;
      this.currentTokenRequestId = null;
      const o = this.waitingForTokenRequest;
      return (
        (this.waitingForTokenRequest = null),
        r ? (o?.rejectAll(r), n) : (o?.resolveAll((this.tokenDetails = i)), n)
      );
    }
    _userSetClientId(e) {
      if (typeof e == "string" || e === null) {
        if (e === "*")
          throw new u(
            'Can’t use "*" as a clientId as that string is reserved. (To change the default token request behaviour to use a wildcard clientId, instantiate the library with {defaultTokenParams: {clientId: "*"}}), or if calling authorize(), pass it in as a tokenParam: authorize({clientId: "*"}, authOptions)',
            40012,
            400
          );
        {
          const t = this._uncheckedSetClientId(e);
          if (t) throw t;
        }
      } else
        throw new u("clientId must be either a string or null", 40012, 400);
    }
    _uncheckedSetClientId(e) {
      if (this._tokenClientIdMismatch(e)) {
        const t =
            "Unexpected clientId mismatch: client has " +
            this.clientId +
            ", requested " +
            e,
          n = new u(t, 40102, 401);
        return (
          l.logAction(
            this.logger,
            l.LOG_ERROR,
            "Auth._uncheckedSetClientId()",
            t
          ),
          n
        );
      } else return (this.clientId = this.tokenParams.clientId = e), null;
    }
    _tokenClientIdMismatch(e) {
      return !!(
        this.clientId &&
        this.clientId !== "*" &&
        e &&
        e !== "*" &&
        this.clientId !== e
      );
    }
    static isTokenErr(e) {
      return e.code && e.code >= 40140 && e.code < 40150;
    }
    revokeTokens(e, t) {
      return this.client.rest.revokeTokens(e, t);
    }
  },
  G = $n;
function qt(e) {
  const t = [];
  if (e) for (const n in e) t.push(n + "=" + e[n]);
  return t.join("&");
}
function Ee(e, t) {
  return e + (t ? "?" : "") + qt(t);
}
function Jn(e, t, n, s, i) {
  e.error
    ? l.logActionNoStrip(
        i,
        l.LOG_MICRO,
        "Http." + t + "()",
        "Received Error; " + Ee(n, s) + "; Error: " + P(e.error)
      )
    : l.logActionNoStrip(
        i,
        l.LOG_MICRO,
        "Http." + t + "()",
        "Received; " +
          Ee(n, s) +
          "; Headers: " +
          qt(e.headers) +
          "; StatusCode: " +
          e.statusCode +
          "; Body" +
          (f.BufferUtils.isBuffer(e.body)
            ? " (Base64): " + f.BufferUtils.base64Encode(e.body)
            : ": " + e.body)
      );
}
function Xn(e, t, n, s, i) {
  i.shouldLog(l.LOG_MICRO) &&
    l.logActionNoStrip(
      i,
      l.LOG_MICRO,
      "Http." + e + "()",
      "Sending; " +
        Ee(t, s) +
        "; Body" +
        (f.BufferUtils.isBuffer(n)
          ? " (Base64): " + f.BufferUtils.base64Encode(n)
          : ": " + n)
    );
}
var Yn = class {
    constructor(e) {
      (this.client = e),
        (this.platformHttp = new f.Http(e)),
        (this.checkConnectivity = this.platformHttp.checkConnectivity
          ? () => this.platformHttp.checkConnectivity()
          : void 0);
    }
    get logger() {
      var e, t;
      return (t = (e = this.client) == null ? void 0 : e.logger) != null
        ? t
        : l.defaultLogger;
    }
    get supportsAuthHeaders() {
      return this.platformHttp.supportsAuthHeaders;
    }
    get supportsLinkHeaders() {
      return this.platformHttp.supportsLinkHeaders;
    }
    _getHosts(e) {
      const t = e.connection,
        n = t && t.connectionManager.host;
      return n
        ? [n].concat(A.getFallbackHosts(e.options))
        : A.getHosts(e.options);
    }
    async do(e, t, n, s, i) {
      try {
        const r = this.client;
        if (!r)
          return {
            error: new u("http.do called without client", 5e4, 500),
          };
        const o =
            typeof t == "function"
              ? t
              : function (g) {
                  return r.baseUri(g) + t;
                },
          a = r._currentFallback;
        if (a)
          if (a.validUntil > Date.now()) {
            const g = await this.doUri(e, o(a.host), n, s, i);
            return g.error && this.platformHttp.shouldFallback(g.error)
              ? ((r._currentFallback = null), this.do(e, t, n, s, i))
              : g;
          } else r._currentFallback = null;
        const h = this._getHosts(r);
        if (h.length === 1) return this.doUri(e, o(h[0]), n, s, i);
        let c = null;
        const d = async (g, p) => {
          const m = g.shift();
          c = c ?? new Date();
          const b = await this.doUri(e, o(m), n, s, i);
          return b.error &&
            this.platformHttp.shouldFallback(b.error) &&
            g.length
            ? Date.now() - c.getTime() > r.options.timeouts.httpMaxRetryDuration
              ? {
                  error: new u(
                    `Timeout for trying fallback hosts retries. Total elapsed time exceeded the ${r.options.timeouts.httpMaxRetryDuration}ms limit`,
                    50003,
                    500
                  ),
                }
              : d(g, !0)
            : (p &&
                (r._currentFallback = {
                  host: m,
                  validUntil:
                    Date.now() + r.options.timeouts.fallbackRetryTimeout,
                }),
              b);
        };
        return d(h);
      } catch (r) {
        return {
          error: new u(`Unexpected error in Http.do: ${P(r)}`, 500, 5e4),
        };
      }
    }
    async doUri(e, t, n, s, i) {
      try {
        Xn(e, t, s, i, this.logger);
        const r = await this.platformHttp.doUri(e, t, n, s, i);
        return (
          this.logger.shouldLog(l.LOG_MICRO) && Jn(r, e, t, i, this.logger), r
        );
      } catch (r) {
        return {
          error: new u(`Unexpected error in Http.doUri: ${P(r)}`, 500, 5e4),
        };
      }
    }
  },
  Ht = class {
    constructor(e) {
      (this.Platform = f),
        (this.ErrorInfo = u),
        (this.Logger = l),
        (this.Defaults = A),
        (this.Utils = st);
      var t, n, s, i, r, o, a, h;
      (this._additionalHTTPRequestImplementations =
        (t = e.plugins) != null ? t : null),
        (this.logger = new l()),
        this.logger.setLog(e.logLevel, e.logHandler),
        (this._MsgPack =
          (s = (n = e.plugins) == null ? void 0 : n.MsgPack) != null
            ? s
            : null);
      const c = (this.options = A.normaliseOptions(
        e,
        this._MsgPack,
        this.logger
      ));
      if (c.key) {
        const d = c.key.match(/^([^:\s]+):([^:.\s]+)$/);
        if (!d) {
          const g = "invalid key parameter";
          throw (
            (l.logAction(this.logger, l.LOG_ERROR, "BaseClient()", g),
            new u(g, 40400, 404))
          );
        }
        (c.keyName = d[1]), (c.keySecret = d[2]);
      }
      if ("clientId" in c)
        if (typeof c.clientId == "string" || c.clientId === null) {
          if (c.clientId === "*")
            throw new u(
              'Can’t use "*" as a clientId as that string is reserved. (To change the default token request behaviour to use a wildcard clientId, use {defaultTokenParams: {clientId: "*"}})',
              40012,
              400
            );
        } else
          throw new u("clientId must be either a string or null", 40012, 400);
      (this._currentFallback = null),
        (this.serverTimeOffset = null),
        (this.http = new Yn(this)),
        (this.auth = new G(this, c)),
        (this._rest =
          (i = e.plugins) != null && i.Rest ? new e.plugins.Rest(this) : null),
        (this._Crypto =
          (o = (r = e.plugins) == null ? void 0 : r.Crypto) != null ? o : null),
        (this.__FilteredSubscriptions =
          (h = (a = e.plugins) == null ? void 0 : a.MessageInteractions) != null
            ? h
            : null);
    }
    get rest() {
      return this._rest || B("Rest"), this._rest;
    }
    get _FilteredSubscriptions() {
      return (
        this.__FilteredSubscriptions || B("MessageInteractions"),
        this.__FilteredSubscriptions
      );
    }
    get channels() {
      return this.rest.channels;
    }
    get push() {
      return this.rest.push;
    }
    get device() {
      var e;
      return (
        (!((e = this.options.plugins) != null && e.Push) ||
          !this.push.LocalDevice) &&
          B("Push"),
        this._device || (this._device = this.push.LocalDevice.load(this)),
        this._device
      );
    }
    baseUri(e) {
      return (
        A.getHttpScheme(this.options) + e + ":" + A.getPort(this.options, !1)
      );
    }
    async stats(e) {
      return this.rest.stats(e);
    }
    async time(e) {
      return this.rest.time(e);
    }
    async request(e, t, n, s, i, r) {
      return this.rest.request(e, t, n, s, i, r);
    }
    batchPublish(e) {
      return this.rest.batchPublish(e);
    }
    batchPresence(e) {
      return this.rest.batchPresence(e);
    }
    setLog(e) {
      this.logger.setLog(e.level, e.handler);
    }
  };
Ht.Platform = f;
var Zn = Ht,
  Dt = [
    "message.unset",
    "message.create",
    "message.update",
    "message.delete",
    "annotation.create",
    "annotation.delete",
    "meta.occupancy",
  ],
  es = new Map(Dt.map((e, t) => [e, t])),
  ts = new Map(Dt.map((e, t) => [t, e]));
function ns(e) {
  return ts.get(e);
}
function ss(e) {
  return e ? es.get(e) : void 0;
}
function is(e) {
  return !e || !e.channelOptions
    ? {
        channelOptions: e,
        plugins: {},
        baseEncodedPreviousPayload: void 0,
      }
    : e;
}
function rs(e) {
  let t = 0;
  return (
    e.name && (t += e.name.length),
    e.clientId && (t += e.clientId.length),
    e.extras && (t += JSON.stringify(e.extras).length),
    e.data && (t += gt(e.data)),
    t
  );
}
async function os(e, t) {
  let n = e.data,
    s = e.encoding,
    i = t.channelCipher;
  (s = s ? s + "/" : ""),
    f.BufferUtils.isBuffer(n) ||
      ((n = f.BufferUtils.utf8Encode(String(n))), (s = s + "utf-8/"));
  const r = await i.encrypt(n);
  return (e.data = r), (e.encoding = s + "cipher+" + i.algorithm), e;
}
async function as(e, t) {
  const n = e.data;
  if (
    !(
      typeof n == "string" ||
      f.BufferUtils.isBuffer(n) ||
      n === null ||
      n === void 0
    )
  )
    if (ne(n) || Array.isArray(n))
      (e.data = JSON.stringify(n)),
        (e.encoding = e.encoding ? e.encoding + "/json" : "json");
    else throw new u("Data type is unsupported", 40013, 400);
  return t != null && t.cipher ? os(e, t) : e;
}
async function cs(e, t) {
  return Promise.all(e.map((n) => as(n, t)));
}
async function Wt(e, t) {
  const n = is(t);
  let s = e.data;
  const i = e.encoding;
  if (i) {
    const r = i.split("/");
    let o,
      a = r.length,
      h = e.data,
      c = "";
    try {
      for (; (o = a) > 0; ) {
        const d = r[--a].match(/([-\w]+)(\+([\w-]+))?/);
        if (!d) break;
        switch (((c = d[1]), c)) {
          case "base64":
            (h = f.BufferUtils.base64Decode(String(h))),
              o == r.length && (s = h);
            continue;
          case "utf-8":
            h = f.BufferUtils.utf8Decode(h);
            continue;
          case "json":
            h = JSON.parse(h);
            continue;
          case "cipher":
            if (
              n.channelOptions != null &&
              n.channelOptions.cipher &&
              n.channelOptions.channelCipher
            ) {
              const g = d[3],
                p = n.channelOptions.channelCipher;
              if (g != p.algorithm)
                throw new Error(
                  "Unable to decrypt message with given cipher; incompatible cipher params"
                );
              h = await p.decrypt(h);
              continue;
            } else
              throw new Error(
                "Unable to decrypt message; not an encrypted channel"
              );
          case "vcdiff":
            if (!n.plugins || !n.plugins.vcdiff)
              throw new u(
                "Missing Vcdiff decoder (https://github.com/ably-forks/vcdiff-decoder)",
                40019,
                400
              );
            if (typeof Uint8Array > "u")
              throw new u(
                "Delta decoding not supported on this browser (need ArrayBuffer & Uint8Array)",
                40020,
                400
              );
            try {
              let g = n.baseEncodedPreviousPayload;
              typeof g == "string" && (g = f.BufferUtils.utf8Encode(g));
              const p = f.BufferUtils.toBuffer(g);
              (h = f.BufferUtils.toBuffer(h)),
                (h = f.BufferUtils.arrayBufferViewToBuffer(
                  n.plugins.vcdiff.decode(h, p)
                )),
                (s = h);
            } catch (g) {
              throw new u("Vcdiff delta decode failed with " + g, 40018, 400);
            }
            continue;
          default:
            throw new Error("Unknown encoding");
        }
      }
    } catch (d) {
      const g = d;
      throw new u(
        "Error processing the " +
          c +
          " encoding, decoder returned ‘" +
          g.message +
          "’",
        g.code || 40013,
        400
      );
    } finally {
      (e.encoding = o <= 0 ? null : r.slice(0, o).join("/")), (e.data = h);
    }
  }
  n.baseEncodedPreviousPayload = s;
}
function ue(e, t) {
  if (t?.stringifyAction) {
    const s = ns(e.action) || e.action;
    return Object.assign(
      new Ve(),
      fe(x({}, e), {
        action: s,
      })
    );
  }
  return Object.assign(new Ve(), e);
}
function Gt(e) {
  const t = e.length,
    n = new Array(t);
  for (let s = 0; s < t; s++) n[s] = ue(e[s]);
  return n;
}
function Ft(e) {
  let t,
    n = 0;
  for (let s = 0; s < e.length; s++)
    (t = e[s]), (n += t.size || (t.size = rs(t)));
  return n;
}
var Ve = class {
    toJSON() {
      let e = this.encoding,
        t = this.data;
      return (
        t &&
          f.BufferUtils.isBuffer(t) &&
          (arguments.length > 0
            ? ((e = e ? e + "/base64" : "base64"),
              (t = f.BufferUtils.base64Encode(t)))
            : (t = f.BufferUtils.toBuffer(t))),
        {
          name: this.name,
          id: this.id,
          clientId: this.clientId,
          connectionId: this.connectionId,
          connectionKey: this.connectionKey,
          extras: this.extras,
          serial: this.serial,
          action: ss(this.action) || this.action,
          refSerial: this.refSerial,
          refType: this.refType,
          updatedAt: this.updatedAt,
          updateSerial: this.updateSerial,
          operation: this.operation,
          encoding: e,
          data: t,
        }
      );
    }
    toString() {
      let e = "[Message";
      return (
        this.name && (e += "; name=" + this.name),
        this.id && (e += "; id=" + this.id),
        this.timestamp && (e += "; timestamp=" + this.timestamp),
        this.clientId && (e += "; clientId=" + this.clientId),
        this.connectionId && (e += "; connectionId=" + this.connectionId),
        this.encoding && (e += "; encoding=" + this.encoding),
        this.extras && (e += "; extras =" + JSON.stringify(this.extras)),
        this.data &&
          (typeof this.data == "string"
            ? (e += "; data=" + this.data)
            : f.BufferUtils.isBuffer(this.data)
            ? (e += "; data (buffer)=" + f.BufferUtils.base64Encode(this.data))
            : (e += "; data (json)=" + JSON.stringify(this.data))),
        this.extras && (e += "; extras=" + JSON.stringify(this.extras)),
        this.action && (e += "; action=" + this.action),
        this.serial && (e += "; serial=" + this.serial),
        this.refSerial && (e += "; refSerial=" + this.refSerial),
        this.refType && (e += "; refType=" + this.refType),
        this.updatedAt && (e += "; updatedAt=" + this.updatedAt),
        this.updateSerial && (e += "; updateSerial=" + this.updateSerial),
        this.operation &&
          (e += "; operation=" + JSON.stringify(this.operation)),
        (e += "]"),
        e
      );
    }
  },
  ls = Wt;
function hs(e, t, n, s) {
  try {
    n.apply(t, s);
  } catch (i) {
    l.logAction(
      e,
      l.LOG_ERROR,
      "EventEmitter.emit()",
      "Unexpected listener exception: " + i + "; stack = " + (i && i.stack)
    );
  }
}
function Ae(e, t, n) {
  let s, i, r;
  for (let o = 0; o < e.length; o++)
    if (((s = e[o]), n && (s = s[n]), Array.isArray(s))) {
      for (; (i = s.indexOf(t)) !== -1; ) s.splice(i, 1);
      n && s.length === 0 && delete e[o][n];
    } else if (ne(s))
      for (r in s)
        Object.prototype.hasOwnProperty.call(s, r) &&
          Array.isArray(s[r]) &&
          Ae([s], t, r);
}
var us = class {
    constructor(e) {
      (this.logger = e),
        (this.any = []),
        (this.events = Object.create(null)),
        (this.anyOnce = []),
        (this.eventsOnce = Object.create(null));
    }
    on(...e) {
      if (e.length === 1) {
        const t = e[0];
        if (typeof t == "function") this.any.push(t);
        else
          throw new Error(
            "EventListener.on(): Invalid arguments: " + f.Config.inspect(e)
          );
      }
      if (e.length === 2) {
        const [t, n] = e;
        if (typeof n != "function")
          throw new Error(
            "EventListener.on(): Invalid arguments: " + f.Config.inspect(e)
          );
        if (U(t)) this.any.push(n);
        else if (Array.isArray(t))
          t.forEach((s) => {
            this.on(s, n);
          });
        else {
          if (typeof t != "string")
            throw new Error(
              "EventListener.on(): Invalid arguments: " + f.Config.inspect(e)
            );
          (this.events[t] || (this.events[t] = [])).push(n);
        }
      }
    }
    off(...e) {
      if (e.length == 0 || (U(e[0]) && U(e[1]))) {
        (this.any = []),
          (this.events = Object.create(null)),
          (this.anyOnce = []),
          (this.eventsOnce = Object.create(null));
        return;
      }
      const [t, n] = e;
      let s = null,
        i = null;
      if (e.length === 1 || !n) typeof t == "function" ? (s = t) : (i = t);
      else {
        if (typeof n != "function")
          throw new Error(
            "EventEmitter.off(): invalid arguments:" + f.Config.inspect(e)
          );
        [i, s] = [t, n];
      }
      if (s && U(i)) {
        Ae([this.any, this.events, this.anyOnce, this.eventsOnce], s);
        return;
      }
      if (Array.isArray(i)) {
        i.forEach((r) => {
          this.off(r, s);
        });
        return;
      }
      if (typeof i != "string")
        throw new Error(
          "EventEmitter.off(): invalid arguments:" + f.Config.inspect(e)
        );
      s
        ? Ae([this.events, this.eventsOnce], s, i)
        : (delete this.events[i], delete this.eventsOnce[i]);
    }
    listeners(e) {
      if (e) {
        const t = this.events[e] || [];
        return (
          this.eventsOnce[e] &&
            Array.prototype.push.apply(t, this.eventsOnce[e]),
          t.length ? t : null
        );
      }
      return this.any.length ? this.any : null;
    }
    emit(e, ...t) {
      const n = {
          event: e,
        },
        s = [];
      this.anyOnce.length &&
        (Array.prototype.push.apply(s, this.anyOnce), (this.anyOnce = [])),
        this.any.length && Array.prototype.push.apply(s, this.any);
      const i = this.eventsOnce[e];
      i && (Array.prototype.push.apply(s, i), delete this.eventsOnce[e]);
      const r = this.events[e];
      r && Array.prototype.push.apply(s, r),
        s.forEach((o) => {
          hs(this.logger, n, o, t);
        });
    }
    once(...e) {
      const t = e.length;
      if (t === 0 || (t === 1 && typeof e[0] != "function")) {
        const i = e[0];
        return new Promise((r) => {
          this.once(i, r);
        });
      }
      const [n, s] = e;
      if (e.length === 1 && typeof n == "function") this.anyOnce.push(n);
      else if (U(n)) {
        if (typeof s != "function")
          throw new Error(
            "EventEmitter.once(): Invalid arguments:" + f.Config.inspect(e)
          );
        this.anyOnce.push(s);
      } else if (Array.isArray(n)) {
        const i = this,
          r = function () {
            const o = Array.prototype.slice.call(arguments);
            if (
              (n.forEach(function (a) {
                i.off(a, r);
              }),
              typeof s != "function")
            )
              throw new Error(
                "EventEmitter.once(): Invalid arguments:" + f.Config.inspect(e)
              );
            s.apply(this, o);
          };
        n.forEach(function (o) {
          i.on(o, r);
        });
      } else {
        if (typeof n != "string")
          throw new Error(
            "EventEmitter.once(): Invalid arguments:" + f.Config.inspect(e)
          );
        const i = this.eventsOnce[n] || (this.eventsOnce[n] = []);
        if (s) {
          if (typeof s != "function")
            throw new Error(
              "EventEmitter.once(): Invalid arguments:" + f.Config.inspect(e)
            );
          i.push(s);
        }
      }
    }
    async whenState(e, t) {
      if (typeof e != "string" || typeof t != "string")
        throw new Error("whenState requires a valid state String argument");
      return e === t ? null : this.once(e);
    }
  },
  I = us,
  v = {
    HEARTBEAT: 0,
    ACK: 1,
    NACK: 2,
    CONNECT: 3,
    CONNECTED: 4,
    DISCONNECT: 5,
    DISCONNECTED: 6,
    CLOSE: 7,
    CLOSED: 8,
    ERROR: 9,
    ATTACH: 10,
    ATTACHED: 11,
    DETACH: 12,
    DETACHED: 13,
    PRESENCE: 14,
    MESSAGE: 15,
    SYNC: 16,
    AUTH: 17,
    ACTIVATE: 18,
  },
  jt = [];
Object.keys(v).forEach(function (e) {
  jt[v[e]] = e;
});
var N = {
    HAS_PRESENCE: 1,
    HAS_BACKLOG: 2,
    RESUMED: 4,
    TRANSIENT: 16,
    ATTACH_RESUME: 32,
    PRESENCE: 65536,
    PUBLISH: 1 << 17,
    SUBSCRIBE: 1 << 18,
    PRESENCE_SUBSCRIBE: 1 << 19,
  },
  fs = Object.keys(N);
N.MODE_ALL = N.PRESENCE | N.PUBLISH | N.SUBSCRIBE | N.PRESENCE_SUBSCRIBE;
function ze(e) {
  const t = [];
  if (e) for (let n = 0; n < e.length; n++) t.push(e[n].toString());
  return "[ " + t.join(", ") + " ]";
}
var Vt = ["PRESENCE", "PUBLISH", "SUBSCRIBE", "PRESENCE_SUBSCRIBE"],
  ds = yt;
function gs(e, t, n, s) {
  const i = mt(e, t, s);
  return ps(i, n);
}
function ps(e, t) {
  const n = e.error;
  n && (e.error = u.fromValues(n));
  const s = e.messages;
  if (s)
    for (let r = 0; r < s.length; r++)
      s[r] = ue(s[r], {
        stringifyAction: !0,
      });
  const i = t ? e.presence : void 0;
  if (t && i && t)
    for (let r = 0; r < i.length; r++)
      i[r] = t.presenceMessageFromValues(i[r], !0);
  return Object.assign(
    new qe(),
    fe(x({}, e), {
      presence: i,
    })
  );
}
function D(e) {
  return Object.assign(new qe(), e);
}
function zt(e, t) {
  let n = "[ProtocolMessage";
  e.action !== void 0 && (n += "; action=" + jt[e.action] || e.action);
  const s = [
    "id",
    "channel",
    "channelSerial",
    "connectionId",
    "count",
    "msgSerial",
    "timestamp",
  ];
  let i;
  for (let r = 0; r < s.length; r++)
    (i = s[r]), e[i] !== void 0 && (n += "; " + i + "=" + e[i]);
  if (
    (e.messages && (n += "; messages=" + ze(Gt(e.messages))),
    e.presence &&
      t &&
      (n += "; presence=" + ze(t.presenceMessagesFromValuesArray(e.presence))),
    e.error && (n += "; error=" + u.fromValues(e.error).toString()),
    e.auth && e.auth.accessToken && (n += "; token=" + e.auth.accessToken),
    e.flags && (n += "; flags=" + fs.filter(e.hasFlag).join(",")),
    e.params)
  ) {
    let r = "";
    ht(e.params, function (o) {
      r.length > 0 && (r += "; "), (r += o + "=" + e.params[o]);
    }),
      r.length > 0 && (n += "; params=[" + r + "]");
  }
  return (n += "]"), n;
}
var qe = class {
    constructor() {
      this.hasFlag = (e) => (this.flags & N[e]) > 0;
    }
    setFlag(e) {
      return (this.flags = this.flags | N[e]);
    }
    getMode() {
      return this.flags && this.flags & N.MODE_ALL;
    }
    encodeModesToFlags(e) {
      e.forEach((t) => this.setFlag(t));
    }
    decodeModesFromFlags() {
      const e = [];
      return (
        Vt.forEach((t) => {
          this.hasFlag(t) && e.push(t);
        }),
        e.length > 0 ? e : void 0
      );
    }
  },
  ms = qe,
  ys = class extends I {
    constructor(e) {
      super(e), (this.messages = []);
    }
    count() {
      return this.messages.length;
    }
    push(e) {
      this.messages.push(e);
    }
    shift() {
      return this.messages.shift();
    }
    last() {
      return this.messages[this.messages.length - 1];
    }
    copyAll() {
      return this.messages.slice();
    }
    append(e) {
      this.messages.push.apply(this.messages, e);
    }
    prepend(e) {
      this.messages.unshift.apply(this.messages, e);
    }
    completeMessages(e, t, n) {
      n = n || null;
      const s = this.messages;
      if (s.length === 0)
        throw new Error(
          "MessageQueue.completeMessages(): completeMessages called on any empty MessageQueue"
        );
      const i = s[0];
      if (i) {
        const r = i.message.msgSerial,
          o = e + t;
        if (o > r) {
          const a = s.splice(0, o - r);
          for (const h of a) h.callback(n);
        }
        s.length == 0 && this.emit("idle");
      }
    }
    completeAllMessages(e) {
      this.completeMessages(0, Number.MAX_SAFE_INTEGER || Number.MAX_VALUE, e);
    }
    resetSendAttempted() {
      for (let e of this.messages) e.sendAttempted = !1;
    }
    clear() {
      (this.messages = []), this.emit("idle");
    }
  },
  Kt = ys,
  Ke = class {
    constructor(e, t) {
      (this.message = e), (this.callback = t), (this.merged = !1);
      const n = e.action;
      (this.sendAttempted = !1),
        (this.ackRequired = n == v.MESSAGE || n == v.PRESENCE);
    }
  },
  vs = class extends I {
    constructor(e) {
      super(e.logger),
        (this.transport = e),
        (this.messageQueue = new Kt(this.logger)),
        e.on("ack", (t, n) => {
          this.onAck(t, n);
        }),
        e.on("nack", (t, n, s) => {
          this.onNack(t, n, s);
        });
    }
    onAck(e, t) {
      this.messageQueue.completeMessages(e, t);
    }
    onNack(e, t, n) {
      l.logAction(
        this.logger,
        l.LOG_ERROR,
        "Protocol.onNack()",
        "serial = " + e + "; count = " + t + "; err = " + P(n)
      ),
        n ||
          (n = new u(
            "Unable to send message; channel not responding",
            50001,
            500
          )),
        this.messageQueue.completeMessages(e, t, n);
    }
    onceIdle(e) {
      const t = this.messageQueue;
      if (t.count() === 0) {
        e();
        return;
      }
      t.once("idle", e);
    }
    send(e) {
      e.ackRequired && this.messageQueue.push(e),
        this.logger.shouldLog(l.LOG_MICRO) &&
          l.logActionNoStrip(
            this.logger,
            l.LOG_MICRO,
            "Protocol.send()",
            "sending msg; " +
              zt(
                e.message,
                this.transport.connectionManager.realtime._RealtimePresence
              )
          ),
        (e.sendAttempted = !0),
        this.transport.send(e.message);
    }
    getTransport() {
      return this.transport;
    }
    getPendingMessages() {
      return this.messageQueue.copyAll();
    }
    clearPendingMessages() {
      return this.messageQueue.clear();
    }
    finish() {
      const e = this.transport;
      this.onceIdle(function () {
        e.disconnect();
      });
    }
  },
  ws = vs,
  bs = class {
    constructor(e, t, n, s) {
      (this.previous = e),
        (this.current = t),
        n && (this.retryIn = n),
        s && (this.reason = s);
    }
  },
  ie = bs,
  H = {
    DISCONNECTED: 80003,
    SUSPENDED: 80002,
    FAILED: 8e4,
    CLOSING: 80017,
    CLOSED: 80017,
    UNKNOWN_CONNECTION_ERR: 50002,
    UNKNOWN_CHANNEL_ERR: 50001,
  },
  Ts = {
    disconnected: () =>
      u.fromValues({
        statusCode: 400,
        code: H.DISCONNECTED,
        message: "Connection to server temporarily unavailable",
      }),
    suspended: () =>
      u.fromValues({
        statusCode: 400,
        code: H.SUSPENDED,
        message: "Connection to server unavailable",
      }),
    failed: () =>
      u.fromValues({
        statusCode: 400,
        code: H.FAILED,
        message: "Connection failed or disconnected by server",
      }),
    closing: () =>
      u.fromValues({
        statusCode: 400,
        code: H.CLOSING,
        message: "Connection closing",
      }),
    closed: () =>
      u.fromValues({
        statusCode: 400,
        code: H.CLOSED,
        message: "Connection closed",
      }),
    unknownConnectionErr: () =>
      u.fromValues({
        statusCode: 500,
        code: H.UNKNOWN_CONNECTION_ERR,
        message: "Internal connection error",
      }),
    unknownChannelErr: () =>
      u.fromValues({
        statusCode: 500,
        code: H.UNKNOWN_CONNECTION_ERR,
        message: "Internal channel error",
      }),
  };
function Ss(e) {
  return !e.statusCode || !e.code || e.statusCode >= 500
    ? !0
    : Object.values(H).includes(e.code);
}
var F = Ts,
  Cs = D({
    action: v.CLOSE,
  }),
  Es = D({
    action: v.DISCONNECT,
  }),
  As = class extends I {
    constructor(e, t, n, s) {
      super(e.logger),
        s && ((n.format = void 0), (n.heartbeats = !0)),
        (this.connectionManager = e),
        (this.auth = t),
        (this.params = n),
        (this.timeouts = n.options.timeouts),
        (this.format = n.format),
        (this.isConnected = !1),
        (this.isFinished = !1),
        (this.isDisposed = !1),
        (this.maxIdleInterval = null),
        (this.idleTimer = null),
        (this.lastActivity = null);
    }
    connect() {}
    close() {
      this.isConnected && this.requestClose(),
        this.finish("closed", F.closed());
    }
    disconnect(e) {
      this.isConnected && this.requestDisconnect(),
        this.finish("disconnected", e || F.disconnected());
    }
    fail(e) {
      this.isConnected && this.requestDisconnect(),
        this.finish("failed", e || F.failed());
    }
    finish(e, t) {
      var n;
      this.isFinished ||
        ((this.isFinished = !0),
        (this.isConnected = !1),
        (this.maxIdleInterval = null),
        clearTimeout((n = this.idleTimer) != null ? n : void 0),
        (this.idleTimer = null),
        this.emit(e, t),
        this.dispose());
    }
    onProtocolMessage(e) {
      switch (
        (this.logger.shouldLog(l.LOG_MICRO) &&
          l.logActionNoStrip(
            this.logger,
            l.LOG_MICRO,
            "Transport.onProtocolMessage()",
            "received on " +
              this.shortName +
              ": " +
              zt(e, this.connectionManager.realtime._RealtimePresence) +
              "; connectionId = " +
              this.connectionManager.connectionId
          ),
        this.onActivity(),
        e.action)
      ) {
        case v.HEARTBEAT:
          l.logActionNoStrip(
            this.logger,
            l.LOG_MICRO,
            "Transport.onProtocolMessage()",
            this.shortName +
              " heartbeat; connectionId = " +
              this.connectionManager.connectionId
          ),
            this.emit("heartbeat", e.id);
          break;
        case v.CONNECTED:
          this.onConnect(e),
            this.emit(
              "connected",
              e.error,
              e.connectionId,
              e.connectionDetails,
              e
            );
          break;
        case v.CLOSED:
          this.onClose(e);
          break;
        case v.DISCONNECTED:
          this.onDisconnect(e);
          break;
        case v.ACK:
          this.emit("ack", e.msgSerial, e.count);
          break;
        case v.NACK:
          this.emit("nack", e.msgSerial, e.count, e.error);
          break;
        case v.SYNC:
          this.connectionManager.onChannelMessage(e, this);
          break;
        case v.ACTIVATE:
          break;
        case v.AUTH:
          O(this.auth.authorize(), (t) => {
            t &&
              l.logAction(
                this.logger,
                l.LOG_ERROR,
                "Transport.onProtocolMessage()",
                "Ably requested re-authentication, but unable to obtain a new token: " +
                  P(t)
              );
          });
          break;
        case v.ERROR:
          if (e.channel === void 0) {
            this.onFatalError(e);
            break;
          }
          this.connectionManager.onChannelMessage(e, this);
          break;
        default:
          this.connectionManager.onChannelMessage(e, this);
      }
    }
    onConnect(e) {
      if (((this.isConnected = !0), !e.connectionDetails))
        throw new Error(
          "Transport.onConnect(): Connect message recieved without connectionDetails"
        );
      const t = e.connectionDetails.maxIdleInterval;
      t &&
        ((this.maxIdleInterval = t + this.timeouts.realtimeRequestTimeout),
        this.onActivity());
    }
    onDisconnect(e) {
      const t = e && e.error;
      this.finish("disconnected", t);
    }
    onFatalError(e) {
      const t = e && e.error;
      this.finish("failed", t);
    }
    onClose(e) {
      const t = e && e.error;
      this.finish("closed", t);
    }
    requestClose() {
      this.send(Cs);
    }
    requestDisconnect() {
      this.send(Es);
    }
    ping(e) {
      const t = {
        action: v.HEARTBEAT,
      };
      e && (t.id = e), this.send(D(t));
    }
    dispose() {
      (this.isDisposed = !0), this.off();
    }
    onActivity() {
      this.maxIdleInterval &&
        ((this.lastActivity = this.connectionManager.lastActivity = Date.now()),
        this.setIdleTimer(this.maxIdleInterval + 100));
    }
    setIdleTimer(e) {
      this.idleTimer ||
        (this.idleTimer = setTimeout(() => {
          this.onIdleTimerExpire();
        }, e));
    }
    onIdleTimerExpire() {
      if (!this.lastActivity || !this.maxIdleInterval)
        throw new Error(
          "Transport.onIdleTimerExpire(): lastActivity/maxIdleInterval not set"
        );
      this.idleTimer = null;
      const e = Date.now() - this.lastActivity,
        t = this.maxIdleInterval - e;
      if (t <= 0) {
        const n =
          "No activity seen from realtime in " +
          e +
          "ms; assuming connection has dropped";
        l.logAction(
          this.logger,
          l.LOG_ERROR,
          "Transport.onIdleTimerExpire()",
          n
        ),
          this.disconnect(new u(n, 80003, 408));
      } else this.setIdleTimer(t + 100);
    }
    static tryConnect(e, t, n, s, i) {
      const r = new e(t, n, s);
      let o;
      const a = function (c) {
          clearTimeout(o),
            i({
              event: this.event,
              error: c,
            });
        },
        h = t.options.timeouts.realtimeRequestTimeout;
      return (
        (o = setTimeout(() => {
          r.off(["preconnect", "disconnected", "failed"]),
            r.dispose(),
            a.call(
              {
                event: "disconnected",
              },
              new u(
                "Timeout waiting for transport to indicate itself viable",
                5e4,
                500
              )
            );
        }, h)),
        r.on(["failed", "disconnected"], a),
        r.on("preconnect", function () {
          clearTimeout(o), r.off(["failed", "disconnected"], a), i(null, r);
        }),
        r.connect(),
        r
      );
    }
    static isAvailable() {
      throw new u("isAvailable not implemented for transport", 5e4, 500);
    }
  },
  Re = As,
  k;
((e) => {
  (e.WebSocket = "web_socket"),
    (e.Comet = "comet"),
    (e.XhrPolling = "xhr_polling");
})(k || (k = {}));
var Rs = typeof global < "u" ? global : typeof window < "u" ? window : self,
  pe = () => {
    var e;
    return (
      typeof f.WebStorage < "u" &&
      ((e = f.WebStorage) == null ? void 0 : e.localSupported)
    );
  },
  $ = () => {
    var e;
    return (
      typeof f.WebStorage < "u" &&
      ((e = f.WebStorage) == null ? void 0 : e.sessionSupported)
    );
  },
  Qe = function () {},
  me = "ably-transport-preference";
function ks(e, t, n) {
  let s;
  if (
    e.channel !== t.channel ||
    ((s = e.action) !== v.PRESENCE && s !== v.MESSAGE) ||
    s !== t.action
  )
    return !1;
  const i = s === v.PRESENCE ? "presence" : "messages",
    r = e[i].concat(t[i]);
  return Ft(r) > n ||
    !ut(r, "clientId") ||
    !r.every(function (a) {
      return !a.id;
    })
    ? !1
    : ((e[i] = r), !0);
}
function ke(e) {
  try {
    return JSON.parse(e);
  } catch {
    return null;
  }
}
var _s = class {
    constructor(e, t, n, s) {
      (this.options = e),
        (this.host = t),
        (this.mode = n),
        (this.connectionKey = s),
        (this.format = e.useBinaryProtocol ? "msgpack" : "json");
    }
    getConnectParams(e) {
      const t = e ? ae(e) : {},
        n = this.options;
      switch (this.mode) {
        case "resume":
          t.resume = this.connectionKey;
          break;
        case "recover": {
          const s = ke(n.recover);
          s && (t.recover = s.connectionKey);
          break;
        }
      }
      return (
        n.clientId !== void 0 && (t.clientId = n.clientId),
        n.echoMessages === !1 && (t.echo = "false"),
        this.format !== void 0 && (t.format = this.format),
        this.stream !== void 0 && (t.stream = this.stream),
        this.heartbeats !== void 0 && (t.heartbeats = this.heartbeats),
        (t.v = A.protocolVersion),
        (t.agent = Be(this.options)),
        n.transportParams !== void 0 && L(t, n.transportParams),
        t
      );
    }
    toString() {
      let e = "[mode=" + this.mode;
      return (
        this.host && (e += ",host=" + this.host),
        this.connectionKey && (e += ",connectionKey=" + this.connectionKey),
        this.format && (e += ",format=" + this.format),
        (e += "]"),
        e
      );
    }
  },
  Os = class Qt extends I {
    constructor(t, n) {
      super(t.logger),
        (this.supportedTransports = {}),
        (this.disconnectedRetryCount = 0),
        (this.pendingChannelMessagesState = {
          isProcessing: !1,
          queue: [],
        }),
        (this.realtime = t),
        this.initTransports(),
        (this.options = n);
      const s = n.timeouts,
        i = s.webSocketConnectTimeout + s.realtimeRequestTimeout;
      if (
        ((this.states = {
          initialized: {
            state: "initialized",
            terminal: !1,
            queueEvents: !0,
            sendEvents: !1,
            failState: "disconnected",
          },
          connecting: {
            state: "connecting",
            terminal: !1,
            queueEvents: !0,
            sendEvents: !1,
            retryDelay: i,
            failState: "disconnected",
          },
          connected: {
            state: "connected",
            terminal: !1,
            queueEvents: !1,
            sendEvents: !0,
            failState: "disconnected",
          },
          disconnected: {
            state: "disconnected",
            terminal: !1,
            queueEvents: !0,
            sendEvents: !1,
            retryDelay: s.disconnectedRetryTimeout,
            failState: "disconnected",
          },
          suspended: {
            state: "suspended",
            terminal: !1,
            queueEvents: !1,
            sendEvents: !1,
            retryDelay: s.suspendedRetryTimeout,
            failState: "suspended",
          },
          closing: {
            state: "closing",
            terminal: !1,
            queueEvents: !1,
            sendEvents: !1,
            retryDelay: s.realtimeRequestTimeout,
            failState: "closed",
          },
          closed: {
            state: "closed",
            terminal: !0,
            queueEvents: !1,
            sendEvents: !1,
            failState: "closed",
          },
          failed: {
            state: "failed",
            terminal: !0,
            queueEvents: !1,
            sendEvents: !1,
            failState: "failed",
          },
        }),
        (this.state = this.states.initialized),
        (this.errorReason = null),
        (this.queuedMessages = new Kt(this.logger)),
        (this.msgSerial = 0),
        (this.connectionDetails = void 0),
        (this.connectionId = void 0),
        (this.connectionKey = void 0),
        (this.connectionStateTtl = s.connectionStateTtl),
        (this.maxIdleInterval = null),
        (this.transports = ot(
          n.transports || A.defaultTransports,
          this.supportedTransports
        )),
        (this.transportPreference = null),
        this.transports.includes(k.WebSocket) &&
          (this.webSocketTransportAvailable = !0),
        this.transports.includes(k.XhrPolling)
          ? (this.baseTransport = k.XhrPolling)
          : this.transports.includes(k.Comet) && (this.baseTransport = k.Comet),
        (this.httpHosts = A.getHosts(n)),
        (this.wsHosts = A.getHosts(n, !0)),
        (this.activeProtocol = null),
        (this.host = null),
        (this.lastAutoReconnectAttempt = null),
        (this.lastActivity = null),
        (this.forceFallbackHost = !1),
        (this.connectCounter = 0),
        (this.wsCheckResult = null),
        (this.webSocketSlowTimer = null),
        (this.webSocketGiveUpTimer = null),
        (this.abandonedWebSocket = !1),
        !this.transports.length)
      ) {
        const o = "no requested transports available";
        throw (
          (l.logAction(
            this.logger,
            l.LOG_ERROR,
            "realtime.ConnectionManager()",
            o
          ),
          new Error(o))
        );
      }
      const r = f.Config.addEventListener;
      r &&
        ($() &&
          typeof n.recover == "function" &&
          r("beforeunload", this.persistConnection.bind(this)),
        n.closeOnUnload === !0 &&
          r("beforeunload", () => {
            this.requestState({
              state: "closing",
            });
          }),
        r("online", () => {
          var o;
          this.state == this.states.disconnected ||
          this.state == this.states.suspended
            ? this.requestState({
                state: "connecting",
              })
            : this.state == this.states.connecting &&
              ((o = this.pendingTransport) == null || o.off(),
              this.disconnectAllTransports(),
              this.startConnect());
        }),
        r("offline", () => {
          this.state == this.states.connected && this.disconnectAllTransports();
        }));
    }
    static supportedTransports(t) {
      const n = {
        supportedTransports: {},
      };
      return this.initTransports(t, n), n.supportedTransports;
    }
    static initTransports(t, n) {
      const s = x(x({}, f.Transports.bundledImplementations), t);
      [k.WebSocket, ...f.Transports.order].forEach((i) => {
        const r = s[i];
        r && r.isAvailable() && (n.supportedTransports[i] = r);
      });
    }
    initTransports() {
      Qt.initTransports(
        this.realtime._additionalTransportImplementations,
        this
      );
    }
    createTransportParams(t, n) {
      return new _s(this.options, t, n, this.connectionKey);
    }
    getTransportParams(t) {
      ((s) => {
        if (this.connectionKey) {
          s("resume");
          return;
        }
        if (typeof this.options.recover == "string") {
          s("recover");
          return;
        }
        const i = this.options.recover,
          r = this.getSessionRecoverData();
        if ((this.sessionRecoveryName(), r && typeof i == "function")) {
          i(r, (o) => {
            o
              ? ((this.options.recover = r.recoveryKey), s("recover"))
              : s("clean");
          });
          return;
        }
        s("clean");
      })((s) => {
        const i = this.createTransportParams(null, s);
        if (s === "recover") {
          const r = ke(this.options.recover);
          r && (this.msgSerial = r.msgSerial);
        }
        t(i);
      });
    }
    tryATransport(t, n, s) {
      this.proposedTransport = Re.tryConnect(
        this.supportedTransports[n],
        this,
        this.realtime.auth,
        t,
        (i, r) => {
          const o = this.state;
          if (
            o == this.states.closing ||
            o == this.states.closed ||
            o == this.states.failed
          ) {
            r && r.close(), s(!0);
            return;
          }
          if (i) {
            G.isTokenErr(i.error) &&
            !(this.errorReason && G.isTokenErr(this.errorReason))
              ? ((this.errorReason = i.error),
                O(this.realtime.auth._forceNewToken(null, null), (a) => {
                  if (a) {
                    this.actOnErrorFromAuthorize(a);
                    return;
                  }
                  this.tryATransport(t, n, s);
                }))
              : i.event === "failed"
              ? (this.notifyState({
                  state: "failed",
                  error: i.error,
                }),
                s(!0))
              : i.event === "disconnected" &&
                (Ss(i.error)
                  ? s(!1)
                  : (this.notifyState({
                      state: this.states.connecting.failState,
                      error: i.error,
                    }),
                    s(!0)));
            return;
          }
          this.setTransportPending(r, t), s(null, r);
        }
      );
    }
    setTransportPending(t, n) {
      const s = n.mode;
      (this.pendingTransport = t),
        this.cancelWebSocketSlowTimer(),
        this.cancelWebSocketGiveUpTimer(),
        t.once("connected", (r, o, a) => {
          this.activateTransport(r, t, o, a),
            s === "recover" &&
              this.options.recover &&
              (delete this.options.recover, this.unpersistConnection());
        });
      const i = this;
      t.on(["disconnected", "closed", "failed"], function (r) {
        i.deactivateTransport(t, this.event, r);
      }),
        this.emit("transport.pending", t);
    }
    activateTransport(t, n, s, i) {
      t &&
        l.logAction(
          this.logger,
          l.LOG_ERROR,
          "ConnectionManager.activateTransport()",
          "error = " + t
        ),
        this.persistTransportPreference(n);
      const r = this.state,
        o = this.states.connected.state;
      if (
        r.state == this.states.closing.state ||
        r.state == this.states.closed.state ||
        r.state == this.states.failed.state
      )
        return n.disconnect(), !1;
      if ((delete this.pendingTransport, !n.isConnected)) return !1;
      const a = this.activeProtocol;
      (this.activeProtocol = new ws(n)), (this.host = n.params.host);
      const h = i.connectionKey;
      if (
        (h && this.connectionKey != h && this.setConnection(s, i, !!t),
        this.onConnectionDetailsUpdate(i, n),
        f.Config.nextTick(() => {
          n.on("connected", (c, d, g) => {
            this.onConnectionDetailsUpdate(g, n),
              this.emit("update", new ie(o, o, null, c));
          });
        }),
        r.state === this.states.connected.state
          ? t &&
            ((this.errorReason = this.realtime.connection.errorReason = t),
            this.emit("update", new ie(o, o, null, t)))
          : (this.notifyState({
              state: "connected",
              error: t,
            }),
            (this.errorReason = this.realtime.connection.errorReason =
              t || null)),
        this.emit("transport.active", n),
        a)
      )
        if (
          (a.messageQueue.count() > 0 &&
            l.logAction(
              this.logger,
              l.LOG_ERROR,
              "ConnectionManager.activateTransport()",
              "Previous active protocol (for transport " +
                a.transport.shortName +
                ", new one is " +
                n.shortName +
                ") finishing with " +
                a.messageQueue.count() +
                " messages still pending"
            ),
          a.transport === n)
        ) {
          const c =
            "Assumption violated: activating a transport that was also the transport for the previous active protocol; transport = " +
            n.shortName +
            "; stack = " +
            new Error().stack;
          l.logAction(
            this.logger,
            l.LOG_ERROR,
            "ConnectionManager.activateTransport()",
            c
          );
        } else a.finish();
      return !0;
    }
    deactivateTransport(t, n, s) {
      const i = this.activeProtocol,
        r = i && i.getTransport() === t,
        o = t === this.pendingTransport,
        a = this.noTransportsScheduledForActivation();
      if (
        (s && s.message,
        r &&
          (this.queuePendingMessages(i.getPendingMessages()),
          i.clearPendingMessages(),
          (this.activeProtocol = this.host = null)),
        this.emit("transport.inactive", t),
        (r && a) ||
          (r && n === "failed") ||
          n === "closed" ||
          (i === null && o))
      ) {
        if (
          n === "disconnected" &&
          s &&
          s.statusCode > 500 &&
          this.httpHosts.length > 1
        ) {
          this.unpersistTransportPreference(),
            (this.forceFallbackHost = !0),
            this.notifyState({
              state: n,
              error: s,
              retryImmediately: !0,
            });
          return;
        }
        const h = n === "failed" && G.isTokenErr(s) ? "disconnected" : n;
        this.notifyState({
          state: h,
          error: s,
        });
        return;
      }
    }
    noTransportsScheduledForActivation() {
      return !this.pendingTransport || !this.pendingTransport.isConnected;
    }
    setConnection(t, n, s) {
      const i = this.connectionId;
      ((i && i !== t) || (!i && s)) &&
        ((this.msgSerial = 0), this.queuedMessages.resetSendAttempted()),
        this.connectionId,
        (this.realtime.connection.id = this.connectionId = t),
        (this.realtime.connection.key = this.connectionKey = n.connectionKey);
    }
    clearConnection() {
      (this.realtime.connection.id = this.connectionId = void 0),
        (this.realtime.connection.key = this.connectionKey = void 0),
        (this.msgSerial = 0),
        this.unpersistConnection();
    }
    createRecoveryKey() {
      return this.connectionKey
        ? JSON.stringify({
            connectionKey: this.connectionKey,
            msgSerial: this.msgSerial,
            channelSerials: this.realtime.channels.channelSerials(),
          })
        : null;
    }
    checkConnectionStateFreshness() {
      if (!this.lastActivity || !this.connectionId) return;
      Date.now() - this.lastActivity >
        this.connectionStateTtl + this.maxIdleInterval &&
        (this.clearConnection(),
        (this.states.connecting.failState = "suspended"));
    }
    persistConnection() {
      if ($()) {
        const t = this.createRecoveryKey();
        t &&
          this.setSessionRecoverData({
            recoveryKey: t,
            disconnectedAt: Date.now(),
            location: Rs.location,
            clientId: this.realtime.auth.clientId,
          });
      }
    }
    unpersistConnection() {
      this.clearSessionRecoverData();
    }
    getError() {
      if (this.errorReason) {
        const t = W.fromValues(this.errorReason);
        return (t.cause = this.errorReason), t;
      }
      return this.getStateError();
    }
    getStateError() {
      var t, n;
      return (n = (t = F)[this.state.state]) == null ? void 0 : n.call(t);
    }
    activeState() {
      return this.state.queueEvents || this.state.sendEvents;
    }
    enactStateChange(t) {
      const n = "Connection state",
        s = t.current + (t.reason ? "; reason: " + t.reason : "");
      t.current === "failed" && l.logAction(this.logger, l.LOG_ERROR, n, s);
      const i = (this.state = this.states[t.current]);
      t.reason &&
        ((this.errorReason = t.reason),
        (this.realtime.connection.errorReason = t.reason)),
        (i.terminal || i.state === "suspended") && this.clearConnection(),
        this.emit("connectionstate", t);
    }
    startTransitionTimer(t) {
      this.transitionTimer && clearTimeout(this.transitionTimer),
        (this.transitionTimer = setTimeout(() => {
          this.transitionTimer &&
            ((this.transitionTimer = null),
            this.notifyState({
              state: t.failState,
            }));
        }, t.retryDelay));
    }
    cancelTransitionTimer() {
      this.transitionTimer &&
        (clearTimeout(this.transitionTimer), (this.transitionTimer = null));
    }
    startSuspendTimer() {
      this.suspendTimer ||
        (this.suspendTimer = setTimeout(() => {
          this.suspendTimer &&
            ((this.suspendTimer = null),
            (this.states.connecting.failState = "suspended"),
            this.notifyState({
              state: "suspended",
            }));
        }, this.connectionStateTtl));
    }
    checkSuspendTimer(t) {
      t !== "disconnected" &&
        t !== "suspended" &&
        t !== "connecting" &&
        this.cancelSuspendTimer();
    }
    cancelSuspendTimer() {
      (this.states.connecting.failState = "disconnected"),
        this.suspendTimer &&
          (clearTimeout(this.suspendTimer), (this.suspendTimer = null));
    }
    startRetryTimer(t) {
      this.retryTimer = setTimeout(() => {
        (this.retryTimer = null),
          this.requestState({
            state: "connecting",
          });
      }, t);
    }
    cancelRetryTimer() {
      this.retryTimer &&
        (clearTimeout(this.retryTimer), (this.retryTimer = null));
    }
    startWebSocketSlowTimer() {
      this.webSocketSlowTimer = setTimeout(() => {
        this.checkWsConnectivity()
          .then(() => {
            this.wsCheckResult = !0;
          })
          .catch(() => {
            this.wsCheckResult = !1;
          }),
          this.realtime.http.checkConnectivity &&
            O(this.realtime.http.checkConnectivity(), (t, n) => {
              (t || !n) &&
                (this.cancelWebSocketGiveUpTimer(),
                this.notifyState({
                  state: "disconnected",
                  error: new u(
                    "Unable to connect (network unreachable)",
                    80003,
                    404
                  ),
                }));
            });
      }, this.options.timeouts.webSocketSlowTimeout);
    }
    cancelWebSocketSlowTimer() {
      this.webSocketSlowTimer &&
        (clearTimeout(this.webSocketSlowTimer),
        (this.webSocketSlowTimer = null));
    }
    startWebSocketGiveUpTimer(t) {
      this.webSocketGiveUpTimer = setTimeout(() => {
        var n, s;
        this.wsCheckResult ||
          (this.baseTransport &&
            ((this.abandonedWebSocket = !0),
            (n = this.proposedTransport) == null || n.dispose(),
            (s = this.pendingTransport) == null || s.dispose(),
            this.connectBase(t, ++this.connectCounter)));
      }, this.options.timeouts.webSocketConnectTimeout);
    }
    cancelWebSocketGiveUpTimer() {
      this.webSocketGiveUpTimer &&
        (clearTimeout(this.webSocketGiveUpTimer),
        (this.webSocketGiveUpTimer = null));
    }
    notifyState(t) {
      var n, s;
      const i = t.state,
        r =
          i === "disconnected" &&
          (this.state === this.states.connected ||
            t.retryImmediately ||
            (this.state === this.states.connecting &&
              t.error &&
              G.isTokenErr(t.error) &&
              !(this.errorReason && G.isTokenErr(this.errorReason))));
      if (
        i == this.state.state ||
        (this.cancelTransitionTimer(),
        this.cancelRetryTimer(),
        this.cancelWebSocketSlowTimer(),
        this.cancelWebSocketGiveUpTimer(),
        this.checkSuspendTimer(t.state),
        (i === "suspended" || i === "connected") &&
          (this.disconnectedRetryCount = 0),
        this.state.terminal)
      )
        return;
      const o = this.states[t.state];
      let a = o.retryDelay;
      o.state === "disconnected" &&
        (this.disconnectedRetryCount++,
        (a = Le(o.retryDelay, this.disconnectedRetryCount)));
      const h = new ie(
        this.state.state,
        o.state,
        a,
        t.error || ((s = (n = F)[o.state]) == null ? void 0 : s.call(n))
      );
      if (r) {
        const c = () => {
            this.state === this.states.disconnected &&
              ((this.lastAutoReconnectAttempt = Date.now()),
              this.requestState({
                state: "connecting",
              }));
          },
          d =
            this.lastAutoReconnectAttempt &&
            Date.now() - this.lastAutoReconnectAttempt + 1;
        d && d < 1e3 ? setTimeout(c, 1e3 - d) : f.Config.nextTick(c);
      } else
        (i === "disconnected" || i === "suspended") && this.startRetryTimer(a);
      ((i === "disconnected" && !r) || i === "suspended" || o.terminal) &&
        f.Config.nextTick(() => {
          this.disconnectAllTransports();
        }),
        i == "connected" &&
          !this.activeProtocol &&
          l.logAction(
            this.logger,
            l.LOG_ERROR,
            "ConnectionManager.notifyState()",
            "Broken invariant: attempted to go into connected state, but there is no active protocol"
          ),
        this.enactStateChange(h),
        this.state.sendEvents
          ? this.sendQueuedMessages()
          : this.state.queueEvents ||
            (this.realtime.channels.propogateConnectionInterruption(
              i,
              h.reason
            ),
            this.failQueuedMessages(h.reason));
    }
    requestState(t) {
      var n, s;
      const i = t.state;
      if (
        i == this.state.state ||
        (this.cancelWebSocketSlowTimer(),
        this.cancelWebSocketGiveUpTimer(),
        this.cancelTransitionTimer(),
        this.cancelRetryTimer(),
        this.checkSuspendTimer(i),
        i == "connecting" && this.state.state == "connected") ||
        (i == "closing" && this.state.state == "closed")
      )
        return;
      const r = this.states[i],
        o = new ie(
          this.state.state,
          r.state,
          null,
          t.error || ((s = (n = F)[r.state]) == null ? void 0 : s.call(n))
        );
      this.enactStateChange(o),
        i == "connecting" &&
          f.Config.nextTick(() => {
            this.startConnect();
          }),
        i == "closing" && this.closeImpl();
    }
    startConnect() {
      if (this.state !== this.states.connecting) return;
      const t = this.realtime.auth,
        n = ++this.connectCounter,
        s = () => {
          this.checkConnectionStateFreshness(),
            this.getTransportParams((i) => {
              if (i.mode === "recover" && i.options.recover) {
                const r = ke(i.options.recover);
                r && this.realtime.channels.recoverChannels(r.channelSerials);
              }
              n === this.connectCounter && this.connectImpl(i, n);
            });
        };
      if (
        (this.startSuspendTimer(),
        this.startTransitionTimer(this.states.connecting),
        t.method === "basic")
      )
        s();
      else {
        const i = (r) => {
          n === this.connectCounter &&
            (r ? this.actOnErrorFromAuthorize(r) : s());
        };
        this.errorReason && G.isTokenErr(this.errorReason)
          ? O(t._forceNewToken(null, null), i)
          : O(t._ensureValidAuthCredentials(!1), i);
      }
    }
    connectImpl(t, n) {
      if (this.state.state !== this.states.connecting.state) return;
      const i = this.getTransportPreference();
      i &&
        i === this.baseTransport &&
        this.webSocketTransportAvailable &&
        this.checkWsConnectivity()
          .then(() => {
            this.unpersistTransportPreference(),
              this.state === this.states.connecting &&
                (this.disconnectAllTransports(),
                this.connectWs(t, ++this.connectCounter));
          })
          .catch(Qe),
        (i && i === this.baseTransport) ||
        (this.baseTransport && !this.webSocketTransportAvailable)
          ? this.connectBase(t, n)
          : this.connectWs(t, n);
    }
    connectWs(t, n) {
      (this.wsCheckResult = null),
        (this.abandonedWebSocket = !1),
        this.startWebSocketSlowTimer(),
        this.startWebSocketGiveUpTimer(t),
        this.tryTransportWithFallbacks(
          "web_socket",
          t,
          !0,
          n,
          () => this.wsCheckResult !== !1 && !this.abandonedWebSocket
        );
    }
    connectBase(t, n) {
      this.baseTransport
        ? this.tryTransportWithFallbacks(this.baseTransport, t, !1, n, () => !0)
        : this.notifyState({
            state: "disconnected",
            error: new u("No transports left to try", 8e4, 404),
          });
    }
    tryTransportWithFallbacks(t, n, s, i, r) {
      const o = (g) => {
          this.notifyState({
            state: this.states.connecting.failState,
            error: g,
          });
        },
        a = s ? this.wsHosts.slice() : this.httpHosts.slice(),
        h = (g, p) => {
          if (i === this.connectCounter) {
            if (!r()) {
              p && p.dispose();
              return;
            }
            !p && !g && d();
          }
        },
        c = a.shift();
      if (!c) {
        o(new u("Unable to connect (no available host)", 80003, 404));
        return;
      }
      n.host = c;
      const d = () => {
        if (!a.length) {
          o(
            new u(
              "Unable to connect (and no more fallback hosts to try)",
              80003,
              404
            )
          );
          return;
        }
        if (!this.realtime.http.checkConnectivity) {
          o(new W("Internal error: Http.checkConnectivity not set", null, 500));
          return;
        }
        O(this.realtime.http.checkConnectivity(), (g, p) => {
          if (i === this.connectCounter && r()) {
            if (g) {
              o(g);
              return;
            }
            if (!p) {
              o(new u("Unable to connect (network unreachable)", 80003, 404));
              return;
            }
            (n.host = Pe(a)), this.tryATransport(n, t, h);
          }
        });
      };
      if (this.forceFallbackHost && a.length) {
        (this.forceFallbackHost = !1), d();
        return;
      }
      this.tryATransport(n, t, h);
    }
    closeImpl() {
      this.cancelSuspendTimer(),
        this.startTransitionTimer(this.states.closing),
        this.pendingTransport && this.pendingTransport.close(),
        this.activeProtocol && this.activeProtocol.getTransport().close(),
        this.notifyState({
          state: "closed",
        });
    }
    onAuthUpdated(t, n) {
      var s;
      switch (this.state.state) {
        case "connected": {
          const i =
            (s = this.activeProtocol) == null ? void 0 : s.getTransport();
          i && i.onAuthUpdated && i.onAuthUpdated(t);
          const r = D({
            action: v.AUTH,
            auth: {
              accessToken: t.token,
            },
          });
          this.send(r);
          const o = () => {
              this.off(a), n(null, t);
            },
            a = (h) => {
              h.current === "failed" &&
                (this.off(o), this.off(a), n(h.reason || this.getStateError()));
            };
          this.once("connectiondetails", o), this.on("connectionstate", a);
          break;
        }
        case "connecting":
          this.disconnectAllTransports();
        default: {
          const i = (r) => {
            switch (r.current) {
              case "connected":
                this.off(i), n(null, t);
                break;
              case "failed":
              case "closed":
              case "suspended":
                this.off(i), n(r.reason || this.getStateError());
                break;
            }
          };
          this.on("connectionstate", i),
            this.state.state === "connecting"
              ? this.startConnect()
              : this.requestState({
                  state: "connecting",
                });
        }
      }
    }
    disconnectAllTransports() {
      this.connectCounter++,
        this.pendingTransport && this.pendingTransport.disconnect(),
        delete this.pendingTransport,
        this.proposedTransport && this.proposedTransport.disconnect(),
        delete this.pendingTransport,
        this.activeProtocol && this.activeProtocol.getTransport().disconnect();
    }
    send(t, n, s) {
      s = s || Qe;
      const i = this.state;
      if (i.sendEvents) {
        this.sendImpl(new Ke(t, s));
        return;
      }
      if (!(n && i.queueEvents)) {
        const o =
          "rejecting event, queueEvent was " + n + ", state was " + i.state;
        s(this.errorReason || new u(o, 9e4, 400));
        return;
      }
      this.logger.shouldLog(l.LOG_MICRO), this.queue(t, s);
    }
    sendImpl(t) {
      const n = t.message;
      t.ackRequired && !t.sendAttempted && (n.msgSerial = this.msgSerial++);
      try {
        this.activeProtocol.send(t);
      } catch (s) {
        l.logAction(
          this.logger,
          l.LOG_ERROR,
          "ConnectionManager.sendImpl()",
          "Unexpected exception in transport.send(): " + s.stack
        );
      }
    }
    queue(t, n) {
      const s = this.queuedMessages.last(),
        i = this.options.maxMessageSize;
      s && !s.sendAttempted && ks(s.message, t, i)
        ? (s.merged ||
            ((s.callback = xt.create(this.logger, [s.callback])),
            (s.merged = !0)),
          s.callback.push(n))
        : this.queuedMessages.push(new Ke(t, n));
    }
    sendQueuedMessages() {
      let t;
      for (; (t = this.queuedMessages.shift()); ) this.sendImpl(t);
    }
    queuePendingMessages(t) {
      t && t.length && this.queuedMessages.prepend(t);
    }
    failQueuedMessages(t) {
      const n = this.queuedMessages.count();
      n > 0 &&
        (l.logAction(
          this.logger,
          l.LOG_ERROR,
          "ConnectionManager.failQueuedMessages()",
          "failing " + n + " queued messages, err = " + P(t)
        ),
        this.queuedMessages.completeAllMessages(t));
    }
    onChannelMessage(t, n) {
      this.pendingChannelMessagesState.queue.push({
        message: t,
        transport: n,
      }),
        this.pendingChannelMessagesState.isProcessing ||
          this.processNextPendingChannelMessage();
    }
    processNextPendingChannelMessage() {
      if (this.pendingChannelMessagesState.queue.length > 0) {
        this.pendingChannelMessagesState.isProcessing = !0;
        const t = this.pendingChannelMessagesState.queue.shift();
        this.processChannelMessage(t.message)
          .catch((n) => {
            l.logAction(
              this.logger,
              l.LOG_ERROR,
              "ConnectionManager.processNextPendingChannelMessage() received error ",
              n
            );
          })
          .finally(() => {
            (this.pendingChannelMessagesState.isProcessing = !1),
              this.processNextPendingChannelMessage();
          });
      }
    }
    async processChannelMessage(t) {
      await this.realtime.channels.processChannelMessage(t);
    }
    async ping() {
      var t;
      if (this.state.state !== "connected")
        throw new u("Unable to ping service; not connected", 4e4, 400);
      const n = (t = this.activeProtocol) == null ? void 0 : t.getTransport();
      if (!n) throw this.getStateError();
      const s = Date.now(),
        i = xe();
      return Rt(
        new Promise((r) => {
          const o = (a) => {
            a === i && (n.off("heartbeat", o), r(Date.now() - s));
          };
          n.on("heartbeat", o), n.ping(i);
        }),
        this.options.timeouts.realtimeRequestTimeout,
        "Timeout waiting for heartbeat response"
      );
    }
    abort(t) {
      this.activeProtocol.getTransport().fail(t);
    }
    getTransportPreference() {
      var t, n;
      return (
        this.transportPreference ||
        (pe() &&
          ((n = (t = f.WebStorage) == null ? void 0 : t.get) == null
            ? void 0
            : n.call(t, me)))
      );
    }
    persistTransportPreference(t) {
      var n, s;
      (this.transportPreference = t.shortName),
        pe() &&
          ((s = (n = f.WebStorage) == null ? void 0 : n.set) == null ||
            s.call(n, me, t.shortName));
    }
    unpersistTransportPreference() {
      var t, n;
      (this.transportPreference = null),
        pe() &&
          ((n = (t = f.WebStorage) == null ? void 0 : t.remove) == null ||
            n.call(t, me));
    }
    actOnErrorFromAuthorize(t) {
      if (t.code === 40171)
        this.notifyState({
          state: "failed",
          error: t,
        });
      else if (t.code === 40102)
        this.notifyState({
          state: "failed",
          error: t,
        });
      else if (t.statusCode === Bt.Forbidden) {
        const n =
          "Client configured authentication provider returned 403; failing the connection";
        l.logAction(
          this.logger,
          l.LOG_ERROR,
          "ConnectionManager.actOnErrorFromAuthorize()",
          n
        ),
          this.notifyState({
            state: "failed",
            error: new u(n, 80019, 403, t),
          });
      } else {
        const n = "Client configured authentication provider request failed";
        this.notifyState({
          state: this.state.failState,
          error: new u(n, 80019, 401, t),
        });
      }
    }
    onConnectionDetailsUpdate(t, n) {
      if (!t) return;
      (this.connectionDetails = t),
        t.maxMessageSize && (this.options.maxMessageSize = t.maxMessageSize);
      const s = t.clientId;
      if (s) {
        const r = this.realtime.auth._uncheckedSetClientId(s);
        if (r) {
          l.logAction(
            this.logger,
            l.LOG_ERROR,
            "ConnectionManager.onConnectionDetailsUpdate()",
            r.message
          ),
            n.fail(r);
          return;
        }
      }
      const i = t.connectionStateTtl;
      i && (this.connectionStateTtl = i),
        (this.maxIdleInterval = t.maxIdleInterval),
        this.emit("connectiondetails", t);
    }
    checkWsConnectivity() {
      const t = this.options.wsConnectivityCheckUrl || A.wsConnectivityCheckUrl,
        n = new f.Config.WebSocket(t);
      return new Promise((s, i) => {
        let r = !1;
        (n.onopen = () => {
          r || ((r = !0), s(), n.close());
        }),
          (n.onclose = n.onerror =
            () => {
              r || ((r = !0), i());
            });
      });
    }
    sessionRecoveryName() {
      return this.options.recoveryKeyStorageName || "ably-connection-recovery";
    }
    getSessionRecoverData() {
      var t, n;
      return (
        $() &&
        ((n = (t = f.WebStorage) == null ? void 0 : t.getSession) == null
          ? void 0
          : n.call(t, this.sessionRecoveryName()))
      );
    }
    setSessionRecoverData(t) {
      var n, s;
      return (
        $() &&
        ((s = (n = f.WebStorage) == null ? void 0 : n.setSession) == null
          ? void 0
          : s.call(n, this.sessionRecoveryName(), t))
      );
    }
    clearSessionRecoverData() {
      var t, n;
      return (
        $() &&
        ((n = (t = f.WebStorage) == null ? void 0 : t.removeSession) == null
          ? void 0
          : n.call(t, this.sessionRecoveryName()))
      );
    }
  },
  Is = Os,
  Ps = class extends I {
    constructor(e, t) {
      super(e.logger),
        (this.whenState = (n) =>
          I.prototype.whenState.call(this, n, this.state)),
        (this.ably = e),
        (this.connectionManager = new Is(e, t)),
        (this.state = this.connectionManager.state.state),
        (this.key = void 0),
        (this.id = void 0),
        (this.errorReason = null),
        this.connectionManager.on("connectionstate", (n) => {
          const s = (this.state = n.current);
          f.Config.nextTick(() => {
            this.emit(s, n);
          });
        }),
        this.connectionManager.on("update", (n) => {
          f.Config.nextTick(() => {
            this.emit("update", n);
          });
        });
    }
    connect() {
      this.connectionManager.requestState({
        state: "connecting",
      });
    }
    async ping() {
      return this.connectionManager.ping();
    }
    close() {
      this.connectionManager.requestState({
        state: "closing",
      });
    }
    get recoveryKey() {
      return (
        this.logger.deprecationWarning(
          "The `Connection.recoveryKey` attribute has been replaced by the `Connection.createRecoveryKey()` method. Replace your usage of `recoveryKey` with the return value of `createRecoveryKey()`. `recoveryKey` will be removed in a future version."
        ),
        this.createRecoveryKey()
      );
    }
    createRecoveryKey() {
      return this.connectionManager.createRecoveryKey();
    }
  },
  Ms = Ps,
  Us = class {
    constructor(e, t, n, s, i) {
      (this.previous = e),
        (this.current = t),
        t === "attached" && ((this.resumed = n), (this.hasBacklog = s)),
        i && (this.reason = i);
    }
  },
  $e = Us,
  Je = function () {};
function xs(e) {
  if (e && "params" in e && !ne(e.params))
    return new u("options.params must be an object", 4e4, 400);
  if (e && "modes" in e) {
    if (!Array.isArray(e.modes))
      return new u("options.modes must be an array", 4e4, 400);
    for (let t = 0; t < e.modes.length; t++) {
      const n = e.modes[t];
      if (
        !n ||
        typeof n != "string" ||
        !Vt.includes(String.prototype.toUpperCase.call(n))
      )
        return new u("Invalid channel mode: " + n, 4e4, 400);
    }
  }
}
var Ls = class _e extends I {
  constructor(t, n, s) {
    var i, r;
    super(t.logger),
      (this.retryCount = 0),
      (this.history = async function (o) {
        const a = this.client.rest.channelMixin;
        if (o && o.untilAttach) {
          if (this.state !== "attached")
            throw new u(
              "option untilAttach requires the channel to be attached",
              4e4,
              400
            );
          if (!this.properties.attachSerial)
            throw new u(
              "untilAttach was specified and channel is attached, but attachSerial is not defined",
              4e4,
              400
            );
          delete o.untilAttach, (o.from_serial = this.properties.attachSerial);
        }
        return a.history(this, o);
      }),
      (this.whenState = (o) => I.prototype.whenState.call(this, o, this.state)),
      (this.name = n),
      (this.channelOptions = We(
        (i = t._Crypto) != null ? i : null,
        this.logger,
        s
      )),
      (this.client = t),
      (this._presence = t._RealtimePresence
        ? new t._RealtimePresence.RealtimePresence(this)
        : null),
      (this.connectionManager = t.connection.connectionManager),
      (this.state = "initialized"),
      (this.subscriptions = new I(this.logger)),
      (this.syncChannelSerial = void 0),
      (this.properties = {
        attachSerial: void 0,
        channelSerial: void 0,
      }),
      this.setOptions(s),
      (this.errorReason = null),
      (this._requestedFlags = null),
      (this._mode = null),
      (this._attachResume = !1),
      (this._decodingContext = {
        channelOptions: this.channelOptions,
        plugins: t.options.plugins || {},
        baseEncodedPreviousPayload: void 0,
      }),
      (this._lastPayload = {
        messageId: null,
        protocolMessageChannelSerial: null,
        decodeFailureRecoveryInProgress: null,
      }),
      (this._allChannelChanges = new I(this.logger)),
      (r = t.options.plugins) != null &&
        r.Push &&
        (this._push = new t.options.plugins.Push.PushChannel(this));
  }
  get presence() {
    return this._presence || B("RealtimePresence"), this._presence;
  }
  get push() {
    return this._push || B("Push"), this._push;
  }
  invalidStateError() {
    return new u(
      "Channel operation failed as channel state is " + this.state,
      90001,
      400,
      this.errorReason || void 0
    );
  }
  static processListenerArgs(t) {
    return (
      (t = Array.prototype.slice.call(t)),
      typeof t[0] == "function" && t.unshift(null),
      t
    );
  }
  async setOptions(t) {
    var n;
    const s = this.channelOptions,
      i = xs(t);
    if (i) throw i;
    if (
      ((this.channelOptions = We(
        (n = this.client._Crypto) != null ? n : null,
        this.logger,
        t
      )),
      this._decodingContext &&
        (this._decodingContext.channelOptions = this.channelOptions),
      this._shouldReattachToSetOptions(t, s))
    )
      return (
        this.attachImpl(),
        new Promise((r, o) => {
          this._allChannelChanges.once(
            ["attached", "update", "detached", "failed"],
            function (a) {
              switch (this.event) {
                case "update":
                case "attached":
                  r();
                  break;
                default:
                  o(a.reason);
              }
            }
          );
        })
      );
  }
  _shouldReattachToSetOptions(t, n) {
    if (!(this.state === "attached" || this.state === "attaching")) return !1;
    if (t?.params) {
      const s = Xe(t.params),
        i = Xe(n.params);
      if (Object.keys(s).length !== Object.keys(i).length || !St(i, s))
        return !0;
    }
    return !!(t?.modes && (!n.modes || !Et(t.modes, n.modes)));
  }
  async publish(...t) {
    let n = t[0],
      s = t.length;
    if (!this.connectionManager.activeState())
      throw this.connectionManager.getError();
    if (s == 1)
      if (ne(n)) n = [ue(n)];
      else if (Array.isArray(n)) n = Gt(n);
      else
        throw new u(
          "The single-argument form of publish() expects a message object or an array of message objects",
          40013,
          400
        );
    else
      n = [
        ue({
          name: t[0],
          data: t[1],
        }),
      ];
    const i = this.client.options.maxMessageSize;
    await cs(n, this.channelOptions);
    const r = Ft(n);
    if (r > i)
      throw new u(
        "Maximum size of messages that can be published at once exceeded ( was " +
          r +
          " bytes; limit is " +
          i +
          " bytes)",
        40009,
        400
      );
    return new Promise((o, a) => {
      this._publish(n, (h) => (h ? a(h) : o()));
    });
  }
  _publish(t, n) {
    switch (this.state) {
      case "failed":
      case "suspended":
        n(u.fromValues(this.invalidStateError()));
        break;
      default: {
        const i = new ms();
        (i.action = v.MESSAGE),
          (i.channel = this.name),
          (i.messages = t),
          this.sendMessage(i, n);
        break;
      }
    }
  }
  onEvent(t) {
    const n = this.subscriptions;
    for (let s = 0; s < t.length; s++) {
      const i = t[s];
      n.emit(i.name, i);
    }
  }
  async attach() {
    return this.state === "attached"
      ? null
      : new Promise((t, n) => {
          this._attach(!1, null, (s, i) => (s ? n(s) : t(i)));
        });
  }
  _attach(t, n, s) {
    s ||
      (s = (r) => {
        r &&
          l.logAction(
            this.logger,
            l.LOG_ERROR,
            "RealtimeChannel._attach()",
            "Channel attach failed: " + r.toString()
          );
      });
    const i = this.connectionManager;
    if (!i.activeState()) {
      s(i.getError());
      return;
    }
    (this.state !== "attaching" || t) && this.requestState("attaching", n),
      this.once(function (r) {
        switch (this.event) {
          case "attached":
            s?.(null, r);
            break;
          case "detached":
          case "suspended":
          case "failed":
            s?.(
              r.reason ||
                i.getError() ||
                new u(
                  "Unable to attach; reason unknown; state = " + this.event,
                  9e4,
                  500
                )
            );
            break;
          case "detaching":
            s?.(
              new u(
                "Attach request superseded by a subsequent detach request",
                9e4,
                409
              )
            );
            break;
        }
      });
  }
  attachImpl() {
    const t = D({
      action: v.ATTACH,
      channel: this.name,
      params: this.channelOptions.params,
      channelSerial: this.properties.channelSerial,
    });
    this._requestedFlags
      ? t.encodeModesToFlags(this._requestedFlags)
      : this.channelOptions.modes &&
        t.encodeModesToFlags(wt(this.channelOptions.modes)),
      this._attachResume && t.setFlag("ATTACH_RESUME"),
      this._lastPayload.decodeFailureRecoveryInProgress &&
        (t.channelSerial = this._lastPayload.protocolMessageChannelSerial),
      this.sendMessage(t, Je);
  }
  async detach() {
    const t = this.connectionManager;
    if (!t.activeState()) throw t.getError();
    switch (this.state) {
      case "suspended":
        this.notifyState("detached");
        return;
      case "detached":
        return;
      case "failed":
        throw new u("Unable to detach; channel state = failed", 90001, 400);
      default:
        this.requestState("detaching");
      case "detaching":
        return new Promise((n, s) => {
          this.once(function (i) {
            switch (this.event) {
              case "detached":
                n();
                break;
              case "attached":
              case "suspended":
              case "failed":
                s(
                  i.reason ||
                    t.getError() ||
                    new u(
                      "Unable to detach; reason unknown; state = " + this.event,
                      9e4,
                      500
                    )
                );
                break;
              case "attaching":
                s(
                  new u(
                    "Detach request superseded by a subsequent attach request",
                    9e4,
                    409
                  )
                );
                break;
            }
          });
        });
    }
  }
  detachImpl(t) {
    const n = D({
      action: v.DETACH,
      channel: this.name,
    });
    this.sendMessage(n, t || Je);
  }
  async subscribe(...t) {
    const [n, s] = _e.processListenerArgs(t);
    if (this.state === "failed") throw u.fromValues(this.invalidStateError());
    return (
      n && typeof n == "object" && !Array.isArray(n)
        ? this.client._FilteredSubscriptions.subscribeFilter(this, n, s)
        : this.subscriptions.on(n, s),
      this.attach()
    );
  }
  unsubscribe(...t) {
    var n;
    const [s, i] = _e.processListenerArgs(t);
    if (
      (typeof s == "object" && !i) ||
      ((n = this.filteredSubscriptions) != null && n.has(i))
    ) {
      this.client._FilteredSubscriptions
        .getAndDeleteFilteredSubscriptions(this, s, i)
        .forEach((r) => this.subscriptions.off(r));
      return;
    }
    this.subscriptions.off(s, i);
  }
  sync() {
    switch (this.state) {
      case "initialized":
      case "detaching":
      case "detached":
        throw new W("Unable to sync to channel; not attached", 4e4);
    }
    const t = this.connectionManager;
    if (!t.activeState()) throw t.getError();
    const n = D({
      action: v.SYNC,
      channel: this.name,
    });
    this.syncChannelSerial && (n.channelSerial = this.syncChannelSerial),
      t.send(n);
  }
  sendMessage(t, n) {
    this.connectionManager.send(t, this.client.options.queueMessages, n);
  }
  sendPresence(t, n) {
    const s = D({
      action: v.PRESENCE,
      channel: this.name,
      presence: Array.isArray(t)
        ? this.client._RealtimePresence.presenceMessagesFromValuesArray(t)
        : [this.client._RealtimePresence.presenceMessageFromValues(t)],
    });
    this.sendMessage(s, n);
  }
  async processMessage(t) {
    (t.action === v.ATTACHED ||
      t.action === v.MESSAGE ||
      t.action === v.PRESENCE) &&
      this.setChannelSerial(t.channelSerial);
    let n,
      s = !1;
    switch (t.action) {
      case v.ATTACHED: {
        (this.properties.attachSerial = t.channelSerial),
          (this._mode = t.getMode()),
          (this.params = t.params || {});
        const i = t.decodeModesFromFlags();
        this.modes = (i && vt(i)) || void 0;
        const r = t.hasFlag("RESUMED"),
          o = t.hasFlag("HAS_PRESENCE"),
          a = t.hasFlag("HAS_BACKLOG");
        if (this.state === "attached") {
          r || (this._presence && this._presence.onAttached(o));
          const h = new $e(this.state, this.state, r, a, t.error);
          this._allChannelChanges.emit("update", h),
            (!r || this.channelOptions.updateOnAttached) &&
              this.emit("update", h);
        } else
          this.state === "detaching"
            ? this.checkPendingState()
            : this.notifyState("attached", t.error, r, o, a);
        break;
      }
      case v.DETACHED: {
        const i = t.error
          ? u.fromValues(t.error)
          : new u("Channel detached", 90001, 404);
        this.state === "detaching"
          ? this.notifyState("detached", i)
          : this.state === "attaching"
          ? this.notifyState("suspended", i)
          : (this.state === "attached" || this.state === "suspended") &&
            this.requestState("attaching", i);
        break;
      }
      case v.SYNC:
        if (
          ((s = !0),
          (n = this.syncChannelSerial = t.channelSerial),
          !t.presence)
        )
          break;
      case v.PRESENCE: {
        const i = t.presence;
        if (!i) break;
        const { id: r, connectionId: o, timestamp: a } = t,
          h = this.channelOptions;
        let c;
        for (let d = 0; d < i.length; d++)
          try {
            (c = i[d]),
              await ls(c, h),
              c.connectionId || (c.connectionId = o),
              c.timestamp || (c.timestamp = a),
              c.id || (c.id = r + ":" + d);
          } catch (g) {
            l.logAction(
              this.logger,
              l.LOG_ERROR,
              "RealtimeChannel.processMessage()",
              g.toString()
            );
          }
        this._presence && this._presence.setPresence(i, s, n);
        break;
      }
      case v.MESSAGE: {
        if (this.state !== "attached") return;
        const i = t.messages,
          r = i[0],
          o = i[i.length - 1],
          a = t.id,
          h = t.connectionId,
          c = t.timestamp;
        if (
          r.extras &&
          r.extras.delta &&
          r.extras.delta.from !== this._lastPayload.messageId
        ) {
          const d =
            'Delta message decode failure - previous message not available for message "' +
            t.id +
            '" on this channel "' +
            this.name +
            '".';
          l.logAction(
            this.logger,
            l.LOG_ERROR,
            "RealtimeChannel.processMessage()",
            d
          ),
            this._startDecodeFailureRecovery(new u(d, 40018, 400));
          break;
        }
        for (let d = 0; d < i.length; d++) {
          const g = i[d];
          try {
            await Wt(g, this._decodingContext);
          } catch (p) {
            switch (
              (l.logAction(
                this.logger,
                l.LOG_ERROR,
                "RealtimeChannel.processMessage()",
                p.toString()
              ),
              p.code)
            ) {
              case 40018:
                this._startDecodeFailureRecovery(p);
                return;
              case 40019:
              case 40021:
                this.notifyState("failed", p);
                return;
            }
          }
          g.connectionId || (g.connectionId = h),
            g.timestamp || (g.timestamp = c),
            g.id || (g.id = a + ":" + d);
        }
        (this._lastPayload.messageId = o.id),
          (this._lastPayload.protocolMessageChannelSerial = t.channelSerial),
          this.onEvent(i);
        break;
      }
      case v.ERROR: {
        const i = t.error;
        i && i.code == 80016
          ? this.checkPendingState()
          : this.notifyState("failed", u.fromValues(i));
        break;
      }
      default:
        l.logAction(
          this.logger,
          l.LOG_ERROR,
          "RealtimeChannel.processMessage()",
          "Fatal protocol error: unrecognised action (" + t.action + ")"
        ),
          this.connectionManager.abort(F.unknownChannelErr());
    }
  }
  _startDecodeFailureRecovery(t) {
    this._lastPayload.decodeFailureRecoveryInProgress ||
      ((this._lastPayload.decodeFailureRecoveryInProgress = !0),
      this._attach(!0, t, () => {
        this._lastPayload.decodeFailureRecoveryInProgress = !1;
      }));
  }
  onAttached() {}
  notifyState(t, n, s, i, r) {
    if (
      (this.clearStateTimer(),
      ["detached", "suspended", "failed"].includes(t) &&
        (this.properties.channelSerial = null),
      t === this.state)
    )
      return;
    this._presence && this._presence.actOnChannelState(t, i, n),
      t === "suspended" && this.connectionManager.state.sendEvents
        ? this.startRetryTimer()
        : this.cancelRetryTimer(),
      n && (this.errorReason = n);
    const o = new $e(this.state, t, s, r, n),
      a = 'Channel state for channel "' + this.name + '"',
      h = t + (n ? "; reason: " + n : "");
    t === "failed" && l.logAction(this.logger, l.LOG_ERROR, a, h),
      t !== "attaching" && t !== "suspended" && (this.retryCount = 0),
      t === "attached" && this.onAttached(),
      t === "attached"
        ? (this._attachResume = !0)
        : (t === "detaching" || t === "failed") && (this._attachResume = !1),
      (this.state = t),
      this._allChannelChanges.emit(t, o),
      this.emit(t, o);
  }
  requestState(t, n) {
    this.notifyState(t, n), this.checkPendingState();
  }
  checkPendingState() {
    if (this.connectionManager.state.sendEvents)
      switch (this.state) {
        case "attaching":
          this.startStateTimerIfNotRunning(), this.attachImpl();
          break;
        case "detaching":
          this.startStateTimerIfNotRunning(), this.detachImpl();
          break;
        case "attached":
          this.sync();
          break;
      }
  }
  timeoutPendingState() {
    switch (this.state) {
      case "attaching": {
        const t = new u("Channel attach timed out", 90007, 408);
        this.notifyState("suspended", t);
        break;
      }
      case "detaching": {
        const t = new u("Channel detach timed out", 90007, 408);
        this.notifyState("attached", t);
        break;
      }
      default:
        this.checkPendingState();
        break;
    }
  }
  startStateTimerIfNotRunning() {
    this.stateTimer ||
      (this.stateTimer = setTimeout(() => {
        (this.stateTimer = null), this.timeoutPendingState();
      }, this.client.options.timeouts.realtimeRequestTimeout));
  }
  clearStateTimer() {
    const t = this.stateTimer;
    t && (clearTimeout(t), (this.stateTimer = null));
  }
  startRetryTimer() {
    if (this.retryTimer) return;
    this.retryCount++;
    const t = Le(
      this.client.options.timeouts.channelRetryTimeout,
      this.retryCount
    );
    this.retryTimer = setTimeout(() => {
      this.state === "suspended" &&
        this.connectionManager.state.sendEvents &&
        ((this.retryTimer = null), this.requestState("attaching"));
    }, t);
  }
  cancelRetryTimer() {
    this.retryTimer &&
      (clearTimeout(this.retryTimer), (this.retryTimer = null));
  }
  getReleaseErr() {
    const t = this.state;
    return t === "initialized" || t === "detached" || t === "failed"
      ? null
      : new u(
          "Can only release a channel in a state where there is no possibility of further updates from the server being received (initialized, detached, or failed); was " +
            t,
          90001,
          400
        );
  }
  setChannelSerial(t) {
    t && (this.properties.channelSerial = t);
  }
  async status() {
    return this.client.rest.channelMixin.status(this);
  }
};
function Xe(e) {
  return fn(e || {}, ["agent"]);
}
var Ns = Ls,
  $t = class Jt extends Zn {
    constructor(t) {
      var n, s;
      if (
        (super(A.objectifyOptions(t, !1, "BaseRealtime", l.defaultLogger)),
        typeof EdgeRuntime == "string")
      )
        throw new u(
          `Ably.Realtime instance cannot be used in Vercel Edge runtime. If you are running Vercel Edge functions, please replace your "new Ably.Realtime()" with "new Ably.Rest()" and use Ably Rest API instead of the Realtime API. If you are server-rendering your application in the Vercel Edge runtime, please use the condition "if (typeof EdgeRuntime === 'string')" to prevent instantiating Ably.Realtime instance during SSR in the Vercel Edge runtime.`,
          4e4,
          400
        );
      (this._additionalTransportImplementations =
        Jt.transportImplementationsFromPlugins(this.options.plugins)),
        (this._RealtimePresence =
          (s =
            (n = this.options.plugins) == null ? void 0 : n.RealtimePresence) !=
          null
            ? s
            : null),
        (this.connection = new Ms(this, this.options)),
        (this._channels = new qs(this)),
        this.options.autoConnect !== !1 && this.connect();
    }
    static transportImplementationsFromPlugins(t) {
      const n = {};
      return (
        t?.WebSocketTransport && (n[k.WebSocket] = t.WebSocketTransport),
        t?.XHRPolling && (n[k.XhrPolling] = t.XHRPolling),
        n
      );
    }
    get channels() {
      return this._channels;
    }
    connect() {
      this.connection.connect();
    }
    close() {
      this.connection.close();
    }
  };
$t.EventEmitter = I;
var Bs = $t,
  qs = class extends I {
    constructor(e) {
      super(e.logger),
        (this.realtime = e),
        (this.all = Object.create(null)),
        e.connection.connectionManager.on("transport.active", () => {
          this.onTransportActive();
        });
    }
    channelSerials() {
      let e = {};
      for (const t of ce(this.all, !0)) {
        const n = this.all[t];
        n.properties.channelSerial && (e[t] = n.properties.channelSerial);
      }
      return e;
    }
    recoverChannels(e) {
      for (const t of ce(e, !0)) {
        const n = this.get(t);
        n.properties.channelSerial = e[t];
      }
    }
    async processChannelMessage(e) {
      const t = e.channel;
      if (t === void 0) {
        l.logAction(
          this.logger,
          l.LOG_ERROR,
          "Channels.processChannelMessage()",
          "received event unspecified channel, action = " + e.action
        );
        return;
      }
      const n = this.all[t];
      if (!n) {
        l.logAction(
          this.logger,
          l.LOG_ERROR,
          "Channels.processChannelMessage()",
          "received event for non-existent channel: " + t
        );
        return;
      }
      await n.processMessage(e);
    }
    onTransportActive() {
      for (const e in this.all) {
        const t = this.all[e];
        t.state === "attaching" || t.state === "detaching"
          ? t.checkPendingState()
          : t.state === "suspended"
          ? t._attach(!1, null)
          : t.state === "attached" && t.requestState("attaching");
      }
    }
    propogateConnectionInterruption(e, t) {
      const n = {
          closing: "detached",
          closed: "detached",
          failed: "failed",
          suspended: "suspended",
        },
        s = ["attaching", "attached", "detaching", "suspended"],
        i = n[e];
      for (const r in this.all) {
        const o = this.all[r];
        s.includes(o.state) && o.notifyState(i, t);
      }
    }
    get(e, t) {
      e = String(e);
      let n = this.all[e];
      if (!n) n = this.all[e] = new Ns(this.realtime, e, t);
      else if (t) {
        if (n._shouldReattachToSetOptions(t, n.channelOptions))
          throw new u(
            "Channels.get() cannot be used to set channel options that would cause the channel to reattach. Please, use RealtimeChannel.setOptions() instead.",
            4e4,
            400
          );
        n.setOptions(t);
      }
      return n;
    }
    getDerived(e, t, n) {
      if (t.filter) {
        const s = le(t.filter),
          i = Ct(e);
        e = `[filter=${s}${i.qualifierParam}]${i.channelName}`;
      }
      return this.get(e, n);
    }
    release(e) {
      e = String(e);
      const t = this.all[e];
      if (!t) return;
      const n = t.getReleaseErr();
      if (n) throw n;
      delete this.all[e];
    }
  },
  Hs = Bs,
  Oe = Uint8Array,
  te = Uint32Array,
  Ie = Math.pow,
  Xt = new te(8),
  Yt = [],
  J = new te(64);
function Ye(e) {
  return ((e - (e | 0)) * Ie(2, 32)) | 0;
}
var X = 2,
  Y = 0;
for (; Y < 64; ) {
  for (ye = !0, re = 2; re <= X / 2; re++) X % re === 0 && (ye = !1);
  ye && (Y < 8 && (Xt[Y] = Ye(Ie(X, 1 / 2))), (Yt[Y] = Ye(Ie(X, 1 / 3))), Y++),
    X++;
}
var ye,
  re,
  Ds = !!new Oe(new te([1]).buffer)[0];
function ve(e) {
  return Ds
    ? (e >>> 24) | (((e >>> 16) & 255) << 8) | ((e & 65280) << 8) | (e << 24)
    : e;
}
function M(e, t) {
  return (e >>> t) | (e << (32 - t));
}
function we(e) {
  var t = Xt.slice(),
    n = e.length,
    s = n * 8,
    i = 512 - ((s + 64) % 512) - 1 + s + 65,
    r = new Oe(i / 8),
    o = new te(r.buffer);
  r.set(e, 0), (r[n] = 128), (o[o.length - 1] = ve(s));
  for (var a, h = 0; h < i / 32; h += 16) {
    var c = t.slice();
    for (a = 0; a < 64; a++) {
      var d;
      if (a < 16) d = ve(o[h + a]);
      else {
        var g = J[a - 15],
          p = J[a - 2];
        d =
          J[a - 7] +
          J[a - 16] +
          (M(g, 7) ^ M(g, 18) ^ (g >>> 3)) +
          (M(p, 17) ^ M(p, 19) ^ (p >>> 10));
      }
      J[a] = d |= 0;
      for (
        var m =
            (M(c[4], 6) ^ M(c[4], 11) ^ M(c[4], 25)) +
            ((c[4] & c[5]) ^ (~c[4] & c[6])) +
            c[7] +
            d +
            Yt[a],
          b =
            (M(c[0], 2) ^ M(c[0], 13) ^ M(c[0], 22)) +
            ((c[0] & c[1]) ^ (c[2] & (c[0] ^ c[1]))),
          y = 7;
        y > 0;
        y--
      )
        c[y] = c[y - 1];
      (c[0] = (m + b) | 0), (c[4] = (c[4] + m) | 0);
    }
    for (a = 0; a < 8; a++) t[a] = (t[a] + c[a]) | 0;
  }
  return new Oe(
    new te(
      t.map(function (w) {
        return ve(w);
      })
    ).buffer
  );
}
function Ws(e, t) {
  if ((e.length > 64 && (e = we(e)), e.length < 64)) {
    const a = new Uint8Array(64);
    a.set(e, 0), (e = a);
  }
  for (var n = new Uint8Array(64), s = new Uint8Array(64), i = 0; i < 64; i++)
    (n[i] = 54 ^ e[i]), (s[i] = 92 ^ e[i]);
  var r = new Uint8Array(t.length + 64);
  r.set(n, 0), r.set(t, 64);
  var o = new Uint8Array(96);
  return o.set(s, 0), o.set(we(r), 64), we(o);
}
var Gs = class {
    constructor() {
      (this.base64CharSet =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"),
        (this.hexCharSet = "0123456789abcdef");
    }
    uint8ViewToBase64(e) {
      let t = "";
      const n = this.base64CharSet,
        s = e.byteLength,
        i = s % 3,
        r = s - i;
      let o, a, h, c, d;
      for (let g = 0; g < r; g = g + 3)
        (d = (e[g] << 16) | (e[g + 1] << 8) | e[g + 2]),
          (o = (d & 16515072) >> 18),
          (a = (d & 258048) >> 12),
          (h = (d & 4032) >> 6),
          (c = d & 63),
          (t += n[o] + n[a] + n[h] + n[c]);
      return (
        i == 1
          ? ((d = e[r]),
            (o = (d & 252) >> 2),
            (a = (d & 3) << 4),
            (t += n[o] + n[a] + "=="))
          : i == 2 &&
            ((d = (e[r] << 8) | e[r + 1]),
            (o = (d & 64512) >> 10),
            (a = (d & 1008) >> 4),
            (h = (d & 15) << 2),
            (t += n[o] + n[a] + n[h] + "=")),
        t
      );
    }
    base64ToArrayBuffer(e) {
      const t = atob?.(e),
        n = t.length,
        s = new Uint8Array(n);
      for (let i = 0; i < n; i++) {
        const r = t.charCodeAt(i);
        s[i] = r;
      }
      return this.toArrayBuffer(s);
    }
    isBuffer(e) {
      return e instanceof ArrayBuffer || ArrayBuffer.isView(e);
    }
    toBuffer(e) {
      if (!ArrayBuffer)
        throw new Error(
          "Can't convert to Buffer: browser does not support the necessary types"
        );
      if (e instanceof ArrayBuffer) return new Uint8Array(e);
      if (ArrayBuffer.isView(e)) return new Uint8Array(this.toArrayBuffer(e));
      throw new Error(
        "BufferUtils.toBuffer expected an ArrayBuffer or a view onto one"
      );
    }
    toArrayBuffer(e) {
      if (!ArrayBuffer)
        throw new Error(
          "Can't convert to ArrayBuffer: browser does not support the necessary types"
        );
      if (e instanceof ArrayBuffer) return e;
      if (ArrayBuffer.isView(e))
        return e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength);
      throw new Error(
        "BufferUtils.toArrayBuffer expected an ArrayBuffer or a view onto one"
      );
    }
    base64Encode(e) {
      return this.uint8ViewToBase64(this.toBuffer(e));
    }
    base64Decode(e) {
      if (ArrayBuffer && f.Config.atob) return this.base64ToArrayBuffer(e);
      throw new Error(
        "Expected ArrayBuffer to exist and Platform.Config.atob to be configured"
      );
    }
    hexEncode(e) {
      return this.toBuffer(e).reduce(
        (n, s) => n + s.toString(16).padStart(2, "0"),
        ""
      );
    }
    hexDecode(e) {
      if (e.length % 2 !== 0)
        throw new Error(
          "Can't create a byte array from a hex string of odd length"
        );
      const t = new Uint8Array(e.length / 2);
      for (let n = 0; n < t.length; n++)
        t[n] = parseInt(e.slice(2 * n, 2 * (n + 1)), 16);
      return this.toArrayBuffer(t);
    }
    utf8Encode(e) {
      if (f.Config.TextEncoder) {
        const t = new f.Config.TextEncoder().encode(e);
        return this.toArrayBuffer(t);
      } else throw new Error("Expected TextEncoder to be configured");
    }
    utf8Decode(e) {
      if (!this.isBuffer(e))
        throw new Error(
          "Expected input of utf8decode to be an arraybuffer or typed array"
        );
      if (TextDecoder) return new TextDecoder().decode(e);
      throw new Error("Expected TextDecoder to be configured");
    }
    areBuffersEqual(e, t) {
      if (!e || !t) return !1;
      const n = this.toArrayBuffer(e),
        s = this.toArrayBuffer(t);
      if (n.byteLength != s.byteLength) return !1;
      const i = new Uint8Array(n),
        r = new Uint8Array(s);
      for (var o = 0; o < i.length; o++) if (i[o] != r[o]) return !1;
      return !0;
    }
    byteLength(e) {
      return e instanceof ArrayBuffer || ArrayBuffer.isView(e)
        ? e.byteLength
        : -1;
    }
    arrayBufferViewToBuffer(e) {
      return this.toArrayBuffer(e);
    }
    hmacSha256(e, t) {
      const n = Ws(this.toBuffer(t), this.toBuffer(e));
      return this.toArrayBuffer(n);
    }
  },
  Fs = new Gs(),
  Zt = ((e) => (
    (e[(e.REQ_SEND = 0)] = "REQ_SEND"),
    (e[(e.REQ_RECV = 1)] = "REQ_RECV"),
    (e[(e.REQ_RECV_POLL = 2)] = "REQ_RECV_POLL"),
    (e[(e.REQ_RECV_STREAM = 3)] = "REQ_RECV_STREAM"),
    e
  ))(Zt || {}),
  js = Zt;
function Ze() {
  return new u(
    "No HTTP request plugin provided. Provide at least one of the FetchRequest or XHRRequest plugins.",
    400,
    4e4
  );
}
var Z,
  en =
    ((Z = class {
      constructor(e) {
        (this.checksInProgress = null),
          (this.checkConnectivity = void 0),
          (this.supportsAuthHeaders = !1),
          (this.supportsLinkHeaders = !1);
        var t;
        this.client = e ?? null;
        const n = e?.options.connectivityCheckUrl || A.connectivityCheckUrl,
          s = (t = e?.options.connectivityCheckParams) != null ? t : null,
          i = !e?.options.connectivityCheckUrl,
          r = x(
            x({}, en.bundledRequestImplementations),
            e?._additionalHTTPRequestImplementations
          ),
          o = r.XHRRequest,
          a = r.FetchRequest,
          h = !!(o || a);
        if (!h) throw Ze();
        f.Config.xhrSupported && o
          ? ((this.supportsAuthHeaders = !0),
            (this.Request = async function (c, d, g, p, m) {
              return new Promise((b) => {
                var y;
                const w = o.createRequest(
                  d,
                  g,
                  p,
                  m,
                  js.REQ_SEND,
                  (y = e && e.options.timeouts) != null ? y : null,
                  this.logger,
                  c
                );
                w.once("complete", (S, C, _, K, de) =>
                  b({
                    error: S,
                    body: C,
                    headers: _,
                    unpacked: K,
                    statusCode: de,
                  })
                ),
                  w.exec();
              });
            }),
            e?.options.disableConnectivityCheck
              ? (this.checkConnectivity = async function () {
                  return !0;
                })
              : (this.checkConnectivity = async function () {
                  var c;
                  const d = await this.doUri(R.Get, n, null, null, s);
                  let g = !1;
                  return (
                    i
                      ? (g =
                          !d.error &&
                          ((c = d.body) == null
                            ? void 0
                            : c.replace(/\n/, "")) == "yes")
                      : (g = !d.error && Dn(d.statusCode)),
                    g
                  );
                }))
          : f.Config.fetchSupported && a
          ? ((this.supportsAuthHeaders = !0),
            (this.Request = async (c, d, g, p, m) =>
              a(c, e ?? null, d, g, p, m)),
            (this.checkConnectivity = async function () {
              var c;
              const d = await this.doUri(R.Get, n, null, null, null);
              return (
                !d.error &&
                ((c = d.body) == null ? void 0 : c.replace(/\n/, "")) == "yes"
              );
            }))
          : (this.Request = async () => ({
              error: h
                ? new W("no supported HTTP transports available", null, 400)
                : Ze(),
            }));
      }
      get logger() {
        var e, t;
        return (t = (e = this.client) == null ? void 0 : e.logger) != null
          ? t
          : l.defaultLogger;
      }
      async doUri(e, t, n, s, i) {
        return this.Request
          ? this.Request(e, t, n, i, s)
          : {
              error: new W("Request invoked before assigned to", null, 500),
            };
      }
      shouldFallback(e) {
        const t = e.statusCode;
        return (
          (t === 408 && !e.code) ||
          (t === 400 && !e.code) ||
          (t >= 500 && t <= 504)
        );
      }
    }),
    (Z.methods = [R.Get, R.Delete, R.Post, R.Put, R.Patch]),
    (Z.methodsWithoutBody = [R.Get, R.Delete]),
    (Z.methodsWithBody = [R.Post, R.Put, R.Patch]),
    Z),
  tn = en,
  V = "ablyjs-storage-test",
  z = typeof global < "u" ? global : typeof window < "u" ? window : self,
  Vs = class {
    constructor() {
      try {
        z.sessionStorage.setItem(V, V),
          z.sessionStorage.removeItem(V),
          (this.sessionSupported = !0);
      } catch {
        this.sessionSupported = !1;
      }
      try {
        z.localStorage.setItem(V, V),
          z.localStorage.removeItem(V),
          (this.localSupported = !0);
      } catch {
        this.localSupported = !1;
      }
    }
    get(e) {
      return this._get(e, !1);
    }
    getSession(e) {
      return this._get(e, !0);
    }
    remove(e) {
      return this._remove(e, !1);
    }
    removeSession(e) {
      return this._remove(e, !0);
    }
    set(e, t, n) {
      return this._set(e, t, n, !1);
    }
    setSession(e, t, n) {
      return this._set(e, t, n, !0);
    }
    _set(e, t, n, s) {
      const i = {
        value: t,
      };
      return (
        n && (i.expires = Date.now() + n),
        this.storageInterface(s).setItem(e, JSON.stringify(i))
      );
    }
    _get(e, t) {
      if (t && !this.sessionSupported)
        throw new Error("Session Storage not supported");
      if (!t && !this.localSupported)
        throw new Error("Local Storage not supported");
      const n = this.storageInterface(t).getItem(e);
      if (!n) return null;
      const s = JSON.parse(n);
      return s.expires && s.expires < Date.now()
        ? (this.storageInterface(t).removeItem(e), null)
        : s.value;
    }
    _remove(e, t) {
      return this.storageInterface(t).removeItem(e);
    }
    storageInterface(e) {
      return e ? z.sessionStorage : z.localStorage;
    }
  },
  nn = new Vs(),
  T = Ne(),
  zs = typeof EdgeRuntime == "string";
typeof Window > "u" &&
  typeof WorkerGlobalScope > "u" &&
  !zs &&
  console.log(
    "Warning: this distribution of Ably is intended for browsers. On nodejs, please use the 'ably' package on npm"
  );
function Ks() {
  const e = T.location;
  return !T.WebSocket || !e || !e.origin || e.origin.indexOf("http") > -1;
}
function Qs() {
  return typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope;
}
var $s = T.navigator && T.navigator.userAgent.toString(),
  Js = T.location && T.location.href,
  Xs = {
    agent: "browser",
    logTimestamps: !0,
    userAgent: $s,
    currentUrl: Js,
    binaryType: "arraybuffer",
    WebSocket: T.WebSocket,
    fetchSupported: !!T.fetch,
    xhrSupported: T.XMLHttpRequest && "withCredentials" in new XMLHttpRequest(),
    allowComet: Ks(),
    useProtocolHeartbeats: !0,
    supportsBinary: !!T.TextDecoder,
    preferBinary: !1,
    ArrayBuffer: T.ArrayBuffer,
    atob: T.atob,
    nextTick:
      typeof T.setImmediate < "u"
        ? T.setImmediate.bind(T)
        : function (e) {
            setTimeout(e, 0);
          },
    addEventListener: T.addEventListener,
    inspect: JSON.stringify,
    stringByteSize: function (e) {
      return (
        (T.TextDecoder && new T.TextEncoder().encode(e).length) || e.length
      );
    },
    TextEncoder: T.TextEncoder,
    TextDecoder: T.TextDecoder,
    getRandomArrayBuffer: async function (e) {
      const t = new Uint8Array(e);
      return T.crypto.getRandomValues(t), t.buffer;
    },
    isWebworker: Qs(),
    push: {
      platform: "browser",
      formFactor: "desktop",
      storage: nn,
    },
  },
  Ys = Xs;
k.XhrPolling;
var Zs = k.WebSocket;
function ei(e) {
  return !!e.on;
}
var ti = class extends Re {
    constructor(e, t, n) {
      super(e, t, n),
        (this.shortName = Zs),
        (n.heartbeats = f.Config.useProtocolHeartbeats),
        (this.wsHost = n.host);
    }
    static isAvailable() {
      return !!f.Config.WebSocket;
    }
    createWebSocket(e, t) {
      return (this.uri = e + Me(t)), new f.Config.WebSocket(this.uri);
    }
    toString() {
      return "WebSocketTransport; uri=" + this.uri;
    }
    connect() {
      Re.prototype.connect.call(this);
      const e = this,
        t = this.params,
        n = t.options,
        i =
          (n.tls ? "wss://" : "ws://") + this.wsHost + ":" + A.getPort(n) + "/";
      O(this.auth.getAuthParams(), function (r, o) {
        if (e.isDisposed) return;
        let a = "";
        for (const c in o) a += " " + c + ": " + o[c] + ";";
        if (r) {
          e.disconnect(r);
          return;
        }
        const h = t.getConnectParams(o);
        try {
          const c = (e.wsConnection = e.createWebSocket(i, h));
          (c.binaryType = f.Config.binaryType),
            (c.onopen = function () {
              e.onWsOpen();
            }),
            (c.onclose = function (d) {
              e.onWsClose(d);
            }),
            (c.onmessage = function (d) {
              e.onWsData(d.data);
            }),
            (c.onerror = function (d) {
              e.onWsError(d);
            }),
            ei(c) &&
              c.on("ping", function () {
                e.onActivity();
              });
        } catch (c) {
          l.logAction(
            e.logger,
            l.LOG_ERROR,
            "WebSocketTransport.connect()",
            "Unexpected exception creating websocket: err = " +
              (c.stack || c.message)
          ),
            e.disconnect(c);
        }
      });
    }
    send(e) {
      const t = this.wsConnection;
      if (!t) {
        l.logAction(
          this.logger,
          l.LOG_ERROR,
          "WebSocketTransport.send()",
          "No socket connection"
        );
        return;
      }
      try {
        t.send(
          ds(e, this.connectionManager.realtime._MsgPack, this.params.format)
        );
      } catch (n) {
        const s = "Exception from ws connection when trying to send: " + P(n);
        l.logAction(this.logger, l.LOG_ERROR, "WebSocketTransport.send()", s),
          this.finish("disconnected", new u(s, 5e4, 500));
      }
    }
    onWsData(e) {
      try {
        this.onProtocolMessage(
          gs(
            e,
            this.connectionManager.realtime._MsgPack,
            this.connectionManager.realtime._RealtimePresence,
            this.format
          )
        );
      } catch (t) {
        l.logAction(
          this.logger,
          l.LOG_ERROR,
          "WebSocketTransport.onWsData()",
          "Unexpected exception handing channel message: " + t.stack
        );
      }
    }
    onWsOpen() {
      this.emit("preconnect");
    }
    onWsClose(e) {
      let t, n;
      if (
        (typeof e == "object"
          ? ((n = e.code), (t = e.wasClean || n === 1e3))
          : ((n = e), (t = n == 1e3)),
        delete this.wsConnection,
        t)
      ) {
        const s = new u("Websocket closed", 80003, 400);
        this.finish("disconnected", s);
      } else {
        const s = "Unclean disconnection of WebSocket ; code = " + n,
          i = new u(s, 80003, 400);
        this.finish("disconnected", i);
      }
      this.emit("disposed");
    }
    onWsError(e) {
      f.Config.nextTick(() => {
        this.disconnect(Error(e.message));
      });
    }
    dispose() {
      this.isDisposed = !0;
      const e = this.wsConnection;
      e &&
        ((e.onmessage = function () {}),
        delete this.wsConnection,
        f.Config.nextTick(() => {
          if (!e)
            throw new Error(
              "WebSocketTransport.dispose(): wsConnection is not defined"
            );
          e.close();
        }));
    }
  },
  ni = ti,
  si = ["xhr_polling"],
  ii = {
    order: si,
    bundledImplementations: {},
  },
  ri = {
    connectivityCheckUrl:
      "https://internet-up.ably-realtime.com/is-the-internet-up.txt",
    wsConnectivityCheckUrl: "wss://ws-up.ably-realtime.com",
    defaultTransports: [k.XhrPolling, k.WebSocket],
  },
  oi = ri;
function ai(e, t) {
  return !!t.get("x-ably-errorcode");
}
function ci(e, t) {
  if (ai(e, t)) return e.error && u.fromValues(e.error);
}
function li(e) {
  const t = {};
  return (
    e.forEach((n, s) => {
      t[s] = n;
    }),
    t
  );
}
async function hi(e, t, n, s, i, r) {
  const o = new Headers(s || {}),
    a = e ? e.toUpperCase() : U(r) ? "GET" : "POST",
    h = new AbortController();
  let c;
  const d = new Promise((m) => {
      c = setTimeout(
        () => {
          h.abort(),
            m({
              error: new W("Request timed out", null, 408),
            });
        },
        t
          ? t.options.timeouts.httpRequestTimeout
          : A.TIMEOUTS.httpRequestTimeout
      );
    }),
    g = {
      method: a,
      headers: o,
      body: r,
      signal: h.signal,
    };
  f.Config.isWebworker ||
    (g.credentials = o.has("authorization") ? "include" : "same-origin");
  const p = (async () => {
    try {
      const m = new URLSearchParams(i || {});
      m.set("rnd", xe());
      const b = n + "?" + m,
        y = await Ne().fetch(b, g);
      if ((clearTimeout(c), y.status == 204))
        return {
          error: null,
          statusCode: y.status,
        };
      const w = y.headers.get("Content-Type");
      let S;
      w && w.indexOf("application/x-msgpack") > -1
        ? (S = await y.arrayBuffer())
        : w && w.indexOf("application/json") > -1
        ? (S = await y.json())
        : (S = await y.text());
      const C = !!w && w.indexOf("application/x-msgpack") === -1,
        _ = li(y.headers);
      return y.ok
        ? {
            error: null,
            body: S,
            headers: _,
            unpacked: C,
            statusCode: y.status,
          }
        : {
            error:
              ci(S, y.headers) ||
              new W(
                "Error response received from server: " +
                  y.status +
                  " body was: " +
                  f.Config.inspect(S),
                null,
                y.status
              ),
            body: S,
            headers: _,
            unpacked: C,
            statusCode: y.status,
          };
    } catch (m) {
      return (
        clearTimeout(c),
        {
          error: m,
        }
      );
    }
  })();
  return Promise.race([d, p]);
}
var ui = {};
f.BufferUtils = Fs;
f.Http = tn;
f.Config = Ys;
f.Transports = ii;
f.WebStorage = nn;
tn.bundledRequestImplementations = ui;
l.initLogHandlers();
f.Defaults = qn(oi);
f.Config.agent && (f.Defaults.agent += " " + f.Config.agent);
const fi = async ({ ablyAuth: e }) => {
    const n = {
      authUrl: be + "/auth",
      authCallback: function (i, r) {
        fetch(`${be}/auth`, {
          method: "get",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + e?.accessToken,
          },
        })
          .then(async (o) => await o.json())
          .then((o) => {
            r(null, o);
          })
          .catch((o) => {
            r(o);
          });
      },
      Authorization: "Bearer " + e?.accessToken,
    };
    return new Hs({
      ...n,
      plugins: {
        WebSocketTransport: ni,
        FetchRequest: hi,
      },
    });
  },
  di = async () => {
    try {
      const e = be + "/login";
      return (await rn.post(e)).data;
    } catch (e) {
      throw (console.error(e), e);
    }
  },
  j = {
    NEW_CHAT_MESSAGE: "message",
    CHAT_MESSAGE_REACTION_ADD: "add-reaction",
    CHAT_MESSAGE_UPDATE: "message-update",
    NEW_IDEA_COMMENT: "idea-comment-add",
  },
  sn = {
    FLOATING_CHAT: j.NEW_CHAT_MESSAGE,
    CHAT: j.NEW_CHAT_MESSAGE,
    IDEA_COMMENTS: j.NEW_IDEA_COMMENT,
  },
  yi = (e = "CHAT") => ({
    sendMessage: async (t, n) => {
      const s = Te(),
        i = sn[e];
      if (
        (s.type === "guest" && alert("Auth expired. Please, log in again"), !t)
      ) {
        console.error("sendMessage: no channel provided!");
        return;
      }
      await t.publish(i, {
        ...n,
        Username: s.name,
        UserID: s.id,
      });
    },
    sendReaction: async (t, n, s, i) => {
      const r = Te();
      t &&
        (await t.publish(j.CHAT_MESSAGE_REACTION_ADD, {
          messageId: s,
          emoji: i,
          userId: r.id,
          channelName: n,
        }));
    },
    onNewChatMessage: (t, n) => {
      t.subscribe(j.NEW_CHAT_MESSAGE, (s) => {
        n(s);
      });
    },
    onChatMessageUpdate: (t, n) => {
      t.subscribe(j.CHAT_MESSAGE_UPDATE, (s) => {
        n(s);
      });
    },
  }),
  vi = (e, t = "CHAT") => {
    let n,
      s,
      i = !1;
    return {
      usedFor: t,
      connect: async (r) => {
        try {
          if (i)
            return await new Promise((p) => {
              const m = setInterval(() => {
                i || (clearInterval(m), p(s));
              }, 10);
            });
          i = !0;
          const o = Te(),
            h = await on(r, t === "CHAT");
          if ((e.set(h.data), o.type === "guest")) return null;
          if (r === n) return s;
          n = r;
          const c = await di(),
            g = (
              await fi({
                ablyAuth: c,
              })
            ).channels.get(r);
          return (
            await g.attach(),
            g.subscribe(sn[t], async (p) => {
              if ((await an(r, o.name), p.data?.attachments?.length)) {
                const m = await cn(p.id);
                m?.attachmentsData?.length &&
                  (p.data.attachments = m.attachmentsData);
              }
              e.set([...e.get(), ln(p, r)]);
            }),
            g.subscribe(j.CHAT_MESSAGE_UPDATE, (p) => {
              e.set(
                e.get().map((m) =>
                  m.MessageId === p.data.updatedMessage.messageId
                    ? {
                        ...m,
                        reactions: p.data.updatedMessage.patch.reactions,
                      }
                    : m
                )
              );
            }),
            (n = r),
            (s = g),
            (i = !1),
            g
          );
        } catch (o) {
          return console.error(o), (n = ""), (s = null), (i = !1), null;
        }
      },
    };
  };
export { vi as a, yi as i };
