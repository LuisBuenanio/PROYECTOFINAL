import { Component, OnInit, ElementRef, Renderer2, Input } from "@angular/core";
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
  selector: "app-edit-pedido",
  templateUrl: "./edit-pedido.component.html",
  styleUrls: ["./edit-pedido.component.scss"],
})
export class EditPedidoComponent implements OnInit {
  @Input() pedido: PedidoI;

  constructor(
    private pedidoSvc: PedidosService,
    private usuarioSvc: UsuarioService,
    private articuloSvc: ArticuloService,
    private formBuilder: FormBuilder
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

  public editPedidoForm;

  private myDate = function () {
    var d = new Date(),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  ngOnInit() {
    this.usuarioSvc.getAllUsuarios().subscribe((res) => {
      this.users = res;
    });
    this.articuloSvc.getAllArticulos().subscribe((res) => {
      this.articulos = res;
    });

    this.editPedidoForm = new FormGroup({
      id: new FormControl("", Validators.required),
      usuario_id: new FormControl("", Validators.required),
      descripcion: new FormControl("", Validators.required),
      estado: new FormControl("", Validators.required),
      fecha: new FormControl(this.myDate(), Validators.required),
      articulos: this.formBuilder.array([this.createArticuloFormGroup()]),
    });

    this.initValuesForm();
  }

  public addArticuloFormGroup() {
    const articulos = this.editPedidoForm.get("articulos") as FormArray;
    articulos.push(this.createArticuloFormGroup());
  }

  public removeOrClearArticulo(i: number) {
    const articulos = this.editPedidoForm.get("articulos") as FormArray;
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

  editPedido(data: PedidoI) {
    console.log(data);
    if (this.editPedidoForm.status == "VALID") {
      this.pedidoSvc.editPedido(data).subscribe(
        (res) => {
          if (res != null) {
            Swal.fire("Guardado", "Pedido Guardado", "success");
          } else {
            Swal.fire("Error", "Pedido no Guardado", "warning");
          }
        },
        (err) => {
          console.log("Error: ", err);
          Swal.fire("Error", "Error al Guardado", "warning");
        }
      );
    }
  }

  private initValuesForm(): void {
    this.editPedidoForm.patchValue({
      id: this.pedido.id,
      usuario_id: this.pedido.usuario_id,
      descripcion: this.pedido.descripcion,
      estado: this.pedido.estado,
      fecha: this.pedido.fecha,
      precio: this.pedido.precio,
      articulos: this.pedido.articulos,
    });

    const items = this.pedido.articulos;

    for (let i = 1; i < items.length; i++) {
      const articulos = this.editPedidoForm.get("articulos") as FormArray;
      articulos.push(
        new FormGroup({
          id: new FormControl(items[i].id, Validators.required),
          cantidad: new FormControl(items[i].cantidad, Validators.required),
        })
      );
    }
  }
}
