define(["require", "exports", "core/ComponentType", "core/utils/Utils", "core/utils/BitSet"], function(require, exports, __MComponentType__, __MUtils__, __MBitSet__) {
    
    
    
    var MComponentType = __MComponentType__;

    
    var MUtils = __MUtils__;

    
    var MBitSet = __MBitSet__;

    var Entity = (function () {
        function Entity(world, id) {
            this.id = 0;
            this.world = world;
            this.id = id;
            this._entityManager = world.getEntityManager();
            this._componentManager = world.getComponentManager();
            this._componentBits = new MBitSet.BitSet();
            this._systemBits = new MBitSet.BitSet();
            this.reset();
        }
        Entity.prototype.getId = function () {
            return this.id;
        };
        Entity.prototype.getComponentBits = function () {
            return this._componentBits;
        };
        Entity.prototype.getSystemBits = function () {
            return this._systemBits;
        };
        Entity.prototype.reset = function () {
            this._systemBits = new MBitSet.BitSet();
            this._componentBits = new MBitSet.BitSet();
            this._uuid = new MUtils.UUID();
        };
        Entity.prototype.toString = function () {
            return "Entity[" + this.id + "]";
        };
        Entity.prototype.addComponent = function (component) {
            this.addComponentWithType(component, MComponentType.ComponentType.getTypeFor(component));
            return this;
        };
        Entity.prototype.addComponentWithType = function (component, type) {
            this._componentManager.addComponent(this, type, component);
            return this;
        };
        Entity.prototype.removeComponent = function (component) {
            this.removeComponentByType(MComponentType.ComponentType.getTypeFor(component));
            return this;
        };
        Entity.prototype.removeComponentByType = function (componentType) {
            this._componentManager.removeComponent(this, componentType);
            return this;
        };
        Entity.prototype.isActive = function () {
            return this._entityManager.isActive(this.id);
        };
        Entity.prototype.isEnabled = function () {
            return this._entityManager.isEnabled(this.id);
        };
        Entity.prototype.getComponent = function (componentType) {
            return this._componentManager.getComponent(this, componentType);
        };
        Entity.prototype.getComponents = function (fillBag) {
            return this._componentManager.getComponentsFor(this, fillBag);
        };
        Entity.prototype.addToWorld = function () {
            this.world.addEntity(this);
        };
        Entity.prototype.changedInWorld = function () {
            this.world.changedEntity(this);
        };
        Entity.prototype.deleteFromWorld = function () {
            this.world.deleteEntity(this);
        };
        Entity.prototype.enable = function () {
            this.world.enable(this);
        };
        Entity.prototype.disable = function () {
            this.world.disable(this);
        };
        Entity.prototype.getUuid = function () {
            return this._uuid;
        };
        Entity.prototype.getWorld = function () {
            return this.world;
        };
        return Entity;
    })();
    exports.Entity = Entity;    
})
//@ sourceMappingURL=Entity.js.map
