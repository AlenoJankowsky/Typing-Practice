import {displayTodayStats} from "./displayStats.js";

export function incrementSeconds(seconds, statsTextForSeconds, todayStatsText) {
  seconds += 1;
  localStorage.totalSeconds = parseInt(localStorage.totalSeconds) + 1;
  statsTextForSeconds.innerHTML = 'Seconds: ' + seconds + 's';
  todayStatsText.innerHTML = displayTodayStats();

  return seconds;
}
