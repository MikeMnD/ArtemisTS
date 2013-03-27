define(["require", "exports", "core/utils/Bag", "core/utils/Hashmap", "core/EntityManager", "core/ComponentManager"], function(require, exports, __MBag__, __MHashmap__, __MEntityManager__, __MComponentManager__) {
    var MBag = __MBag__;

    var MHashmap = __MHashmap__;

    
    
    
    var MEntityManager = __MEntityManager__;

    var MComponentManager = __MComponentManager__;

    var World = (function () {
        function World() {
            this._managers = new MHashmap.Hashmap();
            this._managersBag = new MBag.Bag();
            this._systems = new MHashmap.Hashmap();
            this._systemsBag = new MBag.Bag();
            this._added = new MBag.Bag();
            this._changed = new MBag.Bag();
            this._deleted = new MBag.Bag();
            this._enable = new MBag.Bag();
            this._disable = new MBag.Bag();
            this._componentManager = new MComponentManager.ComponentManager();
            this.setManager(this._componentManager);
            this._entityManager = new MEntityManager.EntityManager();
            this.setManager(this._entityManager);
        }
        World.prototype.initialize = function () {
            for(var i = 0; i < this._managersBag.size; i++) {
                this._managersBag.get(i).initialize();
            }
            for(var i = 0; i < this._systemsBag.size; i++) {
                this._systemsBag.get(i).initialize();
            }
        };
        World.prototype.process = function () {
        };
        World.prototype.getEntityManager = function () {
            return this._entityManager;
        };
        World.prototype.getComponentManager = function () {
            return this._componentManager;
        };
        World.prototype.setManager = function (manager) {
            this._managers.add(manager.getClassName(), manager);
            this._managersBag.add(manager);
            manager.setWorld(this);
            return manager;
        };
        World.prototype.getManager = function (managerClassName) {
            return this._managers.getValue(managerClassName);
        };
        World.prototype.deleteManager = function (manager) {
            this._managers.remove(manager);
            this._managersBag.remove(manager);
        };
        World.prototype.getDelta = function () {
            return this.delta;
        };
        World.prototype.setDelta = function (delta) {
            this.delta = delta;
        };
        World.prototype.addEntity = function (entity) {
            this._added.add(entity);
        };
        World.prototype.changedEntity = function (entity) {
            this._changed.add(entity);
        };
        World.prototype.deleteEntity = function (entity) {
            if(!this._deleted.contains(entity)) {
                this._deleted.add(entity);
            }
        };
        World.prototype.enable = function (entity) {
            this._enable.add(entity);
        };
        World.prototype.disable = function (entity) {
            this._disable.add(entity);
        };
        World.prototype.createEntity = function () {
            return this._entityManager.createEntityInstance();
        };
        World.prototype.getEntity = function (entityId) {
            return this._entityManager.getEntity(entityId);
        };
        World.prototype.getSystems = function () {
            return this._systemsBag;
        };
        World.prototype.setSystem = function (system, passive) {
            if (typeof passive === "undefined") { passive = false; }
            system.setWorld(this);
            system.setPassive(passive);
            this._systems.add(system.getClassName(), system);
            this._systemsBag.add(system);
            return system;
        };
        return World;
    })();
    exports.World = World;    
})
//@ sourceMappingURL=World.js.map
