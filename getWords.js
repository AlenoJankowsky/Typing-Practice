const generateTextButton = document.getElementById('generate-text-button');
const paragraphWithText = document.getElementById('text');
const inputButton = document.getElementById('generate-text-button');

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

  paragraphWithText.innerHTML = charArrayIntoString(textArray);

  var charIndex = 0;
  paragraphWithText.innerHTML = markCurrentChar(paragraphWithText, charIndex);

  inputButton.addEventListener('keydown', function(event) {
    if (event.code == 'Space') {
      charIndex += 1;
      event.preventDefault();

      return;
    }
  });

  document.addEventListener('keydown', function(event) {
    if (charIndex == textArray.length - 1) {
      getRandomWords();
    }

    if (event.code == 'Space' && textArray[charIndex + 1] == " ") {
      console.log("kek1");
      charIndex += 1;
      event.preventDefault();

      return;
    }

    const userInputIsCorrect = textArray[charIndex] == event.key;
    if (userInputIsCorrect) {
      charIndex += 1;
      paragraphWithText.innerHTML = markCurrentChar(paragraphWithText, charIndex);

      return;
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

function charArrayIntoString(textArray) {
  var resultString = "";
  for (const char of textArray) {
    resultString += char;
  }

  return resultString;
}

function markCurrentChar(paragraphText, charIndex) {
  let span = document.createElement('span');
  let textForSpan = document.createTextNode(paragraphText.innerText[charIndex]);
  span.appendChild(textForSpan);
  span.style.backgroundColor = 'lightgrey';
  const resultParagraphText = paragraphText.innerText.substring(0, charIndex) + span.outerHTML + paragraphText.innerText.substring(charIndex + 1);

  return resultParagraphText;
}

async function getRandomWords() {
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
}
