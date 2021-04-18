let statusDisplay = document.getElementById('game-status');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
const winningMessage = () => `${currentPlayer} has won`;
const drawMessage = () => `Game ended in a draw`;
const curentPlayerTurn = () => `It's a ${currentPlayer}'s turn`;
statusDisplay.innerHTML = curentPlayerTurn();
const winningConditions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
function changePlayer() {
    currentPlayer=currentPlayer=='X'?'0':'X';
    statusDisplay.innerHTML=curentPlayerTurn();
}
function checkResult() {
    let roundWon=false;
    for(let i=0;i<winningConditions.length;i++) {
            let condition=winningConditions[i];
            let a=gameState[condition[0]];
            let b=gameState[condition[1]];
            let c=gameState[condition[2]];
            if (a===b && b===c && a===currentPlayer) {
                roundWon=true;
                break;
            }
    }
    if(roundWon) {
        gameActive=false;
        statusDisplay.innerHTML=winningMessage();
        return;
    }
    let draw=!gameState.includes('');
    if(draw) {
        gameActive=false;
        statusDisplay.innerHTML=drawMessage();
        return;
    }
    changePlayer();
}
function handleClickedCell(currCell,currIndex) {
    gameState[currIndex]=currentPlayer;
    currCell.innerHTML=currentPlayer;
}
function handleClick(event) {
    let currCell=event.target;
    let currIndex=Number(currCell.getAttribute('data-cell-index'));
    if(gameState[currIndex]!='' || !gameActive) {
        return;
    }
    handleClickedCell(currCell,currIndex);
    checkResult();

}
function reset() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive=true;
    currentPlayer='X';
    statusDisplay.innerHTML=curentPlayerTurn();
    document.querySelectorAll('.cell').forEach((cell)=>cell.innerHTML="");

}
document.querySelectorAll('.cell').forEach(
    (cell) => cell.addEventListener('click', handleClick)
);