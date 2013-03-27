export interface IHashmap {

}

export class Hashmap implements IHashmap {

    private _keys: any[];
    private _values: any[];

    constructor() {
        this._keys = [];
        this._values = [];
    }

    add(key, value) {
        var keyIndex = this.getIndex(key);
        if (keyIndex >= 0) {
            this._values[keyIndex] = value;
        } else {
            this._keys.push(key);
            this._values.push(value);
        }
    };
    remove(key): any {
        var keyIndex = this.getIndex(key);
        if (keyIndex >= 0) {
            var removedValue = this._values[keyIndex];
            this._keys.splice(keyIndex, 1);
            this._values.splice(keyIndex, 1);
            return removedValue;
        } else {
            throw "Key does not exist";
        }
    };
    getValue(key) {
        var value = null;
        var keyIndex = this.getIndex(key);
        if (keyIndex >= 0) {
            value = this._values[keyIndex];
        }
        return value;
    };
    getIndex(testKey) {
        var i = 0,
			len = this._keys.length,
			key;
        for (; i < len; ++i) {
            key = this._keys[i];
            if (key == testKey) {
                return i;
            }
        }
        return -1;
    };
    has(testKey) {
        var i = 0,
			len = this._keys.length,
			key;
        for (i; i < len; ++i) {
            key = this._keys[i];
            if (key == testKey) {
                return true;
            }
        }
        return false;
    };
    values(): any[] {
        var i = 0,
            len = this._keys.length,
            key,
            value;
        var arValue: any[] = [];

        for (; i < len; ++i) {
            key = this._keys[i];
            value = this._values[i];
            arValue.push(value);
        }
        return arValue;
    }
    forEach(action) {
        var i = 0,
			len = this._keys.length,
			key,
			value;

        for (; i < len; ++i) {
            key = this._keys[i];
            value = this._values[i];
            var breakHere = action(key, value);
            if (breakHere == "return") {
                return false;
            }
        }
        return true;
    };

}