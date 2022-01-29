let hasBeenTouched = false;
let previousX = 0;
let previousY = 0;
let firstTouch = false;

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
  if (Math.abs(angleToRotate) < Math.PI / (3 * getTicks())) {
    return;
  }

  let oldRotation = rotation;
  navigator.vibrate(20);
  rotation += angleToRotate;

  let newDirection;
  if (angleToRotate < 0) {
    newDirection = directions.CLOCKWISE;
  } else {
    newDirection = directions.ANTICLOCKWISE;
  }

  let globalDirection = getGlobalDirection();
  if (globalDirection === null) {
    setGlobalDirection(newDirection);
    return;
  }

  if (
    newDirection !== globalDirection &&
    getSelectionMethod() === selectionModes.DIRECTION
  ) {
    submitValue(oldRotation);
    setGlobalDirection(newDirection);
  }

  previousX = event.changedTouches[0].pageX;
  previousY = event.changedTouches[0].pageY;
  update_canvas(getTicks());
}
function onDown(event) {
  event.preventDefault();
  hasBeenTouched = false;

  if (!firstTouch) {
    firstTouch = true;
    startAttempt();
  }

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
