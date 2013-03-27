define(["require", "exports", "core/utils/Bag", "core/utils/Hashmap"], function(require, exports, __MBag__, __MHashmap__) {
    
    
    
    
    
    
    
    
    var MBag = __MBag__;

    var MHashmap = __MHashmap__;

    
    var EntitySystem = (function () {
        function EntitySystem(aspect) {
            this._className = "EntitySystem";
            this._actives = new MBag.Bag();
            this.aspect = aspect;
            this._allSet = aspect.getAllSet();
            this._exclusionSet = aspect.getExclusionSet();
            this._oneSet = aspect.getOneSet();
            this._systemIndex = SystemIndexManager.getIndexFor(this);
            this._dummy = this._allSet.isEmpty() && this._oneSet.isEmpty();
        }
        EntitySystem.prototype.getClassName = function () {
            return this._className;
        };
        EntitySystem.prototype.begin = function () {
        };
        EntitySystem.prototype.process = function () {
            if(this.checkProcessing()) {
                this.begin();
                this.processEntities(this._actives);
                this.end();
            }
        };
        EntitySystem.prototype.end = function () {
        };
        EntitySystem.prototype.processEntities = function (entities) {
            throw new Error('This method is abstract');
        };
        EntitySystem.prototype.checkProcessing = function () {
            throw new Error('This method is abstract');
        };
        EntitySystem.prototype.initialize = function () {
        };
        EntitySystem.prototype.inserted = function (entity) {
        };
        EntitySystem.prototype.removed = function (entity) {
        };
        EntitySystem.prototype.check = function (entity) {
            if(this._dummy) {
                return;
            }
            var contains = entity.getSystemBits().get(this._systemIndex) != 0 ? true : false;
            var interested = true;
            var componentBits = entity.getComponentBits();
            if(!this._allSet.isEmpty()) {
                for(var i = this._allSet.nextSetBit(0); i >= 0; i = this._allSet.nextSetBit(i + 1)) {
                    if(!componentBits.get(i)) {
                        interested = false;
                        break;
                    }
                }
            }
            if(!this._exclusionSet.isEmpty() && interested) {
                interested = !this._exclusionSet.intersects(componentBits);
            }
            if(!this._oneSet.isEmpty()) {
                interested = this._oneSet.intersects(componentBits);
            }
            if(interested && !contains) {
                this.insertToSystem(entity);
            } else if(!interested && contains) {
                this.removeFromSystem(entity);
            }
        };
        EntitySystem.prototype.removeFromSystem = function (entity) {
            this._actives.remove(entity);
            entity.getSystemBits().clear(this._systemIndex);
            this.removed(entity);
        };
        EntitySystem.prototype.insertToSystem = function (entity) {
            this._actives.add(entity);
            entity.getSystemBits().set(this._systemIndex);
            this.inserted(entity);
        };
        EntitySystem.prototype.added = function (entity) {
            this.check(entity);
        };
        EntitySystem.prototype.changed = function (entity) {
            this.check(entity);
        };
        EntitySystem.prototype.deleted = function (entity) {
            if(entity.getSystemBits().get(this._systemIndex)) {
                this.removeFromSystem(entity);
            }
        };
        EntitySystem.prototype.disabled = function (entity) {
            if(entity.getSystemBits().get(this._systemIndex)) {
                this.removeFromSystem(entity);
            }
        };
        EntitySystem.prototype.enabled = function (entity) {
            this.check(entity);
        };
        EntitySystem.prototype.setWorld = function (world) {
            this.world = world;
        };
        EntitySystem.prototype.isPassive = function () {
            return this._passive;
        };
        EntitySystem.prototype.setPassive = function (passive) {
            this._passive = passive;
        };
        EntitySystem.prototype.getActives = function () {
            return this._actives;
        };
        return EntitySystem;
    })();
    exports.EntitySystem = EntitySystem;    
    var SystemIndexManager = (function () {
        function SystemIndexManager() {
            this._INDEX = 0;
            this._indices = new MHashmap.Hashmap();
        }
        SystemIndexManager.getIndexFor = function getIndexFor(entitySystem) {
            var index = this._indices.get(entitySystem);
            if(index == null) {
                index = this._INDEX++;
                this._indices.put(entitySystem, index);
            }
            return index;
        };
        return SystemIndexManager;
    })();    
})
//@ sourceMappingURL=EntitySystem.js.map
