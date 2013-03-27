define(["require", "exports", "core/ComponentType"], function(require, exports, __MComponentType__) {
    
    
    var MComponentType = __MComponentType__;

    
    
    var ComponentMapper = (function () {
        function ComponentMapper(component, world) {
            this._componentType = MComponentType.ComponentType.getTypeFor(component);
            this._components = world.getComponentManager().getComponentsByType(this._componentType);
        }
        ComponentMapper.prototype.get = function (entity) {
            return this._components.get(entity.getId());
        };
        ComponentMapper.prototype.getSafe = function (entity) {
            return this._components.get(entity.getId());
        };
        ComponentMapper.prototype.has = function (entity) {
            return this.getSafe(entity) != null;
        };
        ComponentMapper.getFor = function getFor(component, world) {
            return new ComponentMapper(component, world);
        };
        return ComponentMapper;
    })();
    exports.ComponentMapper = ComponentMapper;    
})
//@ sourceMappingURL=ComponentMapper.js.map
