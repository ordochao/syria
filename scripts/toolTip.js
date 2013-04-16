window.toolTip = {
	visible: 		false,
	data: 			{},
	view: 			{},

	init: function () {
		window.toolTip.view = d3.select("#tooltip")
		.style("position", "absolute")
		.style("z-index", "10")
		.style("visibility", "hidden")
		.html("a simple tooltip");
	},

	show: function (d) {
		id = d.id;
		casualties = d.properties.value;		
		var text;
		if (d.properties == undefined) {
			text = "<p>No available data</p>";
		} else {
			info = window.dataManager.infoById(id)
			text ="<H5>"+info.name+"</H5><p>"
			+" casualties: "+casualties+"</p>";	
			
		}		
		window.toolTip.view.html(text);
		return window.toolTip.view.style("visibility", "visible");
	},


	moving: function() {
		return window.toolTip.view.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");
	},

	hide: function () {
		return window.toolTip.view.style("visibility", "hidden");
	},


}