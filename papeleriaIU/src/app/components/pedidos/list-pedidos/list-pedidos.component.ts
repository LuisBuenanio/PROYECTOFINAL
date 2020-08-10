import { Component, OnInit } from '@angular/core';
import { PedidosService } from "../pedidos.service";
import { Observable } from "rxjs";
import { PedidoI } from 'src/app/shared/models/pedido.interface';

@Component({
  selector: 'app-list-pedidos',
  templateUrl: './list-pedidos.component.html',
  styleUrls: ['./list-pedidos.component.scss']
})
export class ListPedidosComponent implements OnInit {
  public pedidios$: Observable<PedidoI[]>;

  constructor(private pedidoSvc: PedidosService) { }

  ngOnInit() {
    this.pedidios$ = this.pedidoSvc.getAllPedidos();
  }

}
