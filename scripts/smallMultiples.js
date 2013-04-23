window.smallMultiples = {
	numberOfNews: 		-1,
	view: 				{},
	items: 				{},
	positionsInterval: 	[],
	searchTerm: 		"",

	init : function (theMaximumValue) {
	  window.smallMultiples.view = d3.select("#smallMultiplesCanvas");
      window.smallMultiples.numberOfNews = window.dataManager.news.length;								
      window.smallMultiples.update();
	},


	update : function() {      
	  //console.log("UPDATE NEWS");
	  //console.log(window.dataManager.news);
	 
	  minDate = new Date(window.timeManager.currentDateInterval[0]);
	  maxDate = new Date(window.timeManager.currentDateInterval[1]);	
	  minNewsIndex = 0;
	  maxNewsIndex = window.smallMultiples.numberOfNews;
	  currentDate = {};	  
	  for (var i=0;i<window.smallMultiples.numberOfNews;i++) {
	  	currentDate = new Date(window.dataManager.news[i].date);
	  	if(currentDate > minDate) {
	  		minNewsIndex = i;
	  		break;
	  	}
	  		
	  }
	  for (var i=minNewsIndex;i<window.smallMultiples.numberOfNews;i++) {
	  	currentDate = new Date(window.dataManager.news[i].date)
	  	if(currentDate > maxDate) {
	  		maxNewsIndex = i;
	  		break;
	  	}
	  }	
	 
	 
	currentNews = window.dataManager.news.slice(minNewsIndex,maxNewsIndex);	

      updatedElements = window.smallMultiples.view.selectAll(".smallMultiplesItem")
      					.data(currentNews,function(d) {return d.id})
	
		updatedElements.enter().append("div")
	  				.attr("class",function (d) {
	  					return window.smallMultiples.getProperClass(d);
	  				})
	  				.html(function(d) {return "<p class = \"thumbDate\">"+d.date.toString("yyyy/mm/dd")+"</<p><p class = \"thumbTitle\">"+d.title+"</p>"} )
	  				.on("click",function(d) {	  					
	  					if (d3.select(this).attr("class").indexOf("selectedItem") == -1) {
	  						window.smallMultiples.resetSelectedFilter();
	  						window.contentDisplayer.loadArticle(d);
	  						d3.select(this).attr("class",d3.select(this).attr("class") + " selectedItem");	
	  					} else {
	  						window.contentDisplayer.displayIntro();	  						
	  						d3.select(this).attr("class",d3.select(this).attr("class").replace(" selectedItem",""));	
	  					}
	  					
	  				});



		updatedElements.attr("style","");

	  	updatedElements.exit().transition().duration(1000)
	  							.attr("style","opacity:0.4")
	  	
	  	minNewsIndex = 136 * Math.floor(minNewsIndex/3);
	  	window.smallMultiples.view[0][0].scrollTop = minNewsIndex;
	  	//d3.select(window.smallMultiples.view[0][0]).transition().duration(20000).attr("scrollTop",minNewsIndex);
	  	console.log()	  				
  },

  	filterByTerm : function(term) {
  		//Reset search
  		window.smallMultiples.resetWordsFilter()
  		window.contentDisplayer.cleanTerm(term);
  		if (term.length<4) return;
  		window.smallMultiples.searchTerm = term;
  		newsWithKeyWordkInTitle=window.smallMultiples.view.selectAll(".smallMultiplesItem").filter(
  			function (d) {
  				return d.title.indexOf(term)!=-1;
  			}
  		);
  		newsWithKeyWordkInTitle[0].forEach(
  			function (item) {
  				var innerHTML = item.innerHTML; 			   				
  				var index = innerHTML.indexOf(term);  				
  				if ( index >= 0 ) { 
					innerHTML = innerHTML.substring(0,index) + "<span class='highlight'>" + innerHTML.substring(index,index+term.length) + "</span>" + innerHTML.substring(index + term.length);
				   	item.innerHTML = innerHTML 
				}
				var index = innerHTML.indexOf(term);				
  				item.className = item.className+" foundWordOnItem"
  			}
  		)

  		newsWithKeyWordkInBody=window.smallMultiples.view.selectAll(".smallMultiplesItem").filter(
  			function (d) {
  				return d.text.indexOf(term)!=-1;
  			}
  		);

  		newsWithKeyWordkInBody[0].forEach(
  			function (item) {
  				item.className = item.className+" foundWordOnItem"
  			}
  		)
  		window.contentDisplayer.findTerm(term);  		
  	},


  	resetWordsFilter : function() {
  		window.smallMultiples.searchTerm = "";
		allNews = window.smallMultiples.view.selectAll(".smallMultiplesItem");
  		allNews[0].forEach(
  			 function (item) {
  			 	item.className=item.className.replace(" foundWordOnItem","");  			 	
  			 	if (item.innerHTML.indexOf("<span class=\"highlight\">") != -1) { 
  			 		//window.StringUtils.replaceAll("<span class=\"highlight\">","",innerHTML);
  			 		//window.StringUtils.replaceAll("</span>","",innerHTML); 			 	
  			 		item.innerHTML=item.innerHTML.replace("<span class=\"highlight\">","")
  			 		item.innerHTML=item.innerHTML.replace("</span>","")   
  			 	}
  			 				  	
			});

  	},


  	resetSelectedFilter : function() {  		
		allNews = window.smallMultiples.view.selectAll(".smallMultiplesItem");
  		allNews[0].forEach(
  			 function (item) {
  			 	item.className=item.className.replace(" selectedItem","");  			 				  	
			});

  	},

	getProperClass : function(d) {
		var output ="smallMultiplesItem";
	  	if (d.media == "The Guardian") {
	  		output = output+" guardianNews" 
	  	}
	  	if (d.media == "Syrian deeply") {
	  		output = output+" syrianDeeplyNews" 
	  	}
	  	return output;
	} 

}