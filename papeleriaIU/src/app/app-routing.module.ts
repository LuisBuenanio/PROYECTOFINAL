import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContainerAppComponent } from "./components/pages/container-app/container-app.component";
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: "",
    component: ContainerAppComponent,
    children: [
      {
        path: "home",
        loadChildren: () =>
          import("./components/pages/home/home.module").then(
            (m) => m.HomeModule
          ),
      },
      {
        path: "mis-pedidos",
        canActivate:[AuthGuard],
        loadChildren: () =>
          import("./components/pages/mis-pedidos/mis-pedidos.module").then(
            (m) => m.MisPedidosModule
          ),
      },
      {
        path: "help",
        loadChildren: () =>
          import("./components/pages/help/help.module").then(
            (m) => m.HelpModule
          ),
      },
      {
        path: "login",
        loadChildren: () =>
          import("./components/auth/login/login.module").then((m) => m.LoginModule),
      },
      {
        path: "register",
        loadChildren: () =>
          import("./components/auth/register/register.module").then(
            (m) => m.RegisterModule
          ),
      },
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "admin",
    loadChildren: () =>
      import("./components/admin/admin.module").then((m) => m.AdminModule),
  },
  {
    path: "mis-pedidos",
    loadChildren: () =>
      import("./components/pages/mis-pedidos/mis-pedidos.module").then(
        (m) => m.MisPedidosModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
