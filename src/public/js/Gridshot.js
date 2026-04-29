const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let score = 0;
let targets = [];
let gameActive = false;

const ROWS = 3;
const COLS = 3;
const TARGET_RADIUS= 35;

function initGame() {
    score = 0;
    targets = [];
    
    for (let i = 0; i < 3; i++) {
        spawnTarget();
    }
    
    gameActive = true;
    requestAnimationFrame(gameLoop);
}

function spawnTarget() {
    
    const col = Math.floor(Math.random() * COLS);
    const row = Math.floor(Math.random() * ROWS);

    const x = (canvas.width / COLS) * (col + 0.5);
    const y = (canvas.height / ROWS) * (row + 0.5);

    if (targets.some (t => t.x === x && t.y === y)) {
        return spawnTarget();
    }
    targets.push({ x, y });
}
canvas.addEventListener('click', (e) => {
    if (!gameActive) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    targets.forEach((target, index) => {
        const dist = Math.hypot(target.x - clickX, target.y - clickY);
        if (dist < TARGET_RADIUS) {
            targets.splice(index, 1);
            score += 100;
            spawnTarget();
            playPopSound(); 
        }
    });
});

function gameLoop() {
    if (!gameActive) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    targets.forEach(target => {
        ctx.beginPath();
        ctx.arc(target.x, target.y, TARGET_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = '#00ff88';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#00ff88';
        ctx.fill();
        ctx.closePath();

    }
    );
    requestAnimationFrame(gameLoop);
}