let rotation = (3 / 2) * Math.PI;
const screen_radius = 180;

export const selectionModes = {
  TAP: "tap",
  DIRECTION: "direction",
};

export const directions = {
  CLOCKWISE: "clockwise",
  ANTICLOCKWISE: "anticlockwise",
};

let global_direction = directions.CLOCKWISE;

const init_combination_lock = () => {
  clearEnteredPassword();
  setUserPassword([1, 2, 3, 4]);

  init_canvas();
  init_touch_handler();
  update_canvas(getTicks());
  document.addEventListener("rotarydetent", onBezelRotate);
  document.addEventListener("tizenhwkey", (event) => {
    if (event.keyName === "back") document.location.href = "index.html";
  });
};

const setSelectionMethod = (method) => {
  localStorage.setItem("selectionMethod", selectionModes[method]);
};

const getSelectionMethod = () => {
  return localStorage.getItem("selectionMethod");
};

const setTicks = (tickNum) => {
  return localStorage.setItem("globalTicks", tickNum);
};
const getTicks = () => {
  return localStorage.getItem("globalTicks");
};

const getEnteredPassword = () => {
  return localStorage
    .getItem("password")
    .split(" ")
    .map((val) => {
      return parseInt(val);
    })
    .filter((val) => {
      return !isNaN(val);
    });
};

const clearEnteredPassword = () => {
  localStorage.setItem("password", "");
};

const addValueToPassword = (value) => {
  let password = getEnteredPassword();
  password.push(value);
  localStorage.setItem("password", password.join(" "));
};

const setUserPassword = (passwordArray) => {
  localStorage.setItem("userPassword", passwordArray.join(" "));
};

const getUserPassword = () => {
  return localStorage
    .getItem("userPassword")
    .split(" ")
    .map((val) => {
      return parseInt(val);
    });
};
