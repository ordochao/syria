window.cartogram = {
	cartoInfo: 		[],
	projection : 	{},
	path : 			{},	
	carto: 			{},
	currentValue:   0,
	defaultValue: 	0.1,

	defineProjection: function() {		
		window.cartogram.projection  	= d3.geo.albers().origin([34.957995,38.496094]).translate([0,0]).parallels([32,42]).scale(1120);
	},

	definePath: function() {
		window.cartogram.path 			= d3.geo.path().projection(window.cartogram.projection);
	},

	defineCartoFunction: function() {
			window.cartogram.carto = d3.cartogram()
			.projection(window.cartogram.projection)
			.properties(function(d) {
				var output = window.dataManager.casualtiesByMonthById[d.id];		
				return output
            }).value(function(d) {
            	if (d.properties == undefined) {
            		output = window.cartogram.defaultValue;
            	} else {
            		var output = (!isNaN(d.properties.monthlyValues[currentValue])) ? +d.properties.monthlyValues[currentValue]+window.cartogram.defaultValue+Math.random():1;
            		
            	}   
            	//console.log("id="+d.id+"output="+output);	         	
            	return output;       
            });
	},

	getCartoInfo: 	function(step) {
		currentValue=step;
		var newCartoInfo;
		if (window.cartogram.cartoInfo[step] == undefined) {
			newCartoInfo = { 
				features: 	window.cartogram.carto(window.dataManager.topology,window.dataManager.governorates).features,
				path: 		window.cartogram.carto.path
			}
			window.cartogram.cartoInfo[step] = newCartoInfo;
		} else {
			newCartoInfo = window.cartogram.cartoInfo[step]; 
		}
		return newCartoInfo;
	},


	init : 			function() {
		console.log("cartogram init")
		window.cartogram.defineProjection();
		window.cartogram.definePath();
		window.cartogram.defineCartoFunction();

	},

}