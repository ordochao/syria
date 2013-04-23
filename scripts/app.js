define([], function() {
	
	loadData = function () {
		$('body').on(window.dataManager.LOADED_DATA_EVENT, dataLoadedHandler);
    	dataManager.loadData();
	};


	dataLoadedHandler = function(event) {		
		window.colorManager.init(200);
		window.timeManager.init(window.dataManager.dailyReport);
		window.animationEngine.initEngine(window.dataManager.topology);
		window.toolTip.init();
		window.timeline.init();
		window.smallMultiples.init();
		window.contentDisplayer.init();
		window.contentDisplayer.init();
		window.animationControls.init();
		window.timeline.all();
	};


  	loadData();
  
});

