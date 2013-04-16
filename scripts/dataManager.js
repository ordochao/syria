window.dataManager = {
	governURL: 		"data/govern.json",
	dailyURL: 		"data/daily.json",
    geoURL: 		"data/syriaGovernTopo.json",
    newsURL: 		"data/news.csv",    

    LOADED_DATA_EVENT : "LOADED_DATA_EVENT",
    
    governities	 	  :{},
    topology	 	: {},
    polygons	 	: {},
    dailyReport		: [],
    news			: [],
    minCasualties	: 0,
    maxCasualties	: -1,
	 numberOfDays	: 0,
	 numberOfGovernities	:14,

	loadData : function () {
    	console.log("Starting loading Data")
    	//console.log(window.dataManager.governURL)
        d3.json(window.dataManager.governURL, window.dataManager.loadedGovernData);
    },

    startLoadingDailyData : function () {
		d3.json(window.dataManager.dailyURL, window.dataManager.loadedDailyData );
	},

	startLoadingMapData : function () {
		d3.json(this.geoURL, window.dataManager.loadedMapData );	
	},

	startLoadingNews: function() {
		d3.csv(this.newsURL, this.loadedNews );
	},

    loadedGovernData : function (source) {
    	console.log("Loaded data about governities")
    	//console.log(source);
    	window.dataManager.governities = source;
    	window.dataManager.startLoadingDailyData();
    	
    },

    loadedDailyData : function(source) {

    	console.log("Loaded data about daily reports");
    	window.dataManager.dailyReport = {};
    	window.dataManager.numberOfDays = source[0].dailyDeath.length;
    	var currentDate = new Date(2011,2,18);
  		for (var i=0;i < window.dataManager.numberOfDays;i++) {
  			newDate = {};
  			newDate.date = currentDate.toString('yyyy-MM-dd');						
  			newDate.entries = [];
  			for (var j=0;j < window.dataManager.numberOfGovernities;j++) {
  				newEntry = {};
  				newEntry.id = source[j].id;
  				newEntry.value = source[j].dailyDeath[i].total;
  				newDate.entries[j]=newEntry;
  			}
        newDate.total = source[window.dataManager.numberOfGovernities].dailyDeath[i].total; 
  			window.dataManager.dailyReport[i] = newDate;
  			currentDate.setDate(currentDate.getDate()+1);
  		}
  		//console.log(window.dataManager.dailyReport);
		window.dataManager.startLoadingMapData();
	},



	loadedMapData : function(topo) {
		console.log("Loaded map");
		window.dataManager.topology 		= topo;
		window.dataManager.polygons 		= window.dataManager.topology.objects.syriaGovern.geometries;
		window.dataManager.startLoadingNews();
	},


	loadedNews : function(source) {
		console.log("Loaded news");
		window.dataManager.news = source;
		window.dataManager.notifyDataHasBeenLoaded();
	},

	notifyDataHasBeenLoaded : function() {
		console.log("Loaded the whole data");
		dataLoadedEvent = $("body").trigger(window.dataManager.LOADED_DATA_EVENT);
	},

  infoById : function(id) {
      var output = {}
      var items = window.dataManager.governities.governs;
      for (var i=0;i<items.length;i++) {
        if (items[i].Gov_ID == id) {
          output.name = items[i].Gov_EN;
          return output;
        }        
      }
      output.name = "No name"
      return output;
  }




}