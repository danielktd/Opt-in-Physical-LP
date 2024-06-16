! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).Popper = {})
}(this, (function(e) {
    "use strict";

    function t(e) {
        if (null == e) return window;
        if ("[object Window]" !== e.toString()) {
            var t = e.ownerDocument;
            return t && t.defaultView || window
        }
        return e
    }

    function i(e) {
        return e instanceof t(e).Element || e instanceof Element
    }

    function s(e) {
        return e instanceof t(e).HTMLElement || e instanceof HTMLElement
    }

    function n(e) {
        return "undefined" != typeof ShadowRoot && (e instanceof t(e).ShadowRoot || e instanceof ShadowRoot)
    }
    var r = Math.max,
        a = Math.min,
        o = Math.round;

    function l() {
        var e = navigator.userAgentData;
        return null != e && e.brands && Array.isArray(e.brands) ? e.brands.map((function(e) {
            return e.brand + "/" + e.version
        })).join(" ") : navigator.userAgent
    }

    function d() {
        return !/^((?!chrome|android).)*safari/i.test(l())
    }

    function c(e, n, r) {
        void 0 === n && (n = !1), void 0 === r && (r = !1);
        var a = e.getBoundingClientRect(),
            l = 1,
            c = 1;
        n && s(e) && (l = e.offsetWidth > 0 && o(a.width) / e.offsetWidth || 1, c = e.offsetHeight > 0 && o(a.height) / e.offsetHeight || 1);
        var u = (i(e) ? t(e) : window).visualViewport,
            h = !d() && r,
            p = (a.left + (h && u ? u.offsetLeft : 0)) / l,
            f = (a.top + (h && u ? u.offsetTop : 0)) / c,
            m = a.width / l,
            g = a.height / c;
        return {
            width: m,
            height: g,
            top: f,
            right: p + m,
            bottom: f + g,
            left: p,
            x: p,
            y: f
        }
    }

    function u(e) {
        var i = t(e);
        return {
            scrollLeft: i.pageXOffset,
            scrollTop: i.pageYOffset
        }
    }

    function h(e) {
        return e ? (e.nodeName || "").toLowerCase() : null
    }

    function p(e) {
        return ((i(e) ? e.ownerDocument : e.document) || window.document).documentElement
    }

    function f(e) {
        return c(p(e)).left + u(e).scrollLeft
    }

    function m(e) {
        return t(e).getComputedStyle(e)
    }

    function g(e) {
        var t = m(e),
            i = t.overflow,
            s = t.overflowX,
            n = t.overflowY;
        return /auto|scroll|overlay|hidden/.test(i + n + s)
    }

    function v(e, i, n) {
        void 0 === n && (n = !1);
        var r, a, l = s(i),
            d = s(i) && function(e) {
                var t = e.getBoundingClientRect(),
                    i = o(t.width) / e.offsetWidth || 1,
                    s = o(t.height) / e.offsetHeight || 1;
                return 1 !== i || 1 !== s
            }(i),
            m = p(i),
            v = c(e, d, n),
            y = {
                scrollLeft: 0,
                scrollTop: 0
            },
            b = {
                x: 0,
                y: 0
            };
        return (l || !l && !n) && (("body" !== h(i) || g(m)) && (y = (r = i) !== t(r) && s(r) ? {
            scrollLeft: (a = r).scrollLeft,
            scrollTop: a.scrollTop
        } : u(r)), s(i) ? ((b = c(i, !0)).x += i.clientLeft, b.y += i.clientTop) : m && (b.x = f(m))), {
            x: v.left + y.scrollLeft - b.x,
            y: v.top + y.scrollTop - b.y,
            width: v.width,
            height: v.height
        }
    }

    function y(e) {
        var t = c(e),
            i = e.offsetWidth,
            s = e.offsetHeight;
        return Math.abs(t.width - i) <= 1 && (i = t.width), Math.abs(t.height - s) <= 1 && (s = t.height), {
            x: e.offsetLeft,
            y: e.offsetTop,
            width: i,
            height: s
        }
    }

    function b(e) {
        return "html" === h(e) ? e : e.assignedSlot || e.parentNode || (n(e) ? e.host : null) || p(e)
    }

    function w(e) {
        return ["html", "body", "#document"].indexOf(h(e)) >= 0 ? e.ownerDocument.body : s(e) && g(e) ? e : w(b(e))
    }

    function x(e, i) {
        var s;
        void 0 === i && (i = []);
        var n = w(e),
            r = n === (null == (s = e.ownerDocument) ? void 0 : s.body),
            a = t(n),
            o = r ? [a].concat(a.visualViewport || [], g(n) ? n : []) : n,
            l = i.concat(o);
        return r ? l : l.concat(x(b(o)))
    }

    function _(e) {
        return ["table", "td", "th"].indexOf(h(e)) >= 0
    }

    function E(e) {
        return s(e) && "fixed" !== m(e).position ? e.offsetParent : null
    }

    function T(e) {
        for (var i = t(e), r = E(e); r && _(r) && "static" === m(r).position;) r = E(r);
        return r && ("html" === h(r) || "body" === h(r) && "static" === m(r).position) ? i : r || function(e) {
            var t = /firefox/i.test(l());
            if (/Trident/i.test(l()) && s(e) && "fixed" === m(e).position) return null;
            var i = b(e);
            for (n(i) && (i = i.host); s(i) && ["html", "body"].indexOf(h(i)) < 0;) {
                var r = m(i);
                if ("none" !== r.transform || "none" !== r.perspective || "paint" === r.contain || -1 !== ["transform", "perspective"].indexOf(r.willChange) || t && "filter" === r.willChange || t && r.filter && "none" !== r.filter) return i;
                i = i.parentNode
            }
            return null
        }(e) || i
    }
    var C = "top",
        S = "bottom",
        M = "right",
        k = "left",
        A = "auto",
        P = [C, S, M, k],
        O = "start",
        L = "end",
        $ = "viewport",
        I = "popper",
        z = P.reduce((function(e, t) {
            return e.concat([t + "-" + O, t + "-" + L])
        }), []),
        D = [].concat(P, [A]).reduce((function(e, t) {
            return e.concat([t, t + "-" + O, t + "-" + L])
        }), []),
        N = ["beforeRead", "read", "afterRead", "beforeMain", "main", "afterMain", "beforeWrite", "write", "afterWrite"];

    function B(e) {
        var t = new Map,
            i = new Set,
            s = [];
        return e.forEach((function(e) {
            t.set(e.name, e)
        })), e.forEach((function(e) {
            i.has(e.name) || function e(n) {
                i.add(n.name), [].concat(n.requires || [], n.requiresIfExists || []).forEach((function(s) {
                    if (!i.has(s)) {
                        var n = t.get(s);
                        n && e(n)
                    }
                })), s.push(n)
            }(e)
        })), s
    }

    function j(e, t) {
        var i = t.getRootNode && t.getRootNode();
        if (e.contains(t)) return !0;
        if (i && n(i)) {
            var s = t;
            do {
                if (s && e.isSameNode(s)) return !0;
                s = s.parentNode || s.host
            } while (s)
        }
        return !1
    }

    function H(e) {
        return Object.assign({}, e, {
            left: e.x,
            top: e.y,
            right: e.x + e.width,
            bottom: e.y + e.height
        })
    }

    function q(e, s, n) {
        return s === $ ? H(function(e, i) {
            var s = t(e),
                n = p(e),
                r = s.visualViewport,
                a = n.clientWidth,
                o = n.clientHeight,
                l = 0,
                c = 0;
            if (r) {
                a = r.width, o = r.height;
                var u = d();
                (u || !u && "fixed" === i) && (l = r.offsetLeft, c = r.offsetTop)
            }
            return {
                width: a,
                height: o,
                x: l + f(e),
                y: c
            }
        }(e, n)) : i(s) ? function(e, t) {
            var i = c(e, !1, "fixed" === t);
            return i.top = i.top + e.clientTop, i.left = i.left + e.clientLeft, i.bottom = i.top + e.clientHeight, i.right = i.left + e.clientWidth, i.width = e.clientWidth, i.height = e.clientHeight, i.x = i.left, i.y = i.top, i
        }(s, n) : H(function(e) {
            var t, i = p(e),
                s = u(e),
                n = null == (t = e.ownerDocument) ? void 0 : t.body,
                a = r(i.scrollWidth, i.clientWidth, n ? n.scrollWidth : 0, n ? n.clientWidth : 0),
                o = r(i.scrollHeight, i.clientHeight, n ? n.scrollHeight : 0, n ? n.clientHeight : 0),
                l = -s.scrollLeft + f(e),
                d = -s.scrollTop;
            return "rtl" === m(n || i).direction && (l += r(i.clientWidth, n ? n.clientWidth : 0) - a), {
                width: a,
                height: o,
                x: l,
                y: d
            }
        }(p(e)))
    }

    function W(e, t, n, o) {
        var l = "clippingParents" === t ? function(e) {
                var t = x(b(e)),
                    n = ["absolute", "fixed"].indexOf(m(e).position) >= 0 && s(e) ? T(e) : e;
                return i(n) ? t.filter((function(e) {
                    return i(e) && j(e, n) && "body" !== h(e)
                })) : []
            }(e) : [].concat(t),
            d = [].concat(l, [n]),
            c = d[0],
            u = d.reduce((function(t, i) {
                var s = q(e, i, o);
                return t.top = r(s.top, t.top), t.right = a(s.right, t.right), t.bottom = a(s.bottom, t.bottom), t.left = r(s.left, t.left), t
            }), q(e, c, o));
        return u.width = u.right - u.left, u.height = u.bottom - u.top, u.x = u.left, u.y = u.top, u
    }

    function Y(e) {
        return e.split("-")[0]
    }

    function X(e) {
        return e.split("-")[1]
    }

    function R(e) {
        return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y"
    }

    function F(e) {
        var t, i = e.reference,
            s = e.element,
            n = e.placement,
            r = n ? Y(n) : null,
            a = n ? X(n) : null,
            o = i.x + i.width / 2 - s.width / 2,
            l = i.y + i.height / 2 - s.height / 2;
        switch (r) {
            case C:
                t = {
                    x: o,
                    y: i.y - s.height
                };
                break;
            case S:
                t = {
                    x: o,
                    y: i.y + i.height
                };
                break;
            case M:
                t = {
                    x: i.x + i.width,
                    y: l
                };
                break;
            case k:
                t = {
                    x: i.x - s.width,
                    y: l
                };
                break;
            default:
                t = {
                    x: i.x,
                    y: i.y
                }
        }
        var d = r ? R(r) : null;
        if (null != d) {
            var c = "y" === d ? "height" : "width";
            switch (a) {
                case O:
                    t[d] = t[d] - (i[c] / 2 - s[c] / 2);
                    break;
                case L:
                    t[d] = t[d] + (i[c] / 2 - s[c] / 2)
            }
        }
        return t
    }

    function G(e) {
        return Object.assign({}, {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }, e)
    }

    function V(e, t) {
        return t.reduce((function(t, i) {
            return t[i] = e, t
        }), {})
    }

    function U(e, t) {
        void 0 === t && (t = {});
        var s = t,
            n = s.placement,
            r = void 0 === n ? e.placement : n,
            a = s.strategy,
            o = void 0 === a ? e.strategy : a,
            l = s.boundary,
            d = void 0 === l ? "clippingParents" : l,
            u = s.rootBoundary,
            h = void 0 === u ? $ : u,
            f = s.elementContext,
            m = void 0 === f ? I : f,
            g = s.altBoundary,
            v = void 0 !== g && g,
            y = s.padding,
            b = void 0 === y ? 0 : y,
            w = G("number" != typeof b ? b : V(b, P)),
            x = m === I ? "reference" : I,
            _ = e.rects.popper,
            E = e.elements[v ? x : m],
            T = W(i(E) ? E : E.contextElement || p(e.elements.popper), d, h, o),
            k = c(e.elements.reference),
            A = F({
                reference: k,
                element: _,
                strategy: "absolute",
                placement: r
            }),
            O = H(Object.assign({}, _, A)),
            L = m === I ? O : k,
            z = {
                top: T.top - L.top + w.top,
                bottom: L.bottom - T.bottom + w.bottom,
                left: T.left - L.left + w.left,
                right: L.right - T.right + w.right
            },
            D = e.modifiersData.offset;
        if (m === I && D) {
            var N = D[r];
            Object.keys(z).forEach((function(e) {
                var t = [M, S].indexOf(e) >= 0 ? 1 : -1,
                    i = [C, S].indexOf(e) >= 0 ? "y" : "x";
                z[e] += N[i] * t
            }))
        }
        return z
    }
    var Q = {
        placement: "bottom",
        modifiers: [],
        strategy: "absolute"
    };

    function K() {
        for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
        return !t.some((function(e) {
            return !(e && "function" == typeof e.getBoundingClientRect)
        }))
    }

    function Z(e) {
        void 0 === e && (e = {});
        var t = e,
            s = t.defaultModifiers,
            n = void 0 === s ? [] : s,
            r = t.defaultOptions,
            a = void 0 === r ? Q : r;
        return function(e, t, s) {
            void 0 === s && (s = a);
            var r, o, l = {
                    placement: "bottom",
                    orderedModifiers: [],
                    options: Object.assign({}, Q, a),
                    modifiersData: {},
                    elements: {
                        reference: e,
                        popper: t
                    },
                    attributes: {},
                    styles: {}
                },
                d = [],
                c = !1,
                u = {
                    state: l,
                    setOptions: function(s) {
                        var r = "function" == typeof s ? s(l.options) : s;
                        h(), l.options = Object.assign({}, a, l.options, r), l.scrollParents = {
                            reference: i(e) ? x(e) : e.contextElement ? x(e.contextElement) : [],
                            popper: x(t)
                        };
                        var o, c, p = function(e) {
                            var t = B(e);
                            return N.reduce((function(e, i) {
                                return e.concat(t.filter((function(e) {
                                    return e.phase === i
                                })))
                            }), [])
                        }((o = [].concat(n, l.options.modifiers), c = o.reduce((function(e, t) {
                            var i = e[t.name];
                            return e[t.name] = i ? Object.assign({}, i, t, {
                                options: Object.assign({}, i.options, t.options),
                                data: Object.assign({}, i.data, t.data)
                            }) : t, e
                        }), {}), Object.keys(c).map((function(e) {
                            return c[e]
                        }))));
                        return l.orderedModifiers = p.filter((function(e) {
                            return e.enabled
                        })), l.orderedModifiers.forEach((function(e) {
                            var t = e.name,
                                i = e.options,
                                s = void 0 === i ? {} : i,
                                n = e.effect;
                            if ("function" == typeof n) {
                                var r = n({
                                    state: l,
                                    name: t,
                                    instance: u,
                                    options: s
                                });
                                d.push(r || function() {})
                            }
                        })), u.update()
                    },
                    forceUpdate: function() {
                        if (!c) {
                            var e = l.elements,
                                t = e.reference,
                                i = e.popper;
                            if (K(t, i)) {
                                l.rects = {
                                    reference: v(t, T(i), "fixed" === l.options.strategy),
                                    popper: y(i)
                                }, l.reset = !1, l.placement = l.options.placement, l.orderedModifiers.forEach((function(e) {
                                    return l.modifiersData[e.name] = Object.assign({}, e.data)
                                }));
                                for (var s = 0; s < l.orderedModifiers.length; s++)
                                    if (!0 !== l.reset) {
                                        var n = l.orderedModifiers[s],
                                            r = n.fn,
                                            a = n.options,
                                            o = void 0 === a ? {} : a,
                                            d = n.name;
                                        "function" == typeof r && (l = r({
                                            state: l,
                                            options: o,
                                            name: d,
                                            instance: u
                                        }) || l)
                                    } else l.reset = !1, s = -1
                            }
                        }
                    },
                    update: (r = function() {
                        return new Promise((function(e) {
                            u.forceUpdate(), e(l)
                        }))
                    }, function() {
                        return o || (o = new Promise((function(e) {
                            Promise.resolve().then((function() {
                                o = void 0, e(r())
                            }))
                        }))), o
                    }),
                    destroy: function() {
                        h(), c = !0
                    }
                };
            if (!K(e, t)) return u;

            function h() {
                d.forEach((function(e) {
                    return e()
                })), d = []
            }
            return u.setOptions(s).then((function(e) {
                !c && s.onFirstUpdate && s.onFirstUpdate(e)
            })), u
        }
    }
    var J = {
            passive: !0
        },
        ee = {
            name: "eventListeners",
            enabled: !0,
            phase: "write",
            fn: function() {},
            effect: function(e) {
                var i = e.state,
                    s = e.instance,
                    n = e.options,
                    r = n.scroll,
                    a = void 0 === r || r,
                    o = n.resize,
                    l = void 0 === o || o,
                    d = t(i.elements.popper),
                    c = [].concat(i.scrollParents.reference, i.scrollParents.popper);
                return a && c.forEach((function(e) {
                        e.addEventListener("scroll", s.update, J)
                    })), l && d.addEventListener("resize", s.update, J),
                    function() {
                        a && c.forEach((function(e) {
                            e.removeEventListener("scroll", s.update, J)
                        })), l && d.removeEventListener("resize", s.update, J)
                    }
            },
            data: {}
        },
        te = {
            name: "popperOffsets",
            enabled: !0,
            phase: "read",
            fn: function(e) {
                var t = e.state,
                    i = e.name;
                t.modifiersData[i] = F({
                    reference: t.rects.reference,
                    element: t.rects.popper,
                    strategy: "absolute",
                    placement: t.placement
                })
            },
            data: {}
        },
        ie = {
            top: "auto",
            right: "auto",
            bottom: "auto",
            left: "auto"
        };

    function se(e) {
        var i, s = e.popper,
            n = e.popperRect,
            r = e.placement,
            a = e.variation,
            l = e.offsets,
            d = e.position,
            c = e.gpuAcceleration,
            u = e.adaptive,
            h = e.roundOffsets,
            f = e.isFixed,
            g = l.x,
            v = void 0 === g ? 0 : g,
            y = l.y,
            b = void 0 === y ? 0 : y,
            w = "function" == typeof h ? h({
                x: v,
                y: b
            }) : {
                x: v,
                y: b
            };
        v = w.x, b = w.y;
        var x = l.hasOwnProperty("x"),
            _ = l.hasOwnProperty("y"),
            E = k,
            A = C,
            P = window;
        if (u) {
            var O = T(s),
                $ = "clientHeight",
                I = "clientWidth";
            O === t(s) && "static" !== m(O = p(s)).position && "absolute" === d && ($ = "scrollHeight", I = "scrollWidth"), O = O, (r === C || (r === k || r === M) && a === L) && (A = S, b -= (f && O === P && P.visualViewport ? P.visualViewport.height : O[$]) - n.height, b *= c ? 1 : -1), r !== k && (r !== C && r !== S || a !== L) || (E = M, v -= (f && O === P && P.visualViewport ? P.visualViewport.width : O[I]) - n.width, v *= c ? 1 : -1)
        }
        var z, D = Object.assign({
                position: d
            }, u && ie),
            N = !0 === h ? function(e, t) {
                var i = e.x,
                    s = e.y,
                    n = t.devicePixelRatio || 1;
                return {
                    x: o(i * n) / n || 0,
                    y: o(s * n) / n || 0
                }
            }({
                x: v,
                y: b
            }, t(s)) : {
                x: v,
                y: b
            };
        return v = N.x, b = N.y, c ? Object.assign({}, D, ((z = {})[A] = _ ? "0" : "", z[E] = x ? "0" : "", z.transform = (P.devicePixelRatio || 1) <= 1 ? "translate(" + v + "px, " + b + "px)" : "translate3d(" + v + "px, " + b + "px, 0)", z)) : Object.assign({}, D, ((i = {})[A] = _ ? b + "px" : "", i[E] = x ? v + "px" : "", i.transform = "", i))
    }
    var ne = {
            name: "computeStyles",
            enabled: !0,
            phase: "beforeWrite",
            fn: function(e) {
                var t = e.state,
                    i = e.options,
                    s = i.gpuAcceleration,
                    n = void 0 === s || s,
                    r = i.adaptive,
                    a = void 0 === r || r,
                    o = i.roundOffsets,
                    l = void 0 === o || o,
                    d = {
                        placement: Y(t.placement),
                        variation: X(t.placement),
                        popper: t.elements.popper,
                        popperRect: t.rects.popper,
                        gpuAcceleration: n,
                        isFixed: "fixed" === t.options.strategy
                    };
                null != t.modifiersData.popperOffsets && (t.styles.popper = Object.assign({}, t.styles.popper, se(Object.assign({}, d, {
                    offsets: t.modifiersData.popperOffsets,
                    position: t.options.strategy,
                    adaptive: a,
                    roundOffsets: l
                })))), null != t.modifiersData.arrow && (t.styles.arrow = Object.assign({}, t.styles.arrow, se(Object.assign({}, d, {
                    offsets: t.modifiersData.arrow,
                    position: "absolute",
                    adaptive: !1,
                    roundOffsets: l
                })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
                    "data-popper-placement": t.placement
                })
            },
            data: {}
        },
        re = {
            name: "applyStyles",
            enabled: !0,
            phase: "write",
            fn: function(e) {
                var t = e.state;
                Object.keys(t.elements).forEach((function(e) {
                    var i = t.styles[e] || {},
                        n = t.attributes[e] || {},
                        r = t.elements[e];
                    s(r) && h(r) && (Object.assign(r.style, i), Object.keys(n).forEach((function(e) {
                        var t = n[e];
                        !1 === t ? r.removeAttribute(e) : r.setAttribute(e, !0 === t ? "" : t)
                    })))
                }))
            },
            effect: function(e) {
                var t = e.state,
                    i = {
                        popper: {
                            position: t.options.strategy,
                            left: "0",
                            top: "0",
                            margin: "0"
                        },
                        arrow: {
                            position: "absolute"
                        },
                        reference: {}
                    };
                return Object.assign(t.elements.popper.style, i.popper), t.styles = i, t.elements.arrow && Object.assign(t.elements.arrow.style, i.arrow),
                    function() {
                        Object.keys(t.elements).forEach((function(e) {
                            var n = t.elements[e],
                                r = t.attributes[e] || {},
                                a = Object.keys(t.styles.hasOwnProperty(e) ? t.styles[e] : i[e]).reduce((function(e, t) {
                                    return e[t] = "", e
                                }), {});
                            s(n) && h(n) && (Object.assign(n.style, a), Object.keys(r).forEach((function(e) {
                                n.removeAttribute(e)
                            })))
                        }))
                    }
            },
            requires: ["computeStyles"]
        },
        ae = {
            name: "offset",
            enabled: !0,
            phase: "main",
            requires: ["popperOffsets"],
            fn: function(e) {
                var t = e.state,
                    i = e.options,
                    s = e.name,
                    n = i.offset,
                    r = void 0 === n ? [0, 0] : n,
                    a = D.reduce((function(e, i) {
                        return e[i] = function(e, t, i) {
                            var s = Y(e),
                                n = [k, C].indexOf(s) >= 0 ? -1 : 1,
                                r = "function" == typeof i ? i(Object.assign({}, t, {
                                    placement: e
                                })) : i,
                                a = r[0],
                                o = r[1];
                            return a = a || 0, o = (o || 0) * n, [k, M].indexOf(s) >= 0 ? {
                                x: o,
                                y: a
                            } : {
                                x: a,
                                y: o
                            }
                        }(i, t.rects, r), e
                    }), {}),
                    o = a[t.placement],
                    l = o.x,
                    d = o.y;
                null != t.modifiersData.popperOffsets && (t.modifiersData.popperOffsets.x += l, t.modifiersData.popperOffsets.y += d), t.modifiersData[s] = a
            }
        },
        oe = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        };

    function le(e) {
        return e.replace(/left|right|bottom|top/g, (function(e) {
            return oe[e]
        }))
    }
    var de = {
        start: "end",
        end: "start"
    };

    function ce(e) {
        return e.replace(/start|end/g, (function(e) {
            return de[e]
        }))
    }

    function ue(e, t) {
        void 0 === t && (t = {});
        var i = t,
            s = i.placement,
            n = i.boundary,
            r = i.rootBoundary,
            a = i.padding,
            o = i.flipVariations,
            l = i.allowedAutoPlacements,
            d = void 0 === l ? D : l,
            c = X(s),
            u = c ? o ? z : z.filter((function(e) {
                return X(e) === c
            })) : P,
            h = u.filter((function(e) {
                return d.indexOf(e) >= 0
            }));
        0 === h.length && (h = u);
        var p = h.reduce((function(t, i) {
            return t[i] = U(e, {
                placement: i,
                boundary: n,
                rootBoundary: r,
                padding: a
            })[Y(i)], t
        }), {});
        return Object.keys(p).sort((function(e, t) {
            return p[e] - p[t]
        }))
    }
    var he = {
        name: "flip",
        enabled: !0,
        phase: "main",
        fn: function(e) {
            var t = e.state,
                i = e.options,
                s = e.name;
            if (!t.modifiersData[s]._skip) {
                for (var n = i.mainAxis, r = void 0 === n || n, a = i.altAxis, o = void 0 === a || a, l = i.fallbackPlacements, d = i.padding, c = i.boundary, u = i.rootBoundary, h = i.altBoundary, p = i.flipVariations, f = void 0 === p || p, m = i.allowedAutoPlacements, g = t.options.placement, v = Y(g), y = l || (v !== g && f ? function(e) {
                        if (Y(e) === A) return [];
                        var t = le(e);
                        return [ce(e), t, ce(t)]
                    }(g) : [le(g)]), b = [g].concat(y).reduce((function(e, i) {
                        return e.concat(Y(i) === A ? ue(t, {
                            placement: i,
                            boundary: c,
                            rootBoundary: u,
                            padding: d,
                            flipVariations: f,
                            allowedAutoPlacements: m
                        }) : i)
                    }), []), w = t.rects.reference, x = t.rects.popper, _ = new Map, E = !0, T = b[0], P = 0; P < b.length; P++) {
                    var L = b[P],
                        $ = Y(L),
                        I = X(L) === O,
                        z = [C, S].indexOf($) >= 0,
                        D = z ? "width" : "height",
                        N = U(t, {
                            placement: L,
                            boundary: c,
                            rootBoundary: u,
                            altBoundary: h,
                            padding: d
                        }),
                        B = z ? I ? M : k : I ? S : C;
                    w[D] > x[D] && (B = le(B));
                    var j = le(B),
                        H = [];
                    if (r && H.push(N[$] <= 0), o && H.push(N[B] <= 0, N[j] <= 0), H.every((function(e) {
                            return e
                        }))) {
                        T = L, E = !1;
                        break
                    }
                    _.set(L, H)
                }
                if (E)
                    for (var q = function(e) {
                            var t = b.find((function(t) {
                                var i = _.get(t);
                                if (i) return i.slice(0, e).every((function(e) {
                                    return e
                                }))
                            }));
                            if (t) return T = t, "break"
                        }, W = f ? 3 : 1; W > 0 && "break" !== q(W); W--);
                t.placement !== T && (t.modifiersData[s]._skip = !0, t.placement = T, t.reset = !0)
            }
        },
        requiresIfExists: ["offset"],
        data: {
            _skip: !1
        }
    };

    function pe(e, t, i) {
        return r(e, a(t, i))
    }
    var fe = {
            name: "preventOverflow",
            enabled: !0,
            phase: "main",
            fn: function(e) {
                var t = e.state,
                    i = e.options,
                    s = e.name,
                    n = i.mainAxis,
                    o = void 0 === n || n,
                    l = i.altAxis,
                    d = void 0 !== l && l,
                    c = i.boundary,
                    u = i.rootBoundary,
                    h = i.altBoundary,
                    p = i.padding,
                    f = i.tether,
                    m = void 0 === f || f,
                    g = i.tetherOffset,
                    v = void 0 === g ? 0 : g,
                    b = U(t, {
                        boundary: c,
                        rootBoundary: u,
                        padding: p,
                        altBoundary: h
                    }),
                    w = Y(t.placement),
                    x = X(t.placement),
                    _ = !x,
                    E = R(w),
                    A = "x" === E ? "y" : "x",
                    P = t.modifiersData.popperOffsets,
                    L = t.rects.reference,
                    $ = t.rects.popper,
                    I = "function" == typeof v ? v(Object.assign({}, t.rects, {
                        placement: t.placement
                    })) : v,
                    z = "number" == typeof I ? {
                        mainAxis: I,
                        altAxis: I
                    } : Object.assign({
                        mainAxis: 0,
                        altAxis: 0
                    }, I),
                    D = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
                    N = {
                        x: 0,
                        y: 0
                    };
                if (P) {
                    if (o) {
                        var B, j = "y" === E ? C : k,
                            H = "y" === E ? S : M,
                            q = "y" === E ? "height" : "width",
                            W = P[E],
                            F = W + b[j],
                            G = W - b[H],
                            V = m ? -$[q] / 2 : 0,
                            Q = x === O ? L[q] : $[q],
                            K = x === O ? -$[q] : -L[q],
                            Z = t.elements.arrow,
                            J = m && Z ? y(Z) : {
                                width: 0,
                                height: 0
                            },
                            ee = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : {
                                top: 0,
                                right: 0,
                                bottom: 0,
                                left: 0
                            },
                            te = ee[j],
                            ie = ee[H],
                            se = pe(0, L[q], J[q]),
                            ne = _ ? L[q] / 2 - V - se - te - z.mainAxis : Q - se - te - z.mainAxis,
                            re = _ ? -L[q] / 2 + V + se + ie + z.mainAxis : K + se + ie + z.mainAxis,
                            ae = t.elements.arrow && T(t.elements.arrow),
                            oe = ae ? "y" === E ? ae.clientTop || 0 : ae.clientLeft || 0 : 0,
                            le = null != (B = null == D ? void 0 : D[E]) ? B : 0,
                            de = W + re - le,
                            ce = pe(m ? a(F, W + ne - le - oe) : F, W, m ? r(G, de) : G);
                        P[E] = ce, N[E] = ce - W
                    }
                    if (d) {
                        var ue, he = "x" === E ? C : k,
                            fe = "x" === E ? S : M,
                            me = P[A],
                            ge = "y" === A ? "height" : "width",
                            ve = me + b[he],
                            ye = me - b[fe],
                            be = -1 !== [C, k].indexOf(w),
                            we = null != (ue = null == D ? void 0 : D[A]) ? ue : 0,
                            xe = be ? ve : me - L[ge] - $[ge] - we + z.altAxis,
                            _e = be ? me + L[ge] + $[ge] - we - z.altAxis : ye,
                            Ee = m && be ? function(e, t, i) {
                                var s = pe(e, t, i);
                                return s > i ? i : s
                            }(xe, me, _e) : pe(m ? xe : ve, me, m ? _e : ye);
                        P[A] = Ee, N[A] = Ee - me
                    }
                    t.modifiersData[s] = N
                }
            },
            requiresIfExists: ["offset"]
        },
        me = {
            name: "arrow",
            enabled: !0,
            phase: "main",
            fn: function(e) {
                var t, i = e.state,
                    s = e.name,
                    n = e.options,
                    r = i.elements.arrow,
                    a = i.modifiersData.popperOffsets,
                    o = Y(i.placement),
                    l = R(o),
                    d = [k, M].indexOf(o) >= 0 ? "height" : "width";
                if (r && a) {
                    var c = function(e, t) {
                            return G("number" != typeof(e = "function" == typeof e ? e(Object.assign({}, t.rects, {
                                placement: t.placement
                            })) : e) ? e : V(e, P))
                        }(n.padding, i),
                        u = y(r),
                        h = "y" === l ? C : k,
                        p = "y" === l ? S : M,
                        f = i.rects.reference[d] + i.rects.reference[l] - a[l] - i.rects.popper[d],
                        m = a[l] - i.rects.reference[l],
                        g = T(r),
                        v = g ? "y" === l ? g.clientHeight || 0 : g.clientWidth || 0 : 0,
                        b = f / 2 - m / 2,
                        w = c[h],
                        x = v - u[d] - c[p],
                        _ = v / 2 - u[d] / 2 + b,
                        E = pe(w, _, x),
                        A = l;
                    i.modifiersData[s] = ((t = {})[A] = E, t.centerOffset = E - _, t)
                }
            },
            effect: function(e) {
                var t = e.state,
                    i = e.options.element,
                    s = void 0 === i ? "[data-popper-arrow]" : i;
                null != s && ("string" != typeof s || (s = t.elements.popper.querySelector(s))) && j(t.elements.popper, s) && (t.elements.arrow = s)
            },
            requires: ["popperOffsets"],
            requiresIfExists: ["preventOverflow"]
        };

    function ge(e, t, i) {
        return void 0 === i && (i = {
            x: 0,
            y: 0
        }), {
            top: e.top - t.height - i.y,
            right: e.right - t.width + i.x,
            bottom: e.bottom - t.height + i.y,
            left: e.left - t.width - i.x
        }
    }

    function ve(e) {
        return [C, M, S, k].some((function(t) {
            return e[t] >= 0
        }))
    }
    var ye = {
            name: "hide",
            enabled: !0,
            phase: "main",
            requiresIfExists: ["preventOverflow"],
            fn: function(e) {
                var t = e.state,
                    i = e.name,
                    s = t.rects.reference,
                    n = t.rects.popper,
                    r = t.modifiersData.preventOverflow,
                    a = U(t, {
                        elementContext: "reference"
                    }),
                    o = U(t, {
                        altBoundary: !0
                    }),
                    l = ge(a, s),
                    d = ge(o, n, r),
                    c = ve(l),
                    u = ve(d);
                t.modifiersData[i] = {
                    referenceClippingOffsets: l,
                    popperEscapeOffsets: d,
                    isReferenceHidden: c,
                    hasPopperEscaped: u
                }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
                    "data-popper-reference-hidden": c,
                    "data-popper-escaped": u
                })
            }
        },
        be = Z({
            defaultModifiers: [ee, te, ne, re]
        }),
        we = [ee, te, ne, re, ae, he, fe, me, ye],
        xe = Z({
            defaultModifiers: we
        });
    e.applyStyles = re, e.arrow = me, e.computeStyles = ne, e.createPopper = xe, e.createPopperLite = be, e.defaultModifiers = we, e.detectOverflow = U, e.eventListeners = ee, e.flip = he, e.hide = ye, e.offset = ae, e.popperGenerator = Z, e.popperOffsets = te, e.preventOverflow = fe, Object.defineProperty(e, "__esModule", {
        value: !0
    })
})),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("@popperjs/core")) : "function" == typeof define && define.amd ? define(["@popperjs/core"], t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).bootstrap = t(e.Popper)
}(this, (function(e) {
    "use strict";
    const t = function(e) {
            const t = Object.create(null, {
                [Symbol.toStringTag]: {
                    value: "Module"
                }
            });
            if (e)
                for (const i in e)
                    if ("default" !== i) {
                        const s = Object.getOwnPropertyDescriptor(e, i);
                        Object.defineProperty(t, i, s.get ? s : {
                            enumerable: !0,
                            get: () => e[i]
                        })
                    }
            return t.default = e, Object.freeze(t)
        }(e),
        i = new Map,
        s = {
            set(e, t, s) {
                i.has(e) || i.set(e, new Map);
                const n = i.get(e);
                n.has(t) || 0 === n.size ? n.set(t, s) : console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(n.keys())[0]}.`)
            },
            get: (e, t) => i.has(e) && i.get(e).get(t) || null,
            remove(e, t) {
                if (!i.has(e)) return;
                const s = i.get(e);
                s.delete(t), 0 === s.size && i.delete(e)
            }
        },
        n = "transitionend",
        r = e => (e && window.CSS && window.CSS.escape && (e = e.replace(/#([^\s"#']+)/g, (e, t) => "#" + CSS.escape(t))), e),
        a = e => {
            e.dispatchEvent(new Event(n))
        },
        o = e => !(!e || "object" != typeof e) && (void 0 !== e.jquery && (e = e[0]), void 0 !== e.nodeType),
        l = e => o(e) ? e.jquery ? e[0] : e : "string" == typeof e && e.length > 0 ? document.querySelector(r(e)) : null,
        d = e => {
            if (!o(e) || 0 === e.getClientRects().length) return !1;
            const t = "visible" === getComputedStyle(e).getPropertyValue("visibility"),
                i = e.closest("details:not([open])");
            if (!i) return t;
            if (i !== e) {
                const t = e.closest("summary");
                if (t && t.parentNode !== i) return !1;
                if (null === t) return !1
            }
            return t
        },
        c = e => !e || e.nodeType !== Node.ELEMENT_NODE || !!e.classList.contains("disabled") || (void 0 !== e.disabled ? e.disabled : e.hasAttribute("disabled") && "false" !== e.getAttribute("disabled")),
        u = e => {
            if (!document.documentElement.attachShadow) return null;
            if ("function" == typeof e.getRootNode) {
                const t = e.getRootNode();
                return t instanceof ShadowRoot ? t : null
            }
            return e instanceof ShadowRoot ? e : e.parentNode ? u(e.parentNode) : null
        },
        h = () => {},
        p = e => {
            e.offsetHeight
        },
        f = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null,
        m = [],
        g = () => "rtl" === document.documentElement.dir,
        v = e => {
            var t;
            t = () => {
                const t = f();
                if (t) {
                    const i = e.NAME,
                        s = t.fn[i];
                    t.fn[i] = e.jQueryInterface, t.fn[i].Constructor = e, t.fn[i].noConflict = () => (t.fn[i] = s, e.jQueryInterface)
                }
            }, "loading" === document.readyState ? (m.length || document.addEventListener("DOMContentLoaded", () => {
                for (const e of m) e()
            }), m.push(t)) : t()
        },
        y = (e, t = [], i = e) => "function" == typeof e ? e(...t) : i,
        b = (e, t, i = !0) => {
            if (!i) return void y(e);
            const s = (e => {
                if (!e) return 0;
                let {
                    transitionDuration: t,
                    transitionDelay: i
                } = window.getComputedStyle(e);
                const s = Number.parseFloat(t),
                    n = Number.parseFloat(i);
                return s || n ? (t = t.split(",")[0], i = i.split(",")[0], 1e3 * (Number.parseFloat(t) + Number.parseFloat(i))) : 0
            })(t) + 5;
            let r = !1;
            const o = ({
                target: i
            }) => {
                i === t && (r = !0, t.removeEventListener(n, o), y(e))
            };
            t.addEventListener(n, o), setTimeout(() => {
                r || a(t)
            }, s)
        },
        w = (e, t, i, s) => {
            const n = e.length;
            let r = e.indexOf(t);
            return -1 === r ? !i && s ? e[n - 1] : e[0] : (r += i ? 1 : -1, s && (r = (r + n) % n), e[Math.max(0, Math.min(r, n - 1))])
        },
        x = /[^.]*(?=\..*)\.|.*/,
        _ = /\..*/,
        E = /::\d+$/,
        T = {};
    let C = 1;
    const S = {
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        },
        M = new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);

    function k(e, t) {
        return t && `${t}::${C++}` || e.uidEvent || C++
    }

    function A(e) {
        const t = k(e);
        return e.uidEvent = t, T[t] = T[t] || {}, T[t]
    }

    function P(e, t, i = null) {
        return Object.values(e).find(e => e.callable === t && e.delegationSelector === i)
    }

    function O(e, t, i) {
        const s = "string" == typeof t,
            n = s ? i : t || i;
        let r = z(e);
        return M.has(r) || (r = e), [s, n, r]
    }

    function L(e, t, i, s, n) {
        if ("string" != typeof t || !e) return;
        let [r, a, o] = O(t, i, s);
        if (t in S) {
            a = (e => function(t) {
                if (!t.relatedTarget || t.relatedTarget !== t.delegateTarget && !t.delegateTarget.contains(t.relatedTarget)) return e.call(this, t)
            })(a)
        }
        const l = A(e),
            d = l[o] || (l[o] = {}),
            c = P(d, a, r ? i : null);
        if (c) return void(c.oneOff = c.oneOff && n);
        const u = k(a, t.replace(x, "")),
            h = r ? function(e, t, i) {
                return function s(n) {
                    const r = e.querySelectorAll(t);
                    for (let {
                            target: a
                        } = n; a && a !== this; a = a.parentNode)
                        for (const o of r)
                            if (o === a) return N(n, {
                                delegateTarget: a
                            }), s.oneOff && D.off(e, n.type, t, i), i.apply(a, [n])
                }
            }(e, i, a) : function(e, t) {
                return function i(s) {
                    return N(s, {
                        delegateTarget: e
                    }), i.oneOff && D.off(e, s.type, t), t.apply(e, [s])
                }
            }(e, a);
        h.delegationSelector = r ? i : null, h.callable = a, h.oneOff = n, h.uidEvent = u, d[u] = h, e.addEventListener(o, h, r)
    }

    function $(e, t, i, s, n) {
        const r = P(t[i], s, n);
        r && (e.removeEventListener(i, r, Boolean(n)), delete t[i][r.uidEvent])
    }

    function I(e, t, i, s) {
        const n = t[i] || {};
        for (const [r, a] of Object.entries(n)) r.includes(s) && $(e, t, i, a.callable, a.delegationSelector)
    }

    function z(e) {
        return e = e.replace(_, ""), S[e] || e
    }
    const D = {
        on(e, t, i, s) {
            L(e, t, i, s, !1)
        },
        one(e, t, i, s) {
            L(e, t, i, s, !0)
        },
        off(e, t, i, s) {
            if ("string" != typeof t || !e) return;
            const [n, r, a] = O(t, i, s), o = a !== t, l = A(e), d = l[a] || {}, c = t.startsWith(".");
            if (void 0 === r) {
                if (c)
                    for (const i of Object.keys(l)) I(e, l, i, t.slice(1));
                for (const [i, s] of Object.entries(d)) {
                    const n = i.replace(E, "");
                    o && !t.includes(n) || $(e, l, a, s.callable, s.delegationSelector)
                }
            } else {
                if (!Object.keys(d).length) return;
                $(e, l, a, r, n ? i : null)
            }
        },
        trigger(e, t, i) {
            if ("string" != typeof t || !e) return null;
            const s = f();
            let n = null,
                r = !0,
                a = !0,
                o = !1;
            t !== z(t) && s && (n = s.Event(t, i), s(e).trigger(n), r = !n.isPropagationStopped(), a = !n.isImmediatePropagationStopped(), o = n.isDefaultPrevented());
            const l = N(new Event(t, {
                bubbles: r,
                cancelable: !0
            }), i);
            return o && l.preventDefault(), a && e.dispatchEvent(l), l.defaultPrevented && n && n.preventDefault(), l
        }
    };

    function N(e, t = {}) {
        for (const [i, s] of Object.entries(t)) try {
            e[i] = s
        } catch (t) {
            Object.defineProperty(e, i, {
                configurable: !0,
                get: () => s
            })
        }
        return e
    }

    function B(e) {
        if ("true" === e) return !0;
        if ("false" === e) return !1;
        if (e === Number(e).toString()) return Number(e);
        if ("" === e || "null" === e) return null;
        if ("string" != typeof e) return e;
        try {
            return JSON.parse(decodeURIComponent(e))
        } catch (t) {
            return e
        }
    }

    function j(e) {
        return e.replace(/[A-Z]/g, e => "-" + e.toLowerCase())
    }
    const H = {
        setDataAttribute(e, t, i) {
            e.setAttribute("data-bs-" + j(t), i)
        },
        removeDataAttribute(e, t) {
            e.removeAttribute("data-bs-" + j(t))
        },
        getDataAttributes(e) {
            if (!e) return {};
            const t = {},
                i = Object.keys(e.dataset).filter(e => e.startsWith("bs") && !e.startsWith("bsConfig"));
            for (const s of i) {
                let i = s.replace(/^bs/, "");
                i = i.charAt(0).toLowerCase() + i.slice(1, i.length), t[i] = B(e.dataset[s])
            }
            return t
        },
        getDataAttribute: (e, t) => B(e.getAttribute("data-bs-" + j(t)))
    };
    class q {
        static get Default() {
            return {}
        }
        static get DefaultType() {
            return {}
        }
        static get NAME() {
            throw new Error('You have to implement the static method "NAME", for each component!')
        }
        _getConfig(e) {
            return e = this._mergeConfigObj(e), e = this._configAfterMerge(e), this._typeCheckConfig(e), e
        }
        _configAfterMerge(e) {
            return e
        }
        _mergeConfigObj(e, t) {
            const i = o(t) ? H.getDataAttribute(t, "config") : {};
            return { ...this.constructor.Default,
                ..."object" == typeof i ? i : {},
                ...o(t) ? H.getDataAttributes(t) : {},
                ..."object" == typeof e ? e : {}
            }
        }
        _typeCheckConfig(e, t = this.constructor.DefaultType) {
            for (const [s, n] of Object.entries(t)) {
                const t = e[s],
                    r = o(t) ? "element" : null == (i = t) ? "" + i : Object.prototype.toString.call(i).match(/\s([a-z]+)/i)[1].toLowerCase();
                if (!new RegExp(n).test(r)) throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${s}" provided type "${r}" but expected type "${n}".`)
            }
            var i
        }
    }
    class W extends q {
        constructor(e, t) {
            super(), (e = l(e)) && (this._element = e, this._config = this._getConfig(t), s.set(this._element, this.constructor.DATA_KEY, this))
        }
        dispose() {
            s.remove(this._element, this.constructor.DATA_KEY), D.off(this._element, this.constructor.EVENT_KEY);
            for (const e of Object.getOwnPropertyNames(this)) this[e] = null
        }
        _queueCallback(e, t, i = !0) {
            b(e, t, i)
        }
        _getConfig(e) {
            return e = this._mergeConfigObj(e, this._element), e = this._configAfterMerge(e), this._typeCheckConfig(e), e
        }
        static getInstance(e) {
            return s.get(l(e), this.DATA_KEY)
        }
        static getOrCreateInstance(e, t = {}) {
            return this.getInstance(e) || new this(e, "object" == typeof t ? t : null)
        }
        static get VERSION() {
            return "5.3.2"
        }
        static get DATA_KEY() {
            return "bs." + this.NAME
        }
        static get EVENT_KEY() {
            return "." + this.DATA_KEY
        }
        static eventName(e) {
            return `${e}${this.EVENT_KEY}`
        }
    }
    const Y = e => {
            let t = e.getAttribute("data-bs-target");
            if (!t || "#" === t) {
                let i = e.getAttribute("href");
                if (!i || !i.includes("#") && !i.startsWith(".")) return null;
                i.includes("#") && !i.startsWith("#") && (i = "#" + i.split("#")[1]), t = i && "#" !== i ? r(i.trim()) : null
            }
            return t
        },
        X = {
            find: (e, t = document.documentElement) => [].concat(...Element.prototype.querySelectorAll.call(t, e)),
            findOne: (e, t = document.documentElement) => Element.prototype.querySelector.call(t, e),
            children: (e, t) => [].concat(...e.children).filter(e => e.matches(t)),
            parents(e, t) {
                const i = [];
                let s = e.parentNode.closest(t);
                for (; s;) i.push(s), s = s.parentNode.closest(t);
                return i
            },
            prev(e, t) {
                let i = e.previousElementSibling;
                for (; i;) {
                    if (i.matches(t)) return [i];
                    i = i.previousElementSibling
                }
                return []
            },
            next(e, t) {
                let i = e.nextElementSibling;
                for (; i;) {
                    if (i.matches(t)) return [i];
                    i = i.nextElementSibling
                }
                return []
            },
            focusableChildren(e) {
                const t = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map(e => e + ':not([tabindex^="-"])').join(",");
                return this.find(t, e).filter(e => !c(e) && d(e))
            },
            getSelectorFromElement(e) {
                const t = Y(e);
                return t && X.findOne(t) ? t : null
            },
            getElementFromSelector(e) {
                const t = Y(e);
                return t ? X.findOne(t) : null
            },
            getMultipleElementsFromSelector(e) {
                const t = Y(e);
                return t ? X.find(t) : []
            }
        },
        R = (e, t = "hide") => {
            const i = "click.dismiss" + e.EVENT_KEY,
                s = e.NAME;
            D.on(document, i, `[data-bs-dismiss="${s}"]`, (function(i) {
                if (["A", "AREA"].includes(this.tagName) && i.preventDefault(), c(this)) return;
                const n = X.getElementFromSelector(this) || this.closest("." + s);
                e.getOrCreateInstance(n)[t]()
            }))
        };
    class F extends W {
        static get NAME() {
            return "alert"
        }
        close() {
            if (D.trigger(this._element, "close.bs.alert").defaultPrevented) return;
            this._element.classList.remove("show");
            const e = this._element.classList.contains("fade");
            this._queueCallback(() => this._destroyElement(), this._element, e)
        }
        _destroyElement() {
            this._element.remove(), D.trigger(this._element, "closed.bs.alert"), this.dispose()
        }
        static jQueryInterface(e) {
            return this.each((function() {
                const t = F.getOrCreateInstance(this);
                if ("string" == typeof e) {
                    if (void 0 === t[e] || e.startsWith("_") || "constructor" === e) throw new TypeError(`No method named "${e}"`);
                    t[e](this)
                }
            }))
        }
    }
    R(F, "close"), v(F);
    const G = '[data-bs-toggle="button"]';
    class V extends W {
        static get NAME() {
            return "button"
        }
        toggle() {
            this._element.setAttribute("aria-pressed", this._element.classList.toggle("active"))
        }
        static jQueryInterface(e) {
            return this.each((function() {
                const t = V.getOrCreateInstance(this);
                "toggle" === e && t[e]()
            }))
        }
    }
    D.on(document, "click.bs.button.data-api", G, e => {
        e.preventDefault();
        const t = e.target.closest(G);
        V.getOrCreateInstance(t).toggle()
    }), v(V);
    const U = ".bs.swipe",
        Q = {
            endCallback: null,
            leftCallback: null,
            rightCallback: null
        },
        K = {
            endCallback: "(function|null)",
            leftCallback: "(function|null)",
            rightCallback: "(function|null)"
        };
    class Z extends q {
        constructor(e, t) {
            super(), this._element = e, e && Z.isSupported() && (this._config = this._getConfig(t), this._deltaX = 0, this._supportPointerEvents = Boolean(window.PointerEvent), this._initEvents())
        }
        static get Default() {
            return Q
        }
        static get DefaultType() {
            return K
        }
        static get NAME() {
            return "swipe"
        }
        dispose() {
            D.off(this._element, U)
        }
        _start(e) {
            this._supportPointerEvents ? this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX) : this._deltaX = e.touches[0].clientX
        }
        _end(e) {
            this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX - this._deltaX), this._handleSwipe(), y(this._config.endCallback)
        }
        _move(e) {
            this._deltaX = e.touches && e.touches.length > 1 ? 0 : e.touches[0].clientX - this._deltaX
        }
        _handleSwipe() {
            const e = Math.abs(this._deltaX);
            if (e <= 40) return;
            const t = e / this._deltaX;
            this._deltaX = 0, t && y(t > 0 ? this._config.rightCallback : this._config.leftCallback)
        }
        _initEvents() {
            this._supportPointerEvents ? (D.on(this._element, "pointerdown.bs.swipe", e => this._start(e)), D.on(this._element, "pointerup.bs.swipe", e => this._end(e)), this._element.classList.add("pointer-event")) : (D.on(this._element, "touchstart.bs.swipe", e => this._start(e)), D.on(this._element, "touchmove.bs.swipe", e => this._move(e)), D.on(this._element, "touchend.bs.swipe", e => this._end(e)))
        }
        _eventIsPointerPenTouch(e) {
            return this._supportPointerEvents && ("pen" === e.pointerType || "touch" === e.pointerType)
        }
        static isSupported() {
            return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0
        }
    }
    const J = ".bs.carousel",
        ee = ".data-api",
        te = "next",
        ie = "prev",
        se = "left",
        ne = "right",
        re = "slid" + J,
        ae = `load${J}${ee}`,
        oe = `click${J}${ee}`,
        le = "carousel",
        de = "active",
        ce = ".active",
        ue = ".carousel-item",
        he = {
            ArrowLeft: ne,
            ArrowRight: se
        },
        pe = {
            interval: 5e3,
            keyboard: !0,
            pause: "hover",
            ride: !1,
            touch: !0,
            wrap: !0
        },
        fe = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            pause: "(string|boolean)",
            ride: "(boolean|string)",
            touch: "boolean",
            wrap: "boolean"
        };
    class me extends W {
        constructor(e, t) {
            super(e, t), this._interval = null, this._activeElement = null, this._isSliding = !1, this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement = X.findOne(".carousel-indicators", this._element), this._addEventListeners(), this._config.ride === le && this.cycle()
        }
        static get Default() {
            return pe
        }
        static get DefaultType() {
            return fe
        }
        static get NAME() {
            return "carousel"
        }
        next() {
            this._slide(te)
        }
        nextWhenVisible() {
            !document.hidden && d(this._element) && this.next()
        }
        prev() {
            this._slide(ie)
        }
        pause() {
            this._isSliding && a(this._element), this._clearInterval()
        }
        cycle() {
            this._clearInterval(), this._updateInterval(), this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval)
        }
        _maybeEnableCycle() {
            this._config.ride && (this._isSliding ? D.one(this._element, re, () => this.cycle()) : this.cycle())
        }
        to(e) {
            const t = this._getItems();
            if (e > t.length - 1 || e < 0) return;
            if (this._isSliding) return void D.one(this._element, re, () => this.to(e));
            const i = this._getItemIndex(this._getActive());
            if (i === e) return;
            const s = e > i ? te : ie;
            this._slide(s, t[e])
        }
        dispose() {
            this._swipeHelper && this._swipeHelper.dispose(), super.dispose()
        }
        _configAfterMerge(e) {
            return e.defaultInterval = e.interval, e
        }
        _addEventListeners() {
            this._config.keyboard && D.on(this._element, "keydown.bs.carousel", e => this._keydown(e)), "hover" === this._config.pause && (D.on(this._element, "mouseenter.bs.carousel", () => this.pause()), D.on(this._element, "mouseleave.bs.carousel", () => this._maybeEnableCycle())), this._config.touch && Z.isSupported() && this._addTouchEventListeners()
        }
        _addTouchEventListeners() {
            for (const e of X.find(".carousel-item img", this._element)) D.on(e, "dragstart.bs.carousel", e => e.preventDefault());
            const e = {
                leftCallback: () => this._slide(this._directionToOrder(se)),
                rightCallback: () => this._slide(this._directionToOrder(ne)),
                endCallback: () => {
                    "hover" === this._config.pause && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), 500 + this._config.interval))
                }
            };
            this._swipeHelper = new Z(this._element, e)
        }
        _keydown(e) {
            if (/input|textarea/i.test(e.target.tagName)) return;
            const t = he[e.key];
            t && (e.preventDefault(), this._slide(this._directionToOrder(t)))
        }
        _getItemIndex(e) {
            return this._getItems().indexOf(e)
        }
        _setActiveIndicatorElement(e) {
            if (!this._indicatorsElement) return;
            const t = X.findOne(ce, this._indicatorsElement);
            t.classList.remove(de), t.removeAttribute("aria-current");
            const i = X.findOne(`[data-bs-slide-to="${e}"]`, this._indicatorsElement);
            i && (i.classList.add(de), i.setAttribute("aria-current", "true"))
        }
        _updateInterval() {
            const e = this._activeElement || this._getActive();
            if (!e) return;
            const t = Number.parseInt(e.getAttribute("data-bs-interval"), 10);
            this._config.interval = t || this._config.defaultInterval
        }
        _slide(e, t = null) {
            if (this._isSliding) return;
            const i = this._getActive(),
                s = e === te,
                n = t || w(this._getItems(), i, s, this._config.wrap);
            if (n === i) return;
            const r = this._getItemIndex(n),
                a = t => D.trigger(this._element, t, {
                    relatedTarget: n,
                    direction: this._orderToDirection(e),
                    from: this._getItemIndex(i),
                    to: r
                });
            if (a("slide.bs.carousel").defaultPrevented) return;
            if (!i || !n) return;
            const o = Boolean(this._interval);
            this.pause(), this._isSliding = !0, this._setActiveIndicatorElement(r), this._activeElement = n;
            const l = s ? "carousel-item-start" : "carousel-item-end",
                d = s ? "carousel-item-next" : "carousel-item-prev";
            n.classList.add(d), p(n), i.classList.add(l), n.classList.add(l), this._queueCallback(() => {
                n.classList.remove(l, d), n.classList.add(de), i.classList.remove(de, d, l), this._isSliding = !1, a(re)
            }, i, this._isAnimated()), o && this.cycle()
        }
        _isAnimated() {
            return this._element.classList.contains("slide")
        }
        _getActive() {
            return X.findOne(".active.carousel-item", this._element)
        }
        _getItems() {
            return X.find(ue, this._element)
        }
        _clearInterval() {
            this._interval && (clearInterval(this._interval), this._interval = null)
        }
        _directionToOrder(e) {
            return g() ? e === se ? ie : te : e === se ? te : ie
        }
        _orderToDirection(e) {
            return g() ? e === ie ? se : ne : e === ie ? ne : se
        }
        static jQueryInterface(e) {
            return this.each((function() {
                const t = me.getOrCreateInstance(this, e);
                if ("number" != typeof e) {
                    if ("string" == typeof e) {
                        if (void 0 === t[e] || e.startsWith("_") || "constructor" === e) throw new TypeError(`No method named "${e}"`);
                        t[e]()
                    }
                } else t.to(e)
            }))
        }
    }
    D.on(document, oe, "[data-bs-slide], [data-bs-slide-to]", (function(e) {
        const t = X.getElementFromSelector(this);
        if (!t || !t.classList.contains(le)) return;
        e.preventDefault();
        const i = me.getOrCreateInstance(t),
            s = this.getAttribute("data-bs-slide-to");
        return s ? (i.to(s), void i._maybeEnableCycle()) : "next" === H.getDataAttribute(this, "slide") ? (i.next(), void i._maybeEnableCycle()) : (i.prev(), void i._maybeEnableCycle())
    })), D.on(window, ae, () => {
        const e = X.find('[data-bs-ride="carousel"]');
        for (const t of e) me.getOrCreateInstance(t)
    }), v(me);
    const ge = ".bs.collapse",
        ve = `click${ge}.data-api`,
        ye = "show",
        be = "collapse",
        we = "collapsing",
        xe = `:scope .${be} .${be}`,
        _e = '[data-bs-toggle="collapse"]',
        Ee = {
            parent: null,
            toggle: !0
        },
        Te = {
            parent: "(null|element)",
            toggle: "boolean"
        };
    class Ce extends W {
        constructor(e, t) {
            super(e, t), this._isTransitioning = !1, this._triggerArray = [];
            const i = X.find(_e);
            for (const e of i) {
                const t = X.getSelectorFromElement(e),
                    i = X.find(t).filter(e => e === this._element);
                null !== t && i.length && this._triggerArray.push(e)
            }
            this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle()
        }
        static get Default() {
            return Ee
        }
        static get DefaultType() {
            return Te
        }
        static get NAME() {
            return "collapse"
        }
        toggle() {
            this._isShown() ? this.hide() : this.show()
        }
        show() {
            if (this._isTransitioning || this._isShown()) return;
            let e = [];
            if (this._config.parent && (e = this._getFirstLevelChildren(".collapse.show, .collapse.collapsing").filter(e => e !== this._element).map(e => Ce.getOrCreateInstance(e, {
                    toggle: !1
                }))), e.length && e[0]._isTransitioning) return;
            if (D.trigger(this._element, "show.bs.collapse").defaultPrevented) return;
            for (const t of e) t.hide();
            const t = this._getDimension();
            this._element.classList.remove(be), this._element.classList.add(we), this._element.style[t] = 0, this._addAriaAndCollapsedClass(this._triggerArray, !0), this._isTransitioning = !0;
            const i = "scroll" + (t[0].toUpperCase() + t.slice(1));
            this._queueCallback(() => {
                this._isTransitioning = !1, this._element.classList.remove(we), this._element.classList.add(be, ye), this._element.style[t] = "", D.trigger(this._element, "shown.bs.collapse")
            }, this._element, !0), this._element.style[t] = this._element[i] + "px"
        }
        hide() {
            if (this._isTransitioning || !this._isShown()) return;
            if (D.trigger(this._element, "hide.bs.collapse").defaultPrevented) return;
            const e = this._getDimension();
            this._element.style[e] = this._element.getBoundingClientRect()[e] + "px", p(this._element), this._element.classList.add(we), this._element.classList.remove(be, ye);
            for (const e of this._triggerArray) {
                const t = X.getElementFromSelector(e);
                t && !this._isShown(t) && this._addAriaAndCollapsedClass([e], !1)
            }
            this._isTransitioning = !0, this._element.style[e] = "", this._queueCallback(() => {
                this._isTransitioning = !1, this._element.classList.remove(we), this._element.classList.add(be), D.trigger(this._element, "hidden.bs.collapse")
            }, this._element, !0)
        }
        _isShown(e = this._element) {
            return e.classList.contains(ye)
        }
        _configAfterMerge(e) {
            return e.toggle = Boolean(e.toggle), e.parent = l(e.parent), e
        }
        _getDimension() {
            return this._element.classList.contains("collapse-horizontal") ? "width" : "height"
        }
        _initializeChildren() {
            if (!this._config.parent) return;
            const e = this._getFirstLevelChildren(_e);
            for (const t of e) {
                const e = X.getElementFromSelector(t);
                e && this._addAriaAndCollapsedClass([t], this._isShown(e))
            }
        }
        _getFirstLevelChildren(e) {
            const t = X.find(xe, this._config.parent);
            return X.find(e, this._config.parent).filter(e => !t.includes(e))
        }
        _addAriaAndCollapsedClass(e, t) {
            if (e.length)
                for (const i of e) i.classList.toggle("collapsed", !t), i.setAttribute("aria-expanded", t)
        }
        static jQueryInterface(e) {
            const t = {};
            return "string" == typeof e && /show|hide/.test(e) && (t.toggle = !1), this.each((function() {
                const i = Ce.getOrCreateInstance(this, t);
                if ("string" == typeof e) {
                    if (void 0 === i[e]) throw new TypeError(`No method named "${e}"`);
                    i[e]()
                }
            }))
        }
    }
    D.on(document, ve, _e, (function(e) {
        ("A" === e.target.tagName || e.delegateTarget && "A" === e.delegateTarget.tagName) && e.preventDefault();
        for (const e of X.getMultipleElementsFromSelector(this)) Ce.getOrCreateInstance(e, {
            toggle: !1
        }).toggle()
    })), v(Ce);
    const Se = "dropdown",
        Me = ".bs.dropdown",
        ke = ".data-api",
        Ae = "ArrowUp",
        Pe = "ArrowDown",
        Oe = `click${Me}${ke}`,
        Le = `keydown${Me}${ke}`,
        $e = `keyup${Me}${ke}`,
        Ie = "show",
        ze = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',
        De = ".dropdown-menu",
        Ne = g() ? "top-end" : "top-start",
        Be = g() ? "top-start" : "top-end",
        je = g() ? "bottom-end" : "bottom-start",
        He = g() ? "bottom-start" : "bottom-end",
        qe = g() ? "left-start" : "right-start",
        We = g() ? "right-start" : "left-start",
        Ye = {
            autoClose: !0,
            boundary: "clippingParents",
            display: "dynamic",
            offset: [0, 2],
            popperConfig: null,
            reference: "toggle"
        },
        Xe = {
            autoClose: "(boolean|string)",
            boundary: "(string|element)",
            display: "string",
            offset: "(array|string|function)",
            popperConfig: "(null|object|function)",
            reference: "(string|element|object)"
        };
    class Re extends W {
        constructor(e, t) {
            super(e, t), this._popper = null, this._parent = this._element.parentNode, this._menu = X.next(this._element, De)[0] || X.prev(this._element, De)[0] || X.findOne(De, this._parent), this._inNavbar = this._detectNavbar()
        }
        static get Default() {
            return Ye
        }
        static get DefaultType() {
            return Xe
        }
        static get NAME() {
            return Se
        }
        toggle() {
            return this._isShown() ? this.hide() : this.show()
        }
        show() {
            if (c(this._element) || this._isShown()) return;
            const e = {
                relatedTarget: this._element
            };
            if (!D.trigger(this._element, "show.bs.dropdown", e).defaultPrevented) {
                if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(".navbar-nav"))
                    for (const e of [].concat(...document.body.children)) D.on(e, "mouseover", h);
                this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(Ie), this._element.classList.add(Ie), D.trigger(this._element, "shown.bs.dropdown", e)
            }
        }
        hide() {
            if (c(this._element) || !this._isShown()) return;
            const e = {
                relatedTarget: this._element
            };
            this._completeHide(e)
        }
        dispose() {
            this._popper && this._popper.destroy(), super.dispose()
        }
        update() {
            this._inNavbar = this._detectNavbar(), this._popper && this._popper.update()
        }
        _completeHide(e) {
            if (!D.trigger(this._element, "hide.bs.dropdown", e).defaultPrevented) {
                if ("ontouchstart" in document.documentElement)
                    for (const e of [].concat(...document.body.children)) D.off(e, "mouseover", h);
                this._popper && this._popper.destroy(), this._menu.classList.remove(Ie), this._element.classList.remove(Ie), this._element.setAttribute("aria-expanded", "false"), H.removeDataAttribute(this._menu, "popper"), D.trigger(this._element, "hidden.bs.dropdown", e)
            }
        }
        _getConfig(e) {
            if ("object" == typeof(e = super._getConfig(e)).reference && !o(e.reference) && "function" != typeof e.reference.getBoundingClientRect) throw new TypeError(Se.toUpperCase() + ': Option "reference" provided type "object" without a required "getBoundingClientRect" method.');
            return e
        }
        _createPopper() {
            if (void 0 === t) throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
            let e = this._element;
            "parent" === this._config.reference ? e = this._parent : o(this._config.reference) ? e = l(this._config.reference) : "object" == typeof this._config.reference && (e = this._config.reference);
            const i = this._getPopperConfig();
            this._popper = t.createPopper(e, this._menu, i)
        }
        _isShown() {
            return this._menu.classList.contains(Ie)
        }
        _getPlacement() {
            const e = this._parent;
            if (e.classList.contains("dropend")) return qe;
            if (e.classList.contains("dropstart")) return We;
            if (e.classList.contains("dropup-center")) return "top";
            if (e.classList.contains("dropdown-center")) return "bottom";
            const t = "end" === getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();
            return e.classList.contains("dropup") ? t ? Be : Ne : t ? He : je
        }
        _detectNavbar() {
            return null !== this._element.closest(".navbar")
        }
        _getOffset() {
            const {
                offset: e
            } = this._config;
            return "string" == typeof e ? e.split(",").map(e => Number.parseInt(e, 10)) : "function" == typeof e ? t => e(t, this._element) : e
        }
        _getPopperConfig() {
            const e = {
                placement: this._getPlacement(),
                modifiers: [{
                    name: "preventOverflow",
                    options: {
                        boundary: this._config.boundary
                    }
                }, {
                    name: "offset",
                    options: {
                        offset: this._getOffset()
                    }
                }]
            };
            return (this._inNavbar || "static" === this._config.display) && (H.setDataAttribute(this._menu, "popper", "static"), e.modifiers = [{
                name: "applyStyles",
                enabled: !1
            }]), { ...e,
                ...y(this._config.popperConfig, [e])
            }
        }
        _selectMenuItem({
            key: e,
            target: t
        }) {
            const i = X.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", this._menu).filter(e => d(e));
            i.length && w(i, t, e === Pe, !i.includes(t)).focus()
        }
        static jQueryInterface(e) {
            return this.each((function() {
                const t = Re.getOrCreateInstance(this, e);
                if ("string" == typeof e) {
                    if (void 0 === t[e]) throw new TypeError(`No method named "${e}"`);
                    t[e]()
                }
            }))
        }
        static clearMenus(e) {
            if (2 === e.button || "keyup" === e.type && "Tab" !== e.key) return;
            const t = X.find('[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled).show');
            for (const i of t) {
                const t = Re.getInstance(i);
                if (!t || !1 === t._config.autoClose) continue;
                const s = e.composedPath(),
                    n = s.includes(t._menu);
                if (s.includes(t._element) || "inside" === t._config.autoClose && !n || "outside" === t._config.autoClose && n) continue;
                if (t._menu.contains(e.target) && ("keyup" === e.type && "Tab" === e.key || /input|select|option|textarea|form/i.test(e.target.tagName))) continue;
                const r = {
                    relatedTarget: t._element
                };
                "click" === e.type && (r.clickEvent = e), t._completeHide(r)
            }
        }
        static dataApiKeydownHandler(e) {
            const t = /input|textarea/i.test(e.target.tagName),
                i = "Escape" === e.key,
                s = [Ae, Pe].includes(e.key);
            if (!s && !i) return;
            if (t && !i) return;
            e.preventDefault();
            const n = this.matches(ze) ? this : X.prev(this, ze)[0] || X.next(this, ze)[0] || X.findOne(ze, e.delegateTarget.parentNode),
                r = Re.getOrCreateInstance(n);
            if (s) return e.stopPropagation(), r.show(), void r._selectMenuItem(e);
            r._isShown() && (e.stopPropagation(), r.hide(), n.focus())
        }
    }
    D.on(document, Le, ze, Re.dataApiKeydownHandler), D.on(document, Le, De, Re.dataApiKeydownHandler), D.on(document, Oe, Re.clearMenus), D.on(document, $e, Re.clearMenus), D.on(document, Oe, ze, (function(e) {
        e.preventDefault(), Re.getOrCreateInstance(this).toggle()
    })), v(Re);
    const Fe = "backdrop",
        Ge = "mousedown.bs." + Fe,
        Ve = {
            className: "modal-backdrop",
            clickCallback: null,
            isAnimated: !1,
            isVisible: !0,
            rootElement: "body"
        },
        Ue = {
            className: "string",
            clickCallback: "(function|null)",
            isAnimated: "boolean",
            isVisible: "boolean",
            rootElement: "(element|string)"
        };
    class Qe extends q {
        constructor(e) {
            super(), this._config = this._getConfig(e), this._isAppended = !1, this._element = null
        }
        static get Default() {
            return Ve
        }
        static get DefaultType() {
            return Ue
        }
        static get NAME() {
            return Fe
        }
        show(e) {
            if (!this._config.isVisible) return void y(e);
            this._append();
            const t = this._getElement();
            this._config.isAnimated && p(t), t.classList.add("show"), this._emulateAnimation(() => {
                y(e)
            })
        }
        hide(e) {
            this._config.isVisible ? (this._getElement().classList.remove("show"), this._emulateAnimation(() => {
                this.dispose(), y(e)
            })) : y(e)
        }
        dispose() {
            this._isAppended && (D.off(this._element, Ge), this._element.remove(), this._isAppended = !1)
        }
        _getElement() {
            if (!this._element) {
                const e = document.createElement("div");
                e.className = this._config.className, this._config.isAnimated && e.classList.add("fade"), this._element = e
            }
            return this._element
        }
        _configAfterMerge(e) {
            return e.rootElement = l(e.rootElement), e
        }
        _append() {
            if (this._isAppended) return;
            const e = this._getElement();
            this._config.rootElement.append(e), D.on(e, Ge, () => {
                y(this._config.clickCallback)
            }), this._isAppended = !0
        }
        _emulateAnimation(e) {
            b(e, this._getElement(), this._config.isAnimated)
        }
    }
    const Ke = ".bs.focustrap",
        Ze = "backward",
        Je = {
            autofocus: !0,
            trapElement: null
        },
        et = {
            autofocus: "boolean",
            trapElement: "element"
        };
    class tt extends q {
        constructor(e) {
            super(), this._config = this._getConfig(e), this._isActive = !1, this._lastTabNavDirection = null
        }
        static get Default() {
            return Je
        }
        static get DefaultType() {
            return et
        }
        static get NAME() {
            return "focustrap"
        }
        activate() {
            this._isActive || (this._config.autofocus && this._config.trapElement.focus(), D.off(document, Ke), D.on(document, "focusin.bs.focustrap", e => this._handleFocusin(e)), D.on(document, "keydown.tab.bs.focustrap", e => this._handleKeydown(e)), this._isActive = !0)
        }
        deactivate() {
            this._isActive && (this._isActive = !1, D.off(document, Ke))
        }
        _handleFocusin(e) {
            const {
                trapElement: t
            } = this._config;
            if (e.target === document || e.target === t || t.contains(e.target)) return;
            const i = X.focusableChildren(t);
            0 === i.length ? t.focus() : this._lastTabNavDirection === Ze ? i[i.length - 1].focus() : i[0].focus()
        }
        _handleKeydown(e) {
            "Tab" === e.key && (this._lastTabNavDirection = e.shiftKey ? Ze : "forward")
        }
    }
    const it = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
        st = ".sticky-top",
        nt = "padding-right",
        rt = "margin-right";
    class at {
        constructor() {
            this._element = document.body
        }
        getWidth() {
            const e = document.documentElement.clientWidth;
            return Math.abs(window.innerWidth - e)
        }
        hide() {
            const e = this.getWidth();
            this._disableOverFlow(), this._setElementAttributes(this._element, nt, t => t + e), this._setElementAttributes(it, nt, t => t + e), this._setElementAttributes(st, rt, t => t - e)
        }
        reset() {
            this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, nt), this._resetElementAttributes(it, nt), this._resetElementAttributes(st, rt)
        }
        isOverflowing() {
            return this.getWidth() > 0
        }
        _disableOverFlow() {
            this._saveInitialAttribute(this._element, "overflow"), this._element.style.overflow = "hidden"
        }
        _setElementAttributes(e, t, i) {
            const s = this.getWidth();
            this._applyManipulationCallback(e, e => {
                if (e !== this._element && window.innerWidth > e.clientWidth + s) return;
                this._saveInitialAttribute(e, t);
                const n = window.getComputedStyle(e).getPropertyValue(t);
                e.style.setProperty(t, i(Number.parseFloat(n)) + "px")
            })
        }
        _saveInitialAttribute(e, t) {
            const i = e.style.getPropertyValue(t);
            i && H.setDataAttribute(e, t, i)
        }
        _resetElementAttributes(e, t) {
            this._applyManipulationCallback(e, e => {
                const i = H.getDataAttribute(e, t);
                null !== i ? (H.removeDataAttribute(e, t), e.style.setProperty(t, i)) : e.style.removeProperty(t)
            })
        }
        _applyManipulationCallback(e, t) {
            if (o(e)) t(e);
            else
                for (const i of X.find(e, this._element)) t(i)
        }
    }
    const ot = ".bs.modal",
        lt = "hidden" + ot,
        dt = "show" + ot,
        ct = `click${ot}.data-api`,
        ut = "modal-open",
        ht = "modal-static",
        pt = {
            backdrop: !0,
            focus: !0,
            keyboard: !0
        },
        ft = {
            backdrop: "(boolean|string)",
            focus: "boolean",
            keyboard: "boolean"
        };
    class mt extends W {
        constructor(e, t) {
            super(e, t), this._dialog = X.findOne(".modal-dialog", this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = !1, this._isTransitioning = !1, this._scrollBar = new at, this._addEventListeners()
        }
        static get Default() {
            return pt
        }
        static get DefaultType() {
            return ft
        }
        static get NAME() {
            return "modal"
        }
        toggle(e) {
            return this._isShown ? this.hide() : this.show(e)
        }
        show(e) {
            this._isShown || this._isTransitioning || D.trigger(this._element, dt, {
                relatedTarget: e
            }).defaultPrevented || (this._isShown = !0, this._isTransitioning = !0, this._scrollBar.hide(), document.body.classList.add(ut), this._adjustDialog(), this._backdrop.show(() => this._showElement(e)))
        }
        hide() {
            this._isShown && !this._isTransitioning && (D.trigger(this._element, "hide.bs.modal").defaultPrevented || (this._isShown = !1, this._isTransitioning = !0, this._focustrap.deactivate(), this._element.classList.remove("show"), this._queueCallback(() => this._hideModal(), this._element, this._isAnimated())))
        }
        dispose() {
            D.off(window, ot), D.off(this._dialog, ot), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose()
        }
        handleUpdate() {
            this._adjustDialog()
        }
        _initializeBackDrop() {
            return new Qe({
                isVisible: Boolean(this._config.backdrop),
                isAnimated: this._isAnimated()
            })
        }
        _initializeFocusTrap() {
            return new tt({
                trapElement: this._element
            })
        }
        _showElement(e) {
            document.body.contains(this._element) || document.body.append(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0;
            const t = X.findOne(".modal-body", this._dialog);
            t && (t.scrollTop = 0), p(this._element), this._element.classList.add("show"), this._queueCallback(() => {
                this._config.focus && this._focustrap.activate(), this._isTransitioning = !1, D.trigger(this._element, "shown.bs.modal", {
                    relatedTarget: e
                })
            }, this._dialog, this._isAnimated())
        }
        _addEventListeners() {
            D.on(this._element, "keydown.dismiss.bs.modal", e => {
                "Escape" === e.key && (this._config.keyboard ? this.hide() : this._triggerBackdropTransition())
            }), D.on(window, "resize.bs.modal", () => {
                this._isShown && !this._isTransitioning && this._adjustDialog()
            }), D.on(this._element, "mousedown.dismiss.bs.modal", e => {
                D.one(this._element, "click.dismiss.bs.modal", t => {
                    this._element === e.target && this._element === t.target && ("static" !== this._config.backdrop ? this._config.backdrop && this.hide() : this._triggerBackdropTransition())
                })
            })
        }
        _hideModal() {
            this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = !1, this._backdrop.hide(() => {
                document.body.classList.remove(ut), this._resetAdjustments(), this._scrollBar.reset(), D.trigger(this._element, lt)
            })
        }
        _isAnimated() {
            return this._element.classList.contains("fade")
        }
        _triggerBackdropTransition() {
            if (D.trigger(this._element, "hidePrevented.bs.modal").defaultPrevented) return;
            const e = this._element.scrollHeight > document.documentElement.clientHeight,
                t = this._element.style.overflowY;
            "hidden" === t || this._element.classList.contains(ht) || (e || (this._element.style.overflowY = "hidden"), this._element.classList.add(ht), this._queueCallback(() => {
                this._element.classList.remove(ht), this._queueCallback(() => {
                    this._element.style.overflowY = t
                }, this._dialog)
            }, this._dialog), this._element.focus())
        }
        _adjustDialog() {
            const e = this._element.scrollHeight > document.documentElement.clientHeight,
                t = this._scrollBar.getWidth(),
                i = t > 0;
            if (i && !e) {
                const e = g() ? "paddingLeft" : "paddingRight";
                this._element.style[e] = t + "px"
            }
            if (!i && e) {
                const e = g() ? "paddingRight" : "paddingLeft";
                this._element.style[e] = t + "px"
            }
        }
        _resetAdjustments() {
            this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
        }
        static jQueryInterface(e, t) {
            return this.each((function() {
                const i = mt.getOrCreateInstance(this, e);
                if ("string" == typeof e) {
                    if (void 0 === i[e]) throw new TypeError(`No method named "${e}"`);
                    i[e](t)
                }
            }))
        }
    }
    D.on(document, ct, '[data-bs-toggle="modal"]', (function(e) {
        const t = X.getElementFromSelector(this);
        ["A", "AREA"].includes(this.tagName) && e.preventDefault(), D.one(t, dt, e => {
            e.defaultPrevented || D.one(t, lt, () => {
                d(this) && this.focus()
            })
        });
        const i = X.findOne(".modal.show");
        i && mt.getInstance(i).hide(), mt.getOrCreateInstance(t).toggle(this)
    })), R(mt), v(mt);
    const gt = ".bs.offcanvas",
        vt = ".data-api",
        yt = `load${gt}${vt}`,
        bt = "showing",
        wt = ".offcanvas.show",
        xt = "hidePrevented" + gt,
        _t = "hidden" + gt,
        Et = `click${gt}${vt}`,
        Tt = {
            backdrop: !0,
            keyboard: !0,
            scroll: !1
        },
        Ct = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            scroll: "boolean"
        };
    class St extends W {
        constructor(e, t) {
            super(e, t), this._isShown = !1, this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._addEventListeners()
        }
        static get Default() {
            return Tt
        }
        static get DefaultType() {
            return Ct
        }
        static get NAME() {
            return "offcanvas"
        }
        toggle(e) {
            return this._isShown ? this.hide() : this.show(e)
        }
        show(e) {
            this._isShown || D.trigger(this._element, "show.bs.offcanvas", {
                relatedTarget: e
            }).defaultPrevented || (this._isShown = !0, this._backdrop.show(), this._config.scroll || (new at).hide(), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add(bt), this._queueCallback(() => {
                this._config.scroll && !this._config.backdrop || this._focustrap.activate(), this._element.classList.add("show"), this._element.classList.remove(bt), D.trigger(this._element, "shown.bs.offcanvas", {
                    relatedTarget: e
                })
            }, this._element, !0))
        }
        hide() {
            this._isShown && (D.trigger(this._element, "hide.bs.offcanvas").defaultPrevented || (this._focustrap.deactivate(), this._element.blur(), this._isShown = !1, this._element.classList.add("hiding"), this._backdrop.hide(), this._queueCallback(() => {
                this._element.classList.remove("show", "hiding"), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._config.scroll || (new at).reset(), D.trigger(this._element, _t)
            }, this._element, !0)))
        }
        dispose() {
            this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose()
        }
        _initializeBackDrop() {
            const e = Boolean(this._config.backdrop);
            return new Qe({
                className: "offcanvas-backdrop",
                isVisible: e,
                isAnimated: !0,
                rootElement: this._element.parentNode,
                clickCallback: e ? () => {
                    "static" !== this._config.backdrop ? this.hide() : D.trigger(this._element, xt)
                } : null
            })
        }
        _initializeFocusTrap() {
            return new tt({
                trapElement: this._element
            })
        }
        _addEventListeners() {
            D.on(this._element, "keydown.dismiss.bs.offcanvas", e => {
                "Escape" === e.key && (this._config.keyboard ? this.hide() : D.trigger(this._element, xt))
            })
        }
        static jQueryInterface(e) {
            return this.each((function() {
                const t = St.getOrCreateInstance(this, e);
                if ("string" == typeof e) {
                    if (void 0 === t[e] || e.startsWith("_") || "constructor" === e) throw new TypeError(`No method named "${e}"`);
                    t[e](this)
                }
            }))
        }
    }
    D.on(document, Et, '[data-bs-toggle="offcanvas"]', (function(e) {
        const t = X.getElementFromSelector(this);
        if (["A", "AREA"].includes(this.tagName) && e.preventDefault(), c(this)) return;
        D.one(t, _t, () => {
            d(this) && this.focus()
        });
        const i = X.findOne(wt);
        i && i !== t && St.getInstance(i).hide(), St.getOrCreateInstance(t).toggle(this)
    })), D.on(window, yt, () => {
        for (const e of X.find(wt)) St.getOrCreateInstance(e).show()
    }), D.on(window, "resize.bs.offcanvas", () => {
        for (const e of X.find("[aria-modal][class*=show][class*=offcanvas-]")) "fixed" !== getComputedStyle(e).position && St.getOrCreateInstance(e).hide()
    }), R(St), v(St);
    const Mt = {
            "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
            a: ["target", "href", "title", "rel"],
            area: [],
            b: [],
            br: [],
            col: [],
            code: [],
            div: [],
            em: [],
            hr: [],
            h1: [],
            h2: [],
            h3: [],
            h4: [],
            h5: [],
            h6: [],
            i: [],
            img: ["src", "srcset", "alt", "title", "width", "height"],
            li: [],
            ol: [],
            p: [],
            pre: [],
            s: [],
            small: [],
            span: [],
            sub: [],
            sup: [],
            strong: [],
            u: [],
            ul: []
        },
        kt = new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]),
        At = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,
        Pt = (e, t) => {
            const i = e.nodeName.toLowerCase();
            return t.includes(i) ? !kt.has(i) || Boolean(At.test(e.nodeValue)) : t.filter(e => e instanceof RegExp).some(e => e.test(i))
        },
        Ot = {
            allowList: Mt,
            content: {},
            extraClass: "",
            html: !1,
            sanitize: !0,
            sanitizeFn: null,
            template: "<div></div>"
        },
        Lt = {
            allowList: "object",
            content: "object",
            extraClass: "(string|function)",
            html: "boolean",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            template: "string"
        },
        $t = {
            entry: "(string|element|function|null)",
            selector: "(string|element)"
        };
    class It extends q {
        constructor(e) {
            super(), this._config = this._getConfig(e)
        }
        static get Default() {
            return Ot
        }
        static get DefaultType() {
            return Lt
        }
        static get NAME() {
            return "TemplateFactory"
        }
        getContent() {
            return Object.values(this._config.content).map(e => this._resolvePossibleFunction(e)).filter(Boolean)
        }
        hasContent() {
            return this.getContent().length > 0
        }
        changeContent(e) {
            return this._checkContent(e), this._config.content = { ...this._config.content,
                ...e
            }, this
        }
        toHtml() {
            const e = document.createElement("div");
            e.innerHTML = this._maybeSanitize(this._config.template);
            for (const [t, i] of Object.entries(this._config.content)) this._setContent(e, i, t);
            const t = e.children[0],
                i = this._resolvePossibleFunction(this._config.extraClass);
            return i && t.classList.add(...i.split(" ")), t
        }
        _typeCheckConfig(e) {
            super._typeCheckConfig(e), this._checkContent(e.content)
        }
        _checkContent(e) {
            for (const [t, i] of Object.entries(e)) super._typeCheckConfig({
                selector: t,
                entry: i
            }, $t)
        }
        _setContent(e, t, i) {
            const s = X.findOne(i, e);
            s && ((t = this._resolvePossibleFunction(t)) ? o(t) ? this._putElementInTemplate(l(t), s) : this._config.html ? s.innerHTML = this._maybeSanitize(t) : s.textContent = t : s.remove())
        }
        _maybeSanitize(e) {
            return this._config.sanitize ? function(e, t, i) {
                if (!e.length) return e;
                if (i && "function" == typeof i) return i(e);
                const s = (new window.DOMParser).parseFromString(e, "text/html"),
                    n = [].concat(...s.body.querySelectorAll("*"));
                for (const e of n) {
                    const i = e.nodeName.toLowerCase();
                    if (!Object.keys(t).includes(i)) {
                        e.remove();
                        continue
                    }
                    const s = [].concat(...e.attributes),
                        n = [].concat(t["*"] || [], t[i] || []);
                    for (const t of s) Pt(t, n) || e.removeAttribute(t.nodeName)
                }
                return s.body.innerHTML
            }(e, this._config.allowList, this._config.sanitizeFn) : e
        }
        _resolvePossibleFunction(e) {
            return y(e, [this])
        }
        _putElementInTemplate(e, t) {
            if (this._config.html) return t.innerHTML = "", void t.append(e);
            t.textContent = e.textContent
        }
    }
    const zt = new Set(["sanitize", "allowList", "sanitizeFn"]),
        Dt = "fade",
        Nt = "show",
        Bt = "hide.bs.modal",
        jt = "hover",
        Ht = "focus",
        qt = {
            AUTO: "auto",
            TOP: "top",
            RIGHT: g() ? "left" : "right",
            BOTTOM: "bottom",
            LEFT: g() ? "right" : "left"
        },
        Wt = {
            allowList: Mt,
            animation: !0,
            boundary: "clippingParents",
            container: !1,
            customClass: "",
            delay: 0,
            fallbackPlacements: ["top", "right", "bottom", "left"],
            html: !1,
            offset: [0, 6],
            placement: "top",
            popperConfig: null,
            sanitize: !0,
            sanitizeFn: null,
            selector: !1,
            template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            title: "",
            trigger: "hover focus"
        },
        Yt = {
            allowList: "object",
            animation: "boolean",
            boundary: "(string|element)",
            container: "(string|element|boolean)",
            customClass: "(string|function)",
            delay: "(number|object)",
            fallbackPlacements: "array",
            html: "boolean",
            offset: "(array|string|function)",
            placement: "(string|function)",
            popperConfig: "(null|object|function)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            selector: "(string|boolean)",
            template: "string",
            title: "(string|element|function)",
            trigger: "string"
        };
    class Xt extends W {
        constructor(e, i) {
            if (void 0 === t) throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
            super(e, i), this._isEnabled = !0, this._timeout = 0, this._isHovered = null, this._activeTrigger = {}, this._popper = null, this._templateFactory = null, this._newContent = null, this.tip = null, this._setListeners(), this._config.selector || this._fixTitle()
        }
        static get Default() {
            return Wt
        }
        static get DefaultType() {
            return Yt
        }
        static get NAME() {
            return "tooltip"
        }
        enable() {
            this._isEnabled = !0
        }
        disable() {
            this._isEnabled = !1
        }
        toggleEnabled() {
            this._isEnabled = !this._isEnabled
        }
        toggle() {
            this._isEnabled && (this._activeTrigger.click = !this._activeTrigger.click, this._isShown() ? this._leave() : this._enter())
        }
        dispose() {
            clearTimeout(this._timeout), D.off(this._element.closest(".modal"), Bt, this._hideModalHandler), this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")), this._disposePopper(), super.dispose()
        }
        show() {
            if ("none" === this._element.style.display) throw new Error("Please use show on visible elements");
            if (!this._isWithContent() || !this._isEnabled) return;
            const e = D.trigger(this._element, this.constructor.eventName("show")),
                t = (u(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
            if (e.defaultPrevented || !t) return;
            this._disposePopper();
            const i = this._getTipElement();
            this._element.setAttribute("aria-describedby", i.getAttribute("id"));
            const {
                container: s
            } = this._config;
            if (this._element.ownerDocument.documentElement.contains(this.tip) || (s.append(i), D.trigger(this._element, this.constructor.eventName("inserted"))), this._popper = this._createPopper(i), i.classList.add(Nt), "ontouchstart" in document.documentElement)
                for (const e of [].concat(...document.body.children)) D.on(e, "mouseover", h);
            this._queueCallback(() => {
                D.trigger(this._element, this.constructor.eventName("shown")), !1 === this._isHovered && this._leave(), this._isHovered = !1
            }, this.tip, this._isAnimated())
        }
        hide() {
            if (this._isShown() && !D.trigger(this._element, this.constructor.eventName("hide")).defaultPrevented) {
                if (this._getTipElement().classList.remove(Nt), "ontouchstart" in document.documentElement)
                    for (const e of [].concat(...document.body.children)) D.off(e, "mouseover", h);
                this._activeTrigger.click = !1, this._activeTrigger[Ht] = !1, this._activeTrigger[jt] = !1, this._isHovered = null, this._queueCallback(() => {
                    this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(), this._element.removeAttribute("aria-describedby"), D.trigger(this._element, this.constructor.eventName("hidden")))
                }, this.tip, this._isAnimated())
            }
        }
        update() {
            this._popper && this._popper.update()
        }
        _isWithContent() {
            return Boolean(this._getTitle())
        }
        _getTipElement() {
            return this.tip || (this.tip = this._createTipElement(this._newContent || this._getContentForTemplate())), this.tip
        }
        _createTipElement(e) {
            const t = this._getTemplateFactory(e).toHtml();
            if (!t) return null;
            t.classList.remove(Dt, Nt), t.classList.add(`bs-${this.constructor.NAME}-auto`);
            const i = (e => {
                do {
                    e += Math.floor(1e6 * Math.random())
                } while (document.getElementById(e));
                return e
            })(this.constructor.NAME).toString();
            return t.setAttribute("id", i), this._isAnimated() && t.classList.add(Dt), t
        }
        setContent(e) {
            this._newContent = e, this._isShown() && (this._disposePopper(), this.show())
        }
        _getTemplateFactory(e) {
            return this._templateFactory ? this._templateFactory.changeContent(e) : this._templateFactory = new It({ ...this._config,
                content: e,
                extraClass: this._resolvePossibleFunction(this._config.customClass)
            }), this._templateFactory
        }
        _getContentForTemplate() {
            return {
                ".tooltip-inner": this._getTitle()
            }
        }
        _getTitle() {
            return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title")
        }
        _initializeOnDelegatedTarget(e) {
            return this.constructor.getOrCreateInstance(e.delegateTarget, this._getDelegateConfig())
        }
        _isAnimated() {
            return this._config.animation || this.tip && this.tip.classList.contains(Dt)
        }
        _isShown() {
            return this.tip && this.tip.classList.contains(Nt)
        }
        _createPopper(e) {
            const i = y(this._config.placement, [this, e, this._element]),
                s = qt[i.toUpperCase()];
            return t.createPopper(this._element, e, this._getPopperConfig(s))
        }
        _getOffset() {
            const {
                offset: e
            } = this._config;
            return "string" == typeof e ? e.split(",").map(e => Number.parseInt(e, 10)) : "function" == typeof e ? t => e(t, this._element) : e
        }
        _resolvePossibleFunction(e) {
            return y(e, [this._element])
        }
        _getPopperConfig(e) {
            const t = {
                placement: e,
                modifiers: [{
                    name: "flip",
                    options: {
                        fallbackPlacements: this._config.fallbackPlacements
                    }
                }, {
                    name: "offset",
                    options: {
                        offset: this._getOffset()
                    }
                }, {
                    name: "preventOverflow",
                    options: {
                        boundary: this._config.boundary
                    }
                }, {
                    name: "arrow",
                    options: {
                        element: `.${this.constructor.NAME}-arrow`
                    }
                }, {
                    name: "preSetPlacement",
                    enabled: !0,
                    phase: "beforeMain",
                    fn: e => {
                        this._getTipElement().setAttribute("data-popper-placement", e.state.placement)
                    }
                }]
            };
            return { ...t,
                ...y(this._config.popperConfig, [t])
            }
        }
        _setListeners() {
            const e = this._config.trigger.split(" ");
            for (const t of e)
                if ("click" === t) D.on(this._element, this.constructor.eventName("click"), this._config.selector, e => {
                    this._initializeOnDelegatedTarget(e).toggle()
                });
                else if ("manual" !== t) {
                const e = t === jt ? this.constructor.eventName("mouseenter") : this.constructor.eventName("focusin"),
                    i = t === jt ? this.constructor.eventName("mouseleave") : this.constructor.eventName("focusout");
                D.on(this._element, e, this._config.selector, e => {
                    const t = this._initializeOnDelegatedTarget(e);
                    t._activeTrigger["focusin" === e.type ? Ht : jt] = !0, t._enter()
                }), D.on(this._element, i, this._config.selector, e => {
                    const t = this._initializeOnDelegatedTarget(e);
                    t._activeTrigger["focusout" === e.type ? Ht : jt] = t._element.contains(e.relatedTarget), t._leave()
                })
            }
            this._hideModalHandler = () => {
                this._element && this.hide()
            }, D.on(this._element.closest(".modal"), Bt, this._hideModalHandler)
        }
        _fixTitle() {
            const e = this._element.getAttribute("title");
            e && (this._element.getAttribute("aria-label") || this._element.textContent.trim() || this._element.setAttribute("aria-label", e), this._element.setAttribute("data-bs-original-title", e), this._element.removeAttribute("title"))
        }
        _enter() {
            this._isShown() || this._isHovered ? this._isHovered = !0 : (this._isHovered = !0, this._setTimeout(() => {
                this._isHovered && this.show()
            }, this._config.delay.show))
        }
        _leave() {
            this._isWithActiveTrigger() || (this._isHovered = !1, this._setTimeout(() => {
                this._isHovered || this.hide()
            }, this._config.delay.hide))
        }
        _setTimeout(e, t) {
            clearTimeout(this._timeout), this._timeout = setTimeout(e, t)
        }
        _isWithActiveTrigger() {
            return Object.values(this._activeTrigger).includes(!0)
        }
        _getConfig(e) {
            const t = H.getDataAttributes(this._element);
            for (const e of Object.keys(t)) zt.has(e) && delete t[e];
            return e = { ...t,
                ..."object" == typeof e && e ? e : {}
            }, e = this._mergeConfigObj(e), e = this._configAfterMerge(e), this._typeCheckConfig(e), e
        }
        _configAfterMerge(e) {
            return e.container = !1 === e.container ? document.body : l(e.container), "number" == typeof e.delay && (e.delay = {
                show: e.delay,
                hide: e.delay
            }), "number" == typeof e.title && (e.title = e.title.toString()), "number" == typeof e.content && (e.content = e.content.toString()), e
        }
        _getDelegateConfig() {
            const e = {};
            for (const [t, i] of Object.entries(this._config)) this.constructor.Default[t] !== i && (e[t] = i);
            return e.selector = !1, e.trigger = "manual", e
        }
        _disposePopper() {
            this._popper && (this._popper.destroy(), this._popper = null), this.tip && (this.tip.remove(), this.tip = null)
        }
        static jQueryInterface(e) {
            return this.each((function() {
                const t = Xt.getOrCreateInstance(this, e);
                if ("string" == typeof e) {
                    if (void 0 === t[e]) throw new TypeError(`No method named "${e}"`);
                    t[e]()
                }
            }))
        }
    }
    v(Xt);
    const Rt = { ...Xt.Default,
            content: "",
            offset: [0, 8],
            placement: "right",
            template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
            trigger: "click"
        },
        Ft = { ...Xt.DefaultType,
            content: "(null|string|element|function)"
        };
    class Gt extends Xt {
        static get Default() {
            return Rt
        }
        static get DefaultType() {
            return Ft
        }
        static get NAME() {
            return "popover"
        }
        _isWithContent() {
            return this._getTitle() || this._getContent()
        }
        _getContentForTemplate() {
            return {
                ".popover-header": this._getTitle(),
                ".popover-body": this._getContent()
            }
        }
        _getContent() {
            return this._resolvePossibleFunction(this._config.content)
        }
        static jQueryInterface(e) {
            return this.each((function() {
                const t = Gt.getOrCreateInstance(this, e);
                if ("string" == typeof e) {
                    if (void 0 === t[e]) throw new TypeError(`No method named "${e}"`);
                    t[e]()
                }
            }))
        }
    }
    v(Gt);
    const Vt = ".bs.scrollspy",
        Ut = "click" + Vt,
        Qt = `load${Vt}.data-api`,
        Kt = "active",
        Zt = "[href]",
        Jt = ".nav-link",
        ei = `${Jt}, .nav-item > ${Jt}, .list-group-item`,
        ti = {
            offset: null,
            rootMargin: "0px 0px -25%",
            smoothScroll: !1,
            target: null,
            threshold: [.1, .5, 1]
        },
        ii = {
            offset: "(number|null)",
            rootMargin: "string",
            smoothScroll: "boolean",
            target: "element",
            threshold: "array"
        };
    class si extends W {
        constructor(e, t) {
            super(e, t), this._targetLinks = new Map, this._observableSections = new Map, this._rootElement = "visible" === getComputedStyle(this._element).overflowY ? null : this._element, this._activeTarget = null, this._observer = null, this._previousScrollData = {
                visibleEntryTop: 0,
                parentScrollTop: 0
            }, this.refresh()
        }
        static get Default() {
            return ti
        }
        static get DefaultType() {
            return ii
        }
        static get NAME() {
            return "scrollspy"
        }
        refresh() {
            this._initializeTargetsAndObservables(), this._maybeEnableSmoothScroll(), this._observer ? this._observer.disconnect() : this._observer = this._getNewObserver();
            for (const e of this._observableSections.values()) this._observer.observe(e)
        }
        dispose() {
            this._observer.disconnect(), super.dispose()
        }
        _configAfterMerge(e) {
            return e.target = l(e.target) || document.body, e.rootMargin = e.offset ? e.offset + "px 0px -30%" : e.rootMargin, "string" == typeof e.threshold && (e.threshold = e.threshold.split(",").map(e => Number.parseFloat(e))), e
        }
        _maybeEnableSmoothScroll() {
            this._config.smoothScroll && (D.off(this._config.target, Ut), D.on(this._config.target, Ut, Zt, e => {
                const t = this._observableSections.get(e.target.hash);
                if (t) {
                    e.preventDefault();
                    const i = this._rootElement || window,
                        s = t.offsetTop - this._element.offsetTop;
                    if (i.scrollTo) return void i.scrollTo({
                        top: s,
                        behavior: "smooth"
                    });
                    i.scrollTop = s
                }
            }))
        }
        _getNewObserver() {
            const e = {
                root: this._rootElement,
                threshold: this._config.threshold,
                rootMargin: this._config.rootMargin
            };
            return new IntersectionObserver(e => this._observerCallback(e), e)
        }
        _observerCallback(e) {
            const t = e => this._targetLinks.get("#" + e.target.id),
                i = e => {
                    this._previousScrollData.visibleEntryTop = e.target.offsetTop, this._process(t(e))
                },
                s = (this._rootElement || document.documentElement).scrollTop,
                n = s >= this._previousScrollData.parentScrollTop;
            this._previousScrollData.parentScrollTop = s;
            for (const r of e) {
                if (!r.isIntersecting) {
                    this._activeTarget = null, this._clearActiveClass(t(r));
                    continue
                }
                const e = r.target.offsetTop >= this._previousScrollData.visibleEntryTop;
                if (n && e) {
                    if (i(r), !s) return
                } else n || e || i(r)
            }
        }
        _initializeTargetsAndObservables() {
            this._targetLinks = new Map, this._observableSections = new Map;
            const e = X.find(Zt, this._config.target);
            for (const t of e) {
                if (!t.hash || c(t)) continue;
                const e = X.findOne(decodeURI(t.hash), this._element);
                d(e) && (this._targetLinks.set(decodeURI(t.hash), t), this._observableSections.set(t.hash, e))
            }
        }
        _process(e) {
            this._activeTarget !== e && (this._clearActiveClass(this._config.target), this._activeTarget = e, e.classList.add(Kt), this._activateParents(e), D.trigger(this._element, "activate.bs.scrollspy", {
                relatedTarget: e
            }))
        }
        _activateParents(e) {
            if (e.classList.contains("dropdown-item")) X.findOne(".dropdown-toggle", e.closest(".dropdown")).classList.add(Kt);
            else
                for (const t of X.parents(e, ".nav, .list-group"))
                    for (const e of X.prev(t, ei)) e.classList.add(Kt)
        }
        _clearActiveClass(e) {
            e.classList.remove(Kt);
            const t = X.find(`${Zt}.${Kt}`, e);
            for (const e of t) e.classList.remove(Kt)
        }
        static jQueryInterface(e) {
            return this.each((function() {
                const t = si.getOrCreateInstance(this, e);
                if ("string" == typeof e) {
                    if (void 0 === t[e] || e.startsWith("_") || "constructor" === e) throw new TypeError(`No method named "${e}"`);
                    t[e]()
                }
            }))
        }
    }
    D.on(window, Qt, () => {
        for (const e of X.find('[data-bs-spy="scroll"]')) si.getOrCreateInstance(e)
    }), v(si);
    const ni = "ArrowLeft",
        ri = "ArrowRight",
        ai = "ArrowUp",
        oi = "ArrowDown",
        li = "Home",
        di = "End",
        ci = "active",
        ui = "show",
        hi = ".dropdown-toggle",
        pi = `:not(${hi})`,
        fi = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
        mi = `.nav-link${pi}, .list-group-item${pi}, [role="tab"]${pi}, ${fi}`,
        gi = `.${ci}[data-bs-toggle="tab"], .${ci}[data-bs-toggle="pill"], .${ci}[data-bs-toggle="list"]`;
    class vi extends W {
        constructor(e) {
            super(e), this._parent = this._element.closest('.list-group, .nav, [role="tablist"]'), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), D.on(this._element, "keydown.bs.tab", e => this._keydown(e)))
        }
        static get NAME() {
            return "tab"
        }
        show() {
            const e = this._element;
            if (this._elemIsActive(e)) return;
            const t = this._getActiveElem(),
                i = t ? D.trigger(t, "hide.bs.tab", {
                    relatedTarget: e
                }) : null;
            D.trigger(e, "show.bs.tab", {
                relatedTarget: t
            }).defaultPrevented || i && i.defaultPrevented || (this._deactivate(t, e), this._activate(e, t))
        }
        _activate(e, t) {
            e && (e.classList.add(ci), this._activate(X.getElementFromSelector(e)), this._queueCallback(() => {
                "tab" === e.getAttribute("role") ? (e.removeAttribute("tabindex"), e.setAttribute("aria-selected", !0), this._toggleDropDown(e, !0), D.trigger(e, "shown.bs.tab", {
                    relatedTarget: t
                })) : e.classList.add(ui)
            }, e, e.classList.contains("fade")))
        }
        _deactivate(e, t) {
            e && (e.classList.remove(ci), e.blur(), this._deactivate(X.getElementFromSelector(e)), this._queueCallback(() => {
                "tab" === e.getAttribute("role") ? (e.setAttribute("aria-selected", !1), e.setAttribute("tabindex", "-1"), this._toggleDropDown(e, !1), D.trigger(e, "hidden.bs.tab", {
                    relatedTarget: t
                })) : e.classList.remove(ui)
            }, e, e.classList.contains("fade")))
        }
        _keydown(e) {
            if (![ni, ri, ai, oi, li, di].includes(e.key)) return;
            e.stopPropagation(), e.preventDefault();
            const t = this._getChildren().filter(e => !c(e));
            let i;
            if ([li, di].includes(e.key)) i = t[e.key === li ? 0 : t.length - 1];
            else {
                const s = [ri, oi].includes(e.key);
                i = w(t, e.target, s, !0)
            }
            i && (i.focus({
                preventScroll: !0
            }), vi.getOrCreateInstance(i).show())
        }
        _getChildren() {
            return X.find(mi, this._parent)
        }
        _getActiveElem() {
            return this._getChildren().find(e => this._elemIsActive(e)) || null
        }
        _setInitialAttributes(e, t) {
            this._setAttributeIfNotExists(e, "role", "tablist");
            for (const e of t) this._setInitialAttributesOnChild(e)
        }
        _setInitialAttributesOnChild(e) {
            e = this._getInnerElement(e);
            const t = this._elemIsActive(e),
                i = this._getOuterElement(e);
            e.setAttribute("aria-selected", t), i !== e && this._setAttributeIfNotExists(i, "role", "presentation"), t || e.setAttribute("tabindex", "-1"), this._setAttributeIfNotExists(e, "role", "tab"), this._setInitialAttributesOnTargetPanel(e)
        }
        _setInitialAttributesOnTargetPanel(e) {
            const t = X.getElementFromSelector(e);
            t && (this._setAttributeIfNotExists(t, "role", "tabpanel"), e.id && this._setAttributeIfNotExists(t, "aria-labelledby", "" + e.id))
        }
        _toggleDropDown(e, t) {
            const i = this._getOuterElement(e);
            if (!i.classList.contains("dropdown")) return;
            const s = (e, s) => {
                const n = X.findOne(e, i);
                n && n.classList.toggle(s, t)
            };
            s(hi, ci), s(".dropdown-menu", ui), i.setAttribute("aria-expanded", t)
        }
        _setAttributeIfNotExists(e, t, i) {
            e.hasAttribute(t) || e.setAttribute(t, i)
        }
        _elemIsActive(e) {
            return e.classList.contains(ci)
        }
        _getInnerElement(e) {
            return e.matches(mi) ? e : X.findOne(mi, e)
        }
        _getOuterElement(e) {
            return e.closest(".nav-item, .list-group-item") || e
        }
        static jQueryInterface(e) {
            return this.each((function() {
                const t = vi.getOrCreateInstance(this);
                if ("string" == typeof e) {
                    if (void 0 === t[e] || e.startsWith("_") || "constructor" === e) throw new TypeError(`No method named "${e}"`);
                    t[e]()
                }
            }))
        }
    }
    D.on(document, "click.bs.tab", fi, (function(e) {
        ["A", "AREA"].includes(this.tagName) && e.preventDefault(), c(this) || vi.getOrCreateInstance(this).show()
    })), D.on(window, "load.bs.tab", () => {
        for (const e of X.find(gi)) vi.getOrCreateInstance(e)
    }), v(vi);
    const yi = "show",
        bi = "showing",
        wi = {
            animation: "boolean",
            autohide: "boolean",
            delay: "number"
        },
        xi = {
            animation: !0,
            autohide: !0,
            delay: 5e3
        };
    class _i extends W {
        constructor(e, t) {
            super(e, t), this._timeout = null, this._hasMouseInteraction = !1, this._hasKeyboardInteraction = !1, this._setListeners()
        }
        static get Default() {
            return xi
        }
        static get DefaultType() {
            return wi
        }
        static get NAME() {
            return "toast"
        }
        show() {
            D.trigger(this._element, "show.bs.toast").defaultPrevented || (this._clearTimeout(), this._config.animation && this._element.classList.add("fade"), this._element.classList.remove("hide"), p(this._element), this._element.classList.add(yi, bi), this._queueCallback(() => {
                this._element.classList.remove(bi), D.trigger(this._element, "shown.bs.toast"), this._maybeScheduleHide()
            }, this._element, this._config.animation))
        }
        hide() {
            this.isShown() && (D.trigger(this._element, "hide.bs.toast").defaultPrevented || (this._element.classList.add(bi), this._queueCallback(() => {
                this._element.classList.add("hide"), this._element.classList.remove(bi, yi), D.trigger(this._element, "hidden.bs.toast")
            }, this._element, this._config.animation)))
        }
        dispose() {
            this._clearTimeout(), this.isShown() && this._element.classList.remove(yi), super.dispose()
        }
        isShown() {
            return this._element.classList.contains(yi)
        }
        _maybeScheduleHide() {
            this._config.autohide && (this._hasMouseInteraction || this._hasKeyboardInteraction || (this._timeout = setTimeout(() => {
                this.hide()
            }, this._config.delay)))
        }
        _onInteraction(e, t) {
            switch (e.type) {
                case "mouseover":
                case "mouseout":
                    this._hasMouseInteraction = t;
                    break;
                case "focusin":
                case "focusout":
                    this._hasKeyboardInteraction = t
            }
            if (t) return void this._clearTimeout();
            const i = e.relatedTarget;
            this._element === i || this._element.contains(i) || this._maybeScheduleHide()
        }
        _setListeners() {
            D.on(this._element, "mouseover.bs.toast", e => this._onInteraction(e, !0)), D.on(this._element, "mouseout.bs.toast", e => this._onInteraction(e, !1)), D.on(this._element, "focusin.bs.toast", e => this._onInteraction(e, !0)), D.on(this._element, "focusout.bs.toast", e => this._onInteraction(e, !1))
        }
        _clearTimeout() {
            clearTimeout(this._timeout), this._timeout = null
        }
        static jQueryInterface(e) {
            return this.each((function() {
                const t = _i.getOrCreateInstance(this, e);
                if ("string" == typeof e) {
                    if (void 0 === t[e]) throw new TypeError(`No method named "${e}"`);
                    t[e](this)
                }
            }))
        }
    }
    return R(_i), v(_i), {
        Alert: F,
        Button: V,
        Carousel: me,
        Collapse: Ce,
        Dropdown: Re,
        Modal: mt,
        Offcanvas: St,
        Popover: Gt,
        ScrollSpy: si,
        Tab: vi,
        Toast: _i,
        Tooltip: Xt
    }
})),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).Swiper = t()
}(this, (function() {
    "use strict";

    function e(e) {
        return null !== e && "object" == typeof e && "constructor" in e && e.constructor === Object
    }

    function t(i, s) {
        void 0 === i && (i = {}), void 0 === s && (s = {}), Object.keys(s).forEach(n => {
            void 0 === i[n] ? i[n] = s[n] : e(s[n]) && e(i[n]) && Object.keys(s[n]).length > 0 && t(i[n], s[n])
        })
    }
    const i = {
        body: {},
        addEventListener() {},
        removeEventListener() {},
        activeElement: {
            blur() {},
            nodeName: ""
        },
        querySelector: () => null,
        querySelectorAll: () => [],
        getElementById: () => null,
        createEvent: () => ({
            initEvent() {}
        }),
        createElement: () => ({
            children: [],
            childNodes: [],
            style: {},
            setAttribute() {},
            getElementsByTagName: () => []
        }),
        createElementNS: () => ({}),
        importNode: () => null,
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        }
    };

    function s() {
        const e = "undefined" != typeof document ? document : {};
        return t(e, i), e
    }
    const n = {
        document: i,
        navigator: {
            userAgent: ""
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        },
        history: {
            replaceState() {},
            pushState() {},
            go() {},
            back() {}
        },
        CustomEvent: function() {
            return this
        },
        addEventListener() {},
        removeEventListener() {},
        getComputedStyle: () => ({
            getPropertyValue: () => ""
        }),
        Image() {},
        Date() {},
        screen: {},
        setTimeout() {},
        clearTimeout() {},
        matchMedia: () => ({}),
        requestAnimationFrame: e => "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
        cancelAnimationFrame(e) {
            "undefined" != typeof setTimeout && clearTimeout(e)
        }
    };

    function r() {
        const e = "undefined" != typeof window ? window : {};
        return t(e, n), e
    }
    class a extends Array {
        constructor(e) {
            "number" == typeof e ? super(e) : (super(...e || []), function(e) {
                const t = e.__proto__;
                Object.defineProperty(e, "__proto__", {
                    get: () => t,
                    set(e) {
                        t.__proto__ = e
                    }
                })
            }(this))
        }
    }

    function o(e) {
        void 0 === e && (e = []);
        const t = [];
        return e.forEach(e => {
            Array.isArray(e) ? t.push(...o(e)) : t.push(e)
        }), t
    }

    function l(e, t) {
        return Array.prototype.filter.call(e, t)
    }

    function d(e, t) {
        const i = r(),
            n = s();
        let o = [];
        if (!t && e instanceof a) return e;
        if (!e) return new a(o);
        if ("string" == typeof e) {
            const i = e.trim();
            if (i.indexOf("<") >= 0 && i.indexOf(">") >= 0) {
                let e = "div";
                0 === i.indexOf("<li") && (e = "ul"), 0 === i.indexOf("<tr") && (e = "tbody"), 0 !== i.indexOf("<td") && 0 !== i.indexOf("<th") || (e = "tr"), 0 === i.indexOf("<tbody") && (e = "table"), 0 === i.indexOf("<option") && (e = "select");
                const t = n.createElement(e);
                t.innerHTML = i;
                for (let e = 0; e < t.childNodes.length; e += 1) o.push(t.childNodes[e])
            } else o = function(e, t) {
                if ("string" != typeof e) return [e];
                const i = [],
                    s = t.querySelectorAll(e);
                for (let e = 0; e < s.length; e += 1) i.push(s[e]);
                return i
            }(e.trim(), t || n)
        } else if (e.nodeType || e === i || e === n) o.push(e);
        else if (Array.isArray(e)) {
            if (e instanceof a) return e;
            o = e
        }
        return new a(function(e) {
            const t = [];
            for (let i = 0; i < e.length; i += 1) - 1 === t.indexOf(e[i]) && t.push(e[i]);
            return t
        }(o))
    }
    d.fn = a.prototype;
    const c = {
        addClass: function() {
            for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
            const s = o(t.map(e => e.split(" ")));
            return this.forEach(e => {
                e.classList.add(...s)
            }), this
        },
        removeClass: function() {
            for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
            const s = o(t.map(e => e.split(" ")));
            return this.forEach(e => {
                e.classList.remove(...s)
            }), this
        },
        hasClass: function() {
            for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
            const s = o(t.map(e => e.split(" ")));
            return l(this, e => s.filter(t => e.classList.contains(t)).length > 0).length > 0
        },
        toggleClass: function() {
            for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
            const s = o(t.map(e => e.split(" ")));
            this.forEach(e => {
                s.forEach(t => {
                    e.classList.toggle(t)
                })
            })
        },
        attr: function(e, t) {
            if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
            for (let i = 0; i < this.length; i += 1)
                if (2 === arguments.length) this[i].setAttribute(e, t);
                else
                    for (const t in e) this[i][t] = e[t], this[i].setAttribute(t, e[t]);
            return this
        },
        removeAttr: function(e) {
            for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
            return this
        },
        transform: function(e) {
            for (let t = 0; t < this.length; t += 1) this[t].style.transform = e;
            return this
        },
        transition: function(e) {
            for (let t = 0; t < this.length; t += 1) this[t].style.transitionDuration = "string" != typeof e ? e + "ms" : e;
            return this
        },
        on: function() {
            for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
            let [s, n, r, a] = t;

            function o(e) {
                const t = e.target;
                if (!t) return;
                const i = e.target.dom7EventData || [];
                if (i.indexOf(e) < 0 && i.unshift(e), d(t).is(n)) r.apply(t, i);
                else {
                    const e = d(t).parents();
                    for (let t = 0; t < e.length; t += 1) d(e[t]).is(n) && r.apply(e[t], i)
                }
            }

            function l(e) {
                const t = e && e.target && e.target.dom7EventData || [];
                t.indexOf(e) < 0 && t.unshift(e), r.apply(this, t)
            }
            "function" == typeof t[1] && ([s, r, a] = t, n = void 0), a || (a = !1);
            const c = s.split(" ");
            let u;
            for (let e = 0; e < this.length; e += 1) {
                const t = this[e];
                if (n)
                    for (u = 0; u < c.length; u += 1) {
                        const e = c[u];
                        t.dom7LiveListeners || (t.dom7LiveListeners = {}), t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []), t.dom7LiveListeners[e].push({
                            listener: r,
                            proxyListener: o
                        }), t.addEventListener(e, o, a)
                    } else
                        for (u = 0; u < c.length; u += 1) {
                            const e = c[u];
                            t.dom7Listeners || (t.dom7Listeners = {}), t.dom7Listeners[e] || (t.dom7Listeners[e] = []), t.dom7Listeners[e].push({
                                listener: r,
                                proxyListener: l
                            }), t.addEventListener(e, l, a)
                        }
            }
            return this
        },
        off: function() {
            for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
            let [s, n, r, a] = t;
            "function" == typeof t[1] && ([s, r, a] = t, n = void 0), a || (a = !1);
            const o = s.split(" ");
            for (let e = 0; e < o.length; e += 1) {
                const t = o[e];
                for (let e = 0; e < this.length; e += 1) {
                    const i = this[e];
                    let s;
                    if (!n && i.dom7Listeners ? s = i.dom7Listeners[t] : n && i.dom7LiveListeners && (s = i.dom7LiveListeners[t]), s && s.length)
                        for (let e = s.length - 1; e >= 0; e -= 1) {
                            const n = s[e];
                            r && n.listener === r || r && n.listener && n.listener.dom7proxy && n.listener.dom7proxy === r ? (i.removeEventListener(t, n.proxyListener, a), s.splice(e, 1)) : r || (i.removeEventListener(t, n.proxyListener, a), s.splice(e, 1))
                        }
                }
            }
            return this
        },
        trigger: function() {
            const e = r();
            for (var t = arguments.length, i = new Array(t), s = 0; s < t; s++) i[s] = arguments[s];
            const n = i[0].split(" "),
                a = i[1];
            for (let t = 0; t < n.length; t += 1) {
                const s = n[t];
                for (let t = 0; t < this.length; t += 1) {
                    const n = this[t];
                    if (e.CustomEvent) {
                        const t = new e.CustomEvent(s, {
                            detail: a,
                            bubbles: !0,
                            cancelable: !0
                        });
                        n.dom7EventData = i.filter((e, t) => t > 0), n.dispatchEvent(t), n.dom7EventData = [], delete n.dom7EventData
                    }
                }
            }
            return this
        },
        transitionEnd: function(e) {
            const t = this;
            return e && t.on("transitionend", (function i(s) {
                s.target === this && (e.call(this, s), t.off("transitionend", i))
            })), this
        },
        outerWidth: function(e) {
            if (this.length > 0) {
                if (e) {
                    const e = this.styles();
                    return this[0].offsetWidth + parseFloat(e.getPropertyValue("margin-right")) + parseFloat(e.getPropertyValue("margin-left"))
                }
                return this[0].offsetWidth
            }
            return null
        },
        outerHeight: function(e) {
            if (this.length > 0) {
                if (e) {
                    const e = this.styles();
                    return this[0].offsetHeight + parseFloat(e.getPropertyValue("margin-top")) + parseFloat(e.getPropertyValue("margin-bottom"))
                }
                return this[0].offsetHeight
            }
            return null
        },
        styles: function() {
            const e = r();
            return this[0] ? e.getComputedStyle(this[0], null) : {}
        },
        offset: function() {
            if (this.length > 0) {
                const e = r(),
                    t = s(),
                    i = this[0],
                    n = i.getBoundingClientRect(),
                    a = t.body,
                    o = i.clientTop || a.clientTop || 0,
                    l = i.clientLeft || a.clientLeft || 0,
                    d = i === e ? e.scrollY : i.scrollTop,
                    c = i === e ? e.scrollX : i.scrollLeft;
                return {
                    top: n.top + d - o,
                    left: n.left + c - l
                }
            }
            return null
        },
        css: function(e, t) {
            const i = r();
            let s;
            if (1 === arguments.length) {
                if ("string" != typeof e) {
                    for (s = 0; s < this.length; s += 1)
                        for (const t in e) this[s].style[t] = e[t];
                    return this
                }
                if (this[0]) return i.getComputedStyle(this[0], null).getPropertyValue(e)
            }
            if (2 === arguments.length && "string" == typeof e) {
                for (s = 0; s < this.length; s += 1) this[s].style[e] = t;
                return this
            }
            return this
        },
        each: function(e) {
            return e ? (this.forEach((t, i) => {
                e.apply(t, [t, i])
            }), this) : this
        },
        html: function(e) {
            if (void 0 === e) return this[0] ? this[0].innerHTML : null;
            for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
            return this
        },
        text: function(e) {
            if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
            for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
            return this
        },
        is: function(e) {
            const t = r(),
                i = s(),
                n = this[0];
            let o, l;
            if (!n || void 0 === e) return !1;
            if ("string" == typeof e) {
                if (n.matches) return n.matches(e);
                if (n.webkitMatchesSelector) return n.webkitMatchesSelector(e);
                if (n.msMatchesSelector) return n.msMatchesSelector(e);
                for (o = d(e), l = 0; l < o.length; l += 1)
                    if (o[l] === n) return !0;
                return !1
            }
            if (e === i) return n === i;
            if (e === t) return n === t;
            if (e.nodeType || e instanceof a) {
                for (o = e.nodeType ? [e] : e, l = 0; l < o.length; l += 1)
                    if (o[l] === n) return !0;
                return !1
            }
            return !1
        },
        index: function() {
            let e, t = this[0];
            if (t) {
                for (e = 0; null !== (t = t.previousSibling);) 1 === t.nodeType && (e += 1);
                return e
            }
        },
        eq: function(e) {
            if (void 0 === e) return this;
            const t = this.length;
            if (e > t - 1) return d([]);
            if (e < 0) {
                const i = t + e;
                return d(i < 0 ? [] : [this[i]])
            }
            return d([this[e]])
        },
        append: function() {
            let e;
            const t = s();
            for (let i = 0; i < arguments.length; i += 1) {
                e = i < 0 || arguments.length <= i ? void 0 : arguments[i];
                for (let i = 0; i < this.length; i += 1)
                    if ("string" == typeof e) {
                        const s = t.createElement("div");
                        for (s.innerHTML = e; s.firstChild;) this[i].appendChild(s.firstChild)
                    } else if (e instanceof a)
                    for (let t = 0; t < e.length; t += 1) this[i].appendChild(e[t]);
                else this[i].appendChild(e)
            }
            return this
        },
        prepend: function(e) {
            const t = s();
            let i, n;
            for (i = 0; i < this.length; i += 1)
                if ("string" == typeof e) {
                    const s = t.createElement("div");
                    for (s.innerHTML = e, n = s.childNodes.length - 1; n >= 0; n -= 1) this[i].insertBefore(s.childNodes[n], this[i].childNodes[0])
                } else if (e instanceof a)
                for (n = 0; n < e.length; n += 1) this[i].insertBefore(e[n], this[i].childNodes[0]);
            else this[i].insertBefore(e, this[i].childNodes[0]);
            return this
        },
        next: function(e) {
            return this.length > 0 ? e ? this[0].nextElementSibling && d(this[0].nextElementSibling).is(e) ? d([this[0].nextElementSibling]) : d([]) : this[0].nextElementSibling ? d([this[0].nextElementSibling]) : d([]) : d([])
        },
        nextAll: function(e) {
            const t = [];
            let i = this[0];
            if (!i) return d([]);
            for (; i.nextElementSibling;) {
                const s = i.nextElementSibling;
                e ? d(s).is(e) && t.push(s) : t.push(s), i = s
            }
            return d(t)
        },
        prev: function(e) {
            if (this.length > 0) {
                const t = this[0];
                return e ? t.previousElementSibling && d(t.previousElementSibling).is(e) ? d([t.previousElementSibling]) : d([]) : t.previousElementSibling ? d([t.previousElementSibling]) : d([])
            }
            return d([])
        },
        prevAll: function(e) {
            const t = [];
            let i = this[0];
            if (!i) return d([]);
            for (; i.previousElementSibling;) {
                const s = i.previousElementSibling;
                e ? d(s).is(e) && t.push(s) : t.push(s), i = s
            }
            return d(t)
        },
        parent: function(e) {
            const t = [];
            for (let i = 0; i < this.length; i += 1) null !== this[i].parentNode && (e ? d(this[i].parentNode).is(e) && t.push(this[i].parentNode) : t.push(this[i].parentNode));
            return d(t)
        },
        parents: function(e) {
            const t = [];
            for (let i = 0; i < this.length; i += 1) {
                let s = this[i].parentNode;
                for (; s;) e ? d(s).is(e) && t.push(s) : t.push(s), s = s.parentNode
            }
            return d(t)
        },
        closest: function(e) {
            let t = this;
            return void 0 === e ? d([]) : (t.is(e) || (t = t.parents(e).eq(0)), t)
        },
        find: function(e) {
            const t = [];
            for (let i = 0; i < this.length; i += 1) {
                const s = this[i].querySelectorAll(e);
                for (let e = 0; e < s.length; e += 1) t.push(s[e])
            }
            return d(t)
        },
        children: function(e) {
            const t = [];
            for (let i = 0; i < this.length; i += 1) {
                const s = this[i].children;
                for (let i = 0; i < s.length; i += 1) e && !d(s[i]).is(e) || t.push(s[i])
            }
            return d(t)
        },
        filter: function(e) {
            return d(l(this, e))
        },
        remove: function() {
            for (let e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
            return this
        }
    };

    function u(e, t) {
        return void 0 === t && (t = 0), setTimeout(e, t)
    }

    function h() {
        return Date.now()
    }

    function p(e, t) {
        void 0 === t && (t = "x");
        const i = r();
        let s, n, a;
        const o = function(e) {
            const t = r();
            let i;
            return t.getComputedStyle && (i = t.getComputedStyle(e, null)), !i && e.currentStyle && (i = e.currentStyle), i || (i = e.style), i
        }(e);
        return i.WebKitCSSMatrix ? (n = o.transform || o.webkitTransform, n.split(",").length > 6 && (n = n.split(", ").map(e => e.replace(",", ".")).join(", ")), a = new i.WebKitCSSMatrix("none" === n ? "" : n)) : (a = o.MozTransform || o.OTransform || o.MsTransform || o.msTransform || o.transform || o.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), s = a.toString().split(",")), "x" === t && (n = i.WebKitCSSMatrix ? a.m41 : 16 === s.length ? parseFloat(s[12]) : parseFloat(s[4])), "y" === t && (n = i.WebKitCSSMatrix ? a.m42 : 16 === s.length ? parseFloat(s[13]) : parseFloat(s[5])), n || 0
    }

    function f(e) {
        return "object" == typeof e && null !== e && e.constructor && "Object" === Object.prototype.toString.call(e).slice(8, -1)
    }

    function m(e) {
        return "undefined" != typeof window && void 0 !== window.HTMLElement ? e instanceof HTMLElement : e && (1 === e.nodeType || 11 === e.nodeType)
    }

    function g() {
        const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
            t = ["__proto__", "constructor", "prototype"];
        for (let i = 1; i < arguments.length; i += 1) {
            const s = i < 0 || arguments.length <= i ? void 0 : arguments[i];
            if (null != s && !m(s)) {
                const i = Object.keys(Object(s)).filter(e => t.indexOf(e) < 0);
                for (let t = 0, n = i.length; t < n; t += 1) {
                    const n = i[t],
                        r = Object.getOwnPropertyDescriptor(s, n);
                    void 0 !== r && r.enumerable && (f(e[n]) && f(s[n]) ? s[n].__swiper__ ? e[n] = s[n] : g(e[n], s[n]) : !f(e[n]) && f(s[n]) ? (e[n] = {}, s[n].__swiper__ ? e[n] = s[n] : g(e[n], s[n])) : e[n] = s[n])
                }
            }
        }
        return e
    }

    function v(e, t, i) {
        e.style.setProperty(t, i)
    }

    function y(e) {
        let {
            swiper: t,
            targetPosition: i,
            side: s
        } = e;
        const n = r(),
            a = -t.translate;
        let o, l = null;
        const d = t.params.speed;
        t.wrapperEl.style.scrollSnapType = "none", n.cancelAnimationFrame(t.cssModeFrameID);
        const c = i > a ? "next" : "prev",
            u = (e, t) => "next" === c && e >= t || "prev" === c && e <= t,
            h = () => {
                o = (new Date).getTime(), null === l && (l = o);
                const e = Math.max(Math.min((o - l) / d, 1), 0),
                    r = .5 - Math.cos(e * Math.PI) / 2;
                let c = a + r * (i - a);
                if (u(c, i) && (c = i), t.wrapperEl.scrollTo({
                        [s]: c
                    }), u(c, i)) return t.wrapperEl.style.overflow = "hidden", t.wrapperEl.style.scrollSnapType = "", setTimeout(() => {
                    t.wrapperEl.style.overflow = "", t.wrapperEl.scrollTo({
                        [s]: c
                    })
                }), void n.cancelAnimationFrame(t.cssModeFrameID);
                t.cssModeFrameID = n.requestAnimationFrame(h)
            };
        h()
    }
    let b, w, x;

    function _() {
        return b || (b = function() {
            const e = r(),
                t = s();
            return {
                smoothScroll: t.documentElement && "scrollBehavior" in t.documentElement.style,
                touch: !!("ontouchstart" in e || e.DocumentTouch && t instanceof e.DocumentTouch),
                passiveListener: function() {
                    let t = !1;
                    try {
                        const i = Object.defineProperty({}, "passive", {
                            get() {
                                t = !0
                            }
                        });
                        e.addEventListener("testPassiveListener", null, i)
                    } catch (e) {}
                    return t
                }(),
                gestures: "ongesturestart" in e
            }
        }()), b
    }

    function E(e) {
        return void 0 === e && (e = {}), w || (w = function(e) {
            let {
                userAgent: t
            } = void 0 === e ? {} : e;
            const i = _(),
                s = r(),
                n = s.navigator.platform,
                a = t || s.navigator.userAgent,
                o = {
                    ios: !1,
                    android: !1
                },
                l = s.screen.width,
                d = s.screen.height,
                c = a.match(/(Android);?[\s\/]+([\d.]+)?/);
            let u = a.match(/(iPad).*OS\s([\d_]+)/);
            const h = a.match(/(iPod)(.*OS\s([\d_]+))?/),
                p = !u && a.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
                f = "Win32" === n;
            let m = "MacIntel" === n;
            return !u && m && i.touch && ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"].indexOf(`${l}x${d}`) >= 0 && (u = a.match(/(Version)\/([\d.]+)/), u || (u = [0, 1, "13_0_0"]), m = !1), c && !f && (o.os = "android", o.android = !0), (u || p || h) && (o.os = "ios", o.ios = !0), o
        }(e)), w
    }

    function T() {
        return x || (x = function() {
            const e = r();
            return {
                isSafari: function() {
                    const t = e.navigator.userAgent.toLowerCase();
                    return t.indexOf("safari") >= 0 && t.indexOf("chrome") < 0 && t.indexOf("android") < 0
                }(),
                isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent)
            }
        }()), x
    }

    function C(e) {
        let {
            swiper: t,
            runCallbacks: i,
            direction: s,
            step: n
        } = e;
        const {
            activeIndex: r,
            previousIndex: a
        } = t;
        let o = s;
        if (o || (o = r > a ? "next" : r < a ? "prev" : "reset"), t.emit("transition" + n), i && r !== a) {
            if ("reset" === o) return void t.emit("slideResetTransition" + n);
            t.emit("slideChangeTransition" + n), "next" === o ? t.emit("slideNextTransition" + n) : t.emit("slidePrevTransition" + n)
        }
    }

    function S(e) {
        const t = this,
            i = s(),
            n = r(),
            a = t.touchEventsData,
            {
                params: o,
                touches: l,
                enabled: c
            } = t;
        if (!c) return;
        if (t.animating && o.preventInteractionOnTransition) return;
        !t.animating && o.cssMode && o.loop && t.loopFix();
        let u = e;
        u.originalEvent && (u = u.originalEvent);
        let p = d(u.target);
        if ("wrapper" === o.touchEventsTarget && !p.closest(t.wrapperEl).length) return;
        if (a.isTouchEvent = "touchstart" === u.type, !a.isTouchEvent && "which" in u && 3 === u.which) return;
        if (!a.isTouchEvent && "button" in u && u.button > 0) return;
        if (a.isTouched && a.isMoved) return;
        const f = !!o.noSwipingClass && "" !== o.noSwipingClass,
            m = e.composedPath ? e.composedPath() : e.path;
        f && u.target && u.target.shadowRoot && m && (p = d(m[0]));
        const g = o.noSwipingSelector ? o.noSwipingSelector : "." + o.noSwipingClass,
            v = !(!u.target || !u.target.shadowRoot);
        if (o.noSwiping && (v ? function(e, t) {
                return void 0 === t && (t = this),
                    function t(i) {
                        if (!i || i === s() || i === r()) return null;
                        i.assignedSlot && (i = i.assignedSlot);
                        const n = i.closest(e);
                        return n || i.getRootNode ? n || t(i.getRootNode().host) : null
                    }(t)
            }(g, p[0]) : p.closest(g)[0])) return void(t.allowClick = !0);
        if (o.swipeHandler && !p.closest(o.swipeHandler)[0]) return;
        l.currentX = "touchstart" === u.type ? u.targetTouches[0].pageX : u.pageX, l.currentY = "touchstart" === u.type ? u.targetTouches[0].pageY : u.pageY;
        const y = l.currentX,
            b = l.currentY,
            w = o.edgeSwipeDetection || o.iOSEdgeSwipeDetection,
            x = o.edgeSwipeThreshold || o.iOSEdgeSwipeThreshold;
        if (w && (y <= x || y >= n.innerWidth - x)) {
            if ("prevent" !== w) return;
            e.preventDefault()
        }
        if (Object.assign(a, {
                isTouched: !0,
                isMoved: !1,
                allowTouchCallbacks: !0,
                isScrolling: void 0,
                startMoving: void 0
            }), l.startX = y, l.startY = b, a.touchStartTime = h(), t.allowClick = !0, t.updateSize(), t.swipeDirection = void 0, o.threshold > 0 && (a.allowThresholdMove = !1), "touchstart" !== u.type) {
            let e = !0;
            p.is(a.focusableElements) && (e = !1, "SELECT" === p[0].nodeName && (a.isTouched = !1)), i.activeElement && d(i.activeElement).is(a.focusableElements) && i.activeElement !== p[0] && i.activeElement.blur();
            const s = e && t.allowTouchMove && o.touchStartPreventDefault;
            !o.touchStartForcePreventDefault && !s || p[0].isContentEditable || u.preventDefault()
        }
        t.params.freeMode && t.params.freeMode.enabled && t.freeMode && t.animating && !o.cssMode && t.freeMode.onTouchStart(), t.emit("touchStart", u)
    }

    function M(e) {
        const t = s(),
            i = this,
            n = i.touchEventsData,
            {
                params: r,
                touches: a,
                rtlTranslate: o,
                enabled: l
            } = i;
        if (!l) return;
        let c = e;
        if (c.originalEvent && (c = c.originalEvent), !n.isTouched) return void(n.startMoving && n.isScrolling && i.emit("touchMoveOpposite", c));
        if (n.isTouchEvent && "touchmove" !== c.type) return;
        const u = "touchmove" === c.type && c.targetTouches && (c.targetTouches[0] || c.changedTouches[0]),
            p = "touchmove" === c.type ? u.pageX : c.pageX,
            f = "touchmove" === c.type ? u.pageY : c.pageY;
        if (c.preventedByNestedSwiper) return a.startX = p, void(a.startY = f);
        if (!i.allowTouchMove) return d(c.target).is(n.focusableElements) || (i.allowClick = !1), void(n.isTouched && (Object.assign(a, {
            startX: p,
            startY: f,
            currentX: p,
            currentY: f
        }), n.touchStartTime = h()));
        if (n.isTouchEvent && r.touchReleaseOnEdges && !r.loop)
            if (i.isVertical()) {
                if (f < a.startY && i.translate <= i.maxTranslate() || f > a.startY && i.translate >= i.minTranslate()) return n.isTouched = !1, void(n.isMoved = !1)
            } else if (p < a.startX && i.translate <= i.maxTranslate() || p > a.startX && i.translate >= i.minTranslate()) return;
        if (n.isTouchEvent && t.activeElement && c.target === t.activeElement && d(c.target).is(n.focusableElements)) return n.isMoved = !0, void(i.allowClick = !1);
        if (n.allowTouchCallbacks && i.emit("touchMove", c), c.targetTouches && c.targetTouches.length > 1) return;
        a.currentX = p, a.currentY = f;
        const m = a.currentX - a.startX,
            g = a.currentY - a.startY;
        if (i.params.threshold && Math.sqrt(m ** 2 + g ** 2) < i.params.threshold) return;
        if (void 0 === n.isScrolling) {
            let e;
            i.isHorizontal() && a.currentY === a.startY || i.isVertical() && a.currentX === a.startX ? n.isScrolling = !1 : m * m + g * g >= 25 && (e = 180 * Math.atan2(Math.abs(g), Math.abs(m)) / Math.PI, n.isScrolling = i.isHorizontal() ? e > r.touchAngle : 90 - e > r.touchAngle)
        }
        if (n.isScrolling && i.emit("touchMoveOpposite", c), void 0 === n.startMoving && (a.currentX === a.startX && a.currentY === a.startY || (n.startMoving = !0)), n.isScrolling) return void(n.isTouched = !1);
        if (!n.startMoving) return;
        i.allowClick = !1, !r.cssMode && c.cancelable && c.preventDefault(), r.touchMoveStopPropagation && !r.nested && c.stopPropagation(), n.isMoved || (r.loop && !r.cssMode && i.loopFix(), n.startTranslate = i.getTranslate(), i.setTransition(0), i.animating && i.$wrapperEl.trigger("webkitTransitionEnd transitionend"), n.allowMomentumBounce = !1, !r.grabCursor || !0 !== i.allowSlideNext && !0 !== i.allowSlidePrev || i.setGrabCursor(!0), i.emit("sliderFirstMove", c)), i.emit("sliderMove", c), n.isMoved = !0;
        let v = i.isHorizontal() ? m : g;
        a.diff = v, v *= r.touchRatio, o && (v = -v), i.swipeDirection = v > 0 ? "prev" : "next", n.currentTranslate = v + n.startTranslate;
        let y = !0,
            b = r.resistanceRatio;
        if (r.touchReleaseOnEdges && (b = 0), v > 0 && n.currentTranslate > i.minTranslate() ? (y = !1, r.resistance && (n.currentTranslate = i.minTranslate() - 1 + (-i.minTranslate() + n.startTranslate + v) ** b)) : v < 0 && n.currentTranslate < i.maxTranslate() && (y = !1, r.resistance && (n.currentTranslate = i.maxTranslate() + 1 - (i.maxTranslate() - n.startTranslate - v) ** b)), y && (c.preventedByNestedSwiper = !0), !i.allowSlideNext && "next" === i.swipeDirection && n.currentTranslate < n.startTranslate && (n.currentTranslate = n.startTranslate), !i.allowSlidePrev && "prev" === i.swipeDirection && n.currentTranslate > n.startTranslate && (n.currentTranslate = n.startTranslate), i.allowSlidePrev || i.allowSlideNext || (n.currentTranslate = n.startTranslate), r.threshold > 0) {
            if (!(Math.abs(v) > r.threshold || n.allowThresholdMove)) return void(n.currentTranslate = n.startTranslate);
            if (!n.allowThresholdMove) return n.allowThresholdMove = !0, a.startX = a.currentX, a.startY = a.currentY, n.currentTranslate = n.startTranslate, void(a.diff = i.isHorizontal() ? a.currentX - a.startX : a.currentY - a.startY)
        }
        r.followFinger && !r.cssMode && ((r.freeMode && r.freeMode.enabled && i.freeMode || r.watchSlidesProgress) && (i.updateActiveIndex(), i.updateSlidesClasses()), i.params.freeMode && r.freeMode.enabled && i.freeMode && i.freeMode.onTouchMove(), i.updateProgress(n.currentTranslate), i.setTranslate(n.currentTranslate))
    }

    function k(e) {
        const t = this,
            i = t.touchEventsData,
            {
                params: s,
                touches: n,
                rtlTranslate: r,
                slidesGrid: a,
                enabled: o
            } = t;
        if (!o) return;
        let l = e;
        if (l.originalEvent && (l = l.originalEvent), i.allowTouchCallbacks && t.emit("touchEnd", l), i.allowTouchCallbacks = !1, !i.isTouched) return i.isMoved && s.grabCursor && t.setGrabCursor(!1), i.isMoved = !1, void(i.startMoving = !1);
        s.grabCursor && i.isMoved && i.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
        const d = h(),
            c = d - i.touchStartTime;
        if (t.allowClick) {
            const e = l.path || l.composedPath && l.composedPath();
            t.updateClickedSlide(e && e[0] || l.target), t.emit("tap click", l), c < 300 && d - i.lastClickTime < 300 && t.emit("doubleTap doubleClick", l)
        }
        if (i.lastClickTime = h(), u(() => {
                t.destroyed || (t.allowClick = !0)
            }), !i.isTouched || !i.isMoved || !t.swipeDirection || 0 === n.diff || i.currentTranslate === i.startTranslate) return i.isTouched = !1, i.isMoved = !1, void(i.startMoving = !1);
        let p;
        if (i.isTouched = !1, i.isMoved = !1, i.startMoving = !1, p = s.followFinger ? r ? t.translate : -t.translate : -i.currentTranslate, s.cssMode) return;
        if (t.params.freeMode && s.freeMode.enabled) return void t.freeMode.onTouchEnd({
            currentPos: p
        });
        let f = 0,
            m = t.slidesSizesGrid[0];
        for (let e = 0; e < a.length; e += e < s.slidesPerGroupSkip ? 1 : s.slidesPerGroup) {
            const t = e < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
            void 0 !== a[e + t] ? p >= a[e] && p < a[e + t] && (f = e, m = a[e + t] - a[e]) : p >= a[e] && (f = e, m = a[a.length - 1] - a[a.length - 2])
        }
        let g = null,
            v = null;
        s.rewind && (t.isBeginning ? v = t.params.virtual && t.params.virtual.enabled && t.virtual ? t.virtual.slides.length - 1 : t.slides.length - 1 : t.isEnd && (g = 0));
        const y = (p - a[f]) / m,
            b = f < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
        if (c > s.longSwipesMs) {
            if (!s.longSwipes) return void t.slideTo(t.activeIndex);
            "next" === t.swipeDirection && (y >= s.longSwipesRatio ? t.slideTo(s.rewind && t.isEnd ? g : f + b) : t.slideTo(f)), "prev" === t.swipeDirection && (y > 1 - s.longSwipesRatio ? t.slideTo(f + b) : null !== v && y < 0 && Math.abs(y) > s.longSwipesRatio ? t.slideTo(v) : t.slideTo(f))
        } else {
            if (!s.shortSwipes) return void t.slideTo(t.activeIndex);
            !t.navigation || l.target !== t.navigation.nextEl && l.target !== t.navigation.prevEl ? ("next" === t.swipeDirection && t.slideTo(null !== g ? g : f + b), "prev" === t.swipeDirection && t.slideTo(null !== v ? v : f)) : l.target === t.navigation.nextEl ? t.slideTo(f + b) : t.slideTo(f)
        }
    }

    function A() {
        const e = this,
            {
                params: t,
                el: i
            } = e;
        if (i && 0 === i.offsetWidth) return;
        t.breakpoints && e.setBreakpoint();
        const {
            allowSlideNext: s,
            allowSlidePrev: n,
            snapGrid: r
        } = e;
        e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), e.updateSlidesClasses(), ("auto" === t.slidesPerView || t.slidesPerView > 1) && e.isEnd && !e.isBeginning && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0), e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(), e.allowSlidePrev = n, e.allowSlideNext = s, e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow()
    }

    function P(e) {
        const t = this;
        t.enabled && (t.allowClick || (t.params.preventClicks && e.preventDefault(), t.params.preventClicksPropagation && t.animating && (e.stopPropagation(), e.stopImmediatePropagation())))
    }

    function O() {
        const e = this,
            {
                wrapperEl: t,
                rtlTranslate: i,
                enabled: s
            } = e;
        if (!s) return;
        let n;
        e.previousTranslate = e.translate, e.isHorizontal() ? e.translate = -t.scrollLeft : e.translate = -t.scrollTop, 0 === e.translate && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses();
        const r = e.maxTranslate() - e.minTranslate();
        n = 0 === r ? 0 : (e.translate - e.minTranslate()) / r, n !== e.progress && e.updateProgress(i ? -e.translate : e.translate), e.emit("setTranslate", e.translate, !1)
    }
    Object.keys(c).forEach(e => {
        Object.defineProperty(d.fn, e, {
            value: c[e],
            writable: !0
        })
    });
    let L = !1;

    function $() {}
    const I = (e, t) => {
        const i = s(),
            {
                params: n,
                touchEvents: r,
                el: a,
                wrapperEl: o,
                device: l,
                support: d
            } = e,
            c = !!n.nested,
            u = "on" === t ? "addEventListener" : "removeEventListener",
            h = t;
        if (d.touch) {
            const t = !("touchstart" !== r.start || !d.passiveListener || !n.passiveListeners) && {
                passive: !0,
                capture: !1
            };
            a[u](r.start, e.onTouchStart, t), a[u](r.move, e.onTouchMove, d.passiveListener ? {
                passive: !1,
                capture: c
            } : c), a[u](r.end, e.onTouchEnd, t), r.cancel && a[u](r.cancel, e.onTouchEnd, t)
        } else a[u](r.start, e.onTouchStart, !1), i[u](r.move, e.onTouchMove, c), i[u](r.end, e.onTouchEnd, !1);
        (n.preventClicks || n.preventClicksPropagation) && a[u]("click", e.onClick, !0), n.cssMode && o[u]("scroll", e.onScroll), n.updateOnWindowResize ? e[h](l.ios || l.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", A, !0) : e[h]("observerUpdate", A, !0)
    };
    const z = (e, t) => e.grid && t.grid && t.grid.rows > 1;
    var D = {
        init: !0,
        direction: "horizontal",
        touchEventsTarget: "wrapper",
        initialSlide: 0,
        speed: 300,
        cssMode: !1,
        updateOnWindowResize: !0,
        resizeObserver: !0,
        nested: !1,
        createElements: !1,
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
        longSwipesRatio: .5,
        longSwipesMs: 300,
        followFinger: !0,
        allowTouchMove: !0,
        threshold: 0,
        touchMoveStopPropagation: !1,
        touchStartPreventDefault: !0,
        touchStartForcePreventDefault: !1,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        resistance: !0,
        resistanceRatio: .85,
        watchSlidesProgress: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        preloadImages: !0,
        updateOnImagesReady: !0,
        loop: !1,
        loopAdditionalSlides: 0,
        loopedSlides: null,
        loopedSlidesLimit: !0,
        loopFillGroupWithBlank: !1,
        loopPreventsSlide: !0,
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
        slideBlankClass: "swiper-slide-invisible-blank",
        slideActiveClass: "swiper-slide-active",
        slideDuplicateActiveClass: "swiper-slide-duplicate-active",
        slideVisibleClass: "swiper-slide-visible",
        slideDuplicateClass: "swiper-slide-duplicate",
        slideNextClass: "swiper-slide-next",
        slideDuplicateNextClass: "swiper-slide-duplicate-next",
        slidePrevClass: "swiper-slide-prev",
        slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
        wrapperClass: "swiper-wrapper",
        runCallbacksOnInit: !0,
        _emitClasses: !1
    };

    function N(e, t) {
        return function(i) {
            void 0 === i && (i = {});
            const s = Object.keys(i)[0],
                n = i[s];
            "object" == typeof n && null !== n ? (["navigation", "pagination", "scrollbar"].indexOf(s) >= 0 && !0 === e[s] && (e[s] = {
                auto: !0
            }), s in e && "enabled" in n ? (!0 === e[s] && (e[s] = {
                enabled: !0
            }), "object" != typeof e[s] || "enabled" in e[s] || (e[s].enabled = !0), e[s] || (e[s] = {
                enabled: !1
            }), g(t, i)) : g(t, i)) : g(t, i)
        }
    }
    const B = {
            eventsEmitter: {
                on(e, t, i) {
                    const s = this;
                    if (!s.eventsListeners || s.destroyed) return s;
                    if ("function" != typeof t) return s;
                    const n = i ? "unshift" : "push";
                    return e.split(" ").forEach(e => {
                        s.eventsListeners[e] || (s.eventsListeners[e] = []), s.eventsListeners[e][n](t)
                    }), s
                },
                once(e, t, i) {
                    const s = this;
                    if (!s.eventsListeners || s.destroyed) return s;
                    if ("function" != typeof t) return s;

                    function n() {
                        s.off(e, n), n.__emitterProxy && delete n.__emitterProxy;
                        for (var i = arguments.length, r = new Array(i), a = 0; a < i; a++) r[a] = arguments[a];
                        t.apply(s, r)
                    }
                    return n.__emitterProxy = t, s.on(e, n, i)
                },
                onAny(e, t) {
                    const i = this;
                    if (!i.eventsListeners || i.destroyed) return i;
                    if ("function" != typeof e) return i;
                    const s = t ? "unshift" : "push";
                    return i.eventsAnyListeners.indexOf(e) < 0 && i.eventsAnyListeners[s](e), i
                },
                offAny(e) {
                    const t = this;
                    if (!t.eventsListeners || t.destroyed) return t;
                    if (!t.eventsAnyListeners) return t;
                    const i = t.eventsAnyListeners.indexOf(e);
                    return i >= 0 && t.eventsAnyListeners.splice(i, 1), t
                },
                off(e, t) {
                    const i = this;
                    return !i.eventsListeners || i.destroyed ? i : i.eventsListeners ? (e.split(" ").forEach(e => {
                        void 0 === t ? i.eventsListeners[e] = [] : i.eventsListeners[e] && i.eventsListeners[e].forEach((s, n) => {
                            (s === t || s.__emitterProxy && s.__emitterProxy === t) && i.eventsListeners[e].splice(n, 1)
                        })
                    }), i) : i
                },
                emit() {
                    const e = this;
                    if (!e.eventsListeners || e.destroyed) return e;
                    if (!e.eventsListeners) return e;
                    let t, i, s;
                    for (var n = arguments.length, r = new Array(n), a = 0; a < n; a++) r[a] = arguments[a];
                    return "string" == typeof r[0] || Array.isArray(r[0]) ? (t = r[0], i = r.slice(1, r.length), s = e) : (t = r[0].events, i = r[0].data, s = r[0].context || e), i.unshift(s), (Array.isArray(t) ? t : t.split(" ")).forEach(t => {
                        e.eventsAnyListeners && e.eventsAnyListeners.length && e.eventsAnyListeners.forEach(e => {
                            e.apply(s, [t, ...i])
                        }), e.eventsListeners && e.eventsListeners[t] && e.eventsListeners[t].forEach(e => {
                            e.apply(s, i)
                        })
                    }), e
                }
            },
            update: {
                updateSize: function() {
                    const e = this;
                    let t, i;
                    const s = e.$el;
                    t = void 0 !== e.params.width && null !== e.params.width ? e.params.width : s[0].clientWidth, i = void 0 !== e.params.height && null !== e.params.height ? e.params.height : s[0].clientHeight, 0 === t && e.isHorizontal() || 0 === i && e.isVertical() || (t = t - parseInt(s.css("padding-left") || 0, 10) - parseInt(s.css("padding-right") || 0, 10), i = i - parseInt(s.css("padding-top") || 0, 10) - parseInt(s.css("padding-bottom") || 0, 10), Number.isNaN(t) && (t = 0), Number.isNaN(i) && (i = 0), Object.assign(e, {
                        width: t,
                        height: i,
                        size: e.isHorizontal() ? t : i
                    }))
                },
                updateSlides: function() {
                    const e = this;

                    function t(t) {
                        return e.isHorizontal() ? t : {
                            width: "height",
                            "margin-top": "margin-left",
                            "margin-bottom ": "margin-right",
                            "margin-left": "margin-top",
                            "margin-right": "margin-bottom",
                            "padding-left": "padding-top",
                            "padding-right": "padding-bottom",
                            marginRight: "marginBottom"
                        }[t]
                    }

                    function i(e, i) {
                        return parseFloat(e.getPropertyValue(t(i)) || 0)
                    }
                    const s = e.params,
                        {
                            $wrapperEl: n,
                            size: r,
                            rtlTranslate: a,
                            wrongRTL: o
                        } = e,
                        l = e.virtual && s.virtual.enabled,
                        d = l ? e.virtual.slides.length : e.slides.length,
                        c = n.children("." + e.params.slideClass),
                        u = l ? e.virtual.slides.length : c.length;
                    let h = [];
                    const p = [],
                        f = [];
                    let m = s.slidesOffsetBefore;
                    "function" == typeof m && (m = s.slidesOffsetBefore.call(e));
                    let g = s.slidesOffsetAfter;
                    "function" == typeof g && (g = s.slidesOffsetAfter.call(e));
                    const y = e.snapGrid.length,
                        b = e.slidesGrid.length;
                    let w = s.spaceBetween,
                        x = -m,
                        _ = 0,
                        E = 0;
                    if (void 0 === r) return;
                    "string" == typeof w && w.indexOf("%") >= 0 && (w = parseFloat(w.replace("%", "")) / 100 * r), e.virtualSize = -w, a ? c.css({
                        marginLeft: "",
                        marginBottom: "",
                        marginTop: ""
                    }) : c.css({
                        marginRight: "",
                        marginBottom: "",
                        marginTop: ""
                    }), s.centeredSlides && s.cssMode && (v(e.wrapperEl, "--swiper-centered-offset-before", ""), v(e.wrapperEl, "--swiper-centered-offset-after", ""));
                    const T = s.grid && s.grid.rows > 1 && e.grid;
                    let C;
                    T && e.grid.initSlides(u);
                    const S = "auto" === s.slidesPerView && s.breakpoints && Object.keys(s.breakpoints).filter(e => void 0 !== s.breakpoints[e].slidesPerView).length > 0;
                    for (let n = 0; n < u; n += 1) {
                        C = 0;
                        const a = c.eq(n);
                        if (T && e.grid.updateSlide(n, a, u, t), "none" !== a.css("display")) {
                            if ("auto" === s.slidesPerView) {
                                S && (c[n].style[t("width")] = "");
                                const r = getComputedStyle(a[0]),
                                    o = a[0].style.transform,
                                    l = a[0].style.webkitTransform;
                                if (o && (a[0].style.transform = "none"), l && (a[0].style.webkitTransform = "none"), s.roundLengths) C = e.isHorizontal() ? a.outerWidth(!0) : a.outerHeight(!0);
                                else {
                                    const e = i(r, "width"),
                                        t = i(r, "padding-left"),
                                        s = i(r, "padding-right"),
                                        n = i(r, "margin-left"),
                                        o = i(r, "margin-right"),
                                        l = r.getPropertyValue("box-sizing");
                                    if (l && "border-box" === l) C = e + n + o;
                                    else {
                                        const {
                                            clientWidth: i,
                                            offsetWidth: r
                                        } = a[0];
                                        C = e + t + s + n + o + (r - i)
                                    }
                                }
                                o && (a[0].style.transform = o), l && (a[0].style.webkitTransform = l), s.roundLengths && (C = Math.floor(C))
                            } else C = (r - (s.slidesPerView - 1) * w) / s.slidesPerView, s.roundLengths && (C = Math.floor(C)), c[n] && (c[n].style[t("width")] = C + "px");
                            c[n] && (c[n].swiperSlideSize = C), f.push(C), s.centeredSlides ? (x = x + C / 2 + _ / 2 + w, 0 === _ && 0 !== n && (x = x - r / 2 - w), 0 === n && (x = x - r / 2 - w), Math.abs(x) < .001 && (x = 0), s.roundLengths && (x = Math.floor(x)), E % s.slidesPerGroup == 0 && h.push(x), p.push(x)) : (s.roundLengths && (x = Math.floor(x)), (E - Math.min(e.params.slidesPerGroupSkip, E)) % e.params.slidesPerGroup == 0 && h.push(x), p.push(x), x = x + C + w), e.virtualSize += C + w, _ = C, E += 1
                        }
                    }
                    if (e.virtualSize = Math.max(e.virtualSize, r) + g, a && o && ("slide" === s.effect || "coverflow" === s.effect) && n.css({
                            width: e.virtualSize + s.spaceBetween + "px"
                        }), s.setWrapperSize && n.css({
                            [t("width")]: e.virtualSize + s.spaceBetween + "px"
                        }), T && e.grid.updateWrapperSize(C, h, t), !s.centeredSlides) {
                        const t = [];
                        for (let i = 0; i < h.length; i += 1) {
                            let n = h[i];
                            s.roundLengths && (n = Math.floor(n)), h[i] <= e.virtualSize - r && t.push(n)
                        }
                        h = t, Math.floor(e.virtualSize - r) - Math.floor(h[h.length - 1]) > 1 && h.push(e.virtualSize - r)
                    }
                    if (0 === h.length && (h = [0]), 0 !== s.spaceBetween) {
                        const i = e.isHorizontal() && a ? "marginLeft" : t("marginRight");
                        c.filter((e, t) => !s.cssMode || t !== c.length - 1).css({
                            [i]: w + "px"
                        })
                    }
                    if (s.centeredSlides && s.centeredSlidesBounds) {
                        let e = 0;
                        f.forEach(t => {
                            e += t + (s.spaceBetween ? s.spaceBetween : 0)
                        }), e -= s.spaceBetween;
                        const t = e - r;
                        h = h.map(e => e < 0 ? -m : e > t ? t + g : e)
                    }
                    if (s.centerInsufficientSlides) {
                        let e = 0;
                        if (f.forEach(t => {
                                e += t + (s.spaceBetween ? s.spaceBetween : 0)
                            }), e -= s.spaceBetween, e < r) {
                            const t = (r - e) / 2;
                            h.forEach((e, i) => {
                                h[i] = e - t
                            }), p.forEach((e, i) => {
                                p[i] = e + t
                            })
                        }
                    }
                    if (Object.assign(e, {
                            slides: c,
                            snapGrid: h,
                            slidesGrid: p,
                            slidesSizesGrid: f
                        }), s.centeredSlides && s.cssMode && !s.centeredSlidesBounds) {
                        v(e.wrapperEl, "--swiper-centered-offset-before", -h[0] + "px"), v(e.wrapperEl, "--swiper-centered-offset-after", e.size / 2 - f[f.length - 1] / 2 + "px");
                        const t = -e.snapGrid[0],
                            i = -e.slidesGrid[0];
                        e.snapGrid = e.snapGrid.map(e => e + t), e.slidesGrid = e.slidesGrid.map(e => e + i)
                    }
                    if (u !== d && e.emit("slidesLengthChange"), h.length !== y && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), p.length !== b && e.emit("slidesGridLengthChange"), s.watchSlidesProgress && e.updateSlidesOffset(), !(l || s.cssMode || "slide" !== s.effect && "fade" !== s.effect)) {
                        const t = s.containerModifierClass + "backface-hidden",
                            i = e.$el.hasClass(t);
                        u <= s.maxBackfaceHiddenSlides ? i || e.$el.addClass(t) : i && e.$el.removeClass(t)
                    }
                },
                updateAutoHeight: function(e) {
                    const t = this,
                        i = [],
                        s = t.virtual && t.params.virtual.enabled;
                    let n, r = 0;
                    "number" == typeof e ? t.setTransition(e) : !0 === e && t.setTransition(t.params.speed);
                    const a = e => s ? t.slides.filter(t => parseInt(t.getAttribute("data-swiper-slide-index"), 10) === e)[0] : t.slides.eq(e)[0];
                    if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
                        if (t.params.centeredSlides)(t.visibleSlides || d([])).each(e => {
                            i.push(e)
                        });
                        else
                            for (n = 0; n < Math.ceil(t.params.slidesPerView); n += 1) {
                                const e = t.activeIndex + n;
                                if (e > t.slides.length && !s) break;
                                i.push(a(e))
                            } else i.push(a(t.activeIndex));
                    for (n = 0; n < i.length; n += 1)
                        if (void 0 !== i[n]) {
                            const e = i[n].offsetHeight;
                            r = e > r ? e : r
                        }(r || 0 === r) && t.$wrapperEl.css("height", r + "px")
                },
                updateSlidesOffset: function() {
                    const e = this,
                        t = e.slides;
                    for (let i = 0; i < t.length; i += 1) t[i].swiperSlideOffset = e.isHorizontal() ? t[i].offsetLeft : t[i].offsetTop
                },
                updateSlidesProgress: function(e) {
                    void 0 === e && (e = this && this.translate || 0);
                    const t = this,
                        i = t.params,
                        {
                            slides: s,
                            rtlTranslate: n,
                            snapGrid: r
                        } = t;
                    if (0 === s.length) return;
                    void 0 === s[0].swiperSlideOffset && t.updateSlidesOffset();
                    let a = -e;
                    n && (a = e), s.removeClass(i.slideVisibleClass), t.visibleSlidesIndexes = [], t.visibleSlides = [];
                    for (let e = 0; e < s.length; e += 1) {
                        const o = s[e];
                        let l = o.swiperSlideOffset;
                        i.cssMode && i.centeredSlides && (l -= s[0].swiperSlideOffset);
                        const d = (a + (i.centeredSlides ? t.minTranslate() : 0) - l) / (o.swiperSlideSize + i.spaceBetween),
                            c = (a - r[0] + (i.centeredSlides ? t.minTranslate() : 0) - l) / (o.swiperSlideSize + i.spaceBetween),
                            u = -(a - l),
                            h = u + t.slidesSizesGrid[e];
                        (u >= 0 && u < t.size - 1 || h > 1 && h <= t.size || u <= 0 && h >= t.size) && (t.visibleSlides.push(o), t.visibleSlidesIndexes.push(e), s.eq(e).addClass(i.slideVisibleClass)), o.progress = n ? -d : d, o.originalProgress = n ? -c : c
                    }
                    t.visibleSlides = d(t.visibleSlides)
                },
                updateProgress: function(e) {
                    const t = this;
                    if (void 0 === e) {
                        const i = t.rtlTranslate ? -1 : 1;
                        e = t && t.translate && t.translate * i || 0
                    }
                    const i = t.params,
                        s = t.maxTranslate() - t.minTranslate();
                    let {
                        progress: n,
                        isBeginning: r,
                        isEnd: a
                    } = t;
                    const o = r,
                        l = a;
                    0 === s ? (n = 0, r = !0, a = !0) : (n = (e - t.minTranslate()) / s, r = n <= 0, a = n >= 1), Object.assign(t, {
                        progress: n,
                        isBeginning: r,
                        isEnd: a
                    }), (i.watchSlidesProgress || i.centeredSlides && i.autoHeight) && t.updateSlidesProgress(e), r && !o && t.emit("reachBeginning toEdge"), a && !l && t.emit("reachEnd toEdge"), (o && !r || l && !a) && t.emit("fromEdge"), t.emit("progress", n)
                },
                updateSlidesClasses: function() {
                    const e = this,
                        {
                            slides: t,
                            params: i,
                            $wrapperEl: s,
                            activeIndex: n,
                            realIndex: r
                        } = e,
                        a = e.virtual && i.virtual.enabled;
                    let o;
                    t.removeClass(`${i.slideActiveClass} ${i.slideNextClass} ${i.slidePrevClass} ${i.slideDuplicateActiveClass} ${i.slideDuplicateNextClass} ${i.slideDuplicatePrevClass}`), o = a ? e.$wrapperEl.find(`.${i.slideClass}[data-swiper-slide-index="${n}"]`) : t.eq(n), o.addClass(i.slideActiveClass), i.loop && (o.hasClass(i.slideDuplicateClass) ? s.children(`.${i.slideClass}:not(.${i.slideDuplicateClass})[data-swiper-slide-index="${r}"]`).addClass(i.slideDuplicateActiveClass) : s.children(`.${i.slideClass}.${i.slideDuplicateClass}[data-swiper-slide-index="${r}"]`).addClass(i.slideDuplicateActiveClass));
                    let l = o.nextAll("." + i.slideClass).eq(0).addClass(i.slideNextClass);
                    i.loop && 0 === l.length && (l = t.eq(0), l.addClass(i.slideNextClass));
                    let d = o.prevAll("." + i.slideClass).eq(0).addClass(i.slidePrevClass);
                    i.loop && 0 === d.length && (d = t.eq(-1), d.addClass(i.slidePrevClass)), i.loop && (l.hasClass(i.slideDuplicateClass) ? s.children(`.${i.slideClass}:not(.${i.slideDuplicateClass})[data-swiper-slide-index="${l.attr("data-swiper-slide-index")}"]`).addClass(i.slideDuplicateNextClass) : s.children(`.${i.slideClass}.${i.slideDuplicateClass}[data-swiper-slide-index="${l.attr("data-swiper-slide-index")}"]`).addClass(i.slideDuplicateNextClass), d.hasClass(i.slideDuplicateClass) ? s.children(`.${i.slideClass}:not(.${i.slideDuplicateClass})[data-swiper-slide-index="${d.attr("data-swiper-slide-index")}"]`).addClass(i.slideDuplicatePrevClass) : s.children(`.${i.slideClass}.${i.slideDuplicateClass}[data-swiper-slide-index="${d.attr("data-swiper-slide-index")}"]`).addClass(i.slideDuplicatePrevClass)), e.emitSlidesClasses()
                },
                updateActiveIndex: function(e) {
                    const t = this,
                        i = t.rtlTranslate ? t.translate : -t.translate,
                        {
                            slidesGrid: s,
                            snapGrid: n,
                            params: r,
                            activeIndex: a,
                            realIndex: o,
                            snapIndex: l
                        } = t;
                    let d, c = e;
                    if (void 0 === c) {
                        for (let e = 0; e < s.length; e += 1) void 0 !== s[e + 1] ? i >= s[e] && i < s[e + 1] - (s[e + 1] - s[e]) / 2 ? c = e : i >= s[e] && i < s[e + 1] && (c = e + 1) : i >= s[e] && (c = e);
                        r.normalizeSlideIndex && (c < 0 || void 0 === c) && (c = 0)
                    }
                    if (n.indexOf(i) >= 0) d = n.indexOf(i);
                    else {
                        const e = Math.min(r.slidesPerGroupSkip, c);
                        d = e + Math.floor((c - e) / r.slidesPerGroup)
                    }
                    if (d >= n.length && (d = n.length - 1), c === a) return void(d !== l && (t.snapIndex = d, t.emit("snapIndexChange")));
                    const u = parseInt(t.slides.eq(c).attr("data-swiper-slide-index") || c, 10);
                    Object.assign(t, {
                        snapIndex: d,
                        realIndex: u,
                        previousIndex: a,
                        activeIndex: c
                    }), t.emit("activeIndexChange"), t.emit("snapIndexChange"), o !== u && t.emit("realIndexChange"), (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange")
                },
                updateClickedSlide: function(e) {
                    const t = this,
                        i = t.params,
                        s = d(e).closest("." + i.slideClass)[0];
                    let n, r = !1;
                    if (s)
                        for (let e = 0; e < t.slides.length; e += 1)
                            if (t.slides[e] === s) {
                                r = !0, n = e;
                                break
                            }
                    if (!s || !r) return t.clickedSlide = void 0, void(t.clickedIndex = void 0);
                    t.clickedSlide = s, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(d(s).attr("data-swiper-slide-index"), 10) : t.clickedIndex = n, i.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide()
                }
            },
            translate: {
                getTranslate: function(e) {
                    void 0 === e && (e = this.isHorizontal() ? "x" : "y");
                    const {
                        params: t,
                        rtlTranslate: i,
                        translate: s,
                        $wrapperEl: n
                    } = this;
                    if (t.virtualTranslate) return i ? -s : s;
                    if (t.cssMode) return s;
                    let r = p(n[0], e);
                    return i && (r = -r), r || 0
                },
                setTranslate: function(e, t) {
                    const i = this,
                        {
                            rtlTranslate: s,
                            params: n,
                            $wrapperEl: r,
                            wrapperEl: a,
                            progress: o
                        } = i;
                    let l, d = 0,
                        c = 0;
                    i.isHorizontal() ? d = s ? -e : e : c = e, n.roundLengths && (d = Math.floor(d), c = Math.floor(c)), n.cssMode ? a[i.isHorizontal() ? "scrollLeft" : "scrollTop"] = i.isHorizontal() ? -d : -c : n.virtualTranslate || r.transform(`translate3d(${d}px, ${c}px, 0px)`), i.previousTranslate = i.translate, i.translate = i.isHorizontal() ? d : c;
                    const u = i.maxTranslate() - i.minTranslate();
                    l = 0 === u ? 0 : (e - i.minTranslate()) / u, l !== o && i.updateProgress(e), i.emit("setTranslate", i.translate, t)
                },
                minTranslate: function() {
                    return -this.snapGrid[0]
                },
                maxTranslate: function() {
                    return -this.snapGrid[this.snapGrid.length - 1]
                },
                translateTo: function(e, t, i, s, n) {
                    void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0), void 0 === s && (s = !0);
                    const r = this,
                        {
                            params: a,
                            wrapperEl: o
                        } = r;
                    if (r.animating && a.preventInteractionOnTransition) return !1;
                    const l = r.minTranslate(),
                        d = r.maxTranslate();
                    let c;
                    if (c = s && e > l ? l : s && e < d ? d : e, r.updateProgress(c), a.cssMode) {
                        const e = r.isHorizontal();
                        if (0 === t) o[e ? "scrollLeft" : "scrollTop"] = -c;
                        else {
                            if (!r.support.smoothScroll) return y({
                                swiper: r,
                                targetPosition: -c,
                                side: e ? "left" : "top"
                            }), !0;
                            o.scrollTo({
                                [e ? "left" : "top"]: -c,
                                behavior: "smooth"
                            })
                        }
                        return !0
                    }
                    return 0 === t ? (r.setTransition(0), r.setTranslate(c), i && (r.emit("beforeTransitionStart", t, n), r.emit("transitionEnd"))) : (r.setTransition(t), r.setTranslate(c), i && (r.emit("beforeTransitionStart", t, n), r.emit("transitionStart")), r.animating || (r.animating = !0, r.onTranslateToWrapperTransitionEnd || (r.onTranslateToWrapperTransitionEnd = function(e) {
                        r && !r.destroyed && e.target === this && (r.$wrapperEl[0].removeEventListener("transitionend", r.onTranslateToWrapperTransitionEnd), r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onTranslateToWrapperTransitionEnd), r.onTranslateToWrapperTransitionEnd = null, delete r.onTranslateToWrapperTransitionEnd, i && r.emit("transitionEnd"))
                    }), r.$wrapperEl[0].addEventListener("transitionend", r.onTranslateToWrapperTransitionEnd), r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onTranslateToWrapperTransitionEnd))), !0
                }
            },
            transition: {
                setTransition: function(e, t) {
                    const i = this;
                    i.params.cssMode || i.$wrapperEl.transition(e), i.emit("setTransition", e, t)
                },
                transitionStart: function(e, t) {
                    void 0 === e && (e = !0);
                    const i = this,
                        {
                            params: s
                        } = i;
                    s.cssMode || (s.autoHeight && i.updateAutoHeight(), C({
                        swiper: i,
                        runCallbacks: e,
                        direction: t,
                        step: "Start"
                    }))
                },
                transitionEnd: function(e, t) {
                    void 0 === e && (e = !0);
                    const i = this,
                        {
                            params: s
                        } = i;
                    i.animating = !1, s.cssMode || (i.setTransition(0), C({
                        swiper: i,
                        runCallbacks: e,
                        direction: t,
                        step: "End"
                    }))
                }
            },
            slide: {
                slideTo: function(e, t, i, s, n) {
                    if (void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0), "number" != typeof e && "string" != typeof e) throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`);
                    if ("string" == typeof e) {
                        const t = parseInt(e, 10);
                        if (!isFinite(t)) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`);
                        e = t
                    }
                    const r = this;
                    let a = e;
                    a < 0 && (a = 0);
                    const {
                        params: o,
                        snapGrid: l,
                        slidesGrid: d,
                        previousIndex: c,
                        activeIndex: u,
                        rtlTranslate: h,
                        wrapperEl: p,
                        enabled: f
                    } = r;
                    if (r.animating && o.preventInteractionOnTransition || !f && !s && !n) return !1;
                    const m = Math.min(r.params.slidesPerGroupSkip, a);
                    let g = m + Math.floor((a - m) / r.params.slidesPerGroup);
                    g >= l.length && (g = l.length - 1);
                    const v = -l[g];
                    if (o.normalizeSlideIndex)
                        for (let e = 0; e < d.length; e += 1) {
                            const t = -Math.floor(100 * v),
                                i = Math.floor(100 * d[e]),
                                s = Math.floor(100 * d[e + 1]);
                            void 0 !== d[e + 1] ? t >= i && t < s - (s - i) / 2 ? a = e : t >= i && t < s && (a = e + 1) : t >= i && (a = e)
                        }
                    if (r.initialized && a !== u) {
                        if (!r.allowSlideNext && v < r.translate && v < r.minTranslate()) return !1;
                        if (!r.allowSlidePrev && v > r.translate && v > r.maxTranslate() && (u || 0) !== a) return !1
                    }
                    let b;
                    if (a !== (c || 0) && i && r.emit("beforeSlideChangeStart"), r.updateProgress(v), b = a > u ? "next" : a < u ? "prev" : "reset", h && -v === r.translate || !h && v === r.translate) return r.updateActiveIndex(a), o.autoHeight && r.updateAutoHeight(), r.updateSlidesClasses(), "slide" !== o.effect && r.setTranslate(v), "reset" !== b && (r.transitionStart(i, b), r.transitionEnd(i, b)), !1;
                    if (o.cssMode) {
                        const e = r.isHorizontal(),
                            i = h ? v : -v;
                        if (0 === t) {
                            const t = r.virtual && r.params.virtual.enabled;
                            t && (r.wrapperEl.style.scrollSnapType = "none", r._immediateVirtual = !0), p[e ? "scrollLeft" : "scrollTop"] = i, t && requestAnimationFrame(() => {
                                r.wrapperEl.style.scrollSnapType = "", r._swiperImmediateVirtual = !1
                            })
                        } else {
                            if (!r.support.smoothScroll) return y({
                                swiper: r,
                                targetPosition: i,
                                side: e ? "left" : "top"
                            }), !0;
                            p.scrollTo({
                                [e ? "left" : "top"]: i,
                                behavior: "smooth"
                            })
                        }
                        return !0
                    }
                    return r.setTransition(t), r.setTranslate(v), r.updateActiveIndex(a), r.updateSlidesClasses(), r.emit("beforeTransitionStart", t, s), r.transitionStart(i, b), 0 === t ? r.transitionEnd(i, b) : r.animating || (r.animating = !0, r.onSlideToWrapperTransitionEnd || (r.onSlideToWrapperTransitionEnd = function(e) {
                        r && !r.destroyed && e.target === this && (r.$wrapperEl[0].removeEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd), r.onSlideToWrapperTransitionEnd = null, delete r.onSlideToWrapperTransitionEnd, r.transitionEnd(i, b))
                    }), r.$wrapperEl[0].addEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd)), !0
                },
                slideToLoop: function(e, t, i, s) {
                    if (void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0), "string" == typeof e) {
                        const t = parseInt(e, 10);
                        if (!isFinite(t)) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`);
                        e = t
                    }
                    const n = this;
                    let r = e;
                    return n.params.loop && (r += n.loopedSlides), n.slideTo(r, t, i, s)
                },
                slideNext: function(e, t, i) {
                    void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
                    const s = this,
                        {
                            animating: n,
                            enabled: r,
                            params: a
                        } = s;
                    if (!r) return s;
                    let o = a.slidesPerGroup;
                    "auto" === a.slidesPerView && 1 === a.slidesPerGroup && a.slidesPerGroupAuto && (o = Math.max(s.slidesPerViewDynamic("current", !0), 1));
                    const l = s.activeIndex < a.slidesPerGroupSkip ? 1 : o;
                    if (a.loop) {
                        if (n && a.loopPreventsSlide) return !1;
                        s.loopFix(), s._clientLeft = s.$wrapperEl[0].clientLeft
                    }
                    return a.rewind && s.isEnd ? s.slideTo(0, e, t, i) : s.slideTo(s.activeIndex + l, e, t, i)
                },
                slidePrev: function(e, t, i) {
                    void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
                    const s = this,
                        {
                            params: n,
                            animating: r,
                            snapGrid: a,
                            slidesGrid: o,
                            rtlTranslate: l,
                            enabled: d
                        } = s;
                    if (!d) return s;
                    if (n.loop) {
                        if (r && n.loopPreventsSlide) return !1;
                        s.loopFix(), s._clientLeft = s.$wrapperEl[0].clientLeft
                    }

                    function c(e) {
                        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
                    }
                    const u = c(l ? s.translate : -s.translate),
                        h = a.map(e => c(e));
                    let p = a[h.indexOf(u) - 1];
                    if (void 0 === p && n.cssMode) {
                        let e;
                        a.forEach((t, i) => {
                            u >= t && (e = i)
                        }), void 0 !== e && (p = a[e > 0 ? e - 1 : e])
                    }
                    let f = 0;
                    if (void 0 !== p && (f = o.indexOf(p), f < 0 && (f = s.activeIndex - 1), "auto" === n.slidesPerView && 1 === n.slidesPerGroup && n.slidesPerGroupAuto && (f = f - s.slidesPerViewDynamic("previous", !0) + 1, f = Math.max(f, 0))), n.rewind && s.isBeginning) {
                        const n = s.params.virtual && s.params.virtual.enabled && s.virtual ? s.virtual.slides.length - 1 : s.slides.length - 1;
                        return s.slideTo(n, e, t, i)
                    }
                    return s.slideTo(f, e, t, i)
                },
                slideReset: function(e, t, i) {
                    return void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), this.slideTo(this.activeIndex, e, t, i)
                },
                slideToClosest: function(e, t, i, s) {
                    void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), void 0 === s && (s = .5);
                    const n = this;
                    let r = n.activeIndex;
                    const a = Math.min(n.params.slidesPerGroupSkip, r),
                        o = a + Math.floor((r - a) / n.params.slidesPerGroup),
                        l = n.rtlTranslate ? n.translate : -n.translate;
                    if (l >= n.snapGrid[o]) {
                        const e = n.snapGrid[o];
                        l - e > (n.snapGrid[o + 1] - e) * s && (r += n.params.slidesPerGroup)
                    } else {
                        const e = n.snapGrid[o - 1];
                        l - e <= (n.snapGrid[o] - e) * s && (r -= n.params.slidesPerGroup)
                    }
                    return r = Math.max(r, 0), r = Math.min(r, n.slidesGrid.length - 1), n.slideTo(r, e, t, i)
                },
                slideToClickedSlide: function() {
                    const e = this,
                        {
                            params: t,
                            $wrapperEl: i
                        } = e,
                        s = "auto" === t.slidesPerView ? e.slidesPerViewDynamic() : t.slidesPerView;
                    let n, r = e.clickedIndex;
                    if (t.loop) {
                        if (e.animating) return;
                        n = parseInt(d(e.clickedSlide).attr("data-swiper-slide-index"), 10), t.centeredSlides ? r < e.loopedSlides - s / 2 || r > e.slides.length - e.loopedSlides + s / 2 ? (e.loopFix(), r = i.children(`.${t.slideClass}[data-swiper-slide-index="${n}"]:not(.${t.slideDuplicateClass})`).eq(0).index(), u(() => {
                            e.slideTo(r)
                        })) : e.slideTo(r) : r > e.slides.length - s ? (e.loopFix(), r = i.children(`.${t.slideClass}[data-swiper-slide-index="${n}"]:not(.${t.slideDuplicateClass})`).eq(0).index(), u(() => {
                            e.slideTo(r)
                        })) : e.slideTo(r)
                    } else e.slideTo(r)
                }
            },
            loop: {
                loopCreate: function() {
                    const e = this,
                        t = s(),
                        {
                            params: i,
                            $wrapperEl: n
                        } = e,
                        r = n.children().length > 0 ? d(n.children()[0].parentNode) : n;
                    r.children(`.${i.slideClass}.${i.slideDuplicateClass}`).remove();
                    let a = r.children("." + i.slideClass);
                    if (i.loopFillGroupWithBlank) {
                        const e = i.slidesPerGroup - a.length % i.slidesPerGroup;
                        if (e !== i.slidesPerGroup) {
                            for (let s = 0; s < e; s += 1) {
                                const e = d(t.createElement("div")).addClass(`${i.slideClass} ${i.slideBlankClass}`);
                                r.append(e)
                            }
                            a = r.children("." + i.slideClass)
                        }
                    }
                    "auto" !== i.slidesPerView || i.loopedSlides || (i.loopedSlides = a.length), e.loopedSlides = Math.ceil(parseFloat(i.loopedSlides || i.slidesPerView, 10)), e.loopedSlides += i.loopAdditionalSlides, e.loopedSlides > a.length && e.params.loopedSlidesLimit && (e.loopedSlides = a.length);
                    const o = [],
                        l = [];
                    a.each((e, t) => {
                        d(e).attr("data-swiper-slide-index", t)
                    });
                    for (let t = 0; t < e.loopedSlides; t += 1) {
                        const e = t - Math.floor(t / a.length) * a.length;
                        l.push(a.eq(e)[0]), o.unshift(a.eq(a.length - e - 1)[0])
                    }
                    for (let e = 0; e < l.length; e += 1) r.append(d(l[e].cloneNode(!0)).addClass(i.slideDuplicateClass));
                    for (let e = o.length - 1; e >= 0; e -= 1) r.prepend(d(o[e].cloneNode(!0)).addClass(i.slideDuplicateClass))
                },
                loopFix: function() {
                    const e = this;
                    e.emit("beforeLoopFix");
                    const {
                        activeIndex: t,
                        slides: i,
                        loopedSlides: s,
                        allowSlidePrev: n,
                        allowSlideNext: r,
                        snapGrid: a,
                        rtlTranslate: o
                    } = e;
                    let l;
                    e.allowSlidePrev = !0, e.allowSlideNext = !0;
                    const d = -a[t] - e.getTranslate();
                    t < s ? (l = i.length - 3 * s + t, l += s, e.slideTo(l, 0, !1, !0) && 0 !== d && e.setTranslate((o ? -e.translate : e.translate) - d)) : t >= i.length - s && (l = -i.length + t + s, l += s, e.slideTo(l, 0, !1, !0) && 0 !== d && e.setTranslate((o ? -e.translate : e.translate) - d)), e.allowSlidePrev = n, e.allowSlideNext = r, e.emit("loopFix")
                },
                loopDestroy: function() {
                    const {
                        $wrapperEl: e,
                        params: t,
                        slides: i
                    } = this;
                    e.children(`.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`).remove(), i.removeAttr("data-swiper-slide-index")
                }
            },
            grabCursor: {
                setGrabCursor: function(e) {
                    const t = this;
                    if (t.support.touch || !t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode) return;
                    const i = "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
                    i.style.cursor = "move", i.style.cursor = e ? "grabbing" : "grab"
                },
                unsetGrabCursor: function() {
                    const e = this;
                    e.support.touch || e.params.watchOverflow && e.isLocked || e.params.cssMode || (e["container" === e.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "")
                }
            },
            events: {
                attachEvents: function() {
                    const e = this,
                        t = s(),
                        {
                            params: i,
                            support: n
                        } = e;
                    e.onTouchStart = S.bind(e), e.onTouchMove = M.bind(e), e.onTouchEnd = k.bind(e), i.cssMode && (e.onScroll = O.bind(e)), e.onClick = P.bind(e), n.touch && !L && (t.addEventListener("touchstart", $), L = !0), I(e, "on")
                },
                detachEvents: function() {
                    I(this, "off")
                }
            },
            breakpoints: {
                setBreakpoint: function() {
                    const e = this,
                        {
                            activeIndex: t,
                            initialized: i,
                            loopedSlides: s = 0,
                            params: n,
                            $el: r
                        } = e,
                        a = n.breakpoints;
                    if (!a || a && 0 === Object.keys(a).length) return;
                    const o = e.getBreakpoint(a, e.params.breakpointsBase, e.el);
                    if (!o || e.currentBreakpoint === o) return;
                    const l = (o in a ? a[o] : void 0) || e.originalParams,
                        d = z(e, n),
                        c = z(e, l),
                        u = n.enabled;
                    d && !c ? (r.removeClass(`${n.containerModifierClass}grid ${n.containerModifierClass}grid-column`), e.emitContainerClasses()) : !d && c && (r.addClass(n.containerModifierClass + "grid"), (l.grid.fill && "column" === l.grid.fill || !l.grid.fill && "column" === n.grid.fill) && r.addClass(n.containerModifierClass + "grid-column"), e.emitContainerClasses()), ["navigation", "pagination", "scrollbar"].forEach(t => {
                        const i = n[t] && n[t].enabled,
                            s = l[t] && l[t].enabled;
                        i && !s && e[t].disable(), !i && s && e[t].enable()
                    });
                    const h = l.direction && l.direction !== n.direction,
                        p = n.loop && (l.slidesPerView !== n.slidesPerView || h);
                    h && i && e.changeDirection(), g(e.params, l);
                    const f = e.params.enabled;
                    Object.assign(e, {
                        allowTouchMove: e.params.allowTouchMove,
                        allowSlideNext: e.params.allowSlideNext,
                        allowSlidePrev: e.params.allowSlidePrev
                    }), u && !f ? e.disable() : !u && f && e.enable(), e.currentBreakpoint = o, e.emit("_beforeBreakpoint", l), p && i && (e.loopDestroy(), e.loopCreate(), e.updateSlides(), e.slideTo(t - s + e.loopedSlides, 0, !1)), e.emit("breakpoint", l)
                },
                getBreakpoint: function(e, t, i) {
                    if (void 0 === t && (t = "window"), !e || "container" === t && !i) return;
                    let s = !1;
                    const n = r(),
                        a = "window" === t ? n.innerHeight : i.clientHeight,
                        o = Object.keys(e).map(e => {
                            if ("string" == typeof e && 0 === e.indexOf("@")) {
                                const t = parseFloat(e.substr(1));
                                return {
                                    value: a * t,
                                    point: e
                                }
                            }
                            return {
                                value: e,
                                point: e
                            }
                        });
                    o.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
                    for (let e = 0; e < o.length; e += 1) {
                        const {
                            point: r,
                            value: a
                        } = o[e];
                        "window" === t ? n.matchMedia(`(min-width: ${a}px)`).matches && (s = r) : a <= i.clientWidth && (s = r)
                    }
                    return s || "max"
                }
            },
            checkOverflow: {
                checkOverflow: function() {
                    const e = this,
                        {
                            isLocked: t,
                            params: i
                        } = e,
                        {
                            slidesOffsetBefore: s
                        } = i;
                    if (s) {
                        const t = e.slides.length - 1,
                            i = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * s;
                        e.isLocked = e.size > i
                    } else e.isLocked = 1 === e.snapGrid.length;
                    !0 === i.allowSlideNext && (e.allowSlideNext = !e.isLocked), !0 === i.allowSlidePrev && (e.allowSlidePrev = !e.isLocked), t && t !== e.isLocked && (e.isEnd = !1), t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock")
                }
            },
            classes: {
                addClasses: function() {
                    const e = this,
                        {
                            classNames: t,
                            params: i,
                            rtl: s,
                            $el: n,
                            device: r,
                            support: a
                        } = e,
                        o = function(e, t) {
                            const i = [];
                            return e.forEach(e => {
                                "object" == typeof e ? Object.keys(e).forEach(s => {
                                    e[s] && i.push(t + s)
                                }) : "string" == typeof e && i.push(t + e)
                            }), i
                        }(["initialized", i.direction, {
                            "pointer-events": !a.touch
                        }, {
                            "free-mode": e.params.freeMode && i.freeMode.enabled
                        }, {
                            autoheight: i.autoHeight
                        }, {
                            rtl: s
                        }, {
                            grid: i.grid && i.grid.rows > 1
                        }, {
                            "grid-column": i.grid && i.grid.rows > 1 && "column" === i.grid.fill
                        }, {
                            android: r.android
                        }, {
                            ios: r.ios
                        }, {
                            "css-mode": i.cssMode
                        }, {
                            centered: i.cssMode && i.centeredSlides
                        }, {
                            "watch-progress": i.watchSlidesProgress
                        }], i.containerModifierClass);
                    t.push(...o), n.addClass([...t].join(" ")), e.emitContainerClasses()
                },
                removeClasses: function() {
                    const {
                        $el: e,
                        classNames: t
                    } = this;
                    e.removeClass(t.join(" ")), this.emitContainerClasses()
                }
            },
            images: {
                loadImage: function(e, t, i, s, n, a) {
                    const o = r();
                    let l;

                    function c() {
                        a && a()
                    }
                    d(e).parent("picture")[0] || e.complete && n ? c() : t ? (l = new o.Image, l.onload = c, l.onerror = c, s && (l.sizes = s), i && (l.srcset = i), t && (l.src = t)) : c()
                },
                preloadImages: function() {
                    const e = this;

                    function t() {
                        null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady")))
                    }
                    e.imagesToLoad = e.$el.find("img");
                    for (let i = 0; i < e.imagesToLoad.length; i += 1) {
                        const s = e.imagesToLoad[i];
                        e.loadImage(s, s.currentSrc || s.getAttribute("src"), s.srcset || s.getAttribute("srcset"), s.sizes || s.getAttribute("sizes"), !0, t)
                    }
                }
            }
        },
        j = {};
    class H {
        constructor() {
            let e, t;
            for (var i = arguments.length, s = new Array(i), n = 0; n < i; n++) s[n] = arguments[n];
            if (1 === s.length && s[0].constructor && "Object" === Object.prototype.toString.call(s[0]).slice(8, -1) ? t = s[0] : [e, t] = s, t || (t = {}), t = g({}, t), e && !t.el && (t.el = e), t.el && d(t.el).length > 1) {
                const e = [];
                return d(t.el).each(i => {
                    const s = g({}, t, {
                        el: i
                    });
                    e.push(new H(s))
                }), e
            }
            const r = this;
            r.__swiper__ = !0, r.support = _(), r.device = E({
                userAgent: t.userAgent
            }), r.browser = T(), r.eventsListeners = {}, r.eventsAnyListeners = [], r.modules = [...r.__modules__], t.modules && Array.isArray(t.modules) && r.modules.push(...t.modules);
            const a = {};
            r.modules.forEach(e => {
                e({
                    swiper: r,
                    extendParams: N(t, a),
                    on: r.on.bind(r),
                    once: r.once.bind(r),
                    off: r.off.bind(r),
                    emit: r.emit.bind(r)
                })
            });
            const o = g({}, D, a);
            return r.params = g({}, o, j, t), r.originalParams = g({}, r.params), r.passedParams = g({}, t), r.params && r.params.on && Object.keys(r.params.on).forEach(e => {
                r.on(e, r.params.on[e])
            }), r.params && r.params.onAny && r.onAny(r.params.onAny), r.$ = d, Object.assign(r, {
                enabled: r.params.enabled,
                el: e,
                classNames: [],
                slides: d(),
                slidesGrid: [],
                snapGrid: [],
                slidesSizesGrid: [],
                isHorizontal: () => "horizontal" === r.params.direction,
                isVertical: () => "vertical" === r.params.direction,
                activeIndex: 0,
                realIndex: 0,
                isBeginning: !0,
                isEnd: !1,
                translate: 0,
                previousTranslate: 0,
                progress: 0,
                velocity: 0,
                animating: !1,
                allowSlideNext: r.params.allowSlideNext,
                allowSlidePrev: r.params.allowSlidePrev,
                touchEvents: function() {
                    const e = ["touchstart", "touchmove", "touchend", "touchcancel"],
                        t = ["pointerdown", "pointermove", "pointerup"];
                    return r.touchEventsTouch = {
                        start: e[0],
                        move: e[1],
                        end: e[2],
                        cancel: e[3]
                    }, r.touchEventsDesktop = {
                        start: t[0],
                        move: t[1],
                        end: t[2]
                    }, r.support.touch || !r.params.simulateTouch ? r.touchEventsTouch : r.touchEventsDesktop
                }(),
                touchEventsData: {
                    isTouched: void 0,
                    isMoved: void 0,
                    allowTouchCallbacks: void 0,
                    touchStartTime: void 0,
                    isScrolling: void 0,
                    currentTranslate: void 0,
                    startTranslate: void 0,
                    allowThresholdMove: void 0,
                    focusableElements: r.params.focusableElements,
                    lastClickTime: h(),
                    clickTimeout: void 0,
                    velocities: [],
                    allowMomentumBounce: void 0,
                    isTouchEvent: void 0,
                    startMoving: void 0
                },
                allowClick: !0,
                allowTouchMove: r.params.allowTouchMove,
                touches: {
                    startX: 0,
                    startY: 0,
                    currentX: 0,
                    currentY: 0,
                    diff: 0
                },
                imagesToLoad: [],
                imagesLoaded: 0
            }), r.emit("_swiper"), r.params.init && r.init(), r
        }
        enable() {
            const e = this;
            e.enabled || (e.enabled = !0, e.params.grabCursor && e.setGrabCursor(), e.emit("enable"))
        }
        disable() {
            const e = this;
            e.enabled && (e.enabled = !1, e.params.grabCursor && e.unsetGrabCursor(), e.emit("disable"))
        }
        setProgress(e, t) {
            const i = this;
            e = Math.min(Math.max(e, 0), 1);
            const s = i.minTranslate(),
                n = (i.maxTranslate() - s) * e + s;
            i.translateTo(n, void 0 === t ? 0 : t), i.updateActiveIndex(), i.updateSlidesClasses()
        }
        emitContainerClasses() {
            const e = this;
            if (!e.params._emitClasses || !e.el) return;
            const t = e.el.className.split(" ").filter(t => 0 === t.indexOf("swiper") || 0 === t.indexOf(e.params.containerModifierClass));
            e.emit("_containerClasses", t.join(" "))
        }
        getSlideClasses(e) {
            const t = this;
            return t.destroyed ? "" : e.className.split(" ").filter(e => 0 === e.indexOf("swiper-slide") || 0 === e.indexOf(t.params.slideClass)).join(" ")
        }
        emitSlidesClasses() {
            const e = this;
            if (!e.params._emitClasses || !e.el) return;
            const t = [];
            e.slides.each(i => {
                const s = e.getSlideClasses(i);
                t.push({
                    slideEl: i,
                    classNames: s
                }), e.emit("_slideClass", i, s)
            }), e.emit("_slideClasses", t)
        }
        slidesPerViewDynamic(e, t) {
            void 0 === e && (e = "current"), void 0 === t && (t = !1);
            const {
                params: i,
                slides: s,
                slidesGrid: n,
                slidesSizesGrid: r,
                size: a,
                activeIndex: o
            } = this;
            let l = 1;
            if (i.centeredSlides) {
                let e, t = s[o].swiperSlideSize;
                for (let i = o + 1; i < s.length; i += 1) s[i] && !e && (t += s[i].swiperSlideSize, l += 1, t > a && (e = !0));
                for (let i = o - 1; i >= 0; i -= 1) s[i] && !e && (t += s[i].swiperSlideSize, l += 1, t > a && (e = !0))
            } else if ("current" === e)
                for (let e = o + 1; e < s.length; e += 1)(t ? n[e] + r[e] - n[o] < a : n[e] - n[o] < a) && (l += 1);
            else
                for (let e = o - 1; e >= 0; e -= 1) n[o] - n[e] < a && (l += 1);
            return l
        }
        update() {
            const e = this;
            if (!e || e.destroyed) return;
            const {
                snapGrid: t,
                params: i
            } = e;

            function s() {
                const t = e.rtlTranslate ? -1 * e.translate : e.translate,
                    i = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
                e.setTranslate(i), e.updateActiveIndex(), e.updateSlidesClasses()
            }
            let n;
            i.breakpoints && e.setBreakpoint(), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), e.params.freeMode && e.params.freeMode.enabled ? (s(), e.params.autoHeight && e.updateAutoHeight()) : (n = ("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0), n || s()), i.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update")
        }
        changeDirection(e, t) {
            void 0 === t && (t = !0);
            const i = this,
                s = i.params.direction;
            return e || (e = "horizontal" === s ? "vertical" : "horizontal"), e === s || "horizontal" !== e && "vertical" !== e || (i.$el.removeClass(`${i.params.containerModifierClass}${s}`).addClass(`${i.params.containerModifierClass}${e}`), i.emitContainerClasses(), i.params.direction = e, i.slides.each(t => {
                "vertical" === e ? t.style.width = "" : t.style.height = ""
            }), i.emit("changeDirection"), t && i.update()), i
        }
        changeLanguageDirection(e) {
            const t = this;
            t.rtl && "rtl" === e || !t.rtl && "ltr" === e || (t.rtl = "rtl" === e, t.rtlTranslate = "horizontal" === t.params.direction && t.rtl, t.rtl ? (t.$el.addClass(t.params.containerModifierClass + "rtl"), t.el.dir = "rtl") : (t.$el.removeClass(t.params.containerModifierClass + "rtl"), t.el.dir = "ltr"), t.update())
        }
        mount(e) {
            const t = this;
            if (t.mounted) return !0;
            const i = d(e || t.params.el);
            if (!(e = i[0])) return !1;
            e.swiper = t;
            const n = () => "." + (t.params.wrapperClass || "").trim().split(" ").join(".");
            let r = (() => {
                if (e && e.shadowRoot && e.shadowRoot.querySelector) {
                    const t = d(e.shadowRoot.querySelector(n()));
                    return t.children = e => i.children(e), t
                }
                return i.children ? i.children(n()) : d(i).children(n())
            })();
            if (0 === r.length && t.params.createElements) {
                const e = s().createElement("div");
                r = d(e), e.className = t.params.wrapperClass, i.append(e), i.children("." + t.params.slideClass).each(e => {
                    r.append(e)
                })
            }
            return Object.assign(t, {
                $el: i,
                el: e,
                $wrapperEl: r,
                wrapperEl: r[0],
                mounted: !0,
                rtl: "rtl" === e.dir.toLowerCase() || "rtl" === i.css("direction"),
                rtlTranslate: "horizontal" === t.params.direction && ("rtl" === e.dir.toLowerCase() || "rtl" === i.css("direction")),
                wrongRTL: "-webkit-box" === r.css("display")
            }), !0
        }
        init(e) {
            const t = this;
            return t.initialized || !1 === t.mount(e) || (t.emit("beforeInit"), t.params.breakpoints && t.setBreakpoint(), t.addClasses(), t.params.loop && t.loopCreate(), t.updateSize(), t.updateSlides(), t.params.watchOverflow && t.checkOverflow(), t.params.grabCursor && t.enabled && t.setGrabCursor(), t.params.preloadImages && t.preloadImages(), t.params.loop ? t.slideTo(t.params.initialSlide + t.loopedSlides, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0), t.attachEvents(), t.initialized = !0, t.emit("init"), t.emit("afterInit")), t
        }
        destroy(e, t) {
            void 0 === e && (e = !0), void 0 === t && (t = !0);
            const i = this,
                {
                    params: s,
                    $el: n,
                    $wrapperEl: r,
                    slides: a
                } = i;
            return void 0 === i.params || i.destroyed || (i.emit("beforeDestroy"), i.initialized = !1, i.detachEvents(), s.loop && i.loopDestroy(), t && (i.removeClasses(), n.removeAttr("style"), r.removeAttr("style"), a && a.length && a.removeClass([s.slideVisibleClass, s.slideActiveClass, s.slideNextClass, s.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")), i.emit("destroy"), Object.keys(i.eventsListeners).forEach(e => {
                i.off(e)
            }), !1 !== e && (i.$el[0].swiper = null, function(e) {
                const t = e;
                Object.keys(t).forEach(e => {
                    try {
                        t[e] = null
                    } catch (e) {}
                    try {
                        delete t[e]
                    } catch (e) {}
                })
            }(i)), i.destroyed = !0), null
        }
        static extendDefaults(e) {
            g(j, e)
        }
        static get extendedDefaults() {
            return j
        }
        static get defaults() {
            return D
        }
        static installModule(e) {
            H.prototype.__modules__ || (H.prototype.__modules__ = []);
            const t = H.prototype.__modules__;
            "function" == typeof e && t.indexOf(e) < 0 && t.push(e)
        }
        static use(e) {
            return Array.isArray(e) ? (e.forEach(e => H.installModule(e)), H) : (H.installModule(e), H)
        }
    }

    function q(e, t, i, n) {
        const r = s();
        return e.params.createElements && Object.keys(n).forEach(s => {
            if (!i[s] && !0 === i.auto) {
                let a = e.$el.children("." + n[s])[0];
                a || (a = r.createElement("div"), a.className = n[s], e.$el.append(a)), i[s] = a, t[s] = a
            }
        }), i
    }

    function W(e) {
        return void 0 === e && (e = ""), "." + e.trim().replace(/([\.:!\/])/g, "\\$1").replace(/ /g, ".")
    }

    function Y(e) {
        const t = this,
            {
                $wrapperEl: i,
                params: s
            } = t;
        if (s.loop && t.loopDestroy(), "object" == typeof e && "length" in e)
            for (let t = 0; t < e.length; t += 1) e[t] && i.append(e[t]);
        else i.append(e);
        s.loop && t.loopCreate(), s.observer || t.update()
    }

    function X(e) {
        const t = this,
            {
                params: i,
                $wrapperEl: s,
                activeIndex: n
            } = t;
        i.loop && t.loopDestroy();
        let r = n + 1;
        if ("object" == typeof e && "length" in e) {
            for (let t = 0; t < e.length; t += 1) e[t] && s.prepend(e[t]);
            r = n + e.length
        } else s.prepend(e);
        i.loop && t.loopCreate(), i.observer || t.update(), t.slideTo(r, 0, !1)
    }

    function R(e, t) {
        const i = this,
            {
                $wrapperEl: s,
                params: n,
                activeIndex: r
            } = i;
        let a = r;
        n.loop && (a -= i.loopedSlides, i.loopDestroy(), i.slides = s.children("." + n.slideClass));
        const o = i.slides.length;
        if (e <= 0) return void i.prependSlide(t);
        if (e >= o) return void i.appendSlide(t);
        let l = a > e ? a + 1 : a;
        const d = [];
        for (let t = o - 1; t >= e; t -= 1) {
            const e = i.slides.eq(t);
            e.remove(), d.unshift(e)
        }
        if ("object" == typeof t && "length" in t) {
            for (let e = 0; e < t.length; e += 1) t[e] && s.append(t[e]);
            l = a > e ? a + t.length : a
        } else s.append(t);
        for (let e = 0; e < d.length; e += 1) s.append(d[e]);
        n.loop && i.loopCreate(), n.observer || i.update(), n.loop ? i.slideTo(l + i.loopedSlides, 0, !1) : i.slideTo(l, 0, !1)
    }

    function F(e) {
        const t = this,
            {
                params: i,
                $wrapperEl: s,
                activeIndex: n
            } = t;
        let r = n;
        i.loop && (r -= t.loopedSlides, t.loopDestroy(), t.slides = s.children("." + i.slideClass));
        let a, o = r;
        if ("object" == typeof e && "length" in e) {
            for (let i = 0; i < e.length; i += 1) a = e[i], t.slides[a] && t.slides.eq(a).remove(), a < o && (o -= 1);
            o = Math.max(o, 0)
        } else a = e, t.slides[a] && t.slides.eq(a).remove(), a < o && (o -= 1), o = Math.max(o, 0);
        i.loop && t.loopCreate(), i.observer || t.update(), i.loop ? t.slideTo(o + t.loopedSlides, 0, !1) : t.slideTo(o, 0, !1)
    }

    function G() {
        const e = this,
            t = [];
        for (let i = 0; i < e.slides.length; i += 1) t.push(i);
        e.removeSlide(t)
    }

    function V(e) {
        const {
            effect: t,
            swiper: i,
            on: s,
            setTranslate: n,
            setTransition: r,
            overwriteParams: a,
            perspective: o,
            recreateShadows: l,
            getEffectParams: d
        } = e;
        let c;
        s("beforeInit", () => {
            if (i.params.effect !== t) return;
            i.classNames.push(`${i.params.containerModifierClass}${t}`), o && o() && i.classNames.push(i.params.containerModifierClass + "3d");
            const e = a ? a() : {};
            Object.assign(i.params, e), Object.assign(i.originalParams, e)
        }), s("setTranslate", () => {
            i.params.effect === t && n()
        }), s("setTransition", (e, s) => {
            i.params.effect === t && r(s)
        }), s("transitionEnd", () => {
            if (i.params.effect === t && l) {
                if (!d || !d().slideShadows) return;
                i.slides.each(e => {
                    i.$(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").remove()
                }), l()
            }
        }), s("virtualUpdate", () => {
            i.params.effect === t && (i.slides.length || (c = !0), requestAnimationFrame(() => {
                c && i.slides && i.slides.length && (n(), c = !1)
            }))
        })
    }

    function U(e, t) {
        return e.transformEl ? t.find(e.transformEl).css({
            "backface-visibility": "hidden",
            "-webkit-backface-visibility": "hidden"
        }) : t
    }

    function Q(e) {
        let {
            swiper: t,
            duration: i,
            transformEl: s,
            allSlides: n
        } = e;
        const {
            slides: r,
            activeIndex: a,
            $wrapperEl: o
        } = t;
        if (t.params.virtualTranslate && 0 !== i) {
            let e, i = !1;
            e = n ? s ? r.find(s) : r : s ? r.eq(a).find(s) : r.eq(a), e.transitionEnd(() => {
                if (i) return;
                if (!t || t.destroyed) return;
                i = !0, t.animating = !1;
                const e = ["webkitTransitionEnd", "transitionend"];
                for (let t = 0; t < e.length; t += 1) o.trigger(e[t])
            })
        }
    }

    function K(e, t, i) {
        const s = "swiper-slide-shadow" + (i ? "-" + i : ""),
            n = e.transformEl ? t.find(e.transformEl) : t;
        let r = n.children("." + s);
        return r.length || (r = d(`<div class="swiper-slide-shadow${i?"-"+i:""}"></div>`), n.append(r)), r
    }
    Object.keys(B).forEach(e => {
        Object.keys(B[e]).forEach(t => {
            H.prototype[t] = B[e][t]
        })
    }), H.use([function(e) {
        let {
            swiper: t,
            on: i,
            emit: s
        } = e;
        const n = r();
        let a = null,
            o = null;
        const l = () => {
                t && !t.destroyed && t.initialized && (s("beforeResize"), s("resize"))
            },
            d = () => {
                t && !t.destroyed && t.initialized && s("orientationchange")
            };
        i("init", () => {
            t.params.resizeObserver && void 0 !== n.ResizeObserver ? t && !t.destroyed && t.initialized && (a = new ResizeObserver(e => {
                o = n.requestAnimationFrame(() => {
                    const {
                        width: i,
                        height: s
                    } = t;
                    let n = i,
                        r = s;
                    e.forEach(e => {
                        let {
                            contentBoxSize: i,
                            contentRect: s,
                            target: a
                        } = e;
                        a && a !== t.el || (n = s ? s.width : (i[0] || i).inlineSize, r = s ? s.height : (i[0] || i).blockSize)
                    }), n === i && r === s || l()
                })
            }), a.observe(t.el)) : (n.addEventListener("resize", l), n.addEventListener("orientationchange", d))
        }), i("destroy", () => {
            o && n.cancelAnimationFrame(o), a && a.unobserve && t.el && (a.unobserve(t.el), a = null), n.removeEventListener("resize", l), n.removeEventListener("orientationchange", d)
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: i,
            on: s,
            emit: n
        } = e;
        const a = [],
            o = r(),
            l = function(e, t) {
                void 0 === t && (t = {});
                const i = new(o.MutationObserver || o.WebkitMutationObserver)(e => {
                    if (1 === e.length) return void n("observerUpdate", e[0]);
                    const t = function() {
                        n("observerUpdate", e[0])
                    };
                    o.requestAnimationFrame ? o.requestAnimationFrame(t) : o.setTimeout(t, 0)
                });
                i.observe(e, {
                    attributes: void 0 === t.attributes || t.attributes,
                    childList: void 0 === t.childList || t.childList,
                    characterData: void 0 === t.characterData || t.characterData
                }), a.push(i)
            };
        i({
            observer: !1,
            observeParents: !1,
            observeSlideChildren: !1
        }), s("init", () => {
            if (t.params.observer) {
                if (t.params.observeParents) {
                    const e = t.$el.parents();
                    for (let t = 0; t < e.length; t += 1) l(e[t])
                }
                l(t.$el[0], {
                    childList: t.params.observeSlideChildren
                }), l(t.$wrapperEl[0], {
                    attributes: !1
                })
            }
        }), s("destroy", () => {
            a.forEach(e => {
                e.disconnect()
            }), a.splice(0, a.length)
        })
    }]);
    const Z = [function(e) {
        let t, {
            swiper: i,
            extendParams: s,
            on: n,
            emit: r
        } = e;

        function a(e, t) {
            const s = i.params.virtual;
            if (s.cache && i.virtual.cache[t]) return i.virtual.cache[t];
            const n = s.renderSlide ? d(s.renderSlide.call(i, e, t)) : d(`<div class="${i.params.slideClass}" data-swiper-slide-index="${t}">${e}</div>`);
            return n.attr("data-swiper-slide-index") || n.attr("data-swiper-slide-index", t), s.cache && (i.virtual.cache[t] = n), n
        }

        function o(e) {
            const {
                slidesPerView: t,
                slidesPerGroup: s,
                centeredSlides: n
            } = i.params, {
                addSlidesBefore: o,
                addSlidesAfter: l
            } = i.params.virtual, {
                from: d,
                to: c,
                slides: u,
                slidesGrid: h,
                offset: p
            } = i.virtual;
            i.params.cssMode || i.updateActiveIndex();
            const f = i.activeIndex || 0;
            let m, g, v;
            m = i.rtlTranslate ? "right" : i.isHorizontal() ? "left" : "top", n ? (g = Math.floor(t / 2) + s + l, v = Math.floor(t / 2) + s + o) : (g = t + (s - 1) + l, v = s + o);
            const y = Math.max((f || 0) - v, 0),
                b = Math.min((f || 0) + g, u.length - 1),
                w = (i.slidesGrid[y] || 0) - (i.slidesGrid[0] || 0);

            function x() {
                i.updateSlides(), i.updateProgress(), i.updateSlidesClasses(), i.lazy && i.params.lazy.enabled && i.lazy.load(), r("virtualUpdate")
            }
            if (Object.assign(i.virtual, {
                    from: y,
                    to: b,
                    offset: w,
                    slidesGrid: i.slidesGrid
                }), d === y && c === b && !e) return i.slidesGrid !== h && w !== p && i.slides.css(m, w + "px"), i.updateProgress(), void r("virtualUpdate");
            if (i.params.virtual.renderExternal) return i.params.virtual.renderExternal.call(i, {
                offset: w,
                from: y,
                to: b,
                slides: function() {
                    const e = [];
                    for (let t = y; t <= b; t += 1) e.push(u[t]);
                    return e
                }()
            }), void(i.params.virtual.renderExternalUpdate ? x() : r("virtualUpdate"));
            const _ = [],
                E = [];
            if (e) i.$wrapperEl.find("." + i.params.slideClass).remove();
            else
                for (let e = d; e <= c; e += 1)(e < y || e > b) && i.$wrapperEl.find(`.${i.params.slideClass}[data-swiper-slide-index="${e}"]`).remove();
            for (let t = 0; t < u.length; t += 1) t >= y && t <= b && (void 0 === c || e ? E.push(t) : (t > c && E.push(t), t < d && _.push(t)));
            E.forEach(e => {
                i.$wrapperEl.append(a(u[e], e))
            }), _.sort((e, t) => t - e).forEach(e => {
                i.$wrapperEl.prepend(a(u[e], e))
            }), i.$wrapperEl.children(".swiper-slide").css(m, w + "px"), x()
        }
        s({
            virtual: {
                enabled: !1,
                slides: [],
                cache: !0,
                renderSlide: null,
                renderExternal: null,
                renderExternalUpdate: !0,
                addSlidesBefore: 0,
                addSlidesAfter: 0
            }
        }), i.virtual = {
            cache: {},
            from: void 0,
            to: void 0,
            slides: [],
            offset: 0,
            slidesGrid: []
        }, n("beforeInit", () => {
            i.params.virtual.enabled && (i.virtual.slides = i.params.virtual.slides, i.classNames.push(i.params.containerModifierClass + "virtual"), i.params.watchSlidesProgress = !0, i.originalParams.watchSlidesProgress = !0, i.params.initialSlide || o())
        }), n("setTranslate", () => {
            i.params.virtual.enabled && (i.params.cssMode && !i._immediateVirtual ? (clearTimeout(t), t = setTimeout(() => {
                o()
            }, 100)) : o())
        }), n("init update resize", () => {
            i.params.virtual.enabled && i.params.cssMode && v(i.wrapperEl, "--swiper-virtual-size", i.virtualSize + "px")
        }), Object.assign(i.virtual, {
            appendSlide: function(e) {
                if ("object" == typeof e && "length" in e)
                    for (let t = 0; t < e.length; t += 1) e[t] && i.virtual.slides.push(e[t]);
                else i.virtual.slides.push(e);
                o(!0)
            },
            prependSlide: function(e) {
                const t = i.activeIndex;
                let s = t + 1,
                    n = 1;
                if (Array.isArray(e)) {
                    for (let t = 0; t < e.length; t += 1) e[t] && i.virtual.slides.unshift(e[t]);
                    s = t + e.length, n = e.length
                } else i.virtual.slides.unshift(e);
                if (i.params.virtual.cache) {
                    const e = i.virtual.cache,
                        t = {};
                    Object.keys(e).forEach(i => {
                        const s = e[i],
                            r = s.attr("data-swiper-slide-index");
                        r && s.attr("data-swiper-slide-index", parseInt(r, 10) + n), t[parseInt(i, 10) + n] = s
                    }), i.virtual.cache = t
                }
                o(!0), i.slideTo(s, 0)
            },
            removeSlide: function(e) {
                if (null == e) return;
                let t = i.activeIndex;
                if (Array.isArray(e))
                    for (let s = e.length - 1; s >= 0; s -= 1) i.virtual.slides.splice(e[s], 1), i.params.virtual.cache && delete i.virtual.cache[e[s]], e[s] < t && (t -= 1), t = Math.max(t, 0);
                else i.virtual.slides.splice(e, 1), i.params.virtual.cache && delete i.virtual.cache[e], e < t && (t -= 1), t = Math.max(t, 0);
                o(!0), i.slideTo(t, 0)
            },
            removeAllSlides: function() {
                i.virtual.slides = [], i.params.virtual.cache && (i.virtual.cache = {}), o(!0), i.slideTo(0, 0)
            },
            update: o
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: i,
            on: n,
            emit: a
        } = e;
        const o = s(),
            l = r();

        function c(e) {
            if (!t.enabled) return;
            const {
                rtlTranslate: i
            } = t;
            let s = e;
            s.originalEvent && (s = s.originalEvent);
            const n = s.keyCode || s.charCode,
                r = t.params.keyboard.pageUpDown,
                d = r && 33 === n,
                c = r && 34 === n,
                u = 37 === n,
                h = 39 === n,
                p = 38 === n,
                f = 40 === n;
            if (!t.allowSlideNext && (t.isHorizontal() && h || t.isVertical() && f || c)) return !1;
            if (!t.allowSlidePrev && (t.isHorizontal() && u || t.isVertical() && p || d)) return !1;
            if (!(s.shiftKey || s.altKey || s.ctrlKey || s.metaKey || o.activeElement && o.activeElement.nodeName && ("input" === o.activeElement.nodeName.toLowerCase() || "textarea" === o.activeElement.nodeName.toLowerCase()))) {
                if (t.params.keyboard.onlyInViewport && (d || c || u || h || p || f)) {
                    let e = !1;
                    if (t.$el.parents("." + t.params.slideClass).length > 0 && 0 === t.$el.parents("." + t.params.slideActiveClass).length) return;
                    const s = t.$el,
                        n = s[0].clientWidth,
                        r = s[0].clientHeight,
                        a = l.innerWidth,
                        o = l.innerHeight,
                        d = t.$el.offset();
                    i && (d.left -= t.$el[0].scrollLeft);
                    const c = [
                        [d.left, d.top],
                        [d.left + n, d.top],
                        [d.left, d.top + r],
                        [d.left + n, d.top + r]
                    ];
                    for (let t = 0; t < c.length; t += 1) {
                        const i = c[t];
                        if (i[0] >= 0 && i[0] <= a && i[1] >= 0 && i[1] <= o) {
                            if (0 === i[0] && 0 === i[1]) continue;
                            e = !0
                        }
                    }
                    if (!e) return
                }
                t.isHorizontal() ? ((d || c || u || h) && (s.preventDefault ? s.preventDefault() : s.returnValue = !1), ((c || h) && !i || (d || u) && i) && t.slideNext(), ((d || u) && !i || (c || h) && i) && t.slidePrev()) : ((d || c || p || f) && (s.preventDefault ? s.preventDefault() : s.returnValue = !1), (c || f) && t.slideNext(), (d || p) && t.slidePrev()), a("keyPress", n)
            }
        }

        function u() {
            t.keyboard.enabled || (d(o).on("keydown", c), t.keyboard.enabled = !0)
        }

        function h() {
            t.keyboard.enabled && (d(o).off("keydown", c), t.keyboard.enabled = !1)
        }
        t.keyboard = {
            enabled: !1
        }, i({
            keyboard: {
                enabled: !1,
                onlyInViewport: !0,
                pageUpDown: !0
            }
        }), n("init", () => {
            t.params.keyboard.enabled && u()
        }), n("destroy", () => {
            t.keyboard.enabled && h()
        }), Object.assign(t.keyboard, {
            enable: u,
            disable: h
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: i,
            on: s,
            emit: n
        } = e;
        const a = r();
        let o;
        i({
            mousewheel: {
                enabled: !1,
                releaseOnEdges: !1,
                invert: !1,
                forceToAxis: !1,
                sensitivity: 1,
                eventsTarget: "container",
                thresholdDelta: null,
                thresholdTime: null
            }
        }), t.mousewheel = {
            enabled: !1
        };
        let l, c = h();
        const p = [];

        function f() {
            t.enabled && (t.mouseEntered = !0)
        }

        function m() {
            t.enabled && (t.mouseEntered = !1)
        }

        function g(e) {
            return !(t.params.mousewheel.thresholdDelta && e.delta < t.params.mousewheel.thresholdDelta || t.params.mousewheel.thresholdTime && h() - c < t.params.mousewheel.thresholdTime || !(e.delta >= 6 && h() - c < 60) && (e.direction < 0 ? t.isEnd && !t.params.loop || t.animating || (t.slideNext(), n("scroll", e.raw)) : t.isBeginning && !t.params.loop || t.animating || (t.slidePrev(), n("scroll", e.raw)), c = (new a.Date).getTime(), 1))
        }

        function v(e) {
            let i = e,
                s = !0;
            if (!t.enabled) return;
            const r = t.params.mousewheel;
            t.params.cssMode && i.preventDefault();
            let a = t.$el;
            if ("container" !== t.params.mousewheel.eventsTarget && (a = d(t.params.mousewheel.eventsTarget)), !t.mouseEntered && !a[0].contains(i.target) && !r.releaseOnEdges) return !0;
            i.originalEvent && (i = i.originalEvent);
            let c = 0;
            const f = t.rtlTranslate ? -1 : 1,
                m = function(e) {
                    let t = 0,
                        i = 0,
                        s = 0,
                        n = 0;
                    return "detail" in e && (i = e.detail), "wheelDelta" in e && (i = -e.wheelDelta / 120), "wheelDeltaY" in e && (i = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = i, i = 0), s = 10 * t, n = 10 * i, "deltaY" in e && (n = e.deltaY), "deltaX" in e && (s = e.deltaX), e.shiftKey && !s && (s = n, n = 0), (s || n) && e.deltaMode && (1 === e.deltaMode ? (s *= 40, n *= 40) : (s *= 800, n *= 800)), s && !t && (t = s < 1 ? -1 : 1), n && !i && (i = n < 1 ? -1 : 1), {
                        spinX: t,
                        spinY: i,
                        pixelX: s,
                        pixelY: n
                    }
                }(i);
            if (r.forceToAxis)
                if (t.isHorizontal()) {
                    if (!(Math.abs(m.pixelX) > Math.abs(m.pixelY))) return !0;
                    c = -m.pixelX * f
                } else {
                    if (!(Math.abs(m.pixelY) > Math.abs(m.pixelX))) return !0;
                    c = -m.pixelY
                }
            else c = Math.abs(m.pixelX) > Math.abs(m.pixelY) ? -m.pixelX * f : -m.pixelY;
            if (0 === c) return !0;
            r.invert && (c = -c);
            let v = t.getTranslate() + c * r.sensitivity;
            if (v >= t.minTranslate() && (v = t.minTranslate()), v <= t.maxTranslate() && (v = t.maxTranslate()), s = !!t.params.loop || !(v === t.minTranslate() || v === t.maxTranslate()), s && t.params.nested && i.stopPropagation(), t.params.freeMode && t.params.freeMode.enabled) {
                const e = {
                        time: h(),
                        delta: Math.abs(c),
                        direction: Math.sign(c)
                    },
                    s = l && e.time < l.time + 500 && e.delta <= l.delta && e.direction === l.direction;
                if (!s) {
                    l = void 0, t.params.loop && t.loopFix();
                    let a = t.getTranslate() + c * r.sensitivity;
                    const d = t.isBeginning,
                        h = t.isEnd;
                    if (a >= t.minTranslate() && (a = t.minTranslate()), a <= t.maxTranslate() && (a = t.maxTranslate()), t.setTransition(0), t.setTranslate(a), t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses(), (!d && t.isBeginning || !h && t.isEnd) && t.updateSlidesClasses(), t.params.freeMode.sticky) {
                        clearTimeout(o), o = void 0, p.length >= 15 && p.shift();
                        const i = p.length ? p[p.length - 1] : void 0,
                            s = p[0];
                        if (p.push(e), i && (e.delta > i.delta || e.direction !== i.direction)) p.splice(0);
                        else if (p.length >= 15 && e.time - s.time < 500 && s.delta - e.delta >= 1 && e.delta <= 6) {
                            const i = c > 0 ? .8 : .2;
                            l = e, p.splice(0), o = u(() => {
                                t.slideToClosest(t.params.speed, !0, void 0, i)
                            }, 0)
                        }
                        o || (o = u(() => {
                            l = e, p.splice(0), t.slideToClosest(t.params.speed, !0, void 0, .5)
                        }, 500))
                    }
                    if (s || n("scroll", i), t.params.autoplay && t.params.autoplayDisableOnInteraction && t.autoplay.stop(), a === t.minTranslate() || a === t.maxTranslate()) return !0
                }
            } else {
                const i = {
                    time: h(),
                    delta: Math.abs(c),
                    direction: Math.sign(c),
                    raw: e
                };
                p.length >= 2 && p.shift();
                const s = p.length ? p[p.length - 1] : void 0;
                if (p.push(i), s ? (i.direction !== s.direction || i.delta > s.delta || i.time > s.time + 150) && g(i) : g(i), function(e) {
                        const i = t.params.mousewheel;
                        if (e.direction < 0) {
                            if (t.isEnd && !t.params.loop && i.releaseOnEdges) return !0
                        } else if (t.isBeginning && !t.params.loop && i.releaseOnEdges) return !0;
                        return !1
                    }(i)) return !0
            }
            return i.preventDefault ? i.preventDefault() : i.returnValue = !1, !1
        }

        function y(e) {
            let i = t.$el;
            "container" !== t.params.mousewheel.eventsTarget && (i = d(t.params.mousewheel.eventsTarget)), i[e]("mouseenter", f), i[e]("mouseleave", m), i[e]("wheel", v)
        }

        function b() {
            return t.params.cssMode ? (t.wrapperEl.removeEventListener("wheel", v), !0) : !t.mousewheel.enabled && (y("on"), t.mousewheel.enabled = !0, !0)
        }

        function w() {
            return t.params.cssMode ? (t.wrapperEl.addEventListener(event, v), !0) : !!t.mousewheel.enabled && (y("off"), t.mousewheel.enabled = !1, !0)
        }
        s("init", () => {
            !t.params.mousewheel.enabled && t.params.cssMode && w(), t.params.mousewheel.enabled && b()
        }), s("destroy", () => {
            t.params.cssMode && b(), t.mousewheel.enabled && w()
        }), Object.assign(t.mousewheel, {
            enable: b,
            disable: w
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: i,
            on: s,
            emit: n
        } = e;

        function r(e) {
            let i;
            return e && (i = d(e), t.params.uniqueNavElements && "string" == typeof e && i.length > 1 && 1 === t.$el.find(e).length && (i = t.$el.find(e))), i
        }

        function a(e, i) {
            const s = t.params.navigation;
            e && e.length > 0 && (e[i ? "addClass" : "removeClass"](s.disabledClass), e[0] && "BUTTON" === e[0].tagName && (e[0].disabled = i), t.params.watchOverflow && t.enabled && e[t.isLocked ? "addClass" : "removeClass"](s.lockClass))
        }

        function o() {
            if (t.params.loop) return;
            const {
                $nextEl: e,
                $prevEl: i
            } = t.navigation;
            a(i, t.isBeginning && !t.params.rewind), a(e, t.isEnd && !t.params.rewind)
        }

        function l(e) {
            e.preventDefault(), (!t.isBeginning || t.params.loop || t.params.rewind) && (t.slidePrev(), n("navigationPrev"))
        }

        function c(e) {
            e.preventDefault(), (!t.isEnd || t.params.loop || t.params.rewind) && (t.slideNext(), n("navigationNext"))
        }

        function u() {
            const e = t.params.navigation;
            if (t.params.navigation = q(t, t.originalParams.navigation, t.params.navigation, {
                    nextEl: "swiper-button-next",
                    prevEl: "swiper-button-prev"
                }), !e.nextEl && !e.prevEl) return;
            const i = r(e.nextEl),
                s = r(e.prevEl);
            i && i.length > 0 && i.on("click", c), s && s.length > 0 && s.on("click", l), Object.assign(t.navigation, {
                $nextEl: i,
                nextEl: i && i[0],
                $prevEl: s,
                prevEl: s && s[0]
            }), t.enabled || (i && i.addClass(e.lockClass), s && s.addClass(e.lockClass))
        }

        function h() {
            const {
                $nextEl: e,
                $prevEl: i
            } = t.navigation;
            e && e.length && (e.off("click", c), e.removeClass(t.params.navigation.disabledClass)), i && i.length && (i.off("click", l), i.removeClass(t.params.navigation.disabledClass))
        }
        i({
            navigation: {
                nextEl: null,
                prevEl: null,
                hideOnClick: !1,
                disabledClass: "swiper-button-disabled",
                hiddenClass: "swiper-button-hidden",
                lockClass: "swiper-button-lock",
                navigationDisabledClass: "swiper-navigation-disabled"
            }
        }), t.navigation = {
            nextEl: null,
            $nextEl: null,
            prevEl: null,
            $prevEl: null
        }, s("init", () => {
            !1 === t.params.navigation.enabled ? p() : (u(), o())
        }), s("toEdge fromEdge lock unlock", () => {
            o()
        }), s("destroy", () => {
            h()
        }), s("enable disable", () => {
            const {
                $nextEl: e,
                $prevEl: i
            } = t.navigation;
            e && e[t.enabled ? "removeClass" : "addClass"](t.params.navigation.lockClass), i && i[t.enabled ? "removeClass" : "addClass"](t.params.navigation.lockClass)
        }), s("click", (e, i) => {
            const {
                $nextEl: s,
                $prevEl: r
            } = t.navigation, a = i.target;
            if (t.params.navigation.hideOnClick && !d(a).is(r) && !d(a).is(s)) {
                if (t.pagination && t.params.pagination && t.params.pagination.clickable && (t.pagination.el === a || t.pagination.el.contains(a))) return;
                let e;
                s ? e = s.hasClass(t.params.navigation.hiddenClass) : r && (e = r.hasClass(t.params.navigation.hiddenClass)), n(!0 === e ? "navigationShow" : "navigationHide"), s && s.toggleClass(t.params.navigation.hiddenClass), r && r.toggleClass(t.params.navigation.hiddenClass)
            }
        });
        const p = () => {
            t.$el.addClass(t.params.navigation.navigationDisabledClass), h()
        };
        Object.assign(t.navigation, {
            enable: () => {
                t.$el.removeClass(t.params.navigation.navigationDisabledClass), u(), o()
            },
            disable: p,
            update: o,
            init: u,
            destroy: h
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: i,
            on: s,
            emit: n
        } = e;
        const r = "swiper-pagination";
        let a;
        i({
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
                formatFractionCurrent: e => e,
                formatFractionTotal: e => e,
                bulletClass: r + "-bullet",
                bulletActiveClass: r + "-bullet-active",
                modifierClass: r + "-",
                currentClass: r + "-current",
                totalClass: r + "-total",
                hiddenClass: r + "-hidden",
                progressbarFillClass: r + "-progressbar-fill",
                progressbarOppositeClass: r + "-progressbar-opposite",
                clickableClass: r + "-clickable",
                lockClass: r + "-lock",
                horizontalClass: r + "-horizontal",
                verticalClass: r + "-vertical",
                paginationDisabledClass: r + "-disabled"
            }
        }), t.pagination = {
            el: null,
            $el: null,
            bullets: []
        };
        let o = 0;

        function l() {
            return !t.params.pagination.el || !t.pagination.el || !t.pagination.$el || 0 === t.pagination.$el.length
        }

        function c(e, i) {
            const {
                bulletActiveClass: s
            } = t.params.pagination;
            e[i]().addClass(`${s}-${i}`)[i]().addClass(`${s}-${i}-${i}`)
        }

        function u() {
            const e = t.rtl,
                i = t.params.pagination;
            if (l()) return;
            const s = t.virtual && t.params.virtual.enabled ? t.virtual.slides.length : t.slides.length,
                r = t.pagination.$el;
            let u;
            const h = t.params.loop ? Math.ceil((s - 2 * t.loopedSlides) / t.params.slidesPerGroup) : t.snapGrid.length;
            if (t.params.loop ? (u = Math.ceil((t.activeIndex - t.loopedSlides) / t.params.slidesPerGroup), u > s - 1 - 2 * t.loopedSlides && (u -= s - 2 * t.loopedSlides), u > h - 1 && (u -= h), u < 0 && "bullets" !== t.params.paginationType && (u = h + u)) : u = void 0 !== t.snapIndex ? t.snapIndex : t.activeIndex || 0, "bullets" === i.type && t.pagination.bullets && t.pagination.bullets.length > 0) {
                const s = t.pagination.bullets;
                let n, l, h;
                if (i.dynamicBullets && (a = s.eq(0)[t.isHorizontal() ? "outerWidth" : "outerHeight"](!0), r.css(t.isHorizontal() ? "width" : "height", a * (i.dynamicMainBullets + 4) + "px"), i.dynamicMainBullets > 1 && void 0 !== t.previousIndex && (o += u - (t.previousIndex - t.loopedSlides || 0), o > i.dynamicMainBullets - 1 ? o = i.dynamicMainBullets - 1 : o < 0 && (o = 0)), n = Math.max(u - o, 0), l = n + (Math.min(s.length, i.dynamicMainBullets) - 1), h = (l + n) / 2), s.removeClass(["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map(e => `${i.bulletActiveClass}${e}`).join(" ")), r.length > 1) s.each(e => {
                    const t = d(e),
                        s = t.index();
                    s === u && t.addClass(i.bulletActiveClass), i.dynamicBullets && (s >= n && s <= l && t.addClass(i.bulletActiveClass + "-main"), s === n && c(t, "prev"), s === l && c(t, "next"))
                });
                else {
                    const e = s.eq(u),
                        r = e.index();
                    if (e.addClass(i.bulletActiveClass), i.dynamicBullets) {
                        const e = s.eq(n),
                            a = s.eq(l);
                        for (let e = n; e <= l; e += 1) s.eq(e).addClass(i.bulletActiveClass + "-main");
                        if (t.params.loop)
                            if (r >= s.length) {
                                for (let e = i.dynamicMainBullets; e >= 0; e -= 1) s.eq(s.length - e).addClass(i.bulletActiveClass + "-main");
                                s.eq(s.length - i.dynamicMainBullets - 1).addClass(i.bulletActiveClass + "-prev")
                            } else c(e, "prev"), c(a, "next");
                        else c(e, "prev"), c(a, "next")
                    }
                }
                if (i.dynamicBullets) {
                    const n = Math.min(s.length, i.dynamicMainBullets + 4),
                        r = (a * n - a) / 2 - h * a,
                        o = e ? "right" : "left";
                    s.css(t.isHorizontal() ? o : "top", r + "px")
                }
            }
            if ("fraction" === i.type && (r.find(W(i.currentClass)).text(i.formatFractionCurrent(u + 1)), r.find(W(i.totalClass)).text(i.formatFractionTotal(h))), "progressbar" === i.type) {
                let e;
                e = i.progressbarOpposite ? t.isHorizontal() ? "vertical" : "horizontal" : t.isHorizontal() ? "horizontal" : "vertical";
                const s = (u + 1) / h;
                let n = 1,
                    a = 1;
                "horizontal" === e ? n = s : a = s, r.find(W(i.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${n}) scaleY(${a})`).transition(t.params.speed)
            }
            "custom" === i.type && i.renderCustom ? (r.html(i.renderCustom(t, u + 1, h)), n("paginationRender", r[0])) : n("paginationUpdate", r[0]), t.params.watchOverflow && t.enabled && r[t.isLocked ? "addClass" : "removeClass"](i.lockClass)
        }

        function h() {
            const e = t.params.pagination;
            if (l()) return;
            const i = t.virtual && t.params.virtual.enabled ? t.virtual.slides.length : t.slides.length,
                s = t.pagination.$el;
            let r = "";
            if ("bullets" === e.type) {
                let n = t.params.loop ? Math.ceil((i - 2 * t.loopedSlides) / t.params.slidesPerGroup) : t.snapGrid.length;
                t.params.freeMode && t.params.freeMode.enabled && !t.params.loop && n > i && (n = i);
                for (let i = 0; i < n; i += 1) e.renderBullet ? r += e.renderBullet.call(t, i, e.bulletClass) : r += `<${e.bulletElement} class="${e.bulletClass}"></${e.bulletElement}>`;
                s.html(r), t.pagination.bullets = s.find(W(e.bulletClass))
            }
            "fraction" === e.type && (r = e.renderFraction ? e.renderFraction.call(t, e.currentClass, e.totalClass) : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`, s.html(r)), "progressbar" === e.type && (r = e.renderProgressbar ? e.renderProgressbar.call(t, e.progressbarFillClass) : `<span class="${e.progressbarFillClass}"></span>`, s.html(r)), "custom" !== e.type && n("paginationRender", t.pagination.$el[0])
        }

        function p() {
            t.params.pagination = q(t, t.originalParams.pagination, t.params.pagination, {
                el: "swiper-pagination"
            });
            const e = t.params.pagination;
            if (!e.el) return;
            let i = d(e.el);
            0 !== i.length && (t.params.uniqueNavElements && "string" == typeof e.el && i.length > 1 && (i = t.$el.find(e.el), i.length > 1 && (i = i.filter(e => d(e).parents(".swiper")[0] === t.el))), "bullets" === e.type && e.clickable && i.addClass(e.clickableClass), i.addClass(e.modifierClass + e.type), i.addClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass), "bullets" === e.type && e.dynamicBullets && (i.addClass(`${e.modifierClass}${e.type}-dynamic`), o = 0, e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)), "progressbar" === e.type && e.progressbarOpposite && i.addClass(e.progressbarOppositeClass), e.clickable && i.on("click", W(e.bulletClass), (function(e) {
                e.preventDefault();
                let i = d(this).index() * t.params.slidesPerGroup;
                t.params.loop && (i += t.loopedSlides), t.slideTo(i)
            })), Object.assign(t.pagination, {
                $el: i,
                el: i[0]
            }), t.enabled || i.addClass(e.lockClass))
        }

        function f() {
            const e = t.params.pagination;
            if (l()) return;
            const i = t.pagination.$el;
            i.removeClass(e.hiddenClass), i.removeClass(e.modifierClass + e.type), i.removeClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass), t.pagination.bullets && t.pagination.bullets.removeClass && t.pagination.bullets.removeClass(e.bulletActiveClass), e.clickable && i.off("click", W(e.bulletClass))
        }
        s("init", () => {
            !1 === t.params.pagination.enabled ? m() : (p(), h(), u())
        }), s("activeIndexChange", () => {
            (t.params.loop || void 0 === t.snapIndex) && u()
        }), s("snapIndexChange", () => {
            t.params.loop || u()
        }), s("slidesLengthChange", () => {
            t.params.loop && (h(), u())
        }), s("snapGridLengthChange", () => {
            t.params.loop || (h(), u())
        }), s("destroy", () => {
            f()
        }), s("enable disable", () => {
            const {
                $el: e
            } = t.pagination;
            e && e[t.enabled ? "removeClass" : "addClass"](t.params.pagination.lockClass)
        }), s("lock unlock", () => {
            u()
        }), s("click", (e, i) => {
            const s = i.target,
                {
                    $el: r
                } = t.pagination;
            if (t.params.pagination.el && t.params.pagination.hideOnClick && r && r.length > 0 && !d(s).hasClass(t.params.pagination.bulletClass)) {
                if (t.navigation && (t.navigation.nextEl && s === t.navigation.nextEl || t.navigation.prevEl && s === t.navigation.prevEl)) return;
                const e = r.hasClass(t.params.pagination.hiddenClass);
                n(!0 === e ? "paginationShow" : "paginationHide"), r.toggleClass(t.params.pagination.hiddenClass)
            }
        });
        const m = () => {
            t.$el.addClass(t.params.pagination.paginationDisabledClass), t.pagination.$el && t.pagination.$el.addClass(t.params.pagination.paginationDisabledClass), f()
        };
        Object.assign(t.pagination, {
            enable: () => {
                t.$el.removeClass(t.params.pagination.paginationDisabledClass), t.pagination.$el && t.pagination.$el.removeClass(t.params.pagination.paginationDisabledClass), p(), h(), u()
            },
            disable: m,
            render: h,
            update: u,
            init: p,
            destroy: f
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: i,
            on: n,
            emit: r
        } = e;
        const a = s();
        let o, l, c, h, p = !1,
            f = null,
            m = null;

        function g() {
            if (!t.params.scrollbar.el || !t.scrollbar.el) return;
            const {
                scrollbar: e,
                rtlTranslate: i,
                progress: s
            } = t, {
                $dragEl: n,
                $el: r
            } = e, a = t.params.scrollbar;
            let o = l,
                d = (c - l) * s;
            i ? (d = -d, d > 0 ? (o = l - d, d = 0) : -d + l > c && (o = c + d)) : d < 0 ? (o = l + d, d = 0) : d + l > c && (o = c - d), t.isHorizontal() ? (n.transform(`translate3d(${d}px, 0, 0)`), n[0].style.width = o + "px") : (n.transform(`translate3d(0px, ${d}px, 0)`), n[0].style.height = o + "px"), a.hide && (clearTimeout(f), r[0].style.opacity = 1, f = setTimeout(() => {
                r[0].style.opacity = 0, r.transition(400)
            }, 1e3))
        }

        function v() {
            if (!t.params.scrollbar.el || !t.scrollbar.el) return;
            const {
                scrollbar: e
            } = t, {
                $dragEl: i,
                $el: s
            } = e;
            i[0].style.width = "", i[0].style.height = "", c = t.isHorizontal() ? s[0].offsetWidth : s[0].offsetHeight, h = t.size / (t.virtualSize + t.params.slidesOffsetBefore - (t.params.centeredSlides ? t.snapGrid[0] : 0)), l = "auto" === t.params.scrollbar.dragSize ? c * h : parseInt(t.params.scrollbar.dragSize, 10), t.isHorizontal() ? i[0].style.width = l + "px" : i[0].style.height = l + "px", s[0].style.display = h >= 1 ? "none" : "", t.params.scrollbar.hide && (s[0].style.opacity = 0), t.params.watchOverflow && t.enabled && e.$el[t.isLocked ? "addClass" : "removeClass"](t.params.scrollbar.lockClass)
        }

        function y(e) {
            return t.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientX : e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientY : e.clientY
        }

        function b(e) {
            const {
                scrollbar: i,
                rtlTranslate: s
            } = t, {
                $el: n
            } = i;
            let r;
            r = (y(e) - n.offset()[t.isHorizontal() ? "left" : "top"] - (null !== o ? o : l / 2)) / (c - l), r = Math.max(Math.min(r, 1), 0), s && (r = 1 - r);
            const a = t.minTranslate() + (t.maxTranslate() - t.minTranslate()) * r;
            t.updateProgress(a), t.setTranslate(a), t.updateActiveIndex(), t.updateSlidesClasses()
        }

        function w(e) {
            const i = t.params.scrollbar,
                {
                    scrollbar: s,
                    $wrapperEl: n
                } = t,
                {
                    $el: a,
                    $dragEl: l
                } = s;
            p = !0, o = e.target === l[0] || e.target === l ? y(e) - e.target.getBoundingClientRect()[t.isHorizontal() ? "left" : "top"] : null, e.preventDefault(), e.stopPropagation(), n.transition(100), l.transition(100), b(e), clearTimeout(m), a.transition(0), i.hide && a.css("opacity", 1), t.params.cssMode && t.$wrapperEl.css("scroll-snap-type", "none"), r("scrollbarDragStart", e)
        }

        function x(e) {
            const {
                scrollbar: i,
                $wrapperEl: s
            } = t, {
                $el: n,
                $dragEl: a
            } = i;
            p && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, b(e), s.transition(0), n.transition(0), a.transition(0), r("scrollbarDragMove", e))
        }

        function _(e) {
            const i = t.params.scrollbar,
                {
                    scrollbar: s,
                    $wrapperEl: n
                } = t,
                {
                    $el: a
                } = s;
            p && (p = !1, t.params.cssMode && (t.$wrapperEl.css("scroll-snap-type", ""), n.transition("")), i.hide && (clearTimeout(m), m = u(() => {
                a.css("opacity", 0), a.transition(400)
            }, 1e3)), r("scrollbarDragEnd", e), i.snapOnRelease && t.slideToClosest())
        }

        function E(e) {
            const {
                scrollbar: i,
                touchEventsTouch: s,
                touchEventsDesktop: n,
                params: r,
                support: o
            } = t, l = i.$el;
            if (!l) return;
            const d = l[0],
                c = !(!o.passiveListener || !r.passiveListeners) && {
                    passive: !1,
                    capture: !1
                },
                u = !(!o.passiveListener || !r.passiveListeners) && {
                    passive: !0,
                    capture: !1
                };
            if (!d) return;
            const h = "on" === e ? "addEventListener" : "removeEventListener";
            o.touch ? (d[h](s.start, w, c), d[h](s.move, x, c), d[h](s.end, _, u)) : (d[h](n.start, w, c), a[h](n.move, x, c), a[h](n.end, _, u))
        }

        function T() {
            const {
                scrollbar: e,
                $el: i
            } = t;
            t.params.scrollbar = q(t, t.originalParams.scrollbar, t.params.scrollbar, {
                el: "swiper-scrollbar"
            });
            const s = t.params.scrollbar;
            if (!s.el) return;
            let n = d(s.el);
            t.params.uniqueNavElements && "string" == typeof s.el && n.length > 1 && 1 === i.find(s.el).length && (n = i.find(s.el)), n.addClass(t.isHorizontal() ? s.horizontalClass : s.verticalClass);
            let r = n.find("." + t.params.scrollbar.dragClass);
            0 === r.length && (r = d(`<div class="${t.params.scrollbar.dragClass}"></div>`), n.append(r)), Object.assign(e, {
                $el: n,
                el: n[0],
                $dragEl: r,
                dragEl: r[0]
            }), s.draggable && t.params.scrollbar.el && t.scrollbar.el && E("on"), n && n[t.enabled ? "removeClass" : "addClass"](t.params.scrollbar.lockClass)
        }

        function C() {
            const e = t.params.scrollbar,
                i = t.scrollbar.$el;
            i && i.removeClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass), t.params.scrollbar.el && t.scrollbar.el && E("off")
        }
        i({
            scrollbar: {
                el: null,
                dragSize: "auto",
                hide: !1,
                draggable: !1,
                snapOnRelease: !0,
                lockClass: "swiper-scrollbar-lock",
                dragClass: "swiper-scrollbar-drag",
                scrollbarDisabledClass: "swiper-scrollbar-disabled",
                horizontalClass: "swiper-scrollbar-horizontal",
                verticalClass: "swiper-scrollbar-vertical"
            }
        }), t.scrollbar = {
            el: null,
            dragEl: null,
            $el: null,
            $dragEl: null
        }, n("init", () => {
            !1 === t.params.scrollbar.enabled ? S() : (T(), v(), g())
        }), n("update resize observerUpdate lock unlock", () => {
            v()
        }), n("setTranslate", () => {
            g()
        }), n("setTransition", (e, i) => {
            ! function(e) {
                t.params.scrollbar.el && t.scrollbar.el && t.scrollbar.$dragEl.transition(e)
            }(i)
        }), n("enable disable", () => {
            const {
                $el: e
            } = t.scrollbar;
            e && e[t.enabled ? "removeClass" : "addClass"](t.params.scrollbar.lockClass)
        }), n("destroy", () => {
            C()
        });
        const S = () => {
            t.$el.addClass(t.params.scrollbar.scrollbarDisabledClass), t.scrollbar.$el && t.scrollbar.$el.addClass(t.params.scrollbar.scrollbarDisabledClass), C()
        };
        Object.assign(t.scrollbar, {
            enable: () => {
                t.$el.removeClass(t.params.scrollbar.scrollbarDisabledClass), t.scrollbar.$el && t.scrollbar.$el.removeClass(t.params.scrollbar.scrollbarDisabledClass), T(), v(), g()
            },
            disable: S,
            updateSize: v,
            setTranslate: g,
            init: T,
            destroy: C
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: i,
            on: s
        } = e;
        i({
            parallax: {
                enabled: !1
            }
        });
        const n = (e, i) => {
                const {
                    rtl: s
                } = t, n = d(e), r = s ? -1 : 1, a = n.attr("data-swiper-parallax") || "0";
                let o = n.attr("data-swiper-parallax-x"),
                    l = n.attr("data-swiper-parallax-y");
                const c = n.attr("data-swiper-parallax-scale"),
                    u = n.attr("data-swiper-parallax-opacity");
                if (o || l ? (o = o || "0", l = l || "0") : t.isHorizontal() ? (o = a, l = "0") : (l = a, o = "0"), o = o.indexOf("%") >= 0 ? parseInt(o, 10) * i * r + "%" : o * i * r + "px", l = l.indexOf("%") >= 0 ? parseInt(l, 10) * i + "%" : l * i + "px", null != u) {
                    const e = u - (u - 1) * (1 - Math.abs(i));
                    n[0].style.opacity = e
                }
                if (null == c) n.transform(`translate3d(${o}, ${l}, 0px)`);
                else {
                    const e = c - (c - 1) * (1 - Math.abs(i));
                    n.transform(`translate3d(${o}, ${l}, 0px) scale(${e})`)
                }
            },
            r = () => {
                const {
                    $el: e,
                    slides: i,
                    progress: s,
                    snapGrid: r
                } = t;
                e.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(e => {
                    n(e, s)
                }), i.each((e, i) => {
                    let a = e.progress;
                    t.params.slidesPerGroup > 1 && "auto" !== t.params.slidesPerView && (a += Math.ceil(i / 2) - s * (r.length - 1)), a = Math.min(Math.max(a, -1), 1), d(e).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(e => {
                        n(e, a)
                    })
                })
            };
        s("beforeInit", () => {
            t.params.parallax.enabled && (t.params.watchSlidesProgress = !0, t.originalParams.watchSlidesProgress = !0)
        }), s("init", () => {
            t.params.parallax.enabled && r()
        }), s("setTranslate", () => {
            t.params.parallax.enabled && r()
        }), s("setTransition", (e, i) => {
            t.params.parallax.enabled && function(e) {
                void 0 === e && (e = t.params.speed);
                const {
                    $el: i
                } = t;
                i.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(t => {
                    const i = d(t);
                    let s = parseInt(i.attr("data-swiper-parallax-duration"), 10) || e;
                    0 === e && (s = 0), i.transition(s)
                })
            }(i)
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: i,
            on: s,
            emit: n
        } = e;
        const a = r();
        i({
            zoom: {
                enabled: !1,
                maxRatio: 3,
                minRatio: 1,
                toggle: !0,
                containerClass: "swiper-zoom-container",
                zoomedSlideClass: "swiper-slide-zoomed"
            }
        }), t.zoom = {
            enabled: !1
        };
        let o, l, c, u = 1,
            h = !1;
        const f = {
                $slideEl: void 0,
                slideWidth: void 0,
                slideHeight: void 0,
                $imageEl: void 0,
                $imageWrapEl: void 0,
                maxRatio: 3
            },
            m = {
                isTouched: void 0,
                isMoved: void 0,
                currentX: void 0,
                currentY: void 0,
                minX: void 0,
                minY: void 0,
                maxX: void 0,
                maxY: void 0,
                width: void 0,
                height: void 0,
                startX: void 0,
                startY: void 0,
                touchesStart: {},
                touchesCurrent: {}
            },
            g = {
                x: void 0,
                y: void 0,
                prevPositionX: void 0,
                prevPositionY: void 0,
                prevTime: void 0
            };
        let v = 1;

        function y(e) {
            if (e.targetTouches.length < 2) return 1;
            const t = e.targetTouches[0].pageX,
                i = e.targetTouches[0].pageY,
                s = e.targetTouches[1].pageX,
                n = e.targetTouches[1].pageY;
            return Math.sqrt((s - t) ** 2 + (n - i) ** 2)
        }

        function b(e) {
            const i = t.support,
                s = t.params.zoom;
            if (l = !1, c = !1, !i.gestures) {
                if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2) return;
                l = !0, f.scaleStart = y(e)
            }
            f.$slideEl && f.$slideEl.length || (f.$slideEl = d(e.target).closest("." + t.params.slideClass), 0 === f.$slideEl.length && (f.$slideEl = t.slides.eq(t.activeIndex)), f.$imageEl = f.$slideEl.find("." + s.containerClass).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0), f.$imageWrapEl = f.$imageEl.parent("." + s.containerClass), f.maxRatio = f.$imageWrapEl.attr("data-swiper-zoom") || s.maxRatio, 0 !== f.$imageWrapEl.length) ? (f.$imageEl && f.$imageEl.transition(0), h = !0) : f.$imageEl = void 0
        }

        function w(e) {
            const i = t.support,
                s = t.params.zoom,
                n = t.zoom;
            if (!i.gestures) {
                if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
                c = !0, f.scaleMove = y(e)
            }
            f.$imageEl && 0 !== f.$imageEl.length ? (i.gestures ? n.scale = e.scale * u : n.scale = f.scaleMove / f.scaleStart * u, n.scale > f.maxRatio && (n.scale = f.maxRatio - 1 + (n.scale - f.maxRatio + 1) ** .5), n.scale < s.minRatio && (n.scale = s.minRatio + 1 - (s.minRatio - n.scale + 1) ** .5), f.$imageEl.transform(`translate3d(0,0,0) scale(${n.scale})`)) : "gesturechange" === e.type && b(e)
        }

        function x(e) {
            const i = t.device,
                s = t.support,
                n = t.params.zoom,
                r = t.zoom;
            if (!s.gestures) {
                if (!l || !c) return;
                if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !i.android) return;
                l = !1, c = !1
            }
            f.$imageEl && 0 !== f.$imageEl.length && (r.scale = Math.max(Math.min(r.scale, f.maxRatio), n.minRatio), f.$imageEl.transition(t.params.speed).transform(`translate3d(0,0,0) scale(${r.scale})`), u = r.scale, h = !1, 1 === r.scale && (f.$slideEl = void 0))
        }

        function _(e) {
            const i = t.zoom;
            if (!f.$imageEl || 0 === f.$imageEl.length) return;
            if (t.allowClick = !1, !m.isTouched || !f.$slideEl) return;
            m.isMoved || (m.width = f.$imageEl[0].offsetWidth, m.height = f.$imageEl[0].offsetHeight, m.startX = p(f.$imageWrapEl[0], "x") || 0, m.startY = p(f.$imageWrapEl[0], "y") || 0, f.slideWidth = f.$slideEl[0].offsetWidth, f.slideHeight = f.$slideEl[0].offsetHeight, f.$imageWrapEl.transition(0));
            const s = m.width * i.scale,
                n = m.height * i.scale;
            if (!(s < f.slideWidth && n < f.slideHeight)) {
                if (m.minX = Math.min(f.slideWidth / 2 - s / 2, 0), m.maxX = -m.minX, m.minY = Math.min(f.slideHeight / 2 - n / 2, 0), m.maxY = -m.minY, m.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, m.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !m.isMoved && !h) {
                    if (t.isHorizontal() && (Math.floor(m.minX) === Math.floor(m.startX) && m.touchesCurrent.x < m.touchesStart.x || Math.floor(m.maxX) === Math.floor(m.startX) && m.touchesCurrent.x > m.touchesStart.x)) return void(m.isTouched = !1);
                    if (!t.isHorizontal() && (Math.floor(m.minY) === Math.floor(m.startY) && m.touchesCurrent.y < m.touchesStart.y || Math.floor(m.maxY) === Math.floor(m.startY) && m.touchesCurrent.y > m.touchesStart.y)) return void(m.isTouched = !1)
                }
                e.cancelable && e.preventDefault(), e.stopPropagation(), m.isMoved = !0, m.currentX = m.touchesCurrent.x - m.touchesStart.x + m.startX, m.currentY = m.touchesCurrent.y - m.touchesStart.y + m.startY, m.currentX < m.minX && (m.currentX = m.minX + 1 - (m.minX - m.currentX + 1) ** .8), m.currentX > m.maxX && (m.currentX = m.maxX - 1 + (m.currentX - m.maxX + 1) ** .8), m.currentY < m.minY && (m.currentY = m.minY + 1 - (m.minY - m.currentY + 1) ** .8), m.currentY > m.maxY && (m.currentY = m.maxY - 1 + (m.currentY - m.maxY + 1) ** .8), g.prevPositionX || (g.prevPositionX = m.touchesCurrent.x), g.prevPositionY || (g.prevPositionY = m.touchesCurrent.y), g.prevTime || (g.prevTime = Date.now()), g.x = (m.touchesCurrent.x - g.prevPositionX) / (Date.now() - g.prevTime) / 2, g.y = (m.touchesCurrent.y - g.prevPositionY) / (Date.now() - g.prevTime) / 2, Math.abs(m.touchesCurrent.x - g.prevPositionX) < 2 && (g.x = 0), Math.abs(m.touchesCurrent.y - g.prevPositionY) < 2 && (g.y = 0), g.prevPositionX = m.touchesCurrent.x, g.prevPositionY = m.touchesCurrent.y, g.prevTime = Date.now(), f.$imageWrapEl.transform(`translate3d(${m.currentX}px, ${m.currentY}px,0)`)
            }
        }

        function E() {
            const e = t.zoom;
            f.$slideEl && t.previousIndex !== t.activeIndex && (f.$imageEl && f.$imageEl.transform("translate3d(0,0,0) scale(1)"), f.$imageWrapEl && f.$imageWrapEl.transform("translate3d(0,0,0)"), e.scale = 1, u = 1, f.$slideEl = void 0, f.$imageEl = void 0, f.$imageWrapEl = void 0)
        }

        function T(e) {
            const i = t.zoom,
                s = t.params.zoom;
            if (f.$slideEl || (e && e.target && (f.$slideEl = d(e.target).closest("." + t.params.slideClass)), f.$slideEl || (t.params.virtual && t.params.virtual.enabled && t.virtual ? f.$slideEl = t.$wrapperEl.children("." + t.params.slideActiveClass) : f.$slideEl = t.slides.eq(t.activeIndex)), f.$imageEl = f.$slideEl.find("." + s.containerClass).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0), f.$imageWrapEl = f.$imageEl.parent("." + s.containerClass)), !f.$imageEl || 0 === f.$imageEl.length || !f.$imageWrapEl || 0 === f.$imageWrapEl.length) return;
            let n, r, o, l, c, h, p, g, v, y, b, w, x, _, E, T, C, S;
            t.params.cssMode && (t.wrapperEl.style.overflow = "hidden", t.wrapperEl.style.touchAction = "none"), f.$slideEl.addClass("" + s.zoomedSlideClass), void 0 === m.touchesStart.x && e ? (n = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX, r = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (n = m.touchesStart.x, r = m.touchesStart.y), i.scale = f.$imageWrapEl.attr("data-swiper-zoom") || s.maxRatio, u = f.$imageWrapEl.attr("data-swiper-zoom") || s.maxRatio, e ? (C = f.$slideEl[0].offsetWidth, S = f.$slideEl[0].offsetHeight, o = f.$slideEl.offset().left + a.scrollX, l = f.$slideEl.offset().top + a.scrollY, c = o + C / 2 - n, h = l + S / 2 - r, v = f.$imageEl[0].offsetWidth, y = f.$imageEl[0].offsetHeight, b = v * i.scale, w = y * i.scale, x = Math.min(C / 2 - b / 2, 0), _ = Math.min(S / 2 - w / 2, 0), E = -x, T = -_, p = c * i.scale, g = h * i.scale, p < x && (p = x), p > E && (p = E), g < _ && (g = _), g > T && (g = T)) : (p = 0, g = 0), f.$imageWrapEl.transition(300).transform(`translate3d(${p}px, ${g}px,0)`), f.$imageEl.transition(300).transform(`translate3d(0,0,0) scale(${i.scale})`)
        }

        function C() {
            const e = t.zoom,
                i = t.params.zoom;
            f.$slideEl || (t.params.virtual && t.params.virtual.enabled && t.virtual ? f.$slideEl = t.$wrapperEl.children("." + t.params.slideActiveClass) : f.$slideEl = t.slides.eq(t.activeIndex), f.$imageEl = f.$slideEl.find("." + i.containerClass).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0), f.$imageWrapEl = f.$imageEl.parent("." + i.containerClass)), f.$imageEl && 0 !== f.$imageEl.length && f.$imageWrapEl && 0 !== f.$imageWrapEl.length && (t.params.cssMode && (t.wrapperEl.style.overflow = "", t.wrapperEl.style.touchAction = ""), e.scale = 1, u = 1, f.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), f.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), f.$slideEl.removeClass("" + i.zoomedSlideClass), f.$slideEl = void 0)
        }

        function S(e) {
            const i = t.zoom;
            i.scale && 1 !== i.scale ? C() : T(e)
        }

        function M() {
            const e = t.support;
            return {
                passiveListener: !("touchstart" !== t.touchEvents.start || !e.passiveListener || !t.params.passiveListeners) && {
                    passive: !0,
                    capture: !1
                },
                activeListenerWithCapture: !e.passiveListener || {
                    passive: !1,
                    capture: !0
                }
            }
        }

        function k() {
            return "." + t.params.slideClass
        }

        function A(e) {
            const {
                passiveListener: i
            } = M(), s = k();
            t.$wrapperEl[e]("gesturestart", s, b, i), t.$wrapperEl[e]("gesturechange", s, w, i), t.$wrapperEl[e]("gestureend", s, x, i)
        }

        function P() {
            o || (o = !0, A("on"))
        }

        function O() {
            o && (o = !1, A("off"))
        }

        function L() {
            const e = t.zoom;
            if (e.enabled) return;
            e.enabled = !0;
            const i = t.support,
                {
                    passiveListener: s,
                    activeListenerWithCapture: n
                } = M(),
                r = k();
            i.gestures ? (t.$wrapperEl.on(t.touchEvents.start, P, s), t.$wrapperEl.on(t.touchEvents.end, O, s)) : "touchstart" === t.touchEvents.start && (t.$wrapperEl.on(t.touchEvents.start, r, b, s), t.$wrapperEl.on(t.touchEvents.move, r, w, n), t.$wrapperEl.on(t.touchEvents.end, r, x, s), t.touchEvents.cancel && t.$wrapperEl.on(t.touchEvents.cancel, r, x, s)), t.$wrapperEl.on(t.touchEvents.move, "." + t.params.zoom.containerClass, _, n)
        }

        function $() {
            const e = t.zoom;
            if (!e.enabled) return;
            const i = t.support;
            e.enabled = !1;
            const {
                passiveListener: s,
                activeListenerWithCapture: n
            } = M(), r = k();
            i.gestures ? (t.$wrapperEl.off(t.touchEvents.start, P, s), t.$wrapperEl.off(t.touchEvents.end, O, s)) : "touchstart" === t.touchEvents.start && (t.$wrapperEl.off(t.touchEvents.start, r, b, s), t.$wrapperEl.off(t.touchEvents.move, r, w, n), t.$wrapperEl.off(t.touchEvents.end, r, x, s), t.touchEvents.cancel && t.$wrapperEl.off(t.touchEvents.cancel, r, x, s)), t.$wrapperEl.off(t.touchEvents.move, "." + t.params.zoom.containerClass, _, n)
        }
        Object.defineProperty(t.zoom, "scale", {
            get: () => v,
            set(e) {
                if (v !== e) {
                    const t = f.$imageEl ? f.$imageEl[0] : void 0,
                        i = f.$slideEl ? f.$slideEl[0] : void 0;
                    n("zoomChange", e, t, i)
                }
                v = e
            }
        }), s("init", () => {
            t.params.zoom.enabled && L()
        }), s("destroy", () => {
            $()
        }), s("touchStart", (e, i) => {
            t.zoom.enabled && function(e) {
                const i = t.device;
                f.$imageEl && 0 !== f.$imageEl.length && (m.isTouched || (i.android && e.cancelable && e.preventDefault(), m.isTouched = !0, m.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, m.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY))
            }(i)
        }), s("touchEnd", (e, i) => {
            t.zoom.enabled && function() {
                const e = t.zoom;
                if (!f.$imageEl || 0 === f.$imageEl.length) return;
                if (!m.isTouched || !m.isMoved) return m.isTouched = !1, void(m.isMoved = !1);
                m.isTouched = !1, m.isMoved = !1;
                let i = 300,
                    s = 300;
                const n = g.x * i,
                    r = m.currentX + n,
                    a = g.y * s,
                    o = m.currentY + a;
                0 !== g.x && (i = Math.abs((r - m.currentX) / g.x)), 0 !== g.y && (s = Math.abs((o - m.currentY) / g.y));
                const l = Math.max(i, s);
                m.currentX = r, m.currentY = o;
                const d = m.width * e.scale,
                    c = m.height * e.scale;
                m.minX = Math.min(f.slideWidth / 2 - d / 2, 0), m.maxX = -m.minX, m.minY = Math.min(f.slideHeight / 2 - c / 2, 0), m.maxY = -m.minY, m.currentX = Math.max(Math.min(m.currentX, m.maxX), m.minX), m.currentY = Math.max(Math.min(m.currentY, m.maxY), m.minY), f.$imageWrapEl.transition(l).transform(`translate3d(${m.currentX}px, ${m.currentY}px,0)`)
            }()
        }), s("doubleTap", (e, i) => {
            !t.animating && t.params.zoom.enabled && t.zoom.enabled && t.params.zoom.toggle && S(i)
        }), s("transitionEnd", () => {
            t.zoom.enabled && t.params.zoom.enabled && E()
        }), s("slideChange", () => {
            t.zoom.enabled && t.params.zoom.enabled && t.params.cssMode && E()
        }), Object.assign(t.zoom, {
            enable: L,
            disable: $,
            in: T,
            out: C,
            toggle: S
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: i,
            on: s,
            emit: n
        } = e;
        i({
            lazy: {
                checkInView: !1,
                enabled: !1,
                loadPrevNext: !1,
                loadPrevNextAmount: 1,
                loadOnTransitionStart: !1,
                scrollingElement: "",
                elementClass: "swiper-lazy",
                loadingClass: "swiper-lazy-loading",
                loadedClass: "swiper-lazy-loaded",
                preloaderClass: "swiper-lazy-preloader"
            }
        }), t.lazy = {};
        let a = !1,
            o = !1;

        function l(e, i) {
            void 0 === i && (i = !0);
            const s = t.params.lazy;
            if (void 0 === e) return;
            if (0 === t.slides.length) return;
            const r = t.virtual && t.params.virtual.enabled ? t.$wrapperEl.children(`.${t.params.slideClass}[data-swiper-slide-index="${e}"]`) : t.slides.eq(e),
                a = r.find(`.${s.elementClass}:not(.${s.loadedClass}):not(.${s.loadingClass})`);
            !r.hasClass(s.elementClass) || r.hasClass(s.loadedClass) || r.hasClass(s.loadingClass) || a.push(r[0]), 0 !== a.length && a.each(e => {
                const a = d(e);
                a.addClass(s.loadingClass);
                const o = a.attr("data-background"),
                    c = a.attr("data-src"),
                    u = a.attr("data-srcset"),
                    h = a.attr("data-sizes"),
                    p = a.parent("picture");
                t.loadImage(a[0], c || o, u, h, !1, () => {
                    if (null != t && t && (!t || t.params) && !t.destroyed) {
                        if (o ? (a.css("background-image", `url("${o}")`), a.removeAttr("data-background")) : (u && (a.attr("srcset", u), a.removeAttr("data-srcset")), h && (a.attr("sizes", h), a.removeAttr("data-sizes")), p.length && p.children("source").each(e => {
                                const t = d(e);
                                t.attr("data-srcset") && (t.attr("srcset", t.attr("data-srcset")), t.removeAttr("data-srcset"))
                            }), c && (a.attr("src", c), a.removeAttr("data-src"))), a.addClass(s.loadedClass).removeClass(s.loadingClass), r.find("." + s.preloaderClass).remove(), t.params.loop && i) {
                            const e = r.attr("data-swiper-slide-index");
                            r.hasClass(t.params.slideDuplicateClass) ? l(t.$wrapperEl.children(`[data-swiper-slide-index="${e}"]:not(.${t.params.slideDuplicateClass})`).index(), !1) : l(t.$wrapperEl.children(`.${t.params.slideDuplicateClass}[data-swiper-slide-index="${e}"]`).index(), !1)
                        }
                        n("lazyImageReady", r[0], a[0]), t.params.autoHeight && t.updateAutoHeight()
                    }
                }), n("lazyImageLoad", r[0], a[0])
            })
        }

        function c() {
            const {
                $wrapperEl: e,
                params: i,
                slides: s,
                activeIndex: n
            } = t, r = t.virtual && i.virtual.enabled, a = i.lazy;
            let c = i.slidesPerView;

            function u(t) {
                if (r) {
                    if (e.children(`.${i.slideClass}[data-swiper-slide-index="${t}"]`).length) return !0
                } else if (s[t]) return !0;
                return !1
            }

            function h(e) {
                return r ? d(e).attr("data-swiper-slide-index") : d(e).index()
            }
            if ("auto" === c && (c = 0), o || (o = !0), t.params.watchSlidesProgress) e.children("." + i.slideVisibleClass).each(e => {
                l(r ? d(e).attr("data-swiper-slide-index") : d(e).index())
            });
            else if (c > 1)
                for (let e = n; e < n + c; e += 1) u(e) && l(e);
            else l(n);
            if (a.loadPrevNext)
                if (c > 1 || a.loadPrevNextAmount && a.loadPrevNextAmount > 1) {
                    const e = a.loadPrevNextAmount,
                        t = Math.ceil(c),
                        i = Math.min(n + t + Math.max(e, t), s.length),
                        r = Math.max(n - Math.max(t, e), 0);
                    for (let e = n + t; e < i; e += 1) u(e) && l(e);
                    for (let e = r; e < n; e += 1) u(e) && l(e)
                } else {
                    const t = e.children("." + i.slideNextClass);
                    t.length > 0 && l(h(t));
                    const s = e.children("." + i.slidePrevClass);
                    s.length > 0 && l(h(s))
                }
        }

        function u() {
            const e = r();
            if (!t || t.destroyed) return;
            const i = t.params.lazy.scrollingElement ? d(t.params.lazy.scrollingElement) : d(e),
                s = i[0] === e,
                n = s ? e.innerWidth : i[0].offsetWidth,
                o = s ? e.innerHeight : i[0].offsetHeight,
                l = t.$el.offset(),
                {
                    rtlTranslate: h
                } = t;
            let p = !1;
            h && (l.left -= t.$el[0].scrollLeft);
            const f = [
                [l.left, l.top],
                [l.left + t.width, l.top],
                [l.left, l.top + t.height],
                [l.left + t.width, l.top + t.height]
            ];
            for (let e = 0; e < f.length; e += 1) {
                const t = f[e];
                if (t[0] >= 0 && t[0] <= n && t[1] >= 0 && t[1] <= o) {
                    if (0 === t[0] && 0 === t[1]) continue;
                    p = !0
                }
            }
            const m = !("touchstart" !== t.touchEvents.start || !t.support.passiveListener || !t.params.passiveListeners) && {
                passive: !0,
                capture: !1
            };
            p ? (c(), i.off("scroll", u, m)) : a || (a = !0, i.on("scroll", u, m))
        }
        s("beforeInit", () => {
            t.params.lazy.enabled && t.params.preloadImages && (t.params.preloadImages = !1)
        }), s("init", () => {
            t.params.lazy.enabled && (t.params.lazy.checkInView ? u() : c())
        }), s("scroll", () => {
            t.params.freeMode && t.params.freeMode.enabled && !t.params.freeMode.sticky && c()
        }), s("scrollbarDragMove resize _freeModeNoMomentumRelease", () => {
            t.params.lazy.enabled && (t.params.lazy.checkInView ? u() : c())
        }), s("transitionStart", () => {
            t.params.lazy.enabled && (t.params.lazy.loadOnTransitionStart || !t.params.lazy.loadOnTransitionStart && !o) && (t.params.lazy.checkInView ? u() : c())
        }), s("transitionEnd", () => {
            t.params.lazy.enabled && !t.params.lazy.loadOnTransitionStart && (t.params.lazy.checkInView ? u() : c())
        }), s("slideChange", () => {
            const {
                lazy: e,
                cssMode: i,
                watchSlidesProgress: s,
                touchReleaseOnEdges: n,
                resistanceRatio: r
            } = t.params;
            e.enabled && (i || s && (n || 0 === r)) && c()
        }), s("destroy", () => {
            t.$el && t.$el.find("." + t.params.lazy.loadingClass).removeClass(t.params.lazy.loadingClass)
        }), Object.assign(t.lazy, {
            load: c,
            loadInSlide: l
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: i,
            on: s
        } = e;

        function n(e, t) {
            const i = function() {
                let e, t, i;
                return (s, n) => {
                    for (t = -1, e = s.length; e - t > 1;) i = e + t >> 1, s[i] <= n ? t = i : e = i;
                    return e
                }
            }();
            let s, n;
            return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function(e) {
                return e ? (n = i(this.x, e), s = n - 1, (e - this.x[s]) * (this.y[n] - this.y[s]) / (this.x[n] - this.x[s]) + this.y[s]) : 0
            }, this
        }

        function r() {
            t.controller.control && t.controller.spline && (t.controller.spline = void 0, delete t.controller.spline)
        }
        i({
            controller: {
                control: void 0,
                inverse: !1,
                by: "slide"
            }
        }), t.controller = {
            control: void 0
        }, s("beforeInit", () => {
            t.controller.control = t.params.controller.control
        }), s("update", () => {
            r()
        }), s("resize", () => {
            r()
        }), s("observerUpdate", () => {
            r()
        }), s("setTranslate", (e, i, s) => {
            t.controller.control && t.controller.setTranslate(i, s)
        }), s("setTransition", (e, i, s) => {
            t.controller.control && t.controller.setTransition(i, s)
        }), Object.assign(t.controller, {
            setTranslate: function(e, i) {
                const s = t.controller.control;
                let r, a;
                const o = t.constructor;

                function l(e) {
                    const i = t.rtlTranslate ? -t.translate : t.translate;
                    "slide" === t.params.controller.by && (function(e) {
                        t.controller.spline || (t.controller.spline = t.params.loop ? new n(t.slidesGrid, e.slidesGrid) : new n(t.snapGrid, e.snapGrid))
                    }(e), a = -t.controller.spline.interpolate(-i)), a && "container" !== t.params.controller.by || (r = (e.maxTranslate() - e.minTranslate()) / (t.maxTranslate() - t.minTranslate()), a = (i - t.minTranslate()) * r + e.minTranslate()), t.params.controller.inverse && (a = e.maxTranslate() - a), e.updateProgress(a), e.setTranslate(a, t), e.updateActiveIndex(), e.updateSlidesClasses()
                }
                if (Array.isArray(s))
                    for (let e = 0; e < s.length; e += 1) s[e] !== i && s[e] instanceof o && l(s[e]);
                else s instanceof o && i !== s && l(s)
            },
            setTransition: function(e, i) {
                const s = t.constructor,
                    n = t.controller.control;
                let r;

                function a(i) {
                    i.setTransition(e, t), 0 !== e && (i.transitionStart(), i.params.autoHeight && u(() => {
                        i.updateAutoHeight()
                    }), i.$wrapperEl.transitionEnd(() => {
                        n && (i.params.loop && "slide" === t.params.controller.by && i.loopFix(), i.transitionEnd())
                    }))
                }
                if (Array.isArray(n))
                    for (r = 0; r < n.length; r += 1) n[r] !== i && n[r] instanceof s && a(n[r]);
                else n instanceof s && i !== n && a(n)
            }
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: i,
            on: s
        } = e;
        i({
            a11y: {
                enabled: !0,
                notificationClass: "swiper-notification",
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
                firstSlideMessage: "This is the first slide",
                lastSlideMessage: "This is the last slide",
                paginationBulletMessage: "Go to slide {{index}}",
                slideLabelMessage: "{{index}} / {{slidesLength}}",
                containerMessage: null,
                containerRoleDescriptionMessage: null,
                itemRoleDescriptionMessage: null,
                slideRole: "group",
                id: null
            }
        }), t.a11y = {
            clicked: !1
        };
        let n = null;

        function r(e) {
            const t = n;
            0 !== t.length && (t.html(""), t.html(e))
        }

        function a(e) {
            e.attr("tabIndex", "0")
        }

        function o(e) {
            e.attr("tabIndex", "-1")
        }

        function l(e, t) {
            e.attr("role", t)
        }

        function c(e, t) {
            e.attr("aria-roledescription", t)
        }

        function u(e, t) {
            e.attr("aria-label", t)
        }

        function h(e) {
            e.attr("aria-disabled", !0)
        }

        function p(e) {
            e.attr("aria-disabled", !1)
        }

        function f(e) {
            if (13 !== e.keyCode && 32 !== e.keyCode) return;
            const i = t.params.a11y,
                s = d(e.target);
            t.navigation && t.navigation.$nextEl && s.is(t.navigation.$nextEl) && (t.isEnd && !t.params.loop || t.slideNext(), t.isEnd ? r(i.lastSlideMessage) : r(i.nextSlideMessage)), t.navigation && t.navigation.$prevEl && s.is(t.navigation.$prevEl) && (t.isBeginning && !t.params.loop || t.slidePrev(), t.isBeginning ? r(i.firstSlideMessage) : r(i.prevSlideMessage)), t.pagination && s.is(W(t.params.pagination.bulletClass)) && s[0].click()
        }

        function m() {
            return t.pagination && t.pagination.bullets && t.pagination.bullets.length
        }

        function g() {
            return m() && t.params.pagination.clickable
        }
        const v = (e, t, i) => {
                a(e), "BUTTON" !== e[0].tagName && (l(e, "button"), e.on("keydown", f)), u(e, i),
                    function(e, t) {
                        e.attr("aria-controls", t)
                    }(e, t)
            },
            y = () => {
                t.a11y.clicked = !0
            },
            b = () => {
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        t.destroyed || (t.a11y.clicked = !1)
                    })
                })
            },
            w = e => {
                if (t.a11y.clicked) return;
                const i = e.target.closest("." + t.params.slideClass);
                if (!i || !t.slides.includes(i)) return;
                const s = t.slides.indexOf(i) === t.activeIndex,
                    n = t.params.watchSlidesProgress && t.visibleSlides && t.visibleSlides.includes(i);
                s || n || e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents || (t.isHorizontal() ? t.el.scrollLeft = 0 : t.el.scrollTop = 0, t.slideTo(t.slides.indexOf(i), 0))
            },
            x = () => {
                const e = t.params.a11y;
                e.itemRoleDescriptionMessage && c(d(t.slides), e.itemRoleDescriptionMessage), e.slideRole && l(d(t.slides), e.slideRole);
                const i = t.params.loop ? t.slides.filter(e => !e.classList.contains(t.params.slideDuplicateClass)).length : t.slides.length;
                e.slideLabelMessage && t.slides.each((s, n) => {
                    const r = d(s),
                        a = t.params.loop ? parseInt(r.attr("data-swiper-slide-index"), 10) : n;
                    u(r, e.slideLabelMessage.replace(/\{\{index\}\}/, a + 1).replace(/\{\{slidesLength\}\}/, i))
                })
            };
        s("beforeInit", () => {
            n = d(`<span class="${t.params.a11y.notificationClass}" aria-live="assertive" aria-atomic="true"></span>`)
        }), s("afterInit", () => {
            t.params.a11y.enabled && (() => {
                const e = t.params.a11y;
                t.$el.append(n);
                const i = t.$el;
                e.containerRoleDescriptionMessage && c(i, e.containerRoleDescriptionMessage), e.containerMessage && u(i, e.containerMessage);
                const s = t.$wrapperEl,
                    r = e.id || s.attr("id") || "swiper-wrapper-" + (void 0 === (a = 16) && (a = 16), "x".repeat(a).replace(/x/g, () => Math.round(16 * Math.random()).toString(16)));
                var a;
                const o = t.params.autoplay && t.params.autoplay.enabled ? "off" : "polite";
                var l;
                let d, h;
                l = r, s.attr("id", l),
                    function(e, t) {
                        e.attr("aria-live", t)
                    }(s, o), x(), t.navigation && t.navigation.$nextEl && (d = t.navigation.$nextEl), t.navigation && t.navigation.$prevEl && (h = t.navigation.$prevEl), d && d.length && v(d, r, e.nextSlideMessage), h && h.length && v(h, r, e.prevSlideMessage), g() && t.pagination.$el.on("keydown", W(t.params.pagination.bulletClass), f), t.$el.on("focus", w, !0), t.$el.on("pointerdown", y, !0), t.$el.on("pointerup", b, !0)
            })()
        }), s("slidesLengthChange snapGridLengthChange slidesGridLengthChange", () => {
            t.params.a11y.enabled && x()
        }), s("fromEdge toEdge afterInit lock unlock", () => {
            t.params.a11y.enabled && function() {
                if (t.params.loop || t.params.rewind || !t.navigation) return;
                const {
                    $nextEl: e,
                    $prevEl: i
                } = t.navigation;
                i && i.length > 0 && (t.isBeginning ? (h(i), o(i)) : (p(i), a(i))), e && e.length > 0 && (t.isEnd ? (h(e), o(e)) : (p(e), a(e)))
            }()
        }), s("paginationUpdate", () => {
            t.params.a11y.enabled && function() {
                const e = t.params.a11y;
                m() && t.pagination.bullets.each(i => {
                    const s = d(i);
                    t.params.pagination.clickable && (a(s), t.params.pagination.renderBullet || (l(s, "button"), u(s, e.paginationBulletMessage.replace(/\{\{index\}\}/, s.index() + 1)))), s.is("." + t.params.pagination.bulletActiveClass) ? s.attr("aria-current", "true") : s.removeAttr("aria-current")
                })
            }()
        }), s("destroy", () => {
            t.params.a11y.enabled && function() {
                let e, i;
                n && n.length > 0 && n.remove(), t.navigation && t.navigation.$nextEl && (e = t.navigation.$nextEl), t.navigation && t.navigation.$prevEl && (i = t.navigation.$prevEl), e && e.off("keydown", f), i && i.off("keydown", f), g() && t.pagination.$el.off("keydown", W(t.params.pagination.bulletClass), f), t.$el.off("focus", w, !0), t.$el.off("pointerdown", y, !0), t.$el.off("pointerup", b, !0)
            }()
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: i,
            on: s
        } = e;
        i({
            history: {
                enabled: !1,
                root: "",
                replaceState: !1,
                key: "slides",
                keepQuery: !1
            }
        });
        let n = !1,
            a = {};
        const o = e => e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, ""),
            l = e => {
                const t = r();
                let i;
                i = e ? new URL(e) : t.location;
                const s = i.pathname.slice(1).split("/").filter(e => "" !== e),
                    n = s.length;
                return {
                    key: s[n - 2],
                    value: s[n - 1]
                }
            },
            d = (e, i) => {
                const s = r();
                if (!n || !t.params.history.enabled) return;
                let a;
                a = t.params.url ? new URL(t.params.url) : s.location;
                const l = t.slides.eq(i);
                let d = o(l.attr("data-history"));
                if (t.params.history.root.length > 0) {
                    let i = t.params.history.root;
                    "/" === i[i.length - 1] && (i = i.slice(0, i.length - 1)), d = `${i}/${e}/${d}`
                } else a.pathname.includes(e) || (d = `${e}/${d}`);
                t.params.history.keepQuery && (d += a.search);
                const c = s.history.state;
                c && c.value === d || (t.params.history.replaceState ? s.history.replaceState({
                    value: d
                }, null, d) : s.history.pushState({
                    value: d
                }, null, d))
            },
            c = (e, i, s) => {
                if (i)
                    for (let n = 0, r = t.slides.length; n < r; n += 1) {
                        const r = t.slides.eq(n);
                        if (o(r.attr("data-history")) === i && !r.hasClass(t.params.slideDuplicateClass)) {
                            const i = r.index();
                            t.slideTo(i, e, s)
                        }
                    } else t.slideTo(0, e, s)
            },
            u = () => {
                a = l(t.params.url), c(t.params.speed, a.value, !1)
            };
        s("init", () => {
            t.params.history.enabled && (() => {
                const e = r();
                if (t.params.history) {
                    if (!e.history || !e.history.pushState) return t.params.history.enabled = !1, void(t.params.hashNavigation.enabled = !0);
                    n = !0, a = l(t.params.url), (a.key || a.value) && (c(0, a.value, t.params.runCallbacksOnInit), t.params.history.replaceState || e.addEventListener("popstate", u))
                }
            })()
        }), s("destroy", () => {
            t.params.history.enabled && (() => {
                const e = r();
                t.params.history.replaceState || e.removeEventListener("popstate", u)
            })()
        }), s("transitionEnd _freeModeNoMomentumRelease", () => {
            n && d(t.params.history.key, t.activeIndex)
        }), s("slideChange", () => {
            n && t.params.cssMode && d(t.params.history.key, t.activeIndex)
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: i,
            emit: n,
            on: a
        } = e, o = !1;
        const l = s(),
            c = r();
        i({
            hashNavigation: {
                enabled: !1,
                replaceState: !1,
                watchState: !1
            }
        });
        const u = () => {
                n("hashChange");
                const e = l.location.hash.replace("#", "");
                if (e !== t.slides.eq(t.activeIndex).attr("data-hash")) {
                    const i = t.$wrapperEl.children(`.${t.params.slideClass}[data-hash="${e}"]`).index();
                    if (void 0 === i) return;
                    t.slideTo(i)
                }
            },
            h = () => {
                if (o && t.params.hashNavigation.enabled)
                    if (t.params.hashNavigation.replaceState && c.history && c.history.replaceState) c.history.replaceState(null, null, "#" + t.slides.eq(t.activeIndex).attr("data-hash") || ""), n("hashSet");
                    else {
                        const e = t.slides.eq(t.activeIndex),
                            i = e.attr("data-hash") || e.attr("data-history");
                        l.location.hash = i || "", n("hashSet")
                    }
            };
        a("init", () => {
            t.params.hashNavigation.enabled && (() => {
                if (!t.params.hashNavigation.enabled || t.params.history && t.params.history.enabled) return;
                o = !0;
                const e = l.location.hash.replace("#", "");
                if (e) {
                    const i = 0;
                    for (let s = 0, n = t.slides.length; s < n; s += 1) {
                        const n = t.slides.eq(s);
                        if ((n.attr("data-hash") || n.attr("data-history")) === e && !n.hasClass(t.params.slideDuplicateClass)) {
                            const e = n.index();
                            t.slideTo(e, i, t.params.runCallbacksOnInit, !0)
                        }
                    }
                }
                t.params.hashNavigation.watchState && d(c).on("hashchange", u)
            })()
        }), a("destroy", () => {
            t.params.hashNavigation.enabled && t.params.hashNavigation.watchState && d(c).off("hashchange", u)
        }), a("transitionEnd _freeModeNoMomentumRelease", () => {
            o && h()
        }), a("slideChange", () => {
            o && t.params.cssMode && h()
        })
    }, function(e) {
        let t, {
            swiper: i,
            extendParams: n,
            on: r,
            emit: a
        } = e;

        function o() {
            if (!i.size) return i.autoplay.running = !1, void(i.autoplay.paused = !1);
            const e = i.slides.eq(i.activeIndex);
            let s = i.params.autoplay.delay;
            e.attr("data-swiper-autoplay") && (s = e.attr("data-swiper-autoplay") || i.params.autoplay.delay), clearTimeout(t), t = u(() => {
                let e;
                i.params.autoplay.reverseDirection ? i.params.loop ? (i.loopFix(), e = i.slidePrev(i.params.speed, !0, !0), a("autoplay")) : i.isBeginning ? i.params.autoplay.stopOnLastSlide ? d() : (e = i.slideTo(i.slides.length - 1, i.params.speed, !0, !0), a("autoplay")) : (e = i.slidePrev(i.params.speed, !0, !0), a("autoplay")) : i.params.loop ? (i.loopFix(), e = i.slideNext(i.params.speed, !0, !0), a("autoplay")) : i.isEnd ? i.params.autoplay.stopOnLastSlide ? d() : (e = i.slideTo(0, i.params.speed, !0, !0), a("autoplay")) : (e = i.slideNext(i.params.speed, !0, !0), a("autoplay")), (i.params.cssMode && i.autoplay.running || !1 === e) && o()
            }, s)
        }

        function l() {
            return void 0 === t && !i.autoplay.running && (i.autoplay.running = !0, a("autoplayStart"), o(), !0)
        }

        function d() {
            return !!i.autoplay.running && void 0 !== t && (t && (clearTimeout(t), t = void 0), i.autoplay.running = !1, a("autoplayStop"), !0)
        }

        function c(e) {
            i.autoplay.running && (i.autoplay.paused || (t && clearTimeout(t), i.autoplay.paused = !0, 0 !== e && i.params.autoplay.waitForTransition ? ["transitionend", "webkitTransitionEnd"].forEach(e => {
                i.$wrapperEl[0].addEventListener(e, p)
            }) : (i.autoplay.paused = !1, o())))
        }

        function h() {
            const e = s();
            "hidden" === e.visibilityState && i.autoplay.running && c(), "visible" === e.visibilityState && i.autoplay.paused && (o(), i.autoplay.paused = !1)
        }

        function p(e) {
            i && !i.destroyed && i.$wrapperEl && e.target === i.$wrapperEl[0] && (["transitionend", "webkitTransitionEnd"].forEach(e => {
                i.$wrapperEl[0].removeEventListener(e, p)
            }), i.autoplay.paused = !1, i.autoplay.running ? o() : d())
        }

        function f() {
            i.params.autoplay.disableOnInteraction ? d() : (a("autoplayPause"), c()), ["transitionend", "webkitTransitionEnd"].forEach(e => {
                i.$wrapperEl[0].removeEventListener(e, p)
            })
        }

        function m() {
            i.params.autoplay.disableOnInteraction || (i.autoplay.paused = !1, a("autoplayResume"), o())
        }
        i.autoplay = {
            running: !1,
            paused: !1
        }, n({
            autoplay: {
                enabled: !1,
                delay: 3e3,
                waitForTransition: !0,
                disableOnInteraction: !0,
                stopOnLastSlide: !1,
                reverseDirection: !1,
                pauseOnMouseEnter: !1
            }
        }), r("init", () => {
            i.params.autoplay.enabled && (l(), s().addEventListener("visibilitychange", h), i.params.autoplay.pauseOnMouseEnter && (i.$el.on("mouseenter", f), i.$el.on("mouseleave", m)))
        }), r("beforeTransitionStart", (e, t, s) => {
            i.autoplay.running && (s || !i.params.autoplay.disableOnInteraction ? i.autoplay.pause(t) : d())
        }), r("sliderFirstMove", () => {
            i.autoplay.running && (i.params.autoplay.disableOnInteraction ? d() : c())
        }), r("touchEnd", () => {
            i.params.cssMode && i.autoplay.paused && !i.params.autoplay.disableOnInteraction && o()
        }), r("destroy", () => {
            i.$el.off("mouseenter", f), i.$el.off("mouseleave", m), i.autoplay.running && d(), s().removeEventListener("visibilitychange", h)
        }), Object.assign(i.autoplay, {
            pause: c,
            run: o,
            start: l,
            stop: d
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: i,
            on: s
        } = e;
        i({
            thumbs: {
                swiper: null,
                multipleActiveThumbs: !0,
                autoScrollOffset: 0,
                slideThumbActiveClass: "swiper-slide-thumb-active",
                thumbsContainerClass: "swiper-thumbs"
            }
        });
        let n = !1,
            r = !1;

        function a() {
            const e = t.thumbs.swiper;
            if (!e || e.destroyed) return;
            const i = e.clickedIndex,
                s = e.clickedSlide;
            if (s && d(s).hasClass(t.params.thumbs.slideThumbActiveClass)) return;
            if (null == i) return;
            let n;
            if (n = e.params.loop ? parseInt(d(e.clickedSlide).attr("data-swiper-slide-index"), 10) : i, t.params.loop) {
                let e = t.activeIndex;
                t.slides.eq(e).hasClass(t.params.slideDuplicateClass) && (t.loopFix(), t._clientLeft = t.$wrapperEl[0].clientLeft, e = t.activeIndex);
                const i = t.slides.eq(e).prevAll(`[data-swiper-slide-index="${n}"]`).eq(0).index(),
                    s = t.slides.eq(e).nextAll(`[data-swiper-slide-index="${n}"]`).eq(0).index();
                n = void 0 === i ? s : void 0 === s ? i : s - e < e - i ? s : i
            }
            t.slideTo(n)
        }

        function o() {
            const {
                thumbs: e
            } = t.params;
            if (n) return !1;
            n = !0;
            const i = t.constructor;
            if (e.swiper instanceof i) t.thumbs.swiper = e.swiper, Object.assign(t.thumbs.swiper.originalParams, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            }), Object.assign(t.thumbs.swiper.params, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            });
            else if (f(e.swiper)) {
                const s = Object.assign({}, e.swiper);
                Object.assign(s, {
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                }), t.thumbs.swiper = new i(s), r = !0
            }
            return t.thumbs.swiper.$el.addClass(t.params.thumbs.thumbsContainerClass), t.thumbs.swiper.on("tap", a), !0
        }

        function l(e) {
            const i = t.thumbs.swiper;
            if (!i || i.destroyed) return;
            const s = "auto" === i.params.slidesPerView ? i.slidesPerViewDynamic() : i.params.slidesPerView;
            let n = 1;
            const r = t.params.thumbs.slideThumbActiveClass;
            if (t.params.slidesPerView > 1 && !t.params.centeredSlides && (n = t.params.slidesPerView), t.params.thumbs.multipleActiveThumbs || (n = 1), n = Math.floor(n), i.slides.removeClass(r), i.params.loop || i.params.virtual && i.params.virtual.enabled)
                for (let e = 0; e < n; e += 1) i.$wrapperEl.children(`[data-swiper-slide-index="${t.realIndex+e}"]`).addClass(r);
            else
                for (let e = 0; e < n; e += 1) i.slides.eq(t.realIndex + e).addClass(r);
            const a = t.params.thumbs.autoScrollOffset,
                o = a && !i.params.loop;
            if (t.realIndex !== i.realIndex || o) {
                let n, r, l = i.activeIndex;
                if (i.params.loop) {
                    i.slides.eq(l).hasClass(i.params.slideDuplicateClass) && (i.loopFix(), i._clientLeft = i.$wrapperEl[0].clientLeft, l = i.activeIndex);
                    const e = i.slides.eq(l).prevAll(`[data-swiper-slide-index="${t.realIndex}"]`).eq(0).index(),
                        s = i.slides.eq(l).nextAll(`[data-swiper-slide-index="${t.realIndex}"]`).eq(0).index();
                    n = void 0 === e ? s : void 0 === s ? e : s - l == l - e ? i.params.slidesPerGroup > 1 ? s : l : s - l < l - e ? s : e, r = t.activeIndex > t.previousIndex ? "next" : "prev"
                } else n = t.realIndex, r = n > t.previousIndex ? "next" : "prev";
                o && (n += "next" === r ? a : -1 * a), i.visibleSlidesIndexes && i.visibleSlidesIndexes.indexOf(n) < 0 && (i.params.centeredSlides ? n = n > l ? n - Math.floor(s / 2) + 1 : n + Math.floor(s / 2) - 1 : n > l && i.params.slidesPerGroup, i.slideTo(n, e ? 0 : void 0))
            }
        }
        t.thumbs = {
            swiper: null
        }, s("beforeInit", () => {
            const {
                thumbs: e
            } = t.params;
            e && e.swiper && (o(), l(!0))
        }), s("slideChange update resize observerUpdate", () => {
            l()
        }), s("setTransition", (e, i) => {
            const s = t.thumbs.swiper;
            s && !s.destroyed && s.setTransition(i)
        }), s("beforeDestroy", () => {
            const e = t.thumbs.swiper;
            e && !e.destroyed && r && e.destroy()
        }), Object.assign(t.thumbs, {
            init: o,
            update: l
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: i,
            emit: s,
            once: n
        } = e;
        i({
            freeMode: {
                enabled: !1,
                momentum: !0,
                momentumRatio: 1,
                momentumBounce: !0,
                momentumBounceRatio: 1,
                momentumVelocityRatio: 1,
                sticky: !1,
                minimumVelocity: .02
            }
        }), Object.assign(t, {
            freeMode: {
                onTouchStart: function() {
                    const e = t.getTranslate();
                    t.setTranslate(e), t.setTransition(0), t.touchEventsData.velocities.length = 0, t.freeMode.onTouchEnd({
                        currentPos: t.rtl ? t.translate : -t.translate
                    })
                },
                onTouchMove: function() {
                    const {
                        touchEventsData: e,
                        touches: i
                    } = t;
                    0 === e.velocities.length && e.velocities.push({
                        position: i[t.isHorizontal() ? "startX" : "startY"],
                        time: e.touchStartTime
                    }), e.velocities.push({
                        position: i[t.isHorizontal() ? "currentX" : "currentY"],
                        time: h()
                    })
                },
                onTouchEnd: function(e) {
                    let {
                        currentPos: i
                    } = e;
                    const {
                        params: r,
                        $wrapperEl: a,
                        rtlTranslate: o,
                        snapGrid: l,
                        touchEventsData: d
                    } = t, c = h() - d.touchStartTime;
                    if (i < -t.minTranslate()) t.slideTo(t.activeIndex);
                    else if (i > -t.maxTranslate()) t.slides.length < l.length ? t.slideTo(l.length - 1) : t.slideTo(t.slides.length - 1);
                    else {
                        if (r.freeMode.momentum) {
                            if (d.velocities.length > 1) {
                                const e = d.velocities.pop(),
                                    i = d.velocities.pop(),
                                    s = e.position - i.position,
                                    n = e.time - i.time;
                                t.velocity = s / n, t.velocity /= 2, Math.abs(t.velocity) < r.freeMode.minimumVelocity && (t.velocity = 0), (n > 150 || h() - e.time > 300) && (t.velocity = 0)
                            } else t.velocity = 0;
                            t.velocity *= r.freeMode.momentumVelocityRatio, d.velocities.length = 0;
                            let e = 1e3 * r.freeMode.momentumRatio;
                            const i = t.velocity * e;
                            let c = t.translate + i;
                            o && (c = -c);
                            let u, p = !1;
                            const f = 20 * Math.abs(t.velocity) * r.freeMode.momentumBounceRatio;
                            let m;
                            if (c < t.maxTranslate()) r.freeMode.momentumBounce ? (c + t.maxTranslate() < -f && (c = t.maxTranslate() - f), u = t.maxTranslate(), p = !0, d.allowMomentumBounce = !0) : c = t.maxTranslate(), r.loop && r.centeredSlides && (m = !0);
                            else if (c > t.minTranslate()) r.freeMode.momentumBounce ? (c - t.minTranslate() > f && (c = t.minTranslate() + f), u = t.minTranslate(), p = !0, d.allowMomentumBounce = !0) : c = t.minTranslate(), r.loop && r.centeredSlides && (m = !0);
                            else if (r.freeMode.sticky) {
                                let e;
                                for (let t = 0; t < l.length; t += 1)
                                    if (l[t] > -c) {
                                        e = t;
                                        break
                                    }
                                c = Math.abs(l[e] - c) < Math.abs(l[e - 1] - c) || "next" === t.swipeDirection ? l[e] : l[e - 1], c = -c
                            }
                            if (m && n("transitionEnd", () => {
                                    t.loopFix()
                                }), 0 !== t.velocity) {
                                if (e = o ? Math.abs((-c - t.translate) / t.velocity) : Math.abs((c - t.translate) / t.velocity), r.freeMode.sticky) {
                                    const i = Math.abs((o ? -c : c) - t.translate),
                                        s = t.slidesSizesGrid[t.activeIndex];
                                    e = i < s ? r.speed : i < 2 * s ? 1.5 * r.speed : 2.5 * r.speed
                                }
                            } else if (r.freeMode.sticky) return void t.slideToClosest();
                            r.freeMode.momentumBounce && p ? (t.updateProgress(u), t.setTransition(e), t.setTranslate(c), t.transitionStart(!0, t.swipeDirection), t.animating = !0, a.transitionEnd(() => {
                                t && !t.destroyed && d.allowMomentumBounce && (s("momentumBounce"), t.setTransition(r.speed), setTimeout(() => {
                                    t.setTranslate(u), a.transitionEnd(() => {
                                        t && !t.destroyed && t.transitionEnd()
                                    })
                                }, 0))
                            })) : t.velocity ? (s("_freeModeNoMomentumRelease"), t.updateProgress(c), t.setTransition(e), t.setTranslate(c), t.transitionStart(!0, t.swipeDirection), t.animating || (t.animating = !0, a.transitionEnd(() => {
                                t && !t.destroyed && t.transitionEnd()
                            }))) : t.updateProgress(c), t.updateActiveIndex(), t.updateSlidesClasses()
                        } else {
                            if (r.freeMode.sticky) return void t.slideToClosest();
                            r.freeMode && s("_freeModeNoMomentumRelease")
                        }(!r.freeMode.momentum || c >= r.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses())
                    }
                }
            }
        })
    }, function(e) {
        let t, i, s, {
            swiper: n,
            extendParams: r
        } = e;
        r({
            grid: {
                rows: 1,
                fill: "column"
            }
        }), n.grid = {
            initSlides: e => {
                const {
                    slidesPerView: r
                } = n.params, {
                    rows: a,
                    fill: o
                } = n.params.grid;
                i = t / a, s = Math.floor(e / a), t = Math.floor(e / a) === e / a ? e : Math.ceil(e / a) * a, "auto" !== r && "row" === o && (t = Math.max(t, r * a))
            },
            updateSlide: (e, r, a, o) => {
                const {
                    slidesPerGroup: l,
                    spaceBetween: d
                } = n.params, {
                    rows: c,
                    fill: u
                } = n.params.grid;
                let h, p, f;
                if ("row" === u && l > 1) {
                    const i = Math.floor(e / (l * c)),
                        s = e - c * l * i,
                        n = 0 === i ? l : Math.min(Math.ceil((a - i * c * l) / c), l);
                    f = Math.floor(s / n), p = s - f * n + i * l, h = p + f * t / c, r.css({
                        "-webkit-order": h,
                        order: h
                    })
                } else "column" === u ? (p = Math.floor(e / c), f = e - p * c, (p > s || p === s && f === c - 1) && (f += 1, f >= c && (f = 0, p += 1))) : (f = Math.floor(e / i), p = e - f * i);
                r.css(o("margin-top"), 0 !== f ? d && d + "px" : "")
            },
            updateWrapperSize: (e, i, s) => {
                const {
                    spaceBetween: r,
                    centeredSlides: a,
                    roundLengths: o
                } = n.params, {
                    rows: l
                } = n.params.grid;
                if (n.virtualSize = (e + r) * t, n.virtualSize = Math.ceil(n.virtualSize / l) - r, n.$wrapperEl.css({
                        [s("width")]: n.virtualSize + r + "px"
                    }), a) {
                    i.splice(0, i.length);
                    const e = [];
                    for (let t = 0; t < i.length; t += 1) {
                        let s = i[t];
                        o && (s = Math.floor(s)), i[t] < n.virtualSize + i[0] && e.push(s)
                    }
                    i.push(...e)
                }
            }
        }
    }, function(e) {
        let {
            swiper: t
        } = e;
        Object.assign(t, {
            appendSlide: Y.bind(t),
            prependSlide: X.bind(t),
            addSlide: R.bind(t),
            removeSlide: F.bind(t),
            removeAllSlides: G.bind(t)
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: i,
            on: s
        } = e;
        i({
            fadeEffect: {
                crossFade: !1,
                transformEl: null
            }
        }), V({
            effect: "fade",
            swiper: t,
            on: s,
            setTranslate: () => {
                const {
                    slides: e
                } = t, i = t.params.fadeEffect;
                for (let s = 0; s < e.length; s += 1) {
                    const e = t.slides.eq(s);
                    let n = -e[0].swiperSlideOffset;
                    t.params.virtualTranslate || (n -= t.translate);
                    let r = 0;
                    t.isHorizontal() || (r = n, n = 0);
                    const a = t.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(e[0].progress), 0) : 1 + Math.min(Math.max(e[0].progress, -1), 0);
                    U(i, e).css({
                        opacity: a
                    }).transform(`translate3d(${n}px, ${r}px, 0px)`)
                }
            },
            setTransition: e => {
                const {
                    transformEl: i
                } = t.params.fadeEffect;
                (i ? t.slides.find(i) : t.slides).transition(e), Q({
                    swiper: t,
                    duration: e,
                    transformEl: i,
                    allSlides: !0
                })
            },
            overwriteParams: () => ({
                slidesPerView: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                spaceBetween: 0,
                virtualTranslate: !t.params.cssMode
            })
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: i,
            on: s
        } = e;
        i({
            cubeEffect: {
                slideShadows: !0,
                shadow: !0,
                shadowOffset: 20,
                shadowScale: .94
            }
        });
        const n = (e, t, i) => {
            let s = i ? e.find(".swiper-slide-shadow-left") : e.find(".swiper-slide-shadow-top"),
                n = i ? e.find(".swiper-slide-shadow-right") : e.find(".swiper-slide-shadow-bottom");
            0 === s.length && (s = d(`<div class="swiper-slide-shadow-${i?"left":"top"}"></div>`), e.append(s)), 0 === n.length && (n = d(`<div class="swiper-slide-shadow-${i?"right":"bottom"}"></div>`), e.append(n)), s.length && (s[0].style.opacity = Math.max(-t, 0)), n.length && (n[0].style.opacity = Math.max(t, 0))
        };
        V({
            effect: "cube",
            swiper: t,
            on: s,
            setTranslate: () => {
                const {
                    $el: e,
                    $wrapperEl: i,
                    slides: s,
                    width: r,
                    height: a,
                    rtlTranslate: o,
                    size: l,
                    browser: c
                } = t, u = t.params.cubeEffect, h = t.isHorizontal(), p = t.virtual && t.params.virtual.enabled;
                let f, m = 0;
                u.shadow && (h ? (f = i.find(".swiper-cube-shadow"), 0 === f.length && (f = d('<div class="swiper-cube-shadow"></div>'), i.append(f)), f.css({
                    height: r + "px"
                })) : (f = e.find(".swiper-cube-shadow"), 0 === f.length && (f = d('<div class="swiper-cube-shadow"></div>'), e.append(f))));
                for (let e = 0; e < s.length; e += 1) {
                    const t = s.eq(e);
                    let i = e;
                    p && (i = parseInt(t.attr("data-swiper-slide-index"), 10));
                    let r = 90 * i,
                        a = Math.floor(r / 360);
                    o && (r = -r, a = Math.floor(-r / 360));
                    const d = Math.max(Math.min(t[0].progress, 1), -1);
                    let c = 0,
                        f = 0,
                        g = 0;
                    i % 4 == 0 ? (c = 4 * -a * l, g = 0) : (i - 1) % 4 == 0 ? (c = 0, g = 4 * -a * l) : (i - 2) % 4 == 0 ? (c = l + 4 * a * l, g = l) : (i - 3) % 4 == 0 && (c = -l, g = 3 * l + 4 * l * a), o && (c = -c), h || (f = c, c = 0);
                    const v = `rotateX(${h?0:-r}deg) rotateY(${h?r:0}deg) translate3d(${c}px, ${f}px, ${g}px)`;
                    d <= 1 && d > -1 && (m = 90 * i + 90 * d, o && (m = 90 * -i - 90 * d)), t.transform(v), u.slideShadows && n(t, d, h)
                }
                if (i.css({
                        "-webkit-transform-origin": `50% 50% -${l/2}px`,
                        "transform-origin": `50% 50% -${l/2}px`
                    }), u.shadow)
                    if (h) f.transform(`translate3d(0px, ${r/2+u.shadowOffset}px, ${-r/2}px) rotateX(90deg) rotateZ(0deg) scale(${u.shadowScale})`);
                    else {
                        const e = Math.abs(m) - 90 * Math.floor(Math.abs(m) / 90),
                            t = 1.5 - (Math.sin(2 * e * Math.PI / 360) / 2 + Math.cos(2 * e * Math.PI / 360) / 2),
                            i = u.shadowScale,
                            s = u.shadowScale / t,
                            n = u.shadowOffset;
                        f.transform(`scale3d(${i}, 1, ${s}) translate3d(0px, ${a/2+n}px, ${-a/2/s}px) rotateX(-90deg)`)
                    }
                const g = c.isSafari || c.isWebView ? -l / 2 : 0;
                i.transform(`translate3d(0px,0,${g}px) rotateX(${t.isHorizontal()?0:m}deg) rotateY(${t.isHorizontal()?-m:0}deg)`), i[0].style.setProperty("--swiper-cube-translate-z", g + "px")
            },
            setTransition: e => {
                const {
                    $el: i,
                    slides: s
                } = t;
                s.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), t.params.cubeEffect.shadow && !t.isHorizontal() && i.find(".swiper-cube-shadow").transition(e)
            },
            recreateShadows: () => {
                const e = t.isHorizontal();
                t.slides.each(t => {
                    const i = Math.max(Math.min(t.progress, 1), -1);
                    n(d(t), i, e)
                })
            },
            getEffectParams: () => t.params.cubeEffect,
            perspective: () => !0,
            overwriteParams: () => ({
                slidesPerView: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                resistanceRatio: 0,
                spaceBetween: 0,
                centeredSlides: !1,
                virtualTranslate: !0
            })
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: i,
            on: s
        } = e;
        i({
            flipEffect: {
                slideShadows: !0,
                limitRotation: !0,
                transformEl: null
            }
        });
        const n = (e, i, s) => {
            let n = t.isHorizontal() ? e.find(".swiper-slide-shadow-left") : e.find(".swiper-slide-shadow-top"),
                r = t.isHorizontal() ? e.find(".swiper-slide-shadow-right") : e.find(".swiper-slide-shadow-bottom");
            0 === n.length && (n = K(s, e, t.isHorizontal() ? "left" : "top")), 0 === r.length && (r = K(s, e, t.isHorizontal() ? "right" : "bottom")), n.length && (n[0].style.opacity = Math.max(-i, 0)), r.length && (r[0].style.opacity = Math.max(i, 0))
        };
        V({
            effect: "flip",
            swiper: t,
            on: s,
            setTranslate: () => {
                const {
                    slides: e,
                    rtlTranslate: i
                } = t, s = t.params.flipEffect;
                for (let r = 0; r < e.length; r += 1) {
                    const a = e.eq(r);
                    let o = a[0].progress;
                    t.params.flipEffect.limitRotation && (o = Math.max(Math.min(a[0].progress, 1), -1));
                    const l = a[0].swiperSlideOffset;
                    let d = -180 * o,
                        c = 0,
                        u = t.params.cssMode ? -l - t.translate : -l,
                        h = 0;
                    t.isHorizontal() ? i && (d = -d) : (h = u, u = 0, c = -d, d = 0), a[0].style.zIndex = -Math.abs(Math.round(o)) + e.length, s.slideShadows && n(a, o, s);
                    const p = `translate3d(${u}px, ${h}px, 0px) rotateX(${c}deg) rotateY(${d}deg)`;
                    U(s, a).transform(p)
                }
            },
            setTransition: e => {
                const {
                    transformEl: i
                } = t.params.flipEffect;
                (i ? t.slides.find(i) : t.slides).transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), Q({
                    swiper: t,
                    duration: e,
                    transformEl: i
                })
            },
            recreateShadows: () => {
                const e = t.params.flipEffect;
                t.slides.each(i => {
                    const s = d(i);
                    let r = s[0].progress;
                    t.params.flipEffect.limitRotation && (r = Math.max(Math.min(i.progress, 1), -1)), n(s, r, e)
                })
            },
            getEffectParams: () => t.params.flipEffect,
            perspective: () => !0,
            overwriteParams: () => ({
                slidesPerView: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                spaceBetween: 0,
                virtualTranslate: !t.params.cssMode
            })
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: i,
            on: s
        } = e;
        i({
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                scale: 1,
                modifier: 1,
                slideShadows: !0,
                transformEl: null
            }
        }), V({
            effect: "coverflow",
            swiper: t,
            on: s,
            setTranslate: () => {
                const {
                    width: e,
                    height: i,
                    slides: s,
                    slidesSizesGrid: n
                } = t, r = t.params.coverflowEffect, a = t.isHorizontal(), o = t.translate, l = a ? e / 2 - o : i / 2 - o, d = a ? r.rotate : -r.rotate, c = r.depth;
                for (let e = 0, t = s.length; e < t; e += 1) {
                    const t = s.eq(e),
                        i = n[e],
                        o = (l - t[0].swiperSlideOffset - i / 2) / i,
                        u = "function" == typeof r.modifier ? r.modifier(o) : o * r.modifier;
                    let h = a ? d * u : 0,
                        p = a ? 0 : d * u,
                        f = -c * Math.abs(u),
                        m = r.stretch;
                    "string" == typeof m && -1 !== m.indexOf("%") && (m = parseFloat(r.stretch) / 100 * i);
                    let g = a ? 0 : m * u,
                        v = a ? m * u : 0,
                        y = 1 - (1 - r.scale) * Math.abs(u);
                    Math.abs(v) < .001 && (v = 0), Math.abs(g) < .001 && (g = 0), Math.abs(f) < .001 && (f = 0), Math.abs(h) < .001 && (h = 0), Math.abs(p) < .001 && (p = 0), Math.abs(y) < .001 && (y = 0);
                    const b = `translate3d(${v}px,${g}px,${f}px)  rotateX(${p}deg) rotateY(${h}deg) scale(${y})`;
                    if (U(r, t).transform(b), t[0].style.zIndex = 1 - Math.abs(Math.round(u)), r.slideShadows) {
                        let e = a ? t.find(".swiper-slide-shadow-left") : t.find(".swiper-slide-shadow-top"),
                            i = a ? t.find(".swiper-slide-shadow-right") : t.find(".swiper-slide-shadow-bottom");
                        0 === e.length && (e = K(r, t, a ? "left" : "top")), 0 === i.length && (i = K(r, t, a ? "right" : "bottom")), e.length && (e[0].style.opacity = u > 0 ? u : 0), i.length && (i[0].style.opacity = -u > 0 ? -u : 0)
                    }
                }
            },
            setTransition: e => {
                const {
                    transformEl: i
                } = t.params.coverflowEffect;
                (i ? t.slides.find(i) : t.slides).transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
            },
            perspective: () => !0,
            overwriteParams: () => ({
                watchSlidesProgress: !0
            })
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: i,
            on: s
        } = e;
        i({
            creativeEffect: {
                transformEl: null,
                limitProgress: 1,
                shadowPerProgress: !1,
                progressMultiplier: 1,
                perspective: !0,
                prev: {
                    translate: [0, 0, 0],
                    rotate: [0, 0, 0],
                    opacity: 1,
                    scale: 1
                },
                next: {
                    translate: [0, 0, 0],
                    rotate: [0, 0, 0],
                    opacity: 1,
                    scale: 1
                }
            }
        });
        const n = e => "string" == typeof e ? e : e + "px";
        V({
            effect: "creative",
            swiper: t,
            on: s,
            setTranslate: () => {
                const {
                    slides: e,
                    $wrapperEl: i,
                    slidesSizesGrid: s
                } = t, r = t.params.creativeEffect, {
                    progressMultiplier: a
                } = r, o = t.params.centeredSlides;
                if (o) {
                    const e = s[0] / 2 - t.params.slidesOffsetBefore || 0;
                    i.transform(`translateX(calc(50% - ${e}px))`)
                }
                for (let i = 0; i < e.length; i += 1) {
                    const s = e.eq(i),
                        l = s[0].progress,
                        d = Math.min(Math.max(s[0].progress, -r.limitProgress), r.limitProgress);
                    let c = d;
                    o || (c = Math.min(Math.max(s[0].originalProgress, -r.limitProgress), r.limitProgress));
                    const u = s[0].swiperSlideOffset,
                        h = [t.params.cssMode ? -u - t.translate : -u, 0, 0],
                        p = [0, 0, 0];
                    let f = !1;
                    t.isHorizontal() || (h[1] = h[0], h[0] = 0);
                    let m = {
                        translate: [0, 0, 0],
                        rotate: [0, 0, 0],
                        scale: 1,
                        opacity: 1
                    };
                    d < 0 ? (m = r.next, f = !0) : d > 0 && (m = r.prev, f = !0), h.forEach((e, t) => {
                        h[t] = `calc(${e}px + (${n(m.translate[t])} * ${Math.abs(d*a)}))`
                    }), p.forEach((e, t) => {
                        p[t] = m.rotate[t] * Math.abs(d * a)
                    }), s[0].style.zIndex = -Math.abs(Math.round(l)) + e.length;
                    const g = h.join(", "),
                        v = `rotateX(${p[0]}deg) rotateY(${p[1]}deg) rotateZ(${p[2]}deg)`,
                        y = c < 0 ? `scale(${1+(1-m.scale)*c*a})` : `scale(${1-(1-m.scale)*c*a})`,
                        b = c < 0 ? 1 + (1 - m.opacity) * c * a : 1 - (1 - m.opacity) * c * a,
                        w = `translate3d(${g}) ${v} ${y}`;
                    if (f && m.shadow || !f) {
                        let e = s.children(".swiper-slide-shadow");
                        if (0 === e.length && m.shadow && (e = K(r, s)), e.length) {
                            const t = r.shadowPerProgress ? d * (1 / r.limitProgress) : d;
                            e[0].style.opacity = Math.min(Math.max(Math.abs(t), 0), 1)
                        }
                    }
                    const x = U(r, s);
                    x.transform(w).css({
                        opacity: b
                    }), m.origin && x.css("transform-origin", m.origin)
                }
            },
            setTransition: e => {
                const {
                    transformEl: i
                } = t.params.creativeEffect;
                (i ? t.slides.find(i) : t.slides).transition(e).find(".swiper-slide-shadow").transition(e), Q({
                    swiper: t,
                    duration: e,
                    transformEl: i,
                    allSlides: !0
                })
            },
            perspective: () => t.params.creativeEffect.perspective,
            overwriteParams: () => ({
                watchSlidesProgress: !0,
                virtualTranslate: !t.params.cssMode
            })
        })
    }, function(e) {
        let {
            swiper: t,
            extendParams: i,
            on: s
        } = e;
        i({
            cardsEffect: {
                slideShadows: !0,
                transformEl: null,
                rotate: !0,
                perSlideRotate: 2,
                perSlideOffset: 8
            }
        }), V({
            effect: "cards",
            swiper: t,
            on: s,
            setTranslate: () => {
                const {
                    slides: e,
                    activeIndex: i
                } = t, s = t.params.cardsEffect, {
                    startTranslate: n,
                    isTouched: r
                } = t.touchEventsData, a = t.translate;
                for (let o = 0; o < e.length; o += 1) {
                    const l = e.eq(o),
                        d = l[0].progress,
                        c = Math.min(Math.max(d, -4), 4);
                    let u = l[0].swiperSlideOffset;
                    t.params.centeredSlides && !t.params.cssMode && t.$wrapperEl.transform(`translateX(${t.minTranslate()}px)`), t.params.centeredSlides && t.params.cssMode && (u -= e[0].swiperSlideOffset);
                    let h = t.params.cssMode ? -u - t.translate : -u,
                        p = 0;
                    const f = -100 * Math.abs(c);
                    let m = 1,
                        g = -s.perSlideRotate * c,
                        v = s.perSlideOffset - .75 * Math.abs(c);
                    const y = t.virtual && t.params.virtual.enabled ? t.virtual.from + o : o,
                        b = (y === i || y === i - 1) && c > 0 && c < 1 && (r || t.params.cssMode) && a < n,
                        w = (y === i || y === i + 1) && c < 0 && c > -1 && (r || t.params.cssMode) && a > n;
                    if (b || w) {
                        const e = (1 - Math.abs((Math.abs(c) - .5) / .5)) ** .5;
                        g += -28 * c * e, m += -.5 * e, v += 96 * e, p = -25 * e * Math.abs(c) + "%"
                    }
                    if (h = c < 0 ? `calc(${h}px + (${v*Math.abs(c)}%))` : c > 0 ? `calc(${h}px + (-${v*Math.abs(c)}%))` : h + "px", !t.isHorizontal()) {
                        const e = p;
                        p = h, h = e
                    }
                    const x = c < 0 ? "" + (1 + (1 - m) * c) : "" + (1 - (1 - m) * c),
                        _ = `\n        translate3d(${h}, ${p}, ${f}px)\n        rotateZ(${s.rotate?g:0}deg)\n        scale(${x})\n      `;
                    if (s.slideShadows) {
                        let e = l.find(".swiper-slide-shadow");
                        0 === e.length && (e = K(s, l)), e.length && (e[0].style.opacity = Math.min(Math.max((Math.abs(c) - .5) / .5, 0), 1))
                    }
                    l[0].style.zIndex = -Math.abs(Math.round(d)) + e.length, U(s, l).transform(_)
                }
            },
            setTransition: e => {
                const {
                    transformEl: i
                } = t.params.cardsEffect;
                (i ? t.slides.find(i) : t.slides).transition(e).find(".swiper-slide-shadow").transition(e), Q({
                    swiper: t,
                    duration: e,
                    transformEl: i
                })
            },
            perspective: () => !0,
            overwriteParams: () => ({
                watchSlidesProgress: !0,
                virtualTranslate: !t.params.cssMode
            })
        })
    }];
    return H.use(Z), H
})),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e || self).Typed = t()
}(this, (function() {
    function e() {
        return (e = Object.assign ? Object.assign.bind() : function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var i = arguments[t];
                for (var s in i) Object.prototype.hasOwnProperty.call(i, s) && (e[s] = i[s])
            }
            return e
        }).apply(this, arguments)
    }
    var t = {
            strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
            stringsElement: null,
            typeSpeed: 0,
            startDelay: 0,
            backSpeed: 0,
            smartBackspace: !0,
            shuffle: !1,
            backDelay: 700,
            fadeOut: !1,
            fadeOutClass: "typed-fade-out",
            fadeOutDelay: 500,
            loop: !1,
            loopCount: 1 / 0,
            showCursor: !0,
            cursorChar: "|",
            autoInsertCss: !0,
            attr: null,
            bindInputFocusEvents: !1,
            contentType: "html",
            onBegin: function(e) {},
            onComplete: function(e) {},
            preStringTyped: function(e, t) {},
            onStringTyped: function(e, t) {},
            onLastStringBackspaced: function(e) {},
            onTypingPaused: function(e, t) {},
            onTypingResumed: function(e, t) {},
            onReset: function(e) {},
            onStop: function(e, t) {},
            onStart: function(e, t) {},
            onDestroy: function(e) {}
        },
        i = new(function() {
            function i() {}
            var s = i.prototype;
            return s.load = function(i, s, n) {
                if (i.el = "string" == typeof n ? document.querySelector(n) : n, i.options = e({}, t, s), i.isInput = "input" === i.el.tagName.toLowerCase(), i.attr = i.options.attr, i.bindInputFocusEvents = i.options.bindInputFocusEvents, i.showCursor = !i.isInput && i.options.showCursor, i.cursorChar = i.options.cursorChar, i.cursorBlinking = !0, i.elContent = i.attr ? i.el.getAttribute(i.attr) : i.el.textContent, i.contentType = i.options.contentType, i.typeSpeed = i.options.typeSpeed, i.startDelay = i.options.startDelay, i.backSpeed = i.options.backSpeed, i.smartBackspace = i.options.smartBackspace, i.backDelay = i.options.backDelay, i.fadeOut = i.options.fadeOut, i.fadeOutClass = i.options.fadeOutClass, i.fadeOutDelay = i.options.fadeOutDelay, i.isPaused = !1, i.strings = i.options.strings.map((function(e) {
                        return e.trim()
                    })), i.stringsElement = "string" == typeof i.options.stringsElement ? document.querySelector(i.options.stringsElement) : i.options.stringsElement, i.stringsElement) {
                    i.strings = [], i.stringsElement.style.cssText = "clip: rect(0 0 0 0);clip-path:inset(50%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px;";
                    var r = Array.prototype.slice.apply(i.stringsElement.children),
                        a = r.length;
                    if (a)
                        for (var o = 0; o < a; o += 1) i.strings.push(r[o].innerHTML.trim())
                }
                for (var l in i.strPos = 0, i.currentElContent = this.getCurrentElContent(i), i.currentElContent && i.currentElContent.length > 0 && (i.strPos = i.currentElContent.length - 1, i.strings.unshift(i.currentElContent)), i.sequence = [], i.strings) i.sequence[l] = l;
                i.arrayPos = 0, i.stopNum = 0, i.loop = i.options.loop, i.loopCount = i.options.loopCount, i.curLoop = 0, i.shuffle = i.options.shuffle, i.pause = {
                    status: !1,
                    typewrite: !0,
                    curString: "",
                    curStrPos: 0
                }, i.typingComplete = !1, i.autoInsertCss = i.options.autoInsertCss, i.autoInsertCss && (this.appendCursorAnimationCss(i), this.appendFadeOutAnimationCss(i))
            }, s.getCurrentElContent = function(e) {
                return e.attr ? e.el.getAttribute(e.attr) : e.isInput ? e.el.value : "html" === e.contentType ? e.el.innerHTML : e.el.textContent
            }, s.appendCursorAnimationCss = function(e) {
                var t = "data-typed-js-cursor-css";
                if (e.showCursor && !document.querySelector("[" + t + "]")) {
                    var i = document.createElement("style");
                    i.setAttribute(t, "true"), i.innerHTML = "\n        .typed-cursor{\n          opacity: 1;\n        }\n        .typed-cursor.typed-cursor--blink{\n          animation: typedjsBlink 0.7s infinite;\n          -webkit-animation: typedjsBlink 0.7s infinite;\n                  animation: typedjsBlink 0.7s infinite;\n        }\n        @keyframes typedjsBlink{\n          50% { opacity: 0.0; }\n        }\n        @-webkit-keyframes typedjsBlink{\n          0% { opacity: 1; }\n          50% { opacity: 0.0; }\n          100% { opacity: 1; }\n        }\n      ", document.body.appendChild(i)
                }
            }, s.appendFadeOutAnimationCss = function(e) {
                var t = "data-typed-fadeout-js-css";
                if (e.fadeOut && !document.querySelector("[" + t + "]")) {
                    var i = document.createElement("style");
                    i.setAttribute(t, "true"), i.innerHTML = "\n        .typed-fade-out{\n          opacity: 0;\n          transition: opacity .25s;\n        }\n        .typed-cursor.typed-cursor--blink.typed-fade-out{\n          -webkit-animation: 0;\n          animation: 0;\n        }\n      ", document.body.appendChild(i)
                }
            }, i
        }()),
        s = new(function() {
            function e() {}
            var t = e.prototype;
            return t.typeHtmlChars = function(e, t, i) {
                if ("html" !== i.contentType) return t;
                var s = e.substring(t).charAt(0);
                if ("<" === s || "&" === s) {
                    var n;
                    for (n = "<" === s ? ">" : ";"; e.substring(t + 1).charAt(0) !== n && !(1 + ++t > e.length););
                    t++
                }
                return t
            }, t.backSpaceHtmlChars = function(e, t, i) {
                if ("html" !== i.contentType) return t;
                var s = e.substring(t).charAt(0);
                if (">" === s || ";" === s) {
                    var n;
                    for (n = ">" === s ? "<" : "&"; e.substring(t - 1).charAt(0) !== n && !(--t < 0););
                    t--
                }
                return t
            }, e
        }());
    return function() {
        function e(e, t) {
            i.load(this, t, e), this.begin()
        }
        var t = e.prototype;
        return t.toggle = function() {
            this.pause.status ? this.start() : this.stop()
        }, t.stop = function() {
            this.typingComplete || this.pause.status || (this.toggleBlinking(!0), this.pause.status = !0, this.options.onStop(this.arrayPos, this))
        }, t.start = function() {
            this.typingComplete || this.pause.status && (this.pause.status = !1, this.pause.typewrite ? this.typewrite(this.pause.curString, this.pause.curStrPos) : this.backspace(this.pause.curString, this.pause.curStrPos), this.options.onStart(this.arrayPos, this))
        }, t.destroy = function() {
            this.reset(!1), this.options.onDestroy(this)
        }, t.reset = function(e) {
            void 0 === e && (e = !0), clearInterval(this.timeout), this.replaceText(""), this.cursor && this.cursor.parentNode && (this.cursor.parentNode.removeChild(this.cursor), this.cursor = null), this.strPos = 0, this.arrayPos = 0, this.curLoop = 0, e && (this.insertCursor(), this.options.onReset(this), this.begin())
        }, t.begin = function() {
            var e = this;
            this.options.onBegin(this), this.typingComplete = !1, this.shuffleStringsIfNeeded(this), this.insertCursor(), this.bindInputFocusEvents && this.bindFocusEvents(), this.timeout = setTimeout((function() {
                0 === e.strPos ? e.typewrite(e.strings[e.sequence[e.arrayPos]], e.strPos) : e.backspace(e.strings[e.sequence[e.arrayPos]], e.strPos)
            }), this.startDelay)
        }, t.typewrite = function(e, t) {
            var i = this;
            this.fadeOut && this.el.classList.contains(this.fadeOutClass) && (this.el.classList.remove(this.fadeOutClass), this.cursor && this.cursor.classList.remove(this.fadeOutClass));
            var n = this.humanizer(this.typeSpeed),
                r = 1;
            !0 !== this.pause.status ? this.timeout = setTimeout((function() {
                t = s.typeHtmlChars(e, t, i);
                var n = 0,
                    a = e.substring(t);
                if ("^" === a.charAt(0) && /^\^\d+/.test(a)) {
                    var o = 1;
                    o += (a = /\d+/.exec(a)[0]).length, n = parseInt(a), i.temporaryPause = !0, i.options.onTypingPaused(i.arrayPos, i), e = e.substring(0, t) + e.substring(t + o), i.toggleBlinking(!0)
                }
                if ("`" === a.charAt(0)) {
                    for (;
                        "`" !== e.substring(t + r).charAt(0) && (r++, !(t + r > e.length)););
                    var l = e.substring(0, t),
                        d = e.substring(l.length + 1, t + r),
                        c = e.substring(t + r + 1);
                    e = l + d + c, r--
                }
                i.timeout = setTimeout((function() {
                    i.toggleBlinking(!1), t >= e.length ? i.doneTyping(e, t) : i.keepTyping(e, t, r), i.temporaryPause && (i.temporaryPause = !1, i.options.onTypingResumed(i.arrayPos, i))
                }), n)
            }), n) : this.setPauseStatus(e, t, !0)
        }, t.keepTyping = function(e, t, i) {
            0 === t && (this.toggleBlinking(!1), this.options.preStringTyped(this.arrayPos, this));
            var s = e.substring(0, t += i);
            this.replaceText(s), this.typewrite(e, t)
        }, t.doneTyping = function(e, t) {
            var i = this;
            this.options.onStringTyped(this.arrayPos, this), this.toggleBlinking(!0), this.arrayPos === this.strings.length - 1 && (this.complete(), !1 === this.loop || this.curLoop === this.loopCount) || (this.timeout = setTimeout((function() {
                i.backspace(e, t)
            }), this.backDelay))
        }, t.backspace = function(e, t) {
            var i = this;
            if (!0 !== this.pause.status) {
                if (this.fadeOut) return this.initFadeOut();
                this.toggleBlinking(!1);
                var n = this.humanizer(this.backSpeed);
                this.timeout = setTimeout((function() {
                    t = s.backSpaceHtmlChars(e, t, i);
                    var n = e.substring(0, t);
                    if (i.replaceText(n), i.smartBackspace) {
                        var r = i.strings[i.arrayPos + 1];
                        i.stopNum = r && n === r.substring(0, t) ? t : 0
                    }
                    t > i.stopNum ? (t--, i.backspace(e, t)) : t <= i.stopNum && (i.arrayPos++, i.arrayPos === i.strings.length ? (i.arrayPos = 0, i.options.onLastStringBackspaced(), i.shuffleStringsIfNeeded(), i.begin()) : i.typewrite(i.strings[i.sequence[i.arrayPos]], t))
                }), n)
            } else this.setPauseStatus(e, t, !1)
        }, t.complete = function() {
            this.options.onComplete(this), this.loop ? this.curLoop++ : this.typingComplete = !0
        }, t.setPauseStatus = function(e, t, i) {
            this.pause.typewrite = i, this.pause.curString = e, this.pause.curStrPos = t
        }, t.toggleBlinking = function(e) {
            this.cursor && (this.pause.status || this.cursorBlinking !== e && (this.cursorBlinking = e, e ? this.cursor.classList.add("typed-cursor--blink") : this.cursor.classList.remove("typed-cursor--blink")))
        }, t.humanizer = function(e) {
            return Math.round(Math.random() * e / 2) + e
        }, t.shuffleStringsIfNeeded = function() {
            this.shuffle && (this.sequence = this.sequence.sort((function() {
                return Math.random() - .5
            })))
        }, t.initFadeOut = function() {
            var e = this;
            return this.el.className += " " + this.fadeOutClass, this.cursor && (this.cursor.className += " " + this.fadeOutClass), setTimeout((function() {
                e.arrayPos++, e.replaceText(""), e.strings.length > e.arrayPos ? e.typewrite(e.strings[e.sequence[e.arrayPos]], 0) : (e.typewrite(e.strings[0], 0), e.arrayPos = 0)
            }), this.fadeOutDelay)
        }, t.replaceText = function(e) {
            this.attr ? this.el.setAttribute(this.attr, e) : this.isInput ? this.el.value = e : "html" === this.contentType ? this.el.innerHTML = e : this.el.textContent = e
        }, t.bindFocusEvents = function() {
            var e = this;
            this.isInput && (this.el.addEventListener("focus", (function(t) {
                e.stop()
            })), this.el.addEventListener("blur", (function(t) {
                e.el.value && 0 !== e.el.value.length || e.start()
            })))
        }, t.insertCursor = function() {
            this.showCursor && (this.cursor || (this.cursor = document.createElement("span"), this.cursor.className = "typed-cursor", this.cursor.setAttribute("aria-hidden", !0), this.cursor.innerHTML = this.cursorChar, this.el.parentNode && this.el.parentNode.insertBefore(this.cursor, this.el.nextSibling)))
        }, e
    }()
})),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).Pristine = t()
}(this, (function() {
    "use strict";
    var e = {
        en: {
            required: "This field is required",
            email: "This field requires a valid e-mail address",
            number: "This field requires a number",
            integer: "This field requires an integer value",
            url: "This field requires a valid website URL",
            tel: "This field requires a valid telephone number",
            maxlength: "This fields length must be < ${1}",
            minlength: "This fields length must be > ${1}",
            min: "Minimum value for this field is ${1}",
            max: "Maximum value for this field is ${1}",
            pattern: "Please match the requested format",
            equals: "The two fields do not match",
            default: "Please enter a correct value"
        }
    };

    function t(e) {
        var t = arguments;
        return this.replace(/\${([^{}]*)}/g, (function(e, i) {
            return t[i]
        }))
    }

    function i(e) {
        return e.pristine.self.form.querySelectorAll('input[name="' + e.getAttribute("name") + '"]:checked').length
    }
    var s = {
            classTo: "form-group",
            errorClass: "has-danger",
            successClass: "has-success",
            errorTextParent: "form-group",
            errorTextTag: "div",
            errorTextClass: "text-help"
        },
        n = ["required", "min", "max", "minlength", "maxlength", "pattern"],
        r = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        a = /-message(?:-([a-z]{2}(?:_[A-Z]{2})?))?/,
        o = "en",
        l = {},
        d = function(e, t) {
            t.name = e, void 0 === t.priority && (t.priority = 1), l[e] = t
        };

    function c(i, r, d) {
        var c = this;

        function u(e, t, i, s) {
            var n = l[i];
            if (n && (e.push(n), s)) {
                var r = "pattern" === i ? [s] : s.split(",");
                r.unshift(null), t[i] = r
            }
        }

        function h(i) {
            for (var s = [], n = !0, r = 0; i.validators[r]; r++) {
                var a = i.validators[r],
                    l = i.params[a.name] ? i.params[a.name] : [];
                if (l[0] = i.input.value, !a.fn.apply(i.input, l) && (n = !1, "function" == typeof a.msg ? s.push(a.msg(i.input.value, l)) : "string" == typeof a.msg ? s.push(t.apply(a.msg, l)) : a.msg === Object(a.msg) && a.msg[o] ? s.push(t.apply(a.msg[o], l)) : i.messages[o] && i.messages[o][a.name] ? s.push(t.apply(i.messages[o][a.name], l)) : e[o] && e[o][a.name] ? s.push(t.apply(e[o][a.name], l)) : s.push(t.apply(e[o].default, l)), !0 === a.halt)) break
            }
            return i.errors = s, n
        }

        function p(e) {
            if (e.errorElements) return e.errorElements;
            var t = function(e, t) {
                    for (;
                        (e = e.parentElement) && !e.classList.contains(t););
                    return e
                }(e.input, c.config.classTo),
                i = null,
                s = null;
            return (i = c.config.classTo === c.config.errorTextParent ? t : t.querySelector("." + c.config.errorTextParent)) && ((s = i.querySelector(".pristine-error")) || ((s = document.createElement(c.config.errorTextTag)).className = "pristine-error " + c.config.errorTextClass, i.appendChild(s), s.pristineDisplay = s.style.display)), e.errorElements = [t, s]
        }

        function f(e) {
            var t = p(e),
                i = t[0],
                s = t[1],
                n = e.input,
                r = "error-" + (n.id || Math.floor((new Date).valueOf() * Math.random()));
            i && (i.classList.remove(c.config.successClass), i.classList.add(c.config.errorClass), n.setAttribute("aria-describedby", r), n.setAttribute("aria-invalid", "true")), s && (s.setAttribute("id", r), s.setAttribute("role", "alert"), s.innerHTML = e.errors.join("<br/>"), s.style.display = s.pristineDisplay || "")
        }

        function m(e) {
            var t = function(e) {
                var t = p(e),
                    i = t[0],
                    s = t[1],
                    n = e.input;
                return i && (i.classList.remove(c.config.errorClass), i.classList.remove(c.config.successClass), n.removeAttribute("aria-describedby"), n.removeAttribute("aria-invalid")), s && (s.removeAttribute("id"), s.removeAttribute("role"), s.innerHTML = "", s.style.display = "none"), t
            }(e)[0];
            t && t.classList.add(c.config.successClass)
        }
        return function(e, t, i) {
            e.setAttribute("novalidate", "true"), c.form = e, c.config = function(e, t) {
                for (var i in t) i in e || (e[i] = t[i]);
                return e
            }(t || {}, s), c.live = !(!1 === i), c.fields = Array.from(e.querySelectorAll("input:not([type^=hidden]):not([type^=submit]), select, textarea")).map(function(e) {
                var t = [],
                    i = {},
                    s = {};
                return [].forEach.call(e.attributes, (function(e) {
                    if (/^data-pristine-/.test(e.name)) {
                        var r = e.name.substr(14),
                            o = r.match(a);
                        if (null !== o) {
                            var l = void 0 === o[1] ? "en" : o[1];
                            return s.hasOwnProperty(l) || (s[l] = {}), void(s[l][r.slice(0, r.length - o[0].length)] = e.value)
                        }
                        "type" === r && (r = e.value), u(t, i, r, e.value)
                    } else ~n.indexOf(e.name) ? u(t, i, e.name, e.value) : "type" === e.name && u(t, i, e.value)
                })), t.sort((function(e, t) {
                    return t.priority - e.priority
                })), c.live && e.addEventListener(~["radio", "checkbox"].indexOf(e.getAttribute("type")) ? "change" : "input", function(e) {
                    c.validate(e.target)
                }.bind(c)), e.pristine = {
                    input: e,
                    validators: t,
                    params: i,
                    messages: s,
                    self: c
                }
            }.bind(c))
        }(i, r, d), c.validate = function(e, t) {
            t = e && !0 === t || !0 === e;
            var i = c.fields;
            !0 !== e && !1 !== e && (e instanceof HTMLElement ? i = [e.pristine] : (e instanceof NodeList || e instanceof(window.$ || Array) || e instanceof Array) && (i = Array.from(e).map((function(e) {
                return e.pristine
            }))));
            for (var s = !0, n = 0; i[n]; n++) {
                var r = i[n];
                h(r) ? !t && m(r) : (s = !1, !t && f(r))
            }
            return s
        }, c.getErrors = function(e) {
            if (!e) {
                for (var t = [], i = 0; i < c.fields.length; i++) {
                    var s = c.fields[i];
                    s.errors.length && t.push({
                        input: s.input,
                        errors: s.errors
                    })
                }
                return t
            }
            return e.tagName && "select" === e.tagName.toLowerCase() ? e.pristine.errors : e.length ? e[0].pristine.errors : e.pristine.errors
        }, c.addValidator = function(e, t, i, s, n) {
            e instanceof HTMLElement ? (e.pristine.validators.push({
                fn: t,
                msg: i,
                priority: s,
                halt: n
            }), e.pristine.validators.sort((function(e, t) {
                return t.priority - e.priority
            }))) : console.warn("The parameter elem must be a dom element")
        }, c.addError = function(e, t) {
            (e = e.length ? e[0] : e).pristine.errors.push(t), f(e.pristine)
        }, c.reset = function() {
            for (var e = 0; c.fields[e]; e++) c.fields[e].errorElements = null;
            Array.from(c.form.querySelectorAll(".pristine-error")).map((function(e) {
                e.parentNode.removeChild(e)
            })), Array.from(c.form.querySelectorAll("." + c.config.classTo)).map((function(e) {
                e.classList.remove(c.config.successClass), e.classList.remove(c.config.errorClass)
            }))
        }, c.destroy = function() {
            c.reset(), c.fields.forEach((function(e) {
                delete e.input.pristine
            })), c.fields = []
        }, c.setGlobalConfig = function(e) {
            s = e
        }, c
    }
    return d("text", {
        fn: function(e) {
            return !0
        },
        priority: 0
    }), d("required", {
        fn: function(e) {
            return "radio" === this.type || "checkbox" === this.type ? i(this) : void 0 !== e && "" !== e.trim()
        },
        priority: 99,
        halt: !0
    }), d("email", {
        fn: function(e) {
            return !e || r.test(e)
        }
    }), d("number", {
        fn: function(e) {
            return !e || !isNaN(parseFloat(e))
        },
        priority: 2
    }), d("integer", {
        fn: function(e) {
            return !e || /^\d+$/.test(e)
        }
    }), d("minlength", {
        fn: function(e, t) {
            return !e || e.length >= parseInt(t)
        }
    }), d("maxlength", {
        fn: function(e, t) {
            return !e || e.length <= parseInt(t)
        }
    }), d("min", {
        fn: function(e, t) {
            return !e || ("checkbox" === this.type ? i(this) >= parseInt(t) : parseFloat(e) >= parseFloat(t))
        }
    }), d("max", {
        fn: function(e, t) {
            return !e || ("checkbox" === this.type ? i(this) <= parseInt(t) : parseFloat(e) <= parseFloat(t))
        }
    }), d("pattern", {
        fn: function(e, t) {
            var i = t.match(new RegExp("^/(.*?)/([gimy]*)$"));
            return !e || new RegExp(i[1], i[2]).test(e)
        }
    }), d("equals", {
        fn: function(e, t) {
            var i = document.querySelector(t);
            return i && (!e && !i.value || i.value === e)
        }
    }), c.addValidator = function(e, t, i, s, n) {
        d(e, {
            fn: t,
            msg: i,
            priority: s,
            halt: n
        })
    }, c.addMessages = function(t, i) {
        var s = e.hasOwnProperty(t) ? e[t] : e[t] = {};
        Object.keys(i).forEach((function(e, t) {
            s[e] = i[e]
        }))
    }, c.setLocale = function(e) {
        o = e
    }, c
})),
function(e, t) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], (function(i) {
        return t(e, i)
    })) : "object" == typeof module && module.exports ? module.exports = t(e, require("jquery")) : e.jQueryBridget = t(e, e.jQuery)
}(window, (function(e, t) {
    "use strict";

    function i(i, r, o) {
        function l(e, t, s) {
            var n, r = "$()." + i + '("' + t + '")';
            return e.each((function(e, l) {
                var d = o.data(l, i);
                if (d) {
                    var c = d[t];
                    if (c && "_" != t.charAt(0)) {
                        var u = c.apply(d, s);
                        n = void 0 === n ? u : n
                    } else a(r + " is not a valid method")
                } else a(i + " not initialized. Cannot call methods, i.e. " + r)
            })), void 0 !== n ? n : e
        }

        function d(e, t) {
            e.each((function(e, s) {
                var n = o.data(s, i);
                n ? (n.option(t), n._init()) : (n = new r(s, t), o.data(s, i, n))
            }))
        }(o = o || t || e.jQuery) && (r.prototype.option || (r.prototype.option = function(e) {
            o.isPlainObject(e) && (this.options = o.extend(!0, this.options, e))
        }), o.fn[i] = function(e) {
            if ("string" == typeof e) {
                var t = n.call(arguments, 1);
                return l(this, e, t)
            }
            return d(this, e), this
        }, s(o))
    }

    function s(e) {
        !e || e && e.bridget || (e.bridget = i)
    }
    var n = Array.prototype.slice,
        r = e.console,
        a = void 0 === r ? function() {} : function(e) {
            r.error(e)
        };
    return s(t || e.jQuery), i
})),
function(e, t) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == typeof module && module.exports ? module.exports = t() : e.EvEmitter = t()
}("undefined" != typeof window ? window : this, (function() {
    function e() {}
    var t = e.prototype;
    return t.on = function(e, t) {
        if (e && t) {
            var i = this._events = this._events || {},
                s = i[e] = i[e] || [];
            return -1 == s.indexOf(t) && s.push(t), this
        }
    }, t.once = function(e, t) {
        if (e && t) {
            this.on(e, t);
            var i = this._onceEvents = this._onceEvents || {};
            return (i[e] = i[e] || {})[t] = !0, this
        }
    }, t.off = function(e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            var s = i.indexOf(t);
            return -1 != s && i.splice(s, 1), this
        }
    }, t.emitEvent = function(e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            i = i.slice(0), t = t || [];
            for (var s = this._onceEvents && this._onceEvents[e], n = 0; n < i.length; n++) {
                var r = i[n];
                s && s[r] && (this.off(e, r), delete s[r]), r.apply(this, t)
            }
            return this
        }
    }, t.allOff = function() {
        delete this._events, delete this._onceEvents
    }, e
})),
function(e, t) {
    "function" == typeof define && define.amd ? define("get-size/get-size", t) : "object" == typeof module && module.exports ? module.exports = t() : e.getSize = t()
}(window, (function() {
    "use strict";

    function e(e) {
        var t = parseFloat(e);
        return -1 == e.indexOf("%") && !isNaN(t) && t
    }

    function t(e) {
        var t = getComputedStyle(e);
        return t || r("Style returned " + t + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"), t
    }

    function i() {
        if (!l) {
            l = !0;
            var i = document.createElement("div");
            i.style.width = "200px", i.style.padding = "1px 2px 3px 4px", i.style.borderStyle = "solid", i.style.borderWidth = "1px 2px 3px 4px", i.style.boxSizing = "border-box";
            var r = document.body || document.documentElement;
            r.appendChild(i);
            var a = t(i);
            n = 200 == Math.round(e(a.width)), s.isBoxSizeOuter = n, r.removeChild(i)
        }
    }

    function s(s) {
        if (i(), "string" == typeof s && (s = document.querySelector(s)), s && "object" == typeof s && s.nodeType) {
            var r = t(s);
            if ("none" == r.display) return function() {
                for (var e = {
                        width: 0,
                        height: 0,
                        innerWidth: 0,
                        innerHeight: 0,
                        outerWidth: 0,
                        outerHeight: 0
                    }, t = 0; o > t; t++) {
                    e[a[t]] = 0
                }
                return e
            }();
            var l = {};
            l.width = s.offsetWidth, l.height = s.offsetHeight;
            for (var d = l.isBorderBox = "border-box" == r.boxSizing, c = 0; o > c; c++) {
                var u = a[c],
                    h = r[u],
                    p = parseFloat(h);
                l[u] = isNaN(p) ? 0 : p
            }
            var f = l.paddingLeft + l.paddingRight,
                m = l.paddingTop + l.paddingBottom,
                g = l.marginLeft + l.marginRight,
                v = l.marginTop + l.marginBottom,
                y = l.borderLeftWidth + l.borderRightWidth,
                b = l.borderTopWidth + l.borderBottomWidth,
                w = d && n,
                x = e(r.width);
            !1 !== x && (l.width = x + (w ? 0 : f + y));
            var _ = e(r.height);
            return !1 !== _ && (l.height = _ + (w ? 0 : m + b)), l.innerWidth = l.width - (f + y), l.innerHeight = l.height - (m + b), l.outerWidth = l.width + g, l.outerHeight = l.height + v, l
        }
    }
    var n, r = "undefined" == typeof console ? function() {} : function(e) {
            console.error(e)
        },
        a = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
        o = a.length,
        l = !1;
    return s
})),
function(e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", t) : "object" == typeof module && module.exports ? module.exports = t() : e.matchesSelector = t()
}(window, (function() {
    "use strict";
    var e = function() {
        var e = window.Element.prototype;
        if (e.matches) return "matches";
        if (e.matchesSelector) return "matchesSelector";
        for (var t = ["webkit", "moz", "ms", "o"], i = 0; i < t.length; i++) {
            var s = t[i] + "MatchesSelector";
            if (e[s]) return s
        }
    }();
    return function(t, i) {
        return t[e](i)
    }
})),
function(e, t) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], (function(i) {
        return t(e, i)
    })) : "object" == typeof module && module.exports ? module.exports = t(e, require("desandro-matches-selector")) : e.fizzyUIUtils = t(e, e.matchesSelector)
}(window, (function(e, t) {
    var i = {
            extend: function(e, t) {
                for (var i in t) e[i] = t[i];
                return e
            },
            modulo: function(e, t) {
                return (e % t + t) % t
            }
        },
        s = Array.prototype.slice;
    i.makeArray = function(e) {
        return Array.isArray(e) ? e : null == e ? [] : "object" == typeof e && "number" == typeof e.length ? s.call(e) : [e]
    }, i.removeFrom = function(e, t) {
        var i = e.indexOf(t); - 1 != i && e.splice(i, 1)
    }, i.getParent = function(e, i) {
        for (; e.parentNode && e != document.body;)
            if (e = e.parentNode, t(e, i)) return e
    }, i.getQueryElement = function(e) {
        return "string" == typeof e ? document.querySelector(e) : e
    }, i.handleEvent = function(e) {
        var t = "on" + e.type;
        this[t] && this[t](e)
    }, i.filterFindElements = function(e, s) {
        e = i.makeArray(e);
        var n = [];
        return e.forEach((function(e) {
            if (e instanceof HTMLElement) {
                if (!s) return void n.push(e);
                t(e, s) && n.push(e);
                for (var i = e.querySelectorAll(s), r = 0; r < i.length; r++) n.push(i[r])
            }
        })), n
    }, i.debounceMethod = function(e, t, i) {
        i = i || 100;
        var s = e.prototype[t],
            n = t + "Timeout";
        e.prototype[t] = function() {
            var e = this[n];
            clearTimeout(e);
            var t = arguments,
                r = this;
            this[n] = setTimeout((function() {
                s.apply(r, t), delete r[n]
            }), i)
        }
    }, i.docReady = function(e) {
        var t = document.readyState;
        "complete" == t || "interactive" == t ? setTimeout(e) : document.addEventListener("DOMContentLoaded", e)
    }, i.toDashed = function(e) {
        return e.replace(/(.)([A-Z])/g, (function(e, t, i) {
            return t + "-" + i
        })).toLowerCase()
    };
    var n = e.console;
    return i.htmlInit = function(t, s) {
        i.docReady((function() {
            var r = i.toDashed(s),
                a = "data-" + r,
                o = document.querySelectorAll("[" + a + "]"),
                l = document.querySelectorAll(".js-" + r),
                d = i.makeArray(o).concat(i.makeArray(l)),
                c = a + "-options",
                u = e.jQuery;
            d.forEach((function(e) {
                var i, r = e.getAttribute(a) || e.getAttribute(c);
                try {
                    i = r && JSON.parse(r)
                } catch (t) {
                    return void(n && n.error("Error parsing " + a + " on " + e.className + ": " + t))
                }
                var o = new t(e, i);
                u && u.data(e, s, o)
            }))
        }))
    }, i
})),
function(e, t) {
    "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], t) : "object" == typeof module && module.exports ? module.exports = t(require("ev-emitter"), require("get-size")) : (e.Outlayer = {}, e.Outlayer.Item = t(e.EvEmitter, e.getSize))
}(window, (function(e, t) {
    "use strict";

    function i(e, t) {
        e && (this.element = e, this.layout = t, this.position = {
            x: 0,
            y: 0
        }, this._create())
    }
    var s = document.documentElement.style,
        n = "string" == typeof s.transition ? "transition" : "WebkitTransition",
        r = "string" == typeof s.transform ? "transform" : "WebkitTransform",
        a = {
            WebkitTransition: "webkitTransitionEnd",
            transition: "transitionend"
        }[n],
        o = {
            transform: r,
            transition: n,
            transitionDuration: n + "Duration",
            transitionProperty: n + "Property",
            transitionDelay: n + "Delay"
        },
        l = i.prototype = Object.create(e.prototype);
    l.constructor = i, l._create = function() {
        this._transn = {
            ingProperties: {},
            clean: {},
            onEnd: {}
        }, this.css({
            position: "absolute"
        })
    }, l.handleEvent = function(e) {
        var t = "on" + e.type;
        this[t] && this[t](e)
    }, l.getSize = function() {
        this.size = t(this.element)
    }, l.css = function(e) {
        var t = this.element.style;
        for (var i in e) {
            t[o[i] || i] = e[i]
        }
    }, l.getPosition = function() {
        var e = getComputedStyle(this.element),
            t = this.layout._getOption("originLeft"),
            i = this.layout._getOption("originTop"),
            s = e[t ? "left" : "right"],
            n = e[i ? "top" : "bottom"],
            r = parseFloat(s),
            a = parseFloat(n),
            o = this.layout.size; - 1 != s.indexOf("%") && (r = r / 100 * o.width), -1 != n.indexOf("%") && (a = a / 100 * o.height), r = isNaN(r) ? 0 : r, a = isNaN(a) ? 0 : a, r -= t ? o.paddingLeft : o.paddingRight, a -= i ? o.paddingTop : o.paddingBottom, this.position.x = r, this.position.y = a
    }, l.layoutPosition = function() {
        var e = this.layout.size,
            t = {},
            i = this.layout._getOption("originLeft"),
            s = this.layout._getOption("originTop"),
            n = i ? "paddingLeft" : "paddingRight",
            r = i ? "left" : "right",
            a = i ? "right" : "left",
            o = this.position.x + e[n];
        t[r] = this.getXValue(o), t[a] = "";
        var l = s ? "paddingTop" : "paddingBottom",
            d = s ? "top" : "bottom",
            c = s ? "bottom" : "top",
            u = this.position.y + e[l];
        t[d] = this.getYValue(u), t[c] = "", this.css(t), this.emitEvent("layout", [this])
    }, l.getXValue = function(e) {
        var t = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !t ? e / this.layout.size.width * 100 + "%" : e + "px"
    }, l.getYValue = function(e) {
        var t = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && t ? e / this.layout.size.height * 100 + "%" : e + "px"
    }, l._transitionTo = function(e, t) {
        this.getPosition();
        var i = this.position.x,
            s = this.position.y,
            n = e == this.position.x && t == this.position.y;
        if (this.setPosition(e, t), !n || this.isTransitioning) {
            var r = e - i,
                a = t - s,
                o = {};
            o.transform = this.getTranslate(r, a), this.transition({
                to: o,
                onTransitionEnd: {
                    transform: this.layoutPosition
                },
                isCleaning: !0
            })
        } else this.layoutPosition()
    }, l.getTranslate = function(e, t) {
        return "translate3d(" + (e = this.layout._getOption("originLeft") ? e : -e) + "px, " + (t = this.layout._getOption("originTop") ? t : -t) + "px, 0)"
    }, l.goTo = function(e, t) {
        this.setPosition(e, t), this.layoutPosition()
    }, l.moveTo = l._transitionTo, l.setPosition = function(e, t) {
        this.position.x = parseFloat(e), this.position.y = parseFloat(t)
    }, l._nonTransition = function(e) {
        for (var t in this.css(e.to), e.isCleaning && this._removeStyles(e.to), e.onTransitionEnd) e.onTransitionEnd[t].call(this)
    }, l.transition = function(e) {
        if (parseFloat(this.layout.options.transitionDuration)) {
            var t = this._transn;
            for (var i in e.onTransitionEnd) t.onEnd[i] = e.onTransitionEnd[i];
            for (i in e.to) t.ingProperties[i] = !0, e.isCleaning && (t.clean[i] = !0);
            if (e.from) {
                this.css(e.from);
                this.element.offsetHeight;
                null
            }
            this.enableTransition(e.to), this.css(e.to), this.isTransitioning = !0
        } else this._nonTransition(e)
    };
    var d = "opacity," + function(e) {
        return e.replace(/([A-Z])/g, (function(e) {
            return "-" + e.toLowerCase()
        }))
    }(r);
    l.enableTransition = function() {
        if (!this.isTransitioning) {
            var e = this.layout.options.transitionDuration;
            e = "number" == typeof e ? e + "ms" : e, this.css({
                transitionProperty: d,
                transitionDuration: e,
                transitionDelay: this.staggerDelay || 0
            }), this.element.addEventListener(a, this, !1)
        }
    }, l.onwebkitTransitionEnd = function(e) {
        this.ontransitionend(e)
    }, l.onotransitionend = function(e) {
        this.ontransitionend(e)
    };
    var c = {
        "-webkit-transform": "transform"
    };
    l.ontransitionend = function(e) {
        if (e.target === this.element) {
            var t = this._transn,
                i = c[e.propertyName] || e.propertyName;
            if (delete t.ingProperties[i], function(e) {
                    for (var t in e) return !1;
                    return null, !0
                }(t.ingProperties) && this.disableTransition(), i in t.clean && (this.element.style[e.propertyName] = "", delete t.clean[i]), i in t.onEnd) t.onEnd[i].call(this), delete t.onEnd[i];
            this.emitEvent("transitionEnd", [this])
        }
    }, l.disableTransition = function() {
        this.removeTransitionStyles(), this.element.removeEventListener(a, this, !1), this.isTransitioning = !1
    }, l._removeStyles = function(e) {
        var t = {};
        for (var i in e) t[i] = "";
        this.css(t)
    };
    var u = {
        transitionProperty: "",
        transitionDuration: "",
        transitionDelay: ""
    };
    return l.removeTransitionStyles = function() {
        this.css(u)
    }, l.stagger = function(e) {
        e = isNaN(e) ? 0 : e, this.staggerDelay = e + "ms"
    }, l.removeElem = function() {
        this.element.parentNode.removeChild(this.element), this.css({
            display: ""
        }), this.emitEvent("remove", [this])
    }, l.remove = function() {
        return n && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", (function() {
            this.removeElem()
        })), void this.hide()) : void this.removeElem()
    }, l.reveal = function() {
        delete this.isHidden, this.css({
            display: ""
        });
        var e = this.layout.options,
            t = {};
        t[this.getHideRevealTransitionEndProperty("visibleStyle")] = this.onRevealTransitionEnd, this.transition({
            from: e.hiddenStyle,
            to: e.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: t
        })
    }, l.onRevealTransitionEnd = function() {
        this.isHidden || this.emitEvent("reveal")
    }, l.getHideRevealTransitionEndProperty = function(e) {
        var t = this.layout.options[e];
        if (t.opacity) return "opacity";
        for (var i in t) return i
    }, l.hide = function() {
        this.isHidden = !0, this.css({
            display: ""
        });
        var e = this.layout.options,
            t = {};
        t[this.getHideRevealTransitionEndProperty("hiddenStyle")] = this.onHideTransitionEnd, this.transition({
            from: e.visibleStyle,
            to: e.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: t
        })
    }, l.onHideTransitionEnd = function() {
        this.isHidden && (this.css({
            display: "none"
        }), this.emitEvent("hide"))
    }, l.destroy = function() {
        this.css({
            position: "",
            left: "",
            right: "",
            top: "",
            bottom: "",
            transition: "",
            transform: ""
        })
    }, i
})),
function(e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], (function(i, s, n, r) {
        return t(e, i, s, n, r)
    })) : "object" == typeof module && module.exports ? module.exports = t(e, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : e.Outlayer = t(e, e.EvEmitter, e.getSize, e.fizzyUIUtils, e.Outlayer.Item)
}(window, (function(e, t, i, s, n) {
    "use strict";

    function r(e, t) {
        var i = s.getQueryElement(e);
        if (i) {
            this.element = i, l && (this.$element = l(this.element)), this.options = s.extend({}, this.constructor.defaults), this.option(t);
            var n = ++c;
            this.element.outlayerGUID = n, u[n] = this, this._create(), this._getOption("initLayout") && this.layout()
        } else o && o.error("Bad element for " + this.constructor.namespace + ": " + (i || e))
    }

    function a(e) {
        function t() {
            e.apply(this, arguments)
        }
        return t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t
    }
    var o = e.console,
        l = e.jQuery,
        d = function() {},
        c = 0,
        u = {};
    r.namespace = "outlayer", r.Item = n, r.defaults = {
        containerStyle: {
            position: "relative"
        },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: {
            opacity: 0,
            transform: "scale(0.001)"
        },
        visibleStyle: {
            opacity: 1,
            transform: "scale(1)"
        }
    };
    var h = r.prototype;
    s.extend(h, t.prototype), h.option = function(e) {
        s.extend(this.options, e)
    }, h._getOption = function(e) {
        var t = this.constructor.compatOptions[e];
        return t && void 0 !== this.options[t] ? this.options[t] : this.options[e]
    }, r.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer"
    }, h._create = function() {
        this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), s.extend(this.element.style, this.options.containerStyle), this._getOption("resize") && this.bindResize()
    }, h.reloadItems = function() {
        this.items = this._itemize(this.element.children)
    }, h._itemize = function(e) {
        for (var t = this._filterFindItemElements(e), i = this.constructor.Item, s = [], n = 0; n < t.length; n++) {
            var r = new i(t[n], this);
            s.push(r)
        }
        return s
    }, h._filterFindItemElements = function(e) {
        return s.filterFindElements(e, this.options.itemSelector)
    }, h.getItemElements = function() {
        return this.items.map((function(e) {
            return e.element
        }))
    }, h.layout = function() {
        this._resetLayout(), this._manageStamps();
        var e = this._getOption("layoutInstant"),
            t = void 0 !== e ? e : !this._isLayoutInited;
        this.layoutItems(this.items, t), this._isLayoutInited = !0
    }, h._init = h.layout, h._resetLayout = function() {
        this.getSize()
    }, h.getSize = function() {
        this.size = i(this.element)
    }, h._getMeasurement = function(e, t) {
        var s, n = this.options[e];
        n ? ("string" == typeof n ? s = this.element.querySelector(n) : n instanceof HTMLElement && (s = n), this[e] = s ? i(s)[t] : n) : this[e] = 0
    }, h.layoutItems = function(e, t) {
        e = this._getItemsForLayout(e), this._layoutItems(e, t), this._postLayout()
    }, h._getItemsForLayout = function(e) {
        return e.filter((function(e) {
            return !e.isIgnored
        }))
    }, h._layoutItems = function(e, t) {
        if (this._emitCompleteOnItems("layout", e), e && e.length) {
            var i = [];
            e.forEach((function(e) {
                var s = this._getItemLayoutPosition(e);
                s.item = e, s.isInstant = t || e.isLayoutInstant, i.push(s)
            }), this), this._processLayoutQueue(i)
        }
    }, h._getItemLayoutPosition = function() {
        return {
            x: 0,
            y: 0
        }
    }, h._processLayoutQueue = function(e) {
        this.updateStagger(), e.forEach((function(e, t) {
            this._positionItem(e.item, e.x, e.y, e.isInstant, t)
        }), this)
    }, h.updateStagger = function() {
        var e = this.options.stagger;
        return null == e ? void(this.stagger = 0) : (this.stagger = function(e) {
            if ("number" == typeof e) return e;
            var t = e.match(/(^\d*\.?\d*)(\w*)/),
                i = t && t[1],
                s = t && t[2];
            return i.length ? (i = parseFloat(i)) * (p[s] || 1) : 0
        }(e), this.stagger)
    }, h._positionItem = function(e, t, i, s, n) {
        s ? e.goTo(t, i) : (e.stagger(n * this.stagger), e.moveTo(t, i))
    }, h._postLayout = function() {
        this.resizeContainer()
    }, h.resizeContainer = function() {
        if (this._getOption("resizeContainer")) {
            var e = this._getContainerSize();
            e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1))
        }
    }, h._getContainerSize = d, h._setContainerMeasure = function(e, t) {
        if (void 0 !== e) {
            var i = this.size;
            i.isBorderBox && (e += t ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), e = Math.max(e, 0), this.element.style[t ? "width" : "height"] = e + "px"
        }
    }, h._emitCompleteOnItems = function(e, t) {
        function i() {
            n.dispatchEvent(e + "Complete", null, [t])
        }

        function s() {
            ++a == r && i()
        }
        var n = this,
            r = t.length;
        if (t && r) {
            var a = 0;
            t.forEach((function(t) {
                t.once(e, s)
            }))
        } else i()
    }, h.dispatchEvent = function(e, t, i) {
        var s = t ? [t].concat(i) : i;
        if (this.emitEvent(e, s), l)
            if (this.$element = this.$element || l(this.element), t) {
                var n = l.Event(t);
                n.type = e, this.$element.trigger(n, i)
            } else this.$element.trigger(e, i)
    }, h.ignore = function(e) {
        var t = this.getItem(e);
        t && (t.isIgnored = !0)
    }, h.unignore = function(e) {
        var t = this.getItem(e);
        t && delete t.isIgnored
    }, h.stamp = function(e) {
        (e = this._find(e)) && (this.stamps = this.stamps.concat(e), e.forEach(this.ignore, this))
    }, h.unstamp = function(e) {
        (e = this._find(e)) && e.forEach((function(e) {
            s.removeFrom(this.stamps, e), this.unignore(e)
        }), this)
    }, h._find = function(e) {
        return e ? ("string" == typeof e && (e = this.element.querySelectorAll(e)), e = s.makeArray(e)) : void 0
    }, h._manageStamps = function() {
        this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
    }, h._getBoundingRect = function() {
        var e = this.element.getBoundingClientRect(),
            t = this.size;
        this._boundingRect = {
            left: e.left + t.paddingLeft + t.borderLeftWidth,
            top: e.top + t.paddingTop + t.borderTopWidth,
            right: e.right - (t.paddingRight + t.borderRightWidth),
            bottom: e.bottom - (t.paddingBottom + t.borderBottomWidth)
        }
    }, h._manageStamp = d, h._getElementOffset = function(e) {
        var t = e.getBoundingClientRect(),
            s = this._boundingRect,
            n = i(e);
        return {
            left: t.left - s.left - n.marginLeft,
            top: t.top - s.top - n.marginTop,
            right: s.right - t.right - n.marginRight,
            bottom: s.bottom - t.bottom - n.marginBottom
        }
    }, h.handleEvent = s.handleEvent, h.bindResize = function() {
        e.addEventListener("resize", this), this.isResizeBound = !0
    }, h.unbindResize = function() {
        e.removeEventListener("resize", this), this.isResizeBound = !1
    }, h.onresize = function() {
        this.resize()
    }, s.debounceMethod(r, "onresize", 100), h.resize = function() {
        this.isResizeBound && this.needsResizeLayout() && this.layout()
    }, h.needsResizeLayout = function() {
        var e = i(this.element);
        return this.size && e && e.innerWidth !== this.size.innerWidth
    }, h.addItems = function(e) {
        var t = this._itemize(e);
        return t.length && (this.items = this.items.concat(t)), t
    }, h.appended = function(e) {
        var t = this.addItems(e);
        t.length && (this.layoutItems(t, !0), this.reveal(t))
    }, h.prepended = function(e) {
        var t = this._itemize(e);
        if (t.length) {
            var i = this.items.slice(0);
            this.items = t.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(t, !0), this.reveal(t), this.layoutItems(i)
        }
    }, h.reveal = function(e) {
        if (this._emitCompleteOnItems("reveal", e), e && e.length) {
            var t = this.updateStagger();
            e.forEach((function(e, i) {
                e.stagger(i * t), e.reveal()
            }))
        }
    }, h.hide = function(e) {
        if (this._emitCompleteOnItems("hide", e), e && e.length) {
            var t = this.updateStagger();
            e.forEach((function(e, i) {
                e.stagger(i * t), e.hide()
            }))
        }
    }, h.revealItemElements = function(e) {
        var t = this.getItems(e);
        this.reveal(t)
    }, h.hideItemElements = function(e) {
        var t = this.getItems(e);
        this.hide(t)
    }, h.getItem = function(e) {
        for (var t = 0; t < this.items.length; t++) {
            var i = this.items[t];
            if (i.element == e) return i
        }
    }, h.getItems = function(e) {
        e = s.makeArray(e);
        var t = [];
        return e.forEach((function(e) {
            var i = this.getItem(e);
            i && t.push(i)
        }), this), t
    }, h.remove = function(e) {
        var t = this.getItems(e);
        this._emitCompleteOnItems("remove", t), t && t.length && t.forEach((function(e) {
            e.remove(), s.removeFrom(this.items, e)
        }), this)
    }, h.destroy = function() {
        var e = this.element.style;
        e.height = "", e.position = "", e.width = "", this.items.forEach((function(e) {
            e.destroy()
        })), this.unbindResize();
        var t = this.element.outlayerGUID;
        delete u[t], delete this.element.outlayerGUID, l && l.removeData(this.element, this.constructor.namespace)
    }, r.data = function(e) {
        var t = (e = s.getQueryElement(e)) && e.outlayerGUID;
        return t && u[t]
    }, r.create = function(e, t) {
        var i = a(r);
        return i.defaults = s.extend({}, r.defaults), s.extend(i.defaults, t), i.compatOptions = s.extend({}, r.compatOptions), i.namespace = e, i.data = r.data, i.Item = a(n), s.htmlInit(i, e), l && l.bridget && l.bridget(e, i), i
    };
    var p = {
        ms: 1,
        s: 1e3
    };
    return r.Item = n, r
})),
function(e, t) {
    "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size"], t) : "object" == typeof module && module.exports ? module.exports = t(require("outlayer"), require("get-size")) : e.Masonry = t(e.Outlayer, e.getSize)
}(window, (function(e, t) {
    var i = e.create("masonry");
    i.compatOptions.fitWidth = "isFitWidth";
    var s = i.prototype;
    return s._resetLayout = function() {
        this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
        for (var e = 0; e < this.cols; e++) this.colYs.push(0);
        this.maxY = 0, this.horizontalColIndex = 0
    }, s.measureColumns = function() {
        if (this.getContainerWidth(), !this.columnWidth) {
            var e = this.items[0],
                i = e && e.element;
            this.columnWidth = i && t(i).outerWidth || this.containerWidth
        }
        var s = this.columnWidth += this.gutter,
            n = this.containerWidth + this.gutter,
            r = n / s,
            a = s - n % s;
        r = Math[a && 1 > a ? "round" : "floor"](r), this.cols = Math.max(r, 1)
    }, s.getContainerWidth = function() {
        var e = this._getOption("fitWidth") ? this.element.parentNode : this.element,
            i = t(e);
        this.containerWidth = i && i.innerWidth
    }, s._getItemLayoutPosition = function(e) {
        e.getSize();
        var t = e.size.outerWidth % this.columnWidth,
            i = Math[t && 1 > t ? "round" : "ceil"](e.size.outerWidth / this.columnWidth);
        i = Math.min(i, this.cols);
        for (var s = this[this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition"](i, e), n = {
                x: this.columnWidth * s.col,
                y: s.y
            }, r = s.y + e.size.outerHeight, a = i + s.col, o = s.col; a > o; o++) this.colYs[o] = r;
        return n
    }, s._getTopColPosition = function(e) {
        var t = this._getTopColGroup(e),
            i = Math.min.apply(Math, t);
        return {
            col: t.indexOf(i),
            y: i
        }
    }, s._getTopColGroup = function(e) {
        if (2 > e) return this.colYs;
        for (var t = [], i = this.cols + 1 - e, s = 0; i > s; s++) t[s] = this._getColGroupY(s, e);
        return t
    }, s._getColGroupY = function(e, t) {
        if (2 > t) return this.colYs[e];
        var i = this.colYs.slice(e, e + t);
        return Math.max.apply(Math, i)
    }, s._getHorizontalColPosition = function(e, t) {
        var i = this.horizontalColIndex % this.cols;
        i = e > 1 && i + e > this.cols ? 0 : i;
        var s = t.size.outerWidth && t.size.outerHeight;
        return this.horizontalColIndex = s ? i + e : this.horizontalColIndex, {
            col: i,
            y: this._getColGroupY(i, e)
        }
    }, s._manageStamp = function(e) {
        var i = t(e),
            s = this._getElementOffset(e),
            n = this._getOption("originLeft") ? s.left : s.right,
            r = n + i.outerWidth,
            a = Math.floor(n / this.columnWidth);
        a = Math.max(0, a);
        var o = Math.floor(r / this.columnWidth);
        o -= r % this.columnWidth ? 0 : 1, o = Math.min(this.cols - 1, o);
        for (var l = (this._getOption("originTop") ? s.top : s.bottom) + i.outerHeight, d = a; o >= d; d++) this.colYs[d] = Math.max(l, this.colYs[d])
    }, s._getContainerSize = function() {
        this.maxY = Math.max.apply(Math, this.colYs);
        var e = {
            height: this.maxY
        };
        return this._getOption("fitWidth") && (e.width = this._getContainerFitWidth()), e
    }, s._getContainerFitWidth = function() {
        for (var e = 0, t = this.cols; --t && 0 === this.colYs[t];) e++;
        return (this.cols - e) * this.columnWidth - this.gutter
    }, s.needsResizeLayout = function() {
        var e = this.containerWidth;
        return this.getContainerWidth(), e != this.containerWidth
    }, i
})),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).GLightbox = t()
}(this, (function() {
    "use strict";

    function e(t) {
        return (e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(t)
    }

    function t(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function i(e, t) {
        for (var i = 0; i < t.length; i++) {
            var s = t[i];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s)
        }
    }

    function s(e, t, s) {
        return t && i(e.prototype, t), s && i(e, s), e
    }
    var n = Date.now();

    function r() {
        var e = {},
            t = !0,
            i = 0,
            s = arguments.length;
        "[object Boolean]" === Object.prototype.toString.call(arguments[0]) && (t = arguments[0], i++);
        for (var n = function(i) {
                for (var s in i) Object.prototype.hasOwnProperty.call(i, s) && (t && "[object Object]" === Object.prototype.toString.call(i[s]) ? e[s] = r(!0, e[s], i[s]) : e[s] = i[s])
            }; i < s; i++) {
            var a = arguments[i];
            n(a)
        }
        return e
    }

    function a(e, t) {
        if ((C(e) || e === window || e === document) && (e = [e]), M(e) || k(e) || (e = [e]), 0 != O(e))
            if (M(e) && !k(e))
                for (var i = e.length, s = 0; s < i && !1 !== t.call(e[s], e[s], s, e); s++);
            else if (k(e))
            for (var n in e)
                if (P(e, n) && !1 === t.call(e[n], e[n], n, e)) break
    }

    function o(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
            i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
            s = e[n] = e[n] || [],
            r = {
                all: s,
                evt: null,
                found: null
            };
        return t && i && O(s) > 0 && a(s, (function(e, s) {
            if (e.eventName == t && e.fn.toString() == i.toString()) return r.found = !0, r.evt = s, !1
        })), r
    }

    function l(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            i = t.onElement,
            s = t.withCallback,
            n = t.avoidDuplicate,
            r = void 0 === n || n,
            l = t.once,
            d = void 0 !== l && l,
            c = t.useCapture,
            u = void 0 !== c && c,
            h = arguments.length > 2 ? arguments[2] : void 0,
            p = i || [];

        function f(e) {
            E(s) && s.call(h, e, this), d && f.destroy()
        }
        return T(p) && (p = document.querySelectorAll(p)), f.destroy = function() {
            a(p, (function(t) {
                var i = o(t, e, f);
                i.found && i.all.splice(i.evt, 1), t.removeEventListener && t.removeEventListener(e, f, u)
            }))
        }, a(p, (function(t) {
            var i = o(t, e, f);
            (t.addEventListener && r && !i.found || !r) && (t.addEventListener(e, f, u), i.all.push({
                eventName: e,
                fn: f
            }))
        })), f
    }

    function d(e, t) {
        a(t.split(" "), (function(t) {
            return e.classList.add(t)
        }))
    }

    function c(e, t) {
        a(t.split(" "), (function(t) {
            return e.classList.remove(t)
        }))
    }

    function u(e, t) {
        return e.classList.contains(t)
    }

    function h(e, t) {
        for (; e !== document.body;) {
            if (!(e = e.parentElement)) return !1;
            if ("function" == typeof e.matches ? e.matches(t) : e.msMatchesSelector(t)) return e
        }
    }

    function p(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
            i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        if (!e || "" === t) return !1;
        if ("none" === t) return E(i) && i(), !1;
        var s = b(),
            n = t.split(" ");
        a(n, (function(t) {
            d(e, "g" + t)
        })), l(s, {
            onElement: e,
            avoidDuplicate: !1,
            once: !0,
            withCallback: function(e, t) {
                a(n, (function(e) {
                    c(t, "g" + e)
                })), E(i) && i()
            }
        })
    }

    function f(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
        if ("" === t) return e.style.webkitTransform = "", e.style.MozTransform = "", e.style.msTransform = "", e.style.OTransform = "", e.style.transform = "", !1;
        e.style.webkitTransform = t, e.style.MozTransform = t, e.style.msTransform = t, e.style.OTransform = t, e.style.transform = t
    }

    function m(e) {
        e.style.display = "block"
    }

    function g(e) {
        e.style.display = "none"
    }

    function v(e) {
        var t = document.createDocumentFragment(),
            i = document.createElement("div");
        for (i.innerHTML = e; i.firstChild;) t.appendChild(i.firstChild);
        return t
    }

    function y() {
        return {
            width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        }
    }

    function b() {
        var e, t = document.createElement("fakeelement"),
            i = {
                animation: "animationend",
                OAnimation: "oAnimationEnd",
                MozAnimation: "animationend",
                WebkitAnimation: "webkitAnimationEnd"
            };
        for (e in i)
            if (void 0 !== t.style[e]) return i[e]
    }

    function w(e, t, i, s) {
        if (e()) t();
        else {
            var n;
            i || (i = 100);
            var r = setInterval((function() {
                e() && (clearInterval(r), n && clearTimeout(n), t())
            }), i);
            s && (n = setTimeout((function() {
                clearInterval(r)
            }), s))
        }
    }

    function x(e, t, i) {
        if (A(e)) console.error("Inject assets error");
        else if (E(t) && (i = t, t = !1), T(t) && t in window) E(i) && i();
        else {
            var s;
            if (-1 !== e.indexOf(".css")) {
                if ((s = document.querySelectorAll('link[href="' + e + '"]')) && s.length > 0) return void(E(i) && i());
                var n = document.getElementsByTagName("head")[0],
                    r = n.querySelectorAll('link[rel="stylesheet"]'),
                    a = document.createElement("link");
                return a.rel = "stylesheet", a.type = "text/css", a.href = e, a.media = "all", r ? n.insertBefore(a, r[0]) : n.appendChild(a), void(E(i) && i())
            }
            if ((s = document.querySelectorAll('script[src="' + e + '"]')) && s.length > 0) {
                if (E(i)) {
                    if (T(t)) return w((function() {
                        return void 0 !== window[t]
                    }), (function() {
                        i()
                    })), !1;
                    i()
                }
            } else {
                var o = document.createElement("script");
                o.type = "text/javascript", o.src = e, o.onload = function() {
                    if (E(i)) {
                        if (T(t)) return w((function() {
                            return void 0 !== window[t]
                        }), (function() {
                            i()
                        })), !1;
                        i()
                    }
                }, document.body.appendChild(o)
            }
        }
    }

    function _() {
        return "navigator" in window && window.navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i)
    }

    function E(e) {
        return "function" == typeof e
    }

    function T(e) {
        return "string" == typeof e
    }

    function C(e) {
        return !(!e || !e.nodeType || 1 != e.nodeType)
    }

    function S(e) {
        return Array.isArray(e)
    }

    function M(e) {
        return e && e.length && isFinite(e.length)
    }

    function k(t) {
        return "object" === e(t) && null != t && !E(t) && !S(t)
    }

    function A(e) {
        return null == e
    }

    function P(e, t) {
        return null !== e && hasOwnProperty.call(e, t)
    }

    function O(e) {
        if (k(e)) {
            if (e.keys) return e.keys().length;
            var t = 0;
            for (var i in e) P(e, i) && t++;
            return t
        }
        return e.length
    }

    function L(e) {
        return !isNaN(parseFloat(e)) && isFinite(e)
    }

    function $() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1,
            t = document.querySelectorAll(".gbtn[data-taborder]:not(.disabled)");
        if (!t.length) return !1;
        if (1 == t.length) return t[0];
        "string" == typeof e && (e = parseInt(e));
        var i = [];
        a(t, (function(e) {
            i.push(e.getAttribute("data-taborder"))
        }));
        var s = Math.max.apply(Math, i.map((function(e) {
                return parseInt(e)
            }))),
            n = e < 0 ? 1 : e + 1;
        n > s && (n = "1");
        var r = i.filter((function(e) {
                return e >= parseInt(n)
            })),
            o = r.sort()[0];
        return document.querySelector('.gbtn[data-taborder="'.concat(o, '"]'))
    }

    function I(e) {
        if (e.events.hasOwnProperty("keyboard")) return !1;
        e.events.keyboard = l("keydown", {
            onElement: window,
            withCallback: function(t, i) {
                var s = (t = t || window.event).keyCode;
                if (9 == s) {
                    var n = document.querySelector(".gbtn.focused");
                    if (!n) {
                        var r = !(!document.activeElement || !document.activeElement.nodeName) && document.activeElement.nodeName.toLocaleLowerCase();
                        if ("input" == r || "textarea" == r || "button" == r) return
                    }
                    t.preventDefault();
                    var a = document.querySelectorAll(".gbtn[data-taborder]");
                    if (!a || a.length <= 0) return;
                    if (!n) {
                        var o = $();
                        return void(o && (o.focus(), d(o, "focused")))
                    }
                    var l = $(n.getAttribute("data-taborder"));
                    c(n, "focused"), l && (l.focus(), d(l, "focused"))
                }
                39 == s && e.nextSlide(), 37 == s && e.prevSlide(), 27 == s && e.close()
            }
        })
    }

    function z(e) {
        return Math.sqrt(e.x * e.x + e.y * e.y)
    }
    var D = function() {
        function e(i) {
            t(this, e), this.handlers = [], this.el = i
        }
        return s(e, [{
            key: "add",
            value: function(e) {
                this.handlers.push(e)
            }
        }, {
            key: "del",
            value: function(e) {
                e || (this.handlers = []);
                for (var t = this.handlers.length; t >= 0; t--) this.handlers[t] === e && this.handlers.splice(t, 1)
            }
        }, {
            key: "dispatch",
            value: function() {
                for (var e = 0, t = this.handlers.length; e < t; e++) {
                    var i = this.handlers[e];
                    "function" == typeof i && i.apply(this.el, arguments)
                }
            }
        }]), e
    }();

    function N(e, t) {
        var i = new D(e);
        return i.add(t), i
    }
    var B = function() {
        function e(i, s) {
            t(this, e), this.element = "string" == typeof i ? document.querySelector(i) : i, this.start = this.start.bind(this), this.move = this.move.bind(this), this.end = this.end.bind(this), this.cancel = this.cancel.bind(this), this.element.addEventListener("touchstart", this.start, !1), this.element.addEventListener("touchmove", this.move, !1), this.element.addEventListener("touchend", this.end, !1), this.element.addEventListener("touchcancel", this.cancel, !1), this.preV = {
                x: null,
                y: null
            }, this.pinchStartLen = null, this.zoom = 1, this.isDoubleTap = !1;
            var n = function() {};
            this.rotate = N(this.element, s.rotate || n), this.touchStart = N(this.element, s.touchStart || n), this.multipointStart = N(this.element, s.multipointStart || n), this.multipointEnd = N(this.element, s.multipointEnd || n), this.pinch = N(this.element, s.pinch || n), this.swipe = N(this.element, s.swipe || n), this.tap = N(this.element, s.tap || n), this.doubleTap = N(this.element, s.doubleTap || n), this.longTap = N(this.element, s.longTap || n), this.singleTap = N(this.element, s.singleTap || n), this.pressMove = N(this.element, s.pressMove || n), this.twoFingerPressMove = N(this.element, s.twoFingerPressMove || n), this.touchMove = N(this.element, s.touchMove || n), this.touchEnd = N(this.element, s.touchEnd || n), this.touchCancel = N(this.element, s.touchCancel || n), this.translateContainer = this.element, this._cancelAllHandler = this.cancelAll.bind(this), window.addEventListener("scroll", this._cancelAllHandler), this.delta = null, this.last = null, this.now = null, this.tapTimeout = null, this.singleTapTimeout = null, this.longTapTimeout = null, this.swipeTimeout = null, this.x1 = this.x2 = this.y1 = this.y2 = null, this.preTapPosition = {
                x: null,
                y: null
            }
        }
        return s(e, [{
            key: "start",
            value: function(e) {
                if (e.touches)
                    if (e.target && e.target.nodeName && ["a", "button", "input"].indexOf(e.target.nodeName.toLowerCase()) >= 0) console.log("ignore drag for this touched element", e.target.nodeName.toLowerCase());
                    else {
                        this.now = Date.now(), this.x1 = e.touches[0].pageX, this.y1 = e.touches[0].pageY, this.delta = this.now - (this.last || this.now), this.touchStart.dispatch(e, this.element), null !== this.preTapPosition.x && (this.isDoubleTap = this.delta > 0 && this.delta <= 250 && Math.abs(this.preTapPosition.x - this.x1) < 30 && Math.abs(this.preTapPosition.y - this.y1) < 30, this.isDoubleTap && clearTimeout(this.singleTapTimeout)), this.preTapPosition.x = this.x1, this.preTapPosition.y = this.y1, this.last = this.now;
                        var t = this.preV;
                        if (e.touches.length > 1) {
                            this._cancelLongTap(), this._cancelSingleTap();
                            var i = {
                                x: e.touches[1].pageX - this.x1,
                                y: e.touches[1].pageY - this.y1
                            };
                            t.x = i.x, t.y = i.y, this.pinchStartLen = z(t), this.multipointStart.dispatch(e, this.element)
                        }
                        this._preventTap = !1, this.longTapTimeout = setTimeout(function() {
                            this.longTap.dispatch(e, this.element), this._preventTap = !0
                        }.bind(this), 750)
                    }
            }
        }, {
            key: "move",
            value: function(e) {
                if (e.touches) {
                    var t = this.preV,
                        i = e.touches.length,
                        s = e.touches[0].pageX,
                        n = e.touches[0].pageY;
                    if (this.isDoubleTap = !1, i > 1) {
                        var r = e.touches[1].pageX,
                            a = e.touches[1].pageY,
                            o = {
                                x: e.touches[1].pageX - s,
                                y: e.touches[1].pageY - n
                            };
                        null !== t.x && (this.pinchStartLen > 0 && (e.zoom = z(o) / this.pinchStartLen, this.pinch.dispatch(e, this.element)), e.angle = function(e, t) {
                            var i = function(e, t) {
                                var i = z(e) * z(t);
                                if (0 === i) return 0;
                                var s = function(e, t) {
                                    return e.x * t.x + e.y * t.y
                                }(e, t) / i;
                                return s > 1 && (s = 1), Math.acos(s)
                            }(e, t);
                            return function(e, t) {
                                return e.x * t.y - t.x * e.y
                            }(e, t) > 0 && (i *= -1), 180 * i / Math.PI
                        }(o, t), this.rotate.dispatch(e, this.element)), t.x = o.x, t.y = o.y, null !== this.x2 && null !== this.sx2 ? (e.deltaX = (s - this.x2 + r - this.sx2) / 2, e.deltaY = (n - this.y2 + a - this.sy2) / 2) : (e.deltaX = 0, e.deltaY = 0), this.twoFingerPressMove.dispatch(e, this.element), this.sx2 = r, this.sy2 = a
                    } else {
                        if (null !== this.x2) {
                            e.deltaX = s - this.x2, e.deltaY = n - this.y2;
                            var l = Math.abs(this.x1 - this.x2),
                                d = Math.abs(this.y1 - this.y2);
                            (l > 10 || d > 10) && (this._preventTap = !0)
                        } else e.deltaX = 0, e.deltaY = 0;
                        this.pressMove.dispatch(e, this.element)
                    }
                    this.touchMove.dispatch(e, this.element), this._cancelLongTap(), this.x2 = s, this.y2 = n, i > 1 && e.preventDefault()
                }
            }
        }, {
            key: "end",
            value: function(e) {
                if (e.changedTouches) {
                    this._cancelLongTap();
                    var t = this;
                    e.touches.length < 2 && (this.multipointEnd.dispatch(e, this.element), this.sx2 = this.sy2 = null), this.x2 && Math.abs(this.x1 - this.x2) > 30 || this.y2 && Math.abs(this.y1 - this.y2) > 30 ? (e.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2), this.swipeTimeout = setTimeout((function() {
                        t.swipe.dispatch(e, t.element)
                    }), 0)) : (this.tapTimeout = setTimeout((function() {
                        t._preventTap || t.tap.dispatch(e, t.element), t.isDoubleTap && (t.doubleTap.dispatch(e, t.element), t.isDoubleTap = !1)
                    }), 0), t.isDoubleTap || (t.singleTapTimeout = setTimeout((function() {
                        t.singleTap.dispatch(e, t.element)
                    }), 250))), this.touchEnd.dispatch(e, this.element), this.preV.x = 0, this.preV.y = 0, this.zoom = 1, this.pinchStartLen = null, this.x1 = this.x2 = this.y1 = this.y2 = null
                }
            }
        }, {
            key: "cancelAll",
            value: function() {
                this._preventTap = !0, clearTimeout(this.singleTapTimeout), clearTimeout(this.tapTimeout), clearTimeout(this.longTapTimeout), clearTimeout(this.swipeTimeout)
            }
        }, {
            key: "cancel",
            value: function(e) {
                this.cancelAll(), this.touchCancel.dispatch(e, this.element)
            }
        }, {
            key: "_cancelLongTap",
            value: function() {
                clearTimeout(this.longTapTimeout)
            }
        }, {
            key: "_cancelSingleTap",
            value: function() {
                clearTimeout(this.singleTapTimeout)
            }
        }, {
            key: "_swipeDirection",
            value: function(e, t, i, s) {
                return Math.abs(e - t) >= Math.abs(i - s) ? e - t > 0 ? "Left" : "Right" : i - s > 0 ? "Up" : "Down"
            }
        }, {
            key: "on",
            value: function(e, t) {
                this[e] && this[e].add(t)
            }
        }, {
            key: "off",
            value: function(e, t) {
                this[e] && this[e].del(t)
            }
        }, {
            key: "destroy",
            value: function() {
                return this.singleTapTimeout && clearTimeout(this.singleTapTimeout), this.tapTimeout && clearTimeout(this.tapTimeout), this.longTapTimeout && clearTimeout(this.longTapTimeout), this.swipeTimeout && clearTimeout(this.swipeTimeout), this.element.removeEventListener("touchstart", this.start), this.element.removeEventListener("touchmove", this.move), this.element.removeEventListener("touchend", this.end), this.element.removeEventListener("touchcancel", this.cancel), this.rotate.del(), this.touchStart.del(), this.multipointStart.del(), this.multipointEnd.del(), this.pinch.del(), this.swipe.del(), this.tap.del(), this.doubleTap.del(), this.longTap.del(), this.singleTap.del(), this.pressMove.del(), this.twoFingerPressMove.del(), this.touchMove.del(), this.touchEnd.del(), this.touchCancel.del(), this.preV = this.pinchStartLen = this.zoom = this.isDoubleTap = this.delta = this.last = this.now = this.tapTimeout = this.singleTapTimeout = this.longTapTimeout = this.swipeTimeout = this.x1 = this.x2 = this.y1 = this.y2 = this.preTapPosition = this.rotate = this.touchStart = this.multipointStart = this.multipointEnd = this.pinch = this.swipe = this.tap = this.doubleTap = this.longTap = this.singleTap = this.pressMove = this.touchMove = this.touchEnd = this.touchCancel = this.twoFingerPressMove = null, window.removeEventListener("scroll", this._cancelAllHandler), null
            }
        }]), e
    }();

    function j(e) {
        var t = function() {
                var e, t = document.createElement("fakeelement"),
                    i = {
                        transition: "transitionend",
                        OTransition: "oTransitionEnd",
                        MozTransition: "transitionend",
                        WebkitTransition: "webkitTransitionEnd"
                    };
                for (e in i)
                    if (void 0 !== t.style[e]) return i[e]
            }(),
            i = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            s = u(e, "gslide-media") ? e : e.querySelector(".gslide-media"),
            n = h(s, ".ginner-container"),
            r = e.querySelector(".gslide-description");
        i > 769 && (s = n), d(s, "greset"), f(s, "translate3d(0, 0, 0)"), l(t, {
            onElement: s,
            once: !0,
            withCallback: function(e, t) {
                c(s, "greset")
            }
        }), s.style.opacity = "", r && (r.style.opacity = "")
    }

    function H(e) {
        if (e.events.hasOwnProperty("touch")) return !1;
        var t, i, s, n = y(),
            r = n.width,
            a = n.height,
            o = !1,
            l = null,
            p = null,
            m = null,
            g = !1,
            v = 1,
            b = 1,
            w = !1,
            x = !1,
            _ = null,
            E = null,
            T = null,
            C = null,
            S = 0,
            M = 0,
            k = !1,
            A = !1,
            P = {},
            O = {},
            L = 0,
            $ = 0,
            I = document.getElementById("glightbox-slider"),
            z = document.querySelector(".goverlay"),
            D = new B(I, {
                touchStart: function(t) {
                    if (o = !0, (u(t.targetTouches[0].target, "ginner-container") || h(t.targetTouches[0].target, ".gslide-desc") || "a" == t.targetTouches[0].target.nodeName.toLowerCase()) && (o = !1), h(t.targetTouches[0].target, ".gslide-inline") && !u(t.targetTouches[0].target.parentNode, "gslide-inline") && (o = !1), o) {
                        if (O = t.targetTouches[0], P.pageX = t.targetTouches[0].pageX, P.pageY = t.targetTouches[0].pageY, L = t.targetTouches[0].clientX, $ = t.targetTouches[0].clientY, l = e.activeSlide, p = l.querySelector(".gslide-media"), s = l.querySelector(".gslide-inline"), m = null, u(p, "gslide-image") && (m = p.querySelector("img")), (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) > 769 && (p = l.querySelector(".ginner-container")), c(z, "greset"), t.pageX > 20 && t.pageX < window.innerWidth - 20) return;
                        t.preventDefault()
                    }
                },
                touchMove: function(n) {
                    if (o && (O = n.targetTouches[0], !w && !x)) {
                        if (s && s.offsetHeight > a) {
                            var l = P.pageX - O.pageX;
                            if (Math.abs(l) <= 13) return !1
                        }
                        g = !0;
                        var d, c = n.targetTouches[0].clientX,
                            u = n.targetTouches[0].clientY,
                            h = L - c,
                            v = $ - u;
                        if (Math.abs(h) > Math.abs(v) ? (k = !1, A = !0) : (A = !1, k = !0), t = O.pageX - P.pageX, S = 100 * t / r, i = O.pageY - P.pageY, M = 100 * i / a, k && m && (d = 1 - Math.abs(i) / a, z.style.opacity = d, e.settings.touchFollowAxis && (S = 0)), A && (d = 1 - Math.abs(t) / r, p.style.opacity = d, e.settings.touchFollowAxis && (M = 0)), !m) return f(p, "translate3d(".concat(S, "%, 0, 0)"));
                        f(p, "translate3d(".concat(S, "%, ").concat(M, "%, 0)"))
                    }
                },
                touchEnd: function() {
                    if (o) {
                        if (g = !1, x || w) return T = _, void(C = E);
                        var t = Math.abs(parseInt(M)),
                            i = Math.abs(parseInt(S));
                        if (!(t > 29 && m)) return t < 29 && i < 25 ? (d(z, "greset"), z.style.opacity = 1, j(p)) : void 0;
                        e.close()
                    }
                },
                multipointEnd: function() {
                    setTimeout((function() {
                        w = !1
                    }), 50)
                },
                multipointStart: function() {
                    w = !0, v = b || 1
                },
                pinch: function(e) {
                    if (!m || g) return !1;
                    w = !0, m.scaleX = m.scaleY = v * e.zoom;
                    var t = v * e.zoom;
                    if (x = !0, t <= 1) return x = !1, t = 1, C = null, T = null, _ = null, E = null, void m.setAttribute("style", "");
                    t > 4.5 && (t = 4.5), m.style.transform = "scale3d(".concat(t, ", ").concat(t, ", 1)"), b = t
                },
                pressMove: function(e) {
                    if (x && !w) {
                        var t = O.pageX - P.pageX,
                            i = O.pageY - P.pageY;
                        T && (t += T), C && (i += C), _ = t, E = i;
                        var s = "translate3d(".concat(t, "px, ").concat(i, "px, 0)");
                        b && (s += " scale3d(".concat(b, ", ").concat(b, ", 1)")), f(m, s)
                    }
                },
                swipe: function(t) {
                    if (!x)
                        if (w) w = !1;
                        else {
                            if ("Left" == t.direction) {
                                if (e.index == e.elements.length - 1) return j(p);
                                e.nextSlide()
                            }
                            if ("Right" == t.direction) {
                                if (0 == e.index) return j(p);
                                e.prevSlide()
                            }
                        }
                }
            });
        e.events.touch = D
    }
    var q = function() {
            function e(i, s) {
                var n = this,
                    r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
                if (t(this, e), this.img = i, this.slide = s, this.onclose = r, this.img.setZoomEvents) return !1;
                this.active = !1, this.zoomedIn = !1, this.dragging = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.img.addEventListener("mousedown", (function(e) {
                    return n.dragStart(e)
                }), !1), this.img.addEventListener("mouseup", (function(e) {
                    return n.dragEnd(e)
                }), !1), this.img.addEventListener("mousemove", (function(e) {
                    return n.drag(e)
                }), !1), this.img.addEventListener("click", (function(e) {
                    return n.slide.classList.contains("dragging-nav") ? (n.zoomOut(), !1) : n.zoomedIn ? void(n.zoomedIn && !n.dragging && n.zoomOut()) : n.zoomIn()
                }), !1), this.img.setZoomEvents = !0
            }
            return s(e, [{
                key: "zoomIn",
                value: function() {
                    var e = this.widowWidth();
                    if (!(this.zoomedIn || e <= 768)) {
                        var t = this.img;
                        if (t.setAttribute("data-style", t.getAttribute("style")), t.style.maxWidth = t.naturalWidth + "px", t.style.maxHeight = t.naturalHeight + "px", t.naturalWidth > e) {
                            var i = e / 2 - t.naturalWidth / 2;
                            this.setTranslate(this.img.parentNode, i, 0)
                        }
                        this.slide.classList.add("zoomed"), this.zoomedIn = !0
                    }
                }
            }, {
                key: "zoomOut",
                value: function() {
                    this.img.parentNode.setAttribute("style", ""), this.img.setAttribute("style", this.img.getAttribute("data-style")), this.slide.classList.remove("zoomed"), this.zoomedIn = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.onclose && "function" == typeof this.onclose && this.onclose()
                }
            }, {
                key: "dragStart",
                value: function(e) {
                    e.preventDefault(), this.zoomedIn ? ("touchstart" === e.type ? (this.initialX = e.touches[0].clientX - this.xOffset, this.initialY = e.touches[0].clientY - this.yOffset) : (this.initialX = e.clientX - this.xOffset, this.initialY = e.clientY - this.yOffset), e.target === this.img && (this.active = !0, this.img.classList.add("dragging"))) : this.active = !1
                }
            }, {
                key: "dragEnd",
                value: function(e) {
                    var t = this;
                    e.preventDefault(), this.initialX = this.currentX, this.initialY = this.currentY, this.active = !1, setTimeout((function() {
                        t.dragging = !1, t.img.isDragging = !1, t.img.classList.remove("dragging")
                    }), 100)
                }
            }, {
                key: "drag",
                value: function(e) {
                    this.active && (e.preventDefault(), "touchmove" === e.type ? (this.currentX = e.touches[0].clientX - this.initialX, this.currentY = e.touches[0].clientY - this.initialY) : (this.currentX = e.clientX - this.initialX, this.currentY = e.clientY - this.initialY), this.xOffset = this.currentX, this.yOffset = this.currentY, this.img.isDragging = !0, this.dragging = !0, this.setTranslate(this.img, this.currentX, this.currentY))
                }
            }, {
                key: "onMove",
                value: function(e) {
                    if (this.zoomedIn) {
                        var t = e.clientX - this.img.naturalWidth / 2,
                            i = e.clientY - this.img.naturalHeight / 2;
                        this.setTranslate(this.img, t, i)
                    }
                }
            }, {
                key: "setTranslate",
                value: function(e, t, i) {
                    e.style.transform = "translate3d(" + t + "px, " + i + "px, 0)"
                }
            }, {
                key: "widowWidth",
                value: function() {
                    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
                }
            }]), e
        }(),
        W = function() {
            function e() {
                var i = this,
                    s = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                t(this, e);
                var n = s.dragEl,
                    r = s.toleranceX,
                    a = void 0 === r ? 40 : r,
                    o = s.toleranceY,
                    l = void 0 === o ? 65 : o,
                    d = s.slide,
                    c = void 0 === d ? null : d,
                    u = s.instance,
                    h = void 0 === u ? null : u;
                this.el = n, this.active = !1, this.dragging = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.direction = null, this.lastDirection = null, this.toleranceX = a, this.toleranceY = l, this.toleranceReached = !1, this.dragContainer = this.el, this.slide = c, this.instance = h, this.el.addEventListener("mousedown", (function(e) {
                    return i.dragStart(e)
                }), !1), this.el.addEventListener("mouseup", (function(e) {
                    return i.dragEnd(e)
                }), !1), this.el.addEventListener("mousemove", (function(e) {
                    return i.drag(e)
                }), !1)
            }
            return s(e, [{
                key: "dragStart",
                value: function(e) {
                    if (this.slide.classList.contains("zoomed")) this.active = !1;
                    else {
                        "touchstart" === e.type ? (this.initialX = e.touches[0].clientX - this.xOffset, this.initialY = e.touches[0].clientY - this.yOffset) : (this.initialX = e.clientX - this.xOffset, this.initialY = e.clientY - this.yOffset);
                        var t = e.target.nodeName.toLowerCase();
                        e.target.classList.contains("nodrag") || h(e.target, ".nodrag") || -1 !== ["input", "select", "textarea", "button", "a"].indexOf(t) ? this.active = !1 : (e.preventDefault(), (e.target === this.el || "img" !== t && h(e.target, ".gslide-inline")) && (this.active = !0, this.el.classList.add("dragging"), this.dragContainer = h(e.target, ".ginner-container")))
                    }
                }
            }, {
                key: "dragEnd",
                value: function(e) {
                    var t = this;
                    e && e.preventDefault(), this.initialX = 0, this.initialY = 0, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.active = !1, this.doSlideChange && (this.instance.preventOutsideClick = !0, "right" == this.doSlideChange && this.instance.prevSlide(), "left" == this.doSlideChange && this.instance.nextSlide()), this.doSlideClose && this.instance.close(), this.toleranceReached || this.setTranslate(this.dragContainer, 0, 0, !0), setTimeout((function() {
                        t.instance.preventOutsideClick = !1, t.toleranceReached = !1, t.lastDirection = null, t.dragging = !1, t.el.isDragging = !1, t.el.classList.remove("dragging"), t.slide.classList.remove("dragging-nav"), t.dragContainer.style.transform = "", t.dragContainer.style.transition = ""
                    }), 100)
                }
            }, {
                key: "drag",
                value: function(e) {
                    if (this.active) {
                        e.preventDefault(), this.slide.classList.add("dragging-nav"), "touchmove" === e.type ? (this.currentX = e.touches[0].clientX - this.initialX, this.currentY = e.touches[0].clientY - this.initialY) : (this.currentX = e.clientX - this.initialX, this.currentY = e.clientY - this.initialY), this.xOffset = this.currentX, this.yOffset = this.currentY, this.el.isDragging = !0, this.dragging = !0, this.doSlideChange = !1, this.doSlideClose = !1;
                        var t = Math.abs(this.currentX),
                            i = Math.abs(this.currentY);
                        if (t > 0 && t >= Math.abs(this.currentY) && (!this.lastDirection || "x" == this.lastDirection)) {
                            this.yOffset = 0, this.lastDirection = "x", this.setTranslate(this.dragContainer, this.currentX, 0);
                            var s = this.shouldChange();
                            if (!this.instance.settings.dragAutoSnap && s && (this.doSlideChange = s), this.instance.settings.dragAutoSnap && s) return this.instance.preventOutsideClick = !0, this.toleranceReached = !0, this.active = !1, this.instance.preventOutsideClick = !0, this.dragEnd(null), "right" == s && this.instance.prevSlide(), void("left" == s && this.instance.nextSlide())
                        }
                        if (this.toleranceY > 0 && i > 0 && i >= t && (!this.lastDirection || "y" == this.lastDirection)) {
                            this.xOffset = 0, this.lastDirection = "y", this.setTranslate(this.dragContainer, 0, this.currentY);
                            var n = this.shouldClose();
                            return !this.instance.settings.dragAutoSnap && n && (this.doSlideClose = !0), void(this.instance.settings.dragAutoSnap && n && this.instance.close())
                        }
                    }
                }
            }, {
                key: "shouldChange",
                value: function() {
                    var e = !1;
                    if (Math.abs(this.currentX) >= this.toleranceX) {
                        var t = this.currentX > 0 ? "right" : "left";
                        ("left" == t && this.slide !== this.slide.parentNode.lastChild || "right" == t && this.slide !== this.slide.parentNode.firstChild) && (e = t)
                    }
                    return e
                }
            }, {
                key: "shouldClose",
                value: function() {
                    var e = !1;
                    return Math.abs(this.currentY) >= this.toleranceY && (e = !0), e
                }
            }, {
                key: "setTranslate",
                value: function(e, t, i) {
                    var s = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
                    e.style.transition = s ? "all .2s ease" : "", e.style.transform = "translate3d(".concat(t, "px, ").concat(i, "px, 0)")
                }
            }]), e
        }();

    function Y(e, t, i, s) {
        var n = e.querySelector(".gslide-media"),
            r = new Image,
            a = "gSlideTitle_" + i,
            o = "gSlideDesc_" + i;
        r.addEventListener("load", (function() {
            E(s) && s()
        }), !1), r.src = t.href, "" != t.sizes && "" != t.srcset && (r.sizes = t.sizes, r.srcset = t.srcset), r.alt = "", A(t.alt) || "" === t.alt || (r.alt = t.alt), "" !== t.title && r.setAttribute("aria-labelledby", a), "" !== t.description && r.setAttribute("aria-describedby", o), t.hasOwnProperty("_hasCustomWidth") && t._hasCustomWidth && (r.style.width = t.width), t.hasOwnProperty("_hasCustomHeight") && t._hasCustomHeight && (r.style.height = t.height), n.insertBefore(r, n.firstChild)
    }

    function X(e, t, i, s) {
        var n = this,
            r = e.querySelector(".ginner-container"),
            a = "gvideo" + i,
            o = e.querySelector(".gslide-media"),
            l = this.getAllPlayers();
        d(r, "gvideo-container"), o.insertBefore(v('<div class="gvideo-wrapper"></div>'), o.firstChild);
        var c = e.querySelector(".gvideo-wrapper");
        x(this.settings.plyr.css, "Plyr");
        var u = t.href,
            h = null == t ? void 0 : t.videoProvider,
            p = !1;
        o.style.maxWidth = t.width, x(this.settings.plyr.js, "Plyr", (function() {
            if (!h && u.match(/vimeo\.com\/([0-9]*)/) && (h = "vimeo"), !h && (u.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || u.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) || u.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/)) && (h = "youtube"), "local" === h || !h) {
                h = "local";
                var r = '<video id="' + a + '" ';
                r += 'style="background:#000; max-width: '.concat(t.width, ';" '), r += 'preload="metadata" ', r += 'x-webkit-airplay="allow" ', r += "playsinline ", r += "controls ", r += 'class="gvideo-local">', r += '<source src="'.concat(u, '">'), p = v(r += "</video>")
            }
            var o = p || v('<div id="'.concat(a, '" data-plyr-provider="').concat(h, '" data-plyr-embed-id="').concat(u, '"></div>'));
            d(c, "".concat(h, "-video gvideo")), c.appendChild(o), c.setAttribute("data-id", a), c.setAttribute("data-index", i);
            var f = P(n.settings.plyr, "config") ? n.settings.plyr.config : {},
                m = new Plyr("#" + a, f);
            m.on("ready", (function(e) {
                l[a] = e.detail.plyr, E(s) && s()
            })), w((function() {
                return e.querySelector("iframe") && "true" == e.querySelector("iframe").dataset.ready
            }), (function() {
                n.resize(e)
            })), m.on("enterfullscreen", R), m.on("exitfullscreen", R)
        }))
    }

    function R(e) {
        var t = h(e.target, ".gslide-media");
        "enterfullscreen" === e.type && d(t, "fullscreen"), "exitfullscreen" === e.type && c(t, "fullscreen")
    }

    function F(e, t, i, s) {
        var n, r = this,
            a = e.querySelector(".gslide-media"),
            o = !(!P(t, "href") || !t.href) && t.href.split("#").pop().trim(),
            c = !(!P(t, "content") || !t.content) && t.content;
        if (c && (T(c) && (n = v('<div class="ginlined-content">'.concat(c, "</div>"))), C(c))) {
            "none" == c.style.display && (c.style.display = "block");
            var u = document.createElement("div");
            u.className = "ginlined-content", u.appendChild(c), n = u
        }
        if (o) {
            var h = document.getElementById(o);
            if (!h) return !1;
            var p = h.cloneNode(!0);
            p.style.height = t.height, p.style.maxWidth = t.width, d(p, "ginlined-content"), n = p
        }
        if (!n) return console.error("Unable to append inline slide content", t), !1;
        a.style.height = t.height, a.style.width = t.width, a.appendChild(n), this.events["inlineclose" + o] = l("click", {
            onElement: a.querySelectorAll(".gtrigger-close"),
            withCallback: function(e) {
                e.preventDefault(), r.close()
            }
        }), E(s) && s()
    }

    function G(e, t, i, s) {
        var n = e.querySelector(".gslide-media"),
            r = function(e) {
                var t = e.url,
                    i = e.allow,
                    s = e.callback,
                    n = e.appendTo,
                    r = document.createElement("iframe");
                return r.className = "vimeo-video gvideo", r.src = t, r.style.width = "100%", r.style.height = "100%", i && r.setAttribute("allow", i), r.onload = function() {
                    r.onload = null, d(r, "node-ready"), E(s) && s()
                }, n && n.appendChild(r), r
            }({
                url: t.href,
                callback: s
            });
        n.parentNode.style.maxWidth = t.width, n.parentNode.style.height = t.height, n.appendChild(r)
    }
    var V = function() {
            function e() {
                var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                t(this, e), this.defaults = {
                    href: "",
                    sizes: "",
                    srcset: "",
                    title: "",
                    type: "",
                    videoProvider: "",
                    description: "",
                    alt: "",
                    descPosition: "bottom",
                    effect: "",
                    width: "",
                    height: "",
                    content: !1,
                    zoomable: !0,
                    draggable: !0
                }, k(i) && (this.defaults = r(this.defaults, i))
            }
            return s(e, [{
                key: "sourceType",
                value: function(e) {
                    var t = e;
                    return null !== (e = e.toLowerCase()).match(/\.(jpeg|jpg|jpe|gif|png|apn|webp|avif|svg)/) ? "image" : e.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || e.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) || e.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/) || e.match(/vimeo\.com\/([0-9]*)/) || null !== e.match(/\.(mp4|ogg|webm|mov)/) ? "video" : null !== e.match(/\.(mp3|wav|wma|aac|ogg)/) ? "audio" : e.indexOf("#") > -1 && "" !== t.split("#").pop().trim() ? "inline" : e.indexOf("goajax=true") > -1 ? "ajax" : "external"
                }
            }, {
                key: "parseConfig",
                value: function(e, t) {
                    var i = this,
                        s = r({
                            descPosition: t.descPosition
                        }, this.defaults);
                    if (k(e) && !C(e)) {
                        P(e, "type") || (P(e, "content") && e.content ? e.type = "inline" : P(e, "href") && (e.type = this.sourceType(e.href)));
                        var n = r(s, e);
                        return this.setSize(n, t), n
                    }
                    var o = "",
                        l = e.getAttribute("data-glightbox"),
                        d = e.nodeName.toLowerCase();
                    if ("a" === d && (o = e.href), "img" === d && (o = e.src, s.alt = e.alt), s.href = o, a(s, (function(n, r) {
                            P(t, r) && "width" !== r && (s[r] = t[r]);
                            var a = e.dataset[r];
                            A(a) || (s[r] = i.sanitizeValue(a))
                        })), s.content && (s.type = "inline"), !s.type && o && (s.type = this.sourceType(o)), A(l)) {
                        if (!s.title && "a" == d) {
                            var c = e.title;
                            A(c) || "" === c || (s.title = c)
                        }
                        if (!s.title && "img" == d) {
                            var u = e.alt;
                            A(u) || "" === u || (s.title = u)
                        }
                    } else {
                        var h = [];
                        a(s, (function(e, t) {
                            h.push(";\\s?" + t)
                        })), h = h.join("\\s?:|"), "" !== l.trim() && a(s, (function(e, t) {
                            var n = l,
                                r = new RegExp("s?" + t + "s?:s?(.*?)(" + h + "s?:|$)"),
                                a = n.match(r);
                            if (a && a.length && a[1]) {
                                var o = a[1].trim().replace(/;\s*$/, "");
                                s[t] = i.sanitizeValue(o)
                            }
                        }))
                    }
                    if (s.description && "." === s.description.substring(0, 1)) {
                        var p;
                        try {
                            p = document.querySelector(s.description).innerHTML
                        } catch (e) {
                            if (!(e instanceof DOMException)) throw e
                        }
                        p && (s.description = p)
                    }
                    if (!s.description) {
                        var f = e.querySelector(".glightbox-desc");
                        f && (s.description = f.innerHTML)
                    }
                    return this.setSize(s, t, e), this.slideConfig = s, s
                }
            }, {
                key: "setSize",
                value: function(e, t) {
                    var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                        s = "video" == e.type ? this.checkSize(t.videosWidth) : this.checkSize(t.width),
                        n = this.checkSize(t.height);
                    return e.width = P(e, "width") && "" !== e.width ? this.checkSize(e.width) : s, e.height = P(e, "height") && "" !== e.height ? this.checkSize(e.height) : n, i && "image" == e.type && (e._hasCustomWidth = !!i.dataset.width, e._hasCustomHeight = !!i.dataset.height), e
                }
            }, {
                key: "checkSize",
                value: function(e) {
                    return L(e) ? "".concat(e, "px") : e
                }
            }, {
                key: "sanitizeValue",
                value: function(e) {
                    return "true" !== e && "false" !== e ? e : "true" === e
                }
            }]), e
        }(),
        U = function() {
            function e(i, s, n) {
                t(this, e), this.element = i, this.instance = s, this.index = n
            }
            return s(e, [{
                key: "setContent",
                value: function() {
                    var e = this,
                        t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                        i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    if (u(t, "loaded")) return !1;
                    var s = this.instance.settings,
                        n = this.slideConfig,
                        r = _();
                    E(s.beforeSlideLoad) && s.beforeSlideLoad({
                        index: this.index,
                        slide: t,
                        player: !1
                    });
                    var a = n.type,
                        o = n.descPosition,
                        l = t.querySelector(".gslide-media"),
                        c = t.querySelector(".gslide-title"),
                        h = t.querySelector(".gslide-desc"),
                        p = t.querySelector(".gdesc-inner"),
                        f = i,
                        m = "gSlideTitle_" + this.index,
                        g = "gSlideDesc_" + this.index;
                    if (E(s.afterSlideLoad) && (f = function() {
                            E(i) && i(), s.afterSlideLoad({
                                index: e.index,
                                slide: t,
                                player: e.instance.getSlidePlayerInstance(e.index)
                            })
                        }), "" == n.title && "" == n.description ? p && p.parentNode.parentNode.removeChild(p.parentNode) : (c && "" !== n.title ? (c.id = m, c.innerHTML = n.title) : c.parentNode.removeChild(c), h && "" !== n.description ? (h.id = g, r && s.moreLength > 0 ? (n.smallDescription = this.slideShortDesc(n.description, s.moreLength, s.moreText), h.innerHTML = n.smallDescription, this.descriptionEvents(h, n)) : h.innerHTML = n.description) : h.parentNode.removeChild(h), d(l.parentNode, "desc-".concat(o)), d(p.parentNode, "description-".concat(o))), d(l, "gslide-".concat(a)), d(t, "loaded"), "video" !== a) {
                        if ("external" !== a) return "inline" === a ? (F.apply(this.instance, [t, n, this.index, f]), void(n.draggable && new W({
                            dragEl: t.querySelector(".gslide-inline"),
                            toleranceX: s.dragToleranceX,
                            toleranceY: s.dragToleranceY,
                            slide: t,
                            instance: this.instance
                        }))) : void("image" !== a ? E(f) && f() : Y(t, n, this.index, (function() {
                            var i = t.querySelector("img");
                            n.draggable && new W({
                                dragEl: i,
                                toleranceX: s.dragToleranceX,
                                toleranceY: s.dragToleranceY,
                                slide: t,
                                instance: e.instance
                            }), n.zoomable && i.naturalWidth > i.offsetWidth && (d(i, "zoomable"), new q(i, t, (function() {
                                e.instance.resize()
                            }))), E(f) && f()
                        })));
                        G.apply(this, [t, n, this.index, f])
                    } else X.apply(this.instance, [t, n, this.index, f])
                }
            }, {
                key: "slideShortDesc",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 50,
                        i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                        s = document.createElement("div");
                    s.innerHTML = e;
                    var n = s.innerText,
                        r = i;
                    if ((e = n.trim()).length <= t) return e;
                    var a = e.substr(0, t - 1);
                    return r ? (s = null, a + '... <a href="#" class="desc-more">' + i + "</a>") : a
                }
            }, {
                key: "descriptionEvents",
                value: function(e, t) {
                    var i = this,
                        s = e.querySelector(".desc-more");
                    if (!s) return !1;
                    l("click", {
                        onElement: s,
                        withCallback: function(e, s) {
                            e.preventDefault();
                            var n = document.body,
                                r = h(s, ".gslide-desc");
                            if (!r) return !1;
                            r.innerHTML = t.description, d(n, "gdesc-open");
                            var a = l("click", {
                                onElement: [n, h(r, ".gslide-description")],
                                withCallback: function(e, s) {
                                    "a" !== e.target.nodeName.toLowerCase() && (c(n, "gdesc-open"), d(n, "gdesc-closed"), r.innerHTML = t.smallDescription, i.descriptionEvents(r, t), setTimeout((function() {
                                        c(n, "gdesc-closed")
                                    }), 400), a.destroy())
                                }
                            })
                        }
                    })
                }
            }, {
                key: "create",
                value: function() {
                    return v(this.instance.settings.slideHTML)
                }
            }, {
                key: "getConfig",
                value: function() {
                    C(this.element) || this.element.hasOwnProperty("draggable") || (this.element.draggable = this.instance.settings.draggable);
                    var e = new V(this.instance.settings.slideExtraAttributes);
                    return this.slideConfig = e.parseConfig(this.element, this.instance.settings), this.slideConfig
                }
            }]), e
        }(),
        Q = _(),
        K = null !== _() || void 0 !== document.createTouch || "ontouchstart" in window || "onmsgesturechange" in window || navigator.msMaxTouchPoints,
        Z = document.getElementsByTagName("html")[0],
        J = {
            selector: ".glightbox",
            elements: null,
            skin: "clean",
            theme: "clean",
            closeButton: !0,
            startAt: null,
            autoplayVideos: !0,
            autofocusVideos: !0,
            descPosition: "bottom",
            width: "900px",
            height: "506px",
            videosWidth: "960px",
            beforeSlideChange: null,
            afterSlideChange: null,
            beforeSlideLoad: null,
            afterSlideLoad: null,
            slideInserted: null,
            slideRemoved: null,
            slideExtraAttributes: null,
            onOpen: null,
            onClose: null,
            loop: !1,
            zoomable: !0,
            draggable: !0,
            dragAutoSnap: !1,
            dragToleranceX: 40,
            dragToleranceY: 65,
            preload: !0,
            oneSlidePerOpen: !1,
            touchNavigation: !0,
            touchFollowAxis: !0,
            keyboardNavigation: !0,
            closeOnOutsideClick: !0,
            plugins: !1,
            plyr: {
                css: "https://cdn.plyr.io/3.6.12/plyr.css",
                js: "https://cdn.plyr.io/3.6.12/plyr.js",
                config: {
                    ratio: "16:9",
                    fullscreen: {
                        enabled: !0,
                        iosNative: !0
                    },
                    youtube: {
                        noCookie: !0,
                        rel: 0,
                        showinfo: 0,
                        iv_load_policy: 3
                    },
                    vimeo: {
                        byline: !1,
                        portrait: !1,
                        title: !1,
                        transparent: !1
                    }
                }
            },
            openEffect: "zoom",
            closeEffect: "zoom",
            slideEffect: "slide",
            moreText: "See more",
            moreLength: 60,
            cssEfects: {
                fade: { in: "fadeIn",
                    out: "fadeOut"
                },
                zoom: { in: "zoomIn",
                    out: "zoomOut"
                },
                slide: { in: "slideInRight",
                    out: "slideOutLeft"
                },
                slideBack: { in: "slideInLeft",
                    out: "slideOutRight"
                },
                none: { in: "none",
                    out: "none"
                }
            },
            svg: {
                close: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><g><g><path d="M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306C514.019,27.23,514.019,14.135,505.943,6.058z"/></g></g><g><g><path d="M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z"/></g></g></svg>',
                next: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"> <g><path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"/></g></svg>',
                prev: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"><g><path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/></g></svg>'
            },
            slideHTML: '<div class="gslide">\n    <div class="gslide-inner-content">\n        <div class="ginner-container">\n            <div class="gslide-media">\n            </div>\n            <div class="gslide-description">\n                <div class="gdesc-inner">\n                    <h4 class="gslide-title"></h4>\n                    <div class="gslide-desc"></div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>',
            lightboxHTML: '<div id="glightbox-body" class="glightbox-container" tabindex="-1" role="dialog" aria-hidden="false">\n    <div class="gloader visible"></div>\n    <div class="goverlay"></div>\n    <div class="gcontainer">\n    <div id="glightbox-slider" class="gslider"></div>\n    <button class="gclose gbtn" aria-label="Close" data-taborder="3">{closeSVG}</button>\n    <button class="gprev gbtn" aria-label="Previous" data-taborder="2">{prevSVG}</button>\n    <button class="gnext gbtn" aria-label="Next" data-taborder="1">{nextSVG}</button>\n</div>\n</div>'
        },
        ee = function() {
            function e() {
                var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                t(this, e), this.customOptions = i, this.settings = r(J, i), this.effectsClasses = this.getAnimationClasses(), this.videoPlayers = {}, this.apiEvents = [], this.fullElementsList = !1
            }
            return s(e, [{
                key: "init",
                value: function() {
                    var e = this,
                        t = this.getSelector();
                    t && (this.baseEvents = l("click", {
                        onElement: t,
                        withCallback: function(t, i) {
                            t.preventDefault(), e.open(i)
                        }
                    })), this.elements = this.getElements()
                }
            }, {
                key: "open",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                    if (0 === this.elements.length) return !1;
                    this.activeSlide = null, this.prevActiveSlideIndex = null, this.prevActiveSlide = null;
                    var i = L(t) ? t : this.settings.startAt;
                    if (C(e)) {
                        var s = e.getAttribute("data-gallery");
                        s && (this.fullElementsList = this.elements, this.elements = this.getGalleryElements(this.elements, s)), A(i) && (i = this.getElementIndex(e)) < 0 && (i = 0)
                    }
                    L(i) || (i = 0), this.build(), p(this.overlay, "none" === this.settings.openEffect ? "none" : this.settings.cssEfects.fade.in);
                    var n = document.body,
                        r = window.innerWidth - document.documentElement.clientWidth;
                    if (r > 0) {
                        var a = document.createElement("style");
                        a.type = "text/css", a.className = "gcss-styles", a.innerText = ".gscrollbar-fixer {margin-right: ".concat(r, "px}"), document.head.appendChild(a), d(n, "gscrollbar-fixer")
                    }
                    d(n, "glightbox-open"), d(Z, "glightbox-open"), Q && (d(document.body, "glightbox-mobile"), this.settings.slideEffect = "slide"), this.showSlide(i, !0), 1 === this.elements.length ? (d(this.prevButton, "glightbox-button-hidden"), d(this.nextButton, "glightbox-button-hidden")) : (c(this.prevButton, "glightbox-button-hidden"), c(this.nextButton, "glightbox-button-hidden")), this.lightboxOpen = !0, this.trigger("open"), E(this.settings.onOpen) && this.settings.onOpen(), K && this.settings.touchNavigation && H(this), this.settings.keyboardNavigation && I(this)
                }
            }, {
                key: "openAt",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                    this.open(null, e)
                }
            }, {
                key: "showSlide",
                value: function() {
                    var e = this,
                        t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                        i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    m(this.loader), this.index = parseInt(t);
                    var s = this.slidesContainer.querySelector(".current");
                    s && c(s, "current"), this.slideAnimateOut();
                    var n = this.slidesContainer.querySelectorAll(".gslide")[t];
                    if (u(n, "loaded")) this.slideAnimateIn(n, i), g(this.loader);
                    else {
                        m(this.loader);
                        var r = this.elements[t],
                            a = {
                                index: this.index,
                                slide: n,
                                slideNode: n,
                                slideConfig: r.slideConfig,
                                slideIndex: this.index,
                                trigger: r.node,
                                player: null
                            };
                        this.trigger("slide_before_load", a), r.instance.setContent(n, (function() {
                            g(e.loader), e.resize(), e.slideAnimateIn(n, i), e.trigger("slide_after_load", a)
                        }))
                    }
                    this.slideDescription = n.querySelector(".gslide-description"), this.slideDescriptionContained = this.slideDescription && u(this.slideDescription.parentNode, "gslide-media"), this.settings.preload && (this.preloadSlide(t + 1), this.preloadSlide(t - 1)), this.updateNavigationClasses(), this.activeSlide = n
                }
            }, {
                key: "preloadSlide",
                value: function(e) {
                    var t = this;
                    if (e < 0 || e > this.elements.length - 1) return !1;
                    if (A(this.elements[e])) return !1;
                    var i = this.slidesContainer.querySelectorAll(".gslide")[e];
                    if (u(i, "loaded")) return !1;
                    var s = this.elements[e],
                        n = s.type,
                        r = {
                            index: e,
                            slide: i,
                            slideNode: i,
                            slideConfig: s.slideConfig,
                            slideIndex: e,
                            trigger: s.node,
                            player: null
                        };
                    this.trigger("slide_before_load", r), "video" === n || "external" === n ? setTimeout((function() {
                        s.instance.setContent(i, (function() {
                            t.trigger("slide_after_load", r)
                        }))
                    }), 200) : s.instance.setContent(i, (function() {
                        t.trigger("slide_after_load", r)
                    }))
                }
            }, {
                key: "prevSlide",
                value: function() {
                    this.goToSlide(this.index - 1)
                }
            }, {
                key: "nextSlide",
                value: function() {
                    this.goToSlide(this.index + 1)
                }
            }, {
                key: "goToSlide",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    if (this.prevActiveSlide = this.activeSlide, this.prevActiveSlideIndex = this.index, !this.loop() && (e < 0 || e > this.elements.length - 1)) return !1;
                    e < 0 ? e = this.elements.length - 1 : e >= this.elements.length && (e = 0), this.showSlide(e)
                }
            }, {
                key: "insertSlide",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1;
                    t < 0 && (t = this.elements.length);
                    var i = new U(e, this, t),
                        s = i.getConfig(),
                        n = r({}, s),
                        a = i.create(),
                        o = this.elements.length - 1;
                    n.index = t, n.node = !1, n.instance = i, n.slideConfig = s, this.elements.splice(t, 0, n);
                    var l = null,
                        d = null;
                    if (this.slidesContainer) {
                        if (t > o) this.slidesContainer.appendChild(a);
                        else {
                            var c = this.slidesContainer.querySelectorAll(".gslide")[t];
                            this.slidesContainer.insertBefore(a, c)
                        }(this.settings.preload && 0 == this.index && 0 == t || this.index - 1 == t || this.index + 1 == t) && this.preloadSlide(t), 0 === this.index && 0 === t && (this.index = 1), this.updateNavigationClasses(), l = this.slidesContainer.querySelectorAll(".gslide")[t], d = this.getSlidePlayerInstance(t), n.slideNode = l
                    }
                    this.trigger("slide_inserted", {
                        index: t,
                        slide: l,
                        slideNode: l,
                        slideConfig: s,
                        slideIndex: t,
                        trigger: null,
                        player: d
                    }), E(this.settings.slideInserted) && this.settings.slideInserted({
                        index: t,
                        slide: l,
                        player: d
                    })
                }
            }, {
                key: "removeSlide",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1;
                    if (e < 0 || e > this.elements.length - 1) return !1;
                    var t = this.slidesContainer && this.slidesContainer.querySelectorAll(".gslide")[e];
                    t && (this.getActiveSlideIndex() == e && (e == this.elements.length - 1 ? this.prevSlide() : this.nextSlide()), t.parentNode.removeChild(t)), this.elements.splice(e, 1), this.trigger("slide_removed", e), E(this.settings.slideRemoved) && this.settings.slideRemoved(e)
                }
            }, {
                key: "slideAnimateIn",
                value: function(e, t) {
                    var i = this,
                        s = e.querySelector(".gslide-media"),
                        n = e.querySelector(".gslide-description"),
                        r = {
                            index: this.prevActiveSlideIndex,
                            slide: this.prevActiveSlide,
                            slideNode: this.prevActiveSlide,
                            slideIndex: this.prevActiveSlide,
                            slideConfig: A(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].slideConfig,
                            trigger: A(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].node,
                            player: this.getSlidePlayerInstance(this.prevActiveSlideIndex)
                        },
                        a = {
                            index: this.index,
                            slide: this.activeSlide,
                            slideNode: this.activeSlide,
                            slideConfig: this.elements[this.index].slideConfig,
                            slideIndex: this.index,
                            trigger: this.elements[this.index].node,
                            player: this.getSlidePlayerInstance(this.index)
                        };
                    if (s.offsetWidth > 0 && n && (g(n), n.style.display = ""), c(e, this.effectsClasses), t) p(e, this.settings.cssEfects[this.settings.openEffect].in, (function() {
                        i.settings.autoplayVideos && i.slidePlayerPlay(e), i.trigger("slide_changed", {
                            prev: r,
                            current: a
                        }), E(i.settings.afterSlideChange) && i.settings.afterSlideChange.apply(i, [r, a])
                    }));
                    else {
                        var o = this.settings.slideEffect,
                            l = "none" !== o ? this.settings.cssEfects[o].in : o;
                        this.prevActiveSlideIndex > this.index && "slide" == this.settings.slideEffect && (l = this.settings.cssEfects.slideBack.in), p(e, l, (function() {
                            i.settings.autoplayVideos && i.slidePlayerPlay(e), i.trigger("slide_changed", {
                                prev: r,
                                current: a
                            }), E(i.settings.afterSlideChange) && i.settings.afterSlideChange.apply(i, [r, a])
                        }))
                    }
                    setTimeout((function() {
                        i.resize(e)
                    }), 100), d(e, "current")
                }
            }, {
                key: "slideAnimateOut",
                value: function() {
                    if (!this.prevActiveSlide) return !1;
                    var e = this.prevActiveSlide;
                    c(e, this.effectsClasses), d(e, "prev");
                    var t = this.settings.slideEffect,
                        i = "none" !== t ? this.settings.cssEfects[t].out : t;
                    this.slidePlayerPause(e), this.trigger("slide_before_change", {
                        prev: {
                            index: this.prevActiveSlideIndex,
                            slide: this.prevActiveSlide,
                            slideNode: this.prevActiveSlide,
                            slideIndex: this.prevActiveSlideIndex,
                            slideConfig: A(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].slideConfig,
                            trigger: A(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].node,
                            player: this.getSlidePlayerInstance(this.prevActiveSlideIndex)
                        },
                        current: {
                            index: this.index,
                            slide: this.activeSlide,
                            slideNode: this.activeSlide,
                            slideIndex: this.index,
                            slideConfig: this.elements[this.index].slideConfig,
                            trigger: this.elements[this.index].node,
                            player: this.getSlidePlayerInstance(this.index)
                        }
                    }), E(this.settings.beforeSlideChange) && this.settings.beforeSlideChange.apply(this, [{
                        index: this.prevActiveSlideIndex,
                        slide: this.prevActiveSlide,
                        player: this.getSlidePlayerInstance(this.prevActiveSlideIndex)
                    }, {
                        index: this.index,
                        slide: this.activeSlide,
                        player: this.getSlidePlayerInstance(this.index)
                    }]), this.prevActiveSlideIndex > this.index && "slide" == this.settings.slideEffect && (i = this.settings.cssEfects.slideBack.out), p(e, i, (function() {
                        var t = e.querySelector(".ginner-container"),
                            i = e.querySelector(".gslide-media"),
                            s = e.querySelector(".gslide-description");
                        t.style.transform = "", i.style.transform = "", c(i, "greset"), i.style.opacity = "", s && (s.style.opacity = ""), c(e, "prev")
                    }))
                }
            }, {
                key: "getAllPlayers",
                value: function() {
                    return this.videoPlayers
                }
            }, {
                key: "getSlidePlayerInstance",
                value: function(e) {
                    var t = "gvideo" + e,
                        i = this.getAllPlayers();
                    return !(!P(i, t) || !i[t]) && i[t]
                }
            }, {
                key: "stopSlideVideo",
                value: function(e) {
                    if (C(e)) {
                        var t = e.querySelector(".gvideo-wrapper");
                        t && (e = t.getAttribute("data-index"))
                    }
                    console.log("stopSlideVideo is deprecated, use slidePlayerPause");
                    var i = this.getSlidePlayerInstance(e);
                    i && i.playing && i.pause()
                }
            }, {
                key: "slidePlayerPause",
                value: function(e) {
                    if (C(e)) {
                        var t = e.querySelector(".gvideo-wrapper");
                        t && (e = t.getAttribute("data-index"))
                    }
                    var i = this.getSlidePlayerInstance(e);
                    i && i.playing && i.pause()
                }
            }, {
                key: "playSlideVideo",
                value: function(e) {
                    if (C(e)) {
                        var t = e.querySelector(".gvideo-wrapper");
                        t && (e = t.getAttribute("data-index"))
                    }
                    console.log("playSlideVideo is deprecated, use slidePlayerPlay");
                    var i = this.getSlidePlayerInstance(e);
                    i && !i.playing && i.play()
                }
            }, {
                key: "slidePlayerPlay",
                value: function(e) {
                    var t;
                    if (!Q || null !== (t = this.settings.plyr.config) && void 0 !== t && t.muted) {
                        if (C(e)) {
                            var i = e.querySelector(".gvideo-wrapper");
                            i && (e = i.getAttribute("data-index"))
                        }
                        var s = this.getSlidePlayerInstance(e);
                        s && !s.playing && (s.play(), this.settings.autofocusVideos && s.elements.container.focus())
                    }
                }
            }, {
                key: "setElements",
                value: function(e) {
                    var t = this;
                    this.settings.elements = !1;
                    var i = [];
                    e && e.length && a(e, (function(e, s) {
                        var n = new U(e, t, s),
                            a = n.getConfig(),
                            o = r({}, a);
                        o.slideConfig = a, o.instance = n, o.index = s, i.push(o)
                    })), this.elements = i, this.lightboxOpen && (this.slidesContainer.innerHTML = "", this.elements.length && (a(this.elements, (function() {
                        var e = v(t.settings.slideHTML);
                        t.slidesContainer.appendChild(e)
                    })), this.showSlide(0, !0)))
                }
            }, {
                key: "getElementIndex",
                value: function(e) {
                    var t = !1;
                    return a(this.elements, (function(i, s) {
                        if (P(i, "node") && i.node == e) return t = s, !0
                    })), t
                }
            }, {
                key: "getElements",
                value: function() {
                    var e = this,
                        t = [];
                    this.elements = this.elements ? this.elements : [], !A(this.settings.elements) && S(this.settings.elements) && this.settings.elements.length && a(this.settings.elements, (function(i, s) {
                        var n = new U(i, e, s),
                            a = n.getConfig(),
                            o = r({}, a);
                        o.node = !1, o.index = s, o.instance = n, o.slideConfig = a, t.push(o)
                    }));
                    var i = !1;
                    return this.getSelector() && (i = document.querySelectorAll(this.getSelector())), i ? (a(i, (function(i, s) {
                        var n = new U(i, e, s),
                            a = n.getConfig(),
                            o = r({}, a);
                        o.node = i, o.index = s, o.instance = n, o.slideConfig = a, o.gallery = i.getAttribute("data-gallery"), t.push(o)
                    })), t) : t
                }
            }, {
                key: "getGalleryElements",
                value: function(e, t) {
                    return e.filter((function(e) {
                        return e.gallery == t
                    }))
                }
            }, {
                key: "getSelector",
                value: function() {
                    return !this.settings.elements && (this.settings.selector && "data-" == this.settings.selector.substring(0, 5) ? "*[".concat(this.settings.selector, "]") : this.settings.selector)
                }
            }, {
                key: "getActiveSlide",
                value: function() {
                    return this.slidesContainer.querySelectorAll(".gslide")[this.index]
                }
            }, {
                key: "getActiveSlideIndex",
                value: function() {
                    return this.index
                }
            }, {
                key: "getAnimationClasses",
                value: function() {
                    var e = [];
                    for (var t in this.settings.cssEfects)
                        if (this.settings.cssEfects.hasOwnProperty(t)) {
                            var i = this.settings.cssEfects[t];
                            e.push("g".concat(i.in)), e.push("g".concat(i.out))
                        }
                    return e.join(" ")
                }
            }, {
                key: "build",
                value: function() {
                    var e = this;
                    if (this.built) return !1;
                    var t = document.body.childNodes,
                        i = [];
                    a(t, (function(e) {
                        e.parentNode == document.body && "#" !== e.nodeName.charAt(0) && e.hasAttribute && !e.hasAttribute("aria-hidden") && (i.push(e), e.setAttribute("aria-hidden", "true"))
                    }));
                    var s = P(this.settings.svg, "next") ? this.settings.svg.next : "",
                        n = P(this.settings.svg, "prev") ? this.settings.svg.prev : "",
                        r = P(this.settings.svg, "close") ? this.settings.svg.close : "",
                        o = this.settings.lightboxHTML;
                    o = v(o = (o = (o = o.replace(/{nextSVG}/g, s)).replace(/{prevSVG}/g, n)).replace(/{closeSVG}/g, r)), document.body.appendChild(o);
                    var c = document.getElementById("glightbox-body");
                    this.modal = c;
                    var p = c.querySelector(".gclose");
                    this.prevButton = c.querySelector(".gprev"), this.nextButton = c.querySelector(".gnext"), this.overlay = c.querySelector(".goverlay"), this.loader = c.querySelector(".gloader"), this.slidesContainer = document.getElementById("glightbox-slider"), this.bodyHiddenChildElms = i, this.events = {}, d(this.modal, "glightbox-" + this.settings.skin), this.settings.closeButton && p && (this.events.close = l("click", {
                        onElement: p,
                        withCallback: function(t, i) {
                            t.preventDefault(), e.close()
                        }
                    })), p && !this.settings.closeButton && p.parentNode.removeChild(p), this.nextButton && (this.events.next = l("click", {
                        onElement: this.nextButton,
                        withCallback: function(t, i) {
                            t.preventDefault(), e.nextSlide()
                        }
                    })), this.prevButton && (this.events.prev = l("click", {
                        onElement: this.prevButton,
                        withCallback: function(t, i) {
                            t.preventDefault(), e.prevSlide()
                        }
                    })), this.settings.closeOnOutsideClick && (this.events.outClose = l("click", {
                        onElement: c,
                        withCallback: function(t, i) {
                            e.preventOutsideClick || u(document.body, "glightbox-mobile") || h(t.target, ".ginner-container") || h(t.target, ".gbtn") || u(t.target, "gnext") || u(t.target, "gprev") || e.close()
                        }
                    })), a(this.elements, (function(t, i) {
                        e.slidesContainer.appendChild(t.instance.create()), t.slideNode = e.slidesContainer.querySelectorAll(".gslide")[i]
                    })), K && d(document.body, "glightbox-touch"), this.events.resize = l("resize", {
                        onElement: window,
                        withCallback: function() {
                            e.resize()
                        }
                    }), this.built = !0
                }
            }, {
                key: "resize",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                    if ((e = e || this.activeSlide) && !u(e, "zoomed")) {
                        var t = y(),
                            i = e.querySelector(".gvideo-wrapper"),
                            s = e.querySelector(".gslide-image"),
                            n = this.slideDescription,
                            r = t.width,
                            a = t.height;
                        if (r <= 768 ? d(document.body, "glightbox-mobile") : c(document.body, "glightbox-mobile"), i || s) {
                            var o = !1;
                            if (n && (u(n, "description-bottom") || u(n, "description-top")) && !u(n, "gabsolute") && (o = !0), s)
                                if (r <= 768) s.querySelector("img");
                                else if (o) {
                                var l = n.offsetHeight,
                                    h = s.querySelector("img");
                                h.setAttribute("style", "max-height: calc(100vh - ".concat(l, "px)")), n.setAttribute("style", "max-width: ".concat(h.offsetWidth, "px;"))
                            }
                            if (i) {
                                var p = P(this.settings.plyr.config, "ratio") ? this.settings.plyr.config.ratio : "";
                                if (!p) {
                                    var f = i.clientWidth,
                                        m = i.clientHeight,
                                        g = f / m;
                                    p = "".concat(f / g, ":").concat(m / g)
                                }
                                var v = p.split(":"),
                                    b = this.settings.videosWidth,
                                    w = this.settings.videosWidth,
                                    x = (w = L(b) || -1 !== b.indexOf("px") ? parseInt(b) : -1 !== b.indexOf("vw") ? r * parseInt(b) / 100 : -1 !== b.indexOf("vh") ? a * parseInt(b) / 100 : -1 !== b.indexOf("%") ? r * parseInt(b) / 100 : parseInt(i.clientWidth)) / (parseInt(v[0]) / parseInt(v[1]));
                                if (x = Math.floor(x), o && (a -= n.offsetHeight), w > r || x > a || a < x && r > w) {
                                    var _ = i.offsetWidth,
                                        E = i.offsetHeight,
                                        T = a / E,
                                        C = {
                                            width: _ * T,
                                            height: E * T
                                        };
                                    i.parentNode.setAttribute("style", "max-width: ".concat(C.width, "px")), o && n.setAttribute("style", "max-width: ".concat(C.width, "px;"))
                                } else i.parentNode.style.maxWidth = "".concat(b), o && n.setAttribute("style", "max-width: ".concat(b, ";"))
                            }
                        }
                    }
                }
            }, {
                key: "reload",
                value: function() {
                    this.init()
                }
            }, {
                key: "updateNavigationClasses",
                value: function() {
                    var e = this.loop();
                    c(this.nextButton, "disabled"), c(this.prevButton, "disabled"), 0 == this.index && this.elements.length - 1 == 0 ? (d(this.prevButton, "disabled"), d(this.nextButton, "disabled")) : 0 !== this.index || e ? this.index !== this.elements.length - 1 || e || d(this.nextButton, "disabled") : d(this.prevButton, "disabled")
                }
            }, {
                key: "loop",
                value: function() {
                    var e = P(this.settings, "loopAtEnd") ? this.settings.loopAtEnd : null;
                    return e = P(this.settings, "loop") ? this.settings.loop : e
                }
            }, {
                key: "close",
                value: function() {
                    var e = this;
                    if (!this.lightboxOpen) {
                        if (this.events) {
                            for (var t in this.events) this.events.hasOwnProperty(t) && this.events[t].destroy();
                            this.events = null
                        }
                        return !1
                    }
                    if (this.closing) return !1;
                    this.closing = !0, this.slidePlayerPause(this.activeSlide), this.fullElementsList && (this.elements = this.fullElementsList), this.bodyHiddenChildElms.length && a(this.bodyHiddenChildElms, (function(e) {
                        e.removeAttribute("aria-hidden")
                    })), d(this.modal, "glightbox-closing"), p(this.overlay, "none" == this.settings.openEffect ? "none" : this.settings.cssEfects.fade.out), p(this.activeSlide, this.settings.cssEfects[this.settings.closeEffect].out, (function() {
                        if (e.activeSlide = null, e.prevActiveSlideIndex = null, e.prevActiveSlide = null, e.built = !1, e.events) {
                            for (var t in e.events) e.events.hasOwnProperty(t) && e.events[t].destroy();
                            e.events = null
                        }
                        var i = document.body;
                        c(Z, "glightbox-open"), c(i, "glightbox-open touching gdesc-open glightbox-touch glightbox-mobile gscrollbar-fixer"), e.modal.parentNode.removeChild(e.modal), e.trigger("close"), E(e.settings.onClose) && e.settings.onClose();
                        var s = document.querySelector(".gcss-styles");
                        s && s.parentNode.removeChild(s), e.lightboxOpen = !1, e.closing = null
                    }))
                }
            }, {
                key: "destroy",
                value: function() {
                    this.close(), this.clearAllEvents(), this.baseEvents && this.baseEvents.destroy()
                }
            }, {
                key: "on",
                value: function(e, t) {
                    var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                    if (!e || !E(t)) throw new TypeError("Event name and callback must be defined");
                    this.apiEvents.push({
                        evt: e,
                        once: i,
                        callback: t
                    })
                }
            }, {
                key: "once",
                value: function(e, t) {
                    this.on(e, t, !0)
                }
            }, {
                key: "trigger",
                value: function(e) {
                    var t = this,
                        i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                        s = [];
                    a(this.apiEvents, (function(t, n) {
                        var r = t.evt,
                            a = t.once,
                            o = t.callback;
                        r == e && (o(i), a && s.push(n))
                    })), s.length && a(s, (function(e) {
                        return t.apiEvents.splice(e, 1)
                    }))
                }
            }, {
                key: "clearAllEvents",
                value: function() {
                    this.apiEvents.splice(0, this.apiEvents.length)
                }
            }, {
                key: "version",
                value: function() {
                    return "3.1.0"
                }
            }]), e
        }();
    return function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = new ee(e);
        return t.init(), t
    }
}));
/*!
 * NioApp v1.0.0 (https://softnio.com/)
 * Developed by Softnio Team.
 * Copyright by Softnio.
 */
var NioApp = function(e, t) {
    "use strict";
    var i = {
        AppInfo: {
            name: "NioApp",
            version: "1.0.0",
            author: "Softnio"
        },
        Package: {
            name: "CopyGen",
            version: "1.1.0"
        }
    };
    return i.docReady = function(e) {
        document.addEventListener("DOMContentLoaded", e, !1)
    }, i.winLoad = function(e) {
        window.addEventListener("load", e, !1)
    }, i.onResize = function(e, t) {
        (t = void 0 === t ? window : t).addEventListener("resize", e)
    }, i
}(window, document);
NioApp = function(e) {
    "use strict";
    return e.BS = {}, e.Addons = {}, e.Custom = {}, e.Toggle = {}, e.body = document.querySelector("body"), e.Win = {
        height: window.innerHeight,
        width: window.innerWidth
    }, e.Break = {
        mb: 420,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
        xxl: 1400,
        any: 1 / 0
    }, e.State = {
        isRTL: !(!e.body.classList.contains("has-rtl") && "rtl" !== e.body.getAttribute("dir")),
        isTouch: "ontouchstart" in document.documentElement,
        isMobile: !!navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|/i),
        asMobile: e.Win.width < e.Break.md
    }, e.StateUpdate = function() {
        e.Win = {
            height: window.innerHeight,
            width: window.innerWidth
        }, e.State.asMobile = e.Win.width < e.Break.md
    }, e.SlideUp = function(e, t = 500) {
        e.style.transitionProperty = "height, margin, padding", e.style.transitionDuration = t + "ms", e.style.boxSizing = "border-box", e.style.height = e.offsetHeight + "px", e.offsetHeight, e.style.overflow = "hidden", e.style.height = 0, e.style.paddingTop = 0, e.style.paddingBottom = 0, e.style.marginTop = 0, e.style.marginBottom = 0, window.setTimeout(() => {
            e.style.display = "none", e.style.removeProperty("height"), e.style.removeProperty("padding-top"), e.style.removeProperty("padding-bottom"), e.style.removeProperty("margin-top"), e.style.removeProperty("margin-bottom"), e.style.removeProperty("overflow"), e.style.removeProperty("transition-duration"), e.style.removeProperty("transition-property")
        }, t)
    }, e.SlideDown = function(e, t = 500) {
        e.style.removeProperty("display");
        let i = window.getComputedStyle(e).display;
        "none" === i && (i = "block"), e.style.display = i;
        let s = e.offsetHeight;
        e.style.overflow = "hidden", e.style.height = 0, e.style.paddingTop = 0, e.style.paddingBottom = 0, e.style.marginTop = 0, e.style.marginBottom = 0, e.offsetHeight, e.style.boxSizing = "border-box", e.style.transitionProperty = "height, margin, padding", e.style.transitionDuration = t + "ms", e.style.height = s + "px", e.style.removeProperty("padding-top"), e.style.removeProperty("padding-bottom"), e.style.removeProperty("margin-top"), e.style.removeProperty("margin-bottom"), window.setTimeout(() => {
            e.style.removeProperty("height"), e.style.removeProperty("overflow"), e.style.removeProperty("transition-duration"), e.style.removeProperty("transition-property")
        }, t)
    }, e.SlideToggle = function(t, i = 500) {
        return "none" === window.getComputedStyle(t).display ? e.SlideDown(t, i) : e.SlideUp(t, i)
    }, e.getParents = function(e, t, i) {
        let s = void 0 === t ? document : document.querySelector(t);
        for (var n = [], r = e.parentNode; r !== s;) {
            var a = r;
            (void 0 === i || a.classList.contains(i)) && n.push(a), r = a.parentNode
        }
        return n
    }, e.extendObject = function(e, t) {
        return Object.keys(t).forEach((function(i) {
            e[i] = t[i]
        })), e
    }, e.BS.tooltip = function(e) {
        let t = document.querySelectorAll(e);
        [].slice.call(t).map((function(e) {
            return new bootstrap.Tooltip(e)
        }))
    }, e.onResize(e.StateUpdate), e
}(NioApp);