class Laser {
  static lasers = [];

  static create(pos, vel) {
    this.lasers.push({
      pos: pos,
      vel: vel,
    });
  }

  static tick() {
    for (let i = 0; i < this.lasers.length; i++) {
      let laser = this.lasers[i];
      let gv = createVector(Game.cx, Game.cy);
      laser.pos.add(laser.vel);
      laser.pos.rem(gv);
      laser.pos.add(gv);
      laser.pos.rem(gv);

      // Check if it hits any asteroids
      for (let j = 0; j < Game.asteroids.length; j++) {
        let asteroid = Game.asteroids[j];
        let d = asteroid.pos.dist(laser.pos);
        if (d < asteroid.r) { // Hits
          Game.breakup(j);
          this.lasers.splice(i--, 1);
          break;
        }
      };
    }
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
