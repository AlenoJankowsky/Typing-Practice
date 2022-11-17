export function displayStats(userMistakesCount, userKeyTypeCount, seconds) {
  if (userMistakesCount == 0 && userKeyTypeCount == 0) {
    return 'CPM: ' + '0 ' + 'Wrong Chars: ' + '0%';
  }

  let minutes = seconds / 60;
  const charactersPerMinute = userKeyTypeCount / minutes;
  return 'CPM: '+ Math.round(charactersPerMinute) + ' ' + 'Wrong Chars: ' + Math.round((userMistakesCount / userKeyTypeCount) * 100) + '%';
}

export function displayTodayStats() {
  let minutes = parseInt(localStorage.getItem('todayTotalSeconds')) / 60;
  let cpmComputation = parseInt(localStorage.getItem('todayCharsTyped')) / minutes;
  let mistakeRatio = (parseFloat(localStorage.getItem('todayMistypes')) / parseFloat(localStorage.getItem('todayCharsTyped'))).toFixed(3);
  let charactersPerMinute = Math.round(cpmComputation);
  const sets = 'Sets: ' + parseInt(localStorage.getItem('todayAmountOfSets'));
  const charsTyped = 'Chars typed: ' + parseInt(localStorage.getItem('todayCharsTyped'));
  const time = 'Time: ' + parseInt(localStorage.getItem('todayTotalSeconds')) + 's';

  charactersPerMinute = preventNaNs(charactersPerMinute);
  mistakeRatio = preventNaNs(mistakeRatio);

  return sets + ', ' + charsTyped + ', ' + 'CPM: '+  charactersPerMinute + ', ' + time + ', ' + 'Mistake Ratio: ' + mistakeRatio  + '%';
}

export function displayTotalStats() {
  let minutes = parseInt(localStorage.getItem('totalTotalSeconds')) / 60;
  let cpmComputation = parseInt(localStorage.getItem('totalCharsTyped')) / minutes;
  let mistakeRatio = (parseFloat(localStorage.getItem('totalMistypes')) / parseFloat(localStorage.getItem('totalCharsTyped'))).toFixed(3);
  let charactersPerMinute = Math.round(cpmComputation);
  const sets = 'Sets: ' + parseInt(localStorage.getItem('totalAmountOfSets'));
  const charsTyped = 'Chars typed: ' + parseInt(localStorage.getItem('totalCharsTyped'));
  const time = 'Time: ' + parseInt(localStorage.getItem('totalTotalSeconds')) + 's';

  charactersPerMinute = preventNaNs(charactersPerMinute);
  mistakeRatio = preventNaNs(mistakeRatio);

  return sets + ', ' + charsTyped + ', ' + 'CPM: '+  charactersPerMinute + ', ' + time + ', ' + 'Mistake Ratio: ' + mistakeRatio  + '%';
}

function preventNaNs(valueOfVariable) {
  const valueOfVariableIsNaN = isNaN(valueOfVariable);
  if (valueOfVariableIsNaN) {
    return 0;
  }

  return valueOfVariable;
}
