const moves = ["rock", "paper", "scissors"];

winWeight = 1;
lossWeight = 0;

// AI name as keys
// Each array stores the score of its respective AI
var aiScores = new Map([
    [prevPrev, []],
    [prevSame, []],
    [prevNext, []],
    [nextPrev, []],
    [nextSame, []],
    [nextNext, []],
    [sameNext, []],
    [sameSame, []],
    [samePrev, []],
]);

function randomMove(){
    return moves[Math.floor(Math.random() * moves.length)];
}

/*
Returns the nth move after the given move
nextMove("scissors", 2) = "paper"
*/
function nextMove(move, n) {
    return moves[(moves.indexOf(move) + n) % moves.length];
}

/*
AI logic 1
Assume that the human player plays the same move if they won the last round,
the previous move if they lost or tied
*/
function samePrev(){
    if(history[history.length - 1].winner === "player"){
        return nextMove(history[history.length - 1].playerMove, 1);  // player plays the same move so AI plays the next move
    }
    return history[history.length - 1].playerMove; // Player plays the previous move so AI play the move they last played
}

/*
AI logic 2
Assume that the player always picks the same move
*/
function sameSame(){
    return nextMove(history[history.length - 1].playerMove, 1);
}


// AI logic 3
function sameNext(){
    if(history[history.length - 1].winner === "player"){
        return nextMove(history[history.length - 1].playerMove, 1);
    }
    return nextMove(history[history.length - 1].playerMove, 2);
}

// AI logic 4
function nextPrev(){
    if(history[history.length - 1].winner === "player"){
        return nextMove(history[history.length - 1].playerMove, 2);
    }
    return history[history.length - 1].playerMove;
}

// AI logic 5
function nextSame(){
    if(history[history.length - 1].winner === "player"){
        return nextMove(history[history.length - 1].playerMove, 2);
    }
    return nextMove(history[history.length - 1].playerMove, 1);
}

// AI logic 6
function nextNext(){
    return nextMove(history[history.length - 1].playerMove, 2);
}

// AI logic 7
function prevPrev(){
    return history[history.length - 1].playerMove;
}

// AI logic 8
function prevSame(){
    if(history[history.length - 1].winner === "player"){
        return history[history.length - 1].playerMove;
    }
    return nextMove(history[history.length - 1].playerMove, 1);
}

// AI logic 9
function prevNext(){
    if(history[history.length - 1].winner === "player"){
        return history[history.length - 1].playerMove;
    }
    return nextMove(history[history.length - 1].playerMove, 2);
}

/*
Return 1 if AI wins, 0 if AI loses or draws
playerMove: the player's current move
computerMove: AI's move based on the last move by the player
*/
function getWeight(playerMove, computerMove){
    var winner = getWinner(playerMove, computerMove);
    if(winner === "computer"){
        return winWeight;
    } else{
        return lossWeight;
    }
}

/*
Update the score of AI models after the player plays a move
+1 if the AI would've won
-1 if the AI would've lost
0 if the AI would've tied
*/
function updateAIScores(playerMove){
    for(let [ai, scores] of aiScores){
        const computerMove = ai();
        const weight = getWeight(playerMove, computerMove);
        scores.push(weight);

        // Only save scores from the last 10 plays
        if(scores.length > 10){
            scores.shift(); 
        }

        aiScores.set(ai, scores);
    }
}

// Choose the strategy with the highest winning ratio
function chooseAI(){
    var bestAI = sameSame;  // place holder
    var aiScoreTotal = 0;
    var maxWinRatio = 0;

    // Calculate the total score
    for(let [ai, scores] of aiScores){
        aiScoreTotal += scores.reduce((a, b) => a + b, 0);
    }

    // Calculate winning ratio for each strategy and save the best one
    for(let [ai, scores] of aiScores){
        const winRatio = scores.reduce((a, b) => a + b, 0) / aiScoreTotal;
        if(winRatio > maxWinRatio){
            bestAI = ai;
            maxWinRatio = winRatio;
        }
    }

    console.log("using", bestAI);

    // Print each strategy and their winning ratio
    // prevNext() 33.33% means that the prevNext strategy accounts for 1/3 of all wins
    for(let[ai, scores] of aiScores.entries()){
        console.log(ai, (scores.reduce((a, b) => a + b, 0) / aiScoreTotal * 100).toFixed(2) + "%");
    }

    return bestAI();
}