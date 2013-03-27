export class Logger {

    constructor(public s: string) {
        console.log(s);
    }

    static message(s: string) {
        console.log(s);
    }

}

