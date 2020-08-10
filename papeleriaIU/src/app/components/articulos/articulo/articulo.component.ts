import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ArticuloService } from "../articulo.service";
import { Observable } from 'rxjs';
import { ArticuloI } from 'src/app/shared/models/articulo.interface';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.scss']
})
export class ArticuloComponent implements OnInit {

  public articulo$: Observable<ArticuloI>;

  constructor(private route: ActivatedRoute, private articuloSvc: ArticuloService) { }

  ngOnInit() {
    const idArticulo = this.route.snapshot.params.id;
    this.articulo$ = this.articuloSvc.getOneArticulo(idArticulo);
  }

}
