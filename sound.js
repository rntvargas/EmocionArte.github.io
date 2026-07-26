/**
 * EmocionArte Sound Engine & Speech Synthesizer
 * Enhanced Kawaii Girl Voice Profile (Voz Chica Kawaii 🌸✨)
 */

class SoundEngine {
    constructor() {
        this.ctx = null;
        this.muted = false;
        this.speechEnabled = true;
        this.hoverDebounceTimer = null;
        this.lastSpokenText = '';
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

    // Play a friendly cute pop sound
    playPop(freq = 580) {
        if (this.muted) return;
        this.init();
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
    }

    // Kawaii sparkle sound effect
    playKawaiiSparkle() {
        if (this.muted) return;
        this.init();
        const notes = [659.25, 880, 1046.50, 1318.51]; // E5, A5, C6, E6
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
    }

    // Play star/coin collection chime
    playSuccess() {
        if (this.muted) return;
        this.init();
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
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
    }

    // Play fanfare / win sound
    playWin() {
        if (this.muted) return;
        this.init();
        const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // Kawaii fanfare
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
    }

    // Play calm breathing chime
    playCalmChime() {
        if (this.muted) return;
        this.init();
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
    }

    // Speech Synthesis with Cute Kawaii Female Voice Profile 🎀🌸
    speak(text, onEnd = null) {
        if (!('speechSynthesis' in window)) return;
        if (!this.speechEnabled || !text) return;

        // Clean emojis for speech
        const cleanText = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
        if (!cleanText.trim()) return;

        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'es-ES';
        
        // KAWAII SPEECH PARAMETERS
        utterance.pitch = 1.75; // High pitch for a sweet, cute kawaii voice!
        utterance.rate = 1.02;  // Upbeat, cheerful rate

        // Find the sweetest female Spanish voice available on OS/Browser
        const voices = window.speechSynthesis.getVoices();
        const femaleVoiceNames = ['Sabina', 'Monica', 'Helena', 'Laura', 'Paloma', 'Zira', 'Francisca', 'Google español', 'Paulina', 'Lucia', 'Mia'];
        
        const esFemaleVoice = voices.find(v => 
            (v.lang.startsWith('es') || v.lang.startsWith('Spanish')) && 
            femaleVoiceNames.some(name => v.name.toLowerCase().includes(name.toLowerCase()))
        ) || voices.find(v => v.lang.startsWith('es'));

        if (esFemaleVoice) {
            utterance.voice = esFemaleVoice;
        }

        if (onEnd) {
            utterance.onend = onEnd;
        }

        window.speechSynthesis.speak(utterance);
        this.lastSpokenText = cleanText;
    }

    // Speak on mouse hover or touch on mobile
    speakHoverOrTouch(text) {
        if (this.hoverDebounceTimer) {
            clearTimeout(this.hoverDebounceTimer);
        }
        this.hoverDebounceTimer = setTimeout(() => {
            if (text && text !== this.lastSpokenText) {
                this.playKawaiiSparkle();
                this.speak(text);
            }
        }, 120);
    }

    stopSpeech() {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
    }
}

const soundEngine = new SoundEngine();
