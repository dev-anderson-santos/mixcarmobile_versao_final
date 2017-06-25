<?php
header("Access-Control-Allow-Origin:*");
//header('Access-Control-Allow-Methods:PUT');
header("Content-Type: application/x-www-form-urlencoded");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    //RECUPERAÇÃO DO FORMULÁRIO
    $data = file_get_contents("php://input");
    $objData = json_decode($data);
    // TRANSFORMA OS DADOS
    $id = $objData->id;
    $nome = $objData->nome;
    $endereco = $objData->endereco;
    $telefone = $objData->telefone;
    $email = $objData->email;
    $senha = $objData->senha;
    $dataNascimento = $objData->dataNascimento;
    // LIMPA OS DADOS
    $nome = stripslashes($nome);
    $endereco = stripslashes($endereco);
    $telefone = stripslashes($telefone);
    $email = stripslashes($email);
    $senha = stripslashes($senha);
    $dataNascimento = stripslashes($dataNascimento);
    
    $id = trim($id);
    $nome = trim($nome);
    $endereco = trim($endereco);
    $telefone = trim($telefone);
    $email = trim($email);
    $senha = trim($senha);
    $dataNascimento = trim($dataNascimento);
    $dados; // RECEBE ARRAY PARA RETORNO
    // INSERE OS DADOS
    @$db = new PDO("mysql:host=localhost;dbname=mixcarmobile", "root", "");
   //VERIFICA SE TEM CONEXÃO
    if($db){
        $sql = " UPDATE usuario SET usuario_nome='".$nome."', usuario_endereco='".$endereco."', 
                                    usuario_telefone='".$telefone."', usuario_email='".$email."', 
                                    usuario_senha='".$senha."', usuario_dataNascimento='".$dataNascimento."' 
                                    WHERE usuario_id =".$id;
        $query = $db->prepare($sql);
        $query ->execute();
        if(!$query){
                   $dados = array('mensage' => "Não foi possivel editar os dados ");
                   echo json_encode($dados);
         }
        else{
                   $dados = array('mensage' => "Os dados foram editados com sucesso.");
                  echo json_encode($dados);
         };
    }
   else{
          $dados = array('mensage' => "Não foi possivel editar os dados! Tente novamente mais tarde.");
          echo json_encode($dados);
    };