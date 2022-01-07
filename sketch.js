let ship;

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
      ship.boost(ship.defacc);
      break;
    case DOWN_ARROW:
      ship.boost(-ship.defacc);
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
