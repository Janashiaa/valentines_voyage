const boy = document.querySelector(".running_boy");
const platform = document.querySelector(".running_platform");
let boyX = 0; // Initial X position
let boyY = 0; // Initial Y position
const step = 10; // Number of pixels to move per step
const keysPressed = {};

const moveBoy = () => {
    const platformRect = platform.getBoundingClientRect();
    const boyRect = boy.getBoundingClientRect();

    if (keysPressed["ArrowUp"] && boyY < platformRect.height - boyRect.height) {
        boyY += step;
    }
    if (keysPressed["ArrowDown"] && boyY > 0) {
        boyY -= step;
    }
    if (keysPressed["ArrowLeft"] && boyX > 0) {
        boyX -= step;
    }
    if (keysPressed["ArrowRight"] && boyX < platformRect.width - boyRect.width) {
        boyX += step;
    }

    boy.style.left = `${boyX}px`;
    boy.style.bottom = `${boyY}px`;
};

window.addEventListener("keydown", (event) => {
    keysPressed[event.key] = true;
    moveBoy();
});

window.addEventListener("keyup", (event) => {
    keysPressed[event.key] = false;
});
