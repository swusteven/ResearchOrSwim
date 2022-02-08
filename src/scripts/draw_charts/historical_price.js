const historicalPriceChart = (data) => {
  const consolidateData = [];
    
    for (let i = 0; i < data.c.length; i++) {
        consolidateData.push({closingPrice: data.c[i], date: convertUnixTime(data.t[i])})     
    }
       
    const margin ={top: 30, right: 30, bottom: 30, left: 30},
          width = 600 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;

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
            .call(d3.axisBottom(xScale));

    svg.append('g')
            .attr('id', 'yAxis')
            .attr('transform', `translate(${width}, 0)`)
            .call(d3.axisRight(yScale));


    //  d3.line()([[10, 60], [40, 90], [60, 10], [190, 10]])
    svg.append('path')
        .data([consolidateData])
        .style('fill', 'none')
        .attr('id', 'priceChart')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', '1.5')
        .attr('d', d3.line()
                    .x(function(d) { return xScale(d.date) })
                    .y(function(d) { return yScale(d.closingPrice) })
        );  
        
    //Moving Average over 30 days
    const movingAverageData = movingAverage(consolidateData, 30);                            
    svg.append('path')
            .data([movingAverageData])
            .style('fill', 'none')
            .attr('id', 'movingAverageLine')
            .attr('stroke', '#FF8900')
            .attr('d', d3.line()
                    .x(function(d) { return xScale(d.date) })
                    .y(function(d) { return yScale(d.average) })
                    .curve(d3.curveBasis)
            );
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