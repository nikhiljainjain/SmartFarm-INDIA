#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <Servo.h>
#include <ArduinoJson.h>


Servo servox;
const char *ssid =  "hehehe";     // replace with your wifi ssid and wpa2 key
const char *pass =  "vayujkandoi";

WiFiClient client;
int sensor_pin = A0;
int output_value;
const int MotorInPin1 = D0;
const int MotorInPin2 = D1;
 
void setup() 
{
       Serial.begin(9600);
       delay(10);
       pinMode(sensor_pin, OUTPUT);
       pinMode(MotorInPin1, OUTPUT);
       pinMode(MotorInPin2, OUTPUT);
         
       Serial.println("Connecting to ");
       Serial.println(ssid); 
 
       WiFi.begin(ssid, pass); 
       while (WiFi.status() != WL_CONNECTED) 
          {
            delay(500);
            Serial.print(".");
          }
      Serial.println("");
      Serial.println("WiFi connected");
      servox.attach(2); //D4
      servox.write(0);
      delay(2000);
 
}
 
void loop() 
{   
  String url="http://devsoc-nikhiljainjain17.c9users.io/pump/controller";
  //String something = String(output_value);
  String postData="output";
  String func="get";
  Request(url,postData,func);
  delay(3000);    //Send   
  
  



  
  //TODO : CALL Pump,Soil sensor
}

int weather_out(String weather)
{
  if(weather=="cool")
    return 6;
    
  else if(weather=="cloudy")
    return 5;
    
  else if(weather=="haze")
    return 4;
    

  else if(weather=="Rainy")
    return 3;
    

 else  if(weather=="Sunny")
    return 2;
    
 else if(weather=="Too Sunny")
    return 1;
    
  } 


void Request(String url,String postData,String func)
{
  HTTPClient http;  //Declare an object of class HTTPClient
    
    http.begin(url);  //Specify request destination
    http.addHeader("Host", "devsoc-nikhiljainjain17.c9users.io");
    http.addHeader("User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv","66.0) Gecko/20100101 Firefox/66.0");
    http.addHeader("Accept","text/html,application/xhtml+xml,application/xml;q=0.9,/;q=0.8");
    http.addHeader("Accept-Language","en-US,en;q=0.5");
    http.addHeader("Accept-Encoding","gzip, deflate, br");
    http.addHeader("DNT","1");
    http.addHeader("Connection","keep-alive");
    http.addHeader("Cookie","c9.live.user.click-through=ok");
    http.addHeader("Upgrade-Insecure-Requests","1");
    http.addHeader("Cache-Control","max-age=0");
   
    //String  postData = "status=Ok&station=9";

    if(func=="post"){
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");   
    int httpCode = http.POST(postData);                 
    //Send the request
    //http.addHeader("Content-Type", "text/plain");
    if (httpCode > 0) { //Check the returning code
     
      String payload = http.getString();   //Get the request response payload
      Serial.println(payload);                     //Print the response payload
 
    }
    }

    else if(func=="get"){
                  int httpCode = http.GET();
                  
                  String payload = http.getString();   //Get the request response payload
                  Serial.println(payload); 
            
      if(httpCode == 200)
              {  
                  StaticJsonBuffer<1000> jsonBuffer;
                  JsonObject&root = jsonBuffer.parseObject(payload);
            
                int  x2=root["data"]["observations"]["tempC"];
                int  x4=root["data"]["observations"]["humidity"];
                String weather=root["data"]["observations"]["weather"];
            
                int x3=weather_out(weather);
            
            
                
                //.as<char*>();  
               
                // Decode JSON/Extract values
                Serial.println(F("Response:"));
                Serial.println(x2);
                Serial.println(x4);
                Serial.println(x3);

                int temp1=0.3*x2+0.1*x3+0.1*x4;
       
  }
  else
  {
    Serial.println("Error in response");
  }
 
            
      }
    
 
    http.end();   //Close connection
  
  }


void pump()
{
  digitalWrite(MotorInPin1, HIGH);
  digitalWrite(MotorInPin2, LOW);
  delay(2000);
   
}




void soilsensor()
{
   //Moisture Sensor
   output_value= analogRead(sensor_pin);

   output_value = map(output_value,550,0,0,100);

   Serial.print("Mositure : ");

   Serial.print(output_value);

   Serial.println("%");
  
  
}

void servomotor()
{
  servox.write(90);
  delay(2000);
  servox.write(0);
   }
    


   