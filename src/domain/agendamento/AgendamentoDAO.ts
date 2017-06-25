import { Injectable } from "@angular/core";
import { Agendamento } from "./Agendamento";
import { Storage } from '@ionic/storage';

@Injectable()
export class AgendamentoDAO {

    constructor(private _storage: Storage) {

    }
    private _getKey(agendamento: Agendamento) {
        
        return agendamento.horario + agendamento.data.substr(0, 10);
    }

    salva(agendamento: Agendamento) {

        return this._storage.set(this._getKey(agendamento), agendamento);
    }

    agendamentoDuplicado(agendamento: Agendamento) {
        let key = this._getKey(agendamento);
        return this._storage
            .get(key)
            .then(dado => {
                return dado ? true : false;
            })
    }

    /*listaTodos() {

        this._serviceProvider
            .getListarCarrosAgendados(this._serviceProvider.obterUsuarioLogado())
            .forEach(dado => {
              let agendamento = new Agendamento(
                dado.agendamento_id, 
                dado.agendamento_valor, 
                dado.agendamento_data, 
                dado.agendamento_horario,
                dado.agendamento_confirmado, 
                dado.id_carro, 
                dado.id_usuario
              );

              
            })
            .then(agendamentos => {
                //console.log(agendamento);                
                
              }, err => {
                console.log("Erro ao retornar lista de agendamentos: " + err);
              });
    }*/
}