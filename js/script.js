"use strict";

// CODE WRITTEN BY VIRAJ MATHUR

/////////////////////////
// Important Variables //
/////////////////////////

let currentWord = 1;
let position = -1;

////////////////////
// DOM SELECTIONS //
////////////////////

const text = document.querySelector(".text");
const textGenerate = document.querySelector(".text__generate");
let inputText = document.querySelector(".input__text");
const inputTextID = document.getElementById("input_text");
const redoBtn = document.querySelector(".btn__redo");

// prettier-ignore
const words = [
  "abandon", "action", "actor", "about", "again", "bottle", "both", "chair", "careful", "class", "clean", "computer", "camp", "divide", "donate", "dance", "ear", "enter", "floor", "for", "fight", "feel", "force", "grow", "good", "ghost", "head", "house", "height", "high", "increase", "imagine", "invite", "in", "join", "just", "joy", "keep", "knock", "king", "kick", "low", "last", "left", "light", "location", "loud", "man", "mass", "medical", "manage", "mountain", "more", "much", "new", "night", "nothing", "need", "north", "no", "obtain", "ocean", "office", "out", "often", "orange", "past", "power", "parent", "paint", "phase", "plot", "press", "prayer", "prison", "people", "queen", "quick", "quote", "remain", "right", "rest", "raw", "reflect", "run", "rough", "son", "service", "scholar", "solar", "sack", "soft", "silver", "smoke", "turn", "teach", "today", "trip", "tool", "take", "trick", "understand", "uniform", "union", "urban", "use", "victim", "violate", "vital", "visitor", "west", "wind", "wire", "wood", "work", "yet", "youth", "yesterday", "year", "yes", "zone" 
];

///////////////
// Variables //
///////////////

let wordsToDisplay = [];
let activeWord = document.querySelector(`.word${currentWord}`);

///////////////
// Functions //
///////////////

const textGenerator = function (words) {
  wordsToDisplay = [];
  let randomIndex = Math.trunc(Math.random() * 121);
  wordsToDisplay.push(words[randomIndex]);
  for (let i = 1; i < 50; i++) {
    let randomIndexCurr = Math.trunc(Math.random() * 121);
    while (randomIndexCurr === randomIndex)
      randomIndexCurr = Math.trunc(Math.random() * 121);
    randomIndex = randomIndexCurr;
    wordsToDisplay.push(words[randomIndexCurr]);
  }
};

const displayWords = function () {
  currentWord = 1;
  text.textContent = "";
  for (let i = 0; i < 50; i++) {
    text.insertAdjacentHTML(
      "beforeend",
      `<span class = "word${i + 1}""></span> `
    );
    for (let j = 0; j < wordsToDisplay[i].length; j++) {
      document
        .querySelector(`.word${i + 1}`)
        .insertAdjacentHTML(
          "beforeend",
          `<span class = "word${i + 1}letter${
            j + 1
          }" style = "transition: all 0s">${wordsToDisplay[i][j]}</span>`
        );
    }
  }
};

const setActiveWord = function () {
  activeWord = document.querySelector(`.word${currentWord}`);
};

const letterColorChanger = function (e) {
  let currentLetter = document.querySelector(
    `.word${currentWord}letter${position + 1}`
  );
  if (currentLetter === null) return;
  if (
    e.code ===
    `Key${String(
      wordsToDisplay.at(currentWord - 1).at(position)
    ).toUpperCase()}`
  ) {
    currentLetter.classList.remove("color__change__failure");
    currentLetter.classList.add("color__change__success", "text__active");
  } else {
    currentLetter.classList.remove("color__change__success");
    currentLetter.classList.add("color__change__failure", "text__active");
  }
};

const removeLetterStyling = function () {
  let currentLetter = document.querySelector(
    `.word${currentWord}letter${position + 1}`
  );
  currentLetter.classList.remove(
    "color__change__failure",
    "color__change__success",
    "text__active"
  );
};

const loadContent = function () {
  position = -1;
  inputText.value = "";
  inputTextID.focus();
  textGenerator(words);
  displayWords();
  setActiveWord();
  activeWord.classList.add("active__word");
};

/////////////////////
// Event Listeners //
/////////////////////

inputText.addEventListener("keydown", function (e) {
  console.log(position);
  if (e.code === "Space") {
    position = -1;
    e.preventDefault();
    inputText.value = "";
    inputText.classList.remove("input__text__placeholder");
    inputText.classList.add("input__text__placeholder__after");
    activeWord.classList.remove("active__word");
    ++currentWord;
    setActiveWord();
    activeWord.classList.add("active__word");
  } else if (e.code !== "Backspace") {
    ++position;
    letterColorChanger(e);
  } else if (e.code === "Backspace" && inputText.value !== "") {
    removeLetterStyling();
    position--;
  } else position = -1;
});

document.body.addEventListener("click", function () {
  inputText.classList.remove("input__text__placeholder__after");
  inputText.classList.add("input__text__placeholder");
});

redoBtn.addEventListener("click", loadContent);

////////////////////
// Function Calls //
////////////////////

loadContent();
