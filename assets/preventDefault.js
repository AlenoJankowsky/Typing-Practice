export function preventSpaceBar(event, button) {
  button.addEventListener('click', function() {
    if (event.code == 'Space') {
      event.preventDefault();
    }
  }); 
}
