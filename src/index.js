import * as d3 from 'd3';
import apiCalls from './api_calls'
import "./styles/index.css"


//Set event listener on the retrieve button.
const retrieveButton = document.querySelector("input[id='retrieve-button']");   
retrieveButton.addEventListener("click", apiCalls);



// import HistoricalPrices from "./scripts/historical_prices";
// import Earnings from "./scripts/earnings";
// import TargetPrices from "./scripts/target_prices";
// import ApiData from './scripts/api_data';