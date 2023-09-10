let elmsArr = [];
let pageDiv = document.querySelector('#pageDiv');

const createElm = (tagName, content, color, fontSize, fontSizeOption, width, height, textAlign) => {
  if (!tagName) {
    return;
  } else if (!content) {
    return;
  } else {
    const newElm = document.createElement(tagName);
    pageDiv.appendChild(newElm);
    newElm.innerText = content;
    newElm.style.color = color;
    newElm.style.fontSize = fontSize + fontSizeOption;
    newElm.style.width = width + 'px';
    newElm.style.height = height + 'px';
    newElm.style.textAlign = textAlign;
    elmsArr.push({
      tagName,
      content,
      color,
      fontSize,
      width,
      height
    })
  }
};

const restorePage = () => {
  elmsArr = []; //clears the array
  let newElmsArr = [];
  let jsonStr = localStorage.getItem('tags'); // gets json string from local storage
  // console.log('jsonStr', jsonStr);
  if (!jsonStr) {
    return;
  } else {
    newElmsArr = JSON.parse(jsonStr); //converts from json to javascript
    for (let item of newElmsArr) {
      createElm(
        item.tagName,
        item.content,
        item.color,
        item.fontSize,
        item.width,
        item.height,
        item.textAlign
      );
    }
  }
};

const removeElm = () => {
  document.querySelector('#undoBtn').addEventListener('click', () => {
    pageDiv.lastChild.remove();
    elmsArr.pop();
  });
};

const clearPage = () => {
  let pageDiv = document.querySelector('#pageDiv');
  pageDiv.innerHTML = '';
};

const divider = () => {
  document.querySelector('#divideBtn').addEventListener('click', () => {
    const hr = document.createElement('hr');
    pageDiv.appendChild(hr);
  });
};

window.addEventListener("load", () => {
  document.querySelector('#pageInp').addEventListener("submit", (e) => {
    e.preventDefault(); //stop refresh
  });
  document.querySelector('#submitBtn').addEventListener("click", () => {
    let inputTag = document.querySelector('#inputTag');
    let inputContent = document.querySelector('#inputContent');
    let inputColor = document.querySelector('#inputColor');
    let inputSize = document.querySelector('#inputSize');
    let inputSizeOption = document.querySelector('#inputSizeOption');
    let inputWidth = document.querySelector('#inputWidth');
    let inputHeight = document.querySelector('#inputHeight');
    let textAlign = document.querySelector('#textAlign');
    createElm(
      inputTag.value,
      inputContent.value,
      inputColor.value,
      inputSize.value,
      inputSizeOption.value,
      inputWidth.value,
      inputHeight.value,
      textAlign.value,
    );
  });
  document.getElementById('saveBtn').addEventListener('click', () => {
    let jsonStr = JSON.stringify(elmsArr); // convert array to string (json)
    localStorage.setItem('tags', jsonStr);
  });
  document.querySelector('#resetBtn').addEventListener('click', () => {
    clearPage();
    restorePage();
  });
  removeElm();
  divider();
});