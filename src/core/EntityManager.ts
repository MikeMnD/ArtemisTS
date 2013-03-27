import MManager = module("core/Manager");
import MComponentType = module("core/ComponentType");
import MEntity = module("core/Entity");

import MBag = module("core/utils/Bag");
import MBitSet = module("core/utils/BitSet");

export class EntityManager extends MManager.Manager {

    private _className: string = "EntityManager";

    private _entities: MBag.Bag;
    private _disabled: MBitSet.BitSet;

    private _active: number = 0;
    private _added: number = 0;
    private _created: number = 0;
    private _deleted: number = 0;

    private _identifierPool: IdentifierPool;


    constructor() {
        super();
        this._entities = new MBag.Bag();
        this._disabled = new MBitSet.BitSet();
        this._identifierPool = new IdentifierPool();
    }

    //override
    initialize(): void {
    }

    //override
    createEntityInstance(): MEntity.Entity {
        var entity: MEntity.Entity = new MEntity.Entity(this.world, this._identifierPool.checkOut());
        this._created++;
        return entity;
    }

    //override
    public added(entity: MEntity.Entity): void {
        this._active++;
        this._added++;
        this._entities.set(entity.getId(), entity);
    }

    //override
    public enabled(entity: MEntity.Entity): void {
        this._disabled.clear(entity.getId());
    }

    //override
    public disabled(entity: MEntity.Entity): void {
        this._disabled.set(entity.getId());
    }

    //override
    public deleted(entity: MEntity.Entity): void {
        this._entities.set(entity.getId(), null);

        this._disabled.clear(entity.getId());

        this._identifierPool.checkIn(entity.getId());

        this._active--;
        this._deleted++;
    }


    /**
      * Check if this entity is active.
      * Active means the entity is being actively processed.
      *
      * @param entityId
      * @return true if active, false if not.
      */
    public isActive(entityId: number): bool {
        return this._entities.get(entityId) != null;
    }

    /**
     * Check if the specified entityId is enabled.
     *
     * @param entityId
     * @return true if the entity is enabled, false if it is disabled.
     */
    public isEnabled(entityId: number): bool {
        return !this._disabled.get(entityId); //same as this._entities[entityId]
    }

    /**
     * Get a entity with this id.
     *
     * @param entityId
     * @return the entity
     */
    public getEntity(entityId: number): MEntity.Entity {
        var Entity: MEntity.Entity = this._entities[entityId]; //same as this._entities.get(entityId)
        return Entity;
    }

    /**
     * Get how many entities are active in this world.
     * @return how many entities are currently active.
     */
    public getActiveEntityCount(): number {
        return this._active;
    }

    /**
     * Get how many entities have been created in the world since start.
     * Note: A created entity may not have been added to the world, thus
     * created count is always equal or larger than added count.
     * @return how many entities have been created since start.
     */
    public getTotalCreated(): number {
        return this._created;
    }

    /**
     * Get how many entities have been added to the world since start.
     * @return how many entities have been added.
     */
    public getTotalAdded(): number {
        return this._added;
    }

    /**
     * Get how many entities have been deleted from the world since start.
     * @return how many entities have been deleted since start.
     */
    public getTotalDeleted(): number {
        return this._deleted;
    }

}

/*
 * Used only internally to generate distinct ids for entities and reuse them.
 */
export class IdentifierPool {

    private _ids: MBag.Bag;
    private _nextAvailableId: number;

    public IdentifierPool() {
        this._ids = new MBag.Bag();
    }

    public checkOut(): number {
        if (this._ids.size > 0) {
            return this._ids.removeLast();
        }
        return this._nextAvailableId++;
    }

    public checkIn(id: number): void {
        this._ids.add(id);
    }

}
