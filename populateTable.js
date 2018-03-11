
function populateTable(){
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
