import { Component, OnInit, ElementRef, Renderer2 } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
} from "@angular/forms";
import { PedidosService } from 'src/app/components/pedidos/pedidos.service';
import { UsuarioService } from 'src/app/components/usuarios/usuario.service';
import { ArticuloService } from 'src/app/components/articulos/articulo.service';
import { UsuarioI } from 'src/app/shared/models/usuario.interface';
import { ArticuloI } from 'src/app/shared/models/articulo.interface';
import { PedidoI } from 'src/app/shared/models/pedido.interface';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  constructor(
    private pedidoSvc: PedidosService,
    private usuarioSvc: UsuarioService,
    private articuloSvc: ArticuloService,
    private formBuilder: FormBuilder,
    public authSvc: AuthService
  ) {}

  public users: UsuarioI[];

  public status = [
    {
      id: 1,
      text: "Recibido",
    },
    {
      id: 2,
      text: "En proceso",
    },
    {
      id: 2,
      text: "Despachado",
    },
  ];

  public articulos: ArticuloI[];

  public newPedidoForm;

  private myDate = function(){
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
  };

  ngOnInit() {
    this.usuarioSvc.getAllUsuarios().subscribe((res) => {
      this.users = res;
    });
    this.articuloSvc.getAllArticulos().subscribe((res) => {
      this.articulos = res;
    });

    this.newPedidoForm = new FormGroup({
      usuario_id: new FormControl(this.authSvc.userData.id, Validators.required),
      descripcion: new FormControl("", Validators.required),
      estado: new FormControl(1, Validators.required),
      fecha: new FormControl(this.myDate(), Validators.required),
      articulos: this.formBuilder.array([this.createArticuloFormGroup()]),
    });
  }

  public addArticuloFormGroup() {
    const articulos = this.newPedidoForm.get("articulos") as FormArray;
    articulos.push(this.createArticuloFormGroup());
  }

  public removeOrClearArticulo(i: number) {
    const articulos = this.newPedidoForm.get("articulos") as FormArray;
    if (articulos.length > 1) {
      articulos.removeAt(i);
    } else {
      articulos.reset();
    }
  }

  private createArticuloFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl("", Validators.required),
      cantidad: new FormControl("", Validators.required),
    });
  }

  addNewPedido(data: PedidoI) {
    console.log(data);
    if (this.newPedidoForm.status == "VALID") {
      console.log(data);
      this.pedidoSvc.createPedido(data).subscribe(
        (res) => {
          if (res != null) {
            Swal.fire("Guardado", "Pedido Guardado", "success");
          } else {
            Swal.fire("Error", "Correo ya registrado", "warning");
          }
        },
        (err) => {
          console.log("Error: ", err);
          Swal.fire("Error", "Pedido no Guardado", "warning");
        }
      );
    }
  }
}
