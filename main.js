
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

function redraw(chart) {
    chart.render();
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
    GetClock();
    setInterval(GetClock,1000);
    //drawCanvas(1);


    //create chart 1
    var chart = new CanvasJS.Chart("referCanvas1",
        {
            animationEnabled: true,
            backgroundColor: "skyblue",
            /*title:{
            text: "Refer 1",
            fontSize: 30
            },*/
            axisX: {
                valueFormatString: "MMM",
                interval:1,
                intervalType: "month"
            },
            axisY:{
                includeZero: false

            },
            data: [
            {
                type: "spline",

                dataPoints: [
                { x: 0, y: 39.15 },
                { x: 1, y: 38.12},
                { x: 2, y: 39.61},
                { x: 3, y: 40.16 },
                { x: 4, y: 56.12 },
                { x: 5, y: 59.12 },
                { x: 6, y: 41.01 },
                { x: 7, y: 42.02 },
                { x: 8, y: 41.10 },
                { x: 9, y: 39.08 },
                { x: 10, y: 39.10 },
                { x: 11, y: 38.10 }
                ]
            }
            ]
    });

        chart.render();

});




