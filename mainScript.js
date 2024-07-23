let delayShower = document.querySelector(".delay_shower_box");

const boy = document.querySelector(".running_boy");
const platform = document.querySelector(".running_platform");
let boyX = 0;
let boyY = 0;
const keysPressed = {};

let heartsOnPlatform = 0;

let shownBalance = document.querySelector(".balance_shower");
let delayRate = 20;
let step = 1; // speed of boy
let backpackSize = 20;
let magnetRadius = 0;
let luckyHeart = 0;
let heartMultiplier = 0;

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
    shownBalance.innerHTML++;
}

function checkToMultiply() {
    if (heartMultiplier === 1 && heartsOnPlatform < 10) {
        createHeart();
    } else if (heartMultiplier === 2 && heartsOnPlatform < 20) {
        createHeart();
    } else if (heartMultiplier === 3 && heartsOnPlatform < 30) {
        createHeart();
    } else if (heartMultiplier === 4 && heartsOnPlatform < 40) {
        createHeart();
    } else if (heartMultiplier === 5 && heartsOnPlatform < 50) {
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
    } else if (step == 6) {
        document.querySelector(".speed_upgrade_cost_shower").style.display = "none";
    }
}
function speedUpgradeCancel() {
    document.querySelector(".speed_store_popup_backer").style.display = "none";
}
function speedUpgradeConfirm() {
    let currentBalance = parseInt(shownBalance.innerHTML);

    if (step == 1 && currentBalance >= 3) {
        step++;
        currentBalance -= 3;

        shownBalance.innerHTML = currentBalance;
        speedUpgradeCancel();
        document.querySelector(".speed_shower_box").innerHTML = "2";
    } else if (step == 2 && currentBalance >= 6) {
        step++;
        currentBalance -= 6;

        shownBalance.innerHTML = currentBalance;
        speedUpgradeCancel();
        document.querySelector(".speed_shower_box").innerHTML = "3";
    } else if (step == 3 && currentBalance >= 9) {
        step++;
        currentBalance -= 9;

        shownBalance.innerHTML = currentBalance;
        speedUpgradeCancel();
        document.querySelector(".speed_shower_box").innerHTML = "4";
    } else if (step == 4 && currentBalance >= 12) {
        step++;
        currentBalance -= 12;

        shownBalance.innerHTML = currentBalance;
        speedUpgradeCancel();
        document.querySelector(".speed_shower_box").innerHTML = "5";
    } else if (step == 5 && currentBalance >= 15) {
        step++;
        currentBalance -= 15;

        shownBalance.innerHTML = currentBalance;
        speedUpgradeCancel();
        document.querySelector(".speed_shower_box").innerHTML = "6";
    }
    // Repeat similar checks and updates for other speed levels if needed
}


function multipleStore() {
    document.querySelector(".multiple_store_popup_backer").style.display = "flex";

    if (heartMultiplier < 5) {
        document.querySelector(".current_multiple_shower_for_upgrade").innerHTML = heartMultiplier;
        document.querySelector(".new_multiple_shower_after_upgrade").innerHTML = heartMultiplier + 1;
    } else if (heartMultiplier === 5) {
        document.querySelector(".current_multiple_shower_for_upgrade").innerHTML = heartMultiplier;
        document.querySelector(".new_multiple_shower_after_upgrade").innerHTML = "MAX";
    }

    if (heartMultiplier === 0) {
        document.querySelector(".multiple_upgrade_actual_cost").innerHTML = "10";
    } else if (heartMultiplier === 1) {
        document.querySelector(".multiple_upgrade_actual_cost").innerHTML = "20";
    } else if (heartMultiplier === 2) {
        document.querySelector(".multiple_upgrade_actual_cost").innerHTML = "30";
    } else if (heartMultiplier === 3) {
        document.querySelector(".multiple_upgrade_actual_cost").innerHTML = "40";
    } else if (heartMultiplier === 4) {
        document.querySelector(".multiple_upgrade_actual_cost").innerHTML = "50";
    } else if (heartMultiplier === 5) {
        document.querySelector(".multiple_upgrade_cost_shower").style.display = "none";
    }
}
function multipleUpgradeCancel() {
    document.querySelector(".multiple_store_popup_backer").style.display = "none";
}
function multipleUpgradeConfirm() {
    let currentBalance = parseInt(shownBalance.innerHTML);

    if (heartMultiplier === 0 && currentBalance >= 10) {
        heartMultiplier++;
        currentBalance -= 10;

        shownBalance.innerHTML = currentBalance;
        document.querySelector(".multiply_shower_box").innerHTML = heartMultiplier;
        multipleUpgradeCancel();
    } else if (heartMultiplier === 1 && currentBalance >= 20) {
        heartMultiplier++;
        currentBalance -= 20;

        shownBalance.innerHTML = currentBalance;
        document.querySelector(".multiply_shower_box").innerHTML = heartMultiplier;
        multipleUpgradeCancel();
    } else if (heartMultiplier === 2 && currentBalance >= 30) {
        heartMultiplier++;
        currentBalance -= 30;

        shownBalance.innerHTML = currentBalance;
        document.querySelector(".multiply_shower_box").innerHTML = heartMultiplier;
        multipleUpgradeCancel();
    } else if (heartMultiplier === 3 && currentBalance >= 40) {
        heartMultiplier++;
        currentBalance -= 40;

        shownBalance.innerHTML = currentBalance;
        document.querySelector(".multiply_shower_box").innerHTML = heartMultiplier;
        multipleUpgradeCancel();
    } else if (heartMultiplier === 4 && currentBalance >= 50) {
        heartMultiplier++;
        currentBalance -= 50;

        shownBalance.innerHTML = currentBalance;
        document.querySelector(".multiply_shower_box").innerHTML = heartMultiplier;
        multipleUpgradeCancel();
    }
}
