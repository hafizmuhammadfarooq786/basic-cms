import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireDatabase } from "@angular/fire/database";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { HeplerService } from 'src/app/Helpers/hepler.service';
import { TooltipModule } from 'angular-bootstrap-md';



@Injectable({
  providedIn: 'root'
})
export class MediaInfosService {
  public key = "";
  constructor(private firebase: AngularFireDatabase,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private helpers: HeplerService,
    private Router: Router) {
    this.key = this.helpers.getKey();
  }

  addMedia(fLink, iLink, tLink) {
    if (fLink === null || fLink === "") {
      fLink = 0
    }
    if (iLink === null || iLink === "") {
      iLink = 0
    }
    if (tLink === null || tLink === "") {
      tLink = 0
    }
    this.spinner.show();
    this.firebase.database
      .ref("Organizations")
      .child(this.key)
      .update({
        facebook: fLink,
        instagram: iLink,
        twitter: tLink
      })
      .then(() => {
        this.toastr.success("Media added", "Success!", {
          timeOut: 3000,
          positionClass: "toast-bottom-right"
        });
      })
      .then(() => {
        this.spinner.hide();
      })
      .then(() => {
        this.Router
          .navigateByUrl("/", {
            skipLocationChange: true
          })
          .then(() => this.Router.navigate(["/organizations/new"]));
      })
      .catch(err => {
        this.spinner.hide();
        this.toastr.error(err.message, "Error!", {
          timeOut: 3000,
          positionClass: "toast-bottom-right"
        });
        this.Router
          .navigateByUrl("/", {
            skipLocationChange: true
          })
          .then(() => this.Router.navigate(["/organizations/new"]));
      });
  }
}
