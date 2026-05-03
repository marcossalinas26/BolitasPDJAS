(function () {
    let canvas, ctx;
    let score = 0;
    let targets = [];
    let gameActive = false;
    let timeLeft = 30;
    let totalClicks = 0;
    let hits = 0;
    let timerInterval = null;

   
    const TARGET_RADIUS = 12; 
    const MAX_TARGETS = 6;   

    function getElements() {
        canvas = document.getElementById('gameCanvas');
        if (!canvas) return false;
        ctx = canvas.getContext('2d');
        return true;
    }

    window.initGame = function () {
        console.log("--- RESET TOTAL DEL JUEGO ---");

        if (timerInterval) clearInterval(timerInterval);
        gameActive = false;

        setTimeout(() => {
            if (!getElements()) return;
            score = 0;
            timeLeft = 30; 
            totalClicks = 0;
            hits = 0;
            targets = [];
            gameActive = true;
            updateUI();

            console.log("Partida iniciada con tiempo:", timeLeft);

            
            for (let i = 0; i < (typeof MAX_TARGETS !== 'undefined' ? MAX_TARGETS : 3); i++) {
                spawnTarget();
            }

            timerInterval = setInterval(() => {
                if (gameActive) {
                    timeLeft--;
                    updateUI();
                    if (timeLeft <= 0) {
                        console.log("Cronómetro llegó a cero.");
                        endGame();
                    }
                }
            }, 1000);

            requestAnimationFrame(gameLoop);
        }, 50); 
    };

    function updateUI() {
        const scoreDisplay = document.getElementById('score-display');
        const timerDisplay = document.getElementById('timer-display');
        const accuracyDisplay = document.getElementById('accuracy-display');

        if (scoreDisplay) scoreDisplay.innerText = score;
        if (timerDisplay) timerDisplay.innerText = Math.max(0, timeLeft) + "s";

        const acc = totalClicks > 0 ? ((hits / totalClicks) * 100).toFixed(1) : 0;
        if (accuracyDisplay) accuracyDisplay.innerText = acc + "%";
    }

    function spawnTarget() {
        let x, y;
        let attempts = 0;
        let overlapping = true;

        while (overlapping && attempts < 50) {
            x = Math.random() * (canvas.width - TARGET_RADIUS * 2) + TARGET_RADIUS;
            y = Math.random() * (canvas.height - TARGET_RADIUS * 2) + TARGET_RADIUS;
        
            overlapping = targets.some(t => Math.hypot(t.x - x, t.y - y) < TARGET_RADIUS * 2.5);
            attempts++;
        }
        targets.push({ x, y, spawnTime: Date.now() });
    }

    function onMouseDown(e) {
        if (!gameActive) return;

        totalClicks++;
        const rect = canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        let hitIdx = -1;
     
        for (let i = 0; i < targets.length; i++) {
            const dist = Math.hypot(targets[i].x - clickX, targets[i].y - clickY);
            if (dist < TARGET_RADIUS + 2) { 
                hitIdx = i;
                break;
            }
        }

        if (hitIdx !== -1) {
            targets.splice(hitIdx, 1);
            score += 100;
            hits++;
            spawnTarget();
        }
        updateUI();
    }

    function gameLoop() {
        if (!gameActive) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        targets.forEach(target => {
            const age = Date.now() - target.spawnTime;
            const scale = Math.min(age / 100, 1); // Aparición más rápida que Gridshot

            ctx.beginPath();
            ctx.arc(target.x, target.y, TARGET_RADIUS * scale, 0, Math.PI * 2);

            // Estilo visual: Rojo/Coral para diferenciarlo de Gridshot
            const grad = ctx.createRadialGradient(target.x, target.y, 0, target.x, target.y, TARGET_RADIUS);
            grad.addColorStop(0, '#ff9f91');
            grad.addColorStop(1, '#ff4757');

            ctx.fillStyle = grad;
            ctx.shadowBlur = 8;
            ctx.shadowColor = 'rgba(255, 71, 87, 0.4)';
            ctx.fill();
            ctx.closePath();
        });

        requestAnimationFrame(gameLoop);
    }
    function endGame() {
        // Si el juego no está activo o llevamos menos de 1 segundo jugando, 
        // bloqueamos el final de partida para evitar el bug de inicio.
        if (!gameActive) return;

        console.log("Intentando finalizar partida... Tiempo restante:", timeLeft);

        // PROTECCIÓN EXTRA: Solo permite terminar si el tiempo es realmente 0
        if (timeLeft > 0) {
            console.warn("Se intentó cerrar el juego antes de tiempo. Bloqueado.");
            return;
        }

        gameActive = false;
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }

        const accuracy = totalClicks > 0 ? ((hits / totalClicks) * 100).toFixed(1) : 0;

        if (typeof window.saveGameResults === 'function') {
            window.saveGameResults(score, accuracy);
        }
    }

    // Event Listener
    document.addEventListener('mousedown', (e) => {
        if (e.target.id === 'gameCanvas') {
            onMouseDown(e);
        }
    });

    window.onload = () => {
        window.initGame();
    };
})();