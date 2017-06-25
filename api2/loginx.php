<?php
    
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=utf-8');

$data = file_get_contents("php://input");
$objData = json_decode($data);

$dns = "mysql:host=mysql.hostinger.com.br;dbname=u530901205_mixdb";
$user = "u530901205_root";
$pass = "qwe123..";

$email = $objData->email;
$senha = $objData->senha;

@$con = new PDO($dns, $user, $pass);
if($con){
	
      $query = $con->query("SELECT * FROM usuario WHERE usuario_email = '".$email."' AND usuario_senha = '".$senha."'");


} 

?>