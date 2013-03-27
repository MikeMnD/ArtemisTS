import MEntity = module("core/Entity");
import MEntitySystem = module("core/EntitySystem");
import MAspect = module("core/Aspect");

import MBag = module("core/utils/Bag");

/**
 * A typical entity system. Use this when you need to process entities possessing the
 * provided component types.
*/
export class EntityProcessingSystem extends MEntitySystem.EntitySystem {

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
            this.processEntity(entities.get(i));
        }
    }

    //@Override
    checkProcessing(): bool {
        return true;
    }

}