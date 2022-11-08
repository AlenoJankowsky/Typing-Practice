import {displayStats} from "./displayStats.js";

function incrementSeconds(seconds, statsText, userMistakesCount, userKeyTypeCount) {
  seconds += 1;
  statsText.innerHTML = 'Seconds: ' + seconds + ', ' + displayStats(userMistakesCount, userKeyTypeCount, seconds);

  return seconds;
}

export function handleTime(generateTextButtonIsClicked, seconds, statsText, userMistakesCount, userKeyTypeCount) {
    const incrementSecondsInterval = setInterval(function() {
    seconds = incrementSeconds(seconds, statsText, userMistakesCount, userKeyTypeCount);
  }, 1000);
  
  if (generateTextButtonIsClicked) {
    clearInterval(incrementSecondsInterval);
  }
}
