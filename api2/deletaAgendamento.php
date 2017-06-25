<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=utf-8');
	
	$data = file_get_contents("php://input");
	$objData = json_decode($data);

	$id = $objData->agendamento_id;

	@$db = new PDO("mysql:host=localhost;dbname=mixcarmobile", "root", "");

	if($db) {
		$query = $db->prepare("DELETE FROM agendamento WHERE agendamento_id = '".$id."'");
		$query->execute();

		echo "Agendamento excluido com sucesso!";
	}else{
		echo "Não foi possivel realizar a oparação!";
	}