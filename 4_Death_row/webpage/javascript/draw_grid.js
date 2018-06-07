function draw_grid(data2) {

  "use strict";
  var width = 960,
      height = 250;

  var box_width = 17,
      box_height = 17;

  var svg5 = d3.select("#inmate_grid")
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
      .append("rect")
      .attr("class", "grid_rect");

  // tooltip
  var div = d3.select("#inmate_grid")
      .append("div")
      .attr("class", "tooltip_words")
      .style("opacity", 0);

  d3.selectAll('.grid_rect')
    .attr("x", function(d, i) { return Math.floor((d['Execution']-1)/11)*(box_width+2); })
    .attr("y", function(d, i) { return ((d['Execution']-1)%11)*(box_height+2)+30 })
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

    var time1 = d3.select('#grid')
            .append("text")
            .attr("x",0)
            .attr("y",20)
            .attr("text-anchor","start")
            .style("font-size", "15px")
            .style("font-family", "Roboto")
            .style("font-weight","lighter")
            .text(1982);

    var time2 = d3.select('#grid')
            .append("text")
            .attr("x",948)
            .attr("y",20)
            .attr("text-anchor","end")
            .style("font-size", "15px")
            .style("font-family", "Roboto")
            .style("font-weight","lighter")
            .text(2018);

    var time3 = d3.select('#grid')
            .append("text")
            .attr("x",(950/2))
            .attr("y",20)
            .attr("text-anchor","middle")
            .style("font-size", "15px")
            .style("font-family", "Roboto")
            .style("font-weight","lighter")
            .text(2002);
};
