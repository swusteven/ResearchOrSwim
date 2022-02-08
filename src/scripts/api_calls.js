import { create } from "d3";
import earningChart from "./draw_charts/earning_chart";
import historicalPriceChart from "./draw_charts/historical_price";
import analystRecommendationChart from "./draw_charts/analyst_recommendation_chart";
import analytics from "./draw_charts/analytics";


const apiCalls  = async ()=>{
    const ticker = document.querySelector("#ticker-symbol").value;
 
    //--- Finhub earning endpoint API
    const apiURL = "https://finnhub.io/api/v1";
    const token = "sandbox_c7vfjqiad3i9ikp81lg0";
    const endPoint = `/stock/financials?symbol=${ticker}&statement=ic&freq=annual`;        
    const earningAPI = fetch(`${apiURL}${endPoint}&token=${token}`)
    
   //--- Finhub 1 year historical price endpoint API
   const historicalPriceEndPoint = `/stock/candle?symbol=${ticker}&resolution=D&from=1614644236&to=1643674636`
   const historicalPriceAPI =  fetch(`${apiURL}${historicalPriceEndPoint}&token=${token}`)


    // latest analyst recommendation trends
    const analysRecEndPoint = `/stock/recommendation?symbol=${ticker}`
    const analystRecommendation =  fetch(`${apiURL}${analysRecEndPoint}&token=${token}`)


    //--- IEXcloud API info
    //CompanyName ---------IEXcloud endpoint 
    const apiURL2 = "https://sandbox.iexapis.com/"
    const endPoint2 = `stable/stock/${ticker}/company`
    const token2 = "Tpk_b837b391ec71490ebdc914ca52df4873"
    const companyNameAPI = fetch(`${apiURL2}${endPoint2}?token=${token2}`)
        

    await Promise.all([companyNameAPI, earningAPI, historicalPriceAPI, analystRecommendation]).then(res => res)
        .then(function(responses){    
            //--CompanyName 
            const cName = document.querySelector("#companyName");
            responses[0].json()
                    .then((data) => cName.innerHTML = data.companyName); //update companyName

            //--Earning data
            responses[1].json()
                    .then(data => earningChart(data.financials));  //create earning chart
                    
            //--1-year historical price data
            responses[2].json()
                    .then(data => historicalPriceChart(data));  //create earning chart

            // -- Analyst Recommendation
             responses[3].json()
                    .then(data => analystRecommendationChart(data));

            // -- analytics
                const earningData = responses[1].json().financials;
                const historicalPriceData = responses[2].json();
                const analystRecommendation = responses[3].json();
                analytics(earningData, historicalPriceData, analystRecommendation);
            })
        })
}

export default apiCalls