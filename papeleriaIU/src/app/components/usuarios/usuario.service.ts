import { Injectable } from '@angular/core';
import { UsuarioI } from "../../shared/models/usuario.interface";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlAPI = "/papeleriaWS/resources/UsuarioWS/";

  constructor(private http: HttpClient) { }

  public getAllUsuarios(): Observable<UsuarioI[]> {
    return this.http.get<UsuarioI[]>(this.urlAPI);
  }

  public getOneUsuario(id: UsuarioI): Observable<UsuarioI> {
    //console.log(this.urlAPI + id);
    return this.http.get<UsuarioI>(this.urlAPI + id);
  }

  public createUsuario(usuario: UsuarioI) {
    console.log(usuario);
    return this.http.post(this.urlAPI, usuario);
  }

  public editUsuario(usuario: UsuarioI) {
    console.log(usuario);
    return this.http.put(this.urlAPI, usuario);
  }

  public deleteUsuario(usuario: UsuarioI) {
    return this.http.delete(this.urlAPI + usuario.id);
  }
}
