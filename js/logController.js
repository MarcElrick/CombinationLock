var startTime;

function beginNewLogSession() {
  console.log("Start log session");
  localStorage.setItem("currentStorageKey", new Date().toUTCString() + ".json");
  startTime = null;
  localStorage.setItem("logData", JSON.stringify([]));
}

function endLogSession() {
  console.log("endLogSession");
  localStorage.setItem(
    localStorage.getItem("currentStorageKey"),
    localStorage.getItem("logData")
  );

  console.info(localStorage.getItem("logData"));
  beginNewLogSession();
}

function startAttempt() {
  console.log("Start attempt");
  startTime = Date.now();
}

function logAttempt(endState) {
  console.log("Log attempt");
  const endTime = Date.now();
  var logData = JSON.parse(localStorage.getItem("logData"));
  if (logData == null) {
    logData = [];
  }
  logData.push({
    userPassword: getUserPassword(),
    enteredPassword: getEnteredPassword(),
    startTime: startTime,
    endTime: endTime,
    elapsedTimeInMilliseconds: endTime - startTime,
    method: getSelectionMethod(),
    numTicks: getTicks(),
    endState: endState,
  });
  localStorage.setItem("logData", JSON.stringify(logData));
}
