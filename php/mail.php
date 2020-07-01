<?php

$name = $_POST['name'];
$email = $_POST['email'];
$msg =
  $_POST['message'];


$subject    = 'E-mail from mdriaz.ml'; // Subject of your email
$to         = 'bpimdriaz@gmail.com'; //Your e-mail address
$from         = $email; //Your e-mail address
$headers    = 'MIME-Version: 1.0' . "\r\n" .
  'Content-type: text/html; charset=iso-8859-1' . "\r\n";
$message    = 'Name: ' . $name . ' <br/>' .
  'E-mail: ' . $email . ' <br/>' .
  'Message: ' . $msg;




echo json_encode($message);


// if (@mail($to, $from, $subject, $message, $headers))
// {
//   echo 'sent';
// }
// else
// {
//   echo 'failed';
// }
