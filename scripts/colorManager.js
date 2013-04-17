window.colorManager = {
	maximumValue: 	-1,
	colorsRed: 		[d3.rgb(251, 154, 153),d3.rgb(227, 26, 28)],
	colorsOrange: 	[d3.rgb(253, 191, 111),d3.rgb(255, 127, 0)],
	colorsGreen: 	[d3.rgb(178, 223, 138 ),d3.rgb(51, 160, 44)],
	colorsBlue: 	[d3.rgb(166, 206, 227 ),d3.rgb(31, 120, 180)],
	
	zeroColor: 		d3.rgb(220,220,220),
	scale: 			{},
	init : function (theMaximumValue) {
		window.colorManager.maximumValue = theMaximumValue;
		window.colorManager.scale=d3.scale.log().domain([0.1,11000]).range(window.colorManager.colorsBlue);
	},

	getColor: function (value) {
		window.colorManager.scale=window.colorManager.getTransformationColor(value);
		output = d3.rgb(0,0,0);
		if (value == 0) {
			output = window.colorManager.zeroColor;
		} else {
			output = window.colorManager.scale(value);
		}		
		return output;
	},


	getTransformationColor : function(value) {

		/*	
	Zero Color 217, 217, 217
	step red 251, 154, 153 - 227, 26, 28
	step orange 253, 191, 111 - 255, 127, 0
	step green 178, 223, 138 - 51, 160, 44
	step blue 166, 206, 227 - 31, 120, 180

	 */
		if (value <=10) {
			return d3.scale.log().domain([0.1,10]).range(window.colorManager.colorsBlue);
		}
		if (value <=100) {
			return  d3.scale.log().domain([10,10]).range(window.colorManager.colorsGreen);
		}
		if (value <=1000) {
			return d3.scale.log().domain([100,1000]).range(window.colorManager.colorsOrange);
		}
		return d3.scale.log().domain([1000,10000]).range(window.colorManager.colorsRed);
	},
	
}