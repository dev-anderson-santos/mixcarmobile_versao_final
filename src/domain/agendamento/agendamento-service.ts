import { Http } from "@angular/http";
import { Agendamento } from "./Agendamento";
import { Injectable } from "@angular/core";
import { AgendamentoDAO } from "./AgendamentoDAO";

@Injectable()
export class AgendamentoService {

    constructor(public _http: Http, private _agendamentoDAO: AgendamentoDAO) {
        
    }

    agendaService(agendamento: Agendamento) {
        // Mudar a key pois os campos email e senha não existem mais..
        //let key = agendamento.horario + agendamento.data.substr(0, 10);
        
        agendamento.confirmado = true;
        
        return this._agendamentoDAO.agendamentoDuplicado(agendamento)
            .then(existe => {
                if(existe) {
                    throw new Error('Este agendamento já foi realizado.');
                }
                    this._agendamentoDAO.salva(agendamento);
                                                
            })
    }
}