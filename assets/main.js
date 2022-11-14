import {displayStats} from "./displayStats.js";
import {displayTodayStats} from "./displayStats.js";
import {generateText} from "./generateText.js";
import {resetProgress} from "./resetProgress.js";
import {markCurrentChar} from "./displayText.js";
import {handleKeyDownEvent} from "./handleKeyDownEvent.js";
import {incrementSeconds} from "./timeHandler.js";

const generateTextButton = document.getElementById('generate-text-button');
const resetProgressButton = document.getElementById('reset-button');
const statsText = document.getElementById('last-set-stats-text');
const statsTextForSeconds = document.getElementById('last-set-stats-time-text');
const todayStatsText = document.getElementById('today-stats-text');
let paragraphWithText = document.getElementById('text');

let charArray = [];
let charIndex = 0;
let seconds = 0;
let userKeyTypeCount = 0;
let userMistakesCount = 0; 
let amountOfSets = 0;
let generateTextButtonIsClicked = false;
statsTextForSeconds.innerHTML = 'Seconds: ' + seconds;
statsText.innerHTML = displayStats(0, 0);
todayStatsText.innerHTML = displayTodayStats(0, 0, 0, 0);

generateTextButton.addEventListener('click', async function() {
  charIndex = 0;
  seconds = 0;
  const incrementSecondsInterval = setInterval(function() {
    seconds = incrementSeconds(seconds, statsTextForSeconds);
    let minutes = seconds / 60;
    const charactersPerMinute = userKeyTypeCount / minutes;

    if (userKeyTypeCount == 0) {
      statsText.innerHTML = 'CPM: ' + '0 ' + 'Wrong Chars: ' + '0%';
    }
    else {
      statsText.innerHTML = 'CPM: '+ Math.round(charactersPerMinute) + ' ' + 'Wrong Chars: ' + Math.round((userMistakesCount * 100 / userKeyTypeCount * 100) / 100) + '%';
    }
  }, 1000);
  if (generateTextButtonIsClicked) {
    clearInterval(incrementSecondsInterval);
  }

  charArray = await generateText(paragraphWithText);
  paragraphWithText.innerHTML = markCurrentChar(paragraphWithText, charIndex);
  document.addEventListener('keydown', function(event) {
    if (generateTextButtonIsClicked) {
      if (event.code != 'Space') {
        userKeyTypeCount += 1;
      }

      const endOfArrayIsReached = charIndex == charArray.length;
      if (endOfArrayIsReached) {
        amountOfSets += 1;
    
        return;
      }  

      charIndex = handleKeyDownEvent(event, paragraphWithText, statsText, todayStatsText, charArray, charIndex, seconds, userKeyTypeCount, userMistakesCount, amountOfSets);
    }
  });

  generateTextButtonIsClicked = true;
});

resetProgressButton.addEventListener('click', function() {
  resetProgress(seconds, charIndex, userKeyTypeCount, userMistakesCount, paragraphWithText);
});

