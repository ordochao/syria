window.animationEngine = {
  governities:  {},
  animation:    {},
  projection:   {},
  path:         {},
  animation:    {},

  initEngine : function(source_object) {
      console.log("Init animationEngine")

      window.animationEngine.projection   = d3.geo.mercator().scale(2500).translate([-1520, 1800]);
      window.animationEngine.path         = d3.geo.path().projection(window.animationEngine.projection);

      window.animationEngine.animation = d3.select("#animationCanvas").append("svg")
      .attr("width", "100%")
      .attr("height", "100%");

      window.animationEngine.governities = topojson.object(source_object, source_object.objects.syriaGovern)


      window.animationEngine.animation.append("path")
      .datum(window.animationEngine.governities)
      .attr("class", "govern")
      .attr("d", window.animationEngine.path);

      window.animationEngine.update();
  },


  updateValues : function() {
    
    for (var i=0;i<window.animationEngine.governities.geometries.length;i++) {
      if (window.animationEngine.governities.geometries[i].properties.value != window.timeManager.valueByGovernity(window.animationEngine.governities.geometries[i].id)) {
        window.animationEngine.governities.geometries[i].properties.value = window.timeManager.valueByGovernity(window.animationEngine.governities.geometries[i].id);
        //console.log("id = " + window.animationEngine.governities.geometries[i].id);
        //console.log("value = " + window.animationEngine.governities.geometries[i].properties.value)
      }
    }
  },

  update : function() {
      window.animationEngine.updateValues();

      updatedElements = window.animationEngine.animation.selectAll("path").data(window.animationEngine.governities.geometries,function(d) {return d.id});


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
      .on("mouseout",   window.toolTip.hide);



      

  }


}