import {markCurrentChar} from "./displayText.js";
import {displayStats} from "./displayStats.js";
import {displayTodayStats} from "./displayStats.js";

const statsText = document.getElementById('last-set-stats-text');
const todayStatsText = document.getElementById('today-stats-text');

export function resetProgress(seconds, charIndex, userKeyTypeCount, userMistakesCount, paragraphWithText, amountOfSets) {
  charIndex = 0;
  seconds = 0;
  userKeyTypeCount = 0;
  userMistakesCount = 0;
  paragraphWithText.innerHTML = markCurrentChar(paragraphWithText, charIndex);
  statsText.innerHTML = displayStats(userMistakesCount, userKeyTypeCount, seconds);
  todayStatsText.innerHTML = displayTodayStats(userKeyTypeCount, amountOfSets);
}
