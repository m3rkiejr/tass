<!DOCTYPE html>
<html>
<body>

<h1>Sensor Config and Calibration</h1>



<?php
$string = file_get_contents("./tempdata.JSON") or die("Unable to open file!");
$json_a = json_decode($string, true);

if($_GET['unitId'])
{
    echo $json_a['calibration'][($_GET['unitId'])-1] . " is current value of calibration";
    $json_a['calibration'][($_GET['unitId'])-1] =  $_GET['calibrationOffset'];
    echo "Calibration successful for" . $json_a['sensorName'][($_GET['unitId'])-1];
    echo "<br>" . "changed value: " . $json_a['calibration'][($_GET['unitId'])-1];
}
if ($_GET['unitNewName']) {
    $json_a['sensorName'][($_GET['unitIdNameChange']-1)] = substr($_GET['unitNewName'], 0, 12); //sets new sensor name after truncating to length of 12
    echo "New name changed to " . substr($_GET['unitNewName']) . "for sensorName: " .  $json_a['sensorName'][($_GET['unitIdNameChange']-1)];
}


file_put_contents("./tempdata.JSON", json_encode($json_a));
echo "success!";
echo "The time is " . date("H:i:s");

?>
<h2>the end</h2>
</body>
</html>