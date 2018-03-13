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

      canvas = d3.select("body").append("canvas")
        .attr({width: "1024px", height: "512px"})
        .style("display", "none");


  d3.select("#loading").transition().duration(500)
    .style("opacity", 0).remove();

  var countries = topojson.feature(world, world.objects.countries);
  var features = topojson.feature(world, world.objects.countries).features;
  console.log(features);
  //var testcountry = countries.find("id");
 //console.log(countries);
  var cancountryname ={};


  data.cities.forEach(function (d) {
      cancountryname[d.country] = {
      city: d.city,
      legality: d.legality,
      }
    });
  //

    features.forEach(function (e) {
      //  for (i=0; i<cancountryname.length; i++){
        var details = cancountryname ? cancountryname : {};
      //  console.log(cancountryname);
    //  console.log(details);
    //  console.log(d.id);
      if (details.hasOwnProperty(e.id)){
       return e.id
        }
     });


    context = canvas.node().getContext("2d");

    var path = d3.geo.path()
      .projection(projection).context(context);

    context.strokeStyle = "#111";
    context.lineWidth = 0.25;
    context.fillStyle = color || "#222";
    context.beginPath();
    path(countries);
    context.fill();
    context.stroke();

    //Partial USA India Russia Canada Australia | Brazil Spain Italy Colombia Germany |
    // New Zealand Czech Rep Austria Mexico Peru Thailand | France Argentina Poland Netherlands
    //start --> Croatia Ukaraine Belgium Turkey Bulgaria Denmark Romani Switzerland Costa Rica Norway Estonia Portugal Slovenia
    //Greece Ecuador Paraguay
    context.fillStyle = "#191900";
    context.beginPath();
    var partial = ["168","73","135","27","8","22","49","79", "35","41", "120","40","9","102","124","156" ,"55","4", "127", "117"];
    for (i = 0; i <partial.length; i++) {
    path(features[partial[i]]);
    }
    context.fill();
    context.stroke();

  //  d3.select("body").append("canvas")

    // d3.select('#current').append("canvas")
    //     .selectAll("path")
    //      .data(features)
    //      .enter().append("path")
    // //function fill(obj, color) {
    //   context.beginPath()
    //   path(obj)
    //   context.fillStyle = color
    //   context.fill()
    //}


    maptextureurl = loadImage(canvas.node().toDataURL('image/png'),function() {console.log('loaded');d3loaded = true;});
    return maptextureurl;
    //canvas.remove();

 }
 }
