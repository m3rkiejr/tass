<!DOCTYPE html>
<html>
<body>

<h1>My third! PHP page</h1>



<?php

// next step, use get request to send mailer stuff from js file to php file, then separate function to test mailer, then intergrate but turn off inline function, get to work

# Include the Autoloader (see "Libraries" for install instructions)
require 'vendor/autoload.php';
use Mailgun\Mailgun;

# Instantiate the client.
$mgClient = new Mailgun('key-7792e480b7da740d18a4ccba2c6fd187');
$domain = "sandbox0ef229343e404c4aa58b12b2fd196112.mailgun.org";


$subject = $_GET['subject'];
$message = $_GET['message'];


# Make the call to the client.
$result = $mgClient->sendMessage($domain, array(
    'from'    => 'TasSystem TempAlert <mailgun@sandbox0ef229343e404c4aa58b12b2fd196112.mailgun.org>',
    'to'      => 'Merks <merksplace99@gmail.com>',
    'subject' => $subject,
    'text'    => "TasSystem temp alert:",
    'html'    => $message
));


?>
<h2>the end</h2>
</body>
</html>