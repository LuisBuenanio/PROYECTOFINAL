import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../shared/services/auth.service";
import { UsuarioI } from "../../../shared/models/usuario.interface";
import { Observable } from "rxjs";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import Swal from "sweetalert2";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  public usuario$: Observable<UsuarioI>;

  constructor(private route: Router, private usuarioSvc: AuthService) {}

  public registerForm = new FormGroup({
    cedula: new FormControl("", Validators.required),
    nombre: new FormControl("", Validators.required),
    apellido: new FormControl("", Validators.required),
    telefono: new FormControl("", Validators.required),
    direccion: new FormControl("", Validators.required),
    correo: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required),
  });

  ngOnInit() {}

  onRegister(form: UsuarioI) {
    if (this.registerForm.status == "VALID") {
      this.usuarioSvc.setRegister(form).subscribe(
        (res) => {
          console.log("Succes", res);
          if (res != null) {
            this.usuarioSvc.getUser(res).subscribe((res) => {
              //console.log("Ok");
              if (res.id != null) {
                this.usuarioSvc.userData = res;
                this.route.navigate(["/"]);
              }
            });
          } else {
            Swal.fire("Error al registrar", "Correo ya registrado", "warning");
          }
        },
        (err) => {
          console.log("Error", err);
        }
      );
    }
  }
}
