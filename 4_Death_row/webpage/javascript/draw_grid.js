function draw_grid(data2) {

  "use strict";
  var width = 960,
      height = 220;

  var box_width = 17,
      box_height = 17;

  var svg = d3.select("#inmate_grid")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("id", "grid")
      .append('g')
      .attr('class', 'chart')
      .attr("id","grid");

  d3.select('#grid')
      .selectAll("rect")
      .data(data2)
      .enter()
      .append("rect");

  // tooltip
  var div = d3.select("#inmate_grid")
      .append("div")
      .attr("class", "tooltip_words")
      .style("opacity", 0);

  d3.selectAll('rect')
    .attr("x", function(d, i) { return Math.floor((d['Execution']-1)/11)*(box_width+2); })
    .attr("y", function(d, i) { return ((d['Execution']-1)%11)*(box_height+2) })
    .attr("width", box_width)
    .attr("height", box_height)
    .style("fill","lightsteelblue")
    .on("mouseover", function(d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                var statement = d['Last Statement'];
                if (!statement) {var statement = "No Statement"};
                div.html("<p>"+d['Date']+"<br/>"+d["First Name"]+" "+d["Last Name"]+"<br/>"+statement+"</p>");
                d3.select(this).style("fill","grey");
                })
    .on("mouseout", function(d) {
        div.transition()
            .duration(500)
            .style("opacity", 0);
        d3.select(this).style("fill","lightsteelblue");
        })
};
