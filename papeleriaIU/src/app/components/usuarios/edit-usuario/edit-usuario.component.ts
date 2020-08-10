import { Component, OnInit, Input } from "@angular/core";
import { UsuarioI } from "src/app/shared/models/usuario.interface";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UsuarioService } from "../usuario.service";

import Swal from "sweetalert2";

@Component({
  selector: "app-edit-usuario",
  templateUrl: "./edit-usuario.component.html",
  styleUrls: ["./edit-usuario.component.scss"],
})
export class EditUsuarioComponent implements OnInit {
  @Input() usuario: UsuarioI;
  constructor(private usuarioSvc: UsuarioService) {}

  public editUsuarioForm = new FormGroup({
    id: new FormControl("", Validators.required),
    cedula: new FormControl("", Validators.required),
    nombre: new FormControl("", Validators.required),
    apellido: new FormControl("", Validators.required),
    telefono: new FormControl("", Validators.required),
    direccion: new FormControl("", Validators.required),
    correo: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl(""),
  });

  ngOnInit() {
    this.initValuesForm();
  }

  editUsuario(data: UsuarioI) {
    if (this.editUsuarioForm.status == "VALID") {
      this.usuarioSvc.editUsuario(data).subscribe(
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

  private initValuesForm(): void {
    this.editUsuarioForm.patchValue({
      id: this.usuario.id,
      cedula: this.usuario.cedula,
      nombre: this.usuario.nombre,
      apellido: this.usuario.apellido,
      telefono: this.usuario.telefono,
      direccion: this.usuario.direccion,
      correo: this.usuario.correo,
    });
  }
}
