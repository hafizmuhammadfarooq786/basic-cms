import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireDatabase } from "@angular/fire/database";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { HeplerService } from 'src/app/Helpers/hepler.service';


@Injectable({
  providedIn: 'root'
})
export class ContactInfosService {

  public key = "";
  constructor(private firebase: AngularFireDatabase,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private helpers: HeplerService,
    private Router: Router) {
    this.key = this.helpers.getKey();
  }

  public phones = [];
  addContacts(numbers) {
    this.spinner.show();
    this.firebase.database
      .ref("Organizations")
      .child(this.key)
      .child("Contacts")
      .update(numbers)
      .then(() => {
        this.toastr.success("Contact added", "Success!", {
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
  addPhonesIntoArray(number) {
    this.phones.push(number);
  }

  delPhonesFromArray(index) {
    this.phones.splice(index, 1);
  }
}
