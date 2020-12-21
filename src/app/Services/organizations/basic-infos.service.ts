import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireDatabase } from "@angular/fire/database";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { HeplerService } from 'src/app/Helpers/hepler.service';

@Injectable({
  providedIn: 'root'
})
export class BasicInfosService {

  public key = "";
  constructor(private firebase: AngularFireDatabase,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private helpers: HeplerService,
    private Router: Router) {
    this.key = this.helpers.getKey();
  }

  /****** Adding Organization basic-info ******/
  public basics = {};
  addBasic(info) {
    this.basics = info;
  }
  addInfo(info) {
    this.spinner.show();
    this.firebase.database
      .ref("Organizations")
      .child(this.key)
      .update(info)
      .then(() => {
        this.toastr.success("Info added", "Success!", {
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
