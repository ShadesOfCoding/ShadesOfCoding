
// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 130, left: 100},
    width = 1060 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom - 30;

// append the svg object to the body of the page
var svg1 = d3.select("#spi_score_bar_chart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          `translate(${margin.left}, ${margin.top})`);

// Parse the Data
d3.csv("data/spi.csv").then( function(data) {

// sort data
data.sort(function(b, a) {
  return a.spi_score - b.spi_score;
});

// Add X axis
const x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.slice(0,83).map(d => d.country))
  .padding(0.1);
svg1.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Y axis
const y = d3.scaleLinear()
  .domain([0, 100])
  .range([ height, 0]);
svg1.append("g")
  .call(d3.axisLeft(y));

// Lines
svg1.selectAll("mybar")
  .data(data)
  .join("rect")
    .attr("x", d => x(d.country))
    .attr("y", d => y(d.spi_score))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.spi_score))
    .attr("fill", "#16D900")

})


/////////////////////////////////////////

var svg2 = d3.select("#svg2")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          `translate(${margin.left}, ${margin.top})`);

// Parse the Data
d3.csv("data/spi.csv").then( function(data) {

// sort data
data.sort(function(b, a) {
  return a.spi_score - b.spi_score;
});

// Add X axis
const x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.slice(83,167).map(d => d.country))
  .padding(0.1);
svg2.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Y axis
const y = d3.scaleLinear()
  .domain([0, 100])
  .range([ height, 0]);
svg2.append("g")
  .call(d3.axisLeft(y));

// Lines
svg2.selectAll("mybar")
  .data(data)
  .join("rect")
    .attr("x", d => x(d.country))
    .attr("y", d => y(d.spi_score))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.spi_score))
    .attr("fill", "#FF512E")

})


