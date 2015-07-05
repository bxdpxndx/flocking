import Vec2 from "./Vec2"
import {rand, mouse} from './utils';
import seek from './behaviours/seek';

let gaussian = x => Math.exp(-x * x)

export default class Boid {
  constructor(flock, position, velocity, mass) {
    if(flock === "undefined") {
        throw new Error("a flock is required!");
    };
    this.position = position || new Vec2();
    this.velocity = velocity || new Vec2();
    this.force = new Vec2();
    this.mass = mass || 10;
    this.flock = flock;
    this.max_speed = 150;
    this.max_force = 300;
    this.behaviours = [];
    this.forces = []
  }

  static random(flock) {
    let b = new Boid(flock,
      new Vec2(rand(0, window.innerWidth), rand(0, window.innerHeight)), 
      Vec2.fromPolar(rand(1, 100), rand(0, 2 * Math.PI)),
      rand(2, 10)
    );
    return b;
  };

  getForces() {
    return this.force = this.getFlockForces().add((new Vec2(mouse.x, mouse.y)).subtract(this.position).truncate(100));
  };

  getFlockForces() {
    let cohesionForce = new Vec2();
    let avoidanceForce = new Vec2();
    let alignmentForce = new Vec2();
    for (let i = 0; i < this.flock.length; i++) {
      let other = this.flock[i];
      if (this === other) {
        continue;
      }
      let dist = this.position.dist(other.position);
      if (dist < 150) {
        avoidanceForce = avoidanceForce.add(this.position.subtract(other.position).withLength(other.mass * 200 * gaussian(dist/40)));
        alignmentForce = other.velocity.subtract(this.velocity).withLength(20);
      }
      if (dist < 250) {
        cohesionForce = cohesionForce.add(other.position.subtract(this.position).withLength(50));
      }
    }
    cohesionForce = cohesionForce.truncate(100);

    return cohesionForce.add(avoidanceForce).add(alignmentForce);
  };

  update(interval) {
    let acceleration = this.getForces().divide(this.mass).truncate(this.max_force).multiply(interval/1000);
    this.velocity = this.velocity.add(acceleration).truncate(this.max_speed);
    this.position = this.position.add(this.velocity.multiply(interval/1000));
  };

  render(ctx) {
    let scale = Math.sqrt(this.mass);

    ctx.save();

    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.velocity.heading());
    ctx.scale(scale, scale);

    ctx.lineWidth = 0.3;
    ctx.strokeStyle = "#171717";
    ctx.beginPath();
      ctx.moveTo(2, 0);
      ctx.lineTo(-4, 2);
      ctx.lineTo(-2, 0);
      ctx.lineTo(-4, -2);
      ctx.closePath();
    ctx.stroke();
    ctx.restore();

    ctx.beginPath();
      let {x, y} = this.position;
      ctx.moveTo(x,y);
      ({x, y} = this.position.add(this.force.divide(10)));
      ctx.lineTo(x, y);
    ctx.stroke();
  };
}