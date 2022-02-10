const earningChart = (data) => {
    const revenue = [];
    const year = [];
        
    for (let i = data.length >10 ? 10 : data.length -1; i >=0; i--) {
        revenue.push(data[i].revenue); 
        year.push(data[i].year); 
    }   
    
    const svg = d3.select("#earnings").append('svg')
                .attr('width', 750)
                .attr('height', 350)
                // .style('background', '#C9D7D6'),
                
          const margin = 50,
                width = svg.attr('width') - margin,
                height = svg.attr('height') - margin - 50;

    const xScale = d3.scaleBand()
                    .range([0, width])
                    .padding(0.3)
                    .domain(year)

    const yScale = d3.scaleLinear()
                    .range([height, 0])
                    .domain([0, d3.max(revenue)])

    const grouped = svg.append('g')
                        .attr('transform', 'translate(' + 60 + ', '+ 50 +')');


    grouped.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(xScale));

    grouped.append("g")
         .call(d3.axisLeft(yScale).tickFormat(function(d){
             return "$" + d;
         }).ticks(10))
         .append("text")
         .attr("y", 6)
         .attr("dy", "0.71em")
         .attr("text-anchor", "end")
         .text("value");

    grouped.selectAll(".bar")
        .data(revenue)
        .enter().append("rect")
        .attr('class', 'bar')
        .style('fill', '#c61c6f')
        .attr('x', function(d, i) {return xScale(year[i])})   //takes in year
        .attr('y', function(d) {return yScale(d)})
        .attr('width', xScale.bandwidth())
        .attr('height', function(d) {return height -  yScale(d)})
        
      .on('mouseover', function(d){
            d3.select(this)
                .style('opacity', .5)            //or use style('fill'. 'color')
            })

        .on('mouseout', function(d){
            d3.select(this)
                 .style('opacity', 1)
        })
                
        ;


    // svg.append("text")
    //     .attr("transform", "translate(150,0)")
    //     .attr("x", 50)
    //     .attr("y", 50)
    //     .attr("font-size", "18px")
    //     .text(`${year[0]} - ${year[year.length -1]} earnings  `)


    // //transition effect
    // chart.transition()
    //     .attr('y', (d)=> height - yScale(d))
    //     .attr('height', (d)=> yScale(d))
    //     .delay(function(d, idx){
    //         return idx * 100;
    //     })





};


export default earningChart