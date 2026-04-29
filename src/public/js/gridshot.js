const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let score = 0;
let targets = [];
let gameActive = false;
let timeLeft = 30; // Tiempo de la partida
let totalClicks = 0;
let hits = 0;
let timerInterval;

const ROWS = 3;
const COLS = 3;
const TARGET_RADIUS = 35;

// Referencias a los elementos del DOM (del pug)
const scoreDisplay = document.getElementById('score-display');
const timerDisplay = document.getElementById('timer-display');
const accuracyDisplay = document.getElementById('accuracy-display');

function initGame() {
    // Resetear variables
    score = 0;
    timeLeft = 30;
    totalClicks = 0;
    hits = 0;
    targets = [];
    gameActive = true;

    // Crear objetivos iniciales
    for (let i = 0; i < 3; i++) {
        spawnTarget();
    }

    // Iniciar temporizador
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);

    // Iniciar bucle de dibujo
    requestAnimationFrame(gameLoop);
}

function updateTimer() {
    if (!gameActive) return;

    timeLeft--;
    if (timerDisplay) timerDisplay.innerText = timeLeft + "s";

    if (timeLeft <= 0) {
        endGame();
    }
}

function endGame() {
    gameActive = false;
    clearInterval(timerInterval);
    
    // Llamamos a la función para guardar en la DB
    saveGameResults(score, hits, totalClicks);
}

function spawnTarget() {
    const col = Math.floor(Math.random() * COLS);
    const row = Math.floor(Math.random() * ROWS);

    const x = (canvas.width / COLS) * (col + 0.5);
    const y = (canvas.height / ROWS) * (row + 0.5);

    // Evitar que aparezcan dos en el mismo sitio
    if (targets.some(t => t.x === x && t.y === y)) {
        return spawnTarget();
    }
    targets.push({ x, y });
}

canvas.addEventListener('mousedown', (e) => { // 'mousedown' es más preciso para juegos
    if (!gameActive) return;

    totalClicks++;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    let hitThisTurn = false;

    targets.forEach((target, index) => {
        const dist = Math.hypot(target.x - clickX, target.y - clickY);
        if (dist < TARGET_RADIUS) {
            targets.splice(index, 1);
            score += 100;
            hits++;
            hitThisTurn = true;
            spawnTarget();
            playPopSound();
        }
    });

    // Actualizar displays en tiempo real
    if (scoreDisplay) scoreDisplay.innerText = score;
    const currentAcc = (hits / totalClicks) * 100;
    if (accuracyDisplay) accuracyDisplay.innerText = currentAcc.toFixed(1) + "%";
});

function gameLoop() {
    if (!gameActive) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    targets.forEach(target => {
        ctx.beginPath();
        ctx.arc(target.x, target.y, TARGET_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = '#00ff88';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#00ff88';
        ctx.fill();
        ctx.closePath();
    });

    requestAnimationFrame(gameLoop);
}

async function saveGameResults(finalScore, hits, totalClicks) {
    const accuracy = totalClicks > 0 ? (hits / totalClicks) * 100 : 0;
    
    // IMPORTANTE: Asegúrate de que esta URL sea la misma que en tu api.js
    // En tus mensajes anteriores vimos que usabas '/api/score'
    try {
        const response = await fetch('/api/score', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                gameType: 'gridshot',
                points: finalScore,
                accuracy: accuracy.toFixed(2)
            })
        });

        const result = await response.json();
        if (result.status === 'success') {
            alert(`¡Partida terminada! Puntos: ${finalScore} | Precisión: ${accuracy.toFixed(1)}%`);
            window.location.href = '/';
        }
    } catch (error) {
        console.error("Error al guardar puntuación:", error);
    }
}

function playPopSound() {
    // Solo intenta reproducir si tienes el archivo, si no, fallará silenciosamente
    const audio = new Audio('/sounds/pop.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => {}); 
}