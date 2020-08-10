import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { UsuarioService } from "../../../components/usuarios/usuario.service";
import { UsuarioI } from "src/app/shared/models/usuario.interface";

import Swal from "sweetalert2";
import { MatDialog } from "@angular/material/dialog";
import { ModalUComponent } from "../../../shared/components/modal-u/modal-u.component";

@Component({
  selector: "app-table-u",
  templateUrl: "./table-u.component.html",
  styleUrls: ["./table-u.component.scss"],
})
export class TableUComponent implements OnInit, AfterViewInit {
  constructor(private usuarioSvc: UsuarioService, public dialog: MatDialog) {}

  displayedColumns: string[] = [
    "id",
    "cedula",
    "nombre",
    "apellido",
    "telefono",
    "direccion",
    "correo",
    "opciones",
  ];
  dataSource = new MatTableDataSource();

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.usuarioSvc
      .getAllUsuarios()
      .subscribe((usuarios) => (this.dataSource.data = usuarios));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onNewUsuario() {
    //console.log("open!!!");
    this.openDialog();
  }

  onEditUsuario(usuario: UsuarioI) {
    //console.log(usuario);
    this.openDialog(usuario);
  }

  onDeleteUsuario(usuario: UsuarioI) {
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
        this.usuarioSvc.deleteUsuario(usuario).subscribe(
          (res) => {
            if (res != "") {
              Swal.fire("Eliminado", "Usuario eliminado", "success");
              this.ngOnInit();
            } else {
              Swal.fire("Error", "Usuario no eliminado", "warning");
            }
          },
          (error) => {
            Swal.fire("Error", "Usuario no eliminado", "warning");
          }
        );
      }
    });
  }

  openDialog(usuario?: UsuarioI): void {
    const config = {
      data: {
        message: usuario ? "Editar Usuario" : "Nuevo Usuario",
        content: usuario,
      },
      width: '60vw',
    };

    const dialogRef = this.dialog.open(ModalUComponent, config);
    dialogRef.afterClosed().subscribe((result) => {
      //console.log('Dialog ' + result );
      this.ngOnInit();
    });
  }
}
