<!DOCTYPE html>
<html>
<body>

<h1>Sensor Update</h1>



<?php
$string = file_get_contents("./tempdata.JSON") or die("Unable to open file!");
$json_a = json_decode($string, true);


$json_a[$_GET['unitId']]['time0'] = date("H:i:s");
array_pop($json_a[$_GET['unitId']]['temp0']);
array_unshift($json_a[$_GET['unitId']]['temp0'], $_GET['currentTemp']);
if($_GET['humidity'])
{
    $json_a[$_GET['unitId']]['humidity'] = $_GET['humidity'];
}
echo $json_a;

file_put_contents("./tempdata.JSON", json_encode($json_a));
echo "success!";
echo "The time is " . date("H:i:s");

?>
<h2>the end</h2>
</body>
</html>