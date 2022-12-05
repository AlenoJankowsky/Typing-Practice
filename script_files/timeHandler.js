export function incrementSeconds(seconds, statsText) {
  seconds += 1;
  statsText.innerHTML = 'Seconds: ' + seconds + 's';

  return seconds;
}
