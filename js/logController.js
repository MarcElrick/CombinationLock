var startTime;

function beginNewLogSession() {
  console.log("Start log session");
  localStorage.setItem("currentStorageKey", new Date().toISOString());
  startTime = null;
  localStorage.setItem("logData", JSON.stringify([]));
}

function endLogSession() {
  console.log("endLogSession");

  const key = localStorage.getItem("currentStorageKey");
  const value = localStorage.getItem("logData");
  localStorage.setItem(key, value);

  console.info(value);
  var client = new XMLHttpRequest();

  var params = { data: {} };
  params.data[key] = value;
  console.log(JSON.stringify(params));
  client.open("GET", "http://172.30.144.197:3000" + "?" + params);
  client.send();
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
