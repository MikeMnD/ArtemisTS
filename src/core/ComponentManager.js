var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "core/Manager", "core/utils/Bag"], function(require, exports, __MManager__, __MBag__) {
    var MManager = __MManager__;

    
    
    
    var MBag = __MBag__;

    
    var ComponentManager = (function (_super) {
        __extends(ComponentManager, _super);
        function ComponentManager() {
                _super.call(this);
            this._className = "ComponentManager";
            this._componentsByType = new MBag.Bag();
            this._deleted = new MBag.Bag();
        }
        ComponentManager.prototype.initialize = function () {
        };
        ComponentManager.prototype.removeComponentsOfEntity = function (entity) {
            var componentBits = entity.getComponentBits();
            for(var i = componentBits.nextSetBit(0); i >= 0; i = componentBits.nextSetBit(i + 1)) {
                this._componentsByType.get(i).set(entity.getId(), null);
            }
            componentBits.clear();
        };
        ComponentManager.prototype.addComponent = function (entity, componentType, component) {
            var components = this._componentsByType.get(componentType.getIndex());
            if(components == null) {
                components = new MBag.Bag();
                this._componentsByType.set(componentType.getIndex(), components);
            }
            components.set(entity.getId(), component);
            entity.getComponentBits().set(componentType.getIndex());
        };
        ComponentManager.prototype.removeComponent = function (entity, componentType) {
            if(entity.getComponentBits().get(componentType.getIndex())) {
                this._componentsByType.get(componentType.getIndex()).set(entity.getId(), null);
                entity.getComponentBits().clear(componentType.getIndex());
            }
        };
        ComponentManager.prototype.getComponentsByType = function (componentType) {
            var components;
            components = this._componentsByType.get(componentType.getIndex());
            if(components == null) {
                components = new MBag.Bag();
                this._componentsByType.set(componentType.getIndex(), components);
            }
            return components;
        };
        ComponentManager.prototype.getComponent = function (entity, componentType) {
            var components = this._componentsByType.get(componentType.getIndex());
            if(components != null) {
                return components.get(entity.getId());
            }
            return null;
        };
        ComponentManager.prototype.getComponentsFor = function (entity, fillBag) {
            var componentBits = entity.getComponentBits();
            for(var i = componentBits.nextSetBit(0); i >= 0; i = componentBits.nextSetBit(i + 1)) {
                fillBag.add(this._componentsByType.get(i).get(entity.getId()));
            }
            return fillBag;
        };
        return ComponentManager;
    })(MManager.Manager);
    exports.ComponentManager = ComponentManager;    
})
//@ sourceMappingURL=ComponentManager.js.map
