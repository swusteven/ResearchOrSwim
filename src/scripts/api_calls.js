import { create } from "d3";
import earningChart from "./draw_charts/earning_chart";
import historicalPriceChart from "./draw_charts/historical_price";
import analystRecommendationChart from "./draw_charts/analyst_recommendation_chart";
import analytics from "./draw_charts/analytics";


const apiCalls  = async ()=>{
    removeExistingContents();
        
    const ticker = document.querySelector("#ticker-symbol").value;
    //--- Finhub earning endpoint API
    const apiURL = "https://finnhub.io/api/v1";
    const token = "sandbox_c7vfjqiad3i9ikp81lg0";
    const key = "c7us8dqad3ie4vchpupg"
    const endPoint = `/stock/financials?symbol=${ticker}&statement=ic&freq=annual`;        
    const earningAPI = fetch(`${apiURL}${endPoint}&token=${token}`)
    
   //--- Finhub 1 year historical price endpoint API
   const historicalPriceEndPoint = `/stock/candle?symbol=${ticker}&resolution=D&from=1614644236&to=1643674636`
   const historicalPriceAPI =  fetch(`${apiURL}${historicalPriceEndPoint}&token=${key}`)


    // latest analyst recommendation trends
    const analysRecEndPoint = `/stock/recommendation?symbol=${ticker}`
    const analystRecommendation =  fetch(`${apiURL}${analysRecEndPoint}&token=${key}`)


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
            const earningData = responses[1].json()
                    earningData.then(data => earningChart(data.financials));  //create earning chart
                    
            //--1-year historical price data
            const historicalPriceData = responses[2].json()
                    historicalPriceData.then(data => historicalPriceChart(data));  //create earning chart

            // -- Analyst Recommendation
             const analystRecommendationData = responses[3].json()
                    analystRecommendationData.then(data => analystRecommendationChart(data));

            // -- analytics
             analytics(earningData, historicalPriceData, analystRecommendationData)   
        })
}


//remove existing charts and contents before rendering another one
function removeExistingContents(){
      d3.selectAll("#historical-price > svg").remove();
      d3.selectAll("#earnings > svg").remove();
      d3.selectAll("#analyst-recommendation-table tr").remove();
      d3.selectAll("#analytics-table tr").remove();
      d3.select("#last-30-days-moving-average text").remove()
      d3.select("#yoy-earning-growth text").remove()
      d3.select("#last-price text").remove()
      d3.select("#analyst-buy-percentage text").remove()
      d3.select("#analytic-outcome text").remove()

}


export default apiCalls