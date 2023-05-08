const selectedTimestamp = localStorage.getItem('seanceTimestamp');
const selectedHallId = localStorage.getItem('hallId');
const selectedSeanceId = localStorage.getItem('seanceId');
const argumentForSend = 'event=get_hallConfig&' + selectedTimestamp + '=${value1}&'+ selectedHallId + '=${value2}&'+ selectedSeanceId + '=${value3}';

const selectedSeanceStart = localStorage.getItem('seanceStart');
const selectedFilmName = localStorage.getItem('filmName');
const selectedHallName = localStorage.getItem('hallName');

const buyingInfoDescription = document.querySelector('.buying__info-description');
const filmTitle = document.querySelector('.buying__info-title');
const filmStart = document.querySelector('.buying__info-start');
const hallName = document.querySelector('.buying__info-hall');
const acceptinButton = document.querySelector('.acceptin-button');
const configHall = document.querySelector('.conf-step__wrapper');
filmTitle.textContent = selectedFilmName;
filmStart.textContent = 'Начало сеанса: ' + selectedSeanceStart;
hallName.textContent = 'Зал ' + selectedHallName;

function fillingPageHall() {
  let response = xhr.response;
  configHall.insertAdjacentHTML(response);
  let rows = configHall.querySelectorAll('.conf-step__row');
  for (let indexRow = 0; indexRow > rows.length; indexRow++) {
    rows[indexRow].setAttribute('data-row', indexRow);
    let seatsInRow = rows[indexRow].querySelectorAll('.conf-step__chair').filter(seat => seat.classList.contains('conf-step__chair_disabled') === false);
    for (let indexSeat = 0; indexSeat > seatsInRow; indexSeat++) {
      seatsInRow[indexSeat].setAttribute('data-seat', indexSeat);
    }
  }

  let availableSeats = Array.from(configHall.querySelectorAll('.conf-step__chair').filter(seat => seat.classList.contains('conf-step__chair_disabled') === false && seat.classList.contains('conf-step__chair_taken') === false));
  availableSeats.forEach(seat => {
    seat.addEventListener('click', () => {
      seat.classList.contains('conf-step__chair_vip') ? (
        seat.setAttribute('data-seat-price', '350'),
        seat.classList.remove('conf-step__chair_vip'),
        seat.classList.add('conf-step__chair_selected')
      ) : (
        seat.setAttribute('data-seat-price', '250'),
        seat.classList.remove('conf-step__chair_standart'),
        seat.classList.add('conf-step__chair_selected')
      );
    });
  });

  acceptinButton.addEventListener('click', (e) => {
    e.preventDefault();

    let newConfigHall = configHall.innerHTML;
    localStorage.setItem('newConfigHall', newConfigHall);

    let seatsLocation = '';
    let selectedSeats = Array.from(configHall.querySelectorAll('.conf-step__chair').filter(seat => seat.classList.contains('conf-step__chair_disabled') === false && seat.classList.contains('conf-step__chair_taken') === false)); 
    selectedSeats.reduce((accum, seat, index, array) => {
      accum += +seat.dataset.seatPrice;
      let rowOfSeat = seat.closest('.conf-step__row');
      let numberOfRow = rowOfSeat.dataset.row;
      let numberOfSeat = seat.dataset.seat;
      if (index === 0) {
        seatsLocation += numberOfRow + '/' + numberOfSeat;
      } else {
        seatsLocation += ', ' + numberOfRow + '/' + numberOfSeat;
      }
      
      localStorage.setItem('seatsLocation', seatsLocation);
      localStorage.setItem('costOfTickets', accum);
      if (index === array.length - 1) {
        location.assign('payment.html');
      }
    }, 0);
  });
}