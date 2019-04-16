const Util = {
  dist(pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },
  inherits(ChildClass, BaseClass) {
    ChildClass.prototype = Object.create(BaseClass.prototype);
    ChildClass.prototype.constructor = ChildClass;
  },
};

module.exports = Util;