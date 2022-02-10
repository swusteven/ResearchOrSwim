import * as d3 from 'd3';
import "./styles/index.css"
import Util from './scripts/util';
import apiCalls from './scripts/api_calls'


// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];


// Autofill when page loaded
document.addEventListener("DOMContentLoaded", autofill)

function autofill(){
    document.querySelector("#ticker-symbol").value = 'AAPL';
    apiCalls();
    
    //display modal
    modal.style.display = "block";
    
}




//Set event listener on the retrieve button.
const retrieveButton = document.querySelector("input[id='retrieve-button']");   
retrieveButton.addEventListener("click", apiCalls);






// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}