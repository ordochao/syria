window.colorManager = {
	maximumValue: 	-1,
	colors: 		[d3.rgb(240,240,220),d3.rgb(240,100,100)],
	zeroColor: 		d3.rgb(180,200,240),
	scale: 			{},
	init : function (theMaximumValue) {
		window.colorManager.maximumValue = theMaximumValue;
		window.colorManager.scale=d3.scale.log().domain([0.1,100,1000,2000]).range(window.colorManager.colors);
	},

	getColor: function (value) {
		output = d3.rgb(0,0,0);
		if (value == 0) {
			output = window.colorManager.zeroColor;
		} else {
			output = window.colorManager.scale(value);
		}		
		return output;
	},
}