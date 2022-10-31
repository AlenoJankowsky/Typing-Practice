const generateTextButton = document.getElementById('generate-text-button');
var paragraphWithText = document.getElementById('text');
const inputButton = document.getElementById('generate-text-button');

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

function markCurrentChar(paragraphWithText, charIndex) {
  let span = document.createElement('span');
  let textForSpan = document.createTextNode(paragraphWithText.innerText[charIndex]);
  span.appendChild(textForSpan);
  span.style.backgroundColor = 'white';
  let resultParagraphText = paragraphWithText.innerText.substring(0, charIndex) + span.outerHTML + paragraphWithText.innerText.substring(charIndex + 1);

  return resultParagraphText;
}

function markIncorrectChar(paragraphWithText, charIndex) {
  let span = document.createElement('span');
  let textForSpan = document.createTextNode(paragraphWithText.innerText[charIndex]);
  span.appendChild(textForSpan);
  span.style.color = 'red';
  //let resultParagraphText = paragraphWithText.innerText.substring(0, charIndex) + span.outerHTML + paragraphWithText.innerText.substring(charIndex + 1);

  return span.outerHTML;
}

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
      event.preventDefault();

      return;
    }
  });

  document.addEventListener('keydown', function(event) {
    console.log("kek");

    if (event.code == 'Space' && textArray[charIndex + 1] == " ") {
      charIndex += 1;
      event.preventDefault();

      return;
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
      let span = markIncorrectChar(paragraphWithText, charIndex);
      console.log(span);
      paragraphWithText.innerHTML = paragraphWithText.innerText.replace(paragraphWithText.innerText[charIndex], span);
    }
  });
});
