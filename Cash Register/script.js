//display class

class CashRegister {
  constructor(price, cash, cid) {
    this.price = price;
    this.cash = cash;
    this.cid = cid;
    this.change = [];
    this.currencyUnit = {
      PENNY: 0.01,
      NICKEL: 0.05,
      DIME: 0.1,
      QUARTER: 0.25,
      ONE: 1,
      FIVE: 5,
      TEN: 10,
      TWENTY: 20,
      "ONE HUNDRED": 100,
    };
  }

  totalAmountCustomer() {
    return this.price.reduce((acc, curr) => acc + curr, 0);
  }

  dueAmount() {
    if (this.cash < this.totalAmountCustomer()) {
      //
      alert("Customer does not have enough money to purchase the item");
      return;
    } else {
      //
      switch (!isNaN(this.cash)) {
        //
        case this.cash === this.totalAmountCustomer():
          return this.printAmount();

        case this.cash > this.totalAmountCustomer():
          //
          let dueChange = this.cash - this.price;
          this.change = [];

          for (let index = cid.length - 1; index >= 0; index--) {
            //

            const [moneyTag, moneyTotal] = this.cid[index];
            const moneyValue = this.currencyUnit[moneyTag];
            let coinCount = Math.min(
              Math.floor(dueChange / moneyValue),
              moneyTotal / moneyValue
            );
            if (coinCount > 0) {
              dueChange -= moneyValue * moneyTotal;
              dueChange = Number(dueChange.toFixed(2));
              this.change.push([moneyTag, moneyValue * coinCount]);
            }
          }

          if (dueChange < 0) {
            this.printAmount();
            return;
          } else {
            return this.change;
          }

        default:
          alert("Invalid Amount");
          break;
      }
    }
  }

  currentAmount() {
    const cidObject = Object.fromEntries(cid);

    for (let i = 0; i < this.change.length; i++) {
      const [moneyTag, moneyAmount] = this.change[i];
      cidObject[moneyTag] -= moneyAmount;
    }

    this.cid = Object.entries(cidObject);

    return this.cid;
  }

  printAmount() {
    const totalAmount = this.totalAmountCustomer();
    const changeDue = this.cash - totalAmount;

    if (changeDue < 0) {
      // No hay suficiente efectivo para dar cambio
      changeDueAmount.innerHTML = `<div id="change-due"><p>Status: INSUFFICIENT_FUNDS</p></div>`;
    } else if (changeDue === 0) {
      // El cliente pagó con el monto exacto
      changeDueAmount.innerHTML = `<div id="change-due"><p>No change due - customer paid with exact cash</p></div>`;
    } else {
      // Calcular el cambio

      let change = [];
      let remainingChange = changeDue;

      for (let i = this.cid.length - 1; i >= 0; i--) {
        const [moneyTag, moneyTotal] = this.cid[i];
        const moneyValue = this.currencyUnit[moneyTag];

        if (moneyValue <= remainingChange && moneyTotal > 0) {
          const numBills = Math.min(
            Math.floor(remainingChange / moneyValue),
            moneyTotal / moneyValue
          );
          const billAmount = numBills * moneyValue;
          change.push([moneyTag, billAmount]);
          remainingChange -= billAmount;
          remainingChange = Math.round(remainingChange * 100) / 100;
        }
      }

      if (remainingChange > 0) {
        // No se puede devolver el cambio exacto
        changeDueAmount.innerHTML = `<div id="change-due"><p>Status: INSUFFICIENT_FUNDS</p></div>`;
      } else {
        // Formatear el cambio
        const formattedChange = change
          .map(([moneyTag, billAmount]) => `${moneyTag}: $${billAmount}`)
          .join(" ");
        changeDueAmount.innerHTML = `<div id="change-due"><p>Status: OPEN ${formattedChange}</p></div>`;
      }
    }
  }
}

/********************************** * variables * **********************************/
let cash = document.querySelector("#cash");
const dessertCards = document.getElementById("dessert-card-container");
const totalDisplayed = document.getElementById("display-price");
const changeDueAmount = document.getElementById("change-due");
const totalPrice = [];
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

// Products of main Grocery Store
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

products.forEach(({ name, price }, index) => {
  dessertCards.innerHTML += `
    <div class="dessert-card">
    <h2>${name}</h2>
    <p class="dessert-price">$${price}</p>
    <button 
    class="btn add-to-cart-btn" id="btn${index}">Purchasse
    </button>
    </div>
    `;
});

products.forEach((_, index) => {
  const btn = document.getElementById(`btn${index}`);
  btn.addEventListener("click", () => {
    totalDisplayed.innerHTML = `<div id="display-price">
            <p>The current total cost is: ${5}</p>
        </div>`;
  });
});
