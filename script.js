const biosText = [
    "YukiToTama Systems Inc.",
    "BIOS Version 1.10.31",
    "Copyright (C) 2025 YUKIDAMA",
    "",
    "Detecting IDE drives...",
    "Primary Master: YK1000VX-18TB",
    "Primary Slave: None",
    "Secondary Master: None",
    "Secondary Slave: None",
    "",
    "Initializing USB Controllers...",
    "Done."
];

const output = document.getElementById('output');
const prompt = document.getElementById('prompt');
const biosScreen = document.getElementById('biosScreen');
const profileScreen = document.getElementById('profileScreen');

let currentLine = 0;
let hasEntered = false;
const bgm = new Audio('bgm.mp3');
let blinkInterval;

const isMobile = /iPhone|iPad|Android/.test(navigator.userAgent);

function typeLine() {
    if (currentLine < biosText.length) {
        output.textContent += biosText[currentLine] + "\n";
        currentLine++;
        setTimeout(typeLine, 500);
    } else {
        showPrompt();
    }
}

function showPrompt() {
    prompt.style.visibility = 'visible';
    startBlinking();
}

function startBlinking() {
    let visible = true;
    blinkInterval = setInterval(() => {
        visible = !visible;
        prompt.style.visibility = visible ? 'visible' : 'hidden';
    }, 500);
}

function stopBlinking() {
    clearInterval(blinkInterval);
    prompt.style.visibility = 'visible';
}

document.addEventListener('keydown', (e) => {
    if (!isMobile && (e.key === 'Enter' || e.key === 'Delete') && !hasEntered) {
        handleInput();
    }
});

if (isMobile) {
    document.addEventListener('click', () => {
        handleInput();
    });
}

function showProfile() {
    biosScreen.style.display = 'none';
    profileScreen.style.display = 'flex';

    bgm.loop = false;
    bgm.play().catch(e => console.warn('BGM再生失敗:', e));
}

function hideProfile() {
    profileScreen.style.display = 'none';
    biosScreen.style.display = 'flex';
    hasEntered = false;
    bgm.pause();
    bgm.currentTime = 0;
}

typeLine();
