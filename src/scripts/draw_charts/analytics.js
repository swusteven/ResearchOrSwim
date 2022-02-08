const analytics =(earningData, historicalPriceData, analystRecommendation)=>{
    // covert data
    earningData.then(function(earning){
        const consolidatedEarningData = [];
        const consolidatedHistoricalDate = [];
        const consolidatedAnalystData = [];
                
        for (let i = 0; i < earning.financials.length; i++) {
            consolidatedEarningData.push({revenue: earning.financials[i].revenue, year: earning.financials[i].year })        
        };
      
        historicalPriceData.then(function(price){
            for (let i = 0; i < price.c.length; i++) {
                consolidatedHistoricalDate.push({closingPrice: price.c[i], date: convertUnixTime(price.t[i])})     
            }
        });

        analystRecommendation.then(function(analyst){
            for (let i = 0; i < analyst.length; i++) {
                consolidatedAnalystData.push({stronBuy: analyst[i].strongBuy, buy: analyst[i].buy, hold: analyst[i].hold, sell: analyst[i].sell, period: analyst[i].period });
            }

        performAnalytics(consolidatedEarningData, consolidatedHistoricalDate, consolidatedAnalystData);

        })
    })
};




function performAnalytics(earningData, priceData, analystData){
    const a = momentum(priceData);
    const b = fundamentals(earningData);
    const c = analystRecommendation(analystData);

    console.log(a);
    console.log(b);
    console.log(c);

    return a && b && c;
}


function momentum(priceData){
    const movingAverageData = movingAverage(priceData, 30)
    let last30DaysAverageincreasing = true;

        if (movingAverageData.length >= 30){
            const mostRecent30days = movingAverageData.slice(movingAverageData.length - 30)    
                    for (let i = 0; i < mostRecent30days.length -1; i++) {
                        if (mostRecent30days[i] > mostRecent30days[i+1] ){
                            last30DaysAverageincreasing = false
                        }                                     
                    }
            } else {
            last30DaysAverageincreasing = false;
        }

    return last30DaysAverageincreasing
};

function fundamentals(earningData){
    if (earningData.length < 2) return false;

    const mostRecent = earningData[0].revenue; 
    const previous = earningData[1].revenue; 
    const percent = (((mostRecent - previous) / previous) * 100);
    
    return mostRecent > previous && percent > 10    
};


function analystRecommendation(analystData){
    debugger
    const mostRecent = analystData[0];
    const total = (mostRecent.stronBuy + mostRecent.buy + mostRecent.hold + mostRecent.sell);
    const buys = (mostRecent.strongBuy + mostRecent.buy);
    debugger
    return (buys / total) > .5
}



        
function convertUnixTime(unixTime){
    return new Date(unixTime * 1000)
};


function movingAverage(consolidateDdata, numberOfPricePoints){
   return consolidateDdata.map((row, index, total) => {
    const start = Math.max(0, index - numberOfPricePoints);
    const end = index; 
    const subset = total.slice(start, end + 1);

    const sum = subset.reduce((a, b) => {
      return a + b.closingPrice;
    }, 0);

    return {
      date: row.date,
      average: sum / subset.length
    };
  });
};


export default analytics