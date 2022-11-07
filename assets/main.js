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
let amountOfSets = 0;
let intervalIsUsed = false;
let charArray = [];

statsText.innerHTML = 'Seconds: ' + '0' + ', ' + displayStats(0, 0);
todayStatsText.innerHTML = displayTodayStats(0, 0, 0, 0);

playTypingPractice(generateTextButton, resetProgressButton, statsText, inputButton, paragraphWithText, intervalIsUsed, amountOfSets, todayStatsText, charArray, seconds);
