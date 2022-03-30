const earningChart = (data) => {
    const revenue = [];
    const year = [];
        
    for (let i = data.length >10 ? 10 : data.length -1; i >=0; i--) {
        revenue.push((data[i].revenue)); 
        year.push(data[i].year); 
    }   
    
    const svg = d3.select("#earnings").append('svg')
                .attr('width', 750)
                .attr('height', 350)
                
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

    const colors = d3.scaleLinear()
                    .domain([0, d3.max(revenue)])
                    .range(['#e81010', '#30e810'])

    let tooltip = d3.select('body')
                    .append('div')
                    .style('position', 'absolute')
                    .style('padding', '0 10px')
                    .style('background', 'white')
                    .style('opacity', 0)
                    .style('color', 'black');

    const canvas = svg.append('g')
                        .attr('transform', 'translate(' + 60 + ', '+ 50 +')');

    canvas.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(xScale));

    canvas.append("g")
         .call(d3.axisLeft(yScale).tickFormat(function(d){
             return "$" + (d/1000).toLocaleString("en-US");
         })
         .ticks(10))
         .append("text")
         .attr("text-anchor", "end")
         .text("value")
            
const bars =  canvas.selectAll(".bar")
        .data(revenue)
        .enter()
        .append("rect")
        .attr('class', 'bar')
        .style('fill', function(d){return colors(d)})
        .attr('x', function(d, i) {return xScale(year[i])})   //takes in year
        .attr('y', function(d) {return yScale(d)})
        .attr('width', xScale.bandwidth())
        .on('mouseover', onMouseOver)
        .on('mouseout', onMouseOut)
        .transition()
        .ease(d3.easeLinear)
        .duration(500)
        .delay(function(d, i) {return i * 50})
        .attr('height', function(d) {return height -  yScale(d)})        

         function onMouseOver(d, i){
            let xPos = d.pageX;
            let yPos = d.pageY                   

            d3.select('#tooltip')
                .style('left', xPos + 'px')
                .style('top', yPos + 'px')
                .select('#value')
                .text(`$${parseInt(i/1000).toLocaleString("en-US")}`)  // in this case (mouseOver) d is the event, i is the data and we want data so i
            d3.select('#tooltip').classed("hidden", false)

            d3.select(this).attr('class', 'highlight')
            d3.select(this)
                .transition()  //add animation
                .duration(100)
                .attr('width', xScale.bandwidth() + 5)
                .attr('y', function(d){return yScale(d) - 10})
                .attr('height', function(d) {return  height -  yScale(d) + 10})
         }

         function onMouseOut(d, i){
             d3.select(this).attr('class', 'bar')
             d3.select(this)
                .transition()
                .duration(100)
                .attr('width', xScale.bandwidth())
                .attr('y', function(d){return yScale(d)})
                .attr('height', function(d){return height - yScale(d)});

            d3.select('#tooltip').classed("hidden", true)

         }
};


export default earningChart