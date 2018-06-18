/*
 * scrollVis - encapsulates
 * all the code for the visualization
 */
var scrollVis = function (d) {
  // constants to define the size
  // and margins of the vis area.
  var width = 1140;
  var height = width/1.6;
  var padding = 100; // AMY NEED THIS?
  var margin = { top: 0, left: 20, bottom: 40, right: 10 };

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

  // When scrolling to a new section
  // the activation function for that
  // section is called.
  var activateFunctions = [];
  // If a section has an update function
  // then it is called while scrolling
  // through the section with the current
  // progress through the section.
  var updateFunctions = [];

  /**
   * chart
   *
   * @param selection - the current d3 selection(s)
   *  to draw the visualization in. For this
   *  example, we will be drawing it in #vis
   */
  var chart = function (selection) {

  };

  /**
   * setupVis - creates initial elements for all
   * sections of the visualization.
   */
  var setupVis = function (wordData, fillerCounts, histData) {

  };

  /**
   * setupSections - each section is activated
   * by a separate function. Here we associate
   * these functions to the sections based on
   * the section's index.
   *
   */
  var setupSections = function () {
    // activateFunctions are called each
    // time the active section changes
    activateFunctions[0] = showMap;
    activateFunctions[1] = showPatientZero;
    activateFunctions[2] = showImpact;

    // updateFunctions are called while
    // in a particular section to update
    // the scroll progress in that section.
    // Most sections do not need to be updated
    // for all scrolling and so are set to
    // no-op functions.
    for (var i = 0; i < 9; i++) {
      updateFunctions[i] = function () {};
    }
    updateFunctions[1] = updatePatientZero;
    updateFunctions[2] = updateImpact;
  };

  /**
   * ACTIVATE FUNCTIONS
   *
   * These will be called their
   * section is scrolled to.
   *
   * General pattern is to ensure
   * all content for the current section
   * is transitioned in, while hiding
   * the content for the previous section
   * as well as the next section (as the
   * user may be scrolling up or down).
   *
   */

   /**
    * showMap
    */
   function showMap() {

   }

   /**
    * showPatientZero
    */
   function showPatientZero() {

   }

   /**
    * showImpact
    */
   function showImpact() {

   }

  /**
    * UPDATE FUNCTIONS
    *
    * These will be called within a section
    * as the user scrolls through it.
    *
    * We use an immediate transition to
    * update visual elements based on
    * how far the user has scrolled
    *
    */

  /**
    * updatePatientZero - increase
    * bubble size
    *
    * @param progress - 0.0 - 1.0 -
    *  how far user has scrolled in section
    */

    function updatePatientZero(progress) {

    }

  /**
   * updateImpact - increase
   * bubble size
   *
   * @param progress - 0.0 - 1.0 -
   *  how far user has scrolled in section
   */

    function updateImpact(progress) {

    }

  /**
    * DATA FUNCTIONS
    *
    * Used to coerce the data into the
    * formats we need to visualize
    *
    */
  // MAYBE IN THE FUTURE

  /**
    * activate -
    *
    * @param index - index of the activated section
    */
  chart.activate = function (index) {
    activeIndex = index;
    var sign = (activeIndex - lastIndex) < 0 ? -1 : 1;
    var scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign);
    scrolledSections.forEach(function (i) {
      activateFunctions[i]();
    });
    lastIndex = activeIndex;
  };

  /**
   * update
   *
   * @param index
   * @param progress
   */
  chart.update = function (index, progress) {
    updateFunctions[index](progress);
  };

  // return chart function
  return chart;
};

/**
 * display - called once data
 * has been loaded.
 * sets up the scroller and
 * displays the visualization.
 *
 * @param data - loaded tsv data
 */
function display(data) {
  // create a new plot and
  // display it
  var plot = scrollVis();
  d3.select('#vis')
    .datum(data)
    .call(plot);

  // setup scroll functionality
  var scroll = scroller()
    .container(d3.select('#graphic'));

  // pass in .step selection as the steps
  scroll(d3.selectAll('.step'));

  // setup event handling
  scroll.on('active', function (index) {
    // activate current section
    plot.activate(index);
  });

  scroll.on('progress', function (index, progress) {
    plot.update(index, progress);
  });
}

// load data and display
d3.csv('data/words.csv', display);


// add up there

var path = d3.geoPath();

var svg = d3.select('#graph').html('')
          .append('svg')
          .attr("width", width)
          .attr("height",height)
          .append('g')
          .attr("class","map");

var projection = d3.geoMercator()
          .scale(1400)
          .center(["-4","15.5"]);

var path = d3.geoPath().projection(projection);

var g = svg.append("g");

d3.json("json/world-110m2.json", function(error, topology) {
  g.selectAll("path")
    .data(topojson.object(topology, topology.objects.countries)
        .geometries)
  .enter()
    .append("path")
    .attr("d", path)



function showMap() {
  projection.scale(1400)
      .center(["-4","15.5"]);

  g.selectAll('.openvis-title')
    .transition()
    .duration(600)
    .attr('opacity', 1.0);
}
