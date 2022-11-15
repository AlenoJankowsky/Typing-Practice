export function handleLocalStorage(variableName) {
  const variableNameString = variableName.toString();
  if (localStorage.variableName) {
    localStorage.variableName = parseInt(localStorage.getItem(variableNameString));
  }
  else {
    localStorage.variableName = 0;
  }
}
 