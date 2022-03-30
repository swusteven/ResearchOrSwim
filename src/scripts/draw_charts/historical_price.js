const historicalPriceChart = (data) => {
  const consolidateData = [];
    
    for (let i = 0; i < data.c.length; i++) {
        consolidateData.push({closingPrice: data.c[i], date: convertUnixTime(data.t[i])})     
    }
       
    const margin ={top: 0, right: 40, bottom: 30, left: 40},
          width = 750 - margin.left - margin.right,
          height = 350 - margin.top - margin.bottom;

    const xMin = d3.min(consolidateData, d => d.date),
          xMax = d3.max(consolidateData, d => d.date),
          yMin = d3.min(consolidateData, d => d.closingPrice),
          yMax = d3.max(consolidateData, d => d.closingPrice);
    
    const svg = 
    d3.select('#historical-price').append('svg')
        .attr('height', height + margin.top + margin.bottom)
        .attr('width', width + margin.left + margin.right)
        // .style('background', '#C9D7D6')
        .append('g')
        .attr('transform', `translate(${margin['left']},  ${margin['top']})`)


    // scales for the charts
    const xScale = d3.scaleTime()
                    .domain([xMin, xMax])
                    .range([0, width]);

    const yScale = d3.scaleLinear()
                    .domain([yMin - 5, yMax])
                    .range([height, 0]);


    // create the axes component
    svg.append('g')
            .attr('id', 'xAxis')
            .attr('transform', `translate(0, ${height})`)
            .style('font', '13px times')
            .call(d3.axisBottom(xScale));

    svg.append('g')
            .attr('id', 'yAxis')
            .style('font', '13px times')
            .attr('transform', `translate(${width}, 0)`)
            .call(d3.axisRight(yScale));

    svg.append('g')
            .attr('id', 'yAxis')
            .style('font', '13px times')
            // .attr('transform', `translate(${width}, 0)`)
            .call(d3.axisLeft(yScale));

              // This allows to find the closest X index of the mouse:
  var bisect = d3.bisector(function(d) { return d.x; }).left;

  // Create the circle that travels along the curve of chart
  var focus = svg
    .append('g')
    .append('circle')
      .style("fill", "none")
      .attr("stroke", "black")
      .attr('r', 8.5)
      .style("opacity", 0)

  // Create the text that travels along the curve of chart
  var focusText = svg
    .append('g')
    .append('text')
      .style("opacity", 0)
      .attr("text-anchor", "left")

    //  d3.line()([[10, 60], [40, 90], [60, 10], [190, 10]])
    let path = svg
                .append('path')
                .data([consolidateData])
                .style('fill', 'none')
                .attr('id', 'priceChart')
                .attr('stroke', '#008000')
                .attr('stroke-width', '2')
                .attr('d', d3.line()
                            .x(function(d) { return xScale(d.date) })
                            .y(function(d) { return yScale(d.closingPrice) })
                );

               
    
        //get the length of the line and then animate
        let totalLength = path.node().getTotalLength();
        path
            .attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition()
              .duration(3000)
              .ease(d3.easeLinear)
              .attr("stroke-dashoffset", 0)



          

        
    //Moving Average over 30 days
    const movingAverageData = movingAverage(consolidateData, 30);                            
    let mvPath = svg.append('path')
                      .data([movingAverageData])
                      .style('fill', 'none')
                      .attr('id', 'movingAverageLine')
                      .attr('stroke', '#FF8900')
                      .attr('d', d3.line()
                              .x(function(d) { return xScale(d.date) })
                              .y(function(d) { return yScale(d.average) })
                              .curve(d3.curveBasis)
                      );

        let mvTotalLength = mvPath.node().getTotalLength();
        mvPath
            .attr("stroke-dasharray", mvTotalLength + " " + mvTotalLength)
            .attr("stroke-dashoffset", mvTotalLength)
            .transition()
              .duration(3000)
              .ease(d3.easeLinear)
              .attr("stroke-dashoffset", 0)

    //display companyName
    const companyName = document.querySelector('#companyName').textContent
    svg.append("text")
        .attr("transform", "translate(0, 0)")
        .attr("x", 30)
        .attr("y", 30)
        .attr("font-size", "30px")
        .style('font-weight', 500)

        .attr("fill", "white")
        .text(companyName)

    //display last price
    const lastPrice = consolidateData[consolidateData.length -1].closingPrice.toFixed(2);
    d3.select("#last-price").append('text').text(`$${lastPrice}`);

    //display last 30 days moving average
    const last30daysMovingaverage = movingAverageData[movingAverageData.length -1].average.toFixed(2);
    d3.select("#last-30-days-moving-average").append('text').text(`$${last30daysMovingaverage}`);

}

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


function convertUnixTime(unixTime){
    return new Date(unixTime * 1000)
}



export default historicalPriceChart