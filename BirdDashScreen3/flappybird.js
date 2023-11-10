//board
let board;
let boardWidth = 430;
let boardHeight = 932;
let context;

//bird
let birdWidth = 68; //width/height ratio = 408/228 = 17/12
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

//pipes
let pipeArray = [];
let pipeWidth = 64; //width/height ratio = 384/3072 = 1/8
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

//physics
let velocityX = -4; //pipes moving left speed
let velocityY = 0; //bird jump speed
let gravity = 0.4;

let gameOver = false;
let score = 0;
let currentLevel = 0;

// Define the levels with their corresponding parameters
const levels = [
    { velocityX: -4, pipeDelay: 1500 }, // Level 1
    { velocityX: -4, pipeDelay: 1200 }, // Level 2
    { velocityX: -7, pipeDelay: 50 }  // Level 3
];

// Function to initialize the game with the specified level parameters
function initializeGame(level) {
    // Set the current level
    currentLevel = level;

    // Set velocityX and pipe delay based on the selected level
    velocityX = levels[level].velocityX;

    // Clear existing pipes
    pipeArray = [];

    // Reset the game state
    score = 0;
    gameOver = false;

    // Start placing pipes
    setInterval(placePipes, levels[level].pipeDelay);
}

window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing on the board

    //load images
    birdImg = new Image();
    birdImg.src = "./chuckbird.png";
    birdImg.onload = function () {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }

    topPipeImg = new Image();
    topPipeImg.src = "./toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./bottompipe.png";

    requestAnimationFrame(update);
    document.addEventListener("keydown", moveBird);

    // Initialize the game with the default level
    initializeGame(currentLevel);
}

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        const currentHighScore = localStorage.getItem("highestScore") || 0;

        // Compare the current score with the high score
        if (score > currentHighScore) {
            // Update the high score in localStorage
            localStorage.setItem("highestScore", score);
        }

        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    //bird
    velocityY += gravity;
    bird.y = Math.max(bird.y + velocityY, 0);
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    if (bird.y > board.height) {
        gameOver = true;
    }

    //pipes
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if (!pipe.passed && bird.x > pipe.x + pipe.width) {
            score += 0.5; // Update the global score variable
            pipe.passed = true;

            // Update the localStorage when the score changes
            localStorage.setItem("score", score);
        }

        if (detectCollision(bird, pipe)) {
            gameOver = true;
            const savedScore = localStorage.getItem("score");
            // You can use savedScore if needed
        }
    }

    //clear pipes
    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
        pipeArray.shift();
    }

    //score
    context.fillStyle = "white";
    context.font = "45px sans-serif";
    context.fillText(score, 5, 45);

    if (gameOver) {
        // Redirect to another page
        window.location.href = "http://127.0.0.1:5500/Bird%20Dash%20LP/Bird-Dash-PT/Bird%20Dash%20Screen4/index.html";
    }
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
// Get the audio element
const backgroundMusic = document.getElementById("backgroundMusic");

// Play the audio
backgroundMusic.play();

// Pause the audio
backgroundMusic.pause();

// Set the volume (0.0 to 1.0)
backgroundMusic.volume = 0.5;
