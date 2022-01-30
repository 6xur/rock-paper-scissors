function computerPlay(){
    const moves = ["Rock", "Paper", "Scissors"];
    var move = moves[Math.floor(Math.random()*moves.length)];
    return move;
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
    var playerWins = 0;
    var computerWins = 0;
    for(let i = 0; i < 5; i++){
        const playerSelection = getPlayerSelection("Enter your selection: ");
        const computerSelection = computerPlay();
        const result = playRound(playerSelection, computerSelection);
        console.log(result);
        if(result.includes("win")){
            playerWins++;
        } else if(result.includes("lose")){
            computerWins++;
        }
    }
    if(playerWins > computerWins){
        console.log("You win!");
    } else if(playerWins < computerWins){
        console.log("You lose!");
    } else{
        console.log("It's a draw!");
    }
    console.log(playerWins + " | " + computerWins)
}

game();