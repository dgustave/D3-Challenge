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

    // Import Data
    // const stateData = await d3.csv("assets/data/data.csv");
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
        
    // })
});


})()

 

// * Include state abbreviations in the circles.

// * Create and situate your axes and labels to the left and bottom of the chart.

// * Note: You'll need to use `python -m http.server` to run the visualization. This will host the page at `localhost:8000` in your web browser.


// Why make a static graphic when D3 lets you interact with your data?


// #### 1. More Data, More Dynamics

// You're going to include more demographics and more risk factors. Place additional labels in your scatter plot and give them click events so that your users can decide which data to display. Animate the transitions for your circles' locations as well as the range of your axes. Do this for two risk factors for each axis. Or, for an extreme challenge, create three for each axis.

// * Hint: Try binding all of the CSV data to your circles. This will let you easily determine their x or y values when you click the labels.

// #### 2. Incorporate d3-tip

// While the ticks on the axes allow us to infer approximate values for each circle, it's impossible to determine the true value without adding another layer of data. Enter tooltips: developers can implement these in their D3 graphics to reveal a specific element's data when the user hovers their cursor over the element. Add tooltips to your circles and display each tooltip with the data that the user has selected. Use the `d3-tip.js` plugin developed by [Justin Palmer](https://github.com/Caged)—we've already included this plugin in your assignment directory.

