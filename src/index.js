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
retrieveButton.addEventListener("click", function(e){
  e.preventDefault()
  apiCalls();
})


//landingpage modal
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const close_btn = document.getElementsByClassName("close_btn")[0];

span.onclick = function() {
  modal.style.display = "none";
};

close_btn.onclick = function() {
  modal.style.display = "none";
};

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};


// aboutpage modal
const aboutPageModal = document.getElementById("aboutPageModal");
const btn = document.getElementById("myBtn");
const aboutPageclose_btn = document.getElementsByClassName("about_page_close_btn")[0];

btn.onclick = function() {
  aboutPageModal.style.display = "block";
};

aboutPageclose_btn.onclick = function() {
  aboutPageModal.style.display = "none";
};

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  if (event.target == aboutPageModal) {    
    aboutPageModal.style.display = "none";
  }
};