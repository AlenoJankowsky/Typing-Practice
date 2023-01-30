import {cleanText} from "./displayText.js";

export async function getTextFromApi() {
  const amountOfWordsWanted = document.getElementById('amount-of-words').value;
  const amountOfWordsWantedToString = amountOfWordsWanted.toString();
  const webAPI = 'http://localhost:5144/randomword?amountOfWords=' + amountOfWordsWantedToString;
  const fetchText = await fetch(webAPI);
  const text = await fetchText.text();
  const resultText = cleanText(text);

  return resultText;
}
