function defAstGenerator(r) {
  if (r === undefined) {
    r = random(15, 70);
  }
  let maxOffset = r/2;
  let pos;
  while ((pos === undefined) ||
         (pos.dist(Game.ship.pos) <= Game.ship.r * sqrt(2) + maxOffset)) {
    pos = createVector(random(Game.cx), random(Game.cy));
  }

  let total = floor(random(5, 15));
  let offset = []
  for (let i = 0; i < total; i++)
      offset.push(random(-maxOffset, maxOffset));

  return {
    r: r,
    total: total,
    pos: pos,
    vel: p5.Vector.random2D(),
    offset: offset,
    maxOffset: maxOffset,
  };
}

class Asteroid {
  constructor(params = Game.astGenerator()) {
    this.pos = params.pos;
    this.vel = params.vel;
    this.r = params.r;
    this.total = params.total;
    this.offset = params.offset;
    this.maxOffset = params.maxOffset;
  }

  render() {
    push();
    noFill();
    stroke(255);
    translate(this.pos.x, this.pos.y);
    //ellipse(this.pos.x, this.pos.y, this.r, this.r);
    beginShape();
    for (let i = 0; i < this.total; i++) {
      let angle = map(i, 0, this.total, 0, TWO_PI);
      let r = this.r + this.offset[i]
      let x = r * cos(angle);
      let y = r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }

  // Create new obstacle (except on the ship)
  changeParams(params = Game.astGenerator()) {
    this.pos = params.pos;
    this.vel = params.vel;
    this.r = params.r;
    this.total = params.total;
    this.offset = params.offset;
    this.maxOffset = params.maxOffset;
  }

  edges() {
    let r = 2 * (this.r + this.maxOffset);
    if (this.pos.x < -r)
      this.pos.x = Game.cx + this.r;
    if (this.pos.x > Game.cx + r)
      this.pos.x = -this.r;
    if (this.pos.y < -r)
      this.pos.y = Game.cy + this.r;
    if (this.pos.y > Game.cy + r)
      this.pos.y = -this.r;
  }

  tick() {
    // Move
    this.pos.add(this.vel);
    // Keep to the canvas
    this.edges();
  }
}
