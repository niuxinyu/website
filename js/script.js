jQuery.extend(jQuery.easing, {
  easeInBack: function (e, f, a, i, h, g) {
    if (g == undefined) {
      g = 1.70158
    }
    return i * (f /= h) * f * ((g + 1) * f - g) + a
  }, easeOutBack: function (e, f, a, i, h, g) {
    if (g == undefined) {
      g = 1.70158
    }
    return i * ((f = f / h - 1) * f * ((g + 1) * f + g) + 1) + a
  }, easeInBackQ: function (e, f, a, j, i, g) {
    var h = (f /= i) * f;
    return a + j * h * (4 * f * h - 8 * h + 8 * f - 3)
  }, easeOutBackQ: function (e, f, a, j, i, g) {
    var h = (f /= i) * f;
    return a + j * (4 * h * f * h - 12 * h * h + 16 * h * f - 13 * h + 6 * f)
  }, easeInBackQ2: function (e, f, a, j, i, g) {
    var h = (f /= i) * f;
    return a + j * h * (1.5 * f * h - 2.5 * h + 5 * f - 3)
  }, easeOutBackQ2: function (e, f, a, j, i, g) {
    var h = (f /= i) * f;
    return a + j * (1.5 * h * f * h - 5 * h * h + 10 * h * f - 12 * h + 6.5 * f)
  }
});

function ws_louvers(f, q, g) {
  var h = jQuery, m = h(this), a = f.cols || 10, F = 2.5, c = 2, t = f.perspective || 2000, s = g.find(".ws_list"),
    E = [], b = 5, v = {}, n = h("<div>").addClass("ws_effect ws_louvers").appendTo(g),
    p = f.support.transform && f.support.transition && f.support.perspective,
    o = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/WOW Slider/g.test(navigator.userAgent);
  var w = [];
  n.css({
    position: "absolute",
    top: 0,
    left: 0,
    width: g.width(),
    height: g.height(),
    transform: "translate3d(0,0,0)",
    transformOrigin: (f.width / 2) + "px " + (f.height / 2) + "px 0",
    perspective: t + 2000
  }).hide();
  for (var l = 0; l < a; l++) {
    var z = l % a, y = Math.floor(l / a);
    var C = h("<div>").css({
        position: "absolute",
        left: 100 * z / a + "%",
        top: 0,
        outline: "1px solid transparent",
        transformStyle: o ? "flat" : "preserve-3d",
        overflow: p ? "visible" : "hidden"
      }).appendTo(n), x = h("<div>").css({
        transform: "scale(1) rotateX(0) rotateY(0) translate3d(0,0,0)",
        outline: "1px solid transparent",
        transformStyle: "preserve-3d"
      }).appendTo(C), u = h("<div>").addClass("ws_front_image").appendTo(x),
      B = p ? h("<div>").addClass("ws_back_image").appendTo(x) : 0;
    u.css({
      position: "absolute",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      backfaceVisibility: "hidden",
      transform: "translate3d(0,0,0)"
    }).append(h("<img>").css({
      left: -z * 100 + "%",
      top: -y * 100 + "%",
      position: "absolute",
      outline: "1px solid transparent"
    }));
    if (p) {
      B.css({
        position: "absolute",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backfaceVisibility: "hidden",
        transform: "rotateY(180deg) translate3d(0,0," + b + "px)"
      }).append(h("<img>").css({
        left: -z * 100 + "%",
        top: -y * 100 + "%",
        position: "absolute",
        outline: "1px solid transparent"
      }))
    }
    var r = {position: "absolute", outline: "1px solid transparent"};
    E[l] = {
      part: x,
      front: u,
      back: B,
      wrapper: C,
      leftEdge: p ? h("<div>").addClass("ws_left_edge").css(r).appendTo(x) : 0,
      rightEdge: p ? h("<div>").addClass("ws_right_edge").css(r).appendTo(x) : 0,
      topEdge: p ? h("<div>").addClass("ws_top_edge").css(r).appendTo(x) : 0,
      bottomEdge: p ? h("<div>").addClass("ws_bottom_edge").css(r).appendTo(x) : 0
    }
  }

  function A(L) {
    var H = {}, J = q.get(L), M = f.width / a, N = f.height;
    for (var I = 0; I < a; I++) {
      var L = I % a, K = Math.floor(I / a);
      H[I] = D(J, {x: L * M, y: K * N, w: M, h: N})
    }
    return H
  }

  function G(H, K, j, I, J) {
    for (var i in K) {
      if (typeof E[i] !== "function") {
        K[i].topEdge.css({
          width: I,
          height: H,
          background: j[i],
          transform: "rotateX(90deg) translate3d(0,-" + H / 2 + "px," + H / 2 + "px)"
        });
        K[i].bottomEdge.css({
          width: I,
          height: H,
          background: j[i],
          transform: "rotateX(90deg) translate3d(0,-" + H / 2 + "px," + (-J + H / 2) + "px)"
        });
        K[i].leftEdge.css({
          width: H,
          height: J,
          background: j[i],
          transform: "rotateY(90deg) translate3d(" + H / 2 + "px,0,-" + H / 2 + "px)"
        });
        K[i].rightEdge.css({
          width: H,
          height: J,
          background: j[i],
          transform: "rotateY(90deg) translate3d(" + H / 2 + "px,0," + (I - H / 2) + "px)"
        })
      }
    }
  }

  function e(H, I) {
    var i = 0;
    for (var j in H) {
      if (typeof H[j] !== "function") {
        (function (J, K) {
          wowAnimate(function (M) {
            var S, Q, R, P = "", L = {};
            if (M <= 0.5) {
              S = h.easing.easeInBack(1, M * 2, 0, 1, 1, 1).toFixed(3);
              Q = h.easing.easeInBackQ(1, M * 2, 0, 1, 1, 1).toFixed(3);
              R = h.easing.easeInBackQ2(1, M * 2, 0, 1, 1, 1).toFixed(3);
              K[J].back.css("backfaceVisibility", "hidden")
            } else {
              S = h.easing.easeOutBack(1, (M - 0.5) * 2, 0, 1, 1, 1).toFixed(3);
              Q = h.easing.easeOutBackQ(1, (M - 0.5) * 2, 0, 1, 1, 1).toFixed(3);
              R = h.easing.easeOutBackQ2(1, (M - 0.5) * 2, 0, 1, 1, 1).toFixed(3);
              K[J].back.css("backfaceVisibility", "visible")
            }
            for (var N in K[J].animate[M <= 0.5 ? "half" : "end"]) {
              var T = K[J].animate[M <= 0.5 ? "begin" : "half"][N] || 0,
                O = K[J].animate[M <= 0.5 ? "half" : "end"][N] || 0;
              if (typeof O !== "object") {
                if (N === "scale" || N === "rotateX" || N === "rotateY") {
                  O = T + (O - T) * Q
                } else {
                  if (N === "left" || N === "top") {
                    O = T + (O - T) * R
                  } else {
                    O = T + (O - T) * S
                  }
                }
              }
              if (N === "rotateX" || N === "rotateY" || N === "rotateZ") {
                P += N + "(" + O + "deg) "
              } else {
                if (N === "scale") {
                  P += N + "(" + O + ") "
                } else {
                  if (N === "translate3d") {
                    P += N + "(" + (T[0] + (O[0] - T[0]) * S).toFixed(3) + "px," + (T[1] + (O[1] - T[1]) * S).toFixed(3) + "px," + (T[2] + (O[2] - T[2]) * S).toFixed(3) + "px) "
                  } else {
                    L[N] = O
                  }
                }
              }
            }
            K[J].wrapper.css({transform: "translate3d(" + (L.left ? L.left : 0).toFixed(3) + "px," + (L.top ? L.top : 0).toFixed(3) + "px,0)"});
            delete L.left;
            delete L.top;
            if (P) {
              L.transform = P
            }
            K[J].part.css(L)
          }, 0, 1, K[J].animate.duration, K[J].animate.delay, function () {
            i++;
            if (i == K.length && I) {
              I()
            }
          })
        }(j, H))
      }
    }
  }

  function k(Y, K, L, N) {
    var V = g.width(), U = g.height(), T = V / a, S = U, J = (f.duration * 0.4) > 1000 ? 1000 : (f.duration * 0.4),
      I = f.duration * 0.6, O = [0, 0];
    G(b, Y, v[K], T, S);
    n.css({transformOrigin: (V / 2) + "px " + (U / 2) + "px 0", width: V, height: U});
    for (var Q in Y) {
      if (typeof Y[Q] !== "function") {
        var H = w[Q].delay * J;
        if (O[1] <= H) {
          O[0] = Q;
          O[1] = H
        }
        Y[Q].part[0].ws_delay = [H, 0]
      }
    }
    Y[O[0]].part[0].ws_delay[1] = 1;
    for (var Q in Y) {
      if (typeof Y[Q] !== "function") {
        var P = Y[Q], X = Q % a, W = Math.floor(Q / a), R = V * X / a, M = U * W;
        P.animate = {
          delay: P.part[0].ws_delay[0],
          duration: I,
          begin: {
            left: 0,
            top: 0,
            width: T,
            height: S,
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            translate3d: [0, 0, o ? b : 0]
          },
          half: {
            left: w[Q].halfLeft * T,
            top: w[Q].halfTop * S,
            scale: w[Q].halfScale,
            rotateX: w[Q].rotateX / 2,
            rotateY: w[Q].rotateY / 2,
            translate3d: [0, 0, (o ? 1 : 0.5) * b]
          },
          end: {left: 0, top: 0, scale: 1, rotateX: w[Q].rotateX, rotateY: w[Q].rotateY, translate3d: [0, 0, b]}
        };
        P.front.find("img").css(L);
        P.back.css("backfaceVisibility", "hidden").find("img").css(L);
        P.part.css({
          width: P.animate.begin.width,
          height: P.animate.begin.height,
          left: P.animate.begin.left,
          top: P.animate.begin.top
        })
      }
    }
    e(Y, N)
  }

  var d;
  this.go = function (U, K) {
    if (d) {
      return K
    }
    n.show();
    var I = h(q.get(K));
    I = {
      width: I.width(),
      height: I.height(),
      marginTop: parseFloat(I.css("marginTop")),
      marginLeft: parseFloat(I.css("marginLeft"))
    };
    w = (function () {
      var aa = [0, 1];
      var ab = [1.2, 0.8];
      var Z = [0.2, 0, -0.2];
      var Y = [180, -180];
      aa = aa[Math.floor(Math.random() * (aa.length))];
      ab = ab[Math.floor(Math.random() * (ab.length))];
      Z = Z[Math.floor(Math.random() * (Z.length))];
      Y = Y[Math.floor(Math.random() * (Y.length))];
      var j = a;
      var i = [];
      for (var X = (aa ? 0 : j); aa ? (X <= j) : (X >= 0); aa ? (X++) : (X--)) {
        i.push({zIndex: X - (aa ? j : 0), rotateY: Y, delay: X / j, halfScale: ab, halfLeft: Z})
      }
      return i
    }());
    if (p) {
      E[0].front.find("img").on("load", function () {
        s.hide()
      });
      for (var L in E) {
        if (typeof E[L] !== "function") {
          E[L].front.find("img").attr("src", q.get(K).src);
          E[L].back.find("img").attr("src", q.get(U).src)
        }
      }
      if (!v[K]) {
        v[K] = A(K)
      }
      d = new k(E, K, I, function () {
        s.show();
        m.trigger("effectEnd");
        n.hide();
        for (var i in E) {
          if (typeof E[i] !== "function") {
            E[i].part.css({transition: "", transform: "rotateX(0) rotateY(0) translate3d(0,0,0)"})
          }
        }
        d = 0
      })
    } else {
      d = true;

      function V(j, i) {
        return Math.random() * (i - j + 1) + j
      }

      var Q = g.width(), T = g.height(), P = Q / a, S = T, J = Q - P * (a - 1), R = T;
      n.css({width: Q, height: T});
      var H = 0;
      for (var L in E) {
        var O = L % a, N = Math.floor(L / a);
        E[L].front.find("img").attr("src", q.get(U).src).css(I);
        var W = f.duration * (1 - Math.abs((c * F - O * N) / (2 * a)));
        var M = V(-1, 1) > 0 ? 1 : -1;
        E[L].wrapper.css({width: P, height: S});
        E[L].part.css({position: "absolute", top: 0, left: M * P, opacity: 0, width: P, height: S}).animate({
          left: 0,
          opacity: 1
        }, W, function () {
          H++;
          if (H == a) {
            s.stop(1, 1);
            d = false;
            m.trigger("effectEnd")
          }
        })
      }
    }
  };

  function D(Q, H) {
    H = H || {};
    var S = 1, K = H.exclude || [], P;
    var M = document.createElement("canvas"), J = M.getContext("2d"), I = M.width = Q.naturalWidth,
      W = M.height = Q.naturalHeight;
    J.drawImage(Q, 0, 0, Q.naturalWidth, Q.naturalHeight);
    try {
      P = J.getImageData(H.x ? H.x : 0, H.y ? H.y : 0, H.w ? H.w : Q.width, H.h ? H.h : Q.height)["data"]
    } catch (R) {
      console.log("error:unable to access image data: " + R);
      return "#ccc"
    }
    var L = (H.w ? H.w : Q.width * H.h ? H.h : Q.height) || P.length, N = {}, U = "", T = [],
      j = {dominant: {name: "", count: 0}};
    var O = 0;
    while (O < L) {
      T[0] = P[O];
      T[1] = P[O + 1];
      T[2] = P[O + 2];
      U = T.join(",");
      if (U in N) {
        N[U] = N[U] + 1
      } else {
        N[U] = 1
      }
      if (K.indexOf(["rgb(", U, ")"].join("")) === -1) {
        var V = N[U];
        if (V > j.dominant.count) {
          j.dominant.name = U;
          j.dominant.count = V
        }
      }
      O += S * 4
    }
    return ["rgb(", j.dominant.name, ")"].join("")
  }
};// -----------------------------------------------------------------------------------
// http://wowslider.com/
// JavaScript Wow Slider is a free software that helps you easily generate delicious
// slideshows with gorgeous transition effects, in a few clicks without writing a single line of code.
// Generated by WOW Slider 9.0
//
//***********************************************
// Obfuscated by Javascript Obfuscator
// http://javascript-source.com
//***********************************************
function ws_glass_parallax(d, l, m) {
  var f = jQuery;
  var i = f(this);
  var j = d.parallax || 0.25;
  var k = f("<div>").css({
    position: "absolute",
    display: "none",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden"
  }).addClass("ws_effect ws_glass_parallax").appendTo(m);
  var h = !d.noCanvas && !window.opera && !!document.createElement("canvas").getContext;
  if (h) {
    try {
      document.createElement("canvas").getContext("2d").getImageData(0, 0, 1, 1)
    } catch (q) {
      h = 0
    }
  }

  function t(e) {
    return Math.round(e * 1000) / 1000
  }

  var u = f("<div>").css({
    position: "absolute",
    left: 0,
    top: 0,
    overflow: "hidden",
    width: "100%",
    height: "100%",
    transform: "translate3d(0,0,0)",
    zIndex: 1
  }).appendTo(k);
  var s = u.clone().appendTo(k);
  var r = u.clone().css({width: "20%"}).appendTo(k);
  var c;
  var p = u.clone().appendTo(k).css({zIndex: 0});
  this.go = function (C, A, x) {
    var e = f(l.get(A));
    e = {
      position: "absolute",
      width: e.width(),
      height: e.height(),
      marginTop: e.css("marginTop"),
      marginLeft: e.css("marginLeft")
    };
    x = x ? 1 : -1;
    var E = f(l.get(A)).clone().css(e).appendTo(u);
    var z = f(l.get(C)).clone().css(e).appendTo(s);
    var v = f(l.get(C)).clone().css(e).appendTo(r);
    if (x == -1) {
      r.css({left: "auto", right: 0});
      v.css({left: "auto", right: 0})
    } else {
      r.css({left: 0, right: "auto"});
      v.css({left: 0, right: "auto"})
    }
    var D = (m.width() || d.width) * 1.3;
    var B = m.height() || d.height;
    var y;
    if (h) {
      if (!c) {
        c = f("<canvas>").css({position: "absolute", left: 0, top: 0}).attr({
          width: e.width,
          height: e.height
        }).appendTo(p)
      }
      c.css(e).attr({width: e.width, height: e.height});
      y = o(f(l.get(C)), e, 10, c.get(0))
    }
    if (!h || !y) {
      h = 0
    }
    wowAnimate(function (G) {
      G = f.easing.swing(G);
      var L = t(x * G * D), F = t(x * (-D + G * D - (1 - G) * D * 0.2)),
        J = t(x * (-D * 1.4 + G * (D * 1.4 + D / 1.3))), w = t(-x * D * j * G), H = t(x * D * j * (1 - G)),
        I = t(-x * D * (j + 0.2) * G), K = t(x * (-D * 0.2 + G * D * 0.4));
      if (d.support.transform) {
        u.css("transform", "translate3d(" + L + "px,0,0)");
        E.css("transform", "translate3d(" + w + "px,0,0)");
        s.css("transform", "translate3d(" + F + "px,0,0)");
        z.css("transform", "translate3d(" + H + "px,0,0)");
        r.css("transform", "translate3d(" + J + "px,0,0)");
        v.css("transform", "scale(1.6) translate3d(" + I + "px,0,0)");
        p.css("transform", "translate3d(" + K + "px,0,0)")
      } else {
        u.css("left", L);
        E.css("margin-left", w);
        s.css("left", F);
        z.css("margin-left", H);
        r.css("left", J);
        v.css("margin-left", I);
        p.css("left", K)
      }
    }, 0, 1, d.duration, function () {
      k.hide();
      E.remove();
      z.remove();
      v.remove();
      i.trigger("effectEnd")
    })
  };

  function o(C, A, B, v) {
    var F = (parseInt(C.parent().css("z-index")) || 0) + 1;
    if (h) {
      var I = v.getContext("2d");
      I.drawImage(C.get(0), 0, 0, A.width, A.height);
      if (!a(I, 0, 0, v.width, v.height, B)) {
        return 0
      }
      return f(v)
    }
    var J = f("<div></div>").css({position: "absolute", "z-index": F, left: 0, top: 0}).css(A).appendTo(v);
    var H = (Math.sqrt(5) + 1) / 2;
    var w = 1 - H / 2;
    for (var z = 0; w * z < B; z++) {
      var D = Math.PI * H * z;
      var e = (w * z + 1);
      var G = e * Math.cos(D);
      var E = e * Math.sin(D);
      f(document.createElement("img")).attr("src", C.attr("src")).css({
        opacity: 1 / (z / 1.8 + 1),
        position: "absolute",
        "z-index": F,
        left: Math.round(G) + "px",
        top: Math.round(E) + "px",
        width: "100%",
        height: "100%"
      }).appendTo(J)
    }
    return J
  }

  var g = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259];
  var n = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];

  function a(am, U, S, v, w, ad) {
    if (isNaN(ad) || ad < 1) {
      return
    }
    ad |= 0;
    var ah;
    try {
      ah = am.getImageData(U, S, v, w)
    } catch (al) {
      console.log("error:unable to access image data: " + al);
      return false
    }
    var C = ah.data;
    var ab, aa, aj, ag, J, M, G, A, B, R, H, T, P, X, ac, K, F, L, N, W;
    var ak = ad + ad + 1;
    var Y = v << 2;
    var I = v - 1;
    var af = w - 1;
    var E = ad + 1;
    var ae = E * (E + 1) / 2;
    var V = new b();
    var Q = V;
    for (aj = 1; aj < ak; aj++) {
      Q = Q.next = new b();
      if (aj == E) {
        var D = Q
      }
    }
    Q.next = V;
    var ai = null;
    var Z = null;
    G = M = 0;
    var O = g[ad];
    var z = n[ad];
    for (aa = 0; aa < w; aa++) {
      X = ac = K = A = B = R = 0;
      H = E * (F = C[M]);
      T = E * (L = C[M + 1]);
      P = E * (N = C[M + 2]);
      A += ae * F;
      B += ae * L;
      R += ae * N;
      Q = V;
      for (aj = 0; aj < E; aj++) {
        Q.r = F;
        Q.g = L;
        Q.b = N;
        Q = Q.next
      }
      for (aj = 1; aj < E; aj++) {
        ag = M + ((I < aj ? I : aj) << 2);
        A += (Q.r = (F = C[ag])) * (W = E - aj);
        B += (Q.g = (L = C[ag + 1])) * W;
        R += (Q.b = (N = C[ag + 2])) * W;
        X += F;
        ac += L;
        K += N;
        Q = Q.next
      }
      ai = V;
      Z = D;
      for (ab = 0; ab < v; ab++) {
        C[M] = (A * O) >> z;
        C[M + 1] = (B * O) >> z;
        C[M + 2] = (R * O) >> z;
        A -= H;
        B -= T;
        R -= P;
        H -= ai.r;
        T -= ai.g;
        P -= ai.b;
        ag = (G + ((ag = ab + ad + 1) < I ? ag : I)) << 2;
        X += (ai.r = C[ag]);
        ac += (ai.g = C[ag + 1]);
        K += (ai.b = C[ag + 2]);
        A += X;
        B += ac;
        R += K;
        ai = ai.next;
        H += (F = Z.r);
        T += (L = Z.g);
        P += (N = Z.b);
        X -= F;
        ac -= L;
        K -= N;
        Z = Z.next;
        M += 4
      }
      G += v
    }
    for (ab = 0; ab < v; ab++) {
      ac = K = X = B = R = A = 0;
      M = ab << 2;
      H = E * (F = C[M]);
      T = E * (L = C[M + 1]);
      P = E * (N = C[M + 2]);
      A += ae * F;
      B += ae * L;
      R += ae * N;
      Q = V;
      for (aj = 0; aj < E; aj++) {
        Q.r = F;
        Q.g = L;
        Q.b = N;
        Q = Q.next
      }
      J = v;
      for (aj = 1; aj <= ad; aj++) {
        M = (J + ab) << 2;
        A += (Q.r = (F = C[M])) * (W = E - aj);
        B += (Q.g = (L = C[M + 1])) * W;
        R += (Q.b = (N = C[M + 2])) * W;
        X += F;
        ac += L;
        K += N;
        Q = Q.next;
        if (aj < af) {
          J += v
        }
      }
      M = ab;
      ai = V;
      Z = D;
      for (aa = 0; aa < w; aa++) {
        ag = M << 2;
        C[ag] = (A * O) >> z;
        C[ag + 1] = (B * O) >> z;
        C[ag + 2] = (R * O) >> z;
        A -= H;
        B -= T;
        R -= P;
        H -= ai.r;
        T -= ai.g;
        P -= ai.b;
        ag = (ab + (((ag = aa + E) < af ? ag : af) * v)) << 2;
        A += (X += (ai.r = C[ag]));
        B += (ac += (ai.g = C[ag + 1]));
        R += (K += (ai.b = C[ag + 2]));
        ai = ai.next;
        H += (F = Z.r);
        T += (L = Z.g);
        P += (N = Z.b);
        X -= F;
        ac -= L;
        K -= N;
        Z = Z.next;
        M += v
      }
    }
    am.putImageData(ah, U, S);
    return true
  }

  function b() {
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 0;
    this.next = null
  }
};

jQuery.extend(jQuery.easing, {
  easeInBack: function (e, f, a, i, h, g) {
    if (g == undefined) {
      g = 1.70158
    }
    return i * (f /= h) * f * ((g + 1) * f - g) + a
  }, easeOutBack: function (e, f, a, i, h, g) {
    if (g == undefined) {
      g = 1.70158
    }
    return i * ((f = f / h - 1) * f * ((g + 1) * f + g) + 1) + a
  }, easeInBackQ: function (e, f, a, j, i, g) {
    var h = (f /= i) * f;
    return a + j * h * (4 * f * h - 8 * h + 8 * f - 3)
  }, easeOutBackQ: function (e, f, a, j, i, g) {
    var h = (f /= i) * f;
    return a + j * (4 * h * f * h - 12 * h * h + 16 * h * f - 13 * h + 6 * f)
  }, easeInBackQ2: function (e, f, a, j, i, g) {
    var h = (f /= i) * f;
    return a + j * h * (1.5 * f * h - 2.5 * h + 5 * f - 3)
  }, easeOutBackQ2: function (e, f, a, j, i, g) {
    var h = (f /= i) * f;
    return a + j * (1.5 * h * f * h - 5 * h * h + 10 * h * f - 12 * h + 6.5 * f)
  }
});

function ws_brick(f, s, g) {
  var h = jQuery, n = h(this), a = f.cols || 4, r = f.rows || 3, H = 2.5, c = 2, v = f.perspective || 2000,
    u = g.find(".ws_list"), G = [], b = 30, x = {}, o = h("<div>").addClass("ws_effect ws_brick").appendTo(g),
    q = f.support.transform && f.support.transition && f.support.perspective,
    p = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent),
    m = /Firefox/.test(navigator.userAgent);
  var y = [{
    zIndex: 0,
    rotateX: 360,
    rotateZ: -360,
    rotateY: 180,
    halfScale: 0.5,
    halfLeft: 0.7,
    halfTop: 0.7,
    delay: 0.36
  }, {
    zIndex: 1,
    rotateX: -360,
    rotateZ: 360,
    rotateY: 180,
    halfScale: 0.5,
    halfLeft: 0.2,
    halfTop: 0.4,
    delay: 0.81
  }, {
    zIndex: 1,
    rotateX: 360,
    rotateZ: -360,
    rotateY: -180,
    halfScale: 0.5,
    halfLeft: -0.2,
    halfTop: 0.4,
    delay: 0.45
  }, {
    zIndex: 0,
    rotateX: -360,
    rotateZ: 360,
    rotateY: -180,
    halfScale: 0.5,
    halfLeft: -0.7,
    halfTop: 0.7,
    delay: 0.63
  }, {
    zIndex: 1,
    rotateX: -360,
    rotateZ: 360,
    rotateY: -180,
    halfScale: 0.5,
    halfLeft: 0.7,
    halfTop: 0,
    delay: 0.54
  }, {
    zIndex: 2,
    rotateX: 360,
    rotateZ: -360,
    rotateY: 180,
    halfScale: 0.5,
    halfLeft: 0.2,
    halfTop: 0,
    delay: 0.38
  }, {
    zIndex: 2,
    rotateX: 360,
    rotateZ: -360,
    rotateY: -180,
    halfScale: 0.5,
    halfLeft: -0.2,
    halfTop: 0,
    delay: 0
  }, {
    zIndex: 1,
    rotateX: -360,
    rotateZ: 360,
    rotateY: 180,
    halfScale: 0.5,
    halfLeft: -0.7,
    halfTop: 0,
    delay: 0.72
  }, {
    zIndex: 0,
    rotateX: -360,
    rotateZ: 360,
    rotateY: 180,
    halfScale: 0.5,
    halfLeft: 0.7,
    halfTop: -0.7,
    delay: 1
  }, {
    zIndex: 1,
    rotateX: -360,
    rotateZ: 360,
    rotateY: -180,
    halfScale: 0.5,
    halfLeft: 0.2,
    halfTop: -0.4,
    delay: 0.7
  }, {
    zIndex: 1,
    rotateX: 360,
    rotateZ: -360,
    rotateY: 180,
    halfScale: 0.5,
    halfLeft: -0.2,
    halfTop: -0.4,
    delay: 0.57
  }, {
    zIndex: 0,
    rotateX: 360,
    rotateZ: -360,
    rotateY: -180,
    halfScale: 0.5,
    halfLeft: -0.7,
    halfTop: -0.7,
    delay: 0.9
  },];
  o.css({
    position: "absolute",
    top: 0,
    left: 0,
    width: g.width(),
    height: g.height(),
    transform: "translate3d(0,0,0)",
    transformOrigin: (f.width / 2) + "px " + (f.height / 2) + "px 0",
    perspective: v
  }).hide();
  for (var l = 0; l < a * r; l++) {
    var B = l % a, A = Math.floor(l / a);
    var E = h("<div>").css({
        position: "absolute",
        left: 100 * B / a + "%",
        top: 100 * A / r + "%",
        outline: "1px solid transparent",
        transformStyle: (p || m) ? "flat" : "preserve-3d",
        zIndex: y[l].zIndex,
        overflow: q ? "visible" : "hidden"
      }).appendTo(o), z = h("<div>").css({
        transform: "scale(1) rotateX(0) rotateY(0) translate3d(0,0,0)",
        outline: "1px solid transparent",
        transformStyle: "preserve-3d"
      }).appendTo(E), w = h("<div>").addClass("ws_front_image").appendTo(z),
      D = q ? h("<div>").addClass("ws_back_image").appendTo(z) : 0;
    w.css({
      position: "absolute",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      backfaceVisibility: "hidden",
      transform: "translate3d(0,0,0)"
    }).append(h("<img>").css({
      left: -B * 100 + "%",
      top: -A * 100 + "%",
      position: "absolute",
      outline: "1px solid transparent"
    }));
    if (q) {
      D.css({
        position: "absolute",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backfaceVisibility: "hidden",
        transform: "rotateY(180deg) translate3d(0,0," + b + "px)"
      }).append(h("<img>").css({
        left: -B * 100 + "%",
        top: -A * 100 + "%",
        position: "absolute",
        outline: "1px solid transparent"
      }))
    }
    var t = {position: "absolute", outline: "1px solid transparent"};
    G[l] = {
      part: z,
      front: w,
      back: D,
      wrapper: E,
      leftEdge: q ? h("<div>").addClass("ws_left_edge").css(t).appendTo(z) : 0,
      rightEdge: q ? h("<div>").addClass("ws_right_edge").css(t).appendTo(z) : 0,
      topEdge: q ? h("<div>").addClass("ws_top_edge").css(t).appendTo(z) : 0,
      bottomEdge: q ? h("<div>").addClass("ws_bottom_edge").css(t).appendTo(z) : 0
    }
  }

  function C(N) {
    var J = {}, L = s.get(N), O = f.width / a, P = f.height / r;
    for (var K = 0; K < a * r; K++) {
      var N = K % a, M = Math.floor(K / a);
      J[K] = F(L, {x: N * O, y: M * P, w: O, h: P})
    }
    return J
  }

  function I(J, M, j, K, L) {
    for (var i in M) {
      if (typeof G[i] !== "function") {
        M[i].topEdge.css({
          width: K,
          height: J,
          background: j[i],
          transform: "rotateX(90deg) translate3d(0,-" + J / 2 + "px," + J / 2 + "px)"
        });
        M[i].bottomEdge.css({
          width: K,
          height: J,
          background: j[i],
          transform: "rotateX(90deg) translate3d(0,-" + J / 2 + "px," + (-L + J / 2) + "px)"
        });
        M[i].leftEdge.css({
          width: J,
          height: L,
          background: j[i],
          transform: "rotateY(90deg) translate3d(" + J / 2 + "px,0,-" + J / 2 + "px)"
        });
        M[i].rightEdge.css({
          width: J,
          height: L,
          background: j[i],
          transform: "rotateY(90deg) translate3d(" + J / 2 + "px,0," + (K - J / 2) + "px)"
        })
      }
    }
  }

  function e(J, K) {
    var i = 0;
    for (var j in J) {
      if (typeof J[j] !== "function") {
        (function (L, M) {
          wowAnimate(function (O) {
            var U, S, T, R = "", N = {};
            if (O <= 0.5) {
              U = h.easing.easeInBack(1, O * 2, 0, 1, 1, 1).toFixed(3);
              S = h.easing.easeInBackQ(1, O * 2, 0, 1, 1, 1).toFixed(3);
              T = h.easing.easeInBackQ2(1, O * 2, 0, 1, 1, 1).toFixed(3);
              M[L].back.css("backfaceVisibility", "hidden")
            } else {
              U = h.easing.easeOutBack(1, (O - 0.5) * 2, 0, 1, 1, 1).toFixed(3);
              S = h.easing.easeOutBackQ(1, (O - 0.5) * 2, 0, 1, 1, 1).toFixed(3);
              T = h.easing.easeOutBackQ2(1, (O - 0.5) * 2, 0, 1, 1, 1).toFixed(3);
              M[L].back.css("backfaceVisibility", "visible")
            }
            for (var P in M[L].animate[O <= 0.5 ? "half" : "end"]) {
              var V = M[L].animate[O <= 0.5 ? "begin" : "half"][P] || 0,
                Q = M[L].animate[O <= 0.5 ? "half" : "end"][P] || 0;
              if (typeof Q !== "object") {
                if (P === "scale" || P === "rotateX" || P === "rotateY") {
                  Q = V + (Q - V) * S
                } else {
                  if (P === "left" || P === "top") {
                    Q = V + (Q - V) * T
                  } else {
                    Q = V + (Q - V) * U
                  }
                }
              }
              if (P === "rotateX" || P === "rotateY" || P === "rotateZ") {
                R += P + "(" + Q + "deg) "
              } else {
                if (P === "scale") {
                  R += P + "(" + Q + ") "
                } else {
                  if (P === "translate3d") {
                    R += P + "(" + (V[0] + (Q[0] - V[0]) * U).toFixed(3) + "px," + (V[1] + (Q[1] - V[1]) * U).toFixed(3) + "px," + (V[2] + (Q[2] - V[2]) * U).toFixed(3) + "px) "
                  } else {
                    N[P] = Q
                  }
                }
              }
            }
            M[L].wrapper.css({transform: "translate3d(" + (N.left ? N.left : 0).toFixed(3) + "px," + (N.top ? N.top : 0).toFixed(3) + "px,0)"});
            delete N.left;
            delete N.top;
            if (R) {
              N.transform = R
            }
            M[L].part.css(N)
          }, 0, 1, M[L].animate.duration, M[L].animate.delay, function () {
            i++;
            if (i == M.length && K) {
              K()
            }
          })
        }(j, J))
      }
    }
  }

  function k(aa, M, N, P) {
    var X = g.width(), W = g.height(), V = X / a, U = W / r, L = (f.duration * 0.4) > 1000 ? 1000 : (f.duration * 0.4),
      K = f.duration * 0.6, Q = [0, 0];
    I(b, aa, x[M], V, U);
    o.css({transformOrigin: (X / 2) + "px " + (W / 2) + "px 0", width: X, height: W});
    for (var S in aa) {
      if (typeof aa[S] !== "function") {
        var J = y[S].delay * L;
        if (Q[1] <= J) {
          Q[0] = S;
          Q[1] = J
        }
        aa[S].part[0].ws_delay = [J, 0]
      }
    }
    aa[Q[0]].part[0].ws_delay[1] = 1;
    for (var S in aa) {
      if (typeof aa[S] !== "function") {
        var R = aa[S], Z = S % a, Y = Math.floor(S / a), T = X * Z / a, O = W * Y / r;
        R.animate = {
          delay: R.part[0].ws_delay[0],
          duration: K,
          begin: {
            left: 0,
            top: 0,
            width: V,
            height: U,
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            translate3d: [0, 0, p ? b : 0]
          },
          half: {
            left: y[S].halfLeft * V,
            top: y[S].halfTop * U,
            scale: y[S].halfScale,
            rotateX: y[S].rotateX / 2,
            rotateY: y[S].rotateY / 2,
            translate3d: [0, 0, (p ? 1 : 0.5) * b]
          },
          end: {left: 0, top: 0, scale: 1, rotateX: y[S].rotateX, rotateY: y[S].rotateY, translate3d: [0, 0, b]}
        };
        R.front.find("img").css(N);
        R.back.css("backfaceVisibility", "hidden").find("img").css(N);
        R.part.css({
          width: R.animate.begin.width,
          height: R.animate.begin.height,
          left: R.animate.begin.left,
          top: R.animate.begin.top
        })
      }
    }
    e(aa, P)
  }

  var d;
  this.go = function (X, M) {
    if (d) {
      return M
    }
    o.show();
    var K = h(s.get(M));
    K = {
      width: K.width(),
      height: K.height(),
      marginTop: parseFloat(K.css("marginTop")),
      marginLeft: parseFloat(K.css("marginLeft"))
    };
    if (q) {
      G[0].front.find("img").on("load", function () {
        u.hide()
      });
      for (var N in G) {
        if (typeof G[N] !== "function") {
          G[N].front.find("img").attr("src", s.get(M).src);
          G[N].back.find("img").attr("src", s.get(X).src)
        }
      }
      if (!x[M]) {
        x[M] = C(M)
      }
      d = new k(G, M, K, function () {
        u.show();
        n.trigger("effectEnd");
        o.hide();
        for (var i in G) {
          if (typeof G[i] !== "function") {
            G[i].part.css({transition: "", transform: "rotateX(0) rotateY(0) translate3d(0,0,0)"})
          }
        }
        d = 0
      })
    } else {
      d = true;

      function Y(j, i) {
        return Math.random() * (i - j + 1) + j
      }

      var T = g.width(), W = g.height(), S = T / a, V = W / r, L = T - S * (a - 1), U = W - V * (r - 1);
      o.css({width: T, height: W});
      var J = 0;
      for (var N in G) {
        var R = N % a, P = Math.floor(N / a);
        G[N].front.find("img").attr("src", s.get(X).src).css(K);
        var Z = f.duration * (1 - Math.abs((c * H - R * P) / (2 * r * a)));
        var Q = Y(-1, 1) > 0 ? 1 : -1;
        var O = Y(-1, 1) > 0 ? 1 : -1;
        G[N].wrapper.css({width: S, height: V});
        G[N].part.css({position: "absolute", top: Q * V, left: O * S, opacity: 0, width: S, height: V}).animate({
          top: 0,
          left: 0,
          opacity: 1
        }, Z, function () {
          J++;
          if (J == r * a) {
            u.stop(1, 1);
            d = false;
            n.trigger("effectEnd")
          }
        })
      }
    }
  };

  function F(S, J) {
    J = J || {};
    var U = 1, M = J.exclude || [], R;
    var O = document.createElement("canvas"), L = O.getContext("2d"), K = O.width = S.naturalWidth,
      Y = O.height = S.naturalHeight;
    L.drawImage(S, 0, 0, S.naturalWidth, S.naturalHeight);
    try {
      R = L.getImageData(J.x ? J.x : 0, J.y ? J.y : 0, J.w ? J.w : S.width, J.h ? J.h : S.height)["data"]
    } catch (T) {
      console.log("error:unable to access image data: " + T);
      return "#ccc"
    }
    var N = (J.w ? J.w : S.width * J.h ? J.h : S.height) || R.length, P = {}, W = "", V = [],
      j = {dominant: {name: "", count: 0}};
    var Q = 0;
    while (Q < N) {
      V[0] = R[Q];
      V[1] = R[Q + 1];
      V[2] = R[Q + 2];
      W = V.join(",");
      if (W in P) {
        P[W] = P[W] + 1
      } else {
        P[W] = 1
      }
      if (M.indexOf(["rgb(", W, ")"].join("")) === -1) {
        var X = P[W];
        if (X > j.dominant.count) {
          j.dominant.name = W;
          j.dominant.count = X
        }
      }
      Q += U * 4
    }
    return ["rgb(", j.dominant.name, ")"].join("")
  }
};

function ws_seven(m, A, o) {
  var p = jQuery;
  var w = p(this);
  var n = m.distance || 5;
  var d = m.cols;
  var z = m.rows;
  var a = m.duration * 2;
  var q = m.blur || 50;
  var E = o.find(".ws_list");
  var x = p("<div>").css({position: "absolute", top: 0, left: 0, width: "100%", height: "100%"});
  var c = x.clone().css("overflow", "hidden");
  x.addClass("ws_effect ws_seven");
  var t = !m.noCanvas && !window.opera && !!document.createElement("canvas").getContext;
  var l;
  var e = p("<div>").addClass("ws_parts").css({
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
    zIndex: 8,
    transform: "translate3d(0,0,0)"
  });
  var B = p("<div>").addClass("ws_zoom").css({
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    zIndex: 2,
    transform: "translate3d(0,0,0)"
  });

  x.append(e, B, c).appendTo(o);
  var f = {t: p(window).scrollTop(), l: p(window).scrollLeft(), w: p(window).width(), h: p(window).height()};
  var D = Math.max((m.width || e.width()) / (m.height || e.height()) || 3, 3);
  d = d || Math.round(D < 1 ? 3 : 3 * D);
  z = z || Math.round(D < 1 ? 3 / D : 3);
  var J = [];
  var y = [];
  for (var v = 0; v < d * z; v++) {
    var H = v % d;
    var G = Math.floor(v / d);
    p(J[v] = p("<div>")[0]).css({
      position: "absolute",
      overflow: "hidden",
      transform: "translate3d(0,0,0)"
    }).appendTo(e).append(p("<img>").css({position: "absolute", transform: "translate3d(0,0,0)"}));
    p(y[v] = p("<div>")[0]).css({
      position: "absolute",
      overflow: "hidden",
      transform: "translate3d(0,0,0)"
    }).appendTo(B).append(p("<img>").css({position: "absolute", transform: "translate3d(0,0,0)"}))
  }
  J = p(J);
  y = p(y);
  jQuery.extend(jQuery.easing, {
    easeOutQuart: function (j, K, i, M, L) {
      return -M * ((K = K / L - 1) * K * K * K - 1) + i
    }, easeInExpo: function (j, K, i, M, L) {
      return (K == 0) ? i : M * Math.pow(2, 10 * (K / L - 1)) + i
    }, easeInCirc: function (j, K, i, M, L) {
      return -M * (Math.sqrt(1 - (K /= L) * K) - 1) + i
    }
  });

  function s(j, i) {
    return Math.abs((i % 2 ? 1 : 0) + ((i - i % 2) / 2) - j) / i
  }

  function I(M, L, N, i) {
    var K = (L >= i) ? (i) / (L) : 1;
    var j = (M >= N) ? (N) / (M) : 1;
    return {l: j, t: K, m: Math.min(j, K)}
  }

  function k(j, L) {
    var K = 0;
    for (var i in j) {
      (function (N, O) {
        var M = O[N];
        wowAnimate(M.item, M.begin, M.end, M.duration, M.delay, M.easing, function () {
          if (M.callback) {
            M.callback()
          }
          K++;
          if (K == O.length && L) {
            L()
          }
        })
      }(i, j))
    }
  }

  function u(U, i, j, M, W) {
    var Q = e.width(), S = e.height(), T = n * Q / d, O = n * S / z, P = a * (M ? 4 : 5) / (d * z),
      L = M ? "easeInExpo" : "easeOutQuart";
    var K = f.h + f.t - S / z, R = f.w + f.l - Q / d, X = e.offset().top + e.height(), N = e.offset().left + e.width();
    if (K < X) {
      K = X
    }
    if (R < N) {
      R = N
    }
    var V = [];
    p(U).each(function (af) {
      var ac = af % d, Z = Math.floor(af / d), ad = a * 0.2 * (s(ac, d) * 45 + Z * 4) / (d * z),
        ab = e.offset().left + f.l + T * ac - Q * n / 2 + T, ae = e.offset().top + f.t + O * Z - S * n / 2 + O,
        Y = I(ab, ae, R, K);
      if (m.support.transform) {
        var ag = {
          opacity: 1,
          translate: [Q * ac / d, S * Z / z, 0],
          scale: 1,
          width: Q / d,
          height: S / z,
          zIndex: Math.ceil(100 - s(ac, d) * 100)
        }, aj = {
          opacity: 0,
          translate: [(T * ac - Q * n / 2.115) * Y.l, (O * Z - S * n / 2.115) * Y.t, 0],
          scale: n * Y.m,
          width: Q / d,
          height: S / z,
          zIndex: Math.ceil(100 - s(ac, d) * 100)
        };
        p(this).find("img").css({
          transform: "translate3d(" + (-Q * ac / d + j.marginLeft) + "px," + (-S * Z / z + j.marginTop) + "px,0px)",
          width: j.width,
          height: j.height
        })
      } else {
        var ag = {
            opacity: 1,
            left: Q * ac / d,
            top: S * Z / z,
            width: Q / d,
            height: S / z,
            zIndex: Math.ceil(100 - s(ac, d) * 100)
          }, aj = {
            opacity: 0,
            left: (T * ac - Q * n / 2) * Y.l,
            top: (O * Z - S * n / 2) * Y.t,
            width: T * Y.m,
            height: O * Y.m
          }, ai = {left: -(Q * ac / d) + j.marginLeft, top: -(S * Z / z) + j.marginTop, width: j.width, height: j.height},
          ah = {
            left: -n * (Q / d * ac - j.marginLeft) * Y.m,
            top: -n * (S / z * Z - j.marginTop) * Y.m,
            width: n * j.width * Y.m,
            height: n * j.height * Y.m
          }
      }
      if (!M) {
        var aa = ag;
        ag = aj;
        aj = aa;
        aa = ai;
        ai = ah;
        ah = aa
      }
      V.push({
        item: p(this).show(), begin: ag, end: aj, easing: L, delay: ad, duration: P, callback: M ? function () {
          this.item.hide()
        } : 0
      });
      if (ai) {
        V.push({item: p(this).find("img"), begin: ai, end: ah, easing: L, delay: ad, duration: P})
      }
    });
    if (M) {
      p(i).each(function (ac) {
        var Z = ac % d;
        var Y = Math.floor(ac / d);
        var aa = a * 0.2 + a * 0.15 * (s(Z, d) * 35 + Y * 4) / (d * z);
        var ab = a * 4 / (d * z);
        if (m.support.transform) {
          var ad = {
            opacity: 0,
            translate: [Q / 2, S / 2, 0],
            scale: 0,
            width: Q / d,
            height: S / z,
            zIndex: Math.ceil(100 - s(Z, d) * 100)
          }, af = {
            opacity: 1,
            translate: [Q * Z / d, S * Y / z, 0],
            scale: 1,
            width: Q / d,
            height: S / z,
            zIndex: Math.ceil(100 - s(Z, d) * 100)
          };
          p(this).find("img").css({
            transform: "translate3d(" + (-Q * Z / d + j.marginLeft) + "px," + (-S * Y / z + j.marginTop) + "px,0px)",
            width: j.width,
            height: j.height
          })
        } else {
          var ad = {left: Q / 2, top: S / 2, width: 0, height: 0, zIndex: Math.ceil(100 - s(Z, d) * 100)},
            af = {left: Q * Z / d, top: S * Y / z, width: Q / d, height: S / z},
            ag = {left: 0, top: 0, width: 0, height: 0},
            ae = {left: -Q * Z / d + j.marginLeft, top: -S * Y / z + j.marginTop, width: j.width, height: j.height}
        }
        V.push({item: p(this), begin: ad, end: af, easing: "easeOutBack", delay: aa, duration: ab});
        if (ag) {
          V.push({item: p(this).find("img"), begin: ag, end: ae, easing: "easeOutBack", delay: aa, duration: ab})
        }
      });
      B.delay(a * 0.1).animate({opacity: 1}, a * 0.2, "easeInCirc")
    }
    k(V, W);
    return {
      stop: function () {
        W()
      }
    }
  }

  var h;
  this.go = function (i, j, M) {
    if (h) {
      return j
    }
    if (M == undefined) {
      M = (j == 0 && i != j + 1) || (i == j - 1) ? false : true
    }
    f.t = p(window).scrollTop();
    f.l = p(window).scrollLeft();
    f.w = p(window).width();
    f.h = p(window).height();
    var N = p(A.get(j));
    N = {
      width: N.width(),
      height: N.height(),
      marginTop: parseFloat(N.css("marginTop")),
      marginLeft: parseFloat(N.css("marginLeft"))
    };
    J.find("img").attr("src", A.get(M ? j : i).src);
    y.find("img").attr("src", A.get(i).src);
    e.show();
    if (M) {
      B.show()
    }
    var L = 0;
    if (M) {
      if (t) {
        try {
          document.createElement("canvas").getContext("2d").getImageData(0, 0, 1, 1)
        } catch (K) {
          t = 0
        }
        l = '<canvas width="' + x.width + '" height="' + x.height + '"/>';
        l = p(l).css({"z-index": 1, position: "absolute", left: 0, top: 0}).css(N).appendTo(c);
        L = F(p(A.get(j)), N, q, l.get(0))
      }
      if (!t || !L) {
        t = 0;
        L = F(p(A.get(j)), N, 8);
        if (l) {
          l.remove();
          l = 0
        }
      }
    }
    h = new u(J, y, N, M, function () {
      w.trigger("effectEnd");
      e.hide();
      B.hide();
      if (l) {
        l.remove()
      } else {
        if (L) {
          L.remove()
        }
      }
      h = 0
    })
  };

  function F(P, K, O, L) {
    var S = (parseInt(P.parent().css("z-index")) || 0) + 1;
    if (t) {
      var V = L.getContext("2d");
      V.drawImage(P.get(0), 0, 0, K.width, K.height);
      if (!b(V, 0, 0, L.width, L.height, O)) {
        return 0
      }
      return p(L)
    }
    var W = p("<div></div>").css({
      position: "absolute",
      "z-index": S,
      left: 0,
      top: 0,
      overflow: "hidden"
    }).css(K).appendTo(c);
    var U = (Math.sqrt(5) + 1) / 2;
    var M = 1 - U / 2;
    for (var N = 0; M * N < O; N++) {
      var Q = Math.PI * U * N;
      var j = (M * N + 1);
      var T = j * Math.cos(Q);
      var R = j * Math.sin(Q);
      p(document.createElement("img")).attr("src", P.attr("src")).css({
        opacity: 1 / (N / 1.8 + 1),
        position: "absolute",
        "z-index": S,
        left: Math.round(T) + "px",
        top: Math.round(R) + "px",
        width: "100%",
        height: "100%"
      }).appendTo(W)
    }
    return W
  }

  var r = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259];
  var C = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];

  function b(az, ag, ae, j, K, ap) {
    if (isNaN(ap) || ap < 1) {
      return
    }
    ap |= 0;
    var au;
    try {
      au = az.getImageData(ag, ae, j, K)
    } catch (ay) {
      console.log("error:unable to access image data: " + ay);
      return false
    }
    var O = au.data;
    var an, am, aw, at, V, Y, S, M, N, ad, T, af, ab, aj, ao, W, R, X, Z, ai;
    var ax = ap + ap + 1;
    var ak = j << 2;
    var U = j - 1;
    var ar = K - 1;
    var Q = ap + 1;
    var aq = Q * (Q + 1) / 2;
    var ah = new g();
    var ac = ah;
    for (aw = 1; aw < ax; aw++) {
      ac = ac.next = new g();
      if (aw == Q) {
        var P = ac
      }
    }
    ac.next = ah;
    var av = null;
    var al = null;
    S = Y = 0;
    var aa = r[ap];
    var L = C[ap];
    for (am = 0; am < K; am++) {
      aj = ao = W = M = N = ad = 0;
      T = Q * (R = O[Y]);
      af = Q * (X = O[Y + 1]);
      ab = Q * (Z = O[Y + 2]);
      M += aq * R;
      N += aq * X;
      ad += aq * Z;
      ac = ah;
      for (aw = 0; aw < Q; aw++) {
        ac.r = R;
        ac.g = X;
        ac.b = Z;
        ac = ac.next
      }
      for (aw = 1; aw < Q; aw++) {
        at = Y + ((U < aw ? U : aw) << 2);
        M += (ac.r = (R = O[at])) * (ai = Q - aw);
        N += (ac.g = (X = O[at + 1])) * ai;
        ad += (ac.b = (Z = O[at + 2])) * ai;
        aj += R;
        ao += X;
        W += Z;
        ac = ac.next
      }
      av = ah;
      al = P;
      for (an = 0; an < j; an++) {
        O[Y] = (M * aa) >> L;
        O[Y + 1] = (N * aa) >> L;
        O[Y + 2] = (ad * aa) >> L;
        M -= T;
        N -= af;
        ad -= ab;
        T -= av.r;
        af -= av.g;
        ab -= av.b;
        at = (S + ((at = an + ap + 1) < U ? at : U)) << 2;
        aj += (av.r = O[at]);
        ao += (av.g = O[at + 1]);
        W += (av.b = O[at + 2]);
        M += aj;
        N += ao;
        ad += W;
        av = av.next;
        T += (R = al.r);
        af += (X = al.g);
        ab += (Z = al.b);
        aj -= R;
        ao -= X;
        W -= Z;
        al = al.next;
        Y += 4
      }
      S += j
    }
    for (an = 0; an < j; an++) {
      ao = W = aj = N = ad = M = 0;
      Y = an << 2;
      T = Q * (R = O[Y]);
      af = Q * (X = O[Y + 1]);
      ab = Q * (Z = O[Y + 2]);
      M += aq * R;
      N += aq * X;
      ad += aq * Z;
      ac = ah;
      for (aw = 0; aw < Q; aw++) {
        ac.r = R;
        ac.g = X;
        ac.b = Z;
        ac = ac.next
      }
      V = j;
      for (aw = 1; aw <= ap; aw++) {
        Y = (V + an) << 2;
        M += (ac.r = (R = O[Y])) * (ai = Q - aw);
        N += (ac.g = (X = O[Y + 1])) * ai;
        ad += (ac.b = (Z = O[Y + 2])) * ai;
        aj += R;
        ao += X;
        W += Z;
        ac = ac.next;
        if (aw < ar) {
          V += j
        }
      }
      Y = an;
      av = ah;
      al = P;
      for (am = 0; am < K; am++) {
        at = Y << 2;
        O[at] = (M * aa) >> L;
        O[at + 1] = (N * aa) >> L;
        O[at + 2] = (ad * aa) >> L;
        M -= T;
        N -= af;
        ad -= ab;
        T -= av.r;
        af -= av.g;
        ab -= av.b;
        at = (an + (((at = am + Q) < ar ? at : ar) * j)) << 2;
        M += (aj += (av.r = O[at]));
        N += (ao += (av.g = O[at + 1]));
        ad += (W += (av.b = O[at + 2]));
        av = av.next;
        T += (R = al.r);
        af += (X = al.g);
        ab += (Z = al.b);
        aj -= R;
        ao -= X;
        W -= Z;
        al = al.next;
        Y += j
      }
    }
    az.putImageData(au, ag, ae);
    return true
  }

  function g() {
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 0;
    this.next = null
  }
};

function ws_book(p, n, b) {
  var f = jQuery;
  var m = f(this);
  var i = f(".ws_list", b);
  var k = f("<div>").addClass("ws_effect ws_book").css({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%"
    }).appendTo(b), e = p.duration, d = p.perspective || 0.4, g = p.shadow || 0.35, a = p.noCanvas || false,
    l = p.no3d || false;
  var o = {
    domPrefixes: " Webkit Moz ms O Khtml".split(" "), testDom: function (r) {
      var q = this.domPrefixes.length;
      while (q--) {
        if (typeof document.body.style[this.domPrefixes[q] + r] !== "undefined") {
          return true
        }
      }
      return false
    }, cssTransitions: function () {
      return this.testDom("Transition")
    }, cssTransforms3d: function () {
      var r = (typeof document.body.style.perspectiveProperty !== "undefined") || this.testDom("Perspective");
      if (r && /AppleWebKit/.test(navigator.userAgent)) {
        var t = document.createElement("div"), q = document.createElement("style"),
          s = "Test3d" + Math.round(Math.random() * 99999);
        q.textContent = "@media (-webkit-transform-3d){#" + s + "{height:3px}}";
        document.getElementsByTagName("head")[0].appendChild(q);
        t.id = s;
        document.body.appendChild(t);
        r = t.offsetHeight === 3;
        q.parentNode.removeChild(q);
        t.parentNode.removeChild(t)
      }
      return r
    }, canvas: function () {
      if (typeof document.createElement("canvas").getContext !== "undefined") {
        return true
      }
    }
  };
  if (!l) {
    l = o.cssTransitions() && o.cssTransforms3d()
  }
  if (!a) {
    a = o.canvas()
  }
  var j;
  this.go = function (r, q, E) {
    if (j) {
      return -1
    }
    var v = n.get(r), G = n.get(q);
    if (E == undefined) {
      E = (q == 0 && r != q + 1) || (r == q - 1)
    } else {
      E = !E
    }
    var s = f("<div>").appendTo(k);
    var t = f(v);
    t = {
      width: t.width(),
      height: t.height(),
      marginLeft: parseFloat(t.css("marginLeft")),
      marginTop: parseFloat(t.css("marginTop"))
    };
    if (l) {
      var y = {
        background: "#000",
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        transformStyle: "preserve-3d",
        zIndex: 3,
        outline: "1px solid transparent"
      };
      perspect = b.width() * (3 - d * 2);
      s.css(y).css({perspective: perspect, transform: "translate3d(0,0,0)"});
      var z = 90;
      var D = f("<div>").css(y).css({
        position: "relative",
        "float": "left",
        width: "50%",
        overflow: "hidden"
      }).append(f("<img>").attr("src", (E ? v : G).src).css(t)).appendTo(s);
      var C = f("<div>").css(y).css({
        position: "relative",
        "float": "left",
        width: "50%",
        overflow: "hidden"
      }).append(f("<img>").attr("src", (E ? G : v).src).css(t).css({marginLeft: -t.width / 2})).appendTo(s);
      var I = f("<div>").css(y).css({
        display: E ? "block" : "none",
        width: "50%",
        transform: "rotateY(" + (E ? 0.1 : z) + "deg)",
        transition: (E ? "ease-in " : "ease-out ") + e / 2000 + "s",
        transformOrigin: "right",
        overflow: "hidden"
      }).append(f("<img>").attr("src", (E ? G : v).src).css(t)).appendTo(s);
      var F = f("<div>").css(y).css({
        display: E ? "none" : "block",
        left: "50%",
        width: "50%",
        transform: "rotateY(-" + (E ? z : 0.1) + "deg)",
        transition: (E ? "ease-out " : "ease-in ") + e / 2000 + "s",
        transformOrigin: "left",
        overflow: "hidden"
      }).append(f("<img>").attr("src", (E ? v : G).src).css(t).css({marginLeft: -t.width / 2})).appendTo(s)
    } else {
      if (a) {
        var x = f("<div>").css({
          position: "absolute",
          top: 0,
          left: E ? 0 : "50%",
          width: "50%",
          height: "100%",
          overflow: "hidden",
          zIndex: 6
        }).append(f(n.get(r)).clone().css({
          position: "absolute",
          height: "100%",
          right: E ? "auto" : 0,
          left: E ? 0 : "auto"
        })).appendTo(s).hide();
        var B = f("<div>").css({
          position: "absolute",
          width: "100%",
          height: "100%",
          left: 0,
          top: 0,
          zIndex: 8
        }).appendTo(s).hide();
        var H = f("<canvas>").css({
          position: "absolute",
          zIndex: 2,
          left: 0,
          top: -B.height() * d / 2
        }).attr({width: B.width(), height: B.height() * (d + 1)}).appendTo(B);
        var A = H.clone().css({top: 0, zIndex: 1}).attr({width: B.width(), height: B.height()}).appendTo(B);
        var w = H.get(0).getContext("2d");
        var u = A.get(0).getContext("2d")
      } else {
        i.stop(true).animate({left: (r ? -r + "00%" : (/Safari/.test(navigator.userAgent) ? "0%" : 0))}, e, "easeInOutExpo")
      }
    }
    if (!l && a) {
      var D = w;
      var C = u;
      var I = G;
      var F = v
    }
    j = new h(E, z, D, C, I, F, B, H, A, x, t, function () {
      m.trigger("effectEnd");
      s.remove();
      j = 0
    })
  };

  function c(G, s, A, v, u, E, D, C, B, t, r) {
    numSlices = u / 2, widthScale = u / B, heightScale = (1 - E) / numSlices;
    G.clearRect(0, 0, r.width(), r.height());
    for (var q = 0; q < numSlices + widthScale; q++) {
      var z = (D ? q * p.width / u + p.width / 2 : (numSlices - q) * p.width / u);
      var H = A + (D ? 2 : -2) * q, F = v + t * heightScale * q / 2;
      if (z < 0) {
        z = 0
      }
      if (H < 0) {
        H = 0
      }
      if (F < 0) {
        F = 0
      }
      G.drawImage(s, z, 0, 2.5, p.height, H, F, 2, t * (1 - (heightScale * q)))
    }
    G.save();
    G.beginPath();
    G.moveTo(A, v);
    G.lineTo(A + (D ? 2 : -2) * (numSlices + widthScale), v + t * heightScale * (numSlices + widthScale) / 2);
    G.lineTo(A + (D ? 2 : -2) * (numSlices + widthScale), t * (1 - heightScale * (numSlices + widthScale)) + v + t * heightScale * (numSlices + widthScale) / 2);
    G.lineTo(A, v + t);
    G.closePath();
    G.clip();
    G.fillStyle = "rgba(0,0,0," + Math.round(C * 100) / 100 + ")";
    G.fillRect(0, 0, r.width(), r.height());
    G.restore()
  }

  function h(A, r, C, B, y, x, v, w, u, z, t, E) {
    if (l) {
      if (!A) {
        r *= -1;
        var D = B;
        B = C;
        C = D;
        D = x;
        x = y;
        y = D
      }
      setTimeout(function () {
        C.children("img").css("opacity", g).animate({opacity: 1}, e / 2);
        y.css("transform", "rotateY(" + r + "deg)").children("img").css("opacity", 1).animate({opacity: g}, e / 2, function () {
          y.hide();
          x.show().css("transform", "rotateX(0deg) rotateY(0deg)").children("img").css("opacity", g).animate({opacity: 1}, e / 2);
          B.children("img").css("opacity", 1).animate({opacity: g}, e / 2)
        })
      }, 0);
      setTimeout(E, e)
    } else {
      if (a) {
        v.show();
        var q = new Date;
        var s = true;
        wowAnimate(function (F) {
          var I = jQuery.easing.easeInOutQuint(1, F, 0, 1, 1), H = jQuery.easing.easeInOutCubic(1, F, 0, 1, 1), L = !A;
          if (F < 0.5) {
            I *= 2;
            H *= 2;
            var G = y
          } else {
            L = A;
            I = (1 - I) * 2;
            H = (1 - H) * 2;
            var G = x
          }
          var J = v.height() * d / 2, N = (1 - I) * v.width() / 2, M = 1 + H * d, K = v.width() / 2;
          c(C, G, K, J, N, M, L, H * g, K, v.height(), w);
          if (s) {
            z.show();
            s = false
          }
          B.clearRect(0, 0, u.width(), u.height());
          B.fillStyle = "rgba(0,0,0," + (g - H * g) + ")";
          B.fillRect(L ? K : 0, 0, u.width() / 2, u.height())
        }, 0, 1, e, E)
      }
    }
  }
}

jQuery.extend(jQuery.easing, {
  easeInOutCubic: function (e, f, a, h, g) {
    if ((f /= g / 2) < 1) {
      return h / 2 * f * f * f + a
    }
    return h / 2 * ((f -= 2) * f * f + 2) + a
  }, easeInOutQuint: function (e, f, a, h, g) {
    if ((f /= g / 2) < 1) {
      return h / 2 * f * f * f * f * f + a
    }
    return h / 2 * ((f -= 2) * f * f * f * f + 2) + a
  }
});
function ws_slices(k, h, i) {
  var b = jQuery;
  var f = b(this);

  function g(q, p, o, m, l, n) {
    if (k.support.transform) {
      if (p.top) {
        p.translate = [0, p.top || 0, 0]
      }
      if (o.top) {
        o.translate = [0, o.top || 0, 0]
      }
      delete p.top;
      delete o.top
    }
    wowAnimate(q, p, o, m, l, "swing", n)
  }

  var e = function (r, x) {
    var q = b.extend({}, {
      effect: "random",
      slices: 15,
      animSpeed: 500,
      pauseTime: 3000,
      startSlide: 0,
      container: null,
      onEffectEnd: 0
    }, x);
    var t = {currentSlide: 0, currentImage: "", totalSlides: 0, randAnim: "", stop: false};
    var o = b(r);
    o.data("wow:vars", t);
    if (!/absolute|relative/.test(o.css("position"))) {
      o.css("position", "relative")
    }
    var m = x.container || o;
    var p = o.children();
    t.totalSlides = p.length;
    if (q.startSlide > 0) {
      if (q.startSlide >= t.totalSlides) {
        q.startSlide = t.totalSlides - 1
      }
      t.currentSlide = q.startSlide
    }
    if (b(p[t.currentSlide]).is("img")) {
      t.currentImage = b(p[t.currentSlide])
    } else {
      t.currentImage = b(p[t.currentSlide]).find("img:first")
    }
    if (b(p[t.currentSlide]).is("a")) {
      b(p[t.currentSlide]).css("display", "block")
    }
    for (var s = 0; s < q.slices; s++) {
      var w = Math.round(m.width() / q.slices);
      var v = b('<div class="wow-slice"></div>').css({
        left: w * s + "px",
        overflow: "hidden",
        width: ((s == q.slices - 1) ? (m.width() - (w * s)) : w) + "px",
        position: "absolute"
      }).appendTo(m);
      b("<img>").css({position: "absolute", left: 0, top: 0, transform: "translate3d(0,0,0)"}).appendTo(v)
    }
    var n = 0;
    this.sliderRun = function (y, z) {
      if (t.busy) {
        return false
      }
      q.effect = z || q.effect;
      t.currentSlide = y - 1;
      u(o, p, q, false);
      return true
    };
    var l = function () {
      if (q.onEffectEnd) {
        q.onEffectEnd(t.currentSlide)
      }
      m.hide();
      b(".wow-slice", m).css({transition: "", transform: ""});
      t.busy = 0
    };
    var u = function (y, z, C, E) {
      var F = y.data("wow:vars");
      if ((!F || F.stop) && !E) {
        return false
      }
      F.busy = 1;
      F.currentSlide++;
      if (F.currentSlide == F.totalSlides) {
        F.currentSlide = 0
      }
      if (F.currentSlide < 0) {
        F.currentSlide = (F.totalSlides - 1)
      }
      F.currentImage = b(z[F.currentSlide]);
      if (!F.currentImage.is("img")) {
        F.currentImage = F.currentImage.find("img:first")
      }
      var A = b(h[F.currentSlide]);
      A = {width: A.width(), heiht: A.height(), marginTop: A.css("marginTop"), marginLeft: A.css("marginLeft")};
      b(".wow-slice", m).each(function (J) {
        var L = b(this), I = b("img", L);
        var K = Math.round(m.width() / C.slices);
        I.width(m.width());
        I.attr("src", F.currentImage.attr("src"));
        I.css({left: -K * J + "px"}).css(A);
        L.css({height: "100%", opacity: 0, left: K * J, width: ((J == C.slices - 1) ? (m.width() - (K * J)) : K)})
      });
      m.show();
      if (C.effect == "random") {
        var G = new Array("sliceDownRight", "sliceDownLeft", "sliceUpRight", "sliceUpLeft", "sliceUpDownRight", "sliceUpDownLeft", "fold", "fade");
        F.randAnim = G[Math.floor(Math.random() * (G.length + 1))];
        if (F.randAnim == undefined) {
          F.randAnim = "fade"
        }
      }
      if (C.effect.indexOf(",") != -1) {
        var G = C.effect.split(",");
        F.randAnim = b.trim(G[Math.floor(Math.random() * G.length)])
      }
      if (C.effect == "sliceDown" || C.effect == "sliceDownRight" || F.randAnim == "sliceDownRight" || C.effect == "sliceDownLeft" || F.randAnim == "sliceDownLeft") {
        var B = 0;
        var H = b(".wow-slice", m);
        if (C.effect == "sliceDownLeft" || F.randAnim == "sliceDownLeft") {
          H = H._reverse()
        }
        H.each(function (I) {
          g(b(this), {top: "-100%", opacity: 0}, {
            top: "0%",
            opacity: 1
          }, C.animSpeed, 100 + B, (I == C.slices - 1) ? l : 0);
          B += 50
        })
      } else {
        if (C.effect == "sliceUp" || C.effect == "sliceUpRight" || F.randAnim == "sliceUpRight" || C.effect == "sliceUpLeft" || F.randAnim == "sliceUpLeft") {
          var B = 0;
          var H = b(".wow-slice", m);
          if (C.effect == "sliceUpLeft" || F.randAnim == "sliceUpLeft") {
            H = H._reverse()
          }
          H.each(function (I) {
            g(b(this), {top: "100%", opacity: 0}, {
              top: "0%",
              opacity: 1
            }, C.animSpeed, 100 + B, (I == C.slices - 1) ? l : 0);
            B += 50
          })
        } else {
          if (C.effect == "sliceUpDown" || C.effect == "sliceUpDownRight" || F.randAnim == "sliceUpDownRight" || C.effect == "sliceUpDownLeft" || F.randAnim == "sliceUpDownLeft") {
            var B = 0;
            var H = b(".wow-slice", m);
            if (C.effect == "sliceUpDownLeft" || F.randAnim == "sliceUpDownLeft") {
              H = H._reverse()
            }
            H.each(function (I) {
              g(b(this), {top: ((I % 2) ? "-" : "") + "100%", opacity: 0}, {
                top: "0%",
                opacity: 1
              }, C.animSpeed, 100 + B, (I == C.slices - 1) ? l : 0);
              B += 50
            })
          } else {
            if (C.effect == "fold" || F.randAnim == "fold") {
              var B = 0;
              var H = b(".wow-slice", m);
              var D = H.width();
              H.each(function (I) {
                g(b(this), {width: 0, opacity: 0}, {
                  width: D,
                  opacity: 1
                }, C.animSpeed, 100 + B, (I == C.slices - 1) ? l : 0);
                B += 50
              })
            } else {
              if (C.effect == "fade" || F.randAnim == "fade") {
                var H = b(".wow-slice", m);
                b(".wow-slice", m).each(function (I) {
                  b(this).css("height", "100%");
                  b(this).animate({opacity: "1.0"}, (C.animSpeed * 2), (I == C.slices - 1) ? l : 0)
                })
              }
            }
          }
        }
      }
    }
  };
  b.fn._reverse = [].reverse;
  var a = b("li", i);
  var c = b("ul", i);
  var d = b("<div>").addClass("ws_effect ws_slices").css({
    left: 0,
    top: 0,
    "z-index": 8,
    overflow: "hidden",
    width: "100%",
    height: "100%",
    position: "absolute"
  }).appendTo(i);
  var j = new e(c, {
    keyboardNav: false,
    caption: 0,
    effect: "sliceDownRight,sliceDownLeft,sliceUpRight,sliceUpLeft,sliceUpDownRight,sliceUpDownLeft,sliceUpDownRight,sliceUpDownLeft,fold,fold,fold",
    animSpeed: k.duration,
    startSlide: k.startSlide,
    container: d,
    onEffectEnd: function (l) {
      f.trigger("effectEnd")
    }
  });
  this.go = function (m, l) {
    var n = j.sliderRun(m);
    if (k.fadeOut) {
      c.fadeOut(k.duration)
    }
  }
};

function ws_blast(q, j, m) {
  var e = jQuery;
  var i = e(this);
  var f = m.find(".ws_list");
  var a = q.distance || 1;
  var g = e("<div>").addClass("ws_effect ws_blast");
  var c = e("<div>").addClass("ws_zoom").appendTo(g);
  var k = e("<div>").addClass("ws_parts").appendTo(g);
  m.css({overflow: "visible"}).append(g);
  g.css({position: "absolute", left: 0, top: 0, width: "100%", height: "100%", "z-index": 8});
  var d = q.cols;
  var p = q.rows;
  var l = [];
  var b = [];

  function h(u, r, s, t) {
    if (q.support.transform && q.support.transition) {
      if (typeof r.left === "number" || typeof r.top === "number") {
        r.transform = "translate3d(" + (typeof r.left === "number" ? r.left : 0) + "px," + (typeof r.top === "number" ? r.top : 0) + "px,0)"
      }
      delete r.left;
      delete r.top;
      if (s) {
        r.transition = "all " + s + "ms ease-in-out"
      } else {
        r.transition = ""
      }
      u.css(r);
      if (t) {
        u.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
          t();
          u.off("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd")
        })
      }
    } else {
      delete r.transfrom;
      delete r.transition;
      if (s) {
        u.animate(r, {queue: false, duration: q.duration, complete: t ? t : 0})
      } else {
        u.stop(1).css(r)
      }
    }
  }

  function n(r) {
    var w = Math.max((q.width || g.width()) / (q.height || g.height()) || 3, 3);
    d = d || Math.round(w < 1 ? 3 : 3 * w);
    p = p || Math.round(w < 1 ? 3 / w : 3);
    for (var u = 0; u < d * p; u++) {
      var v = u % d;
      var t = Math.floor(u / d);
      e([b[u] = document.createElement("div"), l[u] = document.createElement("div")]).css({
        position: "absolute",
        overflow: "hidden"
      }).appendTo(k).append(e("<img>").css({position: "absolute"}))
    }
    l = e(l);
    b = e(b);
    o(l, r);
    o(b, r, true);
    var s = {position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "hidden"};
    c.css(s).append(e("<img>").css(s))
  }

  function o(t, u, s, r, w, z) {
    var v = g.width();
    var x = g.height();
    var y = {
      left: e(window).scrollLeft(),
      top: e(window).scrollTop(),
      width: e(window).width(),
      height: e(window).height()
    };
    e(t).each(function (F) {
      var E = F % d;
      var C = Math.floor(F / d);
      if (s) {
        var I = a * v * (2 * Math.random() - 1) + v / 2;
        var G = a * x * (2 * Math.random() - 1) + x / 2;
        var H = g.offset();
        H.left += I;
        H.top += G;
        if (H.left < y.left) {
          I -= H.left + y.left
        }
        if (H.top < y.top) {
          G -= H.top + y.top
        }
        var D = (y.left + y.width) - H.left - v / d;
        if (0 > D) {
          I += D
        }
        var B = (y.top + y.height) - H.top - x / p;
        if (0 > B) {
          G += B
        }
      } else {
        var I = v * E / d;
        var G = x * C / p
      }
      e(this).find("img").css({
        left: -(v * E / d) + u.marginLeft,
        top: -(x * C / p) + u.marginTop,
        width: u.width,
        height: u.height
      });
      var A = {left: I, top: G, width: v / d, height: x / p};
      if (w) {
        e.extend(A, w)
      }
      if (r) {
        h(e(this), A, q.duration, (F === 0 && z) ? z : 0)
      } else {
        h(e(this), A)
      }
    })
  }

  this.go = function (s, u) {
    var v = e(j[u]), r = {
      width: v.width(),
      height: v.height(),
      marginTop: parseFloat(v.css("marginTop")),
      marginLeft: parseFloat(v.css("marginLeft"))
    };
    if (!l.length) {
      n(r)
    }
    l.find("img").attr("src", j.get(u).src);
    h(l, {opacity: 1, zIndex: 3});
    b.find("img").attr("src", j.get(s).src);
    h(b, {opacity: 0, zIndex: 2});
    c.find("img").attr("src", j.get(u).src);
    h(c.find("img"), {transform: "scale(1)"});
    g.show();
    f.hide();
    o(b, r, false, true, {opacity: 1});
    o(l, r, true, true, {opacity: 0}, function () {
      i.trigger("effectEnd");
      g.hide()
    });
    h(c.find("img"), {transform: "scale(2)"}, q.duration, 0);
    var t = b;
    b = l;
    l = t
  }
}

// 基本配置
// 时间单位 为 s
// 动画性能最差的 seven
jQuery("#wowslider-container").wowSlider({
  // effect: "louvers,glass_parallax,brick,seven,book,slices,blast",
  // effect: 'seven',
  effect: "louvers,glass_parallax,brick,book,slices,blast",
  prev: "",
  next: "",
  // 2s 内完成卡顿情况会更严重一些
  duration: 1 * 1000,
  delay: 5 * 1000,
  width: 1280,
  height: 720,
  autoPlay: true,
  autoPlayVideo: false,
  playPause: true,
  stopOnHover: false,
  loop: false,
  bullets: 1,
  caption: true,
  captionEffect: "parallax",
  controls: true,
  controlsThumb: false,
  responsive: 3,
  fullScreen: false,
  gestures: 2,
  onBeforeStep: 0,
  images: 0
});
