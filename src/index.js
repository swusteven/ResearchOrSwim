import * as d3 from 'd3';
import "./styles/index.css"
import apiCalls from './scripts/api_calls'

// Autofill when page loaded and display modal
document.addEventListener("DOMContentLoaded", autofill)

function autofill(){
    document.querySelector("#ticker-symbol").value = 'AAPL';
    apiCalls();
    
    //display modal
    modal.style.display = "block";
}



//Set event listener on the search button.
const retrieveButton = document.querySelector("input[id='retrieve-button']");   
retrieveButton.addEventListener("click", apiCalls);



//modal
const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}