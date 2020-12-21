import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireDatabase } from "@angular/fire/database";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: 'root'
})
export class BannerService {
    constructor(
        private firebase: AngularFireDatabase,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private Router: Router
    ) { }


    /****** Adding Banner Context ******/
    addBannerContext(data) {
        this.spinner.show();
        this.firebase.database
            .ref("banner")
            .set(data)
            .then(() => {
                this.toastr.success(
                    "Content added",
                    "Success!",
                    {
                        timeOut: 3000,
                        positionClass: "toast-bottom-right"
                    }
                );
            })
            .then(() => {
                this.spinner.hide();
            })
            .then(() => {
                this.Router.navigateByUrl("/", {
                    skipLocationChange: true
                }).then(() => this.Router.navigate(["/banner"]));
            });
    }


    /****** Updating Banner Context ******/
    onUpdateBannerContext(updatedData) {
        this.spinner.show();
        this.firebase.database
            .ref("bannerContent")
            .update(updatedData)
            .then(() => {
                this.toastr.success(
                    "Content updated",
                    "Success",
                    {
                        timeOut: 3000,
                        positionClass: "toast-bottom-right"
                    }
                );
            })
            .then(() => {
                this.spinner.hide();
            })
            .then(() => {
                this.Router.navigateByUrl("/", {
                    skipLocationChange: true
                }).then(() => this.Router.navigate(["/banner"]));
            });
    }


    onUpdateContactContent(updatedData) {
        this.spinner.show();
        this.firebase.database
            .ref("contactContent")
            .update(updatedData)
            .then(() => {
                this.toastr.success(
                    "Content updated",
                    "Success",
                    {
                        timeOut: 3000,
                        positionClass: "toast-bottom-right"
                    }
                );
            })
            .then(() => {
                this.spinner.hide();
            })
            .then(() => {
                this.Router.navigateByUrl("/", {
                    skipLocationChange: true
                }).then(() => this.Router.navigate(["/banner"]));
            });
    }

}
