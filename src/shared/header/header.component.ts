import { Component, OnInit } from "@angular/core";
import { UsersService } from "./../../app/Services/users/users.service";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  path = "";
  constructor(public usersServices: UsersService) {
    if (this.usersServices.isLoggedIn()) {
      if (this.usersServices.getLogDetails().role === "admin") {
        this.path = "/organizations";
      }
    }
  }
  ngOnInit() { }
}
