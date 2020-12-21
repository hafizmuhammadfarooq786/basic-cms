import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularFireDatabase } from "@angular/fire/database";
import { Observable } from "rxjs";
import { ToastrService } from 'ngx-toastr';
import { LocationsService } from 'src/app/Services/Locations/locations.service';

@Component({
  selector: 'app-organizations-locations',
  templateUrl: './organizations-locations.component.html',
  styleUrls: ['./organizations-locations.component.css']
})
export class OrganizationsLocationsComponent implements OnInit {
  locationForm: FormGroup;
  isSubmitted = false;

  /****** Organization types collection */
  organizationLocations: Observable<any[]>;
  public locations: any[] = [];

  constructor(private formBuilder: FormBuilder,
    private locationsServices: LocationsService,
    private toastr: ToastrService,
    private firebase: AngularFireDatabase) {
    /****** Organization locations list fetching operations ******/
    this.organizationLocations = this.firebase.list("/Locations").valueChanges();
    this.organizationLocations.subscribe(locs => {
      this.locations = [];
      if (locs.length != 0) {
        for (let key in locs) {
          this.locations.push(locs[key]);
        }
      } else {
        this.locations = [];
      }
    });
  }

  ngOnInit() {
    /****** Organization location form field ******/
    this.locationForm = this.formBuilder.group({
      location: ["", Validators.required]
    });
  }

  /****** Adding locations for organization ******/
  private name = "";
  addOrganizationLocation() {
    this.isSubmitted = true;
    if (this.locationForm.invalid) {
      return;
    } else if (this.locationForm.valid) {
      this.name = this.locationForm.value.location;
      if (this.locations.length != 0) {
        var status = this.existanceCheck(this.locations, this.name.toLowerCase());
        if (status) {
          this.toastr.error("Location already exists", "OOPS!", {
            timeOut: 3000,
            positionClass: "toast-bottom-right"
          });
        } else {
          this.locationsServices.addLocation(this.name.toLowerCase());
        }
      } else {
        this.locationsServices.addLocation(this.name.toLowerCase());
      }
    }
  }
  /****** Remove organization location from this list & database ******/
  deleteOrganizationLocation(key) {
    this.locationsServices.deleteLocation(key);
  }

  existanceCheck(array, name) {
    const found = array.some(el => el.name === name);
    if (found) {
      return true;
    } else {
      return false;
    }
  }

}
