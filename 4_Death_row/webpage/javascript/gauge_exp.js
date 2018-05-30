function make_gauge() {

d3.select("input[value=\"thankYou\"]").property("checked", true);

var svg = d3.select("#words_summary")
  .append("svg")
  .attr("width", 400)
  .attr("height", 240)
  .append("g")

svg.append("g")
  .attr("class", "slices");
svg.append("g")
  .attr("class", "labelName");

var radius = 200;

var pie = d3.layout.pie()
  .sort(null)
  .value(function(d) {
    return d.value;
  })
  .startAngle(-0.5 * Math.PI)
  .endAngle(0.5 * Math.PI);

var arc = d3.svg.arc()
  .outerRadius(radius)
  .innerRadius(radius * 0.6);

svg.attr("transform", "translate("+radius+","+radius*1.1+")");

var colorRange = d3.scale.category20();
var color = d3.scale.ordinal()
  .range(colorRange.range());

var current = svg.append("text")
        .attr("x",0)
        .attr("y",-25)
        .attr("text-anchor", "middle")
        .style("font-size", "45")
        .style("font-family", "Open+Sans")
        .style("font-weight","lighter")
        .text(current);

datasetThankYou = [
    {label:"Category 1", value:67},
        {label:"Category 2", value:33}
        ];

datasetLove = [
    {label:"Category 1", value:96},
        {label:"Category 2", value:4}
        ];

datasetInnocent = [
    {label:"Category 1", value:6},
        {label:"Category 2", value:94}
        ];

datasetSorry = [
    {label:"Category 1", value:71},
        {label:"Category 2", value:19}
        ];

change(datasetThankYou);


d3.selectAll("input")
  .on("change", selectDataset);

function selectDataset()
{
	var value = this.value;
	if (value == "thankYou")
	{
		change(datasetThankYou);
	}
	else if (value == "love")
	{
		change(datasetLove);
	}
	else if (value == "innocent")
	{
		change(datasetInnocent);
	}
  else if (value == "sorry")
	{
		change(datasetSorry);
	}
};

function change(data) {

	/* ------- PIE SLICES -------*/
	var slice = svg.select(".slices")
        .selectAll("path.slice")
        .data(pie(data), function(d){ return d.data.label });

    console.log(data[0].value);

    slice.enter()
        .insert("path")
        .style("fill", function(d) { return color(d.data.label); })
        .attr("class", "slice");

    slice
        .transition()
        .duration(1700)
        .attrTween("d", function(d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
                return arc(interpolate(t));
            };
        })

    slice.exit()
        .remove();

    var minimum = data[0].value;

    current.transition()
            .text(Math.floor(minimum)+"%");
};

}
