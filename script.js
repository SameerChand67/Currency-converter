const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const convertBtn = document.getElementById('convert-btn');
const resultDiv = document.getElementById('result');

// Complete currency-country mapping for 50+ currencies
const currencyNames = {
  AED:"United Arab Emirates", AFN:"Afghanistan", ALL:"Albania", AMD:"Armenia", ANG:"Netherlands Antilles",
  AOA:"Angola", ARS:"Argentina", AUD:"Australia", AWG:"Aruba", AZN:"Azerbaijan",
  BAM:"Bosnia & Herzegovina", BBD:"Barbados", BDT:"Bangladesh", BGN:"Bulgaria", BHD:"Bahrain",
  BIF:"Burundi", BMD:"Bermuda", BND:"Brunei", BOB:"Bolivia", BRL:"Brazil",
  BSD:"Bahamas", BTN:"Bhutan", BWP:"Botswana", BYN:"Belarus", BZD:"Belize",
  CAD:"Canada", CDF:"Congo", CHF:"Switzerland", CLP:"Chile", CNY:"China",
  COP:"Colombia", CRC:"Costa Rica", CUP:"Cuba", CVE:"Cape Verde", CZK:"Czech Republic",
  DJF:"Djibouti", DKK:"Denmark", DOP:"Dominican Republic", DZD:"Algeria", EGP:"Egypt",
  ERN:"Eritrea", ETB:"Ethiopia", EUR:"Eurozone", FJD:"Fiji", FKP:"Falkland Islands",
  GBP:"United Kingdom", GEL:"Georgia", GHS:"Ghana", GIP:"Gibraltar", GMD:"Gambia",
  GNF:"Guinea", GTQ:"Guatemala", GYD:"Guyana", HKD:"Hong Kong", HNL:"Honduras",
  HRK:"Croatia", HTG:"Haiti", HUF:"Hungary", IDR:"Indonesia", ILS:"Israel",
  INR:"India", IQD:"Iraq", IRR:"Iran", ISK:"Iceland", JMD:"Jamaica",
  JOD:"Jordan", JPY:"Japan", KES:"Kenya", KGS:"Kyrgyzstan", KHR:"Cambodia",
  KMF:"Comoros", KRW:"South Korea", KWD:"Kuwait", KYD:"Cayman Islands", KZT:"Kazakhstan",
  LAK:"Laos", LBP:"Lebanon", LKR:"Sri Lanka", LRD:"Liberia", LSL:"Lesotho",
  MAD:"Morocco", MDL:"Moldova", MGA:"Madagascar", MKD:"North Macedonia", MMK:"Myanmar",
  MNT:"Mongolia", MOP:"Macau", MRU:"Mauritania", MUR:"Mauritius", MVR:"Maldives",
  MWK:"Malawi", MXN:"Mexico", MYR:"Malaysia", MZN:"Mozambique", NAD:"Namibia",
  NGN:"Nigeria", NIO:"Nicaragua", NOK:"Norway", NPR:"Nepal", NZD:"New Zealand",
  OMR:"Oman", PAB:"Panama", PEN:"Peru", PGK:"Papua New Guinea", PHP:"Philippines",
  PKR:"Pakistan", PLN:"Poland", PYG:"Paraguay", QAR:"Qatar", RON:"Romania",
  RSD:"Serbia", RUB:"Russia", RWF:"Rwanda", SAR:"Saudi Arabia", SBD:"Solomon Islands",
  SCR:"Seychelles", SDG:"Sudan", SEK:"Sweden", SGD:"Singapore", SHP:"Saint Helena",
  SLL:"Sierra Leone", SOS:"Somalia", SRD:"Suriname", STN:"Sao Tome & Principe", SVC:"El Salvador",
  SYP:"Syria", SZL:"Eswatini", THB:"Thailand", TJS:"Tajikistan", TMT:"Turkmenistan",
  TND:"Tunisia", TOP:"Tonga", TRY:"Turkey", TTD:"Trinidad & Tobago", TWD:"Taiwan",
  TZS:"Tanzania", UAH:"Ukraine", UGX:"Uganda", USD:"United States", UYU:"Uruguay",
  UZS:"Uzbekistan", VND:"Vietnam", VUV:"Vanuatu", WST:"Samoa", XAF:"Central African CFA",
  XCD:"East Caribbean", XOF:"West African CFA", XPF:"CFP Franc", YER:"Yemen", ZAR:"South Africa",
  ZMW:"Zambia", ZWL:"Zimbabwe"
};


let ratesData = {};
const apiURL = 'https://open.er-api.com/v6/latest/USD'; // Free live API

// Fetch live rates
async function fetchRates() {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    if(data.result === "success") {
      ratesData = data.rates;
      populateSelectOptions();
    } else {
      resultDiv.textContent = "Failed to fetch rates!";
    }
  } catch (error) {
    resultDiv.textContent = "Error fetching rates!";
    console.error(error);
  }
}

// Populate dropdowns with currency + country name
function populateSelectOptions(){
  Object.keys(ratesData).forEach(currency => {
    const country = currencyNames[currency] || "Unknown"; // all covered now
    const option1 = document.createElement('option');
    option1.value = currency;
    option1.textContent = `${currency} (${country})`;
    fromCurrency.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = currency;
    option2.textContent = `${currency} (${country})`;
    toCurrency.appendChild(option2);
  });
  fromCurrency.value = "USD";
  toCurrency.value = "NPR";
}

// Convert currency
convertBtn.addEventListener('click', () => {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if(isNaN(amount)){
    resultDiv.textContent = "Enter a valid amount!";
    return;
  }

  const converted = (amount / ratesData[from]) * ratesData[to];
  resultDiv.textContent = `${amount.toFixed(2)} ${from} = ${converted.toFixed(2)} ${to}`;
});

// Initialize
fetchRates();
