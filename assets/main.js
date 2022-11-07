import {displayStats} from "./displayStats.js";
import {playTypingPractice} from "./gameCode.js";
import {displayTodayStats} from "./displayStats.js";

const generateTextButton = document.getElementById('generate-text-button');
const resetProgressButton = document.getElementById('reset-button');
const statsText = document.getElementById('last-set-stats-text');
const todayStatsText = document.getElementById('today-stats-text')
const inputButton = document.getElementById('generate-text-button');
let paragraphWithText = document.getElementById('text');

let seconds = 0;
let userMistakesCount = 0;
let userKeyTypeCount = 0;
let amountOfSets = 0;
let intervalIsUsed = false;
let charArray = [];
let charIndex = 0;

statsText.innerHTML = 'Seconds: ' + seconds + ', ' + displayStats(userMistakesCount, userKeyTypeCount);
todayStatsText.innerHTML = displayTodayStats(userMistakesCount, userKeyTypeCount, seconds, amountOfSets);

playTypingPractice(generateTextButton, resetProgressButton, statsText, inputButton, paragraphWithText, seconds, userMistakesCount, userKeyTypeCount, intervalIsUsed, amountOfSets, todayStatsText, charArray, charIndex);
