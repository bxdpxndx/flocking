function AvoidCollision() {}

AvoidCollision.prototype.get = function(entity, other) {
  var distance;
  distance = entity.position.subtract(other.position);
  if (distance.length() < 1e-3 || distance.length() > 100) {
    new Vec2(0, 0);
  }  
  return distance.normalize().divide(Math.pow(distance.length(), 0.4));
};

module.exports = AvoidCollision;