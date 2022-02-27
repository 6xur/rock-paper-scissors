const moves = ["rock", "paper", "scissors"];

winWeight = 1;
lossWeight = 0;

// need to keep this for now
function randomMove(){
    return moves[Math.floor(Math.random() * moves.length)];
}

function sameNext(){
    console.log(history[history.length - 1]);
}