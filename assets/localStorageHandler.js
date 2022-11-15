export function handleLocalStorage() {
  if (localStorage.amountOfSets) {
    localStorage.amountOfSets = parseInt(localStorage.getItem("amountOfSets"));
  }
  else {
    localStorage.amountOfSets = 0;
  }
  
  if (localStorage.charsTyped) {
    localStorage.charsTyped = parseInt(localStorage.getItem("charsTyped"));
  }
  else {
    localStorage.charsTyped = 0;
  }
  
  if (localStorage.CPM) {
    localStorage.CPM = parseInt(localStorage.getItem("CPM"));
  }
  else {
    localStorage.CPM = 0;
  }
  
  if (localStorage.totalSeconds) {
    localStorage.totalSeconds = parseInt(localStorage.getItem("totalSeconds"));
  }
  else {
    localStorage.totalSeconds = 0;
  }

  return;
}
