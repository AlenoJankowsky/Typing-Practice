import {displayStats, displayTotalStats} from "./displayStats.js";
import {displayTodayStats} from "./displayStats.js";
import {generateText} from "./generateText.js";
import {markCurrentChar} from "./displayText.js";
import {handleKeyDownEvent} from "./handleKeyDownEvent.js";
import {incrementSeconds} from "./timeHandler.js";
import {handleLocalStorage} from "./localStorageHandler.js";
import {resetLocalStorageForTodayStats} from "./localStorageHandler.js";
import {resetLocalStorageForTotalStats} from "./localStorageHandler.js";

const keyboardKeysArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const keyboardKeysArrayEntriesIterator = keyboardKeysArray.entries();

const generateTextButton = document.getElementById('generate-text-button');
const resetProgressButton = document.getElementById('reset-button');
const statsText = document.getElementById('last-set-stats-text');
const statsTextForSeconds = document.getElementById('last-set-stats-time-text');
const todayStatsText = document.getElementById('today-stats-text');
const totalStatsText = document.getElementById('total-stats-text');
const deleteTodayStatsButton = document.getElementById('delete-today-stats');
const deleteTotalStatsButton = document.getElementById('delete-total-stats');

let paragraphWithText = document.getElementById('text');
let charArray = [];
let charIndex = 0;
let seconds = 0;
let userKeyTypeCount = 0;
let userMistakesCount = 0;

handleLocalStorage();

let generateTextButtonIsClicked = false;
statsTextForSeconds.innerHTML = 'Seconds: ' + seconds + 's';
statsText.innerHTML = displayStats(0, 0);
todayStatsText.innerHTML = displayTodayStats();
totalStatsText.innerHTML = displayTotalStats();

let keyDownHandler = async function(event) {
  const userInput = event.code;
  const userInputIsCorrect = charArray[charIndex] == event.key;

  if (generateTextButtonIsClicked) {

    if (!userInputIsCorrect) {
      userMistakesCount += 1;
      localStorage.todayMistypes = parseInt(localStorage.todayMistypes) + 1;
      localStorage.totalMistypes = parseInt(localStorage.totalMistypes) + 1;
    }

    if (userInput != 'Space') {
      userKeyTypeCount += 1;
      localStorage.todayCharsTyped = parseInt(localStorage.todayCharsTyped) + 1;
      localStorage.totalCharsTyped = parseInt(localStorage.totalCharsTyped) + 1;
    }

    const endOfArrayIsReached = charIndex == charArray.length - 1;
    if (endOfArrayIsReached) {
      charArray = await generateText(paragraphWithText);
      resetProgress();
      localStorage.todayAmountOfSets = parseInt(localStorage.todayAmountOfSets) + 1;
      localStorage.totalAmountOfSets = parseInt(localStorage.totalAmountOfSets) + 1;

      return;
    }  

    charIndex = handleKeyDownEvent(event, paragraphWithText, statsText, todayStatsText, charArray, charIndex, seconds, userKeyTypeCount, userMistakesCount);
  }
}

function resetProgress() {
  charIndex = 0;
  seconds = 0;
  userKeyTypeCount = 0;
  userMistakesCount = 0;
  paragraphWithText.innerHTML = markCurrentChar(paragraphWithText, charIndex);
  statsText.innerHTML = displayStats(userMistakesCount, userKeyTypeCount, seconds);
  todayStatsText.innerHTML = displayTodayStats(userKeyTypeCount);
}

function initializeFrequencyEntries() {
  keyboardKeysArray.forEach(function() {
    for (let index of keyboardKeysArrayEntriesIterator) {
      index = 0;
    }
  });
}

generateTextButton.addEventListener('click', async function() {
  initializeFrequencyEntries();

  if (generateTextButtonIsClicked) {
      resetProgress();
      document.removeEventListener('keydown', keyDownHandler);
  }

  charArray = await generateText(paragraphWithText);

  const incrementSecondsInterval = setInterval(function() {
    seconds = incrementSeconds(seconds, statsTextForSeconds, todayStatsText, totalStatsText);
    let minutes = seconds / 60;
    const charactersPerMinute = userKeyTypeCount / minutes;
    const isFreshRun = userKeyTypeCount == 0;
    
    if (isFreshRun) {
      statsText.innerHTML = 'CPM: ' + '0 ' + 'Wrong Chars: ' + '0%';
    }
    else {
      statsText.innerHTML = 'CPM: '+ Math.round(charactersPerMinute) + ' ' + 'Wrong Chars: ' + Math.round((userMistakesCount * 100 / userKeyTypeCount * 100) / 100) + '%';
    }
  }, 1000);
  if (generateTextButtonIsClicked) {
    clearInterval(incrementSecondsInterval);
  }

  paragraphWithText.innerHTML = markCurrentChar(paragraphWithText, charIndex);
  document.addEventListener('keydown', keyDownHandler);

  generateTextButtonIsClicked = true;
});

resetProgressButton.addEventListener('click', function() {
  resetProgress();
});

deleteTodayStatsButton.addEventListener('click', resetLocalStorageForTodayStats);
deleteTotalStatsButton.addEventListener('click', resetLocalStorageForTotalStats);
