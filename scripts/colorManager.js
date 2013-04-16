window.colorManager = {
	maximumValue: 	-1,
	colors: 		[d3.rgb(252, 187, 161),d3.rgb(215,48,39)],
	zeroColor: 		d3.rgb(220,220,220),
	scale: 			{},
	init : function (theMaximumValue) {
		window.colorManager.maximumValue = theMaximumValue;
		window.colorManager.scale=d3.scale.log().domain([0.1,11000]).range(window.colorManager.colors);
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