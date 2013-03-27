import MManager = module("core/Manager");
import MEntity = module("core/Entity");

import MBag = module("core/utils/Bag");
import MHashmap = module("core/utils/Hashmap");
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
export class PlayerManager extends MManager.Manager {
    private _playersByTeam: MHashmap.Hashmap; //string, Bag of strings
    private _teamByPlayer: MHashmap.Hashmap; //string, string

    constructor() {
        super();
        this._playersByTeam = new MHashmap.Hashmap();
        this._teamByPlayer = new MHashmap.Hashmap();
    }

    public getTeam(player: string): string {
        return this._teamByPlayer.getValue(player);
    }

    public setTeam(player: string, team: string): void {
        this.removeFromTeam(player);

        this._teamByPlayer.add(player, team);

        var players: MBag.Bag = this._playersByTeam.getValue(team);
        if (players == null) {
            players = new MBag.Bag();
            this._playersByTeam.add(team, players);
        }
        players.add(player);
    }

    public getPlayers(team: string): MBag.Bag {
        return this._playersByTeam.getValue(team);
    }

    public removeFromTeam(player: string): void {
        var team: string = this._teamByPlayer.remove(player);
        if (team != null) {
            var players: MBag.Bag = this._playersByTeam.getValue(team);
            if (players != null) {
                players.remove(player);
            }
        }
    }


    //@Override
    initialize(): void {
    }

}

