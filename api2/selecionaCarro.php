<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=utf-8');

$data = file_get_contents("php://input");
$objData = json_decode($data);

/*$dns = "mysql:host=mysql.hostinger.com.br;dbname=u460090852_aula";
$user = 'u460090852_ionic';
$pass = '123456';*/

$dns = "mysql:host=localhost;dbname=mixcarmobile";
$user = "root";
$pass = "";

$id = $objData->id;
$resultado;

@$con = new PDO($dns, $user, $pass);
if($con){
    
      if($query = $con->query("SELECT * FROM carro WHERE carro_id = '".$id."'")){

            $resultado = $query->fetch( MYSQLI_ASSOC );
            echo json_encode($resultado);
      }

} else {
      $resultado = array('mensage' => "Erro: Não foi possivel conectar com o banco.");
};
