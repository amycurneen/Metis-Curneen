function draw_count(data) {

  "use strict";
  var margin = 75,
      width = 1000 - margin,
      height = 500 - margin;

  var radius = 7,
      multiplier = 2;

  var svg = d3.select("#over_time")
      .append("svg")
      .attr("width", width + margin)
      .attr("height", height + margin)
      .append('g')
      .attr('class', 'chart');

  d3.select('svg')
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle");

  // tooltip?

  var div = d3.select("#over_time")
      .append("div")
      .attr("class", "tooltip_event")
      .style("opacity", 0);

  var div_small = d3.select("#over_time")
      .append("div")
      .attr("class", "tooltip_count")
      .style("opacity", 0);

  var time_extent = d3.extent(data, function(d) {
      return d['year'];
      });

  var time_scale = d3.scale.linear()
      .range([margin, width])
      .domain([time_extent[0]-10,time_extent[1]+1]);

  var count_extent = d3.extent(data, function(d) {
      return d['count'];
      });

  var count_scale = d3.scale.linear()
      .range([height, margin])
      .domain([count_extent[0],count_extent[1]+5]);

  var time_axis = d3.svg.axis()
      .scale(time_scale)
      .tickFormat(d3.format("d"));

  d3.select("svg")
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', "translate(0," + height + ")")
      .call(time_axis);

  function customYAxis(g) {
    g.call(count_axis);
    g.select(".domain").remove();
    g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "#777").attr("stroke-dasharray", "2,2");
    g.selectAll(".tick text").attr("x", 4).attr("dy", -4);
  }

  var count_axis = d3.svg.axis()
      .scale(count_scale)
      .orient("left")
      .tickSize(-width+margin);

  d3.select("svg")
      .append('g')
      .attr('class', 'y axis')
      .attr('transform', "translate(" + margin + ",0)")
      .call(customYAxis);

  svg.append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", (width-margin)/2+margin+15)
      .attr("y", height+50)
      .text("Year");

  svg.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("x", -height/2)
      .attr("y", 30)
      .attr("dy", ".75em")
      .text("Number of Executions");

  var dots = d3.selectAll('circle')
      .attr('cx', function(d) {
          return time_scale(d['year']);
      })
      .attr('cy', function(d) {
          return count_scale(d['count']);
      })
      .attr('r', radius)
      .style('opacity', 0);

  dots.transition()
      .delay(function(d,i){ return i * (30); })
      .style('opacity', 1);

  dots.on("mouseover", function(d) {
                  div_small.transition()
                      .duration(200)
                      .style("opacity", .9);
                  div_small.html(d.year + ":<br/>Count:"  + d.count)
                      .style("left", (d3.event.pageX) + "px")
                      .style("top", (d3.event.pageY - 28) + "px");
                  })
      .on("mouseout", function(d) {
          div_small.transition()
              .duration(500)
              .style("opacity", 0);
      });

  svg.append("line")
      .attr("class", "event")
      .attr("id", "legal")
      .attr("x1", time_scale(1976))
      .attr("y1", margin)
      .attr("x2", time_scale(1976))
      .attr("y2", height)
      .on("mouseover", function(d) {
                  div.transition()
                      .duration(200)
                      .style("opacity", .9);
                  div.html("1976:<br/>The Supreme Court decision in Gregg v. Georgia once again allowed for the death penalty to be imposed.")
                      .style("left", (d3.event.pageX) + "px")
                      .style("top", (d3.event.pageY - 75) + "px");
                  })
      .on("mouseout", function(d) {
          div.transition()
              .duration(500)
              .style("opacity", 0);
      });

  svg.append("line")
      .attr("class", "event")
      .attr("id", "disability")
      .attr("x1", time_scale(2002))
      .attr("y1", margin)
      .attr("x2", time_scale(2002))
      .attr("y2", height)
      .on("mouseover", function(d) {
                  div.transition()
                      .duration(200)
                      .style("opacity", .9);
                  div.html("2002:<br/>The Supreme Court decision in Atkins v. Virginia barred executions of the mentally disabled.")
                      .style("left", (d3.event.pageX) + "px")
                      .style("top", (d3.event.pageY - 75) + "px");
                  })
      .on("mouseout", function(d) {
          div.transition()
              .duration(500)
              .style("opacity", 0);
      });



  svg.append("line")
      .attr("class", "event")
      .attr("id", "smaller")
      .attr("x1", time_scale(2008))
      .attr("y1", margin)
      .attr("x2", time_scale(2008))
      .attr("y2", height)
      .on("mouseover", function(d) {
                  div.transition()
                      .duration(200)
                      .style("opacity", .9);
                  div.html("2008:<br/>The Supreme Court decision in Kennedy v. Louisiana barred executions for crimes other than first-degree murder.**")
                      .style("left", (d3.event.pageX) + "px")
                      .style("top", (d3.event.pageY - 75) + "px");
                  })
      .on("mouseout", function(d) {
          div.transition()
              .duration(500)
              .style("opacity", 0);
      });
};
