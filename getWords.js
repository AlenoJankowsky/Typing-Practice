const generateTextButton = document.getElementById('generate-text-button');
const paragraphWithText = document.getElementById('text');

var span = null;

generateTextButton.addEventListener('click', async function() {
  const amountOfWordsWanted = document.getElementById('amount-of-words').value;
  const amountOfWordsWantedToString = amountOfWordsWanted.toString();
  const webAPI = 'https://random-word-api.herokuapp.com/word?number=' + amountOfWordsWantedToString;
  const fetchText = await fetch(webAPI);
  const text = await fetchText.text();
  const resultText = cleanText(text);
  paragraphWithText.innerHTML = resultText;

  if (span != null) {
    span.removeChild(spanText);
  }

  span = document.createElement('span');
  var spanText = document.createTextNode(resultText);
  span.appendChild(spanText);

  document.addEventListener('keydown', function(event){
    
    paragraphWithText.appendChild(span);
    if (resultText.charAt(0) == event.key) {
      paragraphWithText.style.color = 'green';
    }
    else {
      paragraphWithText.style.color = 'red';
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
