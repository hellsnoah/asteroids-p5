class Game {
  static asteroids = [];
  static ship;
  static cx;
  static cy;
  static gameEnd;
  static score;
  static astGenerator = defAstGenerator;
  static shipGenerator = defShipGenerator;

  static init() {
    this.score = 0;
    this.ship = new Ship();
    this.asteroids = [];
    for (let i = 0; i < 5; i++) {
      this.asteroids.push(new Asteroid());
    }
    this.gameEnd = false;
  }

  static gameLoopFunc() {
    background(0);
    if (!this.gameEnd) {
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

      // Keep adding obstacles
      for (let i = this.asteroids.length; i < 5; i++)
        this.asteroids.push(new Asteroid());

      // Display score
      fill(255);
      textSize(32);
      text(this.score.toString(), 40, 40);
      // Check colliion of ship
      if (this.ship.hits())
        this.gameEnd = true;
    } else {
      // Endscreen
      let l = this.asteroids.length
      for (let i = 0; i < l; i++) {
        let asteroid = this.asteroids[i];
        asteroid.render();
      }
      Laser.render();
      this.ship.render();
      fill(255);
      textSize(32);
      textAlign(CENTER, CENTER);
      text(this.score.toString(), this.cx/2, this.cy/2);
      text("Press 'P' to restart game!", this.cx/2, this.cy/2 + 50);
    }
  }

  static increaseScore(r) {
    this.score += floor(r);
  }

  static breakup(ast_index) {
    let asteroid = this.asteroids[ast_index];
    if (asteroid.r < 30) {
      this.asteroids.splice(ast_index, 1);
    } else {
      let k = random(0.25, 0.75);
      let params1 = this.astGenerator(asteroid.r * pow(k, 1/3));
      params1.pos = asteroid.pos.copy();
      params1.vel = asteroid.vel.copy().mult(1/sqrt(1-k));
      params1.vel.rotate(random(-1, 1));
      this.asteroids.push(new Asteroid(params1));

      let params2 = this.astGenerator(asteroid.r * pow(1 - k, 1/3));
      params2.pos = asteroid.pos.copy();
      let moment_ast = asteroid.vel.copy().mult(pow(asteroid.r, 3));
      let moment1 = params1.vel.copy().mult(pow(params1.r, 3));
      let moment2 = moment_ast.sub(moment1);
      params2.vel = moment2.div(pow(params2.r, 3))
      this.asteroids.push(new Asteroid(params2));

      this.asteroids.splice(ast_index, 1);
    }
  }
}
