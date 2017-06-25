import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Agendamento } from "../../domain/agendamento/Agendamento";
import { ServiceProvider } from "../../providers/service-provider";
import { Acessorio } from "../../domain/carro/Acessorio";

@Component({
  selector: 'page-editar-escolha',
  templateUrl: 'editar-escolha.html'
})
export class EditarEscolhaPage {

  public agendamento: Agendamento;
  public acessorios: Acessorio;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _serviceProvider: ServiceProvider) {

      this.agendamento = this.navParams.get('agendamentoSelecionado');
      console.log(this.agendamento);
      this.listarAcessoriosParaEdicao();
    }

    listarAcessoriosParaEdicao() {
        this._serviceProvider
            .listarAcessoriosParaEditar(this.agendamento)
            .subscribe(acessorio => {
                this.acessorios = acessorio
            }, err => console.log(err));         
    }
}
