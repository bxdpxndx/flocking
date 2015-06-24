var Vec2 = require("../Vec2");

function Seek(target) {
  this.target = target;
}

Seek.prototype.get = function(seeker) {
  var desired, target;
  target = this.target() 
  if (!target) {
    console.log("no target");
    target = new Vec2;
  }
  desired = (target.subtract(seeker.position)).truncate(seeker.max_speed);
  return desired.subtract(seeker.velocity);
};

module.exports = Seek;