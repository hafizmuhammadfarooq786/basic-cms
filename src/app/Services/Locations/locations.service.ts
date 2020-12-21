import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireDatabase } from "@angular/fire/database";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor(private firebase: AngularFireDatabase,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private Router: Router) { }

  /****** Adding locations ******/
  addLocation(location) {
    var locations = {
      name: location,
      pushId: ""
    }
    this.spinner.show();
    this.firebase.database
      .ref("Locations")
      .push()
      .then(val => {
        var pushId = val.key;
        locations.pushId = pushId;
        return locations;
      }).then(payload => {
        this.firebase.database
          .ref("Locations")
          .child(payload.pushId)
          .set(payload)
          .then(() => {
            this.toastr.success("Location added", "Success!", {
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
              .then(() => this.Router.navigate(["/locations"]));
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
              .then(() => this.Router.navigate(["/locations"]));
          });
      });

  }

  /****** Delete location ******/
  deleteLocation(pushId) {
    this.firebase.database
      .ref("Locations")
      .child(pushId)
      .remove().then(() => {
        this.toastr.success("Location deleted", "Success!", {
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
          .then(() => this.Router.navigate(["/locations"]));
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
          .then(() => this.Router.navigate(["/locations"]));
      });
  }
}
