export function displayStats(statsText, seconds, userMistakesCount, userKeyTypeCount) {
  if (userMistakesCount == 0 && userKeyTypeCount == 0) {
    statsText.innerHTML = 'Seconds: ' + seconds + ', ' + '0' + '% Wrong Chars';

    return;
  }

  statsText.innerHTML = 'Seconds: ' + seconds + ', ' + Math.round((userMistakesCount * 100 / userKeyTypeCount * 100) / 100) + '% Wrong Chars';
}

