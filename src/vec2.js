export default class Vec2 {

    constructor(x, y) {
      this.x = x || 0;
      this.y = y || 0;
    }

    static fromPolar(length, angle) {
      let v;
      v = new Vec2(length, 0);
      return v.rotate(angle);
    };

    copy() {
      return new Vec2(this.x, this.y);
    };

    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    };

    normalize() {
      let m = this.length();
      if (m > 0) {
        return this.divide(m);
      } else {
        return new Vec2(0, 0);
      }
    };

    withLength(length) {
      return this.normalize().multiply(length);
    };

    truncate(max_len) {
      if (this.length() > max_len) {
        return this.withLength(max_len);
      } else {
        return this.copy();
      }
    };

    heading() {
      return Math.atan2(this.y, this.x);
    };

    sqdist(other) {
      let dx, dy;
      dx = this.x - other.x;
      dy = this.y - other.y;
      return dx * dx + dy * dy;
    };

    dist(other) {
      return Math.sqrt(this.sqdist(other));
    };

    add(other) {
      return new Vec2(this.x + other.x, this.y + other.y);
    };

    subtract(other) {
      return new Vec2(this.x - other.x, this.y - other.y);
    };

    multiply(n) {
      return new Vec2(this.x * n, this.y * n);
    };

    divide(n) {
      return new Vec2(this.x / n, this.y / n);
    };

    dot(other) {
      return this.x * other.x + this.y * other.y;
    };

    rotate(angle) {
      return new Vec2((Math.cos(angle)) * this.x - (Math.sin(angle)) * this.y, (Math.sin(angle)) * this.x + (Math.cos(angle)) * this.y);
    };

    project(other) {
      return other.multiply(this.dot(other.norm()));
    };

    isValid() {
      return (this.x !== Infinity) && !isNaN(this.x) && (this.y !== Infinity) && !isNaN(this.y);
    };
}
