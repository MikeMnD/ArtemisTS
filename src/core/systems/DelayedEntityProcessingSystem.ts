import MEntity = module("core/Entity");
import MEntitySystem = module("core/EntitySystem");
import MAspect = module("core/Aspect");

import MBag = module("core/utils/Bag");
/**
 * The purpose of this class is to allow systems to execute at varying intervals.
 *
 * An example system would be an ExpirationSystem, that deletes entities after a certain
 * lifetime. Instead of running a system that decrements a timeLeft value for each
 * entity, you can simply use this system to execute in a future at a time of the shortest
 * lived entity, and then reset the system to run at a time in a future at a time of the
 * shortest lived entity, etc.
 *
 * Another example system would be an AnimationSystem. You know when you have to animate
 * a certain entity, e.g. in 300 milliseconds. So you can set the system to run in 300 ms.
 * to perform the animation.
 *
 * This will save CPU cycles in some scenarios.
 *
 * Implementation notes:
 * In order to start the system you need to override the inserted(Entity e) method,
 * look up the delay time from that entity and offer it to the system by using the
 * offerDelay(delay number) method.
 * Also, when processing the entities you must also call offerDelay(delay number)
 * for all valid entities.
 *
 *
 */
export class EntityProcessingSystem extends MEntitySystem.EntitySystem {

    private _delay: number;
    private _running: bool;
    private _acc: number;


    constructor(aspect: MAspect.Aspect) {
        super(aspect);
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
            var entity: MEntity.Entity = entities.get(i);
            this.processDelta(entity, this._acc);
            var remaining: number = this.getRemainingDelay(entity);
            if (remaining <= 0) {
                this.processExpired(entity);
            } else {
                this.offerDelay(remaining);
            }
        }
        this.stop();
    }


    //@Override
    inserted(entity: MEntity.Entity): void {
        var delay: number = this.getRemainingDelay(entity);
        if (delay > 0) {
            this.offerDelay(delay);
        }
    }

    /**
     * Return the delay until this entity should be processed.
     *
     * @param e entity
     * @return delay
     */
    getRemainingDelay(entity: MEntity.Entity): number {
        throw new Error('This method is abstract');
        return 1;
    }

    //@Override
    checkProcessing(): bool {
        if (this._running) {
            this._acc += this.world.getDelta();

            if (this._acc >= this._delay) {
                return true;
            }
        }
        return false;
    }


    /**
     * Process a entity this system is interested in. Substract the accumulatedDelta
     * from the entities defined delay.
     *
     * @param e the entity to process.
     * @param accumulatedDelta the delta time since this system was last executed.
     */
    processDelta(entity: MEntity.Entity, accumulatedDelta: number): void {
        throw new Error('This method is abstract');
    };

    processExpired(entity: MEntity.Entity): void {
        throw new Error('This method is abstract');
    }


    /**
     * Start processing of entities after a certain amount of delta time.
     *
     * Cancels current delayed run and starts a new one.
     *
     * @param delta time delay until processing starts.
     */
    public restart(delay: number): void {
        this._delay = delay;
        this._acc = 0;
        this._running = true;
    }

    /**
     * Restarts the system only if the delay offered is shorter than the
     * time that the system is currently scheduled to execute at.
     *
     * If the system is already stopped (not running) then the offered
     * delay will be used to restart the system with no matter its value.
     *
     * If the system is already counting down, and the offered delay is
     * larger than the time remaining, the system will ignore it. If the
     * offered delay is shorter than the time remaining, the system will
     * restart itself to run at the offered delay.
     *
     * @param delay
     */
    public offerDelay(delay: number): void {
        if (!this._running || this._delay < this.getRemainingTimeUntilProcessing()) {
            this.restart(this._delay);
        }
    }


    /**
     * Get the initial delay that the system was ordered to process entities after.
     *
     * @return the originally set delay.
     */
    public getInitialTimeDelay(): number {
        return this._delay;
    }

    /**
     * Get the time until the system is scheduled to run at.
     * Returns zero (0) if the system is not running.
     * Use isRunning() before checking this value.
     *
     * @return time when system will run at.
     */
    public getRemainingTimeUntilProcessing(): number {
        if (this._running) {
            return this._delay - this._acc;
        }
        return 0;
    }

    /**
     * Check if the system is counting down towards processing.
     *
     * @return true if it's counting down, false if it's not running.
     */
    public isRunning(): bool {
        return this._running;
    }

    /**
     * Stops the system from running, aborts current countdown.
     * Call offerDelay or restart to run it again.
     */
    public stop(): void {
        this._running = false;
        this._acc = 0;
    }



}

