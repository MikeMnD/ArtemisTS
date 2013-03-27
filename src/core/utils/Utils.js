define(["require", "exports"], function(require, exports) {
    var Utils = (function () {
        function Utils() { }
        Utils.cubicInterpolation = function cubicInterpolation(v0, v1, v2, v3, t) {
            var t2 = t * t;
            var a0 = v3 - v2 - v0 + v1;
            var a1 = v0 - v1 - a0;
            var a2 = v2 - v0;
            var a3 = v1;
            return (a0 * (t * t2)) + (a1 * t2) + (a2 * t) + a3;
        };
        Utils.quadraticBezierInterpolation = function quadraticBezierInterpolation(a, b, c, t) {
            return (((1 - t) * (1 - t)) * a) + (((2 * t) * (1 - t)) * b) + ((t * t) * c);
        };
        Utils.lengthOfQuadraticBezierCurve = function lengthOfQuadraticBezierCurve(x0, y0, x1, y1, x2, y2) {
            if((x0 == x1 && y0 == y1) || (x1 == x2 && y1 == y2)) {
                return Utils.distance(x0, y0, x2, y2);
            }
            var ax, ay, bx, by;
            ax = x0 - 2 * x1 + x2;
            ay = y0 - 2 * y1 + y2;
            bx = 2 * x1 - 2 * x0;
            by = 2 * y1 - 2 * y0;
            var A = 4 * (ax * ax + ay * ay);
            var B = 4 * (ax * bx + ay * by);
            var C = bx * bx + by * by;
            var Sabc = 2 * Math.sqrt(A + B + C);
            var A_2 = Math.sqrt(A);
            var A_32 = 2 * A * A_2;
            var C_2 = 2 * Math.sqrt(C);
            var BA = B / A_2;
            return (A_32 * Sabc + A_2 * B * (Sabc - C_2) + (4 * C * A - B * B) * Math.log((2 * A_2 + BA + Sabc) / (BA + C_2))) / (4 * A_32);
        };
        Utils.lerp = function lerp(a, b, t) {
            if(t < 0) {
                return a;
            }
            return a + t * (b - a);
        };
        Utils.distance = function distance(x1, y1, x2, y2) {
            return Utils.euclideanDistance(x1, y1, x2, y2);
        };
        Utils.doCirclesCollide = function doCirclesCollide(x1, y1, radius1, x2, y2, radius2) {
            var dx = x2 - x1;
            var dy = y2 - y1;
            var d = radius1 + radius2;
            return (dx * dx + dy * dy) < (d * d);
        };
        Utils.euclideanDistanceSq2D = function euclideanDistanceSq2D(x1, y1, x2, y2) {
            var dx = x1 - x2;
            var dy = y1 - y2;
            return dx * dx + dy * dy;
        };
        Utils.manhattanDistance = function manhattanDistance(x1, y1, x2, y2) {
            return Math.abs(x1 - x2) + Math.abs(y1 - y2);
        };
        Utils.euclideanDistance = function euclideanDistance(x1, y1, x2, y2) {
            var a = x1 - x2;
            var b = y1 - y2;
            return Math.sqrt(a * a + b * b);
        };
        Utils.angleInDegreesWithOwnerRotation = function angleInDegreesWithOwnerRotation(ownerRotation, x1, y1, x2, y2) {
            return Math.abs(ownerRotation - Utils.angleInDegrees(x1, y1, x2, y2)) % 360;
        };
        Utils.angleInDegrees = function angleInDegrees(originX, originY, targetX, targetY) {
            return Utils.toDegrees(Math.atan2(targetY - originY, targetX - originX));
        };
        Utils.toDegrees = function toDegrees(rad) {
            return rad * 180.0 / Math.PI;
        };
        Utils.toRad = function toRad(degrees) {
            return degrees * Math.PI / 180;
        };
        Utils.angleInRadians = function angleInRadians(originX, originY, targetX, targetY) {
            return Math.atan2(targetY - originY, targetX - originX);
        };
        Utils.shouldRotateCounterClockwise = function shouldRotateCounterClockwise(angleFrom, angleTo) {
            var diff = (angleFrom - angleTo) % 360;
            return diff > 0 ? diff < 180 : diff < -180;
        };
        Utils.getRotatedX = function getRotatedX(currentX, currentY, pivotX, pivotY, angleDegrees) {
            var x = currentX - pivotX;
            var y = currentY - pivotY;
            var xr = (x * Math.cos(Utils.toRad(angleDegrees))) - (y * Math.sin(Utils.toRad(angleDegrees)));
            return xr + pivotX;
        };
        Utils.getRotatedY = function getRotatedY(currentX, currentY, pivotX, pivotY, angleDegrees) {
            var x = currentX - pivotX;
            var y = currentY - pivotY;
            var yr = (x * Math.sin(Utils.toRad(angleDegrees))) + (y * Math.cos(Utils.toRad(angleDegrees)));
            return yr + pivotY;
        };
        Utils.getXAtEndOfRotatedLineByOrigin = function getXAtEndOfRotatedLineByOrigin(x, lineLength, angleDegrees) {
            return x + Math.cos(Utils.toRad(angleDegrees)) * lineLength;
        };
        Utils.getYAtEndOfRotatedLineByOrigin = function getYAtEndOfRotatedLineByOrigin(y, lineLength, angleDegrees) {
            return y + Math.sin(Utils.toRad(angleDegrees)) * lineLength;
        };
        Utils.collides = function collides(x1, y1, radius1, x2, y2, radius2) {
            var d = Utils.distance(x1, y1, x2, y2);
            d -= radius1 + radius2;
            return d < 0;
        };
        return Utils;
    })();
    exports.Utils = Utils;    
    var UUID = (function () {
        function UUID() {
            var uuid = this.sfour() + this.sfour() + '-' + this.sfour() + '-' + this.sfour() + '-' + this.sfour() + '-' + this.sfour() + this.sfour() + this.sfour();
            return uuid;
        }
        UUID.prototype.sfour = function () {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        };
        return UUID;
    })();
    exports.UUID = UUID;    
})
//@ sourceMappingURL=Utils.js.map
