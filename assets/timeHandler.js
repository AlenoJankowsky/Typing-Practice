export function incrementSeconds() {
  intervalIsUsed = true;
  seconds += 1;
  displayStats(statsText, seconds, userMistakesCount, userKeyTypeCount);
}
