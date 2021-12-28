let rotation = (3 / 2) * Math.PI;
const screen_radius = 180;

const selectionModes = {
  TAP: "tap",
  DIRECTION: "direction",
  PIN: "PIN",
  PATTERN: "PATTERN",
};

const directions = {
  CLOCKWISE: "clockwise",
  ANTICLOCKWISE: "anticlockwise",
};

function init_combination_lock() {
  localStorage.setItem("prevRoute", "combinationLock.html");
  clearEnteredPassword();
  localStorage.removeItem("globalDirection");
  setUserPassword([1, 2, 3, 4]);
  init_canvas();
  init_touch_handler();
  update_canvas(getTicks());
  document.addEventListener("rotarydetent", onBezelRotate);
  document.addEventListener("tizenhwkey", function (event) {
    if (event.keyName === "back") document.location.href = "index.html";
    logAttempt("ABORTED");
  });
}

function setSelectionMethod(method) {
  localStorage.setItem("selectionMethod", selectionModes[method]);
}

function getSelectionMethod() {
  return localStorage.getItem("selectionMethod");
}

function setTicks(tickNum) {
  return localStorage.setItem("globalTicks", tickNum);
}
function getTicks() {
  return localStorage.getItem("globalTicks");
}

function getEnteredPassword() {
  return localStorage
    .getItem("password")
    .split(" ")
    .map(function (val) {
      return parseInt(val);
    })
    .filter(function (val) {
      return !isNaN(val);
    });
}

function clearEnteredPassword() {
  localStorage.setItem("password", "");
}

function addValueToPassword(value) {
  let password = getEnteredPassword();
  password.push(value);
  localStorage.setItem("password", password.join(" "));
  console.log(getEnteredPassword());
}

function setUserPassword(passwordArray) {
  localStorage.setItem("userPassword", passwordArray.join(" "));
}

function getUserPassword() {
  return localStorage
    .getItem("userPassword")
    .split(" ")
    .map(function (val) {
      return parseInt(val);
    });
}

function setGlobalDirection(value) {
  localStorage.setItem("globalDirection", value);
}

function getGlobalDirection() {
  return localStorage.getItem("globalDirection");
}
