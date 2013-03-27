import MWorld = module("core/World");
import MComponent = module("core/Component");
import MComponentType = module("core/ComponentType");
import MBag = module("core/utils/Bag");
import MEntity = module("core/Entity");

/**
 * High performance component retrieval from entities. Use this wherever you
 * need to retrieve components from entities often and fast.
 */
export class ComponentMapper {

    private _componentType: MComponentType.ComponentType;
    private _component: MComponent.Component;
    private _components: MBag.Bag;

    constructor(component: MComponent.Component, world: MWorld.World) {
        this._componentType = MComponentType.ComponentType.getTypeFor(component);
        this._components = world.getComponentManager().getComponentsByType(this._componentType);
        //this._components = 

    }

    get (entity: MEntity.Entity): MComponent.Component {
        return this._components.get(entity.getId());
    }
    /**
        * Fast and safe retrieval of a component for this entity.
        * If the entity does not have this component then null is returned.
        *
        * @param e the entity that should possess the component
        * @return the instance of the component
        */
    public getSafe(entity: MEntity.Entity): MComponent.Component {
        return this._components.get(entity.getId());
    }

    /**
     * Checks if the entity has this type of component.
     * @param e the entity to check
     * @return true if the entity has this component type, false if it doesn't.
     */
    public has(entity: MEntity.Entity): bool {
        return this.getSafe(entity) != null;
    }

    /**
     * Returns a component mapper for this type of components.
     *
     * @param type the type of components this mapper uses.
     * @param world the world that this component mapper should use.
     * @return a new mapper.
     */
    public static getFor(component: MComponent.Component, world: MWorld.World) {
        return new ComponentMapper(component, world);
    }


}
