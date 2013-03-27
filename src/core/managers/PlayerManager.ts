import MManager = module("core/Manager");
import MEntity = module("core/Entity");

import MBag = module("core/utils/Bag");
import MHashmap = module("core/utils/Hashmap");
/**
 *
 * You may sometimes want to specify to which player an entity belongs to.
 *
 * An entity can only belong to a single player at a time.
 *
 */
export class PlayerManager extends MManager.Manager {
    private _entitiesByPlayer: MHashmap.Hashmap; //string, entity
    private _playerByEntity: MHashmap.Hashmap; //entity, Bag of entitys

    constructor() {
        super();
        this._entitiesByPlayer = new MHashmap.Hashmap();
        this._playerByEntity = new MHashmap.Hashmap();
    }


    public setPlayer(entity: MEntity.Entity, player: string): void {
        this._playerByEntity.add(entity, player);
        var entities: MBag.Bag = this._entitiesByPlayer.getValue(player);
        if (entities == null) {
            entities = new MBag.Bag();
            this._entitiesByPlayer.add(player, entities);
        }
        entities.add(entity);
    }


    public getEntitiesOfPlayer(player: string): MBag.Bag {
        var entities: MBag.Bag = this._entitiesByPlayer.getValue(player);
        if (entities == null) {
            entities = new MBag.Bag();
        }
        return entities;
    }


    public removeFromPlayer(entity: MEntity.Entity): void {
        var player: string = this._playerByEntity.getValue(entity);
        if (player != null) {
            var entities: MBag.Bag = this._entitiesByPlayer.getValue(player);
            if (entities != null) {
                entities.remove(entity);
            }
        }
    }

    public getPlayer(entity: MEntity.Entity): string {
        return this._playerByEntity.getValue(entity);
    }

    //@Override
    public deleted(entity: MEntity.Entity): void {
        this.removeFromPlayer(entity);
    }

    //@Override
    initialize(): void {
    }

}

