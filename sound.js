/**
 * EmocionArte Sound Engine & Speech Synthesizer
 * Pure Girl/Female Voice Selector & Pitch Tuning (Voz de Chica 🎀👧🌸)
 */

class SoundEngine {
    constructor() {
        this.ctx = null;
        this.muted = false;
        this.speechEnabled = true;
        this.hoverDebounceTimer = null;
        this.lastSpokenText = '';
        this.isPrioritySpeaking = false;
        this.mobileUnlocked = false;

        this.initMobileVoices();
    }

    initMobileVoices() {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.getVoices();
            if (window.speechSynthesis.onvoiceschanged !== undefined) {
                window.speechSynthesis.onvoiceschanged = () => {
                    window.speechSynthesis.getVoices();
                };
            }
        }

        const unlock = () => {
            if (this.mobileUnlocked) return;
            this.init();
            
            if ('speechSynthesis' in window) {
                const dummy = new SpeechSynthesisUtterance(' ');
                dummy.volume = 0.01;
                dummy.lang = 'es-ES';
                window.speechSynthesis.speak(dummy);
            }

            this.mobileUnlocked = true;
        };

        document.addEventListener('touchstart', unlock, { passive: true });
        document.addEventListener('click', unlock);
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        return this.muted;
    }

    playPop(freq = 580) {
        if (this.muted) return;
        this.init();
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(freq * 1.6, this.ctx.currentTime + 0.08);

            gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + 0.08);
        } catch(e) {}
    }

    playKawaiiSparkle() {
        if (this.muted) return;
        this.init();
        try {
            const notes = [659.25, 880, 1046.50, 1318.51];
            notes.forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                const startTime = this.ctx.currentTime + idx * 0.06;

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, startTime);

                gain.gain.setValueAtTime(0.18, startTime);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(startTime);
                osc.stop(startTime + 0.2);
            });
        } catch(e) {}
    }

    playSuccess() {
        if (this.muted) return;
        this.init();
        try {
            const notes = [523.25, 659.25, 783.99, 1046.50];
            notes.forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                const startTime = this.ctx.currentTime + idx * 0.08;

                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, startTime);

                gain.gain.setValueAtTime(0.2, startTime);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(startTime);
                osc.stop(startTime + 0.25);
            });
        } catch(e) {}
    }

    playWin() {
        if (this.muted) return;
        this.init();
        try {
            const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
            notes.forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                const startTime = this.ctx.currentTime + idx * 0.09;

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, startTime);

                gain.gain.setValueAtTime(0.25, startTime);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(startTime);
                osc.stop(startTime + 0.35);
            });
        } catch(e) {}
    }

    playCalmChime() {
        if (this.muted) return;
        this.init();
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(440, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(587.33, this.ctx.currentTime + 1.5);

            gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + 0.7);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 2.0);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + 2.0);
        } catch(e) {}
    }

    // High-pitched Girl/Female Voice Synthesizer
    speak(text, onEnd = null, isPriority = false) {
        if (!('speechSynthesis' in window)) return;
        if (!this.speechEnabled || !text) return;

        const cleanText = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
        if (!cleanText.trim()) return;

        if (this.isPrioritySpeaking && !isPriority) return;

        try {
            if (window.speechSynthesis.paused) {
                window.speechSynthesis.resume();
            }
            window.speechSynthesis.cancel();
            
            if (isPriority) {
                this.isPrioritySpeaking = true;
            }

            const utterance = new SpeechSynthesisUtterance(cleanText);
            utterance.lang = 'es-ES';
            
            // PITCH TUNING: 1.85 produces a distinctly cute, high-pitched female/girl voice on all devices!
            utterance.pitch = 1.85;
            utterance.rate = 1.0;

            const voices = window.speechSynthesis.getVoices();
            if (voices && voices.length > 0) {
                // Expanded list of female Spanish voice names across Windows, Mac, Android, iOS
                const femaleKeywords = [
                    'sabina', 'monica', 'helena', 'laura', 'paloma', 'zira', 'francisca', 
                    'paulina', 'lucia', 'mia', 'victoria', 'marisol', 'esperanza', 'female',
                    'mujer', 'chica', 'google español', 'spanish female'
                ];

                const esFemaleVoice = voices.find(v => 
                    (v.lang.startsWith('es') || v.lang.startsWith('Spanish')) && 
                    femaleKeywords.some(keyword => v.name.toLowerCase().includes(keyword))
                ) || voices.find(v => v.lang.startsWith('es'));

                if (esFemaleVoice) {
                    utterance.voice = esFemaleVoice;
                }
            }

            utterance.onend = () => {
                this.isPrioritySpeaking = false;
                if (onEnd) onEnd();
            };

            utterance.onerror = () => {
                this.isPrioritySpeaking = false;
            };

            window.speechSynthesis.speak(utterance);
            this.lastSpokenText = cleanText;
        } catch (e) {
            console.warn('Speech synthesis exception:', e);
            this.isPrioritySpeaking = false;
        }
    }

    speakHoverOrTouch(text) {
        if (this.isPrioritySpeaking) return;

        if (this.hoverDebounceTimer) {
            clearTimeout(this.hoverDebounceTimer);
        }
        this.hoverDebounceTimer = setTimeout(() => {
            if (text && text !== this.lastSpokenText && !this.isPrioritySpeaking) {
                this.playKawaiiSparkle();
                this.speak(text);
            }
        }, 150);
    }

    stopSpeech() {
        this.isPrioritySpeaking = false;
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
    }
}

const soundEngine = new SoundEngine();
