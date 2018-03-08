
let ww = 1280;
let hh = 1280;
let mapimg;
let img;
let rx = 0;
let ry = 0;
let earthradius =400;
let angle = 0;
clon = 0.1;
clat = 0;
clon = 0;

particles = [];
let cityxy;
rows = [];
label = [];
let alpha = 255;
let candata;
let canjsoncities;

let zoomZ = 0;

function preload() {

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
  createCanvas(ww, hh, WEBGL);
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

  //let cx = mercX(clon);
  //let cy = mercY(clat);
  canjsoncities = canjson.cities;
  let r = earthradius;

  for (let i = 0; i < canjsoncities.length; i++) {
      //let data = candata[i].split(/,/);
    let city = canjsoncities[i].city;
    let lon = (canjsoncities[i].longitude);
    let lat = (canjsoncities[i].latitude);
    let mag = canjsoncities[i].consumption;
         //console.log(city+ " lat:"+lat+" lon:"+lon+" mag:"+mag);

    // float cx = alt * cos(lat/phi) * cos(lon);
    // float cy = alt * cos(lat/phi) * sin(lon);
    // float cz = alt * sin(lat/phi);
    // so x = -cx, y = -cz, z = cy
//float x = -cx, y = -cz, z = cy;

////function calcPosFromLatLonRad(lat,lon,radius){
let thetha = PI/2 +radians(lat);
let phi = PI/2 - radians(lon) ;
//let thetha = (90-lat)*(Math.PI/180);
//let phi = (90-lon)*(Math.PI/180);

// x = -((radius) * Math.sin(thetha)*Math.cos(phi));
// z = ((radius) * Math.sin(thetha)*Math.sin(phi));
// y = ((radius) * Math.cos(thetha));
// 	console.log([x,y,z]);
//    return [x,y,z];
// }
// LAT = latitude * pi/180
// LON = longitude * pi/180
// x = -R * cos(LAT) * cos(LON)
// y =  R * sin(LAT)
// z =  R * cos(LAT) * sin(LON)

// var thetha = (90 - lat) * Math.PI / 180;
//   var phi = (180 - lng) * Math.PI / 180;
//
//   point.position.x = 200 * Math.sin(thetha) * Math.cos(phi);
//   point.position.y = 200 * Math.cos(thetha);
//   point.position.z = 200 * Math.sin(thetha) * Math.sin(phi);

    let cX = -(r * sin(thetha) * cos(phi));
    let cZ = -(r * sin(phi)* sin(thetha));
    let cY = (r * cos(thetha));
    let posvector = createVector(cX, cY, cZ);
    let xaxis = createVector(1, 0, 0);
    let raxis = p5.Vector.cross(xaxis,posvector);
    //angleMode(DEGREES);
    let angleb = p5.Vector.angleBetween(xaxis,posvector);
    //let angleb = atan2(posvector, xaxis);
    console.log(angleb);

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
//print(event.delta);
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
   //ambientLight(50);
   texture(img);
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
//  ambientLight(100,200,255);

  let cityname;let x_axis;let r_axis;let d_mag;let angle_b;
  let x; let y; let z; let boxheight;
    //for (let i = canjsoncities.length - 1; i >= canjsoncities.length - 5; i--) {
      for (let i = 0; i< canjsoncities.length; i++){
      d_mag = cityxy.get(i,1);
      cityname = cityxy.get(i,2);
      cX = cityxy.get(i,3);
      cY = cityxy.get(i,4);
      cZ = cityxy.get(i,5);
      r_axis = cityxy.get(i,7);
      angle_b = (cityxy.get(i,8));

      // so x = -cx, y = -cz, z = cy
  //float x = -cx, y = -cz, z = cy;
      boxheight = d_mag*20 - earthradius/2;
      x = cX;
      y = cY;
      z = cZ;

      //add z
      //make new vector xaxis and angle between
      if (!consolecont){
        // + " x:"+ x+ " y:" + y+ " z:"+z +
        console.log(cityname+ " angle_b:"+angle_b+" r_axis.z:"+r_axis.z);
      }

      //for (let j=0; j < round(1+dmag); j++) {
        push();
          translate(x,y,z);
        //  rectMode(CENTER);
        //  angleMode(DEGREES);
          rotate(angle_b, [r_axis.x, r_axis.y, -r_axis.z]);
          //    rotateZ(angle_b, abs(r_axis.z));
          //   rotateY(angle_b, abs(r_axis.y));
          //   rotateX(angle_b, abs(r_axis.x));

          fill(255);
          //label[i].text(label[i], 50, 50);
          //texture(label[i]);
          normalMaterial();
            box(boxheight,3,3);
        pop();

  }
  consolecont = true;
 //angle += 0.03;
}
