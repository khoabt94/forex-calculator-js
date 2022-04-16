///////////////////////////////////////////////////////////
// SELECTORS
const currencyEl_one = document.getElementById("currency-one");
const amountEl_one = document.getElementById("amount-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_two = document.getElementById("amount-two");
const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

///////////////////////////////////////////////////////////
// HELPER FUNCTION
const calculate = async () => {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  const url = `https://v6.exchangerate-api.com/v6/552a7901877dadce72aaaf2f/latest/${currency_one}`;

  const response = await fetch(url);
  const { conversion_rates } = await response.json();
  const rate = conversion_rates[currency_two];

  rateEl.textContent = `1 ${currency_one} = ${rate} ${currency_two}`;

  amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
};

///////////////////////////////////////////////////////////
// EVENT LISTENERS
currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  console.log("click");
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

calculate();
