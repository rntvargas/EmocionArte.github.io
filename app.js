/**
 * EmocionArte Main Application Logic
 * Coordinates tabs, stories modal, daily emotion check-in, breathing exercise & gamification.
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
    }

    switchTab(tabId) {
        soundEngine.playPop(500);
        soundEngine.stopSpeech();

        // Update tabs active class
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        const activeBtn = Array.from(document.querySelectorAll('.nav-tab')).find(b => b.getAttribute('onclick').includes(`'${tabId}'`));
        if (activeBtn) activeBtn.classList.add('active');

        // Hide all views, show selected
        document.querySelectorAll('.view-section').forEach(sec => {
            sec.classList.remove('active');
        });
        const targetView = document.getElementById(`view-${tabId}`);
        if (targetView) targetView.classList.add('active');

        this.currentTab = tabId;

        // Auto-initialize games if games tab selected
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
            soundEngine.speak('Voz narradora activada.');
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
            alegria: { text: '¡Qué grandioso! La alegría nos llena de luz y ganas de cantar. ☀️😊', speech: '¡Qué grandioso! La alegría nos llena de luz y ganas de cantar.' },
            tristeza: { text: 'Está bien sentirse triste a veces. Recuerda que un abrazo calientito siempre ayuda. 🌧️💙', speech: 'Está bien sentirse triste a veces. Recuerda que un abrazo calientito siempre ayuda.' },
            enojo: { text: 'Cuando sientas enojo, recuerda detenerte y soplar la velita para calmarte. 🌬️🔥', speech: 'Cuando sientas enojo, recuerda detenerte y soplar la velita para calmarte.' },
            miedo: { text: 'El miedo nos dice que debemos tener cuidado, pero eres muy valiente. 🛡️💜', speech: 'El miedo nos dice que debemos tener cuidado, pero eres muy valiente.' },
            sorpresa: { text: '¡Vaya! Las sorpresas hacen que nuestros ojos brillen de asombro. 🎁⚡', speech: '¡Vaya! Las sorpresas hacen que nuestros ojos brillen de asombro.' },
            calma: { text: 'La calma es tu superpoder. Disfruta de esta hermosa tranquilidad. 🍃✨', speech: 'La calma es tu superpoder. Disfruta de esta hermosa tranquilidad.' }
        };

        const res = responses[emotionKey] || responses.alegria;
        speechDiv.innerHTML = `<div class="alert-success">${res.text}</div>`;
        soundEngine.speak(res.speech);
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
                <button class="btn btn-primary" onclick="app.openStory('${st.id}')">
                    📖 Leer Cuento
                </button>
            </div>
        `).join('');
    }

    openStory(storyId) {
        this.activeStory = STORIES.find(s => s.id === storyId);
        if (!this.activeStory) return;

        this.activeStoryPage = 0;
        document.getElementById('story-modal').classList.add('active');
        this.renderStoryPage();
        soundEngine.playPop(520);
    }

    closeStoryModal() {
        document.getElementById('story-modal').classList.remove('active');
        soundEngine.stopSpeech();
        soundEngine.playPop(300);
    }

    renderStoryPage() {
        if (!this.activeStory) return;
        const page = this.activeStory.pages[this.activeStoryPage];
        const total = this.activeStory.pages.length;

        document.getElementById('modal-story-title').innerText = `${this.activeStory.title} ${this.activeStory.icon}`;
        document.getElementById('modal-story-img').src = page.image || this.activeStory.image;
        document.getElementById('modal-story-text').innerText = page.text;
        document.getElementById('page-indicator').innerText = `Página ${this.activeStoryPage + 1} de ${total}`;

        // Question rendering if exists on this page
        const qBox = document.getElementById('modal-question-box');
        if (page.question) {
            const q = page.question;
            qBox.innerHTML = `
                <div style="background:#FFF9E6; padding:16px; border-radius:16px; border:2px solid #FFD166; margin-top:16px;">
                    <h4 style="color:#B45309; margin-bottom:10px;">❓ Pregunta Reflexiva: ${q.prompt}</h4>
                    <div class="emotion-options-grid">
                        ${q.options.map((opt, i) => `
                            <button class="btn-emotion-choice" style="background:#FFFFFF; border:2px solid #CBD5E0;" onclick="app.answerQuestion(${opt.correct}, '${opt.feedback.replace(/'/g, "\\'")}')">
                                ${opt.text}
                            </button>
                        `).join('')}
                    </div>
                </div>
            `;
        } else {
            qBox.innerHTML = '';
        }

        // Auto narration
        soundEngine.speak(page.text);

        // Buttons state
        document.getElementById('btn-prev-page').disabled = (this.activeStoryPage === 0);
        
        const nextBtn = document.getElementById('btn-next-page');
        if (this.activeStoryPage === total - 1) {
            nextBtn.innerText = '🏁 Finalizar Cuento';
            nextBtn.className = 'btn btn-primary';
        } else {
            nextBtn.innerText = 'Siguiente ➡️';
            nextBtn.className = 'btn btn-primary';
        }
    }

    answerQuestion(isCorrect, feedback) {
        if (isCorrect) {
            soundEngine.playSuccess();
            soundEngine.speak(feedback);
            alert(`✨ ${feedback}`);
            this.addStars(3);
        } else {
            soundEngine.playPop(200);
            soundEngine.speak(feedback);
            alert(`💡 ${feedback}`);
        }
    }

    speakStoryPage() {
        if (!this.activeStory) return;
        const page = this.activeStory.pages[this.activeStoryPage];
        soundEngine.speak(page.text);
    }

    nextStoryPage() {
        if (!this.activeStory) return;
        if (this.activeStoryPage < this.activeStory.pages.length - 1) {
            this.activeStoryPage++;
            this.renderStoryPage();
            soundEngine.playPop(600);
        } else {
            // Story finished!
            this.closeStoryModal();
            soundEngine.playWin();
            soundEngine.speak('¡Felicidades por terminar este hermoso cuento!');
            alert('🎉 ¡Felicitaciones! Has completado el cuento y ganado estrellas.');
            this.addStars(5);
        }
    }

    prevStoryPage() {
        if (this.activeStoryPage > 0) {
            this.activeStoryPage--;
            this.renderStoryPage();
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
                soundEngine.speak('Inhala despacito.');
            } else {
                balloon.className = 'balloon exhale';
                text.innerText = '💨 Exhala suavemente... como soplando una vela 🎂';
                soundEngine.playCalmChime();
                soundEngine.speak('Exhala suavemente.');
            }
            step++;
        };

        cycle();
        this.breathInterval = setInterval(cycle, 4000);
    }

    stopBreathing() {
        if (this.breathInterval) {
            clearInterval(this.breathInterval);
            this.breathInterval = null;
        }
        const balloon = document.getElementById('magic-balloon');
        const text = document.getElementById('breath-text');
        if (balloon) balloon.className = 'balloon';
        if (text) text.innerText = 'Presiona Iniciar para comenzar a respirar';
        soundEngine.stopSpeech();
    }
}

const app = new App();
window.addEventListener('DOMContentLoaded', () => {
    app.init();
});
