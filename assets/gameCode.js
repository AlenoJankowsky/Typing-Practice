import {markCurrentChar} from "./displayText.js";
import {markIncorrectChar} from "./displayText.js";
import {displayStats} from "./displayStats.js";
import {createIterableCharArray} from "./createIterableCharArray.js";
import {charArrayIntoString} from "./displayText.js";

export function playTypingPractice(generateTextButton, resetProgressButton, statsText, inputButton, paragraphWithText, seconds, userMistakesCount, userKeyTypeCount, intervalIsUsed) {
  generateTextButton.addEventListener('click', async function() {
    seconds = 0;
    statsText.innerHTML = 'Seconds: ' + seconds + ', ' + displayStats(userMistakesCount, userKeyTypeCount, seconds);

    if (!intervalIsUsed) {
      setInterval(function() {
        seconds += 1;
        intervalIsUsed = true;
        statsText.innerHTML = 'Seconds: ' + seconds + ', ' + displayStats(userMistakesCount, userKeyTypeCount, seconds);
  
      }, 1000);
    }
  
    let charArray = await createIterableCharArray(paragraphWithText);
  
    let charIndex = 0;
    paragraphWithText.innerHTML = charArrayIntoString(charArray);
    paragraphWithText.innerHTML = markCurrentChar(paragraphWithText, charIndex);

  
    inputButton.addEventListener('keydown', function(event) {
      if (event.code == 'Space') {
        event.preventDefault();

        return;
      }
    });

    resetProgressButton.addEventListener('keydown', function(event) {
      if (event.code == 'Space') {
        event.preventDefault();

        return;
      }
    });

    resetProgressButton.addEventListener('click', function() {
      charIndex = 0;
      seconds = 0;
      paragraphWithText.innerHTML = markCurrentChar(paragraphWithText, charIndex);
    });

    document.addEventListener('keydown', async function(event) {
      const isWhiteSpace = event.code == 'Space' && charArray[charIndex + 1] == " ";
      if (isWhiteSpace) {
        charIndex += 1;
        event.preventDefault();

        return;
      }

      if (event.code != 'Space') {
        userKeyTypeCount += 1;
      }

      const userInputIsCorrect = charArray[charIndex] == event.key;
      if (userInputIsCorrect) {
        charIndex += 1;
        paragraphWithText.innerHTML = markCurrentChar(paragraphWithText, charIndex);
        statsText.innerHTML = 'Seconds: ' + seconds + ', ' + displayStats(userMistakesCount, userKeyTypeCount, seconds);
      }

      if (!userInputIsCorrect) {
        userMistakesCount += 1;
        paragraphWithText.innerHTML = markIncorrectChar(paragraphWithText, charIndex);
        statsText.innerHTML = 'Seconds: ' + seconds + ', ' + displayStats(userMistakesCount, userKeyTypeCount, seconds);
      }
    });

    if (charIndex == charArray.length - 1) { 
      return 1;
    }  
  });
}
