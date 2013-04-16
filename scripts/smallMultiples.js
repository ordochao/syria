window.smallMultiples = {
	numberOfNews: 		-1,
	view: 				{},
	items: 				{},
	positionsInterval: 	[],

	init : function (theMaximumValue) {
		window.smallMultiples.view = d3.select("#smallMultiplesCanvas")
      								

      window.smallMultiples.update()
	},


	filterByInterval : function(interval) {

	},

	update : function() {      
	  console.log("UPDATE NEWS");
	  console.log(window.dataManager.news);
      updatedElements = window.smallMultiples.view.selectAll(".smallMultiplesItem")
      					.data(window.dataManager.news,function(d) {console.log(d);return d.id})
	
	  /*updatedElements.enter().append("svg")
	  				.attr("class",".smallMultiplesItem")
	  				.attr("width",150)
	  				.attr("height",150)
	  				.attr("x",function (d,i) {return i%3*150})
	  				.attr("y",function (d,i) {return Math.floor(i/3)*150})
	  				.append("text")
	  				.text("test")
	  				.attr("color","#FF0000")	      					*/
		updatedElements.enter().append("div")
	  				.attr("class","smallMultiplesItem")
	  				.html(function(d) {console.log(d);return "<p class = \"thumbDate\">"+d.date.toString("yyyy/mm/dd")+"</<p><p class = \"thumbTitle\">"+d.title+"</p>"} );	  				
/*

      updatedElements.transition().duration(200)
      .attr("fill", function(d) {   
        //console.log("Update");      
        color = window.colorManager.getColor(d.properties.value);        
      return color;})

      updatedElements.enter().append("path")
      .attr("fill", function(d) { 
        //console.log("Enter");
        color = window.colorManager.getColor(d.properties.value);
        return color;})
      .attr("d", window.animationEngine.path)
      .on("mouseover",  window.toolTip.show)
      .on("mousemove",  window.toolTip.moving)
      .on("mouseout",   window.toolTip.hide);*/
  },

}