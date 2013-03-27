import MXArray = module("core/utils/XArray");

export interface IList {
    getObject(index: number): Object;
}

export class List extends MXArray.XArray implements IList{

    constructor() {
        super();
    }

    getObject(index: number) {
        return <Object> this[index];
    }

}