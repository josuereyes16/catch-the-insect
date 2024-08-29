const screens = document.querySelectorAll('.screen');
const choose_insect_btns = document.querySelectorAll('.choose-insect-btn');
const start_btn = document.getElementById('start-btn');
const game_container = document.getElementById('game-container');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const message = document.getElementById('message');
const reset_btn = document.getElementById('reset-btn'); // Botón de reinicio

let seconds = 0;
let score = 0;
let selected_insect = {};
let timeInterval; // Variable para manejar el intervalo del tiempo

// Manejo de eventos al iniciar el juego
start_btn.addEventListener('click', () => screens[0].classList.add('up'));

// Selección de insectos y comienzo del juego
choose_insect_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img');
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt');
        selected_insect = { src, alt };
        screens[1].classList.add('up');
        setTimeout(createInsect, 1000);
        startGame();
    });
});

// Función para iniciar el juego
function startGame() {
    if (!timeInterval) { // Solo iniciar si no hay un intervalo activo
        timeInterval = setInterval(increaseTime, 1000);
    }
}

// Función para incrementar el tiempo
function increaseTime() {
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;
    timeEl.innerHTML = `Time: ${m}:${s}`;
    seconds++;
}

// Función para crear un insecto en una posición aleatoria
function createInsect() {
    const insect = document.createElement('div');
    insect.classList.add('insect');
    const { x, y } = getRandomLocation();
    insect.style.top = `${y}px`;
    insect.style.left = `${x}px`;
    insect.innerHTML = `<img src="${selected_insect.src}" alt="${selected_insect.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`;

    insect.addEventListener('click', catchInsect);

    game_container.appendChild(insect);
}

// Función para obtener una posición aleatoria en la pantalla
function getRandomLocation() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = Math.random() * (width - 200) + 100;
    const y = Math.random() * (height - 200) + 100;
    return { x, y };
}

// Función para capturar un insecto
function catchInsect() {
    increaseScore();
    this.classList.add('caught');
    setTimeout(() => this.remove(), 2000);
    addInsects();
}

// Función para añadir más insectos
function addInsects() {
    setTimeout(createInsect, 1000);
    setTimeout(createInsect, 1500);
}

// Función para incrementar la puntuación
function increaseScore() {
    score++;
    if (score > 19) {
        message.classList.add('visible');
    }
    scoreEl.innerHTML = `Score: ${score}`;
}

// Manejo del botón de reinicio
reset_btn.addEventListener('click', () => {
    // Detener el intervalo de tiempo actual
    clearInterval(timeInterval);
    timeInterval = null;  // Reiniciar la variable del intervalo

    // Reiniciar tiempo, puntuación y mensaje
    seconds = 0;
    score = 0;
    timeEl.innerHTML = `Time: 00:00`;
    scoreEl.innerHTML = `Score: 0`;
    message.classList.remove('visible');
    
    // Eliminar todos los insectos del juego
    const insects = document.querySelectorAll('.insect');
    insects.forEach(insect => insect.remove());

    // Regresar a la pantalla inicial
    screens[1].classList.remove('up');
    screens[0].classList.remove('up');
});
