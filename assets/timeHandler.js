import {displayTodayStats} from "./displayStats.js";
import {resetLocalStorage} from "./localStorageHandler.js";

export function incrementSeconds(seconds, statsTextForSeconds, todayStatsText) {
  seconds += 1;
  localStorage.totalSeconds = parseInt(localStorage.totalSeconds) + 1;
  statsTextForSeconds.innerHTML = 'Seconds: ' + seconds + 's';
  todayStatsText.innerHTML = displayTodayStats();
  isMidnight();

  return seconds;
}


export function isMidnight() {
  let currentDate = new Date();
  let currentSeconds = currentDate.getSeconds();
  let currentMinutes = currentDate.getMinutes();
  let currentHours = currentDate.getHours();


  
  if (currentHours == 0 && currentMinutes == 0 && currentSeconds == 0) {
    resetLocalStorage();
  }
}
