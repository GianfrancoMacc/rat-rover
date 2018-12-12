/*CONTROLING A SERVO FOR STEERING WITH THE MOUSE POSITION IN P5 OVER SERIAL
  CREATED BY: GIANFRANCO MACCAGNAN
  SUBMISSION BY: GIANFRANCO MACCAGNAN, CHRISTINA WENG, DUAA ZAHEER
  CREADITS: SERIAL COMUNICATION BY Shawn Van Every

  DESN30146 PROJECT 3
*/

var serial; // variable to hold an instance of the serialport library
var portName = 'COM8'; //serial port name
var inData; // variable to hold the input data from Arduino
var outData = 0; // variable to hold the output data to Arduino

var minWidth = 600; //set min width and height for canvas
var minHeight = 400;
var rightSlider; // slider for controlling
var width, height; // actual width and height for the sketch


function setup() {
    // set the canvas to match the window size
    if (window.innerWidth > minWidth) {
        width = window.innerWidth;
    } else {
        width = minWidth;
    }
    if (window.innerHeight > minHeight) {
        height = window.innerHeight;
    } else {
        height = minHeight;
    }
    //--------------------------------------

    //set up canvas
    createCanvas(width, height);
    background(0);
    noStroke();

    //Adding the title/intructions
    textSize(72);
    textAlign(CENTER);
    fill(255);
    text('Draw with your mouse',width/2, 80)
    textSize(50);
    textAlign(CENTER);
    fill(255);
    text('and bring Rat-Bot to life.',width/2, 150)
    
    

    //--------set up communication port-----------------

    serial = new p5.SerialPort(); // make a new instance of the serialport library
    serial.on('list', printList); // set a callback function for the serialport list event
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('open', portOpen); // callback for the port opening
    serial.on('error', serialError); // callback for errors
    serial.on('close', portClose); // callback for the port closing

    serial.list(); // list the serial ports
    serial.open(portName); // open a serial port
}


//-------------------------------------------------------

function draw() { 

    if (mouseIsPressed){
        
        //Draw a line using the mouse  x and y coordinates
        stroke(255);
        strokeWeight(4);
        line(mouseX, mouseY, pmouseX, pmouseY);
      
        //create a variable using the mouseX positioning and map it to values in the servo range, it's from 50 - 130 to avoid any overturn jamming 
        var xValue = Math.floor(map(mouseX,0,width,50,130,[true])); //the "true" constraints the values to only the canvas
     
        serial.write(xValue); //write the var in the serial
    
        console.log("x="+xValue);  // log the current values for debugging purposes
    }
}

//----------DEBUGGING-----------------------------------------------

function printList(portList) {
    // portList is an array of serial port names
    for (var i = 0; i < portList.length; i++) {
        // Display the list the console:
        print(i + " " + portList[i]);
    }
}

function serverConnected() {
    print('connected to server.');
}

function portOpen() {
    print('the serial port opened.')
}


function serialError(err) {
    print('Something went wrong with the serial port. ' + err);
}

function portClose() {
    print('The serial port closed.');
}