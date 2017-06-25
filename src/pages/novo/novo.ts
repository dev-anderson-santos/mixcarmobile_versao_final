import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginPage } from "../login/login";
import { Usuario } from "../../domain/usuario/Usuario";
//import { Vibration } from "ionic-native/dist/es5";
import { ServiceProvider } from "../../providers/service-provider";
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'page-novo',
  templateUrl: 'novo.html'
})
export class NovoPage {

  public usuario: Usuario;
  public cadastro: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder : FormBuilder,
    private _alertCtrl: AlertController,
    public serviceProvider: ServiceProvider) {
      

    this.cadastro = this.formBuilder.group({
        nome: ['', Validators.required],
        endereco: ['', Validators.required],
        telefone: ['', Validators.required],
        cpf: ['', Validators.required],
        email: ['', Validators.required],
        senha: ['', Validators.required],
        dataNascimento: ['', Validators.required]
        
    });
    this.usuario = new Usuario();
  }

  cadastrarNovaConta() {
    
    // Aqui vem a logica para salvar no banco
    this.serviceProvider.cadastrarUsuario(this.cadastro.value)
        .subscribe(
            data => {
              this._alertCtrl.create({
                subTitle: 'Cadastro efetuado com sucesso.',
                buttons: [
                  {text: 'Ok'}, 
                  this.navCtrl.setRoot(LoginPage)
                ]
                
          }).present();
              console.log(data.mensage)
            },
            err => {
              console.log(err),
              this._alertCtrl.create({
                subTitle: 'Ocorreu um erro ao cadastrar. Tente novamente em alguns minutos.',
                buttons: [
                  {text: 'Ok'}, 
                  this.navCtrl.setRoot(LoginPage)
                ]
                
              }).present();
              
            }
        );

    
  }

  mascara(t, mask){
    var i = t.value.length;
    var saida = mask.substring(1,0);
    var texto = mask.substring(i);
    if (texto.substring(0,1) != saida){
      t.value += texto.substring(0,1);
    }
  } 

}
