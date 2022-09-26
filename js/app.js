(() => {
    var __webpack_modules__ = {
        614: function(module) {
            /*!
 * 
 *   typed.js - A JavaScript Typing Animation Library
 *   Author: Matt Boldt <me@mattboldt.com>
 *   Version: v2.0.12
 *   Url: https://github.com/mattboldt/typed.js
 *   License(s): MIT
 * 
 */
            (function webpackUniversalModuleDefinition(root, factory) {
                if (true) module.exports = factory();
            })(0, (function() {
                return function(modules) {
                    var installedModules = {};
                    function __nested_webpack_require_737__(moduleId) {
                        if (installedModules[moduleId]) return installedModules[moduleId].exports;
                        var module = installedModules[moduleId] = {
                            exports: {},
                            id: moduleId,
                            loaded: false
                        };
                        modules[moduleId].call(module.exports, module, module.exports, __nested_webpack_require_737__);
                        module.loaded = true;
                        return module.exports;
                    }
                    __nested_webpack_require_737__.m = modules;
                    __nested_webpack_require_737__.c = installedModules;
                    __nested_webpack_require_737__.p = "";
                    return __nested_webpack_require_737__(0);
                }([ function(module, exports, __nested_webpack_require_2018__) {
                    "use strict";
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    var _createClass = function() {
                        function defineProperties(target, props) {
                            for (var i = 0; i < props.length; i++) {
                                var descriptor = props[i];
                                descriptor.enumerable = descriptor.enumerable || false;
                                descriptor.configurable = true;
                                if ("value" in descriptor) descriptor.writable = true;
                                Object.defineProperty(target, descriptor.key, descriptor);
                            }
                        }
                        return function(Constructor, protoProps, staticProps) {
                            if (protoProps) defineProperties(Constructor.prototype, protoProps);
                            if (staticProps) defineProperties(Constructor, staticProps);
                            return Constructor;
                        };
                    }();
                    function _classCallCheck(instance, Constructor) {
                        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                    }
                    var _initializerJs = __nested_webpack_require_2018__(1);
                    var _htmlParserJs = __nested_webpack_require_2018__(3);
                    var Typed = function() {
                        function Typed(elementId, options) {
                            _classCallCheck(this, Typed);
                            _initializerJs.initializer.load(this, options, elementId);
                            this.begin();
                        }
                        _createClass(Typed, [ {
                            key: "toggle",
                            value: function toggle() {
                                this.pause.status ? this.start() : this.stop();
                            }
                        }, {
                            key: "stop",
                            value: function stop() {
                                if (this.typingComplete) return;
                                if (this.pause.status) return;
                                this.toggleBlinking(true);
                                this.pause.status = true;
                                this.options.onStop(this.arrayPos, this);
                            }
                        }, {
                            key: "start",
                            value: function start() {
                                if (this.typingComplete) return;
                                if (!this.pause.status) return;
                                this.pause.status = false;
                                if (this.pause.typewrite) this.typewrite(this.pause.curString, this.pause.curStrPos); else this.backspace(this.pause.curString, this.pause.curStrPos);
                                this.options.onStart(this.arrayPos, this);
                            }
                        }, {
                            key: "destroy",
                            value: function destroy() {
                                this.reset(false);
                                this.options.onDestroy(this);
                            }
                        }, {
                            key: "reset",
                            value: function reset() {
                                var restart = arguments.length <= 0 || void 0 === arguments[0] ? true : arguments[0];
                                clearInterval(this.timeout);
                                this.replaceText("");
                                if (this.cursor && this.cursor.parentNode) {
                                    this.cursor.parentNode.removeChild(this.cursor);
                                    this.cursor = null;
                                }
                                this.strPos = 0;
                                this.arrayPos = 0;
                                this.curLoop = 0;
                                if (restart) {
                                    this.insertCursor();
                                    this.options.onReset(this);
                                    this.begin();
                                }
                            }
                        }, {
                            key: "begin",
                            value: function begin() {
                                var _this = this;
                                this.options.onBegin(this);
                                this.typingComplete = false;
                                this.shuffleStringsIfNeeded(this);
                                this.insertCursor();
                                if (this.bindInputFocusEvents) this.bindFocusEvents();
                                this.timeout = setTimeout((function() {
                                    if (!_this.currentElContent || 0 === _this.currentElContent.length) _this.typewrite(_this.strings[_this.sequence[_this.arrayPos]], _this.strPos); else _this.backspace(_this.currentElContent, _this.currentElContent.length);
                                }), this.startDelay);
                            }
                        }, {
                            key: "typewrite",
                            value: function typewrite(curString, curStrPos) {
                                var _this2 = this;
                                if (this.fadeOut && this.el.classList.contains(this.fadeOutClass)) {
                                    this.el.classList.remove(this.fadeOutClass);
                                    if (this.cursor) this.cursor.classList.remove(this.fadeOutClass);
                                }
                                var humanize = this.humanizer(this.typeSpeed);
                                var numChars = 1;
                                if (true === this.pause.status) {
                                    this.setPauseStatus(curString, curStrPos, true);
                                    return;
                                }
                                this.timeout = setTimeout((function() {
                                    curStrPos = _htmlParserJs.htmlParser.typeHtmlChars(curString, curStrPos, _this2);
                                    var pauseTime = 0;
                                    var substr = curString.substr(curStrPos);
                                    if ("^" === substr.charAt(0)) if (/^\^\d+/.test(substr)) {
                                        var skip = 1;
                                        substr = /\d+/.exec(substr)[0];
                                        skip += substr.length;
                                        pauseTime = parseInt(substr);
                                        _this2.temporaryPause = true;
                                        _this2.options.onTypingPaused(_this2.arrayPos, _this2);
                                        curString = curString.substring(0, curStrPos) + curString.substring(curStrPos + skip);
                                        _this2.toggleBlinking(true);
                                    }
                                    if ("`" === substr.charAt(0)) {
                                        while ("`" !== curString.substr(curStrPos + numChars).charAt(0)) {
                                            numChars++;
                                            if (curStrPos + numChars > curString.length) break;
                                        }
                                        var stringBeforeSkip = curString.substring(0, curStrPos);
                                        var stringSkipped = curString.substring(stringBeforeSkip.length + 1, curStrPos + numChars);
                                        var stringAfterSkip = curString.substring(curStrPos + numChars + 1);
                                        curString = stringBeforeSkip + stringSkipped + stringAfterSkip;
                                        numChars--;
                                    }
                                    _this2.timeout = setTimeout((function() {
                                        _this2.toggleBlinking(false);
                                        if (curStrPos >= curString.length) _this2.doneTyping(curString, curStrPos); else _this2.keepTyping(curString, curStrPos, numChars);
                                        if (_this2.temporaryPause) {
                                            _this2.temporaryPause = false;
                                            _this2.options.onTypingResumed(_this2.arrayPos, _this2);
                                        }
                                    }), pauseTime);
                                }), humanize);
                            }
                        }, {
                            key: "keepTyping",
                            value: function keepTyping(curString, curStrPos, numChars) {
                                if (0 === curStrPos) {
                                    this.toggleBlinking(false);
                                    this.options.preStringTyped(this.arrayPos, this);
                                }
                                curStrPos += numChars;
                                var nextString = curString.substr(0, curStrPos);
                                this.replaceText(nextString);
                                this.typewrite(curString, curStrPos);
                            }
                        }, {
                            key: "doneTyping",
                            value: function doneTyping(curString, curStrPos) {
                                var _this3 = this;
                                this.options.onStringTyped(this.arrayPos, this);
                                this.toggleBlinking(true);
                                if (this.arrayPos === this.strings.length - 1) {
                                    this.complete();
                                    if (false === this.loop || this.curLoop === this.loopCount) return;
                                }
                                this.timeout = setTimeout((function() {
                                    _this3.backspace(curString, curStrPos);
                                }), this.backDelay);
                            }
                        }, {
                            key: "backspace",
                            value: function backspace(curString, curStrPos) {
                                var _this4 = this;
                                if (true === this.pause.status) {
                                    this.setPauseStatus(curString, curStrPos, false);
                                    return;
                                }
                                if (this.fadeOut) return this.initFadeOut();
                                this.toggleBlinking(false);
                                var humanize = this.humanizer(this.backSpeed);
                                this.timeout = setTimeout((function() {
                                    curStrPos = _htmlParserJs.htmlParser.backSpaceHtmlChars(curString, curStrPos, _this4);
                                    var curStringAtPosition = curString.substr(0, curStrPos);
                                    _this4.replaceText(curStringAtPosition);
                                    if (_this4.smartBackspace) {
                                        var nextString = _this4.strings[_this4.arrayPos + 1];
                                        if (nextString && curStringAtPosition === nextString.substr(0, curStrPos)) _this4.stopNum = curStrPos; else _this4.stopNum = 0;
                                    }
                                    if (curStrPos > _this4.stopNum) {
                                        curStrPos--;
                                        _this4.backspace(curString, curStrPos);
                                    } else if (curStrPos <= _this4.stopNum) {
                                        _this4.arrayPos++;
                                        if (_this4.arrayPos === _this4.strings.length) {
                                            _this4.arrayPos = 0;
                                            _this4.options.onLastStringBackspaced();
                                            _this4.shuffleStringsIfNeeded();
                                            _this4.begin();
                                        } else _this4.typewrite(_this4.strings[_this4.sequence[_this4.arrayPos]], curStrPos);
                                    }
                                }), humanize);
                            }
                        }, {
                            key: "complete",
                            value: function complete() {
                                this.options.onComplete(this);
                                if (this.loop) this.curLoop++; else this.typingComplete = true;
                            }
                        }, {
                            key: "setPauseStatus",
                            value: function setPauseStatus(curString, curStrPos, isTyping) {
                                this.pause.typewrite = isTyping;
                                this.pause.curString = curString;
                                this.pause.curStrPos = curStrPos;
                            }
                        }, {
                            key: "toggleBlinking",
                            value: function toggleBlinking(isBlinking) {
                                if (!this.cursor) return;
                                if (this.pause.status) return;
                                if (this.cursorBlinking === isBlinking) return;
                                this.cursorBlinking = isBlinking;
                                if (isBlinking) this.cursor.classList.add("typed-cursor--blink"); else this.cursor.classList.remove("typed-cursor--blink");
                            }
                        }, {
                            key: "humanizer",
                            value: function humanizer(speed) {
                                return Math.round(Math.random() * speed / 2) + speed;
                            }
                        }, {
                            key: "shuffleStringsIfNeeded",
                            value: function shuffleStringsIfNeeded() {
                                if (!this.shuffle) return;
                                this.sequence = this.sequence.sort((function() {
                                    return Math.random() - .5;
                                }));
                            }
                        }, {
                            key: "initFadeOut",
                            value: function initFadeOut() {
                                var _this5 = this;
                                this.el.className += " " + this.fadeOutClass;
                                if (this.cursor) this.cursor.className += " " + this.fadeOutClass;
                                return setTimeout((function() {
                                    _this5.arrayPos++;
                                    _this5.replaceText("");
                                    if (_this5.strings.length > _this5.arrayPos) _this5.typewrite(_this5.strings[_this5.sequence[_this5.arrayPos]], 0); else {
                                        _this5.typewrite(_this5.strings[0], 0);
                                        _this5.arrayPos = 0;
                                    }
                                }), this.fadeOutDelay);
                            }
                        }, {
                            key: "replaceText",
                            value: function replaceText(str) {
                                if (this.attr) this.el.setAttribute(this.attr, str); else if (this.isInput) this.el.value = str; else if ("html" === this.contentType) this.el.innerHTML = str; else this.el.textContent = str;
                            }
                        }, {
                            key: "bindFocusEvents",
                            value: function bindFocusEvents() {
                                var _this6 = this;
                                if (!this.isInput) return;
                                this.el.addEventListener("focus", (function(e) {
                                    _this6.stop();
                                }));
                                this.el.addEventListener("blur", (function(e) {
                                    if (_this6.el.value && 0 !== _this6.el.value.length) return;
                                    _this6.start();
                                }));
                            }
                        }, {
                            key: "insertCursor",
                            value: function insertCursor() {
                                if (!this.showCursor) return;
                                if (this.cursor) return;
                                this.cursor = document.createElement("span");
                                this.cursor.className = "typed-cursor";
                                this.cursor.setAttribute("aria-hidden", true);
                                this.cursor.innerHTML = this.cursorChar;
                                this.el.parentNode && this.el.parentNode.insertBefore(this.cursor, this.el.nextSibling);
                            }
                        } ]);
                        return Typed;
                    }();
                    exports["default"] = Typed;
                    module.exports = exports["default"];
                }, function(module, exports, __nested_webpack_require_18228__) {
                    "use strict";
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    var _extends = Object.assign || function(target) {
                        for (var i = 1; i < arguments.length; i++) {
                            var source = arguments[i];
                            for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
                        }
                        return target;
                    };
                    var _createClass = function() {
                        function defineProperties(target, props) {
                            for (var i = 0; i < props.length; i++) {
                                var descriptor = props[i];
                                descriptor.enumerable = descriptor.enumerable || false;
                                descriptor.configurable = true;
                                if ("value" in descriptor) descriptor.writable = true;
                                Object.defineProperty(target, descriptor.key, descriptor);
                            }
                        }
                        return function(Constructor, protoProps, staticProps) {
                            if (protoProps) defineProperties(Constructor.prototype, protoProps);
                            if (staticProps) defineProperties(Constructor, staticProps);
                            return Constructor;
                        };
                    }();
                    function _interopRequireDefault(obj) {
                        return obj && obj.__esModule ? obj : {
                            default: obj
                        };
                    }
                    function _classCallCheck(instance, Constructor) {
                        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                    }
                    var _defaultsJs = __nested_webpack_require_18228__(2);
                    var _defaultsJs2 = _interopRequireDefault(_defaultsJs);
                    var Initializer = function() {
                        function Initializer() {
                            _classCallCheck(this, Initializer);
                        }
                        _createClass(Initializer, [ {
                            key: "load",
                            value: function load(self, options, elementId) {
                                if ("string" === typeof elementId) self.el = document.querySelector(elementId); else self.el = elementId;
                                self.options = _extends({}, _defaultsJs2["default"], options);
                                self.isInput = "input" === self.el.tagName.toLowerCase();
                                self.attr = self.options.attr;
                                self.bindInputFocusEvents = self.options.bindInputFocusEvents;
                                self.showCursor = self.isInput ? false : self.options.showCursor;
                                self.cursorChar = self.options.cursorChar;
                                self.cursorBlinking = true;
                                self.elContent = self.attr ? self.el.getAttribute(self.attr) : self.el.textContent;
                                self.contentType = self.options.contentType;
                                self.typeSpeed = self.options.typeSpeed;
                                self.startDelay = self.options.startDelay;
                                self.backSpeed = self.options.backSpeed;
                                self.smartBackspace = self.options.smartBackspace;
                                self.backDelay = self.options.backDelay;
                                self.fadeOut = self.options.fadeOut;
                                self.fadeOutClass = self.options.fadeOutClass;
                                self.fadeOutDelay = self.options.fadeOutDelay;
                                self.isPaused = false;
                                self.strings = self.options.strings.map((function(s) {
                                    return s.trim();
                                }));
                                if ("string" === typeof self.options.stringsElement) self.stringsElement = document.querySelector(self.options.stringsElement); else self.stringsElement = self.options.stringsElement;
                                if (self.stringsElement) {
                                    self.strings = [];
                                    self.stringsElement.style.display = "none";
                                    var strings = Array.prototype.slice.apply(self.stringsElement.children);
                                    var stringsLength = strings.length;
                                    if (stringsLength) for (var i = 0; i < stringsLength; i += 1) {
                                        var stringEl = strings[i];
                                        self.strings.push(stringEl.innerHTML.trim());
                                    }
                                }
                                self.strPos = 0;
                                self.arrayPos = 0;
                                self.stopNum = 0;
                                self.loop = self.options.loop;
                                self.loopCount = self.options.loopCount;
                                self.curLoop = 0;
                                self.shuffle = self.options.shuffle;
                                self.sequence = [];
                                self.pause = {
                                    status: false,
                                    typewrite: true,
                                    curString: "",
                                    curStrPos: 0
                                };
                                self.typingComplete = false;
                                for (var i in self.strings) self.sequence[i] = i;
                                self.currentElContent = this.getCurrentElContent(self);
                                self.autoInsertCss = self.options.autoInsertCss;
                                this.appendAnimationCss(self);
                            }
                        }, {
                            key: "getCurrentElContent",
                            value: function getCurrentElContent(self) {
                                var elContent = "";
                                if (self.attr) elContent = self.el.getAttribute(self.attr); else if (self.isInput) elContent = self.el.value; else if ("html" === self.contentType) elContent = self.el.innerHTML; else elContent = self.el.textContent;
                                return elContent;
                            }
                        }, {
                            key: "appendAnimationCss",
                            value: function appendAnimationCss(self) {
                                var cssDataName = "data-typed-js-css";
                                if (!self.autoInsertCss) return;
                                if (!self.showCursor && !self.fadeOut) return;
                                if (document.querySelector("[" + cssDataName + "]")) return;
                                var css = document.createElement("style");
                                css.type = "text/css";
                                css.setAttribute(cssDataName, true);
                                var innerCss = "";
                                if (self.showCursor) innerCss += "\n        .typed-cursor{\n          opacity: 1;\n        }\n        .typed-cursor.typed-cursor--blink{\n          animation: typedjsBlink 0.7s infinite;\n          -webkit-animation: typedjsBlink 0.7s infinite;\n                  animation: typedjsBlink 0.7s infinite;\n        }\n        @keyframes typedjsBlink{\n          50% { opacity: 0.0; }\n        }\n        @-webkit-keyframes typedjsBlink{\n          0% { opacity: 1; }\n          50% { opacity: 0.0; }\n          100% { opacity: 1; }\n        }\n      ";
                                if (self.fadeOut) innerCss += "\n        .typed-fade-out{\n          opacity: 0;\n          transition: opacity .25s;\n        }\n        .typed-cursor.typed-cursor--blink.typed-fade-out{\n          -webkit-animation: 0;\n          animation: 0;\n        }\n      ";
                                if (0 === css.length) return;
                                css.innerHTML = innerCss;
                                document.body.appendChild(css);
                            }
                        } ]);
                        return Initializer;
                    }();
                    exports["default"] = Initializer;
                    var initializer = new Initializer;
                    exports.initializer = initializer;
                }, function(module, exports) {
                    "use strict";
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    var defaults = {
                        strings: [ "These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!" ],
                        stringsElement: null,
                        typeSpeed: 0,
                        startDelay: 0,
                        backSpeed: 0,
                        smartBackspace: true,
                        shuffle: false,
                        backDelay: 700,
                        fadeOut: false,
                        fadeOutClass: "typed-fade-out",
                        fadeOutDelay: 500,
                        loop: false,
                        loopCount: 1 / 0,
                        showCursor: true,
                        cursorChar: "|",
                        autoInsertCss: true,
                        attr: null,
                        bindInputFocusEvents: false,
                        contentType: "html",
                        onBegin: function onBegin(self) {},
                        onComplete: function onComplete(self) {},
                        preStringTyped: function preStringTyped(arrayPos, self) {},
                        onStringTyped: function onStringTyped(arrayPos, self) {},
                        onLastStringBackspaced: function onLastStringBackspaced(self) {},
                        onTypingPaused: function onTypingPaused(arrayPos, self) {},
                        onTypingResumed: function onTypingResumed(arrayPos, self) {},
                        onReset: function onReset(self) {},
                        onStop: function onStop(arrayPos, self) {},
                        onStart: function onStart(arrayPos, self) {},
                        onDestroy: function onDestroy(self) {}
                    };
                    exports["default"] = defaults;
                    module.exports = exports["default"];
                }, function(module, exports) {
                    "use strict";
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    var _createClass = function() {
                        function defineProperties(target, props) {
                            for (var i = 0; i < props.length; i++) {
                                var descriptor = props[i];
                                descriptor.enumerable = descriptor.enumerable || false;
                                descriptor.configurable = true;
                                if ("value" in descriptor) descriptor.writable = true;
                                Object.defineProperty(target, descriptor.key, descriptor);
                            }
                        }
                        return function(Constructor, protoProps, staticProps) {
                            if (protoProps) defineProperties(Constructor.prototype, protoProps);
                            if (staticProps) defineProperties(Constructor, staticProps);
                            return Constructor;
                        };
                    }();
                    function _classCallCheck(instance, Constructor) {
                        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                    }
                    var HTMLParser = function() {
                        function HTMLParser() {
                            _classCallCheck(this, HTMLParser);
                        }
                        _createClass(HTMLParser, [ {
                            key: "typeHtmlChars",
                            value: function typeHtmlChars(curString, curStrPos, self) {
                                if ("html" !== self.contentType) return curStrPos;
                                var curChar = curString.substr(curStrPos).charAt(0);
                                if ("<" === curChar || "&" === curChar) {
                                    var endTag = "";
                                    if ("<" === curChar) endTag = ">"; else endTag = ";";
                                    while (curString.substr(curStrPos + 1).charAt(0) !== endTag) {
                                        curStrPos++;
                                        if (curStrPos + 1 > curString.length) break;
                                    }
                                    curStrPos++;
                                }
                                return curStrPos;
                            }
                        }, {
                            key: "backSpaceHtmlChars",
                            value: function backSpaceHtmlChars(curString, curStrPos, self) {
                                if ("html" !== self.contentType) return curStrPos;
                                var curChar = curString.substr(curStrPos).charAt(0);
                                if (">" === curChar || ";" === curChar) {
                                    var endTag = "";
                                    if (">" === curChar) endTag = "<"; else endTag = "&";
                                    while (curString.substr(curStrPos - 1).charAt(0) !== endTag) {
                                        curStrPos--;
                                        if (curStrPos < 0) break;
                                    }
                                    curStrPos--;
                                }
                                return curStrPos;
                            }
                        } ]);
                        return HTMLParser;
                    }();
                    exports["default"] = HTMLParser;
                    var htmlParser = new HTMLParser;
                    exports.htmlParser = htmlParser;
                } ]);
            }));
        },
        732: function(module) {
            !function(n, t) {
                true ? module.exports = t() : 0;
            }(0, (function() {
                "use strict";
                function n() {
                    return n = Object.assign || function(n) {
                        for (var t = 1; t < arguments.length; t++) {
                            var e = arguments[t];
                            for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (n[i] = e[i]);
                        }
                        return n;
                    }, n.apply(this, arguments);
                }
                var t = "undefined" != typeof window, e = t && !("onscroll" in window) || "undefined" != typeof navigator && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent), i = t && "IntersectionObserver" in window, o = t && "classList" in document.createElement("p"), a = t && window.devicePixelRatio > 1, r = {
                    elements_selector: ".lazy",
                    container: e || t ? document : null,
                    threshold: 300,
                    thresholds: null,
                    data_src: "src",
                    data_srcset: "srcset",
                    data_sizes: "sizes",
                    data_bg: "bg",
                    data_bg_hidpi: "bg-hidpi",
                    data_bg_multi: "bg-multi",
                    data_bg_multi_hidpi: "bg-multi-hidpi",
                    data_bg_set: "bg-set",
                    data_poster: "poster",
                    class_applied: "applied",
                    class_loading: "loading",
                    class_loaded: "loaded",
                    class_error: "error",
                    class_entered: "entered",
                    class_exited: "exited",
                    unobserve_completed: !0,
                    unobserve_entered: !1,
                    cancel_on_exit: !0,
                    callback_enter: null,
                    callback_exit: null,
                    callback_applied: null,
                    callback_loading: null,
                    callback_loaded: null,
                    callback_error: null,
                    callback_finish: null,
                    callback_cancel: null,
                    use_native: !1,
                    restore_on_error: !1
                }, c = function(t) {
                    return n({}, r, t);
                }, l = function(n, t) {
                    var e, i = "LazyLoad::Initialized", o = new n(t);
                    try {
                        e = new CustomEvent(i, {
                            detail: {
                                instance: o
                            }
                        });
                    } catch (n) {
                        (e = document.createEvent("CustomEvent")).initCustomEvent(i, !1, !1, {
                            instance: o
                        });
                    }
                    window.dispatchEvent(e);
                }, u = "src", s = "srcset", d = "sizes", f = "poster", _ = "llOriginalAttrs", g = "data", v = "loading", b = "loaded", m = "applied", p = "error", h = "native", E = "data-", I = "ll-status", y = function(n, t) {
                    return n.getAttribute(E + t);
                }, k = function(n) {
                    return y(n, I);
                }, w = function(n, t) {
                    return function(n, t, e) {
                        var i = "data-ll-status";
                        null !== e ? n.setAttribute(i, e) : n.removeAttribute(i);
                    }(n, 0, t);
                }, A = function(n) {
                    return w(n, null);
                }, L = function(n) {
                    return null === k(n);
                }, O = function(n) {
                    return k(n) === h;
                }, x = [ v, b, m, p ], C = function(n, t, e, i) {
                    n && (void 0 === i ? void 0 === e ? n(t) : n(t, e) : n(t, e, i));
                }, N = function(n, t) {
                    o ? n.classList.add(t) : n.className += (n.className ? " " : "") + t;
                }, M = function(n, t) {
                    o ? n.classList.remove(t) : n.className = n.className.replace(new RegExp("(^|\\s+)" + t + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "");
                }, z = function(n) {
                    return n.llTempImage;
                }, T = function(n, t) {
                    if (t) {
                        var e = t._observer;
                        e && e.unobserve(n);
                    }
                }, R = function(n, t) {
                    n && (n.loadingCount += t);
                }, G = function(n, t) {
                    n && (n.toLoadCount = t);
                }, j = function(n) {
                    for (var t, e = [], i = 0; t = n.children[i]; i += 1) "SOURCE" === t.tagName && e.push(t);
                    return e;
                }, D = function(n, t) {
                    var e = n.parentNode;
                    e && "PICTURE" === e.tagName && j(e).forEach(t);
                }, H = function(n, t) {
                    j(n).forEach(t);
                }, V = [ u ], F = [ u, f ], B = [ u, s, d ], J = [ g ], P = function(n) {
                    return !!n[_];
                }, S = function(n) {
                    return n[_];
                }, U = function(n) {
                    return delete n[_];
                }, $ = function(n, t) {
                    if (!P(n)) {
                        var e = {};
                        t.forEach((function(t) {
                            e[t] = n.getAttribute(t);
                        })), n[_] = e;
                    }
                }, q = function(n, t) {
                    if (P(n)) {
                        var e = S(n);
                        t.forEach((function(t) {
                            !function(n, t, e) {
                                e ? n.setAttribute(t, e) : n.removeAttribute(t);
                            }(n, t, e[t]);
                        }));
                    }
                }, K = function(n, t, e) {
                    N(n, t.class_applied), w(n, m), e && (t.unobserve_completed && T(n, t), C(t.callback_applied, n, e));
                }, Q = function(n, t, e) {
                    N(n, t.class_loading), w(n, v), e && (R(e, 1), C(t.callback_loading, n, e));
                }, W = function(n, t, e) {
                    e && n.setAttribute(t, e);
                }, X = function(n, t) {
                    W(n, d, y(n, t.data_sizes)), W(n, s, y(n, t.data_srcset)), W(n, u, y(n, t.data_src));
                }, Y = {
                    IMG: function(n, t) {
                        D(n, (function(n) {
                            $(n, B), X(n, t);
                        })), $(n, B), X(n, t);
                    },
                    IFRAME: function(n, t) {
                        $(n, V), W(n, u, y(n, t.data_src));
                    },
                    VIDEO: function(n, t) {
                        H(n, (function(n) {
                            $(n, V), W(n, u, y(n, t.data_src));
                        })), $(n, F), W(n, f, y(n, t.data_poster)), W(n, u, y(n, t.data_src)), n.load();
                    },
                    OBJECT: function(n, t) {
                        $(n, J), W(n, g, y(n, t.data_src));
                    }
                }, Z = [ "IMG", "IFRAME", "VIDEO", "OBJECT" ], nn = function(n, t) {
                    !t || function(n) {
                        return n.loadingCount > 0;
                    }(t) || function(n) {
                        return n.toLoadCount > 0;
                    }(t) || C(n.callback_finish, t);
                }, tn = function(n, t, e) {
                    n.addEventListener(t, e), n.llEvLisnrs[t] = e;
                }, en = function(n, t, e) {
                    n.removeEventListener(t, e);
                }, on = function(n) {
                    return !!n.llEvLisnrs;
                }, an = function(n) {
                    if (on(n)) {
                        var t = n.llEvLisnrs;
                        for (var e in t) {
                            var i = t[e];
                            en(n, e, i);
                        }
                        delete n.llEvLisnrs;
                    }
                }, rn = function(n, t, e) {
                    !function(n) {
                        delete n.llTempImage;
                    }(n), R(e, -1), function(n) {
                        n && (n.toLoadCount -= 1);
                    }(e), M(n, t.class_loading), t.unobserve_completed && T(n, e);
                }, cn = function(n, t, e) {
                    var i = z(n) || n;
                    on(i) || function(n, t, e) {
                        on(n) || (n.llEvLisnrs = {});
                        var i = "VIDEO" === n.tagName ? "loadeddata" : "load";
                        tn(n, i, t), tn(n, "error", e);
                    }(i, (function(o) {
                        !function(n, t, e, i) {
                            var o = O(t);
                            rn(t, e, i), N(t, e.class_loaded), w(t, b), C(e.callback_loaded, t, i), o || nn(e, i);
                        }(0, n, t, e), an(i);
                    }), (function(o) {
                        !function(n, t, e, i) {
                            var o = O(t);
                            rn(t, e, i), N(t, e.class_error), w(t, p), C(e.callback_error, t, i), e.restore_on_error && q(t, B), 
                            o || nn(e, i);
                        }(0, n, t, e), an(i);
                    }));
                }, ln = function(n, t, e) {
                    !function(n) {
                        return Z.indexOf(n.tagName) > -1;
                    }(n) ? function(n, t, e) {
                        !function(n) {
                            n.llTempImage = document.createElement("IMG");
                        }(n), cn(n, t, e), function(n) {
                            P(n) || (n[_] = {
                                backgroundImage: n.style.backgroundImage
                            });
                        }(n), function(n, t, e) {
                            var i = y(n, t.data_bg), o = y(n, t.data_bg_hidpi), r = a && o ? o : i;
                            r && (n.style.backgroundImage = 'url("'.concat(r, '")'), z(n).setAttribute(u, r), 
                            Q(n, t, e));
                        }(n, t, e), function(n, t, e) {
                            var i = y(n, t.data_bg_multi), o = y(n, t.data_bg_multi_hidpi), r = a && o ? o : i;
                            r && (n.style.backgroundImage = r, K(n, t, e));
                        }(n, t, e), function(n, t, e) {
                            var i = y(n, t.data_bg_set);
                            if (i) {
                                var o = i.split("|"), a = o.map((function(n) {
                                    return "image-set(".concat(n, ")");
                                }));
                                n.style.backgroundImage = a.join(), "" === n.style.backgroundImage && (a = o.map((function(n) {
                                    return "-webkit-image-set(".concat(n, ")");
                                })), n.style.backgroundImage = a.join()), K(n, t, e);
                            }
                        }(n, t, e);
                    }(n, t, e) : function(n, t, e) {
                        cn(n, t, e), function(n, t, e) {
                            var i = Y[n.tagName];
                            i && (i(n, t), Q(n, t, e));
                        }(n, t, e);
                    }(n, t, e);
                }, un = function(n) {
                    n.removeAttribute(u), n.removeAttribute(s), n.removeAttribute(d);
                }, sn = function(n) {
                    D(n, (function(n) {
                        q(n, B);
                    })), q(n, B);
                }, dn = {
                    IMG: sn,
                    IFRAME: function(n) {
                        q(n, V);
                    },
                    VIDEO: function(n) {
                        H(n, (function(n) {
                            q(n, V);
                        })), q(n, F), n.load();
                    },
                    OBJECT: function(n) {
                        q(n, J);
                    }
                }, fn = function(n, t) {
                    (function(n) {
                        var t = dn[n.tagName];
                        t ? t(n) : function(n) {
                            if (P(n)) {
                                var t = S(n);
                                n.style.backgroundImage = t.backgroundImage;
                            }
                        }(n);
                    })(n), function(n, t) {
                        L(n) || O(n) || (M(n, t.class_entered), M(n, t.class_exited), M(n, t.class_applied), 
                        M(n, t.class_loading), M(n, t.class_loaded), M(n, t.class_error));
                    }(n, t), A(n), U(n);
                }, _n = [ "IMG", "IFRAME", "VIDEO" ], gn = function(n) {
                    return n.use_native && "loading" in HTMLImageElement.prototype;
                }, vn = function(n, t, e) {
                    n.forEach((function(n) {
                        return function(n) {
                            return n.isIntersecting || n.intersectionRatio > 0;
                        }(n) ? function(n, t, e, i) {
                            var o = function(n) {
                                return x.indexOf(k(n)) >= 0;
                            }(n);
                            w(n, "entered"), N(n, e.class_entered), M(n, e.class_exited), function(n, t, e) {
                                t.unobserve_entered && T(n, e);
                            }(n, e, i), C(e.callback_enter, n, t, i), o || ln(n, e, i);
                        }(n.target, n, t, e) : function(n, t, e, i) {
                            L(n) || (N(n, e.class_exited), function(n, t, e, i) {
                                e.cancel_on_exit && function(n) {
                                    return k(n) === v;
                                }(n) && "IMG" === n.tagName && (an(n), function(n) {
                                    D(n, (function(n) {
                                        un(n);
                                    })), un(n);
                                }(n), sn(n), M(n, e.class_loading), R(i, -1), A(n), C(e.callback_cancel, n, t, i));
                            }(n, t, e, i), C(e.callback_exit, n, t, i));
                        }(n.target, n, t, e);
                    }));
                }, bn = function(n) {
                    return Array.prototype.slice.call(n);
                }, mn = function(n) {
                    return n.container.querySelectorAll(n.elements_selector);
                }, pn = function(n) {
                    return function(n) {
                        return k(n) === p;
                    }(n);
                }, hn = function(n, t) {
                    return function(n) {
                        return bn(n).filter(L);
                    }(n || mn(t));
                }, En = function(n, e) {
                    var o = c(n);
                    this._settings = o, this.loadingCount = 0, function(n, t) {
                        i && !gn(n) && (t._observer = new IntersectionObserver((function(e) {
                            vn(e, n, t);
                        }), function(n) {
                            return {
                                root: n.container === document ? null : n.container,
                                rootMargin: n.thresholds || n.threshold + "px"
                            };
                        }(n)));
                    }(o, this), function(n, e) {
                        t && (e._onlineHandler = function() {
                            !function(n, t) {
                                var e;
                                (e = mn(n), bn(e).filter(pn)).forEach((function(t) {
                                    M(t, n.class_error), A(t);
                                })), t.update();
                            }(n, e);
                        }, window.addEventListener("online", e._onlineHandler));
                    }(o, this), this.update(e);
                };
                return En.prototype = {
                    update: function(n) {
                        var t, o, a = this._settings, r = hn(n, a);
                        G(this, r.length), !e && i ? gn(a) ? function(n, t, e) {
                            n.forEach((function(n) {
                                -1 !== _n.indexOf(n.tagName) && function(n, t, e) {
                                    n.setAttribute("loading", "lazy"), cn(n, t, e), function(n, t) {
                                        var e = Y[n.tagName];
                                        e && e(n, t);
                                    }(n, t), w(n, h);
                                }(n, t, e);
                            })), G(e, 0);
                        }(r, a, this) : (o = r, function(n) {
                            n.disconnect();
                        }(t = this._observer), function(n, t) {
                            t.forEach((function(t) {
                                n.observe(t);
                            }));
                        }(t, o)) : this.loadAll(r);
                    },
                    destroy: function() {
                        this._observer && this._observer.disconnect(), t && window.removeEventListener("online", this._onlineHandler), 
                        mn(this._settings).forEach((function(n) {
                            U(n);
                        })), delete this._observer, delete this._settings, delete this._onlineHandler, delete this.loadingCount, 
                        delete this.toLoadCount;
                    },
                    loadAll: function(n) {
                        var t = this, e = this._settings;
                        hn(n, e).forEach((function(n) {
                            T(n, t), ln(n, e, t);
                        }));
                    },
                    restoreAll: function() {
                        var n = this._settings;
                        mn(n).forEach((function(t) {
                            fn(t, n);
                        }));
                    }
                }, En.load = function(n, t) {
                    var e = c(t);
                    ln(n, e);
                }, En.resetStatus = function(n) {
                    A(n);
                }, t && function(n, t) {
                    if (t) if (t.length) for (var e, i = 0; e = t[i]; i += 1) l(n, e); else l(n, t);
                }(En, window.lazyLoadOptions), En;
            }));
        }
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (void 0 !== cachedModule) return cachedModule.exports;
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        return module.exports;
    }
    (() => {
        "use strict";
        const modules_flsModules = {};
        function isWebp() {
            function testWebP(callback) {
                let webP = new Image;
                webP.onload = webP.onerror = function() {
                    callback(2 == webP.height);
                };
                webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
            }
            testWebP((function(support) {
                let className = true === support ? "webp" : "no-webp";
                document.documentElement.classList.add(className);
            }));
        }
        let isMobile = {
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function() {
                return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
            }
        };
        function getHash() {
            if (location.hash) return location.hash.replace("#", "");
        }
        function fullVHfix() {
            const fullScreens = document.querySelectorAll("[data-fullscreen]");
            if (fullScreens.length && isMobile.any()) {
                window.addEventListener("resize", fixHeight);
                function fixHeight() {
                    let vh = .01 * window.innerHeight;
                    document.documentElement.style.setProperty("--vh", `${vh}px`);
                }
                fixHeight();
            }
        }
        let bodyLockStatus = true;
        let bodyLockToggle = (delay = 500) => {
            if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
        };
        let bodyUnlock = (delay = 500) => {
            let body = document.querySelector("body");
            if (bodyLockStatus) {
                let lock_padding = document.querySelectorAll("[data-lp]");
                setTimeout((() => {
                    for (let index = 0; index < lock_padding.length; index++) {
                        const el = lock_padding[index];
                        el.style.paddingRight = "0px";
                    }
                    body.style.paddingRight = "0px";
                    document.documentElement.classList.remove("lock");
                }), delay);
                bodyLockStatus = false;
                setTimeout((function() {
                    bodyLockStatus = true;
                }), delay);
            }
        };
        let bodyLock = (delay = 500) => {
            let body = document.querySelector("body");
            if (bodyLockStatus) {
                let lock_padding = document.querySelectorAll("[data-lp]");
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
                }
                body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
                document.documentElement.classList.add("lock");
                bodyLockStatus = false;
                setTimeout((function() {
                    bodyLockStatus = true;
                }), delay);
            }
        };
        function menuInit() {
            if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
                if (bodyLockStatus && e.target.closest(".icon-menu")) {
                    bodyLockToggle();
                    document.documentElement.classList.toggle("menu-open");
                }
            }));
        }
        function menuClose() {
            bodyUnlock();
            document.documentElement.classList.remove("menu-open");
        }
        function functions_FLS(message) {
            setTimeout((() => {
                if (window.FLS) console.log(message);
            }), 0);
        }
        function uniqArray(array) {
            return array.filter((function(item, index, self) {
                return self.indexOf(item) === index;
            }));
        }
        let gotoblock_gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
            const targetBlockElement = document.querySelector(targetBlock);
            if (targetBlockElement) {
                let headerItem = "";
                let headerItemHeight = 0;
                if (noHeader) {
                    headerItem = "header.header";
                    const headerElement = document.querySelector(headerItem);
                    if (!headerElement.classList.contains("_header-scroll")) {
                        headerElement.style.cssText = `transition-duration: 0s;`;
                        headerElement.classList.add("_header-scroll");
                        headerItemHeight = headerElement.offsetHeight;
                        headerElement.classList.remove("_header-scroll");
                        setTimeout((() => {
                            headerElement.style.cssText = ``;
                        }), 0);
                    } else headerItemHeight = headerElement.offsetHeight;
                }
                let options = {
                    speedAsDuration: true,
                    speed,
                    header: headerItem,
                    offset: offsetTop,
                    easing: "easeOutQuad"
                };
                document.documentElement.classList.contains("menu-open") ? menuClose() : null;
                if ("undefined" !== typeof SmoothScroll) (new SmoothScroll).animateScroll(targetBlockElement, "", options); else {
                    let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
                    targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
                    targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
                    window.scrollTo({
                        top: targetBlockElementPosition,
                        behavior: "smooth"
                    });
                }
                functions_FLS(`[gotoBlock]: Юхуу...едем к ${targetBlock}`);
            } else functions_FLS(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${targetBlock}`);
        };
        var lazyload_min = __webpack_require__(732);
        new lazyload_min({
            elements_selector: "[data-src],[data-srcset]",
            class_loaded: "_lazy-loaded",
            use_native: true
        });
        class ScrollWatcher {
            constructor(props) {
                let defaultConfig = {
                    logging: true
                };
                this.config = Object.assign(defaultConfig, props);
                this.observer;
                !document.documentElement.classList.contains("watcher") ? this.scrollWatcherRun() : null;
            }
            scrollWatcherUpdate() {
                this.scrollWatcherRun();
            }
            scrollWatcherRun() {
                document.documentElement.classList.add("watcher");
                this.scrollWatcherConstructor(document.querySelectorAll("[data-watch]"));
            }
            scrollWatcherConstructor(items) {
                if (items.length) {
                    this.scrollWatcherLogging(`Проснулся, слежу за объектами (${items.length})...`);
                    let uniqParams = uniqArray(Array.from(items).map((function(item) {
                        return `${item.dataset.watchRoot ? item.dataset.watchRoot : null}|${item.dataset.watchMargin ? item.dataset.watchMargin : "0px"}|${item.dataset.watchThreshold ? item.dataset.watchThreshold : 0}`;
                    })));
                    uniqParams.forEach((uniqParam => {
                        let uniqParamArray = uniqParam.split("|");
                        let paramsWatch = {
                            root: uniqParamArray[0],
                            margin: uniqParamArray[1],
                            threshold: uniqParamArray[2]
                        };
                        let groupItems = Array.from(items).filter((function(item) {
                            let watchRoot = item.dataset.watchRoot ? item.dataset.watchRoot : null;
                            let watchMargin = item.dataset.watchMargin ? item.dataset.watchMargin : "0px";
                            let watchThreshold = item.dataset.watchThreshold ? item.dataset.watchThreshold : 0;
                            if (String(watchRoot) === paramsWatch.root && String(watchMargin) === paramsWatch.margin && String(watchThreshold) === paramsWatch.threshold) return item;
                        }));
                        let configWatcher = this.getScrollWatcherConfig(paramsWatch);
                        this.scrollWatcherInit(groupItems, configWatcher);
                    }));
                } else this.scrollWatcherLogging("Сплю, нет объектов для слежения. ZzzZZzz");
            }
            getScrollWatcherConfig(paramsWatch) {
                let configWatcher = {};
                if (document.querySelector(paramsWatch.root)) configWatcher.root = document.querySelector(paramsWatch.root); else if ("null" !== paramsWatch.root) this.scrollWatcherLogging(`Эмм... родительского объекта ${paramsWatch.root} нет на странице`);
                configWatcher.rootMargin = paramsWatch.margin;
                if (paramsWatch.margin.indexOf("px") < 0 && paramsWatch.margin.indexOf("%") < 0) {
                    this.scrollWatcherLogging(`Ой ой, настройку data-watch-margin нужно задавать в PX или %`);
                    return;
                }
                if ("prx" === paramsWatch.threshold) {
                    paramsWatch.threshold = [];
                    for (let i = 0; i <= 1; i += .005) paramsWatch.threshold.push(i);
                } else paramsWatch.threshold = paramsWatch.threshold.split(",");
                configWatcher.threshold = paramsWatch.threshold;
                return configWatcher;
            }
            scrollWatcherCreate(configWatcher) {
                this.observer = new IntersectionObserver(((entries, observer) => {
                    entries.forEach((entry => {
                        this.scrollWatcherCallback(entry, observer);
                    }));
                }), configWatcher);
            }
            scrollWatcherInit(items, configWatcher) {
                this.scrollWatcherCreate(configWatcher);
                items.forEach((item => this.observer.observe(item)));
            }
            scrollWatcherIntersecting(entry, targetElement) {
                if (entry.isIntersecting) {
                    !targetElement.classList.contains("_watcher-view") ? targetElement.classList.add("_watcher-view") : null;
                    this.scrollWatcherLogging(`Я вижу ${targetElement.classList}, добавил класс _watcher-view`);
                } else {
                    targetElement.classList.contains("_watcher-view") ? targetElement.classList.remove("_watcher-view") : null;
                    this.scrollWatcherLogging(`Я не вижу ${targetElement.classList}, убрал класс _watcher-view`);
                }
            }
            scrollWatcherOff(targetElement, observer) {
                observer.unobserve(targetElement);
                this.scrollWatcherLogging(`Я перестал следить за ${targetElement.classList}`);
            }
            scrollWatcherLogging(message) {
                this.config.logging ? functions_FLS(`[Наблюдатель]: ${message}`) : null;
            }
            scrollWatcherCallback(entry, observer) {
                const targetElement = entry.target;
                this.scrollWatcherIntersecting(entry, targetElement);
                targetElement.hasAttribute("data-watch-once") && entry.isIntersecting ? this.scrollWatcherOff(targetElement, observer) : null;
                document.dispatchEvent(new CustomEvent("watcherCallback", {
                    detail: {
                        entry
                    }
                }));
            }
        }
        modules_flsModules.watcher = new ScrollWatcher({});
        let addWindowScrollEvent = false;
        function pageNavigation() {
            document.addEventListener("click", pageNavigationAction);
            document.addEventListener("watcherCallback", pageNavigationAction);
            function pageNavigationAction(e) {
                if ("click" === e.type) {
                    const targetElement = e.target;
                    if (targetElement.closest("[data-goto]")) {
                        const gotoLink = targetElement.closest("[data-goto]");
                        const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : "";
                        const noHeader = gotoLink.hasAttribute("data-goto-header") ? true : false;
                        const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500;
                        const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;
                        gotoblock_gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
                        e.preventDefault();
                    }
                } else if ("watcherCallback" === e.type && e.detail) {
                    const entry = e.detail.entry;
                    const targetElement = entry.target;
                    if ("navigator" === targetElement.dataset.watch) {
                        document.querySelector(`[data-goto]._navigator-active`);
                        let navigatorCurrentItem;
                        if (targetElement.id && document.querySelector(`[data-goto="#${targetElement.id}"]`)) navigatorCurrentItem = document.querySelector(`[data-goto="#${targetElement.id}"]`); else if (targetElement.classList.length) for (let index = 0; index < targetElement.classList.length; index++) {
                            const element = targetElement.classList[index];
                            if (document.querySelector(`[data-goto=".${element}"]`)) {
                                navigatorCurrentItem = document.querySelector(`[data-goto=".${element}"]`);
                                break;
                            }
                        }
                        if (entry.isIntersecting) navigatorCurrentItem ? navigatorCurrentItem.classList.add("_navigator-active") : null; else navigatorCurrentItem ? navigatorCurrentItem.classList.remove("_navigator-active") : null;
                    }
                }
            }
            if (getHash()) {
                let goToHash;
                if (document.querySelector(`#${getHash()}`)) goToHash = `#${getHash()}`; else if (document.querySelector(`.${getHash()}`)) goToHash = `.${getHash()}`;
                goToHash ? gotoblock_gotoBlock(goToHash, true, 500, 20) : null;
            }
        }
        function headerScroll() {
            addWindowScrollEvent = true;
            const header = document.querySelector("header.header");
            const headerShow = header.hasAttribute("data-scroll-show");
            const headerShowTimer = header.dataset.scrollShow ? header.dataset.scrollShow : 500;
            const startPoint = header.dataset.scroll ? header.dataset.scroll : 1;
            let scrollDirection = 0;
            let timer;
            document.addEventListener("windowScroll", (function(e) {
                const scrollTop = window.scrollY;
                clearTimeout(timer);
                if (scrollTop >= startPoint) {
                    !header.classList.contains("_header-scroll") ? header.classList.add("_header-scroll") : null;
                    if (headerShow) {
                        if (scrollTop > scrollDirection) header.classList.contains("_header-show") ? header.classList.remove("_header-show") : null; else !header.classList.contains("_header-show") ? header.classList.add("_header-show") : null;
                        timer = setTimeout((() => {
                            !header.classList.contains("_header-show") ? header.classList.add("_header-show") : null;
                        }), headerShowTimer);
                    }
                } else {
                    header.classList.contains("_header-scroll") ? header.classList.remove("_header-scroll") : null;
                    if (headerShow) header.classList.contains("_header-show") ? header.classList.remove("_header-show") : null;
                }
                scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
            }));
        }
        setTimeout((() => {
            if (addWindowScrollEvent) {
                let windowScroll = new Event("windowScroll");
                window.addEventListener("scroll", (function(e) {
                    document.dispatchEvent(windowScroll);
                }));
            }
        }), 0);
        function DynamicAdapt(type) {
            this.type = type;
        }
        DynamicAdapt.prototype.init = function() {
            const _this = this;
            this.оbjects = [];
            this.daClassname = "_dynamic_adapt_";
            this.nodes = document.querySelectorAll("[data-da]");
            for (let i = 0; i < this.nodes.length; i++) {
                const node = this.nodes[i];
                const data = node.dataset.da.trim();
                const dataArray = data.split(",");
                const оbject = {};
                оbject.element = node;
                оbject.parent = node.parentNode;
                оbject.destination = document.querySelector(dataArray[0].trim());
                оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
                оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.оbjects.push(оbject);
            }
            this.arraySort(this.оbjects);
            this.mediaQueries = Array.prototype.map.call(this.оbjects, (function(item) {
                return "(" + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
            }), this);
            this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, (function(item, index, self) {
                return Array.prototype.indexOf.call(self, item) === index;
            }));
            for (let i = 0; i < this.mediaQueries.length; i++) {
                const media = this.mediaQueries[i];
                const mediaSplit = String.prototype.split.call(media, ",");
                const matchMedia = window.matchMedia(mediaSplit[0]);
                const mediaBreakpoint = mediaSplit[1];
                const оbjectsFilter = Array.prototype.filter.call(this.оbjects, (function(item) {
                    return item.breakpoint === mediaBreakpoint;
                }));
                matchMedia.addListener((function() {
                    _this.mediaHandler(matchMedia, оbjectsFilter);
                }));
                this.mediaHandler(matchMedia, оbjectsFilter);
            }
        };
        DynamicAdapt.prototype.mediaHandler = function(matchMedia, оbjects) {
            if (matchMedia.matches) for (let i = 0; i < оbjects.length; i++) {
                const оbject = оbjects[i];
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.moveTo(оbject.place, оbject.element, оbject.destination);
            } else for (let i = оbjects.length - 1; i >= 0; i--) {
                const оbject = оbjects[i];
                if (оbject.element.classList.contains(this.daClassname)) this.moveBack(оbject.parent, оbject.element, оbject.index);
            }
        };
        DynamicAdapt.prototype.moveTo = function(place, element, destination) {
            element.classList.add(this.daClassname);
            if ("last" === place || place >= destination.children.length) {
                destination.insertAdjacentElement("beforeend", element);
                return;
            }
            if ("first" === place) {
                destination.insertAdjacentElement("afterbegin", element);
                return;
            }
            destination.children[place].insertAdjacentElement("beforebegin", element);
        };
        DynamicAdapt.prototype.moveBack = function(parent, element, index) {
            element.classList.remove(this.daClassname);
            if (void 0 !== parent.children[index]) parent.children[index].insertAdjacentElement("beforebegin", element); else parent.insertAdjacentElement("beforeend", element);
        };
        DynamicAdapt.prototype.indexInParent = function(parent, element) {
            const array = Array.prototype.slice.call(parent.children);
            return Array.prototype.indexOf.call(array, element);
        };
        DynamicAdapt.prototype.arraySort = function(arr) {
            if ("min" === this.type) Array.prototype.sort.call(arr, (function(a, b) {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) return 0;
                    if ("first" === a.place || "last" === b.place) return -1;
                    if ("last" === a.place || "first" === b.place) return 1;
                    return a.place - b.place;
                }
                return a.breakpoint - b.breakpoint;
            })); else {
                Array.prototype.sort.call(arr, (function(a, b) {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) return 0;
                        if ("first" === a.place || "last" === b.place) return 1;
                        if ("last" === a.place || "first" === b.place) return -1;
                        return b.place - a.place;
                    }
                    return b.breakpoint - a.breakpoint;
                }));
                return;
            }
        };
        const da = new DynamicAdapt("max");
        da.init();
        window.addEventListener("load", (function(e) {
            if (document.querySelector(".media-presentation__video")) {
                const videoBlock = document.querySelector(".media-presentation__video");
                const video = videoBlock.querySelector("video");
                videoBlock.addEventListener("click", (e => {
                    console.log("here");
                    video.paused ? video.play() : video.pause();
                    videoBlock.classList.toggle("_active");
                }));
            }
            const presentationItems = document.querySelectorAll(".item-presentation");
            if (presentationItems) {
                let prevAdvantage = null;
                presentationItems.forEach((item => {
                    if (prevAdvantage) {
                        let prevAdvantageBounded = prevAdvantage.getBoundingClientRect();
                        let itemBounded = item.getBoundingClientRect();
                        if (prevAdvantageBounded.left < itemBounded.left) {
                            prevAdvantage.classList.remove("_last");
                            item.classList.add("_last");
                            prevAdvantage = item;
                        } else prevAdvantage = item;
                        if (prevAdvantageBounded.top < itemBounded.top) item.classList.add("_last");
                    } else prevAdvantage = item;
                }));
            }
        }));
        var typed = __webpack_require__(614);
        new typed(".info-hero__highlight", {
            strings: [ "", "<span class='info-hero__selection info-hero__selection--orange'>{</span><span class='info-hero__selection info-hero__selection--dark'>программирования</span><span class='info-hero__selection info-hero__selection--orange'>}</span>" ],
            typeSpeed: 80
        });
        window["FLS"] = false;
        isWebp();
        menuInit();
        fullVHfix();
        pageNavigation();
        headerScroll();
    })();
})();