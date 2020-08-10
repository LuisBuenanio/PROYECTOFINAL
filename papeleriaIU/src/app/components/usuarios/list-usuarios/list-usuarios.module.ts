import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ListUsuariosRoutingModule } from "./list-usuarios-routing.module";
import { ListUsuariosComponent } from "./list-usuarios.component";

import { MaterialModule } from "../../../material.module";
import { TableUComponent } from "../../../shared/components/table-u/table-u.component";

@NgModule({
  declarations: [ListUsuariosComponent, TableUComponent],
  imports: [CommonModule, ListUsuariosRoutingModule, MaterialModule],
})
export class ListUsuariosModule {}
