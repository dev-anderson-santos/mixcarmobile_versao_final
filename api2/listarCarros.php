<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=utf-8');
$dns = "mysql:host=localhost;dbname=mixcarmobile";
$user = "root";
$pass = "";
try {
	$con = new PDO($dns, $user, $pass);
	if(!$con){
		echo "Não foi possivel conectar com Banco de Dados!";
	}		
	$query = $con->prepare('SELECT * FROM carro');
		$query->execute();
		$out = "[";
		while($result = $query->fetch()){
			if ($out != "[") {
				$out .= ",";
			}
			$out .= '{"id": "'.$result["carro_id"].'",';
			$out .= '"modelo": "'.$result["carro_modelo"].'",';
			$out .= '"preco": "'.$result["carro_preco"].'",';
			$out .= '"img": "'.$result["carro_img"].'"}';
		}
		$out .= "]";
		echo $out;
} catch (Exception $e) {
	echo "Erro: ". $e->getMessage();
};