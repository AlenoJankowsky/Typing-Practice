import {displayStats} from "./displayStats.js";
import {cleanText} from "./displayText.js";
import {charArrayIntoString} from "./displayText.js";
import {markCurrentChar} from "./displayText.js";
import {markIncorrectChar} from "./displayText.js"
import {incrementSeconds} from "./timeHandler.js";

const generateTextButton = document.getElementById('generate-text-button');
const resetProgressButton = document.getElementById('reset-button');
const statsText = document.getElementById('stats-text');
const inputButton = document.getElementById('generate-text-button');
var paragraphWithText = document.getElementById('text');

var seconds = 0;
var userMistakesCount = 0;
var userKeyTypeCount = 0;
var intervalIsUsed = false;

displayStats(statsText, seconds, userMistakesCount, userKeyTypeCount);

generateTextButton.addEventListener('click', async function() {
  seconds = 0;
  displayStats(statsText, seconds, userMistakesCount, userKeyTypeCount);

  if (!intervalIsUsed) {setInterval(incrementSeconds, 1000);}

  let textArray = [];
  const amountOfWordsWanted = document.getElementById('amount-of-words').value;
  const amountOfWordsWantedToString = amountOfWordsWanted.toString();
  const webAPI = 'https://random-word-api.herokuapp.com/word?number=' + amountOfWordsWantedToString;
  const fetchText = await fetch(webAPI);
  const text = await fetchText.text();
  const resultText = cleanText(text);

  for (const element of resultText) {
    textArray.push(element);
  }

  paragraphWithText.innerHTML = charArrayIntoString(textArray);

  var charIndex = 0;
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

  
  document.addEventListener('keydown', function(event) {
    const isWhiteSpace = event.code == 'Space' && textArray[charIndex + 1] == " ";
    if (isWhiteSpace) {
      charIndex += 1;
      event.preventDefault();

      return;
    }

    if (event.code != 'Space') {
      userKeyTypeCount += 1;
    }

    if (charIndex == textArray.length - 1) {
      return;
    }

    const userInputIsCorrect = textArray[charIndex] == event.key;
    if (userInputIsCorrect) {
      charIndex += 1;
      paragraphWithText.innerHTML = markCurrentChar(paragraphWithText, charIndex);
    }

    if (!userInputIsCorrect) {
      userMistakesCount += 1;
      paragraphWithText.innerHTML = markIncorrectChar(paragraphWithText, charIndex);
    }

    displayStats(statsText, seconds, userMistakesCount, userKeyTypeCount);
  });
});
