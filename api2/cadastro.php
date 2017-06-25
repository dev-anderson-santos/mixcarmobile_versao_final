<?php
//ESTA API ESTÁ UTILIZANDO O BENCO DE DADOS AULA COM A TABELA
//USUÁRIOS E UTILIZA ENVIO E RETORNO EM OBJETOS
header("Access-Control-Allow-Origin:*");
header("Content-Type: application/x-www-form-urlencoded");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    //RECUPERAÇÃO DO FORMULÁRIO
    $data = file_get_contents("php://input");
    $objData = json_decode($data);
    // TRANSFORMA OS DADOS
    $nome = $objData->nome;
    $endereco = $objData->endereco;
    $telefone = $objData->telefone;
    $cpf = $objData->cpf;
    $email = $objData->email;
    $senha = $objData->senha;
    $dataNascimento = $objData->dataNascimento;
    // LIMPA OS DADOS
    $nome = stripslashes($nome);
    $endereco = stripslashes($endereco);
    $telefone = stripslashes($telefone);
    $cpf = stripslashes($cpf);
    $email = stripslashes($email);
    $senha = stripslashes($senha);
    $dataNascimento = stripslashes($dataNascimento);
    
    $nome = trim($nome);
    $endereco = trim($endereco);
    $telefone = trim($telefone);
    $cpf = trim($cpf);
    $email = trim($email);
    $senha = trim($senha);
    $dataNascimento = trim($dataNascimento);
    $dados; // RECEBE ARRAY PARA RETORNO
    // INSERE OS DADOS
    @$db = new PDO("mysql:host=localhost;dbname=mixcarmobile", "root", "");
   //VERIFICA SE TEM CONEXÃO
    if($db){
        //$sql = " insert into usuarios values(NULL,' ".$nome." ',' " .$email." ',' ".md5($senha)." ' )";
        /*$sql_verifica = "SELECT * FROM usuario WHERE usuario_email = '".$email."'";
        $query_verifica = $db->prepare($sql_verifica);
        $query_verifica->execute();

        if($query_verifica) {
            $dados = array('mensage' => "E-mail ja cadastrado.");
                   echo json_encode($dados);
        } else {
            $dados = array('mensage' => "E-mail nao cadastrado.");
                   echo json_encode($dados);
        }*/
            $sql = " INSERT INTO usuario (usuario_nome, " 
                                    ."usuario_endereco, "
                                    ."usuario_telefone, "
                                    ."usuario_cpf, "
                                    ."usuario_email, "
                                    ."usuario_senha, "
                                    ."usuario_dataNascimento) VALUES(' "
                                    .$nome." ', '".$endereco." ', '".$telefone." ', '".$cpf." ', '".$email." ', '".$senha." ', '".$dataNascimento."')";
            $query = $db->prepare($sql);
            $query->execute();
            if(!$query){
                       $dados = array('mensage' => "Nao foi possivel enviar os dados ");
                       echo json_encode($dados);
             }
            else{
                       $dados = array('mensage' => "$nome foi inserido com sucesso.");
                      echo json_encode($dados);
             };

        //}
        
    }
   else{
          $dados = array('mensage' => "Não foi possivel iserir os dados! Tente novamente mais tarde.");
          echo json_encode($dados);
    };