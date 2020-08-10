import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ModalI } from "../../models/modal.interface";

@Component({
  selector: "app-modal-p",
  templateUrl: "./modal-p.component.html",
  styleUrls: ["./modal-p.component.scss"],
})
export class ModalPComponent implements OnInit {
  constructor(
    public dialog: MatDialogRef<ModalPComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalI
  ) {}
  ngOnInit() {}
}
