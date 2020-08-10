import { Injectable } from "@angular/core";
import { ArticuloI } from "../../shared/models/articulo.interface";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ArticuloService {
  private urlAPI = "/papeleriaWS/resources/ArticuloWS/";

  constructor(private http: HttpClient) {}

  public getAllArticulos(): Observable<ArticuloI[]> {
    return this.http.get<ArticuloI[]>(this.urlAPI);
  }

  public getOneArticulo(id: ArticuloI): Observable<ArticuloI> {
    //console.log(this.urlAPI + id);
    return this.http.get<ArticuloI>(this.urlAPI + id);
  }

  public createArticulo(articulo: ArticuloI) {
    console.log(articulo);
    return this.http.post(this.urlAPI, articulo);
  }

  public editArticulo(articulo: ArticuloI) {
    console.log(articulo);
    return this.http.put(this.urlAPI, articulo);
  }

  public deleteArticulo(articulo: ArticuloI) {
    return this.http.delete(this.urlAPI + articulo.id);
  }
}
