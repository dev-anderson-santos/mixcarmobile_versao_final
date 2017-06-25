import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EscolhaPage } from '../pages/escolha/escolha';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { CadastroPage } from "../pages/cadastro/cadastro";
import { AgendamentoService } from "../domain/agendamento/agendamento-service";
import { Storage } from '@ionic/storage';
import { AgendamentoDAO } from "../domain/agendamento/AgendamentoDAO";
import { AgendamentosPage } from "../pages/agendamentos/agendamentos";
import { LoginPage } from "../pages/login/login";
import { UsuarioService } from "../domain/usuario/usuario-service";
import { PerfilPage } from "../pages/perfil/perfil";
import { NovoPage } from "../pages/novo/novo";
import { ServiceProvider } from "../providers/service-provider";
import { LogoutPage } from "../pages/logout/logout";
import { DetalhesAgendamentoPage } from "../pages/detalhes-agendamento/detalhes-agendamento";
import { EditarEscolhaPage } from "../pages/editar-escolha/editar-escolha";

function provideStorage() {

}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EscolhaPage,
    CadastroPage,
    AgendamentosPage,
    LoginPage,
    PerfilPage,
    NovoPage,
    LogoutPage,
    DetalhesAgendamentoPage,
    EditarEscolhaPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EscolhaPage,
    CadastroPage,
    AgendamentosPage,
    LoginPage,
    PerfilPage,
    NovoPage,
    LogoutPage,
    DetalhesAgendamentoPage,
    EditarEscolhaPage
    
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: ServiceProvider, useClass: ServiceProvider},
    {provide: LoginPage, useClass: LoginPage},
    AgendamentoService,
    {provide: Storage, useFactory: provideStorage},
    AgendamentoDAO,
    UsuarioService,
    
  ]
})
export class AppModule {}
