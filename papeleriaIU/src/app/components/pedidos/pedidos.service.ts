import { Injectable } from "@angular/core";
import { PedidoI } from "../../shared/models/pedido.interface";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class PedidosService {
  private urlAPI = "/papeleriaWS/resources/PedidoWS/";

  constructor(private http: HttpClient) {}

  public getAllPedidos(): Observable<PedidoI[]> {
    return this.http.get<PedidoI[]>(this.urlAPI);
  }

  public getAllPedidosCliente(id): Observable<PedidoI[]> {
    return this.http.get<PedidoI[]>(this.urlAPI + "cliente/" + id);
  }

  public getOnePedido(id: PedidoI): Observable<PedidoI> {
    //console.log(this.urlAPI + id);
    return this.http.get<PedidoI>(this.urlAPI + id);
  }

  public createPedido(pedido: PedidoI) {
    console.log(pedido);
    return this.http.post(this.urlAPI, pedido);
  }

  public editPedido(pedido: PedidoI) {
    console.log(pedido);
    return this.http.put(this.urlAPI, pedido);
  }

  public deletePedido(pedido: PedidoI) {
    return this.http.delete(this.urlAPI + pedido.id);
  }

}
