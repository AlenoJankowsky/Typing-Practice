export function incrementSeconds(seconds, statsText) {
  seconds += 1;
  statsText.innerHTML = 'Seconds: ' + seconds;

  return seconds;
}
