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
		var date0 = window.timeManager.currentDateInterval[0].getFullYear()+"-"+(window.timeManager.currentDateInterval[0].getMonth()+1)+"-"+window.timeManager.currentDateInterval[0].getDate();
		var date1 = window.timeManager.currentDateInterval[1].getFullYear()+"-"+(window.timeManager.currentDateInterval[1].getMonth()+1)+"-"+window.timeManager.currentDateInterval[1].getDate();						
		d3.select("#timeLabelCanvas")[0][0].innerHTML="<p><strong>"+window.animationEngine.accum+"</strong> casualties from <strong>"+date0+"</strong> to <strong>"+date1+"</strong>";
	}
}