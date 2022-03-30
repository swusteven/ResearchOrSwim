import { schemeDark2 } from "d3";

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

    var tooltip = d3.select("#earnings")
                    .append("div")
                    .attr("class", "d3-tip")
                    .style("position", "absolute")
                    .style("opacity", 0);
    

    const canvas = svg.append('g')
                        .attr('transform', 'translate(' + 60 + ', '+ 50 +')');

    canvas.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(xScale));

    canvas.append("g")
         .call(d3.axisLeft(yScale).tickFormat(function(d){
             return "$" + d/1000;
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

         function onMouseOver(d,i){
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
                .attr('height', function(d){return height - yScale(d)})
         }
};


export default earningChart