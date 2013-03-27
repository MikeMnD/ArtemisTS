import MComponent = module("core/Component");

import MHashmap = module("core/utils/Hashmap");

export interface IComponentType {

    getIndex(): number;

    toString(): string;

    getClassName(): string;

}

export class ComponentType implements IComponentType {

    private _INDEX: number = 0;

    private _index: number;
    private _component: MComponent.Component;

    private _className: string = "ComponentType";

    //hash map with <component, componentType>
    static componentTypes: MHashmap.Hashmap = new MHashmap.Hashmap();

    constructor(component: MComponent.Component) {
        this._index = this._INDEX += 1;
        this._component = component;
    }

    public getIndex():number {
        return this._index;
    }


    public static getTypeFor(component: MComponent.Component): ComponentType {
        var type: ComponentType = componentTypes.getValue(component);

        if (type == null) {
            type = new ComponentType(component);
            componentTypes.add(component, type);
        }

        return type;
    }

    public static getIndexFor(component: MComponent.Component): number {
        return ComponentType.getTypeFor(component).getIndex();
    }

    public toString() {
        return "ComponentType[" + this._component.getClassName() + "] (" + this._index + ")";
    }

    public getClassName(): string {
        return this._className;
    }

}
