var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "core/systems/IntervalEntitySystem"], function(require, exports, __MIntervalEntitySystem__) {
    var MIntervalEntitySystem = __MIntervalEntitySystem__;

    
    
    
    var IntervalEntityProcessingSystem = (function (_super) {
        __extends(IntervalEntityProcessingSystem, _super);
        function IntervalEntityProcessingSystem(aspect, interval) {
                _super.call(this, aspect, interval);
            this._acc = 0;
        }
        IntervalEntityProcessingSystem.prototype.checkProcessing = function () {
            this._acc += this.world.delta;
            if(this._acc >= this.interval) {
                this._acc -= this.interval;
                return true;
            }
            return false;
        };
        IntervalEntityProcessingSystem.prototype.processEntity = function (entity) {
            throw new Error('This method is abstract');
        };
        IntervalEntityProcessingSystem.prototype.processEntities = function (entities) {
            for(var i = 0, s = entities.size; s > i; i++) {
                this.processEntity(entities.get(i));
            }
        };
        return IntervalEntityProcessingSystem;
    })(MIntervalEntitySystem.IntervalEntitySystem);
    exports.IntervalEntityProcessingSystem = IntervalEntityProcessingSystem;    
})
//@ sourceMappingURL=IntervalEntityProcessingSystem.js.map
