let delayShower = document.querySelector(".delay_shower_box");

const boy = document.querySelector(".running_boy");
const platform = document.querySelector(".running_platform");
let boyX = 0;
let boyY = 0;
const keysPressed = {};

let heartsOnPlatform = 0;

let storeOpened = false;
let currentBalance = 0;
let delayRate = 20;
let step = 1; // speed of boy
let backpackSize = 20;
let magnetRadius = 0;
let luckyHeart = 0;
let heartMultiplier = 0;

// pricing start

const speedPriceTo2 = 3;
const speedPriceTo3 = 6;
const speedPriceTo4 = 9;
const speedPriceTo5 = 12;
const speedPriceTo6 = 15;

const backpackPriceTo40 = 10;
const backpackPriceTo60 = 30;
const backpackPriceTo80 = 50;
const backpackPriceTo100 = 70;
const backpackPriceTo120 = 90;

const magnetPriceTo20 = 20;
const magnetPriceTo40 = 40;
const magnetPriceTo60 = 60;

const luckPriceTo1 = 30;
const luckPriceTo2 = 60;
const luckPriceTo3 = 90;

const multiplierPriceTo1 = 10;
const multiplierPriceTo2 = 20;
const multiplierPriceTo3 = 30;
const multiplierPriceTo4 = 40;
const multiplierPriceTo5 = 50;

// pricing end

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
    if (storeOpened == false) {
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
    }


    // Update boy's position
    boy.style.left = `${boyX}px`;
    boy.style.bottom = `${boyY}px`;

    // Check collision with each heart
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach((heart) => {
        if (checkCollision(boy, heart)) {
            platform.removeChild(heart);

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
    const heartSize = 30;
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
    currentBalance++;
    document.querySelector(".balance_shower").innerHTML = currentBalance;
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

function storeCancel() {
    storeOpened = false;

    document.querySelector(".speed_button_id").style.display = "none";
    document.querySelector(".backpack_button_id").style.display = "none";
    document.querySelector(".magnet_button_id").style.display = "none";
    document.querySelector(".lucky_button_id").style.display = "none";
    document.querySelector(".multiplier_button_id").style.display = "none";
    document.querySelector(".store_popup_backer_screen").style.display = "none";
}

function openSpeedStore() {
    storeOpened = true;

    document.querySelector(".store_popup_backer_screen").style.display = "flex";
    document.querySelector(".speed_button_id").style.display = "flex";
    document.querySelector(".store_popup_offer_text").innerHTML = "Do you want to upgrade goblin's speed?";
    document.querySelector(".current_rate_backer_up").innerHTML = "Current speed";
    document.querySelector(".new_rate_backer_up").innerHTML = "New speed";

    if (step < 6) {
        document.querySelector(".current_rate_shower_for_upgrade").innerHTML = step;
        document.querySelector(".new_rate_shower_after_upgrade").innerHTML = step + 1;
    } else if (step = 6) {
        document.querySelector(".current_rate_shower_for_upgrade").innerHTML = step;
        document.querySelector(".new_rate_shower_after_upgrade").innerHTML = "MAX";
        document.querySelector(".upgrade_cost_backer").style.display = "none";
    }

    if (step == 1) {
        document.querySelector(".upgrade_actual_cost_shower").innerHTML = speedPriceTo2;
    } else if (step == 2) {
        document.querySelector(".upgrade_actual_cost_shower").innerHTML = speedPriceTo3;
    } else if (step == 3) {
        document.querySelector(".upgrade_actual_cost_shower").innerHTML = speedPriceTo4;
    } else if (step == 4) {
        document.querySelector(".upgrade_actual_cost_shower").innerHTML = speedPriceTo5;
    } else if (step == 5) {
        document.querySelector(".upgrade_actual_cost_shower").innerHTML = speedPriceTo6;
    }
}
function speedConfirm() {
    if (step == 1 && currentBalance >= speedPriceTo2) {
        step++
        document.querySelector(".speed_shower_box").innerHTML = step;
        currentBalance -= speedPriceTo2;
        storeCancel();
    } else if (step == 2 && currentBalance >= speedPriceTo3) {
        step++
        document.querySelector(".speed_shower_box").innerHTML = step;
        currentBalance -= speedPriceTo3;
        storeCancel();
    } else if (step == 3 && currentBalance >= speedPriceTo4) {
        step++
        document.querySelector(".speed_shower_box").innerHTML = step;
        currentBalance -= speedPriceTo4;
        storeCancel();
    } else if (step == 4 && currentBalance >= speedPriceTo5) {
        step++
        document.querySelector(".speed_shower_box").innerHTML = step;
        currentBalance -= speedPriceTo5;
        storeCancel();
    } else if (step == 5 && currentBalance >= speedPriceTo6) {
        step++
        document.querySelector(".speed_shower_box").innerHTML = step;
        currentBalance -= speedPriceTo6;
        storeCancel();
    }
    document.querySelector(".balance_shower").innerHTML = currentBalance;
}

function openMultiplierStore() {
    storeOpened = true;

    document.querySelector(".store_popup_backer_screen").style.display = "flex";
    document.querySelector(".multiplier_button_id").style.display = "flex";
    document.querySelector(".store_popup_offer_text").innerHTML = "Do you want to upgrade multiplication rate?";
    document.querySelector(".current_rate_backer_up").innerHTML = "Current rate";
    document.querySelector(".new_rate_backer_up").innerHTML = "New rate";

    if (heartMultiplier < 5) {
        document.querySelector(".current_rate_shower_for_upgrade").innerHTML = heartMultiplier;
        document.querySelector(".new_rate_shower_after_upgrade").innerHTML = heartMultiplier + 1;
    } else if (step = 5) {
        document.querySelector(".current_rate_shower_for_upgrade").innerHTML = heartMultiplier;
        document.querySelector(".new_rate_shower_after_upgrade").innerHTML = "MAX";
        document.querySelector(".upgrade_cost_backer").style.display = "none";
    }

    if (heartMultiplier == 0) {
        document.querySelector(".upgrade_actual_cost_shower").innerHTML = multiplierPriceTo1;
    } else if (heartMultiplier == 1) {
        document.querySelector(".upgrade_actual_cost_shower").innerHTML = multiplierPriceTo2;
    } else if (heartMultiplier == 2) {
        document.querySelector(".upgrade_actual_cost_shower").innerHTML = multiplierPriceTo3;
    } else if (heartMultiplier == 3) {
        document.querySelector(".upgrade_actual_cost_shower").innerHTML = multiplierPriceTo4;
    } else if (heartMultiplier == 4) {
        document.querySelector(".upgrade_actual_cost_shower").innerHTML = multiplierPriceTo5;
    }
}
function multipleConfirm() {
    if (heartMultiplier == 0 && currentBalance >= multiplierPriceTo1) {
        heartMultiplier++;
        document.querySelector(".multiply_shower_box").innerHTML = heartMultiplier;
        currentBalance -= multiplierPriceTo1;
        storeCancel();
    } else if (heartMultiplier == 1 && currentBalance >= multiplierPriceTo2) {
        heartMultiplier++;
        document.querySelector(".multiply_shower_box").innerHTML = heartMultiplier;
        currentBalance -= multiplierPriceTo2;
        storeCancel();
    } else if (heartMultiplier == 2 && currentBalance >= multiplierPriceTo3) {
        heartMultiplier++;
        document.querySelector(".multiply_shower_box").innerHTML = heartMultiplier;
        currentBalance -= multiplierPriceTo3;
        storeCancel();
    } else if (heartMultiplier == 3 && currentBalance >= multiplierPriceTo4) {
        heartMultiplier++;
        document.querySelector(".multiply_shower_box").innerHTML = heartMultiplier;
        currentBalance -= multiplierPriceTo4;
        storeCancel();
    } else if (heartMultiplier == 4 && currentBalance >= multiplierPriceTo5) {
        heartMultiplier++;
        document.querySelector(".multiply_shower_box").innerHTML = heartMultiplier;
        currentBalance -= multiplierPriceTo5;
        storeCancel();
    }
    document.querySelector(".balance_shower").innerHTML = currentBalance;
}

function openMagnetStore() {
    storeOpened = true;

    document.querySelector(".store_popup_backer_screen").style.display = "flex";
    document.querySelector(".magnet_button_id").style.display = "flex";
    document.querySelector(".store_popup_offer_text").innerHTML = "Do you want to upgrade goblin's magnet radius?";
    document.querySelector(".current_rate_backer_up").innerHTML = "Current radius";
    document.querySelector(".new_rate_backer_up").innerHTML = "New radius";

    if (magnetRadius < 60) {
        document.querySelector(".current_rate_shower_for_upgrade").innerHTML = magnetRadius;
        document.querySelector(".new_rate_shower_after_upgrade").innerHTML = magnetRadius + 20;
    } else if (magnetRadius == 60) {
        document.querySelector(".current_rate_shower_for_upgrade").innerHTML = magnetRadius;
        document.querySelector(".new_rate_shower_after_upgrade").innerHTML = "MAX";
        document.querySelector(".upgrade_cost_backer").style.display = "none";
    }

    if (magnetRadius == 0) {
        document.querySelector(".upgrade_actual_cost_shower").innerHTML = magnetPriceTo20;
    } else if (magnetRadius == 20) {
        document.querySelector(".upgrade_actual_cost_shower").innerHTML = magnetPriceTo40;
    } else if (magnetRadius == 40) {
        document.querySelector(".upgrade_actual_cost_shower").innerHTML = magnetPriceTo60;
    }
}
function magnetConfirm() {
    if (magnetRadius == 0 && currentBalance >= magnetPriceTo20) {
        magnetRadius += 20;
        currentBalance -= magnetPriceTo20;
        document.querySelector(".running_boy").style.width = "50px";
        document.querySelector(".running_boy").style.height = "50px";
        document.querySelector(".magnet_shower_box").innerHTML = magnetRadius;
        storeCancel();
    } else if (magnetRadius == 20 && currentBalance >= magnetPriceTo40) {
        magnetRadius += 20;
        currentBalance -= magnetPriceTo40;
        document.querySelector(".running_boy").style.width = "60px";
        document.querySelector(".running_boy").style.height = "60px";
        document.querySelector(".magnet_shower_box").innerHTML = magnetRadius;
        storeCancel();
    } else if (magnetRadius == 40 && currentBalance >= magnetPriceTo60) {
        magnetRadius += 20;
        currentBalance -= magnetPriceTo60;
        document.querySelector(".running_boy").style.width = "70px";
        document.querySelector(".running_boy").style.height = "70px";
        document.querySelector(".magnet_shower_box").innerHTML = magnetRadius;
        storeCancel();
    }
}