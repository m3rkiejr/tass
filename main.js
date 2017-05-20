
tday=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
tmonth=new Array("January","February","March","April","May","June","July","August","September","October","November","December");
currentTracker = 0; //counter for keeping time in notifications

function GetClock(){  //borrowed code, not my own, but quick and functional, thanks https://www.ricocheting.com/code/javascript/html-generator/date-time-clock
        var d=new Date();
        var nday=d.getDay(),nmonth=d.getMonth(),ndate=d.getDate(),nyear=d.getYear();
        if(nyear<1000) nyear+=1900;
        var nhour=d.getHours(),nmin=d.getMinutes(),nsec=d.getSeconds(),ap;

        if(nhour==0){ap=" AM";nhour=12;}
            else if(nhour<12){ap=" AM";}
            else if(nhour==12){ap=" PM";}
            else if(nhour>12){ap=" PM";nhour-=12;}

        if(nmin<=9) nmin="0"+nmin;
        if(nsec<=9) nsec="0"+nsec;

        document.getElementById('live-clock').innerHTML=""+tday[nday]+", "+tmonth[nmonth]+" "+ndate+", "+nyear+" "+nhour+":"+nmin+":"+nsec+ap+"";
}

function startup() {
    var systemMode = document.getElementById('systemMode');
    var systemStatus = document.getElementById('systemStatus');
    systemMode.style = "background: linear-gradient(Black, skyblue);"
    systemStatus.innerHTML = "System Starting<br><h6>please wait...</h6>";
    setTimeout(function(){
        systemMode.style = "background: linear-gradient(black, green);";
        systemStatus.innerHTML = "Normal";
    }, 34000);
}


function timeCheck(timeToCheck) {
    var d = new Date();
    var splitTime = timeToCheck.split("");
    var hour = Number(splitTime[0] + splitTime[1]);
    var minutes = Number(splitTime[3] + splitTime[4]);
    minutes = minutes + (60* hour);
    
    if (minutes > ((d.getHours() * 60) + d.getMinutes())){  //checks to see if sensor time is from previous day (dead sensor)
       
        return true;
    }
    if ((minutes - ((d.getHours() * 60) + d.getMinutes())+ 10) > 0) { // older than 10 minutes, kicks back true to set for signal loss error
        return false;
    } else { 
        return true;}
    }

function updateTChart(chart, referData, numOfCharts, sensorName, timeData, humidData) {  //chart 1 is chart to be rendered, referData is a array of any length containing one x and one y coord
    // check if sensor is dead, or sending bad info, if so, do not render new data, instead disconnect error, or sensor data error
    for (var i=0; i < numOfCharts;i++) {

        var tempDisplay = document.getElementById('currentTemp'+ (i+1));

        if (referData[i][0]["y"] == 2000) {                         //if sensor is turned off, can set first y coord to 2000 to disable display
            chart[i].options.data[0].dataPoints = null;
            chart[i].options.backgroundColor = "black";
            chart[i].options.title.text = "Sensor Disabled: " + sensorName[i];
            chart[i].options.title.fontSize = 16;
            tempDisplay.innerHTML = "DIS";
            tempDisplay.style.color = "black";
            
                        
        } else if (timeCheck(timeData[i])) {  //checks time to see if signal has been lost for more than 5 minutes
            chart[i].options.data[0].dataPoints = null;
            chart[i].options.backgroundColor = "grey";
            chart[i].options.title.text = "Signal Loss: " + sensorName[i];
            chart[i].options.title.fontSize = 20;
            tempDisplay.innerHTML = referData[i][0]["y"].toFixed([1]) +  String.fromCharCode(176) + "<h6></h6>";
            tempDisplay.style.color = "lightgray";

        } else if (Math.abs(referData[i][0]["y"]) == 196.60){  //for sensor error (sensors report -196.60 if there is an error- software reports 196.60 if error)
            chart[i].options.data[0].dataPoints = null;
            chart[i].options.backgroundColor = "orange";
            chart[i].options.title.text = "Sensor Error: " + sensorName[i];
            chart[i].options.title.fontSize = 35;
            tempDisplay.innerHTML = "Error";
            tempDisplay.style.color = "orange";

        } else if (referData[i][0]["y"] > 42) {  // check for high temps
            if ((referData[i][1]["y"] > 42) && (referData[i][2]["y"] > 42) && (referData[i][3]["y"] > 42)) { // check for last 4 min critical temp colors
                chart[i].options.data[0].dataPoints = referData[i];
                chart[i].options.backgroundColor = "#FF5252";
                chart[i].options.title.text = "Critical-Temp:" + sensorName[i];
                chart[i].options.title.fontSize = 14;
            } else {                                                                                        // if < 4 min throws high temp colors
                chart[i].options.data[0].dataPoints = referData[i];
                chart[i].options.backgroundColor = "#ffccd1";
                chart[i].options.title.text = "High-Temp:" + sensorName[i];
                chart[i].options.title.fontSize = 14;            
            }
            tempDisplay.innerHTML = referData[i][0]["y"].toFixed([1]) +  String.fromCharCode(176) + "<h6></h6>";
            tempDisplay.style.color = "red";
        } else {                                                                            //render normal chart
            chart[i].options.title.fontSize = 10;
            chart[i].options.title.text = sensorName[i];
            chart[i].options.data[0].dataPoints = referData[i];
            chart[i].options.backgroundColor = "skyblue";
            tempDisplay.innerHTML = referData[i][0]["y"].toFixed([1]) +  String.fromCharCode(176) + "<h6></h6>";
            tempDisplay.style.color = "blue";
        }
       
        chart[i].render();
        document.getElementById('referName' + (i+1)).innerHTML = sensorName[i];
    }

     updateTStats(referData, sensorName, humidData); //updates the thermostats

}

function updateFB () {
    //only update between 07 to 12 hr , updates outside of that, set timeout till next period
    document.getElementById('fb-window').src += '';
    var d = new Date();
    var hours = d.getHours();
    if (hours < 14 && hours > 6) {
        setTimeout(updateFB, 300000);
    } else if (hours < 7 && hours > 0){
        setTimeout(updateFB, ((7-hours) * 3600 * 1000));
    } else if (hours > 14 && hours < 24) {
        setTimeout(updateFB, ((31-hours) * 3600 * 1000));
    } else {
        setTimeout(updateFB, 3600000);
    }
}

function updateWU() {
    document.getElementById('wu-radar').src += '';
}

function updateForecast1 () {

    var weatherWeekly = [];  //array for 3 day forcast display bottom left
 
    var weatherToday = {};

    $.ajax({
        url : "http://api.wun derground.com/api/15b4ef203516fcdb/forecast/q/VA/Farmville.json",
        dataType : "jsonp",
        success : function(parsed_json) {

            weatherToday.forecastTxtDay = parsed_json['forecast']['txt_forecast']['forecastday'][0]['fcttext'];
            weatherToday.forecastTxtNight = parsed_json['forecast']['txt_forecast']['forecastday'][1]['fcttext'];
            weatherToday.tempHigh = parsed_json['forecast']['simpleforecast']['forecastday'][0]['high']['fahrenheit'];
        
            for ( var i=0; i<4; i++ ) {
                weatherWeekly.push({});
                weatherWeekly[i].dayShort = parsed_json['forecast']['simpleforecast']['forecastday'][i]['date']['weekday_short'];
                weatherWeekly[i].tempHigh = parsed_json['forecast']['simpleforecast']['forecastday'][i]['high']['fahrenheit'];
                weatherWeekly[i].tempLow = parsed_json['forecast']['simpleforecast']['forecastday'][i]['low']['fahrenheit'];
                weatherWeekly[i].picUrl = parsed_json['forecast']['simpleforecast']['forecastday'][i]['icon_url'];
                weatherWeekly[i].winds = parsed_json['forecast']['simpleforecast']['forecastday'][i]['maxwind']['mph'];
                weatherWeekly[i].pop = parsed_json['forecast']['simpleforecast']['forecastday'][i]['pop'];
            }

            updateWeatherHtml(weatherWeekly, weatherToday);

        }
    });


}

function updateWeatherHtml(weatherWeekly, weatherToday) {

    //update scrolling forecast for today
    document.getElementById('todaysForecast').innerHTML = "<em>Rest of Today:</em> " + weatherToday.forecastTxtDay + "<br><br><em><tab><tab>Tonight:</em> " + weatherToday.forecastTxtNight + "<br>";
    document.getElementById('todayIconUrl').src =  weatherWeekly[0].picUrl;
    document.getElementById('todaysHigh').innerHTML =  "H: " + weatherToday.tempHigh + "&deg";
    //update 3 day forecast under scrolling forcast

    for (var i=0; i < 4; i++){
        document.getElementById('dayShort' + i).innerHTML = weatherWeekly[i].dayShort;
        document.getElementById('dayHighLow' + i).innerHTML = "H: " + weatherWeekly[i].tempHigh + "&deg" + " L: " + weatherWeekly[i].tempLow + "&deg";
        document.getElementById('dayPic' + i).src = weatherWeekly[i].picUrl;
        document.getElementById('dayWinds' + i).innerHTML = "Max Winds: " + weatherWeekly[i].winds + "mph";
        document.getElementById('dayPop' + i).innerHTML = "Rain Chance: " + weatherWeekly[i].pop + "%";
    }





} 

function updateTStats(referData, sensorName, humidData) {
 
    sensorName.forEach(function(str, position){

        switch(str) {
            case "Front":
                document.getElementById('tempFrontRoom').innerHTML = referData[position][0]['y'].toFixed([0]);
                document.getElementById('humFrontRoom').innerHTML = Number(humidData[position]).toFixed([0]) + "%";
                break;
                
            case "Middle":
                document.getElementById('tempMiddleRoom').innerHTML = referData[position][0]['y'].toFixed([0]);
                document.getElementById('humMiddleRoom').innerHTML = Number(humidData[position]).toFixed([0]) + "%";
                break;

            case "Kitchen":
                document.getElementById('tempKitchen').innerHTML = referData[position][0]['y'].toFixed([0]);
                document.getElementById('humKitchen').innerHTML = Number(humidData[position]).toFixed([0]) + "%";
                break;
            
            case "Outdoor":
                document.getElementById('outdoorTemp').innerHTML = "Temp: " + referData[position][0]['y'].toFixed([0]) + "&deg";
                document.getElementById('outdoorHum').innerHTML = "Humd: " + Number(humidData[position]).toFixed([0]) + "%";
                break;
        }


    });

     //sensor 5, last reading
}

function checkAlerts () {

    var checkAlert = "";
    var alertMsg = "No message available";
    var systemMode = document.getElementById('systemMode');
    var systemStatus = document.getElementById('systemStatus');

     $.ajax({
       url : "http://api.wun derground.com/api/15b4ef203516fcdb/alerts/q/VA/Farmville.json",
        dataType : "jsonp",
        success : function(parsed_json) {
            try {  // incase description is undefined, which it will be 95% of the time 
                if (parsed_json['alerts'][0]['description'] != undefined) {
                    checkAlert= parsed_json['alerts'][0]['description'];
                    alertType = parsed_json['alerts'][0]['type'];
                
                    alertMsg =  parsed_json['alerts'][0]['message'];
                    var mainWindow = document.getElementById('mainWindow');
                    mainWindow.style = "visibility: hidden;";
                    var alertsWindow = document.getElementById('alertsWindow');

                    alertsWindow.style = "visibility: visible;"
                    alertsWindow.innerHTML = "<em><h1>Alert Message!</h1><h1>" + checkAlert + "</h1><h3>" + alertMsg + "</h3><hr>" + "<img height='350' width='auto' src='https://icons.wxug.com/data/640x480/2xne_severe.gif?nocache=" + ((new Date()).getTime()) + "'>"
                        + "<hr>";
                    
                    systemStatus.innerHTML = "Weather Alert<h5>" + checkAlert + "</h5>";

                    switch (alertType){

                        case "FLO":  //flood background
                            systemMode.style = "background: linear-gradient(darkblue, blue);";
                            break;
                        case "WRN":  //S tstorm warning
                            systemMode.style = "background: linear-gradient(red, yellow);";
                            break;
                        case "TOR":  //Tornado  warning
                            systemMode.style = "background: linear-gradient(red, black);";
                            break;
                        default: 
                            systemMode.style = "background: red;";
                            break;



                    }


                    setTimeout(function(){
                        alertsWindow.innerHTML = "";
                        mainWindow.style ="visibility: visible;";
                        alertsWindow.style = "visibility: hidden;";
                        }, 30000);
                }  else {
                    systemMode.style = "background: linear-gradient(black, green);"
                    systemStatus.innerHTML = "Normal"
                    alertsWindow.innerHTML = "";


                } 
            } catch (e) { //for error catching for undefined variable

            }
            
        }}); //end of ajax request
}

function updateData(referData, humidData, timeData, sensorName) {


            var tempdataRequest = new XMLHttpRequest();
            tempdataRequest.open('GET', 'http://localhost/tass/tempdata.JSON?nocache=' + ((new Date()).getTime()));
            tempdataRequest.onload = function() {
                var unitId = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

                var tempData = JSON.parse(tempdataRequest.responseText);

                for (var i=0; i < 10; i++) {    // read in temp data

                    for (j=0; j < 30; j++) {
                        referData[i][j]['y'] = (Number(tempData[unitId[i]]['temp0'][j]) - tempData['calibration'][i]) ;

                    }
                    sensorName[i] = tempData['sensorName'][i]; // reads in sensor names
                }
                // read in humidity data
                for(i=0;i < 10; i++){
                    humidData[i] = Number(tempData[unitId[i]]['humidity']);
                }

                // read in time data
                for(i=0;i < 10; i++){
                    timeData[i] = tempData[unitId[i]]['time0'];
                }




            };
            tempdataRequest.send();
            


/*
        $.ajax({
        url : "http://localhost/tass/tempdata.JSON",
        dataType : "jsonp",
        success : function(parsed_json) {
            console.log("inside success");
            console.log(parsed_json[0]['temp0'][0]['y']);
       //     for (var x=0; x < 30; x++) {
         //       referData[x][] = parsed_json['forecast']['txt_forecast']['forecastday'][0]['fcttext'];
       // }
        }
        });
        console.log("made it top here"); */
}



function sendMailNotification(subject, message) {
    //called to send mail notification using mailgun
    /*        var mailgunRequest = new XMLHttpRequest();
            mailgunRequest.open('GET', 'http://localhost/tass/mailit.php?subject=' + subject + '&message=' + message);
            mailgunRequest.onload = function() {

                var systemMode = document.getElementById('systemMode');
                var systemStatus = document.getElementById('systemStatus');

                systemMode.style = "background: linear-gradient(black, orange);"
                systemStatus.innerHTML = "HighTemp Warning <br><h6> Mailgun Fired Off</h6>";
                setTimeout(function(){
                        systemMode.style = "background: linear-gradient(black, green);";
                        systemStatus.innerHTML = "Normal";
                        }, 30000);
                  

            };
            mailgunRequest.send(); */
// delete this section in final version below and uncomment above
                var systemMode = document.getElementById('systemMode');
                var systemStatus = document.getElementById('systemStatus');
                systemMode.style = "background: linear-gradient(black, orange);"
                systemStatus.innerHTML = "HighTemp Warning <br><h6> Mailgun Fired Off</h6>";
                setTimeout(function(){
                        systemMode.style = "background: linear-gradient(black, green);";
                        systemStatus.innerHTML = "Normal";
                        }, 120000);

           
    alert(subject);
    alert(message);
// to here

}

function checkNotifications(referData) {  //function needs to be tidy'd up, need to write more effecient code with variable timeouts instead of tracker var, and check timeout first, then cycle through variable


    var message = "";
    var subject = "OverTemp Warnings";
    var tracker = window.currentTracker;
    for (i=0; i < 5; i++) {  //  i < number of refers to check
        if (checkRefer(referData[i])) {
            message += "Overtemp Warning on unit number: " + (i + 1) + " Please Check unit\r\n     (Unit avg temp is above 42 degress in the last 15 minutes)\r\n"
        }
    }

    // if tracker > 0  (ie, Notification already sent out recently, 
    // tracker == number of minutes left till next possible notification ~3 hours (1 tracker = 15 minutes))
    // subtract 1 from tracker, and return value (countdown) else--
    if (tracker > 0) {
        tracker -= 1;
    } else {
        if (message != ""){
            sendMailNotification(subject, message); // if tracker == 0, and message is not empty, sendMailNotification is called with message
            tracker = 8;  // (8* 15 min, 2 hours)
        } else {
            tracker = 0;
        }
    }
    window.currentTracker = tracker; //reset global variable for tracking


    
    

}

function checkRefer(referDataSingle) {
    // adds last 15 minutes of data, and divides by 15, if avg is over 42, return true else return false
    var ttl=0;
    var avg= 0;
    if ((referDataSingle[0]['y'] == "2000") || (referDataSingle[0]['y'] == "196.60") || (referDataSingle[0]['y'] == "-196.60")) {
        return false;
    }
    for (var i=0; i<15; i++){       
        ttl += referDataSingle[i]['y'];
        
    }
    avg = ttl/15;
    if (avg > 42) {
        return true;
    } else {
        return false;
    }

}



$(document).ready( function() {

    

    GetClock();
    setInterval(GetClock,1000);
    startup();

    
    
    //  array for chart purposes, use referData[chartNumber] to set chart temps (array is [30] deep with {x and y coords})
    var referData = 
    [[
                { x: 1, y: 41.00},
                { x: 2, y: 39.61},
                { x: 3, y: 40.16 },
                { x: 4, y: 41.12 },
                { x: 5, y: 41.12 },
                { x: 6, y: 41.01 },
                { x: 7, y: 41.02 },
                { x: 8, y: 41.10 },
                { x: 9, y: 39.08 },
                { x: 10, y: 39.10 },
                { x: 11, y: 38.10 },
                { x: 12, y: 31.15 },
                { x: 13, y: 34.12},
                { x: 14, y: 39.61},
                { x: 15, y: 40.16 },
                { x: 16, y: 56.12 },
                { x: 17, y: 59.12 },
                { x: 18, y: 41.01 },
                { x: 19, y: 42.02 },
                { x: 20, y: 63.10 },
                { x: 21, y: 39.08 },
                { x: 22, y: 39.10 },
                { x: 23, y: 38.10 },
                { x: 24, y: 31.15 },
                { x: 25, y: 38.12},
                { x: 26, y: 33.61},
                { x: 27, y: 40.16 },
                { x: 28, y: 56.12 },
                { x: 29, y: 59.12 },
                { x: 30, y: 41.01 }
    ], [
                { x: 1, y: 41.60},
                { x: 2, y: 41.61},
                { x: 3, y: 41.16 },
                { x: 4, y: 41.12 },
                { x: 5, y: 41.12 },
                { x: 6, y: 41.01 },
                { x: 7, y: 41.02 },
                { x: 8, y: 41.10 },
                { x: 9, y: 41.08 },
                { x: 10, y: 39.10 },
                { x: 11, y: 38.10 },
                { x: 12, y: 31.15 },
                { x: 13, y: 34.12},
                { x: 14, y: 39.61},
                { x: 15, y: 40.16 },
                { x: 16, y: 56.12 },
                { x: 17, y: 59.12 },
                { x: 18, y: 41.01 },
                { x: 19, y: 46.02 },
                { x: 20, y: 46.10 },
                { x: 21, y: 46.08 },
                { x: 22, y: 46.10 },
                { x: 23, y: 46.10 },
                { x: 24, y: 46.15 },
                { x: 25, y: 46.12},
                { x: 26, y: 46.61},
                { x: 27, y: 46.16 },
                { x: 28, y: 56.12 },
                { x: 29, y: 59.12 },
                { x: 30, y: 41.01 }
    ], [
                { x: 1, y: 22.12},
                { x: 2, y: 39.61},
                { x: 3, y: 40.16 },
                { x: 4, y: 41.12 },
                { x: 5, y: 41.12 },
                { x: 6, y: 41.01 },
                { x: 7, y: 42.02 },
                { x: 8, y: 41.10 },
                { x: 9, y: 39.08 },
                { x: 10, y: 39.10 },
                { x: 11, y: 28.10 },
                { x: 12, y: 21.15 },
                { x: 13, y: 24.12},
                { x: 14, y: 29.61},
                { x: 15, y: 20.16 },
                { x: 16, y: 26.12 },
                { x: 17, y: 29.12 },
                { x: 18, y: 21.01 },
                { x: 19, y: 22.02 },
                { x: 20, y: 63.10 },
                { x: 21, y: 39.08 },
                { x: 22, y: 39.10 },
                { x: 23, y: 38.10 },
                { x: 24, y: 31.15 },
                { x: 25, y: 38.12},
                { x: 26, y: 33.61},
                { x: 27, y: 40.16 },
                { x: 28, y: 56.12 },
                { x: 29, y: 59.12 },
                { x: 30, y: 41.01 }
    ], [
                { x: 1, y: 41.00},
                { x: 2, y: 41.00},
                { x: 3, y: 40.16 },
                { x: 4, y: 41.12 },
                { x: 5, y: 41.12 },
                { x: 6, y: 41.01 },
                { x: 7, y: 41.02 },
                { x: 8, y: 41.10 },
                { x: 9, y: 41.08 },
                { x: 10, y: 39.10 },
                { x: 11, y: 38.10 },
                { x: 12, y: 31.15 },
                { x: 13, y: 34.12},
                { x: 14, y: 39.61},
                { x: 15, y: 40.16 },
                { x: 16, y: 41.12 },
                { x: 17, y: 59.12 },
                { x: 18, y: 41.01 },
                { x: 19, y: 46.02 },
                { x: 20, y: 46.10 },
                { x: 21, y: 46.08 },
                { x: 22, y: 46.10 },
                { x: 23, y: 46.10 },
                { x: 24, y: 46.15 },
                { x: 25, y: 46.12},
                { x: 26, y: 46.61},
                { x: 27, y: 46.16 },
                { x: 28, y: 56.12 },
                { x: 29, y: 59.12 },
                { x: 30, y: 41.01 }
    ], [
                { x: 1, y: 44.12},
                { x: 2, y: 44.61},
                { x: 3, y: 44.16 },
                { x: 4, y: 44.12 },
                { x: 5, y: 59.12 },
                { x: 6, y: 44.01 },
                { x: 7, y: 44.02 },
                { x: 8, y: 44.10 },
                { x: 9, y: 44.08 },
                { x: 10, y: 44.10 },
                { x: 11, y: 44.10 },
                { x: 12, y: 44.15 },
                { x: 13, y: 44.12},
                { x: 14, y: 44.61},
                { x: 15, y: 44.16 },
                { x: 16, y: 26.12 },
                { x: 17, y: 29.12 },
                { x: 18, y: 21.01 },
                { x: 19, y: 22.02 },
                { x: 20, y: 63.10 },
                { x: 21, y: 39.08 },
                { x: 22, y: 39.10 },
                { x: 23, y: 38.10 },
                { x: 24, y: 31.15 },
                { x: 25, y: 38.12},
                { x: 26, y: 33.61},
                { x: 27, y: 40.16 },
                { x: 28, y: 56.12 },
                { x: 29, y: 59.12 },
                { x: 30, y: 41.01 }
    ], [
                { x: 1, y: 55.12},
                { x: 2, y: 39.61},
                { x: 3, y: 38.16 },
                { x: 4, y: 36.12 },
                { x: 5, y: 39.12 },
                { x: 6, y: 31.01 },
                { x: 7, y: 32.02 },
                { x: 8, y: 31.10 },
                { x: 9, y: 39.08 },
                { x: 10, y: 39.10 },
                { x: 11, y: 38.10 },
                { x: 12, y: 31.15 },
                { x: 13, y: 34.12},
                { x: 14, y: 39.61},
                { x: 15, y: 30.16 },
                { x: 16, y: 36.12 },
                { x: 17, y: 39.12 },
                { x: 18, y: 31.01 },
                { x: 19, y: 46.02 },
                { x: 20, y: 42.10 },
                { x: 21, y: 42.08 },
                { x: 22, y: 41.10 },
                { x: 23, y: 42.10 },
                { x: 24, y: 41.15 },
                { x: 25, y: 42.12},
                { x: 26, y: 42.61},
                { x: 27, y: 41.16 },
                { x: 28, y: 42.12 },
                { x: 29, y: 40.12 },
                { x: 30, y: 41.01 }
    ], [
                { x: 1, y: 82.12},
                { x: 2, y: 39.61},
                { x: 3, y: 40.16 },
                { x: 4, y: 56.12 },
                { x: 5, y: 59.12 },
                { x: 6, y: 41.01 },
                { x: 7, y: 42.02 },
                { x: 8, y: 41.10 },
                { x: 9, y: 39.08 },
                { x: 10, y: 43.10 },
                { x: 11, y: 43.10 },
                { x: 12, y: 43.15 },
                { x: 13, y: 43.12},
                { x: 14, y: 43.61},
                { x: 15, y: 43.16 },
                { x: 16, y: 43.12 },
                { x: 17, y: 43.12 },
                { x: 18, y: 43.01 },
                { x: 19, y: 43.02 },
                { x: 20, y: 43.10 },
                { x: 21, y: 43.08 },
                { x: 22, y: 43.10 },
                { x: 23, y: 38.10 },
                { x: 24, y: 31.15 },
                { x: 25, y: 38.12},
                { x: 26, y: 33.61},
                { x: 27, y: 40.16 },
                { x: 28, y: 56.12 },
                { x: 29, y: 59.12 },
                { x: 30, y: 41.01 }
    ], [
                { x: 1, y: 99.12},
                { x: 2, y: 39.61},
                { x: 3, y: 40.16 },
                { x: 4, y: 56.12 },
                { x: 5, y: 59.12 },
                { x: 6, y: 41.01 },
                { x: 7, y: 42.02 },
                { x: 8, y: 41.10 },
                { x: 9, y: 39.08 },
                { x: 10, y: 43.10 },
                { x: 11, y: 43.10 },
                { x: 12, y: 43.15 },
                { x: 13, y: 43.12},
                { x: 14, y: 43.61},
                { x: 15, y: 43.16 },
                { x: 16, y: 43.12 },
                { x: 17, y: 43.12 },
                { x: 18, y: 43.01 },
                { x: 19, y: 43.02 },
                { x: 20, y: 43.10 },
                { x: 21, y: 43.08 },
                { x: 22, y: 43.10 },
                { x: 23, y: 38.10 },
                { x: 24, y: 31.15 },
                { x: 25, y: 38.12},
                { x: 26, y: 33.61},
                { x: 27, y: 40.16 },
                { x: 28, y: 56.12 },
                { x: 29, y: 59.12 },
                { x: 30, y: 41.01 }
    ], [
                { x: 1, y: 88.12},
                { x: 2, y: 39.61},
                { x: 3, y: 40.16 },
                { x: 4, y: 56.12 },
                { x: 5, y: 59.12 },
                { x: 6, y: 41.01 },
                { x: 7, y: 42.02 },
                { x: 8, y: 41.10 },
                { x: 9, y: 39.08 },
                { x: 10, y: 43.10 },
                { x: 11, y: 43.10 },
                { x: 12, y: 43.15 },
                { x: 13, y: 43.12},
                { x: 14, y: 43.61},
                { x: 15, y: 43.16 },
                { x: 16, y: 43.12 },
                { x: 17, y: 43.12 },
                { x: 18, y: 43.01 },
                { x: 19, y: 43.02 },
                { x: 20, y: 43.10 },
                { x: 21, y: 43.08 },
                { x: 22, y: 43.10 },
                { x: 23, y: 38.10 },
                { x: 24, y: 31.15 },
                { x: 25, y: 38.12},
                { x: 26, y: 33.61},
                { x: 27, y: 40.16 },
                { x: 28, y: 56.12 },
                { x: 29, y: 59.12 },
                { x: 30, y: 41.01 }
    ], [
                { x: 1, y: 45.12},
                { x: 2, y: 39.61},
                { x: 3, y: 40.16 },
                { x: 4, y: 56.12 },
                { x: 5, y: 59.12 },
                { x: 6, y: 41.01 },
                { x: 7, y: 42.02 },
                { x: 8, y: 41.10 },
                { x: 9, y: 39.08 },
                { x: 10, y: 43.10 },
                { x: 11, y: 43.10 },
                { x: 12, y: 43.15 },
                { x: 13, y: 43.12},
                { x: 14, y: 43.61},
                { x: 15, y: 43.16 },
                { x: 16, y: 43.12 },
                { x: 17, y: 43.12 },
                { x: 18, y: 43.01 },
                { x: 19, y: 43.02 },
                { x: 20, y: 43.10 },
                { x: 21, y: 43.08 },
                { x: 22, y: 43.10 },
                { x: 23, y: 38.10 },
                { x: 24, y: 31.15 },
                { x: 25, y: 38.12},
                { x: 26, y: 33.61},
                { x: 27, y: 40.16 },
                { x: 28, y: 56.12 },
                { x: 29, y: 59.12 },
                { x: 30, y: 41.01 }
    ]];
    var timeData = ["19:01:37","18:57:37","19:02:37","19:03:37","19:04:37","01:02:37","01:02:37","01:02:37","01:02:37"];
    var humidData = ["40.00", "40.00","40.00", "40.00","40.00", "40.00","98.00", "88.00","87.00", "50.00", "60.00"];
    var sensorName = ["Walk-in", "Prep-Reach-In", "Prep-Bayunit", "Cook-Bayunit", "Pizza-Prep", "Outdoor", "Front", "Middle", "Kitchen", "LightSensor"];
 /* this section is for creating object charts 1 - 5,  baseChart changes all chart baselines */
    var maxTemp = 41;
    var numOfCharts = 5;
    var baseChart =         {                    
            backgroundColor: "skyblue",
            title: {
                 text: ""
            },
            axisX: {
                valueFormatString: "#",
                interval:3,
                title:"minutes ago",
                labelFontSize: 10
            },
            axisY:{
                labelFontSize: 10,
                interval: 10,
                
                stripLines: [
                            {
                                value:42,
                                color:"red",
                                label : maxTemp + String.fromCharCode(176),
                                thickness:.7,
                                labelBackgroundColor:"skyblue",
                                labelColor: "red",
                                labelFontSize: 17
                            }
                            ]
            },
            data: [
            {
                type: "spline",
                dataPoints: [
                { x: 1, y: 41.12},
                ]
            }
            ]
    };

    var chart = [];  //temp chart array

    for (var i=1; i <= numOfCharts; i++) { //creates new charts, with incremental names (1- numOfCharts)
        
        chart.push(new CanvasJS.Chart("referChart" + i, baseChart));
    };

    for (var i=0; i < numOfCharts; i++) { // initially renders chart data with 1 datapoint ()
        chart[i].render();
    };
   

    setInterval(updateTChart, 32000, chart, referData, numOfCharts, sensorName, timeData, humidData); //to alter charts, change data in referData arrays
    setTimeout(updateFB, 10000); //updates timeout in function
    setInterval(updateWU, (8*60*1000));  //8 minutes update radar
    setInterval(updateForecast1, (2*60*60*1000 )); //2 hours update forecast
    setInterval(checkAlerts, (6*60*1000)) //6 minutes update alerts
    setInterval(updateData, (29000), referData, humidData, timeData, sensorName); //updates sensor data from json file
    setTimeout(checkNotifications, (15*60*1000), referData);  //checks 15 min if notificatons need to be sent for overtemps
    setTimeout(updateForecast1, 17000); //initial update



});




