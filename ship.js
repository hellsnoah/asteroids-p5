class Ship {
  constructor(pos = createVector(width/2, height/2), size = 20, angle = PI/2, space = createVector(width, height)) {
    this.pos =  pos;
    this.space = space;
    this.vel =  createVector(0, 0);
    this.acc =  0;
    this.defacc = 0.5;
    this.r = size;
    this.heading =  angle;
    this.turnAngle =  0;
  }

  turnStart(angle) {
    this.turnAngle = angle;
  }

  turnStop() {
    this.turnAngle = 0;
  }

  turn() {
    this.heading += this.turnAngle;
  }

  accelerate() {
    if (this.acc)
      this.vel.add(p5.Vector.fromAngle(this.heading - PI/2).mult(this.acc));
  }

  boost(r) {
    this.acc = r;
  }

  render() {
    translate(this.pos.x, this.pos.y);
    rotate(this.heading);
    noFill();
    stroke(255);
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
  }

  edges() {
    if (this.pos.x < -this.r)
      this.pos.x = this.space.x + this.r;
    if (this.pos.x > this.space.x + this.r)
      this.pos.x = -this.r;
    if (this.pos.y < -this.r)
      this.pos.y = this.space.y + this.r;
    if (this.pos.y > this.space.y + this.r)
      this.pos.y = -this.r;

    //this.pos.x = ((this.pos.x % this.space.x) + this.space.x) % this.space.x;
    //this.pos.y = ((this.pos.y % this.space.y) + this.space.y) % this.space.y;
  }

  tick() {
    this.turn();
    this.accelerate();
    this.pos.add(this.vel);
    this.edges();
    this.vel.mult(0.98);
    // ship.fire();
  }
}
