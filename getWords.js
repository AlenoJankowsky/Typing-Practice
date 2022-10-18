document.addEventListener('DOMContentLoaded', function() {
  const generateTextButton = document.getElementById('generate-text-button');
  
  generateTextButton.addEventListener('click', async function() {
    const amountOfWordsWanted = document.getElementById('amount-of-words').value;
    const amountOfWordsWantedToString = amountOfWordsWanted.toString();
    const webAPI = 'https://random-word-api.herokuapp.com/word?number=' + amountOfWordsWantedToString;
    const fetchText = await fetch(webAPI);
    const text = await fetchText.text();
    const resultText = cleanText(text);
    const paragraphWithText = document.getElementById('text');
    for (let textIterator = 0; textIterator < resultText.length; textIterator++) {
      paragraphWithText.innerHTML = resultText.slice(textIterator, textIterator + 1);
      if (textIterator == 0) {
        break;
      }
    }
    
    paragraphWithText.style.textDecoration = 'underline';
    paragraphWithText.innerHTML = paragraphWithText.innerHTML + resultText.slice(1, resultText.length + 1);

  });
});

function cleanText(text) {
  const resultText = text
    .replaceAll(',', " ")
    .replaceAll('"', "")
    .replaceAll('[', "")
    .replaceAll(']', "");

  return resultText;
}
