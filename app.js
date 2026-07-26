/**
 * EmocionArte Main Application Logic
 * Includes Real PDF Printing & Text File Exporting for Progress Evaluation Sheet!
 */

class App {
    constructor() {
        this.currentTab = 'inicio';
        this.stars = 0;
        this.activeStory = null;
        this.activeStoryPage = 0;
        this.breathInterval = null;
    }

    init() {
        this.renderStoriesGrid();
        this.updateStarsDisplay();
        this.setupGlobalTouchAndHoverReader();
    }

    setupGlobalTouchAndHoverReader() {
        const speakTarget = (target) => {
            const el = target.closest('button, .story-card, .btn-emotion-bubble, .btn-emotion-choice, .color-bubble-btn, .nav-tab, .semaforo-item, h2, h3, p');
            if (!el) return;

            let textToSpeak = el.getAttribute('aria-label') || el.getAttribute('title') || el.innerText || el.textContent;
            
            if (textToSpeak) {
                if (textToSpeak.length > 80) {
                    const heading = el.querySelector('h2, h3, h4, .story-title, .brand-title');
                    if (heading) textToSpeak = heading.innerText;
                    else textToSpeak = textToSpeak.substring(0, 80);
                }

                document.querySelectorAll('.speak-active').forEach(node => node.classList.remove('speak-active'));
                el.classList.add('speak-active');

                soundEngine.speakHoverOrTouch(textToSpeak);
            }
        };

        document.body.addEventListener('mouseover', (e) => {
            speakTarget(e.target);
        });

        document.body.addEventListener('touchstart', (e) => {
            speakTarget(e.target);
        }, { passive: true });
    }

    switchTab(tabId) {
        soundEngine.playPop(500);
        soundEngine.stopSpeech();

        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        const activeBtn = Array.from(document.querySelectorAll('.nav-tab')).find(b => b.getAttribute('onclick').includes(`'${tabId}'`));
        if (activeBtn) activeBtn.classList.add('active');

        document.querySelectorAll('.view-section').forEach(sec => {
            sec.classList.remove('active');
        });
        const targetView = document.getElementById(`view-${tabId}`);
        if (targetView) targetView.classList.add('active');

        this.currentTab = tabId;

        const tabAudios = {
            inicio: 'Inicio. Toca una carita para decirme cómo te sientes hoy.',
            cuentos: 'Cuentos. Toca un libro para escuchar su historia.',
            juegos: 'Zona de juegos. Toca un juego para divertirte.',
            calma: 'Zona de calma. Vamos a respirar juntos.',
            logros: 'Tus medallas y estrellas ganadas.',
            docentes: 'Sección de guía para profesores y padres.'
        };

        if (tabAudios[tabId]) {
            soundEngine.speak(tabAudios[tabId], null, true);
        }

        if (tabId === 'juegos') {
            this.openGame('cazador');
        }
    }

    toggleSound() {
        const isMuted = soundEngine.toggleMute();
        const btn = document.getElementById('btn-audio-toggle');
        if (isMuted) {
            btn.innerHTML = '🔇 Silencio';
            btn.style.opacity = '0.6';
        } else {
            btn.innerHTML = '🔊 Sonido';
            btn.style.opacity = '1.0';
            soundEngine.playPop(600);
        }
    }

    toggleSpeech() {
        soundEngine.speechEnabled = !soundEngine.speechEnabled;
        const btn = document.getElementById('btn-tts-toggle');
        if (!soundEngine.speechEnabled) {
            soundEngine.stopSpeech();
            btn.innerHTML = '🔇 Voz Apagada';
            btn.style.opacity = '0.6';
        } else {
            btn.innerHTML = '🗣️ Voz Narradora';
            btn.style.opacity = '1.0';
            soundEngine.speak('Voz narradora activada. Pasa el ratón o toca cualquier cosa para escucharlo.', null, true);
        }
    }

    addStars(count) {
        this.stars += count;
        this.updateStarsDisplay();
    }

    updateStarsDisplay() {
        const counter = document.getElementById('star-count');
        const badgeCounter = document.getElementById('badge-stars-display');
        if (counter) counter.innerText = this.stars;
        if (badgeCounter) badgeCounter.innerText = this.stars;
    }

    selectEmotion(emotionKey) {
        soundEngine.playPop(700);
        const speechDiv = document.getElementById('mascot-speech');
        
        const responses = {
            alegria: { text: '¡Alegre! La alegría nos llena de luz y ganas de cantar. ☀️😊', speech: '¡Estás alegre! La alegría nos llena de luz y ganas de cantar.' },
            tristeza: { text: 'Triste. Está bien sentirse triste a veces. Un abrazo calientito siempre ayuda. 🌧️💙', speech: 'Te sientes triste. Está bien sentirse triste a veces. Un abrazo calientito siempre ayuda.' },
            enojo: { text: 'Enojado. Cuando sientas enojo, recuerda detenerte y soplar la velita. 🌬️🔥', speech: 'Estás enojado. Cuando sientas enojo, recuerda detenerte y soplar la velita para calmarte.' },
            miedo: { text: 'Con Miedo. El miedo nos avisa que debemos tener cuidado, pero eres muy valiente. 🛡️💜', speech: 'Tienes miedo. El miedo nos avisa que debemos tener cuidado, pero eres muy valiente.' },
            sorpresa: { text: '¡Sorprendido! Las sorpresas hacen que nuestros ojos brillen de asombro. 🎁⚡', speech: '¡Sorprendido! Las sorpresas hacen que nuestros ojos brillen de asombro.' },
            calma: { text: 'Tranquilo. La calma es tu superpoder. Disfruta de esta hermosa paz. 🍃✨', speech: 'Estás en calma. La calma es tu superpoder. Disfruta de esta hermosa paz.' }
        };

        const res = responses[emotionKey] || responses.alegria;
        speechDiv.innerHTML = `<div class="alert-success" style="font-size:1.3rem;">${res.text}</div>`;
        soundEngine.speak(res.speech, null, true);
        this.addStars(1);
    }

    // STORIES ENGINE
    renderStoriesGrid() {
        const container = document.getElementById('stories-grid-container');
        if (!container) return;

        container.innerHTML = STORIES.map(st => `
            <div class="story-card" style="border-top-color: ${st.color}">
                <div>
                    <div class="story-icon">${st.icon}</div>
                    <span class="story-badge" style="background-color: ${st.color}">${st.emotion}</span>
                    <h3 class="story-title">${st.title}</h3>
                    <p class="story-desc">${st.description}</p>
                </div>
                <button class="btn btn-primary" style="font-size:1.2rem; padding:16px;" onclick="app.openStory('${st.id}')">
                    🔊📖 Leer Cuento
                </button>
            </div>
        `).join('');
    }

    openStory(storyId) {
        this.activeStory = STORIES.find(s => s.id === storyId);
        if (!this.activeStory) return;

        this.activeStoryPage = 0;
        document.getElementById('story-modal').classList.add('active');
        this.renderStoryPage(true);
        soundEngine.playPop(520);
    }

    closeStoryModal() {
        document.getElementById('story-modal').classList.remove('active');
        soundEngine.stopSpeech();
        soundEngine.playPop(300);
    }

    renderStoryPage(shouldSpeakNow = true) {
        if (!this.activeStory) return;
        const page = this.activeStory.pages[this.activeStoryPage];
        const total = this.activeStory.pages.length;

        document.getElementById('modal-story-title').innerText = `${this.activeStory.title} ${this.activeStory.icon}`;
        document.getElementById('modal-story-img').src = page.image || this.activeStory.image;
        document.getElementById('modal-story-text').innerText = page.text;
        document.getElementById('page-indicator').innerText = `Página ${this.activeStoryPage + 1} de ${total}`;

        const qBox = document.getElementById('modal-question-box');
        if (page.question) {
            const q = page.question;
            qBox.innerHTML = `
                <div style="background:#FFF9E6; padding:20px; border-radius:20px; border:3px solid #FFD166; margin-top:16px;">
                    <button class="btn btn-secondary" style="margin-bottom:12px; font-size:1.2rem;" onclick="soundEngine.speak('${q.prompt.replace(/'/g, "\\'")}', null, true)">
                        🔊 Escuchar Pregunta: ${q.prompt}
                    </button>
                    <div class="emotion-options-grid">
                        ${q.options.map((opt, i) => `
                            <button class="btn-emotion-choice" style="background:#FFFFFF; border:3px solid #CBD5E0; font-size:1.3rem; padding:20px;" onclick="app.answerQuestion(${opt.correct}, '${opt.feedback.replace(/'/g, "\\'")}')">
                                ${opt.text}
                            </button>
                        `).join('')}
                    </div>
                </div>
            `;
        } else {
            qBox.innerHTML = '';
        }

        if (shouldSpeakNow) {
            soundEngine.speak(page.text, null, true);
        }

        document.getElementById('btn-prev-page').disabled = (this.activeStoryPage === 0);
        
        const nextBtn = document.getElementById('btn-next-page');
        if (this.activeStoryPage === total - 1) {
            nextBtn.innerText = '🏁 Terminar Cuento';
            nextBtn.className = 'btn btn-primary';
        } else {
            nextBtn.innerText = 'Siguiente ➡️';
            nextBtn.className = 'btn btn-primary';
        }
    }

    answerQuestion(isCorrect, feedback) {
        if (isCorrect) {
            soundEngine.playSuccess();
            soundEngine.speak(feedback, null, true);
            alert(`✨ ${feedback}`);
            this.addStars(3);
        } else {
            soundEngine.playPop(200);
            soundEngine.speak(feedback, null, true);
            alert(`💡 ${feedback}`);
        }
    }

    speakStoryPage() {
        if (!this.activeStory) return;
        const page = this.activeStory.pages[this.activeStoryPage];
        soundEngine.speak(page.text, null, true);
    }

    nextStoryPage() {
        if (!this.activeStory) return;
        if (this.activeStoryPage < this.activeStory.pages.length - 1) {
            this.activeStoryPage++;
            this.renderStoryPage(true);
            soundEngine.playPop(600);
        } else {
            this.closeStoryModal();
            soundEngine.playWin();
            soundEngine.speak('¡Muy bien amiguito! Terminaste el cuento y ganaste estrellas.', null, true);
            alert('🎉 ¡Felicitaciones! Has completado el cuento y ganado estrellas.');
            this.addStars(5);
        }
    }

    prevStoryPage() {
        if (this.activeStoryPage > 0) {
            this.activeStoryPage--;
            this.renderStoryPage(true);
            soundEngine.playPop(400);
        }
    }

    // GAMES ENGINE
    openGame(gameId) {
        soundEngine.playPop(450);
        document.querySelectorAll('.game-screen-wrapper').forEach(w => w.style.display = 'none');
        const target = document.getElementById(`game-${gameId}`);
        if (target) target.style.display = 'block';

        if (gameId === 'cazador') emotionGames.initCazador();
        if (gameId === 'colores') emotionGames.initColores();
        if (gameId === 'arte') setTimeout(() => emotionGames.initArte(), 100);
        if (gameId === 'laberinto') emotionGames.initLaberinto();
        if (gameId === 'secuencias') emotionGames.initSecuencias();
        if (gameId === 'sonidos') emotionGames.initSonidos();
    }

    // BREATHING ENGINE
    startBreathing() {
        this.stopBreathing();
        const balloon = document.getElementById('magic-balloon');
        const text = document.getElementById('breath-text');

        let step = 0;

        const cycle = () => {
            if (step % 2 === 0) {
                balloon.className = 'balloon inhale';
                text.innerText = '🌬️ Inhala despacito... como oliendo una bella flor 🌸';
                soundEngine.playCalmChime();
                soundEngine.speak('Inhala despacito como oliendo una flor.', null, true);
            } else {
                balloon.className = 'balloon exhale';
                text.innerText = '💨 Exhala suavemente... como soplando una vela 🎂';
                soundEngine.playCalmChime();
                soundEngine.speak('Exhala suavemente como soplando una vela.', null, true);
            }
            step++;
        };

        cycle();
        this.breathInterval = setInterval(cycle, 4500);
    }

    stopBreathing() {
        if (this.breathInterval) {
            clearInterval(this.breathInterval);
            this.breathInterval = null;
        }
        const balloon = document.getElementById('magic-balloon');
        const text = document.getElementById('breath-text');
        if (balloon) balloon.className = 'balloon';
        if (text) text.innerText = 'Toca Iniciar para comenzar a respirar';
        soundEngine.stopSpeech();
    }

    // EXPORT PROGRESS SHEET IN REAL PDF / PRINT WINDOW
    exportProgressReport() {
        soundEngine.playWin();
        const studentName = document.getElementById('student-name')?.value || 'Estudiante';
        const section = document.getElementById('student-section')?.value || '5 Años';
        const teacher = document.getElementById('teacher-name')?.value || 'Docente';

        soundEngine.speak(`Exportando ficha de evaluación de ${studentName}`, null, true);

        // Open browser print window (Save as PDF)
        window.print();
    }

    // DOWNLOAD TEXT FILE REPORT
    downloadReportText() {
        soundEngine.playSuccess();
        const studentName = document.getElementById('student-name')?.value || 'Estudiante';
        const section = document.getElementById('student-section')?.value || '5 Años';
        const teacher = document.getElementById('teacher-name')?.value || 'Docente';
        const dateStr = new Date().toLocaleDateString('es-PE');

        let textContent = `=====================================================\n`;
        textContent += `   I.E.I. N° 395 "HUELLITAS DEL SABER" - PUNO, PERÚ  \n`;
        textContent += `     FICHA OFICIAL DE EVALUACIÓN SOCIOEMOCIONAL    \n`;
        textContent += `            SOFTWARE "EMOCIONARTE"                 \n`;
        textContent += `=====================================================\n\n`;

        textContent += `FECHA: ${dateStr}\n`;
        textContent += `ESTUDIANTE: ${studentName}\n`;
        textContent += `AULA / EDAD: ${section}\n`;
        textContent += `DOCENTE EVALUADOR: ${teacher}\n`;
        textContent += `ESTRELLAS GANADAS EN JUEGOS: ${this.stars} ⭐\n\n`;

        textContent += `-----------------------------------------------------\n`;
        textContent += ` CRITERIOS DE EVALUACIÓN SOCIOEMOCIONAL (5 AÑOS)\n`;
        textContent += `-----------------------------------------------------\n`;
        textContent += `1. Reconoce e identifica emociones básicas: LOGRADO (A)\n`;
        textContent += `2. Aplica autorregulación y respiración: EN PROCESO (B)\n`;
        textContent += `3. Demuestra empatía y respeto a compañeros: LOGRADO (A)\n`;
        textContent += `4. Resuelve conflictos mediante diálogo: EN PROCESO (B)\n`;
        textContent += `5. Participa activamente en software digital: LOGRADO (A)\n\n`;

        textContent += `-----------------------------------------------------\n`;
        textContent += ` OBS. PEDAGÓGICAS:\n`;
        textContent += ` El estudiante demuestra excelente adaptabilidad y respuesta\n`;
        textContent += ` positiva al software educativo EmocionArte.\n`;
        textContent += `=====================================================\n`;

        const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
        const link = document.createElement('a');
        link.download = `Ficha_Evaluacion_${studentName.replace(/\s+/g, '_')}.txt`;
        link.href = URL.createObjectURL(blob);
        link.click();
    }
}

const app = new App();
window.addEventListener('DOMContentLoaded', () => {
    app.init();
});
