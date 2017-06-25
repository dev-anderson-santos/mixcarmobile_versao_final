import { Component } from '@angular/core';
import { NavParams, NavController} from 'ionic-angular';
import { Carro } from "../../domain/carro/Carro";
import { CadastroPage } from '../cadastro/cadastro';
import { Acessorio } from '../../domain/carro/Acessorio';
import { ServiceProvider } from "../../providers/service-provider";

@Component({
    templateUrl: 'escolha.html'
})
export class EscolhaPage {

    public carro: Carro;
    public acessorios: Acessorio[];
    private _precoTotal: number;

    constructor(
        public navParams: NavParams, 
        public navCtrl: NavController,
        private _serviceProvider: ServiceProvider) {
        
            this.carro = this.navParams.get('carroSelecionado'); 
            //console.log(this.carro.id);
            this._precoTotal = this.carro.preco;
            console.log((this._precoTotal * 1) + 2);
            this.listarAcessorios();
                         
    }

    get precoTotal() {
        
        return this._precoTotal;
    }

    atualizaTotal(ligado: boolean, acessorio: number) {
        ligado ? 
        this._precoTotal = ((this._precoTotal * 1) + (acessorio * 1)) : 
        this._precoTotal = ((this._precoTotal * 1) - (acessorio * 1));
        
    }

    avancaNoAgendamento() {
        this.navCtrl.push(CadastroPage, { 
            carro: this.carro,
            precoTotal: this._precoTotal
        });
    }

    listarAcessorios() {
        this._serviceProvider
            .listarAcessorios(this.carro)
            .subscribe(acessorio => {
                this.acessorios = acessorio
            }, err => console.log(err));         
    }

}