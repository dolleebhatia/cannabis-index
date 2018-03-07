
//My data didn't come with lat-lon details
//Used the MapBox API to add the lat-lon data of the cities to a cvs file..


var https = require('https');
var fs = require('fs');
var MapboxClient = require('mapbox');

var fullcandata = fs.readFileSync('candata.json');
var candata = JSON.parse(fullcandata);
//console.log(candata.length);
let MapboxAccessToken = 'pk.eyJ1IjoiZG9sbGVlIiwiYSI6ImNqZTh6MmgyeDAwYTAzM3M1dmdnN3BhMW8ifQ.LEZ3tpEA4sLQ-UfanFHnmQ';
let query;

//var client = new MapboxClient('pk.eyJ1IjoiZG9sbGVlIiwiYSI6ImNqZTh6MmgyeDAwYTAzM3M1dmdnN3BhMW8ifQ.LEZ3tpEA4sLQ-UfanFHnmQ');

  for (let i=0; i<candata.length; i++){
   query =(candata[i].city);
   //console.log(query);
   geocode(MapboxAccessToken, query, gotData);
 }

   function gotData (err, result){
    if (err) return console.log('Error: ' + err);
    //console.log(JSON.stringify(result, null, 2));
    //console.log(query);
    //let city = result.query;

    let resultsdata = result.features

    for (let i = 0; i<resultsdata.length; i++){
      let resultcity = resultsdata[i].text;
      let center = resultsdata[i].center;
      console.log(resultcity + "," + resultsdata[i].center);
      fs.appendFileSync('mapbox.json', resultcity + "," + resultsdata[i].center + '\n', 'utf8');
    }

      //console.log(query);
      // let features = result.features;
      // for (let j = 0; j<features.length; j++){
      // let geometry = features[j].center;
      // console.log(features[j].place_name);
      // let coordinates = geometry;
      // console.log(geometry[0] + ',' + geometry[1]);
      // }
    }


function geocode(mapboxAccessToken, query, callback) {
    https.get('https://api.tiles.mapbox.com/geocoding/v5/mapbox.places/' + query + '.json?access_token=' + mapboxAccessToken + '&proximity=&autocomplete=false&limit=1',
        function(response) {
            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('error', function(e) {
                callback(e);
            });
            response.on('end', function() {
                callback(null, JSON.parse(body));
            });
        });
}


// Code below from mapbox js on github
// if (require.main === module) {
//     if (!process.env.MapboxAccessToken) {
//         console.log('environment variable MapboxAccessToken must be set');
//         process.exit(1);
//     }
//     geocode(process.env.MapboxAccessToken, process.argv[2], function(err, result) {
//         if (err) return console.log('Error: ' + err);
//         console.log(JSON.stringify(result, null, 2));
//     });
// }
//
// module.exports = geocode;
