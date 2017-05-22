<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title></title>
    </head>
    <body>
       
        <div style="font-size:23px"> 
            <form action="./tempdata2.php" method="get">
                <h2>Sensor Calibration</h2>
            SensorNumber: <input type="text" name="unitId"><br>
            Calibration Offset (negative numbers to increase, positive to decrease)<br>
            For ex.  current 34 Degrees, desired, 32 offset would be positive 2 degrees</br>
            Enter offset here: <input type="text" name="calibrationOffset"><br>
            
                <h2>Sensor Name Change</h2>
                <h3>Name change for Refer only on sensor 1-6, and Outdoor, Front, Middle, and Kitchen only for 6-10</h3>

            SensorNumber: <input type="text" name="unitIdNameChange"><br>
            Enter New Name here(limit 12 Characters): <input type="text" name="unitNewName"><br>
            <input type="submit">
            </form>
        </div>

              
    </body>
</html>
