import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireDatabase } from "@angular/fire/database";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private firebase: AngularFireDatabase,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private Router: Router
  ) { }

  /****** Adding Hepling-for categories */
  addHelpCat(name) {
    var helpingWith = {
      name: name,
      pushId: ""
    }
    this.spinner.show();
    this.firebase.database
      .ref("HelpingWith")
      .push()
      .then(val => {
        var pushId = val.key;
        helpingWith.pushId = pushId;
        return helpingWith;
      }).then(payload => {
        this.firebase.database
          .ref("HelpingWith")
          .child(payload.pushId)
          .set(payload)
          .then(() => {
            this.toastr.success("Category added", "Success!", {
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
              .then(() => this.Router.navigate(["/categories"]));
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
              .then(() => this.Router.navigate(["/categories"]));
          });
      });

  }

  /****** Adding Looking-for categories */
  addLookCat(name) {
    var lookingFor = {
      name: name,
      pushId: ""
    }
    this.spinner.show();
    this.firebase.database
      .ref("LookingFor")
      .push()
      .then(val => {
        var pushId = val.key;
        lookingFor.pushId = pushId;
        return lookingFor;
      }).then(payload => {
        this.firebase.database
          .ref("LookingFor")
          .child(payload.pushId)
          .set(payload)
          .then(() => {
            this.toastr.success("Category added", "Success!", {
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
              .then(() => this.Router.navigate(["/categories"]));
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
              .then(() => this.Router.navigate(["/categories"]));
          });
      });
  }

  /****** Delete helping-with category */
  deleteHelpingWithCategory(pushId) {
    this.firebase.database
      .ref("HelpingWith")
      .child(pushId)
      .remove().then(() => {
        this.toastr.success("Category deleted", "Success!", {
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
          .then(() => this.Router.navigate(["/categories"]));
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
          .then(() => this.Router.navigate(["/categories"]));
      });
  }

  /****** Delete looking-for category */
  deleteLookingForCategory(pushId) {
    this.firebase.database
      .ref("LookingFor")
      .child(pushId)
      .remove().then(() => {
        this.toastr.success("Category deleted", "Success!", {
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
          .then(() => this.Router.navigate(["/categories"]));
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
          .then(() => this.Router.navigate(["/categories"]));
      });
  }
}
