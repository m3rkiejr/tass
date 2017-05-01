
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
    //drawCanvas(1);
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
    ], []];
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
                labelFontSize: 20,
                interval: 5,
                minimum: 30,
                maximum:50,
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
/*
    var chart = [new CanvasJS.Chart("referChart" + 1, baseChart)];
    chart[0].render();
    */
    var chart = new Array();

    for (var i=1; i <= numOfCharts; i++) {
        
        chart.push(new CanvasJS.Chart("referChart" + i, baseChart));
    };

    for (var i=0; i < numOfCharts; i++) {
        chart[i].render();
    };

    

/*
//create chart 1
    var chart1 = new CanvasJS.Chart("referChart1", baseChart);
// chart 2
    var chart2 = new CanvasJS.Chart("referChart2", baseChart);
//chart 3
    var chart3 = new CanvasJS.Chart("referChart3", baseChart);
 //chart 4
    var chart4 = new CanvasJS.Chart("referChart4", baseChart);
// chart 5
    var chart5 = new CanvasJS.Chart("referChart5", baseChart);

    chart1.render();
    chart2.render();
    chart3.render();
    chart4.render();
    chart5.render();

    setInterval(updateChart, 51000, chart1, referData[0]);
    setInterval(updateChart, 52000, chart2, referData[0]);
    setInterval(updateChart, 52200, chart3, referData[0]);
    setInterval(updateChart, 54500, chart4, referData[0]);
    setInterval(updateChart, 54800, chart5, referData[0]);
    */

});




