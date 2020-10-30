import {chosenXAxis, chosenYAxis} from './main.js';
// import {select} from 'd3';
// import d3Tip from "d3-tip";
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

// function used for updating x-scale const upon click on axis label
function xScale(scatterData, chosenXAxis) {
    // create scales
    let xLinearScale = d3.scaleLinear()
      .domain([d3.min(scatterData, d => d[chosenXAxis]) * 0.9,
        d3.max(scatterData, d => d[chosenXAxis]) * 1.1
      ])
      .range([0, width]);
  
    return xLinearScale;
  }
  
  // function used for updating y-scale const upon click on axis label
  function yScale(scatterData, chosenYAxis) {
    // create scales
    let yLinearScale = d3.scaleLinear()
      .domain([d3.min(scatterData, d => d[chosenYAxis]) - 1,
        d3.max(scatterData, d => d[chosenYAxis]) + 1
      ])
      .range([height, 0]);
  
    return yLinearScale;
  }

  // function used for updating xAxis const upon click on axis label
function renderXAxes(newXScale, xAxis) {
    let bottomAxis = d3.axisBottom(newXScale);
  
    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);
  
    return xAxis;
  }
  
  // function used for updating yAxis const upon click on axis label
  function renderYAxes(newYScale, yAxis) {
    let leftAxis = d3.axisLeft(newYScale);
  
    yAxis.transition()
      .duration(1000)
      .call(leftAxis);
  
    return yAxis;
  }
  
  // functions used for updating circles group with a transition to
  // new circles for both X and Y coordinates
  function renderXCircles(circlesGroup, newXScale, chosenXaxis) {
  
    circlesGroup.transition()
      .duration(1000)
      .attr("cx", d => newXScale(d[chosenXAxis]));
  
    return circlesGroup;
  }
  
  function renderYCircles(circlesGroup, newYScale, chosenYaxis) {
  
    circlesGroup.transition()
      .duration(1000)
      .attr("cy", d => newYScale(d[chosenYAxis]));
  
    return circlesGroup;
  }
  
  // functions used for updating circles text with a transition on
  // new circles for both X and Y coordinates
  function renderXText(circlesGroup, newXScale, chosenXaxis) {
  
    circlesGroup.transition()
      .duration(1000)
      .attr("dx", d => newXScale(d[chosenXAxis]));
  
    return circlesGroup;
  }
  
  function renderYText(circlesGroup, newYScale, chosenYaxis) {
  
    circlesGroup.transition()
      .duration(1000)
      .attr("dy", d => newYScale(d[chosenYAxis])+5);
  
    return circlesGroup;
  }
  
  // format number to USD currency
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  
  export {xScale, renderXAxes, renderXCircles, renderXText,  yScale, renderYAxes, renderYCircles, renderYText, svgHeight, svgWidth, width, height, margin}
  