import { Component } from "@angular/core";
import { UsersService } from "./Services/users/users.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(public authService: UsersService) { }
  ngOnInit() { }
}
