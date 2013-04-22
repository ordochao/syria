window.contentDisplayer = {
	selectedArticle: 	null,
	gradient: 			{},

	init : function (theMaximumValue) {
		console.log("contentViewer")
		window.contentViewer.gradient = d3.select("#animationLegend").append("svg").append("linearGradient")
    	.attr("y1", "0%")
    	.attr("y2", "0%")
    	.attr("x1", "0%")
    	.attr("x2", "100%")
    	.attr("id", "gradient")

    	window.contentViewer.gradient
	    .append("stop")
	    .attr("offset", "0")
	    .attr("stop-color", "#DCDCDC")

	   	window.contentViewer.gradient
	    .append("stop")
	    .attr("offset", "0.1")
	    .attr("stop-color", "#DCDCDC")

	   	window.contentViewer.gradient
	    .append("stop")
	    .attr("offset", "0.1")
	    .attr("stop-color", "#AFC7DB")

	    window.contentViewer.gradient
	    .append("stop")
	    .attr("offset", "0.325")
	    .attr("stop-color", "#4294DB")

	   	window.contentViewer.gradient
	    .append("stop")
	    .attr("offset", "0.325")
	    .attr("stop-color", "#C7DEB1")

	    window.contentViewer.gradient
	    .append("stop")
	    .attr("offset", "0.550")
	    .attr("stop-color", "#8EDE43")

	    window.contentViewer.gradient
	    .append("stop")
	    .attr("offset", "0.550")
	    .attr("stop-color", "#FFDACC")


	    window.contentViewer.gradient
	    .append("stop")
	    .attr("offset", "0.775")
	    .attr("stop-color", "#FF7F4D")

		window.contentViewer.gradient
	    .append("stop")
	    .attr("offset", "0.775")
	    .attr("stop-color", "#FAC9C8")


	    window.contentViewer.gradient
	    .append("stop")
	    .attr("offset", "1")
	    .attr("stop-color", "#FA4E4B")


	    d3.select("#animationLegend").select("svg").append("rect")
	    .attr("x","5")
	    .attr("width","90%")
	    .attr("height","50%")
	    .attr("fill","url(#gradient)")

	    legendLabels = [0,1,10,100,1000,10000]
	    textPositions = [5,310*0.1,300*0.325,290*0.55,290*0.775,280*1]

	    legend = d3.select("#animationLegend").select("svg").selectAll("text").data(legendLabels)
	    .enter().append("text")
	    .attr("text-anchor","middle")
	    .attr("y","35")
	    .attr("x",function (d,i) {
	    	return textPositions[i];
	    })
	    .text(function (d) {
	    	return d;
	    });	    

		window.contentDisplayer.displayIntro()
	},

	displayIntro: function () {
		console.log("DISPLAY INTRO");
		d3.select("#intro").attr("class","");
		d3.select("#newsViewer").attr("class","hidden");		
	},

	loadArticle: function (article) {
		console.log("LOAD ARTICLE:");
		console.log(article);
		d3.select("#intro").attr("class","hidden");
		d3.select("#newsViewer").attr("class",function (d) {
			if (article.media == "The Guardian") {
				return "guardianNews"
			} else {
				return "syrianDeeplyNews"
			}
		});
		d3.select("#newsViewer").select("#articleTitle").text(article.title);
		d3.select("#newsViewer").select("#articleLineBy").text(article.author);
		d3.select("#newsViewer").select("#articleDate").text(article.date);
		d3.select("#newsViewer").select("#articleBody").text(article.text.replace(new RegExp('pppp', "g"),""));
		window.contentDisplayer.findTerm(window.smallMultiples.searchTerm);
	},


	findTerm : function(term) {
		item = d3.select("#newsViewer")[0][0];
		console.log(item);
		var innerHTML = item.innerHTML; 			   				
  		var index = innerHTML.indexOf(term);
		if ( index >= 0 )
		{ 
			innerHTML = innerHTML.substring(0,index) + "<span class='highlight'>" + innerHTML.substring(index,index+term.length) + "</span>" + innerHTML.substring(index + term.length);
			item.innerHTML = innerHTML 
		}
	},

	cleanTerm : function() {
		item = d3.select("#newsViewer")[0][0];		
  		item.className=item.className.replace(" foundWordOnItem","");  			 	
  		if (item.innerHTML.indexOf("<span class=\"highlight\">") != -1) {  			 	
  	 		//item.innerHTML=window.StringUtils.replaceAll("<span class=\"highlight\">","",item.innerHTML)
  	 		//item.innerHTML=window.StringUtils.replaceAll("</span>","",item.innerHTML)   
  	 		item.innerHTML=item.innerHTML.replace("</span>","");
  	 		item.innerHTML=item.innerHTML.replace("<span class=\"highlight\">","");   
 	 	}	
	}
}
