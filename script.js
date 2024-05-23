let menuMsgContent = ""; // Variable to display the message on the menu once user hover the mouse over the menu
// The following three are the message to be assigned the menuMsgContent depending on the context
const aboutMessage = "This is a simple app catered to the world travellers and travel enthusiasts out there. We aim to provide users some useful information in order for them to make an informed decision about the destination of their choice.";
const howToUseMessage = "Simply select the destination that you prefer and find out.";
const disclaimerMessage = "Under no circumstances shall we be liable for anything that happened to you using this app. You use this app at your own risk.";

let selectDest = ""; // Variable to hold the selection of user of the destination (by way of the country code)
let selectCurr = ""; // Variable to hold the currency of the selected country destination

// 2D Array to hold the database of the country codes and their currency (for exchange rates)
const countryData = [
    ['jpn','kor','tha','vnm','idn','hkg','twn','aus','nzl','nld','deu','fra','esp','dnk','prt','ita','cze','gbr'], //for calling API on trivia info
    ['JPY','KRW','THB','VND','IDR','HKD','TWD','AUD','NZD','EUR','EUR','EUR','EUR','EUR','EUR','EUR','EUR','GBP'], //for calling foreign exchange API
    ['jp','kr','th','vn','id','hk','tw','au','nz','nl','de','fr','es','dk','pt','it','cz','gb'] //for calling flag API
]

//Function to get current date and time for display
function getCurrentDateAndTime() {
    const currentDay = new Date();
    return (currentDay.getDate() + "/" + (currentDay.getMonth() + 1) + "/" + currentDay.getFullYear());
}
document.getElementById("todayDisplay").innerHTML = getCurrentDateAndTime();

//Function to get current location of user
async function getCurrentLocation() {
    const locResponse = await fetch("https://ipapi.co/json");
    const loc = await locResponse.json();
    let locMsg = document.getElementById("locationDisplay");
    locMsg.innerHTML = loc.country_name;
}
getCurrentLocation();

//Functions to handle mouseover event on the menu
function mouseOver(menuMsgContent) {
    menuMsg = document.getElementById("menuDisplay");
    menuMsg.innerHTML =  menuMsgContent;
}

//Functions to handle mouseout event on the menu
function mouseOut() {
    menuMsg = document.getElementById("menuDisplay");
    menuMsg.innerHTML =  "";
}

//Displaying menu messages when user hover the mouse over the menu
document.getElementById("divAbout").addEventListener('mouseover', function(){mouseOver(aboutMessage)})
document.getElementById("divHowToUse").addEventListener('mouseover', function(){mouseOver(howToUseMessage)})
document.getElementById("divDisclaimer").addEventListener('mouseover', function(){mouseOver(disclaimerMessage)})

document.getElementById("divAbout").addEventListener('mouseout', function(){mouseOut()})
document.getElementById("divHowToUse").addEventListener('mouseout', function(){mouseOut()})
document.getElementById("divDisclaimer").addEventListener('mouseout', function(){mouseOut()})

//Function to convert country code to currency
function getCurrency(selectDest) {
    for (i=0; i<countryData[0].length; i++) {
        if (selectDest === countryData[0][i]) {
            selectCurr = countryData[1][i];
        }
    }
}

//Function to display the currency of the destination of user's choice
function currencyDisplay(selectCurr) {
    let destCurrencyMsg = document.getElementById("destCurrency");
    destCurrencyMsg.innerHTML = selectCurr;
}

//Function to display the legend of the canvas
function mcMealIndexDisplay() {
    let canvasMsg = document.getElementById("pCanvas");
    canvasMsg.innerHTML = "McMeal cost index between Singapore and selected destination:";
}

// Function to read into API (Open Exchange Rates dot com) to obtain info to calculate the exchange rate based on SGD and currency of selected destination
async function getCurrentForex(selectCurr) {
    let forexUrl = 'https://openexchangerates.org/api/latest.json?app_id=33bc19bb40c64429aa7329881b28aa67';
    
    const forexResponse = await fetch(forexUrl);
    const fullForex = await forexResponse.json()
    let forexMsg = document.getElementById("pForexDisplay");
    forexMsg.innerHTML = ((fullForex.rates[selectCurr]/fullForex.rates["SGD"]).toLocaleString());
}

//Function to read self-developped API to compare price of McMeal among the destination of choice
async function getMcMealPrice() {
    mcMealIndexDisplay();
    const macResponse = await fetch("https://api.jsonsilo.com/public/47dfbcd9-f615-47d6-9cb7-5b8742045d4a");
    const mac = await macResponse.json();

    let xValues = ["Singapore", ""];
    let yValues = [1, 0];
    const barColors = ["blue","orange"];

    for (i=1; i<19; i++) {
        if (mac.Countries[i].Selected === selectDest) {
            xValues[1] = mac.Countries[i].Name;
            yValues[1] = (Number(mac.Countries[i].Price)/10);
        }
    }

    new Chart("canvasChart", {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
            backgroundColor: barColors,
            data: yValues
            }]
        },
        options: {
            legend: {display: false},
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Function to read into API (REST Countries dot com) to obtain trivial information about destination of choice
async function getTrivialInfo(selectDest) {
    let triviaUrl = 'https://restcountries.com/v3.1/alpha/' + selectDest;
    const triviaResponse = await fetch(triviaUrl);
    const fullTrivia = await triviaResponse.json();
    
    let triviaCapitalMsg = document.getElementById("triviaCapital");
    let triviaAreaMsg = document.getElementById("triviaArea");
    let triviaPopulationMsg = document.getElementById("triviaPopulation");
    let triviaCarSideMsg = document.getElementById("triviaCarSide");
    let triviaTimeZoneMsg = document.getElementById("triviaTimeZone");

    for (i=0; i<countryData[0].length;i++) {
        if (selectDest === countryData[0][i]) {
            triviaCapitalMsg.innerHTML = fullTrivia[0].capital[0]
            triviaAreaMsg.innerHTML = fullTrivia[0].area.toLocaleString();
            triviaPopulationMsg.innerHTML = fullTrivia[0].population.toLocaleString();
            triviaCarSideMsg.innerHTML = fullTrivia[0].car.side;
            triviaTimeZoneMsg.innerHTML = fullTrivia[0].timezones[0];
            break;
        }
    }
}

//Function to read into API
function getFlag(selectDest) {
    let imgCountryCode = '';
    for (i=0;i<countryData[0].length;i++) {
        if (countryData[0][i] === selectDest) {
            imgCountryCode = countryData[2][i];
        }
    }
    let imgURL = 'https://flagcdn.com/w320/' + imgCountryCode + '.png'
    let flagImg = document.getElementById("imgFlag");
    flagImg.src = imgURL;
}

//Get value from user input of destination of choice, call APIs and display trivial info as well as exchange rates
document.getElementById('dest').addEventListener('change', function() {
    selectDest = document.getElementById("dest").value;
    getCurrency(selectDest); //Calling function to retrieve currency of the destination of choice
    currencyDisplay(selectCurr); //Display the currency symbol of the destination
    getCurrentForex(selectCurr); //Display the exchange rate between Singapore Dollars and the currency of the destination
    getMcMealPrice(); //Display McMeal index by comparing the cost of McMeal in Singapore and the destination
    getTrivialInfo(selectDest); //Display trivial info about the selected destination
    getFlag(selectDest); //Display flags
})