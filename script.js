let fcurrencylist = document.getElementById('first-currency-list');
let firstAmount = document.getElementById('first-amount');
let scurrencylist = document.getElementById('second-currency-list');
let secondAmount = document.getElementById('second-amount');
let rated = document.getElementById('rate');
let swap = document.getElementById('swap');

fcurrencylist.addEventListener('change', calculate);
firstAmount.addEventListener('input', calculate);
scurrencylist.addEventListener('change', calculate);
secondAmount.addEventListener('input', calculate);

function calculate() {
  let  first_currency = fcurrencylist.value;
  let  second_currency = scurrencylist.value;
  fetch("https://open.exchangerate-api.com/v6/latest")
    .then(res => res.json())
    .then(data => {
      let rate = data.rates[second_currency] / data.rates[first_currency];
      rated.innerText = `1 ${first_currency} = ${rate} ${second_currency}`;
      secondAmount.value = (firstAmount.value * (rate)).toFixed(2);
    });
}
 
swap.addEventListener('click', () => {
  let temp = fcurrencylist.value;
  fcurrencylist.value = scurrencylist.value;
  scurrencylist.value = temp; 
  calculate();
});

calculate();