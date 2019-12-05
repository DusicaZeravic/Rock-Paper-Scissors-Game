const choices = document.querySelectorAll('.choice');
const score = document.getElementById('score');
const result = document.getElementById('result');
const restart = document .getElementById('restart');
const modal = document .querySelector('.modal');
const h2 = document.getElementById('h2');
const scoreboard = {
    player: 0,
    computer: 0
}

// Play game
function play(e) {
    // restart.style.display = 'inline-block';
    const playerChoice = e.target.id;
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);
    showWinner(winner, computerChoice);
}

// Get computers choice
function getComputerChoice() {
    const rand = Math.random();
    if(rand < 0.34) {
        return 'rock';
    } else if(rand <= 0.67) {
        return 'paper';
    } else {
        return 'scissors';
    }
}

// Get game winner
function getWinner(p, c) {
    if(p === c) {
        return 'draw;'
    } else if(p === 'rock') {
        if(c === 'paper') {
            return 'computer'
        } else {
            return 'player'
        }
    } else if(p === 'paper') {
        if(c === 'scissors') {
            return 'computer';
        } else {
            return 'player';
        }
    } else if(p === 'scissors') {
        if(c === 'rock') {
            return 'computer';
        } else {
            return 'player';
        }
    }
}

// Show winner
function showWinner(winner, computerChoice) {
    if(winner === 'player') {
        // Increment player score
        scoreboard.player++;
        // Show modal result
        result.innerHTML = `
        <h1 class="text-win">You Win!</h1>
        <i class="fas fa-hand-${computerChoice} fa-10x"></i>
        <p>Computer Choose<strong> ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong></p>
        `;
    } else if(winner === 'computer') {
        // Increment computer score
        scoreboard.computer++;
        // Show modal result
        result.innerHTML = `
        <h1 class="text-lose">You Lose!</h1>
        <i class="fas fa-hand-${computerChoice} fa-10x"></i>
        <p>Computer Choose<strong> ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong></p>
        `;
    } else {
        result.innerHTML = `
        <h1>It's a draw!</h1>
        <i class="fas fa-hand-${computerChoice} fa-10x"></i>
        <p>Computer Choose<strong> ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong></p>
        `;
    } if(scoreboard.player == 3 || scoreboard.computer == 3) {
        let game_over = document.querySelector('#h2').innerHTML = "Game Over!";
        let h2 = document.querySelector('#h2').style.color = "red";
        choices.forEach(choice => choice.removeEventListener(('click'), play)); 
        restart.style.display = 'inline-block';
    } else if(scoreboard.player == 0 && scoreboard.computer == 0) {
        choices.forEach(choice => choice.addEventListener(('click'), play));
    }
    
    // Show Score
    score.innerHTML = `
    <p>Player: ${scoreboard.player}</p>
    <p>Computer: ${scoreboard.computer}</p>
    `;
    modal.style.display = 'block';
}

// Restart Game
function restartGame() {
    let play_again = document.querySelector('#h2').innerHTML = "Make your selection";
    let play = document.querySelector('#h2').style.color = "#333";
    scoreboard.player = 0;
    scoreboard.computer = 0;
    score.innerHTML = `
    <p>Player: 0</p>
    <p>Computer: 0</p>
    `;
}

// Clear Modal
function clearModal(e) {
    if(e.target == modal) {
        modal.style.display = 'none';
    }
}

// Event listeners
choices.forEach(choice => choice.addEventListener(('click'), play));
window.addEventListener('click', clearModal);
restart.addEventListener('click', restartGame);