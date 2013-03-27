import MWorld = module("core/World");
import MEntityManager = module("core/EntityManager");
import MComponent = module("core/Component");
import MComponentType = module("core/ComponentType");
import MComponentManager = module("core/ComponentManager");

import MUtils = module("core/utils/Utils");
import MBag = module("core/utils/Bag");
import MBitSet = module("core/utils/BitSet");

export interface IEntity {
    id: number;
    _uuid: any;
    _componentBits: MBitSet.BitSet;
    _systemBits: MBitSet.BitSet;

    world: MWorld.World;
    _entityManager: MEntityManager.EntityManager;
    _componentManager: MComponentManager.ComponentManager;
}

export class Entity implements IEntity {

    public id: number = 0;
    private _uuid: string;
    private _componentBits: MBitSet.BitSet;
    private _systemBits: MBitSet.BitSet;

    public world: MWorld.World;
    private _entityManager: MEntityManager.EntityManager;
    private _componentManager: MComponentManager.ComponentManager;

    /*
    The entity class. Cannot be instantiated outside the framework, 
    you must create new entities using World.

    You do not extend the Entity class, it should be treated as final to prevent that.

    */
    constructor(world: MWorld.World, id: number) {

        this.world = world;
        this.id = id;
        this._entityManager = world.getEntityManager();
        this._componentManager = world.getComponentManager();
        this._componentBits = new MBitSet.BitSet();
        this._systemBits = new MBitSet.BitSet();

        this.reset();

    }


    /**
    * The internal id for this entity within the framework. No other entity
    * will have the same ID, but ID's are however reused so another entity may
    * acquire this ID if the previous entity was deleted.
    *
    * @return id of the entity.
    */
    public getId():number {
        return this.id;
    }

    /**
    * Returns a BitSet instance containing bits of the components the entity possesses.
    * @return
    */
    getComponentBits(): MBitSet.BitSet {
        return this._componentBits;
    }

    /**
    * Returns a BitSet instance containing bits of the components the entity possesses.
    * @return
    */
    getSystemBits(): MBitSet.BitSet {
        return this._systemBits;
    }

    /**
    * Make entity ready for re-use.
    * Will generate a new uuid for the entity.
    */
    reset(): void {
        this._systemBits = new MBitSet.BitSet();
        this._componentBits = new MBitSet.BitSet();
        this._uuid = new MUtils.UUID();
    }

    toString(): string {
        return "Entity[" + this.id + "]";
    }

    /**
    * Add a component to this entity.
    *
    * @param component to add to this entity
    *
    * @return this entity for chaining.
    */
    addComponent(component: MComponent.Component): Entity {
        this.addComponentWithType(component, MComponentType.ComponentType.getTypeFor(component)); //TODO: Check maybe component.getClassName() was right
        return this;
    }

    /**
    * Faster adding of components into the entity. Not neccessery to use this, but
    * in some cases you might need the extra performance.
    *
    * @param component the component to add
    * @param type of the component
    *
    * @return this entity for chaining.
    */
    public addComponentWithType(component: MComponent.Component, type: MComponentType.ComponentType): Entity {
        this._componentManager.addComponent(this, type, component);
            return this;
        }

    /**
    * Removes the component from this entity.
    *
    * @param component to remove from this entity.
    *
    * @return this entity for chaining.
    */
    public removeComponent(component: MComponent.Component): Entity {
        this.removeComponentByType(MComponentType.ComponentType.getTypeFor(component));
            return this;
        }

    /**
    * Faster removal of components from a entity.
    *
    * @param component to remove from this entity.
    *
    * @return this entity for chaining.
    */
    public removeComponentByType(componentType: MComponentType.ComponentType): Entity {
        this._componentManager.removeComponent(this, componentType);
            return this;
        }


    /**
    * Checks if the entity has been added to the world and has not been deleted from it.
    * If the entity has been disabled this will still return true.
    *
    * @return if it's active.
    */
    public isActive(): bool {
        return this._entityManager.isActive(this.id);
    }

    /**
    * Will check if the entity is enabled in the world.
    * By default all entities that are added to world are enabled,
    * this will only return false if an entity has been explicitly disabled.
    *
    * @return if it's enabled
    */
    public isEnabled(): bool {
        return this._entityManager.isEnabled(this.id);
    }

    /**
    * This is the preferred method to use when retrieving a component from a
    * entity. It will provide good performance.
    * But the recommended way to retrieve components from an entity is using
    * the ComponentMapper.
    *
    * @param type
    *            in order to retrieve the component fast you must provide a
    *            ComponentType instance for the expected component.
    * @return
    */
    public getComponent(componentType: MComponentType.ComponentType): MComponent.Component {
        return this._componentManager.getComponent(this, componentType);
    }


        /**
         * Returns a bag of all components this entity has.
         * You need to reset the bag yourself if you intend to fill it more than once.
         *
         * @param fillBag the bag to put the components into.
         * @return the fillBag with the components in.
         */
    public getComponents(fillBag: MBag.Bag): MBag.Bag {
            return this._componentManager.getComponentsFor(this, fillBag);
        }

        /**
         * Refresh all changes to components for this entity. After adding or
         * removing components, you must call this method. It will update all
         * relevant systems. It is typical to call this after adding components to a
         * newly created entity.
         */
        public addToWorld():void {
            this.world.addEntity(this);
        }

        /**
         * This entity has changed, a component added or deleted.
         */
        public changedInWorld(): void {
            this.world.changedEntity(this);
        }

        /**
         * Delete this entity from the world.
         */
        public deleteFromWorld(): void {
            this.world.deleteEntity(this);
        }

        /**
         * (Re)enable the entity in the world, after it having being disabled.
         * Won't do anything unless it was already disabled.
         */
        public enable(): void {
            this.world.enable(this);
        }

        /**
         * Disable the entity from being processed. Won't delete it, it will
         * continue to exist but won't get processed.
         */
        public disable(): void {
            this.world.disable(this);
        }

        /**
         * Get the UUID for this entity.
         * This UUID is unique per entity (re-used entities get a new UUID).
         * @return uuid instance for this entity.
         */
        public getUuid(): string {
            return this._uuid;
        }

        /**
         * Returns the world this entity belongs to.
         * @return world of entity.
         */
        public getWorld(): MWorld.World {
            return this.world;
        }


}

