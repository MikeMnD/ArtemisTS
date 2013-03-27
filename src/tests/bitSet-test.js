var bits1 = new MBitSet.BitSet();
var bits2 = new MBitSet.BitSet();

bits1 = MBitSet.BitSet.fromString("01001000");
bits2 = MBitSet.BitSet.fromString("10111000");


console.log("\nInitial pattern in bits1: ");
console.log(bits1.toString());
console.log(bits1.toBinaryString());

console.log("\nInitial pattern in bits2: ");
console.log(bits2.toString());
console.log(bits2.toBinaryString());

//// AND bits
bits2.and(bits1);
console.log("\nbits2 AND bits1: ");
console.log(bits2.toNumber());
console.log(bits2.toBinaryString());


//// OR bits
bits2 = MBitSet.BitSet.fromString("10111000");//reset 
bits2.or(bits1);
console.log("\nbits2 OR bits1: ");
console.log(bits2.toNumber());
console.log(bits2.toBinaryString());

//// XOR bits
bits2 = MBitSet.BitSet.fromString("10111000");//reset 
bits2.xor(bits1);
console.log("\nbits2 XOR bits1: ");
console.log(bits2.toNumber());
console.log(bits2.toBinaryString());






var bits1 = new MBitSet.BitSet();
var bits2 = new MBitSet.BitSet();

//bits1 = MBitSet.BitSet.fromString("0100010011101111100011");
bits2 = MBitSet.BitSet.fromString("1111111111111111111111111111111");
bits1.set(7).set(8).set(9).set(12).set(10).set(11).set(14).set(21).set(28).set(30);
console.log(1 << 30);
console.log("\nInitial pattern in bits1: ");
console.log(bits1.toBinaryString());
//console.log(bits1.getBitArray());
//console.log(MBitSet.BitSet.bitArrayToString(bits1.getBitArray()));
//console.log(bits1.get(7));
console.log(bits1.nextSetBit(3));
console.log(bits1.nextClearBit(7));
console.log(parseInt(bits2.toBinaryString(), 2));










var bits1 = new MBitSet.BitSet();
var bits2 = new MBitSet.BitSet();

//bits1 = MBitSet.BitSet.fromString("01111010");
//bits2 = MBitSet.BitSet.fromString("00001000");

for (var i = 0; i < 16; i++) {
    if ((i % 2) == 0) bits1.set(i);
    if ((i % 5) != 0) bits2.set(i);
}

console.log("\nInitial pattern in bits1: ");
console.log(bits1.toBinaryString());

console.log("\nInitial pattern in bits2: ");
console.log(bits2.toBinaryString());

//// AND bits
bits2.and(bits1);
console.log("\nbits2 AND bits1: ");
console.log(bits2.toString());
console.log(bits2.toBinaryString());

//// OR bits
bits2.or(bits1);
console.log("\nbits2 OR bits1: ");
console.log(bits2.toString());
console.log(bits2.toBinaryString());

//// XOR bits
bits2.xor(bits1);
console.log("\nbits2 XOR bits1: ");
console.log(bits2.toString());
console.log(bits2.toBinaryString());


//// XOR bits
bits2.xor(bits1);
console.log("Next set bit on pos: " + 1 + " in bits1: ");
console.log(bits1.get(0));
console.log("Next set bit on pos: " + 4 + " in bits1: ");
console.log(bits1.get(1));
console.log("Next set bit on pos: " + 4 + " in bits1: ");
console.log(bits2.get(4));