
function drawData(row){


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
    this.boxheight = this.d_mag*10 - r/2;
    //this.box;
    this.color;


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
      normalMaterial();
      //for (i=0; i<this.boxheight; i++){
      box(3,3,3);
      //}
      pop();

      if (this.legality = "Partial"){
        //getMaptexture(this.country,#006400);
      }


//  beginRotate = true;
}
