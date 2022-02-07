const earningChart = () => {

    const revenue = [12, 78, 45, 15];
    const year = [2018, 2019, 2020, 2021];

    const height = 400,
          width = 600,
          barWidth = 50,
          barOffset = 5;

    //x and y scales for the bars
    const yScale = d3.scaleLinear()
                        .domain([0, d3.max(revenue)])
                        .range([0, height])

    const xScale = d3.scaleBand()
                        .domain(revenue)
                        .padding(.2)
                        .range([0, width])   
                     
                     
    //x and y scales for the guide
    const yAxisValues = d3.scaleLinear()
                            .domain([0, d3.max(revenue)])
                            .range([height, 0])

    const yAxisTicks = d3.axisLeft(yAxisValues)
                            .ticks(20)

    // const xAxisValues = d3.scaleTime()
    //                         .domain([year[0], year[(year.length -1)]])
    //                         .range([0,width])

    // const xAxisTicks = d3.axisBottom(xAxisValues)
    //                         .ticks(d3.timeYear.every(1))

    // const xGuide = d3.select("#earnings svg").append('g')
    //                     .attr('transform', 'translate(20, '+ height +')')
    //                     .call(xAxisTicks)


    d3.select("#earnings").append('svg')
        .attr('height', height + 5)    // + 5 is the margin to push it up
        .attr('width', width)
        .append('g')      //add this grouping for the purpuse of X and Y Guides
        .style('background', '#C9D7D6')
       .selectAll('rect').data(revenue)
        .enter().append('rect')
        .style('fill', '#C61C6F')
        .attr('y', (d)=> height - yScale(d))
        .attr('height', (d)=> yScale(d))
        .attr('width', (d) => xScale.bandwidth())
        .attr('x', (d, idx)=> xScale(d) );


    
    yGuide = d3.select("#earnings svg").append('g')
                .attr('transform', 'translate(20,0)')
                .call(yAxisTicks)
    
    
};

earningChart()

export default earningChart