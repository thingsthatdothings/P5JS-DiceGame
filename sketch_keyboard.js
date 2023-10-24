let playerDice = 0;
let casinoDice = 0;
let diceImages = [];
let dollars = 500;
let betAmount = 0;
let wins = 0;
let losses = 0;
let ties = 0;
let resultMessage = "";
let isGameDone = false;

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
    text("Hit the c key to roll Casino's die.", width / 2, 115);
    text("Hit the p key to roll your die.", width / 2, 130);
    text("Hit the w to see if you are a winner.", width / 2, 145);

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

function keyTyped() {
    // ensure the user has placed a bet
    if (!betAmount) {
        alert("Enter a Bet to start");
        return;
    }

    if (key === 'c') {
        if (casinoDice) {
            alert("Casino has already rolled")
        } else {
            // Display casino's dice roll
            rollDice('Casino');
        }
    } else if (key === 'p') {
        if (playerDice) {
            alert("Player has already rolled")
        } else {
            // Display player's dice roll
            rollDice('Player');
        }
    } else if (key === 'w') {
        determineWinner();
    }

    // uncomment to prevent any default behavior
    return false;
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

function rollDice(user) {
    if (user == 'Player') {
        playerDice = Math.floor(random(1, 7));

        // Display what was rolled
        resultMessage += 'Player rolled a ' + playerDice + '. ';
    } else if (user == 'Casino') {
        casinoDice = Math.floor(random(1, 7));

        // Display what was rolled
        resultMessage += 'Casino rolled a ' + casinoDice + '. ';
    }
}

function resetGame() {
    dollars = 500;
    wins = 0;
    losses = 0;
    ties = 0;
    resultMessage = "";
    playerDice = 0;
    casinoDice = 0;
    isGameDone = false;
    updateGameStats();
}

function placeBet() {
    // only allow first bet
    if (betAmount && !isGameDone) {
        alert("Player has already place a bet of " + betAmount + " fake dollars");
        return;
    }

    // clear the dice
    playerDice = 0;
    casinoDice = 0;
    resultMessage = "";

    // get user input
    let bet = prompt("Enter your Bet (max current fake dollars):", "10");
    bet = parseInt(bet);

    // check that input is a number, greater than 0, and less than what player has available
    if (isNaN(bet) || bet <= 0 || bet > dollars) {
        alert("Invalid Bet. Please enter a valid amount.");
    } else {
        betAmount = bet;
        isGameDone = false;
    }
}

function determineWinner() {
    // check if dice are 0
    if (playerDice === 0 && casinoDice === 0) {
        alert("Press 'c' to roll Casino dice and 'p' to roll and Player dice")
        return;
    }

    // if 'w' was already hit, tell them what to do
    if (isGameDone) {
        alert('Click Bet or Reset to continue');
        return;
    }

    // ensure both die have been rolled
    if (!playerDice) {
        alert("Press 'p' to roll Player dice")
    } else if (!casinoDice) {
        alert("Press 'c' to roll Casino dice")
    } else {
        // calculate who won
        if (playerDice > casinoDice) {
            dollars += betAmount;
            wins++;
            resultMessage += "Player wins " + betAmount + " fake Dollars!";
        } else if (playerDice < casinoDice) {
            dollars -= betAmount;
            losses++;
            resultMessage += "Player loses " + betAmount + " fake Dollars!";
        } else {
            // on a tie, player wins 1 million fake dollars
            dollars += 1000000;
            ties++;
            resultMessage += "It's a tie! Player wins 1 million fake Dollars!";
        }
        updateGameStats();
        isGameDone = true;
    }
}

function updateGameStats() {
    dollarsDisplay.html("Current fake dollars: " + dollars);
    winsDisplay.html("Wins: " + wins);
    lossesDisplay.html("Losses: " + losses);
    tiesDisplay.html("Ties: " + ties);
}
