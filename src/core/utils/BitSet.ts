export class BitSet {

    private _numValue: number;
    private _bitArray: number[];

    public length: number;

    /*
    //
    //Initialize a _numValue bitwise operations are done over int Numbers in javascript
    //the left-most bit is 0 when the number is positive and 1 when the number is negative. Thus, it is called the sign bit.
    //example
     00000000000000000000000100111010  = 314
     11111111111111111111111011000110  = -314
     00000000000000000000000000000001 = 1;
     11111111111111111111111111111111  = -1
     10000000000000000000000000000000 = 2147483647 = maximum
    -10000000000000000000000000000000 = -2147483648 = minimum
    more info: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Operators/Bitwise_Operators
    //
    */
    constructor(size: number = 32) {
        this._numValue = 0;
        this.length = size;
        this._bitArray = new Array(size);
        for (var i = 0; i <= this.length - 1; i += 1) {
            this._bitArray[i] = 0;
        }
    }

    get (pos: number) {
        
        if (pos < 0 || pos > 31) {
            throw new TypeError("Position range is between 0 and 31");
        }
        if (pos > this._numValue.toString(2).length-1) {
            //requested bit is insignificat
            return 0;
        }
        return this._bitArray[pos];

        //or this way from the this._numValue
        //if (this._numValue & (1 << pos)) {
        //    //n - th bit is set
        //    return 1;
        //} else {
        //    //n-th bit is not set
        //    return 0;
        //}
    }

    set (pos: number) {
        if (pos > this.length - 1) {
            throw new TypeError("Index too large." + pos + " " + this.length);
        }
        this._numValue|= 1 << pos;
        this._bitArray[pos] = 1;
        return this;
    }

    clear(pos?: number){
        if (arguments.length == 1) {

            if (pos > this.length - 1) {
                throw new TypeError("Index too large." + pos + " " + this.length);
            }
            this._numValue &= ~(1 << pos);
            this._bitArray[pos] = 0;
            
        } else {
            this._numValue = 0;
            for (var i = 0; i <= this.length - 1; i += 1) {
                this._bitArray[i] = 0;
            }
        }
        return this;
    }

    nextSetBit(pos: number) {
        while (pos < this.length -1) {
            if (this.get(pos)) {
                return(pos);
            }
            pos++;
        }
        return null;
    }

    nextClearBit(pos: number) {
        while (pos < this.length) {
            if (!this.get(pos)) {
                return (pos);
            }
            pos++;
        }
        return null;
    }

    getBitArray(): number[] {
        return this._bitArray;
    }

    getBitArrayLength(): number {
        return this._bitArray.length;
    }

    and(bSet: BitSet) {
        this._numValue &= bSet._numValue;
        this._bitArray = BitSet.intToArray(this._numValue);
        return this;
    }

    andNot(bSet: BitSet ) {
        this._numValue &= ~ bSet._numValue;
        this._bitArray = BitSet.intToArray(this._numValue);
        return this;
    }

    or(bSet: BitSet) {
        this._numValue |= bSet._numValue;
        this._bitArray = BitSet.intToArray(this._numValue);
        return this;
    }

    xor(bSet: BitSet ) {
        this._numValue ^= bSet._numValue;
        this._bitArray = BitSet.intToArray(this._numValue);
        return this;
    }

    leftShift(value: number): BitSet {
        this._numValue <<= value;
        this._bitArray = BitSet.intToArray(this._numValue);
        return this;
    }

    rightShift(value: number) {
        this._numValue >>= value;
        this._bitArray = BitSet.intToArray(this._numValue);
        return this;
    }

    zeroRightShift(value: number) {
        this._numValue >>>= value;
        this._bitArray = BitSet.intToArray(this._numValue);
        return this;
    }

    cardinality() {
        var pos, sum, _ref;
        sum = 0;
        for (pos = 0, _ref = this.length; 0 <= _ref ? pos <= _ref : pos >= _ref; 0 <= _ref ? pos++ : pos--) {
            if (this.get(pos)) sum++;
        }
        return sum;
    };

    isEmpty() {
        for (var i = 0; i <= this.length - 1; i += 1) {
            if (this._bitArray[i] != 0) {
                return false;
            };
        }
        return true;
    }

    intersects(bSet: BitSet) {
        for (var i = 0; i <= this.length - 1; i += 1) {
            if (this._bitArray[i] != 0 && this._bitArray[i] == bSet._bitArray[i]) {
                return true;
            };
        }
        return false;
    }

    //TO METHODS

    toString() {
        var pos, result, _ref;
        result = [];
        for (pos = 0, _ref = this.length -1; 0 <= _ref ? pos <= _ref : pos >= _ref; 0 <= _ref ? pos++ : pos--) {
            if (this.get(pos)) result.push(pos);
        }
        return "{" + (result.join(",")) + "}";
    }

    toBinaryString(): string {
        return this._numValue.toString(2);
    }

    toNumber(): Number {
        return parseInt(this.toBinaryString(), 2);
    }

    //STATIC METHODS

    static intToArray(int: number) {
        var bitsetArray: number[] = [];
        for (var i = 0; i <= 31; i += 1) {
            bitsetArray[i] = 0;
        }
        if (int < -2147483648 || int > 2147483647) {
            throw new TypeError("Number - out of 32bit range must be between -2147483648 and 2147483647.");
        }
        var binaryString: string = int.toString(2);
        var tempArray: string[] = binaryString.split('');

        tempArray.reverse();
        for (var i = 0; i < tempArray.length; i++) {
            bitsetArray[i] = parseInt(tempArray[i], 10);
        }
        bitsetArray.reverse();
        return bitsetArray;
    }

    static binaryStringToArray(binaryString: string) {
        if (binaryString.length > 32) {
            throw new TypeError("Binary string - out of 32bit range must no more then 32 char long.");
        }
        var bitsetArray: number[] = [];
        var tempArray: string[] = binaryString.split('');
        for (var i = 0; i < tempArray.length; i++) {
            bitsetArray[i] = parseInt(tempArray[i], 10);
        }
        return bitsetArray;
    }

    static bitArrayToString(array: number[]) {
        var tempArray = array.slice(0);
        tempArray.reverse();
        return tempArray.join("");
    }

    static arrayToInt(array: number[]): number {
        var binaryString: string = array.join("");
        var int: number = parseInt(binaryString, 2);
        return int;
    }

    static fromString(binaryString: string): BitSet{
        var int: number = parseInt(binaryString, 2);
        var bSet = new BitSet();
        bSet._numValue = int;
        bSet._bitArray = intToArray(int);
        return bSet;
    }

    static fromNumber(int: number): BitSet {
        return fromString(int.toString(2));
    }

    static fromArray(array: number[]): BitSet {
        return fromString(arrayToInt(array).toString(2));
    }

}