async function getWord(webAPI) {
  let x = await fetch(webAPI);
  let y = await x.text();
  document.getElementById('text').innerHTML = y;
  let elements = document.getElementsByClassName('typing-area__text');
  for (const element of elements) {
    element.innerHTML = element.innerHTML.replace(/"/g,'');
    element.innerHTML = element.innerHTML.replace(/\u005D/g,'');
    element.innerHTML = element.innerHTML.replace(/\u005B/g,'');
    element.innerHTML = element.innerHTML.replace(/,/g,' ');
    
  }
}
