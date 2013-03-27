var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "core/utils/XArray"], function(require, exports, __MXArray__) {
    var MXArray = __MXArray__;

    var Bag = (function (_super) {
        __extends(Bag, _super);
        function Bag() {
            this._size = this.length;
                _super.call(this);
        }
        Object.defineProperty(Bag.prototype, "size", {
            get: function () {
                this._size = this.length;
                return this._size;
            },
            enumerable: true,
            configurable: true
        });
        Bag.prototype.get = function (index) {
            return this[index];
        };
        Bag.prototype.set = function (index, e) {
            this._size = index + 1;
            this[index] = e;
        };
        Bag.prototype.isEmpty = function () {
            return this._size === 0;
        };
        Bag.prototype.removeAt = function (index) {
            var element = this[index];
            this.splice(index, 1);
            return element;
        };
        Bag.prototype.removeLast = function () {
            if(this._size > 0) {
                return this.pop();
            }
            return null;
        };
        Bag.prototype.clear = function () {
            this.length = 0;
            this._size = 0;
        };
        Bag.prototype.contains = function (element) {
            var i = 0;
            for(i; this._size > i; i++) {
                if(element === this[i]) {
                    return true;
                }
            }
            return false;
        };
        Bag.prototype.remove = function (element) {
            var i = 0;
            for(i; i < this._size; i += 1) {
                var el = this[i];
                if(el === element) {
                    var lastIndex = this._size - 1;
                    this[i] = this[lastIndex];
                    this.pop();
                    return true;
                }
            }
            return false;
        };
        Bag.prototype.removeAll = function (bag) {
            var modified = false;
            var i = 0;
            for(i; i < bag.size; i += 1) {
                var el1 = bag[i];
                var j = 0;
                for(j; j < this.size; j += 1) {
                    var el2 = this[j];
                    if(el1 == el2) {
                        this.removeAt(j);
                        j -= 1;
                        modified = true;
                        break;
                    }
                }
            }
            return modified;
        };
        Bag.prototype.add = function (element) {
            var newIndex = this._size + 1;
            this[newIndex] = element;
        };
        Bag.prototype.addAll = function (items) {
            this.concat(items);
        };
        return Bag;
    })(MXArray.XArray);
    exports.Bag = Bag;    
})
//@ sourceMappingURL=Bag.js.map
