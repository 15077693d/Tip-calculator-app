let billAmount = null;
let tipPercentage = null;
let numberOfPeople = null;
let isCustomTipPercentage = false;

tipPercentage = 0;

function init() {
  document
    .getElementById("bill-amount")
    .addEventListener("input", handleBillAmountInput);
  document
    .getElementById("number-of-people")
    .addEventListener("input", handleNumberOfPeopleInput);
}
function detectAndRenderError(
  value,
  borderElement,
  warningElement,
  inputElement
) {
  if (value == "") {
    inputElement.target.value = "";
    borderElement.style.border = "#F4F8FA 3px solid";
    warningElement.style.display = "none";
    return true;
  } else if (value.includes("-")) {
    inputElement.target.value = value.replace("-", "");
    borderElement.style.border = "#F4F8FA 3px solid";
    warningElement.style.display = "none";
    return true;
  } else if (Number(value) === 0) {
    borderElement.style.border = "#ff2f00 3px solid";
    warningElement.style.display = "block";
    warningElement.innerText = "Can't be zero";
    return true;
  } else {
    borderElement.style.border = "#F4F8FA 3px solid";
    warningElement.style.display = "none";
    return false;
  }
}

function handleBillAmountInput(e) {
  const borderElement = document.getElementById("bill-amount-input-container");
  const warningElement = document.getElementById("bill-amount-error");
  detectAndRenderError(e.target.value, borderElement, warningElement, e);
  if (Number(e.target.value) === 0) {
    billAmount = null;
  } else {
    billAmount = Number(e.target.value);
  }
  calculateResult();
}

function handleNumberOfPeopleInput(e) {
  const borderElement = document.getElementById(
    "number-of-people-input-container"
  );
  const warningElement = document.getElementById("number-of-people-error");
  detectAndRenderError(e.target.value, borderElement, warningElement, e);
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
  document.getElementById("tip-percentage-custom").value = "";
  document.getElementById("tip-amount-result").innerText = `$0.00`;
  document.getElementById("total-amount-result").innerText = `$0.00`;
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
    console.log(
      billAmount,
      tipAmount,
      totalAmount,
      numberOfPeople,
      totalAmountEachOne
    );
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
