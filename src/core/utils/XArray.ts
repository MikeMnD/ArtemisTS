export class XArray {
    constructor() {
        Array.apply(this, arguments);
        return new Array();
    }
    // we need this, or TS will show an error,
    //XArray["prototype"] = new Array(); will replace with native js arrray function
    toString(): string { return ""; };
    toLocaleString(): string { return ""; };
    concat(items: any[][]): any[] { return []; };
    join(seperator?: string): string { return ""; };
    pop(): any { return ""; };
    push(...items: _element[]): number { return 0; };
    reverse(): any[] { return []; };
    shift(): any { };
    slice(start: number, end?: number): any[] { return [] };
    sort(compareFn?: (a: any, b: any) => number): any[] { return []; };
    splice(start: number, deleteCount?: number, items?: any[]): any[] { return []; };
    unshift(...items: _element[]): number { return 0; };
    indexOf(searchElement: any, fromIndex?: number): number { return 0; };
    lastIndexOf(searchElement: any, fromIndex?: number): number { return 0; };
    every(callbackfn: (value: any, index: number, array: any[]) => bool, thisArg?: any): bool { return true; };
    some(callbackfn: (value: any, index: number, array: any[]) => bool, thisArg?: any): bool { return true; };
    forEach(callbackfn: (value: any, index: number, array: any[]) => void , thisArg?: any): void { };
    map(callbackfn: (value: any, index: number, array: any[]) => any, thisArg?: any): any[] { return []; };
    filter(callbackfn: (value: any, index: number, array: any[]) => bool, thisArg?: any): any[] { return []; };
    reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: any[]) => any, initialValue?: any): any { return ""; };
    reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: any[]) => any, initialValue?: any): any { return ""; };
    length: number;
}

//Adding Arrray to XArray prototype chain.
XArray["prototype"] = new Array();

