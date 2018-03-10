

function getMaptexture( ){

  var projection = d3.geo.equirectangular()
    .translate([512, 256]).scale(163);

  d3.json('world.json', function (err, data) {

    d3.select("#loading").transition().duration(500)
      .style("opacity", 0).remove();

    var countries = topojson.feature(data, data.objects.countries);

    var canvas = d3.select("body").append("canvas")
      .style("display", "none")
      .attr({width: "1024px", height: "512px"});

    var context = canvas.node().getContext("2d");

    var path = d3.geo.path()
      .projection(projection).context(context);

    context.strokeStyle = "#666";
    context.lineWidth = 0.25;
    context.fillStyle = "#222";

    context.beginPath();

    path(countries);

    context.fill();
    context.stroke();
  //  maptextureurl = canvas.node().toDataURL();
      maptextureurl = loadImage(canvas.node().toDataURL());
    //maptextureurl.isTexture = true;
    //console.log(maptextureurl);
    return maptextureurl;
    canvas.remove();
  });

}
