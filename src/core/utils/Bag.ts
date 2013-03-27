import MXArray = module("core/utils/XArray");

export interface IBag {

    size: number;

    isEmpty(): bool;

    forEach(callbackfn: (value: any, index: number, array: any[]) => void , thisArg?: any): void;
}

export class Bag extends MXArray.XArray implements IBag {

    private _size: number;

    // Constructor
    constructor() {
        this._size = this.length;
        super();
    }

    public get size(): number {
        this._size = this.length;
        return this._size;
    }

    /**
    * Returns the element at the specified position in Bag.
    *
    * @param index
    *            index of the element to return
    * @return the element at the specified position in bag
    */
    public get(index: number) {
        return this[index];
    }
    public set (index: number, e: any): void {
        this._size = index + 1;
        this[index] = e;
    }



    isEmpty() {
        return this._size === 0;
    }

    /**
    * Removes the element at the specified [index] in this bag. Does this by
    * overwriting with the last element and then removing the last element.
    * @param index:number
    * @return bool 
    */
    removeAt(index: number) {

        var element = this[index]; // make copy of element to remove so it can be returned
        //var lastIndex = this._size - 1;
        //this[index] = _this[lastIndex]; // overwrite item to remove with last element
        //this[lastIndex] = null; // null last element, so gc can do its work
        //return element;
        this.splice(index, 1);
        return element;

    }

    /**
    * Remove and return the last object in the bag.
    */
    removeLast(): any {
        if (this._size > 0) {
            //var lastIndex = this._size - 1;
            //var element = this[lastIndex];
            //this[lastIndex] = null;
            //return element;
            return this.pop(); //removes and return the last element
        }
        return null;
    }

    /**
    * Removes all of the elements from this bag. The bag will be empty after
    * this call returns.
    */
    clear(): void {
        this.length = 0;
        this._size = 0;
    }

    /**
     * Check if bag contains this element.
     *
     * @param element:any
     * @return bool
     */
    contains(element: any): bool {
        var i = 0;
        for (i; this._size > i; i++) {
            if (element === this[i]) {
                return true;
            }
        }
        return false;
    }

    /**
   * Removes the first occurrence of the specified element from this bag, if
   * it is present. If the Bag does not contain the element, it is unchanged.
   * Does this by overwriting with the last element and then removing the last
   * element.
   * Returns [:true:] if this list contained the specified element.
   */
    remove(element: any): bool {
        var i = 0;
        for (i; i < this._size; i += 1) {
            var el: any = this[i];

            if (el === element) {
                var lastIndex = this._size - 1;
                this[i] = this[lastIndex]; // overwrite item to remove with last
                // element
                this.pop(); // removes the last element
                return true;
            }
        }

        return false;
    }


    /**
     * Removes from this Bag all of its elements that are contained in the
     * specified [bag].
     *
     * Retur s [:true:] if this Bag changed as a result of the call
     */
    removeAll(bag: IBag): bool {
        var modified: bool = false;
        var i = 0;
        for (i; i < bag.size; i += 1) {
            var el1: any = bag[i];
            var j = 0;
            for (j; j < this.size; j += 1) {
                var el2: any = this[j];

                if (el1 == el2) {
                    this.removeAt(j);
                    j -= 1;
                    modified = true;
                    break;
                }
            }
        }

        return modified;
    }


    /**
    * Adds the specified element to the end of this bag.
    */
    add(element: any): void {
        var newIndex: number = this._size + 1;
        this[newIndex] = element;
    }

    /**
    * Add all [items] into this bag.
    */
    addAll(items: any[]): void {
        this.concat(items);
    }


}

