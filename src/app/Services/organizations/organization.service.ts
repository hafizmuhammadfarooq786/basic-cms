import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireDatabase } from "@angular/fire/database";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { HeplerService } from 'src/app/Helpers/hepler.service';


@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  public key = "";
  public infoSubmitted = false;
  constructor(
    private firebase: AngularFireDatabase,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private helpers: HeplerService,
    private Router: Router
  ) {
    this.key = this.helpers.getKey();
  }

  infoSubmit(value) {
    this.infoSubmitted = value;
  }

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
              .then(() => this.Router.navigate(["/organizations/new/categories"]));
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
              .then(() => this.Router.navigate(["/organizations/new/categories"]));
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
              .then(() => this.Router.navigate(["/organizations/new/categories"]));
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
              .then(() => this.Router.navigate(["/organizations/new/categories"]));
          });
      });
  }


  /****** Adding bank account details ******/
  public accounts = [];
  addAccount(details) {
    this.spinner.show()
    this.accounts.push(details);
    this.toastr.success("Account added", "Success!", {
      timeOut: 3000,
      positionClass: "toast-bottom-right"
    });
    this.Router
      .navigateByUrl("/", {
        skipLocationChange: true
      })
      .then(() => this.Router.navigate(["/organizations/new/accounts"])).then(() => {
        this.spinner.hide();
      });
  }


  /****** Delete account details from list & database ******/
  deleteAcc(index) {
    this.spinner.show();
    this.accounts.splice(index, 1);
    this.toastr.success("Account deleted", "Success!", {
      timeOut: 3000,
      positionClass: "toast-bottom-right"
    });
    this.Router
      .navigateByUrl("/", {
        skipLocationChange: true
      })
      .then(() => this.Router.navigate(["/organizations/new/accounts"])).then(() => {
        this.spinner.hide();
      });
  }

  /****** Adding JazzCash Account  ******/
  addJazzCashAccount(pushKey, number) {
    var jazzCash = {
      accountNumber: number,
      pushId: ""
    }
    this.spinner.show();
    this.firebase.database
      .ref("JazzCashAccounts")
      .child(pushKey)
      .push()
      .then(val => {
        var pushId = val.key;
        jazzCash.pushId = pushId;
        return jazzCash;
      }).then(payload => {
        this.firebase.database
          .ref("JazzCashAccounts")
          .child(pushKey)
          .child(payload.pushId)
          .set(payload)
          .then(() => {
            this.toastr.success("Account added", "Success!", {
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
              .then(() => this.Router.navigate(["/organizations/new/payment-gatways"]));
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
              .then(() => this.Router.navigate(["/organizations/new/payment-gatways"]));
          });
      });
  }

  /****** Delete helping-with category */
  deleteJazzCashAcc(pushId) {
    this.firebase.database
      .ref("JazzCashAccounts")
      .child(this.key)
      .child(pushId)
      .remove().then(() => {
        this.toastr.success("Account deleted", "Success!", {
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
          .then(() => this.Router.navigate(["/organizations/new/payment-gatways"]));
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
          .then(() => this.Router.navigate(["/organizations/new/payment-gatways"]));
      });
  }

  /****** Adding Easypaisa account ******/
  addEasyPaisaAccount(pushKey, number) {
    var easypaisa = {
      accountNumber: number,
      pushId: ""
    }
    this.spinner.show();
    this.firebase.database
      .ref("EasyPaisaAccounts")
      .child(pushKey)
      .push()
      .then(val => {
        var pushId = val.key;
        easypaisa.pushId = pushId;
        return easypaisa;
      }).then(payload => {
        this.firebase.database
          .ref("EasyPaisaAccounts")
          .child(pushKey)
          .child(payload.pushId)
          .set(payload)
          .then(() => {
            this.toastr.success("Account added", "Success!", {
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
              .then(() => this.Router.navigate(["/organizations/new/payment-gatways"]));
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
              .then(() => this.Router.navigate(["/organizations/new/payment-gatways"]));
          });
      });
  }

  /****** Delete looking-for category */
  deleteEasiyPaisaAcc(pushId) {
    this.firebase.database
      .ref("EasyPaisaAccounts")
      .child(this.key)
      .child(pushId)
      .remove().then(() => {
        this.toastr.success("Account deleted", "Success!", {
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
          .then(() => this.Router.navigate(["/organizations/new/payment-gatways"]));
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
          .then(() => this.Router.navigate(["/organizations/new/payment-gatways"]));
      });
  }

  /****** Adding donation-addresses for organizations ******/
  addAddress(pushKey, address, phone) {
    var donateTo = {
      address: address,
      phone: phone,
      pushId: ""
    }
    this.spinner.show();
    this.firebase.database
      .ref("DonationsAddresses")
      .child(pushKey)
      .push()
      .then(val => {
        var pushId = val.key;
        donateTo.pushId = pushId;
        return donateTo;
      }).then(payload => {
        this.firebase.database
          .ref("DonationsAddresses")
          .child(pushKey)
          .child(payload.pushId)
          .set(payload)
          .then(() => {
            this.toastr.success("Address added", "Success!", {
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
              .then(() => this.Router.navigate(["/organizations/new/donation-addresses"]));
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
              .then(() => this.Router.navigate(["/organizations/new/donation-addresses"]));
          });
      });
  }

  /****** Delete donation-addrress ******/
  deleteAddress(pushId) {
    this.firebase.database
      .ref("DonationsAddresses")
      .child(this.key)
      .child(pushId)
      .remove().then(() => {
        this.toastr.success("Address deleted", "Success!", {
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
          .then(() => this.Router.navigate(["/organizations/new/donation-addresses"]));
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
          .then(() => this.Router.navigate(["/organizations/new/donation-addresses"]));
      });
  }
}
