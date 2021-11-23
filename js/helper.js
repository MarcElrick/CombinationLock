function pointsToRotation(x1, y1, x2, y2) {
  if (x1 == 180) x1 += 0.5;
  if (x2 == 180) x2 += 0.5;

  const m1 = (screen_radius - y1) / (screen_radius - x1);
  const m2 = (screen_radius - y2) / (screen_radius - x2);
  const tanTheta = (m2 - m1) / (1 + m2 * m1);
  const output = Math.atan(tanTheta);

  return output;
}

function rotationToValue(numTicks, rotation) {
  value =
    -Math.round(
      (((rotation - (3 * Math.PI) / 2) % (2 * Math.PI)) * numTicks) /
        (2 * Math.PI)
    ) % numTicks;

  if (value < 0) value += parseInt(numTicks);
  return value;
}

function submitValue(value) {
  value
    ? addValueToPassword(rotationToValue(getTicks(), value))
    : addValueToPassword(rotationToValue(getTicks(), rotation));

  navigator.vibrate(75);
  if (getEnteredPassword().length > 3) {
    navToAuthIndicator();
  }
  console.log(getEnteredPassword());
}
