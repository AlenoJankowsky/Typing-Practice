import {displayStats} from "./displayStats.js";
import {displayTodayStats} from "./displayStats.js";
import {generateText} from "./generateText.js";
import {resetProgress} from "./resetProgress.js";
import {markCurrentChar} from "./displayText.js";
import {handleKeyDownEvent} from "./handleKeyDownEvent.js";
import {handleTime} from "./timeHandler.js";

const generateTextButton = document.getElementById('generate-text-button');
const resetProgressButton = document.getElementById('reset-button');
const statsText = document.getElementById('last-set-stats-text');
const todayStatsText = document.getElementById('today-stats-text')
let paragraphWithText = document.getElementById('text');

let charArray = [];
let charIndex = 0;
let seconds = 0;
let userKeyTypeCount = 0;
let userMistakesCount = 0; 
let amountOfSets = 0;
let generateTextButtonIsClicked = false;
statsText.innerHTML = 'Seconds: ' + '0' + ', ' + displayStats(0, 0);
todayStatsText.innerHTML = displayTodayStats(0, 0, 0, 0);

generateTextButton.addEventListener('click', async function() {
  charIndex = 0;
  seconds = 0;
  seconds = handleTime(generateTextButtonIsClicked, seconds, statsText, userMistakesCount, userKeyTypeCount);
  charArray = await generateText(paragraphWithText);
  generateTextButtonIsClicked = true;
  paragraphWithText.innerHTML = markCurrentChar(paragraphWithText, charIndex);
  document.addEventListener('keydown', function(event) {
  if (generateTextButtonIsClicked) {
    charIndex = handleKeyDownEvent(event, paragraphWithText, statsText, todayStatsText, charArray, charIndex, seconds, userKeyTypeCount, userMistakesCount, amountOfSets);
  }
});

});

resetProgressButton.addEventListener('click', function() {
  resetProgress(seconds, charIndex, userKeyTypeCount, userMistakesCount, paragraphWithText);
});

