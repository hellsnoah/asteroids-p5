class Laser {
  static lasers = [];

  static create(pos, vel) {
    this.lasers.push({
      pos: pos,
      vel: vel,
    });
  }

  static tick() {
    this.lasers.forEach(laser => {
      let gv = createVector(Game.cx, Game.cy);
      laser.pos.add(laser.vel);
      laser.pos.rem(gv);
      laser.pos.add(gv);
      laser.pos.rem(gv);

      // Check if it hits any asteroids
      Game.asteroids.forEach((asteroid, index) => {
        let d = asteroid.pos.dist(laser.pos);
        if (d < asteroid.r) { // Hits
          Game.breakup(index);
        }
      });
    });
  }

  static render() {
    push();
    stroke(255);
    strokeWeight(4);
    this.lasers.forEach(laser => {
      point(laser.pos.x, laser.pos.y);
    })
    pop();
  }
}
