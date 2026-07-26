/**
 * EmocionArte Interactive Games Logic
 * Implements the 7 core educational games from the PDF report.
 */

class EmotionGames {
    constructor() {
        this.score = 0;
        this.stars = 0;
        this.currentColor = '#FFD166';
        this.brushSize = 12;
    }

    // GAME 1: CAZADOR DE EMOCIONES
    initCazador() {
        const container = document.getElementById('game-cazador-container');
        if (!container) return;

        const questions = [
            {
                scenario: '¡Te regalaron un helado gigante de tu sabor favorito! 🍦',
                correct: 'alegria',
                options: [
                    { id: 'alegria', name: 'Alegría 😊', emoji: '😊', bg: '#FFD166' },
                    { id: 'tristeza', name: 'Tristeza 😢', emoji: '😢', bg: '#4EA8DE' },
                    { id: 'enojo', name: 'Enojo 😡', emoji: '😡', bg: '#EF476F' }
                ]
            },
            {
                scenario: 'Se rompió la torre de bloques que construiste con mucho esfuerzo 🏰💥',
                correct: 'tristeza',
                options: [
                    { id: 'alegria', name: 'Alegría 😊', emoji: '😊', bg: '#FFD166' },
                    { id: 'tristeza', name: 'Tristeza 😢', emoji: '😢', bg: '#4EA8DE' },
                    { id: 'miedo', name: 'Miedo 😨', emoji: '😨', bg: '#9D4EDD' }
                ]
            },
            {
                scenario: 'Escuchaste un trueno muy fuerte afuera en la oscuridad ⚡🌧️',
                correct: 'miedo',
                options: [
                    { id: 'miedo', name: 'Miedo 😨', emoji: '😨', bg: '#9D4EDD' },
                    { id: 'calma', name: 'Calma 🌿', emoji: '🌿', bg: '#06D6A0' },
                    { id: 'alegria', name: 'Alegría 😊', emoji: '😊', bg: '#FFD166' }
                ]
            },
            {
                scenario: 'Un amiguito te quitó tu crayón sin pedirlo ✏️',
                correct: 'enojo',
                options: [
                    { id: 'sorpresa', name: 'Sorpresa 😮', emoji: '😮', bg: '#FF9F1C' },
                    { id: 'enojo', name: 'Enojo 😡', emoji: '😡', bg: '#EF476F' },
                    { id: 'calma', name: 'Calma 🌿', emoji: '🌿', bg: '#06D6A0' }
                ]
            },
            {
                scenario: 'Estás acostado en tu camita escuchando música suave y respirando despacito 🎵🛌',
                correct: 'calma',
                options: [
                    { id: 'enojo', name: 'Enojo 😡', emoji: '😡', bg: '#EF476F' },
                    { id: 'miedo', name: 'Miedo 😨', emoji: '😨', bg: '#9D4EDD' },
                    { id: 'calma', name: 'Calma 🌿', emoji: '🌿', bg: '#06D6A0' }
                ]
            }
        ];

        let currentIdx = 0;

        const renderQuestion = () => {
            if (currentIdx >= questions.length) {
                container.innerHTML = `
                    <div class="game-win-card">
                        <div class="win-emoji">🎉🏆⭐</div>
                        <h2>¡Felicidades, Cazador de Emociones!</h2>
                        <p>Has identificado correctamente todas las emociones.</p>
                        <button class="btn btn-primary" onclick="emotionGames.initCazador(); soundEngine.playPop();">¡Jugar de Nuevo!</button>
                    </div>
                `;
                soundEngine.playWin();
                app.addStars(5);
                return;
            }

            const q = questions[currentIdx];
            soundEngine.speak(q.scenario);

            container.innerHTML = `
                <div class="game-card">
                    <div class="game-progress">Pregunta ${currentIdx + 1} de ${questions.length}</div>
                    <div class="game-scenario">${q.scenario}</div>
                    <p class="game-prompt">¿Qué emoción sientes en esta situación?</p>
                    <div class="emotion-options-grid">
                        ${q.options.map(opt => `
                            <button class="btn-emotion-choice" style="background-color: ${opt.bg};" onclick="emotionGames.checkCazador('${opt.id}', '${q.correct}', ${currentIdx})">
                                <span class="choice-emoji">${opt.emoji}</span>
                                <span class="choice-name">${opt.name}</span>
                            </button>
                        `).join('')}
                    </div>
                    <div id="cazador-feedback" class="feedback-box"></div>
                </div>
            `;
        };

        this.checkCazador = (selected, correct, idx) => {
            const fb = document.getElementById('cazador-feedback');
            if (selected === correct) {
                soundEngine.playSuccess();
                soundEngine.speak('¡Excelente! ¡Esa es la emoción!');
                fb.innerHTML = `<div class="alert-success">✨ ¡Correcto! ¡Muy bien! ⭐</div>`;
                app.addStars(1);
                setTimeout(() => {
                    currentIdx++;
                    renderQuestion();
                }, 1400);
            } else {
                soundEngine.playPop(200);
                soundEngine.speak('Inténtalo otra vez. ¡Tú puedes!');
                fb.innerHTML = `<div class="alert-warning">💡 ¡Prueba otra opción! Tú puedes.</div>`;
            }
        };

        renderQuestion();
    }

    // GAME 2: ELIGE COLORES EMOCIONALES
    initColores() {
        const container = document.getElementById('game-colores-container');
        if (!container) return;

        const colorMap = [
            { emotion: 'Alegría 😊', colorName: 'Amarillo Sol ☀️', hex: '#FFD166', desc: '¡El amarillo nos recuerda la luz del sol y la alegría!' },
            { emotion: 'Tristeza 😢', colorName: 'Azul Cielo 🌧️', hex: '#4EA8DE', desc: 'El azul es suave como las gotitas de lluvia.' },
            { emotion: 'Enojo 😡', colorName: 'Rojo Fuego 🔥', hex: '#EF476F', desc: 'El rojo es cálido e intenso como un volcán.' },
            { emotion: 'Miedo 😨', colorName: 'Morado Misterio 🔮', hex: '#9D4EDD', desc: 'El morado nos recuerda a la noche y las sombras.' },
            { emotion: 'Calma 🌿', colorName: 'Verde Naturaleza 🍃', hex: '#06D6A0', desc: 'El verde nos da mucha paz como un bosque tranquilo.' },
            { emotion: 'Amor y Gratitud 💖', colorName: 'Rosado Amor 💕', hex: '#FF70A6', desc: 'El rosado nos llena de cariño y ternura.' }
        ];

        let currentIdx = 0;

        const renderColorStep = () => {
            if (currentIdx >= colorMap.length) {
                container.innerHTML = `
                    <div class="game-win-card">
                        <div class="win-emoji">🎨🌈⭐</div>
                        <h2>¡Eres un Maestro de los Colores Emocionales!</h2>
                        <p>Aprendiste la relación entre los colores y lo que sentimos.</p>
                        <button class="btn btn-primary" onclick="emotionGames.initColores(); soundEngine.playPop();">¡Volver a Jugar!</button>
                    </div>
                `;
                soundEngine.playWin();
                app.addStars(5);
                return;
            }

            const item = colorMap[currentIdx];
            soundEngine.speak(`Encuentra el color para la emoción: ${item.emotion}`);

            // Shuffle color options
            const shuffled = [...colorMap].sort(() => 0.5 - Math.random());

            container.innerHTML = `
                <div class="game-card">
                    <div class="game-progress">Nivel ${currentIdx + 1} de ${colorMap.length}</div>
                    <h3 class="game-scenario">¿Con qué color asociamos la emoción <span style="color:${item.hex}; font-weight:bold;">${item.emotion}</span>?</h3>
                    <div class="color-bubbles-grid">
                        ${shuffled.map(opt => `
                            <button class="color-bubble-btn" style="background-color: ${opt.hex};" onclick="emotionGames.checkColor('${opt.hex}', '${item.hex}', '${opt.desc}')">
                                <span>${opt.colorName}</span>
                            </button>
                        `).join('')}
                    </div>
                    <div id="color-feedback" class="feedback-box"></div>
                </div>
            `;
        };

        this.checkColor = (selectedHex, correctHex, desc) => {
            const fb = document.getElementById('color-feedback');
            if (selectedHex === correctHex) {
                soundEngine.playSuccess();
                soundEngine.speak(desc);
                fb.innerHTML = `<div class="alert-success">🌈 ¡Excelente! ${desc} ⭐</div>`;
                app.addStars(1);
                setTimeout(() => {
                    currentIdx++;
                    renderColorStep();
                }, 1800);
            } else {
                soundEngine.playPop(220);
                soundEngine.speak('Prueba con otro color de la paleta.');
                fb.innerHTML = `<div class="alert-warning">🎨 ¡Casi! Prueba con otro color brillante.</div>`;
            }
        };

        renderColorStep();
    }

    // GAME 3: RINCÓN DEL ARTE Y COLOREAR (CANVAS)
    initArte() {
        const canvas = document.getElementById('drawing-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Set canvas internal resolution
        canvas.width = 650;
        canvas.height = 420;

        // Fill background white
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        let isDrawing = false;
        let activeTool = 'brush'; // brush, sticker, eraser

        const getPos = (e) => {
            const rect = canvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return {
                x: (clientX - rect.left) * (canvas.width / rect.width),
                y: (clientY - rect.top) * (canvas.height / rect.height)
            };
        };

        const startDraw = (e) => {
            isDrawing = true;
            const pos = getPos(e);
            if (activeTool === 'sticker') {
                const sticker = document.getElementById('active-sticker-val')?.value || '😊';
                ctx.font = '40px sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(sticker, pos.x, pos.y);
                soundEngine.playPop(600);
                isDrawing = false;
                return;
            }
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
            soundEngine.playPop(350);
        };

        const draw = (e) => {
            if (!isDrawing) return;
            e.preventDefault();
            const pos = getPos(e);
            ctx.lineWidth = this.brushSize;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            if (activeTool === 'eraser') {
                ctx.strokeStyle = '#FFFFFF';
            } else {
                ctx.strokeStyle = this.currentColor;
            }

            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
        };

        const stopDraw = () => {
            isDrawing = false;
        };

        canvas.onmousedown = startDraw;
        canvas.onmousemove = draw;
        canvas.onmouseup = stopDraw;
        canvas.onmouseleave = stopDraw;

        canvas.addEventListener('touchstart', startDraw, { passive: false });
        canvas.addEventListener('touchmove', draw, { passive: false });
        canvas.addEventListener('touchend', stopDraw);

        // Controls binding
        window.setCanvasColor = (color) => {
            this.currentColor = color;
            activeTool = 'brush';
            soundEngine.playPop(500);
        };

        window.setCanvasTool = (tool) => {
            activeTool = tool;
            soundEngine.playPop(450);
        };

        window.clearCanvas = () => {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            soundEngine.playPop(250);
        };

        window.downloadCanvas = () => {
            const link = document.createElement('a');
            link.download = 'mi_emocion_arte.png';
            link.href = canvas.toDataURL();
            link.click();
            soundEngine.playWin();
            app.addStars(2);
        };
    }

    // GAME 4: LABERINTO DE LA CALMA
    initLaberinto() {
        const container = document.getElementById('game-laberinto-container');
        if (!container) return;

        // 5x5 maze grid
        // 0 = empty, 1 = wall, 2 = breathing bubble, 3 = target tree
        const grid = [
            [0, 0, 1, 2, 0],
            [1, 0, 1, 0, 1],
            [0, 2, 0, 0, 0],
            [0, 1, 1, 1, 0],
            [2, 0, 0, 0, 3]
        ];

        let playerPos = { r: 0, c: 0 };
        let bubblesCollected = 0;

        const renderMaze = () => {
            let html = '<div class="maze-grid">';
            for (let r = 0; r < 5; r++) {
                for (let c = 0; c < 5; c++) {
                    const isPlayer = playerPos.r === r && playerPos.c === c;
                    const cellVal = grid[r][c];
                    let cellContent = '';
                    let cellClass = 'maze-cell';

                    if (cellVal === 1) cellClass += ' cell-wall';
                    if (cellVal === 2) cellContent = '🌬️';
                    if (cellVal === 3) cellContent = '🌳';
                    if (isPlayer) cellContent = '🐱';

                    html += `<div class="${cellClass}">${cellContent}</div>`;
                }
            }
            html += '</div>';

            container.innerHTML = `
                <div class="game-card">
                    <div class="game-scenario">Guía a la Gatita Nube 🐱 junta las burbujas de respiración 🌬️ y llega al Árbol de la Calma 🌳</div>
                    <div class="maze-status">Burbujas juntadas: ${bubblesCollected} / 3</div>
                    ${html}
                    <div class="maze-controls">
                        <button class="btn btn-secondary" onclick="emotionGames.moveMaze(-1, 0)">⬆️ Arriba</button>
                        <div class="maze-row">
                            <button class="btn btn-secondary" onclick="emotionGames.moveMaze(0, -1)">⬅️ Izq</button>
                            <button class="btn btn-secondary" onclick="emotionGames.moveMaze(0, 1)">➡️ Der</button>
                        </div>
                        <button class="btn btn-secondary" onclick="emotionGames.moveMaze(1, 0)">⬇️ Abajo</button>
                    </div>
                </div>
            `;
        };

        this.moveMaze = (dr, dc) => {
            const nr = playerPos.r + dr;
            const nc = playerPos.c + dc;

            if (nr >= 0 && nr < 5 && nc >= 0 && nc < 5) {
                if (grid[nr][nc] !== 1) {
                    playerPos.r = nr;
                    playerPos.c = nc;
                    soundEngine.playPop(400);

                    if (grid[nr][nc] === 2) {
                        grid[nr][nc] = 0;
                        bubblesCollected++;
                        soundEngine.playCalmChime();
                        soundEngine.speak('¡Burbuja de respiración recolectada! Inhala y exhala.');
                    }

                    if (grid[nr][nc] === 3) {
                        container.innerHTML = `
                            <div class="game-win-card">
                                <div class="win-emoji">🌳🐱✨</div>
                                <h2>¡Llegaste al Árbol de la Calma!</h2>
                                <p>Has demostrado excelente autorregulación y dirección.</p>
                                <button class="btn btn-primary" onclick="emotionGames.initLaberinto(); soundEngine.playPop();">¡Jugar de Nuevo!</button>
                            </div>
                        `;
                        soundEngine.playWin();
                        app.addStars(5);
                        return;
                    }

                    renderMaze();
                } else {
                    soundEngine.playPop(180);
                }
            }
        };

        renderMaze();
    }

    // GAME 5: SECUENCIAS Y RESOLUCIÓN DE CONFLICTOS
    initSecuencias() {
        const container = document.getElementById('game-secuencias-container');
        if (!container) return;

        const sequenceData = {
            title: '¿Qué debemos hacer cuando sentimos enojo? 😡 ➔ 🍃',
            steps: [
                { id: 1, title: '1. Reconocer el enojo 😡', text: 'Sentimos el cuerpo caliente y los puños apretados.' },
                { id: 2, title: '2. Parar y Respirar 🌬️', text: 'Inhalar profundo como oliendo una flor y soplar la vela.' },
                { id: 3, title: '3. Hablar con calma 🗣️💛', text: 'Expresar con palabras respetuosas lo que nos molesta.' }
            ]
        };

        // Shuffle steps
        let currentOrder = [...sequenceData.steps].sort(() => 0.5 - Math.random());

        const renderSeq = () => {
            container.innerHTML = `
                <div class="game-card">
                    <h3 class="game-scenario">${sequenceData.title}</h3>
                    <p class="game-prompt">Haz clic en los pasos para ordenarlos correctamente (del 1 al 3):</p>
                    <div class="sequence-list">
                        ${currentOrder.map((step, idx) => `
                            <div class="seq-item" onclick="emotionGames.selectSeqStep(${idx})">
                                <div class="seq-num">${idx + 1}</div>
                                <div class="seq-body">
                                    <h4>${step.title}</h4>
                                    <p>${step.text}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <button class="btn btn-primary" style="margin-top:15px;" onclick="emotionGames.verifySequence()"> Comprobar Secuencia</button>
                    <div id="seq-feedback" class="feedback-box"></div>
                </div>
            `;
        };

        this.selectSeqStep = (idx) => {
            // Swap item with next or previous to reorder
            soundEngine.playPop(500);
            if (idx < currentOrder.length - 1) {
                const temp = currentOrder[idx];
                currentOrder[idx] = currentOrder[idx + 1];
                currentOrder[idx + 1] = temp;
            } else {
                const temp = currentOrder[idx];
                currentOrder[idx] = currentOrder[0];
                currentOrder[0] = temp;
            }
            renderSeq();
        };

        this.verifySequence = () => {
            const isCorrect = currentOrder.every((step, i) => step.id === i + 1);
            const fb = document.getElementById('seq-feedback');
            if (isCorrect) {
                soundEngine.playWin();
                soundEngine.speak('¡Excelente trabajo! Esa es la secuencia correcta para autorregularnos.');
                fb.innerHTML = `<div class="alert-success">🏆 ¡Secuencia perfecta! Reconocer ➔ Respirar ➔ Hablar. ⭐</div>`;
                app.addStars(5);
            } else {
                soundEngine.playPop(200);
                soundEngine.speak('Sigue intentando reordenar los pasos.');
                fb.innerHTML = `<div class="alert-warning">💡 Casi. Recuerda: Primero reconocemos, luego respiramos y finalmente hablamos.</div>`;
            }
        };

        renderSeq();
    }

    // GAME 6: DISCRIMINACIÓN AUDITIVA DE EMOCIONES
    initSonidos() {
        const container = document.getElementById('game-sonidos-container');
        if (!container) return;

        const soundQuiz = [
            { title: 'Sonido 1: risa contagiosa', synthType: 'win', correct: 'alegria', name: 'Risa alegre 😊' },
            { title: 'Sonido 2: llanto suave o lluvia', synthType: 'calm', correct: 'tristeza', name: 'Sollozo o lluvia 🌧️' },
            { title: 'Sonido 3: respiración profunda', synthType: 'calm', correct: 'calma', name: 'Respiración de Paz 🌿' }
        ];

        let currentIdx = 0;

        const renderSoundStep = () => {
            if (currentIdx >= soundQuiz.length) {
                container.innerHTML = `
                    <div class="game-win-card">
                        <div class="win-emoji">🎧🎵⭐</div>
                        <h2>¡Excelente oído emocional!</h2>
                        <p>Reconociste los sonidos que representan las emociones.</p>
                        <button class="btn btn-primary" onclick="emotionGames.initSonidos(); soundEngine.playPop();">¡Escuchar de Nuevo!</button>
                    </div>
                `;
                soundEngine.playWin();
                app.addStars(4);
                return;
            }

            const current = soundQuiz[currentIdx];

            container.innerHTML = `
                <div class="game-card">
                    <div class="game-progress">Nivel ${currentIdx + 1} de ${soundQuiz.length}</div>
                    <div class="sound-play-box">
                        <button class="btn-sound-play" onclick="emotionGames.playSoundEffect('${current.synthType}')">
                            🔊 ¡Haz clic para escuchar el sonido! 🎵
                        </button>
                    </div>
                    <p class="game-prompt">¿Qué emoción o estado representa este sonido?</p>
                    <div class="emotion-options-grid">
                        <button class="btn-emotion-choice" style="background-color:#FFD166;" onclick="emotionGames.checkSound('alegria', '${current.correct}')">😊 Alegría</button>
                        <button class="btn-emotion-choice" style="background-color:#4EA8DE;" onclick="emotionGames.checkSound('tristeza', '${current.correct}')">😢 Tristeza</button>
                        <button class="btn-emotion-choice" style="background-color:#06D6A0;" onclick="emotionGames.checkSound('calma', '${current.correct}')">🌿 Calma</button>
                    </div>
                    <div id="sound-feedback" class="feedback-box"></div>
                </div>
            `;
        };

        this.playSoundEffect = (type) => {
            if (type === 'win') soundEngine.playWin();
            if (type === 'calm') soundEngine.playCalmChime();
        };

        this.checkSound = (selected, correct) => {
            const fb = document.getElementById('sound-feedback');
            if (selected === correct) {
                soundEngine.playSuccess();
                soundEngine.speak('¡Genial! Identificaste muy bien el sonido.');
                fb.innerHTML = `<div class="alert-success">✨ ¡Correcto! ¡Identificación auditiva perfecta! ⭐</div>`;
                app.addStars(1);
                setTimeout(() => {
                    currentIdx++;
                    renderSoundStep();
                }, 1500);
            } else {
                soundEngine.playPop(200);
                soundEngine.speak('Vuelve a escuchar con atención.');
                fb.innerHTML = `<div class="alert-warning">💡 Vuelve a hacer clic en el parlante para escuchar mejor.</div>`;
            }
        };

        renderSoundStep();
    }
}

const emotionGames = new EmotionGames();
