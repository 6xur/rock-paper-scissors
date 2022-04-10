const history = [];
var playerWins = 0;
var computerWins = 0;
var ties = 0;
var round = 1;

function startGame(){
    const playerHand = document.querySelector('.player-hand');
    const computerHand = document.querySelector('.computer-hand');
    const moves = Array.from(document.querySelectorAll('.moves div'));

    moves.forEach(move => {
        move.addEventListener('click', function(){
            const playerMove = this.className;  // save class name first because we'll add classes to it later

            // AI choooses
            var computerMove;
            if(history.length == 0){
                computerMove = randomMove();
            } else{
                const play = history[history.length - 1];
                console.log()
                console.log("last play: ", play);

                // Choose strategy that has the best chance of winning based on historical data
                computerMove = chooseAI();

                updateAIScores(playerMove);
            }

            // Clicked effect for button
            this.classList.add('user-clicked');
            // Disable all buttons
            moves.forEach(move => {
                move.classList.add('disabled');
            })

            // Shaking animation
            playerHand.classList.add('shake-player-animation');
            computerHand.classList.add('shake-computer-animation');

            // timeout set to 1000 because shaking animation takes 1s
            setTimeout(() =>{
                // Update hand images
                setHand(playerHand, playerMove);
                setHand(computerHand, computerMove);

                // Remove clicked effect and animation after 1s
                this.classList.remove('user-clicked');
                playerHand.classList.remove('shake-player-animation');
                computerHand.classList.remove('shake-computer-animation');

                // Enable all the buttons
                moves.forEach(move => {
                    move.classList.remove('disabled');
                })
                
                updateHistory(playerMove, round, computerMove);
                updateScores(playerMove, computerMove);
                incrementRound();  // start of new round

            }, 800)
        });
    });
}

function setHand(hand, move){
    hand.src = `./assets/${move}.png`;
}

function incrementRound(){
    const roundText = document.querySelector('.round');
    round++;
    roundText.textContent = "ROUND " + round;
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
    const winner = getWinner(playerMove, computerMove);

    if(winner === "player"){
        playerWins++;
        document.querySelector('.player-wins p').textContent = playerWins;
    } else if(winner === "computer"){
        computerWins++;
        document.querySelector('.computer-wins p').textContent = computerWins;
    } else{
        ties++;
        document.querySelector('.ties p').textContent = ties;
    }
}

// Update the history table
function updateHistory(playerMove, round, computerMove){
    const winner = getWinner(playerMove, computerMove);
    const play = {playerMove: playerMove, round: round, computerMove: computerMove, winner: winner};

    history.push(play);  // save all plays
    const recentHistory = history.slice(-3);  // get the last 3 plays

    for(let i = 0; i < recentHistory.length; i++){
        const play = recentHistory[recentHistory.length - 1 - i];
        const player = document.getElementById("player" + i);
        const computer =  document.getElementById("computer" + i);
        const round = document.getElementById("round" + i);

        // Update winner text color
        if(play.winner === "player"){
            player.style.color = "#e62649";
            computer.style.color = "#9a9da6";
        } else if(play.winner === "computer"){
            computer.style.color = "#e62649";
            player.style.color = "#9a9da6";
        } else {
            computer.style.color = "#9a9da6";
            player.style.color = "#9a9da6";
        }

        // Update past rounds information
        player.textContent = play.playerMove[0].toUpperCase();
        round.textContent = play.round;
        computer.textContent = play.computerMove[0].toUpperCase();
        
        // Make each play visible as they are played (initially insible)
        document.getElementById("row" + i).style = "visibility:visible;";
    }
}

function game(){
    startGame();
}

game();