var startButton = document.querySelector(".start-button");
var wordBlank = document.querySelector(".word-blanks");
var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
var timerElement = document.querySelector(".timer-count");
var resetButton = document.querySelector(".reset-button");

var isWin = false;
var timerCount;
var randomWord = "";
var winCounter = 0;
var loseCounter = 0;

// Array of words the user will guess
var words = [
  "variable",
  "array",
  "modulus",
  "object",
  "function",
  "string",
  "boolean",
];

// The init function is called when the page loads
function init() {
  numOfWins();
  numOfLosses();
}

// The startGame function is called when the start button is clicked
function startGame() {
  isWin = false;
  timerCount = 30;

  //prevent the start button from being clicked when game is running
  startButton.disabled = true;

  renderBlanks();
  startTimer();
}

//creating blanks on screen
function renderBlanks() {
  //picking random word from words array
  randomWord = words[Math.floor(Math.random() * words.length)];
  lettersInRandomWord = randomWord.split("");
  blankLetters = [];

  //for every letter in lettersInRandomWord, push blank(_) in empty array blankLetters using for loop
  for (var i = 0; i < lettersInRandomWord.length; i++) {
    blankLetters.push("_");
  }

  //converting blankLetters array into string and rendering it to the screen
  wordBlank.textContent = blankLetters.join(" ");
}

function startTimer() {
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;

    if (timerCount >= 0) {
      if (isWin && timerCount > 0) {
        clearInterval(timer);
        winGame();
      }
    }

    if (timerCount === 0) {
      clearInterval(timer);
      loseGame();
    }
  }, 1000);
}

function winGame() {
  wordBlank.textContent = "You WOn!!!🏆";
  winCounter++;
  startButton.disabled = false;
  storeWins();
}

function loseGame() {
  wordBlank.textContent = "You Loose!!!";
  loseCounter++;
  startButton.disabled = false;
  storeLosses();
}

function storeWins() {
  win.textContent = winCounter;
  localStorage.setItem("winCount", winCounter);
}

function storeLosses() {
  lose.textContent = loseCounter;
  localStorage.setItem("loseCount", loseCounter);
}

function numOfWins() {
  var storedWins = localStorage.getItem("winCount");

  if (storedWins === null) {
    winCounter = 0;
  } else {
    winCounter = storedWins;
  }

  win.textContent = winCounter;
}

function numOfLosses() {
  var storedLosses = localStorage.getItem("loseCount");

  if (storedLosses === null) {
    loseCounter = 0;
  } else {
    loseCounter = storedLosses;
  }

  lose.textContent = loseCounter;
}

function checkWin() {
  // If the word equals the blankLetters array when converted to string, set isWin to true
  if (randomWord === blankLetters.join("")) {
    // This value is used in the timer function to test if win condition is met
    isWin = true;
  }
}

function checkLetters(letter) {
  var letterInWord = false;
  for (var i = 0; i < lettersInRandomWord.length; i++) {
    if (randomWord[i] === letter) {
      letterInWord = true;
    }
  }
  if (letterInWord) {
    for (var j = 0; j < lettersInRandomWord.length; j++) {
      if (randomWord[j] === letter) {
        blankLetters[j] = letter;
      }
    }
    wordBlank.textContent = blankLetters.join(" ");
  }
}

document.addEventListener("keydown", function(event) {
  // If the count is zero, exit function
  if (timerCount === 0) {
    return;
  }
  // Convert all keys to lower case
  var key = event.key.toLowerCase();
  var alphabetNumericCharacters = "abcdefghijklmnopqrstuvwxyz0123456789 ".split("");
  // Test if key pushed is letter
  if (alphabetNumericCharacters.includes(key)) {
    var letterGuessed = event.key;
    checkLetters(letterGuessed)
    checkWin();
  }
});

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

// Calls init() so that it fires when page opened
init();

var resetButton = document.querySelector(".reset-button");

function resetGame() {
  // Resets win and loss counts
  winCounter = 0;
  loseCounter = 0;
  // Renders win and loss counts and sets them into client storage
  storeWins()
  storeLosses()
}

// Attaches event listener to button
resetButton.addEventListener("click", resetGame);