var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "core/utils/XArray"], function(require, exports, __MXArray__) {
    var MXArray = __MXArray__;

    var List = (function (_super) {
        __extends(List, _super);
        function List() {
                _super.call(this);
        }
        List.prototype.getObject = function (index) {
            return this[index];
        };
        return List;
    })(MXArray.XArray);
    exports.List = List;    
})
//@ sourceMappingURL=List.js.map
