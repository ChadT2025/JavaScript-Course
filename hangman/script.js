// Hangman game

const words = ["JAVASCRIPT", "PROGRAMMING", "DEVELOPER", "WEBSITE", "CODE"];

// The letters used to build the keyboard buttons
const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

let chosenWord = "";
let guessedLetters = [];
let maxGuesses = 6;
let wrongGuesses = 0;
let gameOver = false;

const wordDisplay = document.querySelector("#wordDisplay");
const message = document.querySelector("#message");
const keyboard = document.querySelector("#keyboard");
const resetBtn = document.querySelector("#resetBtn");
const hangmanImg = document.querySelector("#hangmanImg");

resetBtn.addEventListener("click", initGame);

function initGame() {
  wrongGuesses = 0;
  guessedLetters = [];
  gameOver = false;
  // Random index 0 to 4 (subtracting 0.5 first makes Math.round round down)
  chosenWord = words[Math.round(Math.random() * words.length - 0.5)];
  resetBtn.style.display = "none";
  message.innerText = `Guesses Left: ${maxGuesses}`;
  hangmanImg.src = "hangman_0.png";
  createKeyboard();
  updateDisplay();
}

// Checks if a list (or a word) contains an item, like .includes()
function contains(list, item) {
  for (let i = 0; i < list.length; i++) {
    if (list[i] === item) {
      return true;
    }
  }
  return false;
}

function updateDisplay() {
  let displayStr = "";
  let blanksLeft = 0;
  for (let i = 0; i < chosenWord.length; i++) {
    const letter = chosenWord[i];
    if (i > 0) {
      displayStr += " ";
    }
    if (contains(guessedLetters, letter)) {
      displayStr += letter;
    } else {
      displayStr += "_";
      blanksLeft++;
    }
  }
  wordDisplay.innerText = displayStr;
  checkGameStatus(blanksLeft);
}

// Redrawn after every guess so guessed letters show as disabled
function createKeyboard() {
  let keyboardHTML = "";
  alphabet.forEach((letter) => {
    if (gameOver || contains(guessedLetters, letter)) {
      keyboardHTML += `<button class="letter-btn" disabled>${letter}</button>`;
    } else {
      keyboardHTML += `<button class="letter-btn">${letter}</button>`;
    }
  });
  keyboard.innerHTML = keyboardHTML;
  document.querySelectorAll(".letter-btn").forEach((button, index) => {
    button.addEventListener("click", () => {
      handleGuess(alphabet[index]);
    });
  });
}

function handleGuess(letter) {
  guessedLetters.push(letter);
  createKeyboard();
  if (contains(chosenWord, letter)) {
    updateDisplay();
  } else {
    wrongGuesses++;
    message.innerText = `Guesses Left: ${maxGuesses - wrongGuesses}`;
    hangmanImg.src = `hangman_${wrongGuesses}.png`;
    updateDisplay();
  }
}

function checkGameStatus(blanksLeft) {
  if (blanksLeft === 0) {
    message.innerText = "You Win!";
    disableAllButtons();
  } else if (wrongGuesses >= maxGuesses) {
    message.innerText = `Game Over! The word was: ${chosenWord}`;
    disableAllButtons();
  }
}

// gameOver = true makes createKeyboard() draw every button disabled
function disableAllButtons() {
  gameOver = true;
  createKeyboard();
  resetBtn.style.display = "inline-block";
}

// Start the game when the page loads
initGame();
