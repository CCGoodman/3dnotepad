import { Howl } from 'howler';
// Souls-like ambient sound effects with lower volume and smooth fade
const sounds = {
    click: new Howl({
        src: ['https://cdn.pixabay.com/download/audio/2024/09/22/audio_b6b9a63102.mp3?filename=ui-exit-menu-243462.mp3'],
        volume: 0.1,
        fade: [0, 0.1, 200],
    }),
    hover: new Howl({
        src: ['https://cdn.pixabay.com/download/audio/2024/09/22/audio_e181244136.mp3?filename=ui-authorised-243460.mp3'],
        volume: 0.05,
        fade: [0, 0.05, 150],
    }),
    type: new Howl({
        src: [''],
        volume: 0.03,
        fade: [0, 0.03, 100],
    }),
    save: new Howl({
        src: [''],
        volume: 0.15,
        fade: [0, 0.15, 300],
    }),
    menu: new Howl({
        src: ['https://cdn.pixabay.com/download/audio/2024/04/21/audio_d1911d06da.mp3?filename=click-buttons-ui-menu-sounds-effects-button-5-203599.mp3'],
        volume: 0.15,
        fade: [0, 0.08, 200],
    }),
};
let isSoundEnabled = true;
let typingTimeout;
export function toggleSound(enabled) {
    isSoundEnabled = enabled;
}
export function playSound(soundName) {
    if (!isSoundEnabled)
        return;
    sounds[soundName].play();
}
export function playTypeSound() {
    if (!isSoundEnabled)
        return;
    if (typingTimeout) {
        clearTimeout(typingTimeout);
    }
    typingTimeout = window.setTimeout(() => {
        sounds.type.play();
    }, 50);
}
