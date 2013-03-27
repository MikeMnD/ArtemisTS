var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "core/EntitySystem", "core/Aspect"], function(require, exports, __MEntitySystem__, __MAspect__) {
    var MEntitySystem = __MEntitySystem__;

    var MAspect = __MAspect__;

    
    /**
    * This system has an empty aspect so it processes no entities, but it still gets invoked.
    * You can use this system if you need to execute some game logic and not have to concern
    * yourself about aspects or entities.
    */
    var VoidEntitySystem = (function (_super) {
        __extends(VoidEntitySystem, _super);
        function VoidEntitySystem() {
                _super.call(this, MAspect.Aspect.getEmpty());
        }
        VoidEntitySystem.prototype.processEntities = function (entities) {
            this.processSystem();
        };
        VoidEntitySystem.prototype.processSystem = function () {
            throw new Error('This method is abstract');
        };
        VoidEntitySystem.prototype.checkProcessing = function () {
            return true;
        };
        return VoidEntitySystem;
    })(MEntitySystem.EntitySystem);
    exports.VoidEntitySystem = VoidEntitySystem;    
})
//@ sourceMappingURL=VoidEntitySystem.js.map
