export function displayStats(userMistakesCount, userKeyTypeCount, seconds) {
  if (userMistakesCount == 0 && userKeyTypeCount == 0) {
    return 'CPM: ' + '0 ' + 'Wrong Chars: ' + '0%';
  }

  let minutes = seconds / 60;
  const charactersPerMinute = userKeyTypeCount / minutes;
  return 'CPM: '+ Math.round(charactersPerMinute) + ' ' + 'Wrong Chars: ' + Math.round((userMistakesCount / userKeyTypeCount) * 100) + '%';
}

export function displayTodayStats() {
  let minutes = parseInt(localStorage.getItem('totalSeconds')) / 60;
  let cpmComputation = parseInt(localStorage.getItem('charsTyped')) / minutes;
  const charactersPerMinute = 'CPM: '+ Math.round(cpmComputation);
  const sets = 'Sets: ' + parseInt(localStorage.getItem('amountOfSets'));
  const charsTyped = 'Chars typed: ' + parseInt(localStorage.getItem('charsTyped'));
  const time = 'Time: ' + parseInt(localStorage.getItem('totalSeconds')) + 's';

  return sets + ', ' + charsTyped + ', ' + charactersPerMinute + ', ' + time;
}
