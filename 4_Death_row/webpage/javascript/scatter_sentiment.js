var margin = { top: 50, right: 20, bottom: 50, left: 50 },
    outerWidth = 960,
    outerHeight = 960/1.6,
    width = outerWidth - margin.left - margin.right,
    height = outerHeight - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]).nice();

var y = d3.scale.linear()
    .range([height, 0]).nice();

var yCat = "Polarity",
    xCat = "Subjectivity",
    colorCat = "Type";

function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

d3.csv("sentiment_values.csv", function(data) {
  data.forEach(function(d) {
    d.Polarity = +d.Polarity;
    d.Subjectivity = +d.Subjectivity;
  });

  var xMax = d3.max(data, function(d) { return d[xCat]; }) * 1.001,
      xMin = d3.min(data, function(d) { return d[xCat]; }) * 1.001,
      yMax = d3.max(data, function(d) { return d[yCat]; }) * 1.001,
      yMin = d3.min(data, function(d) { return d[yCat]; }) * 1.001;

  x.domain([xMin, xMax]);
  y.domain([yMin, yMax]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickSize(-height);

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickSize(-width);

  var color = d3.scale.category10();

  var tip = d3.tip()
      .attr("class", "d3-tip")
      .offset([-10, 0])
      .html(function(d) {
        return xCat + ": " + precisionRound(d[xCat],3) + "<br>" + yCat + ": " + precisionRound(d[yCat],3);
      });

  var zoomBeh = d3.behavior.zoom()
      .x(x)
      .y(y)
      .size([width,height])
      .scaleExtent([0.99,5])
      .on("zoom", zoom);

  var svg6 = d3.select("#scatter_sentiment")
    .append("svg")
      .attr("width", outerWidth)
      .attr("height", outerHeight)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(zoomBeh);

  svg6.call(tip);

  svg6.append("rect")
      .attr("width", width)
      .attr("height", height);

  svg6.append("g")
      .classed("x axis", true)
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .classed("label", true)
      .attr("x", width/2+40)
      .attr("y", margin.bottom - 10)
      .style("text-anchor", "end")
      .text(xCat);

  svg6.append("g")
      .classed("y axis", true)
      .call(yAxis)
    .append("text")
      .classed("label", true)
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left)
      .attr("x", -150)
      .attr("dy", ".79em")
      .style("text-anchor", "end")
      .text(yCat);

  var objects = svg6.append("svg")
      .classed("objects", true)
      .attr("width", width)
      .attr("height", height);

  objects.append("svg6:line")
      .classed("axisLine hAxisLine", true)
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", width)
      .attr("y2", 0)
      .attr("transform", "translate(0," + height + ")");

  objects.append("svg6:line")
      .classed("axisLine vAxisLine", true)
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", height);

  objects.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .classed("dot", true)
      .attr("r", 4.5)
      .attr("transform", transform)
      .style("fill", function(d) { return color(d[colorCat]); })
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide);

  var legend = svg6.selectAll(".legend")
      .data(color.domain())
      .enter().append("g")
      .classed("legend", true)
      .attr("transform", function(d, i) { return "translate(" + i * 80 + ",0)"; });

  legend.append("circle")
      .attr("r", 5.5)
      .attr("cy", -margin.top/2)
      .attr("cx", 0)
      .attr("fill", color);

  legend.append("text")
      .attr("x", 10)
      .attr("y", -margin.top/2)
      .attr("dy", ".35em")
      .text(function(d) { return d; });

  d3.select("input").on("click", change);

  function change() {
    xCat = "Subjectivity";
    xMax = d3.max(data, function(d) { return d[xCat]; });
    xMin = d3.min(data, function(d) { return d[xCat]; });

    zoomBeh.x(x.domain([xMin, xMax])).y(y.domain([yMin, yMax]));

    var svg6 = d3.select("#scatter_sentiment").transition();

    svg6.select(".x.axis").duration(750).call(xAxis).select(".label").text(xCat);

    objects.selectAll(".dot").transition().duration(1000).attr("transform", transform);
  }

  function zoom() {
    svg6.select(".x.axis").call(xAxis);
    svg6.select(".y.axis").call(yAxis);

    svg6.selectAll(".dot")
        .attr("transform", transform);
  }

  function transform(d) {
    return "translate(" + x(d[xCat]) + "," + y(d[yCat]) + ")";
  }
});
