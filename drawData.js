  var t = 0.0;
function drawData(row){

  var  offset;
  var angleInc;

  //var angleX = 0, angleY = 0, angleZ = 0;
  offset = 0;

  angleInc = PI / this.angleDivide;
  var angle = 0.0;

    let bbox;
    this.row = row;
    this.d_mag = cityxy.getNum(this.row,1);
    this.cityname = cityxy.get(this.row,2);
    this.x = cityxy.get(this.row,3);
    this.y = cityxy.get(this.row,4);
    this.z = cityxy.get(this.row,5);
    this.r_axis = cityxy.get(this.row,7);
    this.angle_b = (cityxy.get(this.row,8));
    this.country = cityxy.get(this.row,9);
    this.legality = cityxy.get(this.row,10);
    this.boxheight = this.d_mag;
    this.box = box;
    this.color;
    this.alpha = 10;


    this.scaleVal = 1.5;
    this.angleDivide = 20;
    this.speed = 0.4;
    this.resolution = 3;
    this.size = 1;
    this.smokex = 0;
    this.smokey = 0;
    this.smokez = 0;

      //if (!consolecont){
        // + " x:"+ x+ " y:" + y+ " z:"+z +
        //console.log(cityname+ " angle_b:"+angle_b+" r_axis.z:"+r_axis.z);
      //}
      push();
        translate(this.x,this.y,this.z);
        rotate(this.angle_b, [this.r_axis.x, this.r_axis.y, -this.r_axis.z]);
        //Rotating them individually like below will not work
        //    rotateZ(angle_b, abs(-r_axis.z));
        //   rotateY(angle_b, abs(r_axis.y));
        //   rotateX(angle_b, abs(r_axis.x));

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

        if (this.legality == "Legal"){specularMaterial(0,100,0);}
        else if (this.legality == "Partial"){specularMaterial(100,100,0);}
        else if (this.legality == "Illegal"){specularMaterial(100,0,0);}
      bbox = box(boxheight*10,1,1);
      //    sphere(this.size);
      //  var z_increment=0.02;
      //  normalMaterial();
          //noFill();
      //  noStroke();
        //  for (this.smokex = 0; this.smokex < boxheight*5; this.smokex += this.resolution) {
        //     this.smokey = offset + (cos(angle + t) * this.scaleVal);
            //   rotateX(frameCount * 0.001);
            // push();
            //   translate(this.smokex+this.size, this.smokey, this.smokez);
            //
            //   rotateY(frameCount * 0.001);
            //   noFill();
            //   //ellipse (0, 0, this.size,this.size);
            //   sphere(this.size);
            // pop();
          //  angle += angleInc;
        //  }
          //angle += angleInc;

      pop();

//  t += this.speed / 1000;

    // var smokecontrols = new function() {
    //     this.scaleVal = 47;
    //     this.angleDivide = 7.5;
    //     this.speed = 7;
    //     this.resolution = 16;
    //     this.size = 10;
    //   //  this.x = 0;
    //     //this.y = 0;
    //     //this.z = 0;
    //   };

}
