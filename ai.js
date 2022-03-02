const moves = ["rock", "paper", "scissors"];

winWeight = 1;
tieWeight = 0;
lossWeight = -1;


var aiScores = new Map([
    [sameNext, 0],
    [sameSame, 0],
    [samePrev, 0],
    [nextNext, 0],
    [prevPrev, 0]
]);

// need to keep this for now
function randomMove(){
    const movePredict = moves[Math.floor(Math.random() * moves.length)];
    console.log("randomMove: " + movePredict);
    return movePredict;
}
  
// returns the nth move after the given move, nextMove("rock", 2) = "scissors"
function nextMove(move, n) {
    var i = (moves.indexOf(move) + n) % moves.length;
    return moves[i];
}

// AI LOGIC 1
// Assuming that the player plays the same move if they won last round
// the previous move if they lost or tie
function samePrev(){
    var movePredict;

    if(history[history.length - 1].winner === "player"){
        movePredict = nextMove(history[history.length - 1].playerMove, 1);  // assuming player plays the same move so we play the next move
    } else {
        movePredict = history[history.length - 1].playerMove; // assuming player plays the next move so we play the "next next" move
    }

    console.log("samePrev used: " + movePredict);
    
    return movePredict;

}

// AI LOGIC 2
// assumes that the player always picks the same move
function sameSame(){
    var movePredict = nextMove(history[history.length - 1].playerMove, 1);
    console.log("sameSame used: " + movePredict);
    return movePredict;
}


// AI LOGIC 3
// assuming that the player picks the same move after winning, the next move after losing or tie
function sameNext(){
    var movePredict;

    if(history[history.length - 1].winner === "player"){
        movePredict = nextMove(history[history.length - 1].playerMove, 1);  // assuming player plays the same move so we play the next move
    } else {
        movePredict = nextMove(history[history.length - 1].playerMove, 2); // assuming player plays the next move so we play the "next next" move
    }

    console.log("sameNext used: " + movePredict);

    return movePredict;
}

// AI LOGIC 3
// assumes that hte player always pick the next move
function nextNext(){
    var movePredict = nextMove(history[history.length - 1].playerMove, 2);
    console.log("nextNext used: " + movePredict);
    return movePredict;
}

// AI LOGIC 4
// assumes that the player always picks the previous move
function prevPrev(){
    var movePredict = history[history.length - 1].playerMove;
    console.log("prevPrev used: " + movePredict);
    return movePredict;
}


// TODO: Add all 9 logic and test

// playMove is the current player move, computerMove is the AI's move based on the last move that the user played
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
// do nothign if the AI would've tied
// playerMove is the current player move, the AI's choose a move based on the last move that the user played
function updateProbability(playerMove){  // SIMPLY UPDATE WINNING PROBABILITY AFTER USER PLAYS, need another function that chooses the ai with biggest winning probability

    for(let [ai, score] of aiScores){
        const computerMove = ai();
        aiScores.set(ai, score + getWeight(playerMove, computerMove));
    }

    console.log(aiScores);
}

// iterate through aiScores and choose the AI strategy that has the best chance of winning
function chooseAI(){
    const ai = ([...aiScores.entries()].reduce((a, e ) => e[1] > a[1] ? e : a))[0];
    const computerMove = ai();  // find the highest value in the aiScores map and run the corresponding AI
    return computerMove;
}