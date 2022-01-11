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
