// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// You need to create a scatter plot between two of the data variables such as `Healthcare vs. Poverty` or `Smokers vs. Age`.
// Create an SVG wrapper to id = "scatter", append an SVG group that will hold our chart, and shift the latter by left and top margins
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
  // Initial Params
let chosenXAxis = "poverty";
let chosenYAxis = "healthcare";

// Async functions retrieve information that does not have its own storage, but finds the nested data by constulting random storages.
(async function(){

    // Wait until you find the data then import it 
   const healthData = await d3.csv("assets/data/data.csv");
   // Pull data for specified fields
    healthData.forEach(function(data) {
      // Parse Data/Cast as numbers
      data.id         = +data.id;
      data.state      = +data.state; 
      data.abbr       = +data.abbr; 
      data.poverty    = +data.poverty;
      data.healthcare = +data.healthcare;
      data.age        = +data.age;
      data.smokes     = +data.smokes;
      data.obesity    = +data.obesity;
      data.income     = +data.income;
      console.log(data.age)
});

  // Initialize scale functions
  let xLinearScale = xScale(healthData, chosenXAxis);
  let yLinearScale = yScale(healthData, chosenYAxis);

  // Initialize axis functions
  let bottomAxis = d3.axisBottom(xLinearScale);
  let leftAxis = d3.axisLeft(yLinearScale);

   // Append x and y axes to the chart
   let xAxis = chartGroup.append("g")
   .attr("transform", `translate(0, ${height})`)
   .call(bottomAxis);

 let yAxis = chartGroup.append("g")
   .call(leftAxis);


})()

 


