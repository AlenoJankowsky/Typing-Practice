import {displayParagraphs} from "./displayText.js";
import {preventSpaceBar} from "./preventDefault.js";

const generateTextButton = document.getElementById('generate-text-button');
const resetProgressButton = document.getElementById('reset-button');

export function handleKeyDownEvent(event, paragraphWithText, statsText, todayStatsText, charArray, charIndex, seconds, userKeyTypeCount, userMistakesCount, amountOfSets) {
  const isWhiteSpace = event.code == 'Space' && charArray[charIndex + 1] == " ";
  if (isWhiteSpace) {
    charIndex += 1;
    event.preventDefault();

    return;
  }

  preventSpaceBar(event, generateTextButton);
  preventSpaceBar(event, resetProgressButton);

  if (event.code != 'Space') {
    userKeyTypeCount += 1;
  }

  const endOfArrayIsReached = charIndex == charArray.length;
  if (endOfArrayIsReached) {
    amountOfSets += 1;

    return;
  }  

  const userInputIsCorrect = charArray[charIndex] == event.key;
  displayParagraphs(userInputIsCorrect, paragraphWithText, charIndex, statsText, seconds, userMistakesCount, userKeyTypeCount, todayStatsText, amountOfSets);

  return charIndex + 1;
}
