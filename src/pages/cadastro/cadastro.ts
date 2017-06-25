import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Carro } from "../../domain/carro/Carro";
//import { Http } from "@angular/http";
import { HomePage } from "../home/home";
import { Agendamento } from "../../domain/agendamento/Agendamento";
import { AgendamentoService } from "../../domain/agendamento/agendamento-service";
//import { Vibration, DatePicker } from 'ionic-native';
import { Usuario } from "../../domain/usuario/Usuario";
import { ServiceProvider } from "../../providers/service-provider";
import { DatePicker } from "ionic-native/dist/es5";

@Component({
  templateUrl: 'cadastro.html'
})
export class CadastroPage {

  public carro: Carro;
  public usuario: Usuario;
  public precoTotal: number;
  public agendamento: Agendamento;
  public agendamentos: Agendamento[];
  public horarios: string[];
  //public status: boolean;

  private _alerta: Alert;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams, 
      private _service: AgendamentoService,
      private _alertCtrl: AlertController,
      private _serviceProvider: ServiceProvider) {

    /*this.status = this.navParams.get('oStatus');
    console.log(this.status);*/
    this.carro = this.navParams.get('carro');
    //let agendamento2 = this.navParams.get('agendamentoSelecionado');
    this.precoTotal = this.navParams.get('precoTotal');    
    this.agendamento = new Agendamento(null, this.precoTotal, new Date().toISOString(), '09:00', true, this.carro, this._serviceProvider.obterUsuarioLogado().id);
    
    this.horarios = ['09:30', '09:45', '10:30', '10:45', '14:00', '14:45', '15:30'];
    
    this._alerta = this._alertCtrl.create({
        title: 'Aviso',
        buttons: [{text: 'Ok', handler: () => {
          this.navCtrl.setRoot(HomePage)
        }}]
    });

    //this.agendaOuAtualiza();

  }

  agendaOuAtualiza() {
    /*if(this.status) {
      this.atualizaAgendamento();
    } else {*/
      this.agenda();
    //}
  }

  agenda() {
   
      return this._serviceProvider.salvarAgendamento(this.agendamento)
      .subscribe(
        data => {
          //console.log("Sucesso: " + data);
          this._alerta.setSubTitle('Agendamento efetuado com sucesso!');
          this._alerta.present();
        },
        err => {
          console.log("Erro: " + err);
          this._alerta.setSubTitle('Não foi possivel realizar o agendamento. Tente mais tarde.');
          this._alerta.present();
        }
      )
  }
     
  selecionaData() {
    
    DatePicker.show({
      date: new Date(),
      mode: 'date'      
    })
    .then(data => {
      this.agendamento.data = data.toISOString();
    })
  }

}
