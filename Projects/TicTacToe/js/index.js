import { againstComputer } from './againstPClogic.js';

let whoPlayNow;
let whoWonTheGame;
let score = {
  X: 0,
  O: 0,
  ties: 0
};

document.querySelector('#resetScoreBtn').addEventListener('click', () => {
  document.querySelector('p').innerHTML = 'X: 0, O: 0, Ties: 0';
  score = {
    X: 0,
    O: 0,
    ties: 0
  };
});


// game logic
const isEndGame = () => {
  let cells = document.querySelectorAll('.game-wrapper > div');
  //vertical check
  for (let i = 0; i <= 2; i++) {
    if (
      cells[i].innerHTML == cells[i + 3].innerHTML &&
      cells[i + 3].innerHTML == cells[i + 6].innerHTML &&
      cells[i].innerHTML != ''
    ) {
      whoWonTheGame = cells[i].innerHTML;
    }
  }
  //horizontal check
  for (let i = 0; i < 9; i += 3) {
    if (
      cells[i].innerHTML == cells[i + 1].innerHTML &&
      cells[i + 1].innerHTML == cells[i + 2].innerHTML &&
      cells[i].innerHTML != ''
    ) {
      whoWonTheGame = cells[i].innerHTML;
    }
  }
  //left to right diagonal check
  let i = 0;
  if (
    cells[i].innerHTML == cells[i + 4].innerHTML &&
    cells[i + 4].innerHTML == cells[i + 8].innerHTML &&
    cells[i].innerHTML != ''
  ) {
    whoWonTheGame = cells[i].innerHTML;
  }
  i = 2;
  if (
    cells[i].innerHTML == cells[i + 2].innerHTML &&
    cells[i + 2].innerHTML == cells[i + 4].innerHTML &&
    cells[i].innerHTML != ''
  ) {
    whoWonTheGame = cells[i].innerHTML;
  }

  //declares a winner
  if (whoWonTheGame != undefined) {
    const winner = document.querySelector('#winner');
    winner.textContent = `${whoPlayNow} Won the game!`;
    winner.style.display = 'block';
  } else {
    for (let cell of cells) {
      if (cell.innerHTML == '') {
        return;
      }
    }
    winner.textContent = `no one won the game`;
    winner.style.display = 'block';
    score.ties += 1;
    updateScore();
  }
  if (whoWonTheGame == 'x') {
    score.X += 1;
    updateScore();
  }
  if (whoWonTheGame == 'o') {
    score.O += 1;
    updateScore();
  }
};

const updateScore = () => {
  document.querySelector('p').
    innerHTML = `X: ${score.X}, O: ${score.O}, Ties: ${score.ties}`;
};

// makes sure game won't end if cells are empty
const handleClickXO = (myE) => {
  if (myE.target.innerHTML != '') {
    return;
  }
  // turn switcher
  myE.target.innerHTML = whoPlayNow;
  isEndGame();
  if (whoWonTheGame) {
    let cells = document.querySelectorAll('.game-wrapper > div');
    for (const cell of cells) cell.removeEventListener('click', handleClickXO);
    return;
  };

  whoPlayNow == 'x' ? (whoPlayNow = 'o') : (whoPlayNow = 'x');
  if (whoPlayNow == 'x') {
  } else {
    againstComputer();
  }
};

// click logic
const initPageLoad = () => {
  let cells = document.querySelectorAll('.game-wrapper > div');
  for (let cell of cells) {
    cell.addEventListener('click', handleClickXO);
  }
};

// resets html inside cells
const newGame = () => {
  whoPlayNow = 'x';
  whoWonTheGame = null;
  winner.style.display = 'none';
  let cells = document.querySelectorAll('.game-wrapper > div');
  for (let cell of cells) {
    cell.innerHTML = '';
  }
  initPageLoad();
};

window.addEventListener('load', () => {
  updateScore();
  newGame();
  document.querySelector('#playAgainBtn').addEventListener('click', () => {
    newGame();
  })
});