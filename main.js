
tday=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
tmonth=new Array("January","February","March","April","May","June","July","August","September","October","November","December");

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

function updateTChart(chart, referData, numOfCharts, sensorName, timeData) {  //chart 1 is chart to be rendered, referData is a array of any length containing one x and one y coord
    // check if sensor is dead, or sending bad info, if so, do not render new data, instead disconnect error, or sensor data error
    for (var i=0; i < numOfCharts;i++) {

        if (referData[i][0]["y"] == 2000) {
            chart[i].options.data[0].dataPoints = null;
            chart[i].options.backgroundColor = "black";
            chart[i].options.title.text = "Sensor Disabled: " + sensorName[i];
            chart[i].options.title.fontSize = 20;
        } else if (timeCheck(timeData[i])) {  //checks time to see if signal has been lost for more than 5 minutes
            chart[i].options.data[0].dataPoints = null;
            chart[i].options.backgroundColor = "grey";
            chart[i].options.title.text = "Signal Loss: " + sensorName[i];
            chart[i].options.title.fontSize = 20;
        } else if (Math.abs(referData[i][0]["y"]) == 196.60){  //for sensor error (sensors report -196.60 if there is an error- software reports 196.60 if error)
            chart[i].options.data[0].dataPoints = null;
            chart[i].options.backgroundColor = "orange";
            chart[i].options.title.text = "Sensor Error: " + sensorName[i];
            chart[i].options.title.fontSize = 35;
        } else if (referData[i][0]["y"] > 42) {  // check for high temps
            if ((referData[i][1]["y"] > 42) && (referData[i][2]["y"] > 42) && (referData[i][3]["y"] > 42)) { // check for last 4 min critical temp
                chart[i].options.data[0].dataPoints = referData[i];
                chart[i].options.backgroundColor = "red";
                chart[i].options.title.text = "Critical-Temp:" + sensorName[i];
                chart[i].options.title.fontSize = 14;
            } else {
                chart[i].options.data[0].dataPoints = referData[i];
                chart[i].options.backgroundColor = "#ffccd1";
                chart[i].options.title.text = "High-Temp:" + sensorName[i];
                chart[i].options.title.fontSize = 14;            
            }
        } else {
            chart[i].options.title.fontSize = 10;
            chart[i].options.title.text = sensorName[i];
            chart[i].options.data[0].dataPoints = referData[i];
            chart[i].options.backgroundColor = "skyblue";
        }
       
        chart[i].render();
    }

}

function updateFB () {
    document.getElementById('fb-window').src += '';
    
}
/*
function drawCanvas (referNum){
        var ctx = document.getElementById("refer-canvas" + referNum).getContext("2d");
        var tempUnsafe = c.getContext("2d");
//draw safeline
        tempUnsafe.moveTo(0,50);
        tempUnsafe.lineTo(200, 50);
        tempUnsafe.stroke();

        ctx.moveTo(0,100);
        ctx.lineTo(50,73);
        ctx.lineTo(80, 45);
        ctx.lineTo(124, 86);
        ctx.lineTo(144, 72);
        ctx.stroke();
}
*/





window.onload = function() {

    

    GetClock();
    setInterval(GetClock,1000);
    
    //  array for chart purposes, use referData[chartNumber] to set chart temps (array is [30] deep with {x and y coords})
    var referData = 
    [[
                { x: 1, y: 44.60},
                { x: 2, y: 39.61},
                { x: 3, y: 40.16 },
                { x: 4, y: 56.12 },
                { x: 5, y: 59.12 },
                { x: 6, y: 41.01 },
                { x: 7, y: 42.02 },
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
                { x: 1, y: 44.60},
                { x: 2, y: 43.61},
                { x: 3, y: 44.16 },
                { x: 4, y: 44.12 },
                { x: 5, y: 45.12 },
                { x: 6, y: 43.01 },
                { x: 7, y: 42.02 },
                { x: 8, y: 41.10 },
                { x: 9, y: 49.08 },
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
                { x: 4, y: 56.12 },
                { x: 5, y: 59.12 },
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
                { x: 1, y: 2000},
                { x: 2, y: 49.61},
                { x: 3, y: 40.16 },
                { x: 4, y: 46.12 },
                { x: 5, y: 49.12 },
                { x: 6, y: 41.01 },
                { x: 7, y: 42.02 },
                { x: 8, y: 41.10 },
                { x: 9, y: 49.08 },
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
                { x: 1, y: 44.12},
                { x: 2, y: 39.61},
                { x: 3, y: 40.16 },
                { x: 4, y: 56.12 },
                { x: 5, y: 59.12 },
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
    var timeData = ["03:49:37am","03:58:37am","03:45:37am","03:34:37am","03:49:37am","01:02:37am","01:02:37am","01:02:37am","01:02:37am"];
    var humidData = ["40.00", "40.00","40.00", "40.00","40.00", "40.00","40.00", "40.00","40.00"];
    var sensorName = ["Walk-in", "Prep-Reachin", "Prep-Bayunit", "Cooks-Bayunit", "Pizza-Prep"];
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
   

    setInterval(updateTChart, 6000, chart, referData, numOfCharts, sensorName, timeData); //to alter charts, change data in referData arrays
    setInterval(updateFB, 6000000); //updates FB iframe every 10 minutes, will fix with better code later

  
 
};




