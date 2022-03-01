const moves = ["rock", "paper", "scissors"];
const moveSize = 3;

winWeight = 1;
lossWeight = 0;

// need to keep this for now
function randomMove(){
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
function sameNext(){
    var movePredict;

    const play = history[history.length - 1];

    console.log(play);

    if(play.winner === "player"){
        movePredict = nextMove(play.playerMove, 1);
    } else if(play.winner === "computer"){
        movePredict = nextMove(play.playerMove, 2);
    } else{
        movePredict = randomMove();
    }

    console.log(movePredict)

    return movePredict;
}

// AI LOGIC 2
// assumes that the player always picks the next move R -> P -> S -> R -> ...
function sameSame(){
    
}