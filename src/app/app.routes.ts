import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { GurveerComponent } from './pages/gurveer/gurveer.component';


export const routes: Routes = [
    {path:"", redirectTo:"pages/home", pathMatch:"full"},
    {path: "pages/home", component: HomeComponent},
    {path: "pages/gurveer", component: GurveerComponent},
    {path: "**", component: NotFoundComponent}
];
