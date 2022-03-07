const moves = ["rock", "paper", "scissors"];

winWeight = 1;
tieWeight = 0;
lossWeight = -1;

// TODO: Change the value to a "forgetfull" list
var aiScores = new Map([
    [sameNext, []],
    [sameSame, []],
    [samePrev, []],
    [nextPrev, []],
    [nextSame, []],
    [nextNext, []],
    [prevPrev, []],
    [prevSame, []],
    [prevNext, []]
]);

function randomMove(){
    return moves[Math.floor(Math.random() * moves.length)];
}
  
// gets the nth move after the given move
// e.g. nextMove("scissors", 2) = "paper"
function nextMove(move, n) {
    return moves[(moves.indexOf(move) + n) % moves.length];
}


// AI LOGIC 1
// assumes that the player plays the same move if they won the last round,
// and the previous move if they lost or tied
function samePrev(){
    if(history[history.length - 1].winner === "player"){
        return nextMove(history[history.length - 1].playerMove, 1);  // assuming player plays the same move so we play the next move
    }
    return history[history.length - 1].playerMove; // assuming player plays the previous move so we play the move they played
}

// AI LOGIC 2
// assumes that the player always picks the same move
function sameSame(){
    return nextMove(history[history.length - 1].playerMove, 1);
}

// AI LOGIC 3
// assumes that the player plays the same move if they won the last round,
// and the next move if they lost or tied
function sameNext(){
    if(history[history.length - 1].winner === "player"){
        return nextMove(history[history.length - 1].playerMove, 1);
    }
    return nextMove(history[history.length - 1].playerMove, 2);
}

// AI LOGIC 4
function nextPrev(){
    if(history[history.length - 1].winner === "player"){
        return nextMove(history[history.length - 1].playerMove, 2);
    }
    return history[history.length - 1].playerMove;
}


// AI LOGIC 5
function nextSame(){
    if(history[history.length - 1].winner === "player"){
        return nextMove(history[history.length - 1].playerMove, 2);
    }
    return nextMove(history[history.length - 1].playerMove, 1);
}

// AI LOGIC 6
function nextNext(){
    return nextMove(history[history.length - 1].playerMove, 2);
}

// AI LOGIC 7
function prevPrev(){
    return history[history.length - 1].playerMove;
}

// AI LOGIC 8
function prevSame(){
    if(history[history.length - 1].winner === "player"){
        return history[history.length - 1].playerMove;
    }
    return nextMove(history[history.length - 1].playerMove, 1);
}

// AI LOGIC 9
function prevNext(){
    if(history[history.length - 1].winner === "player"){
        return history[history.length - 1].playerMove;
    }
    return nextMove(history[history.length - 1].playerMove, 2);
}

// playerMove is the player's current move
// computerMove is the AI's move based on the last move that the player played
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

// +1 if the AI would've won
// -1 if the AI would've lost
// do nothing if the AI would've tied
// update the scores of each AI model after the user plays
function updateProbability(playerMove){
    for(let [ai, scores] of aiScores){
        const computerMove = ai();
        const weight = getWeight(playerMove, computerMove);
        scores.push(weight);

        if(scores.length > 5){
            scores.shift(); 
        }

        aiScores.set(ai, scores);
    }
    
    // print each ai and their scores
    for(let[ai, scores] of aiScores.entries()){
        console.log(ai, scores.reduce((a, b) => a + b, 0));
    }
}

// iterate through aiScores and choose the AI strategy that has the best chance of winning
function chooseAI(){
    var maxAI;
    var maxScore = -1;

    // find the highest value in the aiScores map and run the corresponding AI
    for(let [ai, scores] of aiScores){
        const sum = scores.reduce((a, b) => a + b, 0);

        if(sum > maxScore){
            maxAI = ai;
            maxScore = sum;
        }
    }

    console.log("using", maxAI);
    const computerMove = maxAI();
    //console.log("using " + maxAI);
    return computerMove;

}