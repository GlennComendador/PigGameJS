"use strict";

//Total Player Score Elements:
const fscore0Element = document.querySelector("#score--0");
const fscore1Element = document.querySelector("#score--1");

//Current Player Score Elements:
const cscore0Element = document.querySelector("#current--0");
const cscore1Element = document.querySelector("#current--1");

//Modal Window
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelector(".instructions");

//Score Variables
let currentScore = 0;
let finalScores = [0, 0];

//Dice Element
const diceElement = document.querySelector(".dice");

//Active Player Elements
const activePlayer0 = document.querySelector(".player--0");
const activePlayer1 = document.querySelector(".player--1");

//Active Player Variable
let playerFlag = 0;

//Game State Variable
let gameFinished = false;

//Game Button Elements
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

/*
 *
 *
 *
 */

//Switch Player Function
function playerSwitch() {
  currentScore = 0;
  document.querySelector(`#current--${playerFlag}`).textContent = currentScore;
  playerFlag = playerFlag === 0 ? 1 : 0;
  activePlayer0.classList.toggle("player--active");
  activePlayer1.classList.toggle("player--active");
}

//Roll Dice Button Function
const buttonRoll = function () {
  if (!gameFinished) {
    //Generate Dice Number
    let diceNumber = Math.trunc(Math.random() * 6) + 1;

    //Display Dice
    diceElement.classList.remove("hidden");
    diceElement.src = `dice-${diceNumber}.png`;

    //Check Rolled Dice Number
    if (diceNumber !== 1) {
      //Add to Current Score
      currentScore += diceNumber;
      //Set Current Score Text
      document.querySelector(`#current--${playerFlag}`).textContent =
        currentScore;
    } else {
      //Switch Players
      playerSwitch();
    }
  }
};

//Hold Button Function
const buttonHold = function () {
  if (!gameFinished) {
    //Add Current Score to Final Score
    finalScores[playerFlag] += currentScore;
    //Set Final Score Text
    document.querySelector(`#score--${playerFlag}`).textContent =
      finalScores[playerFlag];

    //Check if 100 or More Points is Reached by Either Players
    if (finalScores[playerFlag] >= 100) {
      gameFinished = true;
      document
        .querySelector(`.player--${playerFlag}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${playerFlag}`)
        .classList.remove("player--active");
      diceElement.classList.add("hidden");
    } else {
      //Switch Players
      playerSwitch();
    }
  }
};

//New Game Button Function
const newGame = function () {
  fscore0Element.textContent = 0;
  fscore1Element.textContent = 0;
  cscore0Element.textContent = 0;
  cscore1Element.textContent = 0;
  playerFlag = 0;
  currentScore = 0;
  finalScores[0] = 0;
  finalScores[1] = 0;
  gameFinished = false;
  diceElement.classList.add("hidden");
  activePlayer0.classList.add("player--active");
  activePlayer1.classList.remove("player--active");
  activePlayer0.classList.remove("player--winner");
  activePlayer1.classList.remove("player--winner");
};

//Function for Opening Modal Window
const modalOpened = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

//Function for Closing Modal Window
const modalClosed = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

//Run Default States
newGame();
modalOpened();

//Dice Roll Button Functionality
btnRoll.addEventListener("click", buttonRoll);

//Hold Button Functionality
btnHold.addEventListener("click", buttonHold);

//New Game Functionality
btnNew.addEventListener("click", newGame);

//Open Modal Window
btnsOpenModal.addEventListener("click", modalOpened);

//Close Modal Windows
btnCloseModal.addEventListener("click", modalClosed);
overlay.addEventListener("click", modalClosed);

//Close on Escape Key Press
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    modalClosed();
  }
});
