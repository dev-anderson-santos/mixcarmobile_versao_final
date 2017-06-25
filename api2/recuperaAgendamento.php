<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=utf-8');

$data = file_get_contents("php://input");
$objData = json_decode($data);

$dns = "mysql:host=localhost;dbname=mixcarmobile";
$user = "root";
$pass = "";

$email = $objData->email;
try {
	$con = new PDO($dns, $user, $pass);
	if(!$con){
		echo "Não foi possivel conectar com Banco de Dados!";
	}		
    //$id_usuario = $con->prepare("SELECT usuario_id FROM usuario WHERE usuario_email = '".$email."'");
    
	$query = $con->prepare("SELECT u.usuario_nome, c.carro_img, c.carro_modelo, c.carro_preco, a.agendamento_id, a.agendamento_valor, a.agendamento_data, a.agendamento_horario
                            FROM usuario u join agendamento a on u.usuario_id = a.id_usuario
					                join carro c on c.carro_id = a.id_carro 
                            WHERE u.usuario_id = (SELECT usuario_id from usuario where usuario_email = '".$email."')");
		$query->execute();
		$out = "[";
		while($result = $query->fetch()){
			if ($out != "[") {
				$out .= ",";
			}
			$out .= '{"usuario_nome": "'.$result["usuario_nome"].'",';
			$out .= '"carro_img": "'.$result["carro_img"].'",';
            $out .= '"carro_modelo": "'.$result["carro_modelo"].'",';
            $out .= '"carro_preco": "'.$result["carro_preco"].'",';
			$out .= '"agendamento_id": "'.$result["agendamento_id"].'",';
			$out .= '"agendamento_valor": "'.$result["agendamento_valor"].'",';
            $out .= '"agendamento_data": "'.$result["agendamento_data"].'",';
			$out .= '"agendamento_horario": "'.$result["agendamento_horario"].'"}';
		}
		$out .= "]";
		echo $out;
} catch (Exception $e) {
	echo "Erro: ". $e->getMessage();
};