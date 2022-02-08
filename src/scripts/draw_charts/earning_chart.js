console.log('this is from the earning chart file')

const earningChart = (data) => {
    const revenue = [];
    const year = [];
    console.log(data)
    
    for (let i = 10; i >=0; i--) {
        revenue.push(data[i].revenue); 
        year.push(data[i].year); 
    }   


    // const revenue = [160, 25, 40, 550, 16, 25, 40, 550, 16, 25, 40, 550];
    // const year = [];
    
    // for (let i = 2015; year.length < revenue.length; i++) {
    //          year.push(i)     
    // };  

    
    const svg = d3.select("#earnings").append('svg')
                .attr('width', 600)
                .attr('height', 500)
                // .style('background', '#C9D7D6'),
                
          const margin = 200,
                width = svg.attr('width') - margin,
                height = svg.attr('height') - margin;

    const xScale = d3.scaleBand()
                    .range([0, width])
                    .padding(0.3)
                    .domain(year)

    const yScale = d3.scaleLinear()
                    .range([height, 0])
                    .domain([0, d3.max(revenue)])

    const grouped = svg.append('g')
                        .attr('transform', 'translate(' + 100 + ', '+ 100 +')');


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
        .style('fill', '#C61C6F')
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
        });


    svg.append("text")
        .attr("transform", "translate(100,0)")
        .attr("x", 50)
        .attr("y", 50)
        .attr("font-size", "24px")
        .text(`${year[0]} - ${year[year.length -1]} earnings  `)


    // //transition effect
    // chart.transition()
    //     .attr('y', (d)=> height - yScale(d))
    //     .attr('height', (d)=> yScale(d))
    //     .delay(function(d, idx){
    //         return idx * 100;
    //     })


};


export default earningChart