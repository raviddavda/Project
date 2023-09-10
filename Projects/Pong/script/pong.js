const moveBy = 10;

const paddle1 = () => {
  const left = document.querySelector('.row1');
  const paddle1 = document.createElement('div');
  paddle1.classList.add('paddle1');
  paddle1.style.position = 'absolute';
  paddle1.style.width = '25px';
  paddle1.style.height = '125px';
  paddle1.style.top = 0;
  paddle1.style.left = 0;
  paddle1.style.backgroundColor = '#333';
  left.appendChild(paddle1);
  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowUp':
        paddle1.style.top = parseInt(paddle1.style.top) - moveBy + 'px';
        break;
      case 'ArrowDown':
        paddle1.style.top = parseInt(paddle1.style.top) + moveBy + 'px';
        break;
    }
  })
};

const paddle2 = () => {
  const right = document.querySelector('.row3');
  const paddle2 = document.createElement('div');
  paddle2.classList.add('paddle2');
  paddle2.style.position = 'absolute';
  paddle2.style.width = '25px';
  paddle2.style.height = '125px';
  paddle2.style.top = 0;
  paddle2.style.right = 0;
  paddle2.style.backgroundColor = '#333';
  right.appendChild(paddle2);
  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'w':
        paddle2.style.top = parseInt(paddle2.style.top) - moveBy + 'px';
        break;
      case 's':
        paddle2.style.top = parseInt(paddle2.style.top) + moveBy + 'px';
        break;
    }
  })
};

const ballMove = 25;
const court = document.querySelector('.row2');
const ball = document.createElement('div');

const balls = () => {
  ball.style.position = 'absolute';
  ball.style.height = '25px';
  ball.style.width = '25px';
  ball.style.borderRadius = '50%';
  ball.style.top = 0;
  ball.style.right = 0;
  court.appendChild(ball);
};

let ballPos = [];
const ballMoves = () => {
  ball.style.top = parseInt(ball.style.top) + ballMove + 'px';
  ball.style.right = parseInt(ball.style.right) + ballMove + 'px';
  ballPos.push(ball.style.top);
  console.log(ballPos);
};

// setInterval(ballMoves, 500);

for (let ballpos1 of ballPos) {
  console.log(ballpos1[1]);
  if (ballpos1[1] === '400px') {
    console.log('sghujsfdkagdf');
  }
}

window.addEventListener('load', () => {
  // paddle1();
  // paddle2();
  // balls()
});