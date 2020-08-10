import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisPedidosRoutingModule } from './mis-pedidos-routing.module';
import { MisPedidosComponent } from './mis-pedidos.component';

import { MaterialModule } from "../../../material.module";

@NgModule({
  declarations: [MisPedidosComponent],
  imports: [
    CommonModule,
    MisPedidosRoutingModule, MaterialModule
  ]
})
export class MisPedidosModule { }
