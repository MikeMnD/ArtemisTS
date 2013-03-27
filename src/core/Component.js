define(["require", "exports"], function(require, exports) {
    var Component = (function () {
        function Component() {
            this._className = "Component";
        }
        Component.prototype.getClassName = function () {
            return this._className;
        };
        return Component;
    })();
    exports.Component = Component;    
    ;
})
//@ sourceMappingURL=Component.js.map
