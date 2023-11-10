let board;
let boardWidth = 430;
let boardHeight = 932;
let context;

let birdWidth = 68;
let birdHeight = 56;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdImg;

let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight
}

let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

let velocityX = -4;
let velocityY = 0;
let gravity = 0.4;

let gameOver = false;
let score = 0;
let currentLevel = 0;

const levels = [
    { velocityX: -4, pipeDelay: 2000 },
    { velocityX: -4, pipeDelay: 1500 },
    { velocityX: -7, pipeDelay: 1000 }
];

function initializeGame(level) {
    currentLevel = level;
    velocityX = levels[level].velocityX;
    pipeArray = [];
    score = 0;
    gameOver = false;
    setInterval(placePipes, levels[level].pipeDelay);
    setInterval(update, 1000 / 60);  // Call update function regularly
}

window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    birdImg = new Image();
    birdImg.src = "./chuckbird.png";
    birdImg.onload = function () {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
        initializeGame(currentLevel);
    }

    topPipeImg = new Image();
    topPipeImg.src = "./toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./bottompipe.png";

    requestAnimationFrame(update);
    document.addEventListener("keydown", moveBird);
}

function update() {
    if (gameOver) {
        const currentHighScore = localStorage.getItem("highestScore") || 0;
        if (score > currentHighScore) {
            localStorage.setItem("highestScore", score);
        }
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    velocityY += gravity;
    bird.y = Math.max(bird.y + velocityY, 0);
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    if (bird.y > board.height) {
        gameOver = true;
    }

    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if (!pipe.passed && bird.x > pipe.x + pipe.width) {
            score += 0.5;
            pipe.passed = true;
            localStorage.setItem("score", score);
        }

        if (detectCollision(bird, pipe)) {
            gameOver = true;
            const savedScore = localStorage.getItem("score");
        }
    }

    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
        pipeArray.shift();
    }

    context.fillStyle = "white";
    context.font = "45px sans-serif";
    context.fillText(score, 5, 45);

    if (gameOver) {
        window.location.href = "http://127.0.0.1:5500/Bird%20Dash%20LP/Bird-Dash-PT/Bird%20Dash%20Screen4/index.html";
    }

    requestAnimationFrame(update);
}

function placePipes() {
    if (gameOver) {
        return;
    }

    let randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
    let openingSpace = board.height / 4;

    let topPipe = {
        img: topPipeImg,
        x: pipeX,
        y: randomPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    };
    pipeArray.push(topPipe);

    let bottomPipe = {
        img: bottomPipeImg,
        x: pipeX,
        y: randomPipeY + pipeHeight + openingSpace,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    };
    pipeArray.push(bottomPipe);
}

function moveBird(e) {
    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "Keyw") {
        velocityY = -6;

        if (gameOver) {
            bird.y = birdY;
            pipeArray = [];
            score = 0;
            gameOver = false;
        }
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}

const backgroundMusic = document.getElementById("backgroundMusic");
backgroundMusic.play();
backgroundMusic.pause();
