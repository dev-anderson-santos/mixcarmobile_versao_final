
import { Carro } from "../carro/Carro";

export class Agendamento {

    constructor(
        public id : number = 0,
        public valor: number = 0,
        public data: string = new Date().toISOString(),
        public horario: string = '09:00',
        public confirmado: boolean = false,
        public carro: Carro,
        public id_usuario: number,
        ){
    }

 }