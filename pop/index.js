import {
  select,
  csv,
  scaleLinear,
  max,
  scaleBand,
  axisLeft,
  axisBottom,
  format
} from 'd3';

const xAxisLabelText = 'Population';

const svg = select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data => {
  const xValue = d => d['population'];
  const yValue = d => d.country;
  const margin = { top: 50, right: 40, bottom: 80, left: 150 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  
  //where the rectangle start
  const xScale = scaleLinear()
    .domain([1, max(data, xValue)])//normally start from zero
    .range([0, innerWidth]);
  
 //size of the rechtangle 
  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .padding(0.50);
 
  //margin left and top
  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);
  
  //custom the xaxis format
  const xAxisTickFormat = number =>
    format('.3s')(number)
      .replace('G', 'B');
  
 // 
  const xAxis = axisBottom(xScale)
    .tickFormat(xAxisTickFormat)
    .tickSize(-innerHeight);
  
  //remove the tickline
  g.append('g')
    .call(axisLeft(yScale))
    .selectAll('.tick line')
      .remove();
  
  const xAxisG = g.append('g').call(xAxis)
    .attr('transform', `translate(0,${innerHeight})`);
  
  xAxisG.select('.domain').remove();
  
  xAxisG.append('text')
      .attr('class', 'axis-label')
      .attr('y', 50)
      .attr('x', innerWidth / 2)
      .attr('fill', '#2E86C1')
      .text(xAxisLabelText);
  
  g.selectAll('rect').data(data)
    .enter().append('rect')
      .attr('y', d => yScale(yValue(d)))
      .attr('width', d => xScale(xValue(d)))
      .attr('height', yScale.bandwidth())         
    .attr("fill",function(d){
              return "black";})
         .on("mouseover",function(){
            d3.select(this)
              .attr("fill","orange");
        })
         .on("mouseout",function(d){
            d3.select(this)
              .transition()
              .duration(250)
              .attr("fill","black");
        });;
  
  g.append('text')
      .attr('class', 'title')
        .attr('fill', '#2E86C1')
  .attr('x',innerWidth / 3)
      .attr('y', -10)
      .text(titleText);
};
//1----------------------------------------------------
csv('data.csv').then(data => {
  data.forEach(d => {
    d.population = +d.population ; //d.population = +d.population change string to number
  });
  render(data);
});