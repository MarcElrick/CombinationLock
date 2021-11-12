let hasBeenTouched = false;
let previousX = 0;
let previousY = 0;

let centerTouched = false;

let timeSinceRotation = 0;
const d = new Date();
function init_touch_handler() {
  let canvas = document.getElementById("canvas");
  canvas.addEventListener("touchmove", onMove, false);
  canvas.addEventListener("touchstart", onDown, false);
  canvas.addEventListener("touchend", onUp, false);
}
function onMove(event) {
  event.preventDefault();
  if (!touchInRange(event)) {
    return;
  }

  const newX = event.changedTouches[0].pageX;
  const newY = event.changedTouches[0].pageY;

  if (!hasBeenTouched) {
    previousX = newX;
    previousY = newY;
    hasBeenTouched = true;
  }

  let angleToRotate = pointsToRotation(previousX, previousY, newX, newY);
  if (Math.abs(angleToRotate) < Math.PI / (1.5 * getTicks())) {
    return;
  }
  navigator.vibrate(20);
  rotation += angleToRotate;

  let newDirection;
  if (angleToRotate < 0) {
    newDirection = directions.CLOCKWISE;
  } else {
    newDirection = directions.ANTICLOCKWISE;
  }

  if (
    newDirection !== global_direction &&
    getSelectionMethod() === selectionModes.DIRECTION
  ) {
    submitValue();
    global_direction = newDirection;
  }

  previousX = event.changedTouches[0].pageX;
  previousY = event.changedTouches[0].pageY;
  update_canvas(getTicks());
}
function onDown(event) {
  event.preventDefault();
  hasBeenTouched = false;

  if (!touchInRange(event)) {
    centerTouched = true;
  }
  update_canvas(getTicks());
}
function onUp(event) {
  event.preventDefault();
  if (!touchInRange(event) && getSelectionMethod() === selectionModes.TAP) {
    submitValue();
  }

  if (
    touchInRange(event) &&
    getSelectionMethod() === selectionModes.DIRECTION
  ) {
    if (getEnteredPassword().length === 3) submitValue();
  }

  centerTouched = false;
  update_canvas(getTicks());
}
function touchInRange(event) {
  const x = event.changedTouches[0].pageX - screen_radius;
  const y = event.changedTouches[0].pageY - screen_radius;

  update_canvas(getTicks());
  return Math.sqrt(x * x + y * y) > 80;
}
function onBezelRotate(ev) {
  let direction = ev.detail.direction;
  let new_direction;

  if (direction == "CW") {
    new_direction = directions.CLOCKWISE;
    rotation -= Math.PI / getTicks();
  } else if (direction == "CCW") {
    rotation += Math.PI / getTicks();
    new_direction = directions.ANTICLOCKWISE;
  }

  if (
    new_direction !== global_direction &&
    getSelectionMethod() === selectionModes.DIRECTION
  ) {
    submitValue();
    global_direction = new_direction;
  }

  update_canvas(getTicks());
}
