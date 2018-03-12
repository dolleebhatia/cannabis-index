
let ww = 1024;
let hh = 768;
let mapimg;
let img;
let maptextureurl;
let textureW = 1024;
let textureH=600;
let path;
let d3loaded = false;
let rx = 0;let ry = 0;let r =300;let angle = 0;
let city3d;

rows = [];label = [];
let cityxy;let candata;let canjsoncities;let zoomZ = -50;



function preload() {
  //city3d = loadModel('NYC.obj');

  //Load d3 stuff

  getMaptexture();



  //var geo = geodecoder(countries.features);

  //var textureCache = memoize(function (cntryID, color) {
    //var country = geo.find(cntryID);
    //return mapTexture(country, color);


//  console.log(maptextureurl);
  //add callback

  //backup img for debugging
  //img = loadImage('world.jpg');

  // Load Cannabis Data. Works with both CSV and JSON files
  ///candata = loadStrings('candata.csv');
  worldjson = loadJSON("world.json");
  canjson = loadJSON("candata.json");
}

function setup(){
  createCanvas(ww,hh, WEBGL);
  canjsoncities = canjson.cities;
  populateTable();
}

function draw(){
  background(20);

  pointLight(255,255,255, 0, -1, -1);
  pointLight(255,255,255, -1, -1, -1);
  ambientLight(255,255,255);

  translate(0, 0, zoomZ);
  rotateY(rx);
  rotateX(ry);
  if (d3loaded){texture(maptextureurl);}
  else {setTimeout(function(){ console.log("timeout3000"); }, 3000);}
  texture(maptextureurl);
  sphere(r);

  // Rotate the globe if the mouse is pressed
  if (mouseIsPressed) {
    rx += (mouseX - pmouseX) / 100;
    ry += (mouseY - pmouseY) / -800;
  }
  let dirX = mouseX - width / 2;
  let dirY = mouseY - height / 2;

  for (let i = 0; i< cityxy.rows.length; i++){
  drawData(i);
  }
}

function mouseWheel(event) {
//move the square according to the vertical scroll amount
zoomZ += event.delta;
//uncomment to block page scrolling
//return false;
}

// function mousePressed() {
//   let latRads = -acos(mouseX*r);
//   let lonRads = -atan2(r*mouseY);
//   let lat = PI/2 - degrees(latRads);
//   let lon = PI - degrees(lonRads);
//   console.log(latRads, lonRads);
//   console.log(lat, lon-180);
//
//   // let thetha = PI/2 +radians(lat);
//   // let phi = PI/2 - radians(lon) ;
// }
