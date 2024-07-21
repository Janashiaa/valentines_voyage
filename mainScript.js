let delayShower = document.querySelector(".delay_shower_box");

const boy = document.querySelector(".running_boy");
const platform = document.querySelector(".running_platform");
let boyX = 0;
let boyY = 0;
const keysPressed = {};

let heartsOnPlatform = 0;

const currentBalance = document.querySelector(".balance_shower").innerHTML;
const delayRate = 20;
const step = 3; // speed of boy
const backpackSize = 20;
const magnetRadius = 0;
const luckyHeart = 0;
const heartMultiplier = 0;

function initiateStart() {
    document.querySelector(".start_button").style.display = "none";
    heartsOnPlatform = 0;
    createHeart();

    // let delayShower = document.querySelector(".delay_shower_box");
    let speedShower = document.querySelector(".speed_shower_box");
    let backpackShower = document.querySelector(".backpack_shower_box");

    let radiusShower = document.querySelector(".magnet_shower_box");
    let luckShower = document.querySelector(".luck_shower_box");
    let multiplicationShower = document.querySelector(".multiply_shower_box");

    // delayShower.innerHTML = delayRate + "s";
    speedShower.innerHTML = step;
    backpackShower.innerHTML = backpackSize;
    radiusShower.innerHTML = magnetRadius;
    luckShower.innerHTML = luckyHeart + "%";
    multiplicationShower.innerHTML = heartMultiplier;
}

const moveBoy = () => {
    if ((keysPressed["ArrowDown"] || keysPressed["KeyS"]) && boyY > 0) {
        boyY -= step;
    }
    if ((keysPressed["ArrowUp"] || keysPressed["KeyW"]) && boyY < platform.offsetHeight - boy.offsetHeight) {
        boyY += step;
    }
    if ((keysPressed["ArrowLeft"] || keysPressed["KeyA"]) && boyX > 0) {
        boyX -= step;
    }
    if ((keysPressed["ArrowRight"] || keysPressed["KeyD"]) && boyX < platform.offsetWidth - boy.offsetWidth) {
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
            // createHeart();

            // Add score or other actions on collision
            heartsOnPlatform--;
            delayShower.innerHTML = heartsOnPlatform;
            createHeart();

            addToBalance();
            checkToMultiply();
        }
    });

    requestId = requestAnimationFrame(moveBoy);
};

window.addEventListener("keydown", (event) => {
    keysPressed[event.code] = true;
    if (requestId === null) {
        requestId = requestAnimationFrame(moveBoy);
    }
});

window.addEventListener("keyup", (event) => {
    keysPressed[event.code] = false;
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
    const heartSize = 30; // Assuming heart is 20x20 pixels
    const maxLeft = platform.offsetWidth - heartSize;
    const maxTop = platform.offsetHeight - heartSize;
    heart.style.left = `${Math.random() * maxLeft}px`;
    heart.style.top = `${Math.random() * maxTop}px`;
    platform.appendChild(heart);
    heartsOnPlatform++;
    delayShower.innerHTML = heartsOnPlatform;
};

let requestId = requestAnimationFrame(moveBoy);

function addToBalance() {
    let shownBalance = document.querySelector(".balance_shower");

    shownBalance.innerHTML++;
}

function checkToMultiply() {
    if (heartMultiplier === 1 && heartsOnPlatform < 10) {
        createHeart();
    } else if (heartMultiplier === 2 && heartsOnPlatform < 20) {
        createHeart();
    } else if (heartMultiplier === 3 && heartsOnPlatform < 30) {
        createHeart();
    }
}

function speedStore() {
    document.querySelector(".speed_store_popup_backer").style.display = "flex";

    if (step == 6) {
        document.querySelector(".current_speed_shower_for_upgrade").innerHTML = step;
        document.querySelector(".new_speed_shower_after_upgrade").innerHTML = "MAX";
    } else if (step < 6) {
        document.querySelector(".current_speed_shower_for_upgrade").innerHTML = step;
        document.querySelector(".new_speed_shower_after_upgrade").innerHTML = step + 1;
    }

    if (step == 1) {
        document.querySelector(".speed_upgrade_actual_cost").innerHTML = "3";
    } else if (step == 2) {
        document.querySelector(".speed_upgrade_actual_cost").innerHTML = "6";
    } else if (step == 3) {
        document.querySelector(".speed_upgrade_actual_cost").innerHTML = "9";
    } else if (step == 4) {
        document.querySelector(".speed_upgrade_actual_cost").innerHTML = "12";
    } else if (step == 5) {
        document.querySelector(".speed_upgrade_actual_cost").innerHTML = "15";
    }
}
function speedUpgradeCancel() {
    document.querySelector(".speed_store_popup_backer").style.display = "none";
}