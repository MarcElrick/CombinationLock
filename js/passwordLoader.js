var currentPasswords;
var passwordsIndex = 0;

function getPasswordsIndex() {
  const password = localStorage.getItem("participantID");
  if (password === null) localStorage.setItem("participantID", 0);
  return parseInt(localStorage.getItem("participantID"));
}

function setPasswordIndex(index) {
  localStorage.setItem("participantID", index);
}

function loadPasswords(participantNumber) {
  switch (getSelectionMethod()) {
    case selectionModes.PATTERN:
      currentPasswords = patternPasswords;
      break;
    case selectionModes.PIN:
      currentPasswords = pinPasswords;
      break;
    default:
      if (getTicks() === "6") currentPasswords = combination6Passwords;
      else currentPasswords = combination10Passwords;
      break;
  }
  setUserPassword(currentPasswords[participantNumber]);
}

function nextPassword() {
  var index = getPasswordsIndex();
  if (index === NaN) index = 0;
  if (index === 5) {
    setPasswordIndex(0);
  } else {
    setPasswordIndex(index + 1);
  }
}

const pinPasswords = [
  [1, 2, 3, 4],
  [6, 2, 5, 3],
  [9, 6, 4, 2],
  [5, 2, 4, 3],
  [1, 2, 0, 3],
  [0, 3, 1, 4],
];

const patternPasswords = [
  [0, 1, 2, 3, 4, -1, -1, -1, -1],
  [0, 1, -1, -1, 2, 3, -1, -1, 4],
  [-1, 2, 3, -1, 1, 4, 0, -1, -1],
  [-1, 3, 2, -1, 0, 1, -1, -1, 4],
  [-1, 2, -1, 3, 0, 1, -1, 4, -1],
  [0, -1, -1, 3, 1, 4, 2, -1, -1],
];

const combination10Passwords = [
  [1, 2, 3, 4],
  [6, 2, 5, 3],
  [9, 6, 4, 2],
  [5, 2, 4, 3],
  [1, 2, 0, 3],
  [0, 3, 1, 4],
];

const combination6Passwords = [
  [0, 2, 3, 4],
  [0, 4, 2, 3],
  [1, 5, 4, 1],
  [5, 3, 2, 5],
  [4, 3, 4, 5],
  [0, 5, 2, 5],
];
