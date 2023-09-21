const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let n1 = getRandomIntInclusive(1, 10);
let n2 = getRandomIntInclusive(1, 10);

let isAnswer;

document.querySelector('#setBtn').addEventListener('click', (e) => {
  e.preventDefault();
  let { value: num1 } = document.querySelector('#num1');
  let { value: num2 } = document.querySelector('#num2');
  n1 = getRandomIntInclusive(num1, num2);
  n2 = getRandomIntInclusive(num1, num2);
  question();
});

const question = () => {
  const { value: operator } = document.querySelector('#operator');
  if (operator === 'plus') {
    document.querySelector('#question').innerText = `${n1} + ${n2} = `;
  }
  if (operator === 'minus') {
    document.querySelector('#question').innerText = `${n1} - ${n2} = `;
  }
  if (operator === 'divide') {
    document.querySelector('#question').innerText = `${n1} / ${n2} = `;
  }
  if (operator === 'multiply') {
    document.querySelector('#question').innerText = `${n1} X ${n2} = `;
  }
};

const reset = () => {
  n1 = getRandomIntInclusive(1, 10);
  n2 = getRandomIntInclusive(1, 10);
  question();
};

document.querySelector('#resetBtn').addEventListener('click', (e) => {
  e.preventDefault();
  if (document.contains(document.querySelector('.popup'))) {
    document.querySelector('.popup').remove();
  }
  reset();
  num1.value = '';
  num2.value = '';
  answer.value = '';
});

const questAnswer = () => {
  let answer = document.querySelector('#answer');
  if (!answer.value) {
    answer.classList.add('required');
    setTimeout(() => {
      answer.classList.remove('required');
    }, 2000);
    return;
  } else {
    const { value: operator } = document.querySelector('#operator');
    if (operator === 'plus') {
      if (n1 + n2 == answer.value) {
        correct();
        isAnswer = true;
      } else {
        wrong();
        isAnswer = false;
      }
    }
    if (operator === 'minus') {
      if (n1 - n2 == answer.value) {
        correct();
        isAnswer = true;
      } else {
        wrong();
        isAnswer = false;
      }
    }
    if (operator === 'divide') {
      if (n1 / n2 == answer.value) {
        correct();
        isAnswer = true;
      } else {
        wrong();
        isAnswer = false;
      }
    }
    if (operator === 'multiply') {
      if (n1 * n2 == answer.value) {
        correct();
        isAnswer = true;
      } else {
        wrong();
        isAnswer = false;
      }
    }
  }
};

const correct = () => {
  if (document.contains(document.querySelector('.popup'))) {
    return;
  } else {
    const correctPopup = document.createElement('div');
    correctPopup.textContent = 'Correct!';
    correctPopup.classList.add('popup');
    document.body.appendChild(correctPopup);
  }
}

const wrong = () => {
  if (document.contains(document.querySelector('.popup'))) {
    return;
  } else {
    const wrongPopup = document.createElement('div');
    wrongPopup.textContent = 'Wrong!';
    wrongPopup.classList.add('popup');
    document.body.appendChild(wrongPopup);
  }
}

window.addEventListener('load', () => {
  question();
  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    questAnswer();
  })
});