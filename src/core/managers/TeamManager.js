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
    * Use this class together with PlayerManager.
    *
    * You may sometimes want to create teams in your game, so that
    * some players are team mates.
    *
    * A player can only belong to a single team.
    *
    */
    var PlayerManager = (function (_super) {
        __extends(PlayerManager, _super);
        //string, string
        function PlayerManager() {
                _super.call(this);
            this._playersByTeam = new MHashmap.Hashmap();
            this._teamByPlayer = new MHashmap.Hashmap();
        }
        PlayerManager.prototype.getTeam = function (player) {
            return this._teamByPlayer.getValue(player);
        };
        PlayerManager.prototype.setTeam = function (player, team) {
            this.removeFromTeam(player);
            this._teamByPlayer.add(player, team);
            var players = this._playersByTeam.getValue(team);
            if(players == null) {
                players = new MBag.Bag();
                this._playersByTeam.add(team, players);
            }
            players.add(player);
        };
        PlayerManager.prototype.getPlayers = function (team) {
            return this._playersByTeam.getValue(team);
        };
        PlayerManager.prototype.removeFromTeam = function (player) {
            var team = this._teamByPlayer.remove(player);
            if(team != null) {
                var players = this._playersByTeam.getValue(team);
                if(players != null) {
                    players.remove(player);
                }
            }
        };
        PlayerManager.prototype.initialize = //@Override
        function () {
        };
        return PlayerManager;
    })(MManager.Manager);
    exports.PlayerManager = PlayerManager;    
})
//@ sourceMappingURL=TeamManager.js.map
