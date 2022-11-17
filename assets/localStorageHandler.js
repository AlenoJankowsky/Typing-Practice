export function handleLocalStorage() {
  if (localStorage.amountOfSets) {
    localStorage.amountOfSets = parseInt(localStorage.getItem('amountOfSets'));
  }
  else {
    localStorage.setItem('amountOfSets', '0');
    localStorage.amountOfSets = 0;
  }
  
  if (localStorage.charsTyped) {
    localStorage.charsTyped = parseInt(localStorage.getItem('charsTyped'));
  }
  else {
    localStorage.setItem('charsTyped', '0');
    localStorage.charsTyped = 0;
  }
  
  if (localStorage.CPM) {
    localStorage.CPM = parseInt(localStorage.getItem('CPM'));
  }
  else {
    localStorage.setItem('CPM', '0');
    localStorage.CPM = 0;
  }
  
  if (localStorage.totalSeconds) {
    localStorage.totalSeconds = parseInt(localStorage.getItem('totalSeconds'));
  }
  else {
    localStorage.setItem('totalSeconds', '0');
    localStorage.totalSeconds = 0;
  }

  if (localStorage.mistypes) {
    localStorage.mistypes = parseInt(localStorage.getItem('mistypes'));
  }
  else {
    localStorage.setItem('mistypes', '0');
    localStorage.mistypes = 0;
  }

  return;
}
