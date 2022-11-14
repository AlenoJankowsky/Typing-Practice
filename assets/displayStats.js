export function displayStats(userMistakesCount, userKeyTypeCount, seconds) {
  if (userMistakesCount == 0 && userKeyTypeCount == 0) {
    return 'CPM: ' + '0 ' + 'Wrong Chars: ' + '0%';
  }

  let minutes = seconds / 60;
  const charactersPerMinute = userKeyTypeCount / minutes;

  return 'CPM: '+ Math.round(charactersPerMinute) + ' ' + 'Wrong Chars: ' + Math.round((userMistakesCount / userKeyTypeCount) / 100) + '%';
}

export function displayTodayStats(userKeyTypeCount, amountOfSets) {
  return 'Sets: ' + amountOfSets + ' ' + 'Chars typed: ' + userKeyTypeCount + ' ';
}
