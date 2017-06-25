import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { LoginPage } from "../login/login";

@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html'
})
export class LogoutPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController) {

        this.logout();
    }


    logout() {
    let loader = this.loadingCtrl.create({
      content: "Desconectando... Volte Sempre!",
      duration: 2000
    });
    this.navCtrl.setRoot(LoginPage);
    loader.present();
  }
}
