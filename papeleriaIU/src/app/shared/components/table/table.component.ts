import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ArticuloService } from "../../../components/articulos/articulo.service";
import { ArticuloI } from "src/app/shared/models/articulo.interface";

import Swal from "sweetalert2";
import { MatDialog } from "@angular/material/dialog";
import { ModalComponent } from "../../../shared/components/modal/modal.component";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TableComponent implements OnInit, AfterViewInit {
  constructor(private articuloSvc: ArticuloService, public dialog: MatDialog) {}

  displayedColumns: string[] = [
    "id",
    "nombre",
    "descripcion",
    "cantidad",
    "valor",
    "opciones",
  ];
  dataSource = new MatTableDataSource();

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.articuloSvc
      .getAllArticulos()
      .subscribe((articulos) => (this.dataSource.data = articulos));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onNewArticulo() {
    //console.log("open!!!");
    this.openDialog();
  }

  onEditArticulo(articulo: ArticuloI) {
    //console.log(articulo);
    this.openDialog(articulo);
  }

  onDeleteArticulo(articulo: ArticuloI) {
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
        this.articuloSvc.deleteArticulo(articulo).subscribe(
          (res) => {
            if (res != "") {
              Swal.fire("Eliminado", "Articulo eliminado", "success");
              this.ngOnInit();
            } else {
              Swal.fire("Error", "Articulo no eliminado", "warning");
            }
          },
          (error) => {
            Swal.fire("Error", "Articulo no eliminado", "warning");
          }
        );
      }
    });
  }

  openDialog(articulo?: ArticuloI): void {
    const config = {
      data: {
        message: articulo ? "Editar Articulo" : "Nuevo Articulo",
        content: articulo,
      },
    };

    const dialogRef = this.dialog.open(ModalComponent, config);
    dialogRef.afterClosed().subscribe((result) => {
      //console.log('Dialog ' + result );
      this.ngOnInit();
    });
  }
}
