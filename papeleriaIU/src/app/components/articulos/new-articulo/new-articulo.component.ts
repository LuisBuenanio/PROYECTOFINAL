import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ArticuloI } from "../../../shared/models/articulo.interface";
import { ArticuloService } from "../articulo.service";

import Swal from "sweetalert2";

@Component({
  selector: "app-new-articulo",
  templateUrl: "./new-articulo.component.html",
  styleUrls: ["./new-articulo.component.scss"],
})
export class NewArticuloComponent implements OnInit {
  constructor(private articuloSvc: ArticuloService) {}

  public newArticuloForm = new FormGroup({
    nombre: new FormControl("", Validators.required),
    descripcion: new FormControl("", Validators.required),
    cantidad: new FormControl("", Validators.required),
    valor: new FormControl("", Validators.required),
  });

  ngOnInit() {}

  addNewArticulo(data: ArticuloI) {
    if (this.newArticuloForm.status == "VALID") {
      this.articuloSvc.createArticulo(data).subscribe(
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
  }
}
