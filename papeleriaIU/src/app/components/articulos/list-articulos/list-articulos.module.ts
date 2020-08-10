import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ListArticulosRoutingModule } from "./list-articulos-routing.module";
import { ListArticulosComponent } from "./list-articulos.component";

import { MaterialModule } from "../../../material.module";
import { TableComponent } from "../../../shared/components/table/table.component";

@NgModule({
  declarations: [ListArticulosComponent, TableComponent],
  imports: [CommonModule, ListArticulosRoutingModule, MaterialModule],
})
export class ListArticulosModule {}
