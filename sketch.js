
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
let cityxy;let candata;let canjsoncities;let zoomZ = 0;

function preload() {
  city3d = loadModel('NYC.obj');
  getMaptexture();
  console.log(maptextureurl);
  //add callback

  img = loadImage('world.jpg');

  // Load Cannabis Data. Works with both CSV and JSON files
 // //candata = loadStrings('candata.csv');
    canjson = loadJSON("candata.json");
}

function setup(){
  createCanvas(ww,hh, WEBGL);

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
  cityxy.addColumn('country');
  cityxy.addColumn('legality');


  canjsoncities = canjson.cities;
  for (let i = 0; i < canjsoncities.length; i++) {
      //let data = candata[i].split(/,/);
    let city = canjsoncities[i].city;
    let lon = (canjsoncities[i].longitude);
    let lat = (canjsoncities[i].latitude);
    let mag = canjsoncities[i].consumption;
    let country = canjsoncities[i].country;
    let legality = canjsoncities[i].legality;

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
    rows[i].setString('country', country);
    rows[i].setString('legality', legality);

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
let beginRotate = false;

function draw(){

  background(20);
  translate(0, 40, zoomZ);
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

  //directionalLight(10,10,10, width/2, height/2, 0);
  pointLight(255,255,255, 0, -1, -1);
  pointLight(255,255,255, -1, -1, -1);
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

      boxheight = d_mag*10 - r/2;
      x = cX;
      y = cY;
      z = cZ;

      //if (!consolecont){
        // + " x:"+ x+ " y:" + y+ " z:"+z +
        //console.log(cityname+ " angle_b:"+angle_b+" r_axis.z:"+r_axis.z);
      //}
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

      //if (cityname == "New York"){
        //push();
        //scale(0.09);
        //translate(200,0,0);
        //rotateZ(90);
        //box(box,3,3);
        //model(city3d);
        //pop();
      //} else {
      normalMaterial();
      box(boxheight,3,3);
  //  }
      pop();


    }
//  beginRotate = true;
}

function mousePressed() {
  let latRads = -acos(mouseX*r);
  let lonRads = -atan2(r*mouseY);
  let lat = PI/2 - degrees(latRads);
  let lon = PI - degrees(lonRads);
  console.log(latRads, lonRads);
  console.log(lat, lon-180);

  // let thetha = PI/2 +radians(lat);
  // let phi = PI/2 - radians(lon) ;
}
