var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "core/EntitySystem"], function(require, exports, __MEntitySystem__) {
    var MEntitySystem = __MEntitySystem__;

    
    /**
    * A system that processes entities at a interval in milliseconds.
    * A typical usage would be a collision system or physics system.
    */
    var IntervalEntitySystem = (function (_super) {
        __extends(IntervalEntitySystem, _super);
        function IntervalEntitySystem(aspect, interval) {
                _super.call(this, aspect);
            this._acc = 0;
            this.interval = interval;
        }
        IntervalEntitySystem.prototype.checkProcessing = // @Override
        function () {
            this._acc += this.world.getDelta();
            if(this._acc >= this.interval) {
                this._acc -= this.interval;
                return true;
            }
            return false;
        };
        return IntervalEntitySystem;
    })(MEntitySystem.EntitySystem);
    exports.IntervalEntitySystem = IntervalEntitySystem;    
})
//@ sourceMappingURL=IntervalEntitySystem.js.map
