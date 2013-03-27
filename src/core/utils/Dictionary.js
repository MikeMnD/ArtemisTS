define(["require", "exports"], function(require, exports) {
    var Hashmap = (function () {
        function Hashmap() {
            this.getValue = function (key) {
                var value = null;
                var keyIndex = this.getIndex(key);
                if(keyIndex >= 0) {
                    value = this.values[keyIndex];
                }
                return value;
            };
            this._keys = [];
        }
        Hashmap.prototype.add = function (key, value) {
            var keyIndex = this.getIndex(key);
            if(keyIndex >= 0) {
                this._values[keyIndex] = value;
            } else {
                this._keys.push(key);
                this._values.push(value);
            }
        };
        Hashmap.prototype.remove = function (key) {
            var keyIndex = this.getIndex(key);
            if(keyIndex >= 0) {
                this._keys.splice(keyIndex, 1);
                this._values.splice(keyIndex, 1);
            } else {
                throw "Key does not exist";
            }
        };
        Hashmap.prototype.getIndex = function (testKey) {
            var i = 0, len = this._keys.length, key;
            for(; i < len; ++i) {
                key = this._keys[i];
                if(key == testKey) {
                    return i;
                }
            }
            return -1;
        };
        Hashmap.prototype.has = function (testKey) {
            var i = 0, len = this._keys.length, key;
            for(i; i < len; ++i) {
                key = this._keys[i];
                if(key == testKey) {
                    return true;
                }
            }
            return false;
        };
        Hashmap.prototype.forEach = function (action) {
            var i = 0, len = this._keys.length, key, value;
            for(; i < len; ++i) {
                key = this._keys[i];
                value = this._values[i];
                var breakHere = action(key, value);
                if(breakHere == "return") {
                    return false;
                }
            }
            return true;
        };
        return Hashmap;
    })();
    exports.Hashmap = Hashmap;    
})
//@ sourceMappingURL=Dictionary.js.map
