window.dataManager = {
    geometriesURL: 		"data/syriaGovernTopo2.json",
    casualtiesURL: 		"data/governMonthly.json",

    LOADED_DATA_EVENT : "LOADED_DATA_EVENT",
    
    dataById	 	: {},
    topology	 	: {},
    governorates 	: {},
    minCasualties	: 0,
    maxCasualties	: -1,


    loadData : function () {

        d3.json(this.casualtiesURL, this.loadedCasualtiesData );
    },


    loadedCasualtiesData : function(loadedCasualites) {
		casualties = loadedCasualites;
		var candidate = -1;
		window.dataManager.dataById = d3.nest()
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
		window.dataManager.notifyDataHasBeenLoaded();
	},

	notifyDataHasBeenLoaded : function() {
		dataLoadedEvent = $("body").trigger(window.dataManager.LOADED_DATA_EVENT);
	},


}