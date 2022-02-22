function removeHover(){
    this.classList.remove('user-hover');
}

function userHover() {
    this.classList.add('user-hover');
}

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

            setTimeout(() =>{
                // update scores
                compareHands(playerChoice, computerChoise);
                incrementRound();

                // Update Images
                playerHand.src = `./assets/${playerChoice}.png`;
                computerHand.src = `./assets/${computerChoise}.png`;

                // Remove shadow
                move.classList.remove('user-hover');
            }, 1000)

            move.classList.add('user-hover');

            // Animation
            playerHand.style.animation = "shakePlayer 1s ease";
            computerHand.style.animation = "shakeComputer 1s ease";
        });
    });

    // for some reason adding hover effect messes with the score
    //options.forEach(option => option.addEventListener('mouseover', userHover));
    //options.forEach(option => option.addEventListener('mouseleave', removeHover));

}

function nextMove(){
    const moves = ["rock", "paper", "scissors"];
    return moves[Math.floor(Math.random() * moves.length)];
}

function incrementRound(){
    const round = document.querySelector('.round');
    var newRoundNumber = Number(round.textContent.slice(round.textContent.length - 1)) + 1;
    round.textContent = "ROUND " + newRoundNumber;
}

function compareHands(playerChoice, computerChoice){
    // Update text
    const playerWins = document.querySelector('.player-wins p');
    const computerWins = document.querySelector('.computer-wins p');
    const ties = document.querySelector('.ties p');


    // checking for a tie
    if(playerChoice === computerChoice){
        ties.textContent = Number(ties.textContent) + 1;
        return;
    }

    // check for rock
    if(playerChoice === 'rock'){
        if(computerChoice === 'scissors'){
            playerWins.textContent = Number(playerWins.textContent) + 1;
            return;
        } else{
            computerWins.textContent = Number(computerWins.textContent) + 1;
            return;
        }
    }

    // check for paper
    if(playerChoice === 'paper'){
        if(computerChoice === 'rock'){
            playerWins.textContent = Number(playerWins.textContent) + 1;
            return;
        } else{
            computerWins.textContent = Number(computerWins.textContent) + 1;
            return;
        }
    }

    // check for scissors
    if(playerChoice === 'scissors'){
        if(computerChoice === 'paper'){
            playerWins.textContent = Number(playerWins.textContent) + 1;
            return;
        } else{
            computerWins.textContent = Number(computerWins.textContent) + 1;
            return;
        }
    }

}


function game(){
    playMatch();
}

// start the game function
game();