import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Usuario } from "./Usuario";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'

const KEY = 'avatarUrl';

@Injectable()
export class UsuarioService {
 
    private _usuarioLogado: Usuario;

    constructor(private _http: Http) {

    }

    public efetuaLogin(email: string, senha: string){
        let api = `https://aluracar.herokuapp.com/login?email=${email}&senha=${senha}`;
        
        return this._http
            .get(api)
            .map(res => res.json().usuario)
            .toPromise()
            .then(dado => {
                let usuario = new Usuario(
                    dado.nome,
                    dado.endereco, 
                    dado.dataNascimento, 
                    dado.email, 
                    dado.telefone);
                this._usuarioLogado = usuario;
                return usuario;
            })
    }

    obtemUsuarioLogado() {
        return this._usuarioLogado;
    }

    guardaAvatar(url) {
        localStorage.setItem(KEY, url);
    }
    
    obtemAvatar() {

        return localStorage.getItem(KEY);
    }
}