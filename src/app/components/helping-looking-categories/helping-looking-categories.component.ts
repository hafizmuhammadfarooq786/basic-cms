import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { BannerService } from "./../../Services/banner/banner.service";
import { AngularFireDatabase } from "@angular/fire/database";


@Component({
    selector: 'app-helping-looking-categories',
    templateUrl: './helping-looking-categories.component.html',
    styleUrls: ['./helping-looking-categories.component.css']
})
export class HelpingLookingCategoriesComponent implements OnInit {

    contactContentForm: FormGroup;
    isSubmitted = false;

    // Content vars
    public tagLine = "";
    public description = "";
    constructor(
        private formBuilder: FormBuilder,
        private bannerServices: BannerService,
        private spinner: NgxSpinnerService,
        private firebase: AngularFireDatabase
    ) {
        this.spinner.show();
        this.firebase.database.ref("contactContent").once("value").then(data => {
            var values = data.val();
            if (values) {
                this.tagLine = values.tagLine;
                this.description = values.description;
            }
        }).then(() => {
            this.spinner.hide();
        });
    }

    ngOnInit() {
        this.contactContentForm = this.formBuilder.group({
            tagLine: "",
            description: "",
        });
    }

    onchangetagLine(tagline) {
        this.tagLine = tagline;
    }
    onchangeDescription(description) {
        this.description = description;
    }

    /****** Update Banner Content ******/
    private updatedContext: object = {};
    onUpdate() {
        this.isSubmitted = true;
        if (this.contactContentForm.invalid) {
            return;
        } else if (this.contactContentForm.valid) {
            this.updatedContext = {
                tagLine: this.tagLine,
                description: this.description
            }
            this.bannerServices.onUpdateContactContent(this.updatedContext);
        }
    }
}
