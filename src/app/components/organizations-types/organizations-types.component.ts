import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularFireDatabase } from "@angular/fire/database";
import { Observable } from "rxjs";
import { ToastrService } from 'ngx-toastr';
import { TypesService } from 'src/app/Services/Types/types.service';
@Component({
  selector: 'app-organizations-types',
  templateUrl: './organizations-types.component.html',
  styleUrls: ['./organizations-types.component.css']
})
export class OrganizationsTypesComponent implements OnInit {

  typesForm: FormGroup;
  isSubmitted = false;

  /****** Organization types collection */
  organizationTypes: Observable<any[]>;
  public types: any[] = [];

  constructor(private formBuilder: FormBuilder,
    private typesServices: TypesService,
    private toastr: ToastrService,
    private firebase: AngularFireDatabase) {
    /****** Organization list fetching operations ******/
    this.organizationTypes = this.firebase.list("/Types").valueChanges();
    this.organizationTypes.subscribe(types => {
      this.types = [];
      if (types.length != 0) {
        for (let key in types) {
          this.types.push(types[key]);
        }
      } else {
        this.types = [];
      }
    });
  }

  ngOnInit() {
    /****** Organization type form field ******/
    this.typesForm = this.formBuilder.group({
      name: ["", Validators.required]
    });
  }

  /****** Adding types for organization ******/
  private name = "";
  addOrganizationType() {
    this.isSubmitted = true;
    if (this.typesForm.invalid) {
      return;
    } else if (this.typesForm.valid) {
      this.name = this.typesForm.value.name;
      if (this.types.length != 0) {
        var status = this.existanceCheck(this.types, this.name.toLowerCase());
        if (status) {
          this.toastr.error("Type already exists", "OOPS!", {
            timeOut: 3000,
            positionClass: "toast-bottom-right"
          });
        } else {
          this.typesServices.addType(this.name.toLowerCase());
        }
      } else {
        this.typesServices.addType(this.name.toLowerCase());
      }
    }
  }
  /****** Remove organization type from this list & database */
  deleteOrganizationType(key) {
    this.typesServices.deleteType(key);
  }

  existanceCheck(array, name) {
    const found = array.some(el => el.type === name);
    if (found) {
      return true;
    } else {
      return false;
    }
  }
}
