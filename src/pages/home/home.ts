import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { EscolhaPage } from '../../pages/escolha/escolha';
//import { Carro } from "../../domain/carro/Carro";
import { ServiceProvider } from "../../providers/service-provider";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
    
  public carros: any[];

   constructor(
     public navCtrl: NavController, 
     private _http: Http,
     private _loadingCtrl: LoadingController,
     private _alertCtrl: AlertController,
     public serviceProvider: ServiceProvider) {

       //this.getCarros();
     }

    ngOnInit(): void {
          
        let loader = this._loadingCtrl.create({
            content: 'Buscando novos carros, Aguarde...',
            duration: 2000
        });

        loader.present();
        this.getCarros();
        
        loader.dismiss();
         
    }

    getCarros() {
      this.serviceProvider.getListarCarros().subscribe(
        data => this.carros = data, 
        err => {
            this._alertCtrl
              .create({
                title: 'Falha na conexao',
                buttons: [{text: 'Ok'}],
                subTitle: 'Não foi possivel obter a lista de carros.\nTente mais Tarde.'
              }).present(); 
          });
        
    }

    seleciona(carro) {
      this.navCtrl.push(EscolhaPage, {carroSelecionado: carro}); 
    }

    carregarListaDeCarros() {
      let loader = this._loadingCtrl.create({
            content: 'Buscando novos carros, Aguarde...'
        });

        loader.present();
        this.getCarros();
        loader.dismiss();
    }
  
}

