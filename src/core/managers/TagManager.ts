import MManager = module("core/Manager");
import MEntity = module("core/Entity");

import MHashmap = module("core/utils/Hashmap");
/**
 * If you need to tag any entity, use this. A typical usage would be to tag
 * entities such as "PLAYER", "BOSS" or something that is very unique.
 *
 *
 */
export class TagManager extends MManager.Manager {
    private _entitiesByTag: MHashmap.Hashmap; //string, entity
    private _tagsByEntity: MHashmap.Hashmap; //entity, string

    constructor() {
        super();
        this._entitiesByTag = new MHashmap.Hashmap();
        this._tagsByEntity = new MHashmap.Hashmap();
    }

    public register(tag: string, entity: MEntity.Entity): void {
        this._entitiesByTag.add(tag, entity);
        this._tagsByEntity.add(entity, tag);
    }

    public unregister(tag: string): void {
        this._tagsByEntity.remove(this._entitiesByTag.remove(tag));
    }

    public isRegistered(tag: string): bool {
        return this._entitiesByTag.has(tag);
    }

    public getEntity(tag: string): MEntity.Entity {
        return this._entitiesByTag.getValue(tag);
    }

    public getRegisteredTags(): any[] {
        return this._tagsByEntity.values();
    }

    //@Override
    public deleted(entity: MEntity.Entity): void {
        var removedTag: string = this._tagsByEntity.remove(entity);
        if (removedTag != null) {
            this._entitiesByTag.remove(removedTag);
        }
    }

    //@Override
    initialize(): void {
    }

}

