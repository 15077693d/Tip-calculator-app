let billAmount = null;
let tipPercentage = null;
let numberOfPeople = null;
let activeTipBtnId = null;

function init() {
  document
    .getElementById("bill-amount")
    .addEventListener("input", handleBillAmountInput);
  document
    .getElementById("number-of-people")
    .addEventListener("input", handleNumberOfPeopleInput);
  document
    .getElementById("tip-percentage-5")
    .addEventListener("click", handleClickTip);
  document
    .getElementById("tip-percentage-10")
    .addEventListener("click", handleClickTip);
  document
    .getElementById("tip-percentage-15")
    .addEventListener("click", handleClickTip);
  document
    .getElementById("tip-percentage-25")
    .addEventListener("click", handleClickTip);
  document
    .getElementById("tip-percentage-50")
    .addEventListener("click", handleClickTip);
  document
    .getElementById("reset-btn")
    .addEventListener("click", handleClickReset);
  document
    .getElementById("tip-percentage-custom-btn")
    .addEventListener("click", handleClickCustomTip);
}

function detectAndRenderError(value, warningElement, inputElement) {
  if (value == "") {
    inputElement.target.value = "";
    warningElement.style.display = "none";
    inputElement.target.style.border = "";
    return true;
  } else if (value.includes("-")) {
    inputElement.target.value = value.replace("-", "");
    warningElement.style.display = "none";
    inputElement.target.style.border = "";
    return true;
  } else if (Number(value) === 0) {
    inputElement.target.style.border = "#ff2f00 3px solid";
    warningElement.style.display = "block";
    warningElement.innerText = "Can't be zero";
    return true;
  } else {
    warningElement.style.display = "none";
    inputElement.target.style.border = "";
    return false;
  }
}

function handleCustomTipInput(e) {
  const warningElement = document.getElementById("tip-percentage-error");
  detectAndRenderError(e.target.value, warningElement, e);
  if (Number(e.target.value) === 0) {
    tipPercentage = null;
  } else {
    tipPercentage = Number(e.target.value) / 100;
  }
  calculateResult();
}

function handleClickCustomTip() {
  // unselect activeTipBtnId
  handleUnselectTip();
  document.getElementById("tip-percentage-custom-btn").style.display = "none";
  document.getElementById("tip-percentage-custom-input").style.display =
    "block";
  document.getElementById("tip-percentage-custom-input").focus();
  document
    .getElementById("tip-percentage-custom-input")
    .addEventListener("input", handleCustomTipInput);
}

function handleUnselectCustomTip() {
  document.getElementById("tip-percentage-custom-btn").value = "";
  document
    .getElementById("tip-percentage-custom-input")
    .removeEventListener("input", handleCustomTipInput);
  document.getElementById("tip-percentage-custom-btn").style.display = "block";
  document.getElementById("tip-percentage-custom-input").style.display = "none";
}

function handleClickTip(e) {
  handleUnselectCustomTip();
  if (activeTipBtnId) {
    document.getElementById(activeTipBtnId).className = "tip-btn";
    if (activeTipBtnId === e.target.id) {
      handleUnselectTip();
      return;
    }
  }
  e.target.className = "tip-btn-focus tip-btn";
  activeTipBtnId = e.target.id;
  tipPercentage = Number(e.target.id.split("-")[2]) / 100;
  calculateResult();
}

function handleUnselectTip() {
  if (activeTipBtnId) {
    document.getElementById(activeTipBtnId).className = "tip-btn";
    tipPercentage = null;
    activeTipBtnId = null;
    calculateResult();
  }
}

function handleBillAmountInput(e) {
  const warningElement = document.getElementById("bill-amount-error");
  detectAndRenderError(e.target.value, warningElement, e);
  if (Number(e.target.value) === 0) {
    billAmount = null;
  } else {
    billAmount = Number(e.target.value);
  }
  calculateResult();
}

function handleNumberOfPeopleInput(e) {
  const warningElement = document.getElementById("number-of-people-error");
  detectAndRenderError(e.target.value, warningElement, e);
  if (Number(e.target.value) === 0) {
    numberOfPeople = null;
  } else {
    numberOfPeople = Number(e.target.value);
  }
  calculateResult();
}

function handleClickReset() {
  document.getElementById("bill-amount").value = "";
  document.getElementById("number-of-people").value = "";
  if (document.getElementById("tip-percentage-custom")) {
    document.getElementById("tip-percentage-custom").value = "";
  }
  if (activeTipBtnId) {
    document.getElementById(activeTipBtnId).className = "tip-btn";
  }
  document.getElementById("tip-amount-result").innerText = `$0.00`;
  document.getElementById("total-amount-result").innerText = `$0.00`;
  handleUnselectCustomTip();
  handleUnselectTip();
  billAmount = null;
  numberOfPeople = null;
}

function calculateResult() {
  if (
    billAmount !== null &&
    tipPercentage !== null &&
    numberOfPeople !== null
  ) {
    const tipAmount = billAmount * tipPercentage;
    const totalAmount = billAmount + tipAmount;
    const tipAmountEachOne = (tipAmount / numberOfPeople).toFixed(2);
    const totalAmountEachOne = (totalAmount / numberOfPeople).toFixed(2);
    // confirm amount is more than zero
    if (Number(tipAmountEachOne) + Number(totalAmountEachOne) > 0) {
      document.getElementById(
        "tip-amount-result"
      ).innerText = `$${tipAmountEachOne}`;
      document.getElementById(
        "total-amount-result"
      ).innerText = `$${totalAmountEachOne}`;
    }
  } else {
    document.getElementById("tip-amount-result").innerText = `$0.00`;
    document.getElementById("total-amount-result").innerText = `$0.00`;
  }
}

init();
