const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let tiketPrice = +movieSelect.value; //el signo + sirve para castearlo a un tipo 'number'

// Guardar pelicula seleccionada y precio
const setMovieData = (movieIndex, moviePrice) => {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Actualiza el total y el conteo
const updateSelectedCount = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    // copiar los asientos a un array
    // mapear el array
    // retornar un nuevo array con indexes para identificar asientos
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * tiketPrice;
}

// Selección de pelicula
movieSelect.addEventListener('change', (e) => {
    tiketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});


// Seleccion de asietno
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected'); //quita o remueve la clase
        updateSelectedCount();
    }
});

// Obtener datos del localstorage y llenar los datos

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Inicializar conteo y total
updateSelectedCount();