import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisPedidosComponent } from './mis-pedidos.component';

const routes: Routes = [{ path: '', component: MisPedidosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MisPedidosRoutingModule { }
