import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { GurveerComponent } from './pages/gurveer/gurveer.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { AboutComponent } from './pages/about/about.component';


export const routes: Routes = [
    {path:"", redirectTo:"pages/create-account", pathMatch:"full"},
    {path: "pages/home", component: HomeComponent},
    {path: "pages/gurveer", component: GurveerComponent},
    {path: "pages/create-account", component: CreateAccountComponent},
    {path: "pages/about", component: AboutComponent},
    {path: "**", component: NotFoundComponent}
];
