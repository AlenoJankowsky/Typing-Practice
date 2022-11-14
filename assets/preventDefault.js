export function preventSpaceBar(button) {
  button.addEventListener('keydown', function(event) {
    if (event.code == 'Space') {
      console.log("KEKW");
      event.stopPropagation();
      event.preventDefault();
    }

    return;
  }); 
}
