<?php
/*
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
*/
?>

<?php
session_start();

$servername = "localhost";
$username = "katariina";
$password = "Koira123";
$database = "cv";

// Create connection
$dbconnect = mysqli_connect($servername, $username, $password, $database);

//Jotta ä ja ö näkyisivät oikein phpmyadminisissa  
mysqli_set_charset($dbconnect,'utf8');

// Check connection
if (!$dbconnect) {
  die("Yhteys tietokantaan ei toimii: " . mysqli_connect_error()); 
} else {
  //echo "Yhteys tietokantaan toimii "; 
}

//check captcha
$recaptcha = $_POST['g-recaptcha-response'];
$res = reCaptcha($recaptcha);
if(!$res['success']){
  //error
} else {
  $name = mysqli_real_escape_string($dbconnect, $_POST['name']);
  $email = mysqli_real_escape_string($dbconnect, $_POST['email']);
  $message = mysqli_real_escape_string($dbconnect, $_POST['message']);
 
  //check cookie
  $hidden = mysqli_real_escape_string($dbconnect, $_POST['hidden']);
  if ($hidden === "1") {
    $value = "{$name};{$email}";
    setcookie('cookie', $value, $expires, $path, $domain);
  } else if ($hidden === "0") {
    setcookie('cookie', $value, $expires, $path, $domain, $httponly = true);
  }

  //sql-kysely
  mysqli_query($dbconnect,"INSERT INTO `feedback` (`NAME`, `EMAIL`, `MESSAGE`) VALUES ('$name', '$email', '$message') ");
  $phpres = "sent";
  header("Location: http://ec2-13-53-169-24.eu-north-1.compute.amazonaws.com/index.html?$phpres#yhteydenotto");
  exit;
}

function reCaptcha($recaptcha){
  $secret = "6LfwvYAcAAAAAClvxnA_CMslVuPfzNcL66xLQ25-";
  $ip = $_SERVER['REMOTE_ADDR'];
  $postvars = array("secret"=>$secret, "response"=>$recaptcha, "remoteip"=>$ip);
  $url = "https://www.google.com/recaptcha/api/siteverify";
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_TIMEOUT, 10);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $postvars);
  $data = curl_exec($ch);
  curl_close($ch);
  return json_decode($data, true);
}

mysqli_close($dbconnect);
?>