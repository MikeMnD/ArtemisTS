import MIntervalEntitySystem = module("core/systems/IntervalEntitySystem");
import MEntity = module("core/Entity");
import MAspect = module("core/Aspect");

import MBag = module("core/utils/Bag");

/**
 * If you need to process entities at a certain interval then use this.
 * A typical usage would be to regenerate ammo or health at certain intervals, no need
 * to do that every game loop, but perhaps every 100 ms. or every second.
 *
 *
 */
export class IntervalEntityProcessingSystem extends MIntervalEntitySystem.IntervalEntitySystem {

    private _acc: number = 0;
    public interval: number;

    constructor(aspect: MAspect.Aspect, interval: number) {
        super(aspect, interval);
    }

    checkProcessing(): bool {
        this._acc += this.world.delta;
        if (this._acc >= this.interval) {
            this._acc -= this.interval;
            return true;
        }
        return false;
    }

    /**
    * Process a entity this system is interested in.
    * @param entity the entity to process.
    */
    processEntity(entity: MEntity.Entity): void {
        throw new Error('This method is abstract');
    }


    //@Override
    processEntities(entities: MBag.Bag): void {
        for (var i = 0, s = entities.size; s > i; i++) {
            this.processEntity(entities.get(i));
        }
    }


}