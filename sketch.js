function setup() {
  Game.cx = windowWidth - 50;
  Game.cy = windowHeight - 50;
  createCanvas(Game.cx, Game.cy);
  Game.init();
}

function draw() {
  background(0);
  Game.gameLoopFunc();
}

function keyPressed() {
  switch (keyCode) {
    case RIGHT_ARROW:
      Game.ship.turnRight();
      break;
    case LEFT_ARROW:
      Game.ship.turnLeft();
      break;
    case UP_ARROW:
      Game.ship.boost();
      break;
    case DOWN_ARROW:
      Game.ship.boostBack();
      break;
    case 32: // Space
      Game.ship.fire();
      break;
    default:
  };
}

function keyReleased() {
  if (keyCode == RIGHT_ARROW && Game.ship.turnAngle > 0) {
    Game.ship.turnStop();
  } else if (keyCode == LEFT_ARROW && Game.ship.turnAngle < 0) {
    Game.ship.turnStop();
  } else if (keyCode == UP_ARROW || keyCode == DOWN_ARROW) {
    Game.ship.boostStop();
  }
}
