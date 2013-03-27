import MManager = module("core/Manager");
import MComponent = module("core/Component");
import MComponentType = module("core/ComponentType");
import MEntity = module("core/Entity");

import MBag = module("core/utils/Bag");
import MBitSet = module("core/utils/BitSet");

export class ComponentManager extends MManager.Manager {

    private _className: string = "ComponentManager";

    private _componentsByType: MBag.Bag; //Bag of bags ... like nested arrays
    private _deleted: MBag.Bag;

    constructor() {
        super();
        this._componentsByType = new MBag.Bag();
        this._deleted = new MBag.Bag();
    }

    initialize() {
    }

    private removeComponentsOfEntity(entity: MEntity.Entity): void {

        var componentBits: MBitSet.BitSet = entity.getComponentBits();

        for (var i = componentBits.nextSetBit(0); i >= 0; i = componentBits.nextSetBit(i + 1)) {
            this._componentsByType.get(i).set(entity.getId(), null);
        }

        componentBits.clear();

    }

    public addComponent(entity: MEntity.Entity, componentType: MComponentType.ComponentType, component: MComponent.Component): void {

        var components: MBag.Bag = this._componentsByType.get(componentType.getIndex());

        if (components == null) {
            components = new MBag.Bag();
            this._componentsByType.set(componentType.getIndex(), components);
        }

        components.set(entity.getId(), component);

        entity.getComponentBits().set(componentType.getIndex());
    }


    public removeComponent(entity: MEntity.Entity, componentType: MComponentType.ComponentType): void {

        if (entity.getComponentBits().get(componentType.getIndex())) {
            this._componentsByType.get(componentType.getIndex()).set(entity.getId(), null);
            entity.getComponentBits().clear(componentType.getIndex());
        }

    }


    public getComponentsByType(componentType: MComponentType.ComponentType): MBag.Bag  {

        var components: MBag.Bag

        components = this._componentsByType.get(componentType.getIndex());
        if (components == null) {
            components = new MBag.Bag();
            this._componentsByType.set(componentType.getIndex(), components);
        }

        return components;
    }

    public getComponent(entity: MEntity.Entity, componentType: MComponentType.ComponentType): MComponent.Component {

        var components: MBag.Bag = this._componentsByType.get(componentType.getIndex());

        if (components != null) {
            return components.get(entity.getId());
        }

        return null;
    }

    public getComponentsFor(entity: MEntity.Entity, fillBag: MBag.Bag): MBag.Bag {
        var componentBits: MBitSet.BitSet = entity.getComponentBits();

        for (var i = componentBits.nextSetBit(0); i >= 0; i = componentBits.nextSetBit(i + 1)) {
            fillBag.add(this._componentsByType.get(i).get(entity.getId()));
        }

        return fillBag;
    }



}
