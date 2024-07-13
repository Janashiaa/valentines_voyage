const boy = document.querySelector(".running_boy");
const platform = document.querySelector(".running_platform");
let boyX = 0; // X 
let boyY = 0; // Y 
const step = 2; // character speed
const keysPressed = {};

const moveBoy = () => {
    if (keysPressed["ArrowUp"] && boyY < platform.offsetHeight - boy.offsetHeight) {
        boyY += step;
    }
    if (keysPressed["ArrowDown"] && boyY > 0) {
        boyY -= step;
    }
    if (keysPressed["ArrowLeft"] && boyX > 0) {
        boyX -= step;
    }
    if (keysPressed["ArrowRight"] && boyX < platform.offsetWidth - boy.offsetWidth) {
        boyX += step;
    }

    boy.style.left = `${boyX}px`;
    boy.style.bottom = `${boyY}px`;

    requestAnimationFrame(moveBoy);
};

window.addEventListener("keydown", (event) => {
    keysPressed[event.key] = true;
    if (!requestId) {
        requestId = requestAnimationFrame(moveBoy);
    }
});

window.addEventListener("keyup", (event) => {
    keysPressed[event.key] = false;
});

let requestId = requestAnimationFrame(moveBoy);