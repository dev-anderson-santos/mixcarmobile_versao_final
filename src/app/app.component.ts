import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { AgendamentosPage } from "../pages/agendamentos/agendamentos";
import { LoginPage } from "../pages/login/login";
import { PerfilPage } from "../pages/perfil/perfil";
import { LogoutPage } from "../pages/logout/logout";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = LoginPage;

  public paginas = [
    {titulo: 'Agendamentos', componente: AgendamentosPage, iconos: "ios-calendar", iconmd: "md-calendar"}, 
    {titulo: 'Perfil', componente: PerfilPage, iconos: "ios-person", iconmd: "md-person"},
    {titulo: 'Sair', componente: LogoutPage, iconos: "ios-log-out", iconmd: "md-log-out"}
  ];

  @ViewChild(Nav) public nav: Nav;

  constructor(platform: Platform) {
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //StatusBar.styleDefault();
      StatusBar.backgroundColorByHexString('#32DB64');
      Splashscreen.hide();
    });
  }

    abrePagina(pagina) {
      switch(pagina.titulo) {
        case 'Agendamentos':
        this.nav.push(AgendamentosPage);
        break;

        case 'Perfil':
        this.nav.push(PerfilPage);
        break;

        case 'Sair':
        this.nav.push(LogoutPage);
        break;
      }
    }
}
