const moves = ["rock", "paper", "scissors"];

winWeight = 1;
tieWeight = 0;
lossWeight = -1;

var sn = 0;
var ss = 0;
var nn = 0;
var pp = 0;

// need to keep this for now
function randomMove(){
    console.log("randomMove");
    return moves[Math.floor(Math.random() * moves.length)];
}
  
// returns the nth move after the given move, nextMove("rock", 2) = "scissors"
function nextMove(move, n) {
    var i = (moves.indexOf(move) + n) % moves.length;
    return moves[i];
}

// AI LOGIC 1
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

// AI LOGIC 2
// assumes that the player always picks the same move
function sameSame(){
    var movePredict = nextMove(history[history.length - 1].playerMove, 1);
    console.log("sameSame used: " + movePredict);
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

// IDK what playerMove is meant to be
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

    sn += getWeight(playerMove, sameNext());
    console.log(sn);

    ss += getWeight(playerMove, sameSame());
    console.log(ss);

    nn += getWeight(playerMove, nextNext());
    console.log(nn);

    pp += getWeight(playerMove, prevPrev());
    console.log(pp);
}