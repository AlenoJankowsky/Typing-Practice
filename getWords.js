const generateTextButton = document.getElementById('generate-text-button');
const paragraphWithText = document.getElementById('text');

generateTextButton.addEventListener('click', async function() {
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

  paragraphWithText.innerHTML = textArray;
  document.addEventListener('keydown', function(event) {
    paragraphWithText.innerHTML = textArray;
    let charIterator = 0;
    for (let loopIterator = 0; loopIterator < textArray.length; loopIterator++)
      if (textArray[charIterator] == event.key) {
        let span = document.createElement('span');
        textArray[charIterator] = span[charIterator];
        textArray[charIterator].style.color = 'green';

        charIterator += 1;
      }
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
