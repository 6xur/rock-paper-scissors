const moves = ["rock", "paper", "scissors"];

winWeight = 1;
tieWeight = 0;
lossWeight = -1;

// TODO: pick the AI that has the highest winning ratio
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
assuming that the player plays the same move if they won in the last round,
and the previous move if they lost or tied
*/
function samePrev(){
    if(history[history.length - 1].winner === "player"){
        return nextMove(history[history.length - 1].playerMove, 1);  // assuming player plays the same move so we play the next move
    }
    return history[history.length - 1].playerMove; // assuming player plays the previous move so we play the move they played
}

/*
AI logic 2
assuming that the player always picks the same move
*/
function sameSame(){
    return nextMove(history[history.length - 1].playerMove, 1);
}

/*
AI logic 3
assuming that the player plays the same move if they in won the last round,
and the next move if they lost or tied
*/
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
playerMove is the player's current move
computerMove is the AI's move based on the last move by the player
*/
function getWeight(playerMove, computerMove){
    var winner = getWinner(playerMove, computerMove);
    if(winner === "computer"){
        return winWeight;
    } else if(winner === "player"){
        return lossWeight;
    } else{
        return tieWeight;
    }
}

/*
Update the score of each AI model after the playes plays a move
+1 if the AI would've won
-1 if the AI would've lost
0 if the AI would've tied
*/
function updateAIScores(playerMove){
    for(let [ai, scores] of aiScores){
        const computerMove = ai();
        const weight = getWeight(playerMove, computerMove);
        scores.push(weight);

        // only store scores from the last 5 plays
        if(scores.length > 10){
            scores.shift(); 
        }

        aiScores.set(ai, scores);
    }
    
    // print each AI and their scores as a number
    for(let[ai, scores] of aiScores.entries()){
        console.log(ai, scores.reduce((a, b) => a + b, 0));
    }
}

// Chooses the strategy that has the best chance of winning
function chooseAI(){
    var maxAI;
    var maxScore = -99999;  // placeholder

    for(let [ai, scores] of aiScores){
        const score = scores.reduce((a, b) => a + b, 0);

        if(score > maxScore){
            maxAI = ai;
            maxScore = score;
        }
    }

    console.log("using", maxAI);
    const computerMove = maxAI();
    return computerMove;
}