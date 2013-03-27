var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "core/Manager", "core/utils/Hashmap"], function(require, exports, __MManager__, __MHashmap__) {
    var MManager = __MManager__;

    
    var MHashmap = __MHashmap__;

    /**
    * If you need to tag any entity, use this. A typical usage would be to tag
    * entities such as "PLAYER", "BOSS" or something that is very unique.
    *
    *
    */
    var TagManager = (function (_super) {
        __extends(TagManager, _super);
        //entity, string
        function TagManager() {
                _super.call(this);
            this._entitiesByTag = new MHashmap.Hashmap();
            this._tagsByEntity = new MHashmap.Hashmap();
        }
        TagManager.prototype.register = function (tag, entity) {
            this._entitiesByTag.add(tag, entity);
            this._tagsByEntity.add(entity, tag);
        };
        TagManager.prototype.unregister = function (tag) {
            this._tagsByEntity.remove(this._entitiesByTag.remove(tag));
        };
        TagManager.prototype.isRegistered = function (tag) {
            return this._entitiesByTag.has(tag);
        };
        TagManager.prototype.getEntity = function (tag) {
            return this._entitiesByTag.getValue(tag);
        };
        TagManager.prototype.getRegisteredTags = function () {
            return this._tagsByEntity.values();
        };
        TagManager.prototype.deleted = //@Override
        function (entity) {
            var removedTag = this._tagsByEntity.remove(entity);
            if(removedTag != null) {
                this._entitiesByTag.remove(removedTag);
            }
        };
        TagManager.prototype.initialize = //@Override
        function () {
        };
        return TagManager;
    })(MManager.Manager);
    exports.TagManager = TagManager;    
})
//@ sourceMappingURL=TagManager.js.map
