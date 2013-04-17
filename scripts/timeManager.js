window.timeManager = {
	dates: 					[],
	numberOfDays: 			0,
	currentDateInterval: 	[],
	currentPositions: 		[],

	init : function (dailyReport) {
		window.timeManager.numberOfDays = window.dataManager.numberOfDays;
		for (var i=0;i<window.timeManager.numberOfDays;i++) {
			window.timeManager.dates[i] = dailyReport[i].date;
		}
		window.timeManager.currentPositions= 		[0,window.timeManager.numberOfDays];
		//console.log(window.timeManager.dates)
	},

	valueByGovernity: function(governityId) {
		return window.timeManager.valueByGovernityAndDate(governityId,window.timeManager.currentPositions)
	},

	valueByGovernityAndDate : function(governityId,interval) {
		var targetDates = window.dataManager.dailyReport;
		var targetPos;
		var accum = 0;
		for (i=interval[0];i<interval[1];i++) {
			for (j=0;j<targetDates[i].entries.length;j++) {
				if (targetDates[i].entries[j].id == governityId) {
					accum = accum + parseFloat(window.dataManager.dailyReport[i].entries[j].value);
				}
			}
		}
		return accum;
	},

	next : function() {
		block = false;		
		if (window.timeManager.currentPositions[1]  < (window.timeManager.numberOfDays-1)) {
			window.timeManager.currentPositions[0] = window.timeManager.currentPositions[0] + 1
			window.timeManager.currentPositions[1] = window.timeManager.currentPositions[1] + 1
		} else {
			block = true;	
		}
		window.timeManager.notifyChange();
		return block;
	},

	previous : function() {
		block = false;		
		if (window.timeManager.currentPositions[1] > 0) {
			window.timeManager.currentPositions[0] = window.timeManager.currentPositions[0] - 1
			window.timeManager.currentPositions[1] = window.timeManager.currentPositions[1] - 1
		} else {
			block = true;	
		}
		window.timeManager.notifyChange();
		return block;
	},

	setNewInterval : function(dateInterval) {
		//console.log(dateInterval);
		window.timeManager.currentDateInterval = dateInterval;
		minDate = new Date(window.timeManager.currentDateInterval[0]);
		maxDate = new Date(window.timeManager.currentDateInterval[1]);		
		targetDate = new Date(window.timeManager.dates[0]);
		for (i=0;i<window.timeManager.dates.length;i++) {
			targetDate = new Date(window.timeManager.dates[i]);
			if (targetDate>minDate) {
				//console.log("First position is "+i);
				window.timeManager.currentPositions[0] = i
				break;
			}	
		}
		for (i=window.timeManager.currentPositions[0];i<window.timeManager.dates.length;i++) {
			targetDate = new Date(window.timeManager.dates[i]);
			if (targetDate>maxDate) {
				//console.log("Last position is "+i);
				window.timeManager.currentPositions[1] = i
				break;
			}	
		}
		//console.log("window.timeManager.currentPositions");
		
		window.timeManager.notifyChange()
	},


	notifyChange : function() {
		//console.log(window.timeManager.currentPositions);
		window.animationEngine.update();
		window.smallMultiples.update();
		d3.select("#dateLabel").text(window.timeManager.dates[window.timeManager.currentStep]);
	}

}