// Function to store player name in local storage
function storePlayerName() {
    const playerNameInput = document.getElementById("playername");
    const playerName = playerNameInput.value;

    if (playerName) {
        localStorage.setItem("playerName", playerName);
    }
}

let selectedLevel = "Beginner"; // Default level

function handleLevelClick(level) {

    const levelButtons = document.querySelectorAll(".level-button");
    levelButtons.forEach((button) => button.classList.remove("highlight"));


    level.classList.add("highlight");

 
    selectedLevel = level.querySelector("button").getAttribute("data-level");
}

function navigateToGamePage() {
    // console.log("HI");
    const playerName = localStorage.getItem("playerName");
    if (!playerName) {
        alert("Please enter your name first.");
        return;
    }
    
    
    window.location.href = "./../BirdDashScreen3/flappybird.html";
}
document.getElementById("start-button").addEventListener("click", navigateToGamePage);

document.getElementById("playername").addEventListener("blur", storePlayerName);

const levelButtons = document.querySelectorAll(".level-button");
levelButtons.forEach((button) => {
    button.addEventListener("click", function () {
        handleLevelClick(button);
    });
});


