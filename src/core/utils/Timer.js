define(["require", "exports"], function(require, exports) {
    var Timer = (function () {
        function Timer(delay, repeat) {
            if (typeof repeat === "undefined") { repeat = false; }
            this._delay = delay;
            this._repeat = repeat;
        }
        Timer.prototype.update = function (delta) {
            if(!this._done && !this._stopped) {
                this._acc += delta;
                if(this._acc >= this._delay) {
                    this._acc -= this._delay;
                    if(this._repeat) {
                        this.reset();
                    } else {
                        this._done = true;
                    }
                    this.execute();
                }
            }
        };
        Timer.prototype.reset = function () {
            this._stopped = false;
            this._done = false;
            this._acc = 0;
        };
        Timer.prototype.isDone = function () {
            return this._done;
        };
        Timer.prototype.isRunning = function () {
            return !this._done && this._acc < this._delay && !this._stopped;
        };
        Timer.prototype.stop = function () {
            this._stopped = true;
        };
        Timer.prototype.setDelay = function (delay) {
            this._delay = delay;
        };
        Timer.prototype.getDelay = function () {
            return this._delay;
        };
        Timer.prototype.getPercentageRemaining = function () {
            if(this._done) {
                return 100;
            } else if(this._stopped) {
                return 0;
            } else {
                return 1 - (this._delay - this._acc) / this._delay;
            }
        };
        Timer.prototype.execute = function () {
        };
        return Timer;
    })();
    exports.Timer = Timer;    
})
//@ sourceMappingURL=Timer.js.map
