import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Alert, AlertController } from 'ionic-angular';
import { UsuarioService } from "../../domain/usuario/usuario-service";
import { Camera } from "ionic-native/dist/es5";
import { ServiceProvider } from "../../providers/service-provider";
//import { Usuario } from "../../domain/usuario/Usuario";

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage implements OnInit{

  public url: string;
  public editando: boolean = true;
  public textoBotao: string = "Editar";
  private _alerta: Alert;
  public tipo = "password";
  public eyeOpennedOs = "ios-eye";
  public eyeOpennedMd = "md-eye";
  //private _userDate: Usuario = this.usuarioLogado;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _usuarioService: UsuarioService,
    private _serviceProvider: ServiceProvider,
    private _alertCtrl: AlertController) {
      
      this._alerta = this._alertCtrl.create({
        title: 'Aviso',
        buttons: [{text: 'Ok', handler: () => {
          //this.navCtrl.setRoot(HomePage)
        }}]
    });
    }

    get usuarioLogado() {
      
      return this._serviceProvider.obterUsuarioLogado();
    }

    ngOnInit() {

      this.url = this._serviceProvider.obtemAvatar();
    }

    tiraFoto() {
      
      Camera.getPicture({
        destinationType: Camera.DestinationType.FILE_URI,
        saveToPhotoAlbum: true, 
        correctOrientation: true
      }).then(url => {
        this._usuarioService.guardaAvatar(url);
        this.url = url;
      })
      .catch(err => console.log(err));
    }

    acaoBotao() {
      if(this.editando) {
        this.editando = false;
        this.textoBotao = "Salvar";
      } else {
        this.editando = true;
        this.textoBotao = "Editar";

        this._serviceProvider
          .atualizarUsuario(this._serviceProvider.obterUsuarioLogado())
          .subscribe(result =>{
            console.log(result);
            this._alerta.setSubTitle('Os dados do perfil foram atualizados com sucesso!');
            this._alerta.present();
          },err => {
            console.log(err);
            this._alerta.setSubTitle('Não foi possivel atualizar os dados dos perfil. Tente outra vez mais tarde.');
            this._alerta.present();
          });
      }
    }

    show() {
      if(!this.editando) {
        if(this.tipo === "password") {
          this.tipo = "text";
          this.eyeOpennedOs = "ios-eye-off";
          this.eyeOpennedMd = "md-eye-off";
        } else {   
          this.tipo = "password";
          this.eyeOpennedOs = "ios-eye";
          this.eyeOpennedMd = "md-eye";
        }
      }
    }
}
