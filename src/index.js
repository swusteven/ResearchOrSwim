import * as d3 from 'd3';
import "./styles/index.css"
import Util from './scripts/util';
import apiCalls from './scripts/api_calls'

//Autofill when page loaded
document.addEventListener("DOMContentLoaded", autofill)

function autofill(){
    document.querySelector("#ticker-symbol").value = 'AAPL';
    apiCalls()
}

//Set event listener on the retrieve button.
const retrieveButton = document.querySelector("input[id='retrieve-button']");   
retrieveButton.addEventListener("click", apiCalls);
