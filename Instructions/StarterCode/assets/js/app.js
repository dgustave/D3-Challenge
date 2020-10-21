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

// Import Data
(async function(){

    // Wait until data is imported
   const healthData = await d3.csv("assets/data/data.csv");
   console.log(healthData)
    // .then(function(healthData) {
    // Step 1: Parse Data/Cast as numbers
    // ==============================
    healthData.forEach(function(data) {
        data.id         = +data.id;
        data.state      = +data.state; 
        data.abbr       = +data.abbr; 
        data.poverty    = +data.poverty;
        data.healthcare = +data.healthcare;
        data.age        = +data.age;
        data.smokes     = +data.smokes;
        data.obesity    = +data.obesity;
        data.income     = +data.income;
        console.log(data.poverty)

});

})()

 


