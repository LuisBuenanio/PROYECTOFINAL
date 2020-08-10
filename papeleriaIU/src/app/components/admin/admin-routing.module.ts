import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AdminComponent } from "./admin.component";
import { ArticuloComponent } from "../../components/articulos/articulo/articulo.component";
import { AdminGuard } from 'src/app/shared/guards/admin.guard';

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    canActivate:[AdminGuard],
    children: [
      {
        path: "usuarios",
        loadChildren: () =>
          import("../usuarios/list-usuarios/list-usuarios.module").then(
            (m) => m.ListUsuariosModule
          ),
      },
      {
        path: "articulos",
        loadChildren: () =>
          import("../articulos/list-articulos/list-articulos.module").then(
            (m) => m.ListArticulosModule
          ),
      },
      {
        path: "articulos/:id",
        component: ArticuloComponent,
      },
      {
        path: "pedidos",
        loadChildren: () =>
          import("../pedidos/list-pedidos/list-pedidos.module").then(
            (m) => m.ListPedidosModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
