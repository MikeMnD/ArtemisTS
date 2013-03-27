var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "core/Manager", "core/utils/Bag", "core/utils/Hashmap"], function(require, exports, __MManager__, __MBag__, __MHashmap__) {
    var MManager = __MManager__;

    
    var MBag = __MBag__;

    var MHashmap = __MHashmap__;

    var GroupManager = (function (_super) {
        __extends(GroupManager, _super);
        function GroupManager() {
                _super.call(this);
            this._entitiesByGroup = new MHashmap.Hashmap();
            this._groupsByEntity = new MHashmap.Hashmap();
        }
        GroupManager.prototype.add = function (entity, group) {
            var entities = this._entitiesByGroup.getValue(group);
            if(entities == null) {
                entities = new MBag.Bag();
                this._entitiesByGroup.add(group, entities);
            }
            entities.add(entity);
            var groups = this._groupsByEntity.getValue(entity);
            if(groups == null) {
                groups = new MBag.Bag();
                this._groupsByEntity.add(entity, groups);
            }
            groups.add(group);
        };
        GroupManager.prototype.remove = function (entity, group) {
            var entities = this._entitiesByGroup.getValue(group);
            if(entities != null) {
                entities.remove(entity);
            }
            var groups = this._groupsByEntity.getValue(entity);
            if(groups != null) {
                groups.remove(group);
            }
        };
        GroupManager.prototype.removeFromAllGroups = function (entity) {
            var groups = this._groupsByEntity.getValue(entity);
            if(groups != null) {
                for(var i = 0; groups.size > i; i++) {
                    var entities = this._entitiesByGroup.getValue(groups.get(i));
                    if(entities != null) {
                        entities.remove(entity);
                    }
                }
                groups.clear();
            }
        };
        GroupManager.prototype.getEntities = function (group) {
            var entities = this._entitiesByGroup.getValue(group);
            if(entities == null) {
                entities = new MBag.Bag();
                this._entitiesByGroup.add(group, entities);
            }
            return entities;
        };
        GroupManager.prototype.getGroups = function (entity) {
            return this._groupsByEntity.getValue(entity);
        };
        GroupManager.prototype.isInAnyGroup = function (entity) {
            return this.getGroups(entity) != null;
        };
        GroupManager.prototype.isInGroup = function (entity, group) {
            if(group != null) {
                var groups = this._groupsByEntity.getValue(entity);
                for(var i = 0; groups.size > i; i++) {
                    var g = groups.get(i);
                    if(group === g || group == g) {
                        return true;
                    }
                }
            }
            return false;
        };
        GroupManager.prototype.deleted = function (entity) {
            this.removeFromAllGroups(entity);
        };
        GroupManager.prototype.initialize = function () {
        };
        return GroupManager;
    })(MManager.Manager);
    exports.GroupManager = GroupManager;    
})
//@ sourceMappingURL=GroupManager.js.map
