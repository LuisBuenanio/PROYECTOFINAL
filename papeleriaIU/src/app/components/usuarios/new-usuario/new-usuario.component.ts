import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UsuarioI } from "../../../shared/models/usuario.interface";
import { UsuarioService } from "../usuario.service";

import Swal from "sweetalert2";

@Component({
  selector: "app-new-usuario",
  templateUrl: "./new-usuario.component.html",
  styleUrls: ["./new-usuario.component.scss"],
})
export class NewUsuarioComponent implements OnInit {
  constructor(private usuarioSvc: UsuarioService) {}

  public newUsuarioForm = new FormGroup({
    cedula: new FormControl("", Validators.required),
    nombre: new FormControl("", Validators.required),
    apellido: new FormControl("", Validators.required),
    telefono: new FormControl("", Validators.required),
    direccion: new FormControl("", Validators.required),
    correo: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required),
  });

  ngOnInit() {}

  addNewUsuario(data: UsuarioI) {
    if (this.newUsuarioForm.status == "VALID") {
      this.usuarioSvc.createUsuario(data).subscribe(
        (res) => {
          if (res != null) {
            Swal.fire("Guardado", "Usuario Guardado", "success");
          } else {
            Swal.fire("Error", "Correo ya registrado", "warning");
          }
        },
        (err) => {
          console.log("Error: ", err);
          Swal.fire("Error", "Usuario no Guardado", "warning");
        }
      );
    }
  }
}
