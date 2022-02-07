const earningChart = (data) => {
    // const revenue = [];
    // const year = [];
    
    // for (let i = 5; i >=0; i--) {
    //     revenue.push(data[i].revenue); 
    //     year.push(data[i].year); 
    // }   



    const revenue = [16,25,40,550,16,25,40,550];
    const year = [];
    
    for (let i = 1; i < revenue.length + 2; i++) {
        year.push(new Date(`2/${i}/2022`))        
    };  

    
    const margin = {top: 0, right: 0 , bottom: 30, left: 30},
          height = 400 - margin.top - margin.bottom,
          width = 600 - margin.left - margin.right,
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
                            .ticks(10)


    const xAxisValues = d3.scaleTime()
                            .domain([year[0], year[(year.length -1)]])
                            .range([0,width])

    const xAxisTicks = d3.axisBottom(xAxisValues)
                            .ticks(d3.timeDay.every(1))

    const chart = 
    d3.select("#earnings").append('svg')
        .attr('height', height + margin.top + margin.bottom)    // + 5 is the margin to push it up
        .attr('width', width + margin.left + margin.right)
        .append('g')      //add this grouping for the purpuse of X and Y Guides
        .attr('transform', 'translate('+ margin.left + ', '+ margin.right +')')
        .style('background', '#C9D7D6')
    .selectAll('rect').data(revenue)
        .enter().append('rect')
        .style('fill', '#C61C6F')
        // .attr('y', (d)=> height - yScale(d))   //moved down to chart.transition. 
        // .attr('height', (d)=> yScale(d))       //moved down to chart.transition
        .attr('height', 0)                        //for transition affect, set it to 0 // no show 
        .attr('y', 0)                             //for transition affect, set it to 0 // no show 
        .attr('width', (d) => xScale.bandwidth())
        .attr('x', (d, idx)=> xScale(d) )

        .on('mouseover', function(d){
            d3.select(this)
                .style('opacity', .5)            //or use style('fill'. 'color')
            })

        .on('mouseout', function(d){
            d3.select(this)
                 .style('opacity', 1)
        });
    
    //transition effect
    chart.transition()
        .attr('y', (d)=> height - yScale(d))
        .attr('height', (d)=> yScale(d))
        .delay(function(d, idx){
            return idx * 100;
        })


        
    const yGuide = d3.select("#earnings svg").append('g')
                .attr('transform', 'translate(20,0)')
                .call(yAxisTicks)
        
    const xGuide = d3.select("#earnings svg").append('g')
                        .attr('transform', 'translate(20, '+ height +')')
                        .call(xAxisTicks)

};

earningChart();

export default earningChart