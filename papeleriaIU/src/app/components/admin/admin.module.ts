import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin.component";
import { MaterialModule } from "../../material.module";
import { ArticuloComponent } from "../../components/articulos/articulo/articulo.component";

@NgModule({
  declarations: [AdminComponent, ArticuloComponent],
  imports: [CommonModule, AdminRoutingModule, MaterialModule],
})
export class AdminModule {}
