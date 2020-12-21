import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(
        private firebaseAuth: AngularFireAuth,
        private firebase: AngularFireDatabase,
        private Router: Router,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService
    ) { }

    /****** Users registration ******/
    signUp(email: string, password: string) {
        this.spinner.show();
        this.firebaseAuth.auth
            .createUserWithEmailAndPassword(email, password)
            .then(res => {
                var UUID = res.user.uid;
                this.firebase.database
                    .ref("userType")
                    .child(UUID)
                    .set("subAdmin")
                    .then(() => {
                        const user = {
                            uid: UUID,
                            role: "subAdmin"
                        };
                        localStorage.setItem("LoggedInUser", JSON.stringify(user));
                        this.toastr.success(
                            "Account created",
                            "Success",
                            {
                                timeOut: 3000,
                                positionClass: "toast-bottom-right"
                            }
                        );
                        this.spinner.hide();
                        this.Router.navigate(["/banner"]);
                    })
                    .catch(err => {
                        this.spinner.hide();
                        this.toastr.error(err.message, "Error!", {
                            timeOut: 3000,
                            positionClass: "toast-bottom-right"
                        });
                    });
            })
            .catch(error => {
                this.spinner.hide();
                this.toastr.error(error.message, "Error!", {
                    timeOut: 3000,
                    positionClass: "toast-bottom-right"
                });
            });
    }



    /****** Users authentication ******/
    login(email: string, password: string) {
        this.spinner.show();
        this.firebaseAuth.auth
            .signInWithEmailAndPassword(email, password)
            .then(value => {
                const UUID = value.user.uid;
                this.firebase.database
                    .ref("userType")
                    .child(UUID)
                    .once("value")
                    .then(data => {
                        const status = data.val();
                        const user = { uid: "", role: "" };
                        if (status === "admin" || status === "subAdmin") {
                            user.uid = UUID;
                            user.role = status;
                            localStorage.setItem("LoggedInUser", JSON.stringify(user));
                            this.toastr.success("logged In", "Success", {
                                timeOut: 3000,
                                positionClass: "toast-bottom-right"
                            });
                            this.spinner.hide();
                            this.Router.navigate(["/banner"]);
                        } else {
                            this.spinner.hide();
                            this.toastr.error("Invalid Request", "Error", {
                                timeOut: 3000,
                                positionClass: "toast-top-right"
                            });
                        }
                    })
                    .catch(err => {
                        this.spinner.hide();
                        this.toastr.error(err.message, "Error!", {
                            timeOut: 3000,
                            positionClass: "toast-bottom-right"
                        });
                    });
            })
            .catch(error => {
                this.spinner.hide();
                this.toastr.error(error.message, "Error!", {
                    timeOut: 3000,
                    positionClass: "toast-bottom-right"
                });
            });
    }


    /****** Logged-in user detail ******/
    getLogDetails() {
        var accessedIn = JSON.parse(localStorage.getItem("LoggedInUser"));
        return accessedIn;
    }


    /****** Checking login state ******/
    isLoggedIn() {
        var loggedIn = JSON.parse(localStorage.getItem("LoggedInUser"));
        return loggedIn !== null;
    }


    /****** Logout operation ******/
    logout() {
        this.firebaseAuth.auth.signOut();
        this.toastr.success("Success", "Logout", {
            timeOut: 3000,
            positionClass: "toast-bottom-right"
        });
        localStorage.clear();
        this.Router.navigate(["/login"]);
    }
}
