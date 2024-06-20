const boy = document.querySelector(".running_boy");
const platform = document.querySelector(".running_platform");
let boyX = 0; // Initial X position
let boyY = 0; // Initial Y position
const step = 2; // Number of pixels to move per frame
const keysPressed = {}; // Object to track pressed keys

// Function to move the boy
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

    requestAnimationFrame(moveBoy); // Request next frame
};

// Event listeners for keydown and keyup
window.addEventListener("keydown", (event) => {
    keysPressed[event.key] = true;
    if (!requestId) {
        requestId = requestAnimationFrame(moveBoy); // Start animation loop
    }
});

window.addEventListener("keyup", (event) => {
    keysPressed[event.key] = false;
});

// Start animation loop initially
let requestId = requestAnimationFrame(moveBoy);
