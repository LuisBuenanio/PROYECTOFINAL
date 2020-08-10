import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { PedidosService } from "../../../components/pedidos/pedidos.service";
import { PedidoI } from "src/app/shared/models/pedido.interface";

import Swal from "sweetalert2";
import { MatDialog } from "@angular/material/dialog";
import { ModalPComponent } from '../modal-p/modal-p.component';


@Component({
  selector: "app-table-p",
  templateUrl: "./table-p.component.html",
  styleUrls: ["./table-p.component.scss"],
})
export class TablePComponent implements OnInit, AfterViewInit {
  constructor(private pedidoSvc: PedidosService, public dialog: MatDialog) {}

  displayedColumns: string[] = [
    "id",
    "usuario_id",
    "descripcion",
    "estado",
    "fecha",
    "precio",
    "opciones",
  ];
  dataSource = new MatTableDataSource();

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.pedidoSvc
      .getAllPedidos()
      .subscribe((pedidos) => (this.dataSource.data = pedidos));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onNewPedido() {
    //console.log("open!!!");
    this.openDialog();
  }

  onEditPedido(pedido: PedidoI) {
    //console.log(pedido);
    this.openDialog(pedido);
  }

  onDeletePedido(pedido: PedidoI) {
    Swal.fire({
      title: "¿Seguro desea eliminar?",
      text: "Una vez eliminado no se podrá recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Eliminar",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        this.pedidoSvc.deletePedido(pedido).subscribe(
          (res) => {
            if (res != "") {
              Swal.fire("Eliminado", "Pedido eliminado", "success");
              this.ngOnInit();
            } else {
              Swal.fire("Error", "Pedido no eliminado", "warning");
            }
          },
          (error) => {
            Swal.fire("Error", "Pedido no eliminado", "warning");
          }
        );
      }
    });
  }

  openDialog(pedido?: PedidoI): void {
    const config = {
      data: {
        message: pedido ? "Editar Pedido" : "Nuevo Pedido",
        content: pedido,
      },
      width: '60vw',
    };

    const dialogRef = this.dialog.open(ModalPComponent, config);
    dialogRef.afterClosed().subscribe((result) => {
      //console.log('Dialog ' + result );
      this.ngOnInit();
    });
  }

  precioPedido(pedido: PedidoI): number {
    let precio = 0.0;
    if (pedido.articulos.length > 0) {
      const items = pedido.articulos;

      for (let i = 0; i < items.length; i++) {
        precio += items[i].cantidad * items[i].valor;
      }
    }
    return precio;
  }
}
