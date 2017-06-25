import { Carro } from "./Carro";

export class Acessorio {

    constructor(
        public id: number = 0,
        public nome: string = null, 
        public preco: number = 0,
        public carro: Carro
        ) {
        
    }
}