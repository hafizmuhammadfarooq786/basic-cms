import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth.guard";
import { LoginComponent } from 'src/app/components/access-controls/login.component';
import { SignupComponent } from 'src/app/components/create-users/signup.component';
import { BannerContentComponent } from 'src/app/components/banner-content/banner-content.component';
import { HelpingLookingCategoriesComponent } from 'src/app/components/helping-looking-categories/helping-looking-categories.component';
import { OrganizationsTypesComponent } from 'src/app/components/organizations-types/organizations-types.component';
import { OrganizationsLocationsComponent } from 'src/app/components/organizations-locations/organizations-locations.component';
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";

const routes: Routes = [
    {
        path: "login",
        component: LoginComponent,
        pathMatch: "full"
    },
    {
        path: "signup",
        component: SignupComponent,
        pathMatch: "full"
    },
    {
        path: "banner",
        component: BannerContentComponent,
        pathMatch: "full",
        canActivate: [AuthGuard]
    },
    {
        path: "types",
        component: OrganizationsTypesComponent,
        pathMatch: "full",
        canActivate: [AuthGuard]
    },
    {
        path: "locations",
        component: OrganizationsLocationsComponent,
        pathMatch: "full",
        canActivate: [AuthGuard]
    },
    {
        path: "contact",
        component: HelpingLookingCategoriesComponent,
        pathMatch: "full",
        canActivate: [AuthGuard]
    },
    {
        path: "404",
        component: PageNotFoundComponent
    },
    {
        path: '**', redirectTo: '/login'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
