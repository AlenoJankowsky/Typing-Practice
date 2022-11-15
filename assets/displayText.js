import {displayStats} from "./displayStats.js";
import {displayTodayStats} from "./displayStats.js";

function createResultParagraphText(paragraphWithText, charIndex, span) {
    const resultParagraphText = paragraphWithText.innerText.substring(0, charIndex) + span.outerHTML + paragraphWithText.innerText.substring(charIndex + 1);

    return resultParagraphText;
}

export function cleanText(text) {
  const resultText = text
    .replaceAll(',', " ")
    .replaceAll('"', "")
    .replaceAll('[', "")
    .replaceAll(']', "");

  return resultText;
}

export function charArrayIntoString(textArray) {
  var resultString = "";
  for (const char of textArray) {
    resultString += char;
  }

  return resultString;
}

export function markCurrentChar(paragraphWithText, charIndex) {
  let span = document.createElement('span');
  let textForSpan = document.createTextNode(paragraphWithText.innerText[charIndex]);
  span.appendChild(textForSpan);
  span.style.backgroundColor = 'white';

  return createResultParagraphText(paragraphWithText, charIndex, span);
}

export function markIncorrectChar(paragraphWithText, charIndex) {
  let span = document.createElement('span');
  let textForSpan = document.createTextNode(paragraphWithText.innerText[charIndex]);
  span.appendChild(textForSpan);
  span.style.color = 'red';

  return createResultParagraphText(paragraphWithText, charIndex, span);
}

export function displayParagraphs(userInputIsCorrect, paragraphWithText, charIndex, statsText, seconds, userMistakesCount, userKeyTypeCount, todayStatsText) {
  if (userInputIsCorrect) {
    paragraphWithText.innerHTML = markCurrentChar(paragraphWithText, charIndex + 1);
    statsText.innerHTML = displayStats(userMistakesCount, userKeyTypeCount, seconds);
    todayStatsText.innerHTML = displayTodayStats(userKeyTypeCount);

    return charIndex += 1;
  }

  paragraphWithText.innerHTML = markIncorrectChar(paragraphWithText, charIndex);
  statsText.innerHTML = displayStats(userMistakesCount, userKeyTypeCount, seconds);
  todayStatsText.innerHTML = displayTodayStats(userKeyTypeCount);
  
  return charIndex;
}
