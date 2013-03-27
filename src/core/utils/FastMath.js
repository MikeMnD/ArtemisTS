define(["require", "exports"], function(require, exports) {
    var FastMath = (function () {
        function FastMath() { }
        FastMath.PI = Math.PI;
        FastMath.SQUARED_PI = Math.PI * Math.PI;
        FastMath.HALF_PI = 0.5 * Math.PI;
        FastMath.TWO_PI = 2.0 * Math.PI;
        FastMath.THREE_PI_HALVES = FastMath.TWO_PI - FastMath.HALF_PI;
        return FastMath;
    })();
    exports.FastMath = FastMath;    
})
//@ sourceMappingURL=FastMath.js.map
