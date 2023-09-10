import random from "./random.js";

const cardTemplate = (item, idx) => {
  return `
  <div class="flip-box">
    <div class="flip-box-inner" id="card${idx}">
      <div class="flip-box-front">
        <img
          src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
          alt="image"
        />
      </div>
      <div class="flip-box-back">
        <h1>${item}</h1>
      </div>
    </div>
  </div>
  `;
};

let boardArr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];

const randomizeBoardArr = () => {
  let l = boardArr.length;
  for (let i = 0; i < l; i++) {
    let randomIndex = random(0, l - 1); // choose random index
    //swipe
    let temp = boardArr[i];
    boardArr[i] = boardArr[randomIndex];
    boardArr[randomIndex] = temp;
  }
};

const initCards = () => {
  let cardContainer = document.getElementById("cardContainer");
  if (!cardContainer) return;
  randomizeBoardArr();
  let str = "";
  let idx = 0;
  for (let item of boardArr) {
    str += cardTemplate(item, idx++);
  }
  cardContainer.innerHTML = str;
  let flipBox = document.querySelectorAll(".flip-box-inner");
  for (let elm of flipBox) {
    elm.addEventListener("click", (e) => {
      let parentDiv = e.target;
      //looking for the element that rotate
      while (!parentDiv.classList.contains("flip-box-inner")) {
        parentDiv = parentDiv.parentElement;
      }
      parentDiv.classList.toggle("flip-box-click"); //turn over
    });
  }
};

window.addEventListener("load", () => {
  initCards();
});
