import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ModalI } from "../../models/modal.interface";

@Component({
  selector: "app-modal-u",
  templateUrl: "./modal-u.component.html",
  styleUrls: ["./modal-u.component.scss"],
})
export class ModalUComponent implements OnInit {
  constructor(
    public dialog: MatDialogRef<ModalUComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalI
  ) {}

  ngOnInit() {}
}
