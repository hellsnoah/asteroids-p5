function defShipGenerator() {
  return {
    pos: createVector(Game.cx/2, Game.cy/2),
    vel: createVector(0, 0),
    defAcc: 0.5,
    defTurn: 0.1,
    size: 20,
    angle: PI/2,
  }
}

class Ship {
  constructor(params = Game.shipGenerator()) {
    this.pos =  params.pos;
    this.vel =  params.vel;
    this.acc =  0;
    this.defAcc = params.defAcc;
    this.r = params.size;
    this.heading =  params.angle;
    this.turnAngle =  0;
    this.defTurn = params.defTurn;
  }

  turnRight() {this.turnAngle = this.defTurn;}

  turnLeft() {this.turnAngle = -this.defTurn;}

  turnStop() {this.turnAngle = 0;}

  boost() {this.acc = this.defAcc;}

  boostStop() {this.acc = 0;}

  boostBack() {this.acc = -this.defAcc;}

  render() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading);
    fill(0);
    stroke(255);
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
    pop();
  }

  edges() {
    if (this.pos.x < -this.r)
      this.pos.x = Game.cx + this.r;
    if (this.pos.x > Game.cx + this.r)
      this.pos.x = -this.r;
    if (this.pos.y < -this.r)
      this.pos.y = Game.cy + this.r;
    if (this.pos.y > Game.cy + this.r)
      this.pos.y = -this.r;
  }

  fire() {
    Laser.create(this.pos.copy(), p5.Vector.fromAngle(this.heading - PI/2).mult(10))
  }

  hits() {
    // check Collion with asteroid
    for (let i = Game.asteroids.length - 1; i >= 0; i--) {
      let d = this.pos.dist(Game.asteroids[i].pos);
      if (d < this.r + Game.asteroids[i].r) {
        return true;
      }
    }
    return false;
  }

  tick() {
    // Turning
    this.heading += this.turnAngle;
    // Accelerating
    if (this.acc)
      this.vel.add(p5.Vector.fromAngle(this.heading - PI/2).mult(this.acc));
    // Moving
    this.pos.add(this.vel);
    // Keep to the canvas
    this.edges();
    // Motion Dampening
    this.vel.mult(0.98);
  }
}
