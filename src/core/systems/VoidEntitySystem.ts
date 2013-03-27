import MEntitySystem = module("core/EntitySystem");
import MAspect = module("core/Aspect");

import MBag = module("core/utils/Bag");

/**
* This system has an empty aspect so it processes no entities, but it still gets invoked.
* You can use this system if you need to execute some game logic and not have to concern
* yourself about aspects or entities.
*/
export class VoidEntitySystem extends MEntitySystem.EntitySystem {

    constructor() {
        super(MAspect.Aspect.getEmpty());
    }

    processEntities(entities: MBag.Bag): void {
        this.processSystem();
    }

    processSystem(): void {
        throw new Error('This method is abstract');
    }

    checkProcessing(): bool {
        return true;
    }

}