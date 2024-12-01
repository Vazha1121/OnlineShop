import { Routes } from '@angular/router';
import { HomeComponent } from './Routes/home/home.component';
import { LaptopsComponent } from './Routes/laptops/laptops.component';
import { PhonesComponent } from './phones/phones.component';

export const routes: Routes = [
    {path:"", component: HomeComponent},
    {path:"laptops", component: LaptopsComponent},
    {path:"phones", component: PhonesComponent},
];
