<?php

header("Access-Control-Allow-Origin:*");
header("Content-Type: application/x-www-form-urlencoded");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    //RECUPERAÇÃO DO FORMULÁRIO
    $data = file_get_contents("php://input");
    $objData = json_decode($data);
    // TRANSFORMA OS DADOS
    $valor = $objData->valor;
    $data = $objData->data;
    $horario = $objData->horario;
    $confirmado = $objData->confirmado;
    $id_carro = $objData->carro->id;
    $id_usuario = $objData->id_usuario;
    // LIMPA OS DADOS
    $valor = stripslashes($valor);
    $data = stripslashes($data);
    $horario = stripslashes($horario);
    $confirmado = stripslashes($confirmado);
    //$id_carro = stripslashes($id_carro);
    $id_usuario = stripslashes($id_usuario);
    
    $valor = trim($valor);
    $data = trim($data);
    $horario = trim($horario);
    $confirmado = trim($confirmado);
    //$id_carro = trim($id_carro);
    $id_usuario = trim($id_usuario);
    $dados; // RECEBE ARRAY PARA RETORNO
    // INSERE OS DADOS
    @$db = new PDO("mysql:host=localhost;dbname=mixcarmobile", "root", "");
   //VERIFICA SE TEM CONEXÃO
    if($db){
        
        $sql = "INSERT INTO agendamento (agendamento_valor, " 
                                    ."agendamento_data, "
                                    ."agendamento_horario, "
                                    ."agendamento_confirmado, "
                                    ."id_carro, "
                                    ."id_usuario) VALUES(' "
                                    .$valor." ', '".$data." ', '".$horario." ', '".$confirmado." ', '".$id_carro." ', '".$id_usuario."')";
        
        $query = $db->prepare($sql);
        $query->execute();
        if(!$query){
                   $dados = array('mensage' => "Não foi possivel enviar os dados ");
                   echo json_encode($dados);
         }
        else{
                   $dados = array('mensage' => "Agendamento realizado com sucesso.");
                  echo json_encode($dados);
         };
    }
   else{
          $dados = array('mensage' => "Não foi possivel iserir os dados! Tente novamente mais tarde.");
          echo json_encode($dados);
    };