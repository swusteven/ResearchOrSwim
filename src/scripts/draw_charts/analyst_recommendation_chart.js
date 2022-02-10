const analystRecommendationChart = (data) => {
    const consolidatedData = [];
    
    addHeader();

    for (let i = 0; i < data.length; i++) {
        consolidatedData.push({stronBuy: Math.floor(data[i].strongBuy), buy: Math.floor(data[i].buy), hold: Math.floor(data[i].hold), sell: Math.floor(data[i].sell), period: Math.floor(data[i].period) })
        addRow();
    }
           
    addAnalystData(consolidatedData);  
    createPieChart(consolidatedData);

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

function createPieChart(consolidatedData){
    const mostRecent = consolidatedData[0]
    const data = [];
        data.push({name: "Strong Buy", share: mostRecent.strongBuy});
        data.push({name: "Buy", share: mostRecent.buy});
        data.push({name: "Hold", share: mostRecent.hold});
        data.push({name: "Sell", share: mostRecent.sell});
    
    const margin = { top: 30, right: 30, bottom: 30, left: 30 },
        width = 250 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom,
        tooltip = { width: 50, height: 50, x: 10, y: -30 };

    //initialize margin end
    const svg = d3.select("#analyst-pie-chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + width/2 + "," + height/2+ ")");
            
    const pie = d3.pie()
            .sort(null)
            .value(d => d.share);

    const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(Math.min(width, height) / 2 - 1);

    const arcLabel = function(){
        const radius = Math.min(width, height) / 3 * 0.8;
        return d3.arc().innerRadius(radius).outerRadius(radius);
    }
    
    const color = d3.scaleOrdinal()
            .domain(data.map(d => d.name))
            .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse())

    const arcs = pie(data);
         svg.append("g")
        .attr("stroke", "white")
        .selectAll("path")
        .data(arcs)
        .enter().append("path")
        .attr("fill", d => color(d.data.share))
        .attr("d", arc)
        .append("title")
        .text(d => `${d.data.name}: ${d.data.name.toLocaleString()}`);

    svg.append("g").selectAll("text")
        .data(arcs)
        .enter().append("text")
        .attr("transform", d => `translate(${arcLabel().centroid(d)})`)
        // .attr('transform', function(d) {
        //     const c = arcLabel().centroid(d);
        //     return "translate(" + c[0]*1 +"," + c[1]*2 + ")";
        // })
        .call(text => text.append("tspan")
            .attr("y", "-0.4em")
            // .attr("font-weight", "bold")
            .text(d => d.data.name))
            // .attr('fill', 'white')
        .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.3).append("tspan")
          .attr("x", 0)
          .attr("y", "0.7em")
          .attr("fill-opacity", 1)
        //   .attr('fill', 'white')
          .text(d => d.data.share.toLocaleString()));
 }


export default analystRecommendationChart