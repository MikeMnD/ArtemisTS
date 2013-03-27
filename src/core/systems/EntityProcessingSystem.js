var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "core/EntitySystem"], function(require, exports, __MEntitySystem__) {
    
    var MEntitySystem = __MEntitySystem__;

    
    
    /**
    * A typical entity system. Use this when you need to process entities possessing the
    * provided component types.
    */
    var EntityProcessingSystem = (function (_super) {
        __extends(EntityProcessingSystem, _super);
        function EntityProcessingSystem(aspect) {
                _super.call(this, aspect);
        }
        EntityProcessingSystem.prototype.processEntity = /**
        * Process a entity this system is interested in.
        * @param entity the entity to process.
        */
        function (entity) {
            throw new Error('This method is abstract');
        };
        EntityProcessingSystem.prototype.processEntities = //@Override
        function (entities) {
            for(var i = 0, s = entities.size; s > i; i++) {
                this.processEntity(entities.get(i));
            }
        };
        EntityProcessingSystem.prototype.checkProcessing = //@Override
        function () {
            return true;
        };
        return EntityProcessingSystem;
    })(MEntitySystem.EntitySystem);
    exports.EntityProcessingSystem = EntityProcessingSystem;    
})
//@ sourceMappingURL=EntityProcessingSystem.js.map
