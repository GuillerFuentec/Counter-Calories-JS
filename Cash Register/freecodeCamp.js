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
    }
  }
  if (remainingChange > 0) {
    return (dueChangeDisplay.innerHTML = `<div id="change-due"><p>Status: INSUFFICIENT_FUNDS</p></div>`);
  } else {
    changeTExt = "Status: CLOSED";
    cid.forEach(([moneyTag, amount]) => {
      changeTExt += ` ${moneyTag}: ${amount}`;
    });
    return (dueChangeDisplay.innerHTML = `<div id="change-due"><p>${changeTExt}</p></div>`);
  }
}

if (totalCid < changeDue) {
  changeTExt = `Status: INSUFFICIENT_FUNDS`;

  return (dueChangeDisplay.innerHTML = `<div id="change-due">
        <p>${changeTExt}</p>
      </div>`);
}