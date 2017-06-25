import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Nav } from 'ionic-angular';
import { HomePage } from "../home/home";
import { UsuarioService } from "../../domain/usuario/usuario-service";
import { NovoPage } from "../novo/novo";
import { ServiceProvider } from "../../providers/service-provider";
import { Usuario } from "../../domain/usuario/Usuario";

@Component({
  templateUrl: 'login.html'
})
export class LoginPage {
  private _usuarioLogado: Usuario;

  /*public email: string = 'joao@alura.com.br';
  public senha: string = 'alura123';*/
  public usuario: Usuario;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _usuarioService: UsuarioService,
    private _alertCtrl: AlertController,
    public serviceProvider: ServiceProvider,
    private _nav: Nav) {

      this.usuario = new Usuario();
      this._nav.swipeBackEnabled = false;
    }
   

  efetuaLogin(usuario: Usuario) {
      usuario = this.usuario;
      
      
      if(usuario.email == null || usuario.senha == null){
        
        this._alertCtrl.create({
            title: 'Problema no login',
            subTitle: 'Email ou senha invalidos. Verifique',
            buttons: [{text: 'Ok'}]
          }).present();

      } else {
        
        this.serviceProvider.login(usuario).subscribe(
          res => {
            
            let usuario = new Usuario(
              res.usuario_id,
              res.usuario_nome, 
              res.usuario_endereco, 
              res.usuario_telefone,
              res.usuario_cpf, 
              res.usuario_email, 
              res.usuario_senha,
              res.usuario_dataNascimento 
            ); 
            
            this._usuarioLogado = usuario;

            if(res) {
              this.navCtrl.setRoot(HomePage);
              this.serviceProvider.pegaUsuarioLogado(this._usuarioLogado);
              return usuario;
            } else {
              this._alertCtrl.create({
                title: 'Problema no login',
                subTitle: 'Usuário inexistente. Por favor cadastre-se.',
                buttons: [{text: 'Ok'}]
              }).present();
            }
            

        }), err => {
            console.log(err);
            
        };
      }

            
    
  }

  obtemUsuarioLogado() {
        return this._usuarioLogado;
  }

  cadastrarNovaConta() {
    
    this.navCtrl.push(NovoPage);
  }

}

