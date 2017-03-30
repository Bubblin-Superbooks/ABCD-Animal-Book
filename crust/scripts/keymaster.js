// Copyright (c) 2011-2013 Thomas Fuchs

// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:

// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


(function(window, document, undefined) {
    function index(array, item) {
        var i = array.length;
        for (; i--;) {
            if (array[i] === item) {
                return i;
            }
        }
        return -1;
    }
    function compareArray(a1, a2) {
        if (a1.length != a2.length) {
            return false;
        }
        /** @type {number} */
        var i = 0;
        for (; i < a1.length; i++) {
            if (a1[i] !== a2[i]) {
                return false;
            }
        }
        return true;
    }

    function updateModifierKey(event) {
        for (k in _mods) {
            _mods[k] = event[modifierMap[k]];
        }
    }

    function dispatch(event) {
        var key;
        var handler;
        var k;
        var i;
        var modifiersMatch;
        var scope;
        key = event.keyCode;
        if (index(_downKeys, key) == -1) {
            _downKeys.push(key);
        }
        if (key == 93 || key == 224) {
            /** @type {number} */
            key = 91;
        }
        if (key in _mods) {
            /** @type {boolean} */
            _mods[key] = true;
            for (k in _MODIFIERS) {
                if (_MODIFIERS[k] == key) {
                    /** @type {boolean} */
                    assignKey[k] = true;
                }
            }
            return;
        }
        updateModifierKey(event);
        if (!assignKey.filter.call(this, event)) {
            return;
        }
        if (!(key in _handlers)) {
            return;
        }
        scope = getScope();
        /** @type {number} */
        i = 0;
        for (; i < _handlers[key].length; i++) {
            handler = _handlers[key][i];
            if (handler.scope == scope || handler.scope == "all") {
                /** @type {boolean} */
                modifiersMatch = handler.mods.length > 0;
                for (k in _mods) {
                    if (!_mods[k] && index(handler.mods, +k) > -1 || _mods[k] && index(handler.mods, +k) == -1) {
                        /** @type {boolean} */
                        modifiersMatch = false;
                    }
                }
                if (handler.mods.length == 0 && (!_mods[16] && (!_mods[18] && (!_mods[17] && !_mods[91]))) || modifiersMatch) {
                    if (handler.method(event, handler) === false) {
                        if (event.preventDefault) {
                            event.preventDefault();
                        } else {
                            /** @type {boolean} */
                            event.returnValue = false;
                        }
                        if (event.stopPropagation) {
                            event.stopPropagation();
                        }
                        if (event.cancelBubble) {
                            /** @type {boolean} */
                            event.cancelBubble = true;
                        }
                    }
                }
            }
        }
    }
    /**
     * @param {?} event
     * @return {undefined}
     */
    function clearModifier(event) {
        var key = event.keyCode;
        var k;
        var i = index(_downKeys, key);
        if (i >= 0) {
            _downKeys.splice(i, 1);
        }
        if (key == 93 || key == 224) {
            /** @type {number} */
            key = 91;
        }
        if (key in _mods) {
            /** @type {boolean} */
            _mods[key] = false;
            for (k in _MODIFIERS) {
                if (_MODIFIERS[k] == key) {
                    /** @type {boolean} */
                    assignKey[k] = false;
                }
            }
        }
    }
    /**
     * @return {undefined}
     */
    function resetModifiers() {
        for (k in _mods) {
            /** @type {boolean} */
            _mods[k] = false;
        }
        for (k in _MODIFIERS) {
            /** @type {boolean} */
            assignKey[k] = false;
        }
    }
    /**
     * @param {(Array|string)} key
     * @param {string} scope
     * @param {string} method
     * @return {undefined}
     */
    function assignKey(key, scope, method) {
        var keys;
        var mods;
        keys = getKeys(key);
        if (method === undefined) {
            /** @type {string} */
            method = scope;
            /** @type {string} */
            scope = "all";
        }
        /** @type {number} */
        var i = 0;
        for (; i < keys.length; i++) {
            /** @type {Array} */
            mods = [];
            key = keys[i].split("+");
            if (key.length > 1) {
                mods = getMods(key);
                /** @type {Array} */
                key = [key[key.length - 1]];
            }
            key = key[0];
            key = code(key);
            if (!(key in _handlers)) {
                /** @type {Array} */
                _handlers[key] = [];
            }
            _handlers[key].push({
                shortcut: keys[i],
                scope: scope,
                method: method,
                key: keys[i],
                mods: mods
            });
        }
    }
    /**
     * @param {string} key
     * @param {Function} scope
     * @return {undefined}
     */
    function unbindKey(key, scope) {
        var list;
        var keys;
        /** @type {Array} */
        var mods = [];
        var i;
        var j;
        var obj;
        list = getKeys(key);
        /** @type {number} */
        j = 0;
        for (; j < list.length; j++) {
            keys = list[j].split("+");
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
            /** @type {number} */
            i = 0;
            for (; i < _handlers[key].length; i++) {
                obj = _handlers[key][i];
                if (obj.scope === scope && compareArray(obj.mods, mods)) {
                    _handlers[key][i] = {};
                }
            }
        }
    }
    /**
     * @param {(number|string)} keyCode
     * @return {?}
     */
    function isPressed(keyCode) {
        if (typeof keyCode == "string") {
            keyCode = code(keyCode);
        }
        return index(_downKeys, keyCode) != -1;
    }
    /**
     * @return {?}
     */
    function getPressedKeyCodes() {
        return _downKeys.slice(0);
    }
    /**
     * @param {Event} event
     * @return {?}
     */
    function filter(event) {
        var tagName = (event.target || event.srcElement).tagName;
        return !(tagName == "INPUT" || (tagName == "SELECT" || tagName == "TEXTAREA"));
    }
    /**
     * @param {string} scope
     * @return {undefined}
     */
    function setScope(scope) {
        _scope = scope || "all";
    }
    /**
     * @return {?}
     */
    function getScope() {
        return _scope || "all";
    }
    /**
     * @param {?} scope
     * @return {undefined}
     */
    function deleteScope(scope) {
        var key;
        var handlers;
        var i;
        for (key in _handlers) {
            handlers = _handlers[key];
            /** @type {number} */
            i = 0;
            for (; i < handlers.length;) {
                if (handlers[i].scope === scope) {
                    handlers.splice(i, 1);
                } else {
                    i++;
                }
            }
        }
    }
    /**
     * @param {string} o
     * @return {?}
     */
    function getKeys(o) {
        var keys;
        o = o.replace(/\s/g, "");
        keys = o.split(",");
        if (keys[keys.length - 1] == "") {
            keys[keys.length - 2] += ",";
        }
        return keys;
    }
    /**
     * @param {string} key
     * @return {?}
     */
    function getMods(key) {
        var mods = key.slice(0, key.length - 1);
        /** @type {number} */
        var mi = 0;
        for (; mi < mods.length; mi++) {
            mods[mi] = _MODIFIERS[mods[mi]];
        }
        return mods;
    }
    /**
     * @param {HTMLElement} object
     * @param {string} event
     * @param {Function} method
     * @return {undefined}
     */
    function addEvent(object, event, method) {
        if (object.addEventListener) {
            object.addEventListener(event, method, false);
        } else {
            if (object.attachEvent) {
                object.attachEvent("on" + event, function() {
                    method(window.event);
                });
            }
        }
    }
    /**
     * @return {?}
     */
    function noConflict() {
        var k = window.key;
        window.key = previousKey;
        return k;
    }
    var k;
    var _handlers = {};
    var _mods = {
        16: false,
        18: false,
        17: false,
        91: false
    };
    /** @type {string} */
    var _scope = "all";
    var _MODIFIERS = {
        "\u21e7": 16,
        shift: 16,
        "\u2325": 18,
        alt: 18,
        option: 18,
        "\u2303": 17,
        ctrl: 17,
        control: 17,
        "\u2318": 91,
        command: 91
    };
    var _MAP = {
        backspace: 8,
        tab: 9,
        clear: 12,
        enter: 13,
        "return": 13,
        esc: 27,
        escape: 27,
        space: 32,
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        del: 46,
        "delete": 46,
        home: 36,
        end: 35,
        pageup: 33,
        pagedown: 34,
        ",": 188,
        ".": 190,
        "/": 191,
        "`": 192,
        "-": 189,
        "=": 187,
        ";": 186,
        "'": 222,
        "[": 219,
        "]": 221,
        "\\": 220
    };
    /**
     * @param {string} key
     * @return {?}
     */
    var code = function(key) {
        return _MAP[key] || key.toUpperCase().charCodeAt(0);
    };
    var _downKeys = [];
    k = 1;
    for (; k < 20; k++) {
        _MAP["f" + k] = 111 + k;
    }
    var modifierMap = {
        16: "shiftKey",
        18: "altKey",
        17: "ctrlKey",
        91: "metaKey"
    };
    for (k in _MODIFIERS) {
        assignKey[k] = false;
    }
    addEvent(document, "keydown", function(event) {
        dispatch(event);
    });
    addEvent(document, "keyup", clearModifier);
    addEvent(window, "focus", resetModifiers);
    var previousKey = window.key;
    window.key = assignKey;
    window.key.setScope = setScope;
    window.key.getScope = getScope;
    window.key.deleteScope = deleteScope;
    window.key.filter = filter;
    window.key.isPressed = isPressed;
    window.key.getPressedKeyCodes = getPressedKeyCodes;
    window.key.noConflict = noConflict;
    window.key.unbind = unbindKey;
    if (typeof module !== "undefined") {
        module.exports = assignKey;
    }
})(this, document);