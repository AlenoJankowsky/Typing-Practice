export function displayStats(userMistakesCount, userKeyTypeCount, seconds) {
  if (userMistakesCount == 0 && userKeyTypeCount == 0) {
    return 'CPM: ' + '0 ' + 'Wrong Chars: ' + '0%';
  }

  seconds = seconds / 60;
  const charactersPerMinute = userKeyTypeCount / seconds;

  return 'CPM: '+ Math.round(charactersPerMinute) + ' ' + 'Wrong Chars: ' + Math.round((userMistakesCount * 100 / userKeyTypeCount * 100) / 100) + '%';
}
