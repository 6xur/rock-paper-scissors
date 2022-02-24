const history = [];
var playerWins = 0;
var computerWins = 0;
var ties = 0;
var roundNumber = 1;

function startGame(){
    const playerHand = document.querySelector('.player-hand');
    const computerHand = document.querySelector('.computer-hand');
    const moves = Array.from(document.querySelectorAll('.moves div'));

    moves.forEach(move => {
        move.addEventListener('click', function(){
            const computerMove = aiMove();
            const playerMove = this.className;  // must save class name first because we'll change it later

            // clicked effect for button
            this.classList.add('user-clicked');

            // shaking animation
            playerHand.classList.add('shake-player-animation');
            computerHand.classList.add('shake-computer-animation');

            // timeout set to 1000 because shaking animation takes 1s
            setTimeout(() =>{
                // update hand images
                setHand(playerHand, playerMove);
                setHand(computerHand, computerMove);

                // remove clicked effect and animation after 1s
                this.classList.remove('user-clicked');
                playerHand.classList.remove('shake-player-animation');
                computerHand.classList.remove('shake-computer-animation');
                
                updateHistory(playerMove, roundNumber, computerMove);
                updateScores(playerMove, computerMove);
                incrementRound();  // start of new round
            }, 1000)
        });
    });
}

function setHand(hand, move){
    hand.src = `./assets/${move}.png`;
}

function aiMove(){
    const moves = ["rock", "paper", "scissors"];
    return moves[Math.floor(Math.random() * moves.length)];
}

function incrementRound(){
    const round = document.querySelector('.round');
    roundNumber++;
    round.textContent = "ROUND " + roundNumber;
}

function getWinner(playerMove, computerMove){
    const winAgainst = {
        "rock" : "scissors",
        "paper" : "rock",
        "scissors" : "paper"
    }

    const loseTo = {
        "rock" : "paper",
        "paper" : "scissors",
        "scissors" : "rock"
    }

    if(winAgainst[playerMove] === computerMove){  // player wins
        return "player";
    } else if(loseTo[playerMove] === computerMove){  // computer wins
        return "computer";
    } else{
        return null;
    }
}

function updateScores(playerMove, computerMove){
    const playerWinsText = document.querySelector('.player-wins p');
    const computerWinsText = document.querySelector('.computer-wins p');
    const tiesText = document.querySelector('.ties p');

    const winner = getWinner(playerMove, computerMove);

    if(winner === "player"){
        playerWins++;
        playerWinsText.textContent = playerWins;
    } else if(winner === "computer"){
        computerWins++;
        computerWinsText.textContent = computerWins;
    } else{
        ties++;
        tiesText.textContent = ties;
    }
}

// updates the history table
function updateHistory(playerChoice, roundNumber, computerChoice){

    const lastMove = {playerChoice: playerChoice, roundNumber: roundNumber, computerChoice: computerChoice};
    history.push(lastMove);
    if(history.length > 3){
        history.shift();
    }

    console.log(lastMove);
    //console.log(history);

    const headerRow = document.querySelector("#rowh");
     var i;
     for(i = 0; i < history.length; i++){
         document.getElementById("player" + i).innerHTML = history[history.length - 1 - i].playerChoice;
         document.getElementById("round" + i).innerHTML = history[history.length - 1 - i].roundNumber;
         document.getElementById("computer" + i).innerHTML = history[history.length - 1 - i].computerChoice;
         
         document.getElementById("row" + i).style = "visibility:visible;";
     }    

}


function game(){
    startGame();
}

// start the game function
game();