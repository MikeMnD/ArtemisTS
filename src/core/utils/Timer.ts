interface Timer {
    _delay: number;
    _repeat?: bool;
}

export class Timer {

    private _delay: number;
    private _repeat: bool;
    private _acc: number;
    private _done: bool;
    private _stopped: bool;

    constructor(delay: number, repeat: bool = false) {
        this._delay = delay;
        this._repeat = repeat;
    }

    update(delta: number): void {
        if (!this._done && !this._stopped) {
            this._acc += delta;

            if (this._acc >= this._delay) {
                this._acc -= this._delay;

                if (this._repeat) {
                    this.reset();
                } else {
                    this._done = true;
                }

                this.execute();
            }
        }
    }

    reset(): void {
        this._stopped = false;
        this._done = false;
        this._acc = 0;
    }

    isDone(): bool {
        return this._done;
    }

    isRunning(): bool {
        return !this._done && this._acc < this._delay && !this._stopped;
    }

    stop(): void {
        this._stopped = true;
    }

    setDelay(delay: number): void {
        this._delay = delay;
    }

    getDelay(): number {
        return this._delay;
    }

    getPercentageRemaining(): number {
        if (this._done)
            return 100;
        else if (this._stopped)
            return 0;
        else
            return 1 - (this._delay - this._acc) / this._delay;
    }


    execute(): void {
    }


}

