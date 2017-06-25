<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=utf-8');

$data = file_get_contents("php://input");
$objData = json_decode($data);

$id = $objData->id;

$dns = "mysql:host=localhost;dbname=mixcarmobile";
$user = "root";
$pass = "";

try {
	$con = new PDO($dns, $user, $pass);
	if(!$con){
		echo "Não foi possivel conectar com Banco de Dados!";
	}		
	$query = $con->prepare("SELECT * FROM acessorio a JOIN carro c ON a.id_carro = c.carro_id 
                            WHERE c.carro_id = (SELECT carro_id FROM carro WHERE carro_id = '".$id."')");
		$query->execute();
		$out = "[";
		while($result = $query->fetch()){
			if ($out != "[") {
				$out .= ",";
			}
			$out .= '{"id": "'.$result["acessorio_id"].'",';
			$out .= '"acessorio_nome": "'.$result["acessorio_nome"].'",';
            $out .= '"acessorio_preco": "'.$result["acessorio_preco"].'",';
			$out .= '"id_carro": "'.$result["id_carro"].'"}';
		}
		$out .= "]";
		echo $out;
} catch (Exception $e) {
	echo "Erro: ". $e->getMessage();
};