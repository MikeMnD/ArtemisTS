/**
 * A tag class. All components in the system must extend this class.
**/

export interface IComponent {
    _className: string;
    getClassName(): string;
}

export class Component implements IComponent {

    private _className: string = "Component";

    constructor() {
    }

    getClassName() {
        return this._className;
    }

};
