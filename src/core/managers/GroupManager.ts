import MManager = module("core/Manager");
import MEntity = module("core/Entity");

import MBag = module("core/utils/Bag");
import MHashmap = module("core/utils/Hashmap");
/**
 * If you need to group your entities together, e.g. tanks going into "units" group or explosions into "effects",
 * then use this manager. You must retrieve it using world instance.
 *
 * A entity can be assigned to more than one group.
 *
 */
export class GroupManager extends MManager.Manager {
    private _entitiesByGroup: MHashmap.Hashmap; //string, Bag of entity
    private _groupsByEntity: MHashmap.Hashmap; //entity, Bag of strings

    constructor() {
        super();
        this._entitiesByGroup = new MHashmap.Hashmap();
        this._groupsByEntity = new MHashmap.Hashmap();
    }

    /**
          * Set the group of the entity.
          *
          * @param group group to add the entity into.
          * @param e entity to add into the group.
          */
    public add(entity: MEntity.Entity, group: string): void {
        var entities: MBag.Bag = this._entitiesByGroup.getValue(group);
        if (entities == null) {
            entities = new MBag.Bag();
            this._entitiesByGroup.add(group, entities);
        }
        entities.add(entity);

        var groups: MBag.Bag = this._groupsByEntity.getValue(entity);
        if (groups == null) {
            groups = new MBag.Bag();
            this._groupsByEntity.add(entity, groups);
        }
        groups.add(group);
    }

    /**
     * Remove the entity from the specified group.
     * @param e
     * @param group
     */
    public remove(entity: MEntity.Entity, group: string): void {
        var entities: MBag.Bag = this._entitiesByGroup.getValue(group);
        if (entities != null) {
            entities.remove(entity);
        }

        var groups: MBag.Bag = this._groupsByEntity.getValue(entity);
        if (groups != null) {
            groups.remove(group);
        }
    }

    public removeFromAllGroups(entity: MEntity.Entity): void {
        var groups: MBag.Bag = this._groupsByEntity.getValue(entity);
        if (groups != null) {
            for (var i = 0; groups.size > i; i++) {
                var entities: MBag.Bag = this._entitiesByGroup.getValue(groups.get(i));
                if (entities != null) {
                    entities.remove(entity);
                }
            }
            groups.clear();
        }
    }

    /**
     * Get all entities that belong to the provided group.
     * @param group name of the group.
     * @return read-only bag of entities belonging to the group.
     */
    public getEntities(group: string): MBag.Bag {
        var entities: MBag.Bag = this._entitiesByGroup.getValue(group);
        if (entities == null) {
            entities = new MBag.Bag();
            this._entitiesByGroup.add(group, entities);
        }
        return entities;
    }

    /**
     * @param e entity
     * @return the groups the entity belongs to, null if none.
     */
    public getGroups(entity: MEntity.Entity): MBag.Bag {
        return this._groupsByEntity.getValue(entity);
    }

    /**
     * Checks if the entity belongs to any group.
     * @param e the entity to check.
     * @return true if it is in any group, false if none.
     */
    public isInAnyGroup(entity: MEntity.Entity): bool {
        return this.getGroups(entity) != null;
    }

    /**
     * Check if the entity is in the supplied group.
     * @param group the group to check in.
     * @param e the entity to check for.
     * @return true if the entity is in the supplied group, false if not.
     */
    public isInGroup(entity: MEntity.Entity, group: string): bool {
        if (group != null) {
            var groups: MBag.Bag = this._groupsByEntity.getValue(entity);
            for (var i = 0; groups.size > i; i++) {
                var g: string = groups.get(i);
                if (group === g || group == g) {
                    return true;
                }
            }
        }
        return false;
    }

    //@Override
    public deleted(entity: MEntity.Entity): void {
        this.removeFromAllGroups(entity);
    }

    //@Override
    initialize(): void {
    }

}

