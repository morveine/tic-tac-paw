const gameboard = document.querySelector('.gameboard');
const boardState = Array(3).fill(null).map(() => Array(3).fill(null));
let turn = 'x';

gameboard.addEventListener('click', placeMark);

function placeMark(e) {
    const tile = e.target;
    const tileIndex = parseInt(tile.getAttribute('data-index')) - 1;
    const img = document.createElement('img');
    const rowIndex = Math.floor(tileIndex / 3);
    const colIndex = tileIndex % 3;
    if (boardState[rowIndex][colIndex] !== null) return;

    boardState[rowIndex][colIndex] = turn;

    if (turn === 'x') {
        img.src = 'white.svg';
    } else {
        img.src = 'black.svg';
    }

    const plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    const random = Math.floor(Math.random() * (40 - 10) + 15);
    img.style.rotate = (random * plusOrMinus) + 'deg';
    tile.appendChild(img);

    toggleState();
    checkForWin();
}

function toggleState() {
    if (turn === 'x') {
        turn = 'o';
    } else {
        turn = 'x';
    }
}

function checkForWin() {
    let winner = '';
    for (let col = 0; col < 3; col++) {
        if (
            boardState[0][col] !== null &&
            boardState[0][col] === boardState[1][col] &&
            boardState[1][col] === boardState[2][col]
        ) {
            winner = boardState[0][col];
            return true; //vertical
        }
    }
    const allEqual = arr => arr.every(v => v !== null && v === arr[0]);
    for (arr of boardState) {
        if (allEqual(arr)) {
            winner = arr[0];
            return true; //horizontal
        }
    }
    if (
        boardState[0][0] !== null &&
        boardState[1][1] === boardState[0][0] &&
        boardState[2][2] === boardState[1][1] 
        ||
        boardState[0][2] !== null &&
        boardState[1][1] === boardState[0][2] &&
        boardState[2][0] === boardState[1][1]
    ) {
        winner = boardState[1][1];
        return true;
    }
    return false;
}

function restartGame() { }

// function that checks if somebody won (loop over the array)

// function that clears the board