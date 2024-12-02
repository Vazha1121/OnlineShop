import { Routes } from '@angular/router';
import { HomeComponent } from './Routes/home/home.component';
import { LaptopsComponent } from './Routes/laptops/laptops.component';
import { PhonesComponent } from './Routes/phones/phones.component';
import { WarrantyComponent } from './Routes/warranty/warranty.component';
import { DeliveryComponent } from './Routes/delivery/delivery.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'laptops', component: LaptopsComponent },
  { path: 'phones', component: PhonesComponent },
  { path: 'warranty', component: WarrantyComponent },
  { path: 'delivery', component: DeliveryComponent },
];
