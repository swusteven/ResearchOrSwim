class HistoricalPrices  {
    constructor(ticker){
        
    }
    instanceMethod(){
        // ...do something specific to an instance
    }
    static classMethod(){
        // ...logic not specific to an instance
    }
}

document.addEventListener("DOMContentLoaded", startD3)

function startD3(){
    const mainTitle = d3.select(".line-chart-price");
    mainTitle.text("D3 is working now");
        
    var canvas = d3.select("body")
        .append("svg")
        .attr("width", 500)
        .attr("height", 500);
    var circle = canvas.append("circle")
        .attr("cx", 250)
        .attr("cy", 250)
        .attr("r", 50)
        .attr("fill", "red")
}


export default HistoricalPrices;