class Game {
  static asteroids = [];
  static ship;
  static cx;
  static cy;
  static astGenerator = defAstGenerator;
  static shipGenerator = defShipGenerator;

  static init() {
    this.ship = new Ship();
    for (let i = 0; i < 5; i++) {
      this.asteroids.push(new Asteroid());
    }
  }

  static gameLoopFunc() {
    let l = this.asteroids.length
    for (let i = 0; i < l; i++) {
      let asteroid = this.asteroids[i];
      asteroid.tick();
      asteroid.render();
    }
    Laser.tick();
    Laser.render();
    this.ship.tick(); // Update method
    this.ship.render();
  }

  static breakup(ast_index) {
    let asteroid = this.asteroids[ast_index];
    if (asteroid.r < 30) {
      this.asteroids.splice(ast_index, 1);
    } else {
      let d = random();
      let params = this.astGenerator(asteroid.r * d)
      params.pos = asteroid.pos.copy();
      params.vel = asteroid.vel.copy().mult(1-d).rotate(-1, 1);
      asteroid.changeParams(params);

      params = this.astGenerator(asteroid.r * (1-d));
      params.pos = asteroid.pos.copy();
      params.vel = asteroid.vel.copy().mult(1-d).rotate(-1, 1);
      this.asteroids.push(new Asteroid(params));
    }
  }
}
