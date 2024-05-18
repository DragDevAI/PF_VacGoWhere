const aboutMessage = "This is a simple app catered to the world travellers and travel enthusiasts out there. We don't aim BIG as big boss Malcolm has instructed, we remain humble and agile. We provide users some useful information in order for them to make an informed decision.";
const howToUseMessage = "It's quite easy what, if you don't know how to, we can't help you sia";
const disclaimerMessage = "Under no circumstances shall the owner of this app, his poor little minion-coders, as well as his big boss Malcolm, be liable for anything that happens to you when using this app (including but not limited to breaking-up with you boy/girlfriend). You use this app at your own risk.";

//Function to get current date and time (this information will be used for other function as well)
function getCurrentDateAndTime() {
    const currentDay = new Date();
    let ddmmyyyy = "";
    let currentDate = currentDay.getDate();
    let currentMonth = currentDay.getMonth();
    let currentYear = currentDay.getFullYear();
    ddmmyyyy = (currentDate + "/" + currentMonth + "/" + currentYear);
    return (ddmmyyyy);
}

//Function to get current location of user (location will be used to determined the base for the exchagne rate)
async function getCurrentLocation() {
    const locResponse = await fetch("https://ipapi.co/json");
    const loc = await locResponse.json();
    let locMsg = document.getElementById("locationDisplay");
    locMsg.innerHTML = loc.country_name;
}

getCurrentLocation();
  
document.getElementById("todayDisplay").innerHTML = getCurrentDateAndTime();

document.getElementById("divAbout").addEventListener('mouseover', function() {
    let divAboutMsg = document.getElementById("menuDisplay");
    divAboutMsg.innerHTML = aboutMessage;
})

document.getElementById("divAbout").addEventListener('mouseout', function() {
    let divAboutMsg = document.getElementById("menuDisplay");
    divAboutMsg.innerHTML = " ";
})

document.getElementById("divHowToUse").addEventListener('mouseover', function() {
    let divHowToUseMsg = document.getElementById("menuDisplay");
    divHowToUseMsg.innerHTML = howToUseMessage;
})

document.getElementById("divHowToUse").addEventListener('mouseout', function() {
    let divHowToUseMsg = document.getElementById("menuDisplay");
    divHowToUseMsg.innerHTML = " ";
})


document.getElementById("divDisclaimer").addEventListener('mouseover', function() {
    let divDisclaimerMsg = document.getElementById("menuDisplay");
    divDisclaimerMsg.innerHTML = disclaimerMessage
})

document.getElementById("divDisclaimer").addEventListener('mouseout', function() {
    let divDisclaimerMsg = document.getElementById("menuDisplay");
    divDisclaimerMsg.innerHTML = " ";
})

//Get value from user input of destination of choice
function selectDestFunction() {
    let selectDest = document.getElementById("dest").value;
    let destCurrencyMsg = document.getElementById("destCurrency");
    destCurrencyMsg.innerHTML = selectDest;

    async function getCurrentForex() {
        let forexUrl = 'https://openexchangerates.org/api/latest.json?app_id=33bc19bb40c64429aa7329881b28aa67';
        let triviaUrl = 'https://restcountries.com/v3.1/currency/' + selectDest;
        
        const forExResponse = await fetch(forexUrl);
        const fullForex = await forExResponse.json();
        let base = "SGD";
        let baseRate = fullForex.rates[base];
        let destRate = fullForex.rates[selectDest];
        let forexMsg = document.getElementById("pforExDisplay");
        forexMsg.innerHTML = ((destRate/baseRate).toLocaleString());

        const triviaResponse = await fetch(triviaUrl);
        const fullTrivia = await triviaResponse.json();
        let triviaCapitalMsg = document.getElementById("triviaCapital");
        let triviaAreaMsg = document.getElementById("triviaArea");
        let triviaPopulationMsg = document.getElementById("triviaPopulation");
        let triviaCarSideMsg = document.getElementById("triviaCarSide");
        let triviaTimeZoneMsg = document.getElementById("triviaTimeZone");
        let triviaExceptionMsg = document.getElementById("triviaException");

        if (selectDest == 'Nil') {
            triviaCapitalMsg.innerHTML = "";
            triviaAreaMsg.innerHTML = "";
            triviaPopulationMsg.innerHTML = "";
            triviaCarSideMsg.innerHTML = "";
            triviaTimeZoneMsg.innerHTML = "";
            triviaExceptionMsg.innerHTML = "";
            forexMsg.innerHTML = "";
            
        } else if (selectDest == 'AUD') {

            let triviaCapital = fullTrivia[2].capital[0];
            triviaCapitalMsg.innerHTML = triviaCapital;
    
            let triviaArea =  fullTrivia[2].area;
            triviaAreaMsg.innerHTML = triviaArea.toLocaleString();
    
            let triviaPopulation =  fullTrivia[2].population;
            triviaPopulationMsg.innerHTML = triviaPopulation.toLocaleString();
    
            let triviaCarSide = fullTrivia[2].car.side
            triviaCarSideMsg.innerHTML = triviaCarSide;
    
            let triviaTimeZone = fullTrivia[2].timezones[0];
            triviaTimeZoneMsg.innerHTML = triviaTimeZone;

            triviaExceptionMsg.innerHTML = "";

        } else if (selectDest == 'NZD') {

            let triviaCapital = fullTrivia[3].capital[0];
            triviaCapitalMsg.innerHTML = triviaCapital;
    
            let triviaArea =  fullTrivia[3].area;
            triviaAreaMsg.innerHTML = triviaArea.toLocaleString();
    
            let triviaPopulation =  fullTrivia[3].population;
            triviaPopulationMsg.innerHTML = triviaPopulation.toLocaleString();
    
            let triviaCarSide = fullTrivia[3].car.side;
            triviaCarSideMsg.innerHTML = triviaCarSide;
    
            let triviaTimeZone = fullTrivia[3].timezones[0];
            triviaTimeZoneMsg.innerHTML = triviaTimeZone;

            triviaExceptionMsg.innerHTML = "";

        } else if (selectDest == 'EUR')  {

            let triviaCapital = fullTrivia[3].capital[0];
            triviaCapitalMsg.innerHTML = triviaCapital;
    
            let triviaArea =  fullTrivia[3].area;
            triviaAreaMsg.innerHTML = triviaArea.toLocaleString();
    
            let triviaPopulation =  fullTrivia[3].population;
            triviaPopulationMsg.innerHTML = triviaPopulation.toLocaleString();
    
            let triviaCarSide = fullTrivia[3].car.side;
            triviaCarSideMsg.innerHTML = triviaCarSide;
    
            let triviaTimeZone = fullTrivia[3].timezones[0];
            triviaTimeZoneMsg.innerHTML = triviaTimeZone;

            triviaExceptionMsg.innerHTML = "<i>(Europe is too big, so we need a representative, my boy chose Germany!!!!)</i>";

        } else {

            let triviaCapital = fullTrivia[0].capital[0];
            triviaCapitalMsg.innerHTML = triviaCapital;
    
            let triviaArea =  fullTrivia[0].area;
            triviaAreaMsg.innerHTML = triviaArea.toLocaleString();
    
            let triviaPopulation =  fullTrivia[0].population;
            triviaPopulationMsg.innerHTML = triviaPopulation.toLocaleString();
    
            let triviaCarSide = fullTrivia[0].car.side
            triviaCarSideMsg.innerHTML = triviaCarSide;
    
            let triviaTimeZone = fullTrivia[0].timezones[0];
            triviaTimeZoneMsg.innerHTML = triviaTimeZone;

            triviaExceptionMsg.innerHTML = "";
    
        }

    };
    
    getCurrentForex();

}