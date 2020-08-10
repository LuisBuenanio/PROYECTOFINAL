import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-list-articulos",
  templateUrl: "./list-articulos.component.html",
  styleUrls: ["./list-articulos.component.scss"],
})
export class ListArticulosComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    //console.log(this.articuloSvc.getAllArticulos().subscribe());
    //this.articuloSvc.getAllArticulos().subscribe(data => console.log(data));
    //this.articulos$ = this.articuloSvc.getAllArticulos();
  }
}
