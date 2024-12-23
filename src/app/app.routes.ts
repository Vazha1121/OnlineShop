import { Routes } from '@angular/router';
import { HomeComponent } from './Routes/home/home.component';
import { LaptopsComponent } from './Routes/laptops/laptops.component';
import { PhonesComponent } from './Routes/phones/phones.component';
import { WarrantyComponent } from './Routes/warranty/warranty.component';
import { DeliveryComponent } from './Routes/delivery/delivery.component';
import { ContactComponent } from './Routes/contact/contact.component';
import { RegistrationComponent } from './Routes/registration/registration.component';
import { PrivacyPolicyComponent } from './Routes/privacy-policy/privacy-policy.component';
import { DetailsComponent } from './Routes/details/details.component';
import { ErrorPageComponent } from './Routes/error-page/error-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'laptops', component: LaptopsComponent },
  { path: 'phones', component: PhonesComponent },
  { path: 'warranty', component: WarrantyComponent },
  { path: 'delivery', component: DeliveryComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'register', component: RegistrationComponent},
  { path: 'privacypolicy', component: PrivacyPolicyComponent },
  /* { path: 'details/:id', component: DetailsComponent }, */
  { path: '**', component: ErrorPageComponent },
];
