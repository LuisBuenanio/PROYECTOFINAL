import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ListPedidosRoutingModule } from "./list-pedidos-routing.module";
import { ListPedidosComponent } from "./list-pedidos.component";

import { MaterialModule } from "../../../material.module";
import { TablePComponent } from "../../../shared/components/table-p/table-p.component";

@NgModule({
  declarations: [ListPedidosComponent, TablePComponent],
  imports: [CommonModule, ListPedidosRoutingModule, MaterialModule],
})
export class ListPedidosModule {}
