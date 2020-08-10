import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-my-nav",
  templateUrl: "./my-nav.component.html",
  styleUrls: ["./my-nav.component.scss"],
})
export class MyNavComponent {
  constructor(public authSvc: AuthService, private route: Router) {}

  public logo = require("./assets/systech-logo.png");

  ngOnInit() {}

  scroll(el: string) {
    if (this.route.url == "/home"){
      document.getElementById(el).scrollIntoView();
    }else{
      this.route.navigate(["/home"]);
    }

  }

  onLogout(): void {
    this.authSvc.logout();
    this.route.navigate(["/login"]);
  }
}
