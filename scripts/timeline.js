window.timeline = {
	area: 			{},
	xAxis: 			{},
	xAxis2: 		{},
	yAxis: 			{},
	brush: 			{},
	view: 			{},
	focus: 			{},
	context: 		{},
	margin: 		{top: 10, right: 10, bottom: 100, left: 40},
	margin2: 		{top: 140, right: 10, bottom: 80, left: 40},
	width: 			1050,
	height:			100,
	height2:		50,
	x: 				{},
	x2: 			{},
	y: 				{},
	y2: 			{},

	data: 			[],
	init: function () {

		window.timeline.x 	  =  d3.time.scale().range([0, window.timeline.width]);
		window.timeline.x2 	  =  d3.time.scale().range([0, window.timeline.width]);
		window.timeline.y 	  =  d3.scale.linear().range([window.timeline.height, 0]);
		window.timeline.y2 	  =  d3.scale.linear().range([window.timeline.height2, 0]);

		window.timeline.xAxis = d3.svg.axis().scale(window.timeline.x).orient("bottom");
		window.timeline.xAxis2= d3.svg.axis().scale(window.timeline.x2).orient("bottom");
		window.timeline.yAxis = d3.svg.axis().scale(window.timeline.y).orient("left");

		window.timeline.brush = d3.svg.brush().x(window.timeline.x2).on("brush", window.timeline.brushed);

		window.timeline.area  = d3.svg.area()
							    .interpolate("monotone")
							    .x(function(d)  { return window.timeline.x(d.date); })
							    .y0(window.timeline.height)
							    .y1(function(d) { return window.timeline.y(d.value); });
		/*window.timeline.view  = d3.select("#timelineView").append("svg")
    							.attr("width", window.timeline.width)
    							.attr("height", window.timeline.height);*/

    	window.timeline.area  = d3.svg.area()
							    .interpolate("monotone")
							    .x(function(d)  { return window.timeline.x(d.date); })
							    .y0(window.timeline.height)
							    .y1(function(d) { return window.timeline.y(d.value); });

		window.timeline.area2 = d3.svg.area()
							    .interpolate("monotone")
							    .x(function(d)  { return window.timeline.x2(d.date); })
							    .y0(window.timeline.height2)
							    .y1(function(d) { return window.timeline.y2(d.value); });
		

		window.timeline.view  = d3.select("#timelineView").append("svg")
									.attr("width",window.timeline.width+window.timeline.margin.left+window.timeline.margin.right)
									.attr("height",window.timeline.height+window.timeline.margin.top+window.timeline.margin.bottom);	

    	window.timeline.view.append("defs").append("clipPath")
    						.attr("id", "clip")
  							.append("rect")
    						.attr("width", window.timeline.width)
    						.attr("height", window.timeline.height);

    	window.timeline.focus = window.timeline.view.append("g")
    							.attr("transform", "translate(" + window.timeline.margin.left + "," + window.timeline.margin.top + ")");

    	window.timeline.context = window.timeline.view.append("g")
    							.attr("transform", "translate(" + window.timeline.margin2.left + "," + window.timeline.margin2.top + ")");

    	window.timeline.data = [];
    	for (var i=0;i<window.dataManager.numberOfDays;i++) {
    		var newEntry = {}
    		newEntry.date  = new Date(Date.parse(window.dataManager.dailyReport[i].date));    		
    		newEntry.value = window.dataManager.dailyReport[i].total;   		
    		window.timeline.data[i] = newEntry
    	}
    	
    	window.timeline.x.domain(d3.extent(window.timeline.data.map(function(d) { return d.date; })));
  		window.timeline.y.domain([0, 450]);
  		console.log("Domain Y");
  		console.log(window.timeline.y.domain());
  		window.timeline.x2.domain(window.timeline.x.domain());
  		window.timeline.y2.domain(window.timeline.y.domain());


  		window.timeline.focus.append("path")
      	.datum(window.timeline.data)
      	.attr("clip-path", "url(#clip)")
      	.attr("d", window.timeline.area);

      	window.timeline.focus.append("g")
      	.attr("class", "x axis")
      	.attr("transform", "translate(0," + window.timeline.height + ")")
      	.call(window.timeline.xAxis);

      	 window.timeline.focus.append("g")
      	.attr("class", "y axis")
      	.call(window.timeline.yAxis);

      	 window.timeline.context.append("path")
      	.datum(window.timeline.data)
      	.attr("d", window.timeline.area2);

      	window.timeline.context.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + window.timeline.height2 + ")")
      .call(window.timeline.xAxis2);

        window.timeline.context.append("g")
      .attr("class", "x brush")
      .call(window.timeline.brush)
    .selectAll("rect")
      .attr("y", -6)
      .attr("height", window.timeline.height2 + 7);
    		

	},
	
 	brushed : function() {
		  window.timeline.x.domain(window.timeline.brush.empty() ? window.timeline.x.domain() : window.timeline.brush.extent());
		  window.timeline.focus.select("path").attr("d", window.timeline.area);
		  window.timeline.focus.select(".x.axis").call(window.timeline.xAxis);
		  window.timeManager.setNewInterval(window.timeline.x.domain())
		  
	},

	parseDate : d3.time.parse,

}