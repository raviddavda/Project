const itemsContainer = document.querySelector('.items-container');
const cartInfo = document.querySelector('#cartInfo');
const list = document.querySelector('#list');
let cartCost = [];
let cartItems = [];

const addNewItem = () => {
  const { value: quantity } = document.querySelector('#quantity');
  const { value: newItemPrice } = document.querySelector('#price');
  const { value: listItem } = document.querySelector('#listItem');
  if (!listItem) {
    return;
  } else if (!newItemPrice) {
    return;
  } else if (!quantity) {
    return;
  } else {
    const newItem = document.createElement('li');
    cartItems.push(newItem);
    cartCost.push(newItemPrice * +quantity);
    newItem.innerHTML = `<p>${quantity}</p> <p>${listItem}</p> <p>${newItemPrice}₪</p>`;
    for (let i = 0; i < cartItems.length; i++) {
      cartItems[i].addEventListener('click', () => {
        cartItems[i].style.textDecoration = 'line-through';
      })
    };
    document.querySelector('#list').appendChild(newItem);
  }
};

const totalCost = () => {
  let cost = document.querySelector('.totalCost');
  let totalCost = 0;
  for (const item of cartCost) {
    totalCost = totalCost + +item;
  }
  cost.innerText = `Total Cost: ${totalCost.toFixed(2)}₪`;
  cartInfo.appendChild(cost);
};

const resetCart = () => {
  document.querySelector('#resetCartBtn').addEventListener('click', () => {
    console.log('sdaf');
    while (list.hasChildNodes()) {
      list.removeChild(list.firstChild);
    }
    cartItems = [];
    cartCost = [];
    totalCost();
  });
};

window.addEventListener('load', () => {
  document.querySelector('#cart').addEventListener('submit', (e) => {
    e.preventDefault();
    addNewItem();
    totalCost();
  });
  resetCart();
});