
const ApiData = console.log("this is the api_data.js file")

//fetch companyName
fetch("https://sandbox.iexapis.com/stable/stock/IBM/quote?token=Tpk_b837b391ec71490ebdc914ca52df4873 ")
    .then(res => res.json())
    .then(data => console.log(data.companyName))




export default ApiData