function playMatch(){
    const hands = document.querySelectorAll('.hands img');
    const playerHand = document.querySelector('.player-hand');
    const computerHand = document.querySelector('.computer-hand');
    
    hands.forEach(hand =>{
        hand.addEventListener('animationend', function(){
            this.style.animation = '';
        })
    })

    const moves = Array.from(document.querySelectorAll('.moves div'));
    moves.forEach(move => {
        move.addEventListener('click', function(){
            const computerChoise = nextMove();
            const playerChoice = this.className;

            this.classList.add('user-hover');

            // Animation
            playerHand.classList.add('shake-player-animation');
            computerHand.classList.add('shake-computer-animation');
            //playerHand.style.animation = "shakePlayer 1s ease";
            //computerHand.style.animation = "shakeComputer 1s ease";

            setTimeout(() =>{
                // Update Images
                playerHand.src = `./assets/${playerChoice}.png`;
                computerHand.src = `./assets/${computerChoise}.png`;
                
                // update scores
                compareHands(playerChoice, computerChoise);
                incrementRound();

                // Remove shadow and animation
                this.classList.remove('user-hover');
                playerHand.classList.remove('shake-player-animation');
                computerHand.classList.remove('shake-computer-animation');
            }, 1000)

            
        });
    });

}

function nextMove(){
    const moves = ["rock", "paper", "scissors"];
    return moves[Math.floor(Math.random() * moves.length)];
}

function incrementRound(){
    const round = document.querySelector('.round');
    // regex to find the number at the end of a string
    var oldRoundNumber = parseInt(round.textContent.match(/\d+$/)[0], 10);
    var newRoundNumber = oldRoundNumber + 1;
    round.textContent = "ROUND " + newRoundNumber;
}

function compareHands(playerChoice, computerChoice){
    // Update text
    const playerWins = document.querySelector('.player-wins p');
    const computerWins = document.querySelector('.computer-wins p');
    const ties = document.querySelector('.ties p');

    const rpsWin = {
        "rock" : "scissors",
        "paper" : "rock",
        "scissors" : "paper"
    }

    const rpsLose = {
        "rock" : "paper",
        "paper" : "scissors",
        "scissors" : "rock"
    }

    if(rpsWin[playerChoice] === computerChoice){  // player wins
        playerWins.textContent = Number(playerWins.textContent) + 1;
    } else if(rpsLose[playerChoice] === computerChoice){  // computer wins
        computerWins.textContent = Number(computerWins.textContent) + 1;
    } else{  // tie
        ties.textContent = Number(ties.textContent) + 1;
    }
}


function game(){
    playMatch();
}

// start the game function
game();