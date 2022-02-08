const analystRecommendationChart = (data) => {
    const consolidatedData = [];
    
    for (let i = 0; i < data.length; i++) {
        consolidatedData.push({stronBuy: data[i].strongBuy, buy: data[i].buy, hold: data[i].hold, sell: data[i].sell, period: data[i].period })
        addRow();
    }
           
    addAnalystData(consolidatedData);
      
}

function addRow(){
    const header = ["period", "strongBuy", "buy", "hold", "sell"];
    d3.selectAll(".analyst-recommendation-data")
        .style('width', 600)
        .style('padding', 20)


    d3.selectAll(".analyst-recommendation-data")
        .append("tr")
        .style('width', 125)
       

    for (let i = 0; i < header.length; i++) {             
        d3.selectAll('.analyst-recommendation-data tr:last-child')
            .append('td')
            .attr('class',`${header[i]}`)
            .style('width', 600)
        }  
};

function addAnalystData(data){
  const colName = ["period", "strongBuy", "buy", "hold", "sell"];

  
    d3.selectAll(`.analyst-recommendation-data .period`)
        .data(data)
        .html(d=> d.period)
      
    
    d3.selectAll(`.analyst-recommendation-data .strongBuy`)
        .data(data)
        .html(d=> d.stronBuy)
 
     
    d3.selectAll(`.analyst-recommendation-data .buy`)
        .data(data)
        .html(d=> d.buy) 


    d3.selectAll(`.analyst-recommendation-data .hold`)
        .data(data)
        .html(d=> d.hold)
      

    d3.selectAll(`.analyst-recommendation-data .sell`)
        .data(data)
        .html(d=> d.sell)
  
}




export default analystRecommendationChart