import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AgendamentoDAO } from "../../domain/agendamento/AgendamentoDAO";
import { Agendamento } from "../../domain/agendamento/Agendamento";
import { ServiceProvider } from "../../providers/service-provider";
import { DetalhesAgendamentoPage } from "../detalhes-agendamento/detalhes-agendamento";

@Component({
  templateUrl: 'agendamentos.html'
})
export class AgendamentosPage implements OnInit{

  public agendamentos: Agendamento[];
  public teste: string = "teste";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private _agendamentoDAO: AgendamentoDAO,
    private _serviceProvider: ServiceProvider) {

    }

    ngOnInit(): void {
          
        let loader = this._loadingCtrl.create({
            content: 'Carregando agendamentos, Aguarde...',
            duration: 2500
        });

        loader.present();
        this.listarAgendamentos();
        
        loader.dismiss();
         
    }

    seleciona(agendamento) {
      this.navCtrl.push(DetalhesAgendamentoPage, {agendamentoSelecionado: agendamento});  
    }

    listarAgendamentos() {
        this._serviceProvider
            .listarCarrosAgendados(this._serviceProvider.obterUsuarioLogado())
            .subscribe(
              agendamento => {
                //console.log(agendamento);                
                this.agendamentos = agendamento
              }, err => {
                console.log("Erro ao retornar lista de agendamentos: " + err);
              });
    }

    /*listarAgendamentos2() {
        

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
              
              this.agendamentos.push(agendamento);
              
            })
            .then(() => this.agendamentos);
    }*/

}
