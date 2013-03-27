import MWorld = module("core/World");
import MEntity = module("core/Entity");
import MBag = module("core/utils/Bag");

// Interface
export interface EntityObserver {

    added(e: MEntity.Entity): void;

    changed(e: MEntity.Entity): void;

    deleted(e: MEntity.Entity): void;

    enabled(e: MEntity.Entity): void;

    disabled(e: MEntity.Entity): void;

    getClassName(): string;

}

// Class
export class Manager implements EntityObserver {

    public world: MWorld.World;

    private _className: string = "Manager";

    // Constructor
    constructor() {
    }

    initialize(): void {
    }

    setWorld(world: MWorld.World): void {
        this.world = world;
    }

    getWorld(): MWorld.World {
        return this.world;
    }

    added(entity: MEntity.Entity) {
    }

    changed(entity: MEntity.Entity) {
    }

    deleted(entity: MEntity.Entity) {
    }

    enabled(entity: MEntity.Entity) {
    }

    disabled(entity: MEntity.Entity) {
    }

    getClassName() {
        return this._className;
    }

}


