define(["require", "exports"], function(require, exports) {
    var XArray = (function () {
        function XArray() {
            Array.apply(this, arguments);
            return new Array();
        }
        XArray.prototype.toString = function () {
            return "";
        };
        XArray.prototype.toLocaleString = function () {
            return "";
        };
        XArray.prototype.concat = function (items) {
            return [];
        };
        XArray.prototype.join = function (seperator) {
            return "";
        };
        XArray.prototype.pop = function () {
            return "";
        };
        XArray.prototype.push = function () {
            var items = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                items[_i] = arguments[_i + 0];
            }
            return 0;
        };
        XArray.prototype.reverse = function () {
            return [];
        };
        XArray.prototype.shift = function () {
        };
        XArray.prototype.slice = function (start, end) {
            return [];
        };
        XArray.prototype.sort = function (compareFn) {
            return [];
        };
        XArray.prototype.splice = function (start, deleteCount, items) {
            return [];
        };
        XArray.prototype.unshift = function () {
            var items = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                items[_i] = arguments[_i + 0];
            }
            return 0;
        };
        XArray.prototype.indexOf = function (searchElement, fromIndex) {
            return 0;
        };
        XArray.prototype.lastIndexOf = function (searchElement, fromIndex) {
            return 0;
        };
        XArray.prototype.every = function (callbackfn, thisArg) {
            return true;
        };
        XArray.prototype.some = function (callbackfn, thisArg) {
            return true;
        };
        XArray.prototype.forEach = function (callbackfn, thisArg) {
        };
        XArray.prototype.map = function (callbackfn, thisArg) {
            return [];
        };
        XArray.prototype.filter = function (callbackfn, thisArg) {
            return [];
        };
        XArray.prototype.reduce = function (callbackfn, initialValue) {
            return "";
        };
        XArray.prototype.reduceRight = function (callbackfn, initialValue) {
            return "";
        };
        return XArray;
    })();
    exports.XArray = XArray;    
    XArray["prototype"] = new Array();
})
//@ sourceMappingURL=XArray.js.map
