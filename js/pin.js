var hasBeenTouched = false;

window.addEventListener("touchstart", onDown, false);

function init_pin_lock() {
  localStorage.setItem("prevRoute", "pinLock.html");
  setUserPassword([1, 2, 3, 4]);
  clearEnteredPassword();
  setSelectionMethod(selectionModes.PIN);
  const items = document.getElementsByClassName("item");
  Array.prototype.forEach.call(items, function (el) {
    el.addEventListener(
      "touchstart",
      function () {
        navigator.vibrate(50);
        addValueToPassword(el.id);
        validatePassword();
      },
      false
    );
  });

  document.addEventListener("tizenhwkey", function (event) {
    if (event.keyName === "back") document.location.href = "index.html";
    logAttempt("ABORTED");
  });
}

function validatePassword() {
  const userPass = getUserPassword();
  const enteredPass = getEnteredPassword();

  if (enteredPass.length !== 4) {
    return;
  }
  if (
    userPass.length === enteredPass.length &&
    userPass.every(function (value, index) {
      return value === enteredPass[index];
    })
  ) {
    logAttempt("SUCCESS");
    window.location.href = "authCorrect.html";
  } else {
    logAttempt("FAILURE");
    window.location.href = "authIncorrect.html";
  }
}

function onDown() {
  if (!hasBeenTouched) {
    startAttempt();
    hasBeenTouched = true;
  }
  return;
}
