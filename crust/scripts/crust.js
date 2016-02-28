!function(a) {
  var b = {};
  b.isFirefoxOrIE = (typeof InstallTrigger !== 'undefined') || ( /*@cc_on!@*/ false || !!document.documentMode);
  b.version = "6.0.0", b.PI = Math.PI, b.A90 = Math.PI / 2, b.isTouch = !1, b.corners = {
    backward: ["bl", "tl", "l"],
    forward: ["br", "tr", "r"],
    all: ["tl", "bl", "tr", "br", "l", "r"]
  }, b.DISPLAY_SINGLE = 1, b.DISPLAY_DOUBLE = 2, b.DIRECTION_LTR = 1, b.DIRECTION_RTL = 2, b.EVENT_PREVENTED = 1, b.EVENT_STOPPED = 2, b.fragStatus = {
    assigned: 0,
    requested: 1,
    waiting: 2,
    nsplit: 6,
    fetched: 3,
    splitted: 4,
    full: 5
  }, b.getVendorPrefix = function() {
    for (var a = ["Moz", "Webkit", "Khtml", "O", "ms"], b = a.length, c = ""; b--;) a[b] + "Transform" in document.body.style && (c = "-" + a[b].toLowerCase() + "-");
    return c;
  }, b.addCssWithPrefix = function(a) {
    var b = this.vendor || this.getVendorPrefix(),
      c = {};
    for (var d in a) this.has(d, a) && (c[d.replace("@", b)] = a[d].replace("@", b));
    return c;
  }, b.transitionEnd = function(a, b) {
    var c, d, e = document.createElement("fakeelement"),
      f = {
        transition: "transitionend",
        OTransition: "oTransitionEnd",
        MSTransition: "transitionend",
        MozTransition: "transitionend",
        WebkitTransition: "webkitTransitionEnd"
      };
    for (c in f)
      if (void 0 !== e.style[c]) {
        d = f[c];
        break;
      }
    return a && (d ? a.bind(d, function() {
      a.unbind(d), b.call(a);
    }) : window.setTimeout(function() {
      b.call(a);
    }, Math.ceil(1e3 * parseFloat(a.css(getVendorPrefix() + "transition-duration"))))), d;
  }, b.findPos = function(a) {
    var b = {
      top: 0,
      left: 0
    };
    do b.left += a.offsetLeft, b.top += a.offsetTop; while (a = a.offsetParent);
    return b;
  }, b.offsetWhile = function(a, b) {
    var c = {
      top: 0,
      left: 0
    };
    do {
      if (!b(a, c)) break;
      c.left += a.offsetLeft, c.top += a.offsetTop;
    } while (a = a.offsetParent);
    return c;
  }, b.getSelectedText = function() {
    return window.getSelection ? window.getSelection().toString() : document.selection.createRange ? document.selection.createRange().text : void 0;
  }, b.bezier = function(a, b, c) {
    var d = 1 - b,
      e = d * d * d,
      f = b * b * b;
    return this.peelingPoint(c, Math.round(e * a[0].x + 3 * b * d * d * a[1].x + 3 * b * b * d * a[2].x + f * a[3].x), Math.round(e * a[0].y + 3 * b * d * d * a[1].y + 3 * b * b * d * a[2].y + f * a[3].y));
  }, b.layerCSS = function(a, b, c, d) {
    return {
      css: {
        position: "absolute",
        top: a,
        left: b,
        overflow: d || "hidden",
        "z-index": c || "auto"
      }
    };
  }, b.rad = function(a) {
    return a / 180 * p;
  }, b.deg = function(a) {
    return 180 * (a / p);
  }, b.peelingPoint = function(a, b, c) {
    return {
      corner: a,
      x: b,
      y: c
    };
  }, b.transformUnit = function(a, b) {
    var c;
    return "string" == typeof a && (c = /^(\d+)(px|%)$/.exec(a)) ? "px" == c[2] ? parseInt(c[1], 10) : "%" == c[2] ? parseInt(c[1], 10) / 100 * b : void 0 : a;
  }, b.point2D = function(a, b) {
    return {
      x: a,
      y: b
    };
  }, b.translate = function(a, b, c) {
    return this.has3d && c ? " translate3d(" + a + "px," + b + "px, 0px) " : " translate(" + a + "px, " + b + "px) ";
  }, b.scale = function(a, b, c) {
    return this.has3d && c ? " scale3d(" + a + "," + b + ", 1) " : " scale(" + a + ", " + b + ") ";
  }, b.rotate = function(a) {
    return " rotate(" + a + "deg) ";
  }, b.has = function(a, b) {
    return Object.prototype.hasOwnProperty.call(b, a);
  }, b.rotationAvailable = function() {
    var a;
    if (a = /AppleWebkit\/([0-9\.]+)/i.exec(navigator.userAgent)) {
      var b = parseFloat(a[1]);
      return b > 534.3;
    }
    return !0;
  }, b.css3dAvailable = function() {
    return "WebKitCSSMatrix" in window || "MozPerspective" in document.body.style;
  }, b.getTransitionEnd = function(a, b) {
    var c, d, e = document.createElement("fakeelement"),
      f = {
        transition: "transitionend",
        OTransition: "oTransitionEnd",
        MSTransition: "transitionend",
        MozTransition: "transitionend",
        WebkitTransition: "webkitTransitionEnd"
      };
    for (c in f)
      if (void 0 !== e.style[c]) {
        d = f[c];
        break;
      }
    return a && (d ? a.bind(d, function() {
      a.unbind(d), b.call(a);
    }) : setTimeout(function() {
      b.call(a);
    }, Math.ceil(1e3 * parseFloat(a.css(getVendorPrefix() + "transition-duration"))))), d;
  }, b.makeGradient = function(a) {
    var b;
    return "-webkit-" == this.vendor ? a ? (b = "-webkit-gradient(linear, left top, right top,", b += "color-stop(0, rgba(0,0,0,0)),", b += "color-stop(0.3, rgba(0,0,0, 0.3)),", b += "color-stop(0.5, rgba(0,0,0, 0.8))", b += ")") : (b = "-webkit-gradient(linear, left top, right top,", b += "color-stop(0, rgba(0,0,0,0)),", b += "color-stop(0.2, rgba(0,0,0,0.5)),", b += "color-stop(0.2, rgba(0,0,0,0.6)),", b += "color-stop(0.4, rgba(0,0,0,0.2)),", b += "color-stop(1, rgba(0,0,0,0))", b += ")") : (b = this.vendor + "linear-gradient(left, ", a ? (b += "rgba(0,0,0,0) 0%,", b += "rgba(0,0,0,0.3) 30%,", b += "rgba(0,0,0,0.8) 50%") : (b += "rgba(0,0,0,0) 0%,", b += "rgba(0,0,0,0.2) 20%,", b += "rgba(0,0,0,0.6) 20%,", b += "rgba(0,0,0,0.2) 40%,", b += "rgba(0,0,0,0) 100%"), b += ")"), b;
  }, b.gradient = function(a, b, c, d, e) {
    var f, g = [];
    if ("-webkit-" == this.vendor) {
      for (f = 0; e > f; f++) g.push("color-stop(" + d[f][0] + ", " + d[f][1] + ")");
      a.css({
        "background-image": "-webkit-gradient(linear, " + b.x + "% " + b.y + "%," + c.x + "% " + c.y + "%, " + g.join(",") + " )"
      });
    }
  }, b.trigger = function(c, d, e) {
    var f = a.Event(c);
    return d.trigger(f, e), f.isDefaultPrevented() ? b.EVENT_PREVENTED : f.isPropagationStopped() ? b.EVENT_STOPPED : "";
  }, b.error = function(a) {
    function b(a) {
      this.name = "TurnError", this.message = a;
    }
    return TurnJsError.prototype = new Error, TurnJsError.prototype.constructor = b, new b(a);
  }, b.getListeners = function(b, c, d) {
    var e = a._data(b[0]).events,
      f = [];
    if (e) {
      var g = e[c];
      g && (a.each(g, function(a, b) {
        f.push(b);
      }), d && b.unbind(c));
    }
    return f;
  }, b.setListeners = function(a, b, c) {
    if (c)
      for (var d = 0; d < c.length; d++) a.on(b, c[d].selector, c[d].handler);
  }, b.cleanSelection = function() {
    window.getSelection().empty ? window.getSelection().empty() : window.getSelection().removeAllRanges ? window.getSelection().removeAllRanges() : document.selection && document.selection.empty();
  }, b.hasHardPage = function() {
    return -1 == navigator.userAgent.indexOf("MSIE 9.0");
  }, b.UIComponent = function(c) {
    var d = function(b, c) {
      this._data = {}, this._hashKey = c, this.$el = a(b);
    };
    return d.prototype = {
      _init: c,
      _bind: function(a) {
        return d.prototype[a].apply(this, Array.prototype.slice.call(arguments, 1));
      },
      _trigger: function(a) {
        return b.trigger(a, this.$el, Array.prototype.slice.call(arguments, 1));
      },
      _destroy: function() {
        var a = this.$el.data();
        delete a[this._hashKey];
      }
    }, d;
  }, b.widgetInterface = function(c, d, e) {
    var f = a.data(this, d);
    return f ? f._bind.apply(f, e) : (b.oneTimeInit(), f = new c(this, d), a.data(this, d, f), f._init.apply(f, e));
  }, b.widgetFactory = function(c, d) {
    var e = "turn." + c;
    a.fn[c] = function() {
      if (1 == this.length) return b.widgetInterface.call(this[0], d, e, arguments);
      for (var a = 0; a < this.length; a++) b.widgetInterface.call(this[a], d, e, arguments);
      return this;
    };
  }, b.oneTimeInit = function() {
    this.vendor || (this.has3d = this.css3dAvailable(), this.hasRotation = this.rotationAvailable(), this.vendor = this.getVendorPrefix());
  }, b.calculateBounds = function(a) {
    var b = {
      width: a.width,
      height: a.height
    };
    if (b.width > a.boundWidth || b.height > a.boundHeight) {
      var c = b.width / b.height;
      a.boundWidth / c > a.boundHeight && a.boundHeight * c <= a.boundWidth ? (b.width = Math.round(a.boundHeight * c), b.height = a.boundHeight) : (b.width = a.boundWidth, b.height = Math.round(a.boundWidth / c));
    }
    return b;
  }, b.animate = function(b, c) {
    if (!c) return b.animation && b.animation.stop(), void 0;
    if (b.animation) {
      b.animation._time = (new Date()).getTime();
      for (var d = 0; d < b.animation._elements; d++) b.animation.from[d] = b.animation.current[d], b.animation.to[d] = c.to[d] - b.animation.from[d];
    } else {
      c.to.length || (c.to = [c.to]), c.from.length || (c.from = [c.from]);
      var e = !0;
      b.animation = a.extend({
        current: [],
        _elements: c.to.length,
        _time: (new Date()).getTime(),
        stop: function() {
          e = !1, b.animation = null;
        },
        easing: function(a, b, c, d) {
          return -c * ((a = a / d - 1) * a * a * a - 1) + b;
        },
        _frame: function() {
          for (var a = Math.min(this.duration, (new Date()).getTime() - this._time), c = 0; c < this._elements; c++) this.current[c] = this.easing(a, this.from[c], this.to[c], this.duration);
          e = !0, this.frame(this.current), a >= this.duration ? (this.stop(), this.completed && this.completed()) : window.requestAnimationFrame(function() {
            e && b.animation._frame();
          });
        }
      }, c);
      for (var f = 0; f < b.animation._elements; f++) b.animation.to[f] -= b.animation.from[f];
      b.animation._frame();
    }
  }, b.addDelegateList = function(a, c) {
    if (a)
      for (var d in a) b.has(d, a) && c.on(d, a[d]);
  }, b.getDeviceName = function() {
    var a = "",
      b = navigator.userAgent;
    return /ipad/i.test(b) ? a = "ipad" : /iphone/i.test(b) ? a = "iphone" : /ipod/i.test(b) ? a = "ipod" : /kindle/i.test("iPod") && (a = "kindle"), a;
  }, window.requestAnimationFrame || (window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
    window.setTimeout(a, 1e3 / 60);
  }), a.fn.transform = function(a, c) {
    var d = {};
    return c && (d[b.vendor + "transform-origin"] = c), d[b.vendor + "transform"] = a, this.css(d);
  }, b.toggleFullScreen = function() {
    if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement) {
        document.cancelFullScreen ? document.cancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen && document.webkitCancelFullScreen();
    } else {
      var a = document.documentElement;
      a.requestFullscreen ? a.requestFullscreen() : a.mozRequestFullScreen ? a.mozRequestFullScreen() : a.webkitRequestFullscreen && a.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  }, window.Turn = b;
  var c = a.isTouch || "ontouchstart" in window;
  b.eventPrefix = "", b.isTouchDevice = c, b.isInside = function(b, c) {
    if (c) {
      if (c == document.body || c == window) return !0;
      var d = a(c).offset();
      return d && b.x >= d.left && b.y >= d.top && b.x <= d.left + c.offsetWidth && b.y <= d.top + c.offsetHeight;
    }
  }, b.eventPoint = function(a) {
    var c = a.originalEvent,
      d = c.touches && c.touches[0],
      e = d ? b.point2D(c.touches[0].pageX, c.touches[0].pageY) : b.point2D(a.pageX, a.pageY);
    return e.time = a.timeStamp, e.target = a.target, e;
  }, b.Event = function(c, d) {
    c = this.eventPrefix + c;
    var e = !1,
      f = function(b, d) {
        this.el = b, this.$el = a(b), this.eventName = c, this._selector = d, this._data = {}, this._init();
      };
    return d._triggerVirtualEvent = function(a) {
      e != a.timeStamp && (e = a.timeStamp, this.$el.trigger(a));
    }, d._trigger = function(a) {
      var c = b.eventPoint(a),
        d = this.Event(a, {
          pageX: c.x,
          pageY: c.y
        });
      this._triggerVirtualEvent(d);
    }, d.Event = function(b, c) {
      c = c || {}, c.type = this.eventName, c.target = b.target, c.toElement = b.toElement, c.currentTarget = b.currentTarget, c.delegateTarget = b.delegateTarget, c.pageX = c.pageX || b.pageX, c.pageY = c.pageY || b.pageY;
      var d = a.Event(b, c);
      return d.type = this.eventName, d;
    }, f.eventName = c, f.prototype = d, f;
  }, b._registerEvent = function(b, c) {
    a.event.special[c] = {
      add: function(d) {
        var e = d.selector || "",
          f = "e." + c + e,
          g = a(this),
          h = g.data(f) || {
            listeners: 0
          };
        h.instance || (h.instance = new b(this, e)), h.listeners++, g.data(f, h);
      },
      remove: function(b) {
        var d = b.selector || "",
          e = "e." + c + d,
          f = a(this),
          g = f.data(e);
        g && g.listeners > 0 && (g.listeners--, 0 === g.listeners && (g.instance._remove(), delete g.instance));
      }
    };
  }, b._registerEvents = function(a) {
    for (var b = 0; b < a.length; b++) this._registerEvent(a[b], a[b].eventName);
  }
  var d = b.Event("tap", {
      _init: function() {
        c ? (this.$el.on("touchstart", this._selector, a.proxy(this, "_touchstart")), this.$el.on("touchmove", this._selector, a.proxy(this, "_touchmove")), this.$el.on("touchend", this._selector, a.proxy(this, "_touchend"))) : this.$el.on("click", this._selector, a.proxy(this, "_trigger"));
      },
      _remove: function() {
        c ? (this.$el.off("touchstart", this._selector, this._touchstart), this.$el.off("touchmove", this._selector, this._touchmove), this.$el.off("touchend", this._selector, this._touchend)) : this.$el.off("click", this._selector, this._trigger);
      },
      _touchstart: function(b) {
        this._data.startEvent = b, this._data.initScrollTop = a(window).scrollTop(), this._data.initScrollLeft = a(window).scrollLeft();
      },
      _touchmove: function(a) {
        this._data.startEvent = a;
      },
      _touchend: function() {
        if (this._data.startEvent) {
          var c = b.eventPoint(this._data.startEvent),
            d = a(window).scrollTop(),
            e = a(window).scrollLeft();
          if (b.isInside(c, this._data.startEvent.currentTarget || this.el) && this._data.initScrollTop == d && this._data.initScrollLeft == e) {
            var f = this,
              g = this._data.startEvent;
            setTimeout(function() {
              f._trigger(g);
            }, 0);
          }
          this._data.startEvent = null;
        }
      }
    }),
    e = b.Event("doubletap", {
      _init: function() {
        this._data.queue = [0, 0], this.$el.on("tap", this._selector, a.proxy(this, "_tap"));
      },
      _remove: function() {
        this.$el.off("tap", this._selector, this._tap);
      },
      _tap: function(a) {
        var c = this._data.queue;
        if (c.shift(), c.push(a.timeStamp), c[1] - c[0] < 300) {
          var d = a.originalEvent,
            e = b.eventPoint(d);
          this._triggerVirtualEvent(this.Event(d, {
            pageX: e.x,
            pageY: e.y
          }));
        }
      }
    }),
    f = b.Event("vmouseover", {
      _init: function() {
        c ? this.$el.on("touchstart", this._selector, a.proxy(this, "_trigger")) : this.$el.on("mouseover", this._selector, a.proxy(this, "_trigger"));
      },
      _remove: function() {
        c ? this.$el.off("touchstart", this._selector, this._trigger) : this.$el.off("mouseover", this._selector, this._trigger);
      }
    }),
    g = b.Event("vmouseout", {
      _init: function() {
        c ? this.$el.on("touchend", this._selector, a.proxy(this, "_trigger")) : this.$el.on("mouseout", this._selector, a.proxy(this, "_trigger"));
      },
      _remove: function() {
        c ? this.$el.off("touchend", this._selector, this._trigger) : this.$el.off("mouseout", this._selector, this._trigger);
      }
    }),
    h = b.Event("vmousedown", {
      _init: function() {
        c ? this.$el.on("touchstart", this._selector, a.proxy(this, "_trigger")) : this.$el.on("mousedown", this._selector, a.proxy(this, "_trigger"));
      },
      _remove: function() {
        c ? this.$el.off("touchstart", this._selector, this._trigger) : this.$el.off("mousedown", this._selector, this._trigger);
      }
    }),
    i = b.Event("vmouseup", {
      _init: function() {
        c ? this.$el.on("touchend", this._selector, a.proxy(this, "_trigger")) : this.$el.on("mouseup", this._selector, a.proxy(this, "_trigger"));
      },
      _remove: function() {
        c ? this.$el.off("touchend", this._selector, this._trigger) : this.$el.off("mouseup", this._selector, this._trigger);
      }
    }),
    j = b.Event("vmousemove", {
      _init: function() {
        c ? this.$el.on("touchmove", this._selector, a.proxy(this, "_trigger")) : this.$el.on("mousemove", this._selector, a.proxy(this, "_trigger"));
      },
      _remove: function() {
        c ? this.$el.off("touchmove", this._selector, this._trigger) : this.$el.off("mousemove", this._selector, this._trigger);
      }
    }),
    k = b.Event("swipe", {
      _init: function() {
        this.$el.on("vmousedown", this._selector, a.proxy(this, "_vmousedown"));
      },
      _remove: function() {
        this.$el.off("vmousedown", this._selector, this._vmousedown);
      },
      _vmousedown: function(c) {
        var d = this._data;
        d.firstEvent = b.eventPoint(c), d.currentEvent = d.firstEvent, d.prevEvent = d.firstEvent, a(document).on("vmousemove", a.proxy(this, "_vmousemove")), a(document).on("vmouseup", a.proxy(this, "_vmouseup"));
      },
      _vmousemove: function(a) {
        var c = this._data,
          d = c.currentEvent;
        c.currentEvent = b.eventPoint(a), c.prevEvent = d;
      },
      _vmouseup: function() {
        var b = this._data,
          c = b.prevEvent.x - b.currentEvent.x,
          d = b.prevEvent.time - b.currentEvent.time,
          e = c / d;
        if (-0.2 > e || e > 0.2) {
          var f = {};
          f.pageX = b.currentEvent.x, f.pageY = b.currentEvent.y, f.speed = e, this._triggerVirtualEvent(this.Event(b.firstEvent, f));
        }
        a(document).off("vmousemove", this._vmousemove), a(document).off("vmouseup", this._vmouseup);
      }
    }),
    l = b.Event("pinch", {
      _init: function() {
        this.$el.on("touchstart", this._selector, a.proxy(this, "_touchstart"))
      },
      _remove: function() {
        this.$el.off("touchstart", this._selector, this._touchstart)
      },
      _touchstart: function(c) {
        var d = this._data;
        d.firstEvent = b.eventPoint(c), d.pinch = null, a(document).on("touchmove", a.proxy(this, "_touchmove")), a(document).on("touchend", a.proxy(this, "_touchend"))
      },
      _touchmove: function(a) {
        var c = a.originalEvent.touches,
          d = this._data;
        if (2 == c.length) {
          var e = {},
            f = c[1].pageX - c[0].pageX,
            g = c[1].pageY - c[0].pageY,
            h = b.point2D(c[1].pageX / 2 + c[0].pageX / 2, c[1].pageY / 2 + c[0].pageY / 2),
            i = Math.sqrt(f * f + g * g);
          d.pinch || (d.pinch = {
            initDistance: i,
            prevDistance: i,
            prevMidpoint: h
          }), e.pageX = h.x, e.pageY = h.y, e.dx = h.x - d.pinch.prevMidpoint.x, e.dy = h.y - d.pinch.prevMidpoint.y, e.factor = i / d.pinch.initDistance, e.dfactor = i / d.pinch.prevDistance, d.pinch.prevDistance = i, d.pinch.prevMidpoint = h, this._triggerVirtualEvent(this.Event(d.firstEvent, e))
        }
      },
      _touchend: function() {
        a(document).off("touchmove", this._touchmove), a(document).off("touchend", this._touchend)
      }
    });
  b._registerEvents([d, e, k, l, f, g, h, j, i]);
  var m = {
      acceleration: !0,
      animatedAutoCenter: !1,
      autoCenter: !0,
      autoScroll: !0,
      autoScaleContent: !1,
      fragments: 0,
      hoverAreaSize: 50,
      cornerPosition: "50px 20px",
      margin: "0px 0px",
      display: "double",
      duration: 600,
      easing: function(a, b, c, d) {
        var e = (a /= d) * a,
          f = e * a;
        return b + c * (-1.95 * f * e + 7.8 * e * e + -10.7 * f + 4.8 * e + 1.05 * a)
      },
      elevation: "10%",
      hover: !0,
      ignoreElements: "[ignore=1]",
      page: 1,
      pageMargin: "0px 0px",
      smartFlip: !1,
      swipe: !0,
      responsive: !1,
      gradients: !0,
      turnCorners: "l,r",
      events: null,
      showDoublePage: !1,
      zoomAnimationDuration: 1e4
    },
    n = b.UIComponent(function(d) {
      var e = this._data,
        f = this.$el.children(),
        g = 0;
      d = a.extend({
        width: d.pageWidth ? 2 * d.pageWidth : this.$el.width(),
        height: d.pageHeight ? d.pageHeight : this.$el.height(),
        direction: this.$el.attr("dir") || this.$el.css("direction") || "ltr",
        viewer: this.$el.parent(),
        cacheSize: d && d.blocks ? 8 : 6
      }, m, d);
      var h = d.cornerPosition.split(" ");
      if (d.cornerPosition = b.point2D(parseInt(h[0], 10), parseInt(h[1], 10)), e.options = d, e.dynamicMode = !1, e.turningPage = !1, e.watchSizeChange = !0, e.pageObjs = {}, e.pageBlocks = {}, e.pages = {}, e.pageWrap = {}, e.blocks = {}, e.pageMv = [], e.front = [], e.scroll = {
          left: 0,
          top: 0
        }, e.margin = [0, 0, 0, 0], e.pageMargin = [0, 0, 0, 0], e.zoom = 1, e.totalPages = d.pages || 0, d.when && (d.delegate = d.when), d.delegate)
        for (var i in d.delegate) b.has(i, d.delegate) && ("tap" == i || "doubletap" == i ? this.$el.on(i, ".page", d.delegate[i]) : this.$el.on(i, d.delegate[i]));
      this.$el.css({
        position: "relative",
        width: d.width,
        height: d.height
      }), c ? this.$el.addClass("touch-device") : this.$el.addClass("no-touch-device"), this.display(d.display), "" !== d.direction && this.direction(d.direction);
      for (var j = 0; j < f.length; j++) a(f[j]).is(d.ignoreElements) || this.addPage(f[j], ++g);
      return d.pages = e.totalPages, e.dynamicMode = 0 === g, d.swipe && this.$el.on("swipe", a.proxy(this, "_eventSwipe")), this.$el.parent().on("start", a.proxy(this, "_eventStart")), this.$el.on("vmousedown", a.proxy(this, "_eventPress")).on("vmouseover", a.proxy(this, "_eventHover")).on("vmouseout", a.proxy(this, "_eventNoHover")), this._resizeObserver(), "number" != typeof d.page || isNaN(d.page) || d.page < 1 || d.page > e.totalPages ? this.page(1) : this.page(d.page), d.animatedAutoCenter && this.$el.css(b.addCssWithPrefix({
        "@transition": "margin-left " + d.duration + "ms"
      })), e.done = !0, this.$el
    });
  b.directions;
  var o = b.A90,
    p = b.PI,
    q = b.UIComponent(function(a, b) {
      return a = a || {}, a.disabled = !1, a.hover = !1, a.turn = b, a.turnData = b._data, a.effect = this.$el.hasClass("hard") || this.$el.hasClass("cover") ? "hard" : "sheet", this.$el.data("f", a), this._addPageWrapper(), a.turnData.disabled && this.disable(), this.$el
    });
  q.prototype._cornerAllowed = function() {
    var a = this.$el.data("f"),
      c = a.page,
      d = a.turnData,
      e = c % 2;
    switch (a.effect) {
      case "hard":
        var f = d.direction == b.DIRECTION_LTR;
        return f ? [e ? "r" : "l"] : [e ? "l" : "r"];
      case "sheet":
        if (d.display == b.DISPLAY_SINGLE) return 1 == c ? b.corners.forward : c == d.totalPages ? b.corners.backward : "tapping" == a.status ? b.corners.all : b.corners.forward;
        if (d.display == b.DISPLAY_DOUBLE) return d.options.showDoublePage ? b.corners[e ? "backward" : "forward"] : b.corners[e ? "forward" : "backward"]
    }
  }, q.prototype._cornerActivated = function(c) {
    var d = this.$el.width(),
      e = this.$el.height(),
      f = b.peelingPoint("", c.x, c.y);
    if (f.x <= 0 || f.y <= 0 || f.x >= d || f.y >= e) return !1;
    var g = this.$el.data("f"),
      h = g.turnData;
    if (g.dpoint) {
      var i = h.options.cornerPosition,
        j = this._startPoint(g.dpoint.corner, a.extend({}, f));
      if (i = Math.max(i.x, i.y), j.x <= i && j.y <= i) return f.corner = g.dpoint.corner, f
    }
    var k = h.options.hoverAreaSize,
      l = this._cornerAllowed();
    switch (g.effect) {
      case "hard":
        if (f.x > d - k) f.corner = "r";
        else {
          if (!(f.x < k)) return !1;
          f.corner = "l"
        }
        break;
      case "sheet":
        f.y < k ? f.corner += "t" : f.y >= e - k && (f.corner += "b"), f.x <= k ? f.corner += "l" : f.x >= d - k && (f.corner += "r")
    }
    return f.corner && -1 != a.inArray(f.corner, l) ? f : !1
  }, q.prototype._isIArea = function(a) {
    var c = b.eventPoint(a),
      d = this.$el.data("f"),
      e = (d.clip || d.ipage).parent().offset();
    return this._cornerActivated(b.point2D(c.x - e.left, c.y - e.top))
  }, q.prototype._startPoint = function(a, c) {
    var d;
    switch (c = c || b.point2D(0, 0), a) {
      case "tr":
        c.x = this.$el.width() - c.x;
        break;
      case "bl":
        c.y = this.$el.height() - c.y;
        break;
      case "br":
        c.x = this.$el.width() - c.x, c.y = this.$el.height() - c.y;
        break;
      case "l":
        d = this.$el.data("f"), d.startPoint && (c.y = d.startPoint.y);
        break;
      case "r":
        c.x = this.$el.width() - c.x, d = this.$el.data("f"), d.startPoint && (c.y = d.startPoint.y)
    }
    return c
  }, q.prototype._endPoint = function(a, c) {
    var d;
    switch (c = c || b.point2D(0, 0), a) {
      case "tl":
        c.x = 2 * this.$el.width() - c.x;
        break;
      case "tr":
        c.x = -this.$el.width() + c.x;
        break;
      case "bl":
        c.x = 2 * this.$el.width() - c.x, c.y = this.$el.height() - c.y;
        break;
      case "br":
        c.x = -this.$el.width() + c.x, c.y = this.$el.height() - c.y;
        break;
      case "l":
        c.x = 2 * this.$el.width() - c.x, d = this.$el.data("f"), d.startPoint && (c.y = d.startPoint.y);
        break;
      case "r":
        c.x = -this.$el.width() - c.x, d = this.$el.data("f"), d.startPoint && (c.y = d.startPoint.y)
    }
    return c
  }, q.prototype._foldingPage = function(a) {
    var c = this.$el.data("f");
    if (c) {
      var d = c.turnData;
      return a = a || "pageObjs", d.display == b.DISPLAY_SINGLE ? d[a][0] : c.over ? d[a][c.over] : d[a][c.next]
    }
    return !1
  }, q.prototype.resize = function(a, b) {
    var c = this.$el.data("f");
    switch (a = a || this.$el.width(), b = b || this.$el.height(), c.effect) {
      case "hard":
        c.ipage.css({
          width: a,
          height: b
        }), c.igradient.css({
          width: a,
          height: b
        }), c.ogradient.css({
          width: a,
          height: b
        });
        break;
      case "sheet":
        var d = Math.round(Math.sqrt(a * a + b * b));
        c.clip.css({
          width: d,
          height: d
        }), c.ipage.css({
          width: a,
          height: b
        }), c.igradient.css({
          width: 100,
          height: 2 * b,
          top: -b / 2
        }), c.ogradient.css({
          width: 100,
          height: 2 * b,
          top: -b / 2
        })
    }
    return this.$el
  }, q.prototype._addPageWrapper = function() {
    var c = this.$el.data("f");
    c.turnData;
    var d, e = this.$el.parent(),
      f = a("<div />", {
        "class": "inner-page"
      }),
      g = a("<div />", {
        "class": "inner-gradient"
      }),
      h = a("<div />", {
        "class": "outer-gradient"
      });
    switch (c.effect) {
      case "hard":
        d = b.layerCSS(0, 0, 2).css, d[b.vendor + "transform-style"] = "preserve-3d", d[b.vendor + "backface-visibility"] = "hidden", f.css(d).appendTo(e).prepend(this.$el), g.css(b.layerCSS(0, 0, 0).css).appendTo(f), h.css(b.layerCSS(0, 0, 0)), c.ipage = f, c.igradient = g, c.ogradient = h;
        break;
      case "sheet":
        var i = a("<div />", {
          "class": "clip"
        });
        d = b.layerCSS(0, 0, 0).css, i.css(d), f.css(a.extend({
          cursor: "default"
        }, d)), d.zIndex = 1, g.css({
          background: b.makeGradient(!0),
          display: (b.isFirefoxOrIE ? '' : "none"),
          visibility: "hidden",
          position: "absolute",
          "z-index": 2
        }), h.css({
          background: b.makeGradient(!1),
          visibility: "hidden",
          position: "absolute",
          "z-index": 2
        }), g.appendTo(f), f.appendTo(i).prepend(this.$el), h.appendTo(e), i.appendTo(e), c.clip = i, c.ipage = f, c.igradient = g, c.ogradient = h
    }
    this.resize()
  }, q.prototype._fold = function(a) {
    var c = this.$el.data("f");
    if (c.dpoint && c.dpoint.corner == a.corner && c.dpoint.x == a.x && c.dpoint.y == a.y) return !1;
    switch (c.effect) {
      case "hard":
        this._hard(a);
        break;
      case "sheet":
        this._pageCURL(a)
    }
    return c.dpoint = b.peelingPoint(a.corner, a.x, a.y), !0
  }, q.prototype._bringClipToFront = function(a) {
    var c = this.$el.data("f");
    if (c) {
      var d = c.turnData,
        e = d.display == b.DISPLAY_SINGLE;
      if (a) {
        var f = e ? 0 : c.next;
        if (c.over && c.over != f && this._bringClipToFront(!1), "hard" == c.effect) c.igradient.show();
        else if ("sheet" == c.effect) {
          var g = d.pageWrap[f],
            h = d.pages[f].data("f"),
            i = g.width(),
            j = g.height();
          if (g.css({
              overflow: "visible",
              "pointer-events": "none",
              zIndex: 3 + d.front.length
            }), h.ipage.css({
              overflow: "hidden",
              position: "absolute",
              width: i,
              height: j
            }), h.igradient.show().css({
              visibility: "visible"
            }), c.ipage.css({
              "z-index": 1
            }), c.ogradient.show().css({
              zIndex: 2,
              visibility: "visible"
            }), e && h.tPage != c.page) {
            d.pageObjs[0].find("*").remove();
            var k = d.pageObjs[c.page].clone(!1).css({
              opacity: "0.2",
              overflow: "hidden"
            }).transform("rotateY(180deg)", "50% 50%");
            k.appendTo(d.pageObjs[0]), h.tPage = c.page
          }
        }
        c.over = f
      } else if (c.over) {
        var l = d.pageWrap[c.over];
        l && l.css({
          overflow: "hidden",
          display: (b.isFirefoxOrIE ? '' : 'none'),
          visibility: (b.isFirefoxOrIE ? 'hidden' : ''),
          "pointer-events": "",
          zIndex: 0
        }), this._restoreClip(!0), delete c.over
      }
    }
  }, q.prototype._restoreClip = function(a, c) {
    var d, e = this.$el.data("f"),
      f = e.turnData,
      g = a ? b.translate(0, 0, f.options.acceleration) : "";
    c ? d = e : f.pages[e.over] && (d = f.pages[e.over].data("f")), d && (d.clip && d.clip.transform(g), d.ipage.transform(g).css({
      top: 0,
      left: 0,
      right: "auto",
      bottom: "auto"
    }), d.igradient.hide())
  }, q.prototype._setFoldedPagePosition = function(a, c) {
    var d = this.$el.data(),
      e = d.f,
      f = e.turnData;
    if (c) {
      var g, h = this,
        i = a.corner;
      g = e.point && e.point.corner == i ? e.point : this._startPoint(i, b.point2D(1, 1)), this._animate({
        from: [g.x, g.y],
        to: [a.x, a.y],
        duration: 500,
        easing: f.options.easing,
        frame: function(b) {
          a.x = Math.round(b[0]), a.y = Math.round(b[1]), a.corner = i, h._fold(a)
        }
      })
    } else this._fold(a), this.animation && !this.animation.turning && this._animate(!1)
  }, q.prototype._showFoldedPage = function(a, c) {
    var d = this.$el.data("f"),
      e = this._foldingPage();
    if (d && e) {
      var f = d.visible,
        g = a.corner,
        h = d.turn,
        i = d.turnData;
      if (!f || !d.point || d.point.corner != a.corner) {
        if (i.corner = g, this._trigger("start", d.page, i.tpage ? null : a.corner) == b.EVENT_PREVENTED) return !1;
        if (i.pages[d.next] && d.effect != i.pages[d.next].data("f").effect) return !1;
        if ("hard" == d.effect && "turning" == i.status)
          for (var j = 0; j < i.front.length; j++)
            if (!i.pages[i.front[j]].hasClass("hard")) {
              n.prototype.stop.call(h);
              break
            }
        f || (i.front.push(i.display == b.DISPLAY_SINGLE ? 0 : d.next), i.pageMv.push(d.page)), d.startPoint = d.startPoint || b.point2D(a.x, a.y), d.visible = !0, this._bringClipToFront(!0), n.prototype.update.call(h), i.options.blocks && n.prototype._fetchBlocks.call(h, Math.max(i.options.pages + 1, n.prototype.view.call(h, d.next)[0]), "hover")
      }
      return this._setFoldedPagePosition(a, c), !0
    }
    return !1
  }, q.prototype.hide = function() {
    var a = this.$el.data("f"),
      c = a.turnData,
      d = b.translate(0, 0, c.options.acceleration);
    switch (a.effect) {
      case "hard":
        var e = c.pages[a.over];
        a.ogradient.remove(), a.igradient.remove(), a.ipage.transform(d), e && e.data("f").ipage.transform(d);
        break;
      case "sheet":
        var f = c.pageWrap[a.over];
        f && f.css({
          overflow: "hidden",
          "pointer-events": ""
        }), a.ipage.css({
          left: 0,
          top: 0,
          right: "auto",
          bottom: "auto"
        }).transform(d), a.clip.transform(d), a.ogradient.css({
          visibility: "hidden"
        })
    }
    return a.visible && 0 === c.front.length && n.prototype._removeFromDOM.call(a.turn), a.status = "", a.visible = !1, delete a.point, delete a.dpoint, delete a.startPoint, this.$el
  }, q.prototype.hideFoldedPage = function(a) {
    var c = this.$el.data("f");
    if (c.dpoint) {
      var d = this,
        e = c.status,
        f = c.turnData,
        g = c.peel && c.peel.corner == c.dpoint.corner,
        h = function() {
          a && "move" == e && g ? c.status = "peel" : d._animationCompleted(c.page, !1)
        };
      if (a) {
        var i = [c.dpoint, 0, 0, 0];
        i[3] = g ? this._startPoint(i[0].corner, b.point2D(c.peel.x, c.peel.y)) : this._startPoint(i[0].corner, b.point2D(0, 1));
        var j = i[0].y - i[3].y;
        j = "tr" == i[0].corner || "tl" == i[0].corner ? Math.min(0, j) / 2 : Math.max(0, j) / 2, i[1] = b.point2D(i[0].x, i[0].y + j), i[2] = b.point2D(i[3].x, i[3].y - j), this._animate(!1), this._animate({
          from: 0,
          to: 1,
          frame: function(a) {
            d._fold(b.bezier(i, a, i[0].corner))
          },
          complete: h,
          easing: f.options.easing,
          duration: 800,
          hiding: !0
        })
      } else this._animate(!1), h()
    }
  }, q.prototype.turnPage = function(c) {
    var d, e, f = this.$el,
      g = f.data("f"),
      h = g.turnData,
      i = [0, 0, 0, 0];
    if (has3d = b.css3dAvailable(), h.display == b.DISPLAY_SINGLE && -1 == a.inArray(c, b.corners.forward)) {
      var j = h.pages[g.next],
        k = j.data("f"),
        l = k.peel,
        m = parseInt(h.pageWrap[g.page].css("z-index"), 10) || 0;
      e = k.dpoint ? k.dpoint.corner : c, d = b.peelingPoint(h.direction == b.DIRECTION_LTR ? e.replace("l", "r") : e.replace("r", "l")), f = j, h.pageWrap[g.page - 1].show().css({
        zIndex: m + 1
      }), i[0] = k.dpoint ? b.point2D(k.dpoint.x, k.dpoint.y) : this._endPoint(d.corner), i[1] = i[0], i[2] = this._startPoint(d.corner, b.point2D(0, 20)), i[3] = l ? this._startPoint(d.corner, b.point2D(l.x, l.y)) : this._startPoint(d.corner)
    } else {
      var o = "r" == c || "l" == c ? 0 : h.options.elevation,
        p = b.transformUnit(o, this.$el.height());
      e = g.dpoint ? g.dpoint.corner : c, d = b.peelingPoint(e || this._cornerAllowed()[0]), i[0] = g.dpoint || this._startPoint(d.corner), i[1] = g.dpoint ? i[0] : this._startPoint(d.corner, b.point2D(0, p)), (i[0].x < 0 || i[0].x > this.$el.width()) && (p = 0), i[2] = this._endPoint(d.corner, b.point2D(0, p)), i[3] = this._endPoint(d.corner)
    }
    f.flip("_animate", !1), f.flip("_showFoldedPage", i[0]) ? (g.turnData.options.autoCenter && n.prototype.center.call(g.turn, g.next), f.flip("_animate", {
      from: 0,
      to: 1,
      easing: h.options.easing,
      frame: function(a) {
        f.flip("_fold", b.bezier(i, a, d.corner))
      },
      complete: function() {
        f.flip("_animationCompleted", g.page, !0)
      },
      duration: h.options.duration,
      turning: !0
    })) : f.flip("_animationCompleted", g.page, !0), g.corner = null
  }, q.prototype.isTurning = function() {
    return this.animation && this.animation.turning
  }, q.prototype._showWhenHolding = function() {
    var c, d = this.$el,
      e = d.data("f"),
      f = e.turn,
      g = e.turnData;
    if (e.holdingPoint) {
      var h = g.display == b.DISPLAY_SINGLE,
        i = this._cornerAllowed();
      if (c = g.direction == b.DIRECTION_LTR ? h ? e.holdingPoint.x > d.width() / 2 ? "r" : "l" : g.options.showDoublePage ? 0 === e.page % 2 ? "r" : "l" : 0 === e.page % 2 ? "l" : "r" : h ? e.holdingPoint.x > d.width() / 2 ? "l" : "r" : g.options.showDoublePage ? 0 === e.page % 2 ? "l" : "r" : 0 === e.page % 2 ? "r" : "l", n.prototype.stop.call(f), this._animate(!1), e.status = "holding", ~a.inArray(c, i)) {
        g.tmpListeners || (g.tmpListeners = {}, g.tmpListeners.tap = b.getListeners(f.$el, "tap", !0), g.tmpListeners.doubleTap = b.getListeners(f.$el, "doubleTap", !0));
        var j = b.peelingPoint(c, e.holdingPoint.x, e.holdingPoint.y);
        h ? this._detectSinglePage(j, j, !0) && (e.corner = b.peelingPoint(c, e.holdingPoint.x, e.holdingPoint.y)) : this._showFoldedPage(j, !0) && (e.corner = b.peelingPoint(c, e.holdingPoint.x, e.holdingPoint.y))
      }
    }
  }, q.prototype._pagePress = function(c) {
    var d = this.$el.data("f"),
      e = d.turn;
    if (!d.corner && !d.disabled && !this.isTurning()) {
      var f = d.turnData;
      f.status = "tapping", d.status = "tapping";
      var g = this._isIArea(c);
      if (!(f.options.hover || d.peel && d.peel.corner == g.corner)) return f.status = "", d.status = "", void 0;
      if (f.display == b.DISPLAY_SINGLE && f.pages[d.next] && d.effect != f.pages[d.next].data("f").effect && f.pageObjs[d.next].hasClass("cover") && ~a.inArray(g.corner, b.corners.forward)) return f.status = "", d.status = "", void 0;
      if (d.corner = g, d.startPoint = null, has3d = b.css3dAvailable(), d.corner && this._foldingPage()) return n.prototype.update.call(e), !0;
      d.corner = null;
      var h = b.eventPoint(c),
        i = f.pageWrap[d.page].offset();
      h.x -= i.left, h.y -= i.top, f.options.smartFlip && ~a.inArray(d.page, n.prototype.view.call(e)) && h.x > 0 && h.y > 0 && h.x < this.$el.width() && h.y < this.$el.height() && (d.holdingPoint = h, d.startPoint = h, d.holding = setTimeout(a.proxy(this._showWhenHolding, this), 100))
    }
  }, q.prototype._pageMove = function(a) {
    var c, d, e, f, g = this.$el.data("f");
    if (!g.disabled) {
      if (a.preventDefault(), g.corner) return e = g.turn, f = g.turnData, d = f.pageWrap[g.page].offset(), g.status = "move", c = b.eventPoint(a), c.x -= d.left, c.y -= d.top, c.corner = g.corner.corner, f.display == b.DISPLAY_SINGLE ? this._detectSinglePage(c, g.corner) : this._showFoldedPage(c), g.holdingPoint && b.cleanSelection(), !0;
      if (!this.animation)
        if (c = this._isIArea(a)) {
          if (g.hover) {
            if ("sheet" == g.effect && 2 != c.corner.length) return !1;
            if ("peel" != g.status || !g.peel || g.peel.corner != c.corner) {
              if (f = g.turnData, f.display == b.DISPLAY_SINGLE && f.page == f.totalPages) return !1;
              var h = f.options.cornerPosition,
                i = this._startPoint(c.corner, b.point2D(h.x, h.y));
              g.status = "peel", c.x = i.x, c.y = i.y, this._showFoldedPage(c, !0)
            }
          }
        } else "peel" == g.status && (g.peel && g.peel.corner == g.dpoint.corner || (g.status = "", this.hideFoldedPage(!0)));
      return !1
    }
  }, q.prototype._pageUnpress = function() {
    var c = this.$el.data("f"),
      d = c.corner,
      e = c.turn,
      f = c.turnData;
    if (!c.disabled && d && "turning" != f.status && "swiped" != f.status) {
      var g = c.point || d,
        h = c.page,
        i = this.$el.width();
      if (f.display == b.DISPLAY_SINGLE)
        if (1 == h) "tapping" == c.status || g.x < i / 2 ? n.prototype._turnPage.call(e, c.next, g.corner) : this.hideFoldedPage(!0);
        else if (~a.inArray(g.corner, b.corners.forward)) "tapping" == c.status || g.x < i / 2 ? n.prototype._turnPage.call(e, c.next, g.corner) : this.hideFoldedPage(!0);
      else {
        var j = f.pages[c.page - 1];
        g = j.data("f").point, "tapping" == c.status || g.x > .1 * i ? (n.prototype._turnPage.call(e, c.page - 1, g ? g.corner : null), f.status = "turning") : j.flip("turnPage", g.corner)
      } else f.display == b.DISPLAY_DOUBLE && ("tapping" == c.status || g.x < 0 || g.x > i ? n.prototype._turnPage.call(e, c.next, g.corner) : this.hideFoldedPage(!0))
    }
    c.holdingPoint && (clearInterval(c.holding), delete c.holdingPoint, delete c.holding), c.status = "", c.corner = null
  }, q.prototype._detectSinglePage = function(c, d, e) {
    var f = this.$el.data("f"),
      g = f.turn,
      h = f.turnData;
    if (h.pageWrap[f.page].offset(), -1 == a.inArray(d.corner, b.corners.forward)) {
      var i, j = h.pages[f.page - 1],
        k = j.data("f");
      if (c.corner = h.direction == b.DIRECTION_LTR ? c.corner.replace("l", "r") : c.corner.replace("r", "l"), k.visible) return i = j.flip("_showFoldedPage", c, !1), h.corner = d.corner, i;
      var l = j.flip("_endPoint", c.corner);
      return k.point = b.peelingPoint(c.corner, l.x, l.y), n.prototype.stop.call(g), i = j.flip("_showFoldedPage", c, !0), h.corner = d.corner, i
    }
    return this._showFoldedPage(c, e)
  }, q.prototype.disable = function(a) {
    return this.$el.data("f").disabled = a, this.$el
  }, q.prototype.hover = function(a) {
    return this.$el.data("f").hover = a, this.$el
  }, q.prototype.peel = function(c, d) {
    var e = this.$el.data("f");
    if (c.corner) {
      if (-1 == a.inArray(c.corner, b.corners.all)) throw b.turnError("Corner " + c.corner + " is not permitted");
      if (~a.inArray(c.corner, this._cornerAllowed())) {
        var f = e.turnData,
          g = f.options.cornerPosition;
        c.x = c.x || g.x, c.y = c.y || g.y;
        var h = this._startPoint(c.corner, b.point2D(c.x, c.y));
        e.peel = c, e.status = "peel", this._showFoldedPage(b.peelingPoint(c.corner, h.x, h.y), d)
      }
    } else e.status = "", this.hideFoldedPage(d);
    return this.$el
  }, q.prototype._animationCompleted = function(a, c) {
    var d = this.$el.data("f"),
      e = d.turn,
      f = d.turnData;
    if ((c || !d.peel || d.peel.corner != d.dpoint.corner) && (f.front.splice(f.front.indexOf(parseInt(d.next, 10)), 1), f.pageMv.splice(f.pageMv.indexOf(parseInt(d.page, 10)), 1), this.$el.css({
        visibility: "hidden"
      }), this.hide(), 0 === f.front.length && (f.corner = null)), c) {
      var g = f.tpage || f.page;
      g == d.next || g == d.page ? (delete f.tpage, n.prototype._fitPage.call(e, g || d.next)) : f.pageWrap[d.page].hide()
    } else f.display == b.DISPLAY_SINGLE && a == f.tpage ? (delete f.tpage, n.prototype._fitPage.call(e, a)) : (n.prototype.update.call(e), n.prototype._updateShadow.call(e));
    this.$el.css({
      visibility: ""
    }), this.$el.trigger("end", [a, c])
  }, q.prototype._animate = function(b) {
    if (!b) return this.animation && this.animation.stop(), void 0;
    if (this._animation) {
      this.animation._time = (new Date).getTime();
      for (var c = 0; c < this.animation._elements; c++) this.animation.from[c] = this._animation.current[c], this.animation.to[c] = b.to[c] - this._animation.from[c]
    } else {
      b.to.length || (b.to = [b.to]), b.from.length || (b.from = [b.from]);
      var d = this,
        e = !0;
      this.animation = a.extend({
        current: [],
        _elements: b.to.length,
        _time: (new Date).getTime(),
        stop: function() {
          e = !1, d.animation = null
        },
        _frame: function() {
          for (var a = Math.min(this.duration, (new Date).getTime() - this._time), b = 0; b < this._elements; b++) this.current[b] = this.easing(a, this.from[b], this.to[b], this.duration);
          e = !0, this.frame(1 == this._elements ? this.current[0] : this.current), a >= this.duration ? (this.stop(), this.complete && this.complete()) : window.requestAnimationFrame(function() {
            e && d.animation._frame()
          })
        }
      }, b);
      for (var f = 0; f < this.animation._elements; f++) this.animation.to[f] -= this.animation.from[f];
      this.animation._frame()
    }
  }, q.prototype.destroy = function() {
    var a = this.$el.data("f");
    a.clip && (this._animate(!1), a.clip.detach(), delete a.clip, delete a.igradient, delete a.ogradient, delete a.ipage, delete a.turnData, delete a.turn), this._destroy()
  }, n.prototype.addPage = function(c, d, e) {
    var f = this._data;
    if (f.destroying) return null;
    var g, h = "",
      i = !1,
      j = f.totalPages + 1;
    if (e = e || {}, (g = /\bpage\-([0-9]+|last|next\-to\-last)\b/.exec(a(c).attr("class"))) && (d = "last" == g[1] ? f.totalPages : "next-to-last" == g[1] ? f.totalPages - 1 : parseInt(g[1], 10)), d) {
      if (d <= j) i = !0;
      else if (d > j) throw b.error('Page "' + d + '" cannot be inserted')
    } else d = j, i = !0;
    return d >= 1 && j >= d && (d in f.pageObjs && this._movePages(d, 1), i && (f.totalPages = j), f.pageObjs[d] = a(c), f.pageObjs[d].hasClass("cover") || (h += "page "), h += "page-" + d + " ", h += f.display == b.DISPLAY_DOUBLE ? d % 2 ? "page-odd" : "page-even" : "page-odd", f.pageObjs[d].css({
      "float": "left"
    }).addClass(h), f.pageObjs[d].data({
      f: e
    }), !b.hasHardPage() && f.pageObjs[d].hasClass("hard") && f.pageObjs[d].removeClass("hard"), this._addPage(d), f.done && this._removeFromDOM()), this.$el
  }, n.prototype._addPage = function(b) {
    var c = this._data,
      d = c.pageObjs[b];
    if (d)
      if (this._pageNeeded(b)) {
        if (!c.pageWrap[b]) {
          c.pageWrap[b] = a("<div/>", {
            "class": "page-wrapper",
            page: b,
            css: {
              position: "absolute",
              overflow: "hidden"
            }
          }), this.$el.append(c.pageWrap[b]), c.pageObjs[b].appendTo(c.pageWrap[b]);
          var e = this._pageSize(b, !0);
          d.css({
            width: e.width,
            height: e.height
          }), c.pageWrap[b].css(e)
        }
        this._makeFlip(b)
      } else c.pageObjs[b].remove()
  }, n.prototype.hasPage = function(a) {
    return b.has(a, this._data.pageObjs)
  }, n.prototype.effect = function(a, c) {
    var d, e = this._data;
    if (d = e.pageObjs[a]) {
      if (void 0 === c) return d.hasClass("hard") ? "hard" : "sheet";
      var f = e.dynamicMode;
      switch (e.dynamicMode = !1, c) {
        case "hard":
          d.removeClass("sheet"), d.addClass("hard"), this._removePageFromDOM(a);
          break;
        case "sheet":
          d.removeClass("hard"), d.addClass("sheet"), this._removePageFromDOM(a)
      }
      return e.dynamicMode = f, this._pageNeeded(a) && this._addPage(a), this.$el
    }
    throw b.turnError('Page "' + a + '" is not loaded yet')
  }, n.prototype._pageSize = function(a) {
    var c = this._data,
      d = {},
      e = this.$el.width(),
      f = this.$el.height(),
      g = c.pageObjs[a];
    if (c.display == b.DISPLAY_SINGLE) d.width = e, d.height = f, d.top = 0, d.left = 0, d.right = "auto", g.hasClass("page") ? (d.top = c.pageMargin[0], d.width -= c.pageMargin[1], d.height -= c.pageMargin[0] + c.pageMargin[2]) : 2 == a && g.hasClass("cover") && (d.left = -e);
    else if (c.display == b.DISPLAY_DOUBLE) {
      var h = Math.floor(e / 2),
        i = f,
        j = a % 2;
      d.top = 0, g.hasClass("own-size") ? (d.width = c.pageObjs[a].width(), d.height = c.pageObjs[a].height()) : (d.width = h, d.height = i), g.hasClass("page") && (d.top = c.pageMargin[0], d.width -= j ? c.pageMargin[1] : c.pageMargin[3], d.height -= c.pageMargin[0] + c.pageMargin[2]), c.direction != b.DIRECTION_LTR || c.options.showDoublePage ? (d[j ? "left" : "right"] = h - d.width, d[j ? "right" : "left"] = "auto") : (d[j ? "right" : "left"] = h - d.width, d[j ? "left" : "right"] = "auto")
    }
    return d
  }, n.prototype._makeFlip = function(a) {
    var c = this._data;
    if (!c.pages[a]) {
      var d, e = c.display == b.DISPLAY_SINGLE,
        f = a % 2;
      d = e ? a + 1 : c.options.showDoublePage && !e ? f ? a - 1 : a + 1 : f ? a + 1 : a - 1, c.options.blocks > 0 && (c.pageBlocks[a] || (c.pageBlocks[a] = {
        first: 0,
        last: 0,
        status: fragStatus.assigned
      }));
      var g = this._pageSize(a);
      c.pages[a] = c.pageObjs[a].css({
        width: g.width,
        height: g.height
      }).flip({
        page: a,
        next: d
      }, this), c.z && c.pageWrap[a].css({
        display: (b.isFirefoxOrIE ? '' : (c.z.pageV[a] ? "none" : "")),
        visibility: (b.isFirefoxOrIE ? (c.z.pageV[a] ? "hidden" : "") : ''),
        zIndex: c.z.pageZ[a] || 0
      })
    }
    return c.pages[a]
  }, n.prototype._makeRange = function() {
    var a, b = this._data;
    if (b.totalPages > 0)
      for (b.range = this.range(), a = b.range[0]; a <= b.range[1]; a++) b.pageObjs[a] && !b.pageWrap[a] && this._addPage(a)
  }, n.prototype.range = function(a) {
    var c, d, e, f, g = this._data,
      h = g.totalPages;
    if (g.options.blocks > 0) {
      var i = this.getBlockPage(g.options.blocks);
      g.display == b.DISPLAY_DOUBLE && g.options.showDoublePage && (i += 1), i > h && (h = i, g.totalPages = h)
    }
    return a = a || g.tpage || g.page || 1, f = this._view(a), f[1] = f[1] || f[0], f[0] >= 1 && f[1] <= h ? (c = Math.floor((g.options.cacheSize - 2) / 2), h - f[1] > f[0] ? (d = Math.min(f[0] - 1, c), e = 2 * c - d) : (e = Math.min(h - f[1], c), d = 2 * c - e)) : (d = g.options.cacheSize - 1, e = g.options.cacheSize - 1), [Math.max(1, f[0] - d), Math.min(h, f[1] + e)]
  }, n.prototype._pageNeeded = function(a) {
    if (0 === a) return !0;
    var b = this._data,
      c = b.range || this.range();
    return b.pageObjs[a].hasClass("cover") || ~b.pageMv.indexOf(a) || ~b.front.indexOf(a) || a >= c[0] && a <= c[1]
  }, n.prototype._removeFromDOM = function() {
    if (!this.isAnimating()) {
      var a = this._data;
      for (var c in a.pageWrap) b.has(c, a.pageWrap) && (c = parseInt(c, 10), this._pageNeeded(c) || this._removePageFromDOM(c))
    }
  }, n.prototype.pageData = function(a, b) {
    var c = this._data;
    return void 0 === b ? c.pageObjs[a].data("f") : (c.pageObjs[a].data("f", b), void 0)
  }, n.prototype._removePageFromDOM = function(a, c) {
    var d = this._data;
    this.view(a);
    var e, f = d.pageObjs,
      g = d.pages;
    if (a && this._trigger("removePage", a, f[a]) == b.EVENT_PREVENTED) return !1;
    if (d.pages[a] && (d.pages[a].flip("_bringClipToFront", !1), d.pages[a].flip("destroy"), d.pages[a].detach(), delete d.pages[a]), f[a] && f[a].detach(), d.pageWrap[a] && (d.pageWrap[a].detach(), delete d.pageWrap[a]), d.dynamicMode || c) {
      if (e = d.pageBlocks[a]) {
        for (var h = e.last || e.first, i = e.first; h >= i; i++) d.blocks[i] && (d.blocks[i].start ? g[d.blocks[i].start] || g[d.blocks[i].end] || delete d.blocks[i] : delete d.blocks[i]);
        delete d.pageBlocks[a]
      }
      f[a] && (f[a].removeData(), delete f[a])
    }
    return !0
  }, n.prototype.removePage = function(a) {
    var c = this._data;
    if ("*" == a) {
      for (var d = this.range(), e = d[0]; e <= d[1]; e++) this._removePageFromDOM(e, !0);
      c.options.blocks = 0, c.totalPages = 0
    } else {
      if (1 > a || a > c.totalPages) throw b.turnError("The page " + a + " doesn't exist");
      if (c.pageObjs[a] && (this.stop(), !this._removePageFromDOM(a, !0))) return !1;
      this._movePages(a, -1), c.totalPages = c.totalPages - 1, c.page > c.totalPages ? (c.page = null, this._fitPage(c.totalPages)) : (this._makeRange(), this.update())
    }
    return this
  }, n.prototype._movePages = function(a, c) {
    var d, e = this,
      f = this._data,
      g = f.display == b.DISPLAY_SINGLE,
      h = function(a) {
        var b = a + c,
          d = b % 2,
          h = d ? " page-odd " : " page-even ";
        f.pageObjs[a] && (f.pageObjs[b] = f.pageObjs[a].removeClass("page-" + a + " page-odd page-even").addClass("page-" + b + h)), f.pageWrap[a] && (f.pageWrap[b] = f.pageObjs[b].hasClass("fixed") ? f.pageWrap[a].attr("page", b) : f.pageWrap[a].css(e._pageSize(b, !0)).attr("page", b), f.pages[a] && (f.pages[b] = f.pages[a], f.pages[b].data("f").page = b, f.pages[b].data("f").next = g ? b + 1 : f.options.showDoublePage ? d ? b - 1 : b + 1 : d ? b + 1 : b - 1), c && (delete f.pages[a], delete f.pageObjs[a], delete f.pageWrap[a]))
      };
    if (c > 0)
      for (d = f.totalPages; d >= a; d--) h(d);
    else
      for (d = a; d <= f.totalPages; d++) h(d)
  }, n.prototype._view = function(a) {
    var c = this._data;
    return a = a || c.page, c.display == b.DISPLAY_DOUBLE ? c.options.showDoublePage ? a % 2 ? [a, a + 1] : [a - 1, a] : a % 2 ? [a - 1, a] : [a, a + 1] : 0 === a % 2 && c.pages[a] && c.pages[a].hasClass("cover") ? [a, a + 1] : [a]
  }, n.prototype.view = function(a, b) {
    var c = this._data,
      d = this._view(a),
      e = [];
    return b ? (d[0] > 0 && e.push(d[0]), d[1] <= c.totalPages && e.push(d[1])) : (d[0] > 0 ? e.push(d[0]) : e.push(0), d[1] && (d[1] <= c.totalPages ? e.push(d[1]) : e.push(0))), e
  }, n.prototype.pages = function(a) {
    var b = this._data;
    if (a) {
      if (a < b.totalPages)
        for (var c = b.totalPages; c > a; c--) this.removePage(c);
      return b.totalPages = a, this._fitPage(b.page), this.$el
    }
    return b.totalPages
  }, n.prototype._missing = function(a) {
    var b = this._data;
    if (b.totalPages < 1) return b.options.blocks > 0 && this.$el.trigger("missing", [1]), void 0;
    for (var c = b.range || this.range(a), d = [], e = c[0]; e <= c[1]; e++) b.pageObjs[e] || d.push(e);
    d.length > 0 && this.$el.trigger("missing", [d])
  }, n.prototype.pageElement = function(a) {
    return this._data.pageObjs[a]
  }, n.prototype.next = function() {
    return this.page(this._view(this._data.page).pop() + 1)
  }, n.prototype.previous = function() {
    return this.page(this._view(this._data.page).shift() - 1)
  }, n.prototype._backPage = function(b) {
    var c = this._data;
    if (b) {
      if (!c.pageObjs[0]) {
        var d = a("<div />");
        c.pageObjs[0] = a(d).css({
          "float": "left"
        }).addClass("page page-0"), this._addPage(0)
      }
    } else c.pageObjs[0] && this._removePageFromDOM(0, !0)
  }, n.prototype._isCoverPageVisible = function(a) {
    var b = this._data,
      c = b.tpage || b.page;
    return b.pageObjs[a].hasClass("cover") && (c >= a && 0 === a % 2 || a >= c && 1 === a % 2)
  }, n.prototype.getBlockPage = function(a) {
    var c = this._data;
    if (1 > a || a > c.options.blocks) return 0;
    if (1 == a) return c.options.pages + 1;
    var d = c.options.pages,
      e = 0 === d % 2 ? d : Math.min(0, d - 1);
    return c.display == b.DISPLAY_DOUBLE ? c.options.showDoublePage ? 2 * a - 1 + e : 2 * a - 2 + e : a + c.options.pages
  }, n.prototype.getPageBlock = function(a, c) {
    var d = this._data;
    if (d.options.blocks) {
      if (c && a && d.pageBlocks[a] && d.pageBlocks[a].first) return d.pageBlocks[a].first;
      if (a == d.options.pages + 1) return 1;
      if (a > d.options.pages) {
        if (c) {
          for (var e, f = this.range(), g = this.view(d.page, !0), h = 0, i = 0, j = 0, k = 0, l = 0, m = f[0]; m <= f[1]; m++) d.pageBlocks[m] && (h || (h = d.pageBlocks[m].first, j = m), d.pageBlocks[m].last && (i = d.pageBlocks[m].last, k = m), d.pageBlocks[m].first && (l = m));
          0 === i && l && (i = d.pageBlocks[l].first, k = l), d.display == b.DISPLAY_DOUBLE ? d.options.showDoublePage ? 1 === a % 2 && (a > g[g.length - 1] ? (0 === k % 2 && (k -= 1), e = i + (a - k) / 2) : a < g[0] ? (0 === j % 2 && (j -= 1), e = h - (j - a) / 2) : e = (a + 1) / 2) : 0 === a % 2 && (a > f[1] ? (1 == k % 2 && (k -= 1), e = i + (a - k + 2) / 2) : a < f[0] ? (1 == j % 2 && (j -= 1), e = h - (j - a + 2) / 2) : e = (a + 2) / 2) : e = a > f[1] ? d.pageBlocks[f[1]].last + (a - f[1]) : a < f[0] ? d.pageBlocks[f[0]].first - (f[0] - a) : a - d.options.pages
        } else d.display == b.DISPLAY_DOUBLE ? d.options.showDoublePage ? 1 == a % 2 && (e = Math.ceil((a - d.options.pages + 1) / 2)) : 0 === a % 2 && (e = Math.ceil((a - d.options.pages + 2) / 2)) : e = a - d.options.pages;
        return e ? Math.max(2, e) : 0
      }
    }
    return 0
  }, n.prototype.getEndingBlockPage = function(a) {
    var b = this._data;
    return a && b.pageObjs[a] ? b.pageObjs[a].data("f").endingBlock || -1 : -1
  }, n.prototype.getBlockData = function(a) {
    return a = this._data.blocks[a], a ? a.html : null
  }, n.prototype.block = function(a) {
    var c = this._data;
    if (void 0 === a) {
      var d = this.view(null, !0),
        e = d[0] > c.options.pages ? d[0] : 0,
        f = d[d.length - 1] > c.options.pages ? d[d.length - 1] : 0;
      if (e = e || f) {
        var g = c.pageBlocks[e].first,
          h = c.pageBlocks[f].last || g;
        return [g, h]
      }
      return null
    }
    if (!(a >= 1 && a <= c.options.blocks)) throw turnError('Block "' + a + '" cannot be loaded');
    var i = this.getBlockPage(a),
      j = this.range();
    return this._cleanPages(j[0], j[1]), c.pageBlocks[i] = {
      first: a,
      last: 0,
      status: b.fragStatus.assigned
    }, this._fitPage(i), this.$el
  }, n.prototype._fetchBlocks = function(a) {
    var c = this._data;
    if (c.options.blocks && c.pageBlocks[a]) {
      var d = c.pageBlocks[a];
      c.pageObjs[a];
      var e = this.view(c.page, !0);
      if (d.status == b.fragStatus.assigned) d.first || (d.first = this.getPageBlock(a, !0)), d.status = b.fragStatus.requested, this._pushBlocks(d.first, a, c.page);
      else if (d.status == b.fragStatus.waiting) a > e[0] && this._cleanPages(a + 1, this.range()[1]), this._pushBlocks(d.last, a, c.page);
      else if (d.status == b.fragStatus.nsplit) {
        if (a > e[0] && (this._cleanPages(a + 1, this.range()[1]), d.nextPageTmp)) {
          var f = c.pageObjs[a + 1],
            g = c.pageBlocks[a + 1],
            h = f.data("f");
          g.status = b.fragStatus.waiting, g.first = d.last, g.last = d.last, g.bp = d.lbp, h.flowTo ? f.find(h.flowTo).html(d.nextPageTmp.html()) : f.html(d.nextPageTmp.html()), delete d.nextPageTmp, d.status = b.fragStatus.full
        }
        delete c.blocks[d.last].cp
      } else d.status == b.fragStatus.full && e[0] == a && e[1] && this._fetchBlocks(e[1])
    }
  }, n.prototype._pushBlocks = function(a, b, c) {
    var d, e, f = this._data;
    if (a > 0 && a <= f.options.blocks)
      if ((e = f.pageBlocks[b]) && (e.waiting = a), d = f.blocks[a]) {
        if (b && -1 == d.queue.indexOf(b) && d.queue.push(b), c && (d.cp = c), d.html) {
          for (var g = 0; g < d.queue.length; g++) this._flowContent(d.queue[g], a);
          d.queue = []
        }
      } else f.blocks[a] = {
        page: b,
        queue: [b],
        cp: c
      }, this._reportLoading(b), this.$el.trigger("missingBlock", [a])
  }, n.prototype.addBlock = function(a, b) {
    var c = this._data;
    a > 0 && a <= c.options.blocks && (b = b.replace(/\s+/g, " "), c.blocks[a] ? (c.blocks[a].html = b, this._pushBlocks(a)) : c.blocks[a] = {
      html: b,
      queue: []
    })
  }, n.prototype._flowContent = function(c, d) {
    var e = this._data,
      f = e.blocks[d],
      g = e.pageObjs[c];
    if (f && g) {
      var h = e.pageBlocks[c],
        i = g.data("f"),
        j = i.flowTo ? g.find(i.flowTo) : g,
        k = c < f.cp ? f.cp || e.page : e.page,
        l = this.view(k, !0),
        m = this.view(c, !0),
        n = this.range();
      if (d < h.first || d > h.last) {
        if (!g.is(":visible")) return h.status = b.fragStatus.assigned, void 0;
        var o = a("<div />", {
          "class": "block block-" + d,
          css: {
            position: "relative"
          }
        }).html(f.html);
        if (f.start = c, d < h.first) {
          h.first = d;
          var p = j.children();
          p.length > 0 ? (h.bp = null, o.insertBefore(p[0]), this._cleanPages(n[0], c - 1)) : o.appendTo(j)
        } else o.appendTo(j);
        d > h.last && (h.last = d), h.waiting == d && (h.waiting = 0)
      } else if (!g.is(":visible")) return h.status = b.fragStatus.waiting, void 0;
      var q, r, s = c + 1,
        t = e.pageBlocks[s],
        u = e.pageObjs[s];
      u && (q = u.data("f"), r = q.flowTo ? u.find(q.flowTo) : u, t.first == h.last && s < l[0] && (restore(j[0], r[0]), q.first = 0, q.last = 0, q.status = b.fragStatus.assigned));
      var v = getBreakingPoint(j[0]);
      if (v)
        if (h.loading && (h.loading = !1, this.$el.trigger("endPageLoading", c)), s < l[0] || c >= l[0])
          if (h.status = b.fragStatus.full, u) {
            s > l[l.length - 1] && this._cleanPages(s, n[1]), breakPage(v, j[0], r[0]);
            for (var w = h.first; w < h.last; w++) e.blocks[w] && (e.blocks[w].end = c);
            h.last = v.path[0] + h.first, t.first = h.last, t.last = t.first + r.children("div").length - 1;
            for (var w = t.first; w <= t.last; w++) e.blocks[w] && (w == t.first && w == h.last ? e.blocks[w].end = s : (e.blocks[w].start = s, e.blocks[w].end = s));
            t.bp = v, this._flowContent(s, t.last)
          } else breakPage(v, j[0], null);
      else h.status = b.fragStatus.nsplit, h.nextPageTmp = a("<div />"), h.lbp = v, breakPage(v, j[0], h.nextPageTmp[0]);
      else if (f.end = c, h.status = b.fragStatus.waiting, c < l[0]) {
        var x = e.pageBlocks[m[0]];
        if (!x.bp && (x.first > 2 || m[0] == e.options.pages + 1)) this._pushBlocks(x.first - 1, m[0], k);
        else {
          var y = m[m.length - 1];
          e.pageBlocks[y].last ? this._pushBlocks(e.pageBlocks[y].last + 1, y, k) : this._pushBlocks(e.pageBlocks[m[0]].last + 1, m[0], k)
        }
      } else u && -1 == m.indexOf(s) && (t.first = h.last + 1), this._pushBlocks(h.last + 1, c, k);
      c < l[0] && m[0] == c && 2 == d && this.replaceView(c, e.options.pages + 2)
    }
  }, n.prototype._reportLoading = function(a) {
    for (var b = this._data, c = this.view(a, !0), d = 0; d < c.length; d++) c[d] >= a && !b.pageBlocks[c[d]].loading && (b.pageBlocks[c[d]].loading = !0, this.$el.trigger("startPageLoading", [c[d]]))
  }, n.prototype._cleanPages = function(a, b) {
    for (var c, d, e, f = this._data, g = a; b >= g; g++)
      if ((d = f.pageBlocks[g]) && d.first) {
        e = d.last || d.first;
        for (var h = d.first; e >= h; h++) f.blocks[h] && (h == d.first && f.pageBlocks[g - 1] && h == f.pageBlocks[g - 1].last || (f.blocks[h].page = 0, f.blocks[h].start && (f.blocks[h].start = 0, f.blocks[h].end = 0)));
        d.first = 0, d.status = fragStatus.assigned, d.last = 0, d.bp = null, c = f.pageObjs[g].data("f"), c.flowTo ? f.pageObjs[g].find(c.flowTo).html("") : f.pageObjs[g].html("")
      }
  }, n.prototype.replaceView = function(a, c) {
    var d = this._data,
      e = this.range();
    if (a != c && a >= e[0] && a <= e[1]) {
      var f, g, h;
      d.display == b.DISPLAY_SINGLE;
      var i = c,
        j = d.front.slice(),
        k = d.pageMv.slice(),
        l = c - a,
        m = {},
        n = {},
        o = {},
        p = {},
        q = {},
        r = {},
        s = {};
      for (var t in d.pageObjs)
        if (b.has(t, d.pageObjs))
          if (t = parseInt(t, 10), a > t) this._removePageFromDOM(t);
          else {
            if (i = t + l, g = d.pageObjs[t].data("f"), h = i % 2, d.pageObjs[t].removeClass("even odd p" + t).addClass((h ? "odd" : "even") + " p" + i), d.pageWrap[t].attr("page", i), g = d.pageObjs[t].data("f"), g.page = i, ~(f = j.indexOf(t)) && (d.front[f] = i), ~(f = k.indexOf(t)) && (d.pageMv[f] = i), d.z.pageV[t] && (m[i] = !0), d.z.pageZ[t] && (n[i] = d.z.pageZ[t]), g.next += l, g.over && (g.over += l), d.pageBlocks[t]) {
              for (var u = d.pageBlocks[t].first; u <= d.pageBlocks[t].last; u++)
                if (d.blocks[u] && !s[u]) {
                  d.blocks[u].start += l, d.blocks[u].end += l;
                  for (var v = 0; v < d.blocks[u].queue.length; v++) d.blocks[u].queue[v] += l;
                  s[u] = !0
                }
              if ((u = d.pageBlocks[t].waiting) && d.blocks[u]) {
                for (var v = 0; v < d.blocks[u].queue.length; v++) d.blocks[u].queue[v] += l;
                s[u] = !0
              }
              r[i] = d.pageBlocks[t]
            }
            o[i] = d.pageObjs[t], p[i] = d.pages[t], q[i] = d.pageWrap[t], q[i].css(this._pageSize(i, !0))
          }
      d.pageObjs = o, d.pages = p, d.pageWrap = q, d.pageBlocks = r, d.pageWrap = q, d.z.pageV = m, d.z.pageZ = n, d.range = this.range(c), d.page = d.page - a + c, d.tpage && (d.tpage = d.tpage - a + c, d.page = d.tpage), this._missing(c), this.update(), d.options.autoCenter && this.center(), console.log("replaced ", a, " now:", d.page, d.tpage)
    }
    return this.$el
  }, n.prototype.flow = function() {
    var b = this._data;
    if (b.options.blocks && this.$el.is(":visible")) {
      var c, d = this.view(b.page, !0);
      if (d[0] > b.options.pages) c = d[0];
      else {
        if (!(d[1] > b.options.pages)) return;
        c = d[1]
      }
      var e = this.range(),
        f = b.pageObjs[c],
        g = b.pageBlocks[c],
        h = f.data("f"),
        i = h.flowTo ? f.find(h.flowTo) : f,
        j = g.last || g.first,
        k = b.blocks[j];
      if (k) {
        if (i.children("div:last-child").html(b.blocks[j].html), j == g.first && g.bp) {
          var l = a.extend({}, g.bp);
          l.path[0] = 0, breakPage(l, i[0], i[0])
        }
        b.pageBlocks[c].status = fragStatus.waiting;
        var m = k.start;
        this._cleanPages(e[0], c - 1), this._cleanPages(c + 1, e[1]), k.start = m, this._flowContent(c, b.pageBlocks[c].last)
      }
      return this.$el
    }
  }, n.prototype._fitPage = function(c) {
    var d = this._data,
      e = this.view(c);
    d.display == b.DISPLAY_SINGLE && d.pages[c] && d.pages[c].hasClass("cover") && -1 != a.inArray(c + 1, e) && (c += 1), d.range = this.range(c), this._missing(), d.pageObjs[c] && (-1 != a.inArray(1, e) ? this.$el.addClass("first-page") : this.$el.removeClass("first-page"), ~a.inArray(d.totalPages, e) ? this.$el.addClass("last-page") : this.$el.removeClass("last-page"), d.status = "", d.peel = null, d.page = c, d.display != b.DISPLAY_SINGLE && this.stop(), this._removeFromDOM(), this._makeRange(), this._updateShadow(), this._cloneView(!1), this.$el.trigger("turned", [c, e]), this.update(), e[0] > d.options.pages ? this._fetchBlocks(e[0], "fixed") : e[1] > d.options.pages && this._fetchBlocks(e[1], "fixed"), d.options.autoCenter && this.center())
  }, n.prototype._turnPage = function(c, d) {
    var e, f, g, h = this._data,
      i = this.view(),
      j = this.view(c),
      k = h.display == b.DISPLAY_SINGLE;
    if (k) e = i[0], g = j[0];
    else if (i[1] && c > i[1]) e = i[1], g = j[0];
    else {
      if (!(i[0] && c < i[0])) return !1;
      e = i[0], g = j[1]
    }
    var l = h.options.turnCorners.split(","),
      m = h.pages[e].data("f"),
      n = m.dpoint;
    if (m.next, d || (d = "hard" == m.effect ? h.direction == b.DIRECTION_LTR ? c > e ? "r" : "l" : c > e ? "l" : "r" : h.direction == b.DIRECTION_LTR ? a.trim(l[c > e ? 1 : 0]) : a.trim(l[c > e ? 0 : 1])), k ? g > e && -1 == h.pageMv.indexOf(e) ? this.stop() : e > g && -1 == h.pageMv.indexOf(g) && this.stop() : h.display == b.DISPLAY_DOUBLE && Math.abs((h.tpage || h.page) - c) > 2 && this.stop(), h.page != c) {
      if (f = h.page, this._trigger("turning", c, j, d) == b.EVENT_PREVENTED) return ~a.inArray(e, h.pageMv) && h.pages[e].flip("hideFoldedPage", !0), !1;
      ~a.inArray(1, j) ? (this.$el.addClass("first-page"), this.$el.trigger("first")) : this.$el.removeClass("first-page"), ~a.inArray(h.totalPages, j) ? (this.$el.addClass("last-page"), this.$el.trigger("last")) : this.$el.removeClass("last-page")
    }
    return h.status = "turning", h.range = this.range(c), this._missing(c), h.pageObjs[c] && (this._cloneView(!1), h.tpage = g, this._makeRange(), m.dpoint = m.next != g ? null : n, m.next = g, f = h.page, -1 == h.pageMv.indexOf(g) ? h.pages[e].flip("turnPage", d) : (h.options.autoCenter && this.center(g), h.status = "", h.pages[g].flip("hideFoldedPage", !0)), f == h.page && (h.page = c), this.update()), !0
  }, n.prototype.page = function(c) {
    var d = this._data;
    if (void 0 === c) return d.page;
    if (1 != this.zoom() && this.zoomOut({
        animate: !1
      }), b.hasRotation && !d.disabled && !d.destroying) {
      if (c = parseInt(c, 10), !(d.options.blocks > 0 && c == d.totalPages + 1)) {
        if (c > 0 && c <= d.totalPages) {
          if (c != d.page)
            if (!d.done || ~a.inArray(c, this.view())) this._fitPage(c);
            else if (!this._turnPage(c)) return !1;
          return this.$el
        }
        return !1
      }
      this._fitPage(c)
    }
  }, n.prototype.center = function(a) {
    var c = this._data,
      d = this.size(),
      e = 0;
    if (!c.noCenter) {
      if (c.display == b.DISPLAY_DOUBLE) {
        var f = this.view(a || c.tpage || c.page);
        c.direction == b.DIRECTION_LTR ? f[0] ? f[1] || (e += d.width / 4) : e -= d.width / 4 : f[0] ? f[1] || (e -= d.width / 4) : e += d.width / 4
      }
      this.$el.css({
        marginLeft: e
      })
    }
    return this.$el
  }, n.prototype.destroy = function() {
    var c = this._data;
    return this._trigger("destroy") != b.EVENT_PREVENTED && (c.watchSizeChange = !1, c.destroying = !0, this.$el.undelegate(), this.$el.parent().off("start", this._eventPress), c.options.viewer.off("vmousemove", this._eventMove), a(document).off("vmouseup", this._eventRelease), this.removePage("*"), c.zoomer && c.zoomer.remove(), c.shadow && c.shadow.remove(), this._destroy()), this.$el
  }, n.prototype.is = function() {
    return !0
  }, n.prototype._getDisplayStr = function(a) {
    return a == b.DISPLAY_SINGLE ? "single" : a == b.DISPLAY_DOUBLE ? "double" : void 0
  }, n.prototype._getDisplayConst = function(a) {
    return a == b.DISPLAY_SINGLE ? a : a == b.DISPLAY_DOUBLE ? a : "single" == a ? b.DISPLAY_SINGLE : "double" == a ? b.DISPLAY_DOUBLE : void 0
  }, n.prototype.display = function(a, c) {
    var d = this._data,
      e = this._getDisplayStr(d.display);
    if (void 0 === a) return e;
    if (1 == d.zoom) {
      var f = this._getDisplayConst(a);
      if (!f) throw b.turnError('"' + a + '" is not a value for display');
      if (f != d.display) {
        var g = this._trigger("changeDisplay", a, e);
        if (!d.done || g != b.EVENT_PREVENTED) {
          switch (f) {
            case b.DISPLAY_SINGLE:
              this._backPage(!0), this.$el.removeClass("display-double").addClass("display-single");
              break;
            case b.DISPLAY_DOUBLE:
              this._backPage(!1), this.$el.removeClass("display-single").addClass("display-double")
          }
          if (d.display = f, e) {
            if (void 0 === c || c) {
              var h = this.size();
              this.size(h.width, h.height), this.update()
            }
            this._movePages(1, 0), this.$el.removeClass(e)
          }
        }
        this.$el.addClass(this._getDisplayStr()), this._cloneView(!1), this._makeRange()
      }
    }
    return this.$el
  }, n.prototype.isAnimating = function() {
    var a = this._data;
    return a.pageMv.length > 0 || "turning" == a.status
  }, n.prototype.isFlipping = function() {
    var a = this._data;
    return "turning" == a.status
  }, n.prototype.corner = function() {
    return this._data.corner || null
  }, n.prototype.data = function() {
    return this._data
  }, n.prototype.disable = function(c) {
    var d, e = this._data,
      f = this.view();
    e.disabled = void 0 === c || c === !0;
    for (d in e.pages) b.has(d, e.pages) && e.pages[d].flip("disable", e.disabled ? !0 : -1 == a.inArray(parseInt(d, 10), f));
    return this.$el
  }, n.prototype._size = function(a, b) {
    var c = this._defaultSize();
    return c.width = c.width * a, c.height = c.height * a, b && this._halfWidth() && (c.width = Math.floor(c.width / 2)), c
  }, n.prototype.peel = function(c, d, e, f) {
    var g = this._data;
    if (c) {
      if (1 == this.zoom())
        if (f = void 0 !== f ? f : !0, g.display == b.DISPLAY_SINGLE) g.peel = b.peelingPoint(c, d, e), g.pages[g.page].flip("peel", b.peelingPoint(c, d, e), f);
        else {
          var h = this.view(),
            i = ~a.inArray(c, corners.backward) ? h[0] : h[1];
          g.pages[i] && (g.peel = b.peelingPoint(c, d, e), g.pages[i].flip("peel", g.peel, f))
        }
    } else g.peel = null, this.stop(!0);
    return this.$el
  }, n.prototype._resizeObserver = function() {
    var b = this._data;
    if (b && b.watchSizeChange) {
      var c = b.options.viewer,
        d = 10;
      (b.viewerWidth != c.width() || b.viewerHeight != c.height()) && (b.viewerWidth = c.width(), b.viewerHeight = c.height(), this._resize()), b.monitorTimer = setTimeout(a.proxy(this._resizeObserver, this), d)
    }
  }, n.prototype.watchForSizeChanges = function(a) {
    var b = this._data;
    b.watchSizeChange != a && (b.watchSizeChange = a, clearInterval(b.monitorTimer), this._resizeObserver())
  }, n.prototype._defaultSize = function(a) {
    var c = this._data,
      d = c.viewerWidth - c.margin[1] - c.margin[3],
      e = c.viewerHeight - c.margin[0] - c.margin[2],
      f = "string" == typeof c.options.width && ~c.options.width.indexOf("%"),
      g = b.transformUnit(c.options.width, d),
      h = b.transformUnit(c.options.height, e),
      i = b.calculateBounds({
        width: g,
        height: h,
        boundWidth: Math.min(c.options.width, d),
        boundHeight: Math.min(c.options.height, e)
      });
    if (c.options.responsive)
      if (f) {
        if (e > d) return {
          width: b.transformUnit(c.options.width, d),
          height: h,
          display: b.DISPLAY_SINGLE
        }
      } else {
        var j = b.calculateBounds({
            width: g / 2,
            height: h,
            boundWidth: Math.min(c.options.width / 2, d),
            boundHeight: Math.min(c.options.height, e)
          }),
          k = c.viewerWidth * c.viewerHeight,
          l = k - i.width * i.height,
          m = k - j.width * j.height;
        if (l > m && !a || a == b.DISPLAY_SINGLE) return {
          width: j.width,
          height: j.height,
          display: b.DISPLAY_SINGLE
        };
        0 !== i.width % 2 && (i.width -= 1)
      }
    return {
      width: i.width,
      height: i.height,
      display: b.DISPLAY_DOUBLE
    }
  }, n.prototype._calculateMargin = function() {
    var a, c, d = this._data,
      e = /^(\d+(?:px|%))(?:\s+(\d+(?:px|%))(?:\s+(\d+(?:px|%))\s+(\d+(?:px|%)))?)$/;
    (a = d.options.margin) ? (c = e.exec(a)) && (d.margin[0] = b.transformUnit(c[1], d.viewerHeight), d.margin[1] = c[2] ? b.transformUnit(c[2], d.viewerWidth) : d.margin[0], d.margin[2] = c[3] ? b.transformUnit(c[3], d.viewerHeight) : d.margin[0], d.margin[3] = c[4] ? b.transformUnit(c[4], d.viewerWidth) : d.margin[1]) : d.margin = [0, 0, 0, 0], (a = d.options.pageMargin) ? (c = e.exec(a)) && (d.pageMargin[0] = b.transformUnit(c[1], d.viewerHeight), d.pageMargin[1] = c[2] ? b.transformUnit(c[2], d.viewerWidth) : d.pageMargin[0], d.pageMargin[2] = c[3] ? b.transformUnit(c[3], d.viewerHeight) : d.pageMargin[0], d.pageMargin[3] = c[4] ? b.transformUnit(c[4], d.viewerWidth) : d.pageMargin[1]) : d.pageMargin = [0, 0, 0, 0]
  }, n.prototype._resize = function() {
    var b, c, d, e = this._data;
    if (e.options.responsive) {
      var f = this.view();
      if (1 == e.zoom) {
        e.options.viewer, e.viewerWidth, e.viewerHeight;
        var g = e.slider;
        if (this._calculateMargin(), e.slider = null, d = this._defaultSize(), this.display(d.display, !1), e.slider = g, d.display != e.display && (d = this._defaultSize(e.display)), this.size(d.width * e.zoom, d.height * e.zoom), this.update(), e.zoomer)
          for (d = this._defaultSize(e.display), e.zoomer.css({
              width: d.width,
              height: d.height
            }), c = e.zoomer.children(), b = 0; b < c.length; b++) a(c[b]).css({
            width: d.width / f.length,
            height: d.height
          })
      } else if (this.scroll(e.scroll.left, e.scroll.top), e.zoomer)
        for (d = this._defaultSize(e.display), e.zoomer.css({
            width: d.width,
            height: d.height
          }), c = e.zoomer.children(), b = 0; b < c.length; b++) a(c[b]).css({
          width: d.width / f.length,
          height: d.height
        });
      e.miniatures && miniMethods._resize.call(a(e.miniatures))
    }
  }, n.prototype.calcVisiblePages = function() {
    var a = this,
      c = this._data;
    c.tpage || c.page;
    var d, e, f, g = {
      pageZ: {},
      pageV: {}
    };
    if (this.isAnimating() && 0 !== c.pageMv[0]) {
      var h = c.pageMv.length,
        i = c.front.length,
        j = c.display;
      if (j == b.DISPLAY_SINGLE)
        for (d = 0; h > d; d++) nextPage = c.pages[c.pageMv[d]].data("f").next, g.pageV[c.pageMv[d]] = !0, g.pageZ[c.pageMv[d]] = 3 + h - d, g.pageV[nextPage] = !0, c.pageObjs[c.pageMv[d]].hasClass("cover") ? g.pageV[nextPage + 1] = !0 : (g.pageV[0] = !0, g.pageZ[0] = 3 + h + 1);
      else if (c.display == b.DISPLAY_DOUBLE) {
        for (d = 0; h > d; d++) {
          for (f = a.view(c.pageMv[d]), e = 0; e < f.length; e++) g.pageV[f[e]] = !0;
          g.pageZ[c.pageMv[d]] = 3 + h - d
        }
        for (d = 0; i > d; d++)
          for (f = a.view(c.front[d]), g.pageZ[c.front[d]] = 5 + h + d, e = 0; e < f.length; e++) g.pageV[f[e]] = !0
      }
    } else {
      for (f = this.view(!1, !0), d = 0; d < f.length; d++) g.pageV[f[d]] = !0, g.pageZ[f[d]] = 2;
      c.display == b.DISPLAY_SINGLE ? f[0] < c.totalPages && (c.pages[f[0]].hasClass("cover") ? c.pages[f[0] + 1] && !c.pages[f[0] + 1].hasClass("cover") && (g.pageV[f[0] + 1] = !0, g.pageZ[f[0] + 1] = 2) : (g.pageV[f[0] + 1] = !0, g.pageZ[f[0] + 1] = 1)) : c.display == b.DISPLAY_DOUBLE && (f[0] > 2 && (g.pageV[f[0] - 2] = !0, g.pageZ[f[0] - 2] = 1), f[1] < c.totalPages - 1 && (g.pageV[f[1] + 2] = !0, g.pageZ[f[1] + 2] = 1))
    }
    for (var k in c.pageWrap) b.has(k, c.pageWrap) && void 0 === g.pageV[k] && this._isCoverPageVisible(k) && (g.pageV[k] = !0, g.pageZ[k] = -1);
    return g
  }, n.prototype.update = function() {
    var c, d, e = this._data,
      f = this.calcVisiblePages();
    if (this.isAnimating() && 0 !== e.pageMv[0]) {
      var g = this.view(),
        h = this.view(e.tpage);
      d = "" === e.status ? e.options.hover : !1;
      for (c in e.pageWrap) b.has(c, e.pageWrap) && (e.pageWrap[c].css({
        display: (b.isFirefoxOrIE ? '' : (f.pageV[c] ? "" : "none")),
        visibility: (b.isFirefoxOrIE ? (f.pageV[c] ? "" : "hidden") : ''),
        zIndex: f.pageZ[c] || 0
      }), e.tpage ? e.pages[c].flip("hover", !1).flip("disable", -1 == a.inArray(parseInt(c, 10), e.pageMv) && c != h[0] && c != h[1]) : e.pages[c].flip("hover", d).flip("disable", c != g[0] && c != g[1]))
    } else {
      d = e.options.hover;
      for (c in e.pageWrap) b.has(c, e.pageWrap) && (e.pageWrap[c].css({
        display: (b.isFirefoxOrIE ? '' : (f.pageV[c] ? "" : "none")),
        visibility: (b.isFirefoxOrIE ? (f.pageV[c] ? "" : "hidden") : ''),
        zIndex: f.pageZ[c] || 0
      }), e.pages[c] && (e.pages[c].flip("disable", e.disabled || 2 != f.pageZ[c]).flip("hover", d), f.pageV[c] || (e.pages[c].data("f").visible = !1)))
    }
    return e.z = f, this.$el
  }, n.prototype._updateShadow = function() {}, n.prototype.options = function(c) {
    if (void 0 === c) return this._data.options;
    var d = this._data,
      e = d.options.swipe;
    if (a.extend(d.options, c), c.pages && this.pages(c.pages), c.page && this.page(c.page), (c.margin || c.pageMargin) && (this._calculateMargin(), this._resize()), c.display && this.display(c.display), c.direction && this.direction(c.direction), c.width && c.height && this.size(c.width, c.height), c.swipe === !0 && e ? this.$el.on("swipe", a.proxy(this, "_eventSwipe")) : c.swipe === !1 && this.$el.off("swipe", this._eventSwipe), c.cornerPosition) {
      var f = c.cornerPosition.split(" ");
      d.options.cornerPosition = b.point2D(parseInt(f[0], 10), parseInt(f[1], 10))
    }
    if (c.margin && this._resize.call(this), c.animatedAutoCenter === !0 ? this.$el.css(b.addCssWithPrefix({
        "@transition": "margin-left " + c.duration + "ms"
      })) : c.animatedAutoCenter === !1 && this.$el.css(b.addCssWithPrefix({
        "@transition": ""
      })), c.delegate)
      for (var g in c.delegate) b.has(g, c.delegate) && ("tap" == g || "doubletap" == g ? (this.$el.off(g, ".page"), this.$el.on(g, ".page", c.delegate[g])) : this.$el.off(g).on(g, c.delegate[g]));
    return this.$el
  }, n.prototype.version = function() {
    return version
  }, n.prototype._getDirectionStr = function(a) {
    return a == b.DIRECTION_LTR ? "ltr" : a == b.DIRECTION_RTL ? "rtl" : void 0
  }, n.prototype._getDirectionConst = function(a) {
    return "ltr" == a ? b.DIRECTION_LTR : "rtl" == a ? b.DIRECTION_RTL : void 0
  }, n.prototype.direction = function(a) {
    var c = this._data,
      d = this._getDirectionStr(c.direction);
    if (void 0 === a) return d;
    a = a.toLowerCase();
    var e = this._getDirectionConst(a);
    if (!e) throw b.turnError('"' + a + '" is not a value for direction');
    return "rtl" == a && this.$el.attr("dir", "ltr").css({
      direction: "ltr"
    }), c.direction = e, c.done && this.size(this.$el.width(), this.$el.height()), this.$el
  }, n.prototype.disabled = function(a) {
    return void 0 === a ? this._data.disabled === !0 : this.disable(a)
  }, n.prototype.viewSize = function() {
    var a = this.size();
    if (this.display() == b.DISPLAY_DOUBLE) {
      var c = this.view();
      c[0] && c[1] || (a.width = Math.floor(a.width / 2))
    }
    return a
  }, n.prototype.size = function(c, d, e) {
    if (void 0 === c || void 0 === d) return {
      width: this.$el.width(),
      height: this.$el.height()
    };
    var f, g, h, i = this._data,
      j = this.view();
    if (i.display == b.DISPLAY_DOUBLE ? (c = Math.floor(c), d = Math.floor(d), 1 == c % 2 && (c -= 1), h = Math.floor(c / 2)) : h = c, this.stop(), this.$el.css({
        width: c,
        height: d
      }), i.zoom > 1) {
      for (var k = {}, l = 0; l < j.length; l++) j[l] && (k[j[l]] = 1);
      for (f in i.pageWrap) b.has(f, i.pageWrap) && this._isCoverPageVisible(f) && (k[f] = 1);
      for (f in k) b.has(f, k) && (g = this._pageSize(f, !0), e || i.pageObjs[f].css({
        width: g.width,
        height: g.height
      }), i.pageWrap[f].css(g), i.pages[f] && (i.pages[f].flip("_restoreClip", !1, !0), i.pages[f].flip("resize", g.width, g.height)))
    } else
      for (f in i.pageWrap) b.has(f, i.pageWrap) && (g = this._pageSize(f, !0), e && -1 != a.inArray(parseInt(f, 10), j) || i.pageObjs[f].css({
        width: g.width,
        height: g.height
      }), i.pageWrap[f].css(g), i.pages[f] && (i.pages[f].flip("_restoreClip"), i.pages[f].flip("resize", g.width, g.height)));
    i.pages[0] && (i.pageWrap[0].css({
      left: -this.$el.width()
    }), i.pages[0].flip("resize")), this._updateShadow();
    var m = this,
      n = i.options;
    return n.autoCenter && (n.animatedAutoCenter && i.done ? (this.$el.css(b.addCssWithPrefix({
      "@transition": ""
    })), m.center(), setTimeout(function() {
      m.$el.css(b.addCssWithPrefix({
        "@transition": "margin-left " + n.duration + "ms"
      }))
    }, 0)) : this.center()), this.$el.css(this._position()), i.pages[0] && (f = i.pages[0].data("f").tPage, f && i.pageObjs[0].children().eq(0).css({
      width: i.pageObjs[i.page].width(),
      height: i.pageObjs[i.page].height()
    })), i.peel && this.peel(i.peel.corner, i.peel.x, i.peel.y, !1), this.flow(), this.$el
  }, n.prototype.stop = function() {
    var a, c, d = this._data;
    if (this.isAnimating()) {
      var e = d.display == b.DISPLAY_SINGLE;
      for (d.tpage && (d.page = d.tpage, delete d.tpage); d.pageMv.length > 0;)
        if (c = d.pages[d.pageMv[0]], a = c.data("f")) {
          var f = a.peel;
          a.peel = null, c.flip("hideFoldedPage"), a.peel = f, a.next = e ? a.page + 1 : d.options.showDoublePage ? 0 === a.page % 2 ? a.page + 1 : a.page - 1 : 0 === a.page % 2 ? a.page - 1 : a.page + 1, c.flip("_bringClipToFront", !1)
        }
      d.status = "", this.update()
    } else
      for (c in d.pages) b.has(c, d.pages) && d.pages[c].flip("_bringClipToFront", !1);
    return this.$el
  }, n.prototype._eventStart = function(c, d, e) {
    var f = this._data,
      g = a(c.target).data("f");
    return f.display == b.DISPLAY_SINGLE && e && (g.next = "l" == e.charAt(1) && f.direction == b.DIRECTION_LTR || "r" == e.charAt(1) && f.direction == b.DIRECTION_RTL ? g.next < g.page ? g.next : g.page - 1 : g.next > g.page ? g.next : g.page + 1), c.isDefaultPrevented() ? (this._updateShadow(), void 0) : (this._updateShadow(), void 0)
  }, n.prototype._eventPress = function(a) {
    var c = this._data;
    c.finger = b.eventPoint(a), c.hasSelection = "" === b.getSelectedText(), c.fingerZoom = c.zoom;
    for (var d in c.pages)
      if (b.has(d, c.pages) && c.pages[d].flip("_pagePress", a)) return c.tmpListeners || (c.tmpListeners = {}, c.tmpListeners.tap = b.getListeners(this.$el, "tap", !0), c.tmpListeners.doubleTap = b.getListeners(this.$el, "doubleTap", !0)), a.preventDefault(), c.statusHolding = !0, void 0;
    c.options.smartFlip && a.preventDefault()
  }, n.prototype._eventMove = function(d) {
    var e = this._data;
    for (var f in e.pages) b.has(f, e.pages) && e.pages[f].flip("_pageMove", d);
    if (e.finger) {
      var g = a.extend({}, e.finger);
      e.tmpListeners || (e.tmpListeners = {}, e.tmpListeners.tap = b.getListeners(this.$el, "tap", !0), e.tmpListeners.doubleTap = b.getListeners(this.$el, "doubleTap", !0)), e.finger = b.eventPoint(d), e.finger.prev = g, e.zoom > 1 && (!c || c && 1 == d.originalEvent.originalEvent.touches.length) && this.scroll(e.scroll.left + e.finger.x - g.x, e.scroll.top + e.finger.y - g.y)
    } else if (!c && e.zoom > 1 && e.options.autoScroll) {
      e.initScroll || (e.initScroll = this.scroll(), e.initCursor = b.eventPoint(d), e.viewerOffset = e.options.viewer.offset());
      var h = b.eventPoint(d),
        i = b.point2D(e.initScroll.x, e.initScroll.y),
        j = this.scrollSize();
      h.x < e.initCursor.x ? i.x = e.initScroll.left * Math.max(0, (h.x - e.viewerOffset.left - 20) / e.initCursor.x) : h.x > e.initCursor.x && (i.x = e.initScroll.left + (j.width - e.initScroll.left) * Math.min(1, (h.x - e.initCursor.x + 20) / (e.viewerWidth - e.initCursor.x))), h.y < e.initCursor.y ? i.y = e.initScroll.top * Math.max(0, (h.y - e.viewerOffset.top - 20) / e.initCursor.y) : h.y > e.initCursor.y && (i.y = e.initScroll.top + (j.height - e.initScroll.top) * Math.min(1, (h.y - e.initCursor.y + 20) / (e.viewerHeight - e.initCursor.y))), this.scroll(i.x, i.y)
    }
  }, n.prototype._eventRelease = function(a) {
    var c = this,
      d = this._data;
    if (setTimeout(function() {
        d.tmpListeners && (b.setListeners(c.$el, "tap", d.tmpListeners.tap), b.setListeners(c.$el, "doubleTap", d.tmpListeners.doubleTap), delete d.tmpListeners)
      }, 1), d.finger) {
      for (var e in d.pages) b.has(e, d.pages) && d.pages[e].flip("_pageUnpress", a);
      delete d.finger, delete d.fingerZoom, d.statusHolding && (d.statusHolding = !1, d.statusHover || this._hasMotionListener(!1)), d.zoomed && (this.zoom(d.zoomed[0], d.zoomed[1]), delete d.zoomed)
    }
  }, n.prototype._eventSwipe = function(c) {
    var d = this._data,
      e = "" === b.getSelectedText();
    if ("turning" != d.status && 1 == d.zoom && d.hasSelection == e)
      if (d.display == b.DISPLAY_SINGLE) {
        var f = d.page;
        if (c.speed < 0) {
          if (~a.inArray(d.corner, b.corners.forward)) this.next();
          else if (d.status = "swiped", d.pages[f].flip("hideFoldedPage", !0), f > 1) {
            var g = d.pages[f - 1].data("f").point;
            d.pages[f - 1].flip("turnPage", g ? g.corner : "")
          }
        } else c.speed > 0 && (~a.inArray(d.corner, b.corners.backward) ? this.previous() : (d.status = "swiped", d.pages[f].flip("hideFoldedPage", !0)))
      } else d.display == b.DISPLAY_DOUBLE && (c.speed < 0 ? this.isAnimating() ? ~a.inArray(d.corner, b.corners.forward) && this.next() : this.next() : c.speed > 0 && (this.isAnimating() ? ~a.inArray(d.corner, b.corners.backward) && this.previous() : this.previous()))
  }, n.prototype._eventHover = function() {
    var a = this._data;
    clearInterval(a.noHoverTimer), a.statusHover = !0, this._hasMotionListener(!0)
  }, n.prototype._eventNoHover = function(a) {
    var b = this,
      c = this._data;
    c.noHoverTimer = setTimeout(function() {
      c.statusHolding || (b._eventMove(a), b._hasMotionListener(!1)), delete c.noHoverTimer, c.statusHover = !1
    }, 10)
  }, n.prototype._hasMotionListener = function(b) {
    var c = this._data;
    b ? c.hasMoveListener || (a(document).on("vmousemove", a.proxy(this, "_eventMove")).on("vmouseup", a.proxy(this, "_eventRelease")), c.hasMoveListener = !0) : c.hasMoveListener && (a(document).off("vmousemove", this._eventMove).off("vmouseup", this._eventRelease), c.hasMoveListener = !1)
  }, n.prototype.focusPoint = function() {
    var a = this._data;
    if (a.focusPoint) return a.focusPoint;
    var c = this.view();
    return c[0] ? c[1] ? b.point2D(this.width() / 2, this.height() / 2) : b.point2D(3 * this.width() / 4, this.height() / 2) : b.point2D(this.width() / 4, this.height() / 2)
  }, n.prototype.maxZoom = function() {
    var a = this._data;
    if (a.options.responsive) {
      if ("string" == typeof a.options.width && ~a.options.width.indexOf("%")) return 1;
      var c = a.viewerWidth - a.margin[1] - a.margin[3],
        d = a.viewerHeight - a.margin[0] - a.margin[2];
      return a.options.width / b.calculateBounds({
        width: a.options.width,
        height: a.options.height,
        boundWidth: Math.min(a.options.width, c),
        boundHeight: Math.min(a.options.height, d)
      }).width
    }
    return a.options.zoom
  }, n.prototype.zoomIn = function(a) {
    return this._data, this.zoom(this.maxZoom(), a)
  }, n.prototype.zoomOut = function(a) {
    return this.zoom(1, a)
  }, n.prototype._halfWidth = function() {
    var a = this._data,
      c = this.view();
    return a.display == b.DISPLAY_DOUBLE && a.options.autoCenter && (!c[0] || !c[1])
  }, n.prototype.scrollSize = function() {
    var a = this._data,
      b = this.size(),
      c = this._halfWidth() ? b.width / 2 : b.width;
    return {
      width: Math.max(0, c - a.viewerWidth),
      height: Math.max(0, b.height - a.viewerHeight)
    }
  }, n.prototype.scroll = function(a, c) {
    var d = this._data;
    if (void 0 === c && void 0 === a) return d.scroll;
    if (d.zoom > 1 && !d.silentZoom) {
      var e = this.size();
      this.view();
      var f = this.scrollSize(),
        g = b.point2D(d.viewerWidth / 2 - e.width / 2, d.viewerHeight / 2 - e.height / 2);
      c = Math.min(f.height, Math.max(0, c)), a = Math.min(f.width, Math.max(0, a)), this._trigger("scrolling", a, c) != b.EVENT_PREVENTED && (g.x = g.x + f.width / 2 - a, g.y = g.y + f.height / 2 - c, this.$el.css({
        left: g.x,
        top: g.y
      }), d.scroll = {
        top: c,
        left: a
      })
    }
    return this.$el
  }, n.prototype._mouseRel = function(a) {
    var c = this.$el.offset(),
      d = this._data,
      e = this.size(),
      f = b.point2D(a.pageX - c.left, a.pageY - c.top);
    if (d.display == b.DISPLAY_DOUBLE) {
      var g = this.view();
      if (g[0]) {
        if (g[1]) {
          if (f.x < 0 || f.x > e.width) return null
        } else if (f.x = f.x, f.x < 0 || f.x > e.width / 2) return null
      } else if (f.x = f.x - e.width / 2, f.x < 0 || f.x > e.width / 2) return null
    } else if (d.display == b.DISPLAY_SINGLE && (f.x < 0 || f.x > e.width)) return null;
    return f
  }, n.prototype.zoom = function(c, d) {
    var e = this._data;
    if (void 0 === c) return e.zoom;
    d = d || {};
    var f = this.size(),
      g = this._halfWidth();
    if ("pageX" in d && "pageY" in d) {
      var h = this._mouseRel(d);
      if (null === h) return this.$el;
      d = a.extend(d, h), "factor" in d && (c = d.factor * e.fingerZoom, d.animate = !1)
    } else "x" in d && "y" in d || (d.x = g ? f.width / 4 : f.width / 2, d.y = f.height / 2);
    if (e.silentZoom || this._trigger("willZoom", c, e.zoom) != b.EVENT_PREVENTED) {
      var i, j = this,
        k = e.zoom;
      e.options.viewer;
      var l = this.view(),
        m = parseFloat(Math.min(this.maxZoom(), Math.max(.1, c)), 10),
        n = this._position(m);
      b.vendor + "transition";
      var o = void 0 === d.animate ? !0 : d.animate,
        p = this.$el.offset(),
        q = e.options.viewer.offset(),
        r = this._size(m, !0),
        s = 1 / e.zoom * m,
        t = e.display == b.DISPLAY_DOUBLE && e.options.autoCenter,
        u = b.point2D(Math.max(0, r.width - e.viewerWidth), Math.max(0, r.height - e.viewerHeight)),
        v = b.point2D(d.x * s - p.left - d.x, d.y * s - p.top - d.y);
      t && !l[0] && (v.x = v.x - f.width / 2), v = b.point2D(Math.min(u.x, Math.max(0, v.x)), Math.min(u.y, Math.max(0, v.y))), g && (n.left += r.width / 2);
      var w = b.point2D(q.left - p.left + Math.max(0, n.left), q.top - p.top + Math.max(0, n.top));
      t && !l[0] && (w.x -= r.width);
      var x = b.translate(w.x - v.x, w.y - v.y, !0) + b.scale(m, m, !0);
      if (this.stop(), this.disable(!0), this._cloneView(!0), o) {
        if (k > m)
          for (i in e.pageWrap) e.pageWrap[i].css({
            visibility: "hidden"
          });
        e.silentZoom = !0;
        var y = f.width / e.zoomer.width();
        e.zoomer.css(b.addCssWithPrefix({
          "@transform-origin": "0% 0%",
          "@transform": b.scale(y, y, !0)
        })), setTimeout(function() {
          e.zoomer.css(b.addCssWithPrefix({
            "@transition": "@transform 500ms ease-in-out",
            "@transform": x
          }))
        }, 10), b.getTransitionEnd(e.zoomer, function() {
          e.finger || j.zoom(c, {
            animate: !1,
            x: d.x,
            y: d.y
          })
        })
      } else {
        var z = e.peel;
        if (e.zoomer.css(b.addCssWithPrefix({
            "@transition": "",
            "@transform-origin": "0% 0%",
            "@transform": x
          })), "factor" in d) {
          if (k > m)
            for (i in e.pageWrap) e.pageWrap[i].css({
              visibility: "hidden"
            });
          e.zoomed = [c, {
            pageX: d.pageX,
            pageY: d.pageY,
            animate: !1
          }]
        } else {
          for (i in e.pageWrap) e.pageWrap[i].css({
            visibility: ""
          });
          e.zoom = c, r = this._defaultSize(), r.width = r.width * m, r.height = r.height * m, e.zoom = m, e.silentZoom = !1, delete e.initScroll, delete e.initCursor, e.peel = null, this.display(r.display), this.size(r.width, r.height, e.options.autoScaleContent), this.scroll(v.x, v.y), 1 == m ? (this.disable(!1), z && this.peel(z.corner, z.x, z.y, !0)) : e.peel = z, e.options.autoScaleContent && this.scaleContent(m), e.zoomer.css(b.addCssWithPrefix({
            "@transform": b.translate(-1e4, 0, !0)
          })), this.$el.trigger("zoomed", [m, k])
        }
      }
    }
    return this.$el
  }, n.prototype.scaleContent = function(a) {
    for (var b = this._data, c = this.view(), d = 0; d < c.length; d++) c[d] && b.pageObjs[c[d]].transform("scale(" + a + ")", "0% 0%")
  }, n.prototype._position = function(a) {
    var b = this._data,
      c = a || b.zoom,
      d = a ? this._size(a) : this.size(),
      e = {
        top: 0,
        left: 0
      };
    if (b.options.responsive && (e.top = b.viewerHeight / 2 - d.height / 2, e.left = b.viewerWidth / 2 - d.width / 2, 1 == c)) {
      var f = b.margin;
      (e.top < f[0] || e.top + d.height > b.viewerHeight - f[2]) && (e.top = f[0]), (e.left < f[1] || e.left + d.width > b.viewerWidth - f[3]) && (e.left = f[3])
    }
    return e
  }, n.prototype.toggleZoom = function(a) {
    var b = this._data;
    1 == b.zoom ? this.zoomIn(a) : this.zoomOut(a)
  }, n.prototype._cloneView = function(c) {
    var d = this._data;
    if (d.zoomer) c ? d.zoomer.show() : (d.zoomer.remove(), delete d.zoomer);
    else if (c) {
      var e, f, g, h = this.view(),
        i = {},
        j = a("<div />");
      j.css(b.addCssWithPrefix({
        "@transform-origin": "0% 0%"
      })), j.css({
        position: "absolute",
        top: 0,
        left: 0,
        "z-index": 10,
        width: this.$el.width(),
        height: this.$el.height()
      });
      for (var k = 0; k < h.length; k++) h[k] && (i[h[k]] = 1);
      for (g in d.pageWrap) b.has(g, d.pageWrap) && this._isCoverPageVisible(g) && (i[g] = 1);
      for (g in i) b.has(g, i) && (e = this._pageSize(g, !0), e.position = "absolute", e.zIndex = d.pageWrap[g].css("z-index"), f = d.pageObjs[g].clone(), f.css(e), f.appendTo(j));
      j.appendTo(this.$el), d.zoomer = j
    }
  }, q.prototype._pageCURL = function(a) {
    var c, d, e, f, g, h, i, j, k, l, m, n, q, r = this.$el.data("f"),
      s = r.turnData,
      t = this.$el.width(),
      u = this.$el.height(),
      v = this,
      w = 0,
      x = b.point2D(0, 0),
      y = b.point2D(0, 0),
      z = b.point2D(0, 0),
      A = (this._foldingPage(), s.options.acceleration),
      B = r.clip.height(),
      C = function() {
        c = v._startPoint(a.corner);
        var j, k = t - c.x - a.x,
          l = c.y - a.y,
          m = Math.atan2(l, k),
          n = Math.sqrt(k * k + l * l),
          q = b.point2D(t - c.x - Math.cos(m) * t, c.y - Math.sin(m) * t);
        n > t && (a.x = q.x, a.y = q.y);
        var r = b.point2D(0, 0),
          A = b.point2D(0, 0);
        if (r.x = c.x ? c.x - a.x : a.x, r.y = b.hasRotation ? c.y ? c.y - a.y : a.y : 0, A.x = e ? t - r.x / 2 : a.x + r.x / 2, A.y = r.y / 2, m = o - Math.atan2(r.y, r.x), j = m - Math.atan2(A.y, A.x), n = Math.sin(j) * Math.sqrt(A.x * A.x + A.y * A.y), z = b.point2D(n * Math.sin(m), n * Math.cos(m)), m > o) {
          if (z.x = z.x + Math.abs(z.y * r.y / r.x), z.y = 0, Math.round(z.x * Math.tan(p - m)) < u) return a.y = Math.sqrt(Math.pow(u, 2) + 2 * A.x * r.x), d && (a.y = u - a.y), C();
          var D = p - m,
            E = B - u / Math.sin(D);
          x = b.point2D(Math.round(E * Math.cos(D)), Math.round(E * Math.sin(D))), e && (x.x = -x.x), d && (x.y = -x.y)
        }
        w = Math.round(100 * b.deg(m)) / 100, f = Math.round(z.y / Math.tan(m) + z.x);
        var F = t - f,
          G = Math.min(u, F * Math.tan(m));
        0 > G && (G = u);
        var H = F * Math.cos(2 * m),
          I = F * Math.sin(2 * m);
        if (y = b.point2D(Math.round(e ? F - H : f + H), Math.round(d ? I : u - I)), s.options.gradients) {
          var J = v._endPoint(a.corner);
          i = Math.sqrt(Math.pow(J.x - a.x, 2) + Math.pow(J.y - a.y, 2)) / t, g = Math.min(100, F * Math.sin(m)), h = 1.3 * Math.min(F, G)
        }
        return z.x = Math.round(z.x), z.y = Math.round(z.y), !0
      },
      D = function(a, c, j, k) {
        var l = ["0", "auto"],
          m = (t - B) * j[0] / 100,
          n = (u - B) * j[1] / 100,
          o = {
            left: l[c[0]],
            top: l[c[1]],
            right: l[c[2]],
            bottom: l[c[3]]
          },
          p = 90 != k && -90 != k ? e ? -1 : 1 : 0,
          q = j[0] + "% " + j[1] + "%",
          v = s.pages[r.over].data("f"),
          w = r.clip.parent().position().left - s.pageWrap[r.over].position().left;
        if (r.ipage.css(o).transform(b.rotate(k) + b.translate(a.x + p, a.y, A), q), v.ipage.css(o).transform(b.rotate(k) + b.translate(a.x + y.x - x.x - t * j[0] / 100, a.y + y.y - x.y - u * j[1] / 100, A) + b.rotate(Math.round(100 * (180 / k - 2) * k) / 100), q), r.clip.transform(b.translate(-a.x + m - p, -a.y + n, A) + b.rotate(-k), q), v.clip.transform(b.translate(w - a.x + x.x + m, -a.y + x.y + n, A) + b.rotate(-k), q), s.options.gradients) {
          var z, C, D;
          d ? e ? (C = k - 90, D = f - 50, g = -g, z = "50% 25%") : (C = k - 270, D = t - f - 50, z = "50% 25%") : e ? (D = f - 50, C = k - 270, g = -g, z = "50% 75%") : (D = t - f - 50, C = k - 90, z = "50% 75%");
          var E = Math.max(.5, 2 - i);
          E > 1 && (E = E >= 1.7 ? (2 - E) / .3 : 1), v.igradient.css({
            opacity: Math.round(100 * E) / 100
          }).transform(b.translate(D, 0, A) + b.rotate(C) + b.scale(g / 100, 1, A), z), d ? e ? (C = -270 - k, h = -h, D = t - f - 20, z = "20% 25%") : (C = -90 - k, D = f - 20, z = "20% 25%") : e ? (C = -90 - k, D = t - f - 20, h = -h, z = "20% 75%") : (C = 90 - k, D = f - 20, z = "20% 75%"), E = .3 > i ? i / .3 : 1, r.ogradient.css({
            opacity: Math.round(100 * E) / 100
          }).transform(b.translate(D, 0, A) + b.rotate(C) + b.scale(-h / 100, 1, A), z)
        }
      };
    switch (r.point = b.peelingPoint(a.corner, a.x, a.y), a.corner) {
      case "l":
        m = a.y - r.startPoint.y, n = a.x, q = Math.atan2(m, n), q > 0 ? (j = r.startPoint.y, k = Math.sqrt(n * n + m * m), l = 2 * j * Math.sin(q) + k, a.x = l * Math.cos(q), a.y = l * Math.sin(q), a.corner = "tl", e = !0, d = !0, C(), D(z, [1, 0, 0, 1], [100, 0], w)) : (q = -q, j = u - r.startPoint.y, k = Math.sqrt(n * n + m * m), l = 2 * j * Math.cos(o - q) + k, a.x = l * Math.cos(q), a.y = u - l * Math.sin(q), a.corner = "bl", e = !0, C(), D(b.point2D(z.x, -z.y), [1, 1, 0, 0], [100, 100], -w));
        break;
      case "r":
        m = r.startPoint.y - a.y, n = t - a.x, q = Math.atan2(m, n), 0 > q ? (j = r.startPoint.y, q = -q, k = Math.sqrt(n * n + m * m), l = 2 * j * Math.sin(q) + k, a.x = t - l * Math.cos(q), a.y = l * Math.sin(q), a.corner = "tr", d = !0, C(), D(b.point2D(-z.x, z.y), [0, 0, 0, 1], [0, 0], -w)) : (j = u - r.startPoint.y, k = Math.sqrt(n * n + m * m), l = 2 * j * Math.cos(o - q) + k, a.x = t - l * Math.cos(q), a.y = u - l * Math.sin(q), a.corner = "br", C(), D(b.point2D(-z.x, -z.y), [0, 1, 1, 0], [0, 100], w));
        break;
      case "tl":
        d = !0, e = !0, a.x = Math.max(a.x, 1), r.point.x = a.x, c = this._startPoint("tl"), C(), D(z, [1, 0, 0, 1], [100, 0], w);
        break;
      case "tr":
        d = !0, a.x = Math.min(a.x, t - 1), r.point.x = a.x, C(), D(b.point2D(-z.x, z.y), [0, 0, 0, 1], [0, 0], -w);
        break;
      case "bl":
        e = !0, a.x = Math.max(a.x, 1), r.point.x = a.x, C(), D(b.point2D(z.x, -z.y), [1, 1, 0, 0], [100, 100], -w);
        break;
      case "br":
        a.x = Math.min(a.x, t - 1), r.point.x = a.x, C(), D(b.point2D(-z.x, -z.y), [0, 1, 1, 0], [0, 100], w)
    }
  }, q.prototype._hardSingle = function(a) {
    var c, d = this.$el.data("f"),
      e = d.turnData;
    c = this.$el.hasClass("cover") ? d.next : 0;
    var f = d.page,
      g = e.pages[c].data("f"),
      h = this.$el.width();
    this.$el.height();
    var i = ("l" == a.corner, this._startPoint(a.corner)),
      j = e.totalPages,
      k = d["z-index"] || j,
      l = i.x ? (i.x - a.x) / h : a.x / h,
      m = 90 * -l,
      n = 180 + m,
      o = 1 > l;
    console.log(a.corner), d.ipage.css(b.addCssWithPrefix({
      "@transform": "rotateY(" + m + "deg) translate3d(0px, 0px, " + (this.$el.attr("depth") || 0) + "px)",
      "@transform-origin": "0% 50%"
    })), e.pageWrap[f].css(b.addCssWithPrefix({
      overflow: "visible",
      "@perspective-origin": "0% 50%"
    })), g.ipage.css(b.addCssWithPrefix({
      "@transform": "rotateY(" + n + "deg)",
      "@transform-origin": "100% 50%"
    })), e.pageWrap[c].css(b.addCssWithPrefix({
      overflow: "visible",
      "@perspective-origin": "100% 50%"
    })), o ? (l = -l + 1, d.ipage.css({
      zIndex: k + 1
    }), g.ipage.css({
      zIndex: k
    })) : (l -= 1, d.ipage.css({
      zIndex: k
    }), g.ipage.css({
      zIndex: k + 1
    })), d.point = b.peelingPoint(a.corner, a.x, a.y)
  }, q.prototype._hardDouble = function(a) {
    var c = this.$el.data("f"),
      d = c.turnData,
      e = this.$el.width();
    this.$el.height();
    var f, g, h, i, j, k, l, m = "l" == a.corner,
      n = this._startPoint(a.corner),
      o = d.totalPages,
      p = c["z-index"] || o,
      q = {
        overflow: "visible"
      };
    a.x = m ? Math.min(Math.max(a.x, 0), 2 * e) : Math.max(Math.min(a.x, e), -e);
    var r = n.x ? (n.x - a.x) / e : a.x / e,
      s = 90 * r,
      t = 90 > s,
      u = c.next,
      v = d.pages[u].data("f");
    if (m ? (i = "0% 50%", j = "100% 50%", t ? (f = 0, k = c.next - 1, g = k > 0, l = c.page, h = 1) : (f = "100%", k = c.page + 1, g = o > k, l = c.next, h = 0)) : (i = "100% 50%", j = "0% 50%", s = -s, e = -e, t ? (f = 0, k = c.next + 1, l = c.page, g = o > k, h = 0) : (f = "-100%", k = c.page - 1, l = c.next, g = k > 0, h = 1)), q[b.vendor + "perspective-origin"] = j, d.pageWrap[c.page].css(q), c.ipage.transform("rotateY(" + s + "deg)" + "translate3d(0px, 0px, " + (this.$el.attr("depth") || 0) + "px)", j), d.pageWrap[u].css(b.addCssWithPrefix({
        overflow: "visible",
        "@perspective-origin": i
      })), v.ipage.transform("rotateY(" + (180 + s) + "deg)", i), t ? (r = -r + 1, c.ipage.css({
        zIndex: p + 1
      }), v.ipage.css({
        zIndex: p
      })) : (r -= 1, c.ipage.css({
        zIndex: p
      }), v.ipage.css({
        zIndex: p + 1
      })), d.options.gradients) {
      if (g) {
        var w = d.pages[k].data("f");
        c.ogradient.parent()[0] != w.ipage[0] && c.ogradient.appendTo(w.ipage), c.ogradient.css({
          left: f,
          backgroundColor: "black",
          opacity: .5 * r
        }).transform("rotateY(0deg)")
      } else c.ogradient.css({
        opacity: 0
      });
      var x = d.pages[l].data("f");
      c.igradient.parent()[0] != x.ipage[0] && c.igradient.appendTo(x.ipage), c.igradient.css({
        opacity: -r + 1
      }), b.gradient(c.igradient, b.point2D(100 * h, 0), b.point2D(100 * (-h + 1), 0), [
        [0, "rgba(0,0,0,0.3)"],
        [1, "rgba(0,0,0,0)"]
      ], 2)
    }
    c.point = b.peelingPoint(a.corner, a.x, a.y)
  }, q.prototype._hard = function(a) {
    this.$el.data("f").turnData.display == b.DISPLAY_SINGLE ? this._hardSingle(a) : this._hardDouble(a)
  }, b.widgetFactory("turn", n), b.widgetFactory("flip", q);
  var r = b.UIComponent(function(c) {
    var d = this._data;
    d.options = a.extend({
      min: 0,
      max: 100,
      step: 1,
      value: 0,
      style: "horizontal"
    }, c), d.disabled = c.disabled === !0, "vertical" == d.options.style ? d.verticalStyle = !0 : "horizontal" == d.options.style && (d.verticalStyle = !1), this.$el.on("vmousedown", a.proxy(this, "_eventPress")), this.value(this._data.options.value), b.addDelegateList(c.delegate, this.$el)
  });
  r.prototype.value = function(a, c) {
    var d = this._data;
    if (void 0 === a) return d.value;
    var e;
    if (a = Math.min(d.options.max, Math.max(d.options.min, a)), a = Math.round(a / d.options.step), a *= d.options.step, d.pressed) a != d.pvalue && (c || this._trigger("slide", a) != b.EVENT_PREVENTED) && (e = 100 * ((a - d.options.min) / (d.options.max - d.options.min)), d.verticalStyle ? this.$el.find(".progress").height(e + "%") : this.$el.find(".progress").width(e + "%"), d.pvalue = a);
    else if (a != d.value) {
      var f = c ? !0 : this._trigger("changeValue", a) != b.EVENT_PREVENTED;
      f ? (e = 100 * ((a - d.options.min) / (d.options.max - d.options.min)), d.value = a) : e = 100 * ((d.value - d.options.min) / (d.options.max - d.options.min)), d.verticalStyle ? this.$el.find(".progress").height(e + "%") : this.$el.find(".progress").width(e + "%")
    } else c || this._trigger("valueUnchanged");
    return this.$el
  }, r.prototype._percentToValue = function(a) {
    var b = this._data;
    return a * (b.options.max - b.options.min) + b.options.min
  }, r.prototype._eventPress = function(c) {
    var d, e, f = this._data,
      g = this.$el.find(".progress").parent();
    f.pressed = !0, f.pvalue = null, f.verticalStyle ? (d = b.eventPoint(c).y - g.offset().top, this.$el.addClass("changing"), e = g.height()) : (d = b.eventPoint(c).x - g.offset().left, this.$el.addClass("changing"), e = g.width()), this.value(this._percentToValue(d / e)), a(document).on("vmousemove", a.proxy(this, "_eventMoving")), a(document).on("vmouseup", a.proxy(this, "_eventRelease")), c.preventDefault()
  }, r.prototype._eventMoving = function(a) {
    var c, d = this._data;
    if (d.pressed && !d.disabled) {
      var e = this.$el.find(".progress").parent();
      if (d.verticalStyle ? (d.offset = b.eventPoint(a).y - e.offset().top, c = e.height()) : (d.offset = b.eventPoint(a).x - e.offset().left, c = e.width()), !d.animationScheduled) {
        var f = this;
        d.animationScheduled = !0, window.requestAnimationFrame(function() {
          d.animationScheduled = !1, f.value(f._percentToValue(d.offset / c))
        })
      }
    }
  }, r.prototype._eventRelease = function() {
    var b = this._data;
    b.pressed = !1, this._trigger("released"), b.pvalue ? this.value(b.pvalue) : this._trigger("valueUnchanged"), b.pvalue = null, this.$el.removeClass("changing"), a(document).off("vmousemove", this._eventMoving), a(document).off("vmouseup", this._eventRelease)
  }, r.prototype.options = function(b) {
    var c = this._data;
    return void 0 === b ? c.options : (c.options = a.extend(c.options, b), void 0)
  }, r.prototype.increase = function() {
    var a = this._data;
    this.value(a.value + a.options.step)
  }, r.prototype.decrease = function() {
    var a = this._data;
    this.value(a.value - a.options.step)
  }, r.prototype.style = function(a) {
    var b = this._data,
      c = b.value;
    "vertical" == a ? (this.$el.find(".progress").css({
      width: ""
    }), b.verticalStyle = !0) : "horizontal" == a && (this.$el.find(".progress").css({
      height: ""
    }), b.verticalStyle = !1), b.value = null, this.value(c, !0)
  }, r.prototype.disable = function(a) {
    this._data.disabled = a === !0
  }, r.prototype.isUserInteracting = function() {
    return this._data.pressed === !0
  }, b.widgetFactory("slider", r);
  var s = b.UIComponent(function(c) {
    if (!c.flipbook) throw b.turnError("Miniatures: Flipbook required");
    var d = this._data;
    d.pages = [], d.reusablePages = [], d.listenToFlipbook = !0, d.focusedPage = 0, d.offsetX = 0, d.hasListeners = !1, d.options = a.extend({
      pageMargin: 10,
      duration: 500
    }, c), d.$flipbook = a(c.flipbook), d.$container = a("<div />", {
      "class": "container"
    }), d.$pageNumber = a("<div />", {
      "class": "page-number"
    }), d.$container.appendTo(this.$el), d.$pageNumber.appendTo(this.$el), b.addDelegateList(c.delegate, this.$el), this._setValues(), d.disabled = c.disabled, this._addMiniature(), this._update(d.$flipbook.turn("page")), this._eventDelegation(), d.$flipbook.on("turned", a.proxy(this, "_eventPageTurned")), d.$flipbook.on("changeDisplay", a.proxy(this, "_eventChangeDisplay")), d.done = !0
  });
  s.prototype._addMiniature = function(b) {
    b = b || -1e3;
    var c = this._data,
      d = a("<div />", {
        css: {
          position: "absolute",
          left: "0px",
          top: "0px",
          width: c.pageWidth,
          height: c.pageHeight
        },
        "class": "ui-page"
      }).html('<div class="page-img"></div>'),
      e = {
        pageNum: null,
        x: b,
        $el: d
      };
    return c.$container.append(d), c.pages.push(e), e
  }, s.prototype._findPage = function(a) {
    for (var b = this._data, c = 0; c < b.pages.length; c++)
      if (b.pages[c].pageNum == a) return b.pages[c];
    return null
  }, s.prototype._update = function(a, b) {
    var c, d, e = this._data,
      f = a - 1,
      g = !0;
    if (!(e.focusedPage == a && e.done && !b || 1 > a || a > e.$flipbook.turn("pages") || (e.prevFocusedPage = e.focusedPage, e.focusedPage = a, e.disabled))) {
      for (e.focusedView = e.$flipbook.turn("view", e.focusedPage, !0), this._updateQueueReusablePages(), e.$pageNumber.html(e.focusedView.join("-")); this._isPageVisible(f);) c = this._findPage(f) || this._reusablePage(), null === c && (c = this._addMiniature()), this._updatePage(f, c, !0), f--, g = !1;
      for (f = a;
        (d = this._isPageVisible(f)) || g && f <= e.totalPages;) d && (c = this._findPage(f) || this._reusablePage(), null === c && (c = this._addMiniature()), this._updatePage(f, c, !0), g = !1), f++
    }
  }, s.prototype._updateQueueReusablePages = function() {
    for (var a, b = this._data, c = 0; c < b.pages.length; c++) a = b.pages[c], null !== a.pageNum && this._isPageVisible(a.pageNum, b.focusedPage) || (this._updatePage(a.pageNum, a, !0), this._isReusablePage(a) || b.reusablePages.push(a))
  }, s.prototype._isReusablePage = function(a) {
    for (var b = this._data, c = 0; c < b.reusablePages.length; c++)
      if (a == b.reusablePages[c]) return !0;
    return !1
  }, s.prototype._updatePage = function(b, c, d) {
    var e = this,
      f = this._data,
      g = c.$el;
    if (null === b) this._updatePageX(c, -1e3);
    else {
      var h = this._getPageOffsetLeft(b);
      d && b != c.pageNum ? (g.removeClass("animated-page"), this._updatePageX(c, this._getPageOffsetLeft(b, f.prevFocusedPage)), setTimeout(function() {
        g.addClass("animated-page"), e._updatePageX(c, h)
      }, 0)) : (d && f.done ? g.addClass("animated-page") : g.removeClass("animated-page"), this._updatePageX(c, h)), -1 != a.inArray(b, f.focusedView) ? g.addClass("focused-page") : g.removeClass("focused-page");
      var i = f.$flipbook.turn("view", b, !0);
      g.removeClass("left-page right-page single-page"), 2 == i.length ? i[0] == b ? g.addClass("left-page") : g.addClass("right-page") : g.addClass("single-page"), b != c.pageNum && (c.pageNum = b, g.attr("page", b), this._trigger("refreshPicture", b, g.find(".page-img")))
    }
  }, s.prototype._updatePageX = function(a, c) {
    a.x = c, a.$el.css(b.addCssWithPrefix({
      "@transform": "translate3d(" + c + "px, 0px, 0px)"
    }))
  }, s.prototype._getPageOffsetLeft = function(a, b) {
    var c, d, e = this._data,
      f = "single" == e.$flipbook.turn("display");
    if (b = b || e.focusedPage, f) return e.scrollerWidth / 2 - e.pageWidth / 2 + (a - b) * (e.pageWidth + e.pageMargin) + e.offsetX;
    var g, h, i = e.$flipbook.turn("view", b, !0),
      j = b == a ? i : e.$flipbook.turn("view", a, !0),
      k = e.scrollerWidth / 2 - i.length * e.pageWidth / 2;
    if (a >= b) {
      for (g = i[i.length - 1], h = j[0] - 1, c = g; h >= c;) d = e.$flipbook.turn("view", c, !0), k += d.length * e.pageWidth + e.pageMargin, c = d[d.length - 1] + 1;
      return a == j[0] ? k + e.offsetX : k + e.pageWidth + e.offsetX
    }
    for (g = i[0] - 1, h = j[j.length - 1], c = g; c >= h;) d = e.$flipbook.turn("view", c, !0), k -= d.length * e.pageWidth + e.pageMargin, c = d[0] - 1;
    return a == j[0] ? k + e.offsetX : k + e.pageWidth + e.offsetX
  }, s.prototype._isPageVisible = function(a) {
    var b = this._data;
    if (null === a || 1 > a || a > b.totalPages) return !1;
    var c = b.focusedPage,
      d = this._getPageOffsetLeft(a);
    return a > c ? d < b.scrollerWidth : d + b.pageWidth > 0
  }, s.prototype._reusablePage = function() {
    return this._data.reusablePages.length > 2 ? this._data.reusablePages.shift() : null
  }, s.prototype._setValues = function() {
    var a = this._data;
    if (!a.disabled) {
      var b = a.$flipbook.turn("size");
      b.width = b.width / a.$flipbook.turn("view").length, a.scrollerWidth = a.$container.width(), a.pageHeight = a.$container.height(), a.pageWidth = Math.round(a.pageHeight * (b.width / b.height)), a.pageMargin = 50, a.totalPages = a.$flipbook.turn("pages")
    }
  }, s.prototype._eventResize = function() {
    this.refresh()
  }, s.prototype._eventDelegation = function(b) {
    var c = this._data;
    b ? c.disabled || c.hasListeners || (c.hasListeners = !0, a(window).on("resize", a.proxy(this, "_eventResize")), this.$el.on("tap", ".ui-page", a.proxy(this, "_eventTap")), this.$el.on("vmousedown", a.proxy(this, "_eventPress"))) : (c.hasListeners = !1, a(window).off("resize", this._eventResize), this.$el.off("tap", this._eventTap), this.$el.off("vmousedown", this._eventPress))
  }, s.prototype._eventPageTurned = function(a, b) {
    var c = this._data;
    c.listenToFlipbook && (c.offsetX = 0, this._update(b))
  }, s.prototype._eventChangeDisplay = function() {
    this._data.forceRefresh = !0
  }, s.prototype._eventTap = function(b) {
    var c, d = this._data,
      e = a(b.currentTarget);
    !d.moving && (c = e.attr("page")) && d.$flipbook.turn("page", c)
  }, s.prototype._eventPress = function(b) {
    var c = this._data;
    return this.animation && this.animation.stop(), a(document).on("vmousemove", a.proxy(this, "_eventMove")).on("vmouseup", a.proxy(this, "_eventRelease")), c.x1 = b.pageX, c.x2 = c.x1, c.dxDistance = 0, c.timeStamp1 = b.timeStamp, c.timeStamp2 = b.timeStamp, !1
  }, s.prototype._eventMove = function(a) {
    var b = this._data;
    b.offsetX = b.offsetX + b.x2 - b.x1, b.done = !1, this._update(b.focusedPage, !0), b.done = !0, b.moving = !0, b.x1 = b.x2, b.x2 = a.pageX, b.timeStamp1 = b.timeStamp2, b.timeStamp2 = a.timeStamp
  }, s.prototype._eventRelease = function() {
    var c = this._data;
    if (a(document).off("vmousemove", this._eventMove).off("vmouseup", this._eventRelease), c.moving) {
      var d = c.offsetX;
      c.offsetX = 0;
      var e = this._getPageOffsetLeft(1, 1),
        f = this._getPageOffsetLeft(c.$flipbook.turn("pages"), 1),
        g = this._getPageOffsetLeft(c.focusedPage, 1),
        h = g - d;
      if (e > h) c.offsetX = g - e, this._update(c.focusedPage, !0);
      else if (h > f) c.offsetX = g - f, this._update(c.focusedPage, !0);
      else {
        var i = this,
          j = c.timeStamp2 - c.timeStamp1,
          k = c.x2 - c.x1,
          l = this._momentum(k, j, g - e - d, g - f - d, 1);
        c.offsetX = d, b.animate(this, {
          from: [0],
          to: [l.dist],
          duration: l.time,
          frame: function(a) {
            c.offsetX = d + a[0], c.done = !1, i._update(c.focusedPage, !0), c.done = !0
          }
        })
      }
    }
    setTimeout(function() {
      c.moving = !1
    }, 1)
  }, s.prototype.page = function(a) {
    this.animation && this.animation.stop();
    var b = this._data;
    return b.offsetX = 0, this._update(a), b.forceRefresh = !1, this.$el
  }, s.prototype.refresh = function() {
    var a = this._data;
    return a.done = !1, this._setValues(), this._update(a.focusedPage || a.$flipbook.turn("page"), !0), a.done = !0, a.forceRefresh = !1, this.$el
  }, s.prototype.disable = function(a) {
    var b = this._data;
    return b.disabled = a === !0, b.disabled ? this._eventDelegation(!1) : this._eventDelegation(!0), this.$el
  }, s.prototype.listenToFlipbook = function(a) {
    this._data.listenToFlipbook = a
  }, s.prototype._momentum = function(a, b, c, d) {
    var e = .002,
      f = Math.min(Math.abs(a) / b, 1.5),
      g = f * f / (2 * e);
    return g *= 0 > a ? -1 : 1, a > 0 && g > c ? (g = c, f = f * c / g) : 0 > a && d > g && (g = d, f = f * d / g), {
      dist: g,
      time: Math.round(f / e)
    }
  }, b.widgetFactory("miniatures", s);
  var t = b.UIComponent(function(c) {
    var d = this._data;
    return d.options = a.extend({
      selector: ".show-hint",
      className: "ui-tooltip",
      positions: "bottom,top,left,right"
    }, c), this._eventDelegation(!0), b.addDelegateList(c.delegate, this.$el), this.$el
  });
  t.prototype._eventDelegation = function(b) {
    b ? (this.$el.on("vmouseover", this._data.options.selector, a.proxy(this, "_eventHover")), this.$el.on("vmouseout", this._data.options.selector, a.proxy(this, "_eventNoHover"))) : (this.$el.off("vmouseover", this._eventHover), this.$el.off("vmouseout", this._eventNoHover))
  }, t.prototype._eventHover = function(b) {
    this._showHint(a(b.currentTarget))
  }, t.prototype._eventNoHover = function(b) {
    $cTarget = a(b.currentTarget), $cTarget.hasClass("has-hint") && this._hideHint($cTarget)
  }, t.prototype._showHint = function(c) {
    var d = c.attr("title") || c.attr("v-title");
    if (d && "" !== d) {
      var e = this._data,
        f = e.options.className;
      if (this._trigger("willShowHint", c) == b.EVENT_PREVENTED) return;
      e.$currentTarget && (e.$currentTarget.removeClass("has-hint"), e.$currentTarget = null), e.$tooltip || (e.$tooltip = a("<div />", {
        "class": f
      }), e.$tooltip.hide(), e.$tooltip.appendTo(a("body"))), e.$tooltip.html(d), e.isTooltipVisible || e.$tooltip.css({
        visibility: "hidden",
        display: ""
      });
      var g = e.$tooltip.width() + parseInt(e.$tooltip.css("padding-left"), 10) + parseInt(e.$tooltip.css("padding-right"), 10),
        h = e.$tooltip.height() + parseInt(e.$tooltip.css("padding-top"), 10) + parseInt(e.$tooltip.css("padding-bottom"), 10);
      e.isTooltipVisible || e.$tooltip.css({
        display: "none",
        visibility: ""
      });
      for (var i, j = c.offset(), k = c.width(), l = c.height(), m = a(window).width(), n = a(window).height(), o = {
          x: 0,
          y: 0
        }, p = e.options.positions.split(","), q = 0; q < p.length; q++) {
        switch (p[q]) {
          case "top":
            o.x = j.left + k / 2 - g / 2, o.y = j.top - h, i = "ui-tooltip-top";
            break;
          case "bottom":
            o.x = j.left + k / 2 - g / 2, o.y = j.top + l, i = "ui-tooltip-bottom";
            break;
          case "left":
            o.x = j.left - g, o.y = j.top + l / 2 - h / 2, i = "ui-tooltip-left";
            break;
          case "right":
            o.x = j.left + k, o.y = j.top + l / 2 - h / 2, i = "ui-tooltip-right"
        }
        if (o.x >= 0 && o.x + g <= m && o.y >= 0 && o.y + h <= n) break
      }
      e.$tooltip.css({
        top: o.y,
        left: o.x
      }), e.$tooltip.show(), setTimeout(function() {
        e.$tooltip.attr("class", e.options.className + " ui-tooltip-visible " + i)
      }, 1), c.addClass("has-hint"), e.isTooltipVisible = !0, "" !== c.attr("title") && (c.attr("v-title", d), c.removeAttr("title")), e.$currentTarget = c, e.hideTimeHandler && clearInterval(e.hideTimeHandler)
    }
  }, t.prototype._hideHint = function(a) {
    var b = this._data;
    b.hideTimeHandler = setTimeout(function() {
      b.isTooltipVisible = !1, b.$currentTarget = null, a.removeClass("has-hint"), b.$tooltip.removeClass("ui-tooltip-visible"), setTimeout(function() {
        b.isTooltipVisible || b.$tooltip.hide()
      }, 200)
    }, 100)
  }, t.prototype.hide = function() {
    var a = this._data;
    a.isTooltipVisible && (a.isTooltipVisible = !1, a.$currentTarget.removeClass("has-hint"), a.$tooltip.removeClass("ui-tooltip-visible"), a.$tooltip.hide(), a.$currentTarget = null)
  }, t.prototype.options = function(b) {
    return void 0 === b ? this._data.options : (this._data.options = a.extend(this._data.options, b), this.$el)
  }, b.widgetFactory("tooltips", t);
  var u = b.UIComponent(function(c) {
    var d = this._data;
    d.$items = [], d.selectedItem = null, d.options = a.extend({
      itemCount: 0
    }, c), b.addDelegateList(c.delegate, this.$el), this._createDom(), this._eventDelegation(), this._addItems()
  });
  u.prototype._createDom = function() {
    this.$el.addClass("ui-menu"), this.$el.html('<div class="ui-menu-wrapper"></div>')
  }, u.prototype._eventDelegation = function() {
    this.$el.on("vmousedown", a.proxy(this, "_vmousedown")), this.$el.on("vmouseover", ".ui-menu-item", a.proxy(this, "_vmouseoverItem")), this.$el.on("vmouseout", ".ui-menu-item", a.proxy(this, "_vmouseoutItem")), this.$el.on("tap", ".ui-menu-item", a.proxy(this, "_tapItem"))
  }, u.prototype._addItems = function() {
    for (var a = this._data, b = 0; b < a.options.itemCount; b++) this._trigger("itemRequested", b)
  }, u.prototype.addTextItem = function(b) {
    var c = this.$el.find(".ui-menu-wrapper");
    $item = a("<div />", {
      "class": "ui-menu-item",
      item: this._data.$items.length
    }), a("<div />", {
      "class": "ui-menu-item-desc"
    }).html(b).appendTo($item), $item.appendTo(c), this._data.$items.push($item)
  }, u.prototype._vmousedown = function(a) {
    a.stopPropagation()
  }, u.prototype._vmouseoverItem = function(b) {
    a(b.currentTarget).addClass("ui-menu-item-hover")
  }, u.prototype._vmouseoutItem = function(b) {
    a(b.currentTarget).removeClass("ui-menu-item-hover")
  }, u.prototype._tapItem = function(b) {
    var c = a(b.currentTarget).attr("item");
    this.selectItem(parseInt(c, 10))
  }, u.prototype._getContentSize = function(a) {
    var b = this.$el.find(".ui-menu-wrapper");
    this.$el.css({
      top: "0px",
      left: "-10000px",
      display: "block"
    });
    var c = {
      width: b.width(),
      height: b.height()
    };
    return a || this.$el.hide(), c
  }, u.prototype.selectItem = function(a, c) {
    var d = this._data;
    return 0 > a || a >= d.$items.length ? !1 : c || this._trigger("itemSelected", a) != b.EVENT_PREVENTED ? (null !== d.selectedItem && d.$items[d.selectedItem].removeClass("ui-selected-item"), d.selectedItem = a, d.$items[a].addClass("ui-selected-item"), this.$el) : !1
  }, u.prototype.clearSelection = function() {
    var a = this._data;
    return null !== a.selectedItem && a.$items[a.selectedItem].removeClass("ui-selected-item"), a.selectedItem = null, this.$el
  }, u.prototype.showRelativeTo = function(a) {
    var b = this._data;
    0 === b.$items.length && this._addItems();
    var c = this._getContentSize(),
      d = a.offset();
    return this.show({
      left: d.left + a.width() / 2 - c.width / 2,
      top: d.top - c.height
    }), this.$el
  }, u.prototype.show = function(b) {
    var c = this;
    return this.$el.css({
      left: "left" in b ? b.left : "auto",
      top: "top" in b ? b.top : "auto",
      right: "right" in b ? b.right : "auto",
      bottom: "bottom" in b ? b.bottom : "auto",
      display: "block"
    }), setTimeout(function() {
      c.$el.addClass("ui-menu-visible")
    }, 1), a(document).one("vmousedown", a.proxy(this, "hide")), this.$el
  }, u.prototype.hide = function() {
    var b = this;
    return a(document).off("vmousedown", this.hide), this.$el.removeClass("ui-menu-visible"), setTimeout(function() {
      b.$el.hasClass("ui-menu-visible") || b.$el.hide()
    }, 500), this.$el
  }, u.prototype.clear = function() {
    var a = this._data;
    return a.$items = [], a.selectedItem = null, this.$el.find(".ui-menu-wrapper").children().remove(), this.$el
  }, u.prototype.options = function(b) {
    var c = this._data;
    return void 0 === b ? c.options : (c.options = a.extend(c.options, b), void 0)
  }, b.widgetFactory("menu", u)
}(jQuery);
//     keymaster.js
//     (c) 2011-2013 Thomas Fuchs
//     keymaster.js may be freely distributed under the MIT license.

;(function(global){
  var k,
    _handlers = {},
    _mods = { 16: false, 18: false, 17: false, 91: false },
    _scope = 'all',
    // modifier keys
    _MODIFIERS = {
      '⇧': 16, shift: 16,
      '⌥': 18, alt: 18, option: 18,
      '⌃': 17, ctrl: 17, control: 17,
      '⌘': 91, command: 91
    },
    // special keys
    _MAP = {
      backspace: 8, tab: 9, clear: 12,
      enter: 13, 'return': 13,
      esc: 27, escape: 27, space: 32,
      left: 37, up: 38,
      right: 39, down: 40,
      del: 46, 'delete': 46,
      home: 36, end: 35,
      pageup: 33, pagedown: 34,
      ',': 188, '.': 190, '/': 191,
      '`': 192, '-': 189, '=': 187,
      ';': 186, '\'': 222,
      '[': 219, ']': 221, '\\': 220
    },
    code = function(x){
      return _MAP[x] || x.toUpperCase().charCodeAt(0);
    },
    _downKeys = [];

  for(k=1;k<20;k++) _MAP['f'+k] = 111+k;

  // IE doesn't support Array#indexOf, so have a simple replacement
  function index(array, item){
    var i = array.length;
    while(i--) if(array[i]===item) return i;
    return -1;
  }

  // for comparing mods before unassignment
  function compareArray(a1, a2) {
    if (a1.length != a2.length) return false;
    for (var i = 0; i < a1.length; i++) {
        if (a1[i] !== a2[i]) return false;
    }
    return true;
  }

  var modifierMap = {
      16:'shiftKey',
      18:'altKey',
      17:'ctrlKey',
      91:'metaKey'
  };
  function updateModifierKey(event) {
      for(k in _mods) _mods[k] = event[modifierMap[k]];
  };

  // handle keydown event
  function dispatch(event) {
    var key, handler, k, i, modifiersMatch, scope;
    key = event.keyCode;

    if (index(_downKeys, key) == -1) {
        _downKeys.push(key);
    }

    // if a modifier key, set the key.<modifierkeyname> property to true and return
    if(key == 93 || key == 224) key = 91; // right command on webkit, command on Gecko
    if(key in _mods) {
      _mods[key] = true;
      // 'assignKey' from inside this closure is exported to window.key
      for(k in _MODIFIERS) if(_MODIFIERS[k] == key) assignKey[k] = true;
      return;
    }
    updateModifierKey(event);

    // see if we need to ignore the keypress (filter() can can be overridden)
    // by default ignore key presses if a select, textarea, or input is focused
    if(!assignKey.filter.call(this, event)) return;

    // abort if no potentially matching shortcuts found
    if (!(key in _handlers)) return;

    scope = getScope();

    // for each potential shortcut
    for (i = 0; i < _handlers[key].length; i++) {
      handler = _handlers[key][i];

      // see if it's in the current scope
      if(handler.scope == scope || handler.scope == 'all'){
        // check if modifiers match if any
        modifiersMatch = handler.mods.length > 0;
        for(k in _mods)
          if((!_mods[k] && index(handler.mods, +k) > -1) ||
            (_mods[k] && index(handler.mods, +k) == -1)) modifiersMatch = false;
        // call the handler and stop the event if neccessary
        if((handler.mods.length == 0 && !_mods[16] && !_mods[18] && !_mods[17] && !_mods[91]) || modifiersMatch){
          if(handler.method(event, handler)===false){
            if(event.preventDefault) event.preventDefault();
              else event.returnValue = false;
            if(event.stopPropagation) event.stopPropagation();
            if(event.cancelBubble) event.cancelBubble = true;
          }
        }
      }
    }
  };

  // unset modifier keys on keyup
  function clearModifier(event){
    var key = event.keyCode, k,
        i = index(_downKeys, key);

    // remove key from _downKeys
    if (i >= 0) {
        _downKeys.splice(i, 1);
    }

    if(key == 93 || key == 224) key = 91;
    if(key in _mods) {
      _mods[key] = false;
      for(k in _MODIFIERS) if(_MODIFIERS[k] == key) assignKey[k] = false;
    }
  };

  function resetModifiers() {
    for(k in _mods) _mods[k] = false;
    for(k in _MODIFIERS) assignKey[k] = false;
  };

  // parse and assign shortcut
  function assignKey(key, scope, method){
    var keys, mods;
    keys = getKeys(key);
    if (method === undefined) {
      method = scope;
      scope = 'all';
    }

    // for each shortcut
    for (var i = 0; i < keys.length; i++) {
      // set modifier keys if any
      mods = [];
      key = keys[i].split('+');
      if (key.length > 1){
        mods = getMods(key);
        key = [key[key.length-1]];
      }
      // convert to keycode and...
      key = key[0]
      key = code(key);
      // ...store handler
      if (!(key in _handlers)) _handlers[key] = [];
      _handlers[key].push({ shortcut: keys[i], scope: scope, method: method, key: keys[i], mods: mods });
    }
  };

  // unbind all handlers for given key in current scope
  function unbindKey(key, scope) {
    var multipleKeys, keys,
      mods = [],
      i, j, obj;

    multipleKeys = getKeys(key);

    for (j = 0; j < multipleKeys.length; j++) {
      keys = multipleKeys[j].split('+');

      if (keys.length > 1) {
        mods = getMods(keys);
        key = keys[keys.length - 1];
      }

      key = code(key);

      if (scope === undefined) {
        scope = getScope();
      }
      if (!_handlers[key]) {
        return;
      }
      for (i = 0; i < _handlers[key].length; i++) {
        obj = _handlers[key][i];
        // only clear handlers if correct scope and mods match
        if (obj.scope === scope && compareArray(obj.mods, mods)) {
          _handlers[key][i] = {};
        }
      }
    }
  };

  // Returns true if the key with code 'keyCode' is currently down
  // Converts strings into key codes.
  function isPressed(keyCode) {
      if (typeof(keyCode)=='string') {
        keyCode = code(keyCode);
      }
      return index(_downKeys, keyCode) != -1;
  }

  function getPressedKeyCodes() {
      return _downKeys.slice(0);
  }

  function filter(event){
    var tagName = (event.target || event.srcElement).tagName;
    // ignore keypressed in any elements that support keyboard data input
    return !(tagName == 'INPUT' || tagName == 'SELECT' || tagName == 'TEXTAREA');
  }

  // initialize key.<modifier> to false
  for(k in _MODIFIERS) assignKey[k] = false;

  // set current scope (default 'all')
  function setScope(scope){ _scope = scope || 'all' };
  function getScope(){ return _scope || 'all' };

  // delete all handlers for a given scope
  function deleteScope(scope){
    var key, handlers, i;

    for (key in _handlers) {
      handlers = _handlers[key];
      for (i = 0; i < handlers.length; ) {
        if (handlers[i].scope === scope) handlers.splice(i, 1);
        else i++;
      }
    }
  };

  // abstract key logic for assign and unassign
  function getKeys(key) {
    var keys;
    key = key.replace(/\s/g, '');
    keys = key.split(',');
    if ((keys[keys.length - 1]) == '') {
      keys[keys.length - 2] += ',';
    }
    return keys;
  }

  // abstract mods logic for assign and unassign
  function getMods(key) {
    var mods = key.slice(0, key.length - 1);
    for (var mi = 0; mi < mods.length; mi++)
    mods[mi] = _MODIFIERS[mods[mi]];
    return mods;
  }

  // cross-browser events
  function addEvent(object, event, method) {
    if (object.addEventListener)
      object.addEventListener(event, method, false);
    else if(object.attachEvent)
      object.attachEvent('on'+event, function(){ method(window.event) });
  };

  // set the handlers globally on document
  addEvent(document, 'keydown', function(event) { dispatch(event) }); // Passing _scope to a callback to ensure it remains the same by execution. Fixes #48
  addEvent(document, 'keyup', clearModifier);

  // reset modifiers to false whenever the window is (re)focused.
  addEvent(window, 'focus', resetModifiers);

  // store previously defined key
  var previousKey = global.key;

  // restore previously defined key and return reference to our key object
  function noConflict() {
    var k = global.key;
    global.key = previousKey;
    return k;
  }

  // set window.key and window.key.set/get/deleteScope, and the default filter
  global.key = assignKey;
  global.key.setScope = setScope;
  global.key.getScope = getScope;
  global.key.deleteScope = deleteScope;
  global.key.filter = filter;
  global.key.isPressed = isPressed;
  global.key.getPressedKeyCodes = getPressedKeyCodes;
  global.key.noConflict = noConflict;
  global.key.unbind = unbindKey;

  if(typeof module !== 'undefined') module.exports = assignKey;

})(this);

function getViewNumber(book, page) {
  return parseInt((page || book.turn('page')) / 2 + 1, 10);
}

var isUserInteracting = false;

function bookSlider($superbook) {
  'use strict';

  // Slider module
  var doubleDisplay = $superbook.turn('display') == 'double' ? true : false;
  var pages = $superbook.turn('pages');
  var numberOfViews = doubleDisplay ? (pages / 2 + 1) : (pages);

  $('#page-slider').slider({
    min: 1,
    max: numberOfViews,
    value: (doubleDisplay ? getViewNumber($superbook) : $superbook.turn('page'))
  });

  $('#page-slider').on('changeValue', function(event, newVal) {
    //isUserInteracting = true;
    if (!isUserInteracting) {
      var currentVal = $(this).slider('value');
      var newPage = newVal;
      if (doubleDisplay) {
        var leftPage = newVal * 2 - 2;
        var rightPage = newVal * 2 - 1;
        if (currentVal > newVal) {
          newPage = rightPage;
        } else {
          newPage = leftPage;
        }
      }
      $superbook.unbind('turning', turnAndSlide);
      if ($.inArray(newPage, $('#superbook').turn('view')) != -1) {
        //isUserInteracting = false;
        event.preventDefault();
        return;
      }
      if ($('#superbook').turn('page', newPage) === false) {
        //isUserInteracting = false;
        event.preventDefault();
      }
      $superbook.bind('turning', turnAndSlide);
    }
    isUserInteracting = false;
  });

  var turnAndSlide = function(event, page, view) {
    isUserInteracting = true;
    var viewNumber = doubleDisplay ? (parseInt((page || $superbook.turn('page')) / 2 + 1, 10)) : page;
    $('#page-slider').slider('value', viewNumber);
    //}

  };
  $superbook.bind('turning', turnAndSlide);

}
var pushToStateFlag = true;

$(document).ready(function() {

  var $superbook = $('#superbook');

  // Initialize superbook
  $superbook.turn({
    pageWidth: 1115,
    pageHeight: 1443,
    autoCenter: true,
    responsive: true,
    display: 'single',
    animatedAutoCenter: true,
    smartFlip: true,
    autoScaleContent: true,
    swipe: true,
    iframeSupport: true
      // page: typeof gon != 'undefined' && gon.page_no ? parseInt(gon.page_no) : 1
  });

  $('iframe').each(function(index) {
    this.onload = function() {
      setEventsInIframe($(this));
    };
  });

  var target = document.querySelector('#superbook');

  // create an observer instance
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        if (mutation.addedNodes && mutation.addedNodes.length > 0 && mutation.addedNodes[0].className === 'page-wrapper') {
          var newIframe = $(mutation.addedNodes[0]).find('iframe');
          if (newIframe.length > 0) {
            newIframe[0].onload = function() {
              setEventsInIframe($(this));
            };
          }
        }
      }
    });
  });

  // configuration of the observer:
  var config = {
    attributes: true,
    childList: true,
    characterData: true
  };

  // pass in the target node, as well as the observer options
  if ($('#superbook').length) {
    observer.observe(target, config);
  }

  function setEventsInIframe(thisIframe) {
    thisIframe.contents().unbind("tap doubletap mouseover vmouseover mouseout vmouseout pinch mouseup vmouseup mousemove vmousemove swipe mousedown vmousedown drag touchstart touchmove touchend dragstart dragend dragover");

    if (Turn.isTouchDevice) {
      thisIframe.contents().bind("vmousedown vmouseover vmouseout vmouseup vmousemove", function(e) {
        e.pageX += thisIframe.offset().left;
        e.pageY += thisIframe.offset().top;
        $superbook.trigger(e);
      });

    } else {
      // mousemove, mouseup and their virtual events should be used with document only
      thisIframe.contents().bind("mouseover vmouseover mouseout vmouseout mouseup vmouseup mousemove vmousemove", function(e) {
        e.pageX += thisIframe.offset().left;
        e.pageY += thisIframe.offset().top;
        $(document).trigger(e);
      });
      thisIframe.contents().bind("mousedown vmousedown", function(e) {
        e.pageX += thisIframe.offset().left;
        e.pageY += thisIframe.offset().top;
        $superbook.trigger(e);
      });

    }

    $('.turnoff', $("iframe").contents()).on('touchend doubletap mouseover vmouseover mouseout vmouseout pinch mouseup vmouseup mousemove vmousemove swipe mousedown vmousedown drag touchstart touchmove dragstart dragend dragover', function(e) {
      e.stopPropagation();
    });

    $("a", $("iframe").contents()).on('touchend doubletap mouseover vmouseover mouseout vmouseout pinch mouseup vmouseup mousemove vmousemove swipe mousedown vmousedown drag touchstart touchmove dragstart dragend dragover', function(e) {
      return false;
    });

    if (Turn.isTouchDevice) {
      $("a.page", $("iframe").contents()).off().on('tap', function(e) {
        var pageNo = $(this).attr('href');
        $superbook.turn('page', pageNo);
        return false; // prevent anchor click
      });
      $("a:not(.page)", $("iframe").contents()).off().on('tap', function(e) {
        var link = $(this).attr('href');
        window.open(link, '_blank'); // opens in new window as requested
        return false; // prevent anchor click
      });
    } else {
      $("a:not(.page)", $("iframe").contents()).off().on(' click', function(e) {
        var link = $(this).attr('href');
        window.open(link, '_blank'); // opens in new window as requested
        return false; // prevent anchor click
      });
      $("a.page", $("iframe").contents()).off().on('click', function(e) {
        var pageNo = $(this).attr('href');
        $superbook.turn('page', pageNo);
        return false; // prevent anchor click
      });
    }
  }

  // Prevent drag/scroll physics on iOS Safari with 'touchmove'
  if ($superbook.length > 0) {
    document.body.addEventListener('touchmove', function(e) {
      e.preventDefault();
    });
  }

  // Present superbook elements after turn has been applied.
  $superbook.fadeIn('slow');

  var bookId = $('#bookname').val();
  var readPageNo = Cookies.get("" + bookId);
  var currentPage = $superbook.turn('page');
  var viewPages = $superbook.turn('view');

  $superbook.turn('page', readPageNo);

  $superbook.bind('turned', function(event, page, view) {
    Cookies.remove("" + bookId);
    Cookies.set("" + bookId, parseInt(page));
  });

  bookSlider($superbook);

  if (Turn.isTouchDevice) {
    $('body .ui-arrow-next-page').on('tap', function(e) {
      $superbook.turn('next');
    });
    $('body .ui-arrow-previous-page').on('tap', function(e) {
      $superbook.turn('previous');
    });
  } else {
    $('.ui-arrow-next-page').on('click', function(e) {
      $superbook.turn('next');
    });
    $('.ui-arrow-previous-page').on('click', function(e) {
      $superbook.turn('previous');
    });
  }

  // Binding keys: left, right, pageu, pagedown to flipping the book.
  key('left, pageup, up', function(e) {
    e.preventDefault(e);
    $superbook.turn('previous');
  });

  key('right, pagedown, down, space', function(e) {
    e.preventDefault(e);
    $superbook.turn('next');
  });

  // Command + pageup, command + pagedown combinations to beginning or end of book
  key('⌘ + left, ⌘ + pageup, ⌘ + up, ctrl + left, ctrl + pageup, ctrl + up', function(e) {
    e.preventDefault(e);
    $superbook.turn('page', 1);
  });

  key('⌘ + right, ⌘ + pagedown, ⌘ + down, ctrl + right, ctrl + pagedown, ctrl + down', function(e) {
    e.preventDefault(e);
    $superbook.turn('page', $superbook.turn('pages'));
  });

  // Click on ellipsis to reveal header/page-slider
  $('.show-hint').on('click', function() {
    $('#controls').toggleClass('hidden-controls');
    $('header').toggleClass('hidden');
  });

  // Click on ⌘ + k to reveal shortcuts over book
  if (!Turn.isTouchDevice) {
    $('#short-cut-hint').removeClass('hidden');
    var toggle = false;
    $('#short-cut-hint').on('click', function(e) {
      e.preventDefault(e);
      if (toggle) {
        $('#overlayKeyboardShortcuts').fadeOut('slow');
        toggle = false;
      } else {
        $('#overlayKeyboardShortcuts').fadeIn('slow');
        toggle = true;
      }
    });
  }
});