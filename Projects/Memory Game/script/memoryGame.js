import random from "./random.js";

let clickedBoxes = [];
let foundBoxes = [];
let counter = 0;
let toArray = document.querySelectorAll('.box');
let boxes = Array.from(toArray);
let gameWrapper = document.querySelector('.game-wrapper');
const frame = document.querySelector('.frame');
const youWinElm = document.createElement('div');

let [seconds, minutes] = [0, 0];
let watchDisplay = document.querySelector('#stopWatchDisplay');
watchDisplay.innerHTML = `Timer: <br> 00:00`;
let int = null;

document.querySelector('#startTimer').addEventListener('click', () => {
  if (int !== null) {
    clearInterval(int);
  }
  int = setInterval(displayTimer, 1000);
});

const displayTimer = () => {
  seconds++;
  if (seconds == 60) {
    seconds = 0;
    minutes++;
    if (minutes == 60) {
      minutes = 0;
      hours++;
    }
  }
  let m = minutes < 10 ? '0' + minutes : minutes;
  let s = seconds < 10 ? '0' + seconds : seconds;
  watchDisplay.innerHTML = `Timer: <br> ${m}:${s}`;
};

const comparison = () => {
  if (counter === 1) {
    return;
  }
  if (counter === 2) {
    if (clickedBoxes[0] === clickedBoxes[1]) {
      return;
    } else if (clickedBoxes[0].className === clickedBoxes[1].className) {
      return true;
    }
  }
  return false;
};

const randomizeBoardArr = () => {
  let l = boxes.length;
  for (let i = 0; i < l; i++) {
    let randomIndex = random(0, l - 1); // choose random index
    //swipe
    let temp = boxes[i];
    boxes[i] = boxes[randomIndex];
    boxes[randomIndex] = temp;
    boxes.forEach(t => gameWrapper.appendChild(t));
  }
  // console.log(boxes); // cheats
};

const cardClickHandle = () => {
  for (let box of boxes) {
    box.addEventListener('click', function cardClick() {
      if (counter === 2) {
        return;
      }
      box.classList.toggle('active');
      clickedBoxes.push(box);
      counter++;
      if (comparison() === true) {
        foundBoxes.push(clickedBoxes[0], clickedBoxes[1]);
        counter = 0;
        clickedBoxes = [];
        isEndGame();
      } else if (comparison() === false) {
        setTimeout(() => {
          clickedBoxes[0].classList.remove('active');
          clickedBoxes[1].classList.remove('active');
          counter = 0;
          clickedBoxes = [];
        }, 1000);
      }

    });
  }
};

const resetBoard = () => {
  for (let i = 0; i < foundBoxes.length; i++) {
    foundBoxes[i].classList.remove('active');
  }
  clickedBoxes = [];
  foundBoxes = [];
  youWinElm.style.display = 'none';
  clearInterval(int);
  seconds = 0;
  minutes = 0;
  watchDisplay.innerHTML = `Timer: <br> 00:00`;
  randomizeBoardArr();
};

const isEndGame = () => {
  if (foundBoxes.length === 16) {
    youWinElm.classList.add('you-win-elm');
    let m = minutes < 10 ? '0' + minutes : minutes;
    let s = seconds < 10 ? '0' + seconds : seconds;
    youWinElm.innerHTML = `You Win! <br> 🎉 <br> Your time: ${m}:${s}`;
    clearInterval(int);
    youWinElm.style.display = 'flex';
    frame.appendChild(youWinElm);
  }
};

window.addEventListener('load', () => {
  cardClickHandle();
  randomizeBoardArr();
  document.querySelector('#resetBtn').addEventListener('click', resetBoard);
});