
const ApiData = console.log("this is the api_data.js file")


const apiURL = "https://finnhub.io/api/v1";
const token = "sandbox_c7vfjqiad3i9ikp81lg0"

//--- change this only
const endPoint = "/stock/financials?symbol=AAPL&statement=bs&freq=annual"

fetch(`${apiURL}${endPoint}&token=${token}`)
    .then(res => res.json())
    .then(data => showData(data.financials))

function showData(data){
    data.forEach(element => {
        console.log(element.buy);
    });
}

export default ApiData