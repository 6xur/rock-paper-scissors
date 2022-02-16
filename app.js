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
            console.log(computerChoise)
            const playerChoice = "scissors";
            compareHands(playerChoice, computerChoise);
        })
    });

};

function compareHands(playerChoice, computerChoice){
    // Update text
    const playerWins = document.querySelector('.player-wins p');
    console.log(playerWins.textContent);

    if(playerChoice == computerChoice){

    }
}



function playRound(playerSelection, computerSelection){
    playerSelection = playerSelection.toUpperCase();
    computerSelection = computerSelection.toUpperCase();
    if(playerSelection == computerSelection){
        return(playerSelection + " and " + computerSelection + ".It's a tie!");
    }
    if(playerSelection == "ROCK"){
        if(computerSelection == "SCISSORS"){
            return("Rock smashes scissors! You win!");
        } else{
            return("Paper covers rock! You lose!")
        }
    }
    if(playerSelection == "PAPER"){
        if(computerSelection == "ROCK"){
            return("Paper covers rock! You win!");
        } else{
            return("Scissors cuts paper! You lose.");
        }
    }
    if(playerSelection == "SCISSORS"){
        if(computerSelection == "PAPER"){
            return("Scissors cuts paper! You win!");
        } else{
            return ("Rock smashes scissors! You lose.");
        }
    }
}


function getPlayerSelection(message){
    var playerSelection;
    while(true){
        playerSelection = prompt(message).toUpperCase();
        if(playerSelection == "ROCK" || playerSelection == "PAPER" || playerSelection == "SCISSORS"){
            break;
        }
    }
    return playerSelection;
}

function game(){
    playMatch();
}

game();