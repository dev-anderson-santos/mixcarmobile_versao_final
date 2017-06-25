import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Alert } from 'ionic-angular';
import { Agendamento } from "../../domain/agendamento/Agendamento";
import { ServiceProvider } from "../../providers/service-provider";
import { AgendamentosPage } from "../agendamentos/agendamentos";
import { EditarEscolhaPage } from "../editar-escolha/editar-escolha";

@Component({
  selector: 'page-detalhes-agendamento',
  templateUrl: 'detalhes-agendamento.html'
})
export class DetalhesAgendamentoPage {
  
  public agendamento: Agendamento;
  public status: boolean = true;
  private _alerta: Alert;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private _serviceProvider: ServiceProvider) {

    this.agendamento = this.navParams.get('agendamentoSelecionado');
    console.log(this.agendamento.data);

    //this.acao();
  }

  agendamentoParaSerAlterado() {
    this.status = true;
    this.navCtrl.push(EditarEscolhaPage, {
      oStatus: this.status,
      agendamentoSelecionado: this.agendamento
    });
  }

  acao() {
    this._alerta = this._alertCtrl.create({
        title: 'Aviso',
        message: 'Deseja cancelar este agendamento?',
        buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Cancelado');
        }
      },{
          text: 'Ok', 
          handler: () => {
            
            this.excluirAgendamento();  

            this._alerta = this._alertCtrl.create({
              subTitle: 'Agendamento cancelado com sucesso.',
              buttons: [{
                text: "Ok",
                handler: () => this.navCtrl.push(AgendamentosPage)
              }]
            });
            this._alerta.present();
            
          }
      }]
    });
    this._alerta.present();
  }

  excluirAgendamento() {
    
    this._serviceProvider
      .excluiAgendamento(this.agendamento)
      .subscribe(
        result => {
          console.log("Sucesso: " + result);
          
          //this._alerta.present();
        },
        err => {
          console.log("Erro: " + err)
          this._alerta.setSubTitle("Não foi possivel cancelar o agendamento. \nTente novamentemais tarde.");
          this._alerta.present();
        });
    
  }
}
