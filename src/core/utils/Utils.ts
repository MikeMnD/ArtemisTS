export class Utils {

    static cubicInterpolation(v0: number, v1: number, v2: number, v3: number, t: number) {
        var t2 = t * t;
        var a0 = v3 - v2 - v0 + v1;
        var a1 = v0 - v1 - a0;
        var a2 = v2 - v0;
        var a3 = v1;

        return (a0 * (t * t2)) + (a1 * t2) + (a2 * t) + a3;
    }

    static quadraticBezierInterpolation(a: number, b: number, c: number, t: number): number {
        return (((1 - t) * (1 - t)) * a) + (((2 * t) * (1 - t)) * b) + ((t * t) * c);
    }

    static lengthOfQuadraticBezierCurve(x0: number, y0: number, x1: number, y1: number, x2: number, y2: number): number {
        if ((x0 == x1 && y0 == y1) || (x1 == x2 && y1 == y2)) {
            return distance(x0, y0, x2, y2);
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
    }

    static lerp(a: number, b: number, t: number): number {
        if (t < 0)
            return a;
        return a + t * (b - a);
    }

    static distance(x1: number, y1: number, x2: number, y2: number): number {
        return euclideanDistance(x1, y1, x2, y2);
    }

    static doCirclesCollide(x1: number, y1: number, radius1: number, x2: number, y2: number, radius2: number): bool {
        var dx = x2 - x1;
        var dy = y2 - y1;
        var d = radius1 + radius2;
        return (dx * dx + dy * dy) < (d * d);
    }

    static euclideanDistanceSq2D(x1: number, y1: number, x2: number, y2: number) {
        var dx = x1 - x2;
        var dy = y1 - y2;
        return dx * dx + dy * dy;
    }

    static manhattanDistance(x1: number, y1: number, x2: number, y2: number): number {
        return Math.abs(x1 - x2) + Math.abs(y1 - y2);
    }

    static euclideanDistance(x1: number, y1: number, x2: number, y2: number): number {
        var a = x1 - x2;
        var b = y1 - y2;

        return Math.sqrt(a * a + b * b);
    }

    static angleInDegreesWithOwnerRotation(ownerRotation: number, x1: number, y1: number, x2: number, y2: number): number {
        return Math.abs(ownerRotation - angleInDegrees(x1, y1, x2, y2)) % 360;
    }

    static angleInDegrees(originX: number, originY: number, targetX: number, targetY: number): number {
        return toDegrees(Math.atan2(targetY - originY, targetX - originX));
    }

    static toDegrees(rad: number): number {
        return rad * 180.0 / Math.PI
    };

    static toRad(degrees: number): number {
        return degrees * Math.PI / 180;
    };

    static angleInRadians(originX: number, originY: number, targetX: number, targetY: number): number {
        return Math.atan2(targetY - originY, targetX - originX);
    }

    static shouldRotateCounterClockwise(angleFrom: number, angleTo: number): bool {
        var diff = (angleFrom - angleTo) % 360;
        return diff > 0 ? diff < 180 : diff < -180;
    }

    static getRotatedX(currentX: number, currentY: number, pivotX: number, pivotY: number, angleDegrees: number): number {
        var x = currentX - pivotX;
        var y = currentY - pivotY;
        var xr = (x * Math.cos(toRad(angleDegrees))) - (y * Math.sin(toRad(angleDegrees)));
        return xr + pivotX;
    }

    static getRotatedY(currentX: number, currentY: number, pivotX: number, pivotY: number, angleDegrees: number): number {
        var x = currentX - pivotX;
        var y = currentY - pivotY;
        var yr = (x * Math.sin(toRad(angleDegrees))) + (y * Math.cos(toRad(angleDegrees)));
        return yr + pivotY;
    }

    static getXAtEndOfRotatedLineByOrigin(x: number, lineLength: number, angleDegrees: number): number {
        return x + Math.cos(toRad(angleDegrees)) * lineLength;
    }

    static getYAtEndOfRotatedLineByOrigin(y: number, lineLength: number, angleDegrees: number): number {
        return y + Math.sin(toRad(angleDegrees)) * lineLength;
    }

    static collides(x1: number, y1: number, radius1: number, x2: number, y2: number, radius2: number): bool {
        var d = distance(x1, y1, x2, y2);

        d -= radius1 + radius2;

        return d < 0;
    }
}

export class UUID {

    sfour() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    };

    constructor() {

        var uuid = this.sfour() + this.sfour() + '-' + this.sfour() + '-' + this.sfour() + '-' + this.sfour() + '-' + this.sfour() + this.sfour() + this.sfour();

        return uuid;
    }

}