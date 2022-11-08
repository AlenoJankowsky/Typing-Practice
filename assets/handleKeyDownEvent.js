import {displayParagraphs} from "./displayText.js";
import {markCurrentChar} from "./displayText.js";

export function handleKeyDownEvent(event, paragraphWithText, statsText, todayStatsText, charArray, charIndex, seconds, userKeyTypeCount, userMistakesCount, amountOfSets) {
  const isWhiteSpace = event.code == 'Space' && charArray[charIndex + 1] == " ";
  if (isWhiteSpace) {
    charIndex += 1;
    event.preventDefault();
  }

  if (event.code != 'Space') {userKeyTypeCount += 1;}

  const userInputIsCorrect = charArray[charIndex] == event.key;
  console.log(event.key);
  console.log(charArray[charIndex]);
  console.log(userInputIsCorrect);
  if (userInputIsCorrect) {
    if (charArray[charIndex + 1] != undefined) {charIndex += 1;};

    paragraphWithText.innerHTML = markCurrentChar(paragraphWithText, charIndex);
    displayParagraphs(userInputIsCorrect, paragraphWithText, charIndex, statsText, seconds, userMistakesCount, userKeyTypeCount, todayStatsText, amountOfSets);
  }

  if (!userInputIsCorrect) {
    userMistakesCount += 1;
    displayParagraphs(userInputIsCorrect, paragraphWithText, charIndex, statsText, seconds, userMistakesCount, userKeyTypeCount, todayStatsText, amountOfSets);
    paragraphWithText.innerHTML = markCurrentChar(paragraphWithText, charIndex);
  }

  if (charIndex == charArray.length) {
    amountOfSets += 1;
    displayParagraphs(userInputIsCorrect, paragraphWithText, charIndex, statsText, seconds, userMistakesCount, userKeyTypeCount, todayStatsText, amountOfSets);
  }  
}
