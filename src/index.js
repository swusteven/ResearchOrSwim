import * as d3 from 'd3';
import "./styles/index.css"
import Util from './scripts/util';
import apiCalls from './scripts/api_calls'


//Set event listener on the retrieve button.
const retrieveButton = document.querySelector("input[id='retrieve-button']");   
retrieveButton.addEventListener("click", apiCalls);

