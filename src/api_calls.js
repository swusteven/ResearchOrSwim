import earningChart from "./scripts/draw_charts/earning_chart";


const apiCalls  = async ()=>{
    const ticker = document.querySelector("#ticker-symbol").value;

    //--- Finhub API info
    const apiURL = "https://finnhub.io/api/v1";
    const token = "sandbox_c7vfjqiad3i9ikp81lg0";
    const endPoint = `/stock/financials?symbol=${ticker}&statement=ic&freq=annual`;
                
    const earningAPI = fetch(`${apiURL}${endPoint}&token=${token}`)
    // historicalPriceAPI fetch goes here
    // targetPricesAPI fetch goes here



    //--- IEXcloud API info
    //CompanyName ---------IEXcloud endpoint 
    const apiURL2 = "https://sandbox.iexapis.com/"
    const endPoint2 = `stable/stock/${ticker}/company`
    const token2 = "Tpk_b837b391ec71490ebdc914ca52df4873"
 
    const companyNameAPI = fetch(`${apiURL2}${endPoint2}?token=${token2}`)
        
    await Promise.all([earningAPI, companyNameAPI]).then(res => res)
        .then(function(responses){    
            //--Earning data
            const earningResponse = responses[0].json();
            earningResponse.then(data => console.log(data.financials));
            createEarningChart();
        
            //--CompanyName 
            const cname = document.querySelector("#companyName");
            const companyNameResponse = responses[1].json();
            companyNameResponse.then(function(data) {
                console.log(data.companyName);
                cname.innerHTML = data.companyName;
            })


            //--History data goes here


            // -- Target Price data goes here


            // -- Analaysis data goes here

        })
}



function createEarningChart(){
    alert("Creating earning Chart")
}


export default apiCalls