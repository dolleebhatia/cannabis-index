//Add callback

//D3
function getMaptexture(geojson,color){

  var texture, context, color, canvas;
  var colors = ['#69c242', '#ff7300', '#cf2030'];

  var projection = d3.geo.equirectangular()
    .translate([512, 256]).scale(163);



    d3.queue()
        .defer(d3.json, 'world.json')
        .defer(d3.json, 'candata.json')
        .await(function (error, world, data) {
            if (error) {
                console.error('err' + error);
            }
            else {
                drawMap(world, data);
            }
        });

function drawMap(world, data) {
  //d3.json('world.json', function (err, data) {

  d3.select("#loading").transition().duration(500)
    .style("opacity", 0).remove();

  var countries = topojson.feature(world, world.objects.countries);
  var features = topojson.feature(world, world.objects.countries).features;
  //var testcountry = countries.find("id");
//  console.log(testcountry);
  var cancountryname ={};

  data.cities.forEach(function (d) {
      cancountryname[d.country] = {
      legality: +d.legality
      }
    });

    features.forEach(function (d) {
       d.details = cancountryname[d.properties.name] ? cancountryname[d.properties.name] : {};

   });





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
    path(geojson);


    // if (d3.selectAll = function(d) {return d.legality; } === "Partial"){
    //      context.fillStyle = "#98FB98";
    //   }

    context.fill();
    context.stroke();

  var map = canvas.append("g")
    .attr("class", "map")

  map.append("g")
    .selectAll("path")
    .data(features)
    .enter().append("path")
    .attr("name", function (d) {
      return d.properties.name;
        console.log(d.properties.name);
    })
    .attr("id", function (d) {
        console.log(d.id);
        return d.id;

    })
    .attr("d", path)
    
    //.style("fill", function (d) {
    // .attr("legality", function (d) {
    //     d3.select(".country")
    // //  return d.details && d.details.legality;
    //   //console.log(d.details);
    //   console.log("10");
    //   })


    maptextureurl = loadImage(canvas.node().toDataURL('image/png'),function() {console.log('loaded');d3loaded = true;});
    return maptextureurl;
    canvas.remove();
}

}
