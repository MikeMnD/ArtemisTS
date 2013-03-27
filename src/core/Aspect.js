define(["require", "exports", "core/ComponentType", "core/utils/BitSet"], function(require, exports, __MComponentType__, __MBitSet__) {
    
    var MComponentType = __MComponentType__;

    
    
    var MBitSet = __MBitSet__;

    var Aspect = (function () {
        function Aspect() {
            this._allSet = new MBitSet.BitSet();
            this._exclusionSet = new MBitSet.BitSet();
            this._oneSet = new MBitSet.BitSet();
        }
        Aspect.prototype.getAllSet = function () {
            return this._allSet;
        };
        Aspect.prototype.getExclusionSet = function () {
            return this._exclusionSet;
        };
        Aspect.prototype.getOneSet = function () {
            return this._oneSet;
        };
        Aspect.prototype.all = function (component, componentList) {
            this._allSet.set(MComponentType.ComponentType.getIndexFor(component));
            for(var i = 0; i < componentList.length; i++) {
                this._allSet.set(MComponentType.ComponentType.getIndexFor(componentList[i]));
            }
            return this;
        };
        Aspect.prototype.exclude = function (component, componentList) {
            this._exclusionSet.set(MComponentType.ComponentType.getIndexFor(component));
            for(var i = 0; i < componentList.length; i++) {
                this._exclusionSet.set(MComponentType.ComponentType.getIndexFor(componentList[i]));
            }
            return this;
        };
        Aspect.prototype.one = function (component, componentList) {
            this._oneSet.set(MComponentType.ComponentType.getIndexFor(component));
            for(var i = 0; i < componentList.length; i++) {
                this._oneSet.set(MComponentType.ComponentType.getIndexFor(componentList[i]));
            }
            return this;
        };
        Aspect.getAspectFor = function getAspectFor(component, componentList) {
            return Aspect.getAspectForAll(component, componentList);
        };
        Aspect.getAspectForAll = function getAspectForAll(component, componentList) {
            var aspect = new Aspect();
            aspect.all(component, componentList);
            return aspect;
        };
        Aspect.getAspectForOne = function getAspectForOne(component, componentList) {
            var aspect = new Aspect();
            aspect.one(component, componentList);
            return aspect;
        };
        Aspect.getEmpty = function getEmpty() {
            return new Aspect();
        };
        return Aspect;
    })();
    exports.Aspect = Aspect;    
})
//@ sourceMappingURL=Aspect.js.map
