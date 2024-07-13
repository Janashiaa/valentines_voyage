const boy = document.querySelector(".running_boy");
const platform = document.querySelector(".running_platform");
let boyX = 0;
let boyY = 0;
const step = 5; // speed of boy
const keysPressed = {};

function initiateStart() {
    document.querySelector(".start_button").style.display = "none";
    createHeart();
}

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

    // Update boy's position
    boy.style.left = `${boyX}px`;
    boy.style.bottom = `${boyY}px`;

    // Check collision with each heart
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach((heart) => {
        if (checkCollision(boy, heart)) {
            platform.removeChild(heart);
            createHeart();
            // Add score or other actions on collision
        }
    });

    requestId = requestAnimationFrame(moveBoy);
};

window.addEventListener("keydown", (event) => {
    keysPressed[event.key] = true;
    if (requestId === null) {
        requestId = requestAnimationFrame(moveBoy);
    }
});

window.addEventListener("keyup", (event) => {
    keysPressed[event.key] = false;
});

const checkCollision = (boy, heart) => {
    const boyRect = boy.getBoundingClientRect();
    const heartRect = heart.getBoundingClientRect();

    return !(
        boyRect.right < heartRect.left ||
        boyRect.left > heartRect.right ||
        boyRect.bottom < heartRect.top ||
        boyRect.top > heartRect.bottom
    );
};

const createHeart = () => {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = `${Math.random() * (platform.offsetWidth - 20)}px`;
    heart.style.top = `${Math.random() * (platform.offsetHeight - 20)}px`;
    platform.appendChild(heart);
};

let requestId = requestAnimationFrame(moveBoy);
