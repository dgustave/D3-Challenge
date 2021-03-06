// import * as d3 from './d3';
// import * as Dropdown from './dropdown.js'; 
import * as Scatter from './scatter.js';

// Dropdown.dropdownMenu(select('body'), {
//   options: ["poverty", "age", "income" ]
// });


// You need to create a scatter plot between two of the data variables such as `Healthcare vs. Poverty` or `Smokers vs. Age`.
// Create an SVG wrapper to id = "scatter", append an SVG group that will hold our chart, and shift the latter by left and top margins
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", Scatter.svgWidth)
  .attr("height", Scatter.svgHeight);

  var chartGroup = svg.append("g")
  .attr("transform", `translate(${Scatter.margin.left}, ${Scatter.margin.top})`);
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
  let xLinearScale = Scatter.xScale(healthData, chosenXAxis);
  let yLinearScale = Scatter.yScale(healthData, chosenYAxis);

  // Initialize axis functions:
  // This function returns the created bottom horizontal axis
  let bottomAxis = d3.axisBottom(xLinearScale);
  // This function returns the created left vertical axis
  let leftAxis = d3.axisLeft(yLinearScale);

   // Append x and y axes to the chart then set 
  let xAxis = chartGroup.append("g")
   .attr("transform", `translate(0, ${Scatter.height})`)
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
   .attr("transform", `translate(${Scatter.width / 2}, ${Scatter.height})`);

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
   .attr("x", -(Scatter.height / 2))
   .attr("y", -40)
   .attr("value", "healthcare") // value to grab for event listener
   .text("Lacks Healthcare (%)")
   .classed("active", true);

 const smokesLabel = ylabelsGroup.append("text")
   .attr("transform", "rotate(-90)")
   .attr("x", -(Scatter.height / 2))
   .attr("y", -60)
   .attr("value", "smokes") // value to grab for event listener
   .text("Smokes (%)")
   .classed("inactive", true);

 const obeseLabel = ylabelsGroup.append("text")
   .attr("transform", "rotate(-90)")
   .attr("x", -(Scatter.height / 2))
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
     xLinearScale = Scatter.xScale(healthData, chosenXAxis);

     // updates x axis with transition
     xAxis = Scatter.renderXAxes(xLinearScale, xAxis);

     // updates circles with new x values
     circlesXY = Scatter.renderXCircles(circlesXY, xLinearScale, chosenXAxis);

     // updates circles text with new x values
     circlesText = Scatter.renderXText(circlesText, xLinearScale, chosenXAxis);

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
 
  // y axis labels event listener
 ylabelsGroup.selectAll("text")
   .on("click", function() {
   // get value of selection
   const value = d3.select(this).attr("value");
   if (value !== chosenYAxis) {

     // replaces chosenYAxis with value
     chosenYAxis = value;

     // updates y scale for new data
     yLinearScale = Scatter.yScale(healthData, chosenYAxis);

     // updates y axis with transition
     yAxis = Scatter.renderYAxes(yLinearScale, yAxis);

     // updates circles with new y values
     circlesXY = Scatter.renderYCircles(circlesXY, yLinearScale, chosenYAxis);

     // updates circles text with new y values
     circlesText = Scatter.renderYText(circlesText, yLinearScale, chosenYAxis);

     // updates tooltips with new info
     circlesGroup = updateToolTip(circlesGroup, chosenXAxis, chosenYAxis);

     // changes classes to change bold text
     if (chosenYAxis === "smokes") {
       healthcareLabel
         .classed("active", false)
         .classed("inactive", true);
       smokesLabel
         .classed("active", true)
         .classed("inactive", false);
       obeseLabel
         .classed("active", false)
         .classed("inactive", true);
     }
     else if (chosenYAxis === "obesity"){
       healthcareLabel
         .classed("active", false)
         .classed("inactive", true);
       smokesLabel
         .classed("active", false)
         .classed("inactive", true);
       obeseLabel
         .classed("active", true)
         .classed("inactive", false);
     }
     else {
       healthcareLabel
         .classed("active", true)
         .classed("inactive", false);
       smokesLabel
         .classed("active", false)
         .classed("inactive", true);
       obeseLabel
         .classed("active", false)
         .classed("inactive", true);
     }
   }
 });
})()

  // function used for updating circles group with new tooltip
  function updateToolTip(circlesGroup, chosenXAxis, chosenYAxis) {
  
    let xpercentsign = "";
    let xlabel = "";
    if (chosenXAxis === "poverty") {
      xlabel = "Poverty";
      xpercentsign = "%";
    } else if (chosenXAxis === "age"){
      xlabel = "Age";
    } else {
      xlabel = "Income";
    }
  
    let ypercentsign = "";
    let ylabel = "";
    if (chosenYAxis === "healthcare") {
      ylabel = "Healthcare";
      ypercentsign = "%";
    } else if (chosenYAxis === "smokes"){
      ylabel = "Smokes";
      ypercentsign = "%";
    } else {
      ylabel = "Obesity";
      ypercentsign = "%";
    }

    //   // Step 1: Initialize Tooltip
    //   var toolTip = d3.tip()
    //     .attr("class", "d3-tip")
    //     // .offset([80, -60])
    //   .html(function (d) {
    //     if (chosenXAxis === "income") {
    //       let incomelevel = formatter.format(d[chosenXAxis]);
    //       return (`${d.state}<br>${xlabel}: ${incomelevel.substring(0, incomelevel.length - 3)}${xpercentsign}<br>${ylabel}: ${d[chosenYAxis]}${ypercentsign}`);
    //     }
    //     else {
    //       return (`${d.state}<br>${xlabel}: ${d[chosenXAxis]}${xpercentsign}<br>${ylabel}: ${d[chosenYAxis]}${ypercentsign}`);
    //     };
    //   });

    //   // Step 2: Create the tooltip in chartGroup.
    //   circlesGroup.call(toolTip);

    //   // Step 3: Create "mouseover" event listener to display tooltip
    //   circlesGroup.on("mouseover", function(d) {
    //     toolTip.show(d);
    //   })
    //   // Step 4: Create "mouseout" event listener to hide tooltip
    //     .on("mouseout", function(d) {
    //       toolTip.hide(d);
    //     });
      return circlesGroup;
    };



    /* Initialize tooltip */
    // do one at a time: 
    // let toolTip = d3.selectAll("circle")
    //   .append("div")
    //   .attr("class", "d3-tip")
    //   // .offset([80, -60])
    //   .html(function (d) {
    //     if (chosenXAxis === "income") {
    //       let incomelevel = formatter.format(d[chosenXAxis]);
    //       return (`${d.state}<br>${xlabel}: ${incomelevel.substring(0, incomelevel.length - 3)}${xpercentsign}<br>${ylabel}: ${d[chosenYAxis]}${ypercentsign}`);
    //     }
    //     else {
    //       return (`${d.state}<br>${xlabel}: ${d[chosenXAxis]}${xpercentsign}<br>${ylabel}: ${d[chosenYAxis]}${ypercentsign}`);
    //     };
    //   });

      // circlesGroup.call(toolTip)

      // d3.select("#circleBasicTooltip")
      //   .on("mouseover", function(){return tooltip.style("visibility", "visible");})
    // // mouseover event
    // toolTip.on("mouseover", function(d){
    //   toolTip.show(this);

    // })
    //   // onmouseout event
    //   .on("mouseout", function(d){
    //     circlesGroup.hide(this);
    //   });
  
  // return circlesGroup;
  // }

export {chosenXAxis, chosenYAxis}

 

