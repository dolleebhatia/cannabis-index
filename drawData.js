
function drawData(){
  let cityname;let x_axis;let r_axis;let d_mag;let angle_b;
  let x; let y; let z; let boxheight;

      for (let i = 0; i< canjsoncities.length; i++){

    this.d_mag = cityxy.get(i,1);
    this.cityname = cityxy.get(i,2);
    this.x = cityxy.get(i,3);
    this.y = cityxy.get(i,4);
    this.z = cityxy.get(i,5);
    this.r_axis = cityxy.get(i,7);
    this.angle_b = (cityxy.get(i,8));
    this.boxheight = this.d_mag*10 - r/2;
    //this.box;
    this.color;
    this.legality;
    this.country;


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
      box(this.boxheight,3,3);
  //  }
      pop();


    }
//  beginRotate = true;
}
