define(["require", "exports"], function(require, exports) {
    
    
    
    var Manager = (function () {
        function Manager() {
            this._className = "Manager";
        }
        Manager.prototype.initialize = function () {
        };
        Manager.prototype.setWorld = function (world) {
            this.world = world;
        };
        Manager.prototype.getWorld = function () {
            return this.world;
        };
        Manager.prototype.added = function (entity) {
        };
        Manager.prototype.changed = function (entity) {
        };
        Manager.prototype.deleted = function (entity) {
        };
        Manager.prototype.enabled = function (entity) {
        };
        Manager.prototype.disabled = function (entity) {
        };
        Manager.prototype.getClassName = function () {
            return this._className;
        };
        return Manager;
    })();
    exports.Manager = Manager;    
})
//@ sourceMappingURL=Manager.js.map
