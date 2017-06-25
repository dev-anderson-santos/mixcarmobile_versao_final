<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=utf-8');

$data = file_get_contents("php://input");
$objData = json_decode($data);

$dns = "mysql:host=localhost;dbname=mixcarmobile";
$user = "root";
$pass = "";

$email = $objData->email;
$senha = $objData->senha;
//$senha_informada = md5($senha);
$senha_informada = $senha;
$resultado;

@$con = new PDO($dns, $user, $pass);
if($con){
	
      if($query = $con->query("SELECT * FROM usuario WHERE usuario_email = '".$email."' AND usuario_senha = '".$senha_informada."'")){

            $resultado = $query->fetch( MYSQLI_ASSOC );
            echo json_encode($resultado);
      } else {
            $resultado = array('mensage' => "Erro: Usuario nao cadastrado.");
            echo json_encode($resultado);
      }

} else {

      $resultado = array('mensage' => "Erro: Não foi possivel conectar com o banco.");
      echo json_encode($resultado);
};
