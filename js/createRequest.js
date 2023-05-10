function createRequest(argument, func) {
  xhr.addEventListener('load', () => {
    func();
  });

  xhr.open('POST', 'https://jscp-diplom.tw1.ru/', true);

  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.responseType = 'json';

  xhr.send(argument);
}



