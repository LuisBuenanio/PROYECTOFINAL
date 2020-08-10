import { Component, OnInit, ElementRef, Renderer2 } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
} from "@angular/forms";
import { PedidoI } from "../../../shared/models/pedido.interface";
import { PedidosService } from "../pedidos.service";
import Swal from "sweetalert2";
import { UsuarioI } from "src/app/shared/models/usuario.interface";
import { UsuarioService } from "../../usuarios/usuario.service";
import { ArticuloI } from "src/app/shared/models/articulo.interface";
import { ArticuloService } from "../../articulos/articulo.service";

@Component({
  selector: "app-new-pedido",
  templateUrl: "./new-pedido.component.html",
  styleUrls: ["./new-pedido.component.scss"],
})
export class NewPedidoComponent implements OnInit {
  constructor(
    private pedidoSvc: PedidosService,
    private usuarioSvc: UsuarioService,
    private articuloSvc: ArticuloService,
    private formBuilder: FormBuilder,
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
      id: 3,
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
      usuario_id: new FormControl("", Validators.required),
      descripcion: new FormControl("", Validators.required),
      estado: new FormControl("", Validators.required),
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
            Swal.fire("Error", "Pedido no Guardado", "warning");
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
