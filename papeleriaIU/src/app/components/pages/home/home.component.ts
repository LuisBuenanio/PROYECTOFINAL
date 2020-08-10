import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public person = require("./assets/person.png");

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {

  }

  scroll(el: string) {
    document.getElementById(el).scrollIntoView();
  }
}
