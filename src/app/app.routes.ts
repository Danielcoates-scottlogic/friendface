import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    {path:"", redirectTo:"pages/home", pathMatch:"full"},
    {path: "pages/home", component: HomeComponent},
    {path: "**", component: NotFoundComponent}
];
