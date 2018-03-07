

particles = [];
let cityxy;
rows = [];


let mapimg;

let clat = 0;
let clon = 0;

let ww = 1024;
let hh = 512;

let alpha = 200;

let zoom = 1;
let candata;
let canjsoncities;
//colormode(HSB);

function preload() {
  // The clon and clat in this url are edited to be in the correct order.
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' +
    clon + ',' + clat + ',' + zoom + '/' +
    ww + 'x' + hh +'?access_token=pk.eyJ1IjoiZG9sbGVlIiwiYSI6ImNqZTh6MmgyeDAwYTAzM3M1dmdnN3BhMW8ifQ.LEZ3tpEA4sLQ-UfanFHnmQ');

  // Load Cannabis Data. Works with both CSV and JSON files
//  candata = loadStrings('candata.csv');
  canjson = loadJSON("candata.json");
}

function mercX(lon) {
  lon = radians(lon);
  let a = (256 / PI) * pow(2, zoom);
  let b = lon + PI;
  return a * b;
}

function mercY(lat) {
  lat = radians(lat);
  let a = (256 / PI) * pow(2, zoom);
  let b = tan(PI / 4 + lat / 2);
  let c = PI - log(b);
  return a * c;
}





function setup() {
    createCanvas(ww, hh);
  background(0);
  cityxy= new p5.Table();

  cityxy.addColumn('id');
  cityxy.addColumn('name');
  cityxy.addColumn('xcity');
  cityxy.addColumn('ycity');
  cityxy.addColumn('mag');

  // translate(width / 2, height / 2);
  // imageMode(CENTER);
  // image(mapimg, 0, 0);


  let cx = mercX(clon);
  let cy = mercY(clat);
  canjsoncities = canjson.cities;

  for (let i = 0; i < canjsoncities.length; i++) {

    //let data = candata[i].split(/,/);
  //  -73.9808,40.7648
    let city = canjsoncities[i].city;
    let lon = canjsoncities[i].longitude;
    let lat = canjsoncities[i].latitude;
    let mag = canjsoncities[i].consumption;
        // console.log(city+ " "+mag);
    let x = mercX(lon) - cx;
    let y = mercY(lat) - cy;
    // // This addition fixes the case where the longitude is non-zero and
    // // points can go off the screen.
    if(x < - width/2) {
      x += width;
    } else if(x > width / 2) {
      x -= width;
    }

    mag = pow(mag,2);
    mag = sqrt(mag);
    let magmax = (pow(10, 1));
    let d = map(mag, 0, magmax, 0, 5);
    console.log(d);

    rows[i] = cityxy.addRow();
    rows[i].setNum('id', cityxy.getRowCount() - 1);
    rows[i].setString('name', city);
    rows[i].setNum('xcity', x);
    rows[i].setNum('ycity', y);
    rows[i].setNum('mag', d);

    stroke(255, 0, 255,90);
         fill(255, 0, 255, 200);
    ellipse(x,y, 4, 4, 100);
    //console.log(x,y,d);
      noStroke();

    }

}


function draw() {
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapimg, 0, 0);

let cityname;
let xcity;
let ycity;
let dmag;

  for (let i = canjsoncities.length - 1; i >= 0; i--) {
    cityname = cityxy.get(i,1);
    xcity = cityxy.get(i,2);
    ycity = cityxy.get(i,3);
    dmag = cityxy.get(i,4);


    for (let j=0; j < round(1+dmag); j++) {

      let p = new Particle(xcity,ycity,dmag);
      particles.push(p);
    }
  }
   for (let i = particles.length - 1; i >= 0; i--) {

    particles[i].show();
    particles[i].update();
    if (particles[i].finished()) {
      // remove this particle
      particles.splice(i, 1);
    }

   }

  }
  //console.log(cityname + ":", xcity +",", ycity+",", dmag);



class Particle {

  constructor(x,y,d) {
    this.x = x;
    this.y = y;
    this.vx = random(-1, 1);
    this.vy = random(-5, -1);
    this.alpha = 200;
    this.d = d;
  }

  finished() {
    return this.alpha < 10;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 60;
  }

  show() {
    noStroke();
    colorMode(HSB);
    fill(random(30,340), 100, 60, this.alpha);
    ellipse(this.x, this.y, 4);
  }

}
