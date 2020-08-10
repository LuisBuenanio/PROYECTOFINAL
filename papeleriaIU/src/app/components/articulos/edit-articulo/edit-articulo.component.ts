import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ArticuloI } from "../../../shared/models/articulo.interface";
import { ArticuloService } from "../articulo.service";

import Swal from "sweetalert2";

@Component({
  selector: "app-edit-articulo",
  templateUrl: "./edit-articulo.component.html",
  styleUrls: ["./edit-articulo.component.scss"],
})
export class EditArticuloComponent implements OnInit {
  @Input() articulo: ArticuloI;

  constructor(private articuloSvc: ArticuloService) {}

  public editArticuloForm = new FormGroup({
    id: new FormControl("", Validators.required),
    nombre: new FormControl("", Validators.required),
    descripcion: new FormControl("", Validators.required),
    cantidad: new FormControl("", Validators.required),
    valor: new FormControl("", Validators.required),
  });

  ngOnInit() {
    this.initValuesForm();
  }

  editArticulo(data: ArticuloI) {
    this.articuloSvc.editArticulo(data).subscribe(
      (res) => {
        if (res != null){
          Swal.fire("Guardado", "Articulo Guardado", "success");
        }else{
          Swal.fire("Error", "Articulo no Guardado", "warning");
        }
      },
      (err) => {
        console.log("Error: ", err);
        Swal.fire("Error", "Articulo no Guardado", "warning");
      }
    );
  }

  private initValuesForm(): void {
    this.editArticuloForm.patchValue({
      id: this.articulo.id,
      nombre: this.articulo.nombre,
      descripcion: this.articulo.descripcion,
      cantidad: this.articulo.cantidad,
      valor: this.articulo.valor,
    });
  }
}
