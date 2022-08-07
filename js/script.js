"use strict";

// CODE WRITTEN BY VIRAJ MATHUR

/////////////////////////
/////////////////////////
// Important Variables //
/////////////////////////
/////////////////////////

// Words array access
let currentWord = 1;
let position = -1;
// Accuracy
let letterAccuracy = 100;
let wordAccuracy = 100;
// Checkers
let currentWordLetterErrors = 0;
let wrongWords = 0;
let numOfLetters = 0;
// Timer
let timer = 0;
let startTimer = false;
let redoAfterResult = false;
// WPM
let wordsPerMinute = 0;
let userNumOfWords = 50;
let slideTransitionTime = 650;
let slideTransitionTimeFast = 500;
// let extraLetters = 0;
let reloadAmount = 360;
let themeSelection = false;
let numOfThemes = 3;
let currentTheme = 0;
let mainContainerClick = false;

////////////////////
////////////////////
// DOM SELECTIONS //
////////////////////
////////////////////

const text = document.querySelector(".text");
// const textGenerate = document.querySelector(".text__generate");
let inputText = document.querySelector(".input__text");
let textGenerateID = document.getElementById("text__generate");
const inputTextID = document.getElementById("input_text");
const redoBtn = document.querySelector(".btn__redo");
const typingArea = document.querySelector(".typing__area");
const reloadIcon = document.querySelector(".reload__icon");
let themeButton = document.querySelector(".theme__button");
let mainContainer = document.querySelector(".main__container");
let themeNames = Array.from(document.querySelectorAll(".theme__name"));
const leftArrow = document.querySelector(".left__arrow");
const rightArrow = document.querySelector(".right__arrow");

// prettier-ignore
// const words = [
//   "abandon", "action", "actor", "about", "again", "bottle", "both", "chair", "careful", "class", "clean", "computer", "camp", "divide", "donate", "dance", "ear", "enter", "floor", "for", "fight", "feel", "force", "grow", "good", "ghost", "head", "house", "height", "high", "increase", "imagine", "invite", "in", "join", "just", "joy", "keep", "knock", "king", "kick", "low", "last", "left", "light", "location", "loud", "man", "mass", "medical", "manage", "mountain", "more", "much", "new", "night", "nothing", "need", "north", "no", "obtain", "ocean", "office", "out", "often", "orange", "past", "power", "parent", "paint", "phase", "plot", "press", "prayer", "prison", "people", "queen", "quick", "quote", "remain", "right", "rest", "raw", "reflect", "run", "rough", "son", "service", "scholar", "solar", "sack", "soft", "silver", "smoke", "turn", "teach", "today", "trip", "tool", "take", "trick", "understand", "uniform", "union", "urban", "use", "victim", "violate", "vital", "visitor", "west", "wind", "wire", "wood", "work", "yet", "youth", "yesterday", "year", "yes", "zone"
// ];

const words = ["home", 'well', 'take', 'show', 'to', 'off', 'and', 'without', 'great', 'a', 'after', 'they', 'child', 'face', 'very', 'since', 'when', 'mean', 'little', 'than', 'in', 'against', 'increase', 'program', 'public', 'see', 'place', 'through', 'before', 'high', 'I', 'day', 'old', 'still', 'turn', 'those', 'develop', 'which', 'first', 'now', 'such', 'real', 'out', 'want', 'by', 'where', 'good', 'general', 'end', 'life', 'you', 'play', 'feel', 'ask', 'only', 'system', 'new', 'no', 'run', 'seem', 'large', 'down', 'order', 'house', 'right', 'change', 'stand', 'would', 'at', 'come', 'not', 'leave', 'use', 'may', 'into', 'thing', 'word', 'man', 'all', 'head', 'keep', 'time', 'consider', 'even', 'look', 'plan', 'must', 'during', 'could', 'fact', 'school', 'tell', 'we'];

///////////////
///////////////
// Variables //
///////////////
///////////////

let wordsToDisplay = [];
let activeWord = document.querySelector(`.word${currentWord}`);
let translateMultiplier = 0;

///////////////
///////////////
// Functions //
///////////////
///////////////

const textGenerator = function (words) {
  wordsToDisplay = [];
  let randomIndex = Math.trunc(Math.random() * words.length);
  wordsToDisplay.push(words[randomIndex]);
  numOfLetters += words[randomIndex].length;
  for (let i = 1; i < userNumOfWords; i++) {
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
  for (let i = 0; i < userNumOfWords; i++) {
    document
      .querySelector(".text")
      .insertAdjacentHTML("beforeend", `<span class = "word${i + 1}"></span> `);
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
  if (inputTextID.value.length < wordsToDisplay[currentWord - 1].length) {
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
      currentLetter.classList.remove(`color__change__failure`);
      currentLetter.classList.add(`color__change__success`, "text__active");
    } else {
      currentLetter.classList.remove(`color__change__success`);
      currentLetter.classList.add(`color__change__failure`, "text__active");
    }
  }
};

const removeLetterStyling = function () {
  if (position + 1 <= wordsToDisplay[currentWord - 1].length) {
    let currentLetter = document.querySelector(
      `.word${currentWord}letter${position + 1}`
    );
    currentLetter.classList.remove(
      `color__change__failure`,
      `color__change__success`,
      "text__active"
    );
  }

  if (position + 1 > wordsToDisplay[currentWord - 1].length) {
    document.querySelector(`.word${currentWord}letter${position + 1}`).remove();
  }
};

const wordChecker = function () {
  if (currentWord > userNumOfWords) return;
  currentWordLetterErrors =
    wordsToDisplay[currentWord - 1].length -
    activeWord.querySelectorAll(`.color__change__success`).length +
    activeWord.querySelectorAll(`.color__change__failure__light`).length;
  letterAccuracy -= (currentWordLetterErrors * 100) / numOfLetters;
  if (currentWordLetterErrors > 0) {
    wrongWords++;
    wordAccuracy -= 2;
  }
};

const loadContent = function (animationTime) {
  inputTextID.placeholder = "Start typing here...";
  redoAfterResult = false;
  startTimer = false;
  currentWord = 1;
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
  toggleAnimation(textGenerateID, "animation__slideout", false);
  toggleAnimation(textGenerateID, "animation__slideout__fast", false);
  setTimeout(() => {
    toggleAnimation(textGenerateID, "animation__slidein", false);
    toggleAnimation(textGenerateID, "animation__slidein__fast", false);
  }, 2 * animationTime);
};

const showResults = function () {
  inputText.classList.remove("input__text__placeholder__after");
  inputText.classList.add("input__text__placeholder");
  textGenerateID.innerHTML = "";
  textGenerateID.classList.add("text__area-grid");
  textGenerateID.insertAdjacentHTML(
    "beforeend",
    `
  <div class="flex__col">
    <span class="result__heading">words / min</span>
    <span class="result__value">${wordsPerMinute}</span>
  </div>
  <div class="flex__col">
    <span class="result__heading">accuracy</span>
    <span class="result__value">${
      letterAccuracy >= 0 ? Math.trunc(letterAccuracy) : 0
    }<em class="result__unit">%</em></span>
  </div>
  <div class="flex__col">
    <span class="result__heading">time taken</span>
    <span class="result__value">${Math.round(
      timer / 1000
    )}<em class="result__unit">s</em></span>
  </div>
  `
  );
};

const toggleAnimation = function (domSelection, animationToAdd, add) {
  if (add) {
    domSelection.classList.add(animationToAdd);
  } else {
    domSelection.classList.remove(animationToAdd);
  }
};

const themeColorChanger = function (
  mainContainer,
  textGenerate,
  containerArea,
  outline,
  text,
  textTitle,
  textActive,
  textTyping,
  textPlaceholder,
  textResult,
  textBtnRedo,
  textBtnRedoHover,
  textSuccess,
  btnRedo,
  btnRedoHover,
  typingArea
) {
  document.documentElement.style.setProperty(
    "--color-body-background",
    `#${mainContainer}`
  );
  document.documentElement.style.setProperty(
    "--color-text-area",
    `#${textGenerate}`
  );
  document.documentElement.style.setProperty(
    "--color-container-area",
    `#${containerArea}`
  );
  document.documentElement.style.setProperty(
    "--color-outline-color",
    `#${outline}`
  );
  document.documentElement.style.setProperty("--color-text-color", `#${text}`);
  document.documentElement.style.setProperty(
    "--color-text-title",
    `#${textTitle}`
  );
  document.documentElement.style.setProperty(
    "--color-text-active",
    `#${textActive}`
  );
  document.documentElement.style.setProperty(
    "--color-text-typing",
    `#${textTyping}`
  );
  document.documentElement.style.setProperty(
    "--color-text-placeholder",
    `#${textPlaceholder}`
  );
  document.documentElement.style.setProperty(
    "--color-text-result",
    `#${textResult}`
  );
  document.documentElement.style.setProperty(
    "--color-button-redo-text",
    `#${textBtnRedo}`
  );
  document.documentElement.style.setProperty(
    "--color-button-redo-text-hover",
    `#${textBtnRedoHover}`
  );
  document.documentElement.style.setProperty(
    "--color-change-success",
    `#${textSuccess}`
  );
  document.documentElement.style.setProperty(
    "--color-button-redo",
    `#${btnRedo}`
  );
  document.documentElement.style.setProperty(
    "--color-button-redo-hover",
    `#${btnRedoHover}`
  );
  document.documentElement.style.setProperty(
    "--color-typing-area",
    `#${typingArea}`
  );
};

const changeTheme = function (currentTheme) {
  switch (currentTheme) {
    case 0:
      themeColorChanger(
        "000", // main container
        "111", // textGenerate
        "282828", // containerArea
        "999", // outline
        "999", // text
        "fff", // textTitle
        "fff", // textActive
        "fff", // textTyping
        "555", // textPlaceholder
        "fff", // textResult
        "e58e97", // textBtnRedo
        "ffb9c0", // textBtnRedoHover
        "31f755", // textSuccess
        "33171a", // btnRedo
        "722029", // btnRedoHover
        "282828" // typingArea
      );
      break;

    case 1:
      themeColorChanger(
        "180808", // main container
        "2C1D1D", // textGenerate
        "4F3737", // containerArea
        "C39982", // outline
        "D3A78E", // text
        "CCB3A5", // textTitle
        "FFB178", // textActive
        "C39982", // textTyping
        "C29F9F", // textPlaceholder
        "CCB3A5", // textResult
        "CF6464", // textBtnRedo
        "FD8383", // textBtnRedoHover
        "FFE600", // textSuccess
        "341111", // btnRedo
        "672222", // btnRedoHover
        "4F3737" // typingArea
      );
      break;

    case 2:
      themeColorChanger(
        "1C081B", // main container
        "381B37", // textGenerate
        "8C599E", // containerArea
        "C78EE2", // outline
        "E4A7DB", // text
        "E1AAF4", // textTitle
        "FFF", // textActive
        "B4E9FA", // textTyping
        "C78EE2", // textPlaceholder
        "E1AAF4", // textResult
        "B4E9FA", // textBtnRedo
        "DAF6FF", // textBtnRedoHover
        "DBFC12", // textSuccess
        "157A9A", // btnRedo
        "279CC1", // btnRedoHover
        "8C599E" // typingArea
      );
      break;
  }
};

const changeThemeRight = function () {
  console.log(`Current theme before switching: ${currentTheme}`);
  if (currentTheme < numOfThemes - 1) currentTheme++;
  else {
    currentTheme = 0;
    translateMultiplier = 0;
  }
  console.log(`Current theme after switching: ${currentTheme}`);
  console.log(translateMultiplier, "right");
  themeNames.forEach(function (el) {
    el.style.transform = `translateX(calc(-${translateMultiplier}vw - 50%))`;
  });
  changeTheme(currentTheme);
};

const changeThemeLeft = function () {
  translateMultiplier -= 200;
  if (currentTheme > 0) currentTheme--;
  else {
    currentTheme = numOfThemes - 1;
    translateMultiplier = 100 * (numOfThemes - 1);
  }
  console.log(translateMultiplier, "left");
  themeNames.forEach(function (el) {
    el.style.transform = `translateX(calc(-${translateMultiplier}vw - 50%))`;
  });
  changeTheme(currentTheme);
};

// const selectTheme = function () {};

/////////////////////
/////////////////////
// Event Listeners //
/////////////////////
/////////////////////

inputText.addEventListener("keydown", function (e) {
  if (e.key.length !== 1 && e.code !== "Backspace") return;
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
    if (currentWord > userNumOfWords) {
      inputTextID.disabled = true;
      inputTextID.placeholder = "Click the button to start again...";
      wordsPerMinute =
        document.querySelectorAll(`.color__change__success`).length !== 0
          ? Math.trunc(
              ((document.querySelectorAll(`.color__change__success`).length /
                (numOfLetters +
                  document.querySelectorAll(`.color__change__failure__light`)
                    .length)) *
                userNumOfWords) /
                (timer / 1000 / 60)
            )
          : 0;
      startTimer = false;
      toggleAnimation(textGenerateID, "animation__slideout__fast", false);
      toggleAnimation(textGenerateID, "animation__slidin__fast", false);
      toggleAnimation(textGenerateID, "animation__slideout", true);
      setTimeout(() => {
        toggleAnimation(textGenerateID, "animation__slideout", false);
        toggleAnimation(textGenerateID, "animation__slidein", true);
      }, 1 + slideTransitionTime);
      setTimeout(() => {
        showResults();
      }, slideTransitionTime);
      redoAfterResult = true;
      return;
    }
    setActiveWord();
    activeWord.classList.add("active__word");
    currentWordLetterErrors = 0;
  } else if (e.code !== "Backspace") {
    startTimer = true;
    if (
      inputTextID.value.length >= wordsToDisplay[currentWord - 1].length &&
      e.key.length === 1
    ) {
      document
        .querySelector(".active__word")
        .insertAdjacentHTML(
          "beforeend",
          `<span class="word${currentWord}letter${
            position + 2
          } extra__letter color__change__failure__light">${e.key}</span>`
        );
    }
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
  toggleAnimation(reloadIcon, "rotate", true);
  reloadAmount += 360;
  reloadIcon.style.setProperty("--reload-amount", `${reloadAmount}deg`);
  inputTextID.disabled = false;
  setTimeout(() => {
    textGenerateID.classList.remove("text__area-grid");
  }, slideTransitionTime);
  if (redoAfterResult) {
    redoAfterResult = false;
    toggleAnimation(textGenerateID, "animation__slidein", false);
    toggleAnimation(textGenerateID, "animation__slidein__fast", false);
    toggleAnimation(textGenerateID, "animation__slideout", true);
    setTimeout(() => {
      toggleAnimation(textGenerateID, "animation__slidein", true);
    }, slideTransitionTime);
    setTimeout(() => {
      loadContent(slideTransitionTime);
    }, slideTransitionTime);
  } else {
    toggleAnimation(textGenerateID, "animation__slidein", false);
    toggleAnimation(textGenerateID, "animation__slidein__fast", false);
    toggleAnimation(textGenerateID, "animation__slideout__fast", true);
    setTimeout(() => {
      toggleAnimation(textGenerateID, "animation__slidein__fast", true);
    }, slideTransitionTimeFast);
    setTimeout(() => {
      loadContent(slideTransitionTimeFast);
    }, slideTransitionTimeFast);
  }
});

themeButton.addEventListener("click", function () {
  themeSelection = true;
  console.log(`CLICK`, themeSelection);
  mainContainer.style.overflow = "visible";
  toggleAnimation(mainContainer, "animation__expand", false);
  toggleAnimation(mainContainer, "animation__shrink", false);
  toggleAnimation(mainContainer, "animation__shrink", true);
  inputTextID.focus();
  inputTextID.disabled = true;
  setTimeout(() => {
    mainContainerClick = true;
  }, 400);
});

window.addEventListener("keydown", function (e) {
  if (themeSelection) {
    if (e.code === "Enter" || e.code === "Space") {
      inputTextID.disabled = false;
      inputText.focus();
      console.log(`ENTER`, themeSelection);
      e.preventDefault();
      mainContainer.style.overflow = "hidden";
      toggleAnimation(mainContainer, "animation__shrink", false);
      toggleAnimation(mainContainer, "animation__expand", false);
      toggleAnimation(mainContainer, "animation__expand", true);
      console.log(`INPUTTEXT`, inputTextID.enabled);
      mainContainerClick = false;
      themeSelection = false;
    }
    console.log(e.code);

    translateMultiplier = 100 * (currentTheme + 1);
    // let translateMultiplierLeft = translateMultiplier;
    if (e.code === "ArrowRight") {
      // if (currentTheme < numOfThemes - 1) currentTheme++;
      // else {
      //   currentTheme = 0;
      //   translateMultiplier = 0;
      // }
      // themeNames.forEach(function (el) {
      //   el.style.transform = `translateX(calc(-${translateMultiplier}vw - 50%))`;
      //   changeTheme(currentTheme);
      // });
      changeThemeRight();
    } else if (e.code === "ArrowLeft") {
      // translateMultiplier -= 200;
      // if (currentTheme > 0) currentTheme--;
      // else {
      //   currentTheme = numOfThemes - 1;
      //   translateMultiplier = -100 * (numOfThemes - 1);
      // }
      // themeNames.forEach(function (el) {
      //   el.style.transform = `translateX(calc(${translateMultiplier}vw - 50%))`;
      //   changeTheme(currentTheme);
      // });
      changeThemeLeft();
    }
    themeButton.textContent = `Theme: ${
      document.querySelector(`.theme__name${currentTheme}`).textContent
    }`;
  }
});

leftArrow.addEventListener("click", function () {
  if (themeSelection) {
    translateMultiplier = 100 * (currentTheme + 1);
    changeThemeLeft();
    themeButton.textContent = `Theme: ${
      document.querySelector(`.theme__name${currentTheme}`).textContent
    }`;
  }
});

rightArrow.addEventListener("click", function () {
  if (themeSelection) {
    translateMultiplier = 100 * (currentTheme + 1);
    changeThemeRight();
    themeButton.textContent = `Theme: ${
      document.querySelector(`.theme__name${currentTheme}`).textContent
    }`;
  }
});

mainContainer.addEventListener("click", function () {
  if (mainContainerClick) {
    inputTextID.disabled = false;
    inputText.focus();
    console.log(`ENTER`, themeSelection);
    // e.preventDefault();
    mainContainer.style.overflow = "hidden";
    toggleAnimation(mainContainer, "animation__shrink", false);
    toggleAnimation(mainContainer, "animation__expand", false);
    toggleAnimation(mainContainer, "animation__expand", true);
    console.log(`INPUTTEXT`, inputTextID.enabled);
    themeSelection = false;
    mainContainerClick = false;
  }
});

////////////////////
////////////////////
// Function Calls //
////////////////////
////////////////////

loadContent();
mainContainer.style.overflow = "hidden";
setInterval(() => {
  if (startTimer) {
    timer += 10;
  }
}, 10);
