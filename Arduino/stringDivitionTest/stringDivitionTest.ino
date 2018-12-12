/*CONTROLING A SERVO FOR STEERING WITH THE MOUSE POSITION IN P5 OVER SERIAL
  CREATED BY: GIANFRANCO MACCAGNAN
  SUBMISSION BY: GIANFRANCO MACCAGNAN, CHRISTINA WENG, DUAA ZAHEER
  CREADITS: SERIAL COMUNICATION BY Shawn Van Every

  DESN30146 PROJECT 3
*/


#include <Servo.h>

Servo myservo; //steering servo
Servo secondservo; //back motor servo 

String incoming = "";//variable to store incoming serial

String x = "";//store the string from the serial read

int xValue;//used to convert the string into int for the servo

void setup() {
  Serial.begin(9600);
  myservo.attach(9);
  secondservo.attach(8);
}

void loop() {
  if (Serial.available()>1){
    incoming = Serial.read();

    x= incoming.substring(0,incoming.indexOf(",")); //read the serial and separate the x variable into substring
    xValue = x.toInt(); //convert the string to int to be readable for the servo

    myservo.write(xValue);//write the x position to the steering servo 

    secondservo.write(60);//have the back servos constantly going. 60 is recomended for it to be easy to drive
    
    Serial.println(xValue);//log x value for debugging purposes

    
    
  }
}
