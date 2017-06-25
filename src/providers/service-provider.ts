import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Usuario } from "../domain/usuario/Usuario";

const KEY = 'avatarUrl';

@Injectable()
export class ServiceProvider {

  //public api : string = 'http://192.168.43.47/api/';
  public api : string = 'http://mixcarmobile.esy.es/api/'; 
  //public api : string = 'http://mixcarmobile2.pe.hu/api/';
  //public api : string = 'http://localhost/api2/';
  private _usuarioLogado: Usuario;

  constructor(public http: Http) {
        
  }

      getListarCarros() {
            return this
                  .http.get(this.api + 'listarCarros.php')
                  .map(res => res.json())
      }

      selecionaCarro(carro) {
            let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });
            
                  //console.log(carro);
                  return this.http.post(this.api + "apiSelecionaCarro.php", carro, {
                        headers: headers,
                        method: "POST"
                  }).map((res:Response) => {
                        return res.json();
                  })
            
      }

      listarAcessorios(id) {
            let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });
            
                  //console.log(id_carro);
                  return this.http.post(this.api + "listarAcessorios.php", id, {
                        headers: headers,
                        method: "POST"
                  }).map((res:Response) => {
                        return res.json();
                  })
      }

      listarAcessoriosParaEditar(id) {
            let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });
            
                  //console.log(id_carro);
                  return this.http.post(this.api + "listarAcessoriosParaEditar.php", id, {
                        headers: headers,
                        method: "POST"
                  }).map((res:Response) => {
                        return res.json();
                  })
      }

      listarCarrosAgendados(param) {
            let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });
            //console.log(param);
            return this
                  .http.post(this.api + 'recuperaAgendamento.php', param, {
                  headers: headers,
                        method: "POST"
                  }).map((res:Response) => {
                        return res.json();
                  })
                  
      }

      salvarAgendamento(params) {
            let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });
            //console.log(params);
            return this.http.post(this.api + 'cadastrarAgendamento.php', params, {
                  headers:headers,
                  method:"POST"
            }).map(
                  (res:Response) => {return res;}
            );
      }

      excluiAgendamento(id){
            let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });
            //console.log(id);
            return this.http.post(this.api + "deletaAgendamento.php", id, {
                  headers:headers
                  }).map(
                  (res:Response) => {return res}
            );
      }

      cadastrarUsuario(params) {
            let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });
            return this.http.post(this.api + "cadastro.php", params, {
                  headers:headers,
                  method:"POST"
            }).map(
                  (res:Response) => {return res.json();}
            );
      }

      login(credenciais) {
            let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });
            
                  //console.log(credenciais);
                  return this.http.post(this.api + "login.php", credenciais, {
                        headers: headers,
                        method: "POST"
                  }).map((res:Response) => {
                        return res.json();
                  })
            
      }

      
      
      atualizarUsuario(data) {
            let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });
            return this.http.post(this.api + "atualizarUsuario.php", data, {
                  headers:headers,
                  method:"POST"
            }).map(
                  (res:Response) => {return res.json();}
            );
      }

      

      pegaUsuarioLogado(usuario: Usuario) {
        this._usuarioLogado = usuario;
      }

      obterUsuarioLogado() {
            return this._usuarioLogado;
      }

      guardaAvatar(url) {
        localStorage.setItem(KEY, url);
      }

      obtemAvatar() {

        return localStorage.getItem(KEY);
    }
}
