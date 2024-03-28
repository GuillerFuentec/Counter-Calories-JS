/*
"Status: INSUFFICIENT_FUNDS": if cash-in-drawer is less than the change due, 
or if you cannot return the exact change.

"Status: CLOSED": if cash-in-drawer is equal to the change due.

"Status: OPEN": if cash-in-drawer is greater than the change due and you can 
return change, with the change due in coins and bills sorted in highest to 
lowest order.
*/

//display class

class Display {
    constructor(name, price) {
      this.name = name;
      this.price = price;
    }
  
    totalCost(arr) {
      const total = arr.reduce((acc, price) => {
        acc + price;
      }, 0);
      return total;
    }
  }

/********************************** * variables * **********************************/
let cash = document.querySelector("#cash");
const dessertCards = document.getElementById("dessert-card-container");
// let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const products = [
  {
    name: "Vanilla Cupcakes (6 Pack)",
    price: 12.99,
  },
  {
    name: "Coca-Cola",
    price: 1.99,
  },
  {
    name: "Snickers Bar",
    price: 1.49,
  },
  {
    name: "M&M's",
    price: 2.29,
  },
  {
    name: "Twix Bar",
    price: 1.79,
  },
  {
    name: "Lays Potato Chips",
    price: 2.99,
  },
  {
    name: "Doritos Nacho Cheese Chips",
    price: 3.49,
  },
  {
    name: "Kit Kat",
    price: 1.99,
  },
  {
    name: "Oreo Cookies",
    price: 2.79,
  },
  {
    name: "Pepsi",
    price: 1.99,
  },
  {
    name: "Hershey's Chocolate Bar",
    price: 2.29,
  },
];

products.forEach(({ name, price }) => {
  dessertCards.innerHTML += `
        <div class="dessert-card">
        <h2>${name}</h2>
        <p class="dessert-price">$${price}</p>
        <button 
        id=""
        class="btn add-to-cart-btn">Purchasse
        </button>
        </div>
        `;
});
const btn = document.getElementById("btn add-to-cart-btn");
const totalDisplayed = document.getElementById("display-price");


const display = new Display(products.name, products.price);

btn.addEventListener('click', ()=> {
    totalDisplayed.innerHTML += `<div id="display-price"></div>`;
});