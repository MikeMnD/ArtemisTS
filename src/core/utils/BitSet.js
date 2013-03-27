define(["require", "exports"], function(require, exports) {
    var BitSet = (function () {
        function BitSet(size) {
            if (typeof size === "undefined") { size = 32; }
            this._numValue = 0;
            this.length = size;
            this._bitArray = new Array(size);
            for(var i = 0; i <= this.length - 1; i += 1) {
                this._bitArray[i] = 0;
            }
        }
        BitSet.prototype.get = function (pos) {
            if(pos < 0 || pos > 31) {
                throw new TypeError("Position range is between 0 and 31");
            }
            if(pos > this._numValue.toString(2).length - 1) {
                return 0;
            }
            return this._bitArray[pos];
        };
        BitSet.prototype.set = function (pos) {
            if(pos > this.length - 1) {
                throw new TypeError("Index too large." + pos + " " + this.length);
            }
            this._numValue |= 1 << pos;
            this._bitArray[pos] = 1;
            return this;
        };
        BitSet.prototype.clear = function (pos) {
            if(arguments.length == 1) {
                if(pos > this.length - 1) {
                    throw new TypeError("Index too large." + pos + " " + this.length);
                }
                this._numValue &= ~(1 << pos);
                this._bitArray[pos] = 0;
            } else {
                this._numValue = 0;
                for(var i = 0; i <= this.length - 1; i += 1) {
                    this._bitArray[i] = 0;
                }
            }
            return this;
        };
        BitSet.prototype.nextSetBit = function (pos) {
            while(pos < this.length - 1) {
                if(this.get(pos)) {
                    return (pos);
                }
                pos++;
            }
            return null;
        };
        BitSet.prototype.nextClearBit = function (pos) {
            while(pos < this.length) {
                if(!this.get(pos)) {
                    return (pos);
                }
                pos++;
            }
            return null;
        };
        BitSet.prototype.getBitArray = function () {
            return this._bitArray;
        };
        BitSet.prototype.getBitArrayLength = function () {
            return this._bitArray.length;
        };
        BitSet.prototype.and = function (bSet) {
            this._numValue &= bSet._numValue;
            this._bitArray = BitSet.intToArray(this._numValue);
            return this;
        };
        BitSet.prototype.andNot = function (bSet) {
            this._numValue &= ~bSet._numValue;
            this._bitArray = BitSet.intToArray(this._numValue);
            return this;
        };
        BitSet.prototype.or = function (bSet) {
            this._numValue |= bSet._numValue;
            this._bitArray = BitSet.intToArray(this._numValue);
            return this;
        };
        BitSet.prototype.xor = function (bSet) {
            this._numValue ^= bSet._numValue;
            this._bitArray = BitSet.intToArray(this._numValue);
            return this;
        };
        BitSet.prototype.leftShift = function (value) {
            this._numValue <<= value;
            this._bitArray = BitSet.intToArray(this._numValue);
            return this;
        };
        BitSet.prototype.rightShift = function (value) {
            this._numValue >>= value;
            this._bitArray = BitSet.intToArray(this._numValue);
            return this;
        };
        BitSet.prototype.zeroRightShift = function (value) {
            this._numValue >>>= value;
            this._bitArray = BitSet.intToArray(this._numValue);
            return this;
        };
        BitSet.prototype.cardinality = function () {
            var pos, sum, _ref;
            sum = 0;
            for(pos = 0 , _ref = this.length; 0 <= _ref ? pos <= _ref : pos >= _ref; 0 <= _ref ? pos++ : pos--) {
                if(this.get(pos)) {
                    sum++;
                }
            }
            return sum;
        };
        BitSet.prototype.isEmpty = function () {
            for(var i = 0; i <= this.length - 1; i += 1) {
                if(this._bitArray[i] != 0) {
                    return false;
                }
                ;
            }
            return true;
        };
        BitSet.prototype.intersects = function (bSet) {
            for(var i = 0; i <= this.length - 1; i += 1) {
                if(this._bitArray[i] != 0 && this._bitArray[i] == bSet._bitArray[i]) {
                    return true;
                }
                ;
            }
            return false;
        };
        BitSet.prototype.toString = function () {
            var pos, result, _ref;
            result = [];
            for(pos = 0 , _ref = this.length - 1; 0 <= _ref ? pos <= _ref : pos >= _ref; 0 <= _ref ? pos++ : pos--) {
                if(this.get(pos)) {
                    result.push(pos);
                }
            }
            return "{" + (result.join(",")) + "}";
        };
        BitSet.prototype.toBinaryString = function () {
            return this._numValue.toString(2);
        };
        BitSet.prototype.toNumber = function () {
            return parseInt(this.toBinaryString(), 2);
        };
        BitSet.intToArray = function intToArray(int) {
            var bitsetArray = [];
            for(var i = 0; i <= 31; i += 1) {
                bitsetArray[i] = 0;
            }
            if(int < -2147483648 || int > 2147483647) {
                throw new TypeError("Number - out of 32bit range must be between -2147483648 and 2147483647.");
            }
            var binaryString = int.toString(2);
            var tempArray = binaryString.split('');
            tempArray.reverse();
            for(var i = 0; i < tempArray.length; i++) {
                bitsetArray[i] = parseInt(tempArray[i], 10);
            }
            bitsetArray.reverse();
            return bitsetArray;
        };
        BitSet.binaryStringToArray = function binaryStringToArray(binaryString) {
            if(binaryString.length > 32) {
                throw new TypeError("Binary string - out of 32bit range must no more then 32 char long.");
            }
            var bitsetArray = [];
            var tempArray = binaryString.split('');
            for(var i = 0; i < tempArray.length; i++) {
                bitsetArray[i] = parseInt(tempArray[i], 10);
            }
            return bitsetArray;
        };
        BitSet.bitArrayToString = function bitArrayToString(array) {
            var tempArray = array.slice(0);
            tempArray.reverse();
            return tempArray.join("");
        };
        BitSet.arrayToInt = function arrayToInt(array) {
            var binaryString = array.join("");
            var int = parseInt(binaryString, 2);
            return int;
        };
        BitSet.fromString = function fromString(binaryString) {
            var int = parseInt(binaryString, 2);
            var bSet = new BitSet();
            bSet._numValue = int;
            bSet._bitArray = BitSet.intToArray(int);
            return bSet;
        };
        BitSet.fromNumber = function fromNumber(int) {
            return BitSet.fromString(int.toString(2));
        };
        BitSet.fromArray = function fromArray(array) {
            return BitSet.fromString(BitSet.arrayToInt(array).toString(2));
        };
        return BitSet;
    })();
    exports.BitSet = BitSet;    
})
//@ sourceMappingURL=BitSet.js.map
