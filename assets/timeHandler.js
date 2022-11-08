let seconds = 0;

export function handleTime() {
  if (!intervalIsUsed) {
    setInterval(function() {
      seconds += 1;
      intervalIsUsed = true;
      statsText.innerHTML = 'Seconds: ' + seconds + ', ' + displayStats(userMistakesCount, userKeyTypeCount, seconds);

    }, 1000);
  }
}
