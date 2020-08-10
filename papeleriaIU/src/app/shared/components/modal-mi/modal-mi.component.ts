import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ModalI } from "../../models/modal.interface";

@Component({
  selector: "app-modal-mi",
  templateUrl: "./modal-mi.component.html",
  styleUrls: ["./modal-mi.component.scss"],
})
export class ModalMiComponent implements OnInit {
  constructor(
    public dialog: MatDialogRef<ModalMiComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalI
  ) {}
  ngOnInit() {}
}
