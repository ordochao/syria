window.dataManager = {
    geometriesURL: 		"data/syriaGovernTopoSimplified.json",
    casualtiesURL: 		"data/governMonthly.json",
    dataURL: 			"data/governData.csv",


    LOADED_DATA_EVENT : "LOADED_DATA_EVENT",
    
    casualtiesByMonthById	 	: {},
    topology	 	: {},
    governorates 	: {},
    dataInfo 		: {},
    minCasualties	: 0,
    maxCasualties	: -1,


    loadData : function () {

        d3.json(this.casualtiesURL, this.loadedCasualtiesData );
    },


    loadedCasualtiesData : function(loadedCasualites) {
		casualties = loadedCasualites;
		var candidate = -1;
		window.dataManager.casualtiesByMonthById = d3.nest()
	            .key(function(d) { 
	            	return d.id; })
	            .rollup(function(d) { 	 
	            	//console.log(d[0].monthlyValues);
	            	for (var i=0;i<d[0].monthlyValues.length;i++) {
	            		candidate = parseInt(d[0].monthlyValues[i]);	
	            		//console.log(candidate);
	            		window.dataManager.maxCasualties = (candidate > window.dataManager.maxCasualties) ? candidate:window.dataManager.maxCasualties;
	            	}
					//console.log(window.dataManager.maxCasualties);	            	           	
	            	return d[0]; })
	            .map(loadedCasualites);
		window.dataManager.startLoadingMapData();
	},

	startLoadingMapData : function () {
		d3.json(this.geometriesURL, this.loadedMapData );	
	},

	loadedMapData : function(topo) {
		window.dataManager.topology 		= topo;
		window.dataManager.governorates 	= window.dataManager.topology.objects.syriaGovern.geometries;
		window.dataManager.startLoadingTotalData();
	},

	startLoadingTotalData: function() {
		d3.csv(this.dataURL, this.loadedTotalData );		
	},

	loadedTotalData : function(data) {
		console.log(data);
		window.dataManager.dataInfo = d3.nest()
	          .key(function(d) {
	          	var newKey = (d.Gov_ID < 10) ? "0"+d.Gov_ID:d.Gov_ID;
	            return newKey; })
	          .rollup(function(d) { return d[0]; })
	         .map(data);
		window.dataManager.notifyDataHasBeenLoaded();
	},

	notifyDataHasBeenLoaded : function() {
		dataLoadedEvent = $("body").trigger(window.dataManager.LOADED_DATA_EVENT);
	},

	infoById: function(id) {
		return window.dataManager.dataInfo[id];
	},


}