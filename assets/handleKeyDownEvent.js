import {displayParagraphs} from "./displayText.js";
import {preventSpaceBar} from "./preventDefault.js";

export function handleKeyDownEvent(event, paragraphWithText, statsText, todayStatsText, charArray, charIndex, seconds, userKeyTypeCount, userMistakesCount, amountOfSets) {
  
  preventSpaceBar(event, charArray, charIndex);
  const userInputIsCorrect = charArray[charIndex] == event.key;
  charIndex = displayParagraphs(userInputIsCorrect, paragraphWithText, charIndex, statsText, seconds, userMistakesCount, userKeyTypeCount, todayStatsText, amountOfSets);

  return charIndex;
}
