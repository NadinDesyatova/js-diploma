const storedSeanceStart = localStorage.getItem('seanceStart');
const storedFilmName = localStorage.getItem('filmName');
const storedSeatsLocation = localStorage.getItem('seatsLocation');
const storedHallName = localStorage.getItem('hallName');
const storedConfigHall = localStorage.getItem('newConfigHall');

const filmTitle = document.querySelector('.ticket__title');
const seatsLocation = document.querySelector('.ticket__chairs');
const hallName = document.querySelector('.ticket__hall');
const filmStart = document.querySelector('.ticket__start');

filmTitle.textContent = storedFilmName;
seatsLocation.textContent = storedSeatsLocation;
hallName.textContent = storedHallName;
filmStart.textContent = storedSeanceStart;

const ticketInfoQr = document.querySelector('ticket__info-qr');
ticketInfoQr.innerHTML = '<div class="ticket__info-qr"></div>';
document.querySelector('ticket__info-qr').append(QRCreator(storedConfigHall).result);