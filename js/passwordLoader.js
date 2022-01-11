var currentPasswords;
var passwordsIndex = 0;

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
      else currentPasswords = combination15Passwords;
      break;
  }
  setUserPassword(currentPasswords[participantNumber]);
}

function nextPassword() {
  passwordsIndex++;
  setUserPassword(currentPasswords[passwordsIndex]);
}

function prevPassword() {
  passwordsIndex--;
  setUserPassword(currentPasswords[passwordsIndex]);
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

const combination15Passwords = [
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
