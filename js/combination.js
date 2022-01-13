function init_combination_lock() {
  localStorage.setItem("prevRoute", "combinationLock.html");
  clearEnteredPassword();
  localStorage.removeItem("globalDirection");
  loadPasswords(localStorage.getItem("participantID") || 0);
  init_canvas();
  init_touch_handler();
  update_canvas(getTicks());
  document.addEventListener("rotarydetent", onBezelRotate);
  document.addEventListener("tizenhwkey", function (event) {
    if (event.keyName === "back") document.location.href = "index.html";
    logAttempt("ABORTED");
  });
}

function navToAuthIndicator() {
  const userPass = getUserPassword();
  const enteredPass = getEnteredPassword();

  if (
    userPass.length == enteredPass.length &&
    userPass.every(function (value, index) {
      return value === enteredPass[index];
    })
  ) {
    nextPassword();
    logAttempt("SUCCESS");
    window.location.href = "authCorrect.html";
  } else {
    logAttempt("FAILURE");
    window.location.href = "authIncorrect.html";
  }
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
