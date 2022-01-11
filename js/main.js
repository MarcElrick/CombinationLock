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
