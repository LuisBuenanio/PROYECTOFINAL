import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListArticulosComponent } from './list-articulos.component';

const routes: Routes = [{ path: '', component: ListArticulosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListArticulosRoutingModule { }
