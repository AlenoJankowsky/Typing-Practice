export function incrementSeconds(seconds, statsText) {
  seconds += 1;
  localStorage.totalSeconds = parseInt(localStorage.totalSeconds) + 1;
  statsText.innerHTML = 'Seconds: ' + seconds + 's';

  return seconds;
}
