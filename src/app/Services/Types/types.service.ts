import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireDatabase } from "@angular/fire/database";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class TypesService {

  constructor(private firebase: AngularFireDatabase,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private Router: Router) { }

  /****** Adding Hepling-for categories */
  addType(type) {
    var types = {
      type: type,
      pushId: ""
    }
    this.spinner.show();
    this.firebase.database
      .ref("Types")
      .push()
      .then(val => {
        var pushId = val.key;
        types.pushId = pushId;
        return types;
      }).then(payload => {
        this.firebase.database
          .ref("Types")
          .child(payload.pushId)
          .set(payload)
          .then(() => {
            this.toastr.success("Organization type added", "Success!", {
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
              .then(() => this.Router.navigate(["/types"]));
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
              .then(() => this.Router.navigate(["/types"]));
          });
      });

  }

  /****** Delete helping-with category */
  deleteType(pushId) {
    this.firebase.database
      .ref("Types")
      .child(pushId)
      .remove().then(() => {
        this.toastr.success("Organization type deleted", "Success!", {
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
          .then(() => this.Router.navigate(["/types"]));
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
          .then(() => this.Router.navigate(["/types"]));
      });
  }
}
