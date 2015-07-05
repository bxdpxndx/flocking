import Vec2 from "../Vec2";

export default function Seek(target) {
  return function get(seeker) {
  	let myTarget= new Vec2(target.x, target.y)
  	let desired = (myTarget.subtract(seeker.position)).truncate(seeker.max_speed);
  	return desired.subtract(seeker.velocity);

  }
}

Seek.prototype.get = function(seeker) {
  var desired, target;
  desired = (target.subtract(seeker.position)).truncate(seeker.max_speed);
  return desired.subtract(seeker.velocity);
};