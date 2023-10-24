let playerDice = 0;
let casinoDice = 0;
let diceImages = [];
let dollars = 500;
let betAmount = 0;
let wins = 0;
let losses = 0;
let ties = 0;
let resultMessage = "";

// Define HTML elements
let dollarsDisplay;
let winsDisplay;
let lossesDisplay;
let tiesDisplay;

// preload images
function preload() {
    for (let i = 1; i <= 6; i++) {
        diceImages[i] = loadImage(`dice${i}.png`);
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    // Create and position "Reset" button
    resetButton = createButton("Reset");
    resetButton.position(width / 2 - 100, height / 1.5 + 30);
    resetButton.mousePressed(resetGame);

    // Create and position "Bet" button
    betButton = createButton("Bet");
    betButton.position(width / 2 + 100, height / 1.5 + 30);
    betButton.mousePressed(placeBet);

    // Create and position HTML elements
    dollarsDisplay = createP("Current dollars: " + dollars);
    dollarsDisplay.position(width / 2 - 20, height - 150);

    winsDisplay = createP("Wins: " + wins);
    winsDisplay.position(width / 2 - 20, height - 130);

    lossesDisplay = createP("Losses: " + losses);
    lossesDisplay.position(width / 2 - 20, height - 110);

    tiesDisplay = createP("Ties: " + ties);
    tiesDisplay.position(width / 2 - 20, height - 90);
}

function draw() {
    background('#b58af2');

    // Display the title
    textSize(48);
    fill('blue');
    textFont('Georgia');
    textAlign(CENTER, CENTER);
    text("P5's Casino", width / 2, 40);

    // Display Instructions
    textSize(22);
    fill(0);
    textFont('Helvetica');
    textAlign(CENTER, CENTER);
    text('Instructions:', width / 2, 95);
    textSize(18);
    text("Click on Bet to wager on the roll.", width / 2, 115);

    // Display "Player" and "Casino" labels
    textSize(24);
    textAlign(CENTER, CENTER);
    text("Player's Roll", width / 4, height / 3.5);
    text("Casino's Roll", (3 * width) / 4, height / 3.5);

    // Draw "Player" and "Casino" box borders
    noFill();
    stroke('black');
    rect(width / 4 - 80, height / 4, 275, 250);
    rect((3 * width) / 4 - 80, height / 4, 275, 250);

    // Display player's dice roll (if 0, the game started or reset, so don't show die)
    if (playerDice) {
        image(diceImages[playerDice], width / 4 - 15, height / 3, 150, 150);
    }

    // Display casino's dice roll (if 0, the game started or reset, so don't show die)
    if (casinoDice) {
        image(diceImages[casinoDice], (3 * width) / 4 - 15, height / 3, 150, 150);
    }

    // Display the result message
    textSize(24);
    stroke('red');
    fill(0);
    textAlign(CENTER, CENTER);
    text(resultMessage, width / 2, height / 1.5);
    noStroke();
}

// if the screen is resized
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    // resize elements after screen changes size
    resetButton.position(width / 2 - 100, height / 1.5 + 30);
    betButton.position(width / 2 + 100, height / 1.5 + 30);
    dollarsDisplay.position(width / 2 - 20, height - 150);
    winsDisplay.position(width / 2 - 20, height - 130);
    lossesDisplay.position(width / 2 - 20, height - 110);
    tiesDisplay.position(width / 2 - 20, height - 90);
}

function rollDice() {
    playerDice = Math.floor(random(1, 7));
    casinoDice = Math.floor(random(1, 7));
}

function resetGame() {
    dollars = 500;
    wins = 0;
    losses = 0;
    ties = 0;
    resultMessage = "";
    playerDice = 0;
    casinoDice = 0;
    updateGameStats();
}

function placeBet() {
    let bet = prompt("Enter your bet (up to your current dollars):", "10");
    bet = parseInt(bet);

    if (isNaN(bet) || bet <= 0 || bet > dollars) {
        alert("Invalid bet. Please enter a valid amount.");
    } else {
        betAmount = bet;
        rollDice();
        determineWinner();
    }
}

function determineWinner() {
    if (playerDice > casinoDice) {
        dollars += betAmount;
        wins++;
        resultMessage = "You won!";
    } else if (playerDice < casinoDice) {
        dollars -= betAmount;
        losses++;
        resultMessage = "You lost.";
    } else {
        ties++;
        resultMessage = "It's a tie.";
    }
    updateGameStats();
}

function updateGameStats() {
    dollarsDisplay.html("Current dollars: " + dollars);
    winsDisplay.html("Wins: " + wins);
    lossesDisplay.html("Losses: " + losses);
    tiesDisplay.html("Ties: " + ties);
}
