// Function to store player name in local storage
function storePlayerName() {
    const playerNameInput = document.getElementById("playername");
    const playerName = playerNameInput.value;

    if (playerName) {
        localStorage.setItem("playerName", playerName);
    }
}

// Function to handle level button clicks
let selectedLevel = "Beginner"; // Default level

function handleLevelClick(level) {
    // Remove any previous highlighting
    const levelButtons = document.querySelectorAll(".level-button");
    levelButtons.forEach((button) => button.classList.remove("highlight"));

    // Highlight the clicked button
    level.classList.add("highlight");

    // Store the selected level in the variable
    selectedLevel = level.querySelector("button").getAttribute("data-level");
}

function navigateToGamePage() {
    const playerName = localStorage.getItem("playerName");
    if (!playerName) {
        alert("Please enter your name first.");
        return;
    }

    // Use the selectedLevel variable to pass the level information
    window.location.href = `http://127.0.0.1:5500/Flappy%20bird%20boilerplate!!/flappy-bird/index.html?playerName=${playerName}&level=${selectedLevel}`;
}

// Event listeners
document.getElementById("playername").addEventListener("blur", storePlayerName);

const levelButtons = document.querySelectorAll(".level-button");
levelButtons.forEach((button) => {
    button.addEventListener("click", function () {
        handleLevelClick(button);
    });
});

document.getElementById("start-button").addEventListener("click", navigateToGamePage);

