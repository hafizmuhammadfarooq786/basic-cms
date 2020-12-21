import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UsersService } from "./../../Services/users/users.service";

@Component({
    selector: "app-signup",
    templateUrl: "./signup.component.html",
    styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
    signupForm: FormGroup;
    isSubmitted = false;
    constructor(
        private formBuilder: FormBuilder,
        private usersServices: UsersService
    ) { }

    ngOnInit() {
        // Call Signup form when component is ready
        this.signupForm = this.formBuilder.group({
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

    // Signup Call
    onRegister() {
        this.isSubmitted = true;
        if (this.signupForm.invalid) {
            return;
        } else if (this.signupForm.valid) {
            this.usersServices.signUp(
                this.signupForm.value.email,
                this.signupForm.value.password
            );
        }
    }
}
