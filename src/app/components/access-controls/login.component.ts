import { Component, OnInit } from "@angular/core";
import { UsersService } from "./../../Services/users/users.service"
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    isSubmitted = false;

    constructor(
        private usersServices: UsersService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: [
                "",
                [
                    Validators.required,
                    Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
                ]
            ],
            password: ["", [Validators.required, Validators.minLength(8)]]
        });
    }

    onLogin() {
        this.isSubmitted = true;
        if (this.loginForm.invalid) {
            return;
        } else if (this.loginForm.valid) {
            this.usersServices.login(
                this.loginForm.value.email,
                this.loginForm.value.password
            );
        }
    }
}
