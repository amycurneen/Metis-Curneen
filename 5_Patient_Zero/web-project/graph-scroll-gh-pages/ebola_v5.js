var dataset;

d3.csv("patient_zero.csv", function(error,data) {

  if (error) throw error;
  dataset = data;
  function render(){

  var width = 1140;
  var height = width/1.6;
  var padding = 100;

  // Keep track of which visualization
  // we are on and which was the last
  // index activated. When user scrolls
  // quickly, we want to call all the
  // activate functions that they pass.
  var lastIndex = -1;
  var activeIndex = 0;

  // main svg used for visualization
  var svg = null;

  // d3 selection that will be used
  // for displaying visualizations
  var g = null;

  // We will set the domain when the
  // data is processed
  // Log used because it is big disparity
  var aScale = d3.scaleLog()
              .domain([1,9000])
              .range([0,50]);

  // The bubble size translation uses this
  // scale to convert the progress
  // through the section into an index
  // @v4 using new scale name
  var patientZeroScale = d3.scaleLinear()
    .domain([0, 1.0])
    .rangeRound([4,12]);

  // The bubble size translation uses this
  // scale to convert the progress
  // through the section into an index
  // @v4 using new scale name
  var impactScale = d3.scaleLinear()
    .domain([0, 1.0])
    .rangeRound([15,250]);

  // Color of dot is determined just by the type of the outcome
  var barColors = { 'death': '#666666', 'cases': '#bf0b0b', 'PZ': '#085faf' };

  var svg = d3.select('#graph').html('')
            .append('svg')
            .attr("width", width)
            .attr("height",height)
            .append('g')
            .attr("class","map");

  var projection = d3.geoMercator()
                    .translate([0,0]);

  //Define what to do when panning or zooming
  var zooming = function(d) {
    //New offset array
    var offset = [d3.event.transform.x, d3.event.transform.y];

    //Calculate new scale
    var newScale = d3.event.transform.k * 2000;

    //Update projection with new offset and scale
    projection.translate(offset)
          .scale(newScale);

    //Update all paths and circles
    svg.selectAll("path")
      .attr("d", path);

    svg.selectAll("circle")
      .attr("cx", function(d) {
        return projection([d[2],d[1]])[0];
      })
      .attr("cy", function(d) {
        return projection([d[2], d[1]])[1];
      });
  };

  //Then define the zoom behavior
  var zoom = d3.zoom()
         .on("zoom", zooming);

  //mine
  var path = d3.geoPath().projection(projection);

  var g = svg.append("g")
            .attr("id", "map")
            .call(zoom)  //Bind the zoom behavior
            .call(zoom.transform, d3.zoomIdentity  //Then apply the initial transform
            .translate(width/2, height/2)
            .scale(.1)
            .translate(0,0));

  //disable user zoom and pan -- code with move it with scroll
  g.on("mousedown.zoom", null);
  g.on("mousemove.zoom", null);
  g.on("dblclick.zoom", null);
  g.on("touchstart.zoom", null);
  g.on("wheel.zoom", null);
  g.on("mousewheel.zoom", null);
  g.on("MozMousePixelScroll.zoom", null);

  d3.json("json/world-110m2.json", function(error, topology) {
    g.selectAll("path")
      .data(topojson.object(topology, topology.objects.countries)
          .geometries)
      .enter()
      .append("path")
      .attr("d", path)

  var circle = svg.selectAll('.testing')
            .data(data)
            .enter()
            .append('circle')
            .attr("class","testing")
            .attr("cx", function(d) {
              return projection([d[2],d[1]])[0];
            })
            .attr("cy", function(d) {
              return projection([d[2], d[1]])[1];
            })
            .attr("r", function(d) {
              a = +d[4]+1;
              return aScale(a);
            })
            .attr("fill", function(d) {
              if (d[3] == "cases") { return "red";
              } else if (d[3] == "death") { return "grey";
              } else { return "red";
              }
            })
            .attr("z-index", function(d) {
              if (d[3] === "cases") { return 0;
              } else if (d[3] == "death") { return 2;
              } else { return 4;
              }
            });


  var preset = [[.1,0,0,0],
                [2.5,350,300,2000],
                [2.5,350,300,2000],
                [2.5,350,300,2000],
                [2.5,350,300,2000],
                [.3,100,200,2000]];

  var gs = d3.graphScroll()
      .container(d3.select('.container-1'))
      .graph(d3.selectAll('container-1 #graph'))
      .eventId('uniqueId1')
      .sections(d3.selectAll('.container-1 #sections > div'))
      .on('active', function(loc){
        console.log(loc + ' section active');

        if (loc <= (preset.length-1)) { var pos = loc;
        } else { var pos = preset.length-1;
        };

        g.transition()
          .duration(preset[pos][3])
          .call(zoom.transform, d3.zoomIdentity
                    .translate(width/2, height/2)
                    .scale(preset[pos][0])
                    .translate(preset[pos][1],preset[pos][2]));

        d3.selectAll('.testing')
          .transition()
          .duration(100)
          .attr("r", function(d) {
            if (loc <= 4) { var mine = loc;
            } else { var mine = loc*20;
            }
            console.log(mine + ' mine');
            return aScale(+d[mine+4]+1);
          });
      });
  });

};

render();
});