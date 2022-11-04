import {displayStats} from "./displayStats.js";
import {playTypingPractice} from "./gameCode.js";

const generateTextButton = document.getElementById('generate-text-button');
const resetProgressButton = document.getElementById('reset-button');
const statsText = document.getElementById('stats-text');
const inputButton = document.getElementById('generate-text-button');
let paragraphWithText = document.getElementById('text');

let seconds = 0;
let userMistakesCount = 0;
let userKeyTypeCount = 0;
let intervalIsUsed = false;

statsText.innerHTML = 'Seconds: ' + seconds + ', ' + displayStats(userMistakesCount, userKeyTypeCount);

playTypingPractice(generateTextButton, resetProgressButton, statsText, inputButton, paragraphWithText, seconds, userMistakesCount, userKeyTypeCount, intervalIsUsed);
