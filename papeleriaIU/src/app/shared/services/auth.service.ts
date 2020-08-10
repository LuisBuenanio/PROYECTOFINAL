import { Injectable } from "@angular/core";
import { UsuarioI } from "../../shared/models/usuario.interface";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private urlAPI = "/papeleriaWS/resources/UsuarioWS/";
  public userData: UsuarioI;

  constructor(private http: HttpClient) {}

  public getLogin(usuario: UsuarioI) {
    const { correo, password } = usuario;
    console.log(this.urlAPI + correo + "/" + password);

    return this.http.get<UsuarioI>(
      this.urlAPI + "login/" + correo + "/" + password
    );
  }

  public setRegister(usuario: UsuarioI) {
    return this.http.post(this.urlAPI, usuario);
  }

  public getUser(id){
    return this.http.get<UsuarioI>(this.urlAPI + id);
  }

  public getAdmin(): boolean {
    if (this.userData) {
      if (this.userData.roles[0].id == "1") return true;
    }
    return false;
  }

  public logout() {
    this.userData = null;
  }
}
