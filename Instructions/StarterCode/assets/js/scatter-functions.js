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