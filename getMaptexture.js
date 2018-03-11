//Add callback

//D3
function getMaptexture(geojson,color){

    var texture, context, canvas;

  var projection = d3.geo.equirectangular()
    .translate([512, 256]).scale(163);

  d3.json('world.json', function (err, data) {

    d3.select("#loading").transition().duration(500)
      .style("opacity", 0).remove();

    var countries = topojson.feature(data, data.objects.countries);

    canvas = d3.select("body").append("canvas")
      .attr({width: "1024px", height: "512px"})
      .style("display", "none");

    context = canvas.node().getContext("2d");
    var path = d3.geo.path()
      .projection(projection).context(context);

    context.strokeStyle = "#333";
    context.lineWidth = 0.25;
    context.fillStyle = color || "#222";
    context.beginPath();
    path(countries);
    //path(geojson);
    context.fill();
    context.stroke();
      if (color) {
        context.fill();
        }
        context.stroke();
    maptextureurl = loadImage(canvas.node().toDataURL('image/png'),function() {console.log('loaded');d3loaded = true;});
    return maptextureurl;
    canvas.remove();
});

}
