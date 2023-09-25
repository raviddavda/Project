const itemsContainer = document.querySelector('.items-container');
const cartInfo = document.querySelector('#cartInfo');
const list = document.querySelector('#list');
const loadCartBtn = document.querySelector('#loadCartBtn');
let cartItems = [];

const addNewItem = (quantity, newItemPrice, itemName) => {
  if (!itemName) {
    return;
  } else if (!newItemPrice) {
    return;
  } else if (!quantity) {
    return;
  } else {
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('itemRemove');
    deleteBtn.textContent = 'X';
    deleteBtn.addEventListener('click', removeItem);
    const newItem = document.createElement('li');
    cartItems.push({
      quantity,
      itemName,
      newItemPrice,
    });
    localStorage.setItem('cart', JSON.stringify(cartItems))
    newItem.innerHTML = `<p>${quantity}</p> <p>${itemName}</p> <p>${newItemPrice}₪</p>`;
    newItem.appendChild(deleteBtn);
    list.appendChild(newItem);
  }
};

const removeItem = (e) => {
  e.target.parentElement.remove();
  cartItems.splice(cartItems.indexOf(e), 1);
  totalCost();
};

const totalCost = () => {
  let cost = document.querySelector('.totalCost');
  let totalCost = 0;
  for (const item of cartItems) {
    totalCost = totalCost + +item.newItemPrice * item.quantity;
  }
  cost.innerText = `Total Cost: ${totalCost.toFixed(2)}₪`;
  cartInfo.appendChild(cost);
};

const resetCart = () => {
  document.querySelector('#resetCartBtn').addEventListener('click', () => {
    while (list.hasChildNodes()) {
      list.removeChild(list.firstChild);
    }
    cartItems = [];
    totalCost();
  });
};

const loadCart = () => {
  cartItems = [];
  let newCartItems = [];
  let jsonStr = localStorage.getItem('cart');
  if (!jsonStr) {
    return;
  } else {
    newCartItems = JSON.parse(jsonStr);
    for (let item of newCartItems) {
      addNewItem(
        item.quantity,
        item.newItemPrice,
        item.itemName,
      );
    }
  }
  totalCost();
};

const handleLoadCart = () => {
  loadCartBtn.addEventListener('click', () => {
    loadCart();
  });
};

window.addEventListener('load', () => {
  document.querySelector('#cart').addEventListener('submit', (e) => {
    e.preventDefault();
    const quantity = document.querySelector('#quantity');
    const newItemPrice = document.querySelector('#price');
    const itemName = document.querySelector('#itemName');
    addNewItem(
      quantity.value,
      newItemPrice.value,
      itemName.value,
    );
    totalCost();
  });
  handleLoadCart();
  resetCart();
});