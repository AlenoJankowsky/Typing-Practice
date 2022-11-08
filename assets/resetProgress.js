import {markCurrentChar} from "./displayText.js";

export function resetProgress(seconds, charIndex, userKeyTypeCount, userMistakesCount, paragraphWithText) {
  charIndex = 0;
  seconds = 0;
  userKeyTypeCount = 0;
  userMistakesCount = 0;
  paragraphWithText.innerHTML = markCurrentChar(paragraphWithText, charIndex);
}
 