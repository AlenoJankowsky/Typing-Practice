import {charArrayIntoString} from  "./displayText.js";
import {createIterableCharArray} from  "./createIterableCharArray.js"

export async function generateText(paragraphWithText) {
  const charArray = await createIterableCharArray(paragraphWithText);
  paragraphWithText.innerHTML = charArrayIntoString(charArray);

  return charArray;
}
