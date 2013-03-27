define(["require", "exports", "core/utils/Hashmap"], function(require, exports, __MHashmap__) {
    
    var MHashmap = __MHashmap__;

    var ComponentType = (function () {
        function ComponentType(component) {
            this._INDEX = 0;
            this._className = "ComponentType";
            this._index = this._INDEX += 1;
            this._component = component;
        }
        ComponentType.componentTypes = new MHashmap.Hashmap();
        ComponentType.prototype.getIndex = function () {
            return this._index;
        };
        ComponentType.getTypeFor = function getTypeFor(component) {
            var type = ComponentType.componentTypes.getValue(component);
            if(type == null) {
                type = new ComponentType(component);
                ComponentType.componentTypes.add(component, type);
            }
            return type;
        };
        ComponentType.getIndexFor = function getIndexFor(component) {
            return ComponentType.getTypeFor(component).getIndex();
        };
        ComponentType.prototype.toString = function () {
            return "ComponentType[" + this._component.getClassName() + "] (" + this._index + ")";
        };
        ComponentType.prototype.getClassName = function () {
            return this._className;
        };
        return ComponentType;
    })();
    exports.ComponentType = ComponentType;    
})
//@ sourceMappingURL=ComponentType.js.map
