import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class HeplerService {

  constructor() { }

  /****** Organization Push Key ******/
  getKey() {
    var OrganizationKey = localStorage.getItem("OrganizationKey");
    return OrganizationKey;
  }
}
