import MWorld = module("core/World");
import MEntity = module("core/Entity");
import MEntityManager = module("core/EntityManager");
import MComponent = module("core/Component");
import MComponentType = module("core/ComponentType");
import MComponentManager = module("core/ComponentManager");
import MAspect = module("core/Aspect");

import MUtils = module("core/utils/Utils");
import MBag = module("core/utils/Bag");
import MHashmap = module("core/utils/Hashmap");
import MBitSet = module("core/utils/BitSet");

export interface IEntitySystem {
    _className: string;
    getClassName(): string;
}

/**
 * The most raw entity system. It should not typically be used, but you can create your own
 * entity system handling by extending this. It is recommended that you use the other provided
 * entity system implementations.
 *
 *
 */
export class EntitySystem implements IEntitySystem {

    private _systemIndex: number;

    public world: MWorld.World; //should be protected

    private _actives: MBag.Bag;

    private aspect: MAspect.Aspect;

    private _allSet: MBitSet.BitSet;
    private _exclusionSet: MBitSet.BitSet;
    private _oneSet: MBitSet.BitSet;

    private _passive: bool;

    private _dummy: bool;


    private _className: string = "EntitySystem";

    constructor(aspect: MAspect.Aspect) {

        this._actives = new MBag.Bag();
        this.aspect = aspect;
        this._allSet = aspect.getAllSet();
        this._exclusionSet = aspect.getExclusionSet();
        this._oneSet = aspect.getOneSet();
        this._systemIndex = SystemIndexManager.getIndexFor(this); //this or just the class name ??? don't know yet
        this._dummy = this._allSet.isEmpty() && this._oneSet.isEmpty(); // This system can't possibly be interested in any entity, so it must be "dummy"


    }

    getClassName() {
        return this._className;
    }

    /**
 * Called before processing of entities begins.
 */
    begin(): void {
    }

    public process(): void {
        if (this.checkProcessing()) {
            this.begin();
            this.processEntities(this._actives);
            this.end();
        }
    }

    /**
     * Called after the processing of entities ends.
     */
    end(): void {
    }

    /**
     * Any implementing entity system must implement this method and the logic
     * to process the given entities of the system.
     *
     * @param entities the entities this system contains.
     */
    processEntities(entities): void {
        throw new Error('This method is abstract');
    };

    /**
    *
    * @return true if the system should be processed, false if not.
    */
    checkProcessing(): bool {
        throw new Error('This method is abstract');
    };

    /**
    * Override to implement code that gets executed when systems are initialized.
    */
    initialize(): void { };

    /**
     * Called if the system has received a entity it is interested in, e.g. created or a component was added to it.
     * @param e the entity that was added to this system.
     */
    inserted(entity: MEntity.Entity): void { };

    /**
     * Called if a entity was removed from this system, e.g. deleted or had one of it's components removed.
     * @param e the entity that was removed from this system.
     */
     removed(entity: MEntity.Entity): void { };

    /**
     * Will check if the entity is of interest to this system.
     * @param e entity to check
     */
    check(entity: MEntity.Entity): void {
         if (this._dummy) {
             return;
         }

         var contains: bool = entity.getSystemBits().get(this._systemIndex) != 0 ? true : false;
         var interested: bool = true; // possibly interested, let's try to prove it wrong.

         var componentBits: MBitSet.BitSet = entity.getComponentBits();

         // Check if the entity possesses ALL of the components defined in the aspect.
         if (!this._allSet.isEmpty()) {
             for (var i = this._allSet.nextSetBit(0); i >= 0; i = this._allSet.nextSetBit(i + 1)) {
                 if (!componentBits.get(i)) {
                     interested = false;
                     break;
                 }
             }
         }

         // Check if the entity possesses ANY of the exclusion components, if it does then the system is not interested.
         if (!this._exclusionSet.isEmpty() && interested) {
             interested = !this._exclusionSet.intersects(componentBits);
         }

         // Check if the entity possesses ANY of the components in the oneSet. If so, the system is interested.
         if (!this._oneSet.isEmpty()) {
             interested = this._oneSet.intersects(componentBits);
         }

         if (interested && !contains) {
             this.insertToSystem(entity);
         } else if (!interested && contains) {
             this.removeFromSystem(entity);
         }
     }


    private removeFromSystem(entity: MEntity.Entity): void {
        this._actives.remove(entity);
        entity.getSystemBits().clear(this._systemIndex);
        this.removed(entity);
    }

    private insertToSystem(entity: MEntity.Entity): void {
        this._actives.add(entity);
        entity.getSystemBits().set(this._systemIndex);
        this.inserted(entity);
    }


    //@Override
    public added(entity: MEntity.Entity): void {
        this.check(entity);
    }

    //@Override
    public changed(entity: MEntity.Entity): void {
        this.check(entity);
    }

    //@Override
    public deleted(entity: MEntity.Entity): void {
        if (entity.getSystemBits().get(this._systemIndex)) {
            this.removeFromSystem(entity);
        }
    }

    //@Override
    public disabled(entity: MEntity.Entity): void {
        if (entity.getSystemBits().get(this._systemIndex)) {
            this.removeFromSystem(entity);
        }
    }

    //@Override
    public enabled(entity: MEntity.Entity): void {
        this.check(entity);
    }


    setWorld(world: MWorld.World): void {
        this.world = world;
    }

    isPassive(): bool {
        return this._passive;
    }


    setPassive(passive: bool): void {
        this._passive = passive;
    }

    public getActives(): MBag.Bag {
        return this._actives;
    }

}

/**
* Used to generate a unique bit for each system.
* Only used internally in EntitySystem.
*/
class SystemIndexManager {
    private _INDEX: number = 0;
    private _indices = new MHashmap.Hashmap(); //entitySystem, number

    private static getIndexFor(entitySystem: EntitySystem): number {
        var index: number = this._indices.get(entitySystem);
        if (index == null) {
            index = this._INDEX++;
            this._indices.put(entitySystem, index);
        }
        return index;
    }
}


