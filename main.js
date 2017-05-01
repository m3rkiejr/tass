
tday=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
tmonth=new Array("January","February","March","April","May","June","July","August","September","October","November","December");

function GetClock(){
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

function updateChart(chart1, referData) {
    // check if sensor is dead, or sending bad info, if so, do not render new data, instead disconnect error, or sensor data error
    chart1.options.data[0].dataPoints = referData;  //next step is to create json to pull data into an array referData and parse the config file
    chart1.render();
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





$(document).ready(function() {

    // globals
    

    GetClock();
    setInterval(GetClock,1000);
    
    // temp array for chart purposes but final version will use referData[] to set chart temps
    referData = 
    [[
                { x: 1, y: 45.12},
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
                { x: 1, y: 45.12},
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
                { x: 1, y: 45.12},
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
                { x: 1, y: 45.12},
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
                { x: 1, y: 45.12},
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
                { x: 1, y: 35.12},
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
    ]];
 /* this section is for creating object charts 1 - 5,  baseChart changes all charts */
    var maxTemp = 41;
    var numOfCharts = 5;
    var baseChart =         {                    
            backgroundColor: "skyblue",
            axisX: {
                valueFormatString: "#",
                interval:3,
                labelFontSize: 10
            },
            axisY:{
                labelFontSize: 10,
                interval: 10,

                stripLines: [
                            {
                                value:41,
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

    var chart = new Array();

    for (var i=1; i <= numOfCharts; i++) {
        
        chart.push(new CanvasJS.Chart("referChart" + i, baseChart));
    };

    for (var i=0; i < numOfCharts; i++) {
        chart[i].render();
    };
    var ref=0;
    for (var i=0;i < numOfCharts; i++) {
        setInterval(updateChart, 51000, chart[i], referData[ref++]);

    }
 
});




