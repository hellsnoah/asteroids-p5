class Laser {
  static lasers = [];

  static create(pos, vel) {
    this.lasers.push({
      pos: pos,
      vel: vel,
    });
  }

  static tick() {
    for (let i = this.lasers.length - 1; i >= 0; i--) {
      let laser = this.lasers[i];
      let gv = createVector(Game.cx, Game.cy);
      laser.pos.add(laser.vel);

      // if outside screen
      if ((laser.pos.x < 0) || (laser.pos.x > Game.cx) ||
          (laser.pos.y < 0) || (laser.pos.y > Game.cy)) {
        this.lasers.splice(i, 1);
        continue;
      }

      // Check if it hits any asteroids
      for (let j = Game.asteroids.length - 1; j >= 0; j--) {
        let asteroid = Game.asteroids[j];
        let d = asteroid.pos.dist(laser.pos);
        if (d < asteroid.r) { // Hits
          Game.breakup(j);
          Game.increaseScore(asteroid.r);
          this.lasers.splice(i, 1);
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
