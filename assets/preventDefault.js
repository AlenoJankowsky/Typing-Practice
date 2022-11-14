export function preventSpaceBar(button) {
  button.addEventListener('keydown', function(event) {
    if (event.code == 'Space') {
      event.stopPropagation();
      event.preventDefault();

      return;
    }

    return;
  }); 
}
