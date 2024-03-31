// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/build-a-cash-register-project/build-a-cash-register
// Challenge FreeCodeCamp

const cash = document.getElementById("cash");
const dueChangeDisplay = document.getElementById("change-due");
const inputBTN = document.getElementById("purchase-btn");
//
//
let price = 19.5;
let cid = [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]];
//
//
inputBTN.addEventListener("click", (event) => {
  event.preventDefault();
  let currentCash = parseFloat(cash.value);
  const changeDue = currentCash - price;
  let totalCid = 0;
  let changeTExt = "Status: OPEN";
  let changeCid = [];
  const currencyUnit = {
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

  cid.forEach((elem) => (totalCid += elem[1]));
  totalCid = totalCid.toFixed(2);

  if (totalCid == changeDue) {
    changeTExt = "Status: CLOSED";
    cid.forEach((elem) => {
      changeTExt += ` ${elem[0]}: $${elem[1]}`;
    });
    return (dueChangeDisplay.innerHTML = `<div id="change-due"><p>${changeTExt}</p></div>`);
  }

  if (price > currentCash) {
    return alert("Customer does not have enough money to purchase the item");
  } else if (price === currentCash) {
    return (dueChangeDisplay.innerHTML = `<div id="change-due">
            <p>No change due - customer paid with exact cash</p></div>`);
  } else {
    if (totalCid >= changeDue) {
      let remainingChange = changeDue;
      for (let i = cid.length - 1; i >= 0; i--) {
        const [moneyTag, moneyTotal] = cid[i];
        const moneyValue = currencyUnit[moneyTag];
        if (moneyValue <= remainingChange && moneyTotal > 0) {
          const numBills = Math.min(
            Math.floor(remainingChange / moneyValue),
            moneyTotal / moneyValue
          );
          const billAmount = numBills * moneyValue;
          remainingChange -= billAmount;
          remainingChange = Math.round(remainingChange * 100) / 100;
          changeCid.push([moneyTag, billAmount]);
          cid[i][1] -= billAmount;
        }
      }

      totalCid = 0;
      cid.forEach((elem) => (totalCid += elem[1]));
      totalCid = totalCid.toFixed(2);

      if (remainingChange > 0) {
        changeTExt = "Status: INSUFFICIENT_FUNDS";
      } else if (totalCid == 0) {
        changeTExt = "Status: CLOSED";
        changeCid.forEach((elem) => {
          changeTExt += ` ${elem[0]}: $${elem[1]}`;
        });
      } else {
        changeTExt = "Status: OPEN";
        changeCid.forEach((elem) => {
          changeTExt += ` ${elem[0]}: $${elem[1]}`;
        });
      }

      return (dueChangeDisplay.innerHTML = `<div id="change-due"><p>${changeTExt}</p></div>`);
    }

    if (totalCid < changeDue) {
      changeTExt = `Status: INSUFFICIENT_FUNDS`;

      return (dueChangeDisplay.innerHTML = `<div id="change-due">
          <p>${changeTExt}</p>
        </div>`);
    }
  }
});

