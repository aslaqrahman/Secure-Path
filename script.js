(() => {
  var t = {
      9078: function (t, e, r) {
        "use strict";
        var n = r(3949),
          a = r(5134);
        n.define(
          "tabs",
          (t.exports = function (t) {
            var e,
              r,
              i = {},
              o = t.tram,
              s = t(document),
              u = n.env,
              c = u.safari,
              l = u(),
              d = "data-w-tab",
              f = ".w-tabs",
              p = "w--current",
              b = "w--tab-active",
              h = a.triggers,
              v = !1;
            function w() {
              if (((r = l && n.env("design")), !!(e = s.find(f)).length))
                e.each(y),
                  n.env("preview") && !v && e.each(m),
                  g(),
                  (function () {
                    n.redraw.on(i.redraw);
                  })();
            }
            function g() {
              n.redraw.off(i.redraw);
            }
            (i.ready = i.design = i.preview = w),
              (i.redraw = function () {
                (v = !0), w(), (v = !1);
              }),
              (i.destroy = function () {
                if (!!(e = s.find(f)).length) e.each(m), g();
              });
            function m(e, r) {
              var n = t.data(r, f);
              if (!!n)
                n.links && n.links.each(h.reset),
                  n.panes && n.panes.each(h.reset);
            }
            function y(e, n) {
              var a = f.substr(1) + "-" + e,
                i = t(n),
                o = t.data(n, f);
              if (
                (!o && (o = t.data(n, f, { el: i, config: {} })),
                (o.current = null),
                (o.tabIdentifier = a + "-" + d),
                (o.paneIdentifier = a + "-data-w-pane"),
                (o.menu = i.children(".w-tab-menu")),
                (o.links = o.menu.children(".w-tab-link")),
                (o.content = i.children(".w-tab-content")),
                (o.panes = o.content.children(".w-tab-pane")),
                o.el.off(f),
                o.links.off(f),
                o.menu.attr("role", "tablist"),
                o.links.attr("tabindex", "-1"),
                (function (t) {
                  var e = {};
                  e.easing = t.el.attr("data-easing") || "ease";
                  var r = parseInt(t.el.attr("data-duration-in"), 10);
                  r = e.intro = r == r ? r : 0;
                  var n = parseInt(t.el.attr("data-duration-out"), 10);
                  (n = e.outro = n == n ? n : 0),
                    (e.immediate = !r && !n),
                    (t.config = e);
                })(o),
                !r)
              ) {
                o.links.on(
                  "click" + f,
                  (function (t) {
                    return function (e) {
                      e.preventDefault();
                      var r = e.currentTarget.getAttribute(d);
                      r && k(t, { tab: r });
                    };
                  })(o)
                ),
                  o.links.on(
                    "keydown" + f,
                    (function (t) {
                      return function (e) {
                        var r,
                          n,
                          a =
                            ((n = (r = t).current),
                            Array.prototype.findIndex.call(
                              r.links,
                              (t) => t.getAttribute(d) === n,
                              null
                            )),
                          i = e.key,
                          o = {
                            ArrowLeft: a - 1,
                            ArrowUp: a - 1,
                            ArrowRight: a + 1,
                            ArrowDown: a + 1,
                            End: t.links.length - 1,
                            Home: 0,
                          };
                        if (i in o) {
                          e.preventDefault();
                          var s = o[i];
                          -1 === s && (s = t.links.length - 1),
                            s === t.links.length && (s = 0);
                          var u = t.links[s].getAttribute(d);
                          u && k(t, { tab: u });
                        }
                      };
                    })(o)
                  );
                var s = o.links.filter("." + p).attr(d);
                s && k(o, { tab: s, immediate: !0 });
              }
            }
            function k(e, r) {
              r = r || {};
              var a,
                i = e.config,
                s = i.easing,
                u = r.tab;
              if (u !== e.current) {
                (e.current = u),
                  e.links.each(function (n, o) {
                    var s = t(o);
                    if (r.immediate || i.immediate) {
                      var c = e.panes[n];
                      !o.id && (o.id = e.tabIdentifier + "-" + n),
                        !c.id && (c.id = e.paneIdentifier + "-" + n),
                        (o.href = "#" + c.id),
                        o.setAttribute("role", "tab"),
                        o.setAttribute("aria-controls", c.id),
                        o.setAttribute("aria-selected", "false"),
                        c.setAttribute("role", "tabpanel"),
                        c.setAttribute("aria-labelledby", o.id);
                    }
                    o.getAttribute(d) === u
                      ? ((a = o),
                        s
                          .addClass(p)
                          .removeAttr("tabindex")
                          .attr({ "aria-selected": "true" })
                          .each(h.intro))
                      : s.hasClass(p) &&
                        s
                          .removeClass(p)
                          .attr({ tabindex: "-1", "aria-selected": "false" })
                          .each(h.outro);
                  });
                var l = [],
                  f = [];
                e.panes.each(function (e, r) {
                  var n = t(r);
                  r.getAttribute(d) === u
                    ? l.push(r)
                    : n.hasClass(b) && f.push(r);
                });
                var w = t(l),
                  g = t(f);
                if (r.immediate || i.immediate) {
                  w.addClass(b).each(h.intro),
                    g.removeClass(b),
                    !v && n.redraw.up();
                  return;
                }
                var m = window.scrollX,
                  y = window.scrollY;
                a.focus(), window.scrollTo(m, y);
                g.length && i.outro
                  ? (g.each(h.outro),
                    o(g)
                      .add("opacity " + i.outro + "ms " + s, { fallback: c })
                      .start({ opacity: 0 })
                      .then(() => A(i, g, w)))
                  : A(i, g, w);
              }
            }
            function A(t, e, r) {
              if (
                (e
                  .removeClass(b)
                  .css({
                    opacity: "",
                    transition: "",
                    transform: "",
                    width: "",
                    height: "",
                  }),
                r.addClass(b).each(h.intro),
                n.redraw.up(),
                !t.intro)
              )
                return o(r).set({ opacity: 1 });
              o(r)
                .set({ opacity: 0 })
                .redraw()
                .add("opacity " + t.intro + "ms " + t.easing, { fallback: c })
                .start({ opacity: 1 });
            }
            return i;
          })
        );
      },
      702: function (t, e, r) {
        r(9461),
          r(7624),
          r(286),
          r(8334),
          r(2338),
          r(3695),
          r(322),
          r(941),
          r(5134),
          r(1655),
          r(7527),
          r(9078),
          r(9779);
      },
    },
    e = {};
  function r(n) {
    var a = e[n];
    if (void 0 !== a) return a.exports;
    var i = (e[n] = { id: n, loaded: !1, exports: {} });
    return t[n](i, i.exports, r), (i.loaded = !0), i.exports;
  }
  (r.m = t),
    (r.d = function (t, e) {
      for (var n in e)
        r.o(e, n) &&
          !r.o(t, n) &&
          Object.defineProperty(t, n, { enumerable: !0, get: e[n] });
    }),
    (r.hmd = function (t) {
      return (
        !(t = Object.create(t)).children && (t.children = []),
        Object.defineProperty(t, "exports", {
          enumerable: !0,
          set: function () {
            throw Error(
              "ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: " +
                t.id
            );
          },
        }),
        t
      );
    }),
    (r.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || Function("return this")();
      } catch (t) {
        if ("object" == typeof window) return window;
      }
    })()),
    (r.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (r.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (r.nmd = function (t) {
      return (t.paths = []), !t.children && (t.children = []), t;
    }),
    (() => {
      var t = [];
      r.O = function (e, n, a, i) {
        if (n) {
          i = i || 0;
          for (var o = t.length; o > 0 && t[o - 1][2] > i; o--) t[o] = t[o - 1];
          t[o] = [n, a, i];
          return;
        }
        for (var s = 1 / 0, o = 0; o < t.length; o++) {
          for (
            var n = t[o][0], a = t[o][1], i = t[o][2], u = !0, c = 0;
            c < n.length;
            c++
          )
            (!1 & i || s >= i) &&
            Object.keys(r.O).every(function (t) {
              return r.O[t](n[c]);
            })
              ? n.splice(c--, 1)
              : ((u = !1), i < s && (s = i));
          if (u) {
            t.splice(o--, 1);
            var l = a();
            void 0 !== l && (e = l);
          }
        }
        return e;
      };
    })(),
    (r.rv = function () {
      return "1.1.8";
    }),
    (() => {
      var t = { 35: 0 };
      r.O.j = function (e) {
        return 0 === t[e];
      };
      var e = function (e, n) {
          var a = n[0],
            i = n[1],
            o = n[2],
            s,
            u,
            c = 0;
          if (
            a.some(function (e) {
              return 0 !== t[e];
            })
          ) {
            for (s in i) r.o(i, s) && (r.m[s] = i[s]);
            if (o) var l = o(r);
          }
          for (e && e(n); c < a.length; c++)
            (u = a[c]), r.o(t, u) && t[u] && t[u][0](), (t[u] = 0);
          return r.O(l);
        },
        n = (self.webpackChunk = self.webpackChunk || []);
      n.forEach(e.bind(null, 0)), (n.push = e.bind(null, n.push.bind(n)));
    })(),
    (r.ruid = "bundler=rspack@1.1.8");
  var n = r.O(void 0, ["87", "672"], function () {
    return r("702");
  });
  n = r.O(n);
})();
