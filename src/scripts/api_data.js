import earningChart from "./draw_charts/earning_chart";

const ApiData = console.log("this is the api_data.js file")

// //Earnings -----------
// const apiURL = "https://finnhub.io/api/v1";
// const token = "sandbox_c7vfjqiad3i9ikp81lg0"
// //--- change this only
// const endPoint = "/stock/financials?symbol=AAPL&statement=ic&freq=annual"

// fetch(`${apiURL}${endPoint}&token=${token}`)
//     .then(res => res.json())
//     .then(data => console.log(data));
//     // .then(data => showData(data.financials))


// function showData(data){
//     data.forEach(element => {
//         const el = document.querySelector(".test");
//         const newLi = document.createElement("li");
        
//         newLi.innerText = `Year: ${element.year} - ${element.revenue}`;
//         el.appendChild(newLi);
//     });
// }


//CompanyName ---------IEXcloud endpoint 
const apiURL = "https://sandbox.iexapis.com/"
const endPoint = "stable/stock/GS/company"
const token = "Tpk_b837b391ec71490ebdc914ca52df4873"
 
fetch(`${apiURL}${endPoint}?token=${token}`)
    .then(res => res.json())
    // .then(data => displayCompanyName(data.companyName));


//Historical Closing -----------
// const apiURL = "https://finnhub.io/api/v1";
// const token = "sandbox_c7vfjqiad3i9ikp81lg0"
// //--- change this only
// const endPoint = "/stock/candle?symbol=AAPL&resolution=D&from=1614644236&to=1643674636"

// fetch(`${apiURL}${endPoint}&token=${token}`)
//     .then(res => res.json())
//     // .then(data => console.log(data));
//     .then(data => showData(data))


// function showData(data){
//     const el = document.querySelector(".test");
//     for (let i = 0; i < data.c.length; i++) {
//         const newLi = document.createElement("li");        
//         newLi.innerText = `Date: ${data.t[i]} - ${data.c[i]}`;    // t is date and c is closing price
//         el.appendChild(newLi);
//     }
// }


export default ApiData