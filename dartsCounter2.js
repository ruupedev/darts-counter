let addPlayerBtn = document.getElementById("addPlayerBtn");
let playerListDiv = document.getElementById("playerListDiv");
let headerDiv = document.getElementById("headerDiv");
let playerCount = 0;
let startingPoints = 0;
let playerStats = [];
let points = 0;
let pointsInRound = [];
let activePlayer = 0;
let activeBtnVolume = 0;

addPlayerBtn.addEventListener("click", addPlayer);

function addPlayer() {
    playerCount++;

    // Get player name from input and clear the input
    let playerName = document.getElementById("addPlayerInput").value;
    document.getElementById("addPlayerInput").value = "";

    // Create player object using current startingPoints
    let playerObj = {
        name: playerName,
        score: startingPoints,
        average: 0,
        totalScore: 0,
        roundsPlayed: 0,
        lastThrow: 0
    };

    playerStats.push(playerObj);

    setPlayerStatsGUI();
}

let lavelDiv = document.getElementById("lavelDiv");

function setPlayerStatsGUI() {
    // Clear any existing player list content

    playerListDiv.innerHTML = "";
    lavelDiv.innerHTML = "";

    let nameLabel = document.createElement("span");
    nameLabel.textContent = "Player:";
    nameLabel.className = "nameLabelSpan";
    let scoreLabel = document.createElement("span");
    scoreLabel.textContent = "Score:";
    scoreLabel.className = "statSpan"
    let avgLabel = document.createElement("span");
    avgLabel.textContent = "Avg:";
    scoreLabel.className = "statSpan"
    let lastLabel = document.createElement("span");
    lastLabel.textContent = "Last:"
    scoreLabel.className = "statSpan"
    lavelDiv.append(nameLabel, scoreLabel, avgLabel, lastLabel)


    playerListDiv

    // Create and append a row for each player
    for (let i = 0; i < playerStats.length; i++) {
        let playerStatDynamicDiv = document.createElement("div");
        // Use a class (not an id) so each row is unique
        playerStatDynamicDiv.className = "playerStatDynamicDiv";

        let playerNameSpan = document.createElement("span");
        playerNameSpan.className = "statSpan nameSpan";
        playerNameSpan.id = "statSpan";
        playerNameSpan.textContent = playerStats[i].name;

        let playerPointsSpan = document.createElement("span");
        playerPointsSpan.className = "statSpan";
        playerPointsSpan.id = "statSpan";
        playerPointsSpan.textContent = playerStats[i].score;

        let playerAvgSpan = document.createElement("span");
        playerAvgSpan.className = "statSpan";
        playerAvgSpan.id = "statSpan";
        playerAvgSpan.textContent = playerStats[i].average;

        let lastThrowSpan = document.createElement("span");
        lastThrowSpan.className = "statSpan";
        lastThrowSpan.id = "statSpan";
        lastThrowSpan.textContent = playerStats[i].lastThrow;

        playerStatDynamicDiv.append(playerNameSpan, playerPointsSpan, playerAvgSpan, lastThrowSpan);
        playerListDiv.append(playerStatDynamicDiv);
    }


}

// Handle starting point buttons
let threeZeroOneBtn = document.getElementById("301Btn");
threeZeroOneBtn.addEventListener("click", () => {
    setGameMode("301");
});

let fiveZeroOneBtn = document.getElementById("501Btn");
fiveZeroOneBtn.addEventListener("click", () => {
    setGameMode("501");
});

let fourTwencyBtn = document.getElementById("420Btn");
fourTwencyBtn.addEventListener("click", () => {
    setGameMode("420");
});

let sixSixSixBtn = document.getElementById("666Btn");
sixSixSixBtn.addEventListener("click", () => {
    setGameMode("666");
});

let customGameBtn = document.getElementById("CustomGameBtn");
customGameBtn.addEventListener("click", () => {
    winnerDiv.textContent = "NOT AVAILABLE YET!";
});

function setGameMode(gameMode) {
    // Convert gameMode to a number and update the startingPoints
    let numericGameMode = parseInt(gameMode);
    startingPoints = numericGameMode;

    // Update each player's score
    for (let i = 0; i < playerStats.length; i++) {
        playerStats[i].score = numericGameMode;
        //   console.log(playerStats[i].score);
    }

    // Refresh the player list GUI
    setPlayerStatsGUI();
}

let Btn1 = document.getElementById("Btn1");
let Btn2 = document.getElementById("Btn2");
let Btn3 = document.getElementById("Btn3");
let Btn4 = document.getElementById("Btn4");
let Btn5 = document.getElementById("Btn5");
let Btn6 = document.getElementById("Btn6");
let Btn7 = document.getElementById("Btn7");
let Btn8 = document.getElementById("Btn8");
let Btn9 = document.getElementById("Btn9");
let Btn0 = document.getElementById("Btn0");

Btn1.addEventListener("pointerdown", () => {
    pointsInRound.push(1);
    updateNumberDisplay();
});

Btn2.addEventListener("pointerdown", () => {
    pointsInRound.push(2);
    updateNumberDisplay();
});

Btn3.addEventListener("pointerdown", () => {
    pointsInRound.push(3);
    updateNumberDisplay();
});

Btn4.addEventListener("pointerdown", () => {
    pointsInRound.push(4);
    updateNumberDisplay();
});

Btn5.addEventListener("pointerdown", () => {
    pointsInRound.push(5);
    updateNumberDisplay();
});

Btn6.addEventListener("pointerdown", () => {
    pointsInRound.push(6);
    updateNumberDisplay();
})

Btn7.addEventListener("pointerdown", () => {
    pointsInRound.push(7);
    updateNumberDisplay();
});

Btn8.addEventListener("pointerdown", () => {
    pointsInRound.push(8);
    updateNumberDisplay();
});

Btn9.addEventListener("pointerdown", () => {
    pointsInRound.push(9);
    updateNumberDisplay();
});

Btn0.addEventListener("pointerdown", () => {
    pointsInRound.push(0);
    updateNumberDisplay();
});

function updateNumberDisplay() {
    numberDisplay.textContent = pointsInRound.join("");
}

let numberDisplay = document.getElementById("numberDisplay");

//////////////////backspace logic//////////////////
let backspaceBtn = document.getElementById("backspaceBtn");

backspaceBtn.addEventListener("pointerdown", () => {
    pointsInRound.pop();
    numberDisplay.textContent = pointsInRound.join("");
})

let acceptBtn = document.getElementById("acceptBtn");
let pointsToNumber = 0;
let averagePoints = 0;
let roundsPlayed = 0;


/////////////////// ACCEPT BUTTON ////////////
acceptBtn.addEventListener("pointerdown", acceptButton)

function acceptButton() {
    saveToHistory()

    if (pointsInRound.length <= 0) {
        winnerDiv.textContent = "INPUT THE FUCKING POINTS!"
    } else {
        numberDisplay.innerHTML = "";
        winnerDiv.textContent = "";
        pointsToNumber = pointsInRound.join("");
        undoVolume = 0;
        undoBtn.className = "visible";

        if ((playerStats[activePlayer].score - pointsToNumber) == 1 || (playerStats[activePlayer].score - pointsToNumber) < 0) {
            winnerDiv.textContent = "THAT WENT OVER!!"
        } else {
            playerStats[activePlayer].score -= pointsToNumber;
            playerStats[activePlayer].lastThrow = pointsToNumber;
            playerStats[activePlayer].totalScore += parseInt(pointsToNumber);
            winChecker()
        }

        playerStats[activePlayer].roundsPlayed += 1;
        playerStats[activePlayer].average = (playerStats[activePlayer].totalScore / playerStats[activePlayer].roundsPlayed).toFixed(0);

        activeBtnVolume++

        updateActivePlayer();
        setPlayerStatsGUI();
        pointsInRound = [];
        numberDisplay.textContent = "";

        activePlayerDisplay();
    }
}





////////////////END////////////////

function updateActivePlayer() {
    roundsPlayed
    activePlayer++
    if (activePlayer >= playerCount) {
        activePlayer = 0;
    }
    //  console.log(activePlayer)
}

let winnerDiv = document.getElementById("winnerDiv");
let newGameDiv = document.getElementById("newGameDiv");
let newGameBtn = document.getElementById("newGameBtn");

//////START///////////// winChecker ////////////
function winChecker() {
    if (playerStats[activePlayer].score == 0) {

        winnerDiv.textContent = "WINNER IS: " + playerStats[activePlayer].name;
        newGameDiv.className = "visible";

        numberDisplayDiv.className = "hidden";
        activePlayerDiv.className = "hidden";
        numberPadDiv.className = "hidden";
        undoButtonDiv.className = "hidden";



        newGameBtn.addEventListener("click", () => {

            for (let i = 0; i < playerStats.length; i++) {
                playerStats[i].score = 0;
                playerStats[i].average = 0;
                playerStats[i].totalScore = 0;
            }
            newGameDiv.className = "hidden";
            numberPadDiv.className = "hidden";
            numberDisplayDiv.className = "hidden";
            undoBtn.className = "hidden";
            activePlayerDiv.className = "hidden"

            gameModeDiv.className = "visible";
            addPlayerDiv.className = "visible";
            undoButtonDiv.className = "visible";
            startBtn.className = "visible";
            headerDiv.className = "visible";
            winnerDiv.textContent = "";


            setPlayerStatsGUI();
        });
    }
}
////////////////END////////////////

let activePlayerDiv = document.getElementById("activePlayerDiv");

function activePlayerDisplay() {

    activePlayerDiv.innerHTML = "";

    let activePlayerNameSpan = document.createElement("span");
    activePlayerNameSpan.className = "statSpan nameSpan"
    let activePlayerScoreSpan = document.createElement("span");
    let activePlayerAverageSpan = document.createElement("span");
    let activePlayerLastSpan = document.createElement("span");

    activePlayerNameSpan.append(playerStats[activePlayer].name)
    activePlayerScoreSpan.append(playerStats[activePlayer].score)
    activePlayerAverageSpan.append(playerStats[activePlayer].average)
    activePlayerLastSpan.append(playerStats[activePlayer].lastThrow)

    activePlayerDiv.append(activePlayerNameSpan);
    activePlayerDiv.append(activePlayerScoreSpan);
    activePlayerDiv.append(activePlayerAverageSpan);
    activePlayerDiv.append(activePlayerLastSpan)
}

let startBtn = document.getElementById("startBtn");
let numberPadDiv = document.getElementById("numberPadDiv");
let undoBtn = document.getElementById("undoBtn");
undoBtn.addEventListener("click", undoFunction);
let gameModeDiv = document.getElementById("gameModeDiv");
let addPlayerDiv = document.getElementById("addPlayerDiv");
let undoButtonDiv = document.getElementById("undoButtonDiv");

/////START BUTTON ////////
startBtn.addEventListener("click", () => {

    if (playerStats[activePlayer].score < 1) {
        winnerDiv.textContent = "CHOOSE A FUCKING MODE!"
    } else {
        numberPadDiv.className = "visible";
        numberDisplayDiv.className = "visible";
        undoBtn.className = "visible";
        activePlayerDiv.className = "visible"

        gameModeDiv.className = "hidden";
        addPlayerDiv.className = "hidden";
        startBtn.className = "hidden";
        headerDiv.className = "hidden";
        winnerDiv.textContent = "";
        activePlayerDisplay();
    }

});

let playerStatHistory = [0];

function saveToHistory() {
    // Create a snapshot of all the variables you want to revert later
    let snapshot = {
        playerStats: JSON.parse(JSON.stringify(playerStats)), // deep copy
        activePlayer: activePlayer,
        // Add other variables if you need them, e.g. pointsInRound, etc.
    };
    // Push this snapshot to the history array
    playerStatHistory.push(snapshot);
}


let undoVolume = 0;

function undoFunction() {
    // Ensure there's something to undo
    if (playerStatHistory.length === 0) {
        // console.log("No history to undo!");
        return;
    }

    let lastSnapshot = playerStatHistory.pop();

    // Restore the snapshot
    playerStats = lastSnapshot.playerStats;
    activePlayer = lastSnapshot.activePlayer;

    setPlayerStatsGUI();
    activePlayerDisplay();
}

let pointEntry1 = document.getElementById("pointEntry1");
let pointEntry2 = document.getElementById("pointEntry2");
let pointEntry3 = document.getElementById("pointEntry3");


let reallyContentDiv = document.getElementById("reallyContentDiv");

let timerMathContainer = document.getElementById("timerMathContainer");
timerMathContainer.addEventListener("click", () => {
    timerMathContainer.className = "hidden";
});

let reallyDiv = document.getElementById("reallyDiv");

reallyDiv.addEventListener("click", () => {
    reallyDiv.className = "hidden";
});

let point;
pointCounter()
///////////////// creates point buttons and ////////////////
function pointCounter() {

    for (let i = 1; i < 21; i++) {
        let pointBtn = document.createElement("button");
        pointBtn.id = "pointButton";
        pointBtn.append(i);
        pointBtn.addEventListener("click", () => {
            timerMathContainer.className = "visible";

            let Btn1 = document.createElement("button");
            Btn1.id = "pointButton";
            Btn1.className = "pointButton";
            Btn1.textContent = "1";
            timerMathDiv.innerHTML = "";

            timerMathDiv.append(Btn1);
            Btn1.addEventListener("click", () => {
                timerMathContainer.className = "hidden";
                points = i;
                pointCount.push(points);
                //pointsDiv.append(throwCount)
                let pointsSpan = document.createElement("span");
                pointsSpan.id = "pointsSpan";
                pointsSpan.append(points);
                numberDisplay.append(pointsSpan);
                throwCount++;
                timer()
            });

            let Btn2 = document.createElement("button");
            Btn2.id = "pointButton";
            Btn2.textContent = "2";
            Btn2.className = "pointButton";

            timerMathDiv.append(Btn2);
            Btn2.addEventListener("click", () => {
                timerMathContainer.className = "hidden";
                points = i * 2;
                pointCount.push(points);
                //pointsDiv.append(throwCount)
                let pointsSpan = document.createElement("span");
                pointsSpan.id = "pointsSpan";
                pointsSpan.append(points);
                numberDisplay.append(pointsSpan);
                throwCount++;
                timer()
            });

            let Btn3 = document.createElement("button");
            Btn3.id = "pointButton";
            Btn3.textContent = "3";
            Btn3.className = "pointButton";

            timerMathDiv.append(Btn3);
            Btn3.addEventListener("click", () => {
                timerMathContainer.className = "hidden";
                points = i * 3;
                pointCount.push(points);
                let pointsSpan = document.createElement("span");
                pointsSpan.id = "pointsSpan";
                pointsSpan.append(points);
                numberDisplay.append(pointsSpan);
                throwCount++;
                timer()
            });
        });
        pointButtonDiv.append(pointBtn);

        if (i == 20) {
            let zero = document.createElement("button");
            zero.textContent = "0";
            zero.id = "zeroButton";
            zero.addEventListener("click", () => {
                reallyDiv.className = "visible";
            });
            pointButtonDiv.append(zero);
        }
    }
}

let yesBtn = document.getElementById("yesBtn");
yesBtn.addEventListener("click", () => {
    points = 0;
    pointCount.push(points);
    let pointsSpan = document.createElement("span");
    pointsSpan.id = "pointsSpan";
    pointsSpan.append(points);
    numberDisplay.append(pointsSpan);
    throwCount++;
    timer()
    reallyDiv.className = "hidden";
});
let noBtn = document.getElementById("noBtn");
noBtn.addEventListener("click", () => {
    reallyDiv.className = "hidden";
});
let pointCount = [];
let throwCount = 0;


function timer() {
    timerMathDiv.innerHTML = "";
    if (throwCount === 3) {
        throwCount = 0;
        let wholePoints = pointCount[0] + pointCount[1] + pointCount[2];

        // Instead of calling acceptButton() directly, store these points in pointsInRound:
        pointsInRound = ("" + wholePoints).split("");
        // e.g. 180 -> "180" -> ["1","8","0"]

        // Clear pointCount for next round
        pointCount = [];

        // Now acceptButton() will parse from pointsInRound
        acceptButton();
    }
}


function zeropoints() {
    points = 0;
    pointCount.push(points);
    //pointsDiv.append(throwCount)
    let pointsSpan = document.createElement("span");
    pointsSpan.id = "pointsSpan";
    pointsSpan.append(points);
    pointsDiv.append(pointsSpan);
    throwCount++;
    timer()
    pointsDiv.className = "visible";
}

let changeView = document.getElementById("changeView");
let changeView2 = document.getElementById("changeView2")

changeView.addEventListener("click", () => {

    let icon = changeView.querySelector("i")
    if (icon.classList.contains("fa-toggle-off")) {
        icon.classList.remove("fa-toggle-off");
        icon.classList.add("fa-toggle-on");
        pointButtonDiv.className = "visible";
        numberPadDiv.className = "hidden";
    } else {
        icon.classList.remove("fa-toggle-on");
        icon.classList.add("fa-toggle-off");
        pointButtonDiv.className = "hidden";
        numberPadDiv.className = "visible";
    }
});
