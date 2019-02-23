#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

const char *ssid =  "hehehe";     // replace with your wifi ssid and wpa2 key
const char *pass =  "vayujkandoi";

WiFiClient client;
 
void setup() 
{
       Serial.begin(9600);
       delay(10);
               
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
}
 
void loop() 
{   
  HTTPClient http;  //Declare an object of class HTTPClient
    
    http.begin("http://devsoc-nikhiljainjain17.c9users.io/data/collection/water");  //Specify request destination
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
    http.addHeader("Content-Type", "application/x-www-form-urlencoded"); 
    String  postData = "status=Ok&station=9";
    int httpCode = http.POST(postData);                 
    //Send the request
    //http.addHeader("Content-Type", "text/plain");
    if (httpCode > 0) { //Check the returning code
     
      String payload = http.getString();   //Get the request response payload
      Serial.println(payload);                     //Print the response payload
 
    }
 
    http.end();   //Close connection
 
  
 
  delay(1000);    //Send   
  
}
