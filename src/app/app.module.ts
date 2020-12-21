import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule, NgbCarousel } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { ChartsModule } from "ng2-charts";

/******  Firebase app/components ******/
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";

/****** Search Filer | Auth Guard ******/
import { AuthGuard } from "./auth.guard";
import { SearchPipe } from "./pipe/search/search.pipe";

/****** Shared components ******/
import { HeaderComponent } from 'src/shared/header/header.component';
import { SidebarComponent } from 'src/shared/sidebar/sidebar.component';

/****** Loading component ******/
import { LoaderComponent } from './loader-layout/loader/loader.component';

/****** Main componenets ******/
import { LoginComponent } from 'src/app/components/access-controls/login.component';
import { SignupComponent } from 'src/app/components/create-users/signup.component';
import { BannerContentComponent } from 'src/app/components/banner-content/banner-content.component';
import { HelpingLookingCategoriesComponent } from 'src/app/components/helping-looking-categories/helping-looking-categories.component';
import { OrganizationsTypesComponent } from 'src/app/components/organizations-types/organizations-types.component';
import { OrganizationsLocationsComponent } from 'src/app/components/organizations-locations/organizations-locations.component';


/****** Services ******/
import { UsersService } from './Services/users/users.service';
import { HeplerService } from './Helpers/hepler.service';
import { ConstantService } from './Constants/constant.service';
import { environment } from "src/environments/environment";
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        LoginComponent,
        SignupComponent,
        SearchPipe,
        SidebarComponent,
        LoaderComponent,
        BannerContentComponent,
        HelpingLookingCategoriesComponent,
        OrganizationsTypesComponent,
        OrganizationsLocationsComponent,
        PageNotFoundComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgbModule,
        ChartsModule,
        Ng2SearchPipeModule,
        BrowserAnimationsModule,
        NgxSpinnerModule,
        ToastrModule.forRoot(),
        MDBBootstrapModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.config, "mike-cms"),
        AngularFireDatabaseModule, // realtime database
        AngularFireAuthModule, // authentication
        AngularFireStorageModule // cloud storage
    ],
    providers: [UsersService, HeplerService, ConstantService, AuthGuard],
    bootstrap: [AppComponent],
    exports: [NgbCarousel]
})
export class AppModule { }
