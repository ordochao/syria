window.animationControls = {
	init : function() {
		window.animationControls.update();
	},

	update : function() {
		console.log("update");
		window.animationControls.updateStatusLine();
	},

	updateStatusLine : function() {
		console.log("update");
		if (Math.abs(window.timeManager.currentDateInterval[1].getTime()-window.timeManager.currentDateInterval[0].getTime())>(1000*60*60*24)) {
			var date0 = window.timeManager.currentDateInterval[0].getFullYear()+"-"+(window.timeManager.currentDateInterval[0].getMonth()+1)+"-"+window.timeManager.currentDateInterval[0].getDate();
			var date1 = window.timeManager.currentDateInterval[1].getFullYear()+"-"+(window.timeManager.currentDateInterval[1].getMonth()+1)+"-"+window.timeManager.currentDateInterval[1].getDate();						
			d3.select(".details")[0][0].innerHTML="<p><strong>"+window.animationEngine.accum+"</strong> casualties</p><p> from <strong>"+date0+"</strong> to <strong>"+date1+"</strong>";
		} else {
			var currentDate = window.timeManager.currentDateInterval[0].getFullYear()+"-"+(window.timeManager.currentDateInterval[0].getMonth()+1)+"-"+window.timeManager.currentDateInterval[0].getDate();			
			d3.select(".details")[0][0].innerHTML="<p><strong>"+window.animationEngine.accum+"</strong> casualties the day <strong>"+currentDate+"</strong>";	
		}
		
	}
}