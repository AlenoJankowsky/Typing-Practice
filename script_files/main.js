import {displayStats, displayTotalStats, displayTodayStats, toggleExtendedStats} from "./displayStats.js";
import {generateText} from "./generateText.js";
import {markCurrentChar} from "./displayText.js";
import {handleKeyDownEvent} from "./handleKeyDownEvent.js";
import {incrementSeconds} from "./timeHandler.js";
import {parseLocalStorage, resetLocalStorageForTodayStats, resetLocalStorageForTotalStats} from "./localStorageHandler.js";

const keyboardKeysArray = [['A', 0, 0], ['B', 0, 0], ['C', 0, 0], ['D', 0, 0], ['E', 0, 0], ['F', 0, 0], ['G', 0, 0], ['H', 0, 0], ['I', 0, 0], ['J', 0, 0], ['K', 0, 0], ['L', 0, 0], ['M', 0, 0],
                           ['N', 0, 0], ['O', 0, 0], ['P', 0, 0], ['Q', 0, 0], ['R', 0, 0], ['S', 0, 0], ['T', 0, 0], ['U', 0, 0], ['V', 0, 0], ['W', 0, 0], ['X', 0, 0], ['Y', 0, 0], ['Z', 0, 0]];

const generateTextButton = document.getElementById('generate-text-button');
const resetProgressButton = document.getElementById('reset-button');
const statsText = document.getElementById('last-set-stats-text');
const statsTextForSeconds = document.getElementById('last-set-stats-time-text');
const extendedStatsText = document.getElementById('extended-stats-text');
const extendedStatsContainer = document .getElementById('extended-stats-canvas');
const toggleExtendedStatsButton = document.getElementById('show-extended-stats')
const todayStatsTextContainer = document.getElementById('today-stats-text');
const totalStatsTextContainer = document.getElementById('total-stats-text');
const deleteTodayStatsButton = document.getElementById('delete-today-stats');
const deleteTotalStatsButton = document.getElementById('delete-total-stats');

let paragraphWithText = document.getElementById('text');
let charArray = [];
let charIndex = 0;
let seconds = 0;
let userKeyTypeCount = 0;
let userMistakesCount = 0;
let localStorage = window.localStorage
let extendedStatsString = "";

keyboardKeysArray.forEach(function(keyBoardKeyEntryInArray) {
  extendedStatsString += `${keyBoardKeyEntryInArray[0]} ${keyBoardKeyEntryInArray[1]}% <br>`;
});

extendedStatsText.innerHTML = extendedStatsString;

localStorage = parseLocalStorage(localStorage);

let generateTextButtonIsClicked = false;
statsTextForSeconds.innerHTML = `Seconds: ${seconds}s`;
statsText.innerHTML = displayStats(0, 0);
todayStatsTextContainer.innerHTML = displayTodayStats();
totalStatsTextContainer.innerHTML = displayTotalStats();

let tryCounter = 0;
var incrementSecondsInterval; 

function beginCounting() {
  incrementSecondsInterval = setInterval(function() {
    seconds = incrementSeconds(seconds, statsTextForSeconds, todayStatsTextContainer, totalStatsTextContainer);
    let minutes = seconds / 60;
    const charactersPerMinute = userKeyTypeCount / minutes;

    if (userKeyTypeCount == 0) {
      statsText.innerHTML = 'CPM: 0, Wrong Chars: 0%';
    }
    else {
      statsText.innerHTML = `CPM: ${Math.round(charactersPerMinute)} Wrong Chars: ${Math.round((userMistakesCount * 100 / userKeyTypeCount * 100) / 100)}%`;
    }
  }, 1000);
};

let keyDownHandler = async function(event) {
  const userInput = event.code;
  const userInputIsCorrect = charArray[charIndex] == event.key;
  const isFirstTry = tryCounter == 0;
  const isBeginOfTyping = userKeyTypeCount == 0;

  if (isBeginOfTyping) {
    beginCounting();
  }

  if (generateTextButtonIsClicked) {
    keyboardKeysArray.forEach(function(keyBoardKeyEntryInArray) {
      const isTheCorrectlyTypedKey = keyBoardKeyEntryInArray[0] == (event.key).toUpperCase();
      if (isFirstTry && userInputIsCorrect) {
        if (isTheCorrectlyTypedKey) {
          keyBoardKeyEntryInArray[1]++; 
        }
      }

      if (isTheCorrectlyTypedKey) {
        keyBoardKeyEntryInArray[2]++;
      }
    });

    extendedStatsString = "";
    keyboardKeysArray.forEach(function(keyBoardKeyEntryInArray) {
      let computedValue = Math.round(keyBoardKeyEntryInArray[1] / keyBoardKeyEntryInArray[2] * 100);
      if (keyBoardKeyEntryInArray[1] == 0) {
        computedValue = 0;
      }
      
      extendedStatsString += `${keyBoardKeyEntryInArray[0]} ${computedValue}%<br>`;
    });
    
    extendedStatsText.innerHTML = extendedStatsString;

    if (!userInputIsCorrect) {
      tryCounter ++;
      userMistakesCount ++;
      localStorage.todayMistypes = parseInt(localStorage.todayMistypes) + 1;
      localStorage.totalMistypes = parseInt(localStorage.totalMistypes) + 1;
    }
    else {
      tryCounter = 0;
    }

    if (userInput != 'Space') {
      userKeyTypeCount ++;
      localStorage.todayCharsTyped = parseInt(localStorage.todayCharsTyped) + 1;
      localStorage.totalCharsTyped = parseInt(localStorage.totalCharsTyped) + 1;
    }

    const endOfArrayIsReached = charIndex === charArray.length - 1;
    if (endOfArrayIsReached) {
      clearInterval(incrementSecondsInterval);
      charArray = await generateText(paragraphWithText);
      resetProgress();
      localStorage.todayAmountOfSets = parseInt(localStorage.todayAmountOfSets) + 1;
      localStorage.totalAmountOfSets = parseInt(localStorage.totalAmountOfSets) + 1;

      return;
    }  

    charIndex = handleKeyDownEvent(event, paragraphWithText, statsText, todayStatsTextContainer, charArray, charIndex, seconds, userKeyTypeCount, userMistakesCount);
  }
}

generateTextButton.addEventListener('click', async function() {
  charArray = await generateText(paragraphWithText);

  if (generateTextButtonIsClicked) {
    document.removeEventListener('keydown', keyDownHandler);
    resetProgress();
    clearInterval(incrementSecondsInterval);
  }

  paragraphWithText.innerHTML = markCurrentChar(paragraphWithText, charIndex);
  document.addEventListener('keydown', keyDownHandler);

  generateTextButtonIsClicked = true;
});

resetProgressButton.addEventListener('click', function() {
  resetProgress();
});

function resetProgress() {
  charIndex = 0;
  seconds = 0;
  userKeyTypeCount = 0;
  userMistakesCount = 0;
  paragraphWithText.innerHTML = markCurrentChar(paragraphWithText, charIndex);
  statsText.innerHTML = displayStats(userMistakesCount, userKeyTypeCount, seconds);
  todayStatsTextContainer.innerHTML = displayTodayStats(userKeyTypeCount);
}

resetProgressButton.addEventListener('click', function() {
  resetProgress();
});

toggleExtendedStatsButton.addEventListener('click', function() {
  toggleExtendedStats(extendedStatsContainer)
});

deleteTodayStatsButton.addEventListener('click', resetLocalStorageForTodayStats);
deleteTotalStatsButton.addEventListener('click', resetLocalStorageForTotalStats);
