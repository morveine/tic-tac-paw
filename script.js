const gameboard = document.querySelector('.gameboard');
const restartButton = document.getElementById('restart-button');
const restartScreen = document.querySelector('.restart-screen');
const winnerSpan = document.getElementById('winner-cat');
const winnerText = document.querySelector('.winner');
const boardState = Array(3).fill(null).map(() => Array(3).fill(null));
const gameTile = Array.from(document.querySelectorAll('.tile'));
let turn = 'x';

gameboard.addEventListener('click', placeMark);
restartButton.addEventListener('click', restartGame);

function placeMark(e) {
    const tile = e.target;
    const tileIndex = parseInt(tile.getAttribute('data-index')) - 1;
    const img = document.createElement('img');
    const rowIndex = Math.floor(tileIndex / 3);
    const colIndex = tileIndex % 3;
    if (boardState[rowIndex][colIndex] !== null) return;

    boardState[rowIndex][colIndex] = turn;

    img.classList.add('paw');
    if (turn === 'x') {
        img.src = 'img/white.svg';
    } else {
        img.src = 'img/black.svg';
    }

    const plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    const random = Math.floor(Math.random() * (40 - 10) + 15);
    img.style.rotate = (random * plusOrMinus) + 'deg';
    tile.appendChild(img);

    if (turn === 'x') {
        turn = 'o';
    } else {
        turn = 'x';
    }

    checkForWin();
}

function checkForWin() {
    let winner = null;

    for (let i = 0; i < 3; i++) {
        if (boardState[i][0] !== null && boardState[i].every(val => val === boardState[i][0])) {
            winner = boardState[i][0]; // horizontal
        } else if (boardState[0][i] !== null && boardState.every(row => row[i] === boardState[0][i])) {
            winner = boardState[0][i]; // vertical
        }
    }

    const centerVal = boardState[1][1];
    if (centerVal !== null) {
        if (
            boardState[0][0] === centerVal && centerVal === boardState[2][2] ||
            boardState[0][2] === centerVal && centerVal === boardState[2][0]
        ) {
            winner = centerVal; // diagonal
        }
    }

    if (!winner && boardState.every(row => row.every(cell => cell !== null))) {
        winner = "tie";
    }

    return getWinner(winner);
}


function getWinner(winner) {
    if (winner) {
        winnerText.classList.remove('hide');
        restartScreen.classList.remove('hide');
    }
    if (winner === 'tie') {
        winnerSpan.textContent = `friendship`;

    } else if (winner === 'x') {
        winnerSpan.textContent = 'white';

    } else if (winner === 'o') {
        winnerSpan.textContent = 'blue';
    }

}


function restartGame() {
    restartScreen.classList.add('hide');
    winnerText.classList.add('hide');
    for (let i = 0; i < boardState.length; i++) {
        for (let j = 0; j < boardState[i].length; j++) {
            boardState[i][j] = null;
        }
    }
    gameTile.forEach(tile => tile.querySelector("img")?.remove());
}