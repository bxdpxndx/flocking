import Vec2 from "./Vec2"
import {rand, mouse} from './utils';

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
    this.max_force = 150;
  }

  static random(flock) {
    let b;
    b = new Boid(flock,
      new Vec2(rand(0, window.innerWidth), rand(0, window.innerHeight)), 
      Vec2.fromPolar(rand(1, 100), rand(0, 2 * Math.PI)),
      rand(3, 5)
    );
    return b;
  };

  getForces() {
    return this.getFlockForces().add((new Vec2(mouse.x, mouse.y)).subtract(this.position).truncate(20));
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
      if (dist < 100) {
        // avoid close boids, cuadratically
        avoidanceForce = avoidanceForce.add(this.position.subtract(other.position).normalize().multiply(600/dist));
        alignmentForce = other.velocity.subtract(this.velocity).truncate(5); //.add()
      }
      if (dist < 250) {
        // go to close boids, linearly
        cohesionForce = cohesionForce.add(other.position.subtract(this.position).truncate(100));
      }
    }
    cohesionForce = cohesionForce.truncate(10);
    avoidanceForce = avoidanceForce.truncate(125);
    alignmentForce = alignmentForce.truncate(2);
    this.force = cohesionForce.add(avoidanceForce).add(alignmentForce);
    return this.force;
  };

  //END TODO

  update(interval) {
    let acceleration = this.getForces().truncate(this.max_force).multiply(interval/100);//(this.getForce().truncate(this.max_force)).divide(this.mass);
    this.velocity = this.velocity.add(acceleration).truncate(this.max_speed);
    this.position = this.position.add(this.velocity.multiply(interval/1000));
  };

  render(ctx) {
    let scale = Math.sqrt(this.mass);

    ctx.save();

    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.velocity.heading());
    ctx.scale(scale, scale);

    ctx.lineWidth = 0.5;
    ctx.strokeStyle = "#171717";
    ctx.beginPath();
      ctx.moveTo(2, 0);
      ctx.lineTo(-4, 2);
      ctx.lineTo(-2, 0);
      ctx.lineTo(-4, -2);
      ctx.closePath();
    ctx.stroke();
    ctx.restore();
  };
}