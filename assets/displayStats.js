export function displayStats(userMistakesCount, userKeyTypeCount) {
  if (userMistakesCount == 0 && userKeyTypeCount == 0) {
    return '0' + '% Wrong Chars';
  }

  return  Math.round((userMistakesCount * 100 / userKeyTypeCount * 100) / 100) + '% Wrong Chars';
}
