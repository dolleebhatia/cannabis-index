
let ww = 1024;
let hh = 512;
let mapimg;
let img;
let maptextureurl;
let textureW = 1024;
let textureH=512;
let path;
let rx = 0;let ry = 0;let earthradius =200;let angle = 0;

rows = [];label = [];
let cityxy;let candata;let canjsoncities;let r = earthradius;let zoomZ = -50;

function preload() {


        var projection = d3.geo.equirectangular()
          .translate([512, 256]).scale(163);

        d3.json('world.json', function (err, data) {

          d3.select("#loading").transition().duration(500)
            .style("opacity", 0).remove();

          var countries = topojson.feature(data, data.objects.countries);

          canvas = d3.select("body").append("canvas")
            .attr({width: "1024px", height: "512px"})
            .style("display", "none");


          var context = canvas.node().getContext("2d");

          var path = d3.geo.path()
            .projection(projection).context(context);

          context.strokeStyle = "#333";
          context.lineWidth = 0.25;
          context.fillStyle = "#fff";
          context.beginPath();
          path(countries);
          context.fill();
          context.stroke();
          maptextureurl = loadImage(canvas.node().toDataURL('image/png'));
          canvas.remove();

        });



  img = loadImage('world.jpg');
//  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/-0.000,0.00000,0.2,0,0/1280x1280@2x?access_token=pk.eyJ1IjoiZG9sbGVlIiwiYSI6ImNqZTh5dWFjZzA0dTQyd25zdnJ1YjFwc2YifQ.uVTRMcrpvTQo1m13yZf--Q');
  //mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/cj5banmps1bqr2rqwsy5aeijw/static/' +
      //clon + ',' + clat + ',' + zoom + '/' +
//  ww + 'x' + hh +'?access_token=pk.eyJ1IjoiZG9sbGVlIiwiYSI6ImNqZTh6MmgyeDAwYTAzM3M1dmdnN3BhMW8ifQ.LEZ3tpEA4sLQ-UfanFHnmQ');

  // Load Cannabis Data. Works with both CSV and JSON files
 // //candata = loadStrings('candata.csv');
    canjson = loadJSON("candata.json");
}



function setup(){
  //var c = createCanvas(ww, hh, WEBGL);
  //var canvas = c.canvas;
  createCanvas(1024,512, WEBGL);

      /*eslint-disable */



  cityxy = new p5.Table();
  cityxy.addColumn('id');
  cityxy.addColumn('mag');
  cityxy.addColumn('name');
  cityxy.addColumn('cX');
  cityxy.addColumn('cY');
  cityxy.addColumn('cZ');
  cityxy.addColumn('xaxis');
  cityxy.addColumn('raxis');
  cityxy.addColumn('angleb');
  canjsoncities = canjson.cities;
  for (let i = 0; i < canjsoncities.length; i++) {
      //let data = candata[i].split(/,/);
    let city = canjsoncities[i].city;
    let lon = (canjsoncities[i].longitude);
    let lat = (canjsoncities[i].latitude);
    let mag = canjsoncities[i].consumption;

let thetha = PI/2 +radians(lat);
let phi = PI/2 - radians(lon) ;

    let cX = -(r * sin(thetha) * cos(phi));
    let cZ = -(r * sin(phi)* sin(thetha));
    let cY = (r * cos(thetha));
    let posvector = createVector(cX, cY, cZ);
    let xaxis = createVector(1, 0, 0);
    //returns vector
    let raxis = p5.Vector.cross(xaxis,posvector);
    //returns angle
    let angleb = p5.Vector.angleBetween(xaxis,posvector);
    //console.log(angleb);

    mag = pow(mag,2);
    mag = sqrt(mag);
    let magmax = (pow(10, 1));
    let d = map(mag, 0, magmax, 0, 5);
    //console.log(d);

    rows[i] = cityxy.addRow();
    rows[i].setNum('id', cityxy.getRowCount() - 1);
    rows[i].set('mag', d);
    rows[i].setString('name', city);
    rows[i].set('cX', cX);
    rows[i].set('cY', cY);
    rows[i].set('cZ', cZ);
    rows[i].set('xaxis', xaxis);
    rows[i].set('raxis', raxis);
    rows[i].set('angleb', angleb);
    label[i] = createGraphics(100, d);
    label[i].fill(255);
    label[i].textAlign(CENTER);
    label[i].textSize(12);
  }
}
function mouseWheel(event) {
//move the square according to the vertical scroll amount
zoomZ += event.delta;
//uncomment to block page scrolling
//return false;
}
let consolecont = false;
function draw(){
  //translate(width/2, height/2, zoomZ);
  background(50);
  translate(0, 0, zoomZ);
  rotateY(rx);
  rotateX(ry);
  texture(maptextureurl);
    sphere(earthradius);

  // Rotate the globe if the mouse is pressed
  if (mouseIsPressed) {
    rx += (mouseX - pmouseX) / 100;
    ry += (mouseY - pmouseY) / -800;
  }
  let dirX = mouseX - width / 2;
  let dirY = mouseY - height / 2;

  //directionalLight(10,10,10, width/2, height/2, 0);
  directionalLight(255,255,255, 0, -1, -1);
  ambientLight(255,255,255);


  let cityname;let x_axis;let r_axis;let d_mag;let angle_b;
  let x; let y; let z; let boxheight;
      for (let i = 0; i< canjsoncities.length; i++){
      d_mag = cityxy.get(i,1);
      cityname = cityxy.get(i,2);
      cX = cityxy.get(i,3);
      cY = cityxy.get(i,4);
      cZ = cityxy.get(i,5);
      r_axis = cityxy.get(i,7);
      angle_b = (cityxy.get(i,8));

      boxheight = d_mag*20 - earthradius/2;
      x = cX;
      y = cY;
      z = cZ;

      if (!consolecont){
        // + " x:"+ x+ " y:" + y+ " z:"+z +
        //console.log(cityname+ " angle_b:"+angle_b+" r_axis.z:"+r_axis.z);
      }
      push();
        translate(x,y,z);
        rotate(angle_b, [r_axis.x, r_axis.y, -r_axis.z]);
        //Rotating them individually like below will not work
        //    rotateZ(angle_b, abs(-r_axis.z));
        //   rotateY(angle_b, abs(r_axis.y));
        //   rotateX(angle_b, abs(r_axis.x));
      fill(255);
        //label[i].text(label[i], 50, 50);
        //texture(label[i]);
      //normalMaterial();
      //box(boxheight,3,3);
      pop();

  }
  consolecont = true;
}
