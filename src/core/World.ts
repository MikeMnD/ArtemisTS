import MBag = module("core/utils/Bag");
import MHashmap = module("core/utils/Hashmap");
import MEntity = module("core/Entity");
import MEntitySystem = module("core/EntitySystem");
import MManager = module("core/Manager");
import MEntityManager = module("core/EntityManager");
import MComponentManager = module("core/ComponentManager");

/**
 * The primary instance for the framework. It contains all the managers.
 *
 * You must use this to create, delete and retrieve entities.
 *
 * It is also important to set the delta each game loop iteration, and initialize before game loop.
 *
 */
export class World {

    //  SystemManager returns a manager that takes care of all the entities in this world 
    private _entityManager: MEntityManager.EntityManager;

    //  ComponentManager returns a manager that takes care of all the components in this world 
    private _componentManager: MComponentManager.ComponentManager;

    public delta: number;

    //bags of entity
    private _added: MBag.Bag;
    private _changed: MBag.Bag;
    private _deleted: MBag.Bag;
    private _enable: MBag.Bag;
    private _disable: MBag.Bag;


    private _managers: MHashmap.Hashmap;
    private _managersBag: MBag.Bag;

    private _systems: MHashmap.Hashmap;
    //  SystemsBag holds all the systems in this world for possible iteration.
    private _systemsBag: MBag.Bag;

    constructor() {

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

    /**
    * Makes sure all managers systems are initialized in the order they were added.
    */
    public initialize(): void {
        for (var i = 0; i < this._managersBag.size; i++) {
            this._managersBag.get(i).initialize();
        }

        for (var i = 0; i < this._systemsBag.size; i++) {
            this._systemsBag.get(i).initialize();
        }
    }


    process() {
    }

    /**
    * Returns a manager that takes care of all the entities in the world.
    * entities of this world.
    *
    * @return entity manager.
    */
    getEntityManager(): MEntityManager.EntityManager {
        return this._entityManager;
    }

    /**
    * Returns a manager that takes care of all the components in the world.
    *
    * @return component manager.
    */
    getComponentManager(): MComponentManager.ComponentManager {
        return this._componentManager;
    }

    /**
    * Add a manager into this world. It can be retrieved later.
    * World will notify this manager of changes to entity.
    *
    * @return manager
    */
    setManager(manager: MManager.Manager): MManager.Manager {
        //add the constructor/class in the hashmap
        this._managers.add(manager.getClassName(), manager);
        this._managersBag.add(manager);
        manager.setWorld(this);
        return manager;
    }

    /**
    * Returns a manager of the specified type.
    *
    * class name of the manager
    * @return the manager
    */
    public getManager(managerClassName: MManager.Manager): MManager.Manager {
        return this._managers.getValue(managerClassName);
    }

    /**
    * Deletes the manager from this world.
    * @param manager to delete.
    */
    public deleteManager(manager: MManager.Manager): void {
        this._managers.remove(manager);
        this._managersBag.remove(manager);
    }

    /**
    * Time since last game loop.
    *
    * @return delta time since last game loop.
    */
    getDelta(): number {
        return this.delta;
    }

    /**
    * You must specify the delta for the game here.
    *
    * @param delta time since last game loop.
    */
    setDelta(delta: number): void {
        this.delta = delta;
    }

    /**
     * Adds a entity to this world.
     *
     * @param e entity
     */
    public addEntity(entity: MEntity.Entity): void {
        this._added.add(entity);
    }

    /**
     * Ensure all systems are notified of changes to this entity.
     * If you're adding a component to an entity after it's been
     * added to the world, then you need to invoke this method.
     *
     * @param e entity
     */
    public changedEntity(entity: MEntity.Entity): void {
        this._changed.add(entity);
    }

    /**
     * Delete the entity from the world.
     *
     * @param e entity
     */
    public deleteEntity(entity: MEntity.Entity): void {
        if (!this._deleted.contains(entity)) {
            this._deleted.add(entity);
        }
    }

    /**
 * (Re)enable the entity in the world, after it having being disabled.
 * Won't do anything unless it was already disabled.
 */
    public enable(entity: MEntity.Entity): void {
        this._enable.add(entity);
    }

    /**
     * Disable the entity from being processed. Won't delete it, it will
     * continue to exist but won't get processed.
     */
    public disable(entity: MEntity.Entity): void {
        this._disable.add(entity);
    }


    /**
     * Create and return a new or reused entity instance.
     * Will NOT add the entity to the world, use World.addEntity(Entity) for that.
     *
     * @return entity
     */
    public createEntity(): MEntity.Entity {
        return this._entityManager.createEntityInstance();
    }


    getEntity(entityId): MEntity.Entity {
        return this._entityManager.getEntity(entityId);
    }

    /**
     * Gives you all the systems in this world for possible iteration.
     *
     * @return all entity systems in world.
     */
    public getSystems(): MBag.Bag {
        return this._systemsBag;
    }

    /**
     * Adds a system to this world that will be processed by World.process()
     *
     * @param system the system to add.
    * @param passive wether or not this system will be processed by World.process()
     * @return the added system.
     */
    public setSystem(system: MEntitySystem.EntitySystem, passive?: bool = false) {
        system.setWorld(this);
        system.setPassive(passive);

        this._systems.add(system.getClassName(), system);
        this._systemsBag.add(system);

        return system;
    }



}




