function getUI(){

  //UI Setup
  checkbox = createCheckbox('consumption', false);
  checkbox.changed(checkedEvent);
  checkbox.position(20, 20);
  //checkedEvent is an empty function for now
  testSlider = createSlider(0, 100, 5);
  testSlider.position(20, 60);

  // test toggle button setup
  displayToggle = true;
  testButton = createButton("test1");
  testButton.position(20, 100);
  testButton.mousePressed(function() {
    testButton.hide();
    test2Button.show();
    displayToggle = false;
  });
  test2Button = createButton("test2");
  test2Button.position(20, 100);
  test2Button.hide();
  test2Button.mousePressed(function() {
  test2Button.hide();
  testButton.show();
  displayToggle = true;
  });


  selcountries = createSelect();
  selcountries.position(20, 140);
  selcountries.option('select country');

  //  let scountry;
  //canjsoncities.country;
  for  (canjsoncities.country of canjsoncities){
    selcountries.option(canjsoncities.country);
    //selcountries.option('grape');
  }
    selcountries.changed(selectEvent);
  

  function selectEvent(){

  }

  function checkedEvent(){
  }
}
