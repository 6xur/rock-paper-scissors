const history = [];
var roundNumber = 1;

function playMatch(){
    const playerHand = document.querySelector('.player-hand');
    const computerHand = document.querySelector('.computer-hand');
    
    const moves = Array.from(document.querySelectorAll('.moves div'));
    moves.forEach(move => {
        move.addEventListener('click', function(){
            const computerChoice = nextMove();
            const playerChoice = this.className;

            this.classList.add('user-hover');

            // Animation
            playerHand.classList.add('shake-player-animation');
            computerHand.classList.add('shake-computer-animation');

            setTimeout(() =>{
                // update hand images
                setHand(playerHand, playerChoice);
                setHand(computerHand, computerChoice);

                // remove hover effect and animation
                this.classList.remove('user-hover');
                playerHand.classList.remove('shake-player-animation');
                computerHand.classList.remove('shake-computer-animation');
                
                updateHistory(playerChoice, roundNumber, computerChoice);
                updateScores(playerChoice, computerChoice);
                incrementRound();
            }, 1000)

            
        });
    });

}

function setHand(hand, choice){
    hand.src = `./assets/${choice}.png`;
}

function nextMove(){
    const moves = ["rock", "paper", "scissors"];
    return moves[Math.floor(Math.random() * moves.length)];
}

function incrementRound(){
    const round = document.querySelector('.round');
    roundNumber++;
    round.textContent = "ROUND " + roundNumber;
}

function updateScores(playerChoice, computerChoice){
    const winPairs = {
        "rock" : "scissors",
        "paper" : "rock",
        "scissors" : "paper"
    }

    const losePairs = {
        "rock" : "paper",
        "paper" : "scissors",
        "scissors" : "rock"
    }

    // Update scores
    const playerWins = document.querySelector('.player-wins p');
    const computerWins = document.querySelector('.computer-wins p');
    const ties = document.querySelector('.ties p');

    if(winPairs[playerChoice] === computerChoice){  // player wins
        playerWins.textContent = Number(playerWins.textContent) + 1;
    } else if(losePairs[playerChoice] === computerChoice){  // computer wins
        computerWins.textContent = Number(computerWins.textContent) + 1;
    } else{  // tie
        ties.textContent = Number(ties.textContent) + 1;
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
    playMatch();
}

// start the game function
game();