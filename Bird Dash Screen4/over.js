document.getElementById("restartb").addEventListener("click", function() {
    window.location.href = "http://127.0.0.1:5500/Flappy%20bird%20boilerplate!!/flappy-bird/index.html";
});

document.getElementById("menub").addEventListener("click", function() {
    window.location.href = "http://127.0.0.1:5500/Bird%20Dash%20LP/Bird-Dash-PT/Bird%20Dash%20Screen2/index.html";
});

document.addEventListener("DOMContentLoaded", function() {
    const score = localStorage.getItem("score");
    const player = localStorage.getItem("playerName");
    const hiscore = localStorage.getItem("highestScore");

    const scoreElement = document.getElementById("cscore");
    const playerElement = document.getElementById("playername");
    const hscoreElement = document.getElementById("hscore-container");

    if (scoreElement && score) {
        scoreElement.innerHTML = `<h1>Score: ${score}</h1>`;
    }

    if (playerElement && player) {
        playerElement.innerHTML = `<h1>Player: ${player}</h1>`;
    }

    if (hscoreElement && hiscore) {
        hscoreElement.innerHTML = `<h1>Highest Score: ${hiscore}</h1>`;
    }
});
