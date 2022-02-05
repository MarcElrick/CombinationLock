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
      if (getTicks() === "10") currentPasswords = combination10Passwords;
      else currentPasswords = combination6Passwords;
      break;
  }
  setUserPassword(currentPasswords[participantNumber]);
}

function nextPassword() {
  var index = getPasswordsIndex();
  if (index === NaN) index = 0;
  if (index === 9) {
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
  [7, 2, 4, 9],
  [8, 1, 4, 9],
  [6, 4, 8, 6],
  [1, 2, 1, 2],
];

const patternPasswords = [
  [0, 1, 2, 3, 4, -1, -1, -1, -1],
  [0, 1, 2, -1, -1, 3, -1, -1, 4],
  [0, 1, -1, -1, 2, 3, -1, -1, 4],
  [0, -1, -1, 3, 1, 4, -1, -1, 2],
  [-1, 4, 3, 0, 1, 2, -1, -1, -1],
  [-1, 2, 3, -1, 1, 4, 0, -1, -1],
  [-1, 3, 2, -1, 0, 1, -1, -1, 4],
  [-1, 2, -1, 3, 0, 1, -1, 4, -1],
  [-1, 2, 3, 1, -1, 4, -1, 0, -1],
  [0, -1, -1, 3, 1, 4, 2, -1, -1],
];

const combination10Passwords = [
  [1, 2, 3, 4],
  [6, 2, 5, 3],
  [9, 6, 4, 2],
  [5, 2, 4, 3],
  [1, 2, 0, 3],
  [0, 3, 1, 4],
  [7, 2, 4, 9],
  [8, 1, 4, 9],
  [6, 4, 8, 6],
  [1, 2, 1, 2],
];

const combination6Passwords = [
  [1, 2, 3, 4],
  [9, 3, 7, 5],
  [14, 9, 6, 3],
  [8, 3, 6, 5],
  [2, 3, 0, 5],
  [0, 5, 2, 6],
  [11, 4, 6, 14],
  [12, 2, 6, 14],
  [9, 6, 12, 9],
  [2, 3, 2, 3],
];
