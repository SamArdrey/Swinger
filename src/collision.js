function CollisionStatus(swinger, platform, stopFirstStatement) {
  this.swinger = swinger;
  this.platform = platform;
  this.stopFirstStatement = stopFirstStatement;
}

CollisionStatus.prototype.checkCollision = function checkCollision() {
  let radius = this.swinger[0].radius;
  let ballPosition = [this.swinger[0].pos[0] + radius, this.swinger[0].pos[1] + radius];
  let topEdge  = Object.assign(this.platform[0].topEdge);
  let leftEdge = Object.assign(this.platform[0].leftEdge);

  if (ballPosition[0] >= topEdge[0][0] +25 &&
      ballPosition[1] >= topEdge[0][1] -15 &&
      ballPosition[0] <= topEdge[1][0] +25 &&
      !this.stopFirstStatement) {
    this.swinger[0].velocity[1] = -(this.swinger[0].velocity[1]);
    this.stopFirstStatement = true;
  } else if (ballPosition[0] >= leftEdge[0][0] &&
             ballPosition[1] >= leftEdge[0][1]) {
    this.swinger[0].velocity[0] = -(this.swinger[0].velocity[0]);
  } else {
    //This line allows for bouncing the ball. Without it,
    //upon landing on the platform a second time,
    // the ball will not bounce. While not strictly necessary,
    // since you will hit the next level at that point, it's nice
    // to have in case I add features later on
    this.stopFirstStatement = false;
  }
};

module.exports = CollisionStatus;