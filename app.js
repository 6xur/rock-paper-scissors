// playMatch
function playMatch(){
    const playerHand = document.querySelector('.player-hand');
    const computerHand = document.querySelector('.computer-hand');

    const moves = ["rock", "paper", "scissors"];

    const options = Array.from(document.querySelectorAll('.options div'));
    options.forEach(option => {
        option.addEventListener('click', function(){
            // Computer Choice
            const computerChoise = moves[Math.floor(Math.random()*moves.length)];
            // Here we call compareHands
            const playerChoice = this.className;
            compareHands(playerChoice, computerChoise);


            // Update Images
            playerHand.src = `./assets/${this.className}.png`;
            computerHand.src = `./assets/${computerChoise}.png`;
            
        })
    });

};

function compareHands(playerChoice, computerChoice){
    // Update text
    const playerWins = document.querySelector('.player-wins p');
    const computerWins = document.querySelector('.computer-wins p');
    const ties = document.querySelector('.ties p');
   
    //console.log(playerWins.textContent);
    //console.log(computerWins.textContent);
    //console.log(ties.textContent);
    

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