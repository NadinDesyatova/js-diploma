const selectedTimestamp = localStorage.getItem('seanceTimestamp');
const selectedHallId = localStorage.getItem('hallId');
const selectedSeanceId = localStorage.getItem('seanceId');
const argumentForSend = 'event=get_hallConfig&' + selectedTimestamp + '=${value1}&'+ selectedHallId + '=${value2}&'+ selectedSeanceId + '=${value3}';

const selectedSeanceStart = localStorage.getItem('seanceTimeStart');
const selectedFilmName = localStorage.getItem('filmName');
const selectedHallName = localStorage.getItem('hallName');
const selectedHallConfig = localStorage.getItem('hallConfig');
const hallPriceStandart = localStorage.getItem('hallPriceStandart');
const hallPriceVip = localStorage.getItem('hallPriceVip');

const buyingInfoDescription = document.querySelector('.buying__info-description');
const filmTitle = document.querySelector('.buying__info-title');
const filmStart = document.querySelector('.buying__info-start');
const hallName = document.querySelector('.buying__info-hall');
const elementPriceStandart = document.querySelector('.price-standart');
const elementPriceVip = document.querySelector('.price-vip');

const acceptinButton = document.querySelector('.acceptin-button');
const configHall = document.querySelector('.conf-step__wrapper');

filmTitle.textContent = selectedFilmName;
filmStart.textContent = 'Начало сеанса: ' + selectedSeanceStart;
hallName.textContent = 'Зал ' + selectedHallName;
elementPriceStandart.textContent = hallPriceStandart;
elementPriceVip.textContent = hallPriceVip;

function fillingPageHall(response) {
  if (response === null) {
    configHall.innerHTML = selectedHallConfig;
  } else {
    configHall.innerHTML = response;
  }

  let rows = configHall.querySelectorAll('.conf-step__row');
  for (let indexRow = 0; indexRow < rows.length; indexRow++) {
    rows[indexRow].setAttribute('data-row', indexRow + 1);
    let seatsInRow = Array.from(rows[indexRow].querySelectorAll('.conf-step__chair')).filter(seat => seat.classList.contains('conf-step__chair_disabled') === false);
    for (let indexSeat = 0; indexSeat < seatsInRow.length; indexSeat++) {
      seatsInRow[indexSeat].setAttribute('data-seat', indexSeat + 1);
    }
  }

  let availableSeats = Array.from(configHall.querySelectorAll('.conf-step__chair')).filter(seat => seat.classList.contains('conf-step__chair_disabled') === false && seat.classList.contains('conf-step__chair_taken') === false);
  availableSeats.forEach(seat => {
    seat.addEventListener('click', () => {
      seat.classList.contains('conf-step__chair_vip') ? (
        seat.setAttribute('data-seat-price', hallPriceVip),
        seat.classList.remove('conf-step__chair_vip'),
        seat.classList.add('conf-step__chair_selected')
      ) : (
        seat.setAttribute('data-seat-price', hallPriceStandart),
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
    let selectedSeats = Array.from(configHall.querySelectorAll('.conf-step__chair')).filter(seat => seat.classList.contains('conf-step__chair_selected')); 
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
      
      if (index === array.length - 1) {
        localStorage.setItem('seatsLocation', seatsLocation);
        localStorage.setItem('costOfTickets', accum);
        location.assign('payment.html');
      }

      return accum;
    }, 0);

    
  });
}

createRequest(argumentForSend, fillingPageHall);