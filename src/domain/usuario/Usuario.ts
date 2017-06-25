export class Usuario {
    constructor(
        public id: number = 0,
        public nome: string = null,
        public endereco: string = null,
        public telefone: string = null,
        public cpf: string = null,
        public email: string = null,
        public senha: string = null,
        public dataNascimento: string = null){

    }
}