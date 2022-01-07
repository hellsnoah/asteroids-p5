let ship;

class Ship {
  constructor(pos = createVector(width/2, height/2), size = 20, angle = PI/2, space = createVector(width, height)) {
    this.pos =  pos;
    this.space = space;
    this.vel =  createVector(0, 0);
    this.acc =  0;
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
    if (this.pos.x < this.r || this.pos.x > this.space.x - this.r)
  }

  move() {
    this.pos.add(this.vel);
    if (this.pos.x < 0)
      this.pos.x = this.space.x + this.pos.x;
    if (this.pos.x > this.space.x)
      this.pos.x = this.pos.x - this.space.x;
    if (this.pos.y < 0)
      this.pos.y = this.space.y + this.pos.y;
    if (this.pos.y > this.space.y)
      this.pos.y = this.pos.y - this.space.y;
  }

  tick() {
    this.turn();
    this.accelerate();
    this.move();
    this.vel.mult(0.95);
    // ship.fire();
  }
}

function setup() {
  createCanvas(windowWidth-50, windowHeight-50);
  ship = shipCreate();
}

function keyPressed() {
  switch (keyCode) {
    case RIGHT_ARROW:
      ship.turnStart(0.1);
      break;
    case LEFT_ARROW:
      ship.turnStart(-0.1);
      break;
    case UP_ARROW:
      ship.boost(1);
      break;
    case DOWN_ARROW:
      ship.boost(-1);
      break;
    default:
  };
}

function keyReleased() {
  if (keyCode == RIGHT_ARROW && ship.turnAngle > 0) {
    ship.turnStop();
  } else if (keyCode == LEFT_ARROW && ship.turnAngle < 0) {
    ship.turnStop();
  } else if (keyCode == UP_ARROW || keyCode == DOWN_ARROW) {
    ship.boost(0);
  }
}

function draw() {
  background(0);
  ship.tick(); // Update method
  ship.render();
}

function shipCreate() {
  return new Ship();
}
