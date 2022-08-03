"use strict";

// CODE WRITTEN BY VIRAJ MATHUR

/////////////////////////
// Important Variables //
/////////////////////////

let currentWord = 1;
let position = -1;
let letterAccuracy = 100;
let wordAccuracy = 100;
let currentWordLetterErrors = 0;
let wrongWords = 0;
let numOfLetters = 0;
let timer = 0;
let startTimer = false;
let redoAfterResult = false;
let wordsPerMinute = 0;

////////////////////
// DOM SELECTIONS //
////////////////////

const text = document.querySelector(".text");
const textGenerate = document.querySelector(".text__generate");
let inputText = document.querySelector(".input__text");
const inputTextID = document.getElementById("input_text");
const redoBtn = document.querySelector(".btn__redo");
const typingArea = document.querySelector(".typing__area");

// prettier-ignore
// const words = [
//   "abandon", "action", "actor", "about", "again", "bottle", "both", "chair", "careful", "class", "clean", "computer", "camp", "divide", "donate", "dance", "ear", "enter", "floor", "for", "fight", "feel", "force", "grow", "good", "ghost", "head", "house", "height", "high", "increase", "imagine", "invite", "in", "join", "just", "joy", "keep", "knock", "king", "kick", "low", "last", "left", "light", "location", "loud", "man", "mass", "medical", "manage", "mountain", "more", "much", "new", "night", "nothing", "need", "north", "no", "obtain", "ocean", "office", "out", "often", "orange", "past", "power", "parent", "paint", "phase", "plot", "press", "prayer", "prison", "people", "queen", "quick", "quote", "remain", "right", "rest", "raw", "reflect", "run", "rough", "son", "service", "scholar", "solar", "sack", "soft", "silver", "smoke", "turn", "teach", "today", "trip", "tool", "take", "trick", "understand", "uniform", "union", "urban", "use", "victim", "violate", "vital", "visitor", "west", "wind", "wire", "wood", "work", "yet", "youth", "yesterday", "year", "yes", "zone"
// ];

const words = ["home", 'well', 'take', 'show', 'to', 'off', 'and', 'without', 'great', 'a', 'after', 'they', 'child', 'face', 'very', 'since', 'when', 'mean', 'little', 'than', 'in', 'against', 'increase', 'program', 'public', 'see', 'place', 'through', 'before', 'high', 'I', 'day', 'old', 'still', 'turn', 'those', 'develop', 'which', 'first', 'now', 'such', 'real', 'out', 'want', 'by', 'where', 'general', 'end', 'life', 'you', 'play', 'feel', 'ask', 'only', 'system', 'new', 'no', 'run', 'seem', 'large', 'down', 'order', 'house', 'right', 'change', 'stand', 'would', 'at', 'come', 'not', 'leave', 'use', 'may', 'into', 'thing', 'word', 'man', 'all', 'head', 'keep', 'time', 'consider', 'even', 'look', 'plan', 'must', 'during', 'could', 'fact', 'school', 'tell', 'we'];

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
  let randomIndex = Math.trunc(Math.random() * words.length);
  wordsToDisplay.push(words[randomIndex]);
  numOfLetters += words[randomIndex].length;
  for (let i = 1; i < 50; i++) {
    let randomIndexCurr = Math.trunc(Math.random() * words.length);
    while (randomIndexCurr === randomIndex)
      randomIndexCurr = Math.trunc(Math.random() * words.length);
    randomIndex = randomIndexCurr;
    wordsToDisplay.push(words[randomIndexCurr]);
    numOfLetters += words[randomIndexCurr].length;
  }
};

const displayWords = function () {
  currentWord = 1;
  document.getElementById("text__generate").innerHTML = "";
  document
    .getElementById("text__generate")
    .insertAdjacentHTML("beforeend", `<p class="text"></p> `);
  for (let i = 0; i < 50; i++) {
    document
      .querySelector(".text")
      .insertAdjacentHTML(
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

const wordChecker = function () {
  currentWordLetterErrors =
    wordsToDisplay[currentWord - 1].length -
    activeWord.querySelectorAll(".color__change__success").length;
  letterAccuracy -= (currentWordLetterErrors * 100) / numOfLetters;
  if (currentWordLetterErrors > 0) {
    wrongWords++;
    wordAccuracy -= 2;
  }
};

const loadContent = function () {
  inputTextID.placeholder = "Start typing here...";
  redoAfterResult = false;
  currentWord = 1;
  startTimer = false;
  timer = 0;
  numOfLetters = 0;
  position = -1;
  inputText.value = "";
  inputTextID.focus();
  textGenerator(words);
  displayWords();
  setActiveWord();
  activeWord.classList.add("active__word");
  wordAccuracy = 100;
  letterAccuracy = 100;
  currentWordLetterErrors = 0;
  wrongWords = 0;
  setTimeout(() => {
    document
      .getElementById("text__generate")
      .classList.remove("animation__slideout");
    document
      .getElementById("text__generate")
      .classList.remove("animation__slidein");
  }, 2000);
};

const showResults = function () {
  console.log(`Over`);
  console.log(timer);
  inputTextID.disabled = true;
  inputText.classList.remove("input__text__placeholder__after");
  inputText.classList.add("input__text__placeholder");
  document.getElementById("text__generate").innerHTML = "";
  document.getElementById("text__generate").classList.add("text__area-grid");
  document.getElementById("text__generate").insertAdjacentHTML(
    "beforeend",
    `
  <div class="flex__col">
    <span class="result__heading">words / min</span>
    <span class="result__value">${wordsPerMinute}</span>
  </div>
  <div class="flex__col">
    <span class="result__heading">accuracy</span>
    <span class="result__value">${Math.trunc(letterAccuracy)}</span>
  </div>
  <div class="flex__col">
    <span class="result__heading">time (s)</span>
    <span class="result__value">${Math.round(timer / 1000)}</span>
  </div>
  `
  );
};

/////////////////////
// Event Listeners //
/////////////////////

inputText.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    startTimer = true;
    position = -1;
    e.preventDefault();
    inputText.value = "";
    inputText.classList.remove("input__text__placeholder");
    inputText.classList.add("input__text__placeholder__after");
    activeWord.classList.remove("active__word");
    wordChecker();
    ++currentWord;
    if (currentWord > 50) {
      wordsPerMinute =
        document.querySelectorAll(".color__change__success").length !== 0
          ? Math.trunc(
              ((document.querySelectorAll(".color__change__success").length /
                numOfLetters) *
                50) /
                (timer / 1000 / 60)
            )
          : 0;
      startTimer = false;
      document
        .getElementById("text__generate")
        .classList.add("animation__slideout");
      setTimeout(() => {
        document
          .getElementById("text__generate")
          .classList.remove("animation__slideout");
        document
          .getElementById("text__generate")
          .classList.add("animation__slidein");
      }, 1001);
      setTimeout(() => {
        showResults();
        inputTextID.placeholder = "Click the button to start again...";
      }, 1000);
      redoAfterResult = true;
      return;
    }
    setActiveWord();
    activeWord.classList.add("active__word");
    currentWordLetterErrors = 0;
    console.log(`wrongWords: ${wrongWords}`);
    console.log(`wordAccuracy: ${wordAccuracy}`);
    console.log(`letterAccuracy: ${letterAccuracy}`);
  } else if (e.code !== "Backspace") {
    startTimer = true;
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

redoBtn.addEventListener("click", function () {
  inputTextID.disabled = false;
  setTimeout(() => {
    document
      .getElementById("text__generate")
      .classList.remove("text__area-grid");
  }, 1000);
  if (redoAfterResult) {
    redoAfterResult = false;
    document
      .getElementById("text__generate")
      .classList.remove("animation__slidein");
    document
      .getElementById("text__generate")
      .classList.add("animation__slideout");
    setTimeout(() => {
      document
        .getElementById("text__generate")
        .classList.add("animation__slidein");
    }, 1000);
    setTimeout(() => {
      loadContent();
    }, 1001);
  } else {
    loadContent();
  }
});

////////////////////
// Function Calls //
////////////////////

loadContent();
setInterval(() => {
  if (startTimer) {
    timer += 10;
  }
}, 10);
