import * as DropdownMenu from './dropdownMenu'; 
import * as Scatterfx from './scatter-functions';
DropdownMenu.dropdownMenu(select('#scatter'), {
  options: []
});
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
      data.poverty    = +data.poverty;
      data.healthcare = +data.healthcare;
      data.age        = +data.age;
      data.smokes     = +data.smokes;
      data.obesity    = +data.obesity;
      data.income     = +data.income;
      // checking my points 
      console.log({"Poverty": data.poverty})
      console.log({"Healthcare": data.healthcare})
});

  // Initialize scale functions
  let xLinearScale = Scatterfx.xScale(healthData, chosenXAxis);
  let yLinearScale = Scatterfx.yScale(healthData, chosenYAxis);

  // Initialize axis functions:
  // This function returns the created bottom horizontal axis
  let bottomAxis = d3.axisBottom(xLinearScale);
  // This function returns the created left vertical axis
  let leftAxis = d3.axisLeft(yLinearScale);

   // Append x and y axes to the chart then set 
  let xAxis = chartGroup.append("g")
   .attr("transform", `translate(0, ${height})`)
   .call(bottomAxis);

 let yAxis = chartGroup.append("g")
   .call(leftAxis);

 // Create scatterplot and append initial circles
 let circlesGroup = chartGroup.selectAll("g circle")
   .data(healthData)
   .enter()
   .append("g");
 
 let circlesXY = circlesGroup.append("circle")
   .attr("cx", d => xLinearScale(d[chosenXAxis]))
   .attr("cy", d => yLinearScale(d[chosenYAxis]))
   .attr("r", 15)
   .classed("stateCircle", true);
 
 let circlesText = circlesGroup.append("text")
   .text(d => d.abbr)
   .attr("dx", d => xLinearScale(d[chosenXAxis]))
   .attr("dy", d => yLinearScale(d[chosenYAxis]) + 5)
   .classed("stateText", true);

 // Create group for 3 x-axis labels
 const xlabelsGroup = chartGroup.append("g")
   .attr("transform", `translate(${width / 2}, ${height})`);

 const povertyLabel = xlabelsGroup.append("text")
   .attr("x", 0)
   .attr("y", 40)
   .attr("value", "poverty") // value to grab for event listener
   .text("In Poverty (%)")
   .classed("active", true);

 const ageLabel = xlabelsGroup.append("text")
   .attr("x", 0)
   .attr("y", 60)
   .attr("value", "age") // value to grab for event listener
   .text("Age (Median)")
   .classed("inactive", true);

 const incomeLabel = xlabelsGroup.append("text")
   .attr("x", 0)
   .attr("y", 80)
   .attr("value", "income") // value to grab for event listener
   .text("Household Income (Median)")
   .classed("inactive", true);

 // Create group for 3 y-axis labels
 const ylabelsGroup = chartGroup.append("g");

 const healthcareLabel = ylabelsGroup.append("text")
   .attr("transform", "rotate(-90)")
   .attr("x", -(height / 2))
   .attr("y", -40)
   .attr("value", "healthcare") // value to grab for event listener
   .text("Lacks Healthcare (%)")
   .classed("active", true);

 const smokesLabel = ylabelsGroup.append("text")
   .attr("transform", "rotate(-90)")
   .attr("x", -(height / 2))
   .attr("y", -60)
   .attr("value", "smokes") // value to grab for event listener
   .text("Smokes (%)")
   .classed("inactive", true);

 const obeseLabel = ylabelsGroup.append("text")
   .attr("transform", "rotate(-90)")
   .attr("x", -(height / 2))
   .attr("y", -80)
   .attr("value", "obesity") // value to grab for event listener
   .text("Obese (%)")
   .classed("inactive", true);

    // initial tooltips
 circlesGroup = updateToolTip(circlesGroup, chosenXAxis, chosenYAxis);

 // x axis labels event listener
 xlabelsGroup.selectAll("text")
   .on("click", function() {
   // get value of selection
   const value = d3.select(this).attr("value");
   if (value !== chosenXAxis) {

     // replaces chosenXAxis with value
     chosenXAxis = value;

     // updates x scale for new data
     xLinearScale = Scatterfx.xScale(healthData, chosenXAxis);

     // updates x axis with transition
     xAxis = Scatterfx.renderXAxes(xLinearScale, xAxis);

     // updates circles with new x values
     circlesXY = renderXCircles(circlesXY, xLinearScale, chosenXAxis);

     // updates circles text with new x values
     circlesText = renderXText(circlesText, xLinearScale, chosenXAxis);

     // updates tooltips with new info
     circlesGroup = updateToolTip(circlesGroup, chosenXAxis, chosenYAxis);

     // changes classes to change bold text
     if (chosenXAxis === "age") {
       povertyLabel
         .classed("active", false)
         .classed("inactive", true);
       ageLabel
         .classed("active", true)
         .classed("inactive", false);
       incomeLabel
         .classed("active", false)
         .classed("inactive", true);
     }
     else if (chosenXAxis === "income") {
       povertyLabel
         .classed("active", false)
         .classed("inactive", true);
       ageLabel
         .classed("active", false)
         .classed("inactive", true);
       incomeLabel
         .classed("active", true)
         .classed("inactive", false);
     }
     else {
       povertyLabel
         .classed("active", true)
         .classed("inactive", false);
       ageLabel
         .classed("active", false)
         .classed("inactive", true);
       incomeLabel
         .classed("active", false)
         .classed("inactive", true);
     }
   }
 });

    


})()

 


