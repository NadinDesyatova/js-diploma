const mainBlock = document.querySelector('main');
const navDays = Array.from(document.querySelectorAll('.page-nav__day'));

function weekdayDeterminator(date, index, days) {
  let weekday = date.getDay();
  if (weekday === 0) {
    days[index].classList.add('page-nav__day_weekend');
    return 'Вс';
  } else if (weekday === 1) {
    return 'Пн';
  } else if (weekday === 2) {
    return 'Вт';
  } else if (weekday === 3) {
    return 'Ср';
  } else if (weekday === 4) {
    return 'Чт';
  } else if (weekday === 5) {
    return 'Пт';
  } else if (weekday === 6) {
    days[index].classList.add('page-nav__day_weekend');
    return 'Сб';
  } 
}

navDays.forEach((navDay, index, array) => {
  let day = new Date();
  day.setDate(day.getDate() + index); 
  navDay.querySelector('.page-nav__day-number').textContent = day.getDate();
  let dayWeek = weekdayDeterminator(day, index, array);
  navDay.querySelector('.page-nav__day-week').textContent = dayWeek;
  let month = +day.getMonth() + 1;
  let seanceDate = day.getDate() + '.' + month + '.' + day.getFullYear();
  navDay.setAttribute('data-seance-date', seanceDate);
});

const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
  let response = xhr.response;
  let films = response.films.result;
  let halls = response.halls.result;
  let seances = response.seances.result;

  for (let i = 0; i < films.length; i++) {
    mainBlock.insertAdjacentHTML('beforeEnd', '<section class="movie"></section>');
    let movie = mainBlock.querySelectorAll('.movie')[i];
    movie.insertAdjacentHTML('beforeEnd', '<div class="movie__info"></div>');
    let movieInfo = movie.querySelector('.movie__info');
    movieInfo.insertAdjacentHTML('beforeEnd', '<div class="movie__poster"><img class="movie__poster-image"></div>');
    let namePoster = films[i][film_name] + 'постер';
    let linkPoster = films[i][film_poster];
    movieInfo.querySelector('.movie__poster-image').setAttribute('alt', namePoster);
    movieInfo.querySelector('.movie__poster-image').setAttribute('src', linkPoster);   
    movieInfo.insertAdjacentHTML('beforeEnd', '<div class="movie__description"><h2 class="movie__title"></h2><p class="movie__synopsis"></p><p class="movie__data"><span class="movie__data-duration"></span><span class="movie__data-origin"></span></p></div>');
    let filmName = films[i][film_name];
    movie.setAttribute('data-film-name', filmName);
    movieInfo.querySelector('.movie__title').textContent = filmName;
    let filmDescription = films[i][film_description];
    movie.setAttribute('data-film-description', filmDescription);
    movieInfo.querySelector('.movie__synopsis').textContent = filmDescription;
    let filmDuration = films[i][film_duration];
    movie.setAttribute('data-film-duration', filmDuration);
    movieInfo.querySelector('.movie__data-duration').textContent = filmDuration;
    let filmOrigin = films[i][film_origin];
    movie.setAttribute('data-film-origin', filmOrigin);
    movieInfo.querySelector('.movie__data-origin').textContent = filmOrigin;
    let filmId = films[i][film_id];
    movie.setAttribute('data-film-id', filmId);

    let hallsOpen = halls.filter(hall => hall[hall_open] === 1);
    let filmHalls = [];
    hallsOpen.forEach(hall => {
      let hallId = hall[hall_id];
      let hallName = hall[hall_name]; 
      let seanceInHall = seances.find(seance => seance[seance_filmid] === filmId && seance[seance_hallid] === hallId);
      if (seanceInHall) {
        filmHalls.push({hallId, hallName});
        movie.insertAdjacentHTML('beforeEnd', '<div class="movie-seances__hall"><h3 class="movie-seances__hall-title"></h3><ul class="movie-seances__list"></ul></div>');
      }
    });

    filmHalls.forEach((item, index) => {
      let filmSeances = seances.filter(seance => seance[seance_filmid] === filmId && seance[seance_hallid] === item[hallId]);
      let hallName = item[hallName];
      let hallNumber = hallName.substring(hallName.length - 1);
      movie.querySelectorAll('.movie-seances__hall-title')[index].textContent = 'Зал ' + hallNumber;
      movie.querySelectorAll('.movie-seances__hall')[index].setAttribute('data-hall-name', hallNumber);
      movie.querySelectorAll('.movie-seances__hall')[index].setAttribute('data-hall-id', item[hallId]);
      let seancesList = movie.querySelectorAll('.movie-seances__list')[index];
      filmSeances.forEach((seance, i) => {
        seancesList.insertAdjacentHTML('beforeEnd', '<li class="movie-seances__time-block"><a class="movie-seances__time" href="hall.html"></a></li>');
        let seanceTime = seancesList.querySelectorAll('.movie-seances__time')[i];
        let seanceTimestamp = +seance[seance_start] * 60;
        seanceTime.setAttribute('data-seance-timestamp', seanceTimestamp);
        let seanceTimeStart = seance[seance_time];
        seanceTime.textContent = seanceTimeStart;
        seanceTime.setAttribute('data-seance-start', seanceTimeStart);
        let seanceId = seance[seance_id];
        seanceTime.setAttribute('data-seance-id', seanceId);
      });  
    });
  }

  navDays.forEach((navDay, index, array) => {
    let activeNumberPage = 0;
    let allSeances = Array.from(document.querySelectorAll('.movie-seances__time'));
    navDay.addEventListener('click', (e) => {
      e.preventDefault();
      let storedSeanceDate = navDay.dataset.seanceDate;
      localStorage.setItem('seanceDate', storedSeanceDate);
      array[activeNumberPage].classList.remove('page-nav__day_chosen');
      navDay.classList.add('page-nav__day_chosen');
      activeNumberPage = index; 
    });

    allSeances.forEach(seance => {
      seance.addEventListener('click', (e) => {
        e.preventDefault();

        let storedSeanceId = seance.dataset.seanceId;
        localStorage.setItem('seanceId', storedSeanceId);
        let initialTimestamp = +seance.dataset.seanceTimestamp;
        let storedTimestamp = initialTimestamp + (86400 * activeNumberPage);
        localStorage.setItem('seanceTimestamp', storedTimestamp);
        let storedSeanceStart = seance.dataset.seanceStart;
        localStorage.setItem('seanceStart', storedSeanceStart);
        let filmOfSeance = seance.closest('.movie');
        let storedfilmName = filmOfSeance.dataset.filmName;
        localStorage.setItem('filmName', storedfilmName);
        let hallOfSeance = seance.closest('.movie-seances__hall');
        let storedHallId = hallOfSeance.dataset.hallId;
        localStorage.setItem('hallId', storedHallId);
        let storedHallName = hallOfSeance.dataset.hallName;
        localStorage.setItem('hallName', storedHallName);
        location.assign('hall.html');    
      });
    });
  }); 
});

xhr.open('POST', 'http://f0769682.xsph.ru/', true);

xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

xhr.responseType = 'json';

xhr.send('event=update');