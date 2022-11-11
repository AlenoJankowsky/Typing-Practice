import {displayStats} from "./displayStats.js";
import {displayTodayStats} from "./displayStats.js";

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
  let resultParagraphText = paragraphWithText.innerText.substring(0, charIndex) + span.outerHTML + paragraphWithText.innerText.substring(charIndex + 1);

  return resultParagraphText;
}

export function markIncorrectChar(paragraphWithText, charIndex) {
  let span = document.createElement('span');
  let textForSpan = document.createTextNode(paragraphWithText.innerText[charIndex]);
  span.appendChild(textForSpan);
  span.style.color = 'red';
  let resultParagraphText = paragraphWithText.innerText.substring(0, charIndex) + span.outerHTML + paragraphWithText.innerText.substring(charIndex + 1);

  return resultParagraphText;
}

export function displayParagraphs(userInputIsCorrect, paragraphWithText, charIndex, statsText, seconds, userMistakesCount, userKeyTypeCount, todayStatsText, amountOfSets) {
  if (userInputIsCorrect) {
    paragraphWithText.innerHTML = markCurrentChar(paragraphWithText, charIndex + 1);
    statsText.innerHTML = 'Seconds: ' + seconds + ', ' + displayStats(userMistakesCount, userKeyTypeCount, seconds);
    todayStatsText.innerHTML = displayTodayStats(userMistakesCount, userKeyTypeCount, seconds, amountOfSets);

    return;
  }

  paragraphWithText.innerHTML = markIncorrectChar(paragraphWithText, charIndex + 1);
  statsText.innerHTML = 'Seconds: ' + seconds + ', ' + displayStats(userMistakesCount, userKeyTypeCount, seconds);
  todayStatsText.innerHTML = displayTodayStats(userMistakesCount, userKeyTypeCount, seconds, amountOfSets);
}
