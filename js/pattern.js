const dotsize = 10;
const dotPositions = [
  [65, 65],
  [65, 180],
  [65, 295],
  [180, 65],
  [180, 180],
  [180, 295],
  [295, 65],
  [295, 180],
  [295, 295],
];
const dotvals = [-1, -1, -1, -1, -1, -1, -1, -1, -1];

var path = [];
var pivotIndex = -1;
var count = 0;

var canvas;
var context;

var currentX = null;
var currentY = null;

document.addEventListener("tizenhwkey", function (event) {
  if (event.keyName === "back") document.location.href = "index.html";
  logAttempt("ABORTED");
});

window.addEventListener(
  "touchstart",
  function (event) {
    startAttempt();
    currentX = event.changedTouches[0].pageX;
    currentY = event.changedTouches[0].pageY;
    checkPosition();
    update_canvas();
  },
  false
);
window.addEventListener(
  "touchmove",
  function (event) {
    currentX = event.changedTouches[0].pageX;
    currentY = event.changedTouches[0].pageY;
    checkPosition();
    update_canvas();
  },
  false
);

window.addEventListener(
  "touchend",
  function () {
    const pattern = getUserPassword();
    localStorage.setItem("password", dotvals.join(" "));
    if (JSON.stringify(pattern) === JSON.stringify(dotvals)) {
      logAttempt("SUCCESS");
      window.location.href = "authCorrect.html";
    } else {
      logAttempt("FAILURE");
      window.location.href = "authIncorrect.html";
    }
  },
  false
);

function init_pattern_lock() {
  localStorage.setItem("prevRoute", "patternLock.html");
  setSelectionMethod(selectionModes.PATTERN);
  setUserPassword([0, 1, 2, -1, -1, 3, -1, -1, -1]);

  init_canvas();
  update_canvas();
}

function draw_pattern_dots() {
  dotPositions.forEach(function (element, index) {
    if (dotvals[index] === -1) {
      context.fillStyle = "cyan";
    } else {
      context.fillStyle = "green";
    }
    drawCircle(dotsize, element[0], element[1]);
  });
}

function checkPosition() {
  dotPositions.forEach(function (element, index) {
    if (path.includes(index)) return;
    const x_diff = currentX - element[0];
    const y_diff = currentY - element[1];

    if (Math.sqrt(x_diff ** 2 + y_diff ** 2) < 10) {
      dotvals[index] = count;
      count++;
      pivotIndex = index;
      path.push(index);
    }
  });
}

function update_canvas() {
  context.clearRect(0, 0, 360, 360);
  draw_pattern_dots();
  draw_path_lines();
  if (currentX === null) return;
  draw_current_line();
}

function init_canvas() {
  canvas = document.getElementById("canvas");
  canvas.height = 360;
  canvas.width = 360;
  context = canvas.getContext("2d");
}

function draw_current_line() {
  if (pivotIndex === -1) return;
  context.strokeStyle = "white";
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(dotPositions[pivotIndex][0], dotPositions[pivotIndex][1]);
  context.lineTo(currentX, currentY);
  context.stroke();
}

function draw_path_lines() {
  console.log(path);
  if (path.length === 0) return;
  context.strokeStyle = "white";
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(dotPositions[path[0]][0], dotPositions[path[0]][1]);

  path.forEach(function (value) {
    console.log(value);
    context.lineTo(dotPositions[value][0], dotPositions[value][1]);
  });
  context.stroke();
}

function drawCircle(radius, x, y) {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fill();
}
