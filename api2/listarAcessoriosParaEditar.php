<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=utf-8');

$data = file_get_contents("php://input");
$objData = json_decode($data);

$id = $objData->agendamento_id;

$dns = "mysql:host=localhost;dbname=mixcarmobile";
$user = "root";
$pass = "";

try {
	$con = new PDO($dns, $user, $pass);
	if(!$con){
		echo "Não foi possivel conectar com Banco de Dados!";
	}		
	$query = $con->prepare("SELECT a.acessorio_nome FROM acessorio a JOIN agendamento ag ON a.id_carro = ag.id_carro 
                            WHERE ag.id_carro = (SELECT id_carro FROM agendamento WHERE agendamento_id = '".$id."')");
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