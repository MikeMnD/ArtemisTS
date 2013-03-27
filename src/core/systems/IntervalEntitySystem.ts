import MEntitySystem = module("core/EntitySystem");
import MAspect = module("core/Aspect");

/**
* A system that processes entities at a interval in milliseconds.
* A typical usage would be a collision system or physics system.
*/
export class IntervalEntitySystem extends MEntitySystem.EntitySystem {

    private _acc: number = 0;
    public interval: number;

    constructor(aspect: MAspect.Aspect, interval: number) {
        super(aspect);
        this.interval = interval;
    }

    // @Override
    checkProcessing(): bool {
        this._acc += this.world.getDelta();
        if (this._acc >= this.interval) {
            this._acc -= this.interval;
            return true;
        }
        return false;
    }

}