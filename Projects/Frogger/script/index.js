const blocks = document.querySelectorAll('.game-wrapper div');
const logsLeft = document.querySelectorAll('.log-left');
const logsRight = document.querySelectorAll('.log-right');
const carsLeft = document.querySelectorAll('.car-left');
const carsRight = document.querySelectorAll('.car-right');
const message = document.querySelector('.message');
const retryBtn = document.querySelector('.retryBtn');

let position = 76;
const width = 9;
let moveInterval;
let outCome;

const handleRetryBtn = () => {
  retryBtn.addEventListener('click', () => {
    if (blocks[position].classList.contains('lose')) {
      blocks[position].classList.remove('lose');
    }
    if (blocks[position].classList.contains('frogger')) {
      blocks[position].classList.remove('frogger');
    }
    position = 76;
    blocks[position].classList.add('frogger');
    document.addEventListener('keydown', froggerMove)
    message.textContent = '';
  });
};

const froggerMove = (e) => {
  blocks[position].classList.remove('frogger');

  switch (e.key) {
    case 'ArrowLeft':
      if (position % width !== 0) { position -= 1; }
      break;
    case 'ArrowRight':
      if (position % width < width - 1) { position += 1; }
      break;
    case 'ArrowUp':
      if (position - width >= 0) position -= 9;
      break;
    case 'ArrowDown':
      if (position + width < width * width) position += 9;
      break;
  }
  blocks[position].classList.add('frogger');
};

const autoMove = () => {
  logsLeft.forEach(logLeft => logMoveLeft(logLeft));
  logsRight.forEach(logRight => logMoveRight(logRight));
  carsLeft.forEach(carLeft => carMoveLeft(carLeft));
  carsRight.forEach(carRight => carMoveRight(carRight));
};

const checkOutCome = () => {
  win();
  lose();
};

const logMoveLeft = (logLeft) => {
  switch (true) {
    case logLeft.classList.contains('l1'):
      logLeft.classList.remove('l1');
      logLeft.classList.add('l2');
      break;
    case logLeft.classList.contains('l2'):
      logLeft.classList.remove('l2');
      logLeft.classList.add('l3');
      break;
    case logLeft.classList.contains('l3'):
      logLeft.classList.remove('l3');
      logLeft.classList.add('l4');
      break;
    case logLeft.classList.contains('l4'):
      logLeft.classList.remove('l4');
      logLeft.classList.add('l5');
      break;
    case logLeft.classList.contains('l5'):
      logLeft.classList.remove('l5');
      logLeft.classList.add('l1');
      break;
  }
};

const logMoveRight = (logRight) => {
  switch (true) {
    case logRight.classList.contains('l1'):
      logRight.classList.remove('l1');
      logRight.classList.add('l5');
      break;
    case logRight.classList.contains('l5'):
      logRight.classList.remove('l5');
      logRight.classList.add('l4');
      break;
    case logRight.classList.contains('l4'):
      logRight.classList.remove('l4');
      logRight.classList.add('l3');
      break;
    case logRight.classList.contains('l3'):
      logRight.classList.remove('l3');
      logRight.classList.add('l2');
      break;
    case logRight.classList.contains('l2'):
      logRight.classList.remove('l2');
      logRight.classList.add('l1');
      break;
  }
};

const carMoveLeft = (carLeft) => {
  switch (true) {
    case carLeft.classList.contains('c1'):
      carLeft.classList.remove('c1');
      carLeft.classList.add('c2');
      break;
    case carLeft.classList.contains('c2'):
      carLeft.classList.remove('c2');
      carLeft.classList.add('c3');
      break;
    case carLeft.classList.contains('c3'):
      carLeft.classList.remove('c3');
      carLeft.classList.add('c1');
      break;
  }
};

const carMoveRight = (carRight) => {
  switch (true) {
    case carRight.classList.contains('c3'):
      carRight.classList.remove('c3');
      carRight.classList.add('c2');
      break;
    case carRight.classList.contains('c2'):
      carRight.classList.remove('c2');
      carRight.classList.add('c1');
      break;
    case carRight.classList.contains('c1'):
      carRight.classList.remove('c1');
      carRight.classList.add('c3');
      break;
  }
};

const lose = () => {
  if (
    blocks[position].classList.contains('c1') ||
    blocks[position].classList.contains('l4') ||
    blocks[position].classList.contains('l5')
  ) {
    blocks[position].classList.remove('frogger');
    blocks[position].classList.add('lose');
    document.removeEventListener('keydown', froggerMove);
    message.textContent = 'You Perished';
  }
};

const win = () => {
  if (blocks[position].classList.contains('end')) {
    document.removeEventListener('keydown', froggerMove);
    message.textContent = 'You Win!';
  }
};

window.addEventListener('load', () => {
  document.addEventListener('keydown', froggerMove);
  moveInterval = setInterval(autoMove, 1000);
  outCome = setInterval(checkOutCome, 1);
  handleRetryBtn();
});