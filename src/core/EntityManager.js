var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "core/Manager", "core/Entity", "core/utils/Bag", "core/utils/BitSet"], function(require, exports, __MManager__, __MEntity__, __MBag__, __MBitSet__) {
    var MManager = __MManager__;

    
    var MEntity = __MEntity__;

    var MBag = __MBag__;

    var MBitSet = __MBitSet__;

    var EntityManager = (function (_super) {
        __extends(EntityManager, _super);
        function EntityManager() {
                _super.call(this);
            this._className = "EntityManager";
            this._active = 0;
            this._added = 0;
            this._created = 0;
            this._deleted = 0;
            this._entities = new MBag.Bag();
            this._disabled = new MBitSet.BitSet();
            this._identifierPool = new IdentifierPool();
        }
        EntityManager.prototype.initialize = function () {
        };
        EntityManager.prototype.createEntityInstance = function () {
            var entity = new MEntity.Entity(this.world, this._identifierPool.checkOut());
            this._created++;
            return entity;
        };
        EntityManager.prototype.added = function (entity) {
            this._active++;
            this._added++;
            this._entities.set(entity.getId(), entity);
        };
        EntityManager.prototype.enabled = function (entity) {
            this._disabled.clear(entity.getId());
        };
        EntityManager.prototype.disabled = function (entity) {
            this._disabled.set(entity.getId());
        };
        EntityManager.prototype.deleted = function (entity) {
            this._entities.set(entity.getId(), null);
            this._disabled.clear(entity.getId());
            this._identifierPool.checkIn(entity.getId());
            this._active--;
            this._deleted++;
        };
        EntityManager.prototype.isActive = function (entityId) {
            return this._entities.get(entityId) != null;
        };
        EntityManager.prototype.isEnabled = function (entityId) {
            return !this._disabled.get(entityId);
        };
        EntityManager.prototype.getEntity = function (entityId) {
            var Entity = this._entities[entityId];
            return Entity;
        };
        EntityManager.prototype.getActiveEntityCount = function () {
            return this._active;
        };
        EntityManager.prototype.getTotalCreated = function () {
            return this._created;
        };
        EntityManager.prototype.getTotalAdded = function () {
            return this._added;
        };
        EntityManager.prototype.getTotalDeleted = function () {
            return this._deleted;
        };
        return EntityManager;
    })(MManager.Manager);
    exports.EntityManager = EntityManager;    
    var IdentifierPool = (function () {
        function IdentifierPool() { }
        IdentifierPool.prototype.IdentifierPool = function () {
            this._ids = new MBag.Bag();
        };
        IdentifierPool.prototype.checkOut = function () {
            if(this._ids.size > 0) {
                return this._ids.removeLast();
            }
            return this._nextAvailableId++;
        };
        IdentifierPool.prototype.checkIn = function (id) {
            this._ids.add(id);
        };
        return IdentifierPool;
    })();
    exports.IdentifierPool = IdentifierPool;    
})
//@ sourceMappingURL=EntityManager.js.map
