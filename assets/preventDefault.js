export function preventSpaceBar(event, charArray, charIndex) {
  if (event.code == 'Space' && charArray[charIndex + 1] != " ") {
    event.stopPropagation();
    event.preventDefault();
  }

  return;
}
