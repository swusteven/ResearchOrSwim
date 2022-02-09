const analystRecommendationChart = (data) => {
    const consolidatedData = [];
    
    addHeader();

    for (let i = 0; i < data.length; i++) {
        consolidatedData.push({stronBuy: data[i].strongBuy, buy: data[i].buy, hold: data[i].hold, sell: data[i].sell, period: data[i].period })
        addRow();
    }
           
    addAnalystData(consolidatedData);
      
}

function addHeader(){
    d3.select("#analyst-recommendation-table").attr('width', 600);
    const header = d3.select("#analyst-recommendation-table").append('tr').attr('class', 'analyst-recommendation-table-header')

    header.append('th')
        .html('Period');

    header.append('th')
        .html('Strong Buy');
    
    header.append('th')
        .html('Buy');
    
    header.append('th')
        .html('Hold');
    
    header.append('th')
        .html('Sell');
}

function addRow(){
    const header = ["period", "strongBuy", "buy", "hold", "sell"];

    //add one tr
    d3.selectAll("#analyst-recommendation-table")
        .append("tr")
        .attr("class", "analyst-recommendation-row")
      
    //within the tr, add 5 td
    for (let i = 0; i < header.length; i++) {             
        d3.selectAll('.analyst-recommendation-row:last-child')
            .append('td')
            .attr('class',`${header[i]}`)
        }  
};

function addAnalystData(data){
  const colName = ["period", "strongBuy", "buy", "hold", "sell"];
 
    d3.selectAll(`.analyst-recommendation-row .period`)
        .data(data)
        .html(d=> d.period)
   
    d3.selectAll(`.analyst-recommendation-row .strongBuy`)
        .data(data)
        .html(d=> Math.floor(d.stronBuy))
  
    d3.selectAll(`.analyst-recommendation-row .buy`)
        .data(data)
        .html(d=> Math.floor(d.buy)) 

    d3.selectAll(`.analyst-recommendation-row .hold`)
        .data(data)
        .html(d=> Math.floor(d.hold))
    
    d3.selectAll(`.analyst-recommendation-row .sell`)
        .data(data)
        .html(d=> Math.floor(d.sell))
  
}




export default analystRecommendationChart