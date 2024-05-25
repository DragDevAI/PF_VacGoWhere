let menuMsgContent = ""; // Variable to display the message on the menu once user hover the mouse over the menu
// The following three are the message to be assigned the menuMsgContent depending on the context
const aboutMessage = "This simple page is catered to the world travellers and travel enthusiasts out there. We aim to assist users in making an informed decision about the destination of their choice. Your feedback are welcome for our improvement.";
const howToUseMessage = "Simply select the destination that you prefer. You will find trivial information (e.g., which side road cars go) together with useful information (e.g., real time exchange rates) of the destination that you consider.";
const disclaimerMessage = "Under no circumstances shall we be liable for any loss or damage (including, without limitation, mental/physical injury, death, or loss and/or damage to property) arising out of, or in connection with, the review, marking, testing and/or use of this page.";

let selectDest = ""; // Variable to hold the selection of user of the destination (by way of the country code)
let selectCurr = ""; // Variable to hold the currency of the selected country destination
let selectLang = ""; // Variable to hold the language of the selected country destination
let selectMonth = ""; // Variable to hold the month of the intended trip

// 2D Array to hold the database of the country codes and their currency (for exchange rates)
const countryData = [
    ['jpn','kor','tha','vnm','idn','hkg','twn','aus','nzl','nld','deu','fra','esp','dnk','prt','ita','cze','gbr'], //for calling API on trivia info
    ['JPY','KRW','THB','VND','IDR','HKD','TWD','AUD','NZD','EUR','EUR','EUR','EUR','EUR','EUR','EUR','EUR','GBP'], //for calling foreign exchange API
    ['jp','kr','th','vn','id','hk','tw','au','nz','nl','de','fr','es','dk','pt','it','cz','gb'] //for calling flag API
]

// Object holding common words in all languages covered under this app (too lazy to build this up in the API)
const countryLang = {
    'jpn': {
        'hello':'kon\'nichiwa',"bye": 'sayonara',"thank": 'arigatō',"sorry": 'gomen\'nasai', "yes":'hai',"nah":'Īe'
    },
    'kor': {
        'hello':'annyeonghaseyo',"bye": 'annyeong',"thank": 'gamsahabnida',"sorry": 'mianhaeyo', "yes":'ye',"nah":'aniyo'
    },
    'tha': {
        'hello':'s̄wạs̄dī',"bye": 'Lā k̀xn',"thank": 'K̄hxbkhuṇ',"sorry": 'C̄hạn k̄hxthos̄ʹ', "yes":'Chı̀',"nah":'Lek̄h thī̀'
    },
    'vnm': {
        'hello':'Xin chào',"bye": 'Tạm biệt',"thank": 'Cảm ơn',"sorry": 'Xin lỗi', "yes":'có',"nah":'không'
    },
    'idn': {
        'hello':'halo',"bye": 'selamat tinggal',"thank": 'terima kasih',"sorry": 'saya minta maaf', "yes":'ya',"nah":'tidak'
    },
    'hkg': {
        'hello':'nei hou',"bye": 'joi gin',"thank": 'do je',"sorry": 'deui m jyu', "yes":'hai',"nah":'m hai'
    },
    'twn': {
        'hello':'nǐ hǎo',"bye": 'zàijiàn',"thank": 'xièxiè',"sorry": 'duìbùqǐ', "yes":'duì',"nah":'bù'
    },
    'aus': {
        'hello':'hello, mate!',"bye": 'bye, mate!',"thank": 'thanks, mate!',"sorry": 'sorry, mate!', "yes":'yes, mate!',"nah":'no, mate!'
    },
    'nzl': {
        'hello':'ora',"bye": 'pū',"thank": 'mauruuru',"sorry": 'e pouri ana ahau', "yes":'āe',"nah":'kāo'
    },
    'nld': {
        'hello':'hallo',"bye": 'tot ziens',"thank": 'bedankt',"sorry": 'het spijt me', "yes":'ja',"nah":'nee'
    },
    'deu': {
        'hello':'hallo',"bye": 'tschüss',"thank": 'danke',"sorry": 'es tut mir leid', "yes":'ja',"nah":'nein'
    },
    'fra': {
        'hello':'salut',"bye": 'au revoir',"thank": 'merci',"sorry": 'desolee', "yes":'oui',"nah":'non'
    },
    'esp': {
        'hello':'hola',"bye": 'adiós',"thank": 'gracias',"sorry": 'lo siento', "yes":'sí',"nah":'no'
    },
    'dnk': {
        'hello':'hej',"bye": 'hej hej',"thank": 'tak skal du have',"sorry": 'det er jeg ked af', "yes":'ja',"nah":'ingen'
    },
    'prt': {
        'hello':'olá',"bye": 'bye bye',"thank": 'obrigado',"sorry": 'sinto muito', "yes":'sim',"nah":'não'
    },
    'ita': {
        'hello':'ciao',"bye": 'ciao ciao',"thank": 'grazie',"sorry": 'scusa', "yes":'sì',"nah":'no'
    },
    'cze': {
        'hello':'ahoj',"bye": 'ahoj',"thank": 'děkuji',"sorry": 'promiňte', "yes":'ano',"nah":'ne'
    },
    'gbr': {
        'hello':'hello (duh!)',"bye": 'bye (duh!)',"thank": 'thank (duh!)',"sorry": 'sorry (duh!)', "yes":'yes (duh!)',"nah":'no (duh!)'
    }
}

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
    const macResponse = await fetch("APIs\/vacaStats.json");
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
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        min: 0
                    }
                }]
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

//Function to read into API and get the picture of the flag of destination
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

//Function to display the Samurai character each representating the country of choice
function getCharacter(selectDest) {
    let characterImg = document.getElementById("imgCharacter");
    characterImg.src = ("img\/" + selectDest + ".png");
    let copyrightMsg = document.getElementById("pCopyright");
    copyrightMsg.innerHTML = "<i>(Courtesy of World-Flags.org)</i>";
}

//Function to display the common words in local language
function getLanguage(selectDest,selectLang) {
    let langDisplay = document.getElementById("pLanguage");
    langDisplay.innerHTML = countryLang[selectDest][selectLang];
}

//Function to display the temperature of the destination on the month of choice
async function getTemperature(selectDest,selectMonth) {
    const tempResponse = await fetch("APIs\/vacaStats.json");
    const temp = await tempResponse.json();
    let tempMin = 0;
    let tempMax = 0;

    for (i=1; i<19; i++) {
        if (temp.Countries[i].Selected === selectDest) {
            tempMin = (temp.Countries[i].Temperature[selectMonth][0]) + ("<sup>o</sup>C");
            tempMax = temp.Countries[i].Temperature[selectMonth][1] + ("<sup>o</sup>C");
        }
    }
    let tempMinDisplay = document.getElementById("pTempMin");
    let tempMaxDisplay = document.getElementById("pTempMax");

    tempMinDisplay.innerHTML = tempMin;
    tempMaxDisplay.innerHTML = tempMax;

}

//Get value from user input of destination of choice, call various APIs and display trivial info, exchange rates and chart of McMeal index
document.getElementById('dest').addEventListener('change', function() {
    document.getElementById("lang").disabled = false;
    document.getElementById("month").disabled = false;
    selectDest = document.getElementById("dest").value;
    if (selectDest === 'nilDest') {
        location.reload();
    } else {
        getCurrency(selectDest); //Calling function to retrieve currency of the destination of choice
        currencyDisplay(selectCurr); //Display the currency symbol of the destination
        getCurrentForex(selectCurr); //Display the exchange rate between Singapore Dollars and the currency of the destination
        getMcMealPrice(); //Display McMeal index by comparing the cost of McMeal in Singapore and the destination
        getTrivialInfo(selectDest); //Display trivial info about the selected destination
        getFlag(selectDest); //Display flags
        getCharacter(selectDest); //Display Samurai character    
    }
})

//Get value from user input of common words to put in local language of the destination of choice
document.getElementById('lang').addEventListener('change', function() {
    selectLang = document.getElementById("lang").value;
    let langDisplay = document.getElementById("pLanguage");
    if (selectLang === 'nilLang') {
        langDisplay.innerHTML = "---";
    } else {
        getLanguage(selectDest,selectLang);
    }
})

//Get value from user input of the month that they intend to travel
document.getElementById('month').addEventListener('change', function() {
    selectMonth = document.getElementById("month").value;
    let tempMinDisplay = document.getElementById("pTempMin");
    let tempMaxDisplay = document.getElementById("pTempMax");
    if (selectMonth === '0') {
        tempMinDisplay.innerHTML = "-";
        tempMaxDisplay.innerHTML = "-";
    } else {
        getTemperature(selectDest,selectMonth);
    }
})