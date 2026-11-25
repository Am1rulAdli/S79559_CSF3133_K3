// Game state variables
let gameStarted = false;
let wins = 0;
let losses = 0;
let draws = 0;
let roundNumber = 0;
let results = [];

// Starts the game after validating the player's name
function startGame() {
    let name = document.getElementById("playerName").value.trim();

    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    document.getElementById("welcomeMsg").innerHTML = "Welcome, " + name + "!";
    document.getElementById("startTime").innerHTML = "Game started on: " + Date();
    gameStarted = true;
}

// Returns a random choice for the computer
function getComputerChoice() {
    let choices = ["rock", "paper", "scissors"];
    let randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Plays one round against the computer
function playRound(playerChoice) {
    if (!gameStarted) {
        alert("Click Start Game first.");
        return;
    }

    let computerChoice = getComputerChoice();
    let roundResult = "";
    let resultEl = document.getElementById("result");

    // Update both choice images
    document.getElementById("playerImg").src = playerChoice + ".png";
    document.getElementById("computerImg").src = computerChoice + ".png";

    // Decide the winner
    if (playerChoice === computerChoice) {
        roundResult = "Draw";
        draws++;
        resultEl.innerHTML = "It's a Draw! Both chose " + playerChoice + ".";
        resultEl.style.color = "grey";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {
        roundResult = "Win";
        wins++;
        resultEl.innerHTML = "You Win! " + playerChoice + " beats " + computerChoice + ".";
        resultEl.style.color = "green";
    } else {
        roundResult = "Lose";
        losses++;
        resultEl.innerHTML = "You Lose! " + computerChoice + " beats " + playerChoice + ".";
        resultEl.style.color = "red";
    }

    // Update scoreboard and store result
    roundNumber++;
    results.push(roundResult);
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;

    // Add a new row to the history table
    document.getElementById("history").innerHTML +=
        "<tr><td>" + roundNumber + "</td><td>" + playerChoice + "</td><td>" +
        computerChoice + "</td><td>" + roundResult + "</td></tr>";
}

// Counts total wins with a for loop and displays the summary
function showSummary() {
    if (results.length === 0) {
        document.getElementById("summary").innerHTML = "You have not played any rounds yet.";
        return;
    }

    let winCount = 0;
    for (let i = 0; i < results.length; i++) {
        if (results[i] === "Win") {
            winCount++;
        }
    }

    let winPercentage = Math.round((winCount / results.length) * 100);
    document.getElementById("summary").innerHTML =
        "You played " + results.length + " rounds and won " + winPercentage + "%";
}

// Resets scores, results array, history table, and messages
function resetGame() {
    wins = 0;
    losses = 0;
    draws = 0;
    roundNumber = 0;
    results = [];

    document.getElementById("wins").innerHTML = 0;
    document.getElementById("losses").innerHTML = 0;
    document.getElementById("draws").innerHTML = 0;
    document.getElementById("result").innerHTML = "";
    document.getElementById("summary").innerHTML = "";

    // Reset history table back to header row only
    document.getElementById("history").innerHTML =
        "<tr><th>Round</th><th>You</th><th>Computer</th><th>Result</th></tr>";
}