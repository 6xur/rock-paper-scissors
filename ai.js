const moves = ["rock", "paper", "scissors"];
const moveSize = 3;

winWeight = 1;
tieWeight = 0;
lossWeight = -1;

// need to keep this for now
function randomMove(){
    console.log("randomMove");
    return moves[Math.floor(Math.random() * moves.length)];
}
  
// returns the nth move after the given move, nextMove("rock", 2) = "scissors"
function nextMove(move, n) {
    var i = (moves.indexOf(move) + n) % moveSize;
    return moves[i];
}

// AI LOGIC 1
// assuming that the player picks the same move after winning, the next move after losing
// random move if tie
function sameNext(play){
    var movePredict;

    if(play.winner === "player"){
        movePredict = nextMove(play.playerMove, 1);  // assuming player plays the same move so we play the next move
    } else if(play.winner === "computer"){
        movePredict = nextMove(play.playerMove, 2); // assuming player plays the next move so we play the "next next" move
    } else{
        movePredict = randomMove();
    }

    console.log("sameNext used: " + movePredict);

    return movePredict;
}

// AI LOGIC 2
// assumes that the player always picks the same move
function sameSame(play){
    var movePredict = nextMove(play.playerMove, 1);
    console.log("sameSame used: " + movePredict);
    return movePredict;
}

// AI LOGIC 3
// assumes that hte player always pick the next move
function nextNext(play){
    var movePredict = nextMove(play.playerMove, 2);
    console.log("nextNext used: " + movePredict);
    return movePredict;
}

// AI LOGIC 4
// assumes that the player always picks the previous move
function prevPrev(play){
    var movePredict = play.playerMove;
    console.log("prevPrev used: " + movePredict);
    return movePredict;
}

// the last move by the user and the move that the computer is going to play this round
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

function aiPredict(play){
    
}