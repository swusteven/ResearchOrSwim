import * as d3 from 'd3';
import HistoricalPrices from "./scripts/historical_prices";
import Earnings from "./scripts/earnings";
import TargetPrices from "./scripts/target_prices";
import ApiData from './scripts/api_data';
import "./styles/index.css"

    //Set event listener on the retrieve button.
    const retrieveButton = document.querySelector("input[id='retrieve-button']");   
    retrieveButton.addEventListener("click", makeApiCalls);

    //retrieve button event handler.
    function makeApiCalls() {   
        const ticker = document.querySelector("#ticker-symbol").value;
        const earning = new Earnings(ticker);      
        setInterval(printOut, 1000)
        debugger
        function printOut(){
            console.log(`${earning.earningAmount} hi`)
            debugger
        }
        
        // new HistoricalPrices(ticker);
        // new TargetPrices(ticker);
    }


