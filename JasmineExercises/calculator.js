window.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +document.getElementById("loan-amount").value,
    years: +document.getElementById("loan-years").value,
    rate: +document.getElementById("loan-rate").value,
  };
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const values = { amount: 100000, years: 20, rate: 5 };
  const inputAmount = document.querySelector("#loan-amount");
  inputAmount.value = values.amount;
  const inputYears = document.querySelector("#loan-years");
  inputYears.value = values.years;
  const inputRate = document.querySelector("#loan-rate");
  inputRate.value = values.rate;
  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const currentInputValues = getCurrentUIValues();
  updateMonthly(calculateMonthlyPayment(currentInputValues));
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  let monthlyInterestRate = values.rate / 100 / 12;
  let n = values.years * 12;
  return (
    (monthlyInterestRate * values.amount) /
    (1 - Math.pow(1 + monthlyInterestRate, -n))
  ).toFixed(2);
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const monthlyInputValue = document.querySelector("#monthly-payment");
  monthlyInputValue.innerText = "$" + monthly;
}
