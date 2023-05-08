const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
  fillingPageHall();
});    

xhr.open('POST', 'http://f0769682.xsph.ru/', true);

xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

xhr.responseType = 'json';

xhr.send(argumentForSend);