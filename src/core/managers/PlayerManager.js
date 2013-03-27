var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "core/Manager", "core/utils/Bag", "core/utils/Hashmap"], function(require, exports, __MManager__, __MBag__, __MHashmap__) {
    var MManager = __MManager__;

    
    var MBag = __MBag__;

    var MHashmap = __MHashmap__;

    /**
    *
    * You may sometimes want to specify to which player an entity belongs to.
    *
    * An entity can only belong to a single player at a time.
    *
    */
    var PlayerManager = (function (_super) {
        __extends(PlayerManager, _super);
        //entity, Bag of entitys
        function PlayerManager() {
                _super.call(this);
            this._entitiesByPlayer = new MHashmap.Hashmap();
            this._playerByEntity = new MHashmap.Hashmap();
        }
        PlayerManager.prototype.setPlayer = function (entity, player) {
            this._playerByEntity.add(entity, player);
            var entities = this._entitiesByPlayer.getValue(player);
            if(entities == null) {
                entities = new MBag.Bag();
                this._entitiesByPlayer.add(player, entities);
            }
            entities.add(entity);
        };
        PlayerManager.prototype.getEntitiesOfPlayer = function (player) {
            var entities = this._entitiesByPlayer.getValue(player);
            if(entities == null) {
                entities = new MBag.Bag();
            }
            return entities;
        };
        PlayerManager.prototype.removeFromPlayer = function (entity) {
            var player = this._playerByEntity.getValue(entity);
            if(player != null) {
                var entities = this._entitiesByPlayer.getValue(player);
                if(entities != null) {
                    entities.remove(entity);
                }
            }
        };
        PlayerManager.prototype.getPlayer = function (entity) {
            return this._playerByEntity.getValue(entity);
        };
        PlayerManager.prototype.deleted = //@Override
        function (entity) {
            this.removeFromPlayer(entity);
        };
        PlayerManager.prototype.initialize = //@Override
        function () {
        };
        return PlayerManager;
    })(MManager.Manager);
    exports.PlayerManager = PlayerManager;    
})
//@ sourceMappingURL=PlayerManager.js.map
