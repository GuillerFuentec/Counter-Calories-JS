function giveChange(price, cash, cid) {
    let changeDue = cash - price;
    let change = [];
  
    const currencyUnit = {
      "PENNY": 0.01,
      "NICKEL": 0.05,
      "DIME": 0.1,
      "QUARTER": 0.25,
      "ONE": 1,
      "FIVE": 5,
      "TEN": 10,
      "TWENTY": 20,
      "ONE HUNDRED": 100
    };
  
    for (let i = cid.length - 1; i >= 0; i--) {
      const [coinName, coinTotal] = cid[i];
      const coinValue = currencyUnit[coinName];
      let coinCount = Math.min(Math.floor(changeDue / coinValue), coinTotal / coinValue);
      if (coinCount > 0) {
        changeDue -= coinValue * coinCount;
        changeDue = Number(changeDue.toFixed(2)); // Fix floating point arithmetic issues
        change.push([coinName, coinValue * coinCount]);
      }
    }
  
    if (changeDue > 0) {
      return "Insufficient funds";
    } else {
      return change;
    }
  }
  
  // Ejemplo de uso
  let cid = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
  ];
  
  console.log(giveChange(19.5, 20, cid)); // [["QUARTER", 0.5]]
  