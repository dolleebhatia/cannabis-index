//Add callback
var features;
//D3
function getMaptexture(geojson,color){

  var geojson, texture, context, color, canvas;

  var projection = d3.geo.equirectangular()
    .translate([512, 256]).scale(163);


    d3.queue()
        .defer(d3.json, 'data/world.json')
        .defer(d3.json, 'data/candata.json')
        .await(function (error, world, data) {
            if (error) {
                console.error('err' + error);
            }
            else {
                drawMap(world, data);
            }
        });

function drawMap(world, data) {

  canvas = d3.select("body").append("canvas")
    .attr({width: "1024px", height: "512px"})
    .style("display", "none");

  d3.select("#loading").transition().duration(500)
  .style("opacity", 0).remove();



  var oceans1 = topojson.feature(world, world.objects.oceans1);
  var oceans2 = topojson.feature(world, world.objects.oceans2);
  var states = topojson.feature(world, world.objects.states);
  var countries = topojson.feature(world, world.objects.countries);
   features = topojson.feature(world, world.objects.countries).features;

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
      .projection(projection)
      .context(context);

    context.strokeStyle = "Darkblue";
    context.lineWidth = 0.25;
    context.fillStyle = "Darkblue";
    context.beginPath();
  // path(oceans1);
  //  path(oceans2);
    context.fill();
    //context.stroke();



  context.beginPath();
    context.strokeStyle = "#222";
    context.lineWidth = 0.10;
    context.fillStyle =  "#333";
    context.beginPath();
    //path(geojson);
    path(countries);
    //for single countries eg India - get index from code or console.log features
    //path(features["72"]);
    context.fill();
    context.stroke();

    //Partial
    //USA India Russia Canada Australia | Brazil Spain Italy Colombia Germany |
    // New Zealand Czech Rep Austria Mexico Peru Thailand | France Argentina Poland Netherlands
    //start --> Croatia Ukaraine Belgium Turkey Bulgaria Denmark Romani Switzerland Costa Rica Norway Estonia Portugal Slovenia
    //Greece Ecuador Paraguay
    context.fillStyle = "#191900";
    context.beginPath();
    var partial = ["168","73","133","27","8","22","49","79", "35","41", "120","40","9","102","124","156" ,"55","4", "127", "117"];
    for (i = 0; i <partial.length; i++) {
    //path(features[partial[i]-1]);
    //console.log(path(features[72]));
    //(path(features[72]) = india
    }
    context.fill();
    context.stroke();


    context.fillStyle = "#191900";
    context.beginPath();
    var illegal = [];
    for (i = 0; i <partial.length; i++) {
    //  path(features[illegal[i]]);
    }
    context.fill();
    context.stroke();



    maptextureurl = loadImage(canvas.node().toDataURL('image/png'),function() {console.log('loaded');d3loaded = true;});
    return maptextureurl;
    canvas.remove();
    return features;

  }
 }
