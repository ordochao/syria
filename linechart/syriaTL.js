function syriaTL() {

var e = document.getElementById("governID");

var margin = {top: 10, right: 10, bottom: 100, left: 40},
    margin2 = {top: 150, right: 10, bottom: 20, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    height2 = 100,
	lineHeight = 100
	areaHeight = 100;
	
var points;
var labelG;
this.dataSyria =  {};

//dataSyria: [],

var dataCur;
	
var dailyData,weeklyData,monthlyData;

var option = "daily";

var data;

var parseDate = d3.time.format("%b %Y").parse;


var xTime,area,area2,line,startDate,data,dataG;

var x = d3.time.scale().range([0, width]),
    x2 = d3.time.scale().range([0, width]),
    y = d3.scale.linear().range([lineHeight, 0]),
    y2 = d3.scale.linear().range([areaHeight, 0]);

var xAxis = d3.svg.axis().scale(x).orient("bottom"),
    xAxis2 = d3.svg.axis().scale(x2).orient("bottom"),
    yAxis = d3.svg.axis().scale(y).orient("left");

var brush = d3.svg.brush()
    .x(x2)
    .on("brush", brush)
	.on("brushend",getTimeInterval);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

svg.append("defs").append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", width)
    .attr("height", height);

var focus = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	focus.attr("class","Reds q0-3");

var context = svg.append("g")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");
	
	area = d3.svg.area()
    .interpolate("monotone")
    .x(function(d,i) { return x(xTime[i]); })
    .y0(height)
    .y1(function(d) { return y(d.total); });
	
	line = d3.svg.line()
    .x(function(d,i) { return x(xTime[i]); })
    .y(function(d) { return y(d.total); });

	area2 = d3.svg.area()
    .interpolate("monotone")
    .x(function(d,i) { return x2(xTime[i]); })
    .y0(height2)
    .y1(function(d) { return y2(d.total); });

	var that = this;
	
d3.json("SyrianAll.json", function(error, data) {
	
	startDate = "2011-03-18";
	endDate = "2013-01-03";
	that.dataSyria = data;
	
	

	startDate = new Date(Date.parse(startDate.replace(/-/g, " ")));
	endDate = new Date(Date.parse(endDate.replace(/-/g, " ")));
	//endDate.setDate(endDate.getDate() + 1);
	if(option == "daily")
	{
		xTime = d3.time.days(startDate,endDate);
		//data = data.daily;
	}
	else
	{
		xTime = d3.time.months(startDate,endDate);
		//ata = data.weekly;
	}
	/*for(var i=0;i<14;i++)
	{
		this.dataSyria[i] = this.dataSyria.concat(data[i].dailyDeath);
	}*/
	dataCur = that.dataSyria[0].dailyDeath;
	
	

  /*data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.price = +d.price;
  });*/
  
  //d3.time.hours(new Date(2011, 7, 13, 0), new Date(2011, 8, 13, 0));
  
  x.domain(d3.extent(dataCur.map(function(d,i) { return xTime[i]; })));
  y.domain([0, 300]);//d3.max(data.map(function(d) { return d.total; }))]);
  x2.domain(x.domain());
  y2.domain(y.domain());

  focus.append("path")
      .datum(dataCur)
      .attr("clip-path", "url(#clip)")
	  .attr("class", "line")
      .attr("d", line);
	  
	points = focus.selectAll("circle").data(dataCur);
	drawPoints();
	  

  focus.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + lineHeight + ")")
      .call(xAxis);

  focus.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  context.append("path")
      .datum(dataCur)
	  .attr("class","area")
      .attr("d", area2);

  context.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height2 + ")")
      .call(xAxis2);

  context.append("g")
      .attr("class", "x brush")
      .call(brush)
    .selectAll("rect")
      .attr("y", 0)
      .attr("height", height2 + 7);
});

this.updateData = function(value)
{
	//dataCur = this.dataSyria[e.options[e.selectedIndex].value].dailyDeath;
	if(this.dataSyria)
	{
		dataCur = this.dataSyria[value].dailyDeath;
		focus.select("path").datum(dataCur)
		.attr("d", line);
		
		context.select("path").datum(dataCur)
		.attr("d", area2);
	  
		focus.selectAll("circle").remove();
		points = focus.selectAll("circle").data(dataCur);
		drawPoints();
	}
}


function drawPoints()
{
	points.enter().append("circle")
		.attr("cx",function(d,i) { return x(xTime[i]);})
		.attr("cy", function(d) { return y2(d.total); })
		.attr("r",2)
		.style("fill", "red")
		.style("opacity",0)
		.on("mouseover",function(d){
			var curCircle = d3.select(this);
			var x = curCircle.attr("cx");
			var y = curCircle.attr("cy");
			curCircle.style("opacity",1);
			
			labelG = focus.append("g")
			.attr("transform","translate("+x+","+y+")");
			
			labelG.append("rect")
			.attr("x",10)
			.attr("y",-10)
			.attr("width",50)
			.attr("height",20)
			.attr("class","rectLabel");
			
			labelG.append("text")
			.attr("x",20)
			.attr("y",0)
			.attr("dy",".35em")
			.text(d.total);
			
		})
		.on("mouseout",function(d){
			d3.select(this).style("opacity",0);
			labelG.remove();
		});
		
}

function brush() {
	points.remove();
	x.domain(brush.empty() ? x2.domain() : brush.extent());
	focus.select("path").attr("d", line);
	focus.select(".x.axis").call(xAxis);
	drawPoints();
  }
 
function getTimeInterval()
{ 
	//var diff = Math.round((brush.extent()[1] - brush.extent()[0])/(1000*60*60*24));
  var diff = brush.extent()[0] - startDate;
  diff = Math.round(diff/(1000*60*60*24));
  var dates = xTime[diff];
  diff2 = diff + Math.round((brush.extent()[1] - brush.extent()[0])/(1000*60*60*24));
  var total,temp = [];
  
  // When time period is selected with brush, update death numbers for all governates
  
  for(var i=0;i<14;i++)
  {
	var k = 0;
	for(var j=diff;j<diff2;j++)
	{
		temp[k++] = this.dataSyria[i].dailyDeath[j].total;
	}
}
}

//focus.attr("transform", "translate(" + 0 + "," + 50 + ")");
//context.attr("transform", "translate(" + 0 + "," + 300 + ")");
svg.attr("transform", "translate(" + 0 + "," + 700 + ")");



}